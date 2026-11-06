const { test } = require('node:test');
const assert = require('node:assert/strict');
const load = require('../scripts/load-ts.cjs');
const { executeJava } = load('src/lib/judge0.ts');
const { ExecutionServiceError } = load('src/lib/executionError.ts');

test('Judge0 tolerates queues beyond ten polls and distinguishes service failures', async () => {
  const original = { fetch: global.fetch, setTimeout: global.setTimeout, now: Date.now };
  let now = 0;
  let polls = 0;
  const response = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });
  Date.now = () => now;
  global.setTimeout = (callback, ms) => { now += ms; callback(); };
  try {
    global.fetch = async (_url, options) => options.method === 'POST'
      ? response({ token: 'test-token' }, 201)
      : response(++polls <= 12 ? { status: { id: 1 } }
        : { status: { id: 3, description: 'Accepted' }, stdout: Buffer.from('Hello Java\n').toString('base64') });
    assert.equal((await executeJava('class Main {}', '')).stdout, 'Hello Java\n');
    assert.equal(polls, 13);

    global.fetch = async (_url, options) => response(options.method === 'POST'
      ? { token: 'test-token' } : { status: { id: 1 } });
    const start = now;
    await assert.rejects(executeJava('class Main {}', ''), error => {
      assert.equal(error.code, 'EXECUTION_TIMEOUT');
      assert.equal(error.details.token, 'test-token');
      assert.equal(error.details.statusId, 1);
      return true;
    });
    assert.equal(now - start, 60000);

    global.fetch = async () => response({}, 429);
    await assert.rejects(executeJava('class Main {}', ''), error => {
      assert.equal(error.code, 'EXECUTION_UNAVAILABLE');
      assert.equal(error.details.httpStatus, 429);
      return true;
    });
    global.fetch = async () => { throw new TypeError('fetch failed'); };
    await assert.rejects(executeJava('class Main {}', ''), error => {
      assert.equal(error.details.cause, 'fetch failed');
      return error.code === 'EXECUTION_UNAVAILABLE';
    });
    global.fetch = async (_url, options) => response(options.method === 'POST'
      ? { token: 'test-token' } : { status: { id: 13, description: 'Internal Error' } });
    await assert.rejects(executeJava('class Main {}', ''), { code: 'EXECUTION_UNAVAILABLE' });
  } finally {
    global.fetch = original.fetch;
    global.setTimeout = original.setTimeout;
    Date.now = original.now;
  }
});

test('execute API reports service errors without exposing internal details', async () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    for (const [code, status] of [['EXECUTION_TIMEOUT', 504], ['EXECUTION_UNAVAILABLE', 503]]) {
      const { POST } = load('src/app/api/execute/route.ts', {
        '@/lib/executionError': { ExecutionServiceError },
        '@/lib/judge0': { executeJava: async () => {
          throw new ExecutionServiceError(code, '再実行してください。', { token: 'private-token' });
        } },
      });
      const result = await POST({ json: async () => ({ language: 'java', code: 'class Main {}' }) });
      assert.equal(result.status, status);
      assert.deepEqual(await result.json(), { success: false, code, error: '再実行してください。' });
    }
  } finally { console.error = originalError; }
});

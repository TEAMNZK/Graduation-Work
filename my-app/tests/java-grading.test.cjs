const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("../scripts/load-ts.cjs");
const { javaQuestionEntriesById: questions } = load("src/data/javaQuestions.ts");
const { validateJavaCode, gradeJavaQuestion, addJavaVerification } = load("src/lib/javaGrading.ts");
const { calculateLearningProgress } = load("src/lib/learningProgress.ts");
const accepted = (stdout) => ({ stdout, stderr: "", statusId: 3, statusDescription: "Accepted" });

test("all reference answers satisfy the code requirements and have sample cases", () => {
  assert.equal(Object.keys(questions).length, 153);
  for (const question of Object.values(questions)) {
    assert.equal(validateJavaCode(question, question.answerCode), null, question.id);
    assert.equal(question.testCases[0].expectedOutput, question.expectedOutput ?? "", question.id);
    assert.equal(question.testCases[0].stdin, question.sampleInput ?? "", question.id);
  }
});

test("comments, strings, identifier fragments and imports cannot satisfy requirements", () => {
  const question = questions["10-for-q2"];
  for (const code of [
    '// for\nSystem.out.println(1);',
    'System.out.println("for");',
    'int before = 1; System.out.println(before);',
    '/* for */ System.out.println(1);',
  ]) assert.ok(validateJavaCode(question, code));
  assert.ok(validateJavaCode(questions["25-generics-q1"], 'import java.util.ArrayList; class Main { public static void main(String[] args) {} }'));
});

test("token checks accept whitespace and reject spaced forbidden output", () => {
  assert.equal(validateJavaCode(questions["12-array-q1"], 'int [ ] numbers = {1,2,3}; System . out . println ( numbers [ 0 ] );'), null);
  assert.ok(validateJavaCode(questions["04-variables-q1"], 'String name = "Taro"; System . out . println ( "Taro" );'));
  assert.equal(validateJavaCode(questions["project-janken-q1"], 'switch (player) { case 0: System.out.println("グー"); }'), null);
});

test("a fixed answer that passes the sample fails another input", async () => {
  const question = questions["08-if-q3"];
  const result = await gradeJavaQuestion(question, question.answerCode, async () => accepted("Fail"));
  assert.equal(result.correct, false);
  assert.equal(result.passedCount, 2);
});

test("processing, timeout and missing status never pass an empty-output question", async () => {
  const question = questions["14-overload-q1"];
  for (const statusId of [undefined, 0, 1, 2, 5, 6, 11]) {
    const result = await gradeJavaQuestion(question, question.answerCode, async () => ({ ...accepted(""), statusId }));
    assert.equal(result.correct, false);
  }
});

test("verification targets main instead of strings or comments", () => {
  const source = '// static void main(String[] args) {\nclass Main { public static void main(String[] args) { System.out.println("{"); } }';
  const checked = addJavaVerification(source, "if (1 != 1) throw new AssertionError();");
  assert.ok(checked.startsWith(source.split("\n")[0]));
  assert.ok(checked.indexOf("try {") > checked.indexOf("class Main"));
});

test("progress uses unique current question IDs, ignores old IDs, and handles empty data", () => {
  assert.deepEqual(calculateLearningProgress(["a", "b"], ["a", "a", "old", "topic"]), { solvedCount: 1, totalCount: 2, percent: 50 });
  assert.deepEqual(calculateLearningProgress([], ["a"]), { solvedCount: 0, totalCount: 0, percent: 0 });
  const ids = Object.keys(questions);
  assert.equal(calculateLearningProgress(ids, ids).percent, 100);
  assert.equal(calculateLearningProgress(ids, ids).totalCount, 153);
});

test("API grades server-owned cases instead of client-provided answers", async () => {
  const executed = [];
  const { POST } = load("src/app/api/execute/route.ts", {
    "next/server": { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } },
    "@/lib/judge0": { executeJava: async (code, stdin) => { executed.push(stdin); return accepted("Fail"); } },
  });
  const response = await POST({ json: async () => ({
    language: "java", code: questions["08-if-q3"].answerCode, stdin: "45",
    questionId: "08-if-q3", expectedOutput: "Fail", testCases: [],
  }) });
  assert.equal(response.status, 200);
  assert.equal(response.body.grading.correct, false);
  assert.deepEqual(executed, ["45", "59", "60"]);
  const unknown = await POST({ json: async () => ({ language: "java", code: "class Main {}", questionId: "toString" }) });
  assert.equal(unknown.status, 400);
});

test("API rejects malformed input and reports execution service failures", async () => {
  const { POST } = load("src/app/api/execute/route.ts", {
    "next/server": { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } },
    "@/lib/judge0": { executeJava: async () => { throw new Error("Service unavailable"); } },
  });
  for (const body of [null, {}, { language: "java", code: 123 }, { language: "java", code: "Main", stdin: 123 }]) {
    assert.equal((await POST({ json: async () => body })).status, 400);
  }
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.equal((await POST({ json: async () => ({ language: "java", code: "class Main {}" }) })).status, 502);
  } finally { console.error = originalError; }
});

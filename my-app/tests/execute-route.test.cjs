const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("../scripts/load-ts.cjs");

test("execute API dispatches Python and preserves Java grading", async () => {
  const calls = [];
  const result = { stdout: "ok", stderr: "", statusId: 3, statusDescription: "Accepted" };
  const { POST } = load("src/app/api/execute/route.ts", {
    "@/lib/judge0": {
      executeJava: async (...args) => { calls.push(["java", ...args]); return result; },
      executePython: async (...args) => { calls.push(["python", ...args]); return result; },
    },
    "@/data/javaQuestions": { javaQuestionEntriesById: { sample: { id: "sample" } } },
    "@/lib/javaGrading": {
      gradeJavaQuestion: async (question) => ({ correct: question.id === "sample" }),
      gradeJavaQuiz: () => { throw new Error("Unexpected quiz grading"); },
    },
  });
  const request = (body) => ({ json: async () => body });
  const python = await POST(request({ language: "python", code: "print(input())", stdin: "ok" }));
  assert.equal(python.status, 200);
  assert.deepEqual(await python.json(), { success: true, stdout: "ok", stderr: "", exitCode: 3, statusDescription: "Accepted" });
  const java = await POST(request({ language: "java", code: "class Main {}", questionId: "sample" }));
  assert.equal(java.status, 200);
  assert.deepEqual((await java.json()).grading, { correct: true });
  assert.deepEqual(calls, [["python", "print(input())", "ok"], ["java", "class Main {}", ""]]);
  for (const body of [null, { language: "javascript", code: "x" }, { language: "python", code: " " }, { language: "python", code: "x", stdin: 1 }, { language: "java", code: "x", questionId: "missing" }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal(calls.length, 2);
});

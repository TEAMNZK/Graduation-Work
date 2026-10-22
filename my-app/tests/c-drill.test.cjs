const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("../scripts/load-ts.cjs");
const { cQuestionEntriesById: questions, cQuestionMap, cCoreQuestionMap, cRequiredQuestionEntriesById } = load("src/data/cQuestions.ts");
const { cCurriculum } = load("src/data/cCurriculum.ts");
const { gradeCQuestion, validateCCode, addCVerification } = load("src/lib/cGrading.ts");
const accepted = (stdout) => ({ stdout, stderr: "", statusId: 3, statusDescription: "Accepted" });

test("C curriculum has unique prefixed IDs and cases for every topic", () => {
  assert.equal(Object.keys(questions).length, 167);
  assert.deepEqual(cCurriculum.flatMap((section) => section.items.map((item) => item.id)), Object.keys(cQuestionMap));
  for (const question of Object.values(questions)) {
    assert.ok(question.id.startsWith("c-"));
    assert.equal(question.testCases[0].stdin, question.sampleInput);
    assert.equal(question.testCases[0].expectedOutput, question.expectedOutput);
    assert.ok(question.answerCode.includes("int main(void)"));
    if (question.sampleInput) assert.ok(question.testCases.length >= 3);
    assert.equal(validateCCode(question, question.answerCode), null, question.id);
  }
  const answers = Object.values(questions).map((question) => question.answerCode.replace(/\s+/g, " ").trim());
  assert.equal(new Set(answers).size, answers.length, "reference answers must not be copies with only different problem text");
});

test("C syntax requirements ignore comments and string literals", () => {
  const question = questions["c-memory-allocate"];
  for (const code of ['/* malloc free */ int main(void){return 0;}', 'int main(void){puts("malloc free");return 0;}']) {
    assert.ok(validateCCode(question, code));
  }
  assert.equal(validateCCode(question, question.answerCode), null);
});

test("inventory grows through three stages and optional flags are excluded from required progress", () => {
  const stages=cQuestionMap["c-project-inventory-advanced"];
  assert.equal(stages.length,3);
  for (const [index,question] of stages.entries()) {
    assert.equal(question.project.stage,index+1);
    assert.equal(question.starterCode,questions[question.project.previousQuestionId].answerCode);
    assert.equal(question.project.optional,false);
  }
  assert.ok(stages[2].testCases.every(testCase=>testCase.fileChecks || testCase.expectedOutput.includes("MissingFile")));
  assert.ok(stages[2].testCases.some(testCase=>testCase.fileChecks[0].text === "0\n"));
  assert.equal(Object.keys(cRequiredQuestionEntriesById).length,166);
  assert.equal(cCoreQuestionMap["c-project-inventory-flags"],undefined);
  assert.equal(questions["c-project-inventory-flags-q1"].project.optional,true);
});

test("C function grading executes a verification wrapper and rejects a failed contract", async () => {
  const question = questions["c-function-max"];
  let received;
  const grading = await gradeCQuestion(question, 'int main(void){return 0;}', async (code) => {
    received = code;
    return { ...accepted(""), statusId: 6, stderr: "max2 is not declared" };
  });
  assert.equal(grading.correct, false);
  assert.ok(received.includes("max2(-3,-9)"));
  assert.ok(received.includes("c_student_main();"));
  assert.equal(addCVerification("code", questions["c-if-q1"]), "code");
});

test("file grading verifies saved contents as well as stdout", () => {
  const question = questions["c-files-binary"];
  assert.ok(question.testCases.every((testCase) => testCase.fileChecks?.length === 1));
  const wrapped = addCVerification(question.answerCode, question, question.testCases[0]);
  assert.ok(wrapped.includes("int expected[]={1,2,3}"));
  assert.ok(wrapped.includes("return 92"));
  const text = questions["c-files-lines"];
  assert.equal(text.testCases[2].fileChecks[0].text, "\n\n");
});

test("each C milestone follows its prerequisite lessons and has varied cases", async () => {
  const topics = cCurriculum.flatMap((section) => section.items.map((item) => item.id));
  const projects = Object.values(questions).filter((question) => question.project);
  assert.equal(projects.length, 7);
  for (const question of projects) {
    for (const prerequisite of question.project.prerequisiteTopicIds) {
      assert.ok(topics.indexOf(prerequisite) >= 0);
      assert.ok(topics.indexOf(prerequisite) < topics.indexOf(question.topicId));
      assert.equal(cQuestionMap[prerequisite][0].type, "lesson");
    }
    assert.ok(question.project.steps.length >= 3);
    assert.ok(new Set(question.testCases.map((item) => item.expectedOutput)).size >= 3);
    const hardcoded = await gradeCQuestion(question, "sample only", async () => accepted(question.expectedOutput));
    assert.equal(hardcoded.correct, false);
  }
});

test("C grading checks all inputs and rejects hardcoded sample output and execution errors", async () => {
  const question = questions["c-if-q1"];
  const inputs = [];
  const correct = await gradeCQuestion(question, question.answerCode, async (_, stdin) => {
    inputs.push(stdin);
    return accepted(Number(stdin) >= 60 ? "Pass\r\n" : "Fail\r\n");
  });
  assert.equal(correct.correct, true);
  assert.equal(inputs.length, question.testCases.length);
  const hardcoded = await gradeCQuestion(question, "hardcoded", async () => accepted("Pass"));
  assert.equal(hardcoded.correct, false);
  assert.equal(hardcoded.passedCount, 2);
  for (const result of [{ ...accepted("Pass"), statusId: 6 }, { ...accepted("Pass"), stderr: "error" }]) {
    assert.equal((await gradeCQuestion(question, "bad", async () => result)).correct, false);
  }
});

test("C API grades server-owned cases, reuses execution and rejects foreign question IDs", async () => {
  const calls = [];
  const { POST } = load("src/app/api/execute/route.ts", {
    "@/lib/judge0": {
      executeC: async (code, stdin) => { calls.push({ code, stdin }); return accepted(Number(stdin) >= 60 ? "Pass" : "Fail"); },
    },
  });
  const request = (body) => ({ json: async () => body });
  const response = await POST(request({ language: "c", code: "answer", stdin: "75\n", questionId: "c-if-q1", expectedOutput: "fake" }));
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.grading.correct, true);
  assert.equal(calls.length, 4);
  assert.ok(calls.every((call) => call.code === "answer"));
  for (const questionId of ["missing", "python-if-q1", "toString", 1]) {
    assert.equal((await POST(request({ language: "c", code: "answer", questionId }))).status, 400);
  }
  assert.equal(calls.length, 4);
});

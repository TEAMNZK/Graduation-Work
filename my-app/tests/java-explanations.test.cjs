const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const load = require("../scripts/load-ts.cjs");
const { javaQuestionEntriesById: questions } = load("src/data/javaQuestions.ts");
const { getJavaExplanation } = load("src/data/javaExplanations.ts");
const { getJavaDrillReview } = load("src/lib/javaDrillReview.ts");

test("every available question has a guide and explanations tied to its own answer lines", () => {
  for (const question of Object.values(questions)) {
    const explanation = getJavaExplanation(question);
    assert.ok(explanation.overview.length > 20, question.id);
    assert.ok(explanation.points.length >= 2, question.id);
    if (question.quiz) {
      assert.ok(question.quiz.choices.some((choice) => choice.id === question.quiz.correctChoiceId), question.id);
      assert.equal(explanation.overview, question.quiz.explanation, question.id);
      continue;
    }
    assert.ok(explanation.walkthrough.length > 0, question.id);
    const lines = question.answerCode.split(/\r?\n/);
    for (const step of explanation.walkthrough) {
      assert.equal(step.code, lines[step.line - 1].trim(), question.id);
      assert.ok(step.explanation.length > 10, question.id);
    }
    if (explanation.textbook) {
      assert.ok(fs.existsSync(path.join(__dirname, "..", "textbooks", `${explanation.textbook}.md`)), question.id);
    }
  }
});

test("janken explanations cover the numeric hands and use the current problem's code", () => {
  const question = questions["project-janken-q5"];
  const explanation = getJavaExplanation(question);
  assert.ok(explanation.overview.includes("0がグー"));
  assert.ok(explanation.points.some((point) => point.includes("(2,0)")));
  assert.ok(explanation.walkthrough.some((step) => step.code.includes("scanner.nextInt()")));
  assert.ok(explanation.walkthrough.some((step) => step.code.includes("player == computer")));
});

test("returning from explanation restores only the matching question and preserves empty output", () => {
  const review = {
    questionId: "14-overload-q1", code: questions["14-overload-q1"].answerCode,
    stdin: "", output: "", progressSaved: true,
  };
  assert.deepEqual(getJavaDrillReview(JSON.parse(JSON.stringify(review)), review.questionId), review);
  assert.equal(getJavaDrillReview(review, "14-overload-q2"), null);
  assert.equal(getJavaDrillReview(review, review.questionId, "new-version"), null);
  assert.equal(getJavaDrillReview({ ...review, questionVersion: "old-version" }, review.questionId, "new-version"), null);
  assert.ok(getJavaDrillReview({ ...review, questionVersion: "new-version" }, review.questionId, "new-version"));
  for (const invalid of [undefined, null, "review", {}, { ...review, code: null }, { ...review, progressSaved: "true" }]) {
    assert.equal(getJavaDrillReview(invalid, review.questionId), null);
  }
});

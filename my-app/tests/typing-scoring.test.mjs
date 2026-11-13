import assert from "node:assert/strict";
import test from "node:test";
import { calculateAccuracy, calculateTypingResult } from "../src/lib/typingUtils.ts";
import { questionsByLanguage } from "../src/lib/questions.ts";

test("未入力は0点・正確率0%・Dランク", () => {
  assert.equal(calculateAccuracy(0, 0), 0);
  assert.deepEqual(calculateTypingResult(0, 0, 120), { score: 0, rank: "D" });
});

test("正しい入力1文字につき1点、タイプミス1回につき1点減点する", () => {
  assert.equal(calculateTypingResult(100, 0, 120).score, 100);
  assert.equal(calculateTypingResult(100, 25, 120).score, 75);
  assert.equal(calculateAccuracy(100, 25), 80);
  assert.equal(calculateTypingResult(100, 100, 120).score, 0);
  assert.equal(calculateTypingResult(1, 0, 120).score, 1);
});

test("ランクの全境界と両モードの時間補正", () => {
  for (const seconds of [120, 300]) {
    for (const [rate, rank] of [[0, "D"], [40, "C"], [60, "B"], [90, "A"], [120, "S"]]) {
      const chars = rate * seconds / 60;
      assert.equal(calculateTypingResult(chars, 0, seconds).rank, rank);
      if (chars > 0) assert.notEqual(calculateTypingResult(chars - 1, 0, seconds).rank, rank);
    }
  }
});

test("減点後のスコアでランクを判定し、ミスが正しい入力を超えると負の得点になる", () => {
  assert.deepEqual(calculateTypingResult(180, 1, 120), { score: 179, rank: "B" });
  assert.deepEqual(calculateTypingResult(10, 15, 120), { score: -5, rank: "D" });
  assert.deepEqual(calculateTypingResult(0, 1, 120), { score: -1, rank: "D" });
});

test("各言語30問、ID重複なし、余分な空白や入力不能な文字なし", () => {
  for (const questions of Object.values(questionsByLanguage)) {
    assert.equal(questions.length, 30);
    assert.equal(new Set(questions.map((question) => question.id)).size, 30);
    for (const question of questions) {
      assert.ok(question.topic);
      assert.equal(question.text, question.text.trim());
      assert.match(question.text, /^[\x20-\x7e]+$/);
      assert.doesNotMatch(question.text, / {2,}/);
    }
  }
});

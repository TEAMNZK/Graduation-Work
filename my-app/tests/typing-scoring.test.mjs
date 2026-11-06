import assert from "node:assert/strict";
import test from "node:test";
import { calculateAccuracy, calculateTypingResult } from "../src/lib/typingUtils.ts";
import { questionsByLanguage } from "../src/lib/questions.ts";

test("未入力は0点・正確率0%・Dランク", () => {
  assert.equal(calculateAccuracy(0, 0), 0);
  assert.deepEqual(calculateTypingResult(0, 0, 120), { score: 0, rank: "D" });
});

test("文字数を加点し、ミスが増えると得点と正確率が下がる", () => {
  assert.equal(calculateTypingResult(100, 0, 120).score, 100);
  assert.equal(calculateTypingResult(100, 25, 120).score, 80);
  assert.equal(calculateAccuracy(100, 25), 80);
  assert.equal(calculateTypingResult(100, 100, 120).score, 50);
  assert.equal(calculateTypingResult(1, 0, 120).score, 1);
});

test("ランクの全境界と両モードの時間補正", () => {
  for (const seconds of [120, 300]) {
    for (const [rate, rank] of [[0, "D"], [40, "C"], [80, "B"], [120, "A"], [180, "S"]]) {
      const chars = rate * seconds / 60;
      assert.equal(calculateTypingResult(chars, 0, seconds).rank, rank);
      if (chars > 0) assert.notEqual(calculateTypingResult(chars - 1, 0, seconds).rank, rank);
    }
  }
});

test("採点には表示用の丸めた正確率を使用しない", () => {
  assert.equal(calculateTypingResult(200, 1, 120).score, 199);
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

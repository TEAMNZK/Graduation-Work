"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  calculateAccuracy,
  getCharStatus,
  ignoredKeys,
} from "@/lib/typingUtils";
import type { Question } from "@/lib/questions";

type TypingGameProps = {
  questions: Question[];
};

export default function TypingGame({ questions }: TypingGameProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakeIndex, setMistakeIndex] = useState<number | null>(null);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [lastMistakeAtIndex, setLastMistakeAtIndex] = useState<number | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const currentQuestion = questions[questionIndex];
  const targetText = currentQuestion?.text ?? "";
  const solvedCount = questionIndex;

  const accuracy = useMemo(() => {
    return calculateAccuracy(correctChars, totalMistakes);
  }, [correctChars, totalMistakes]);

  const score = Math.round(solvedCount * accuracy);

  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!currentQuestion) {
      setIsFinished(true);
    }
  }, [currentQuestion]);

  const moveToNextQuestion = () => {
    const nextIndex = questionIndex + 1;

    if (nextIndex >= questions.length) {
      setIsFinished(true);
      return;
    }

    setQuestionIndex(nextIndex);
    setCurrentIndex(0);
    setMistakeIndex(null);
    setLastMistakeAtIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const key = event.key;

    if (ignoredKeys.includes(key)) return;

    event.preventDefault();

    const expectedChar = targetText[currentIndex];
    if (!expectedChar) return;

    if (key === expectedChar) {
      setCurrentIndex((prev) => prev + 1);
      setCorrectChars((prev) => prev + 1);
      setMistakeIndex(null);
      setLastMistakeAtIndex(null);

      if (currentIndex + 1 === targetText.length) {
        setTimeout(() => {
          moveToNextQuestion();
        }, 200);
      }
      return;
    }

    setMistakeIndex(currentIndex);

    if (lastMistakeAtIndex !== currentIndex) {
      setTotalMistakes((prev) => prev + 1);
      setLastMistakeAtIndex(currentIndex);
    }
  };

  const resetGame = () => {
    setQuestionIndex(0);
    setCurrentIndex(0);
    setMistakeIndex(null);
    setTotalMistakes(0);
    setCorrectChars(0);
    setIsFinished(false);
    setLastMistakeAtIndex(null);
    hiddenInputRef.current?.focus();
  };

  const styles: Record<string, string> = {
    correct: "text-green-600",
    mistake: "rounded bg-red-100 text-red-600",
    current: "text-black underline",
    pending: "text-gray-400",
  };

  return (
    <div
      className="mx-auto max-w-4xl p-6"
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <h1 className="mb-6 text-3xl font-bold">プログラミング言語タイピングゲーム</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <div>言語: {currentQuestion?.language ?? "完了"}</div>
        <div>解いた問題数: {solvedCount}</div>
        <div>ミス数: {totalMistakes}</div>
        <div>正確率: {accuracy}%</div>
      </div>

      {isFinished ? (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">ゲーム終了</h2>
          <p>スコア: {score}</p>
          <p>解いた問題数: {solvedCount}</p>
          <p>ミス数: {totalMistakes}</p>
          <p>正確率: {accuracy}%</p>
          <button
            onClick={resetGame}
            className="rounded bg-black px-4 py-2 text-white"
          >
            もう一度遊ぶ
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">問題 {questionIndex + 1}</p>

          <div className="mb-4 rounded-xl border bg-white p-5 font-mono text-2xl leading-relaxed break-words">
            {targetText.split("").map((char, index) => {
              const status = getCharStatus({
                index,
                currentIndex,
                mistakeIndex,
              });

              return (
                <span key={`${char}-${index}`} className={styles[status]}>
                  {char === " " ? "·" : char}
                </span>
              );
            })}
          </div>

          <p>画面をクリックしてからキーボード入力してください。</p>
          <p>Shift / Control / Alt などの修飾キー単体は判定しません。</p>

          <input
            ref={hiddenInputRef}
            type="text"
            onKeyDown={handleKeyDown}
            className="pointer-events-none absolute opacity-0"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
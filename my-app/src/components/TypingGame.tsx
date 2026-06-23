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

const GAME_TIME = 60;
const TIMER_RADIUS = 42;
const TIMER_STROKE = 8;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS;

export default function TypingGame({ questions }: TypingGameProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakeIndex, setMistakeIndex] = useState<number | null>(null);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [lastMistakeAtIndex, setLastMistakeAtIndex] = useState<number | null>(
    null
  );
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const currentQuestion = questions[questionIndex];
  const targetText = currentQuestion?.text ?? "";
  const solvedCount = questionIndex;

  const accuracy = useMemo(() => {
    return calculateAccuracy(correctChars, totalMistakes);
  }, [correctChars, totalMistakes]);

  const score = Math.round(solvedCount * accuracy);

  const timerProgress = timeLeft / GAME_TIME;
  const timerDashOffset =
    TIMER_CIRCUMFERENCE - TIMER_CIRCUMFERENCE * timerProgress;

  const timerColor = useMemo(() => {
    if (timeLeft <= 10) return "#dc2626";
    if (timeLeft <= 30) return "#f59e0b";
    return "#16a34a";
  }, [timeLeft]);

  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!currentQuestion && !isFinished) {
      setIsFinished(true);
    }
  }, [currentQuestion, isFinished]);

  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);

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
    setTimeLeft(GAME_TIME);
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
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">
            プログラミング言語タイピングゲーム
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            制限時間内に、できるだけ多くの問題を正確に入力します。
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative h-28 w-28">
            <svg
              className="h-28 w-28 -rotate-90"
              viewBox="0 0 100 100"
              aria-label="残り時間"
            >
              <circle
                cx="50"
                cy="50"
                r={TIMER_RADIUS}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={TIMER_STROKE}
              />
              <circle
                cx="50"
                cy="50"
                r={TIMER_RADIUS}
                fill="none"
                stroke={timerColor}
                strokeWidth={TIMER_STROKE}
                strokeLinecap="round"
                strokeDasharray={TIMER_CIRCUMFERENCE}
                strokeDashoffset={timerDashOffset}
                style={{
                  transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-bold"
                style={{ color: timerColor }}
              >
                {timeLeft}
              </span>
              <span className="text-xs text-gray-500">sec</span>
            </div>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">残り時間</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="rounded-lg bg-white px-4 py-2 shadow">
          言語: {currentQuestion?.language ?? "完了"}
        </div>
        <div className="rounded-lg bg-white px-4 py-2 shadow">
          解いた問題数: {solvedCount}
        </div>
        <div className="rounded-lg bg-white px-4 py-2 shadow">
          ミス数: {totalMistakes}
        </div>
        <div className="rounded-lg bg-white px-4 py-2 shadow">
          正確率: {accuracy}%
        </div>
      </div>

      {isFinished ? (
        <div className="space-y-2 rounded-xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold">ゲーム終了</h2>
          <p>スコア: {score}</p>
          <p>解いた問題数: {solvedCount}</p>
          <p>ミス数: {totalMistakes}</p>
          <p>正確率: {accuracy}%</p>
          <button
            onClick={resetGame}
            className="mt-3 rounded bg-black px-4 py-2 text-white"
          >
            もう一度遊ぶ
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-white p-6 shadow">
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
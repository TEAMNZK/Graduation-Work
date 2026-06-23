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

function shuffleQuestions(items: Question[]) {
  const copied = [...items];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}

function getRank(score: number) {
  if (score >= 250) return "S";
  if (score >= 180) return "A";
  if (score >= 120) return "B";
  if (score >= 60) return "C";
  return "D";
}

export default function TypingGame({ questions }: TypingGameProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(() =>
    shuffleQuestions(questions)
  );
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

  const currentQuestion = shuffledQuestions[questionIndex];
  const targetText = currentQuestion?.text ?? "";
  const solvedCount = questionIndex;

  const accuracy = useMemo(() => {
    return calculateAccuracy(correctChars, totalMistakes);
  }, [correctChars, totalMistakes]);

  const score = Math.round(solvedCount * accuracy);
  const rank = getRank(score);

  const timerProgress = timeLeft / GAME_TIME;
  const timerDashOffset =
    TIMER_CIRCUMFERENCE - TIMER_CIRCUMFERENCE * timerProgress;

  const timerColor = useMemo(() => {
    if (timeLeft <= 10) return "#dc2626";
    if (timeLeft <= 30) return "#f59e0b";
    return "#16a34a";
  }, [timeLeft]);

  const isDangerTime = timeLeft <= 10 && !isFinished;

  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(questions));
  }, [questions]);

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

    if (nextIndex >= shuffledQuestions.length) {
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

  const finishGame = () => {
    setIsFinished(true);
  };

  const resetGame = () => {
    setShuffledQuestions(shuffleQuestions(questions));
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
          <div
            className={`relative h-28 w-28 ${
              isDangerTime ? "animate-pulse" : ""
            }`}
          >
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
                  filter: isDangerTime
                    ? "drop-shadow(0 0 6px rgba(220, 38, 38, 0.6))"
                    : "none",
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-2xl font-bold ${
                  isDangerTime ? "animate-pulse" : ""
                }`}
                style={{ color: timerColor }}
              >
                {timeLeft}
              </span>
              <span className="text-xs text-gray-500">sec</span>
            </div>
          </div>
          <p
            className={`mt-2 text-sm font-medium ${
              isDangerTime ? "text-red-600" : "text-gray-700"
            }`}
          >
            残り時間
          </p>
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
        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium text-gray-500">RESULT</p>
            <h2 className="text-3xl font-bold">ゲーム終了</h2>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <p className="mb-2 text-sm font-medium text-gray-500">スコア</p>
              <p className="text-5xl font-extrabold text-blue-600">{score}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <p className="mb-2 text-sm font-medium text-gray-500">ランク</p>
              <p className="text-5xl font-extrabold text-amber-500">{rank}</p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-500">解いた問題数</p>
              <p className="mt-1 text-2xl font-bold">{solvedCount}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-500">ミス数</p>
              <p className="mt-1 text-2xl font-bold">{totalMistakes}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-500">正確率</p>
              <p className="mt-1 text-2xl font-bold">{accuracy}%</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetGame}
              className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
            >
              もう一度遊ぶ
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p>問題 {questionIndex + 1}</p>

            <button
              onClick={finishGame}
              className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              終了する
            </button>
          </div>

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
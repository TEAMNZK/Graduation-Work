"use client";

import Link from "next/link";
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

// ゲームの制限時間を120秒に設定する
const GAME_TIME = 120;

const TIMER_RADIUS = 42;
const TIMER_STROKE = 8;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS;

// 問題の順番をランダムに並べ替える
function shuffleQuestions(items: Question[]) {
  const copied = [...items];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }

  return copied;
}

// スコアに応じてランクを返す
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
  const isGameFinished = isFinished || !currentQuestion;
  const targetText = currentQuestion?.text ?? "";
  const solvedCount = questionIndex;

  // 正確率を計算する
  const accuracy = useMemo(() => {
    return calculateAccuracy(correctChars, totalMistakes);
  }, [correctChars, totalMistakes]);

  const score = Math.round(solvedCount * accuracy);
  const rank = getRank(score);

  // 円形タイマーの残量を計算する
  const timerProgress = timeLeft / GAME_TIME;
  const timerDashOffset =
    TIMER_CIRCUMFERENCE - TIMER_CIRCUMFERENCE * timerProgress;

  // 残り時間によって円の色を変える
  const timerColor = useMemo(() => {
    if (timeLeft <= 10) return "#dc2626";
    if (timeLeft <= 30) return "#f59e0b";
    return "#16a34a";
  }, [timeLeft]);

  const isDangerTime = timeLeft <= 10 && !isGameFinished;

  // ページ表示時に入力欄へフォーカスする
  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  // 制限時間を1秒ずつ減らす
  useEffect(() => {
    if (isGameFinished) return;

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
  }, [isGameFinished]);

  // 次の問題へ進む
  const moveToNextQuestion = () => {
    const nextIndex = questionIndex + 1;

    if (nextIndex >= shuffledQuestions.length) {
      setQuestionIndex(nextIndex);
      setIsFinished(true);
      return;
    }

    setQuestionIndex(nextIndex);
    setCurrentIndex(0);
    setMistakeIndex(null);
    setLastMistakeAtIndex(null);
  };

  // キー入力を1文字ずつ判定する
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isGameFinished) return;

    const key = event.key;

    // Shiftなどの修飾キー単体は判定しない
    if (ignoredKeys.includes(key)) return;

    event.preventDefault();

    const expectedChar = targetText[currentIndex];

    if (!expectedChar) return;

    // 正しい文字が入力された場合
    if (key === expectedChar) {
      setCurrentIndex((prev) => prev + 1);
      setCorrectChars((prev) => prev + 1);
      setMistakeIndex(null);
      setLastMistakeAtIndex(null);

      // 問題を最後まで入力したら次の問題へ進む
      if (currentIndex + 1 === targetText.length) {
        setTimeout(() => {
          moveToNextQuestion();
        }, 200);
      }

      return;
    }

    // 間違えた文字を赤く表示する
    setMistakeIndex(currentIndex);

    // 同じ文字位置でのミスは1回だけ数える
    if (lastMistakeAtIndex !== currentIndex) {
      setTotalMistakes((prev) => prev + 1);
      setLastMistakeAtIndex(currentIndex);
    }
  };

  // 途中でゲームを終了する
  const finishGame = () => {
    setIsFinished(true);
  };

  // ゲームを初期状態に戻す
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
    current: "text-black underline underline-offset-4",
    pending: "text-gray-400",
  };

  return (
    <div
      className="mx-auto max-w-5xl p-6"
      onClick={() => hiddenInputRef.current?.focus()}
    >
      {/* タイトル */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          プログラミング言語タイピングゲーム
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          制限時間内に、できるだけ多くの問題を正確に入力します。
        </p>
      </div>

      {/* 情報カードとタイマー */}
      <div className="mb-6 grid grid-cols-[repeat(4,minmax(0,1fr))_120px] items-center gap-4">
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-medium tracking-wide text-gray-500">
            LANGUAGE
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900">
            {currentQuestion?.language ??
              shuffledQuestions[0]?.language ??
              "完了"}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-medium tracking-wide text-gray-500">
            CLEARED
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900">{solvedCount}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-medium tracking-wide text-gray-500">
            MISTAKES
          </p>

          <p className="mt-2 text-lg font-bold text-red-600">
            {totalMistakes}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-medium tracking-wide text-gray-500">
            ACCURACY
          </p>

          <p className="mt-2 text-lg font-bold text-blue-600">{accuracy}%</p>
        </div>

        {/* 円形タイマー */}
        <div className="flex flex-col items-center justify-center">
          <div
            className={`relative h-24 w-24 ${
              isDangerTime ? "animate-pulse" : ""
            }`}
          >
            <svg
              className="h-24 w-24 -rotate-90"
              viewBox="0 0 100 100"
              aria-label={`残り時間 ${timeLeft}秒`}
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
            className={`mt-1 text-sm font-medium ${
              isDangerTime ? "text-red-600" : "text-gray-700"
            }`}
          >
            残り時間
          </p>
        </div>
      </div>

      {isGameFinished ? (
        /* 結果画面 */
        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium text-gray-500">RESULT</p>
            <h2 className="text-3xl font-bold">ゲーム終了</h2>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <p className="mb-2 text-sm font-medium text-gray-500">
                スコア
              </p>

              <p className="text-5xl font-extrabold text-blue-600">{score}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <p className="mb-2 text-sm font-medium text-gray-500">
                ランク
              </p>

              <p className="text-5xl font-extrabold text-amber-500">{rank}</p>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-3 gap-4">
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

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={resetGame}
              className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
            >
              もう一度遊ぶ
            </button>

            <Link
              href="/typing"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-gray-800 transition hover:bg-gray-50"
            >
              言語選択へ戻る
            </Link>
          </div>
        </div>
      ) : (
        /* プレイ画面 */
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-gray-600">
              問題 {questionIndex + 1}
            </p>

            <button
              onClick={finishGame}
              className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              終了する
            </button>
          </div>

          <div className="mb-4 rounded-2xl border-2 border-gray-200 bg-gray-50 p-6 font-mono text-2xl leading-loose break-words">
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

          <div className="space-y-1 text-sm text-gray-600">
            <p>半角英数字で入力してください。</p>
            <p>Shift / Control / Alt などの修飾キー単体は判定しません。</p>
            <p>・はスペースを表します。</p>
          </div>

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

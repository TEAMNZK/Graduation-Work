"use client";

import { TYPING_MODES, type TypingMode } from "@/lib/typingModes";
import { useState } from "react";
import Link from "next/link";
import type { Question } from "@/lib/questions";
import TypingGame from "@/components/TypingGame";
import TypingHistory from "@/components/TypingHistory";
import TypingRanking from "@/components/TypingRanking";

export default function TypingLobby({ questions }: { questions: Question[] }) {
  const [mode, setMode] = useState<TypingMode>("standard");
  const [isPlaying, setIsPlaying] = useState(false);
  const language = questions[0]?.language ?? "Java";

  // スタート後にゲームをマウントするので、待機中は計時・保存しない。
  if (isPlaying) return <TypingGame questions={questions} mode={mode} onReturnToLobby={() => setIsPlaying(false)} />;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <Link href="/typing" className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-100">← 言語選択に戻る</Link>
      <section className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold tracking-widest text-blue-600">TYPING GAME</p>
        <h1 className="mt-3 text-3xl font-bold">{language} タイピング</h1>
        <p className="mt-3 leading-7 text-gray-600">{language}のコードを入力して、速さと正確さを磨きましょう。準備ができたらゲームを開始してください。</p>
        <ul className="mt-6 space-y-2 text-sm text-gray-600">
          <li>制限時間は{TYPING_MODES[mode].seconds}秒。すべての問題を入力すると、その時点で終了します。</li>
          <li>半角英数字で入力してください。問題中の「・」はスペースです。</li>
          <li>スコアは解いた問題数と正確率で決まります。</li>
        </ul>
        <fieldset className="mt-6">
          <legend className="font-semibold text-gray-800">プレイモード</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {(Object.keys(TYPING_MODES) as TypingMode[]).map((value) => (
              <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 ${mode === value ? "border-blue-600 bg-blue-50 text-blue-800" : "border-gray-300"}`}>
                <input type="radio" name="typing-mode" value={value} checked={mode === value} onChange={() => setMode(value)} />
                {TYPING_MODES[value].label}（{TYPING_MODES[value].seconds}秒）
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">ランキングはモードごとに集計します。モード導入前の記録はプレイ履歴で確認できます。</p>
        </fieldset>
        <button type="button" onClick={() => setIsPlaying(true)} disabled={questions.length === 0} className="mt-8 rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:opacity-50">ゲームスタート</button>
      </section>
      <TypingRanking key={`${language}-${mode}`} language={language} mode={mode} />
      <TypingHistory language={language} />
    </div>
  );
}

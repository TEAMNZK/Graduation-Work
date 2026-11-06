"use client";

import { onAuthStateChanged } from "firebase/auth";
import { TYPING_MODES, type TypingMode } from "@/lib/typingModes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { Question } from "@/lib/questions";
import TypingGame from "@/components/TypingGame";
import TypingHistory from "@/components/TypingHistory";
import { loadCachedScores, scoreCacheKey } from "@/lib/typingScoreCache";

type RankingEntry = { id: string; userName: string; score: number; rank: string };

// リアルタイム購読をせず、取得済みランキングを再利用する。
function Ranking({ language, mode }: { language: string; mode: TypingMode }) {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const rankingQuery = query(collection(db, "typingScores"),
      where("language", "==", language), where("mode", "==", mode), orderBy("score", "desc"), limit(10));
    let generation = 0;
    const stopAuth = onAuthStateChanged(auth, (user) => {
      const currentGeneration = ++generation;
      setEntries([]);
      if (!user) { setEntries([]); setStatus("ready"); return; }
      setStatus("loading");
      const userId = user.uid;
      void loadCachedScores(scoreCacheKey("ranking", userId, language, mode), rankingQuery).then((rows) => {
        if (currentGeneration !== generation) return;
        const results: RankingEntry[] = [];
        rows.forEach((document) => {
          const data = document.data;
          // 不完全な記録があっても画面全体を壊さない。
          if (typeof data.score !== "number" || !Number.isFinite(data.score)) return;
          results.push({ id: document.id,
            userName: typeof data.userName === "string" ? data.userName : "ユーザー",
            score: data.score, rank: typeof data.rank === "string" ? data.rank : "—" });
        });
        setEntries(results);
        setStatus("ready");
      }).catch((error) => {
        if (currentGeneration !== generation) return;
        console.error("ランキングの取得に失敗しました。", error);
        setStatus("error");
      });
    });
    return () => { generation += 1; stopAuth(); };
  }, [language, mode, retryCount]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="ranking-title">
      <h2 id="ranking-title" className="text-xl font-bold">{language} {TYPING_MODES[mode].label} ランキング</h2>
      <p className="mt-2 text-sm text-gray-500">プレイ記録の上位10件。同じユーザーの記録も掲載されます。同点は同順位です。最新の記録が反映されるまで時間がかかる場合があります。</p>
      <div className="mt-6" aria-live="polite">
        {status === "loading" && <p className="text-gray-600">ランキングを読み込み中...</p>}
        {status === "error" && <div>
          <p className="text-gray-600">ランキングを取得できませんでした。ゲームは開始できます。</p>
          <button type="button" onClick={() => { setStatus("loading"); setRetryCount((count) => count + 1); }} className="mt-3 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">再読み込み</button>
        </div>}
        {status === "ready" && entries.length === 0 && <p className="text-gray-600">まだ記録がありません。最初のスコアを登録しましょう！</p>}
        {status === "ready" && entries.length > 0 && <table className="w-full text-left text-sm">
          <caption className="sr-only">{language}のスコア上位10件</caption>
          <thead className="border-b border-gray-200 text-gray-500"><tr>
            <th scope="col" className="py-3">順位</th><th scope="col">ユーザー</th><th scope="col" className="text-right">スコア</th><th scope="col" className="text-right">ランク</th>
          </tr></thead>
          <tbody>{entries.map((entry) => <tr key={entry.id} className="border-b border-gray-100">
            <td className="py-4 font-bold text-blue-700">{entries.findIndex((item) => item.score === entry.score) + 1}位</td>
            <td className="max-w-48 break-words pr-3">{entry.userName}</td>
            <td className="text-right font-bold">{entry.score} 点</td><td className="text-right">{entry.rank}</td>
          </tr>)}</tbody>
        </table>}
      </div>
    </section>
  );
}

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
      <Ranking key={`${language}-${mode}`} language={language} mode={mode} />
      <TypingHistory language={language} />
    </div>
  );
}

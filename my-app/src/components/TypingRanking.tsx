"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useId, useState } from "react";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { TYPING_MODES, type TypingMode } from "@/lib/typingModes";
import { loadCachedScores, scoreCacheKey } from "@/lib/typingScoreCache";

type RankingEntry = { id: string; userName: string; score: number; rank: string };

// リアルタイム購読をせず、取得済みランキングを再利用する。
export default function TypingRanking({ language, mode, compact = false }: { language: string; mode: TypingMode; compact?: boolean }) {
  const headingId = useId();
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
    <section className={compact ? "" : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"} aria-labelledby={headingId}>
      <h2 id={headingId} className={compact ? "text-sm font-bold" : "text-xl font-bold"}>{language} {TYPING_MODES[mode].label} ランキング</h2>
      <p className="mt-2 text-sm text-gray-500">{compact ? "上位10件のプレイ記録。同点は同順位です。同じユーザーの記録も含みます。" : "プレイ記録の上位10件。同じユーザーの記録も掲載されます。同点は同順位です。最新の記録が反映されるまで時間がかかる場合があります。"}</p>
      <div className="mt-6" aria-live="polite">
        {status === "loading" && <p className="text-gray-600">ランキングを読み込み中...</p>}
        {status === "error" && <div>
          <p className="text-gray-600">ランキングを取得できませんでした。</p>
          <button type="button" onClick={() => { setStatus("loading"); setRetryCount((count) => count + 1); }} className="mt-3 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">再読み込み</button>
        </div>}
        {status === "ready" && entries.length === 0 && <p className="text-gray-600">まだ記録がありません。最初のスコアを登録しましょう！</p>}
        {status === "ready" && entries.length > 0 && compact && <ol className="space-y-2">
          {entries.map((entry) => <li key={entry.id} className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="shrink-0 font-bold text-blue-700">{entries.findIndex((item) => item.score === entry.score) + 1}位</span>
              <span className="min-w-0 break-words font-medium">{entry.userName}</span>
            </div>
            <div className="mt-1 flex justify-end gap-2 text-gray-600"><span className="font-bold">{entry.score} 点</span><span>ランク {entry.rank}</span></div>
          </li>)}
        </ol>}
        {status === "ready" && entries.length > 0 && !compact && <table className="w-full text-left text-sm">
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


"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, limit, orderBy, query, Timestamp, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { loadCachedScores, scoreCacheKey } from "@/lib/typingScoreCache";

type HistoryEntry = {
  id: string;
  createdAt: Timestamp | null;
  score: number;
  rank: string;
  solvedCount: number;
  totalMistakes: number;
  accuracy: number;
};

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit",
});

export default function TypingHistory({ language }: { language: string }) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "signedOut">("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let generation = 0;
    // 認証状態の確定後に本人の履歴だけを取得する。
    const stopAuth = onAuthStateChanged(auth, (user) => {
      const currentGeneration = ++generation;
      setEntries([]);
      if (!user) {
        setStatus("signedOut");
        return;
      }
      setStatus("loading");
      const historyQuery = query(collection(db, "typingScores"),
        where("userId", "==", user.uid), where("language", "==", language),
        orderBy("createdAt", "desc"), limit(20));
      void loadCachedScores(scoreCacheKey("history", user.uid, language), historyQuery).then((rows) => {
        if (currentGeneration !== generation) return;
        const results: HistoryEntry[] = [];
        rows.forEach((document) => {
          const data = document.data;
          // 不完全な古い記録を表示しても数値欄が壊れないようにする。
          const numberOrZero = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : 0;
          results.push({ id: document.id,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
            score: numberOrZero(data.score), rank: typeof data.rank === "string" ? data.rank : "—",
            solvedCount: numberOrZero(data.solvedCount), totalMistakes: numberOrZero(data.totalMistakes),
            accuracy: numberOrZero(data.accuracy) });
        });
        setEntries(results);
        setStatus("ready");
      }).catch((error) => {
        if (currentGeneration !== generation) return;
        console.error("プレイ履歴の取得に失敗しました。", error);
        setEntries([]);
        setStatus("error");
      });
    });
    // 画面を離れた後や別アカウントに切り替わった後の応答を無視する。
    return () => { stopAuth(); generation += 1; };
  }, [language, retryCount]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="history-title">
      <h2 id="history-title" className="text-xl font-bold">自分のプレイ履歴</h2>
      <p className="mt-2 text-sm text-gray-500">{language}の最近20件を新しい順に表示します。日時は日本時間です。</p>
      <div className="mt-6" aria-live="polite">
        {status === "loading" && <p className="text-gray-600">履歴を読み込み中...</p>}
        {status === "signedOut" && <p className="text-gray-600">履歴を見るにはログインしてください。</p>}
        {status === "error" && <div>
          <p className="text-gray-600">履歴を取得できませんでした。ゲームは開始できます。</p>
          <button type="button" onClick={() => { setStatus("loading"); setRetryCount((count) => count + 1); }} className="mt-3 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">再読み込み</button>
        </div>}
        {status === "ready" && entries.length === 0 && <p className="text-gray-600">まだプレイ履歴がありません。ゲームを始めて記録を残しましょう。</p>}
        {status === "ready" && entries.length > 0 && <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">自分の{language}の最近20件のプレイ履歴</caption>
            <thead className="border-b border-gray-200 text-gray-500"><tr>
              {["日時", "言語", "スコア", "ランク", "問題数", "ミス数", "正確率"].map((label) => <th key={label} scope="col" className="py-3 pr-4">{label}</th>)}
            </tr></thead>
            <tbody>{entries.map((entry) => <tr key={entry.id} className="border-b border-gray-100">
              <td className="whitespace-nowrap py-4 pr-4">{entry.createdAt ? dateFormatter.format(entry.createdAt.toDate()) : "保存中"}</td>
              <td className="pr-4">{language}</td><td className="pr-4 font-bold text-blue-700">{entry.score} 点</td>
              <td className="pr-4">{entry.rank}</td><td className="pr-4">{entry.solvedCount}</td>
              <td className="pr-4">{entry.totalMistakes}</td><td>{entry.accuracy}%</td>
            </tr>)}</tbody>
          </table>
        </div>}
      </div>
    </section>
  );
}

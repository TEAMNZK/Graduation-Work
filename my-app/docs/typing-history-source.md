# プレイ履歴：完成版全文

## 新規作成：my-app/src/components/TypingHistory.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, limit, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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
    let stopHistory: (() => void) | undefined;
    // 認証状態の確定後に本人の履歴だけを購読する。
    const stopAuth = onAuthStateChanged(auth, (user) => {
      stopHistory?.();
      setEntries([]);
      if (!user) {
        setStatus("signedOut");
        return;
      }
      setStatus("loading");
      const historyQuery = query(collection(db, "typingScores"),
        where("userId", "==", user.uid), where("language", "==", language),
        orderBy("createdAt", "desc"), limit(20));
      stopHistory = onSnapshot(historyQuery, (snapshot) => {
        const results: HistoryEntry[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
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
      }, (error) => {
        console.error("プレイ履歴の取得に失敗しました。", error);
        setEntries([]);
        setStatus("error");
      });
    });
    // ゲーム開始時や画面を離れたときに購読を解除する。
    return () => { stopAuth(); stopHistory?.(); };
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

```

## 既存ファイル変更：my-app/src/components/TypingLobby.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Question } from "@/lib/questions";
import TypingGame from "@/components/TypingGame";
import TypingHistory from "@/components/TypingHistory";

type RankingEntry = { id: string; userName: string; score: number; rank: string };

// 待機中だけ購読し、ゲーム中はランキングの読み取りを停止する。
function Ranking({ language }: { language: string }) {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const rankingQuery = query(collection(db, "typingScores"),
      where("language", "==", language), orderBy("score", "desc"), limit(10));
    return onSnapshot(rankingQuery, (snapshot) => {
      const results: RankingEntry[] = [];
      snapshot.forEach((document) => {
        const data = document.data();
        // 不完全な記録があっても画面全体を壊さない。
        if (typeof data.score !== "number" || !Number.isFinite(data.score)) return;
        results.push({ id: document.id,
          userName: typeof data.userName === "string" ? data.userName : "ユーザー",
          score: data.score, rank: typeof data.rank === "string" ? data.rank : "—" });
      });
      setEntries(results);
      setStatus("ready");
    }, (error) => {
      console.error("ランキングの取得に失敗しました。", error);
      setStatus("error");
    });
  }, [language, retryCount]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="ranking-title">
      <h2 id="ranking-title" className="text-xl font-bold">{language} ランキング</h2>
      <p className="mt-2 text-sm text-gray-500">プレイ記録の上位10件。同じユーザーの記録も掲載されます。同点は同順位です。</p>
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
  const [isPlaying, setIsPlaying] = useState(false);
  const language = questions[0]?.language ?? "Java";

  // スタート後にゲームをマウントするので、待機中は計時・保存しない。
  if (isPlaying) return <TypingGame questions={questions} onReturnToLobby={() => setIsPlaying(false)} />;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <Link href="/typing" className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-100">← 言語選択に戻る</Link>
      <section className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold tracking-widest text-blue-600">TYPING GAME</p>
        <h1 className="mt-3 text-3xl font-bold">{language} タイピング</h1>
        <p className="mt-3 leading-7 text-gray-600">{language}のコードを入力して、速さと正確さを磨きましょう。準備ができたらゲームを開始してください。</p>
        <ul className="mt-6 space-y-2 text-sm text-gray-600">
          <li>制限時間は120秒。すべての問題を入力すると、その時点で終了します。</li>
          <li>半角英数字で入力してください。問題中の「・」はスペースです。</li>
          <li>スコアは解いた問題数と正確率で決まります。</li>
        </ul>
        <button type="button" onClick={() => setIsPlaying(true)} disabled={questions.length === 0} className="mt-8 rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:opacity-50">ゲームスタート</button>
      </section>
      <Ranking language={language} />
      <TypingHistory language={language} />
    </div>
  );
}

```

# 読み書き削減：完成版全文

## 新規作成：my-app/src/lib/typingScoreCache.ts

```tsx
import { getDocs, Timestamp, type DocumentData, type Query } from "firebase/firestore";

export type CachedScore = { id: string; data: DocumentData };
const CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { expiresAt: number; rows: CachedScore[] }>();
const pending = new Map<string, Promise<CachedScore[]>>();

export function scoreCacheKey(kind: "ranking" | "history", userId: string, language: string) {
  return JSON.stringify([kind, userId, language]);
}

// 同一の取得要求をまとめ、画面を往復しても5分間はサーバーから読み直さない。
export function loadCachedScores(key: string, scoreQuery: Query): Promise<CachedScore[]> {
  const saved = cache.get(key);
  if (saved && Date.now() < saved.expiresAt) return Promise.resolve(saved.rows);
  const running = pending.get(key);
  if (running) return running;
  const request = getDocs(scoreQuery).then((snapshot) => {
    const rows = snapshot.docs.map((document) => ({ id: document.id, data: document.data() }));
    cache.set(key, { expiresAt: Date.now() + CACHE_MS, rows });
    return rows;
  }).finally(() => pending.delete(key));
  pending.set(key, request);
  return request;
}

// 保存成功した結果は手元の表示にも反映する。再取得や追加書き込みはしない。
export function rememberSavedScore(id: string, data: DocumentData) {
  const row: CachedScore = { id, data: { ...data, createdAt: Timestamp.now() } };
  for (const kind of ["ranking", "history"] as const) {
    const key = scoreCacheKey(kind, data.userId, data.language);
    const running = pending.get(key);
    // 取得途中に保存が完了しても、サーバー応答で新記録を消さない。
    if (running) void running.then(() => rememberSavedScore(id, data)).catch(() => undefined);
    const saved = cache.get(key);
    if (!saved) continue;
    const rows = [row, ...saved.rows.filter((item) => item.id !== id)];
    if (kind === "ranking") rows.sort((a, b) => b.data.score - a.data.score || a.id.localeCompare(b.id));
    // 有効期限は延長しない。他ユーザーの新記録は次回取得時に反映する。
    cache.set(key, { ...saved, rows: rows.slice(0, kind === "ranking" ? 10 : 20) });
  }
}

```

## 既存ファイル変更：my-app/src/lib/typingScores.ts

```tsx
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { rememberSavedScore } from "@/lib/typingScoreCache";

/**
 * タイピングゲーム終了時に保存するデータ。
 */
export type TypingScoreInput = {
  language: string;
  score: number;
  solvedCount: number;
  totalMistakes: number;
  accuracy: number;
  rank: string;
};

/**
 * タイピングゲームの結果を Firestore に保存する。
 *
 * 保存先:
 * typingScores コレクション
 */
export async function saveTypingScore(
  result: TypingScoreInput
): Promise<string> {
  // 現在ログインしているユーザーを取得する
  const user = auth.currentUser;

  if (!user) {
    throw new Error("ログインユーザーが見つかりません。");
  }

  // 表示名がなければ、メールアドレスの @ より前を名前として使う
  const userName =
    user.displayName ??
    user.email?.split("@")[0] ??
    "ユーザー";

  // Firestore の typingScores コレクションへ結果を追加する
  const documentReference = await addDoc(
    collection(db, "typingScores"),
    {
      userId: user.uid,
      userName,
      language: result.language,
      score: result.score,
      solvedCount: result.solvedCount,
      totalMistakes: result.totalMistakes,
      accuracy: result.accuracy,
      rank: result.rank,

      // 利用者のPC時刻ではなく、Firebase側の時刻を保存する
      createdAt: serverTimestamp(),
    }
  );

  // 保存済みデータを画面用キャッシュに反映し、読み直しを避ける。
  rememberSavedScore(documentReference.id, { ...result, userId: user.uid, userName });

  // 保存されたドキュメントのIDを返す
  return documentReference.id;
}
```

## 既存ファイル変更：my-app/src/components/TypingLobby.tsx

```tsx
"use client";

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
function Ranking({ language }: { language: string }) {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const rankingQuery = query(collection(db, "typingScores"),
      where("language", "==", language), orderBy("score", "desc"), limit(10));
    let active = true;
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    void loadCachedScores(scoreCacheKey("ranking", userId, language), rankingQuery).then((rows) => {
      if (!active) return;
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
      if (!active) return;
      console.error("ランキングの取得に失敗しました。", error);
      setStatus("error");
    });
    return () => { active = false; };
  }, [language, retryCount]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="ranking-title">
      <h2 id="ranking-title" className="text-xl font-bold">{language} ランキング</h2>
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

## 既存ファイル変更：my-app/src/components/TypingHistory.tsx

```tsx
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

```

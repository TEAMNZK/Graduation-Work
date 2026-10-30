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

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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

  // 保存されたドキュメントのIDを返す
  return documentReference.id;
}
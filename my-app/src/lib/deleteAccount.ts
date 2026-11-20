import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, type User } from "firebase/auth";
import { collection, doc, getDocsFromServer, limit, query, where, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SCORE_BATCH_SIZE = 400;

export async function deleteAccount(user: User, password: string) {
  if (!user.email) {
    throw new Error("メールアドレスが設定されていません。");
  }

  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));

  const profile = doc(db, "users", user.uid);
  const scores = query(
    collection(db, "typingScores"),
    where("userId", "==", user.uid),
    limit(SCORE_BATCH_SIZE),
  );

  while (true) {
    const snapshot = await getDocsFromServer(scores);
    const batch = writeBatch(db);
    for (const score of snapshot.docs) {
      batch.delete(score.ref);
    }

    if (snapshot.size < SCORE_BATCH_SIZE) {
      batch.delete(profile);
      await batch.commit();
      break;
    }

    await batch.commit();
  }

  // Keep the account available for retries if a Firestore operation fails.
  await deleteUser(user);
}

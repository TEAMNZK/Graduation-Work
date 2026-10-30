"use client";

import { useState } from "react";
import AuthPageLayout from "@/components/AuthPageLayout";
import styles from "@/components/AuthPageLayout.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userName.trim()) {
      setError("ユーザー名を入力してください。");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userName,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        userName: userName,
        createdAt: serverTimestamp(),
        progress: {
          completedDrills: 0,
          correctAnswers: 0,
          studyingLanguages: [],
          solvedTopics: [],
          lastSolvedTopic: "",
          lastSolvedLanguage: "",
        },
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      setError("新規登録に失敗しました。入力内容を確認してください。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout mode="signup">
      <form onSubmit={handleSignup} className={styles.form} aria-busy={isLoading}>
          <div className={styles.field}>
            <label htmlFor="signup-name">ユーザー名</label>
            <input id="signup-name" name="userName" type="text" autoComplete="nickname" placeholder="ユーザー名を入力" value={userName} onChange={(e) => setUserName(e.target.value)} required disabled={isLoading} />
          </div>
          <div className={styles.field}>
            <label htmlFor="signup-email">メールアドレス</label>
            <input id="signup-email" name="email" type="email" autoComplete="username" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
          </div>
          <div className={styles.field}>
            <label htmlFor="signup-password">パスワード</label>
            <input id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="6文字以上のパスワード" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} minLength={6} />
          </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button type="submit" disabled={isLoading} className={styles.submit}>
          {isLoading ? "登録中..." : "新規登録"}<span aria-hidden="true">→</span>
        </button>
      </form>
    </AuthPageLayout>
  );
}

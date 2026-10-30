"use client";

import { useState } from "react";
import AuthPageLayout from "@/components/AuthPageLayout";
import styles from "@/components/AuthPageLayout.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError("ログインに失敗しました。メールアドレスまたはパスワードを確認してください。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout mode="login">
      <form onSubmit={handleLogin} className={styles.form} aria-busy={isLoading}>
          <div className={styles.field}>
            <label htmlFor="login-email">メールアドレス</label>
            <input id="login-email" name="email" type="email" autoComplete="username" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
          </div>
          <div className={styles.field}>
            <label htmlFor="login-password">パスワード</label>
            <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="パスワードを入力" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
          </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button type="submit" disabled={isLoading} className={styles.submit}>
          {isLoading ? "ログイン中..." : "ログイン"}<span aria-hidden="true">→</span>
        </button>
      </form>
    </AuthPageLayout>
  );
}

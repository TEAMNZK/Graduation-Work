"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import AuthPageLayout from "@/components/AuthPageLayout";
import styles from "@/components/AuthPageLayout.module.css";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const router = useRouter();

  const switchMode = () => {
    setIsResetting(!isResetting);
    setError("");
    setPassword("");
    setResetRequested(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetRequested(false);
    setIsLoading(true);

    try {
      auth.languageCode = "ja";
      await sendPasswordResetEmail(auth, email.trim());
      setResetRequested(true);
    } catch (err: unknown) {
      if (err instanceof FirebaseError && err.code === "auth/user-not-found") {
        setResetRequested(true);
      } else {
        setError("再設定メールの送信リクエストに失敗しました。時間をおいてもう一度お試しください。");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
    <AuthPageLayout mode={isResetting ? "reset" : "login"}>
      <form onSubmit={isResetting ? handlePasswordReset : handleLogin} className={styles.form} aria-busy={isLoading}>
        <div className={styles.field}>
          <label htmlFor="login-email">メールアドレス</label>
          <input id="login-email" name="email" type="email" autoComplete="username" placeholder="example@mail.com" value={email} onChange={(e) => {
            setEmail(e.target.value);
            if (isResetting) {
              setResetRequested(false);
              setError("");
            }
          }} required disabled={isLoading} />
        </div>
        {!isResetting && (
          <div className={styles.field}>
            <label htmlFor="login-password">パスワード</label>
            <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="パスワードを入力" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
          </div>
        )}
        <button type="button" onClick={switchMode} disabled={isLoading} className={styles.resetLink}>
          {isResetting ? "ログインに戻る" : "パスワードをお忘れですか？"}
        </button>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {resetRequested && (
          <p className={styles.status} role="status">
            入力したメールアドレスが登録されている場合、再設定リンクが届きます。メールが見つからない場合は、迷惑メールフォルダもご確認ください。
          </p>
        )}
        <button type="submit" disabled={isLoading} className={styles.submit}>
          {isResetting
            ? (isLoading ? "送信中..." : "再設定メールを送る")
            : (isLoading ? "ログイン中..." : "ログイン")}
        </button>
      </form>
    </AuthPageLayout>
  );
}

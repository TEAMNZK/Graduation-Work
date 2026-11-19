import type { ReactNode } from "react";
import Link from "next/link";
import PublicPageLayout from "./PublicPageLayout";
import styles from "./AuthPageLayout.module.css";

export default function AuthPageLayout({ mode, children }: { mode: "login" | "signup" | "reset"; children: ReactNode }) {
  const isSignup = mode === "signup";
  return (
    <PublicPageLayout currentPage={isSignup ? "signup" : mode === "login" ? "login" : undefined}>
      <section className={styles.card} aria-labelledby="auth-title">
        <h2 id="auth-title">{mode === "reset" ? "パスワードの再設定" : isSignup ? "新規登録" : "ログイン"}</h2>
        {mode === "reset" && (
          <p className={styles.intro}>登録したメールアドレスを入力してください。届いたメールのリンクから、新しいパスワードを設定できます。</p>
        )}
        {children}
        <div className={styles.divider}><span>{isSignup ? "すでにアカウントをお持ちの方" : "アカウントをお持ちでない方"}</span></div>
        <Link href={isSignup ? "/login" : "/signup"} className={styles.alternate}>{isSignup ? "ログインはこちら" : "新しいアカウントを作成"}</Link>
      </section>
    </PublicPageLayout>
  );
}

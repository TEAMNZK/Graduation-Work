import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.png";
import styles from "./AuthPageLayout.module.css";

export default function AuthPageLayout({ mode, children }: { mode: "login" | "signup"; children: ReactNode }) {
  const isSignup = mode === "signup";
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Code Lord Note ホーム">
          <Image src={logo} alt="CodeLoadNote" sizes="(max-width: 760px) 65vw, 510px" preload />
        </Link>
        <Link href={isSignup ? "/login" : "/signup"} className={styles.headerLink}>{isSignup ? "ログイン" : "新規登録"}<span aria-hidden="true">↗</span></Link>
      </header>
      <section className={styles.content}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>{isSignup ? "ここから始まる、あなたの学び" : "今日も、一歩先の自分へ"}</p>
          <h1>書いて、学んで、<br /><span>Codeの王様へ。</span></h1>
          <p className={styles.description}>{isSignup ? <>プログラミングの基礎から実践まで。<br />成長の道筋を、あなただけのノートに。</> : <>昨日の続きを、今日の一歩に。<br />あなたのペースで、学びを続けましょう。</>}</p>
          <div className={styles.note}><span aria-hidden="true">✦</span> {isSignup ? "学習進捗や解いた問題を記録できます" : "積み重ねた学びが、次の力になる"}</div>
        </div>
        <div className={styles.card}>
          <p className={styles.kicker}>{isSignup ? "START YOUR JOURNEY" : "WELCOME BACK"}</p>
          <h2>{isSignup ? "新規登録" : "ログイン"}</h2>
          <p className={styles.intro}>{isSignup ? "アカウントを作成して、学びを始めましょう。" : "アカウントにログインして、学びの続きを。"}</p>
          {children}
          <div className={styles.divider}><span>{isSignup ? "すでにアカウントをお持ちの方" : "アカウントをお持ちでない方"}</span></div>
          <Link href={isSignup ? "/login" : "/signup"} className={styles.alternate}>{isSignup ? "ログインはこちら" : "新しいアカウントを作成"}<span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <footer className={styles.footer}><span>Code Lord Note</span><Link href="/">トップページへ戻る <span aria-hidden="true">↗</span></Link></footer>
    </main>
  );
}

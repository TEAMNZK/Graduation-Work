import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import styles from "@/app/home.module.css";

export default function PublicPageLayout({
  currentPage,
  heroActions,
  children,
}: {
  currentPage?: "login" | "signup";
  heroActions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <main className={children ? `${styles.page} ${styles.authPage}` : styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Code Lord Note ホーム">
          <Image src={logo} alt="Code Lord Note" sizes="(max-width: 700px) 88vw, 510px" preload className={styles.logo} />
        </Link>
        {children && (
          <nav className={styles.navigation} aria-label="アカウント">
            <Link href="/login" className={styles.login} aria-current={currentPage === "login" ? "page" : undefined}>ログイン</Link>
            <Link href="/signup" className={styles.signup} aria-current={currentPage === "signup" ? "page" : undefined}>新規登録</Link>
          </nav>
        )}
      </header>
      <div className={children ? `${styles.content} ${styles.withForm}` : styles.content}>
        <section className={styles.hero}>
          <h1>書いて、学んで、<br /><span>Codeの王様へ。</span></h1>
          <p>CodeLordNoteは、プログラミングの基礎から実践まで、<br className={styles.desktopBreak} />あなたの成長の道筋をノートに記録しながら<br className={styles.desktopBreak} />学べる学習サイトです。</p>
          {heroActions}
        </section>
        {children}
      </div>
    </main>
  );
}

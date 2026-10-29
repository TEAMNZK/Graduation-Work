import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Code Lord Note ホーム">
          <Image src={logo} alt="CodeLoadNote" sizes="(max-width: 700px) 88vw, 510px" preload className={styles.logo} />
        </Link>
        <nav className={styles.navigation} aria-label="アカウント">
          <Link href="/login" className={styles.login}>ログイン</Link>
          <Link href="/signup" className={styles.signup}>新規登録</Link>
        </nav>
      </header>
      <section className={styles.hero}>
        <h1>書いて、学んで、<br /><span>Codeの王様へ。</span></h1>
        <p>CodeLordNoteは、プログラミングの基礎から実践まで、<br className={styles.desktopBreak} />あなたの成長の道筋をノートに記録しながら<br className={styles.desktopBreak} />学べる学習サイトです。</p>
        <div className={styles.actions}>
          <Link href="/login" className={styles.login}>ログイン</Link>
          <Link href="/signup" className={styles.signup}>新規登録</Link>
        </div>
      </section>
    </main>
  );
}

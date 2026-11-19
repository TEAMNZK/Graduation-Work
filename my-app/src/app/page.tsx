import Link from "next/link";
import PublicPageLayout from "@/components/PublicPageLayout";
import styles from "./home.module.css";

export default function Home() {
  return (
    <PublicPageLayout heroActions={
      <div className={styles.actions}>
        <Link href="/login" className={styles.login}>ログイン</Link>
        <Link href="/signup" className={styles.signup}>新規登録</Link>
      </div>
    } />
  );
}

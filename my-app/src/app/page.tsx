import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--app-bg)] p-8 text-[var(--app-text)]">
      <h1 className="text-4xl font-bold">Code Shepherd</h1>

      <p className="text-center text-[var(--app-muted)]">
        プログラミング言語学習支援システム
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-[var(--app-accent)] px-6 py-3 text-white hover:bg-[var(--app-accent-hover)]"
        >
          ログイン
        </Link>

        <Link
          href="/signup"
          className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-6 py-3 text-[var(--app-text)] hover:bg-[var(--app-surface-soft)]"
        >
          新規登録
        </Link>
      </div>
    </main>
  );
}

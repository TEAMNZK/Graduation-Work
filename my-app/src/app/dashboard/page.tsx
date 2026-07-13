"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardPage() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[var(--app-bg)] p-8 text-[var(--app-text)]">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--app-accent)]">
                Code Shepherd
              </p>
              <h1 className="mt-2 text-3xl font-bold">ダッシュボード</h1>
              <p className="mt-2 text-[var(--app-muted)]">
                ログイン済みユーザー向けの学習ページです。
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-fit rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-2 text-sm font-medium hover:bg-[var(--app-surface-soft)]"
            >
              ログアウト
            </button>
          </header>

          <section className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm">
            <h2 className="text-xl font-semibold">教科書</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
              準備済みの本文ファイルを一覧から選んで読めます。
            </p>
            <Link
              href="/textbook"
              className="mt-4 inline-flex rounded-lg bg-[var(--app-accent)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--app-accent-hover)]"
            >
              教科書を開く
            </Link>
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}

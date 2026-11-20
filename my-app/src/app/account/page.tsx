"use client";

import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import AppHeader from "@/components/AppHeader";
import AuthGuard from "@/components/AuthGuard";
import { auth } from "@/lib/firebase";
import { deleteAccount } from "@/lib/deleteAccount";

export default function AccountPage() {
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isDeleting || !confirmed || !password) return;

    const user = auth.currentUser;
    if (!user) {
      setError("本人確認のため、ログインし直してください。");
      return;
    }

    setError("");
    setIsDeleting(true);
    try {
      await deleteAccount(user, password);
      window.location.replace("/login");
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : "";
      if (["auth/wrong-password", "auth/invalid-credential", "auth/invalid-login-credentials"].includes(code)) {
        setError("パスワードを確認してください。");
      } else {
        setError("アカウントの削除を完了できませんでした。削除済みのデータは復元できません。ログインできる場合は、ここから削除を再試行できます。");
      }
      setPassword("");
      setIsDeleting(false);
    }
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <AppHeader title="アカウント設定" showBack />
        <div className="mx-auto max-w-3xl px-6 py-8">
          <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm" aria-labelledby="delete-account-title">
            <h2 id="delete-account-title" className="text-xl font-bold">アカウントを削除</h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              アカウント、学習進捗、タイピング履歴・ランキングの記録が削除されます。削除したデータは復元できません。
            </p>
            <form onSubmit={handleDelete} aria-busy={isDeleting} className="mt-6 space-y-4">
              <div>
                <label htmlFor="delete-account-password" className="mb-2 block font-semibold">本人確認のためのパスワード</label>
                <input
                  id="delete-account-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isDeleting}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  required
                  disabled={isDeleting}
                  className="mt-1 h-4 w-4 shrink-0 accent-red-700"
                />
                削除したデータを復元できないことを理解し、アカウントの削除に同意します。
              </label>
              {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
              <button
                type="submit"
                disabled={isDeleting || !confirmed || !password}
                className="rounded-lg bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "削除中..." : "アカウントを完全に削除する"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}

"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "不明なエラーが発生しました";
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (caughtError) {
      setError(`ログインに失敗しました: ${getErrorMessage(caughtError)}`);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--app-bg)] p-8 text-[var(--app-text)]">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <div>
          <p className="text-sm font-medium text-[var(--app-accent)]">
            Code Shepherd
          </p>
          <h1 className="mt-2 text-3xl font-bold">ログイン</h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="grid gap-4 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-sm"
        >
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-[var(--app-text)]"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-[var(--app-text)]"
          />
          <button
            type="submit"
            className="rounded-lg bg-[var(--app-accent)] px-5 py-3 font-medium text-white hover:bg-[var(--app-accent-hover)]"
          >
            ログイン
          </button>
        </form>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </main>
  );
}

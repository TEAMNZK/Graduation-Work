"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError("ログインに失敗しました。メールアドレスまたはパスワードを確認してください。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-blue-50 p-10 lg:p-14">
            <p className="mb-3 text-sm font-bold tracking-widest text-blue-700">
              CODE LORD NOTE
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              プログラミング学習を、
              <br />
              もっと分かりやすく。
            </h1>
            <p className="mt-6 text-base leading-8 text-gray-600">
              教科書、ドリル、記事、タイピング練習を
              <br />
              ひとつにまとめた学習支援システムです。
            </p>

            <div className="mt-10 space-y-3">
              <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-gray-600">
                ・学習進捗を自動で記録
              </div>
              <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-gray-600">
                ・問題演習とコード実行に対応
              </div>
              <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-gray-600">
                ・初学者でも迷いにくい画面設計
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-10 lg:p-14">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold">ログイン</h2>
              <p className="mt-2 text-sm text-gray-500">
                登録済みのアカウントでログインしてください。
              </p>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    パスワード
                  </label>
                  <input
                    type="password"
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {isLoading ? "ログイン中..." : "ログイン"}
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-600">
                アカウントをお持ちでない方は{" "}
                <Link href="/signup" className="font-bold text-blue-600 hover:underline">
                  新規登録
                </Link>
              </p>

              <p className="mt-3 text-sm text-gray-600">
                <Link href="/" className="hover:underline">
                  トップページへ戻る
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
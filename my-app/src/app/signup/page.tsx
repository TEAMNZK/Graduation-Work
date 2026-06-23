"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userName.trim()) {
      setError("ユーザー名を入力してください。");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userName,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        userName: userName,
        createdAt: serverTimestamp(),
        progress: {
          completedDrills: 0,
          correctAnswers: 0,
          studyingLanguages: [],
          solvedTopics: [],
          lastSolvedTopic: "",
          lastSolvedLanguage: "",
        },
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      setError("新規登録に失敗しました。入力内容を確認してください。");
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
              学習を始めるための
              <br />
              アカウントを作成
            </h1>
            <p className="mt-6 text-base leading-8 text-gray-600">
              ユーザー登録をすると、
              <br />
              学習進捗や正答数を保存できるようになります。
            </p>

            <div className="mt-10 space-y-3">
              <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-gray-600">
                ・進捗の自動保存
              </div>
              <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-gray-600">
                ・解いた問題数の記録
              </div>
              <div className="rounded-2xl border bg-white px-4 py-3 text-sm text-gray-600">
                ・学習履歴の確認
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-10 lg:p-14">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold">新規登録</h2>
              <p className="mt-2 text-sm text-gray-500">
                必要事項を入力してアカウントを作成してください。
              </p>

              <form onSubmit={handleSignup} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    ユーザー名
                  </label>
                  <input
                    type="text"
                    placeholder="ユーザー名を入力"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                </div>

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
                  {isLoading ? "登録中..." : "新規登録"}
                </button>
              </form>

              <p className="mt-6 text-sm text-gray-600">
                すでにアカウントをお持ちの方は{" "}
                <Link href="/login" className="font-bold text-blue-600 hover:underline">
                  ログイン
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

"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthGuard from "@/components/AuthGuard";

const recommendedArticles = [
  "Python入門の始め方",
  "JavaScriptでできること",
  "初心者向けC言語の基本",
];

const rankingData = [
  { name: "ユーザーA", score: 3200 },
  { name: "ユーザーB", score: 2800 },
  { name: "ユーザーC", score: 2500 },
  { name: "ユーザーD", score: 2100 },
  { name: "ユーザーE", score: 1800 },
];

export default function DashboardPage() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        {/* ヘッダー */}
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">Code Lord Note</h1>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
              >
                ログアウト
              </button>
            </div>
          </div>

          {/* 上部メニュー */}
          <nav className="mx-auto flex max-w-7xl gap-2 px-6 pb-4">
            <button className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100">
              教科書
            </button>
            <button className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100">
              ドリル
            </button>
            <button className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100">
              記事
            </button>
            <button className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100">
              寿司打
            </button>
          </nav>
        </header>

        {/* メイン部分 */}
        <section className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-8">
          {/* 左：おすすめ記事 */}
          <aside className="col-span-12 md:col-span-2">
            <div className="rounded-2xl bg-white p-4 shadow">
              <h2 className="mb-4 text-lg font-bold">おすすめ記事</h2>
              <ul className="space-y-3">
                {recommendedArticles.map((article, index) => (
                  <li
                    key={index}
                    className="rounded-xl border bg-gray-50 px-3 py-3 text-sm hover:bg-gray-100"
                  >
                    {article}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 中央：メイン機能 */}
          <section className="col-span-12 md:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 shadow hover:shadow-md">
                <h2 className="text-2xl font-bold">教科書</h2>
                <p className="mt-3 text-sm text-gray-600">
                  各プログラミング言語の特徴や用途を学べます。
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow hover:shadow-md">
                <h2 className="text-2xl font-bold">ドリル</h2>
                <p className="mt-3 text-sm text-gray-600">
                  問題を解いて理解度を確認できます。
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow hover:shadow-md">
                <h2 className="text-2xl font-bold">記事</h2>
                <p className="mt-3 text-sm text-gray-600">
                  学習に役立つ記事や補足情報を読めます。
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow hover:shadow-md">
                <h2 className="text-2xl font-bold">寿司打</h2>
                <p className="mt-3 text-sm text-gray-600">
                  タイピング練習で入力速度を高められます。
                </p>
              </div>
            </div>
          </section>

          {/* 右：寿司打ランキング */}
          <aside className="col-span-12 md:col-span-3">
            <div className="rounded-2xl bg-white p-4 shadow">
              <h2 className="mb-4 text-lg font-bold">寿司打ランキング</h2>
              <ol className="space-y-3">
                {rankingData.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-xl border bg-gray-50 px-3 py-3"
                  >
                    <span className="font-medium">
                      {index + 1}位 {item.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {item.score} 点
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </section>
      </main>
    </AuthGuard>
  );
}
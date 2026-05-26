"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const startItems = [
  {
    title: "変数",
    children: ["変数の宣言", "データ型", "代入"],
  },
  {
    title: "if",
    children: ["if文の基本", "else", "else if"],
  },
  {
    title: "配列",
    children: ["配列の宣言", "要素の取得", "要素の更新"],
  },
  {
    title: "メソッド",
    children: ["メソッド定義", "引数", "戻り値"],
  },
];

const continueItems = [
  {
    title: "for",
    children: ["for文の基本", "繰り返し回数", "ネスト"],
  },
  {
    title: "while",
    children: ["while文の基本", "条件式", "無限ループ対策"],
  },
  {
    title: "クラス",
    children: ["クラス定義", "インスタンス生成", "フィールド"],
  },
  {
    title: "オブジェクト指向",
    children: ["カプセル化", "継承", "ポリモーフィズム"],
  },
];

export default function DrillJavaPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <h1 className="text-2xl font-bold">ドリル - Java</h1>
          </div>

          <nav className="mx-auto flex max-w-7xl gap-2 px-6 pb-4">
            <Link
              href="/dashboard"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              戻る
            </Link>
            <Link
              href="/textbook"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              教科書
            </Link>
            <Link
              href="/drill"
              className="rounded-t-lg border border-b-0 bg-white px-5 py-2 font-medium"
            >
              ドリル
            </Link>
            <Link
              href="/articles"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              記事
            </Link>
            <Link
              href="/typing"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              タイピング練習
            </Link>
          </nav>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-8">
          {/* 上部ボタンを横並び */}
          <div className="mb-6 flex flex-wrap gap-4">
            <button className="rounded-xl border bg-white px-8 py-4 text-2xl font-bold shadow hover:bg-gray-50">
              出題開始
            </button>
            <button className="rounded-xl border bg-white px-8 py-4 text-2xl font-bold shadow hover:bg-gray-50">
              続きから
            </button>
          </div>

          {/* 背景を1つに統一 */}
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* 左側 */}
              <div className="space-y-5">
                {startItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border bg-gray-50 p-5"
                  >
                    <h2 className="mb-4 text-2xl font-bold">{item.title}</h2>

                    <div className="space-y-3">
                      {item.children.map((child) => (
                        <label
                          key={child}
                          className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3 hover:bg-gray-50"
                        >
                          <input type="checkbox" className="h-4 w-4" />
                          <span className="text-lg">{child}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 右側 */}
              <div className="space-y-5">
                {continueItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border bg-gray-50 p-5"
                  >
                    <h2 className="mb-4 text-2xl font-bold">{item.title}</h2>

                    <div className="space-y-3">
                      {item.children.map((child) => (
                        <label
                          key={child}
                          className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3 hover:bg-gray-50"
                        >
                          <input type="checkbox" className="h-4 w-4" />
                          <span className="text-lg">{child}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
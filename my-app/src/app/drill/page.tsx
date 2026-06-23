"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import AppHeader from "@/components/AppHeader";

const languages = [
  {
    name: "Java",
    href: "/drill/java",
    status: "公開中",
    description: "基礎文法から小作品まで、実行しながら練習できます。",
    available: true,
  },
  {
    name: "Python",
    href: "/drill/python",
    status: "準備中",
    description: "教材データと実行環境を準備中です。",
    available: false,
  },
  {
    name: "C",
    href: "/drill/c",
    status: "準備中",
    description: "コンパイル型言語の練習メニューを準備中です。",
    available: false,
  },
  {
    name: "JavaScript",
    href: "/drill/javascript",
    status: "準備中",
    description: "ブラウザとNode.jsの基礎問題を準備中です。",
    available: false,
  },
];

export default function DrillPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <AppHeader
          title="ドリル"
          description="実行できる問題を選んで、学習内容をすぐに確認できます。"
          activeKey="drill"
          showBack
        />

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm font-medium text-blue-700">現在利用できるドリル</p>
              <h2 className="mt-2 text-2xl font-bold">Javaドリルを公開中です</h2>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                まずはJavaの基礎問題から始められます。未公開の言語は準備中として表示し、存在しないページへ移動しないようにしています。
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">公開中</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">
                {languages.filter((language) => language.available).length}
              </p>
              <p className="mt-2 text-sm text-gray-600">言語のドリルが利用できます。</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {languages.map((language) =>
              language.available ? (
                <Link
                  key={language.name}
                  href={language.href}
                  className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-bold">{language.name}</h2>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      {language.status}
                    </span>
                  </div>
                  <p className="mt-4 min-h-14 text-sm leading-7 text-gray-600">
                    {language.description}
                  </p>
                  <p className="mt-5 text-sm font-bold text-blue-600 group-hover:underline">
                    問題を選ぶ
                  </p>
                </Link>
              ) : (
                <div
                  key={language.name}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-500"
                  aria-disabled="true"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-bold text-gray-700">
                      {language.name}
                    </h2>
                    <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-bold text-gray-500">
                      {language.status}
                    </span>
                  </div>
                  <p className="mt-4 min-h-14 text-sm leading-7">
                    {language.description}
                  </p>
                  <p className="mt-5 text-sm font-bold">近日追加予定</p>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

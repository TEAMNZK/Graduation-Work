"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const languages = ["Java", "Python", "C", "JavaScript"];

export default function TextbookPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <h1 className="text-2xl font-bold">教科書</h1>
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
              className="rounded-t-lg border border-b-0 bg-white px-5 py-2 font-medium"
            >
              教科書
            </Link>
            <Link
              href="/drill"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((language) => (
              <Link
                key={language}
                href={`/textbook/${language.toLowerCase()}`}
                className="rounded-2xl bg-white p-8 text-center text-2xl font-bold shadow transition hover:bg-gray-50 hover:shadow-md"
              >
                {language}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
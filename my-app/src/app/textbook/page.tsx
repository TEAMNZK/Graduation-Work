import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import AppHeader from "@/components/AppHeader";
import { getTextbooks } from "@/lib/textbooks";

export default async function TextbookPage() {
  const textbooks = await getTextbooks();

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <AppHeader title="教科書" activeKey="textbook" showBack />

        <section className="mx-auto max-w-7xl px-6 py-8">
          {textbooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold">教科書ファイルがありません</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                textbooks フォルダに .md または .txt ファイルを入れると、
                このページに一覧表示されます。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {textbooks.map((textbook) => (
                <Link
                  key={textbook.slug}
                  href={`/textbook/${textbook.slug}`}
                  className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md"
                >
                  <p className="text-xs font-bold uppercase text-gray-400">
                    {textbook.extension.replace(".", "")}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold">{textbook.title}</h2>
                  <p className="mt-4 text-sm text-gray-600">本文を読む</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </AuthGuard>
  );
}

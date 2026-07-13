import Link from "next/link";
import { getTextbooks } from "@/lib/textbooks";

export default async function TextbookIndexPage() {
  const textbooks = await getTextbooks();

  return (
    <main className="min-h-screen bg-[var(--app-bg)] px-6 py-10 text-[var(--app-text)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-[var(--app-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--app-accent)]">
              Code Shepherd
            </p>
            <h1 className="mt-2 text-3xl font-bold">教科書</h1>
            <p className="mt-2 text-sm text-[var(--app-muted)]">
              textbooks フォルダに入れた本文ファイルをここから読めます。
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex w-fit rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-2 text-sm font-medium text-[var(--app-text)] hover:bg-[var(--app-surface-soft)]"
          >
            ダッシュボードへ
          </Link>
        </header>

        {textbooks.length === 0 ? (
          <section className="rounded-lg border border-dashed border-[var(--app-border)] bg-[var(--app-surface)] p-6">
            <h2 className="text-lg font-semibold">
              教科書ファイルがありません
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
              プロジェクト直下の textbooks フォルダに .md または .txt
              ファイルを入れると、このページに一覧表示されます。
            </p>
          </section>
        ) : (
          <section className="grid gap-3 sm:grid-cols-2">
            {textbooks.map((textbook) => (
              <Link
                key={textbook.slug}
                href={`/textbook/${textbook.slug}`}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-sm transition hover:border-[var(--app-accent)] hover:bg-[var(--app-accent-soft)]"
              >
                <p className="text-xs font-medium uppercase text-[var(--app-muted)]">
                  {textbook.extension.replace(".", "")}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-[var(--app-text)]">
                  {textbook.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--app-muted)]">
                  本文を読む
                </p>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

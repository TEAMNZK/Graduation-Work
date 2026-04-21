import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-zinc-50 p-8">
      <h1 className="text-4xl font-bold text-zinc-900">
        Code Shepherd
      </h1>

      <p className="text-center text-zinc-600">
        プログラミング言語学習支援システム
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          ログイン
        </Link>

        <Link
          href="/signup"
          className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-zinc-900 hover:bg-zinc-100"
        >
          新規登録
        </Link>
      </div>
    </main>
  );
}
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import TypingGame from "@/components/TypingGame";
import { questionsByLanguage } from "@/lib/questions";
import { notFound } from "next/navigation";

type TypingLanguagePageProps = {
  params: Promise<{
    language: string;
  }>;
};

export default async function TypingLanguagePage({
  params,
}: TypingLanguagePageProps) {
  const { language } = await params;
  const questions = questionsByLanguage[language];

  if (!questions) {
    notFound();
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <div className="mx-auto max-w-4xl px-6 pt-6">
          <Link
            href="/typing"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-50"
          >
            ← 言語選択に戻る
          </Link>
        </div>

        <TypingGame questions={questions} />
      </main>
    </AuthGuard>
  );
}
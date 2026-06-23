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
        <TypingGame questions={questions} />
      </main>
    </AuthGuard>
  );
}
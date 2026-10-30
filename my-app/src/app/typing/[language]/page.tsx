import AuthGuard from "@/components/AuthGuard";
import TypingLobby from "@/components/TypingLobby";
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
  // 定義済みの言語だけを受け付け、存在しない言語は404にする。
  if (!Object.hasOwn(questionsByLanguage, language)) {
    notFound();
  }
  const questions = questionsByLanguage[language];

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        {/* 全言語で開始前に待機画面を表示する。キャッシュも共通利用する。 */}
        <TypingLobby key={language} questions={questions} />
      </main>
    </AuthGuard>
  );
}

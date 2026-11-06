# 対応3言語の待機画面・JavaScript削除：既存ファイル変更の完成版全文

## my-app/src/app/typing/page.tsx

```tsx
import LanguageSelectionPage, {
  type LanguageCard,
} from "@/components/LanguageSelectionPage";

const languages: LanguageCard[] = [
  {
    name: "Java",
    href: "/typing/java",
    status: "公開中",
    description: "Javaのコード入力で、構文に慣れながら練習できます。",
    available: true,
    actionLabel: "練習を始める",
  },
  {
    name: "Python",
    href: "/typing/python",
    status: "公開中",
    description: "Pythonの短いコードを使って、入力速度を高められます。",
    available: true,
    actionLabel: "練習を始める",
  },
  {
    name: "C",
    href: "/typing/c",
    status: "公開中",
    description: "C言語の基本コードで、記号や型の入力に慣れられます。",
    available: true,
    actionLabel: "練習を始める",
  },
];

export default function TypingPage() {
  return (
    <LanguageSelectionPage
      title="タイピング練習"
      description="練習したい言語を選んで、コード入力の速度と正確さを高められます。"
      activeKey="typing"
      highlightLabel="現在利用できるタイピング練習"
      highlightTitle="3言語のタイピング練習を公開中です"
      highlightDescription="Java、Python、Cの短いコードを使って、制限時間内にどれだけ正確に入力できるか練習できます。"
      countLabel="公開中"
      countDescription="言語のタイピング練習が利用できます。"
      languages={languages}
    />
  );
}

```

## my-app/src/app/typing/[language]/page.tsx

```tsx
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

```

## my-app/src/lib/questions.ts

```tsx
export type Question = {
  id: number;
  language: string;
  text: string;
  level?: number;
};

export const questionsByLanguage: Record<string, Question[]> = {
  java: [
    {
      id: 1,
      language: "Java",
      text: 'System.out.println("Hello World");',
      level: 1,
    },
    {
      id: 2,
      language: "Java",
      text: "int score = 0;",
      level: 1,
    },
    {
      id: 3,
      language: "Java",
      text: "if (x > 10) { return x; }",
      level: 2,
    },
  ],
  python: [
    {
      id: 1,
      language: "Python",
      text: "print('Hello World')",
      level: 1,
    },
    {
      id: 2,
      language: "Python",
      text: "score = 0",
      level: 1,
    },
    {
      id: 3,
      language: "Python",
      text: "if x > 10:",
      level: 2,
    },
  ],
  c: [
    {
      id: 1,
      language: "C",
      text: 'printf("Hello World");',
      level: 1,
    },
    {
      id: 2,
      language: "C",
      text: "int score = 0;",
      level: 1,
    },
    {
      id: 3,
      language: "C",
      text: "if (x > 10) { return x; }",
      level: 2,
    },
  ],
};
```

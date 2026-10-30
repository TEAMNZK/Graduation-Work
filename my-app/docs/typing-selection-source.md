# タイピング言語選択画面の紹介枠削除：完成版全文

## 既存ファイル変更：my-app/src/components/LanguageSelectionPage.tsx

```tsx
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import AppHeader from "@/components/AppHeader";

type NavKey = "textbook" | "drill" | "articles" | "typing";

export type LanguageCard = {
  name: string;
  href: string;
  status: string;
  description: string;
  available: boolean;
  actionLabel: string;
};

type LanguageSelectionPageProps = {
  title: string;
  description: string;
  activeKey: NavKey;
  showSummary?: boolean;
  highlightLabel: string;
  highlightTitle: string;
  highlightDescription: string;
  countLabel: string;
  countDescription: string;
  languages: LanguageCard[];
};

export default function LanguageSelectionPage({
  title,
  description,
  activeKey,
  showSummary = true,
  highlightLabel,
  highlightTitle,
  highlightDescription,
  countLabel,
  countDescription,
  languages,
}: LanguageSelectionPageProps) {
  const availableCount = languages.filter((language) => language.available).length;

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <AppHeader
          title={title}
          description={description}
          activeKey={activeKey}
          showBack
        />

        <section className="mx-auto max-w-7xl px-6 py-8">
          {/* 紹介・公開数の枠は画面ごとに表示を切り替える */}
          {showSummary && (
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm font-medium text-blue-700">
                {highlightLabel}
              </p>
              <h2 className="mt-2 text-2xl font-bold">{highlightTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                {highlightDescription}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">{countLabel}</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">
                {availableCount}
              </p>
              <p className="mt-2 text-sm text-gray-600">{countDescription}</p>
            </div>
          </div>

          )}

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
                    {language.actionLabel}
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

```

## 既存ファイル変更：my-app/src/app/typing/page.tsx

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
      showSummary={false}
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

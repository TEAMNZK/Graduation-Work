import LanguageSelectionPage, {
  type LanguageCard,
} from "@/components/LanguageSelectionPage";
import { getTextbooks } from "@/lib/textbooks";

export default async function TextbookPage() {
  const textbooks = await getTextbooks();
  const hasJavaTextbooks = textbooks.length > 0;

  const languages: LanguageCard[] = [
    {
      name: "Java",
      href: "/textbook/java",
      status: hasJavaTextbooks ? "公開中" : "準備中",
      description: hasJavaTextbooks
        ? "基礎文法から応用項目まで、Javaの教科書を順番に読めます。"
        : "教科書データを準備中です。",
      available: hasJavaTextbooks,
      actionLabel: "教科書を読む",
    },
    {
      name: "Python",
      href: "/textbook/python",
      status: "準備中",
      description: "Pythonの基礎教科書を準備中です。",
      available: false,
      actionLabel: "教科書を読む",
    },
    {
      name: "C",
      href: "/textbook/c",
      status: "準備中",
      description: "C言語の基礎教科書を準備中です。",
      available: false,
      actionLabel: "教科書を読む",
    },
    {
      name: "JavaScript",
      href: "/textbook/javascript",
      status: "準備中",
      description: "JavaScriptの基礎教科書を準備中です。",
      available: false,
      actionLabel: "教科書を読む",
    },
  ];

  return (
    <LanguageSelectionPage
      title="教科書"
      description="読みたい言語を選んで、基礎から順番に学習できます。"
      activeKey="textbook"
      highlightLabel="現在利用できる教科書"
      highlightTitle={
        hasJavaTextbooks
          ? "Java教科書を公開中です"
          : "教科書データを準備中です"
      }
      highlightDescription={
        hasJavaTextbooks
          ? "統合したJavaの本文データを、言語選択から開けるようにしました。未公開の言語は準備中として表示しています。"
          : "textbooks フォルダに本文ファイルを追加すると、Java教科書として表示されます。"
      }
      countLabel="公開中"
      countDescription="言語の教科書が利用できます。"
      languages={languages}
    />
  );
}

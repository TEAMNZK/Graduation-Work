import LanguageSelectionPage, {
  type LanguageCard,
} from "@/components/LanguageSelectionPage";

const languages: LanguageCard[] = [
  {
    name: "Java",
    href: "/articles/java",
    status: "準備中",
    description: "Javaの学習記事を準備中です。",
    available: false,
    actionLabel: "記事を読む",
  },
  {
    name: "Python",
    href: "/articles/python",
    status: "準備中",
    description: "Pythonの学習記事を準備中です。",
    available: false,
    actionLabel: "記事を読む",
  },
  {
    name: "C",
    href: "/articles/c",
    status: "準備中",
    description: "C言語の学習記事を準備中です。",
    available: false,
    actionLabel: "記事を読む",
  },
  {
    name: "JavaScript",
    href: "/articles/javascript",
    status: "準備中",
    description: "JavaScriptの学習記事を準備中です。",
    available: false,
    actionLabel: "記事を読む",
  },
];

export default function ArticlesPage() {
  return (
    <LanguageSelectionPage
      title="記事"
      description="読みたい言語を選んで、補足記事や学習メモを確認できます。"
      activeKey="articles"
      highlightLabel="現在利用できる記事"
      highlightTitle="記事ページを準備中です"
      highlightDescription="記事データはまだ未公開のため、言語カードは準備中として表示しています。公開後はここから言語別の記事へ移動できます。"
      countLabel="公開中"
      countDescription="言語の記事が利用できます。"
      languages={languages}
    />
  );
}

import LanguageSelectionPage, {
  type LanguageCard,
} from "@/components/LanguageSelectionPage";

const languages: LanguageCard[] = [
  {
    name: "Java",
    href: "/drill/java",
    status: "公開中",
    description: "基礎文法から小作品まで、実行しながら練習できます。",
    available: true,
    actionLabel: "問題を選ぶ",
  },
  {
    name: "Python",
    href: "/drill/python",
    status: "公開中",
    description: "基礎文法から成績集計アプリまで、実行しながら練習できます。",
    available: true,
    actionLabel: "問題を選ぶ",
  },
  {
    name: "C",
    href: "/drill/c",
    status: "公開中",
    description: "入力・配列・関数・ポインタ・構造体まで練習できます。",
    available: true,
    actionLabel: "問題を選ぶ",
  },
  {
    name: "JavaScript",
    href: "/drill/javascript",
    status: "準備中",
    description: "ブラウザとNode.jsの基礎問題を準備中です。",
    available: false,
    actionLabel: "問題を選ぶ",
  },
];

export default function DrillPage() {
  return (
    <LanguageSelectionPage
      title="ドリル"
      description="実行できる問題を選んで、学習内容をすぐに確認できます。"
      activeKey="drill"
      highlightLabel="現在利用できるドリル"
      highlightTitle="Java・Python・C言語ドリルを公開中です"
      highlightDescription="Java・Python・C言語の基礎問題から始められます。未公開の言語は準備中として表示し、存在しないページへ移動しないようにしています。"
      countLabel="公開中"
      countDescription="言語のドリルが利用できます。"
      languages={languages}
    />
  );
}

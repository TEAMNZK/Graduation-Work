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
  {
    name: "JavaScript",
    href: "/typing/javascript",
    status: "公開中",
    description: "JavaScriptのコード入力を通して、頻出構文を練習できます。",
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
      highlightTitle="4言語のタイピング練習を公開中です"
      highlightDescription="Java、Python、C、JavaScriptの短いコードを使って、制限時間内にどれだけ正確に入力できるか練習できます。"
      countLabel="公開中"
      countDescription="言語のタイピング練習が利用できます。"
      languages={languages}
    />
  );
}

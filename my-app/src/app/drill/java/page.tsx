"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { javaQuestionMap } from "@/data/javaQuestions";

const startItems = [
  {
    title: "変数",
    children: ["変数の宣言", "データ型", "代入"],
  },
  {
    title: "if",
    children: ["if文の基本"],
  },
  {
    title: "配列",
    children: ["配列の宣言", "要素の取得", "要素の更新"],
  },
  {
    title: "メソッド",
    children: ["メソッド定義", "引数", "戻り値"],
  },
];

const continueItems = [
  {
    title: "for",
    children: ["for文の基本", "繰り返し回数", "ネスト"],
  },
  {
    title: "while",
    children: ["while文の基本", "条件式", "無限ループ対策"],
  },
  {
    title: "クラス",
    children: ["クラス定義", "インスタンス生成", "フィールド"],
  },
  {
    title: "オブジェクト指向",
    children: ["カプセル化", "継承", "ポリモーフィズム"],
  },
];

const STORAGE_KEY = "drill-java-session";

type DrillSession = {
  selectedTopics: string[];
  currentIndex: number;
  isInProgress: boolean;
};

export default function DrillJavaPage() {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [hasResumeData, setHasResumeData] = useState(false);
  const [resumeMessage, setResumeMessage] = useState("");

  const validQuestionTitles = useMemo(
    () => new Set(Object.keys(javaQuestionMap)),
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed: DrillSession = JSON.parse(saved);
      if (parsed.isInProgress && parsed.selectedTopics.length > 0) {
        setHasResumeData(true);
        setResumeMessage("前回中断した問題があります。");
      }
    } catch (error) {
      console.error("保存データの読み込みに失敗しました:", error);
    }
  }, []);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic]
    );
  };

  const handleStart = () => {
    if (selectedTopics.length === 0) {
      alert("少なくとも1つ以上の小項目を選択してください。");
      return;
    }

    const filteredTopics = selectedTopics.filter((topic) =>
      validQuestionTitles.has(topic)
    );

    if (filteredTopics.length === 0) {
      alert("出題可能な問題が選択されていません。");
      return;
    }

    const session: DrillSession = {
      selectedTopics: filteredTopics,
      currentIndex: 0,
      isInProgress: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    router.push("/drill/java/start");
  };

  const handleResume = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      alert("再開できる問題がありません。");
      return;
    }

    try {
      const parsed: DrillSession = JSON.parse(saved);
      if (!parsed.isInProgress || parsed.selectedTopics.length === 0) {
        alert("再開できる問題がありません。");
        return;
      }

      router.push("/drill/java/start");
    } catch (error) {
      console.error("保存データの読み込みに失敗しました:", error);
      alert("保存データの読み込みに失敗しました。");
    }
  };

  const renderTopicGroup = (
    items: { title: string; children: string[] }[]
  ) => {
    return items.map((item) => (
      <div
        key={item.title}
        className="rounded-2xl border bg-gray-50 p-5"
      >
        <h2 className="mb-4 text-2xl font-bold">{item.title}</h2>

        <div className="space-y-3">
          {item.children.map((child) => {
            const exists = validQuestionTitles.has(child);

            return (
              <label
                key={child}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                  exists
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selectedTopics.includes(child)}
                  onChange={() => toggleTopic(child)}
                  disabled={!exists}
                />
                <span className="text-lg">{child}</span>
                {!exists && (
                  <span className="ml-auto text-sm">未実装</span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <h1 className="text-2xl font-bold">ドリル - Java</h1>
          </div>

          <nav className="mx-auto flex max-w-7xl gap-2 px-6 pb-4">
            <Link
              href="/dashboard"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              戻る
            </Link>
            <Link
              href="/textbook"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              教科書
            </Link>
            <Link
              href="/drill"
              className="rounded-t-lg border border-b-0 bg-white px-5 py-2 font-medium"
            >
              ドリル
            </Link>
            <Link
              href="/articles"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              記事
            </Link>
            <Link
              href="/typing"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              タイピング練習
            </Link>
          </nav>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-8">
          {hasResumeData && (
            <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-yellow-800">
              {resumeMessage}
            </div>
          )}

          <div className="mb-6 flex flex-wrap gap-4">
            <button
              onClick={handleStart}
              className="rounded-xl border bg-white px-8 py-4 text-2xl font-bold shadow hover:bg-gray-50"
            >
              出題開始
            </button>
            <button
              onClick={handleResume}
              className="rounded-xl border bg-white px-8 py-4 text-2xl font-bold shadow hover:bg-gray-50"
            >
              続きから
            </button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-5">{renderTopicGroup(startItems)}</div>
              <div className="space-y-5">{renderTopicGroup(continueItems)}</div>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
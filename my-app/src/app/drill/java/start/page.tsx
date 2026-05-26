"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "drill-java-session";

type DrillSession = {
  selectedTopics: string[];
  currentIndex: number;
  isInProgress: boolean;
};

export default function DrillJavaStartPage() {
  const router = useRouter();
  const [session, setSession] = useState<DrillSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      router.push("/drill/java");
      return;
    }

    try {
      const parsed: DrillSession = JSON.parse(saved);

      if (!parsed.selectedTopics || parsed.selectedTopics.length === 0) {
        router.push("/drill/java");
        return;
      }

      setSession(parsed);
    } catch (error) {
      console.error("保存データの読み込みに失敗しました:", error);
      router.push("/drill/java");
    }
  }, [router]);

  const handleNext = () => {
    if (!session) return;

    const nextIndex = session.currentIndex + 1;

    if (nextIndex >= session.selectedTopics.length) {
      const completedSession: DrillSession = {
        ...session,
        currentIndex: 0,
        isInProgress: false,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSession));
      alert("すべての選択問題が終了しました。");
      router.push("/drill/java");
      return;
    }

    const updatedSession: DrillSession = {
      ...session,
      currentIndex: nextIndex,
      isInProgress: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSession));
    setSession(updatedSession);
  };

  const handleInterrupt = () => {
    if (!session) return;

    const interruptedSession: DrillSession = {
      ...session,
      isInProgress: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(interruptedSession));
    router.push("/drill/java");
  };

  if (!session) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-gray-100 p-8">
          <p>読み込み中...</p>
        </main>
      </AuthGuard>
    );
  }

  const currentTopic = session.selectedTopics[session.currentIndex];

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <h1 className="text-2xl font-bold">Java ドリル出題画面</h1>
          </div>

          <nav className="mx-auto flex max-w-7xl gap-2 px-6 pb-4">
            <Link
              href="/drill/java"
              className="rounded-t-lg border border-b-0 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              戻る
            </Link>
          </nav>
        </header>

        <section className="mx-auto max-w-4xl px-6 py-10">
          <div className="rounded-2xl bg-white p-8 shadow">
            <p className="mb-3 text-sm text-gray-500">
              {session.currentIndex + 1} / {session.selectedTopics.length}
            </p>

            <h2 className="mb-6 text-3xl font-bold">{currentTopic}</h2>

            <div className="rounded-xl border bg-gray-50 p-6">
              <p className="text-lg">
                ここに「{currentTopic}」の問題文を表示します。
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleNext}
                className="rounded-xl border bg-white px-6 py-3 font-bold shadow hover:bg-gray-50"
              >
                次の問題へ
              </button>

              <button
                onClick={handleInterrupt}
                className="rounded-xl border bg-white px-6 py-3 font-bold shadow hover:bg-gray-50"
              >
                中断して戻る
              </button>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
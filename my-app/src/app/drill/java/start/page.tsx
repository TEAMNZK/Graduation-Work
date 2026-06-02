"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { javaQuestionMap } from "@/data/javaQuestions";

const STORAGE_KEY = "drill-java-session";

type DrillSession = {
  selectedTopics: string[];
  currentIndex: number;
  isInProgress: boolean;
};

type ExecuteApiSuccessResponse = {
  success: true;
  stdout: string;
  stderr: string;
  exitCode: number;
};

type ExecuteApiErrorResponse = {
  success: false;
  error: string;
};

type ExecuteApiResponse = ExecuteApiSuccessResponse | ExecuteApiErrorResponse;

export default function DrillJavaStartPage() {
  const router = useRouter();
  const [session, setSession] = useState<DrillSession | null>(null);
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [output, setOutput] = useState("");
  const [errorOutput, setErrorOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [judgeMessage, setJudgeMessage] = useState("");
  const [isProgressUpdated, setIsProgressUpdated] = useState(false);

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

      const currentTopic = parsed.selectedTopics[parsed.currentIndex];
      const currentQuestion = javaQuestionMap[currentTopic];

      if (currentQuestion) {
        setCode(currentQuestion.starterCode);
      } else {
        setCode(`public class Main {
  public static void main(String[] args) {
    
  }
}`);
      }

      setIsProgressUpdated(false);
    } catch (error) {
      console.error("保存データの読み込みに失敗しました:", error);
      router.push("/drill/java");
    }
  }, [router]);

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
  const currentQuestion = javaQuestionMap[currentTopic] ?? {
    title: currentTopic,
    description: `ここに「${currentTopic}」の問題文を表示します。`,
    hint: "ここにヒントを表示します。",
    expectedOutput: "ここに期待する出力",
    starterCode: code,
  };

  const normalizeOutput = (text: string) => {
    return text.replace(/\r\n/g, "\n").trim();
  };

  const updateProgressInFirestore = async (topic: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    const solvedTopics =
      userSnap.exists() && Array.isArray(userSnap.data()?.progress?.solvedTopics)
        ? userSnap.data()?.progress?.solvedTopics
        : [];

    const alreadySolved = solvedTopics.includes(topic);

    if (alreadySolved) {
      return false;
    }

    await setDoc(
      userRef,
      {
        uid: currentUser.uid,
        email: currentUser.email ?? "",
        progress: {
          correctAnswers: increment(1),
          completedDrills: increment(1),
          lastSolvedTopic: topic,
          lastSolvedLanguage: "java",
          updatedAt: serverTimestamp(),
          solvedTopics: arrayUnion(topic),
        },
      },
      { merge: true }
    );

    return true;
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    setErrorOutput("");
    setIsCorrect(false);
    setJudgeMessage("");

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "java",
          code,
          stdin,
        }),
      });

      const data = (await response.json()) as ExecuteApiResponse;

      if (!response.ok || !data.success) {
        setErrorOutput(
          data.success === false ? data.error : "コード実行に失敗しました。"
        );
        setJudgeMessage("不正解です。");
        return;
      }

      const stdout = data.stdout || "";
      const stderr = data.stderr || "";

      setOutput(stdout);
      setErrorOutput(stderr);

      if (stderr) {
        setIsCorrect(false);
        setJudgeMessage("実行エラーがあります。");
        return;
      }

      const actual = normalizeOutput(stdout);
      const expected = normalizeOutput(currentQuestion.expectedOutput);

      if (actual === expected) {
        setIsCorrect(true);

        if (!isProgressUpdated) {
          try {
            const updated = await updateProgressInFirestore(currentTopic);
            setIsProgressUpdated(true);

            if (updated) {
              setJudgeMessage("正解です。進捗を保存しました。");
            } else {
              setJudgeMessage("正解です。すでに保存済みの問題です。");
            }
          } catch (error) {
            console.error("進捗の保存に失敗しました:", error);
            setJudgeMessage("正解ですが、進捗の保存に失敗しました。");
          }
        } else {
          setJudgeMessage("正解です。");
        }
      } else {
        setIsCorrect(false);
        setJudgeMessage("不正解です。出力結果を確認してください。");
      }
    } catch (error) {
      console.error("実行API呼び出しエラー:", error);
      setErrorOutput("コード実行APIの呼び出しに失敗しました。");
      setIsCorrect(false);
      setJudgeMessage("不正解です。");
    } finally {
      setIsRunning(false);
    }
  };

  const handleNext = () => {
    if (!isCorrect) return;

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

    const nextTopic = updatedSession.selectedTopics[updatedSession.currentIndex];
    const nextQuestion = javaQuestionMap[nextTopic];

    setShowHint(false);
    setShowAnswer(false);
    setOutput("");
    setErrorOutput("");
    setStdin("");
    setIsCorrect(false);
    setJudgeMessage("");
    setIsProgressUpdated(false);

    if (nextQuestion) {
      setCode(nextQuestion.starterCode);
    } else {
      setCode(`public class Main {
  public static void main(String[] args) {
    
  }
}`);
    }
  };

  const handleInterrupt = () => {
    const interruptedSession: DrillSession = {
      ...session,
      isInProgress: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(interruptedSession));
    router.push("/drill/java");
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <h1 className="text-2xl font-bold">Java ドリル</h1>
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

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h2 className="mb-4 text-2xl font-bold">問題文</h2>
              <p className="mb-6 text-lg leading-8">
                {currentQuestion.description}
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setShowHint((prev) => !prev)}
                  className="w-full rounded-xl border bg-gray-50 px-4 py-3 font-bold hover:bg-gray-100"
                >
                  ヒント
                </button>

                {showHint && (
                  <div className="rounded-xl border bg-yellow-50 px-4 py-3 text-sm">
                    {currentQuestion.hint}
                  </div>
                )}

                <button
                  onClick={() => setShowAnswer((prev) => !prev)}
                  className="w-full rounded-xl border bg-gray-50 px-4 py-3 font-bold hover:bg-gray-100"
                >
                  解答
                </button>

                {showAnswer && (
                  <div className="rounded-xl border bg-blue-50 px-4 py-3 text-sm">
                    期待する出力: {currentQuestion.expectedOutput}
                  </div>
                )}

                <button
                  onClick={handleInterrupt}
                  className="w-full rounded-xl border bg-gray-50 px-4 py-3 font-bold hover:bg-gray-100"
                >
                  中断
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">エディタ</h2>
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="rounded-xl border bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-700 disabled:opacity-60"
                  >
                    {isRunning ? "実行中..." : "実行"}
                  </button>
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[320px] w-full rounded-xl border bg-gray-50 p-4 font-mono text-sm outline-none"
                />
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-4 text-2xl font-bold">標準入力</h2>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="必要なら標準入力を入力してください"
                  className="min-h-[100px] w-full rounded-xl border bg-gray-50 p-4 font-mono text-sm outline-none"
                />
              </div>

              <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-4 text-2xl font-bold">ターミナル</h2>

                <div className="mb-4 min-h-[180px] whitespace-pre-wrap rounded-xl border bg-black p-4 font-mono text-sm text-green-400">
                  {output && `実行結果:\n${output}`}
                  {errorOutput && `エラー出力:\n${errorOutput}`}
                  {!output && !errorOutput && "ここに実行結果が表示されます。"}
                </div>

                {judgeMessage && (
                  <div
                    className={`rounded-xl border px-4 py-3 font-bold ${
                      isCorrect
                        ? "border-green-300 bg-green-50 text-green-700"
                        : "border-red-300 bg-red-50 text-red-700"
                    }`}
                  >
                    {judgeMessage}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleNext}
                  disabled={!isCorrect}
                  className={`rounded-xl border px-6 py-3 font-bold shadow ${
                    isCorrect
                      ? "bg-white hover:bg-gray-50"
                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
                >
                  次の問題へ
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
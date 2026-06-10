"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

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

  const currentTopic = session?.selectedTopics[session.currentIndex] ?? "";
  const currentQuestion = currentTopic
    ? javaQuestionMap[currentTopic] ?? {
        title: currentTopic,
        description: `ここに「${currentTopic}」の問題文を表示します。`,
        hint: "ここにヒントを表示します。",
        expectedOutput: "ここに期待する出力",
        starterCode: code,
      }
    : null;

  const totalCount = session?.selectedTopics.length ?? 0;
  const currentNumber = session ? session.currentIndex + 1 : 0;

  const progressPercent = useMemo(() => {
    if (!session || totalCount === 0) return 0;
    return (currentNumber / totalCount) * 100;
  }, [session, currentNumber, totalCount]);

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

  const handleInterrupt = () => {
    if (!session) return;

    const interruptedSession: DrillSession = {
      ...session,
      isInProgress: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(interruptedSession));
    router.push("/drill/java");
  };

  const handleRun = async () => {
    if (!currentQuestion) return;

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
    if (!session || !isCorrect) return;

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

  const handleEditorKeyDown = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const textarea = e.currentTarget;
    const value = code;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Ctrl + Enter -> 実行
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      await handleRun();
      return;
    }

    // Ctrl + S -> 中断保存
    if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
      handleInterrupt();
      return;
    }

    // Ctrl + / -> コメント切り替え
    if (e.ctrlKey && e.key === "/") {
      e.preventDefault();

      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEndIndex = value.indexOf("\n", end);
      const blockEnd = lineEndIndex === -1 ? value.length : lineEndIndex;

      const selectedBlock = value.slice(lineStart, blockEnd);
      const lines = selectedBlock.split("\n");

      const allCommented = lines.every((line) => {
        const trimmed = line.trim();
        return trimmed === "" || trimmed.startsWith("//");
      });

      const updatedLines = lines.map((line) => {
        if (line.trim() === "") return line;

        const leadingSpaces = line.match(/^\s*/)?.[0] ?? "";
        const content = line.slice(leadingSpaces.length);

        if (allCommented) {
          if (content.startsWith("// ")) {
            return leadingSpaces + content.slice(3);
          }
          if (content.startsWith("//")) {
            return leadingSpaces + content.slice(2);
          }
          return line;
        }

        return `${leadingSpaces}// ${content}`;
      });

      const newBlock = updatedLines.join("\n");
      const newValue = value.slice(0, lineStart) + newBlock + value.slice(blockEnd);
      setCode(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = lineStart;
        textarea.selectionEnd = lineStart + newBlock.length;
      });
      return;
    }

    // Tab / Shift+Tab -> 字下げ
    if (e.key !== "Tab") return;

    e.preventDefault();

    // 選択なし -> カーソル位置にスペース2つ
    if (start === end) {
      if (e.shiftKey) return;

      const indent = "  ";
      const newValue = value.slice(0, start) + indent + value.slice(end);
      setCode(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = start + indent.length;
        textarea.selectionEnd = start + indent.length;
      });
      return;
    }

    // 選択あり -> 選択範囲の各行を対象
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const lineEndIndex = value.indexOf("\n", end);
    const blockEnd = lineEndIndex === -1 ? value.length : lineEndIndex;

    const selectedBlock = value.slice(lineStart, blockEnd);
    const lines = selectedBlock.split("\n");

    if (e.shiftKey) {
      const updatedLines = lines.map((line) => {
        if (line.startsWith("  ")) return line.slice(2);
        if (line.startsWith("\t")) return line.slice(1);
        return line;
      });

      const newBlock = updatedLines.join("\n");
      const newValue = value.slice(0, lineStart) + newBlock + value.slice(blockEnd);
      setCode(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = lineStart;
        textarea.selectionEnd = lineStart + newBlock.length;
      });
    } else {
      const updatedLines = lines.map((line) => `  ${line}`);
      const newBlock = updatedLines.join("\n");
      const newValue = value.slice(0, lineStart) + newBlock + value.slice(blockEnd);
      setCode(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = lineStart;
        textarea.selectionEnd = lineStart + newBlock.length;
      });
    }
  };

  if (!session || !currentQuestion) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-slate-100 p-8">
          <p>読み込み中...</p>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-100 text-slate-900">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Link href="/dashboard" className="font-medium hover:underline">
                Java 学習レッスン
              </Link>
              <span>›</span>
              <Link href="/drill/java" className="font-medium hover:underline">
                Javaの基本
              </Link>
              <span>›</span>
              <span className="font-semibold text-slate-800">
                {currentQuestion.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium">
                {currentNumber}/{totalCount}
              </span>
              <Link
                href="/drill/java"
                className="rounded-lg border bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                一覧へ戻る
              </Link>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1600px] px-4 py-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[340px_1fr_380px]">
            <aside className="rounded-2xl bg-white shadow-sm">
              <div className="border-b px-5 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">手順</h2>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    Java
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-2xl border bg-sky-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-500">
                    Main.java
                  </p>
                  <p className="whitespace-pre-line text-lg leading-8">
                    {currentQuestion.description}
                  </p>
                </div>

                <button
                  onClick={() => setShowHint((prev) => !prev)}
                  className="w-full rounded-xl border bg-white px-4 py-3 text-left font-bold hover:bg-slate-50"
                >
                  ヒントを表示
                </button>

                {showHint && (
                  <div className="rounded-2xl border bg-yellow-50 p-4 text-sm leading-7">
                    {currentQuestion.hint}
                  </div>
                )}

                <button
                  onClick={() => setShowAnswer((prev) => !prev)}
                  className="w-full rounded-xl border bg-white px-4 py-3 text-left font-bold hover:bg-slate-50"
                >
                  見本を表示
                </button>

                {showAnswer && (
                  <div className="rounded-2xl border bg-blue-50 p-4 text-sm leading-7">
                    期待する出力:
                    <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-white p-3 font-mono text-sm">
                      {currentQuestion.expectedOutput}
                    </pre>
                  </div>
                )}

                <button
                  onClick={handleInterrupt}
                  className="w-full rounded-xl border bg-white px-4 py-3 font-bold hover:bg-slate-50"
                >
                  中断する
                </button>
              </div>
            </aside>

            <div className="rounded-2xl bg-white shadow-sm">
              <div className="flex items-center justify-between border-b bg-slate-800 px-5 py-3 text-white">
                <div className="rounded-t-xl bg-slate-700 px-4 py-2 font-bold">
                  Main.java
                </div>

                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-60"
                >
                  {isRunning ? "実行中..." : "実行"}
                </button>
              </div>

              <div className="p-4">
                <textarea
                  ref={editorRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleEditorKeyDown}
                  className="min-h-[620px] w-full rounded-xl border bg-slate-900 p-4 font-mono text-sm text-slate-100 outline-none"
                  spellCheck={false}
                />
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <h2 className="text-lg font-bold">コンソール</h2>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      標準入力
                    </label>
                    <textarea
                      value={stdin}
                      onChange={(e) => setStdin(e.target.value)}
                      placeholder="必要な場合だけ入力してください"
                      className="min-h-[100px] w-full rounded-xl border bg-slate-50 p-3 font-mono text-sm outline-none"
                    />
                  </div>

                  <div className="min-h-[260px] whitespace-pre-wrap rounded-xl border bg-[#031b22] p-4 font-mono text-sm text-emerald-300">
                    {output && `実行結果:\n${output}`}
                    {errorOutput && `エラー出力:\n${errorOutput}`}
                    {!output && !errorOutput && "ここに実行結果が表示されます。"}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <h2 className="text-lg font-bold">見本</h2>
                </div>

                <div className="p-4">
                  <div className="min-h-[180px] whitespace-pre-wrap rounded-xl border bg-[#031b22] p-4 font-mono text-sm text-white">
                    {currentQuestion.expectedOutput}
                  </div>

                  {judgeMessage && (
                    <div
                      className={`mt-4 rounded-xl border px-4 py-3 font-bold ${
                        isCorrect
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-red-300 bg-red-50 text-red-700"
                      }`}
                    >
                      {judgeMessage}
                    </div>
                  )}

                  <button
                    onClick={handleNext}
                    disabled={!isCorrect}
                    className={`mt-4 w-full rounded-xl px-4 py-3 font-bold shadow-sm ${
                      isCorrect
                        ? "border bg-emerald-500 text-white hover:bg-emerald-600"
                        : "cursor-not-allowed border bg-slate-200 text-slate-400"
                    }`}
                  >
                    次の問題へ
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-4 rounded-2xl bg-white px-5 py-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>進捗</span>
              <span>
                {currentNumber}/{totalCount} クリア
              </span>
            </div>

            <div className="h-4 w-full rounded-full bg-slate-200">
              <div
                className="h-4 rounded-full bg-emerald-400 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
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
import {
  getJavaQuestions,
  javaQuestionEntriesById,
} from "@/data/javaQuestions";

const STORAGE_KEY = "drill-java-session";

type DrillSession = {
  selectedTopics: string[];
  selectedQuestionIds: string[];
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
      const validTopics = parsed.selectedTopics.filter(
        (topicId) => getJavaQuestions(topicId).length > 0
      );
      const selectedQuestionIds =
        parsed.selectedQuestionIds?.filter(
          (questionId) => javaQuestionEntriesById[questionId]
        ) ??
        validTopics.flatMap((topicId) =>
          getJavaQuestions(topicId).map((question) => question.id)
        );

      if (!parsed.selectedTopics || selectedQuestionIds.length === 0) {
        router.push("/drill/java");
        return;
      }

      const safeIndex =
        parsed.currentIndex >= 0 && parsed.currentIndex < selectedQuestionIds.length
          ? parsed.currentIndex
          : 0;

      const safeSession: DrillSession = {
        selectedTopics: validTopics,
        selectedQuestionIds,
        currentIndex: safeIndex,
        isInProgress: parsed.isInProgress,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeSession));

      const questionId =
        safeSession.selectedQuestionIds[safeSession.currentIndex] ?? "";
      const question = questionId
        ? javaQuestionEntriesById[questionId]
        : undefined;

      const timerId = window.setTimeout(() => {
        setSession(safeSession);

        if (question) {
          setCode(question.starterCode);
          setStdin(question.sampleInput ?? "");
        }

        setIsProgressUpdated(false);
      }, 0);

      return () => window.clearTimeout(timerId);
    } catch (error) {
      console.error("保存データの読み込みに失敗しました:", error);
      router.push("/drill/java");
    }
  }, [router]);

  const currentQuestionId: string =
    session?.selectedQuestionIds[session.currentIndex] ?? "";

  const currentQuestion = currentQuestionId
    ? javaQuestionEntriesById[currentQuestionId] ?? null
    : null;

  const currentTopic = currentQuestion?.topicId ?? "";

  const totalCount = session?.selectedQuestionIds.length ?? 0;
  const currentNumber = session ? session.currentIndex + 1 : 0;
  const canShowAnswer = Boolean(judgeMessage) && !isCorrect && !isRunning;

  const progressPercent = useMemo(() => {
    if (!session || totalCount === 0) return 0;
    return (currentNumber / totalCount) * 100;
  }, [session, currentNumber, totalCount]);

  const normalizeOutput = (text: string) => {
    return text.replace(/\r\n/g, "\n").trim();
  };

  const normalizeCode = (text: string) => {
    return text.replace(/\r\n/g, "\n");
  };

  const validateCodePatterns = (sourceCode: string) => {
    const normalizedCode = normalizeCode(sourceCode);
    const requiredPatterns = currentQuestion?.requiredPatterns ?? [];
    const forbiddenPatterns = currentQuestion?.forbiddenPatterns ?? [];

    const missingPatterns = requiredPatterns.filter(
      (pattern) => !normalizedCode.includes(pattern)
    );

    const foundForbiddenPatterns = forbiddenPatterns.filter((pattern) =>
      normalizedCode.includes(pattern)
    );

    return {
      isValid:
        missingPatterns.length === 0 && foundForbiddenPatterns.length === 0,
      missingPatterns,
      foundForbiddenPatterns,
    };
  };

  const updateProgressInFirestore = async (
    questionId: string,
    topic: string,
    title: string
  ) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    const solvedTopics =
      userSnap.exists() && Array.isArray(userSnap.data()?.progress?.solvedTopics)
        ? userSnap.data()?.progress?.solvedTopics
        : [];

    const alreadySolved = solvedTopics.includes(questionId);

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
          lastSolvedTopic: title,
          lastSolvedLanguage: "java",
          updatedAt: serverTimestamp(),
          solvedTopics: arrayUnion(questionId),
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
    if (!currentQuestion || !currentTopic || !currentQuestionId) return;

    setIsRunning(true);
    setOutput("");
    setErrorOutput("");
    setIsCorrect(false);
    setJudgeMessage("");
    setShowAnswer(false);

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
        setShowAnswer(false);
        return;
      }

      const stdout = data.stdout || "";
      const stderr = data.stderr || "";

      setOutput(stdout);
      setErrorOutput(stderr);

      if (stderr) {
        setIsCorrect(false);
        setJudgeMessage("実行エラーがあります。");
        setShowAnswer(false);
        return;
      }

      const actual = normalizeOutput(stdout);
      const expected = normalizeOutput(currentQuestion.expectedOutput ?? "");
      const codeValidation = validateCodePatterns(code);

      if (actual === expected && codeValidation.isValid) {
        setIsCorrect(true);
        setShowAnswer(false);

        if (!isProgressUpdated) {
          try {
            const updated = await updateProgressInFirestore(
              currentQuestionId,
              currentTopic,
              currentQuestion.title
            );
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

        if (actual === expected && !codeValidation.isValid) {
          if (codeValidation.missingPatterns.length > 0) {
            setJudgeMessage(
              `出力は正しいですが、必要なコード要素が不足しています: ${codeValidation.missingPatterns.join(
                ", "
              )}`
            );
            setShowAnswer(false);
            return;
          }

          if (codeValidation.foundForbiddenPatterns.length > 0) {
            setJudgeMessage(
              `出力は正しいですが、禁止された書き方が含まれています: ${codeValidation.foundForbiddenPatterns.join(
                ", "
              )}`
            );
            setShowAnswer(false);
            return;
          }
        }

        setJudgeMessage("不正解です。出力結果を確認してください。");
        setShowAnswer(false);
      }
    } catch (error) {
      console.error("実行API呼び出しエラー:", error);
      setErrorOutput("コード実行APIの呼び出しに失敗しました。");
      setIsCorrect(false);
      setJudgeMessage("不正解です。");
      setShowAnswer(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleNext = () => {
    if (!session || !isCorrect) return;

    const nextIndex = session.currentIndex + 1;

    if (nextIndex >= session.selectedQuestionIds.length) {
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

    const nextQuestionId =
      updatedSession.selectedQuestionIds[updatedSession.currentIndex] ?? "";
    const nextQuestion = nextQuestionId
      ? javaQuestionEntriesById[nextQuestionId]
      : undefined;

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
      setStdin(nextQuestion.sampleInput ?? "");
    }
  };

  const handleEditorKeyDown = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const textarea = e.currentTarget;
    const value = code;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      await handleRun();
      return;
    }

    if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
      handleInterrupt();
      return;
    }

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

    if (e.key === "Enter") {
      e.preventDefault();

      const indentUnit = "  ";
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const currentLineBeforeCursor = value.slice(lineStart, start);
      const currentIndent = currentLineBeforeCursor.match(/^\s*/)?.[0] ?? "";
      const beforeCursor = value.slice(0, start);
      const afterCursor = value.slice(end);
      const opensBlock = currentLineBeforeCursor.trimEnd().endsWith("{");
      const closesBlockNext = afterCursor.trimStart().startsWith("}");

      if (opensBlock && closesBlockNext) {
        const insertedText = `\n${currentIndent}${indentUnit}\n${currentIndent}`;
        setCode(beforeCursor + insertedText + afterCursor);

        requestAnimationFrame(() => {
          const cursorPosition =
            start + 1 + currentIndent.length + indentUnit.length;
          textarea.selectionStart = cursorPosition;
          textarea.selectionEnd = cursorPosition;
        });
        return;
      }

      const nextIndent = opensBlock
        ? currentIndent + indentUnit
        : currentIndent;
      const insertedText = `\n${nextIndent}`;
      setCode(beforeCursor + insertedText + afterCursor);

      requestAnimationFrame(() => {
        const cursorPosition = start + insertedText.length;
        textarea.selectionStart = cursorPosition;
        textarea.selectionEnd = cursorPosition;
      });
      return;
    }

    if (e.key !== "Tab") return;

    e.preventDefault();

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
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
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
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[340px_minmax(0,1fr)_380px]">
            <aside className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      問題 {currentQuestion.no}
                    </p>
                    <h2 className="mt-1 text-xl font-bold">手順</h2>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    Java
                  </span>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-lg border border-sky-100 bg-sky-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-500">
                    Main.java
                  </p>
                  <p className="whitespace-pre-line text-lg leading-8">
                    {currentQuestion.description}
                  </p>
                </div>

                <button
                  onClick={() => setShowHint((prev) => !prev)}
                  className="w-full rounded-lg border bg-white px-4 py-3 text-left font-bold hover:bg-slate-50"
                >
                  ヒントを表示
                </button>

                {showHint && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm leading-7">
                    {currentQuestion.hint}
                  </div>
                )}

                <button
                  onClick={() => setShowAnswer((prev) => !prev)}
                  disabled={!canShowAnswer}
                  className="w-full rounded-lg border bg-white px-4 py-3 text-left font-bold hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                >
                  見本を表示
                </button>

                {showAnswer && canShowAnswer && (
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-7">
                    見本コード:
                    <pre className="mt-2 whitespace-pre-wrap rounded-md bg-white p-3 font-mono text-sm leading-6">
                      {currentQuestion.answerCode ?? currentQuestion.starterCode}
                    </pre>
                  </div>
                )}

                <button
                  onClick={handleInterrupt}
                  className="w-full rounded-lg border bg-white px-4 py-3 font-bold hover:bg-slate-50"
                >
                  中断する
                </button>
              </div>
            </aside>

            <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b bg-slate-800 px-5 py-3 text-white">
                <div className="rounded-md bg-slate-700 px-4 py-2 font-bold">
                  Main.java
                </div>

                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-60"
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
                  className="min-h-[520px] w-full rounded-lg border bg-slate-900 p-4 font-mono text-sm leading-6 text-slate-100 outline-none xl:min-h-[620px]"
                  spellCheck={false}
                />
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
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
                      className="min-h-[100px] w-full rounded-lg border bg-slate-50 p-3 font-mono text-sm outline-none focus:border-blue-300 focus:bg-white"
                    />
                    {currentQuestion.sampleInput && (
                      <p className="mt-2 text-xs text-slate-500">
                        この問題ではサンプル入力を自動で入れています。
                      </p>
                    )}
                  </div>

                  <div className="min-h-[260px] whitespace-pre-wrap rounded-lg border bg-[#031b22] p-4 font-mono text-sm text-emerald-300">
                    {output && `実行結果:\n${output}`}
                    {errorOutput && `エラー出力:\n${errorOutput}`}
                    {!output && !errorOutput && "ここに実行結果が表示されます。"}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <h2 className="text-lg font-bold">見本の出力結果</h2>
                </div>

                <div className="p-4">
                  <div className="min-h-[180px] whitespace-pre-wrap rounded-lg border bg-[#031b22] p-4 font-mono text-sm text-white">
                    {currentQuestion.expectedOutput
                      ? currentQuestion.expectedOutput
                      : "この問題は固定の出力結果がありません。"}
                  </div>

                  {judgeMessage && (
                    <div
                      className={`mt-4 rounded-lg border px-4 py-3 font-bold ${
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
                    className={`mt-4 w-full rounded-lg px-4 py-3 font-bold shadow-sm ${
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

          <div className="mt-4 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
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

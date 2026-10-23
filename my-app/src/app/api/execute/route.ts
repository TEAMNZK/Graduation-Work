import { NextRequest, NextResponse } from "next/server";
import { javaQuestionEntriesById } from "@/data/javaQuestions";
import { executeJava, executePython, executeC } from "@/lib/judge0";
import { gradeJavaQuestion, gradeJavaQuiz } from "@/lib/javaGrading";

import { cQuestionEntriesById } from "@/data/cQuestions";
import { gradeCQuestion } from "@/lib/cGrading";
import { pythonQuestionEntriesById } from "@/data/pythonQuestions";
import { gradePythonQuestion } from "@/lib/pythonGrading";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || (body.language !== "java" && body.language !== "python" && body.language !== "c") || typeof body.code !== "string" || !body.code.trim() ||
        (body.stdin !== undefined && typeof body.stdin !== "string")) {
      return NextResponse.json({ success: false, error: "Java・Python・C言語のコードと標準入力を確認してください。" }, { status: 400 });
    }
    if (body.language === "c") {
      const question = typeof body.questionId === "string" && Object.hasOwn(cQuestionEntriesById, body.questionId)
        ? cQuestionEntriesById[body.questionId] : undefined;
      if (body.questionId !== undefined && !question) {
        return NextResponse.json({ success: false, error: "問題が見つかりません。" }, { status: 400 });
      }
      const results = new Map<string, ReturnType<typeof executeC>>();
      const execute: typeof executeC = (code, stdin) => {
        const key = JSON.stringify([code, stdin]);
        if (!results.has(key)) results.set(key, executeC(code, stdin));
        return results.get(key)!;
      };
      const result = await execute(body.code, body.stdin ?? "");
      const grading = question ? await gradeCQuestion(question, body.code, execute) : undefined;
      return NextResponse.json({ success: true, stdout: result.stdout, stderr: result.stderr,
        exitCode: result.statusId, statusDescription: result.statusDescription, grading });
    }
    if (body.language === "python") {
      const question = typeof body.questionId === "string" && Object.hasOwn(pythonQuestionEntriesById, body.questionId)
        ? pythonQuestionEntriesById[body.questionId] : undefined;
      if (body.questionId !== undefined && !question) {
        return NextResponse.json({ success: false, error: "問題が見つかりません。" }, { status: 400 });
      }
      const results = new Map<string, ReturnType<typeof executePython>>();
      const execute: typeof executePython = (code, stdin) => {
        const key = JSON.stringify([code, stdin]);
        if (!results.has(key)) results.set(key, executePython(code, stdin));
        return results.get(key)!;
      };
      const result = await execute(body.code, body.stdin ?? "");
      const grading = question ? await gradePythonQuestion(question, body.code, execute) : undefined;
      return NextResponse.json({
        success: true, stdout: result.stdout, stderr: result.stderr,
        exitCode: result.statusId, statusDescription: result.statusDescription, grading,
      });
    }
    const question = typeof body.questionId === "string" && Object.hasOwn(javaQuestionEntriesById, body.questionId)
      ? javaQuestionEntriesById[body.questionId] : undefined;
    if (body.questionId !== undefined && !question) {
      return NextResponse.json({ success: false, error: "問題が見つかりません。" }, { status: 400 });
    }
    if (question?.quiz) {
      return NextResponse.json({
        success: true, stdout: "", stderr: "", exitCode: 3,
        grading: gradeJavaQuiz(question, body.code),
      });
    }
    // 表示用の実行と採点の入力が同じ場合は結果を再利用する。
    const results = new Map<string, ReturnType<typeof executeJava>>();
    const execute: typeof executeJava = (code, stdin) => {
      const key = JSON.stringify([code, stdin]);
      if (!results.has(key)) results.set(key, executeJava(code, stdin));
      return results.get(key)!;
    };
    const result = await execute(body.code, body.stdin ?? "");
    // 正解出力・採点条件はサーバーの問題定義を使う。
    const grading = question ? await gradeJavaQuestion(question, body.code, execute) : undefined;
    return NextResponse.json({
      success: true, stdout: result.stdout, stderr: result.stderr,
      exitCode: result.statusId, statusDescription: result.statusDescription, grading,
    });
  } catch (error) {
    console.error("execute API error:", error);
    return NextResponse.json({ success: false, error: "実行または採点に失敗しました。時間をおいて再実行してください。" }, { status: 502 });
  }
}

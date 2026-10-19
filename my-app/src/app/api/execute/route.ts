import { NextRequest, NextResponse } from "next/server";
import { javaQuestionEntriesById } from "@/data/javaQuestions";
import { executeJava } from "@/lib/judge0";
import { gradeJavaQuestion } from "@/lib/javaGrading";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || body.language !== "java" || typeof body.code !== "string" || !body.code.trim() ||
        (body.stdin !== undefined && typeof body.stdin !== "string")) {
      return NextResponse.json({ success: false, error: "Javaのコードと標準入力を確認してください。" }, { status: 400 });
    }
    const question = typeof body.questionId === "string" && Object.hasOwn(javaQuestionEntriesById, body.questionId)
      ? javaQuestionEntriesById[body.questionId] : undefined;
    if (body.questionId !== undefined && !question) {
      return NextResponse.json({ success: false, error: "問題が見つかりません。" }, { status: 400 });
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

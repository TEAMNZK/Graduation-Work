import { NextResponse } from "next/server";

type ExecuteRequestBody = {
  language?: string;
  code?: string;
  stdin?: string;
};

type ExecuteSuccessResponse = {
  success: true;
  stdout: string;
  stderr: string;
  exitCode: number;
};

type ExecuteErrorResponse = {
  success: false;
  error: string;
};

const JUDGE0_BASE_URL = process.env.JUDGE0_BASE_URL || "https://ce.judge0.com";

// ここは Judge0 の Languages API で確認した値に合わせて更新する
const languageMap: Record<string, number> = {
  java: 62,
  python: 71,
  javascript: 63,
  c: 50,
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ExecuteRequestBody;
    const { language, code, stdin } = body;

    if (!language || typeof language !== "string") {
      return NextResponse.json<ExecuteErrorResponse>(
        { success: false, error: "language は必須です。" },
        { status: 400 }
      );
    }

    if (!code || typeof code !== "string") {
      return NextResponse.json<ExecuteErrorResponse>(
        { success: false, error: "code は必須です。" },
        { status: 400 }
      );
    }

    const languageId = languageMap[language];
    if (!languageId) {
      return NextResponse.json<ExecuteErrorResponse>(
        { success: false, error: `未対応の言語です: ${language}` },
        { status: 400 }
      );
    }

    // Judge0 に送信
    const createResponse = await fetch(
      `${JUDGE0_BASE_URL}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: stdin ?? "",
        }),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      return NextResponse.json<ExecuteErrorResponse>(
        {
          success: false,
          error: `Judge0 への送信に失敗しました: ${errorText}`,
        },
        { status: 502 }
      );
    }

    const result = await createResponse.json();

    return NextResponse.json<ExecuteSuccessResponse>({
      success: true,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? result.compile_output ?? "",
      exitCode: result.status?.id ?? 0,
    });
  } catch (error) {
    console.error("execute API error:", error);

    return NextResponse.json<ExecuteErrorResponse>(
      {
        success: false,
        error: "Judge0 実行APIで予期しないエラーが発生しました。",
      },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

type Judge0CreateResponse = {
  token?: string;
  error?: string;
};

type Judge0ResultResponse = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: {
    id: number;
    description: string;
  };
};

const JUDGE0_BASE_URL =
  process.env.JUDGE0_BASE_URL ?? "https://ce.judge0.com";

const LANGUAGE_ID_MAP: Record<string, number> = {
  java: 62,
};

function encodeBase64(value: string): string {
  return Buffer.from(value, "utf-8").toString("base64");
}

function decodeBase64(value?: string | null): string {
  if (!value) return "";
  return Buffer.from(value, "base64").toString("utf-8");
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const language = body.language as string;
    const code = body.code as string;
    const stdin = (body.stdin as string) ?? "";

    if (!language || !code) {
      return NextResponse.json(
        { success: false, error: "language または code が不足しています。" },
        { status: 400 }
      );
    }

    const languageId = LANGUAGE_ID_MAP[language];

    if (!languageId) {
      return NextResponse.json(
        { success: false, error: "未対応の言語です。" },
        { status: 400 }
      );
    }

    // base64_encoded=true を使うので、送る値を base64 化
    const createResponse = await fetch(
      `${JUDGE0_BASE_URL}/submissions?base64_encoded=true&wait=false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: encodeBase64(code),
          stdin: encodeBase64(stdin),
        }),
      }
    );

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      return NextResponse.json(
        {
          success: false,
          error: `Judge0 への送信に失敗しました: ${errorText}`,
        },
        { status: 500 }
      );
    }

    const createData = (await createResponse.json()) as Judge0CreateResponse;

    if (!createData.token) {
      return NextResponse.json(
        { success: false, error: "Judge0 の token 取得に失敗しました。" },
        { status: 500 }
      );
    }

    const token = createData.token;

    let resultData: Judge0ResultResponse | null = null;

    for (let i = 0; i < 10; i++) {
      await sleep(1000);

      const resultResponse = await fetch(
        `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=true`,
        {
          method: "GET",
        }
      );

      if (!resultResponse.ok) {
        const errorText = await resultResponse.text();
        return NextResponse.json(
          {
            success: false,
            error: `Judge0 の結果取得に失敗しました: ${errorText}`,
          },
          { status: 500 }
        );
      }

      resultData = (await resultResponse.json()) as Judge0ResultResponse;

      const statusId = resultData.status?.id;

      // 1: In Queue, 2: Processing
      if (statusId !== 1 && statusId !== 2) {
        break;
      }
    }

    if (!resultData) {
      return NextResponse.json(
        { success: false, error: "Judge0 の結果取得に失敗しました。" },
        { status: 500 }
      );
    }

    const stdout = decodeBase64(resultData.stdout);
    const stderr = decodeBase64(resultData.stderr);
    const compileOutput = decodeBase64(resultData.compile_output);
    const message = decodeBase64(resultData.message);

    const errorOutput = stderr || compileOutput || message;

    return NextResponse.json({
      success: true,
      stdout,
      stderr: errorOutput,
      exitCode: resultData.status?.id ?? 0,
      statusDescription: resultData.status?.description ?? "",
    });
  } catch (error) {
    console.error("execute API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "サーバー側で実行処理に失敗しました。",
      },
      { status: 500 }
    );
  }
}
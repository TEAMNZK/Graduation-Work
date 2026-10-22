import type { JavaExecutionResult } from "@/lib/javaGrading";

type Judge0Result = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: { id: number; description: string };
};
const decode = (value?: string | null) => value ? Buffer.from(value, "base64").toString("utf8") : "";

export function executeJava(code: string, stdin: string): Promise<JavaExecutionResult> {
  return executeCode(code, stdin, 62);
}

export function executePython(code: string, stdin: string): Promise<JavaExecutionResult> {
  return executeCode(code, stdin, 71);
}

export function executeC(code: string, stdin: string): Promise<JavaExecutionResult> {
  return executeCode(code, stdin, 50);
}

async function executeCode(code: string, stdin: string, languageId: number): Promise<JavaExecutionResult> {
  const baseUrl = process.env.JUDGE0_BASE_URL ?? "https://ce.judge0.com";
  const submission = await fetch(`${baseUrl}/submissions?base64_encoded=true&wait=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: languageId,
      source_code: Buffer.from(code, "utf8").toString("base64"),
      stdin: Buffer.from(stdin, "utf8").toString("base64"),
      cpu_time_limit: 3,
      wall_time_limit: 5,
    }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!submission.ok) throw new Error("Judge0への送信に失敗しました。");
  const { token } = await submission.json() as { token?: string };
  if (!token) throw new Error("Judge0のtoken取得に失敗しました。");
  for (let attempt = 0; attempt < 10; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`${baseUrl}/submissions/${encodeURIComponent(token)}?base64_encoded=true`, {
      signal: AbortSignal.timeout(15000), cache: "no-store",
    });
    if (!response.ok) throw new Error("Judge0の結果取得に失敗しました。");
    const result = await response.json() as Judge0Result;
    const statusId = result.status?.id;
    if (statusId === 1 || statusId === 2) continue;
    if (!statusId) throw new Error("Judge0の実行状態を確認できませんでした。");
    return {
      stdout: decode(result.stdout),
      stderr: decode(result.stderr) || decode(result.compile_output) || decode(result.message),
      statusId,
      statusDescription: result.status?.description ?? "不明な実行状態",
    };
  }
  throw new Error("実行結果の取得がタイムアウトしました。もう一度実行してください。");
}

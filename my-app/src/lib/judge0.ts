import type { JavaExecutionResult } from "@/lib/javaGrading";
import { ExecutionServiceError } from "@/lib/executionError";

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
  const startedAt = Date.now();
  const deadline = startedAt + 60000;
  let token: string | undefined;
  let statusId: number | undefined;
  let phase = "submission";
  const details = () => ({ baseUrl, languageId, token, statusId, phase, elapsedMs: Date.now() - startedAt });
  const unavailable = () => new ExecutionServiceError("EXECUTION_UNAVAILABLE",
    "実行サービスに接続できないか、一時的に利用できません。時間をおいて再実行してください。", details());
  const timeout = () => new ExecutionServiceError("EXECUTION_TIMEOUT",
    "実行サービスの応答待ちが60秒を超えました。混雑している可能性があります。時間をおいて再実行してください。", details());
  try {
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
      signal: AbortSignal.timeout(Math.min(15000, Math.max(1, deadline - Date.now()))),
      cache: "no-store",
    });
    if (!submission.ok) {
      throw new ExecutionServiceError("EXECUTION_UNAVAILABLE", unavailable().message,
        { ...details(), httpStatus: submission.status });
    }
    ({ token } = await submission.json() as { token?: string });
    if (!token) throw unavailable();
    phase = "polling";
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, Math.min(2000, deadline - Date.now())));
      if (Date.now() >= deadline) break;
      const response = await fetch(`${baseUrl}/submissions/${encodeURIComponent(token)}?base64_encoded=true`, {
        signal: AbortSignal.timeout(Math.min(15000, Math.max(1, deadline - Date.now()))), cache: "no-store",
      });
      if (!response.ok) {
        throw new ExecutionServiceError("EXECUTION_UNAVAILABLE", unavailable().message,
          { ...details(), httpStatus: response.status });
      }
      const result = await response.json() as Judge0Result;
      statusId = result.status?.id;
      if (statusId === 1 || statusId === 2) continue;
      if (!statusId || statusId === 13) throw unavailable();
      return {
        stdout: decode(result.stdout),
        stderr: decode(result.stderr) || decode(result.compile_output) || decode(result.message),
        statusId,
        statusDescription: result.status?.description ?? "不明な実行状態",
      };
    }
    throw timeout();
  } catch (error) {
    if (error instanceof ExecutionServiceError) throw error;
    const failure = Date.now() >= deadline ? timeout() : unavailable();
    throw new ExecutionServiceError(failure.code, failure.message, {
      ...failure.details,
      cause: error instanceof Error ? error.message : String(error),
      causeCode: error instanceof Error && "cause" in error && error.cause instanceof Error && "code" in error.cause
        ? error.cause.code : undefined,
    });
  }
}

import type { JavaQuestion } from "@/data/javaQuestions";

// コメントとリテラルを区別し、空白の有無に影響されずJavaのトークンを比較する。
// JavaのUnicodeエスケープは字句解析より前に処理される。
export function javaTokens(source: string, includeLiterals = false): string[] {
  const decoded = source.replace(/\\u+([0-9a-fA-F]{4})/g, (_, hex: string) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  const parts = decoded.match(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|"""[\s\S]*?"""|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[\p{L}\p{N}_$]+|>>>|>>|<<|->|::|\+\+|--|==|!=|<=|>=|&&|\|\||\+=|-=|\*=|\/=|\S/gu) ?? [];
  return parts.filter((part) => !part.startsWith("//") && !part.startsWith("/*"))
    .map((part) => !includeLiterals && /^["']/.test(part) ? "<literal>" : part);
}

function containsTokens(tokens: string[], pattern: string): boolean {
  const expected = javaTokens(pattern, true);
  return expected.length > 0 && tokens.some((_, start) =>
    expected.every((token, index) => tokens[start + index] === token)
  );
}

export function validateJavaCode(question: JavaQuestion, code: string): string | null {
  const tokens = javaTokens(code);
  const withLiterals = javaTokens(code, true);
  // importの記載だけで、型を使ったと判定しない。
  const executableTokens: string[] = [];
  let inImport = false;
  for (const token of tokens) {
    if (token === "import") inImport = true;
    if (!inImport) executableTokens.push(token);
    if (token === ";") inImport = false;
  }
  const hasPattern = (pattern: string) => {
    if (pattern === "System.out.print") {
      return containsTokens(executableTokens, "System.out.print") || containsTokens(executableTokens, "System.out.println");
    }
    return containsTokens(javaTokens(pattern)[0] === "import" ? tokens : executableTokens, pattern);
  };
  const missing = (question.requiredPatterns ?? []).filter((pattern) => !hasPattern(pattern));
  const missingGroups = (question.requiredPatternGroups ?? [])
    .filter((group) => !group.some(hasPattern));
  if (missing.length || missingGroups.length) {
    return `必要なコード要素が不足しています: ${[...missing, ...missingGroups.map((group) => group.join(" または "))].join("、")}`;
  }
  const forbidden = (question.forbiddenPatterns ?? [])
    .filter((pattern) => containsTokens(withLiterals, pattern));
  if (forbidden.length) return `禁止された書き方が含まれています: ${forbidden.join("、")}`;
  return null;
}

export type JavaExecutionResult = {
  stdout: string;
  stderr: string;
  statusId: number;
  statusDescription: string;
};
export type JavaExecutor = (code: string, stdin: string) => Promise<JavaExecutionResult>;

export function gradeJavaQuiz(question: JavaQuestion, choiceId: unknown) {
  const quiz = question.quiz;
  const valid = typeof choiceId === "string" && quiz?.choices.some((choice) => choice.id === choiceId);
  const correct = Boolean(valid && choiceId === quiz?.correctChoiceId);
  return {
    correct,
    message: correct ? "正解です。" : "不正解です。選択肢と問題文をもう一度確認してください。",
    passedCount: correct ? 1 : 0,
    testCount: 1,
  };
}

export const normalizeJavaOutput = (output: string) => output.replace(/\r\n?/g, "\n").trim();

export function addJavaVerification(code: string, verification?: string): string {
  if (!verification) return code;
  // コメント・文字列中のmainや波括弧には挿入しない。位置を保つため空白でマスクする。
  const masked = code.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|"""[\s\S]*?"""|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
    (part) => part.replace(/[^\r\n]/g, " "));
  const main = /\bstatic\s+void\s+main\s*\([^)]*\)\s*(?:throws\s+[\w.,\s]+)?\{/.exec(masked);
  if (!main) throw new Error("mainメソッドが見つかりません。");
  const position = main.index + main[0].length;
  // reflectionの検証によるchecked exceptionを学習者のthrows宣言に要求しない。
  return code.slice(0, position) + `\n{ try { ${verification} } catch (Exception gradingError) { throw new AssertionError(gradingError); } }\n` + code.slice(position);
}

export async function gradeJavaQuestion(question: JavaQuestion, code: string, execute: JavaExecutor) {
  const validationError = validateJavaCode(question, code);
  if (validationError) return { correct: false, message: validationError, passedCount: 0, testCount: question.testCases?.length ?? 1 };
  const cases = question.testCases ?? [{ stdin: question.sampleInput ?? "", expectedOutput: question.expectedOutput ?? "" }];
  let testedCode: string;
  try {
    testedCode = addJavaVerification(code, question.verificationCode);
  } catch {
    return { correct: false, message: "mainメソッドの宣言を確認してください。", passedCount: 0, testCount: cases.length };
  }
  let passedCount = 0;
  for (const testCase of cases) {
    const result = await execute(testedCode, testCase.stdin);
    if (result.statusId !== 3 || result.stderr) {
      return { correct: false, message: `テスト${passedCount + 1}で実行に失敗しました: ${result.statusDescription}`, passedCount, testCount: cases.length };
    }
    if (normalizeJavaOutput(result.stdout) !== normalizeJavaOutput(testCase.expectedOutput)) {
      return { correct: false, message: `テスト${passedCount + 1}/${cases.length}で出力が一致しません。入力や分岐条件を確認してください。`, passedCount, testCount: cases.length };
    }
    passedCount++;
  }
  return { correct: true, message: `${cases.length}件のテストに合格しました。`, passedCount, testCount: cases.length };
}

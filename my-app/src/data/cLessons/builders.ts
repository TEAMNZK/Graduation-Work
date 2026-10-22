import type { CQuestion } from "../cQuestions";

export const numbers = (input: string) => input.trim().split(/\s+/).map(Number);
export const cases = (inputs: string[], solve: (input: string) => string | number): CQuestion["testCases"] =>
  inputs.map((stdin) => ({ stdin: `${stdin}\n`, expectedOutput: String(solve(stdin)) }));

export function lesson(topic: string, slug: string, title: string, description: string, hint: string,
  body: string, testCases: CQuestion["testCases"], declarations = "", requiredPatterns: string[] = [], verificationCode?: string): CQuestion {
  const headers = "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <ctype.h>\n#include <limits.h>\n";
  return {
    id: `c-${topic}-${slug}`, no: "", title, type: "lesson",
    description: `${description}\n入力を促すメッセージは表示せず、指定した結果だけを出力してください。`,
    hint, explanation: hint, sampleInput: testCases[0].stdin, expectedOutput: testCases[0].expectedOutput,
    starterCode: `${headers}\nint main(void) {\n    // ここに実装してください\n    return 0;\n}\n`,
    answerCode: `${headers}\n${declarations}\nint main(void) {\n${body}\n    return 0;\n}\n`,
    testCases, requiredPatterns, verificationCode,
  };
}

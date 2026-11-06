import type { CQuestion } from "@/data/cQuestions";
import type { JavaExecutor } from "@/lib/javaGrading";

export function cTokens(source: string): string[] {
  // C joins backslash-newline pairs before removing comments.
  const joined = source.replace(/\\\r?\n/g, "");
  const parts = joined.match(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_][A-Za-z_0-9]*|\d+|->|\+\+|--|==|!=|<=|>=|&&|\|\||<<|>>|\S/g) ?? [];
  return parts.filter((part) => !part.startsWith("//") && !part.startsWith("/*") && !/^["']/.test(part));
}

export function validateCCode(question: CQuestion, code: string): string | null {
  const tokens = cTokens(code);
  const missing = (question.requiredPatterns ?? []).filter((pattern) => {
    const expected = cTokens(pattern);
    return !tokens.some((_, index) => expected.every((token, offset) => tokens[index + offset] === token));
  });
  return missing.length ? `必要なコード要素を確認してください：${missing.join("、")}` : null;
}

export function addCVerification(code: string, question: CQuestion, testCase?: CQuestion["testCases"][number]): string {
  const fileChecks = testCase?.fileChecks ?? [];
  if (!question.verificationCode && fileChecks.length === 0) return code;
  const checks = fileChecks.map((file, index) => {
    const name = `c_check_file_${index}`;
    if (file.integers) {
      return `{ FILE *${name}=fopen(${JSON.stringify(file.path)},"rb"); if(!${name}) return 92;
        int expected[]={${file.integers.join(",")}};
        for(size_t i=0;i<sizeof expected/sizeof expected[0];i++){int actual;if(fread(&actual,sizeof actual,1,${name})!=1||actual!=expected[i]){fclose(${name});return 92;}}
        if(fgetc(${name})!=EOF){fclose(${name});return 92;} fclose(${name}); }`;
    }
    return `{ FILE *${name}=fopen(${JSON.stringify(file.path)},"r"); if(!${name}) return 92;
      const char expected[]=${JSON.stringify(file.text ?? "")};
      for(size_t i=0;i<sizeof expected-1;i++){if(fgetc(${name})!=(unsigned char)expected[i]){fclose(${name});return 92;}}
      if(fgetc(${name})!=EOF){fclose(${name});return 92;} fclose(${name}); }`;
  }).join("\n");
  return `#define main c_student_main\n${code}\n#undef main\n#include <stdio.h>\nint main(void) {\n${question.verificationCode ?? ""}\nint c_student_result=c_student_main();\nif(c_student_result!=0)return c_student_result;\n${checks}\nreturn 0;\n}\n`;
}

export async function gradeCQuestion(question: CQuestion, code: string, execute: JavaExecutor) {
  const normalize = (value: string) => value.replace(/\r\n?/g, "\n").trim();
  const validation = validateCCode(question, code);
  if (validation) return { correct: false, message: validation, passedCount: 0, testCount: question.testCases.length };
  let passedCount = 0;
  for (const testCase of question.testCases) {
    const testedCode = addCVerification(code, question, testCase);
    const startedAt = performance.now();
    const result = await execute(testedCode, testCase.stdin);
    console.log("[C 採点テスト]", {
      questionId: question.id,
      testNumber: passedCount + 1,
      testCount: question.testCases.length,
      elapsedSeconds: ((performance.now() - startedAt) / 1000).toFixed(2),
      statusId: result.statusId,
    });
    if (result.statusId !== 3 || result.stderr || normalize(result.stdout) !== normalize(testCase.expectedOutput)) {
      return { correct: false, message: `テスト${passedCount + 1}/${question.testCases.length}に合格しませんでした。出力・境界条件${question.verificationCode ? "・指定関数の仕様" : ""}${testCase.fileChecks?.length ? "・ファイルの保存内容" : ""}を確認してください。`, passedCount, testCount: question.testCases.length };
    }
    passedCount++;
  }
  return { correct: true, message: `${passedCount}件のテストに合格しました。`, passedCount, testCount: question.testCases.length };
}

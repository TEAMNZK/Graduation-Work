// Compile and execute trusted reference answers, never learner submissions.
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const load = require("./load-ts.cjs");
const { cQuestionEntriesById } = load("src/data/cQuestions.ts");
const { validateCCode, addCVerification } = load("src/lib/cGrading.ts");
const compiler = process.env.CC || "gcc";
const probe = spawnSync(compiler, ["--version"], { encoding: "utf8", windowsHide: true });
if (probe.error) {
  console.error("Cコンパイラが見つかりません。gcc/clang、またはCCにコンパイラのパスを設定してください。");
  process.exit(1);
}
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-c-answers-"));
const failures = [];
let caseCount = 0;
const normalize = (value) => value.replace(/\r\n?/g, "\n").trim();
try {
  const questions = Object.values(cQuestionEntriesById).filter((question) => !process.env.C_QUESTION_FILTER || question.id.startsWith(process.env.C_QUESTION_FILTER));
  for (const [index, question] of questions.entries()) {
    try {
      const error = validateCCode(question, question.answerCode);
      if (error) throw new Error(error);
      const questionDir = path.join(directory, question.id);
      fs.mkdirSync(questionDir);
      const source = path.join(questionDir, "main.c");
      const executable = path.join(questionDir, process.platform === "win32" ? "answer.exe" : "answer");
      fs.writeFileSync(source, addCVerification(question.answerCode, question), "utf8");
      const compile = spawnSync(compiler, ["-std=c99", "-Wall", "-Wextra", source, "-o", executable], {
        encoding: "utf8", cwd: questionDir, timeout: 20000, windowsHide: true,
      });
      if (compile.error || compile.status !== 0) throw new Error(compile.error?.message || compile.stderr);
      for (const [caseIndex, testCase] of question.testCases.entries()) {
        const caseDir = path.join(questionDir, String(caseIndex));
        fs.mkdirSync(caseDir);
        if (question.testCases.some((item) => item.fileChecks?.length)) {
          fs.writeFileSync(source, addCVerification(question.answerCode, question, testCase), "utf8");
          const checkedCompile = spawnSync(compiler, ["-std=c99", "-Wall", "-Wextra", source, "-o", executable], { encoding: "utf8", cwd: questionDir, timeout: 20000, windowsHide: true });
          if (checkedCompile.error || checkedCompile.status !== 0) throw new Error(checkedCompile.error?.message || checkedCompile.stderr);
        }
        const result = spawnSync(executable, [], { input: testCase.stdin, encoding: "utf8", cwd: caseDir, timeout: 10000, maxBuffer: 1024 * 1024, windowsHide: true });
        if (result.error || result.status !== 0 || normalize(result.stdout) !== normalize(testCase.expectedOutput)) {
          throw new Error(JSON.stringify({ caseIndex, input: testCase.stdin, expected: testCase.expectedOutput, actual: result.stdout, status: result.status, error: result.error?.message || result.stderr }));
        }
        caseCount++;
      }
    } catch (error) { failures.push({ id: question.id, error: error.message }); }
    if ((index + 1) % 25 === 0) console.log(`Checked ${index + 1}/${questions.length} answers`);
  }
  console.log(JSON.stringify({ questions: questions.length, caseCount, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  const resolved = path.resolve(directory);
  if (path.dirname(resolved) !== path.resolve(os.tmpdir()) || !path.basename(resolved).startsWith("codex-c-answers-")) throw new Error("Unexpected cleanup path");
  fs.rmSync(resolved, { recursive: true, force: true });
}

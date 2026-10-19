// Requires a local JDK. Each answer runs in its own temporary working directory.
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { promisify } = require("node:util");
const { execFile, spawn } = require("node:child_process");
const exec = promisify(execFile);
const load = require("./load-ts.cjs");
const { javaQuestionEntriesById: questions } = load("src/data/javaQuestions.ts");
const { addJavaVerification, validateJavaCode, normalizeJavaOutput } = load("src/lib/javaGrading.ts");
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-java-answers-"));
const failures = [];
const codeQuestions = Object.values(questions).filter((question) => !question.quiz);
let completed = 0;
let caseCount = 0;

function runJava(cwd, stdin) {
  return new Promise((resolve, reject) => {
    const child = spawn("java", ["-Dfile.encoding=UTF-8", "-Dstdout.encoding=UTF-8", "-Dstderr.encoding=UTF-8", "-Dsun.stdout.encoding=UTF-8", "-Dsun.stderr.encoding=UTF-8", "-cp", cwd, "Main"], { cwd, windowsHide: true });
    let stdout = "", stderr = "";
    const timer = setTimeout(() => child.kill(), 10000);
    child.stdout.setEncoding("utf8").on("data", (chunk) => stdout += chunk);
    child.stderr.setEncoding("utf8").on("data", (chunk) => stderr += chunk);
    child.on("error", reject);
    child.stdin.on("error", () => {});
    child.on("close", (code) => { clearTimeout(timer); resolve({ code, stdout, stderr }); });
    child.stdin.end(stdin);
  });
}

async function check(question) {
  try {
    const validation = validateJavaCode(question, question.answerCode);
    if (validation) throw new Error(validation);
    const cwd = path.join(directory, question.id);
    fs.mkdirSync(cwd);
    fs.writeFileSync(path.join(cwd, "Main.java"), addJavaVerification(question.answerCode, question.verificationCode), "utf8");
    await exec("javac", ["--release", "13", "-encoding", "UTF-8", "Main.java"], { cwd, timeout: 20000, windowsHide: true });
    for (const testCase of question.testCases) {
      const result = await runJava(cwd, testCase.stdin);
      if (result.code !== 0 || normalizeJavaOutput(result.stdout) !== normalizeJavaOutput(testCase.expectedOutput)) {
        throw new Error(JSON.stringify({ input: testCase.stdin, expected: testCase.expectedOutput, ...result }));
      }
      caseCount++;
    }
  } catch (error) {
    failures.push({ id: question.id, error: error.stderr || error.message });
  }
  completed++;
  if (completed % 25 === 0) console.log(`Checked ${completed}/${codeQuestions.length} answers`);
}

(async () => {
  try {
    const queue = [...codeQuestions];
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (queue.length) await check(queue.shift());
    }));
    console.log(JSON.stringify({ answers: completed, quizQuestions: Object.keys(questions).length - codeQuestions.length, cases: caseCount, failures }, null, 2));
    if (failures.length) process.exitCode = 1;
  } finally {
    const target = path.resolve(directory);
    if (path.dirname(target) !== path.resolve(os.tmpdir()) || !path.basename(target).startsWith("codex-java-answers-")) throw new Error("Unexpected temporary directory");
    fs.rmSync(target, { recursive: true, force: true });
  }
})();

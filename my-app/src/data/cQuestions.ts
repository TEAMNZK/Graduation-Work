import { cProjects } from "./cProjects";
import { cInventoryStages, cInventoryFlags } from "./cInventoryProject";
import { basicLessons } from "./cLessons/basics";
import { controlLessons } from "./cLessons/control";
import { arrayLessons } from "./cLessons/arrays";
import { textLessons } from "./cLessons/text";
import { functionLessons } from "./cLessons/functions";
import { systemLessons } from "./cLessons/systems";

export type CQuestion = {
  id: string; no: string; title: string; description: string; hint: string;
  sampleInput: string; expectedOutput: string; starterCode: string; answerCode: string;
  type: "lesson" | "mini_project" | "final_project"; testCases: {
    stdin: string; expectedOutput: string;
    fileChecks?: { path: string; text?: string; integers?: number[] }[];
  }[];
  project?: { goal: string; prerequisiteTopicIds: string[]; steps: string[]; optional?: boolean; stage?: number; previousQuestionId?: string };
  explanation?: string;
  requiredPatterns?: string[];
  verificationCode?: string;
};

const program = (body: string, declarations = "") =>
  `#include <stdio.h>\n${declarations}\nint main(void) {\n${body}\n    return 0;\n}\n`;

const definitions = [
  { topic: "hello", title: "画面への出力", description: 'Hello C と表示してください。', hint: 'printf("Hello C\\n"); を使います。', body: '    printf("Hello C\\n");', cases: [["", "Hello C"]] },
  { topic: "variables", title: "変数と演算", description: "整数を2つ読み取り、その和と差を順に改行して表示してください。", hint: "int型の変数にscanfで読み取り、+と-で計算します。", body: '    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n%d\\n", a + b, a - b);', cases: [["7 3\n", "10\n4"], ["-4 9\n", "5\n-13"], ["0 0\n", "0\n0"]] },
  { topic: "input", title: "標準入力と整数除算", description: "0以上100以下の整数aと、1以上10以下の整数bを読み取り、aをbで割った商と余りを順に改行して表示してください。", hint: "商には /、余りには % を使います。", body: '    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n%d\\n", a / b, a % b);', cases: [["17 5\n", "3\n2"], ["0 2\n", "0\n0"], ["20 4\n", "5\n0"]] },
  { topic: "if", title: "条件分岐", description: "整数の点数を読み取り、60以上ならPass、未満ならFailと表示してください。", hint: "ifとelseで60点の境界を分けます。", body: '    int score;\n    scanf("%d", &score);\n    if (score >= 60) printf("Pass\\n");\n    else printf("Fail\\n");', cases: [["75\n", "Pass"], ["60\n", "Pass"], ["59\n", "Fail"], ["0\n", "Fail"]] },
  { topic: "for", title: "for文", description: "1以上100以下の整数nを読み取り、1からnまでの合計を表示してください。", hint: "合計を0で初期化し、for文で1からnを足します。", body: '    int n, sum = 0;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) sum += i;\n    printf("%d\\n", sum);', cases: [["5\n", "15"], ["1\n", "1"], ["100\n", "5050"]] },
  { topic: "while", title: "while文", description: "0以上100000以下の整数nを読み取り、桁数を表示してください。0は1桁とします。", hint: "do-while文なら0でも1回実行できます。10で割るたびに桁数を増やします。", body: '    int n, digits = 0;\n    scanf("%d", &n);\n    do { digits++; n /= 10; } while (n > 0);\n    printf("%d\\n", digits);', cases: [["1234\n", "4"], ["0\n", "1"], ["100000\n", "6"]] },
  { topic: "array", title: "配列", description: "5つの整数（各値は-100以上100以下）を配列に読み取り、最大値を表示してください。", hint: "最大値は配列の先頭要素で初期化します。", body: '    int values[5];\n    for (int i = 0; i < 5; i++) scanf("%d", &values[i]);\n    int max = values[0];\n    for (int i = 1; i < 5; i++) if (values[i] > max) max = values[i];\n    printf("%d\\n", max);', cases: [["3 9 2 7 1\n", "9"], ["-5 -1 -8 -2 -3\n", "-1"], ["4 4 4 4 4\n", "4"]] },
  { topic: "function", title: "関数", description: "整数n（-100以上100以下）を読み取り、二乗を返すsquare関数を定義して、その戻り値を表示してください。", hint: "int square(int n)をmainより前に定義します。", declarations: 'int square(int n) { return n * n; }', body: '    int n;\n    scanf("%d", &n);\n    printf("%d\\n", square(n));', cases: [["6\n", "36"], ["-3\n", "9"], ["0\n", "0"]] },
  { topic: "pointer", title: "ポインタ", description: "2つの整数を読み取り、ポインタを受け取るswap関数で値を交換し、交換後の2値を空白区切りで表示してください。", hint: "引数はint *a, int *bとし、呼び出すときは変数のアドレスを渡します。", declarations: 'void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }', body: '    int a, b;\n    scanf("%d %d", &a, &b);\n    swap(&a, &b);\n    printf("%d %d\\n", a, b);', cases: [["3 8\n", "8 3"], ["-2 0\n", "0 -2"], ["5 5\n", "5 5"]] },
  { topic: "struct", title: "構造体", description: "整数のIDと点数を読み取り、Student構造体に格納してください。IDと、60点以上ならPass、未満ならFailを空白区切りで表示してください。", hint: "struct Studentにidとscoreを定義し、ドットでメンバーにアクセスします。", declarations: 'struct Student { int id; int score; };', body: '    struct Student student;\n    scanf("%d %d", &student.id, &student.score);\n    printf("%d %s\\n", student.id, student.score >= 60 ? "Pass" : "Fail");', cases: [["1 80\n", "1 Pass"], ["2 59\n", "2 Fail"], ["3 60\n", "3 Pass"]] },
];

const lessonQuestionMap: Record<string, CQuestion[]> = Object.fromEntries(definitions.map((item, index) => {
  const topicId = `c-${item.topic}`;
  const question: CQuestion = {
    id: `${topicId}-q1`, no: String(index + 1).padStart(2, "0"), title: item.title,
    description: item.description, hint: item.hint, type: "lesson",
    sampleInput: item.cases[0][0], expectedOutput: item.cases[0][1],
    starterCode: program("    // ここにコードを書いてください"),
    answerCode: program(item.body, item.declarations),
    testCases: item.cases.map(([stdin, expectedOutput]) => ({ stdin, expectedOutput })),
  };
  return [topicId, [question]];
}));
export const cLearningPath = [
  "c-hello", "c-variables", "c-input", "c-numeric", "c-if", "c-logic", "c-switch", "c-project-checkout",
  "c-for", "c-while", "c-nested", "c-array", "c-search", "c-sort", "c-matrix", "c-stats", "c-function", "c-project-scores",
  "c-string", "c-ctype", "c-parsing", "c-text", "c-validation", "c-recursion",
  "c-pointer", "c-struct", "c-records", "c-project-inventory",
  "c-bits", "c-enum", "c-macro", "c-memory", "c-files",
  "c-project-inventory-advanced", "c-project-inventory-flags",
];
for (const question of [...basicLessons, ...controlLessons, ...arrayLessons, ...textLessons, ...functionLessons, ...systemLessons]) {
  const topicId = question.id.slice(0, question.id.lastIndexOf("-"));
  // Slugs may contain hyphens; locate the longest registered topic prefix instead.
  const topic = cLearningPath.filter((id) => question.id.startsWith(`${id}-`)).sort((a,b) => b.length-a.length)[0] ?? topicId;
  (lessonQuestionMap[topic] ??= []).push(question);
}
lessonQuestionMap["c-function"][0].verificationCode = "if(square(-3)!=9||square(0)!=0||square(7)!=49)return 91;";
lessonQuestionMap["c-pointer"][0].verificationCode = "int a=-3,b=8;swap(&a,&b);if(a!=8||b!=-3)return 91;";
export const cQuestionMap: Record<string, CQuestion[]> = Object.fromEntries(cLearningPath.map((topicId) =>
  [topicId, (lessonQuestionMap[topicId] ?? (topicId === "c-project-inventory-advanced" ? cInventoryStages : topicId === "c-project-inventory-flags" ? [cInventoryFlags] : [cProjects[topicId]])).map((question) => ({
    ...question, no: question.type === "lesson" ? String(cLearningPath.indexOf(topicId)+1).padStart(2,"0") : question.no,
  }))]
));
export const cCoreQuestionMap = Object.fromEntries(Object.entries(cQuestionMap).filter(([,questions]) => !questions[0].project?.optional));
export const cQuestionEntriesById = Object.fromEntries(Object.entries(cQuestionMap).flatMap(([topicId, questions]) =>
  questions.map((question, index) => [question.id, { ...question, topicId, questionIndex: index, questionCount: questions.length }])
));
export const cRequiredQuestionEntriesById = Object.fromEntries(Object.entries(cQuestionEntriesById).filter(([,question]) => !question.project?.optional));
export const getCQuestions = (topicId: string): CQuestion[] => cQuestionMap[topicId] ?? [];
export const hasCQuestions = (topicId: string) => getCQuestions(topicId).length > 0;

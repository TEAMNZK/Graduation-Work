type TestCase = { stdin: string; expectedOutput: string };
const cases = (...pairs: [string, string][]): TestCase[] =>
  pairs.map(([stdin, expectedOutput]) => ({ stdin, expectedOutput }));

// サンプルに加え、分岐・境界値・異なる入力を採点する。
export const javaTestCases: Record<string, TestCase[]> = {
  "07-input-output-q1": cases(["花子", "こんにちは、花子さん"], ["山田 太郎", "こんにちは、山田 太郎さん"]),
  "07-input-output-q2": cases(["0", "0"], ["-7", "-7"]),
  "07-input-output-q3": cases(["0 0", "0"], ["-3 10", "7"]),
  "07-input-output-q4": cases(["Hanako 30", "Hanako is 30"], ["Ken 0", "Ken is 0"]),
  "07-input-output-q5": cases(["Code", "[Code]"], ["C", "[C]"]),
  "08-if-q1": cases(["59", ""], ["61", "合格"]),
  "08-if-q2": cases(["7", ""], ["0", "Even"], ["-2", "Even"]),
  "08-if-q3": cases(["59", "Fail"], ["60", "Pass"], ["100", "Pass"]),
  "08-if-q4": cases(["1", "Positive"], ["-1", "Negative"]),
  "08-if-q5": cases(["12", ""], ["13", "Teen"], ["19", "Teen"], ["20", ""]),
  "09-switch-q1": cases(["2", "火曜日"], ["3", "水曜日"], ["4", "木曜日"], ["5", "金曜日"], ["6", "土曜日"], ["7", "日曜日"]),
  "09-switch-q2": cases(["1", "Red"], ["3", "Yellow"]),
  "09-switch-q3": cases(["1", "平日"], ["2", "平日"], ["3", "平日"], ["4", "平日"], ["5", "平日"], ["7", "休日"], ["0", "範囲外"], ["8", "範囲外"]),
  "09-switch-q4": cases(["1", "OK"], ["0", "NG"]),
  "09-switch-q5": cases(["python", ""], ["Java", ""]),
  "21-package-import-q1": cases(["0", "0"], ["-12", "-12"]),
  "11-while-q4": cases(["0", "0"], ["-3 3 0", "0"], ["1 2 3 0 99", "6"]),
  "21-package-import-q4": cases(["Python", "Python"], ["C", "C"]),
  "project-janken-q3": cases(["0 0", "あいこ"], ["1 1", "あいこ"], ["0 1", "勝敗あり"], ["2 0", "勝敗あり"]),
};

const hands = ["グー", "チョキ", "パー"];
const handCases: TestCase[] = [];
const resultCases: TestCase[] = [];
for (let player = 0; player < 3; player++) {
  for (let computer = 0; computer < 3; computer++) {
    const stdin = `${player} ${computer}`;
    const handOutput = `あなた: ${hands[player]}\n相手: ${hands[computer]}`;
    const result = player === computer ? "あいこ" : (player + 1) % 3 === computer ? "勝ち" : "負け";
    handCases.push({ stdin, expectedOutput: handOutput });
    resultCases.push({ stdin, expectedOutput: `${handOutput}\n結果: ${result}` });
  }
}
javaTestCases["project-janken-q4"] = handCases;
javaTestCases["project-janken-q5"] = resultCases;

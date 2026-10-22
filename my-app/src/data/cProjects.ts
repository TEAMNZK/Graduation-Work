import type { CQuestion } from "./cQuestions";

const program = (body: string, declarations = "") =>
  `#include <stdio.h>\n${declarations}\nint main(void) {\n${body}\n    return 0;\n}\n`;

function project(topic: string, no: string, title: string, description: string, hint: string,
  goal: string, prerequisiteTopicIds: string[], steps: string[], body: string,
  cases: [string, string][], declarations = "", final = false): CQuestion {
  return {
    id: `${topic}-q1`, no, title, description, hint, type: final ? "final_project" : "mini_project",
    project: { goal, prerequisiteTopicIds, steps },
    sampleInput: cases[0][0], expectedOutput: cases[0][1],
    starterCode: program("    // 制作手順を参考に完成させましょう"),
    answerCode: program(body, declarations),
    testCases: cases.map(([stdin, expectedOutput]) => ({ stdin, expectedOutput })),
  };
}

export const cProjects: Record<string, CQuestion> = {
  "c-project-checkout": project(
    "c-project-checkout", "制作1", "お会計アプリ",
    "商品の単価・個数・預かり金を空白区切りで読み取る、お会計アプリを作りましょう。\n単価は1〜1000円、個数は1〜100個、預かり金は0〜100000円です。\n1行目に合計金額を表示します。預かり金が合計以上なら2行目にChange、3行目にお釣りを表示します。不足していれば2行目にShort、3行目に不足額を表示してください。\n入力を促すメッセージは出力しません。",
    "合計は単価×個数です。預かり金と合計をifで比較し、差額を計算します。",
    "買い物の合計と、お釣り・不足額を計算できる電卓を完成させる。",
    ["c-hello", "c-variables", "c-input", "c-if"],
    ["単価・個数・預かり金を読み取る", "合計金額を計算して表示する", "支払いが足りるか分岐し、お釣りまたは不足額を表示する"],
    '    int price, count, paid;\n    scanf("%d %d %d", &price, &count, &paid);\n    int total = price * count;\n    printf("%d\\n", total);\n    if (paid >= total) printf("Change\\n%d\\n", paid - total);\n    else printf("Short\\n%d\\n", total - paid);',
    [["120 3 500\n", "360\nChange\n140"], ["250 2 500\n", "500\nChange\n0"], ["300 2 400\n", "600\nShort\n200"], ["1 1 0\n", "1\nShort\n1"], ["1000 100 100000\n", "100000\nChange\n0"]],
  ),
  "c-project-scores": project(
    "c-project-scores", "制作2", "成績集計アプリ",
    "クラスの成績をまとめるアプリを作りましょう。\n1行目から人数n（1〜30）、続くn個の整数から各人の点数（0〜100）を読み取ります。\n合計、平均の整数部分、最高点、最低点、60点以上の人数を、この順で1行ずつ表示してください。配列に点数を保存し、合格判定を行うis_pass関数を作って使ってみましょう。\n入力を促すメッセージは出力しません。",
    "最高点と最低点は最初の点数で初期化します。is_passは60点以上なら1、それ以外なら0を返します。",
    "人数が変わっても、クラス全体の成績を一度に集計できるアプリを完成させる。",
    ["c-for", "c-while", "c-array", "c-function"],
    ["人数を読み取り、配列に各人の点数を保存する", "is_pass関数を定義し、合計・最高点・最低点・合格者数を集計する", "整数の平均を計算し、指定の順で結果を表示する"],
    '    int n, scores[30], total = 0, passed = 0;\n    scanf("%d", &n);\n    for (int i = 0; i < n; i++) scanf("%d", &scores[i]);\n    int max = scores[0], min = scores[0];\n    for (int i = 0; i < n; i++) {\n        total += scores[i];\n        if (scores[i] > max) max = scores[i];\n        if (scores[i] < min) min = scores[i];\n        passed += is_pass(scores[i]);\n    }\n    printf("%d\\n%d\\n%d\\n%d\\n%d\\n", total, total / n, max, min, passed);',
    [["5\n45 60 90 75 50\n", "320\n64\n90\n45\n3"], ["1\n0\n", "0\n0\n0\n0\n0"], ["3\n59 60 61\n", "180\n60\n61\n59\n2"], ["3\n100 100 100\n", "300\n100\n100\n100\n3"], ["2\n0 1\n", "1\n0\n1\n0\n0"]],
    'int is_pass(int score) { return score >= 60; }',
  ),
  "c-project-inventory": project(
    "c-project-inventory", "制作3", "在庫管理アプリ",
    "商品の入出庫を管理するアプリを作りましょう。\n最初に商品ID（1〜9999）・初期在庫（0〜1000）・操作回数n（1〜20）を読み取ります。続くn行では、操作番号と個数（1〜100）を読み取ります。操作1は入庫、操作2は出庫です。\n入庫と、在庫が足りる出庫ではOKと表示して在庫を更新します。在庫不足の出庫ではShortと表示し、在庫は変更しません。各操作結果を1行ずつ表示した後、最後の行に商品IDと最終在庫を空白区切りで表示してください。\nProduct構造体と、そのポインタを受け取るupdate_stock関数を使ってみましょう。入力を促すメッセージは出力しません。",
    "Productにはidとstockを持たせます。関数内では(*product).stockで在庫にアクセスできます。操作に成功したときは1、不足したときは0を返します。",
    "入庫・出庫・在庫不足の判定を備えた、1商品の在庫管理アプリを完成させる。",
    ["c-for", "c-function", "c-pointer", "c-struct"],
    ["商品IDと初期在庫をProduct構造体に保存する", "Productのポインタを受け取り、入出庫を処理する関数を作る", "操作回数だけ繰り返して結果を表示する", "商品IDと最終在庫を表示し、在庫不足では数量が変わらないことを確かめる"],
    '    struct Product product;\n    int n;\n    scanf("%d %d %d", &product.id, &product.stock, &n);\n    for (int i = 0; i < n; i++) {\n        int operation, quantity;\n        scanf("%d %d", &operation, &quantity);\n        if (update_stock(&product, operation, quantity)) printf("OK\\n");\n        else printf("Short\\n");\n    }\n    printf("%d %d\\n", product.id, product.stock);',
    [["101 5 3\n1 3\n2 4\n2 6\n", "OK\nOK\nShort\n101 4"], ["2 0 2\n2 1\n1 5\n", "Short\nOK\n2 5"], ["3 10 2\n2 10\n2 1\n", "OK\nShort\n3 0"], ["4 0 3\n1 2\n1 3\n2 4\n", "OK\nOK\nOK\n4 1"]],
    'struct Product { int id; int stock; };\nint update_stock(struct Product *product, int operation, int quantity) {\n    if (operation == 1) { (*product).stock += quantity; return 1; }\n    if ((*product).stock < quantity) return 0;\n    (*product).stock -= quantity;\n    return 1;\n}', true,
  ),
};

cProjects["c-project-scores"].verificationCode = "if(is_pass(59)!=0||is_pass(60)!=1||is_pass(100)!=1)return 91;";
cProjects["c-project-inventory"].verificationCode = "struct Product item={7,3};if(update_stock(&item,2,4)!=0||item.stock!=3)return 91;if(update_stock(&item,1,2)!=1||item.stock!=5)return 91;if(update_stock(&item,2,5)!=1||item.stock!=0)return 91;";

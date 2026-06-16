export type JavaQuestion = {
  id: string;
  no: string;
  title: string;
  description: string;
  hint: string;
  expectedOutput?: string;
  starterCode: string;
  requiredPatterns?: string[];
  forbiddenPatterns?: string[];
  type: "lesson" | "mini_project" | "final_project";
};

export const javaQuestionMap: Record<string, JavaQuestion> = {
  "02-how-to-run": {
    id: "02-how-to-run",
    no: "02",
    title: "アプリ上での実行方法",
    description:
      "このアプリ上でコードを実行する練習です。Start と出力してください。",
    hint: 'System.out.println("Start"); を使います。',
    expectedOutput: "Start",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "03-hello-world-basic": {
    id: "03-hello-world",
    no: "03-基礎",
    title: "Hello World（基礎）",
    description: "「Hello Java」と表示しなさい。",
    hint: 'System.out.println("Hello Java"); を使います。',
    expectedOutput: "Hello Java",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "04-variables-basic": {
    id: "04-variables-basic",
    no: "04-基礎",
    title: "変数（基礎）",
    description: "nameという変数に自分の名前を入れて表示しなさい。",
    hint: 'String name = "..." ; と書いて、System.out.println(name); を使います。',
    expectedOutput: "Taro",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["String", "name", "System.out.println"],
    forbiddenPatterns: ['System.out.println("Taro")'],
    type: "lesson",
  },

  "05-data-types-basic": {
    id: "05-data-types",
    no: "05-基礎",
    title: "データ型（基礎）",
    description: "int型の変数 score に80を入れて表示しなさい。",
    hint: "int score = 80; と書いて、System.out.println(score); を使います。",
    expectedOutput: "80",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["int", "score", "System.out.println"],
    forbiddenPatterns: ["System.out.println(80)"],
    type: "lesson",
  },

  "06-operators-basic": {
    id: "06-operators",
    no: "06-基礎",
    title: "演算子（基礎）",
    description:
      "2つの整数 a = 10, b = 5 を変数に入れ、足し算、引き算、掛け算、割り算の結果をこの順に1行ずつ表示しなさい。",
    hint: "a + b, a - b, a * b, a / b を使います。",
    expectedOutput: `15
5
50
2`,
    starterCode: `public class Main {
  public static void main(String[] args) {
    int a = 10;
    int b = 5;

  }
}`,
    requiredPatterns: ["a", "b", "+", "-", "*", "/", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "07-input-output-basic": {
    id: "07-input-output",
    no: "07-基礎",
    title: "入力と出力（基礎）",
    description: '名前を入力し、「こんにちは、〇〇さん」と表示しなさい。',
    hint: "Scanner と nextLine() を使います。",
    expectedOutput: "こんにちは、太郎さん",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["Scanner", "nextLine", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "08-if-basic": {
    id: "08-if",
    no: "08-基礎",
    title: "if文（基礎）",
    description: '点数を入力し、60点以上なら「合格」と表示しなさい。',
    hint: "if を使って score >= 60 を判定します。",
    expectedOutput: "合格",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["Scanner", "if", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "09-switch-basic": {
    id: "09-switch",
    no: "09-基礎",
    title: "switch文（基礎）",
    description: "1〜7の数字を入力し、対応する曜日を表示しなさい。今回は 1 が入力されたとき「月曜日」と表示するものとします。",
    hint: "switch と case を使います。",
    expectedOutput: "月曜日",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["Scanner", "switch", "case", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "10-for-basic": {
    id: "10-for",
    no: "10-基礎",
    title: "for文（基礎）",
    description: "1から10まで表示しなさい。",
    hint: "for文を使って 1 から 10 まで繰り返します。",
    expectedOutput: `1
2
3
4
5
6
7
8
9
10`,
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["for", "System.out.println"],
    forbiddenPatterns: [
      "System.out.println(1);",
      "System.out.println(2);",
      "System.out.println(3);",
      "System.out.println(4);",
      "System.out.println(5);",
      "System.out.println(6);",
      "System.out.println(7);",
      "System.out.println(8);",
      "System.out.println(9);",
      "System.out.println(10);",
    ],
    type: "lesson",
  },
};


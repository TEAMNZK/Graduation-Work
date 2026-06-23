export type JavaQuestion = {
  id: string;
  no: string;
  title: string;
  description: string;
  hint: string;
  sampleInput?: string;
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
    requiredPatterns: ["System.out.print"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "03-hello-world": {
    id: "03-hello-world",
    no: "03",
    title: "Hello World",
    description: "Hello World と出力してください。",
    hint: 'System.out.println("Hello World"); を使います。',
    expectedOutput: "Hello World",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "04-variables": {
    id: "04-variables",
    no: "04",
    title: "変数",
    description:
      "整数型の変数 score に 100 を代入し、その値を出力してください。",
    hint: "int score = 100; のように書きます。",
    expectedOutput: "100",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["score", "System.out.println"],
    forbiddenPatterns: ["System.out.println(100)"],
    type: "lesson",
  },

  "05-data-types": {
    id: "05-data-types",
    no: "05",
    title: "データ型",
    description: '文字列型の変数 name に "Java" を代入し、出力してください。',
    hint: 'String name = "Java"; を使います。',
    expectedOutput: "Java",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["String", "name", "System.out.println"],
    forbiddenPatterns: ['System.out.println("Java")'],
    type: "lesson",
  },

  "06-operators": {
    id: "06-operators",
    no: "06",
    title: "演算子",
    description:
      "10 + 5 の結果を変数 result に代入し、その値を出力してください。",
    hint: "int result = 10 + 5; と書けます。",
    expectedOutput: "15",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["result", "+", "System.out.println"],
    forbiddenPatterns: ["System.out.println(15)"],
    type: "lesson",
  },

  "07-input-output": {
    id: "07-input-output",
    no: "07",
    title: "入力と出力",
    description: "整数を1つ入力し、その値をそのまま出力してください。",
    hint: "Scanner と nextInt() を使います。",
    sampleInput: "10",
    expectedOutput: "10",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["Scanner", "nextInt", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "08-if": {
    id: "08-if",
    no: "08",
    title: "if文",
    description:
      '整数 x = 10 を宣言し、x が 5 より大きい場合に "big" と出力してください。',
    hint: "if (x > 5) を使います。",
    expectedOutput: "big",
    starterCode: `public class Main {
  public static void main(String[] args) {
    int x = 10;

  }
}`,
    requiredPatterns: ["if", "x", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "09-switch": {
    id: "09-switch",
    no: "09",
    title: "switch文",
    description:
      "int num = 2; を宣言し、switch文を使って two と出力してください。",
    hint: "switch (num) と case 2: を使います。",
    expectedOutput: "two",
    starterCode: `public class Main {
  public static void main(String[] args) {
    int num = 2;

  }
}`,
    requiredPatterns: ["switch", "case", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "10-for": {
    id: "10-for",
    no: "10",
    title: "for文",
    description:
      "for文を使って 1 から 3 までの数字を1行ずつ出力してください。",
    hint: "for (int i = 1; i <= 3; i++) を使います。",
    expectedOutput: `1
2
3`,
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["for", "System.out.println"],
    forbiddenPatterns: [
      "System.out.println(1);",
      "System.out.println(2);",
      "System.out.println(3);",
    ],
    type: "lesson",
  },

  "11-while": {
    id: "11-while",
    no: "11",
    title: "while文",
    description:
      "while文を使って 1 から 3 までの数字を1行ずつ出力してください。",
    hint: "繰り返し用の変数を使い、最後に増やします。",
    expectedOutput: `1
2
3`,
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["while", "System.out.println"],
    forbiddenPatterns: [
      "System.out.println(1);",
      "System.out.println(2);",
      "System.out.println(3);",
    ],
    type: "lesson",
  },

  "project-janken": {
    id: "project-janken",
    no: "演習",
    title: "じゃんけんゲーム",
    description:
      "ユーザー入力と条件分岐を使って、簡単なじゃんけんゲームを作成してください。",
    hint: "Scanner、Random、if文またはswitch文を組み合わせます。",
    expectedOutput: "",
    starterCode: `import java.util.Random;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["Scanner", "Random"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
};

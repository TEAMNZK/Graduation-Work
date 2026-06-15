export type JavaQuestion = {
  title: string;
  description: string;
  hint: string;
  expectedOutput: string;
  starterCode: string;

  // 追加: レベル3判定用
  requiredPatterns?: string[];
  forbiddenPatterns?: string[];
  // 追加ここまで
};

export const javaQuestionMap: Record<string, JavaQuestion> = {
  "if文の基本": {
    title: "if文の基本",
    description:
      "整数 x = 10 を宣言し、x が 5 より大きい場合に「big」と出力してください。",
    hint: "if の条件式の中で x > 5 を使います。",
    expectedOutput: "big",
    starterCode: `public class Main {
  public static void main(String[] args) {
    int x = 10;

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["if", "x", "System.out.println"],
    forbiddenPatterns: ['System.out.println("big");'],
    // 追加ここまで
  },

  "変数の宣言": {
    title: "変数の宣言",
    description:
      "整数型の変数 score に 100 を代入し、その値を出力してください。",
    hint: "int score = 100; の形で宣言し、System.out.println(score); を使います。",
    expectedOutput: "100",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["score", "System.out.println"],
    forbiddenPatterns: ["System.out.println(100)"],
    // 追加ここまで
  },

  "データ型": {
    title: "データ型",
    description:
      '文字列型の変数 name に "Java" を代入し、出力してください。',
    hint: 'String name = "Java"; の形です。',
    expectedOutput: "Java",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["String", "name", "System.out.println"],
    forbiddenPatterns: ['System.out.println("Java")'],
    // 追加ここまで
  },

  "代入": {
    title: "代入",
    description:
      "整数型の変数 score に 100 を代入し、その値を出力してください。",
    hint: "System.out.println(score); を使います。",
    expectedOutput: "100",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["score", "100", "System.out.println"],
    forbiddenPatterns: ["System.out.println(100)"],
    // 追加ここまで
  },

  "for文の基本": {
    title: "for文の基本",
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
    // 追加: レベル3判定用
    requiredPatterns: ["for", "System.out.println"],
    forbiddenPatterns: [
      "System.out.println(1);",
      "System.out.println(2);",
      "System.out.println(3);",
    ],
    // 追加ここまで
  },

  "while文の基本": {
    title: "while文の基本",
    description:
      "while文を使って 1 から 3 までの数字を1行ずつ出力してください。",
    hint: "初期値、条件式、増加処理の3つを意識します。",
    expectedOutput: `1
2
3`,
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["while", "System.out.println"],
    forbiddenPatterns: [
      "System.out.println(1);",
      "System.out.println(2);",
      "System.out.println(3);",
    ],
    // 追加ここまで
  },

  "配列の宣言": {
    title: "配列の宣言",
    description:
      "int型の配列 numbers を宣言し、1, 2, 3 を入れてください。その後、numbers[0] を出力してください。",
    hint: "int[] numbers = {1, 2, 3}; の形で書けます。",
    expectedOutput: "1",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["int[]", "numbers", "System.out.println"],
    forbiddenPatterns: ["System.out.println(1)"],
    // 追加ここまで
  },

  "要素の取得": {
    title: "要素の取得",
    description:
      "int型の配列 numbers = {10, 20, 30}; を宣言し、2番目の要素を出力してください。",
    hint: "配列の添字は 0 から始まります。",
    expectedOutput: "20",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["numbers", "[1]", "System.out.println"],
    forbiddenPatterns: ["System.out.println(20)"],
    // 追加ここまで
  },

  "要素の更新": {
    title: "要素の更新",
    description:
      "int型の配列 numbers = {1, 2, 3}; を宣言し、3番目の要素を 100 に変更して出力してください。",
    hint: "numbers[2] = 100; のように代入できます。",
    expectedOutput: "100",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["numbers", "[2]", "100", "System.out.println"],
    forbiddenPatterns: ["System.out.println(100)"],
    // 追加ここまで
  },

  "メソッド定義": {
    title: "メソッド定義",
    description:
      'hello という名前のメソッドを作成し、その中で "Hello" と出力してください。main メソッドから呼び出してください。',
    hint: "static void hello() { ... } の形で定義できます。",
    expectedOutput: "Hello",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["hello(", "static", "hello();"],
    forbiddenPatterns: [],
    // 追加ここまで
  },

  "引数": {
    title: "引数",
    description:
      '引数として文字列を受け取り、その文字列を出力するメソッドを作成してください。main メソッドから "Java" を渡してください。',
    hint: "static void printName(String name) のように定義します。",
    expectedOutput: "Java",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["printName(", "String", 'printName("Java")'],
    forbiddenPatterns: ['System.out.println("Java")'],
    // 追加ここまで
  },

  "戻り値": {
    title: "戻り値",
    description:
      "整数 10 を返すメソッドを作成し、その戻り値を main メソッドで出力してください。",
    hint: "static int getNumber() のように定義します。",
    expectedOutput: "10",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    // 追加: レベル3判定用
    requiredPatterns: ["getNumber(", "return 10", "System.out.println"],
    forbiddenPatterns: ["System.out.println(10)"],
    // 追加ここまで
  },
};
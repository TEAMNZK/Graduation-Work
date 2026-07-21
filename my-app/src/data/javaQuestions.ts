import { javaExerciseQuestionMap } from "@/data/javaExerciseQuestions";

export type JavaQuestion = {
  id: string;
  no: string;
  title: string;
  description: string;
  hint: string;
  sampleInput?: string;
  expectedOutput?: string;
  starterCode: string;
  answerCode?: string;
  requiredPatterns?: string[];
  forbiddenPatterns?: string[];
  inheritPreviousCode?: boolean;
  type: "lesson" | "mini_project" | "final_project";
};

const baseJavaQuestionMap: Record<string, JavaQuestion> = {
  "01-java-overview": {
    id: "01-java-overview",
    no: "01",
    title: "Javaとは",
    description:
      "Javaの特徴や用途を確認しましょう。この問題は確認用なので、自動採点は行いません。",
    hint: "Javaで作れるものや特徴を教科書ページで確認してください。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "lesson",
  },

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
    // ここに入力してください（例: System.out.println("Start");）
  }
}`,
    answerCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Start");
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
    description: "「Hello Java」と表示しなさい。",
    hint: '`System.out.println("Hello Java");` を使って標準出力に文字列を表示します。',
    expectedOutput: "Hello Java",
    starterCode: `public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: System.out.println("Hello Java");）
  }
}`,
    answerCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello Java");
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
      'name という変数に "Taro" を入れて表示しなさい。',
    hint: '`String name = "Taro";` として変数を定義し、`System.out.println(name);` で表示します。',
    expectedOutput: "Taro",
    starterCode: `public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: String name = "Taro"; System.out.println(name);）
  }
}`,
    answerCode: `public class Main {
  public static void main(String[] args) {
    String name = "Taro";
    System.out.println(name);
  }
}`,
    requiredPatterns: ["String", "name", "System.out.println"],
    forbiddenPatterns: ['System.out.println("Taro")'],
    type: "lesson",
  },

  "05-data-types": {
    id: "05-data-types",
    no: "05",
    title: "データ型",
    description: "int型の変数 score に 80 を入れて表示しなさい。",
    hint: "`int score = 80;` を宣言し、`System.out.println(score);` で値を出力します。",
    expectedOutput: "80",
    starterCode: `public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: int score = 80; System.out.println(score);）
  }
}`,
    answerCode: `public class Main {
  public static void main(String[] args) {
    int score = 80;
    System.out.println(score);
  }
}`,
    requiredPatterns: ["int", "score", "System.out.println"],
    forbiddenPatterns: ["System.out.println(80)"],
    type: "lesson",
  },

  "06-operators": {
    id: "06-operators",
    no: "06",
    title: "演算子",
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
    // ここに入力してください（例: System.out.println(a + b); 等）
  }
}`,
    requiredPatterns: ["a", "b", "+", "-", "*", "/", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "07-input-output": {
    id: "07-input-output",
    no: "07",
    title: "入力と出力",
    description:
      '名前を入力し、「こんにちは、〇〇さん」と表示しなさい。',
    hint: "`Scanner scanner = new Scanner(System.in);` と `scanner.nextLine()` を使って標準入力を読み取り、表示します。",
    sampleInput: "太郎",
    expectedOutput: "こんにちは、太郎さん",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: Scanner scanner = new Scanner(System.in); String name = scanner.nextLine(); System.out.println("こんにちは、" + name + "さん");）
  }
}`,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String name = scanner.nextLine();
    System.out.println("こんにちは、" + name + "さん");
  }
}`,
    requiredPatterns: ["Scanner", "nextLine", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "08-if": {
    id: "08-if",
    no: "08",
    title: "if文",
    description:
      '点数を入力し、60点以上なら「合格」と表示しなさい。',
    hint: "`Scanner` で点数を読み取り、`if (score >= 60)` で判定して `System.out.println(\"合格\")` を出力します。",
    sampleInput: "60",
    expectedOutput: "合格",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: Scanner scanner = new Scanner(System.in); int score = scanner.nextInt();）
  }
}`,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int score = scanner.nextInt();
    if (score >= 60) {
      System.out.println("合格");
    }
  }
}`,
    requiredPatterns: ["Scanner", "if", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "09-switch": {
    id: "09-switch",
    no: "09",
    title: "switch文",
    description:
      "1〜7の数字を入力し、対応する曜日を表示しなさい。今回は 1 が入力されたとき「月曜日」と表示するものとします。",
    hint: "`switch` と `case` を使って、1→月曜日、2→火曜日... のように分岐させます。",
    sampleInput: "1",
    expectedOutput: "月曜日",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: Scanner scanner = new Scanner(System.in); int day = scanner.nextInt();）
  }
}`,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int day = scanner.nextInt();
    switch (day) {
      case 1:
        System.out.println("月曜日");
        break;
      case 2:
        System.out.println("火曜日");
        break;
      case 3:
        System.out.println("水曜日");
        break;
      case 4:
        System.out.println("木曜日");
        break;
      case 5:
        System.out.println("金曜日");
        break;
      case 6:
        System.out.println("土曜日");
        break;
      case 7:
        System.out.println("日曜日");
        break;
      default:
        break;
    }
  }
}`,
    requiredPatterns: ["Scanner", "switch", "case", "System.out.println"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "10-for": {
    id: "10-for",
    no: "10",
    title: "for文",
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
    // ここに入力してください（例: for (int i = 1; i <= 10; i++) { System.out.println(i); }）
  }
}`,
    answerCode: `public class Main {
  public static void main(String[] args) {
    for (int i = 1; i <= 10; i++) {
      System.out.println(i);
    }
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

  "11-while": {
    id: "11-while",
    no: "11",
    title: "while文",
    description:
      "1から3までの数を while で順番に足し算し、合計を最後に出力してください。",
    hint:
      "while ループで数を繰り返し足し合わせ、ループ終了後に合計を表示します。",
    expectedOutput: "6",
    starterCode: `public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: int i = 1; int sum = 0; while (i <= 3) { sum += i; i++; } System.out.println(sum);）
  }
}`,
    answerCode: `public class Main {
  public static void main(String[] args) {
    int i = 1;
    int sum = 0;
    while (i <= 3) {
      sum += i;
      i++;
    }
    System.out.println(sum);
  }
}`,
    requiredPatterns: ["while", "sum", "System.out.println"],
    forbiddenPatterns: [
      "System.out.println(1);",
      "System.out.println(2);",
      "System.out.println(3);",
    ],
    type: "lesson",
  },

  "12-array": {
    id: "12-array",
    no: "12",
    title: "配列",
    description:
      "int型の配列 numbers を宣言し、1, 2, 3 を入れてください。その後、numbers[0] を出力してください。",
    hint: "int[] numbers = {1, 2, 3}; の形で書けます。",
    expectedOutput: "1",
    starterCode: `public class Main {
  public static void main(String[] args) {
    // ここに入力してください（例: int[] numbers = {1, 2, 3}; System.out.println(numbers[0]);）
  }
}`,
    answerCode: `public class Main {
  public static void main(String[] args) {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[0]);
  }
}`,
    requiredPatterns: ["int[]", "numbers", "System.out.println"],
    forbiddenPatterns: ["System.out.println(1)"],
    type: "lesson",
  },

  "13-method": {
    id: "13-method",
    no: "13",
    title: "メソッド",
    description:
      'hello という名前のメソッドを作成し、その中で "Hello" と出力してください。main メソッドから呼び出してください。',
    hint: "static void hello() { ... } の形で定義できます。",
    expectedOutput: "Hello",
    starterCode: `public class Main {
  public static void hello() {

  }

  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["hello(", "static", "hello();"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "14-overload": {
    id: "14-overload",
    no: "14",
    title: "オーバーロード",
    description:
      "同じ名前で、引数の数が異なる printData メソッドを2つ作成してください。",
    hint: "メソッド名は同じで、引数リストを変えます。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["printData(", "static"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "15-class-object": {
    id: "15-class-object",
    no: "15",
    title: "クラスとオブジェクト",
    description:
      "Student クラスを作成し、name を持たせて main メソッドでオブジェクトを作成してください。",
    hint: "class Student { ... } を作り、new Student() を使います。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["class", "new"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "16-constructor": {
    id: "16-constructor",
    no: "16",
    title: "コンストラクタ",
    description:
      "name を受け取るコンストラクタを持つ Student クラスを作成してください。",
    hint: "クラス名と同じ名前のメソッドがコンストラクタです。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["Student(", "this."],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "17-static": {
    id: "17-static",
    no: "17",
    title: "static",
    description:
      "static 変数または static メソッドを使った簡単なコードを書いてください。",
    hint: "クラス名.メソッド名 の呼び出しを意識します。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["static"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "18-inheritance": {
    id: "18-inheritance",
    no: "18",
    title: "継承",
    description:
      "Person クラスを継承した Student クラスを作成してください。",
    hint: "extends を使います。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["extends"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "19-polymorphism": {
    id: "19-polymorphism",
    no: "19",
    title: "ポリモーフィズム",
    description:
      "親クラス型の変数で子クラスのオブジェクトを扱うコードを書いてください。",
    hint: "Parent p = new Child(); の形を考えます。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["new"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "20-abstract-interface": {
    id: "20-abstract-interface",
    no: "20",
    title: "抽象クラス・インターフェース",
    description:
      "インターフェースまたは抽象クラスを使った簡単なコードを書いてください。",
    hint: "interface または abstract class を使います。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "21-package-import": {
    id: "21-package-import",
    no: "21",
    title: "パッケージとimport",
    description:
      "Scanner を使うために import 文を書いて、整数を1つ入力して表示してください。",
    hint: "import java.util.Scanner; を使います。",
    expectedOutput: "10",
    starterCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["import", "Scanner"],
    sampleInput: "10",
    forbiddenPatterns: [],
    type: "lesson",
  },

  "22-exception": {
    id: "22-exception",
    no: "22",
    title: "例外処理",
    description:
      "try-catch を使って例外処理の形を書いてください。",
    hint: "try { ... } catch (Exception e) { ... } の形です。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["try", "catch"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "23-file-io": {
    id: "23-file-io",
    no: "23",
    title: "ファイル入出力",
    description:
      "ファイルの読み書きに関する基本コードを書いてください。",
    hint: "BufferedReader や FileWriter などを調べながら書きます。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) throws Exception {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "24-collection": {
    id: "24-collection",
    no: "24",
    title: "コレクション",
    description:
      "ArrayList を使って文字列を追加し、1つ表示してください。",
    hint: "ArrayList<String> list = new ArrayList<>(); を使います。",
    expectedOutput: "",
    starterCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["ArrayList"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "25-generics": {
    id: "25-generics",
    no: "25",
    title: "ジェネリクス",
    description:
      "ジェネリクスを使った ArrayList の宣言を書いてください。",
    hint: "ArrayList<String> のように型を指定します。",
    expectedOutput: "",
    starterCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["<", ">", "ArrayList"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "26-lambda": {
    id: "26-lambda",
    no: "26",
    title: "ラムダ式",
    description:
      "ラムダ式を1つ書いてください。",
    hint: "() -> や x -> の形を使います。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["->"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "27-stream-api": {
    id: "27-stream-api",
    no: "27",
    title: "Stream API",
    description:
      "Stream API を使った簡単なコードを書いてください。",
    hint: ".stream() を使います。",
    expectedOutput: "",
    starterCode: `import java.util.Arrays;
import java.util.List;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [".stream()"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "28-date-time": {
    id: "28-date-time",
    no: "28",
    title: "日付と時刻",
    description:
      "現在の日付または時刻を扱うコードを書いてください。",
    hint: "LocalDate や LocalDateTime を使います。",
    expectedOutput: "",
    starterCode: `import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: ["LocalDate"],
    forbiddenPatterns: [],
    type: "lesson",
  },

  "32-final-exercise": {
    id: "32-final-exercise",
    no: "32",
    title: "総合演習",
    description:
      "これまで学んだ内容を組み合わせるための総合演習です。",
    hint: "クラス、配列、メソッド、条件分岐などを整理して使いましょう。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "lesson",
  },

};

const baseAnswerCodeMap: Record<string, string> = {
  "01-java-overview": `public class Main {
  public static void main(String[] args) {
    // JavaはWebアプリ、Androidアプリ、業務システムなどで使われます。
    // この確認問題では出力は必要ありません。
  }
}`,
  "02-how-to-run": `public class Main {
  public static void main(String[] args) {
    System.out.println("Start");
  }
}`,
  "03-hello-world": `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello Java");
  }
}`,
  "04-variables": `public class Main {
  public static void main(String[] args) {
    String name = "Taro";
    System.out.println(name);
  }
}`,
  "05-data-types": `public class Main {
  public static void main(String[] args) {
    int score = 80;
    System.out.println(score);
  }
}`,
  "06-operators": `public class Main {
  public static void main(String[] args) {
    int a = 10;
    int b = 5;

    System.out.println(a + b);
    System.out.println(a - b);
    System.out.println(a * b);
    System.out.println(a / b);
  }
}`,
  "07-input-output": `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String name = scanner.nextLine();

    System.out.println("こんにちは、" + name + "さん");
  }
}`,
  "08-if": `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int score = scanner.nextInt();

    if (score >= 60) {
      System.out.println("合格");
    }
  }
}`,
  "09-switch": `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int day = scanner.nextInt();

    switch (day) {
      case 1:
        System.out.println("月曜日");
        break;
      case 2:
        System.out.println("火曜日");
        break;
      default:
        System.out.println("その他");
        break;
    }
  }
}`,
  "10-for": `public class Main {
  public static void main(String[] args) {
    for (int i = 1; i <= 10; i++) {
      System.out.println(i);
    }
  }
}`,
  "11-while": `public class Main {
  public static void main(String[] args) {
    int count = 1;

    while (count <= 3) {
      System.out.println(count);
      count++;
    }
  }
}`,
  "project-janken": `import java.util.Random;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    Random random = new Random();

    int player = scanner.nextInt();
    int computer = random.nextInt(3);

    if (player == computer) {
      System.out.println("あいこ");
    } else if ((player == 0 && computer == 1)
        || (player == 1 && computer == 2)
        || (player == 2 && computer == 0)) {
      System.out.println("勝ち");
    } else {
      System.out.println("負け");
    }
  }
}`,
  "12-array": `public class Main {
  public static void main(String[] args) {
    int[] numbers = {1, 2, 3};
    System.out.println(numbers[0]);
  }
}`,
  "13-method": `public class Main {
  public static void hello() {
    System.out.println("Hello");
  }

  public static void main(String[] args) {
    hello();
  }
}`,
  "14-overload": `public class Main {
  public static void printData(String text) {
  }

  public static void printData(int number) {
  }

  public static void main(String[] args) {
  }
}`,
  "project-score-app": `public class Main {
  public static String judge(int score) {
    if (score >= 80) {
      return "A";
    }
    if (score >= 60) {
      return "B";
    }
    return "C";
  }

  public static void main(String[] args) {
    int[] scores = {90, 70, 50};
    String result = judge(scores[0]);
  }
}`,
  "15-class-object": `class Student {
  String name;
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student();
    student.name = "Taro";
  }
}`,
  "16-constructor": `class Student {
  String name;

  Student(String name) {
    this.name = name;
  }
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student("Taro");
  }
}`,
  "17-static": `public class Main {
  static int count = 0;

  static void addCount() {
    count++;
  }

  public static void main(String[] args) {
    addCount();
  }
}`,
  "18-inheritance": `class Person {
}

class Student extends Person {
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student();
  }
}`,
  "19-polymorphism": `class Parent {
}

class Child extends Parent {
}

public class Main {
  public static void main(String[] args) {
    Parent parent = new Child();
  }
}`,
  "20-abstract-interface": `interface Printable {
  void print();
}

class Report implements Printable {
  public void print() {
  }
}

public class Main {
  public static void main(String[] args) {
    Printable report = new Report();
  }
}`,
  "21-package-import": `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int number = scanner.nextInt();
    System.out.println(number);
  }
}`,
  "22-exception": `public class Main {
  public static void main(String[] args) {
    try {
      int number = Integer.parseInt("10");
    } catch (Exception e) {
    }
  }
}`,
  "23-file-io": `import java.io.BufferedReader;
import java.io.FileReader;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader reader = null;
  }
}`,
  "24-collection": `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Java");
  }
}`,
  "project-todo": `import java.util.ArrayList;

class Todo {
  String title;

  Todo(String title) {
    this.title = title;
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Todo> todos = new ArrayList<>();
    todos.add(new Todo("勉強する"));
  }
}`,
  "25-generics": `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> names = new ArrayList<>();
    names.add("Taro");
  }
}`,
  "26-lambda": `interface Message {
  void show();
}

public class Main {
  public static void main(String[] args) {
    Message message = () -> {
    };
  }
}`,
  "27-stream-api": `import java.util.Arrays;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3);
    numbers.stream().filter(n -> n > 1).count();
  }
}`,
  "28-date-time": `import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {
    LocalDate today = LocalDate.now();
  }
}`,
  "project-library-enhance": `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  LocalDate dueDate;
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
  }
}`,
  "32-final-exercise": `class Student {
  String name;
  int score;

  Student(String name, int score) {
    this.name = name;
    this.score = score;
  }
}

public class Main {
  public static void main(String[] args) {
    Student[] students = {
      new Student("Taro", 80),
      new Student("Hanako", 90)
    };
  }
}`,
  "project-library-final": `import java.util.ArrayList;

class Book {
  String title;
  boolean borrowed;

  Book(String title) {
    this.title = title;
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
    books.add(new Book("Java入門"));
  }
}`,
};

const createPrintAnswerCode = (output: string): string => `public class Main {
  public static void main(String[] args) {
    System.out.println("${output}");
  }
}`;

type ReviewQuestionSpec = {
  title: string;
  description: string;
  hint: string;
  sampleInput?: string;
  expectedOutput?: string;
  starterCode?: string;
  answerCode: string;
  requiredPatterns?: string[];
  forbiddenPatterns?: string[];
};

const lessonReviewSpecs: Record<string, ReviewQuestionSpec[]> = {
  "01-java-overview": [
    {
      title: "Javaの用途",
      description: "Javaで作れるものを1つ選び、Webアプリと出力してください。",
      hint: "JavaはWebアプリ、Androidアプリ、業務システムなどで使われます。",
      expectedOutput: "Webアプリ",
      answerCode: createPrintAnswerCode("Webアプリ"),
      requiredPatterns: ["System.out.print"],
    },
    {
      title: "Javaの特徴",
      description: "Javaの特徴として、実行環境があれば動かしやすいことを意識し、どこでも動くと出力してください。",
      hint: "Javaは環境を整えることでさまざまな場所で実行できます。",
      expectedOutput: "どこでも動く",
      answerCode: createPrintAnswerCode("どこでも動く"),
      requiredPatterns: ["System.out.print"],
    },
    {
      title: "Javaファイル名",
      description: "Javaの基本ファイル名として Main.java と出力してください。",
      hint: "このドリルでは Main.java を使って実行します。",
      expectedOutput: "Main.java",
      answerCode: createPrintAnswerCode("Main.java"),
      requiredPatterns: ["System.out.print"],
    },
    {
      title: "mainメソッド",
      description: "Javaプログラムの開始地点を意識し、mainと出力してください。",
      hint: "Javaではmainメソッドから処理が始まります。",
      expectedOutput: "main",
      answerCode: createPrintAnswerCode("main"),
      requiredPatterns: ["System.out.print"],
    },
  ],
  "02-how-to-run": [
    {
      title: "実行メッセージ",
      description: "コードが実行できることを確認するため、Run OK と出力してください。",
      hint: "System.out.printlnで文字列を出力します。",
      expectedOutput: "Run OK",
      answerCode: createPrintAnswerCode("Run OK"),
      requiredPatterns: ["System.out.print"],
    },
    {
      title: "2行の出力",
      description: "1行目にCompile、2行目にRunと出力してください。",
      hint: "printlnを2回使います。",
      expectedOutput: `Compile
Run`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Compile");
    System.out.println("Run");
  }
}`,
      requiredPatterns: ["System.out.println"],
    },
    {
      title: "実行順序",
      description: "処理が上から順に動くことを確認し、First、Secondの順に出力してください。",
      hint: "書いた順にprintlnが実行されます。",
      expectedOutput: `First
Second`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("First");
    System.out.println("Second");
  }
}`,
      requiredPatterns: ["System.out.println"],
    },
    {
      title: "実行完了",
      description: "最後に Finished と出力してください。",
      hint: "文字列はダブルクォーテーションで囲みます。",
      expectedOutput: "Finished",
      answerCode: createPrintAnswerCode("Finished"),
      requiredPatterns: ["System.out.print"],
    },
  ],
  "03-hello-world": [
    {
      title: "Hello Code",
      description: "Hello Code と出力してください。",
      hint: "Hello Java と同じ形で文字列を変えます。",
      expectedOutput: "Hello Code",
      answerCode: createPrintAnswerCode("Hello Code"),
      requiredPatterns: ["System.out.println"],
    },
    {
      title: "あいさつの出力",
      description: "こんにちは と出力してください。",
      hint: "日本語の文字列もprintlnで出力できます。",
      expectedOutput: "こんにちは",
      answerCode: createPrintAnswerCode("こんにちは"),
      requiredPatterns: ["System.out.println"],
    },
    {
      title: "2行のあいさつ",
      description: "1行目にHello、2行目にJavaと出力してください。",
      hint: "改行したいときはprintlnを複数回使います。",
      expectedOutput: `Hello
Java`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello");
    System.out.println("Java");
  }
}`,
      requiredPatterns: ["System.out.println"],
    },
    {
      title: "文字列の連結",
      description: "Hello と World を + でつなげて Hello World と出力してください。",
      hint: "文字列同士は + で連結できます。",
      expectedOutput: "Hello World",
      answerCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello " + "World");
  }
}`,
      requiredPatterns: ["+", "System.out.println"],
    },
  ],
  "04-variables": [
    {
      title: "名前を変数で表示",
      description: "String型の変数 userName に Hanako を入れて表示してください。",
      hint: "String userName = \"Hanako\"; のように書きます。",
      expectedOutput: "Hanako",
      answerCode: `public class Main {
  public static void main(String[] args) {
    String userName = "Hanako";
    System.out.println(userName);
  }
}`,
      requiredPatterns: ["String", "userName", "System.out.println"],
      forbiddenPatterns: ['System.out.println("Hanako")'],
    },
    {
      title: "数値を変数で表示",
      description: "int型の変数 age に 20 を入れて表示してください。",
      hint: "整数はint型で扱えます。",
      expectedOutput: "20",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int age = 20;
    System.out.println(age);
  }
}`,
      requiredPatterns: ["int", "age", "System.out.println"],
      forbiddenPatterns: ["System.out.println(20)"],
    },
    {
      title: "変数の再代入",
      description: "int型の変数 count に 1 を入れたあと 2 を再代入して表示してください。",
      hint: "一度作った変数には、新しい値を入れ直せます。",
      expectedOutput: "2",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int count = 1;
    count = 2;
    System.out.println(count);
  }
}`,
      requiredPatterns: ["int", "count", "System.out.println"],
    },
    {
      title: "変数を連結",
      description: "String型の変数 language に Java を入れて、I study Java と出力してください。",
      hint: "文字列と変数は + で連結できます。",
      expectedOutput: "I study Java",
      answerCode: `public class Main {
  public static void main(String[] args) {
    String language = "Java";
    System.out.println("I study " + language);
  }
}`,
      requiredPatterns: ["String", "language", "+", "System.out.println"],
    },
  ],
  "05-data-types": [
    {
      title: "double型",
      description: "double型の変数 price に 12.5 を入れて表示してください。",
      hint: "小数はdouble型で扱えます。",
      expectedOutput: "12.5",
      answerCode: `public class Main {
  public static void main(String[] args) {
    double price = 12.5;
    System.out.println(price);
  }
}`,
      requiredPatterns: ["double", "price", "System.out.println"],
    },
    {
      title: "boolean型",
      description: "boolean型の変数 isPassed に true を入れて表示してください。",
      hint: "真偽値はboolean型で扱えます。",
      expectedOutput: "true",
      answerCode: `public class Main {
  public static void main(String[] args) {
    boolean isPassed = true;
    System.out.println(isPassed);
  }
}`,
      requiredPatterns: ["boolean", "isPassed", "System.out.println"],
    },
    {
      title: "char型",
      description: "char型の変数 rank に A を入れて表示してください。",
      hint: "1文字はシングルクォーテーションで囲みます。",
      expectedOutput: "A",
      answerCode: `public class Main {
  public static void main(String[] args) {
    char rank = 'A';
    System.out.println(rank);
  }
}`,
      requiredPatterns: ["char", "rank", "System.out.println"],
    },
    {
      title: "型の使い分け",
      description: "int score = 75; と boolean passed = true; を用意し、75:true と出力してください。",
      hint: "数値、文字列、真偽値を + でつなげます。",
      expectedOutput: "75:true",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int score = 75;
    boolean passed = true;
    System.out.println(score + ":" + passed);
  }
}`,
      requiredPatterns: ["int", "boolean", "System.out.println"],
    },
  ],
  "06-operators": [
    {
      title: "余りの計算",
      description: "10 を 3 で割った余りを表示してください。",
      hint: "余りは % 演算子で求めます。",
      expectedOutput: "1",
      answerCode: `public class Main {
  public static void main(String[] args) {
    System.out.println(10 % 3);
  }
}`,
      requiredPatterns: ["%", "System.out.println"],
    },
    {
      title: "合計と平均",
      description: "int a = 80, b = 100 を用意し、平均 90 を表示してください。",
      hint: "(a + b) / 2 を使います。",
      expectedOutput: "90",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int a = 80;
    int b = 100;
    System.out.println((a + b) / 2);
  }
}`,
      requiredPatterns: ["+", "/", "System.out.println"],
    },
    {
      title: "比較演算子",
      description: "int score = 70; が 60 以上かどうかを表示してください。",
      hint: "比較の結果はtrueまたはfalseになります。",
      expectedOutput: "true",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int score = 70;
    System.out.println(score >= 60);
  }
}`,
      requiredPatterns: [">=", "System.out.println"],
    },
    {
      title: "インクリメント",
      description: "int count = 3; を1増やして 4 を表示してください。",
      hint: "++ または count = count + 1 を使います。",
      expectedOutput: "4",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int count = 3;
    count++;
    System.out.println(count);
  }
}`,
      requiredPatterns: ["count", "System.out.println"],
    },
  ],
  "07-input-output": [
    {
      title: "整数入力",
      description: "整数を1つ入力し、そのまま表示してください。サンプル入力は 42 です。",
      hint: "nextInt()で整数を読み取ります。",
      sampleInput: "42",
      expectedOutput: "42",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int number = scanner.nextInt();
    System.out.println(number);
  }
}`,
      requiredPatterns: ["Scanner", "nextInt", "System.out.println"],
    },
    {
      title: "2つの入力",
      description: "整数を2つ入力し、合計を表示してください。サンプル入力は 3 5 です。",
      hint: "nextInt()を2回使います。",
      sampleInput: "3 5",
      expectedOutput: "8",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int a = scanner.nextInt();
    int b = scanner.nextInt();
    System.out.println(a + b);
  }
}`,
      requiredPatterns: ["Scanner", "nextInt", "+", "System.out.println"],
    },
    {
      title: "名前と年齢",
      description: "名前と年齢を入力し、Taro is 20 と表示してください。サンプル入力は Taro 20 です。",
      hint: "文字列はnext()、整数はnextInt()で読み取れます。",
      sampleInput: "Taro 20",
      expectedOutput: "Taro is 20",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String name = scanner.next();
    int age = scanner.nextInt();
    System.out.println(name + " is " + age);
  }
}`,
      requiredPatterns: ["Scanner", "next", "nextInt", "System.out.println"],
    },
    {
      title: "入力した文字列を装飾",
      description: "単語を入力し、[]で囲んで表示してください。サンプル入力は Java です。",
      hint: "入力した文字列の前後に文字列を連結します。",
      sampleInput: "Java",
      expectedOutput: "[Java]",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String word = scanner.next();
    System.out.println("[" + word + "]");
  }
}`,
      requiredPatterns: ["Scanner", "String", "+", "System.out.println"],
    },
  ],
  "08-if": [
    {
      title: "偶数判定",
      description: "整数を入力し、偶数ならEvenと表示してください。サンプル入力は 8 です。",
      hint: "% 2 == 0 で偶数を判定できます。",
      sampleInput: "8",
      expectedOutput: "Even",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int number = scanner.nextInt();
    if (number % 2 == 0) {
      System.out.println("Even");
    }
  }
}`,
      requiredPatterns: ["if", "%", "System.out.println"],
    },
    {
      title: "合格と不合格",
      description: "点数を入力し、60点以上ならPass、それ以外ならFailと表示してください。サンプル入力は 45 です。",
      hint: "elseを使います。",
      sampleInput: "45",
      expectedOutput: "Fail",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int score = scanner.nextInt();
    if (score >= 60) {
      System.out.println("Pass");
    } else {
      System.out.println("Fail");
    }
  }
}`,
      requiredPatterns: ["if", "else", "System.out.println"],
    },
    {
      title: "正負判定",
      description: "整数を入力し、正ならPositive、0ならZero、負ならNegativeと表示してください。サンプル入力は 0 です。",
      hint: "else ifを使って3つに分けます。",
      sampleInput: "0",
      expectedOutput: "Zero",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int number = scanner.nextInt();
    if (number > 0) {
      System.out.println("Positive");
    } else if (number == 0) {
      System.out.println("Zero");
    } else {
      System.out.println("Negative");
    }
  }
}`,
      requiredPatterns: ["if", "else if", "else", "System.out.println"],
    },
    {
      title: "範囲判定",
      description: "年齢を入力し、13以上19以下ならTeenと表示してください。サンプル入力は 16 です。",
      hint: "&&で条件を組み合わせます。",
      sampleInput: "16",
      expectedOutput: "Teen",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int age = scanner.nextInt();
    if (age >= 13 && age <= 19) {
      System.out.println("Teen");
    }
  }
}`,
      requiredPatterns: ["if", "&&", "System.out.println"],
    },
  ],
  "09-switch": [
    {
      title: "信号の色",
      description: "1ならRed、2ならBlue、3ならYellowと表示してください。サンプル入力は 2 です。",
      hint: "switchとcaseで分岐します。",
      sampleInput: "2",
      expectedOutput: "Blue",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int color = scanner.nextInt();
    switch (color) {
      case 1:
        System.out.println("Red");
        break;
      case 2:
        System.out.println("Blue");
        break;
      case 3:
        System.out.println("Yellow");
        break;
      default:
        break;
    }
  }
}`,
      requiredPatterns: ["switch", "case", "break", "System.out.println"],
    },
    {
      title: "メニュー選択",
      description: "1ならStart、2ならSave、3ならExitと表示してください。サンプル入力は 3 です。",
      hint: "メニュー番号ごとにcaseを用意します。",
      sampleInput: "3",
      expectedOutput: "Exit",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int menu = scanner.nextInt();
    switch (menu) {
      case 1:
        System.out.println("Start");
        break;
      case 2:
        System.out.println("Save");
        break;
      case 3:
        System.out.println("Exit");
        break;
      default:
        break;
    }
  }
}`,
      requiredPatterns: ["switch", "case", "System.out.println"],
    },
    {
      title: "defaultの利用",
      description: "1ならOK、それ以外ならNGと表示してください。サンプル入力は 9 です。",
      hint: "どのcaseにも当てはまらない場合はdefaultに進みます。",
      sampleInput: "9",
      expectedOutput: "NG",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int number = scanner.nextInt();
    switch (number) {
      case 1:
        System.out.println("OK");
        break;
      default:
        System.out.println("NG");
        break;
    }
  }
}`,
      requiredPatterns: ["switch", "default", "System.out.println"],
    },
    {
      title: "文字のswitch",
      description: "文字列を入力し、javaならJava Courseと表示してください。サンプル入力は java です。",
      hint: "switchは文字列にも使えます。",
      sampleInput: "java",
      expectedOutput: "Java Course",
      answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String course = scanner.next();
    switch (course) {
      case "java":
        System.out.println("Java Course");
        break;
      default:
        break;
    }
  }
}`,
      requiredPatterns: ["String", "switch", "case", "System.out.println"],
    },
  ],
  "10-for": [
    {
      title: "1から5まで出力",
      description: "for文を使って1から5までを1行ずつ出力してください。",
      hint: "int i = 1; i <= 5; i++ の形を使います。",
      expectedOutput: `1
2
3
4
5`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    for (int i = 1; i <= 5; i++) {
      System.out.println(i);
    }
  }
}`,
      requiredPatterns: ["for", "System.out.println"],
      forbiddenPatterns: ["System.out.println(1);", "System.out.println(2);"],
    },
    {
      title: "偶数を出力",
      description: "for文を使って2, 4, 6を1行ずつ出力してください。",
      hint: "iを2ずつ増やします。",
      expectedOutput: `2
4
6`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    for (int i = 2; i <= 6; i += 2) {
      System.out.println(i);
    }
  }
}`,
      requiredPatterns: ["for", "+=", "System.out.println"],
    },
    {
      title: "合計を求める",
      description: "for文を使って1から4までの合計10を出力してください。",
      hint: "sum変数に足し込んで、ループ後に出力します。",
      expectedOutput: "10",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int sum = 0;
    for (int i = 1; i <= 4; i++) {
      sum += i;
    }
    System.out.println(sum);
  }
}`,
      requiredPatterns: ["for", "sum", "System.out.println"],
    },
    {
      title: "文字を繰り返す",
      description: "for文を使ってJavaを3回出力してください。",
      hint: "同じ処理を指定回数だけ繰り返します。",
      expectedOutput: `Java
Java
Java`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    for (int i = 0; i < 3; i++) {
      System.out.println("Java");
    }
  }
}`,
      requiredPatterns: ["for", "System.out.println"],
    },
  ],
  "11-while": [
    {
      title: "whileでカウント",
      description: "while文を使って1から3までを1行ずつ出力してください。",
      hint: "ループの最後で変数を1増やします。",
      expectedOutput: `1
2
3`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    int i = 1;
    while (i <= 3) {
      System.out.println(i);
      i++;
    }
  }
}`,
      requiredPatterns: ["while", "System.out.println"],
    },
    {
      title: "whileで偶数",
      description: "while文を使って2, 4, 6を出力してください。",
      hint: "変数を2ずつ増やします。",
      expectedOutput: `2
4
6`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    int i = 2;
    while (i <= 6) {
      System.out.println(i);
      i += 2;
    }
  }
}`,
      requiredPatterns: ["while", "+=", "System.out.println"],
    },
    {
      title: "whileで合計",
      description: "while文を使って1から5までの合計15を出力してください。",
      hint: "sumに値を足してからiを増やします。",
      expectedOutput: "15",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int i = 1;
    int sum = 0;
    while (i <= 5) {
      sum += i;
      i++;
    }
    System.out.println(sum);
  }
}`,
      requiredPatterns: ["while", "sum", "System.out.println"],
    },
    {
      title: "条件で止まる",
      description: "while文を使ってcountが3未満の間だけLoopと出力してください。",
      hint: "count < 3 を条件にします。",
      expectedOutput: `Loop
Loop
Loop`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    int count = 0;
    while (count < 3) {
      System.out.println("Loop");
      count++;
    }
  }
}`,
      requiredPatterns: ["while", "count", "System.out.println"],
    },
  ],
  "12-array": [
    {
      title: "配列の2番目",
      description: "int配列 numbers に 10, 20, 30 を入れ、2番目の値20を表示してください。",
      hint: "配列の添字は0から始まります。",
      expectedOutput: "20",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int[] numbers = {10, 20, 30};
    System.out.println(numbers[1]);
  }
}`,
      requiredPatterns: ["int[]", "numbers", "[1]", "System.out.println"],
    },
    {
      title: "配列の長さ",
      description: "String配列 names に A, B, C を入れ、配列の長さ3を表示してください。",
      hint: "配列.lengthで要素数を取得できます。",
      expectedOutput: "3",
      answerCode: `public class Main {
  public static void main(String[] args) {
    String[] names = {"A", "B", "C"};
    System.out.println(names.length);
  }
}`,
      requiredPatterns: ["String[]", ".length", "System.out.println"],
    },
    {
      title: "配列をforで表示",
      description: "int配列 scores の 80, 90 をfor文で1行ずつ表示してください。",
      hint: "i < scores.length を条件にします。",
      expectedOutput: `80
90`,
      answerCode: `public class Main {
  public static void main(String[] args) {
    int[] scores = {80, 90};
    for (int i = 0; i < scores.length; i++) {
      System.out.println(scores[i]);
    }
  }
}`,
      requiredPatterns: ["int[]", "for", ".length", "System.out.println"],
    },
    {
      title: "配列の合計",
      description: "int配列 numbers の 1, 2, 3 の合計6を表示してください。",
      hint: "sum変数を用意して配列の値を足します。",
      expectedOutput: "6",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int[] numbers = {1, 2, 3};
    int sum = 0;
    for (int i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    System.out.println(sum);
  }
}`,
      requiredPatterns: ["int[]", "sum", "for", "System.out.println"],
    },
  ],
  "13-method": [
    {
      title: "メソッドであいさつ",
      description: "greetメソッドを作り、その中でHiと出力し、mainから呼び出してください。",
      hint: "static void greet() を定義します。",
      expectedOutput: "Hi",
      answerCode: `public class Main {
  public static void greet() {
    System.out.println("Hi");
  }

  public static void main(String[] args) {
    greet();
  }
}`,
      requiredPatterns: ["static", "greet(", "greet();"],
    },
    {
      title: "戻り値のあるメソッド",
      description: "getNumberメソッドで5を返し、mainで表示してください。",
      hint: "intを返すメソッドにはreturnを書きます。",
      expectedOutput: "5",
      answerCode: `public class Main {
  public static int getNumber() {
    return 5;
  }

  public static void main(String[] args) {
    System.out.println(getNumber());
  }
}`,
      requiredPatterns: ["static int", "return", "getNumber()"],
    },
    {
      title: "引数のあるメソッド",
      description: "printNameメソッドにTaroを渡して表示してください。",
      hint: "String name を引数にします。",
      expectedOutput: "Taro",
      answerCode: `public class Main {
  public static void printName(String name) {
    System.out.println(name);
  }

  public static void main(String[] args) {
    printName("Taro");
  }
}`,
      requiredPatterns: ["String", "printName(", "printName("],
    },
    {
      title: "計算メソッド",
      description: "addメソッドで3と4を足し、7を表示してください。",
      hint: "int型の引数を2つ受け取ります。",
      expectedOutput: "7",
      answerCode: `public class Main {
  public static int add(int a, int b) {
    return a + b;
  }

  public static void main(String[] args) {
    System.out.println(add(3, 4));
  }
}`,
      requiredPatterns: ["static int", "return", "add("],
    },
  ],
  "14-overload": [
    {
      title: "intとStringのオーバーロード",
      description: "printData(int)とprintData(String)を作り、Javaと出力してください。",
      hint: "同じメソッド名で引数の型を変えます。",
      expectedOutput: "Java",
      answerCode: `public class Main {
  public static void printData(int number) {
    System.out.println(number);
  }

  public static void printData(String text) {
    System.out.println(text);
  }

  public static void main(String[] args) {
    printData("Java");
  }
}`,
      requiredPatterns: ["printData(", "String", "int"],
    },
    {
      title: "引数の数を変える",
      description: "同じsumメソッド名で、引数2つ版と3つ版を作り、6を表示してください。",
      hint: "sum(int a, int b) と sum(int a, int b, int c) を作ります。",
      expectedOutput: "6",
      answerCode: `public class Main {
  public static int sum(int a, int b) {
    return a + b;
  }

  public static int sum(int a, int b, int c) {
    return a + b + c;
  }

  public static void main(String[] args) {
    System.out.println(sum(1, 2, 3));
  }
}`,
      requiredPatterns: ["sum(", "return", "System.out.println"],
    },
    {
      title: "double版の追加",
      description: "show(int)とshow(double)を作り、2.5を表示してください。",
      hint: "double型の引数を受け取る同名メソッドを作ります。",
      expectedOutput: "2.5",
      answerCode: `public class Main {
  public static void show(int value) {
    System.out.println(value);
  }

  public static void show(double value) {
    System.out.println(value);
  }

  public static void main(String[] args) {
    show(2.5);
  }
}`,
      requiredPatterns: ["show(", "double", "int"],
    },
    {
      title: "オーバーロードの呼び分け",
      description: "message()とmessage(String name)を作り、Hello Taroと表示してください。",
      hint: "引数ありのmessageを呼び出します。",
      expectedOutput: "Hello Taro",
      answerCode: `public class Main {
  public static void message() {
    System.out.println("Hello");
  }

  public static void message(String name) {
    System.out.println("Hello " + name);
  }

  public static void main(String[] args) {
    message("Taro");
  }
}`,
      requiredPatterns: ["message(", "String", "System.out.println"],
    },
  ],
  "15-class-object": [
    {
      title: "クラスを作る",
      description: "Studentクラスを作り、mainでオブジェクトを生成してください。最後にOKと出力します。",
      hint: "class Student をMainクラスの外に書き、new Student()で生成します。",
      expectedOutput: "OK",
      answerCode: `class Student {
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student();
    System.out.println("OK");
  }
}`,
      requiredPatterns: ["class Student", "new Student", "System.out.println"],
    },
    {
      title: "フィールドを使う",
      description: "Studentクラスにnameフィールドを作り、Taroを入れて表示してください。",
      hint: "student.name = \"Taro\"; のように代入します。",
      expectedOutput: "Taro",
      answerCode: `class Student {
  String name;
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student();
    student.name = "Taro";
    System.out.println(student.name);
  }
}`,
      requiredPatterns: ["class Student", "String name", "new Student"],
    },
    {
      title: "複数オブジェクト",
      description: "Studentオブジェクトを2つ作り、2人目のnameでHanakoを表示してください。",
      hint: "student1とstudent2を別々に作ります。",
      expectedOutput: "Hanako",
      answerCode: `class Student {
  String name;
}

public class Main {
  public static void main(String[] args) {
    Student student1 = new Student();
    Student student2 = new Student();
    student1.name = "Taro";
    student2.name = "Hanako";
    System.out.println(student2.name);
  }
}`,
      requiredPatterns: ["new Student", "student2", "System.out.println"],
    },
    {
      title: "メソッドを持つクラス",
      description: "StudentクラスにshowNameメソッドを作り、Javaと表示してください。",
      hint: "クラスの中にvoid showName()を定義します。",
      expectedOutput: "Java",
      answerCode: `class Student {
  String name;

  void showName() {
    System.out.println(name);
  }
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student();
    student.name = "Java";
    student.showName();
  }
}`,
      requiredPatterns: ["class Student", "void showName", ".showName()"],
    },
  ],
  "16-constructor": [
    {
      title: "コンストラクタで初期化",
      description: "Student(String name)でnameを初期化し、Taroを表示してください。",
      hint: "this.name = name; を使います。",
      expectedOutput: "Taro",
      answerCode: `class Student {
  String name;

  Student(String name) {
    this.name = name;
  }
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student("Taro");
    System.out.println(student.name);
  }
}`,
      requiredPatterns: ["Student(", "this.name", "new Student"],
    },
    {
      title: "複数フィールド初期化",
      description: "nameとscoreをコンストラクタで受け取り、80を表示してください。",
      hint: "コンストラクタの引数を2つにします。",
      expectedOutput: "80",
      answerCode: `class Student {
  String name;
  int score;

  Student(String name, int score) {
    this.name = name;
    this.score = score;
  }
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student("Taro", 80);
    System.out.println(student.score);
  }
}`,
      requiredPatterns: ["Student(", "this.score", "new Student"],
    },
    {
      title: "初期化した値をメソッドで表示",
      description: "Bookクラスを作り、コンストラクタでtitleを受け取り、showTitleでJava入門を表示してください。",
      hint: "コンストラクタとインスタンスメソッドを組み合わせます。",
      expectedOutput: "Java入門",
      answerCode: `class Book {
  String title;

  Book(String title) {
    this.title = title;
  }

  void showTitle() {
    System.out.println(title);
  }
}

public class Main {
  public static void main(String[] args) {
    Book book = new Book("Java入門");
    book.showTitle();
  }
}`,
      requiredPatterns: ["Book(", "this.title", "showTitle"],
    },
    {
      title: "デフォルト値を設定",
      description: "Counterクラスのコンストラクタでcountに1を入れ、1を表示してください。",
      hint: "引数なしコンストラクタを使います。",
      expectedOutput: "1",
      answerCode: `class Counter {
  int count;

  Counter() {
    count = 1;
  }
}

public class Main {
  public static void main(String[] args) {
    Counter counter = new Counter();
    System.out.println(counter.count);
  }
}`,
      requiredPatterns: ["Counter()", "new Counter", "System.out.println"],
    },
  ],
  "17-static": [
    {
      title: "staticメソッド",
      description: "staticメソッドhelloを作り、mainから呼び出してHelloと表示してください。",
      hint: "static void hello() を定義します。",
      expectedOutput: "Hello",
      answerCode: `public class Main {
  static void hello() {
    System.out.println("Hello");
  }

  public static void main(String[] args) {
    hello();
  }
}`,
      requiredPatterns: ["static void", "hello();"],
    },
    {
      title: "static変数",
      description: "static int count = 3; を作り、countを表示してください。",
      hint: "クラスに属する変数としてstaticを付けます。",
      expectedOutput: "3",
      answerCode: `public class Main {
  static int count = 3;

  public static void main(String[] args) {
    System.out.println(count);
  }
}`,
      requiredPatterns: ["static int", "count", "System.out.println"],
    },
    {
      title: "static変数を増やす",
      description: "static変数countをメソッドで1増やし、2を表示してください。",
      hint: "addメソッドでcount++します。",
      expectedOutput: "2",
      answerCode: `public class Main {
  static int count = 1;

  static void add() {
    count++;
  }

  public static void main(String[] args) {
    add();
    System.out.println(count);
  }
}`,
      requiredPatterns: ["static", "count++", "add();"],
    },
    {
      title: "クラス名で呼び出す",
      description: "Tool.print() を呼び出してOKと表示してください。",
      hint: "別クラスのstaticメソッドはクラス名.メソッド名で呼べます。",
      expectedOutput: "OK",
      answerCode: `class Tool {
  static void print() {
    System.out.println("OK");
  }
}

public class Main {
  public static void main(String[] args) {
    Tool.print();
  }
}`,
      requiredPatterns: ["static void", "Tool.print()"],
    },
  ],
  "18-inheritance": [
    {
      title: "extendsを使う",
      description: "Animalを継承したDogクラスを作り、Dogと表示してください。",
      hint: "class Dog extends Animal と書きます。",
      expectedOutput: "Dog",
      answerCode: `class Animal {
}

class Dog extends Animal {
}

public class Main {
  public static void main(String[] args) {
    Dog dog = new Dog();
    System.out.println("Dog");
  }
}`,
      requiredPatterns: ["extends", "new Dog"],
    },
    {
      title: "親クラスのメソッド",
      description: "親クラスAnimalのspeakメソッドをDogオブジェクトから呼び出し、Animalと表示してください。",
      hint: "継承すると親クラスのメソッドを使えます。",
      expectedOutput: "Animal",
      answerCode: `class Animal {
  void speak() {
    System.out.println("Animal");
  }
}

class Dog extends Animal {
}

public class Main {
  public static void main(String[] args) {
    Dog dog = new Dog();
    dog.speak();
  }
}`,
      requiredPatterns: ["extends", ".speak()"],
    },
    {
      title: "メソッドの上書き",
      description: "Dogでspeakメソッドを上書きし、Wanと表示してください。",
      hint: "子クラスに同じ名前のメソッドを書きます。",
      expectedOutput: "Wan",
      answerCode: `class Animal {
  void speak() {
    System.out.println("Animal");
  }
}

class Dog extends Animal {
  void speak() {
    System.out.println("Wan");
  }
}

public class Main {
  public static void main(String[] args) {
    Dog dog = new Dog();
    dog.speak();
  }
}`,
      requiredPatterns: ["extends", "void speak", ".speak()"],
    },
    {
      title: "superを使う",
      description: "子クラスから親クラスのメソッドをsuperで呼び、Parentと表示してください。",
      hint: "super.show(); の形を使います。",
      expectedOutput: "Parent",
      answerCode: `class Parent {
  void show() {
    System.out.println("Parent");
  }
}

class Child extends Parent {
  void callParent() {
    super.show();
  }
}

public class Main {
  public static void main(String[] args) {
    Child child = new Child();
    child.callParent();
  }
}`,
      requiredPatterns: ["extends", "super.", "callParent"],
    },
  ],
  "19-polymorphism": [
    {
      title: "親型の変数",
      description: "Animal型の変数にDogオブジェクトを入れ、OKと表示してください。",
      hint: "Animal animal = new Dog(); の形です。",
      expectedOutput: "OK",
      answerCode: `class Animal {
}

class Dog extends Animal {
}

public class Main {
  public static void main(String[] args) {
    Animal animal = new Dog();
    System.out.println("OK");
  }
}`,
      requiredPatterns: ["Animal", "new Dog"],
    },
    {
      title: "動的なメソッド呼び出し",
      description: "Animal型の変数からDogのspeakを呼び、Wanと表示してください。",
      hint: "オーバーライドしたメソッドが実行されます。",
      expectedOutput: "Wan",
      answerCode: `class Animal {
  void speak() {
    System.out.println("Animal");
  }
}

class Dog extends Animal {
  void speak() {
    System.out.println("Wan");
  }
}

public class Main {
  public static void main(String[] args) {
    Animal animal = new Dog();
    animal.speak();
  }
}`,
      requiredPatterns: ["Animal", "new Dog", ".speak()"],
    },
    {
      title: "配列でまとめる",
      description: "Animal配列にDogを入れ、speakでWanと表示してください。",
      hint: "親型の配列に子クラスのオブジェクトを入れられます。",
      expectedOutput: "Wan",
      answerCode: `class Animal {
  void speak() {
    System.out.println("Animal");
  }
}

class Dog extends Animal {
  void speak() {
    System.out.println("Wan");
  }
}

public class Main {
  public static void main(String[] args) {
    Animal[] animals = {new Dog()};
    animals[0].speak();
  }
}`,
      requiredPatterns: ["Animal[]", "new Dog", ".speak()"],
    },
    {
      title: "instanceof",
      description: "Animal型の変数がDogかどうかを判定し、Dogと表示してください。",
      hint: "instanceofで実際の型を確認できます。",
      expectedOutput: "Dog",
      answerCode: `class Animal {
}

class Dog extends Animal {
}

public class Main {
  public static void main(String[] args) {
    Animal animal = new Dog();
    if (animal instanceof Dog) {
      System.out.println("Dog");
    }
  }
}`,
      requiredPatterns: ["instanceof", "if", "System.out.println"],
    },
  ],
  "20-abstract-interface": [
    {
      title: "interfaceを実装",
      description: "Printableインターフェースを実装したReportクラスを作り、Printと表示してください。",
      hint: "implementsを使います。",
      expectedOutput: "Print",
      answerCode: `interface Printable {
  void print();
}

class Report implements Printable {
  public void print() {
    System.out.println("Print");
  }
}

public class Main {
  public static void main(String[] args) {
    Report report = new Report();
    report.print();
  }
}`,
      requiredPatterns: ["interface", "implements", "public void print"],
    },
    {
      title: "インターフェース型",
      description: "Printable型の変数にReportを入れ、OKと表示してください。",
      hint: "Printable printable = new Report(); の形です。",
      expectedOutput: "OK",
      answerCode: `interface Printable {
  void print();
}

class Report implements Printable {
  public void print() {
    System.out.println("OK");
  }
}

public class Main {
  public static void main(String[] args) {
    Printable printable = new Report();
    printable.print();
  }
}`,
      requiredPatterns: ["interface", "Printable", "new Report"],
    },
    {
      title: "abstract class",
      description: "抽象クラスBaseを継承したChildを作り、Runと表示してください。",
      hint: "abstract class と extends を使います。",
      expectedOutput: "Run",
      answerCode: `abstract class Base {
  abstract void run();
}

class Child extends Base {
  void run() {
    System.out.println("Run");
  }
}

public class Main {
  public static void main(String[] args) {
    Child child = new Child();
    child.run();
  }
}`,
      requiredPatterns: ["abstract class", "extends", "void run"],
    },
    {
      title: "複数実装の考え方",
      description: "RunnableTaskインターフェースをTaskに実装し、Taskと表示してください。",
      hint: "インターフェース名と実装クラス名を分けて書きます。",
      expectedOutput: "Task",
      answerCode: `interface RunnableTask {
  void run();
}

class Task implements RunnableTask {
  public void run() {
    System.out.println("Task");
  }
}

public class Main {
  public static void main(String[] args) {
    RunnableTask task = new Task();
    task.run();
  }
}`,
      requiredPatterns: ["interface", "implements", "RunnableTask"],
    },
  ],
  "21-package-import": [
    {
      title: "Randomのimport",
      description: "Randomをimportし、nextInt(1)の結果0を表示してください。",
      hint: "import java.util.Random; を書きます。",
      expectedOutput: "0",
      answerCode: `import java.util.Random;

public class Main {
  public static void main(String[] args) {
    Random random = new Random();
    System.out.println(random.nextInt(1));
  }
}`,
      requiredPatterns: ["import", "Random", "nextInt"],
    },
    {
      title: "ArrayListのimport",
      description: "ArrayListをimportしてJavaを追加し、Javaと表示してください。",
      hint: "import java.util.ArrayList; を使います。",
      expectedOutput: "Java",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Java");
    System.out.println(list.get(0));
  }
}`,
      requiredPatterns: ["import", "ArrayList", ".add"],
    },
    {
      title: "複数import",
      description: "ScannerとArrayListをimportし、入力したJavaをリストに入れて表示してください。",
      hint: "importを2行書きます。",
      sampleInput: "Java",
      expectedOutput: "Java",
      answerCode: `import java.util.Scanner;
import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    ArrayList<String> list = new ArrayList<>();
    list.add(scanner.next());
    System.out.println(list.get(0));
  }
}`,
      requiredPatterns: ["import", "Scanner", "ArrayList"],
    },
    {
      title: "java.timeのimport",
      description: "LocalDateをimportし、2026-01-01を表示してください。",
      hint: "LocalDate.of(2026, 1, 1) を使います。",
      expectedOutput: "2026-01-01",
      answerCode: `import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {
    LocalDate date = LocalDate.of(2026, 1, 1);
    System.out.println(date);
  }
}`,
      requiredPatterns: ["import", "LocalDate", "System.out.println"],
    },
  ],
  "22-exception": [
    {
      title: "try-catchの基本",
      description: "文字列10を整数に変換し、10を表示してください。try-catchを使います。",
      hint: "Integer.parseIntをtryの中で使います。",
      expectedOutput: "10",
      answerCode: `public class Main {
  public static void main(String[] args) {
    try {
      int number = Integer.parseInt("10");
      System.out.println(number);
    } catch (Exception e) {
      System.out.println("Error");
    }
  }
}`,
      requiredPatterns: ["try", "catch", "Integer.parseInt"],
    },
    {
      title: "例外時の処理",
      description: "文字列abcを整数に変換しようとして、例外時にErrorと表示してください。",
      hint: "変換できない文字列はNumberFormatExceptionになります。",
      expectedOutput: "Error",
      answerCode: `public class Main {
  public static void main(String[] args) {
    try {
      int number = Integer.parseInt("abc");
      System.out.println(number);
    } catch (Exception e) {
      System.out.println("Error");
    }
  }
}`,
      requiredPatterns: ["try", "catch", "System.out.println"],
    },
    {
      title: "finally",
      description: "try-catch-finallyを使い、最後にDoneと表示してください。",
      hint: "finallyは例外の有無に関係なく実行されます。",
      expectedOutput: "Done",
      answerCode: `public class Main {
  public static void main(String[] args) {
    try {
      int number = 1;
    } catch (Exception e) {
      System.out.println("Error");
    } finally {
      System.out.println("Done");
    }
  }
}`,
      requiredPatterns: ["try", "catch", "finally"],
    },
    {
      title: "throws",
      description: "mainメソッドにthrows Exceptionを書き、OKと表示してください。",
      hint: "メソッド宣言に throws Exception を付けます。",
      expectedOutput: "OK",
      answerCode: `public class Main {
  public static void main(String[] args) throws Exception {
    System.out.println("OK");
  }
}`,
      requiredPatterns: ["throws Exception", "System.out.println"],
    },
  ],
  "23-file-io": [
    {
      title: "BufferedReaderの宣言",
      description: "BufferedReader型の変数readerをnullで宣言し、OKと表示してください。",
      hint: "import java.io.BufferedReader; を使います。",
      expectedOutput: "OK",
      answerCode: `import java.io.BufferedReader;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader reader = null;
    System.out.println("OK");
  }
}`,
      requiredPatterns: ["BufferedReader", "throws Exception"],
    },
    {
      title: "FileWriterの宣言",
      description: "FileWriter型の変数writerをnullで宣言し、OKと表示してください。",
      hint: "import java.io.FileWriter; を使います。",
      expectedOutput: "OK",
      answerCode: `import java.io.FileWriter;

public class Main {
  public static void main(String[] args) throws Exception {
    FileWriter writer = null;
    System.out.println("OK");
  }
}`,
      requiredPatterns: ["FileWriter", "throws Exception"],
    },
    {
      title: "try-with-resourcesの形",
      description: "try-with-resourcesの構文を使い、Doneと表示してください。StringReaderを使います。",
      hint: "try (StringReader reader = new StringReader(\"A\")) の形です。",
      expectedOutput: "Done",
      answerCode: `import java.io.StringReader;

public class Main {
  public static void main(String[] args) throws Exception {
    try (StringReader reader = new StringReader("A")) {
      System.out.println("Done");
    }
  }
}`,
      requiredPatterns: ["try", "StringReader", "new StringReader"],
    },
    {
      title: "IOExceptionのcatch",
      description: "IOExceptionをcatchする形を書き、OKと表示してください。",
      hint: "catch (IOException e) を使います。",
      expectedOutput: "OK",
      answerCode: `import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    try {
      System.out.println("OK");
    } catch (IOException e) {
      System.out.println("Error");
    }
  }
}`,
      requiredPatterns: ["IOException", "try", "catch"],
    },
  ],
  "24-collection": [
    {
      title: "ArrayListに追加",
      description: "ArrayListにJavaを追加し、Javaと表示してください。",
      hint: "list.addとlist.getを使います。",
      expectedOutput: "Java",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Java");
    System.out.println(list.get(0));
  }
}`,
      requiredPatterns: ["ArrayList", ".add", ".get"],
    },
    {
      title: "リストのサイズ",
      description: "ArrayListにAとBを追加し、サイズ2を表示してください。",
      hint: "size()で要素数を取得できます。",
      expectedOutput: "2",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("A");
    list.add("B");
    System.out.println(list.size());
  }
}`,
      requiredPatterns: ["ArrayList", ".size()", "System.out.println"],
    },
    {
      title: "拡張for文",
      description: "ArrayListのAとBを拡張for文で1行ずつ表示してください。",
      hint: "for (String item : list) の形を使います。",
      expectedOutput: `A
B`,
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("A");
    list.add("B");
    for (String item : list) {
      System.out.println(item);
    }
  }
}`,
      requiredPatterns: ["ArrayList", "for", ":"],
    },
    {
      title: "HashMap",
      description: "HashMapにkey score、value 80を入れて80を表示してください。",
      hint: "putとgetを使います。",
      expectedOutput: "80",
      answerCode: `import java.util.HashMap;

public class Main {
  public static void main(String[] args) {
    HashMap<String, Integer> map = new HashMap<>();
    map.put("score", 80);
    System.out.println(map.get("score"));
  }
}`,
      requiredPatterns: ["HashMap", ".put", ".get"],
    },
  ],
  "25-generics": [
    {
      title: "Stringのリスト",
      description: "ArrayList<String>にJavaを入れて表示してください。",
      hint: "型を<String>で指定します。",
      expectedOutput: "Java",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> words = new ArrayList<>();
    words.add("Java");
    System.out.println(words.get(0));
  }
}`,
      requiredPatterns: ["ArrayList<String>", "new ArrayList"],
    },
    {
      title: "Integerのリスト",
      description: "ArrayList<Integer>に10を入れて表示してください。",
      hint: "intのラッパークラスはIntegerです。",
      expectedOutput: "10",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<Integer> numbers = new ArrayList<>();
    numbers.add(10);
    System.out.println(numbers.get(0));
  }
}`,
      requiredPatterns: ["ArrayList<Integer>", ".add", ".get"],
    },
    {
      title: "メソッドのジェネリクス",
      description: "printメソッドをジェネリクスで作り、Helloを表示してください。",
      hint: "<T> をメソッド宣言に付けます。",
      expectedOutput: "Hello",
      answerCode: `public class Main {
  public static <T> void print(T value) {
    System.out.println(value);
  }

  public static void main(String[] args) {
    print("Hello");
  }
}`,
      requiredPatterns: ["<T>", "print(", "System.out.println"],
    },
    {
      title: "型安全な取り出し",
      description: "ArrayList<String>から取り出した値をString変数に入れ、OKを表示してください。",
      hint: "ジェネリクスを使うとキャストなしで取り出せます。",
      expectedOutput: "OK",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("OK");
    String value = list.get(0);
    System.out.println(value);
  }
}`,
      requiredPatterns: ["ArrayList<String>", "String value", ".get"],
    },
  ],
  "26-lambda": [
    {
      title: "Runnableのラムダ",
      description: "Runnableをラムダ式で作り、Runと表示してください。",
      hint: "() -> { ... } の形です。",
      expectedOutput: "Run",
      answerCode: `public class Main {
  public static void main(String[] args) {
    Runnable runnable = () -> {
      System.out.println("Run");
    };
    runnable.run();
  }
}`,
      requiredPatterns: ["->", "Runnable", ".run()"],
    },
    {
      title: "Functionのラムダ",
      description: "Function<Integer, Integer>で数を2倍にし、10を表示してください。",
      hint: "x -> x * 2 を使います。",
      expectedOutput: "10",
      answerCode: `import java.util.function.Function;

public class Main {
  public static void main(String[] args) {
    Function<Integer, Integer> doubleValue = x -> x * 2;
    System.out.println(doubleValue.apply(5));
  }
}`,
      requiredPatterns: ["->", "Function", ".apply"],
    },
    {
      title: "Predicateのラムダ",
      description: "Predicate<Integer>で偶数判定を作り、trueを表示してください。",
      hint: "x -> x % 2 == 0 を使います。",
      expectedOutput: "true",
      answerCode: `import java.util.function.Predicate;

public class Main {
  public static void main(String[] args) {
    Predicate<Integer> isEven = x -> x % 2 == 0;
    System.out.println(isEven.test(4));
  }
}`,
      requiredPatterns: ["->", "Predicate", ".test"],
    },
    {
      title: "forEachとラムダ",
      description: "リストのJavaをforEachとラムダで表示してください。",
      hint: "list.forEach(item -> ... ) を使います。",
      expectedOutput: "Java",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Java");
    list.forEach(item -> System.out.println(item));
  }
}`,
      requiredPatterns: ["->", "forEach", "System.out.println"],
    },
  ],
  "27-stream-api": [
    {
      title: "streamで数える",
      description: "リスト1,2,3から2より大きい数を数え、1を表示してください。",
      hint: "stream、filter、countを使います。",
      expectedOutput: "1",
      answerCode: `import java.util.Arrays;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3);
    long count = numbers.stream().filter(n -> n > 2).count();
    System.out.println(count);
  }
}`,
      requiredPatterns: [".stream()", ".filter", ".count"],
    },
    {
      title: "mapで変換",
      description: "リスト1,2,3を2倍にして合計12を表示してください。",
      hint: "mapToIntとsumを使います。",
      expectedOutput: "12",
      answerCode: `import java.util.Arrays;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3);
    int sum = numbers.stream().mapToInt(n -> n * 2).sum();
    System.out.println(sum);
  }
}`,
      requiredPatterns: [".stream()", "mapToInt", ".sum"],
    },
    {
      title: "filterで抽出",
      description: "Java, C, Pythonから文字数が4のJavaだけを表示してください。",
      hint: "filter(word -> word.length() == 4) を使います。",
      expectedOutput: "Java",
      answerCode: `import java.util.Arrays;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<String> words = Arrays.asList("Java", "C", "Python");
    words.stream()
      .filter(word -> word.length() == 4)
      .forEach(word -> System.out.println(word));
  }
}`,
      requiredPatterns: [".stream()", ".filter", ".forEach"],
    },
    {
      title: "sorted",
      description: "3,1,2をstreamで昇順に並べ、1 2 3を1行ずつ表示してください。",
      hint: "sortedを使います。",
      expectedOutput: `1
2
3`,
      answerCode: `import java.util.Arrays;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(3, 1, 2);
    numbers.stream()
      .sorted()
      .forEach(number -> System.out.println(number));
  }
}`,
      requiredPatterns: [".stream()", ".sorted", ".forEach"],
    },
  ],
  "28-date-time": [
    {
      title: "LocalDateの作成",
      description: "LocalDateで2026-07-21を作成し、表示してください。",
      hint: "LocalDate.of(2026, 7, 21) を使います。",
      expectedOutput: "2026-07-21",
      answerCode: `import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {
    LocalDate date = LocalDate.of(2026, 7, 21);
    System.out.println(date);
  }
}`,
      requiredPatterns: ["LocalDate", ".of", "System.out.println"],
    },
    {
      title: "日付を足す",
      description: "2026-07-21の3日後を表示してください。",
      hint: "plusDays(3) を使います。",
      expectedOutput: "2026-07-24",
      answerCode: `import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {
    LocalDate date = LocalDate.of(2026, 7, 21);
    System.out.println(date.plusDays(3));
  }
}`,
      requiredPatterns: ["LocalDate", "plusDays", "System.out.println"],
    },
    {
      title: "年月日を取り出す",
      description: "2026-07-21から年だけを取り出して2026を表示してください。",
      hint: "getYear()を使います。",
      expectedOutput: "2026",
      answerCode: `import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {
    LocalDate date = LocalDate.of(2026, 7, 21);
    System.out.println(date.getYear());
  }
}`,
      requiredPatterns: ["LocalDate", "getYear", "System.out.println"],
    },
    {
      title: "LocalDateTime",
      description: "LocalDateTimeで2026-07-21T10:30を作成し、表示してください。",
      hint: "LocalDateTime.of(2026, 7, 21, 10, 30) を使います。",
      expectedOutput: "2026-07-21T10:30",
      answerCode: `import java.time.LocalDateTime;

public class Main {
  public static void main(String[] args) {
    LocalDateTime dateTime = LocalDateTime.of(2026, 7, 21, 10, 30);
    System.out.println(dateTime);
  }
}`,
      requiredPatterns: ["LocalDateTime", ".of", "System.out.println"],
    },
  ],
  "32-final-exercise": [
    {
      title: "配列と条件分岐",
      description: "点数80, 55, 90のうち60以上の数を数え、2を表示してください。",
      hint: "配列、for文、if文を組み合わせます。",
      expectedOutput: "2",
      answerCode: `public class Main {
  public static void main(String[] args) {
    int[] scores = {80, 55, 90};
    int count = 0;
    for (int i = 0; i < scores.length; i++) {
      if (scores[i] >= 60) {
        count++;
      }
    }
    System.out.println(count);
  }
}`,
      requiredPatterns: ["int[]", "for", "if", "count"],
    },
    {
      title: "クラスと配列",
      description: "Studentクラスの配列を作り、1人目の名前Taroを表示してください。",
      hint: "クラス、コンストラクタ、配列を組み合わせます。",
      expectedOutput: "Taro",
      answerCode: `class Student {
  String name;

  Student(String name) {
    this.name = name;
  }
}

public class Main {
  public static void main(String[] args) {
    Student[] students = {
      new Student("Taro"),
      new Student("Hanako")
    };
    System.out.println(students[0].name);
  }
}`,
      requiredPatterns: ["class Student", "Student[]", "new Student"],
    },
    {
      title: "メソッドで判定",
      description: "isPassメソッドで60以上を判定し、trueを表示してください。",
      hint: "booleanを返すメソッドを作ります。",
      expectedOutput: "true",
      answerCode: `public class Main {
  public static boolean isPass(int score) {
    return score >= 60;
  }

  public static void main(String[] args) {
    System.out.println(isPass(80));
  }
}`,
      requiredPatterns: ["boolean", "return", "isPass"],
    },
    {
      title: "総合ミニ処理",
      description: "ArrayListに3つの点数を入れ、合計240を表示してください。",
      hint: "ArrayList、拡張for文、合計変数を使います。",
      expectedOutput: "240",
      answerCode: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<Integer> scores = new ArrayList<>();
    scores.add(80);
    scores.add(70);
    scores.add(90);
    int sum = 0;
    for (int score : scores) {
      sum += score;
    }
    System.out.println(sum);
  }
}`,
      requiredPatterns: ["ArrayList", "for", "sum"],
    },
  ],
};

const customJavaQuestionSets: Record<string, JavaQuestion[]> = {};

const makeReviewQuestion = (
  base: JavaQuestion,
  index: number,
  output: string,
  focus: string
): JavaQuestion => {
  const spec = lessonReviewSpecs[base.id]?.[index - 2];

  if (spec) {
    return {
      ...base,
      ...spec,
      id: `${base.id}-q${index}`,
      no: `${base.no}-${index}`,
      title: `${base.title} ${spec.title}`,
      starterCode: spec.starterCode ?? base.starterCode,
      requiredPatterns: spec.requiredPatterns ?? base.requiredPatterns ?? [],
      forbiddenPatterns: spec.forbiddenPatterns ?? [],
    };
  }

  return {
    ...base,
    id: `${base.id}-q${index}`,
    no: `${base.no}-${index}`,
    title: `${base.title} 練習${index}`,
    description: `${base.title}の復習問題です。${focus}を意識して、実行結果が「${output}」になるコードを書いてください。`,
    hint:
      base.requiredPatterns && base.requiredPatterns.length > 0
        ? `この項目では ${base.requiredPatterns.join("、")} を使うことを意識しましょう。`
        : "まずは小さく動くコードを書き、実行結果を確認しましょう。",
    sampleInput: "",
    expectedOutput: output,
    starterCode: base.starterCode,
    answerCode: createPrintAnswerCode(output),
    requiredPatterns: ["System.out.print"],
    forbiddenPatterns: [],
  };
};

const expandQuestionSet = (base: JavaQuestion): JavaQuestion[] => {
  if (customJavaQuestionSets[base.id]) {
    return customJavaQuestionSets[base.id];
  }

  const baseQuestion: JavaQuestion = {
    ...base,
    id: `${base.id}-q1`,
    no: `${base.no}-1`,
    title: `${base.title} 基本`,
    answerCode:
      base.answerCode ??
      baseAnswerCodeMap[base.id] ??
      createPrintAnswerCode(base.expectedOutput ?? ""),
  };

  return [
    baseQuestion,
    makeReviewQuestion(base, 2, "確認1", "基本の書き方"),
    makeReviewQuestion(base, 3, "確認2", "値や処理の流れ"),
    makeReviewQuestion(base, 4, "確認3", "読みやすいコード"),
    makeReviewQuestion(base, 5, "確認4", "自分で書き切ること"),
  ];
};

export const javaQuestionMap: Record<string, JavaQuestion[]> = {
  ...Object.fromEntries(
    Object.entries(baseJavaQuestionMap).map(([topicId, question]) => [
      topicId,
      expandQuestionSet(question),
    ])
  ),
  ...javaExerciseQuestionMap,
};

export type JavaQuestionEntry = JavaQuestion & {
  topicId: string;
  questionIndex: number;
  questionCount: number;
};

export const javaQuestionEntriesById: Record<string, JavaQuestionEntry> =
  Object.fromEntries(
    Object.entries(javaQuestionMap).flatMap(([topicId, questions]) =>
      questions.map((question, index) => [
        question.id,
        {
          ...question,
          topicId,
          questionIndex: index,
          questionCount: questions.length,
        },
      ])
    )
  );

export const getJavaQuestions = (topicId: string): JavaQuestion[] =>
  javaQuestionMap[topicId] ?? [];

export const hasJavaQuestions = (topicId: string): boolean =>
  getJavaQuestions(topicId).length > 0;

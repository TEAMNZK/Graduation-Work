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

export const javaModelCodeMap: Record<string, string> = {
  "01-java-overview": `public class Main {
  public static void main(String[] args) {

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
      case 3:
        System.out.println("水曜日");
        break;
      default:
        System.out.println("不明な数字です");
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
    int i = 1;

    while (i <= 3) {
      System.out.println(i);
      i++;
    }
  }
}`,
  "project-janken": `import java.util.Random;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    Random random = new Random();

    System.out.println("0: グー, 1: チョキ, 2: パー");
    int user = scanner.nextInt();
    int computer = random.nextInt(3);

    System.out.println("あなた: " + user);
    System.out.println("相手: " + computer);

    if (user == computer) {
      System.out.println("あいこ");
    } else if ((user == 0 && computer == 1)
        || (user == 1 && computer == 2)
        || (user == 2 && computer == 0)) {
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
    System.out.println(text);
  }

  public static void printData(int number) {
    System.out.println(number);
  }

  public static void main(String[] args) {
    printData("Java");
    printData(100);
  }
}`,
  "project-score-app": `public class Main {
  public static String judgeScore(int score) {
    if (score >= 80) {
      return "A";
    } else if (score >= 60) {
      return "B";
    }
    return "C";
  }

  public static void main(String[] args) {
    int[] scores = {90, 75, 50};

    for (int score : scores) {
      System.out.println(score + ": " + judgeScore(score));
    }
  }
}`,
  "15-class-object": `class Student {
  String name;
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student();
    student.name = "Taro";
    System.out.println(student.name);
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
    System.out.println(student.name);
  }
}`,
  "17-static": `public class Main {
  static int count = 0;

  static void addCount() {
    count++;
  }

  public static void main(String[] args) {
    addCount();
    System.out.println(count);
  }
}`,
  "18-inheritance": `class Person {
  String name = "Taro";
}

class Student extends Person {
  int score = 80;
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student();
    System.out.println(student.name);
    System.out.println(student.score);
  }
}`,
  "19-polymorphism": `class Animal {
  void speak() {
    System.out.println("...");
  }
}

class Dog extends Animal {
  @Override
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
  "20-abstract-interface": `interface Greetable {
  void greet();
}

class Student implements Greetable {
  public void greet() {
    System.out.println("Hello");
  }
}

public class Main {
  public static void main(String[] args) {
    Greetable student = new Student();
    student.greet();
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
      int answer = 10 / 0;
      System.out.println(answer);
    } catch (Exception e) {
      System.out.println("エラーが発生しました");
    }
  }
}`,
  "23-file-io": `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;

public class Main {
  public static void main(String[] args) throws Exception {
    FileWriter writer = new FileWriter("sample.txt");
    writer.write("Hello");
    writer.close();

    BufferedReader reader = new BufferedReader(new FileReader("sample.txt"));
    String line = reader.readLine();
    reader.close();

    System.out.println(line);
  }
}`,
  "24-collection": `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Java");
    list.add("Spring");

    for (String item : list) {
      System.out.println(item);
    }
  }
}`,
  "project-todo": `import java.util.ArrayList;

class Todo {
  String title;
  boolean done;

  Todo(String title) {
    this.title = title;
    this.done = false;
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Todo> todos = new ArrayList<>();
    todos.add(new Todo("Javaを勉強する"));
    todos.add(new Todo("課題を提出する"));

    todos.get(0).done = true;

    for (Todo todo : todos) {
      String status = todo.done ? "完了" : "未完了";
      System.out.println(status + ": " + todo.title);
    }
  }
}`,
  "25-generics": `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> names = new ArrayList<>();
    names.add("Taro");
    names.add("Hanako");

    System.out.println(names.get(0));
  }
}`,
  "26-lambda": `interface Calculator {
  int add(int a, int b);
}

public class Main {
  public static void main(String[] args) {
    Calculator calculator = (a, b) -> a + b;
    System.out.println(calculator.add(3, 5));
  }
}`,
  "27-stream-api": `import java.util.Arrays;
import java.util.List;

public class Main {
  public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

    numbers.stream()
        .filter(number -> number % 2 == 0)
        .forEach(System.out::println);
  }
}`,
  "28-date-time": `import java.time.LocalDate;

public class Main {
  public static void main(String[] args) {
    LocalDate today = LocalDate.now();
    System.out.println(today);
  }
}`,
  "project-library-enhance": `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  boolean borrowed;
  LocalDate dueDate;

  Book(String title) {
    this.title = title;
    this.borrowed = false;
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Book> books = new ArrayList<>();
    books.add(new Book("Java入門"));
    books.add(new Book("アルゴリズム基礎"));

    Book book = books.get(0);
    book.borrowed = true;
    book.dueDate = LocalDate.now().plusDays(14);

    for (Book item : books) {
      System.out.println(item.title);
      System.out.println(item.borrowed ? "貸出中: " + item.dueDate : "貸出可");
    }
  }
}`,
  "32-final-exercise": `import java.util.ArrayList;

class Student {
  String name;
  int score;

  Student(String name, int score) {
    this.name = name;
    this.score = score;
  }

  String grade() {
    if (score >= 80) {
      return "A";
    } else if (score >= 60) {
      return "B";
    }
    return "C";
  }
}

public class Main {
  public static void main(String[] args) {
    ArrayList<Student> students = new ArrayList<>();
    students.add(new Student("Taro", 90));
    students.add(new Student("Hanako", 70));

    for (Student student : students) {
      System.out.println(student.name + ": " + student.grade());
    }
  }
}`,
  "project-library-final": `import java.time.LocalDate;
import java.util.ArrayList;

class Book {
  String title;
  String author;
  boolean borrowed;
  LocalDate dueDate;

  Book(String title, String author) {
    this.title = title;
    this.author = author;
    this.borrowed = false;
  }
}

class Library {
  ArrayList<Book> books = new ArrayList<>();

  void addBook(String title, String author) {
    books.add(new Book(title, author));
  }

  void borrowBook(String title) {
    for (Book book : books) {
      if (book.title.equals(title) && !book.borrowed) {
        book.borrowed = true;
        book.dueDate = LocalDate.now().plusDays(14);
      }
    }
  }

  void showBooks() {
    for (Book book : books) {
      String status = book.borrowed ? "貸出中: " + book.dueDate : "貸出可";
      System.out.println(book.title + " / " + book.author + " / " + status);
    }
  }
}

public class Main {
  public static void main(String[] args) {
    Library library = new Library();
    library.addBook("Java入門", "山田太郎");
    library.addBook("データベース基礎", "佐藤花子");
    library.borrowBook("Java入門");
    library.showBooks();
  }
}`,
};

export const javaQuestionMap: Record<string, JavaQuestion> = {
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

  "04-variables": {
    id: "04-variables",
    no: "04",
    title: "変数",
    description:
      'name という変数に "Taro" を入れて表示しなさい。',
    hint: 'String name = "Taro"; と書いて、System.out.println(name); を使います。',
    expectedOutput: "Taro",
    starterCode: `public class Main {
  public static void main(String[] args) {

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
    hint: "Scanner と nextLine() を使います。",
    sampleInput: "太郎",
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

  "08-if": {
    id: "08-if",
    no: "08",
    title: "if文",
    description:
      '点数を入力し、60点以上なら「合格」と表示しなさい。',
    hint: "if を使って score >= 60 を判定します。",
    sampleInput: "60",
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

  "09-switch": {
    id: "09-switch",
    no: "09",
    title: "switch文",
    description:
      "1〜7の数字を入力し、対応する曜日を表示しなさい。今回は 1 が入力されたとき「月曜日」と表示するものとします。",
    hint: "switch と case を使います。",
    sampleInput: "1",
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
    description: "while文を使って 1 から 3 までの数字を1行ずつ出力してください。",
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

  "project-score-app": {
    id: "project-score-app",
    no: "演習",
    title: "成績判定アプリ",
    description:
      "配列やメソッドを使って、成績判定アプリを作成してください。",
    hint: "点数を受け取り、評価を返すメソッドを作ると整理しやすいです。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "mini_project",
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

  "project-todo": {
    id: "project-todo",
    no: "演習",
    title: "Todoリスト",
    description:
      "クラスやコレクションを使って、簡単なTodoリストを作成してください。",
    hint: "タスクを追加・表示できる形を目指します。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "mini_project",
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

  "project-library-enhance": {
    id: "project-library-enhance",
    no: "演習",
    title: "図書管理アプリ強化",
    description:
      "コレクションや日付処理などを使って、図書管理アプリを強化してください。",
    hint: "本の一覧、貸出日、返却予定日などを扱えるようにすると発展らしくなります。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "mini_project",
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

  "project-library-final": {
    id: "project-library-final",
    no: "総合",
    title: "図書管理アプリ完成",
    description:
      "最終課題として、図書管理アプリを完成させてください。",
    hint: "本の登録、一覧表示、検索、貸出管理などを組み合わせると完成度が上がります。",
    expectedOutput: "",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
    requiredPatterns: [],
    forbiddenPatterns: [],
    type: "final_project",
  },
};

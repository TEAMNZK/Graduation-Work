export type JavaQuestion = {
  title: string;
  description: string;
  hint: string;
  expectedOutput: string;
  starterCode: string;
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
  },
  "繰り返し回数": {
    title: "繰り返し回数",
    description:
      "for文を使って Hello を 3 回出力してください。",
    hint: 'System.out.println("Hello"); を 3 回繰り返します。',
    expectedOutput: `Hello
Hello
Hello`,
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "ネスト": {
    title: "ネスト",
    description:
      "二重ループを使って * を2行2列で出力してください。",
    hint: "for文の中に for文を入れます。",
    expectedOutput: `**
**`,
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "条件式": {
    title: "条件式",
    description:
      "整数 x = 3 を宣言し、x が 5 未満なら small と出力してください。",
    hint: "if (x < 5) を使います。",
    expectedOutput: "small",
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "無限ループ対策": {
    title: "無限ループ対策",
    description:
      "while文を使って 1 から 3 まで出力してください。",
    hint: "ループ内で変数を増やすのを忘れないようにします。",
    expectedOutput: `1
2
3`,
    starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "クラス定義": {
    title: "クラス定義",
    description:
      "Person クラスを定義し、main メソッドで Person 型の変数を作成してください。出力は 1 行で OK としてください。",
    hint: 'class Person { } のように定義できます。',
    expectedOutput: "OK",
    starterCode: `class Person {
}

public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "インスタンス生成": {
    title: "インスタンス生成",
    description:
      "Person クラスのインスタンスを生成し、OK と出力してください。",
    hint: "Person p = new Person(); のように生成します。",
    expectedOutput: "OK",
    starterCode: `class Person {
}

public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "フィールド": {
    title: "フィールド",
    description:
      "Person クラスに name フィールドを作り、\"Taro\" を代入して出力してください。",
    hint: "フィールドはクラスの中に定義します。",
    expectedOutput: "Taro",
    starterCode: `class Person {
}

public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "カプセル化": {
    title: "カプセル化",
    description:
      "private フィールド score を持つクラスを作り、setter で 100 を代入して getter で出力してください。",
    hint: "getter / setter メソッドを用意します。",
    expectedOutput: "100",
    starterCode: `class Player {
}

public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "継承": {
    title: "継承",
    description:
      'Animal クラスを継承した Dog クラスを作成し、OK と出力してください。',
    hint: "class Dog extends Animal の形です。",
    expectedOutput: "OK",
    starterCode: `class Animal {
}

public class Main {
  public static void main(String[] args) {

  }
}`,
  },
  "ポリモーフィズム": {
    title: "ポリモーフィズム",
    description:
      "親クラス型の変数に子クラスのインスタンスを代入し、OK と出力してください。",
    hint: "Animal a = new Dog(); のように書けます。",
    expectedOutput: "OK",
    starterCode: `class Animal {
}

class Dog extends Animal {
}

public class Main {
  public static void main(String[] args) {

  }
}`,
  },
};
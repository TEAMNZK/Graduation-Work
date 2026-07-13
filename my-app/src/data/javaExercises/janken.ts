import type { JavaExerciseQuestion } from "@/data/javaExercises/types";

export const projectJankenExercise: JavaExerciseQuestion = {
  id: "project-janken",
  no: "演習",
  title: "じゃんけんゲーム",
  description:
    "ユーザー入力と条件分岐を使って、簡単なじゃんけんゲームを作成してください。",
  hint: "Scanner、Random、if文またはswitch文を組み合わせます。",
  expectedOutput: "勝ち",
  starterCode: `import java.util.Random;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`,
  requiredPatterns: ["Scanner", "Random"],
  forbiddenPatterns: [],
  type: "mini_project",
};

export const projectJankenAnswerCode = `import java.util.Random;
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
}`;

const jankenStarterCode = `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {

  }
}`;

export const projectJankenCustomQuestions: JavaExerciseQuestion[] = [
  {
    id: "project-janken-q1",
    no: "演習-1",
    title: "じゃんけんゲーム 基本",
    description:
      "0ならグー、1ならチョキ、2ならパーと表示する処理を作ってください。今回は入力が0のときに「グー」と表示します。",
    hint: "int player = 0; を用意し、if文またはswitch文で表示する文字を分けましょう。",
    expectedOutput: "グー",
    starterCode: jankenStarterCode,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    int player = 0;

    if (player == 0) {
      System.out.println("グー");
    } else if (player == 1) {
      System.out.println("チョキ");
    } else if (player == 2) {
      System.out.println("パー");
    }
  }
}`,
    requiredPatterns: ["if", "System.out.println"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-janken-q2",
    no: "演習-2",
    title: "じゃんけんゲーム 勝敗判定",
    description:
      "自分の手をグー、相手の手をチョキとして、勝敗を判定してください。結果として「勝ち」と表示します。",
    hint: "グーはチョキに勝ちます。player と computer の値を比較しましょう。",
    expectedOutput: "勝ち",
    starterCode: jankenStarterCode,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    int player = 0;
    int computer = 1;

    if (player == computer) {
      System.out.println("あいこ");
    } else if (player == 0 && computer == 1) {
      System.out.println("勝ち");
    } else {
      System.out.println("負け");
    }
  }
}`,
    requiredPatterns: ["if", "System.out.println"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-janken-q3",
    no: "演習-3",
    title: "じゃんけんゲーム 入力",
    description:
      "Scannerで自分の手と相手の手を入力し、同じ手なら「あいこ」と表示してください。サンプル入力は 2 2 です。",
    hint: "Scannerで整数を2つ読み取り、player == computer を判定しましょう。",
    sampleInput: "2 2",
    expectedOutput: "あいこ",
    starterCode: jankenStarterCode,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int player = scanner.nextInt();
    int computer = scanner.nextInt();

    if (player == computer) {
      System.out.println("あいこ");
    } else {
      System.out.println("勝敗あり");
    }
  }
}`,
    requiredPatterns: ["Scanner", "nextInt", "if", "System.out.println"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-janken-q4",
    no: "演習-4",
    title: "じゃんけんゲーム 手の表示",
    description:
      "入力された自分の手と相手の手を文字に変換して表示してください。サンプル入力は 0 2 です。",
    hint: "0をグー、1をチョキ、2をパーに変換する処理を2回使います。",
    sampleInput: "0 2",
    expectedOutput: `あなた: グー
相手: パー`,
    starterCode: jankenStarterCode,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int player = scanner.nextInt();
    int computer = scanner.nextInt();
    String playerHand = "";
    String computerHand = "";

    if (player == 0) {
      playerHand = "グー";
    } else if (player == 1) {
      playerHand = "チョキ";
    } else if (player == 2) {
      playerHand = "パー";
    }

    if (computer == 0) {
      computerHand = "グー";
    } else if (computer == 1) {
      computerHand = "チョキ";
    } else if (computer == 2) {
      computerHand = "パー";
    }

    System.out.println("あなた: " + playerHand);
    System.out.println("相手: " + computerHand);
  }
}`,
    requiredPatterns: ["Scanner", "String", "if", "System.out.println"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-janken-q5",
    no: "演習-5",
    title: "じゃんけんゲーム 完成",
    description:
      "自分の手と相手の手を入力し、手の名前と勝敗を表示するじゃんけんゲームを完成させてください。サンプル入力は 0 1 です。",
    hint: "0=グー、1=チョキ、2=パーです。勝ち条件は、グー対チョキ、チョキ対パー、パー対グーです。",
    sampleInput: "0 1",
    expectedOutput: `あなた: グー
相手: チョキ
結果: 勝ち`,
    starterCode: jankenStarterCode,
    answerCode: `import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int player = scanner.nextInt();
    int computer = scanner.nextInt();
    String playerHand = "";
    String computerHand = "";
    String result = "";

    if (player == 0) {
      playerHand = "グー";
    } else if (player == 1) {
      playerHand = "チョキ";
    } else if (player == 2) {
      playerHand = "パー";
    }

    if (computer == 0) {
      computerHand = "グー";
    } else if (computer == 1) {
      computerHand = "チョキ";
    } else if (computer == 2) {
      computerHand = "パー";
    }

    if (player == computer) {
      result = "あいこ";
    } else if ((player == 0 && computer == 1)
        || (player == 1 && computer == 2)
        || (player == 2 && computer == 0)) {
      result = "勝ち";
    } else {
      result = "負け";
    }

    System.out.println("あなた: " + playerHand);
    System.out.println("相手: " + computerHand);
    System.out.println("結果: " + result);
  }
}`,
    requiredPatterns: ["Scanner", "nextInt", "String", "if", "System.out.println"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
];

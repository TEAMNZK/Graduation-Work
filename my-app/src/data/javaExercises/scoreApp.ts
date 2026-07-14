import type { JavaExerciseQuestion } from "@/data/javaExercises/types";

export const projectScoreAppExercise: JavaExerciseQuestion = {
  id: "project-score-app",
  no: "演習",
  title: "成績判定アプリ",
  description:
    "配列やメソッドを使って、成績判定アプリを作成してください。",
  hint: "点数を受け取り、評価を返すメソッドを作ると整理しやすいです。",
  expectedOutput: "A",
  starterCode: `public class Main {
  public static void main(String[] args) {

  }
}`,
  requiredPatterns: [],
  forbiddenPatterns: [],
  type: "mini_project",
};

export const projectScoreAppAnswerCode = `public class Main {
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
    System.out.println(result);
  }
}`;

export const projectScoreAppCustomQuestions: JavaExerciseQuestion[] = [
  {
    id: "project-score-app-q1",
    no: "演習-1",
    title: "成績判定アプリ 基本",
    description:
      "点数を受け取って評価を返すメソッドを作成してください。",
    hint: "score が 80点以上なら A、60点以上なら B、それ以外は C を返すようにしましょう。",
    expectedOutput: "A",
    starterCode: `public class Main {
  public static String judge(int score) {
    // ここに入力してください
    return "A";
  }

  public static void main(String[] args) {
    System.out.println(judge(90));
  }
}`,
    answerCode: `public class Main {
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
    System.out.println(judge(90));
  }
}`,
    requiredPatterns: ["String", "judge", "if", "return"],
    forbiddenPatterns: [],
    type: "mini_project",
  },
  {
    id: "project-score-app-q2",
    no: "演習-2",
    title: "成績判定アプリ 配列",
    description:
      "複数の点数を配列に入れて順番に判定してください。",
    hint: "配列に点数を入れて、for文を使って1つずつ判定します。",
    expectedOutput: `A
B
C`,
    starterCode: `public class Main {
  public static String judge(int score) {
    return "A";
  }

  public static void main(String[] args) {
    int[] scores = {90, 70, 50};
    // ここに入力してください
  }
}`,
    answerCode: `public class Main {
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

    for (int i = 0; i < scores.length; i++) {
      System.out.println(judge(scores[i]));
    }
  }
}`,
    requiredPatterns: ["int[]", "for", "System.out.println"],
    forbiddenPatterns: [],
    inheritPreviousCode: true,
    type: "mini_project",
  },
  {
    id: "project-score-app-q3",
    no: "演習-3",
    title: "成績判定アプリ 完成",
    description:
      "計算した評価を集計して、各評価がいくつあるかを数えて表示してください。",
    hint: "各評価の数をカウントして、結果をまとめて表示しましょう。",
    expectedOutput: `A:1
B:1
C:1`,
    starterCode: `public class Main {
  public static String judge(int score) {
    return "A";
  }

  public static void main(String[] args) {
    int[] scores = {90, 70, 50};
    // ここに入力してください
  }
}`,
    answerCode: `public class Main {
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
    int countA = 0;
    int countB = 0;
    int countC = 0;

    for (int i = 0; i < scores.length; i++) {
      String grade = judge(scores[i]);
      if (grade.equals("A")) {
        countA++;
      } else if (grade.equals("B")) {
        countB++;
      } else if (grade.equals("C")) {
        countC++;
      }
    }

    System.out.println("A:" + countA);
    System.out.println("B:" + countB);
    System.out.println("C:" + countC);
  }
}`,
    requiredPatterns: ["judge", "for", "System.out.println", "equals"],
    forbiddenPatterns: [],
    inheritPreviousCode: true,
    type: "mini_project",
  },
];

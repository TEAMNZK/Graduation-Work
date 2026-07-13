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

export const projectScoreAppCustomQuestions: JavaExerciseQuestion[] = [];

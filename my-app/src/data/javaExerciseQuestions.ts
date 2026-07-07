import {
  projectJankenExercise,
  projectJankenAnswerCode,
  projectJankenCustomQuestions,
} from "./javaExercises/janken";

import {
  projectScoreAppExercise,
  projectScoreAppAnswerCode,
  projectScoreAppCustomQuestions,
} from "./javaExercises/scoreApp";

import {
  projectTodoExercise,
  projectTodoAnswerCode,
  projectTodoCustomQuestions,
} from "./javaExercises/todo";

import {
  projectLibraryEnhanceExercise,
  projectLibraryEnhanceAnswerCode,
  projectLibraryEnhanceCustomQuestions,
  projectLibraryFinalExercise,
  projectLibraryFinalAnswerCode,
  projectLibraryFinalCustomQuestions,
} from "./javaExercises/library";

import type { JavaExerciseQuestion } from "./javaExercises/types";

export type { JavaExerciseQuestion } from "./javaExercises/types";

const createPrintAnswerCode = (output: string): string => `public class Main {
  public static void main(String[] args) {
    System.out.println("${output}");
  }
}`;

const baseJavaExerciseQuestionMap: Record<string, JavaExerciseQuestion> = {
  "project-janken": projectJankenExercise,
  "project-score-app": projectScoreAppExercise,
  "project-todo": projectTodoExercise,
  "project-library-enhance": projectLibraryEnhanceExercise,
  "project-library-final": projectLibraryFinalExercise,
};

const baseJavaExerciseAnswerCodeMap: Record<string, string> = {
  "project-janken": projectJankenAnswerCode,
  "project-score-app": projectScoreAppAnswerCode,
  "project-todo": projectTodoAnswerCode,
  "project-library-enhance": projectLibraryEnhanceAnswerCode,
  "project-library-final": projectLibraryFinalAnswerCode,
};

const customJavaExerciseQuestionSets: Record<string, JavaExerciseQuestion[]> = {
  "project-janken": projectJankenCustomQuestions,
  "project-score-app": projectScoreAppCustomQuestions,
  "project-todo": projectTodoCustomQuestions,
  "project-library-enhance": projectLibraryEnhanceCustomQuestions,
  "project-library-final": projectLibraryFinalCustomQuestions,
};

const makeReviewQuestion = (
  base: JavaExerciseQuestion,
  index: number,
  output: string,
  focus: string
): JavaExerciseQuestion => {
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

const expandQuestionSet = (
  base: JavaExerciseQuestion
): JavaExerciseQuestion[] => {
  if (customJavaExerciseQuestionSets[base.id]) {
    return customJavaExerciseQuestionSets[base.id];
  }

  const baseQuestion: JavaExerciseQuestion = {
    ...base,
    id: `${base.id}-q1`,
    no: `${base.no}-1`,
    title: `${base.title} 基本`,
    answerCode:
      base.answerCode ??
      baseJavaExerciseAnswerCodeMap[base.id] ??
      createPrintAnswerCode(base.expectedOutput ?? ""),
  };

  return [
    baseQuestion,
    makeReviewQuestion(base, 2, "Practice 1", "基本の書き方"),
    makeReviewQuestion(base, 3, "Practice 2", "値や処理の流れ"),
    makeReviewQuestion(base, 4, "Practice 3", "読みやすいコード"),
    makeReviewQuestion(base, 5, "Practice 4", "自分で書き切ること"),
  ];
};

export const javaExerciseQuestionMap: Record<string, JavaExerciseQuestion[]> =
  Object.fromEntries(
    Object.entries(baseJavaExerciseQuestionMap).map(([topicId, question]) => [
      topicId,
      expandQuestionSet(question),
    ])
  );
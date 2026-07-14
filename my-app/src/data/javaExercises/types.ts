export type JavaExerciseQuestion = {
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

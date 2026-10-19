export type JavaDrillReview = {
  questionId: string;
  code: string;
  stdin: string;
  output: string;
  progressSaved: boolean;
};

export function getJavaDrillReview(value: unknown, questionId: string): JavaDrillReview | null {
  if (!value || typeof value !== "object") return null;
  const review = value as Partial<JavaDrillReview>;
  if (review.questionId !== questionId || typeof review.code !== "string" ||
      typeof review.stdin !== "string" || typeof review.output !== "string" ||
      typeof review.progressSaved !== "boolean") return null;
  return review as JavaDrillReview;
}

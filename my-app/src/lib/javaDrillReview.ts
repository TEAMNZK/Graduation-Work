export type JavaDrillReview = {
  questionId: string;
  code: string;
  stdin: string;
  output: string;
  progressSaved: boolean;
  questionVersion?: string;
};

export function getJavaDrillReview(value: unknown, questionId: string, questionVersion?: string): JavaDrillReview | null {
  if (!value || typeof value !== "object") return null;
  const review = value as Partial<JavaDrillReview>;
  if (questionVersion !== undefined && review.questionVersion !== questionVersion) return null;
  if (review.questionId !== questionId || typeof review.code !== "string" ||
      typeof review.stdin !== "string" || typeof review.output !== "string" ||
      typeof review.progressSaved !== "boolean") return null;
  return review as JavaDrillReview;
}

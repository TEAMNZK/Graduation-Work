export function calculateLearningProgress(
  questionIds: string[],
  solvedQuestionIds: string[]
) {
  const available = new Set(questionIds);
  const solvedCount = new Set(solvedQuestionIds.filter((id) => available.has(id))).size;
  const totalCount = available.size;
  return { solvedCount, totalCount, percent: totalCount === 0 ? 0 : solvedCount / totalCount * 100 };
}

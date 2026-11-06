type NumberedQuestion = {
  no: string;
  type: string;
  project?: { optional?: boolean };
};

// Display numbers are derived from learning order; persistent question IDs stay unchanged.
export function numberDrillTopics<T extends NumberedQuestion>(topics: Record<string, T[]>) {
  let lesson = 0;
  let project = 0;
  let optional = 0;
  const topicNumbers: Record<string, string> = {};
  const questionMap = Object.fromEntries(Object.entries(topics).map(([topicId, questions]) => {
    const first = questions[0];
    const isProject = first ? first.type !== "lesson" : topicId.startsWith("project-");
    const no = first?.project?.optional ? `発展${++optional}`
      : isProject ? `制作${++project}` : String(++lesson).padStart(2, "0");
    topicNumbers[topicId] = no;
    return [topicId, questions.map((question, index) => ({ ...question, no: `${no}-${index + 1}` }))];
  })) as Record<string, T[]>;
  return { questionMap, topicNumbers };
}

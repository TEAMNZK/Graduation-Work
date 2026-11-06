const { test } = require('node:test');
const assert = require('node:assert/strict');
const load = require('../scripts/load-ts.cjs');

for (const language of ['java', 'python', 'c']) {
  test(`${language}: list numbers and exercise numbers agree without duplicates or gaps`, () => {
    const data = load(`src/data/${language}Questions.ts`);
    const map = data[`${language}QuestionMap`];
    const curriculum = load(`src/data/${language}Curriculum.ts`)[`${language}Curriculum`];
    const numbers = [];
    let lesson = 0;
    let project = 0;
    let optional = 0;
    for (const item of curriculum.flatMap(section => section.items)) {
      const questions = map[item.id];
      const expected = questions[0]?.project?.optional ? `発展${++optional}`
        : item.type !== 'lesson' ? `制作${++project}` : String(++lesson).padStart(2, '0');
      assert.equal(item.no, expected, item.id);
      questions.forEach((question, index) => {
        assert.equal(question.no, `${expected}-${index + 1}`, question.id);
        assert.equal(data[`${language}QuestionEntriesById`][question.id].no, question.no);
        numbers.push(question.no);
      });
    }
    assert.equal(new Set(numbers).size, numbers.length);
    assert.equal(numbers.length, Object.keys(data[`${language}QuestionEntriesById`]).length);
  });
}

test('renumbering preserves question IDs, content and persisted progress', () => {
  const { numberDrillTopics } = load('src/lib/drillNumbering.ts');
  const { calculateLearningProgress } = load('src/lib/learningProgress.ts');
  const question = { id: 'old-id', no: '99', type: 'lesson', answerCode: 'unchanged' };
  const numbered = numberDrillTopics({ topic: [question] }).questionMap.topic[0];
  assert.deepEqual(numbered, { ...question, no: '01-1' });
  assert.equal(question.no, '99');
  assert.equal(calculateLearningProgress([numbered.id], ['old-id']).percent, 100);
});

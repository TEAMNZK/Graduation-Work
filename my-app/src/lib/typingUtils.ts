export const ignoredKeys = [
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "CapsLock",
  "Tab",
];

export function getCharStatus({
  index,
  currentIndex,
  mistakeIndex,
}: {
  index: number;
  currentIndex: number;
  mistakeIndex: number | null;
}) {
  if (index < currentIndex) return "correct";
  if (index === mistakeIndex) return "mistake";
  if (index === currentIndex) return "current";
  return "pending";
}

export function calculateAccuracy(
  correctChars: number,
  totalMistakes: number
) {
  const totalInputs = correctChars + totalMistakes;
  if (totalInputs === 0) return 100;
  return Math.round((correctChars / totalInputs) * 100);
}
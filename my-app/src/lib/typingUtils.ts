export const ignoredKeys = [
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "CapsLock",
  "Tab",
];

// 各文字の表示状態を返す
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

// 正確率を計算する
export function calculateAccuracy(
  correctChars: number,
  totalMistakes: number
) {
  const totalInputs = correctChars + totalMistakes;

  if (totalInputs === 0) {
    return 0;
  }

  return Math.round((correctChars / totalInputs) * 100);
}

// 途中まで入力した文字も加点し、表示用に丸める前の正確率で採点する。
export function calculateTypingResult(
  correctChars: number,
  totalMistakes: number,
  gameSeconds: number
) {
  const totalInputs = correctChars + totalMistakes;
  const ratio = totalInputs === 0 ? 0 : correctChars / totalInputs;
  const score = Math.round(correctChars * ratio);
  // 制限時間あたりの得点で比較するため、途中終了でランクは上がらない。
  const pointsPerMinute = gameSeconds > 0 ? score * 60 / gameSeconds : 0;
  const rank = pointsPerMinute >= 180 ? "S"
    : pointsPerMinute >= 120 ? "A"
    : pointsPerMinute >= 80 ? "B"
    : pointsPerMinute >= 40 ? "C" : "D";

  return { score, rank };
}

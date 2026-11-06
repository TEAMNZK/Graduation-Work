export const TYPING_MODES = {
  standard: { label: "通常モード", seconds: 120 },
  long: { label: "長時間モード", seconds: 300 },
} as const;

export type TypingMode = keyof typeof TYPING_MODES;

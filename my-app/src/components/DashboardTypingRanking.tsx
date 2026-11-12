"use client";

import { useId, useState } from "react";
import Link from "next/link";
import TypingRanking from "@/components/TypingRanking";
import { TYPING_MODES, type TypingMode } from "@/lib/typingModes";

const languages = ["Java", "Python", "C"] as const;

export default function DashboardTypingRanking() {
  const [language, setLanguage] = useState<(typeof languages)[number]>("Java");
  const [mode, setMode] = useState<TypingMode>("standard");
  const id = useId();

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="mb-3 text-lg font-bold">タイピング練習ランキング</h3>
      <div className="mb-4 grid gap-3">
        <div>
          <label htmlFor={`${id}-language`} className="mb-1 block text-sm font-medium">言語</label>
          <select id={`${id}-language`} value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
            {languages.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-mode`} className="mb-1 block text-sm font-medium">モード</label>
          <select id={`${id}-mode`} value={mode} onChange={(event) => setMode(event.target.value as TypingMode)} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
            {(Object.keys(TYPING_MODES) as TypingMode[]).map((value) => <option key={value} value={value}>{TYPING_MODES[value].label}</option>)}
          </select>
        </div>
      </div>
      <TypingRanking key={`${language}-${mode}`} language={language} mode={mode} compact />
      <Link href={`/typing/${language.toLowerCase()}`} className="mt-4 inline-block text-sm font-bold text-blue-600 hover:underline">この言語で練習する →</Link>
    </section>
  );
}

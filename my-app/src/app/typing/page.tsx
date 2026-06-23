"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import AppHeader from "@/components/AppHeader";

const languages = ["Java", "Python", "C", "JavaScript"];

export default function TypingPage() {
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <AppHeader title="タイピング練習" activeKey="typing" showBack />

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((language) => (
              <Link
                key={language}
                href={`/typing/${language.toLowerCase()}`}
                className="rounded-2xl bg-white p-8 text-center text-2xl font-bold shadow transition hover:bg-gray-50 hover:shadow-md"
              >
                {language}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

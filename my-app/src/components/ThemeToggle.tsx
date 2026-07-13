"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return localStorage.getItem("theme") === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = readTheme();
    setTheme(storedTheme);
    document.documentElement.dataset.theme = storedTheme;
  }, []);

  const selectTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <div
      className="fixed right-4 top-4 z-50 flex rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-1 shadow-sm"
      aria-label="テーマ切替"
    >
      <button
        type="button"
        onClick={() => selectTheme("light")}
        className={`rounded-md px-3 py-1.5 text-sm font-medium ${
          theme === "light"
            ? "bg-[var(--app-accent)] text-white"
            : "text-[var(--app-muted)] hover:bg-[var(--app-surface-soft)]"
        }`}
        aria-pressed={theme === "light"}
      >
        白
      </button>
      <button
        type="button"
        onClick={() => selectTheme("dark")}
        className={`rounded-md px-3 py-1.5 text-sm font-medium ${
          theme === "dark"
            ? "bg-[var(--app-accent)] text-white"
            : "text-[var(--app-muted)] hover:bg-[var(--app-surface-soft)]"
        }`}
        aria-pressed={theme === "dark"}
      >
        黒
      </button>
    </div>
  );
}

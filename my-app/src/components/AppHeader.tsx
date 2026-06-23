"use client";

import Link from "next/link";

type NavKey = "textbook" | "drill" | "articles" | "typing";

type AppHeaderProps = {
  title: string;
  description?: string;
  activeKey?: NavKey;
  showBack?: boolean;
  action?: React.ReactNode;
};

const navItems: { key: NavKey; href: string; label: string }[] = [
  { key: "textbook", href: "/textbook", label: "教科書" },
  { key: "drill", href: "/drill", label: "ドリル" },
  { key: "articles", href: "/articles", label: "記事" },
  { key: "typing", href: "/typing", label: "タイピング練習" },
];

const getNavClassName = (isActive: boolean) =>
  [
    "rounded-lg border px-5 py-2 text-sm font-bold transition",
    isActive
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : "border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100",
  ].join(" ");

export default function AppHeader({
  title,
  description,
  activeKey,
  showBack = false,
  action,
}: AppHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-bold tracking-widest text-blue-600">
              CODE LORD NOTE
            </p>
            <h1 className="mt-1 text-2xl font-bold">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>

        <nav className="flex flex-wrap gap-2">
          {showBack && (
            <Link href="/dashboard" className={getNavClassName(false)}>
              戻る
            </Link>
          )}

          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={getNavClassName(activeKey === item.key)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

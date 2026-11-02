"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import styles from "./AppHeader.module.css";

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
      ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
      : "border-white/90 bg-white/85 text-slate-800 hover:bg-white",
  ].join(" ");

export default function AppHeader({
  title,
  description,
  activeKey,
  showBack = false,
  action,
}: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/dashboard"
              aria-label="Code Lord Note ダッシュボードへ"
              className="block w-[240px] max-w-full rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:w-[300px]"
            >
              <Image
                src={logo}
                alt="Code Lord Note"
                sizes="(max-width: 640px) 240px, 300px"
                preload
                className="h-auto w-full"
              />
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">{title}</h1>
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

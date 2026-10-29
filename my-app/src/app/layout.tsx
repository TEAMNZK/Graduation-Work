import type { Metadata } from "next";
import favicon from "../../public/images/favicon.png";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Lord Note",
  description: "プログラミング学習支援システム",
  icons: {
    icon: { url: favicon.src, type: "image/png" },
    shortcut: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardPage() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <AuthGuard>
      <main style={{ padding: "2rem" }}>
        <h1>ダッシュボード</h1>
        <p>ログイン済みユーザーだけが見られる画面です。</p>
        <button onClick={handleLogout}>ログアウト</button>
      </main>
    </AuthGuard>
  );
}
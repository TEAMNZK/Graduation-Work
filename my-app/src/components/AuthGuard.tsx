"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [router]);

  if (user === undefined) {
    return (
      <main className="min-h-screen bg-[var(--app-bg)] p-8 text-[var(--app-muted)]">
        読み込み中...
      </main>
    );
  }

  return <>{children}</>;
}

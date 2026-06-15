"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import AuthGuard from "@/components/AuthGuard";
import { javaQuestionMap } from "@/data/javaQuestions";

type UserProgress = {
  correctAnswers?: number;
  completedDrills?: number;
  lastSolvedTopic?: string;
  lastSolvedLanguage?: string;
  studyingLanguages?: string[];
  solvedTopics?: string[];
};

type UserData = {
  uid?: string;
  email?: string;
  userName?: string;
  progress?: UserProgress;
};

const recommendedArticles = [
  "Python入門の始め方",
  "JavaScriptでできること",
];

const rankingData = [
  { name: "ユーザーA", score: 3200 },
  { name: "ユーザーB", score: 2800 },
  { name: "ユーザーC", score: 2500 },
  { name: "ユーザーD", score: 2100 },
  { name: "ユーザーE", score: 1800 },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setUserData(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserData);
        } else {
          setUserData({
            uid: currentUser.uid,
            email: currentUser.email ?? "",
            userName: "",
            progress: {
              correctAnswers: 0,
              completedDrills: 0,
              lastSolvedTopic: "まだありません",
              lastSolvedLanguage: "まだありません",
              solvedTopics: [],
            },
          });
        }
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const progress = userData?.progress;
  const correctAnswers = progress?.correctAnswers ?? 0;
  const completedDrills = progress?.completedDrills ?? 0;
  const solvedCount = progress?.solvedTopics?.length ?? 0;
  const solvedTopics = progress?.solvedTopics ?? [];
  const currentLanguage = progress?.lastSolvedLanguage ?? "まだありません";

  const displayUserName = useMemo(() => {
    if (userData?.userName && userData.userName.trim() !== "") {
      return userData.userName;
    }

    if (user?.displayName && user.displayName.trim() !== "") {
      return user.displayName;
    }

    if (userData?.email && userData.email.trim() !== "") {
      return userData.email;
    }

    if (user?.email && user.email.trim() !== "") {
      return user.email;
    }

    return "ゲスト";
  }, [user, userData]);

  const level = useMemo(() => {
    if (correctAnswers >= 30) return 5;
    if (correctAnswers >= 20) return 4;
    if (correctAnswers >= 10) return 3;
    if (correctAnswers >= 5) return 2;
    return 1;
  }, [correctAnswers]);

  const levelLabel = useMemo(() => {
    if (level === 5) return "上級者";
    if (level === 4) return "中上級者";
    if (level === 3) return "中級者";
    if (level === 2) return "初級者";
    return "入門者";
  }, [level]);

  const progressPercent = useMemo(() => {
    const target = 20;
    return Math.min((completedDrills / target) * 100, 100);
  }, [completedDrills]);

  const nextRecommendedTopic = useMemo(() => {
    const javaTopics = Object.keys(javaQuestionMap);
    const nextTopic = javaTopics.find((topic) => !solvedTopics.includes(topic));
    return nextTopic ?? "Javaの問題はすべて完了しています";
  }, [solvedTopics]);

  const nextRecommendedLink = useMemo(() => {
    return "/drill/java";
  }, []);

  if (loading) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-gray-100 p-8">
          <p>読み込み中...</p>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div>
              <p className="text-sm font-bold tracking-widest text-blue-600">
                CODE LORD NOTE
              </p>
              <h1 className="mt-1 text-2xl font-bold">ダッシュボード</h1>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              ログアウト
            </button>
          </div>

          <nav className="mx-auto flex max-w-7xl gap-2 px-6 pb-4">
            <Link
              href="/textbook"
              className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              教科書
            </Link>
            <Link
              href="/drill"
              className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              ドリル
            </Link>
            <Link
              href="/articles"
              className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              記事
            </Link>
            <Link
              href="/typing"
              className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-2 font-medium hover:bg-gray-100"
            >
              タイピング練習
            </Link>
          </nav>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-sm text-gray-500">ログイン中のユーザー</p>
            <h2 className="mt-2 text-3xl font-bold">
              こんにちは、{displayUserName}さん
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              今日も学習を進めていきましょう。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr]">
            {/* 左 */}
            <aside className="space-y-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">おすすめ記事</h3>
                <ul className="space-y-3">
                  {recommendedArticles.map((article, index) => (
                    <li
                      key={index}
                      className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm hover:bg-gray-100"
                    >
                      {article}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-bold">学習中の言語</h3>
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-bold">
                  {currentLanguage}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-bold">タイピング練習ランキング</h3>
                <ol className="space-y-2">
                  {rankingData.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-3"
                    >
                      <span className="font-medium">
                        {index + 1}位 {item.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.score} 点
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* 中央 */}
            <section className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <p className="text-sm text-gray-500">現在のレベル</p>

                    <div className="mt-3 flex items-end gap-3">
                      <p className="text-5xl font-bold text-blue-600">Lv.{level}</p>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                        {levelLabel}
                      </span>
                    </div>

                    <div className="mt-8">
                      <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                        <span>学習達成率</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>

                      <div className="h-4 w-full rounded-full bg-gray-200">
                        <div
                          className="h-4 rounded-full bg-blue-500 transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        完了ドリル数 {completedDrills} / 20
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">正答数</p>
                      <p className="mt-2 text-3xl font-bold">{correctAnswers}</p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">解いた問題数</p>
                      <p className="mt-2 text-3xl font-bold">{solvedCount}</p>
                    </div>

                    <div className="col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-sm text-gray-500">最後に解いた問題</p>
                      <p className="mt-2 font-bold">
                        {progress?.lastSolvedTopic ?? "まだありません"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold">おすすめ次問題</h3>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">次に挑戦するとよい問題</p>
                  <p className="mt-2 text-xl font-bold">{nextRecommendedTopic}</p>
                  <Link
                    href={nextRecommendedLink}
                    className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
                  >
                    問題一覧へ
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Link
                  href="/textbook"
                  className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-2xl font-bold">教科書</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    各プログラミング言語の特徴や用途を学べます。
                  </p>
                </Link>

                <Link
                  href="/drill"
                  className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-2xl font-bold">ドリル</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    問題を解いて理解度を確認できます。
                  </p>
                </Link>

                <Link
                  href="/articles"
                  className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-2xl font-bold">記事</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    学習に役立つ記事や補足情報を読めます。
                  </p>
                </Link>

                <Link
                  href="/typing"
                  className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-2xl font-bold">タイピング練習</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    タイピング練習で入力速度を高められます。
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import AppHeader from "@/components/AppHeader";
import { cCurriculum } from "@/data/cCurriculum";
import { getCQuestions, hasCQuestions } from "@/data/cQuestions";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const STORAGE_KEY = "drill-c-session";

type DrillSession = {
  selectedTopics: string[];
  selectedQuestionIds: string[];
  currentIndex: number;
  isInProgress: boolean;
};

export default function DrillCPage() {
  const router = useRouter();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [hasInterruptedSession, setHasInterruptedSession] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [solvedQuestionIds, setSolvedQuestionIds] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) { if (active) setSolvedQuestionIds([]); return; }
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        const solved = snapshot.data()?.progress?.solvedTopics;
        if (active) setSolvedQuestionIds(Array.isArray(solved) ? solved.filter((id): id is string => typeof id === "string") : []);
      } catch (error) {
        console.error("制作目標の進捗を取得できませんでした:", error);
      }
    });
    return () => { active = false; unsubscribe(); };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let hasSavedSession = false;

    if (saved) {
      try {
        const parsed: DrillSession = JSON.parse(saved);
        const validTopics = parsed.selectedTopics.filter(
          (topicId) => hasCQuestions(topicId)
        );

        const validQuestionIds =
          parsed.selectedQuestionIds?.filter((questionId) =>
            validTopics.some((topicId) =>
              getCQuestions(topicId).some((question) => question.id === questionId)
            )
          ) ??
          validTopics.flatMap((topicId) =>
            getCQuestions(topicId).map((question) => question.id)
          );

        if (
          parsed.isInProgress &&
          validTopics.length > 0 &&
          validQuestionIds.length > 0
        ) {
          hasSavedSession = true;
        }
      } catch (error) {
        console.error("保存データの読み込みに失敗しました:", error);
      }
    }

    const timerId = window.setTimeout(() => {
      setHasInterruptedSession(hasSavedSession);
      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  const questionItems = useMemo(() => {
    return cCurriculum.flatMap((section) => section.items);
  }, []);

  const selectableQuestionItems = useMemo(() => {
    return questionItems.filter((item) => hasCQuestions(item.id));
  }, [questionItems]);

  const questionItemCount = questionItems.length;
  const selectableQuestionItemCount = selectableQuestionItems.length;
  const selectedCount = selectedTopics.length;
  const selectedQuestionCount = selectedTopics.reduce(
    (total, topicId) => total + getCQuestions(topicId).length,
    0
  );

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTopics(selectableQuestionItems.filter((item) => !item.project?.optional).map((item) => item.id));
  };

  const handleClearAll = () => {
    setSelectedTopics([]);
  };

  const getSelectableSectionItems = (
    items: (typeof cCurriculum)[number]["items"]
  ) => {
    return items.filter((item) => hasCQuestions(item.id));
  };

  const handleSelectSection = (
    items: (typeof cCurriculum)[number]["items"]
  ) => {
    const sectionTopicIds = getSelectableSectionItems(items).filter((item) => !item.project?.optional).map(
      (item) => item.id
    );

    setSelectedTopics((prev) => Array.from(new Set([...prev, ...sectionTopicIds])));
  };

  const handleClearSection = (
    items: (typeof cCurriculum)[number]["items"]
  ) => {
    const sectionTopicIds = new Set(
      getSelectableSectionItems(items).map((item) => item.id)
    );

    setSelectedTopics((prev) => prev.filter((id) => !sectionTopicIds.has(id)));
  };

  const handleStart = () => {
    const validSelectedTopics = questionItems.map((item) => item.id).filter(
      (topicId) => selectedTopics.includes(topicId) && hasCQuestions(topicId)
    );

    if (validSelectedTopics.length === 0) {
      alert("少なくとも1つ問題を選択してください。");
      return;
    }

    const selectedQuestionIds = validSelectedTopics.flatMap((topicId) =>
      getCQuestions(topicId).map((question) => question.id)
    );

    const session: DrillSession = {
      selectedTopics: validSelectedTopics,
      selectedQuestionIds,
      currentIndex: 0,
      isInProgress: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    router.push("/drill/c/start");
  };

  const handleContinue = () => {
    router.push("/drill/c/start");
  };

  const getItemBadge = (type: "lesson" | "mini_project" | "final_project") => {
    if (type === "lesson") {
      return "border-blue-200 bg-blue-50 text-blue-700";
    }

    if (type === "mini_project") {
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    return "border-purple-200 bg-purple-50 text-purple-700";
  };

  const getItemLabel = (type: "lesson" | "mini_project" | "final_project") => {
    if (type === "lesson") return "通常問題";
    if (type === "mini_project") return "ミニ制作";
    return "総合演習";
  };

  if (!isLoaded) {
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
        <AppHeader
          title="ドリル - C"
          description="章ごとに問題を選んで、順番に演習を進めます。"
          activeKey="drill"
          showBack
        />

        <section className="mx-auto max-w-7xl px-6 py-8">
          {/* 上部サマリー */}
          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm text-gray-500">Cドリルの進め方</p>
              <h2 className="mt-2 text-2xl font-bold">
                実装済みの問題を選んで出題を開始します
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                お会計・成績集計・在庫管理を作り、最後に保存できる在庫管理アプリへ育てます。
                各章の通常問題で準備して、最後に制作へ挑戦しましょう。選択した問題は学習順に出題します。
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold">選択状況</h3>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">選択中</p>
                  <p className="mt-2 text-3xl font-bold text-blue-600">
                  {selectedCount}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedQuestionCount}問
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">選択可能</p>
                  <p className="mt-2 text-3xl font-bold">
                    {selectableQuestionItemCount}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-gray-500">
                カリキュラム内の出題項目 {questionItemCount} 件中、問題データがあるものだけを選択できます。
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={handleSelectAll}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  必修をすべて選択
                </button>

                <button
                  onClick={handleClearAll}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  選択解除
                </button>
              </div>
            </div>
          </div>

          {/* 続きから */}
          {hasInterruptedSession && (
            <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-5">
              <p className="text-sm font-bold text-yellow-800">
                前回中断した問題があります。
              </p>
              <p className="mt-1 text-sm text-yellow-700">
                続きから再開することも、新しく選び直して始めることもできます。
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleContinue}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
                >
                  続きから
                </button>
              </div>
            </div>
          )}

          {/* 出題開始バー */}
          <div className="sticky top-0 z-10 mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-gray-500">出題準備</p>
                <p className="mt-1 font-bold">
                  {selectedCount === 0
                    ? "問題を選択してください"
                    : `${selectedCount}項目、${selectedQuestionCount}問が選択されています`}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleStart}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
                >
                  出題開始
                </button>

                {hasInterruptedSession && (
                  <button
                    onClick={handleContinue}
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-bold hover:bg-gray-50"
                  >
                    続きから
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-xl font-bold text-emerald-900">作れるものを増やそう</h2>
            <p className="mt-2 text-sm text-emerald-900">完成した制作物 {questionItems.filter((item) => item.project && !item.project.optional && getCQuestions(item.id).every((question) => solvedQuestionIds.includes(question.id))).length} / {questionItems.filter((item) => item.project && !item.project.optional).length}</p>
            <p className="mt-1 text-sm text-emerald-800">正解して保存した制作課題が、あなたの完成作品になります。</p>
            <p className="mt-1 text-sm text-emerald-800">第5章の保存版は3段階すべてのクリアで完成です。任意のフラグ課題は必修の達成率に含めません。</p>
          </div>

          {/* カリキュラム一覧 */}
          <div className="space-y-6">
            {cCurriculum.map((section) => (
              <section
                key={section.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex flex-col gap-4 border-b border-gray-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{section.sectionTitle}</h2>
                    <p className="mt-2 text-sm text-gray-600">
                      {section.description}
                    </p>
                  </div>

                  {(() => {
                    const selectableSectionItems = getSelectableSectionItems(
                      section.items
                    );
                    const selectableSectionIds = selectableSectionItems.map(
                      (item) => item.id
                    );
                    const selectedSectionCount = selectableSectionIds.filter((id) =>
                      selectedTopics.includes(id)
                    ).length;
                    const hasSelectableItems = selectableSectionItems.length > 0;

                    return (
                      <div className="shrink-0 rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <p className="text-xs font-bold text-gray-500">
                          章内の選択
                        </p>
                        <p className="mt-1 text-sm font-bold">
                          {selectedSectionCount}/{selectableSectionItems.length}
                          件
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelectSection(section.items)}
                            disabled={!hasSelectableItems}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-bold hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            章の必修を選択
                          </button>
                          <button
                            type="button"
                            onClick={() => handleClearSection(section.items)}
                            disabled={!hasSelectableItems || selectedSectionCount === 0}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-bold hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            解除
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {section.items.map((item) => {
                    const isAvailable = hasCQuestions(item.id);
                    const isChecked = selectedTopics.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`rounded-lg border p-4 transition ${
                          isAvailable && isChecked
                            ? "border-blue-300 bg-blue-50"
                            : isAvailable
                            ? "border-gray-200 bg-gray-50"
                            : "border-gray-200 bg-gray-100 opacity-75"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-start gap-3">
                            {isAvailable ? (
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleTopic(item.id)}
                                className="mt-1 h-5 w-5 rounded border-gray-300"
                              />
                            ) : (
                              <div className="mt-1 h-5 w-5 rounded-full border border-gray-300 bg-white" />
                            )}

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-bold text-gray-500">
                                  {item.no}
                                </span>
                                <h3 className="text-lg font-bold">
                                  {item.title}
                                </h3>
                                <span className="text-xs text-gray-500">全{getCQuestions(item.id).length}問</span>
                              </div>

                              <p className="mt-2 text-sm text-gray-600">
                                {!isAvailable
                                  ? "問題データを準備中です。公開後に選択できます。"
                                  : item.type === "lesson"
                                  ? "基礎理解のための通常問題です。"
                                  : item.type === "mini_project"
                                  ? "ここまでの内容を使って小作品を作る演習です。"
                                  : "これまでの学習をまとめる総合演習です。"}
                              </p>
                              {item.project && (
                                <div className="mt-3 space-y-2 text-sm">
                                  {item.project.optional && <p className="font-bold text-purple-800">任意の発展課題：完成後に追加挑戦できます</p>}
                                  <p className="font-bold text-emerald-800">完成目標：{item.id === "c-project-inventory-advanced" ? "複数商品・動的メモリ・保存と復元を備えた在庫管理アプリを、3段階で完成させる。" : item.project.goal}</p>
                                  {getCQuestions(item.id).length > 1 && <p>制作ステップ：{getCQuestions(item.id).filter((question) => solvedQuestionIds.includes(question.id)).length} / {getCQuestions(item.id).length} クリア</p>}
                                  <p className="text-gray-600">使う内容：{item.project.prerequisiteTopicIds.map((id) => getCQuestions(id)[0]?.title).join("・")}</p>
                                  <p className="font-medium text-emerald-800">
                                    {getCQuestions(item.id).every((question) => solvedQuestionIds.includes(question.id))
                                      ? "制作物が完成しました！再挑戦もできます。"
                                      : `準備の演習：${item.project.prerequisiteTopicIds.filter((id) => getCQuestions(id).every((question) => solvedQuestionIds.includes(question.id))).length} / ${item.project.prerequisiteTopicIds.length} 項目クリア`}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${getItemBadge(
                              item.type
                            )}`}
                          >
                            {!isAvailable
                              ? "準備中"
                              : getItemLabel(item.type)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

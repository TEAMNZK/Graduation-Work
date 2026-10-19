import Link from "next/link";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import AuthGuard from "@/components/AuthGuard";
import { javaQuestionEntriesById } from "@/data/javaQuestions";
import { getJavaExplanation } from "@/data/javaExplanations";

export default async function JavaExplanationPage({ params }: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;
  if (!Object.hasOwn(javaQuestionEntriesById, questionId)) notFound();
  const question = javaQuestionEntriesById[questionId];
  const explanation = getJavaExplanation(question);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-slate-100 text-slate-900">
        <AppHeader title="問題の解説" description={question.title} activeKey="drill" />
        <article className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
          <nav aria-label="解説ページのナビゲーション" className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/drill/java/start" className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold hover:bg-slate-50">
              問題に戻る
            </Link>
            <span className="text-sm text-slate-500">Java / {question.no}</span>
          </nav>

          <section className="rounded-xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <p className="text-sm font-bold text-blue-700">解き方を振り返る</p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{question.title}</h1>
            <p className="mt-4 leading-8">{explanation.overview}</p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold">この問題の考え方</h2>
            <p className="mt-4 whitespace-pre-line leading-8">{question.description}</p>
            <div className="mt-5 rounded-lg bg-amber-50 p-4 leading-8">
              <p className="font-bold text-amber-900">解くときのポイント</p>
              <p className="mt-1">{question.hint}</p>
            </div>
            <ul className="mt-5 list-disc space-y-3 pl-5 leading-7">
              {explanation.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="p-6 sm:px-8">
              <h2 className="text-xl font-bold">見本コード</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">正解の書き方の一例です。下の説明と見比べながら、値と処理の流れを追ってみましょう。</p>
            </div>
            <pre className="overflow-x-auto bg-slate-900 p-6 text-sm leading-7 text-slate-100 sm:px-8"><code>{question.answerCode}</code></pre>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold">コードを順番に読み解く</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">見本コードの上から、主な行の役割を説明します。実行はmainメソッドから始まります。</p>
            <ol className="mt-6 space-y-5">
              {explanation.walkthrough.map((step) => (
                <li key={step.line} className="border-l-2 border-blue-200 pl-4">
                  <p className="text-xs font-bold text-blue-700">{step.line}行目</p>
                  <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-100 p-3 text-sm"><code>{step.code}</code></pre>
                  <p className="mt-2 leading-7 text-slate-700">{step.explanation}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold">入力と出力を確認する</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><h3 className="text-sm font-bold text-slate-600">サンプル入力</h3><pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-100 p-4 text-sm"><code>{question.sampleInput || "入力は不要です。"}</code></pre></div>
              <div><h3 className="text-sm font-bold text-slate-600">出力結果</h3><pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-100 p-4 text-sm"><code>{question.expectedOutput || "この問題では何も出力しません。"}</code></pre></div>
            </div>
          </section>

          <nav aria-label="解説を読んだ後の操作" className="flex flex-wrap gap-3 pb-4">
            <Link href="/drill/java/start" className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">問題に戻って続ける</Link>
            {explanation.textbook && <Link href={`/textbook/${explanation.textbook}`} className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-bold hover:bg-slate-50">教科書で詳しく読む</Link>}
          </nav>
        </article>
      </main>
    </AuthGuard>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import AppHeader from "@/components/AppHeader";
import { getTextbook, getTextbooks } from "@/lib/textbooks";

type TextbookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type MarkdownBlock =
  | {
      type: "code";
      language: string;
      content: string;
    }
  | {
      type: "heading";
      level: 1 | 2 | 3;
      content: string;
    }
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "space";
    };

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.split(/\r?\n/);
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const codeFence = line.match(/^```(\S*)\s*$/);

    if (codeFence) {
      const codeLines: string[] = [];
      const language = codeFence[1] ?? "";
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        type: "code",
        language,
        content: codeLines.join("\n"),
      });
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "heading", level: 1, content: line.slice(2) });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, content: line.slice(3) });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, content: line.slice(4) });
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "list", items });
      continue;
    }

    if (line.trim() === "") {
      blocks.push({ type: "space" });
      index += 1;
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !lines[index].startsWith("# ") &&
      !lines[index].startsWith("## ") &&
      !lines[index].startsWith("### ") &&
      !lines[index].startsWith("```") &&
      !/^\s*[-*]\s+/.test(lines[index])
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      content: paragraphLines.join(" "),
    });
  }

  return blocks;
}

function renderInline(content: string) {
  const parts = content.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

function renderBlock(block: MarkdownBlock, index: number) {
  if (block.type === "code") {
    return (
      <figure
        key={index}
        className="my-6 overflow-hidden rounded-lg border border-gray-200 bg-slate-900"
      >
        {block.language && (
          <figcaption className="border-b border-white/10 px-4 py-2 text-xs font-medium uppercase text-slate-300">
            {block.language}
          </figcaption>
        )}
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-100">
          <code>{block.content}</code>
        </pre>
      </figure>
    );
  }

  if (block.type === "heading") {
    const className = {
      1: "mt-10 text-3xl font-bold first:mt-0",
      2: "mt-8 text-2xl font-semibold",
      3: "mt-6 text-xl font-semibold",
    }[block.level];

    const Tag = `h${block.level}` as "h1" | "h2" | "h3";

    return (
      <Tag key={index} className={className}>
        {renderInline(block.content)}
      </Tag>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="my-4 list-disc space-y-2 pl-6 text-gray-700">
        {block.items.map((item, itemIndex) => (
          <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "space") {
    return <div key={index} className="h-3" />;
  }

  return (
    <p key={index} className="leading-8 text-gray-700">
      {renderInline(block.content)}
    </p>
  );
}

export async function generateStaticParams() {
  const textbooks = await getTextbooks();

  return textbooks.map((textbook) => ({
    slug: textbook.slug,
  }));
}

export default async function TextbookPage({ params }: TextbookPageProps) {
  const { slug } = await params;
  const textbook = await getTextbook(slug);

  if (!textbook) {
    notFound();
  }

  const blocks = parseMarkdown(textbook.content);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <AppHeader title={textbook.title} activeKey="textbook" showBack />

        <section className="mx-auto max-w-7xl px-6 py-8">
          <article className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
              <Link
                href="/textbook"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                教科書一覧へ
              </Link>
              <span className="text-sm text-gray-500">{textbook.extension}</span>
            </nav>

            <div className="space-y-2">{blocks.map(renderBlock)}</div>
          </article>
        </section>
      </main>
    </AuthGuard>
  );
}

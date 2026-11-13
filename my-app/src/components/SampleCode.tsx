"use client";

import { useRef, useState } from "react";

export default function SampleCode({ code, title = "見本コード" }: { code: string; title?: string }) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  const copy = async () => {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      // When clipboard access is unavailable, select only the sample for manual copying.
      const selection = window.getSelection();
      if (codeRef.current && selection) {
        codeRef.current.focus();
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus("error");
    }
  };

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-bold">{title}</span>
        <button type="button" onClick={copy} disabled={status === "copying" || !code}
          aria-label={`${title}をコピー`}
          className="rounded-md border border-blue-300 bg-white px-3 py-1 text-sm font-bold text-blue-800 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50">
          {status === "copying" ? "コピー中…" : "コピー"}
        </button>
      </div>
      <p role="status" className="text-sm text-slate-700">
        {status === "copied" && "コピーしました。"}
        {status === "error" && "自動コピーできませんでした。見本を選択して Ctrl+C（Macは⌘C）でコピーしてください。"}
      </p>
      <pre ref={codeRef} tabIndex={0} aria-label={`${title}（縦横にスクロールできます）`}
        className="mt-2 max-h-[60vh] max-w-full overflow-auto whitespace-pre rounded-md bg-white p-3 font-mono text-sm leading-6"><code>{code}</code></pre>
    </div>
  );
}

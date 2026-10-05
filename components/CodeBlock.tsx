"use client";

import { useMemo } from "react";

type Token = { text: string; kind: string };

const TOKEN_RE = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*)`,
    String.raw`(?<string>"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')`,
    String.raw`(?<number>\b\d[\d_]*(?:\.\d+)?\b)`,
    String.raw`(?<keyword>\b(?:import|export|from|const|let|var|function|return|if|else|for|while|try|catch|finally|async|await|new|type|interface|extends|implements|default|as|of|in|throw|typeof|switch|case|break|continue)\b)`,
    String.raw`(?<tag><\/?[A-Za-z][\w.]*|\/>)`,
    String.raw`(?<type>\b[A-Z][\w]*\b)`,
  ].join("|"),
  "g"
);

const KIND_CLASS: Record<string, string> = {
  comment: "text-[#8A7F6E] italic",
  string: "text-[#E8A33D]",
  number: "text-[#E8A33D]",
  keyword: "text-[#7FB69E] font-medium",
  tag: "text-[#A8CDBB] font-medium",
  type: "text-[#D9C9A8]",
  plain: "text-[#EDE6D6]",
};

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN_RE.exec(line)) !== null) {
    if (m.index > last) tokens.push({ text: line.slice(last, m.index), kind: "plain" });
    const groups: Record<string, string | undefined> | undefined = m.groups as
      | Record<string, string | undefined>
      | undefined;
    const kind = groups
      ? Object.keys(groups).find((k) => groups[k] !== undefined) ?? "plain"
      : "plain";
    tokens.push({ text: m[0], kind });
    last = m.index + m[0].length;
    if (m[0].length === 0) TOKEN_RE.lastIndex++;
  }
  if (last < line.length) tokens.push({ text: line.slice(last), kind: "plain" });
  return tokens;
}

export function CodeBlock({ code }: { code: string }) {
  const lines = useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);

  return (
    <pre className="code-scroll overflow-x-auto p-5 text-[13px] leading-6" aria-label="Code sample">
      <code>
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-10 shrink-0 select-none pr-4 text-right font-mono text-[11px] leading-6 text-[#6B5F4C]">
              {i + 1}
            </span>
            <span className="whitespace-pre font-mono">
              {tokenizeLine(line).map((t, j) => (
                <span key={j} className={KIND_CLASS[t.kind] ?? KIND_CLASS.plain}>
                  {t.text}
                </span>
              ))}
              {line === "" ? " " : null}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
}

"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

type CodeBlockProps = {
  code: string;
  label?: string;
};

export function CodeBlock({ code, label = "Terminal" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span>{label}</span>
        <button
          className="code-copy"
          type="button"
          onClick={copyCode}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

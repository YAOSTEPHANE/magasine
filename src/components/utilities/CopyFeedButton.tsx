"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyFeedButtonProps {
  feedUrl: string;
  label?: string;
}

export function CopyFeedButton({ feedUrl, label = "Copy feed URL" }: CopyFeedButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="utility-copy-btn" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="w-4 h-4" aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" aria-hidden />
          {label}
        </>
      )}
    </button>
  );
}

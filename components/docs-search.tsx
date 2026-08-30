"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { docs, docHref } from "@/lib/docs";

export function DocsSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return docs.slice(0, 7);
    return docs
      .map((doc) => {
        const haystack = [
          doc.title,
          doc.summary,
          doc.description,
          ...doc.keywords,
        ].join(" ").toLowerCase();
        const score = doc.title.toLowerCase().includes(needle)
          ? 3
          : doc.keywords.some((keyword) => keyword.toLowerCase().includes(needle))
            ? 2
            : haystack.includes(needle)
              ? 1
              : 0;
        return { doc, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((result) => result.doc);
  }, [query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setActiveIndex(0);
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      setOpen(false);
      router.push(docHref(results[activeIndex].slug));
    }
  }

  return (
    <>
      <button
        className="search-trigger"
        type="button"
        onClick={() => {
          setQuery("");
          setActiveIndex(0);
          setOpen(true);
        }}
      >
        <SearchIcon />
        <span>Search docs</span>
        <kbd>
          <span aria-hidden="true">⌘</span>K
        </kbd>
      </button>

      {open ? (
        <div className="search-layer" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="search-input-wrap">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search the documentation"
                aria-label="Search the documentation"
                aria-controls="search-results"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search">
                <CloseIcon />
              </button>
            </div>
            <div id="search-results" className="search-results" aria-live="polite">
              {results.length ? (
                results.map((doc, index) => (
                  <Link
                    className={index === activeIndex ? "search-result is-active" : "search-result"}
                    href={docHref(doc.slug)}
                    key={doc.slug || "overview"}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setOpen(false)}
                  >
                    <span className="search-result__title">{doc.title}</span>
                    <span className="search-result__summary">{doc.summary}</span>
                  </Link>
                ))
              ) : (
                <p className="search-empty">No page matches “{query}”.</p>
              )}
            </div>
            <div className="search-help">
              <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

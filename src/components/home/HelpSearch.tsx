"use client";
import { useState } from "react";

export type Faq = { q: string; a: string; topic: Topic };
export type Topic = "Buying" | "Training" | "Orders and refunds" | "About Peakform";
const topics: ("All" | Topic)[] = ["All", "Buying", "Training", "Orders and refunds", "About Peakform"];

/** Searchable FAQ: type a question or filter by topic. Questions live in Storefront.tsx. */
export function HelpSearch({ faqs }: { faqs: Faq[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<"All" | Topic>("All");
  const q = query.trim().toLowerCase();
  const results = faqs.filter(
    (f) => (topic === "All" || f.topic === topic) && (!q || `${f.q} ${f.a}`.toLowerCase().includes(q)),
  );

  return (
    <div className="help-search">
      <label className="help-search-field">
        <span>What do you need to know?</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try refund, beginner or rank"
        />
      </label>
      <div className="help-topics" role="group" aria-label="Filter by topic">
        {topics.map((t) => (
          <button key={t} className={`help-topic${t === topic ? " is-active" : ""}`} aria-pressed={t === topic} onClick={() => setTopic(t)}>
            {t}
          </button>
        ))}
      </div>
      <p className="help-count" aria-live="polite">
        {results.length} {results.length === 1 ? "answer" : "answers"}
      </p>
      {results.length ? (
        <div className="help-answers">
          {results.map((f, i) => (
            <details key={f.q} open={i === 0 && (!!q || topic !== "All")}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      ) : (
        <div className="help-empty">
          <p>Nothing matches &ldquo;{query}&rdquo;.</p>
          <a className="text-button" href="#contact">
            Ask us directly ↗
          </a>
        </div>
      )}
    </div>
  );
}

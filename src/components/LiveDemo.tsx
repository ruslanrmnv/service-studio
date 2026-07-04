"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/i18n/config";

type DemoCopy = Dictionary["demo"];

/** Track prefers-reduced-motion without setState-in-effect; SSR returns false. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

/**
 * The site's centerpiece: a request travels, on screen, from an incoming
 * message (form / Telegram / AI) to a written table row and a notification.
 * It plays once when scrolled into view, and replays on tab switch or replay.
 * Under prefers-reduced-motion it renders the finished state with no motion.
 */
export default function LiveDemo({ copy }: { copy: DemoCopy }) {
  const [activeId, setActiveId] = useState(copy.scenarios[0].id);
  const [runId, setRunId] = useState(0);
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const reduce = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const scenario =
    copy.scenarios.find((s) => s.id === activeId) ?? copy.scenarios[0];
  const lineCount = scenario.lines.length;
  const maxStage = lineCount + 3;

  // Kick off the first play when the demo scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Step through the timeline on start, tab switch, or replay. Every stage
  // change is scheduled (never set synchronously in the effect body), so the
  // reset and the reduced-motion jump also go through timers.
  useEffect(() => {
    if (!started) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (reduce) {
      timers.push(setTimeout(() => setStage(maxStage), 0));
      return () => timers.forEach(clearTimeout);
    }
    timers.push(setTimeout(() => setStage(0), 0));
    let at = 350;
    for (let s = 1; s <= maxStage; s++) {
      at += s <= lineCount ? 640 : s === lineCount + 1 ? 780 : 640;
      timers.push(setTimeout(() => setStage(s), at));
    }
    return () => timers.forEach(clearTimeout);
  }, [started, activeId, runId, reduce, lineCount, maxStage]);

  const revealed = Math.min(stage, lineCount);
  const showProcessing = stage === lineCount + 1;
  const showRow = stage >= lineCount + 2;
  const showToast = stage >= lineCount + 3;

  function selectScenario(id: string) {
    setActiveId(id);
    setStarted(true);
    setRunId((n) => n + 1);
  }

  const rowCells = [
    scenario.row.time,
    scenario.row.from,
    scenario.row.request,
    scenario.row.status,
  ];

  return (
    <div ref={rootRef}>
      {/* Controls: scenario tabs + replay */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label={copy.liveLabel}
          className="flex flex-wrap gap-1.5"
        >
          {copy.scenarios.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectScenario(s.id)}
                className={`inline-flex min-h-9 items-center rounded-full border px-4 font-mono text-xs uppercase tracking-[0.08em] transition ${
                  active
                    ? "border-transparent bg-ink text-background"
                    : "border-line text-faint hover:border-line-strong hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => selectScenario(activeId)}
          className="inline-flex min-h-9 items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-faint transition hover:text-ink"
        >
          <span aria-hidden="true" className="text-sm leading-none">
            ↻
          </span>
          {copy.replay}
        </button>
      </div>

      {/* Device */}
      <div className="relative mt-5 overflow-hidden rounded-2xl border border-line bg-surface">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-3">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              showToast ? "bg-accent-bright node-pulse" : "bg-faint"
            }`}
            aria-hidden="true"
          />
          <span className="font-mono text-xs text-muted">{scenario.source}</span>
          <span
            className={`ml-auto font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-opacity motion-reduce:transition-none ${
              showProcessing ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!showProcessing}
          >
            {copy.processing}…
          </span>
        </div>

        {/* Body: incoming (left) → system (right) */}
        <div className="grid min-h-[300px] md:grid-cols-2">
          {/* Incoming */}
          <div className="flex flex-col gap-3 border-b border-line p-5 md:border-b-0 md:border-r">
            {scenario.lines.map((line, i) => {
              const visible = i < revealed;
              const isUser = line.role === "user";
              const isField = line.role === "field";
              return (
                <div
                  key={i}
                  className={`transition-all duration-500 motion-reduce:transition-none ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
                  } ${isField ? "" : isUser ? "flex justify-end" : "flex justify-start"}`}
                >
                  {isField ? (
                    <div className="flex items-baseline gap-3 rounded-lg border border-line bg-surface-soft px-3.5 py-2.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                        {line.label}
                      </span>
                      <span className="text-sm text-ink">{line.text}</span>
                    </div>
                  ) : (
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                        isUser
                          ? "rounded-br-sm border border-accent-line text-ink"
                          : "rounded-bl-sm bg-surface-soft text-muted"
                      }`}
                    >
                      {line.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* System: the table the request lands in */}
          <div className="p-5">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              {copy.tableTitle}
            </p>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  {copy.columns.map((col, i) => (
                    <th
                      key={col}
                      className={`border-b border-line pb-2 font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-faint ${
                        i === 0 ? "hidden sm:table-cell" : ""
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* The written row lands in the top slot, then two empty slots. */}
                <tr
                  className={`transition-all duration-500 motion-reduce:transition-none ${
                    showRow ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {rowCells.map((cell, i) => (
                    <td
                      key={i}
                      className={`border-b border-line py-3 align-top text-sm ${
                        i === 0
                          ? "hidden font-mono text-xs text-faint sm:table-cell"
                          : i === 3
                            ? "text-ink"
                            : "text-muted"
                      } ${i === 0 && showRow ? "border-l-2 border-l-accent-bright pl-2" : ""}`}
                    >
                      {i === 3 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent-bright"
                          />
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
                {[0, 1].map((r) => (
                  <tr key={r}>
                    {copy.columns.map((col, i) => (
                      <td
                        key={col}
                        className={`border-b border-line py-3 ${
                          i === 0 ? "hidden sm:table-cell" : ""
                        }`}
                      >
                        <span className="block h-3.5 w-full rounded bg-line/40" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notification toast */}
        <div
          aria-live="polite"
          className={`pointer-events-none absolute bottom-4 right-4 flex max-w-[80%] items-center gap-2.5 rounded-xl border border-accent-line bg-background/95 px-4 py-3 shadow-lg transition-all duration-500 motion-reduce:transition-none ${
            showToast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-accent-bright"
          />
          <span className="text-sm text-ink">
            {showToast ? scenario.notification : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

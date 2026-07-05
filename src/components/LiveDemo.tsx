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
 * The site's centerpiece. A request travels, on screen, from an incoming
 * message to a written table row and a notification. The form scenario is
 * interactive: the visitor edits the name and presses send to watch their own
 * request land. Chat scenarios auto-play with a typing indicator. Plays once on
 * scroll-into-view; prefers-reduced-motion jumps to the finished state.
 */
export default function LiveDemo({ copy }: { copy: DemoCopy }) {
  const first = copy.scenarios[0];
  const [activeId, setActiveId] = useState(first.id);
  const [runId, setRunId] = useState(0);
  const [started, setStarted] = useState(false);
  const reduce = usePrefersReducedMotion();

  const [revealed, setRevealed] = useState(0);
  const [typingLine, setTypingLine] = useState(-1);
  const [phase, setPhase] = useState<"incoming" | "processing" | "row" | "done">(
    "incoming"
  );
  const [nameValue, setNameValue] = useState(
    first.kind === "form" ? first.lines[0].text : ""
  );
  const [sentName, setSentName] = useState("");
  // The "morph": a clone that flies from the incoming side and lands as the row.
  const [fly, setFly] = useState<{
    text: string;
    x: number;
    y: number;
    landed: boolean;
  } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const revealTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sysTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const flyTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scenario = copy.scenarios.find((s) => s.id === activeId) ?? first;
  const isForm = scenario.kind === "form";
  const lineCount = scenario.lines.length;
  const formDefault = isForm ? scenario.lines[0].text : "";

  function clearReveal() {
    revealTimers.current.forEach(clearTimeout);
    revealTimers.current = [];
  }
  function clearSys() {
    sysTimers.current.forEach(clearTimeout);
    sysTimers.current = [];
  }
  function clearFlyTimers() {
    flyTimers.current.forEach(clearTimeout);
    flyTimers.current = [];
  }
  // Only safe to call outside an effect body (it sets state synchronously).
  function clearFly() {
    clearFlyTimers();
    setFly(null);
  }

  // Morph: measure incoming panel + target row, then animate a clone between
  // them. The clone shrinks and fades as it lands, and the real row reveals
  // underneath — so the message visibly *becomes* the row.
  function startFly(name: string) {
    const dev = deviceRef.current;
    const src = incomingRef.current;
    const row = rowRef.current;
    if (reduce || !dev || !src || !row) return;
    const d = dev.getBoundingClientRect();
    const s = src.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    setFly({
      text: name,
      x: s.left - d.left + 24,
      y: s.top - d.top + Math.min(s.height * 0.42, 96),
      landed: false,
    });
    const endX = r.left - d.left + 2;
    const endY = r.top - d.top + 2;
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setFly((f) => (f ? { ...f, x: endX, y: endY, landed: true } : f))
      )
    );
    flyTimers.current.push(setTimeout(() => setFly(null), 760));
  }

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

  // System phase: processing → row → notification, with a chosen name. The
  // clone flies during "processing" and lands exactly as the row reveals.
  function runSystem(name: string) {
    clearSys();
    clearFly();
    setSentName(name);
    setPhase("processing");
    startFly(name);
    sysTimers.current.push(
      setTimeout(() => setPhase("row"), 760),
      setTimeout(() => setPhase("done"), 760 + 640)
    );
  }

  // Reveal incoming lines, then hand off to the system phase.
  useEffect(() => {
    if (!started) return;
    clearReveal();
    clearSys();
    clearFlyTimers();

    if (reduce) {
      revealTimers.current.push(
        setTimeout(() => {
          setRevealed(lineCount);
          setTypingLine(-1);
          setFly(null);
          if (isForm) {
            setNameValue(formDefault);
            setSentName(formDefault);
          }
          setPhase("done");
        }, 0)
      );
      return () => {
        clearReveal();
        clearSys();
        clearFlyTimers();
      };
    }

    revealTimers.current.push(
      setTimeout(() => {
        setRevealed(0);
        setTypingLine(-1);
        setFly(null);
        setPhase("incoming");
        if (isForm) {
          setNameValue(formDefault);
          setSentName("");
        }
      }, 0)
    );

    let at = 350;
    for (let i = 0; i < lineCount; i++) {
      const idx = i;
      if (scenario.lines[i].role === "bot") {
        revealTimers.current.push(setTimeout(() => setTypingLine(idx), at));
        at += 520;
        revealTimers.current.push(
          setTimeout(() => {
            setTypingLine(-1);
            setRevealed(idx + 1);
          }, at)
        );
        at += 360;
      } else {
        revealTimers.current.push(
          setTimeout(() => {
            setTypingLine(-1);
            setRevealed(idx + 1);
          }, at)
        );
        at += isForm ? 300 : 520;
      }
    }

    revealTimers.current.push(
      setTimeout(() => runSystem(isForm ? formDefault : scenario.row.from), at + 150)
    );

    return () => {
      clearReveal();
      clearSys();
      clearFlyTimers();
    };
    // scenario/lineCount/isForm/formDefault all derive from activeId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, activeId, runId, reduce]);

  const showProcessing = phase === "processing";
  const showRow = phase === "row" || phase === "done";
  const showToast = phase === "done";
  const revealDone = revealed >= lineCount;

  const displayName = isForm ? sentName || formDefault : scenario.row.from;
  const rowCells = [
    scenario.row.time,
    displayName,
    scenario.row.request,
    scenario.row.status,
  ];
  const toastText = isForm
    ? `${copy.newRequest}: ${displayName}`
    : scenario.notification;

  function selectScenario(id: string) {
    setActiveId(id);
    setStarted(true);
    setRunId((n) => n + 1);
  }

  return (
    <div ref={rootRef}>
      {/* Controls: scenario tabs + replay */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={copy.liveLabel} className="flex flex-wrap gap-1.5">
          {copy.scenarios.map((s) => {
            const active = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectScenario(s.id)}
                className={`inline-flex min-h-9 items-center rounded-full border px-4 text-sm transition ${
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
          className="inline-flex min-h-9 items-center gap-2 text-sm text-faint transition hover:text-ink"
        >
          <span aria-hidden="true" className="text-sm leading-none">
            ↻
          </span>
          {copy.replay}
        </button>
      </div>

      {/* Device */}
      <div
        ref={deviceRef}
        className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-surface-2"
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-5 py-3.5">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              showToast ? "bg-accent node-pulse" : "bg-faint"
            }`}
            aria-hidden="true"
          />
          <span className="text-sm text-muted">{scenario.source}</span>
          <span
            className={`ml-auto text-xs text-accent transition-opacity motion-reduce:transition-none ${
              showProcessing ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!showProcessing}
          >
            {copy.processing}…
          </span>
        </div>

        {/* Body: incoming (left) → system (right) */}
        <div className="grid gap-3 p-3 md:grid-cols-2">
          {/* Incoming */}
          <div
            ref={incomingRef}
            className="flex min-h-[260px] flex-col gap-3 rounded-xl bg-background p-5"
          >
            {isForm
              ? scenario.lines.map((line, i) => {
                  const shown = i < revealed;
                  return (
                    <div
                      key={i}
                      className={`transition-all duration-500 motion-reduce:transition-none ${
                        shown
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-1.5 opacity-0"
                      }`}
                    >
                      <div className="flex items-baseline gap-3 rounded-lg bg-surface-2 px-3.5 py-2.5">
                        <span className="w-16 shrink-0 text-[13px] text-faint">
                          {line.label}
                        </span>
                        {i === 0 ? (
                          <input
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                            maxLength={24}
                            aria-label={line.label}
                            className="w-full bg-transparent text-sm text-ink caret-accent outline-none"
                          />
                        ) : (
                          <span className="text-sm text-ink">{line.text}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              : scenario.lines.map((line, i) => {
                  if (i >= revealed) return null;
                  const isUser = line.role === "user";
                  return (
                    <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                          isUser
                            ? "rounded-br-sm bg-accent-soft text-ink"
                            : "rounded-bl-sm bg-surface-3 text-muted"
                        }`}
                      >
                        {line.text}
                      </div>
                    </div>
                  );
                })}

            {/* Chat typing indicator */}
            {!isForm && typingLine >= 0 && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-surface-3 px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot h-1.5 w-1.5 rounded-full bg-faint"
                      style={{ animationDelay: `${d * 160}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Form: try-it controls */}
            {isForm && (
              <div
                className={`mt-auto flex flex-col gap-3 pt-2 transition-opacity duration-500 motion-reduce:transition-none ${
                  revealDone ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <p className="text-xs leading-relaxed text-faint">{copy.tryHint}</p>
                <button
                  type="button"
                  onClick={() => runSystem(nameValue.trim() || formDefault)}
                  className="inline-flex min-h-10 w-fit items-center rounded-full bg-accent px-5 text-sm font-medium text-background transition hover:brightness-110"
                >
                  {copy.sendLabel}
                </button>
              </div>
            )}
          </div>

          {/* System: the table the request lands in */}
          <div className="rounded-xl bg-background p-5">
            <p className="mb-4 text-sm text-faint">{copy.tableTitle}</p>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  {copy.columns.map((col, i) => (
                    <th
                      key={col}
                      className={`pb-3 text-xs font-normal text-faint ${
                        i === 0 ? "hidden sm:table-cell" : ""
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr
                  ref={rowRef}
                  className={`transition-opacity duration-500 motion-reduce:transition-none ${
                    showRow ? "row-sweep opacity-100" : "opacity-0"
                  }`}
                >
                  {rowCells.map((cell, i) => (
                    <td
                      key={i}
                      className={`py-2.5 align-top text-sm ${
                        i === 0
                          ? "hidden text-xs text-faint sm:table-cell"
                          : i === 3
                            ? "text-ink"
                            : "text-muted"
                      }`}
                    >
                      {i === 1 ? (
                        <span
                          className={showRow ? "border-l-2 border-l-accent pl-2" : "pl-2"}
                        >
                          {cell}
                        </span>
                      ) : i === 3 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent"
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
                        className={`py-2.5 ${i === 0 ? "hidden sm:table-cell" : ""}`}
                      >
                        <span className="block h-3.5 w-full rounded bg-surface-3" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Morph — the message flies from the incoming side and lands as the row */}
        {fly && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 whitespace-nowrap rounded-full border border-accent-line bg-accent-soft px-3 py-1.5 text-sm text-ink shadow-lg"
            style={{
              left: fly.x,
              top: fly.y,
              transition: fly.landed
                ? "left 0.62s cubic-bezier(0.5,0,0.2,1), top 0.62s cubic-bezier(0.5,0,0.2,1), opacity 0.5s ease 0.15s, transform 0.62s cubic-bezier(0.5,0,0.2,1)"
                : "none",
              transform: fly.landed ? "scale(0.82)" : "scale(1)",
              opacity: fly.landed ? 0 : 1,
            }}
          >
            {fly.text}
          </div>
        )}

        {/* Notification toast */}
        <div
          aria-live="polite"
          className={`pointer-events-none absolute bottom-5 right-5 flex max-w-[80%] items-center gap-2.5 rounded-xl border border-accent-line bg-surface-3 px-4 py-3 shadow-xl transition-all duration-500 motion-reduce:transition-none ${
            showToast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span className="text-sm text-ink">{showToast ? toastText : ""}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/config";

/**
 * Value clarifier: the visitor picks a business task and immediately sees what
 * I'd build and the result. Deliberately broad and extensible — the task list
 * is data, so the offering can grow without touching this component.
 *
 * The picker is a column beside the answer on desktop and a wrapping row above
 * it on phones. The heading lives in the page, so it matches every other
 * section header.
 */
export default function TaskExplorer({ copy }: { copy: Dictionary["explorer"] }) {
  const [activeId, setActiveId] = useState(copy.tasks[0].id);
  const task = copy.tasks.find((t) => t.id === activeId) ?? copy.tasks[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-10">
      <div
        role="group"
        aria-label={copy.prompt}
        className="flex flex-wrap gap-2 lg:flex-col"
      >
        {copy.tasks.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveId(t.id)}
              className={`min-h-11 rounded-full border px-5 text-left text-sm transition ${
                active
                  ? "border-transparent bg-ink text-background"
                  : "border-line text-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* The card stretches to the picker's height so switching tasks never
          shifts the page. Short answers then leave a lot of air, so the content
          sits centred in it rather than stranded at the top. */}
      <div
        key={task.id}
        className="explorer-card flex flex-col justify-center rounded-2xl border border-line bg-surface-2 p-6 sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <div>
            <p className="mb-2 text-xs text-faint">{copy.buildLabel}</p>
            <p className="text-[15px] leading-relaxed text-ink">{task.build}</p>
          </div>
          <div className="sm:border-l sm:border-line sm:pl-8">
            <p className="mb-2 text-xs text-faint">{copy.resultLabel}</p>
            <p className="text-[15px] font-medium leading-relaxed text-accent">
              {task.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

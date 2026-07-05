"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/config";

/**
 * Hero value clarifier: the visitor picks a business task and immediately sees
 * what I'd build and the result. Deliberately broad and extensible — the task
 * list is data, so the offering can grow without touching this component.
 */
export default function TaskExplorer({ copy }: { copy: Dictionary["explorer"] }) {
  const [activeId, setActiveId] = useState(copy.tasks[0].id);
  const task = copy.tasks.find((t) => t.id === activeId) ?? copy.tasks[0];

  return (
    <div>
      <p className="mb-4 text-center text-sm text-faint">{copy.prompt}</p>
      <div
        role="group"
        aria-label={copy.prompt}
        className="flex flex-wrap justify-center gap-2"
      >
        {copy.tasks.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveId(t.id)}
              className={`min-h-10 rounded-full border px-4 text-sm transition ${
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

      <div
        key={task.id}
        className="explorer-card mx-auto mt-5 max-w-2xl rounded-2xl border border-line bg-surface p-6 text-left sm:p-7"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs text-faint">{copy.buildLabel}</p>
            <p className="text-[15px] leading-relaxed text-ink">{task.build}</p>
          </div>
          <div className="sm:border-l sm:border-line sm:pl-6">
            <p className="mb-1.5 text-xs text-faint">{copy.resultLabel}</p>
            <p className="text-[15px] font-medium leading-relaxed text-accent">
              {task.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Fragment, useId, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/config";

type WorkflowTabsCopy = Dictionary["workflow"]["tabs"];

export default function WorkflowTabs({
  tabs,
  ariaLabel,
}: {
  tabs: WorkflowTabsCopy;
  ariaLabel: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const steps = tabs[active]?.steps ?? [];

  function selectTab(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const count = tabs.length;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (active + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (active - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectTab(next);
  }

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.label}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              tabIndex={selected ? 0 : -1}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => setActive(index)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "border-accent-line bg-accent-soft text-accent"
                  : "border-line bg-surface-soft text-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-8 flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-1"
      >
        {steps.map((step, index) => (
          <Fragment key={index}>
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-line bg-surface/40 px-4 py-3 lg:flex-col lg:items-start lg:gap-2 lg:px-5 lg:py-5">
              <span className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-snug text-ink/90">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center text-faint lg:px-1"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="rotate-90 lg:rotate-0"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

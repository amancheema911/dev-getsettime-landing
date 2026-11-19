"use client";

import { useState } from "react";
import type { FeatureFaq } from "./feature-data";

export default function FeatureFaqs({
  groupId,
  items,
}: {
  groupId: string;
  items: FeatureFaq[];
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${groupId}-trigger-${index}`;
        const panelId = `${groupId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className={`group overflow-hidden rounded-xl border transition-[border-color,background-color,box-shadow,transform] duration-300 ${
              isOpen
                ? "border-indigo-200/90 bg-white drop-shadow-[0_16px_60px_rgba(109,40,217,0.14)]"
                : "border-slate-200/80 bg-white/80 drop-shadow-[0_10px_35px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-indigo-200 hover:drop-shadow-[0_18px_50px_rgba(99,102,241,0.10)]"
            }`}
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex min-h-[3.25rem] w-full cursor-pointer items-center gap-3 p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 sm:min-h-[4.75rem] sm:p-5"
            >
              <span
                className={`mt-0.5 hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border sm:flex ${
                  isOpen
                    ? "border-indigo-200 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white drop-shadow-lg"
                    : "border-slate-200 bg-slate-50 text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-700"
                }`}
                aria-hidden
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold text-neutral-900 sm:text-base">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xl sm:h-10 sm:w-10 ${
                  isOpen
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-500 group-hover:border-indigo-200 group-hover:text-indigo-700"
                }`}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-3 pb-3 sm:px-5 sm:pb-5"
            >
              <p className="max-w-3xl text-neutral-600">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { APP_NAME } from "@/lib/config";

const EMBED_SRC =
  "https://scribehow.com/embed/How_To_Set_Up_And_Test_Appointment_Booking_On_GetSetTime__coqN7VU6TiOqCh0iMI0-pw?as=video&autoplay=true";

export default function DemoVideoButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-gray-800 drop-shadow-lg transition"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200">
          <svg className="translate-x-px" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        Watch 2-minute Demo
      </button>
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-950/60"
            aria-label="Close demo video"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <h2 id={titleId} className="text-sm font-semibold text-white">2-minute demo</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
                autoFocus
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <iframe
              src={EMBED_SRC}
              title={`${APP_NAME} appointment booking demo`}
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              className="aspect-video w-full bg-black"
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

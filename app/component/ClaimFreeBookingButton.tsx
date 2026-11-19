"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { useDialogBehavior } from "./useDialogBehavior";

type ClaimFreeBookingButtonProps = {
  className?: string;
  children: React.ReactNode;
};

type ClaimFreeLinkResponse = {
  available?: boolean;
  redirectUrl?: string;
  error?: string;
};

function Spinner({ className }: { className: string }) {
  return (
    <>
      <style>{`@keyframes claim-free-spin { to { transform: rotate(360deg); } }`}</style>
      <svg
        className={className}
        style={{ animation: "claim-free-spin 0.7s linear infinite" }}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z" />
      </svg>
    </>
  );
}

export default function ClaimFreeBookingButton({
  className,
  children,
}: ClaimFreeBookingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [spotsFull, setSpotsFull] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogOpen = Boolean(error) && !loading;

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeDialog = useCallback(() => {
    setError("");
    setSpotsFull(false);
  }, []);

  useDialogBehavior(dialogOpen, closeDialog, dialogRef);

  async function handleClick() {
    if (loading) return;
    closeDialog();

    flushSync(() => setLoading(true));

    try {
      const res = await fetch("/api/claim-free", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await res.json().catch(() => ({}))) as ClaimFreeLinkResponse;

      if (!res.ok || !data.redirectUrl) {
        const full = data.available === false;
        setSpotsFull(full);
        setError(
          full
            ? data.error || "Free booking spots are full right now."
            : data.error || "Could not open your free booking page. Please try again."
        );
        return;
      }

      window.open(data.redirectUrl, "_blank", "noopener,noreferrer");
    } catch {
      setSpotsFull(false);
      setError("Could not open your free booking page. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const dialog =
    error && mounted && !loading
      ? createPortal(
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            <button
              type="button"
              className="absolute inset-0 bg-neutral-950/50"
              aria-label="Close"
              onClick={closeDialog}
            />
            <div
              ref={dialogRef}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              tabIndex={-1}
              className="relative flex max-h-[min(90dvh,calc(100dvh-2rem))] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <button
                type="button"
                onClick={closeDialog}
                className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800"
                aria-label="Close"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>

              <div className="overflow-y-auto overscroll-contain p-6 sm:p-7">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                  spotsFull ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                }`}
              >
                {spotsFull ? (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5" strokeLinecap="round" />
                    <path d="M12 16h.01" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M15 9 9 15M9 9l6 6" strokeLinecap="round" />
                  </svg>
                )}
              </div>

              <h2 id={titleId} className="pr-8 text-xl font-bold text-neutral-900">
                {spotsFull ? "Free spots are full" : "Couldn't start your claim"}
              </h2>
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-neutral-600">
                {error}
              </p>
              {spotsFull ? (
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  We are only setting up the first 100 booking pages. Please check back later.
                </p>
              ) : null}

              <button
                type="button"
                onClick={closeDialog}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                OK
              </button>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
        className={`${className ?? ""} disabled:cursor-wait`}
      >
        {loading ? <Spinner className="h-4 w-4 shrink-0" /> : null}
        {children}
      </button>
      {dialog}
    </>
  );
}

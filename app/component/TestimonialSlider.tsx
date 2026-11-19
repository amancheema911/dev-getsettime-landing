"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export interface TestimonialItem {
  id: number | string;
  name: string;
  role: string;
  text?: string;
  review?: string;
  initials?: string;
  avatar?: string;
}

interface TestimonialSliderProps {
  badgeLabel: string;
  title: string;
  description: string;
  testimonials: TestimonialItem[];
  autoRotateMs?: number;
}

type CardsPerView = 1 | 2 | 3;

const TRACKS: { size: CardsPerView; className: string }[] = [
  { size: 1, className: "sm:hidden" },
  { size: 2, className: "hidden sm:block lg:hidden" },
  { size: 3, className: "hidden lg:block" },
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "NA";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

function chunkItems(items: TestimonialItem[], size: number) {
  const pages: TestimonialItem[][] = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages;
}

function readCardsPerView(): CardsPerView {
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const review = item.text ?? item.review ?? "";
  const initials = item.initials ?? getInitials(item.name);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl bg-white p-6 shadow-lg">
      <span className="leading-none text-indigo-200" aria-hidden>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.2 6.4c1.7.4 2.8 1.7 2.8 3.6 0 1.2-.5 2.1-1.3 2.8.8.2 1.5.8 1.9 1.7.4.9.5 1.9.2 3.1-.3 1.1-1 1.9-2.1 2.3-1 .4-2.1.2-3-.5-1-.8-1.5-2-1.5-3.6 0-2.3.7-4.2 2.1-5.7.7-.7 1.4-1.2 2.1-1.5l-.2-.2zm9 0c1.7.4 2.8 1.7 2.8 3.6 0 1.2-.5 2.1-1.3 2.8.8.2 1.5.8 1.9 1.7.4.9.5 1.9.2 3.1-.3 1.1-1 1.9-2.1 2.3-1 .4-2.1.2-3-.5-1-.8-1.5-2-1.5-3.6 0-2.3.7-4.2 2.1-5.7.7-.7 1.4-1.2 2.1-1.5l-.2-.2z" />
        </svg>
      </span>
      <p className="mt-3 flex-1 text-neutral-600">{review}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="min-w-0 text-left">
          <p className="font-bold text-neutral-900">{item.name}</p>
          <p className="text-sm text-neutral-500">{item.role}</p>
        </div>
      </div>
    </article>
  );
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {direction === "prev" ? <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" /> : <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export const TestimonialSlider = ({
  badgeLabel,
  title,
  description,
  testimonials,
  autoRotateMs,
}: TestimonialSliderProps) => {
  const items = useMemo(() => (Array.isArray(testimonials) ? testimonials : []), [testimonials]);
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState<CardsPerView | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const tablet = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(readCardsPerView());
    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  const pageCount = perView ? Math.ceil(items.length / perView) : 1;
  const activePage = Math.min(page, Math.max(pageCount - 1, 0));

  useEffect(() => {
    if (page !== activePage) setPage(activePage);
  }, [page, activePage]);

  useEffect(() => {
    if (!autoRotateMs || perView == null || activePage >= pageCount - 1) return;
    const timer = window.setTimeout(() => setPage((current) => current + 1), autoRotateMs);
    return () => window.clearTimeout(timer);
  }, [autoRotateMs, perView, activePage, pageCount]);

  if (items.length === 0) return null;

  const goToPage = (direction: -1 | 1) => {
    const size = readCardsPerView();
    const count = Math.ceil(items.length / size);
    setPage((current) => Math.min(Math.max(current + direction, 0), count - 1));
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.15),_transparent_30%),linear-gradient(180deg,#f8faff_0%,#eef2ff_100%)] py-12 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 drop-shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            {badgeLabel}
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl">{title}</h2>
          <p>{description}</p>
        </div>

        <div
          className="mt-8"
          onTouchStart={(event) => {
            event.currentTarget.dataset.startX = String(event.touches[0]?.clientX ?? 0);
          }}
          onTouchEnd={(event) => {
            const startX = Number(event.currentTarget.dataset.startX ?? 0);
            const endX = event.changedTouches[0]?.clientX ?? startX;
            const delta = endX - startX;
            if (delta > 48) goToPage(-1);
            if (delta < -48) goToPage(1);
          }}
        >
          {TRACKS.map((track) => {
            const pages = chunkItems(items, track.size);
            const trackPage = Math.min(activePage, pages.length - 1);
            return (
              <div key={track.size} className={`overflow-hidden ${track.className}`}>
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${trackPage * 100}%)` }}
                >
                  {pages.map((group, index) => (
                    <div
                      key={group.map((item) => item.id).join("-")}
                      className={`grid w-full shrink-0 gap-4 ${track.size === 1 ? "grid-cols-1" : track.size === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                      aria-hidden={index !== trackPage}
                    >
                      {group.map((item) => (
                        <TestimonialCard key={item.id} item={item} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {perView != null && pageCount > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goToPage(-1)}
              disabled={activePage === 0}
              className="inline-flex text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous testimonials"
            >
              <ArrowIcon direction="prev" />
            </button>
            <p className="min-w-12 text-center text-sm text-neutral-500">
              {activePage + 1} / {pageCount}
            </p>
            <button
              type="button"
              onClick={() => goToPage(1)}
              disabled={activePage >= pageCount - 1}
              className="inline-flex text-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next testimonials"
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

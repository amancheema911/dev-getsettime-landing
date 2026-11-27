"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MeetingType = "one-time" | "one-to-one" | "group-class" | "recurring";

type MeetingPreset = {
  label: string;
  audience: string;
  detail: string;
  duration: string;
  location: string;
  rule: string;
  badge?: string;
  icon: MeetingType;
  card: string;
  activeCard: string;
  iconStyle: string;
  titleStyle: string;
  accent: string;
  backdrop: string;
  check: string;
};

const meetingPresets: Record<MeetingType, MeetingPreset> = {
  "one-time": {
    label: "One Time",
    audience: "Single appointment",
    detail: "Consultations, demos, and individual visits",
    duration: "30 min",
    location: "Google Meet",
    rule: "10m buffer",
    badge: "Popular",
    icon: "one-time",
    card: "border-slate-200/80 bg-emerald-50/30 hover:border-emerald-200 hover:bg-emerald-50/65",
    activeCard: "border-emerald-200 bg-emerald-50/80 ring-2 ring-emerald-500/25 shadow-sm",
    iconStyle: "bg-emerald-100 text-emerald-700 ring-emerald-600/15",
    titleStyle: "text-emerald-800",
    accent: "from-emerald-400 via-teal-500 to-emerald-500",
    backdrop: "from-emerald-100/75 via-violet-50/70 to-amber-100/70",
    check: "bg-emerald-600",
  },
  "one-to-one": {
    label: "One-to-One",
    audience: "1 provider → 1 client",
    detail: "Coaching, treatments, and personal sessions",
    duration: "45 min",
    location: "Zoom",
    rule: "Private session",
    icon: "one-to-one",
    card: "border-slate-200/80 bg-blue-50/40 hover:border-blue-200 hover:bg-blue-50/75",
    activeCard: "border-blue-200 bg-blue-50/85 ring-2 ring-blue-500/25 shadow-sm",
    iconStyle: "bg-blue-100 text-blue-700 ring-blue-600/15",
    titleStyle: "text-blue-700",
    accent: "from-blue-400 via-indigo-500 to-blue-600",
    backdrop: "from-blue-100/80 via-indigo-50/70 to-sky-100/75",
    check: "bg-blue-600",
  },
  "group-class": {
    label: "Group / Class",
    audience: "1 provider → Multiple clients",
    detail: "Classes, workshops, webinars, and group sessions",
    duration: "60 min",
    location: "Webinar Live",
    rule: "Up to 50 seats",
    icon: "group-class",
    card: "border-slate-200/80 bg-fuchsia-50/40 hover:border-fuchsia-200 hover:bg-fuchsia-50/75",
    activeCard: "border-fuchsia-200 bg-fuchsia-50/85 ring-2 ring-fuchsia-500/25 shadow-sm",
    iconStyle: "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-600/15",
    titleStyle: "text-fuchsia-700",
    accent: "from-fuchsia-400 via-purple-500 to-fuchsia-600",
    backdrop: "from-fuchsia-100/80 via-purple-50/70 to-pink-100/75",
    check: "bg-fuchsia-600",
  },
  recurring: {
    label: "Recurring",
    audience: "Repeating appointments",
    detail: "Weekly lessons, care plans, and regular sessions",
    duration: "45 min",
    location: "In person",
    rule: "Every week",
    icon: "recurring",
    card: "border-slate-200/80 bg-violet-50/40 hover:border-violet-200 hover:bg-violet-50/75",
    activeCard: "border-violet-200 bg-violet-50/85 ring-2 ring-violet-500/25 shadow-sm",
    iconStyle: "bg-violet-100 text-violet-700 ring-violet-600/15",
    titleStyle: "text-violet-700",
    accent: "from-violet-500 via-indigo-500 to-purple-600",
    backdrop: "from-violet-100/85 via-indigo-50/70 to-amber-100/75",
    check: "bg-violet-600",
  },
};

const meetingOrder = Object.keys(meetingPresets) as MeetingType[];

function Icon({
  name,
  className = "h-4 w-4",
}: {
  name: MeetingType | "arrow" | "calendar" | "check" | "clock" | "video" | "shield";
  className?: string;
}) {
  const paths: Record<typeof name, ReactNode> = {
    "one-time": (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18M12 14v4M10 16h4" />
      </>
    ),
    "one-to-one": (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M3 20c.5-3.5 2.2-5 5-5s4.5 1.5 5 5M11 20c.5-3.5 2.2-5 5-5s4.5 1.5 5 5" />
      </>
    ),
    "group-class": (
      <>
        <path d="M18 21a8 8 0 0 0-16 0" />
        <circle cx="10" cy="8" r="5" />
        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
      </>
    ),
    recurring: (
      <>
        <path d="M21 12a9 9 0 0 0-15.74-6.26L3 8M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 15.74 6.26L21 16M16 16h5v5" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </>
    ),
    check: <path d="m5 12 5 5L20 7" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    video: (
      <>
        <path d="m16 10 5-3v10l-5-3" />
        <rect x="3" y="5" width="13" height="14" rx="2" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
    >
      {paths[name]}
    </svg>
  );
}

export default function Eventtype() {
  const [selected, setSelected] = useState<MeetingType>("one-time");
  const showcaseRef = useRef<HTMLDivElement>(null);
  const preset = meetingPresets[selected];

  function selectMeetingType(type: MeetingType, scroll = false) {
    setSelected(type);
    const next = meetingPresets[type];
    if (scroll) showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <section id="event-types" className="relative overflow-hidden bg-white py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" aria-hidden />

      <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="w-full lg:col-span-6">
            <div
              ref={showcaseRef}
              className={`relative rounded-[2rem] bg-gradient-to-br ${preset.backdrop} p-5 ring-1 ring-slate-900/[0.04] transition-colors duration-500 sm:p-8 lg:p-10`}
            >
              <div className="pointer-events-none absolute -top-6 -left-6 h-36 w-36 rounded-full bg-violet-300/30 blur-2xl" aria-hidden />
              <div className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-36 rounded-full bg-amber-200/40 blur-2xl" aria-hidden />

              <div className="relative overflow-hidden rounded-2xl bg-white/95 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.09),0_4px_16px_-2px_rgba(15,23,42,0.04),0_0_0_1px_rgba(15,23,42,0.05)] backdrop-blur-md">
                <div className={`h-1.5 w-full bg-gradient-to-r ${preset.accent} transition-all duration-300`} />

                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
                  <div className="hidden items-center gap-2 sm:flex" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  </div>
                  <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">Select meeting type</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Interactive
                  </span>
                </div>

                <div className="space-y-3 p-4 sm:p-6" role="listbox" aria-label="Meeting types">
                  {meetingOrder.map((type) => {
                    const item = meetingPresets[type];
                    const active = type === selected;

                    return (
                      <button
                        key={type}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => selectMeetingType(type)}
                        className={`group relative flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:p-4 ${
                          active ? item.activeCard : item.card
                        }`}
                      >
                        <span className="flex min-w-0 items-start gap-3.5">
                          <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${item.iconStyle}`}>
                            <Icon name={item.icon} />
                          </span>
                          <span className="min-w-0">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className={`text-sm font-bold ${item.titleStyle}`}>{item.label}</span>
                              {item.badge ? (
                                <span className="rounded-md bg-emerald-100/90 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-700 uppercase">
                                  {item.badge}
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 block text-xs font-medium text-slate-700 sm:text-[13px]">{item.audience}</span>
                            <span className="mt-0.5 block truncate text-[11px] text-slate-500">{item.detail}</span>
                          </span>
                        </span>
                        <span
                          className={`ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all ${
                            active ? `${item.check} text-white` : "border border-slate-300 bg-white text-transparent"
                          }`}
                        >
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 bg-slate-50/90 px-4 py-3.5 sm:px-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-slate-500">Live preset:</span>
                    <div key={selected} className="animate-fade-in flex flex-wrap items-center gap-2">
                      <MetaPill icon={<Icon name="clock" className="h-3.5 w-3.5 text-slate-400" />} value={preset.duration} />
                      <MetaPill icon={<Icon name="video" className="h-3.5 w-3.5 text-emerald-500" />} value={preset.location} />
                      <MetaPill icon={<Icon name="shield" className="h-3.5 w-3.5 text-indigo-500" />} value={preset.rule} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2.5 rounded-xl bg-indigo-50/90 px-3.5 py-2 text-indigo-600 ring-1 ring-indigo-600/15">
                <Icon name="calendar" />
                <span className="text-xs font-semibold tracking-wider text-indigo-700 uppercase">Scheduling flexibility</span>
              </div>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Event types &amp; meeting options
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Set what people can book, for how long, and where. Offer single appointments, personal sessions, group classes, or a recurring series.
              </p>

              <ul className="mt-7 space-y-3.5 border-t border-slate-100 pt-6">
                <FeaturePoint title="Custom durations & buffers">Prevent back-to-back fatigue with smart pre- and post-meeting padding.</FeaturePoint>
                <FeaturePoint title="Multi-location support">Generate Zoom, Google Meet, or Microsoft Teams links, or use a physical address.</FeaturePoint>
                <FeaturePoint title="Flexible booking formats">Choose one time, one-to-one, group/class, or recurring for each service.</FeaturePoint>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaPill({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/80">
      {icon}
      {value}
    </span>
  );
}

function FeaturePoint({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        <Icon name="check" className="h-3.5 w-3.5" />
      </span>
      <span className="text-sm text-slate-700 sm:text-[15px]">
        <strong className="font-semibold text-slate-900">{title}:</strong> {children}
      </span>
    </li>
  );
}

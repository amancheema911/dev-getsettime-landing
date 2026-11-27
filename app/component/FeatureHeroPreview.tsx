"use client";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
type PreviewIcon =
  | "calendar-check"
  | "arrow-right"
  | "sparkles"
  | "check-circle"
  | "star"
  | "pointer"
  | "calendar"
  | "plus"
  | "card"
  | "chevron-right"
  | "chevron-left"
  | "briefcase"
  | "video"
  | "x"
  | "calendar-plus";

type CalendarView = "Today" | "Week" | "Month";

type Toast = {
  id: number;
  message: string;
};

type CalendarEvent = {
  time: string;
  label: string;
  box: string;
  title: string;
  detail: string;
};

type CalendarDay = {
  day: string;
  weekday: string;
  mobile?: boolean;
  open?: boolean;
  booked?: boolean;
  events: CalendarEvent[];
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: false as const,
};

function Icon({ name, className }: { name: PreviewIcon; className?: string }) {
  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden focusable={false}>
        <path fill="currentColor" d="M12 2.4 14.7 8.9l7 .6-5.3 4.5 1.6 6.8L12 17.4 6 20.8l1.6-6.8L2.3 9.5l7-.6L12 2.4Z" />
      </svg>
    );
  }

  let body: ReactNode = null;
  switch (name) {
    case "calendar-check":
      body = (
        <>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="m9 16 2 2 4-4" />
        </>
      );
      break;
    case "arrow-right":
      body = (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      );
      break;
    case "sparkles":
      body = (
        <>
          <path d="M9.9 15.5A2 2 0 0 0 8.5 14.1L2.4 12.5a.5.5 0 0 1 0-1L8.5 9.9A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
        </>
      );
      break;
    case "check-circle":
      body = (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </>
      );
      break;
    case "pointer":
      body = (
        <>
          <path d="M14 4.1 12 6" />
          <path d="m5.1 8-2.9-.8" />
          <path d="m6 12-1.9 2" />
          <path d="M7 2 8.5 5" />
          <path d="M9.5 7.5 4 21l7-4 2 6 2-8 6-2-6-2 2-6z" />
        </>
      );
      break;
    case "calendar":
      body = (
        <>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </>
      );
      break;
    case "plus":
      body = (
        <>
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </>
      );
      break;
    case "card":
      body = (
        <>
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </>
      );
      break;
    case "chevron-right":
      body = <path d="m9 18 6-6-6-6" />;
      break;
    case "chevron-left":
      body = <path d="m15 18-6-6 6-6" />;
      break;
    case "briefcase":
      body = (
        <>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </>
      );
      break;
    case "video":
      body = (
        <>
          <path d="m16 13 5.2 3.1a.5.5 0 0 0 .8-.4V8.3a.5.5 0 0 0-.8-.4L16 11" />
          <rect width="14" height="12" x="2" y="6" rx="2" />
        </>
      );
      break;
    case "x":
      body = (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      );
      break;
    case "calendar-plus":
      body = (
        <>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
          <path d="M12 14v6" />
          <path d="M9 17h6" />
        </>
      );
      break;
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }

  return (
    <svg {...iconProps} className={className}>
      {body}
    </svg>
  );
}

const timeSlots = ["09:00 am", "09:30 am", "10:30 am", "11:00 am"];
const quickDates = [
  { day: "14", weekday: "Mon" },
  { day: "15", weekday: "Tue" },
  { day: "16", weekday: "Wed" },
];
const calendarViews: CalendarView[] = ["Today", "Week", "Month"];

const calendarDays: CalendarDay[] = [
  {
    day: "14",
    weekday: "Mon",
    events: [
      { time: "10:30 AM", label: "Sales Call • Mark", box: "border-pink-500 bg-pink-100/90", title: "text-pink-950", detail: "text-pink-800" },
      { time: "02:00 PM", label: "Client Onboarding", box: "border-emerald-500 bg-emerald-100/90", title: "text-emerald-950", detail: "text-emerald-800" },
    ],
  },
  {
    day: "15",
    weekday: "Tue",
    events: [
      { time: "09:30 AM", label: "Discovery Call", box: "border-purple-500 bg-purple-100/90", title: "text-purple-950", detail: "text-purple-800" },
      { time: "03:30 PM", label: "Follow-up Sync", box: "border-amber-500 bg-amber-100/90", title: "text-amber-950", detail: "text-amber-800" },
    ],
  },
  {
    day: "16",
    weekday: "Wed",
    booked: true,
    events: [
      { time: "11:00 AM", label: "Product Demo", box: "border-sky-500 bg-sky-100/90", title: "text-sky-950", detail: "text-sky-800" },
    ],
  },
  {
    day: "17",
    weekday: "Thu",
    events: [
      { time: "01:00 PM", label: "Strategy Review", box: "border-rose-500 bg-rose-100/90", title: "text-rose-950", detail: "text-rose-800" },
    ],
  },
  {
    day: "18",
    weekday: "Fri",
    events: [
      { time: "10:00 AM", label: "Market Webinar", box: "border-teal-500 bg-teal-100/90", title: "text-teal-950", detail: "text-teal-800" },
      { time: "04:00 PM", label: "Team Standup", box: "border-indigo-500 bg-indigo-100/90", title: "text-indigo-950", detail: "text-indigo-800" },
    ],
  },
  {
    day: "19",
    weekday: "Sat",
    mobile: true,
    open: true,
    events: [],
  },
];

export default function FeatureHeroPreview() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const toastId = useRef(0);
  const [selectedDay, setSelectedDay] = useState("14");
  const [selectedWeekday, setSelectedWeekday] = useState("Mon");
  const [selectedTime, setSelectedTime] = useState("11:00 am");
  const [calendarView, setCalendarView] = useState<CalendarView>("Month");
  const [signupOpen, setSignupOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string) {
    const id = toastId.current + 1;
    toastId.current = id;
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }

  function selectDate(day: string, weekday: string) {
    setSelectedDay(day);
    setSelectedWeekday(weekday);
    showToast(`Viewing availability for ${weekday}, Sep ${day}`);
  }

  function selectTimeSlot(time: string) {
    setSelectedTime(time);
    showToast(`Time slot ${time} selected`);
  }

  function cycleQuickDate(direction: number) {
    const currentIndex = quickDates.findIndex((date) => date.day === selectedDay);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + quickDates.length) % quickDates.length;
    const next = quickDates[nextIndex];
    selectDate(next.day, next.weekday);
  }

  function changeCalendarView(view: CalendarView) {
    setCalendarView(view);
    showToast(`Switched desktop calendar to ${view} view`);
  }

  return (        
    <div id="interactive-showcase" ref={showcaseRef} className="@container relative">
        <div className="relative mx-auto @min-[520px]:pb-36">
            <div className="overflow-hidden rounded-2xl border border-white bg-white/95 shadow-[0_20px_50px_-12px_rgba(79,50,201,0.12)] backdrop-blur-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/90 px-3 py-3 sm:px-4">
                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-1.5 @min-[680px]:flex">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-2 pl-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#6544E8] text-white">
                        <Icon name="calendar" className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">Bookings</span>
                    </div>
                </div>

                <div className="flex items-center rounded-lg bg-slate-200/70 p-0.5 text-[11px] font-semibold">
                    {calendarViews.map((view) => (
                    <button
                        key={view}
                        type="button"
                        onClick={() => changeCalendarView(view)}
                        className={`rounded-md px-2.5 py-1 transition-all ${calendarView === view ? "bg-white text-[#5032C9] shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                    >
                        {view}
                    </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <span className="hidden text-xs font-bold text-slate-700 @min-[680px]:inline">September 2026</span>
                    <button type="button" onClick={() => setSignupOpen(true)} title="New Appointment" className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6544E8] text-white shadow-sm transition-colors hover:bg-[#5032C9]">
                    <Icon name="plus" className="h-4 w-4" />
                    </button>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-[#211551] text-[10px] font-bold text-white">ZB</span>
                </div>
                </div>

                <div className="bg-white p-3 sm:p-4">
                <div className="hidden grid-cols-5 gap-1.5 border-b border-slate-100 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase @min-[560px]:grid @min-[760px]:grid-cols-6 @min-[760px]:gap-2">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div className="hidden @min-[760px]:block">Sat</div>
                </div>

                <div className="flex gap-2 overflow-x-auto pt-2.5 [-ms-overflow-style:none] [scrollbar-width:none] @min-[560px]:grid @min-[560px]:grid-cols-5 @min-[560px]:overflow-visible @min-[760px]:grid-cols-6 @min-[760px]:gap-2 [&::-webkit-scrollbar]:hidden">
                    {calendarDays.map((cell) => {
                    const active = selectedDay === cell.day;
                    return (
                        <button
                        key={cell.day}
                        type="button"
                        onClick={() => selectDate(cell.day, cell.weekday)}
                        className={`${cell.mobile ? "hidden @min-[760px]:block" : ""} group w-[9.25rem] shrink-0 min-h-[88px] cursor-pointer rounded-xl border p-1.5 text-left transition-all @min-[560px]:w-auto @min-[560px]:min-w-0 @min-[760px]:p-2 ${
                            active ? "border-[#6544E8]/50 bg-[#EFEAFF]/70 ring-2 ring-[#E2D8FF]" : "border-slate-100 bg-slate-50/40 hover:border-[#E2D8FF]"
                        }`}
                        >
                        <div className="mb-1.5 flex items-center justify-between">
                            <span className={active ? "rounded bg-[#E2D8FF]/70 px-1.5 py-0.5 text-xs font-bold text-[#5032C9]" : "text-xs font-semibold text-slate-600"}>
                            {cell.day}
                            <span className="ml-1 text-[10px] font-semibold uppercase @min-[560px]:hidden">{cell.weekday}</span>
                            </span>
                            {active ? <span className="h-1.5 w-1.5 rounded-full bg-[#6544E8]" /> : null}
                        </div>
                        <div className="space-y-1">
                            {cell.events.map((event) => (
                            <div key={event.label} className={`rounded border-l-2 px-1.5 py-1 text-[10px] ${event.box}`}>
                                <p className={`truncate font-bold ${event.title}`}>{event.time}</p>
                                <p className={`truncate ${event.detail}`}>{event.label}</p>
                            </div>
                            ))}
                            {cell.booked ? (
                            <div className="animate-fade-in rounded bg-[#6544E8] px-1.5 py-1 text-[10px] text-white shadow-sm">
                                <p className="truncate font-bold">{selectedTime.toUpperCase()}</p>
                                <p className="truncate text-[#E2D8FF]">Booked • You</p>
                            </div>
                            ) : null}
                            {cell.open ? (
                            <div className="flex h-12 items-center justify-center rounded-lg border border-dashed border-slate-200 text-[10px] text-slate-400 transition-colors group-hover:border-[#E2D8FF] group-hover:text-[#6544E8]">
                                + Open
                            </div>
                            ) : null}
                        </div>
                        </button>
                    );
                    })}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-[11px] text-slate-500">
                    <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Zoom & Zoho Meeting Synced
                    </span>
                    <span className="hidden items-center gap-1 text-slate-600 @min-[680px]:inline-flex">
                        <Icon name="card" className="h-3 w-3 text-[#6544E8]" />
                        Stripe Payments Active
                    </span>
                    </div>
                    <span className="font-medium text-[#5032C9]">Auto-reminders: ON</span>
                </div>
                </div>
            </div>

            <div className="relative z-20 mt-4 w-full rounded-2xl border border-[#EFEAFF] bg-white/95 p-4 shadow-[0_24px_48px_-12px_rgba(33,21,81,0.16),0_4px_16px_-4px_rgba(33,21,81,0.08)] backdrop-blur-xl @min-[520px]:absolute @min-[520px]:bottom-3 @min-[520px]:left-0 @min-[520px]:mt-0 @min-[520px]:w-[46%] @min-[520px]:max-w-64 @min-[880px]:bottom-5 @min-[880px]:w-64">
                <div className="mb-2.5 flex items-center justify-between">
                <div>
                    <h3 className="text-xs font-bold text-slate-900">Available Slots</h3>
                    <p className="text-[11px] text-slate-500">{selectedWeekday}, Sep {selectedDay} • 30 mins</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">IST</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => {
                    const active = selectedTime === slot;
                    return (
                    <button
                        key={slot}
                        type="button"
                        onClick={() => selectTimeSlot(slot)}
                        className={`rounded-xl border px-2.5 py-2 text-xs transition-all ${
                        active ? "border-[#6544E8] bg-[#6544E8] font-bold text-white shadow-sm" : "border-slate-200 font-semibold text-slate-700 hover:border-[#7C5DFA] hover:bg-[#F8F6FF]"
                        }`}
                    >
                        {slot}
                    </button>
                    );
                })}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                <span className="text-[11px] text-slate-500">Selected: <strong className="text-slate-800">Sep {selectedDay}, {selectedTime}</strong></span>
                <button type="button" onClick={() => showToast(`Test meeting confirmed for Sep ${selectedDay} at ${selectedTime}!`)} className="flex items-center gap-0.5 text-[11px] font-bold text-[#6544E8] hover:text-[#5032C9]">
                    Book <Icon name="chevron-right" className="h-3 w-3" />
                </button>
                </div>
            </div>

            <div className="relative z-20 mt-4 w-full rounded-[1.75rem] border-4 border-slate-800 bg-slate-900 p-3.5 text-white shadow-[0_24px_48px_-12px_rgba(33,21,81,0.16),0_4px_16px_-4px_rgba(33,21,81,0.08)] @min-[520px]:absolute @min-[520px]:top-14 @min-[520px]:right-0 @min-[520px]:mt-0 @min-[520px]:w-[42%] @min-[520px]:max-w-60 @min-[880px]:top-16 @min-[880px]:w-64 @min-[880px]:max-w-none">
                <div className="flex items-center justify-between border-b border-slate-800 px-1 pb-2.5">
                <div>
                    <span className="text-[10px] font-semibold tracking-wider text-[#C4B5FD] uppercase">Mobile App</span>
                    <h4 className="text-xs font-bold text-white">My Appointments</h4>
                </div>
                <span className="rounded-full bg-[#6544E8] px-2 py-0.5 text-[10px] font-bold text-white">10</span>
                </div>
                <div className="mt-2.5 space-y-2">
                <div className="rounded-xl bg-white p-2.5 text-slate-900 shadow-sm">
                    <div className="mb-0.5 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-semibold text-[#5032C9]">{selectedTime.toUpperCase()} • Sep {selectedDay}</span>
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-800">FREE</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">John Smith</p>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1"><Icon name="briefcase" className="h-3 w-3 text-[#6544E8]" /> Tax Planning</span>
                    <span>30 mins</span>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-700/80 bg-slate-800/90 p-2.5 text-white">
                    <div className="mb-0.5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>02:00 PM - 02:45 PM</span>
                    <span className="rounded bg-amber-400/20 px-1.5 py-0.5 font-bold text-amber-300">$100 PAID</span>
                    </div>
                    <p className="text-xs font-bold text-white">Isabella Chen</p>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><Icon name="video" className="h-3 w-3 text-sky-400" /> Strategy Call</span>
                    <span>45 mins</span>
                    </div>
                </div>
                </div>
            </div>

            <div className="relative z-30 mx-auto mt-4 flex w-fit max-w-full flex-col items-center rounded-2xl border border-[#EFEAFF] bg-white/95 p-3 shadow-[0_24px_48px_-12px_rgba(33,21,81,0.16),0_4px_16px_-4px_rgba(33,21,81,0.08)] backdrop-blur-xl @min-[520px]:absolute @min-[520px]:right-0 @min-[520px]:bottom-3 @min-[520px]:left-auto @min-[520px]:mt-0 @min-[880px]:bottom-5 @min-[880px]:left-1/2 @min-[880px]:right-auto @min-[880px]:-translate-x-1/2">
                <span className="mb-2 text-[11px] font-bold text-slate-700">September 2026</span>
                <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => cycleQuickDate(-1)} aria-label="Previous day" className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                    <Icon name="chevron-left" className="h-4 w-4" />
                </button>
                {quickDates.map((date) => {
                    const active = selectedDay === date.day;
                    return (
                    <button
                        key={date.day}
                        type="button"
                        onClick={() => selectDate(date.day, date.weekday)}
                        className={`flex w-11 flex-col items-center rounded-xl py-1.5 transition-all ${
                        active ? "scale-105 bg-[#6544E8] text-white shadow-sm" : "border border-slate-200/80 bg-slate-50 text-slate-700 hover:bg-[#F8F6FF]"
                        }`}
                    >
                        <span className={`text-xs leading-tight ${active ? "font-extrabold" : "font-bold"}`}>{date.day}</span>
                        <span className={`text-[10px] ${active ? "font-medium opacity-90" : "text-slate-500"}`}>{date.weekday}</span>
                    </button>
                    );
                })}
                <button type="button" onClick={() => cycleQuickDate(1)} aria-label="Next day" className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                    <Icon name="chevron-right" className="h-4 w-4" />
                </button>
                </div>
            </div>
        </div>
    </div>            
  );
}

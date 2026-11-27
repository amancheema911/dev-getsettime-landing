"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import ScreenGate from "./ScreenGate";

type IndustryIcon =
  | "music"
  | "briefcase"
  | "scissors"
  | "heart"
  | "stethoscope"
  | "dumbbell"
  | "camera"
  | "wrench";

type UiIcon =
  | IndustryIcon
  | "calendar"
  | "arrow-right"
  | "shield"
  | "pause"
  | "play"
  | "check-circle"
  | "card"
  | "sparkles"
  | "clock"
  | "check"
  | "star"
  | "message-circle";

type Industry = {
  id: string;
  label: string;
  shortLabel: string;
  slot: number;
  serviceName: string;
  duration: string;
  provider: string;
  timeSlot: string;
  badgeText: string;
  icon: IndustryIcon;
  image: string;
  alt: string;
};

type BookingState = "idle" | "booking" | "booked";

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

function Icon({ name, className }: { name: UiIcon; className?: string }) {
  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden focusable={false}>
        <path
          fill="currentColor"
          d="M12 2.4 14.7 8.9l7 .6-5.3 4.5 1.6 6.8L12 17.4 6 20.8l1.6-6.8L2.3 9.5l7-.6L12 2.4Z"
        />
      </svg>
    );
  }

  let body: ReactNode = null;
  switch (name) {
    case "music":
      body = (
        <>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </>
      );
      break;
    case "briefcase":
      body = (
        <>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </>
      );
      break;
    case "scissors":
      body = (
        <>
          <circle cx="6" cy="6" r="3" />
          <path d="M8.12 8.12 12 12" />
          <path d="M20 4 8.12 15.88" />
          <circle cx="6" cy="18" r="3" />
          <path d="M14.8 14.8 20 20" />
        </>
      );
      break;
    case "heart":
      body = (
        <>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
          <path d="m18 15-2-2" />
          <path d="m15 18-2-2" />
        </>
      );
      break;
    case "stethoscope":
      body = (
        <>
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </>
      );
      break;
    case "dumbbell":
      body = (
        <>
          <path d="M14.4 14.4 9.6 9.6" />
          <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
          <path d="m21.5 21.5-1.4-1.4" />
          <path d="m3.9 3.9 1.4 1.4" />
          <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
        </>
      );
      break;
    case "camera":
      body = (
        <>
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </>
      );
      break;
    case "wrench":
      body = (
        <>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
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
    case "arrow-right":
      body = (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      );
      break;
    case "shield":
      body = (
        <>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </>
      );
      break;
    case "pause":
      body = (
        <>
          <rect x="14" y="4" width="4" height="16" rx="1" />
          <rect x="6" y="4" width="4" height="16" rx="1" />
        </>
      );
      break;
    case "play":
      body = <polygon points="6 3 20 12 6 21 6 3" />;
      break;
    case "check-circle":
      body = (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
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
    case "sparkles":
      body = (
        <>
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </>
      );
      break;
    case "clock":
      body = (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </>
      );
      break;
    case "check":
      body = <path d="M20 6 9 17l-5-5" />;
      break;
    case "message-circle":
      body = (
        <>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z" />
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

const INDUSTRIES: Industry[] = [
  {
    id: "fitness",
    label: "Fitness & Dance",
    shortLabel: "Fitness & Dance",
    slot: 2,
    serviceName: "Dance Class",
    duration: "60 minutes",
    provider: "Studio Move Collective",
    timeSlot: "Today, 5:30 PM",
    badgeText: "12 spots left · Auto-reminder set",
    icon: "music",
    image: "/solutions-fitness.avif",
    alt: "Group dance and movement studio class",
  },
  {
    id: "consulting",
    label: "Consulting & Coaching",
    shortLabel: "Consulting",
    slot: 0,
    serviceName: "Strategy Consultation",
    duration: "45 minutes",
    provider: "Apex Advisory Group",
    timeSlot: "Tomorrow, 10:00 AM",
    badgeText: "Zoom link generated automatically",
    icon: "briefcase",
    image: "/solutions-consulting.avif",
    alt: "Executive consultant reviewing strategy notes at desk",
  },
  {
    id: "beauty",
    label: "Beauty & Spa",
    shortLabel: "Beauty & Spa",
    slot: 1,
    serviceName: "HydraFacial Treatment",
    duration: "50 minutes",
    provider: "Lumière Skin & Aesthetics",
    timeSlot: "Thu, 2:15 PM",
    badgeText: "Deposit collected · Intake form sent",
    icon: "scissors",
    image: "/solutions-beauty.avif",
    alt: "Skincare aesthetician treatment portrait",
  },
  {
    id: "wellness",
    label: "Wellness & Therapy",
    shortLabel: "Wellness & Therapy",
    slot: 3,
    serviceName: "Deep Tissue Massage",
    duration: "60 minutes",
    provider: "Serenity Bodywork Studio",
    timeSlot: "Fri, 4:00 PM",
    badgeText: "Room 2 reserved · SMS confirmed",
    icon: "heart",
    image: "/solutions-therapy.avif",
    alt: "Massage therapist performing relaxing wellness session",
  },
  {
    id: "healthcare",
    label: "Healthcare & Dental",
    shortLabel: "Healthcare",
    slot: 0,
    serviceName: "Dental Checkup & Clean",
    duration: "30 minutes",
    provider: "BrightSmile Clinic",
    timeSlot: "Mon, 9:30 AM",
    badgeText: "Booking link sent · Reminder set",
    icon: "stethoscope",
    image: "/solutions-healthcare.avif",
    alt: "Modern dental care and healthcare consultation",
  },
  {
    id: "training",
    label: "Personal Training",
    shortLabel: "Personal Fitness",
    slot: 2,
    serviceName: "1-on-1 Personal Training",
    duration: "60 minutes",
    provider: "Kinetic Performance Lab",
    timeSlot: "Sat, 8:00 AM",
    badgeText: "Recurring weekly session active",
    icon: "dumbbell",
    image: "/solutions-training.avif",
    alt: "Personal trainer coaching client in modern gym",
  },
  {
    id: "photography",
    label: "Creative & Photo",
    shortLabel: "Photography",
    slot: 1,
    serviceName: "Brand Portrait Session",
    duration: "90 minutes",
    provider: "Atelier Daylight Studio",
    timeSlot: "Wed, 11:00 AM",
    badgeText: "50% retainer paid · Studio booked",
    icon: "camera",
    image: "/solutions-photography.avif",
    alt: "Photographer setting up studio lighting for portrait session",
  },
  {
    id: "home_auto",
    label: "Home & Auto Services",
    shortLabel: "Home & Auto",
    slot: 3,
    serviceName: "Full Ceramic Detailing",
    duration: "120 minutes",
    provider: "Precision Mobile Auto",
    timeSlot: "Tue, 1:00 PM",
    badgeText: "Technician dispatched · Live ETA",
    icon: "wrench",
    image: "/solutions-automotive.avif",
    alt: "Professional auto detailing and mobile service technician",
  },
];

const BASE_SLOTS = [INDUSTRIES[1], INDUSTRIES[2], INDUSTRIES[0], INDUSTRIES[3]];

const SLOT_ORDER = [0, 1, 3, 2] as const;

const SLOT_FRAME: Record<(typeof SLOT_ORDER)[number], string> = {
  0: "aspect-[4/4.3] w-[92%] self-end",
  1: "aspect-[4/4.5] w-[88%] self-start sm:ml-2",
  3: "aspect-[4/4.3] w-[92%] self-start",
  2: "aspect-[4/4.5] w-[88%] self-end sm:mr-2",
};

function CollageCard({
  card,
  active,
  frameClassName,
  onSelect,
}: {
  card: Industry;
  active: boolean;
  frameClassName: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative block overflow-hidden rounded-2xl border-0 bg-slate-200 p-0 text-left transition-all duration-500 sm:rounded-3xl ${frameClassName} ${
        active
          ? "z-20 scale-[1.03] opacity-100 shadow-2xl shadow-indigo-500/20 ring-[3px] ring-indigo-500"
          : "scale-100 opacity-75 shadow-md ring-1 ring-[#E2E8F0] hover:opacity-95"
      }`}
    >
      <Image
        src={`${card.image}`}
        alt={card.alt}
        fill
        sizes="(min-width: 1024px) 250px, 45vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent" />
      <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md transition-colors ${ active ? "bg-[#5B5DFE] text-white shadow-sm" : "bg-white/85 text-[#0F172A]" }`}>
        <Icon name={card.icon} className="h-3 w-3" />
        <span>{card.shortLabel}</span>
      </div>
      <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-white">
        <span className="truncate text-xs font-medium opacity-95">{card.provider}</span>
        {active ? <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" /> : null}
      </div>
    </button>
  );
}

export default function SolutionsHeroPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [typedService, setTypedService] = useState(INDUSTRIES[0].serviceName);
  const [bookingState, setBookingState] = useState<BookingState>("idle");


  const activeIndustry = INDUSTRIES[activeIndex];
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bookingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAutoPlaying || bookingState !== "idle") return;

    cycleTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % INDUSTRIES.length);
    }, 3800);

    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    };
  }, [isAutoPlaying, bookingState]);

  useEffect(() => {
    const targetText = activeIndustry.serviceName;
    let currentLength = 0;
    setTypedService("");

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      currentLength += 1;
      setTypedService(targetText.slice(0, currentLength));
      if (currentLength >= targetText.length && typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    }, 34);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [activeIndex, activeIndustry.serviceName]);

  useEffect(() => {
    return () => {
      if (bookingTimerRef.current) clearTimeout(bookingTimerRef.current);
    };
  }, []);

  function handleSelectIndustry(index: number) {
    setActiveIndex(index);
    setBookingState("idle");
  }

  const displayedCards = BASE_SLOTS.map((baseCard, slotIdx) =>
    activeIndustry.slot === slotIdx ? activeIndustry : baseCard
  );

  return (
    <>       
        <div className="relative">
            <div className="relative px-3 pt-8 pb-8 sm:px-6 sm:pt-10 sm:pb-10">
                <div aria-hidden className="absolute inset-4 -z-10 rounded-3xl border border-[#E2E8F0]/80 bg-gradient-to-b from-white/90 to-[#F1F5F9]/70 shadow-xs" />
                
                <ScreenGate minWidth={1024}>
                    <div className="animate-float-slow absolute -top-1 left-2 z-30 hidden items-center gap-2.5 rounded-2xl border border-[#E2E8F0] bg-white/95 px-3.5 py-2.5 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:left-6 sm:flex">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
                            <Icon name="check-circle" className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                            <p className="text-[11px] leading-tight font-bold text-[#0F172A]">Calendar synced</p>
                            <div className="text-xs font-medium text-slate-500">{activeIndustry.timeSlot}</div>
                        </div>
                    </div>

                    <div className="animate-float-reverse absolute top-3 right-2 z-30 hidden items-center gap-2.5 rounded-2xl border border-[#E2E8F0] bg-white/95 px-3.5 py-2.5 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:right-4 sm:flex">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                            <Icon name="message-circle" className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                            <p className="text-[11px] leading-tight font-bold text-[#0F172A]">Message status</p>
                            <div className="text-xs text-emerald-500">Delivered instantly</div>
                        </div>
                    </div>
                </ScreenGate>

                <div className="relative grid grid-cols-12 items-start gap-3.5 sm:gap-5">
                    <div className="col-span-6 flex flex-col gap-3.5 sm:gap-5">
                        {SLOT_ORDER.slice(0, 2).map((slot) => {
                            const card = displayedCards[slot];
                            return (
                            <CollageCard
                                key={slot}
                                card={card}
                                active={activeIndustry.id === card.id}
                                frameClassName={SLOT_FRAME[slot]}
                                onSelect={() => handleSelectIndustry(INDUSTRIES.findIndex((item) => item.id === card.id))}
                            />
                            );
                        })}
                    </div>
                    <div className="col-span-6 flex flex-col gap-3.5 pt-4 sm:gap-5 sm:pt-8">
                        {SLOT_ORDER.slice(2).map((slot) => {
                            const card = displayedCards[slot];
                            return (
                            <CollageCard
                                key={slot}
                                card={card}
                                active={activeIndustry.id === card.id}
                                frameClassName={SLOT_FRAME[slot]}
                                onSelect={() => handleSelectIndustry(INDUSTRIES.findIndex((item) => item.id === card.id))}
                            />
                            );
                        })}
                    </div>
                </div>

                <div className="relative z-30 mt-5 w-full sm:absolute sm:bottom-2 sm:left-1/2 sm:mt-0 sm:w-[440px] sm:-translate-x-1/2 md:w-[465px]">
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white/95 p-4 shadow-[0_22px_50px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-300 sm:p-5">
                        <div className="mb-2.5 flex items-center justify-between border-b border-slate-100 pb-2.5 text-[11px] font-medium text-slate-400">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600">
                            <Icon name="sparkles" className="h-3.5 w-3.5 text-[#5B5DFE]" />
                            {activeIndustry.provider}
                            </span>
                            <span className="font-semibold text-[#5B5DFE]">{activeIndustry.badgeText}</span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <div className="flex min-h-[32px] items-center sm:min-h-[36px]">
                                    <h2 className="truncate font-serif text-2xl leading-none tracking-tight text-[#0F172A] italic sm:text-[1.75rem]">
                                    {typedService}
                                    <span aria-hidden className="animate-cursor ml-0.5 inline-block h-6 w-[2px] bg-[#5B5DFE] align-middle" />
                                    </h2>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
                                    <span className="inline-flex items-center gap-1">
                                        <Icon name="clock" className="h-3.5 w-3.5 text-slate-400" />
                                        {activeIndustry.duration}
                                    </span>                                    
                                </div>
                            </div>                        
                        </div>
                    </div>

                    {/* <div className="mt-6 flex items-center justify-center gap-1.5">
                        {INDUSTRIES.map((item, index) => (
                            <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectIndustry(index)}
                            aria-label={`Select ${item.label}`}
                            className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                                activeIndex === index ? "w-6 bg-[#5B5DFE]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                            }`}
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>                  
    </>
  );
}

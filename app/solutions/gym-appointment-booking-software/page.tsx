import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { APP_NAME, BASE_URL, contactInfo, REGISTER_GOOGLE_URL, REGISTER_URL } from "@/lib/config";
import { FaqSection } from "@/app/component/FaqSection";
import Card from "@/app/component/Card";
import Heading from "@/app/component/Heading";
import { CheckListItem } from "@/app/component/CheckList";
import SolutionCtaSection from "@/app/component/SolutionCtaSection";

const pageUrl = `${BASE_URL}/solutions/gym-appointment-booking-software`;

export const metadata: Metadata = {
  title: `Gym Scheduling Software | ${APP_NAME}`,
  description: `${APP_NAME} is gym scheduling software for fitness studios and gyms — manage class timetables, trainer availability, PT sessions, and member bookings online with automated reminders and no double-booking.`,
  keywords: [
    "gym scheduling software",
    "gym appointment scheduling",
    "fitness class scheduling system",
    "gym calendar management",
    "personal training scheduling software",
    "gym staff scheduling",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `Gym Scheduling Software | ${APP_NAME}`,
    description: `${APP_NAME} is gym scheduling software for fitness studios and gyms — manage class timetables, trainer availability, PT sessions, and member bookings online with automated reminders and no double-booking.`,
    url: pageUrl,
    type: "website",
    siteName: APP_NAME,
    locale: "en",
    images: [
      {
        url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `Gym Scheduling Software | ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Gym Scheduling Software | ${APP_NAME}`,
    description: `${APP_NAME} is gym scheduling software for fitness studios and gyms — manage class timetables, trainer availability, PT sessions, and member bookings online with automated reminders and no double-booking.`,
    images: [`${BASE_URL}${contactInfo.DEFAULT_IMAGE}`],
  },
};

const features = [
  {
    title: "Online Scheduling — 24/7",
    description: "Share one booking link on your website, WhatsApp, or Instagram. Members schedule classes, PT sessions, and open-gym slots anytime — without calling the front desk.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Smart Calendar & Timetables",
    description: "Build recurring class schedules, set trainer working hours, add buffer time between sessions, and keep every calendar updated in real time — no double-booking.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Trainer & Staff Scheduling",
    description: "Assign coaches to classes, manage availability across trainers and locations, and give your front-desk team one live view of the entire floor schedule.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "WhatsApp & SMS Reminders",
    description: "Automated reminders go out before every class or session. When members reschedule or cancel, your schedule updates instantly and waitlisted spots get filled.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Set up your gym schedule & services",
    desc: "Add your gym name, class types, trainer working hours, session durations, and capacity limits.",
  },
  {
    title: "Publish timetables & share your link",
    desc: "Create recurring weekly schedules for classes and PT. Share your booking link on WhatsApp, your website, and Google Business Profile.",
  },
  {
    title: "Members book & reminders run automatically",
    desc: "Reminders go out automatically — your calendar stays in sync.",
  },
];

const growthRoadmap = [
  {
    phase: "Week 1",
    title: "Move scheduling online",
    detail: "Launch your branded booking page, add your weekly class timetable, and replace phone and DM sign-ups with one self-service link.",
    metric: "Fewer scheduling calls",
  },
  {
    phase: "Week 2",
    title: "Automate reminders & waitlists",
    detail: "Turn on WhatsApp and SMS reminders plus waitlist backfills so cancelled spots get reassigned before class starts.",
    metric: "Up to 60% fewer no-shows",
  },
  {
    phase: "Week 3+",
    title: "Scale trainers & locations",
    detail: "Add coaches, new class types, and additional branches as you grow — without rebuilding your schedule from scratch.",
    metric: "Higher class utilization",
  },
];

const faqItems = [
  {
    title: "What is gym scheduling software?",
    content: "Gym scheduling software is a platform that lets fitness businesses manage class timetables, trainer availability, and member bookings in one place. Members book online while your team sees a live, always-updated schedule — no spreadsheets or phone tag.",
  },
  {
    title: "How long does it take to set up a gym schedule on GetSetTime?",
    content: "Most gyms are live within 20–30 minutes. Sign up, add your working hours and class types, assign trainers, set capacity limits, and your booking page goes live automatically. Share the link and members can start scheduling right away.",
  },
  {
    title: "Can GetSetTime handle recurring class timetables?",
    content: "Yes. Create weekly recurring schedules for group classes, set different timetables per trainer, and define session lengths with buffer time between back-to-back slots. Changes sync across your calendar instantly.",
  },
  {
    title: "Does it prevent double-booking trainers or overfilled classes?",
    content: "Yes. Set max capacity per class and per trainer. When a slot is full or a coach is already assigned, that time block is blocked automatically — members only see genuinely available spots.",
  },
  {
    title: "Is GetSetTime suitable for boutique studios and multi-location gyms?",
    content: "Yes. Solo boutique studios can launch in an afternoon. Multi-location brands can manage separate timetables, staff, and branding per branch from one account — without switching tools as they grow.",
  },
];

export default function GymAppointmentBookingSoftwarePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: APP_NAME,
        url: BASE_URL,
        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
          width: 1200,
          height: 630,
        },
        description: "GetSetTime is gym scheduling software trusted by fitness studios and gyms. Manage class timetables, trainer calendars, and member bookings — simple to set up, smart enough to run itself.",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `Gym Scheduling Software | ${APP_NAME}`,
        description:
          "Gym scheduling software to manage class timetables, trainer availability, PT sessions, and member bookings with automated reminders and real-time calendar sync.",
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: APP_NAME, url: BASE_URL },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${BASE_URL}/solutions` },
          { "@type": "ListItem", position: 3, name: `Gym Scheduling Software | ${APP_NAME}`, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.title,
          acceptedAnswer: { "@type": "Answer", text: item.content },
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id="gym-appointment-booking-software-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/3 -translate-y-1/2 rounded-full bg-indigo-600/30 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto min-w-0 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Left column */}
            <div className="min-w-0 space-y-5 sm:space-y-6">
              <Heading
                badge="Built for Gyms & Fitness Studios"
                title="Gym Scheduling Software That"
                highlightText="Keeps Every Class on Track"
                description="GetSetTime is easy-to-use gym scheduling software — no tech skills needed. Manage class timetables, trainer availability, and member bookings in one place while automated reminders cut no-shows."
                headingTag="h1"
                titleClassName="text-2xl font-black leading-tight text-neutral-900 capitalize sm:text-3xl md:text-4xl lg:text-[50px]"
                descriptionClassName="text-sm leading-relaxed text-neutral-600 sm:text-base"
              />

              <div className="flex gap-2 max-[425px]:flex-col flex-row flex-wrap">
                <Link
                  href={`${REGISTER_GOOGLE_URL}`}
                  target="_blank"
                  aria-label="Sign up with Google"
                  className="bg-indigo-600 text-white text-xs sm:text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-3"
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 sm:w-6 sm:h-6 inline-block rounded-sm bg-white p-1">
                    <g>
                        <path fill="#4285F4" d="M43.6 20.5H42V20.4H24v7.2h11.2C33.9 32.1 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.6 0 5 .9 6.9 2.5l5.8-5.8C33.5 7.1 28.9 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.4-4z"/>
                        <path fill="#34A853" d="M6.3 14.1l5.9 4.3C14.2 15.1 18.7 12 24 12c2.6 0 5 .9 6.9 2.5l5.8-5.8C33.5 7.1 28.9 5 24 5c-7.1 0-13.1 4.1-16.1 10.1z"/>
                        <path fill="#FBBC05" d="M24 44c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2C29.5 35.7 26.9 36.7 24 36.7c-5.4 0-9.9-3.6-11.5-8.5l-6.1 4.7C7 39.1 14.9 44 24 44z"/>
                        <path fill="#EA4335" d="M43.6 20.5H42V20.4H24v7.2h11.2c-1.1 3.1-3.6 5.7-6.6 7.1l6.4 5.2C39.9 37.1 44 31.9 44 25c0-1.3-.1-2.7-.4-4z"/>
                    </g>
                    </svg>
                  Sign up with Google
                </Link>
                <Link
                  href={`${REGISTER_URL}`}
                  aria-label="Get Started for Free - Gym Scheduling Software"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-xs sm:text-sm text-white drop-shadow-lg transition"
                >
                  Get Started for Free
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { value: "10,000+", label: "Sessions Scheduled", hint: "Across gyms using GetSetTime", icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4 0m4 0a4 4 0 014 4", bg: "bg-violet-50 text-violet-600" },
                  { value: "3 hrs", label: "Time Saved", hint: "Daily scheduling admin back for your team", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", bg: "bg-emerald-50 text-emerald-600" },
                  { value: "4.8 ★", label: "Gym Rating", hint: "Average feedback from members", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", bg: "bg-amber-50 text-amber-600" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1 rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={stat.icon} />
                        </svg>
                      </span>
                      <div>
                        <div className="text-lg font-bold text-neutral-900">{stat.value}</div>
                        <div className="text-xs font-semibold text-neutral-800">{stat.label}</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">{stat.hint}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero mock — modern gym scheduling dashboard */}
            <div className="relative min-w-0 animate-fade-in-scale">
              <div className="pointer-events-none absolute -inset-5 rounded-[32px] bg-gradient-to-br from-indigo-300/30 via-violet-200/25 to-emerald-200/30 blur-2xl animate-aurora-drift" aria-hidden />
              <div className="pointer-events-none absolute -right-8 top-10 h-28 w-28 rounded-full bg-violet-400/25 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />

              <div className="relative overflow-hidden rounded-[22px] border border-white/60 bg-white/95 shadow-[0_28px_70px_-16px_rgba(79,70,229,0.28)] ring-1 ring-indigo-100/80 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:20px_20px]" aria-hidden />

                <div className="relative z-10 flex items-center justify-between border-b border-neutral-200 px-3 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 animate-ping"></div>
                        </div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-600"></div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600 animate-pulse"></div>
                        <span className="text-[10px] sm:text-xs font-medium text-neutral-700">LIVE</span>
                    </div>
                </div>

                {/* Window chrome header */}
                <div className="relative px-3 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
                        FS
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-base font-bold tracking-tight text-neutral-900 sm:text-lg">FitNation Studio</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600 animate-pulse"></div>
                        <span className="text-[10px] sm:text-xs font-medium text-neutral-700">LIVE</span>
                    </div>
                  </div>
                </div>

                <div className="relative space-y-3 p-3">
                  {/* Weekly timetable + mini runway */}
                  <div className="overflow-hidden">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </span>
                        <div>
                          <div className="text-xs font-bold text-neutral-900 sm:text-sm">Weekly timetable</div>
                          <div className="text-[10px] text-neutral-500">Aug 18 – 24 · 3 studios</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">Thu selected</span>
                    </div>

                    <div className="mb-3 flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <span
                          key={day}
                          className={`shrink-0 rounded-xl px-2.5 py-1.5 text-[10px] font-bold transition sm:px-3 sm:text-[11px] ${
                            i === 3
                              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25"
                              : "border border-neutral-100 bg-white text-neutral-600 hover:border-indigo-100"
                          }`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>

                    {/* Mini day runway */}
                    <div className="relative mb-3 h-24 overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-50/80 sm:h-28">
                      <div className="absolute inset-0 flex">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`flex-1 border-r border-neutral-200/60 ${i === 5 ? "border-r-0" : ""}`} />
                        ))}
                      </div>
                      <div className="absolute inset-x-0 top-0 flex justify-between px-2 pt-1.5 text-[8px] font-semibold tabular-nums text-neutral-400 sm:text-[9px]">
                        {["06", "09", "12", "15", "18", "21"].map((t) => (
                          <span key={t}>{t}:00</span>
          ))}
        </div>
                      {[
                        { label: "Early HIIT", left: "4%", width: "20%", top: "28%", color: "from-violet-500 to-indigo-600", meta: "75%" },
                        { label: "Strength", left: "26%", width: "22%", top: "28%", color: "from-amber-500 to-orange-500", meta: "Full" },
                        { label: "Open Floor", left: "58%", width: "24%", top: "28%", color: "from-emerald-500 to-teal-600", meta: "42%" },
                        { label: "HIIT Circuit", left: "68%", width: "18%", top: "58%", color: "from-fuchsia-500 to-violet-600", meta: "Live", pulse: true },
                      ].map((block) => (
                        <div
                          key={block.label}
                          className={`absolute overflow-hidden rounded-lg bg-gradient-to-br ${block.color} px-2 py-1 text-white shadow-md ${block.pulse ? "ring-2 ring-violet-300 ring-offset-1 ring-offset-neutral-50" : ""}`}
                          style={{ left: block.left, width: block.width, top: block.top }}
                        >
                          <div className="truncate text-[9px] font-bold leading-tight sm:text-[10px]">{block.label}</div>
                          <div className="truncate text-[8px] text-white/90">{block.meta}</div>
                        </div>
                      ))}
                      <div className="absolute bottom-0 top-4 w-px bg-gradient-to-b from-transparent via-amber-500 to-transparent" style={{ left: "72%" }} aria-hidden>
                        <span className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom bento: Up next + Roster + Utilization */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-2.5 rounded-2xl border border-neutral-100/80 bg-white p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-500 sm:text-xs">Up next</span>
      </div>

                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-3 text-white shadow-lg shadow-indigo-500/20">
                        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10 blur-xl" aria-hidden />
                        <div className="relative">
                          <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-indigo-100">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                            Starting in 12 min
                          </div>
                          <div className="mt-1.5 text-sm font-bold sm:text-base">HIIT Circuit</div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-indigo-100">
                            <span>Trainer Alex</span>
                            <span className="opacity-50">·</span>
                            <span>Studio A</span>
                            <span className="opacity-50">·</span>
                            <span>8/12 booked</span>
                          </div>
                        </div>
                      </div>

                      {[
                        { time: "11:30", title: "Strength Foundations", trainer: "Sam R.", status: "Waitlist", statusTone: "bg-amber-50 text-amber-700 ring-amber-100" },
                        { time: "13:00", title: "Mobility Reset", trainer: "Jordan L.", status: "5 spots", statusTone: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
                      ].map((session) => (
                        <div key={session.time} className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-neutral-50/70 px-2.5 py-2 transition hover:border-indigo-100 hover:bg-white">
                          <span className="flex w-10 shrink-0 flex-col items-center rounded-lg bg-white py-1 text-[10px] font-bold tabular-nums text-neutral-700 shadow-sm">{session.time}</span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[11px] font-semibold text-neutral-900">{session.title}</div>
                            <div className="truncate text-[10px] text-neutral-500">{session.trainer}</div>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ring-1 ${session.statusTone}`}>{session.status}</span>
                        </div>
                      ))}
          </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl border border-neutral-100/80 bg-white p-3 shadow-sm">
                        <div className="mb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-500 sm:text-xs">Trainer roster</span>
                          </div>
                          <div className="flex -space-x-2">
                            {["AM", "SR"].map((initials, i) => (
                              <span key={initials} className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white ${i === 0 ? "bg-violet-500" : "bg-indigo-500"}`}>{initials}</span>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "Alex Morgan", role: "HIIT · Conditioning", status: "In class", dot: "bg-amber-400", card: "from-violet-50/80 to-white border-violet-100" },
                            { name: "Sam Reyes", role: "Strength · PT", status: "Available", dot: "bg-emerald-400", card: "from-emerald-50/60 to-white border-emerald-100" },
                          ].map((trainer) => (
                            <div key={trainer.name} className={`flex items-center gap-2.5 rounded-xl border bg-gradient-to-r p-2 ${trainer.card}`}>
                              <div className="relative">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-[9px] font-bold text-white shadow-sm">
                                  {trainer.name.split(" ").map((w) => w[0]).join("")}
                                </div>
                                <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${trainer.dot}`} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[11px] font-bold text-neutral-900">{trainer.name}</div>
                                <div className="truncate text-[10px] text-neutral-500">{trainer.role}</div>
                              </div>
                              <span className="shrink-0 text-[9px] font-semibold text-neutral-600">{trainer.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-slate-900 to-indigo-950 p-3.5 text-white shadow-lg">
                        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-500/30 blur-2xl" aria-hidden />
                        <div className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-emerald-500/20 blur-xl" aria-hidden />
                        <div className="relative flex items-end justify-between gap-3">
                          <div>
                            <div className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-[10px]">Today at a glance</div>
                            <div className="mt-1 flex items-baseline gap-1">
                              <span className="text-3xl font-black tabular-nums tracking-tight">91</span>
                              <span className="text-lg font-bold text-indigo-300">%</span>
                            </div>
                            <div className="mt-1 text-[10px] text-neutral-400">14 sessions · 2 open slots</div>
                          </div>
                          <div className="relative h-14 w-14 shrink-0">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36" aria-hidden>
                              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                              <circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#gymHeroUtilGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="91 100" />
                              <defs>
                                <linearGradient id="gymHeroUtilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#818cf8" />
                                  <stop offset="100%" stopColor="#34d399" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">91%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 py-10 sm:py-14 lg:py-20">
        <div className="absolute left-10 top-10 hidden h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl sm:block" />
        <div className="absolute bottom-10 right-10 hidden h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl sm:block" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            badge="Features"
            title="Gym Scheduling Software With"
            highlightText="Everything Your Gym Needs"
            description="GetSetTime is gym scheduling software built for fitness centers, boutique studios, CrossFit boxes, and multi-location brands — manage timetables, trainers, and member bookings without manual admin."
            wrapperClassName="mx-auto max-w-4xl space-y-4 text-center"
            titleClassName="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl lg:text-[40px] capitalize"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
          </div>
      </div>
    </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-x-hidden bg-slate-50 py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0 hidden sm:block">
          <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto grid min-w-0 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          {/* Left column — day-runway schedule builder */}
          <div className="relative order-2 lg:order-1 overflow-hidden rounded-2xl bg-white p-3 drop-shadow-xl">
            <Image src="/how-it-works.webp" alt="How it works" width={800} height={700} className="w-full h-full object-cover rounded-xl" />
          </div>

          {/* Right column */}
          <div className="order-1 min-w-0 space-y-5 sm:space-y-6 lg:order-2">
            <Heading
              badge="How it works"
              title="Launch your gym scheduling system in"
              highlightText="three simple steps"
              description="From solo boutique studios to multi-trainer gyms — set up your timetable once, then let members self-schedule classes and sessions around the clock."
            />
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-3 rounded-2xl border border-white bg-white/90 p-3 drop-shadow-md backdrop-blur transition hover:-translate-y-0.5 sm:gap-4 sm:p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-sm font-bold text-white shadow-md shadow-indigo-500/25">
                    0{i + 1}
                  </span>
            <div>
                    <p className="font-semibold text-neutral-900">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">{step.desc}</p>
                  </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef2ff_0%,#e0f2fe_55%,#f8fafc_100%)] py-10 sm:py-14 lg:py-20">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left column */}
            <div className="space-y-4">
              <Heading
                badge="The real problem"
                title="Running a gym without scheduling software is"
                highlightText="costing you every week"
                description="When timetables live in spreadsheets, WhatsApp threads, and front-desk notebooks, classes get overbooked, trainers get double-scheduled, and members stop showing up."
              />
              <div className="space-y-3">
                {[
                  "Phone and DM scheduling interrupts workouts and slows down check-ins.",
                  "Manual timetables lead to overbooked classes and double-booked trainers.",
                  "No automated reminders means more no-shows and wasted floor capacity.",
                  "Scattered schedules make it hard to see trainer workload across the week.",
                ].map((point) => (
                  <CheckListItem key={point} text={point} />
                ))}
              </div>
            </div>

            {/* Right column — polished live ops dashboard */}
            <div className="relative min-w-0">
              <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-br from-indigo-300/25 via-violet-200/20 to-emerald-200/25 blur-2xl animate-aurora-drift" aria-hidden />
              <div className="pointer-events-none absolute -right-6 top-8 h-24 w-24 rounded-full bg-violet-400/20 blur-2xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />

              <div className="relative overflow-hidden rounded-[22px] border border-white/60 bg-white/95 shadow-[0_24px_60px_-18px_rgba(79,70,229,0.22)] ring-1 ring-indigo-100/80 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:20px_20px]" aria-hidden />

                {/* Window chrome header */}
                <div className="relative border-b border-neutral-100/80 bg-gradient-to-r from-slate-50/90 via-white to-indigo-50/40 px-4 py-3 sm:px-5">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                    <span className="ml-2 text-[10px] font-medium text-neutral-400">fitnation · schedule ops</span>
                  </div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-base font-bold tracking-tight text-neutral-900">Trainer & class overview</div>
                        <div className="mt-0.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Live · Thu Aug 20
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-xl bg-indigo-600 px-2.5 py-1.5 text-center text-white">
                        <div className="text-xs font-medium uppercase text-white">Show-up</div>
                        <div className="text-xl font-black text-white">94%</div>
                      </span>
                    </div>
              </div>
                </div>

                <div className="relative space-y-3.5 p-4 sm:p-5">
                  <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                    {/* Mini timeline — today's classes */}
                    <div className="overflow-hidden rounded-2xl border border-neutral-100/80 bg-gradient-to-br from-white to-neutral-50/80 p-3 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </span>
                          <div>
                            <div className="text-[11px] font-bold text-neutral-900">Today&apos;s classes</div>
                            <div className="text-[10px] text-neutral-500">Next 2 hours · Studio floor</div>
                          </div>
                        </div>
                        <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Now 17:30</span>
              </div>

                      <div className="relative pl-2">
                        <div className="absolute bottom-1 left-[13px] top-1 w-px bg-gradient-to-b from-indigo-200 via-violet-300 to-emerald-200" aria-hidden />
                        <div className="space-y-2.5">
                          {[
                            { time: "17:30", name: "HIIT Circuit", coach: "Alex M.", room: "Studio A", spots: 8, max: 12, gradient: "from-violet-500 to-indigo-600", glow: "shadow-violet-500/25", active: true, status: "In progress" },
                            { time: "18:00", name: "Strength Foundations", coach: "Sam R.", room: "Studio B", spots: 12, max: 12, gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/20", active: false, status: "Waitlist · 3" },
                            { time: "19:00", name: "Mobility Reset", coach: "Jordan L.", room: "Studio C", spots: 5, max: 10, gradient: "from-emerald-500 to-teal-600", glow: "shadow-emerald-500/20", active: false, status: "Open" },
                          ].map((row) => {
                            const fill = Math.round((row.spots / row.max) * 100);
                            return (
                              <div key={row.name} className="relative flex gap-3">
                                <span className={`relative z-10 mt-3 flex h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white ${row.active ? "bg-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.2)]" : "bg-neutral-300"}`} />
                                <div className={`min-w-0 flex-1 overflow-hidden rounded-xl border transition duration-300 hover:shadow-md ${row.active ? "border-violet-200 bg-gradient-to-br from-violet-50/80 to-indigo-50/50 shadow-lg shadow-violet-500/10" : "border-neutral-100 bg-white"}`}>
                                  {row.active && (
                                    <div className="relative h-0.5 overflow-hidden bg-violet-100">
                                      <div className="absolute inset-0 animate-gym-shimmer bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" aria-hidden />
                </div>
              )}
                                  <div className="p-2.5">
                                    <div className="flex items-start gap-2.5">
                                      <div className={`flex w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-to-br ${row.gradient} py-1.5 text-white shadow-md ${row.glow}`}>
                                        <span className="text-[9px] font-bold tabular-nums leading-none">{row.time}</span>
                                        {row.active && <span className="mt-0.5 text-[7px] font-bold uppercase opacity-90">Live</span>}
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="min-w-0">
                                            <div className="truncate text-xs font-bold text-neutral-900">{row.name}</div>
                                            <div className="text-[10px] text-neutral-500">{row.coach} · {row.room}</div>
                                          </div>
                                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${row.active ? "bg-violet-100 text-violet-700" : row.spots >= row.max ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{row.status}</span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                          <div className="relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-neutral-100">
                                            <div className={`h-full rounded-full bg-gradient-to-r ${row.gradient}`} style={{ width: `${fill}%` }} />
                                          </div>
                                          <span className="shrink-0 text-[10px] font-bold tabular-nums text-neutral-600">{row.spots}/{row.max}</span>
                                        </div>
                                      </div>
                                    </div>
            </div>
          </div>
      </div>
                            );
                          })}
                  </div>
                </div>
              </div>

                    {/* Trainer + utilization column */}
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-neutral-100/80 bg-white p-3 shadow-sm">
                        <div className="mb-2.5 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Trainer roster</span>
                          <div className="flex -space-x-2">
                            {["AM", "SR", "JL"].map((initials, i) => (
                              <span key={initials} className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white ${i === 0 ? "bg-violet-500" : i === 1 ? "bg-indigo-500" : "bg-emerald-500"}`}>{initials}</span>
            ))}
          </div>
                        </div>
                        <div className="space-y-2">
                          {[
                            { name: "Alex Morgan", role: "HIIT · Lane A", status: "In class", dot: "bg-amber-400", card: "from-violet-50/80 to-white border-violet-100" },
                            { name: "Sam Reyes", role: "Strength · Lane B", status: "Available", dot: "bg-emerald-400", card: "from-emerald-50/60 to-white border-emerald-100" },
                            { name: "Jordan Lee", role: "Mobility · Lane C", status: "In class", dot: "bg-amber-400", card: "from-indigo-50/60 to-white border-indigo-100" },
                          ].map((trainer) => (
                            <div key={trainer.name} className={`flex items-center gap-2.5 rounded-xl border bg-gradient-to-r p-2 ${trainer.card}`}>
                              <div className="relative">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-[9px] font-bold text-white shadow-sm">
                                  {trainer.name.split(" ").map((w) => w[0]).join("")}
                                </div>
                                <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${trainer.dot}`} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[11px] font-bold text-neutral-900">{trainer.name}</div>
                                <div className="truncate text-[10px] text-neutral-500">{trainer.role}</div>
                              </div>
                              <span className="shrink-0 text-[9px] font-semibold text-neutral-600">{trainer.status}</span>
      </div>
                          ))}
          </div>
      </div>

                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-slate-900 to-indigo-950 p-3.5 text-white shadow-lg">
                        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-500/30 blur-2xl" aria-hidden />
                        <div className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-emerald-500/20 blur-xl" aria-hidden />
                        <div className="relative flex items-end justify-between gap-3">
                          <div>
                            <div className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Floor utilization</div>
                            <div className="mt-1 flex items-baseline gap-1.5">
                              <span className="text-3xl font-black tabular-nums tracking-tight">78</span>
                              <span className="text-lg font-bold text-indigo-300">%</span>
                            </div>
                            <div className="mt-1 text-[10px] text-neutral-400">14 booked · 2 open slots</div>
                          </div>
                          <div className="relative h-14 w-14 shrink-0">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36" aria-hidden>
                              <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                              <circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#gymUtilGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="78 100" />
                              <defs>
                                <linearGradient id="gymUtilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#818cf8" />
                                  <stop offset="100%" stopColor="#34d399" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">78%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>

      {/* GROWTH ROADMAP */}
      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* LEFT VISUAL */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-white p-3 drop-shadow-xl">
                <Image src="/gym-grow-software.webp" alt="Gym scheduling dashboard" width={600} height={500} className="w-full rounded-xl object-cover" loading="lazy" />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="space-y-5">
              <Heading
                badge="Growth roadmap"
                title="Our Software Helps Your"
                highlightText="Gym Grow Faster"
                description="Most gyms publish their first online schedule within an afternoon. Here is how teams typically roll out GetSetTime to grow their gym faster."
              />
              <div className="space-y-3">
                {growthRoadmap.map((item) => (
                  <div key={item.phase} className="rounded-2xl border border-slate-100 bg-white p-4 drop-shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-indigo-700">{item.phase}</span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">{item.metric}</span>
          </div>
                    <h3 className="mt-2 text-base font-bold text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.detail}</p>
                </div>
                ))}
              </div>
            </div>
            
          </div>
      </div>
    </section>

      {/* FAQ */}
      <section className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#f8fafc_100%)] py-10 sm:py-14 lg:py-20">
        <div className="container relative mx-auto grid min-w-0 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:px-8">
          <div className="space-y-3">
            <Heading
              badge="Frequently Asked Questions"
              title="Questions gym owners ask about scheduling software"
              description="Clear answers for fitness businesses that want online class and session scheduling without adding admin work."
            />
            <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2">
            <Card title="Smart timetables" description="Recurring class schedules, capacity limits, and live trainer calendars that update in real time." icon={<svg className="h-8 w-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />

            <Card title="Self-service booking" description="Members book classes, PT sessions, and open-gym slots online 24/7 — no front-desk calls needed." icon={<svg className="h-7 w-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><path d="M8 15H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />

            <Card title="Trainer & staff scheduling" description="Assign coaches to classes, manage availability across trainers, and keep one live view of the floor." icon={<svg className="h-8 w-8 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />

            <Card title="Automated reminders" description="WhatsApp and SMS nudges before every class or session — fewer no-shows and faster waitlist fill." icon={<svg fill="#00a63e" className="h-8 w-8" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enableBackground="new 0 0 512 512" stroke="#000000" strokeWidth="8.192"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="m266.1,237.1h-82.2c-6.2,0-10.4,5.2-10.4,10.4v243c0,6.3 5.2,10.4 10.4,10.4h82.2c5.2,0 10.4-4.2 10.4-10.4v-243c0-6.2-5.2-10.4-10.4-10.4zm-10.4,243h-61.4v-222.1h61.4v222.1z"></path> <path d="M103.7,272.6H21.5c-6.2,0-10.4,5.2-10.4,10.4v207.6c0,6.3,5.2,10.4,10.4,10.4h82.2c5.2,0,10.4-4.2,10.4-10.4V283 C114.1,276.7,108.9,272.6,103.7,272.6z M93.3,480.1H31.9V293.4h61.4V480.1z"></path> <path d="m499.2,157.8l-103-142.9c-4.2-5.2-12.5-5.2-16.6,0l-103,142.9c-4.2,5.9-2.6,15.6 8.3,15.6h51v317.1c0,6.3 5.2,10.4 10.4,10.4h82.2c5.2,0 10.4-4.2 11.4-10.4v-317h51c10.2,0 12.4-10.4 8.3-15.7zm-70.8-5.2c-6.2,0-10.4,5.2-10.4,10.4v317.1h-61.4-1v-317.1c0-6.3-5.2-10.4-10.4-10.4h-41.6l83.2-114.7 83.2,114.7h-41.6z"></path> </g> </g> </g></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />
          </div>
          </div>
          <div className="min-w-0">
            <FaqSection items={faqItems} />
          </div>
        </div>
      </section>

      <SolutionCtaSection badge="Built for Gyms & Fitness Studios" businessType="Sports & Fitness" />
    </>
  );
}
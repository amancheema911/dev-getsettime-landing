import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { APP_NAME, BASE_URL, contactInfo, REGISTER_URL, REGISTER_GOOGLE_URL } from "@/lib/config";
import Heading from "@/app/component/Heading";
import Card from "@/app/component/Card";
import { FaqSection } from "@/app/component/FaqSection";
import SolutionCtaSection from "@/app/component/SolutionCtaSection";

const pageUrl = `${BASE_URL}/solutions/immigration-appointment-booking-software`;

export const metadata: Metadata = {
  title: `Immigration Appointment Booking Software | ${APP_NAME}`,
  description: `${APP_NAME} helps immigration consultants and law firms schedule client consultations, document reviews, and case appointments online — with automated reminders, document checklists, and multi-consultant calendars.`,
  keywords: [
    "immigration appointment booking software",
    "immigration consultant scheduling",
    "visa consultation booking",
    "immigration law firm scheduling",
    "client appointment scheduling immigration",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Immigration Appointment Booking Software | ${APP_NAME}`,
    description: `${APP_NAME} helps immigration consultants and law firms schedule client consultations, document reviews, and case appointments online — with automated reminders, document checklists, and multi-consultant calendars.`,
    url: pageUrl,
    type: "website",
    siteName: APP_NAME,
    locale: "en",
    images: [{ url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`, width: 1200, height: 630, alt: `Immigration Appointment Booking Software | ${APP_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Immigration Appointment Booking Software | ${APP_NAME}`,
    description: `${APP_NAME} helps immigration consultants and law firms schedule client consultations, document reviews, and case appointments online.`,
    images: [`${BASE_URL}${contactInfo.DEFAULT_IMAGE}`],
  },
};

const TRUST_STATS = [
  {
    value: "10,000+",
    label: "Appointments scheduled",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    bg: "bg-indigo-50 text-indigo-600",
  },
  {
    value: "60+",
    label: "Immigration firms onboarded",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    bg: "bg-emerald-50 text-emerald-600",
  },
  {
    value: "4.9 / 5",
    label: "Average consultant rating",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    bg: "bg-amber-50 text-amber-600",
  },
];

const features = [
  {
    title: "Case-Type Aware Booking",
    description: "Set up every case type your firm handles — green card interviews, visa renewals, citizenship prep — each with its own duration, consultant, and intake questions.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Client Self-Service Intake",
    description: "Clients pick an open slot and book themselves — day or night. No phone tag, no back-and-forth email chains just to land a consultation.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Document Checklists Built In",
    description: "Attach a document checklist to any case type. Clients upload files when they book, so your team reviews the case before the client walks in.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.9A5.5 5.5 0 0116.9 6.1 4.5 4.5 0 0118 15h-1M12 12v9m0-9l-3 3m3-3l3 3" />
      </svg>
    ),
  },
  {
    title: "Multi-Office, Multi-Consultant",
    description: "One live calendar view across every consultant, paralegal, and office location — no more juggling separate calendars per person or branch.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Set up case types & hours",
    desc: "Add your firm, consultants, and every case type you handle — each with its own duration and document checklist.",
  },
  {
    title: "Publish your booking page",
    desc: "Share one branded link on your website, WhatsApp, and email signature. No app download, no phone tag.",
  },
  {
    title: "Clients self-book & upload files",
    desc: "Clients pick an open slot and attach documents ahead of time — you see everything before they walk in.",
  },
];

const growthRoadmap = [
  {
    phase: "Week 1",
    title: "Move intake online",
    detail: "Launch your branded booking page, add every case type, and replace phone and email scheduling with one self-service link.",
    metric: "Fewer scheduling calls",
  },
  {
    phase: "Week 2",
    title: "Automate reminders & checklists",
    detail: "Turn on SMS and email reminders plus document checklists so clients arrive at every appointment fully prepared.",
    metric: "Up to 40% fewer no-shows",
  },
  {
    phase: "Week 3+",
    title: "Scale consultants & offices",
    detail: "Add consultants, paralegals, and additional office locations as your practice grows — without rebuilding your calendar.",
    metric: "Higher caseload capacity",
  },
];

const TESTIMONIALS = [
  {
    quote: "We went from a shared spreadsheet to a real booking system in an afternoon. Our front desk hasn't answered a scheduling call in months.",
    name: "Sarah Kim",
    role: "Managing Consultant, Kim Immigration Partners",
  },
  {
    quote: "The document checklists alone saved us hours a week — clients show up with everything ready instead of half the file.",
    name: "James Ortiz",
    role: "Senior Paralegal, Ortiz & Reyes Law",
  },
  {
    quote: "Running three offices used to mean three calendars. Now every consultant's availability lives in one place.",
    name: "Maria Delgado",
    role: "Managing Partner, Delgado Immigration Law",
  },
];

const faqItems = [
  {
    title: "Is this a government booking system?",
    content: "No. GetSetTime is independent scheduling software used by immigration consultants and law firms to manage their own client appointments. It does not book slots with USCIS, embassies, or any government agency.",
  },
  {
    title: "Can clients book without creating an account?",
    content: "Yes. Clients pick a case type and an open slot on your booking page — no login, no app, no back-and-forth email.",
  },
  {
    title: "Do you support multiple consultants and offices?",
    content: "Yes. Add every consultant, paralegal, and office location to one account, each with independent hours and case-type assignments.",
  },
  {
    title: "Can I collect documents before the appointment?",
    content: "Yes. Attach a document checklist to any case type — clients upload files when they book, so your team reviews the case beforehand.",
  },
  {
    title: "What happens if a client doesn't show up?",
    content: "Automated SMS and email reminders go out ahead of every appointment. Firms typically see no-shows drop by 30–45% within the first month.",
  },
  {
    title: "Is there a setup fee or long-term contract?",
    content: "No. Start free, no card required. Solo consultants are usually live the same day; larger firms roll out consultant-by-consultant.",
  },
];

export default function ImmigrationAppointmentBookingSoftwarePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: APP_NAME,
        url: BASE_URL,
        image: { "@type": "ImageObject", url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`, width: 1200, height: 630 },
        description: "GetSetTime is appointment booking software trusted by immigration consultants and law firms.",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `Immigration Appointment Booking Software | ${APP_NAME}`,
        description: "Immigration appointment booking software for consultants and law firms — schedule client consultations with automated reminders and document checklists.",
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: APP_NAME, url: BASE_URL },
        primaryImageOfPage: { "@type": "ImageObject", url: `${BASE_URL}${contactInfo.DEFAULT_IMAGE}`, width: 1200, height: 630 },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Solutions", item: `${BASE_URL}/solutions` },
          { "@type": "ListItem", position: 3, name: `Immigration Appointment Booking Software | ${APP_NAME}`, item: pageUrl },
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
        id="immigration-appointment-booking-software-schema"
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
                badge="Scheduling software for immigration professionals"
                title="Every case, every client,"
                highlightText="right on time."
                description="GetSetTime lets immigration consultants and law firms publish a booking page for every case type — visa renewals, green card interviews, citizenship prep — so clients schedule themselves, upload documents in advance, and actually show up prepared."
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
                  aria-label="Get Started for Free - Immigration Appointment Booking Software"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-xs sm:text-sm text-white drop-shadow-lg transition"
                >
                  Get Started for Free
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {TRUST_STATS.map((stat) => (
                  <div key={stat.label} className="space-y-1 rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={stat.icon} />
                        </svg>
                      </span>
                      <div className="text-lg font-bold text-neutral-900">{stat.value}</div>
                    </div>
                    <div className="text-xs font-semibold text-neutral-800">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero mock — immigration case scheduling dashboard */}
            <div className="relative min-w-0 animate-fade-in-scale">
              <div className="pointer-events-none absolute -inset-5 rounded-[32px] bg-gradient-to-br from-indigo-300/30 via-sky-200/25 to-violet-200/30 blur-2xl animate-aurora-drift" aria-hidden />
              <div className="pointer-events-none absolute -right-8 top-10 h-28 w-28 rounded-full bg-violet-400/25 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />

              <div className="relative overflow-hidden rounded-[22px] border border-white/60 bg-white/95 shadow-[0_28px_70px_-16px_rgba(79,70,229,0.28)] ring-1 ring-indigo-100/80 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:20px_20px]" aria-hidden />

                {/* Window chrome */}
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

                <div className="relative space-y-3 p-3 sm:p-4">
                  {/* Firm header + show-up KPI */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-[10px] font-bold text-white shadow-md shadow-indigo-500/30">
                        IP
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold tracking-tight text-neutral-900 sm:text-base">Immigration Partners</div>
                        <div className="text-[10px] text-neutral-500">8 appointments · 3 consultants · Office A</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-xl border border-neutral-100 bg-white px-2.5 py-1.5 text-center shadow-sm">
                        <div className="text-[8px] font-semibold uppercase tracking-wide text-neutral-400">Docs ready</div>
                        <div className="text-sm font-black tabular-nums text-indigo-600">94%</div>
                      </div>
                      <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-2.5 py-1.5 text-center text-white shadow-md shadow-indigo-500/25">
                        <div className="text-[8px] font-semibold uppercase tracking-wide text-white/80">Show-up</div>
                        <div className="text-sm font-black tabular-nums">96%</div>
                      </div>
                    </div>
                  </div>

                  {/* KPI strip */}
                  <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-4">
                      {[
                        {
                          label: "Today",
                          value: "8",
                          sub: "booked",
                          delta: "+2 vs yesterday",
                          deltaClass: "text-emerald-600",
                          iconBg: "bg-indigo-50 text-indigo-600",
                          icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                          live: false,
                        },
                        {
                          label: "Live now",
                          value: "1",
                          sub: "session",
                          delta: "Green Card Prep",
                          deltaClass: "text-violet-600",
                          iconBg: "bg-violet-50 text-violet-600",
                          icon: "M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M9.879 16.121a4 4 0 010-5.657m4.242 0a4 4 0 010 5.657M12 12h.01",
                          live: true,
                        },
                        {
                          label: "Pending docs",
                          value: "2",
                          sub: "clients",
                          delta: "Need I-485 / passport",
                          deltaClass: "text-amber-600",
                          iconBg: "bg-amber-50 text-amber-600",
                          icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                          live: false,
                        },
                        {
                          label: "Open slots",
                          value: "3",
                          sub: "left",
                          delta: "Next 3:30 PM",
                          deltaClass: "text-sky-600",
                          iconBg: "bg-sky-50 text-sky-600",
                          icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                          live: false,
                        },
                      ].map((kpi, i) => (
                        <div
                          key={kpi.label}
                          className={`relative px-2.5 py-2.5 sm:px-3 ${i % 2 === 0 ? "border-r border-neutral-100" : ""} ${i < 2 ? "border-b border-neutral-100 sm:border-b-0" : ""} ${i === 1 ? "sm:border-r sm:border-neutral-100" : ""} ${kpi.live ? "bg-gradient-to-br from-violet-50/80 to-white" : ""}`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" d={kpi.icon} />
                              </svg>
                            </span>
                            {kpi.live && (
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-70" />
                                <span className="relative h-1.5 w-1.5 rounded-full bg-violet-500" />
                              </span>
                            )}
                          </div>
                          <div className="mt-1.5 flex items-baseline gap-1">
                            <span className="text-lg font-black tabular-nums leading-none text-neutral-900 sm:text-xl">{kpi.value}</span>
                            <span className="text-[9px] font-medium text-neutral-400">{kpi.sub}</span>
                          </div>
                          <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-neutral-500">{kpi.label}</div>
                          <div className={`mt-0.5 truncate text-[8px] font-semibold ${kpi.deltaClass}`}>{kpi.delta}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.25fr_0.75fr]">
                    {/* Active cases feed */}
                    <div className="overflow-hidden rounded-2xl border border-neutral-100/80 bg-gradient-to-br from-white to-slate-50/80 p-3 shadow-sm">
                      <div className="mb-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <div>
                            <div className="text-[11px] font-bold text-neutral-900">Today&apos;s cases</div>
                            <div className="text-[9px] text-neutral-500">Next 4 hours</div>
                          </div>
                        </div>
                        <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Now 09:40</span>
                      </div>

                      <div className="space-y-2">
                        {[
                          {
                            time: "09:40",
                            title: "Green Card Prep",
                            client: "Ava Chen",
                            who: "Sarah K.",
                            status: "In progress",
                            docs: 100,
                            live: true,
                            tone: "from-violet-500 to-indigo-600",
                            badge: "bg-violet-100 text-violet-700",
                          },
                          {
                            time: "11:00",
                            title: "Visa Renewal",
                            client: "Ethan Ruiz",
                            who: "James O.",
                            status: "Docs pending",
                            docs: 60,
                            live: false,
                            tone: "from-amber-500 to-orange-500",
                            badge: "bg-amber-50 text-amber-700",
                          },
                          {
                            time: "13:00",
                            title: "Citizenship Prep",
                            client: "Maria Delgado",
                            who: "Maria D.",
                            status: "Ready",
                            docs: 100,
                            live: false,
                            tone: "from-emerald-500 to-teal-600",
                            badge: "bg-emerald-50 text-emerald-700",
                          },
                        ].map((row) => (
                          <div
                            key={row.title}
                            className={`relative overflow-hidden rounded-xl border p-2.5 transition ${
                              row.live
                                ? "border-violet-200 bg-gradient-to-br from-violet-50/90 to-indigo-50/50 shadow-md shadow-violet-500/10"
                                : "border-neutral-100 bg-white"
                            }`}
                          >
                            {row.live && (
                              <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-violet-100">
                                <div className="absolute inset-0 animate-gym-shimmer bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" aria-hidden />
                              </div>
                            )}
                            <div className="flex items-start gap-2.5">
                              <div className={`flex w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-to-br ${row.tone} py-1.5 text-white shadow-sm`}>
                                <span className="text-[9px] font-bold tabular-nums leading-none">{row.time}</span>
                                {row.live && <span className="mt-0.5 text-[7px] font-bold uppercase opacity-90">Live</span>}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <div className="truncate text-xs font-bold text-neutral-900">{row.title}</div>
                                    <div className="truncate text-[10px] text-neutral-500">{row.client} · {row.who}</div>
                                  </div>
                                  <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${row.badge}`}>{row.status}</span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2">
                                  <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-neutral-100">
                                    <div className={`h-full rounded-full bg-gradient-to-r ${row.tone}`} style={{ width: `${row.docs}%` }} />
                                  </div>
                                  <span className="shrink-0 text-[9px] font-bold tabular-nums text-neutral-500">{row.docs}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Side panel */}
                    <div className="space-y-2.5">
                      <div className="rounded-2xl border border-neutral-100/80 bg-white p-3 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Consultants</span>
                          <span className="text-[9px] font-semibold text-emerald-600">1 free</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { initials: "SK", name: "Sarah Kim", role: "Green Cards", status: "Live", color: "from-violet-500 to-indigo-600", statusColor: "text-violet-600" },
                            { initials: "JO", name: "James Ortiz", role: "Visas", status: "Free", color: "from-emerald-500 to-teal-600", statusColor: "text-emerald-600" },
                            { initials: "MD", name: "Maria D.", role: "Citizenship", status: "Busy", color: "from-indigo-500 to-sky-600", statusColor: "text-amber-600" },
                          ].map((c) => (
                            <div key={c.initials} className="flex items-center gap-2">
                              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-[8px] font-bold text-white`}>
                                {c.initials}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[10px] font-bold text-neutral-800">{c.name}</div>
                                <div className="truncate text-[8px] text-neutral-400">{c.role}</div>
                              </div>
                              <span className={`shrink-0 text-[9px] font-semibold ${c.statusColor}`}>{c.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-neutral-100/80 bg-white p-3 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Bookings</span>
                          <span className="text-[9px] font-semibold text-emerald-600">+18%</span>
                        </div>
                        <div className="flex h-14 items-end gap-1">
                          {[36, 52, 40, 68, 48, 88, 62].map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t-md ${i === 5 ? "bg-gradient-to-t from-indigo-600 to-violet-500 shadow-sm shadow-indigo-500/30" : "bg-indigo-100"}`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                        <div className="mt-1 flex justify-between text-[8px] font-medium text-neutral-400">
                          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                            <span key={i} className={i === 5 ? "font-bold text-indigo-600" : ""}>{d}</span>
                          ))}
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-slate-900 to-indigo-950 p-3 text-white shadow-lg">
                        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-400/20 blur-xl" aria-hidden />
                        <div className="relative text-[9px] font-semibold uppercase tracking-widest text-neutral-400">Next open slot</div>
                        <div className="relative mt-1 text-sm font-bold">Today · 3:30 PM</div>
                        <div className="relative mt-0.5 text-[10px] text-neutral-400">Visa Renewal · 30 min</div>
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
              title="Immigration Scheduling Software With"
              highlightText="Everything Your Practice Needs"
              description="GetSetTime is scheduling software built for immigration consultants, paralegals, and law firms — manage case types, consultants, and client bookings without manual admin."
              wrapperClassName="mx-auto max-w-4xl space-y-4 text-center"
              titleClassName="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl lg:text-[40px] capitalize"
            />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
              ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative bg-slate-50 py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0 hidden sm:block">
          <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto grid items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          {/* Left column — live preview of the client-facing booking page */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              {/* Header strip with radial progress */}
              <div className="relative z-10 flex items-center gap-3 border-b border-neutral-100 bg-gradient-to-r from-indigo-50/70 via-white to-violet-50/40 px-4 py-3 sm:px-5">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                  <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44" aria-hidden>
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#e0e7ff" strokeWidth="4" />
                    <circle cx="22" cy="22" r="18" fill="none" stroke="url(#progressGradient)" strokeWidth="4" strokeLinecap="round" strokeDasharray="113.1" strokeDashoffset="75.7" />
                    <defs>
                      <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute text-[10px] font-bold text-indigo-700">1/3</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-neutral-900">Immigration Partners</div>
                  <div className="text-[10px] font-medium text-indigo-500">Choosing a case type…</div>
                </div>
                <span className="hidden shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700 sm:flex">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>

              <div className="relative space-y-4 p-4 sm:p-5">
                {/* Case type — scrollable pill selector */}
                <div>
                  <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-neutral-500">
                    <span>Select a case type</span>
                    <span className="text-neutral-400">3 available</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {[
                      { short: "Green Card", selected: true, icon: "M9 12l2 2 4-4M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
                      { short: "Visa Renewal", selected: false, icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
                      { short: "Citizenship Prep", selected: false, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                      { short: "Asylum Case", selected: false, icon: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" },
                    ].map((c) => (
                      <span
                        key={c.short}
                        className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${
                          c.selected ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30" : "border border-neutral-200 text-neutral-500"
                        }`}
                      >
                        <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                        </svg>
                        {c.short}
              </span>
          ))}
        </div>

                  {/* Detail reveal for selected case type */}
                  <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-white p-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-bold text-neutral-900">Green Card Interview Prep</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-neutral-500">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[7px] font-bold text-white">SK</span>
                        Sarah Kim · 60 min
      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[9px] font-bold text-indigo-600 shadow-sm">$140</span>
                  </div>
                </div>

                {/* Date strip + time slots */}
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wide text-neutral-500">Pick a date &amp; time</div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {[
                      { wd: "Tue", day: 19, disabled: true },
                      { wd: "Wed", day: 20, disabled: false },
                      { wd: "Thu", day: 21, selected: true },
                      { wd: "Fri", day: 22, disabled: false },
                      { wd: "Sat", day: 23, disabled: true },
                      { wd: "Sun", day: 24, disabled: true },
                      { wd: "Mon", day: 25, disabled: false },
                    ].map((d) => (
                      <div
                        key={d.day}
                        className={`flex shrink-0 flex-col items-center gap-0.5 rounded-2xl px-3 py-2 transition ${
                          d.selected
                            ? "bg-gradient-to-b from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30"
                            : d.disabled
                            ? "text-neutral-300"
                            : "border border-neutral-100 text-neutral-600"
                        }`}
                      >
                        <span className="text-[8px] font-semibold uppercase opacity-80">{d.wd}</span>
                        <span className="text-sm font-bold">{d.day}</span>
          </div>
                    ))}
        </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-neutral-500">Available on Thu, Mar 21</span>
                    <span className="text-[9px] font-semibold text-emerald-600">3 open</span>
            </div>
                  <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {[
                      { t: "09:00", available: true },
                      { t: "09:40", available: true, selected: true },
                      { t: "11:00", available: true },
                      { t: "13:00", available: false },
                      { t: "15:30", available: true },
                    ].map((s) => (
                      <span
                        key={s.t}
                        className={`flex shrink-0 items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${
                          s.selected
                            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/30"
                            : s.available
                            ? "border border-neutral-200 text-neutral-700"
                            : "bg-neutral-50 text-neutral-300 line-through"
                        }`}
                      >
                        {s.selected && (
                          <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {s.t}
                      </span>
          ))}
        </div>
      </div>

                {/* Document upload */}
                <div className="flex items-center gap-2 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/40 p-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.9A5.5 5.5 0 0116.9 6.1 4.5 4.5 0 0118 15h-1M12 12v9m0-9l-3 3m3-3l3 3" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-neutral-900">passport_scan.pdf</div>
                    <div className="text-[9px] text-neutral-500">Uploaded · 2.4 MB</div>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  </div>
                </div>
            </div>
          </div>

          {/* Right column */}
          <div className="order-1 space-y-5 sm:space-y-6 lg:order-2">
            <Heading
              badge="How it works"
              title="From sign-up to first booking in"
              highlightText="under a day"
              description="From solo consultants to multi-office firms — set up case types once, then let clients self-schedule around the clock. This is exactly what your clients see when they book."
            />

            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-3 rounded-2xl border border-white bg-white/90 p-3 drop-shadow-md backdrop-blur transition hover:-translate-y-0.5 sm:gap-4 sm:p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-sm font-bold text-white shadow-md shadow-indigo-500/25">0{i + 1}</span>
                  <div>
                    <div className="font-semibold text-neutral-900">{step.title}</div>
                    <p className="mt-0.5 leading-relaxed text-neutral-600">{step.desc}</p>
              </div>
            </div>
          ))}
            </div>
        </div>
      </div>
    </section>

      {/* PROBLEMS */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef2ff_0%,#e0f2fe_55%,#f8fafc_100%)] py-10 sm:py-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
          <div className="absolute left-8 top-20 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />
          <div className="absolute bottom-12 right-12 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left — copy + impact pain cards */}
            <div className="space-y-6">
              <Heading
                badge="The real problem"
                title="Running a firm without scheduling software is"
                highlightText="costing you every week"
                description="When case calendars live in spreadsheets, email threads, and front-desk notebooks, consultants get double-booked, documents go missing, and clients stop showing up."
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Interrupted intake",
                    text: "Phone and email scheduling interrupts casework and slows down intake.",
                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    card: "from-rose-50 to-white border-rose-100",
                    iconColor: "text-rose-600",
                  },
                  {
                    title: "Double-booked desks",
                    text: "Manual calendars lead to double-booked consultants and missed document deadlines.",
                    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                    card: "from-amber-50 to-white border-amber-100",
                    iconColor: "text-amber-600",
                  },
                  {
                    title: "Empty consultation slots",
                    text: "No automated reminders means more no-shows and wasted consultation slots.",
                    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                    card: "from-violet-50 to-white border-violet-100",
                    iconColor: "text-violet-600",
                  },
                  {
                    title: "Blind caseload",
                    text: "Scattered spreadsheets make it hard to see caseload across consultants and offices.",
                    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                    card: "from-sky-50 to-white border-sky-100",
                    iconColor: "text-sky-600",
                  },
                ].map((item) => (
                  <div key={item.title} className={`group rounded-2xl border bg-gradient-to-br p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${item.card}`}>
                    <span className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ${item.iconColor}`}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </span>
                    <div className="text-sm font-bold text-neutral-900">{item.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — ops command center */}
            <div className="relative min-w-0">
              <div className="pointer-events-none absolute -inset-5 rounded-[32px] bg-gradient-to-br from-indigo-300/25 via-sky-200/20 to-violet-200/25 blur-2xl animate-aurora-drift" aria-hidden />

              <div className="relative flex overflow-hidden rounded-[24px] border border-white/60 bg-white/95 shadow-[0_28px_70px_-16px_rgba(79,70,229,0.24)] ring-1 ring-indigo-100/80 backdrop-blur-xl">
                {/* Mini sidebar rail */}
                <div className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r border-neutral-100 bg-gradient-to-b from-slate-50 to-white py-4 sm:flex">
                  <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-[9px] font-bold text-white shadow-md shadow-indigo-500/30">DI</span>
                  {[
                    { active: true, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
                    { active: false, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { active: false, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                    { active: false, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                  ].map((nav, i) => (
                    <span
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                        nav.active ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30" : "text-neutral-400"
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d={nav.d} />
                      </svg>
                    </span>
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-neutral-100 px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-neutral-900">Firm ops · Week view</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-neutral-500">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Live · Mar 17–21
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden rounded-lg border border-neutral-100 bg-white px-2 py-1 text-[10px] font-semibold text-neutral-600 sm:inline">Office A + B</span>
                      <span className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-2.5 py-1.5 text-center text-white shadow-md shadow-indigo-500/25">
                        <div className="text-[8px] font-semibold uppercase tracking-wide opacity-90">Show-up</div>
                        <div className="text-lg font-black leading-none">96%</div>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 p-3.5 sm:p-4">
                    {/* KPI strip */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "Today", value: "14", hint: "booked", accent: "text-indigo-600" },
                        { label: "Open", value: "3", hint: "slots", accent: "text-emerald-600" },
                        { label: "Conflicts", value: "0", hint: "cleared", accent: "text-sky-600" },
                        { label: "Docs due", value: "2", hint: "today", accent: "text-amber-600" },
                      ].map((kpi) => (
                        <div key={kpi.label} className="rounded-xl border border-neutral-100 bg-gradient-to-b from-white to-slate-50/80 px-2 py-2 text-center shadow-sm">
                          <div className="text-[8px] font-bold uppercase tracking-wide text-neutral-400">{kpi.label}</div>
                          <div className={`mt-0.5 text-lg font-black tabular-nums leading-none ${kpi.accent}`}>{kpi.value}</div>
                          <div className="mt-0.5 text-[8px] font-medium text-neutral-400">{kpi.hint}</div>
                        </div>
                      ))}
                    </div>

                    {/* Week schedule grid */}
                    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
                      <div className="grid grid-cols-5 border-b border-neutral-100 bg-slate-50/80">
                        {[
                          { d: "Mon", n: 17 },
                          { d: "Tue", n: 18 },
                          { d: "Wed", n: 19 },
                          { d: "Thu", n: 20, today: true },
                          { d: "Fri", n: 21 },
                        ].map((day) => (
                          <div key={day.n} className={`px-1.5 py-2 text-center ${day.today ? "bg-indigo-50/80" : ""}`}>
                            <div className={`text-[8px] font-semibold uppercase ${day.today ? "text-indigo-500" : "text-neutral-400"}`}>{day.d}</div>
                            <div className={`mx-auto mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${day.today ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30" : "text-neutral-700"}`}>
                              {day.n}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-5 gap-px bg-neutral-100 p-px">
                        {[
                          [{ t: "10:00", label: "Visa", c: "bg-amber-100 text-amber-800 border-amber-200" }],
                          [
                            { t: "09:00", label: "GC Prep", c: "bg-violet-100 text-violet-800 border-violet-200" },
                            { t: "14:00", label: "Citizen", c: "bg-emerald-100 text-emerald-800 border-emerald-200" },
                          ],
                          [{ t: "11:30", label: "Asylum", c: "bg-sky-100 text-sky-800 border-sky-200" }],
                          [
                            { t: "09:40", label: "GC Prep", c: "bg-violet-500 text-white border-violet-500", live: true },
                            { t: "13:00", label: "Visa", c: "bg-amber-100 text-amber-800 border-amber-200" },
                          ],
                          [
                            { t: "10:00", label: "Citizen", c: "bg-emerald-100 text-emerald-800 border-emerald-200" },
                            { t: "15:30", label: "Open", c: "border-dashed border-neutral-200 bg-white text-neutral-400" },
                          ],
                        ].map((col, ci) => (
                          <div key={ci} className="min-h-[88px] space-y-1 bg-white p-1.5">
                            {col.map((block) => (
                              <div
                                key={`${ci}-${block.t}`}
                                className={`rounded-lg border px-1.5 py-1 ${block.c} ${block.live ? "relative shadow-md shadow-violet-500/25" : ""}`}
                              >
                                {block.live && (
                                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white" />
                                )}
                                <div className="text-[8px] font-bold opacity-80">{block.t}</div>
                                <div className="truncate text-[9px] font-semibold leading-tight">{block.label}</div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom row: consultants + alert */}
                    <div className="grid gap-2.5 sm:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-2xl border border-neutral-100 bg-white p-2.5 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-wide text-neutral-400">Consultants</span>
                          <span className="text-[9px] font-semibold text-emerald-600">2 available</span>
                        </div>
                        <div className="flex gap-2">
                          {[
                            { initials: "SK", name: "Sarah", status: "Live", color: "from-violet-500 to-indigo-600", ring: "ring-violet-200" },
                            { initials: "JO", name: "James", status: "Free", color: "from-emerald-500 to-teal-600", ring: "ring-emerald-100" },
                            { initials: "MD", name: "Maria", status: "Busy", color: "from-indigo-500 to-sky-600", ring: "ring-indigo-100" },
                          ].map((c) => (
                            <div key={c.initials} className={`flex flex-1 flex-col items-center gap-1 rounded-xl border border-neutral-50 bg-slate-50/60 px-1.5 py-2 ring-1 ${c.ring}`}>
                              <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${c.color} text-[9px] font-bold text-white shadow-sm`}>
                                {c.initials}
                              </span>
                              <span className="text-[9px] font-bold text-neutral-800">{c.name}</span>
                              <span className={`text-[8px] font-semibold ${c.status === "Live" ? "text-violet-600" : c.status === "Free" ? "text-emerald-600" : "text-amber-600"}`}>
                                {c.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-slate-900 to-indigo-950 p-3 text-white shadow-lg">
                        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-400/20 blur-xl" aria-hidden />
                        <div className="relative">
                          <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-300">
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Conflict cleared
                          </div>
                          <div className="mt-1.5 text-xs font-bold leading-snug">Sarah &amp; James no longer overlap at 11:00</div>
                          <div className="mt-2 flex items-center justify-between text-[9px] text-neutral-400">
                            <span>Auto-resolved · 2m ago</span>
                            <span className="font-bold text-indigo-300">82% full</span>
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
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            {/* LEFT VISUAL */}
            <div className="relative flex">
              <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl bg-white p-3 drop-shadow-xl">
                <div className="relative flex-1 overflow-hidden rounded-xl">
                  <Image
                    src="/helps-your-practice-grow-faster.webp"
                    alt="Immigration case scheduling dashboard"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex h-full flex-col space-y-5">
              <Heading
                badge="Growth roadmap"
                title="Our Software Helps Your"
                highlightText="Practice Grow Faster"
                description="Most firms publish their first online booking page within an afternoon. Here is how teams typically roll out GetSetTime to grow their practice faster."
              />
              <div className="flex flex-1 flex-col justify-between space-y-3">
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
              title="Questions immigration firms ask about scheduling software"
              description="Clear answers for immigration consultants and law firms that want online case scheduling without adding admin work."
            />
            <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  iconWrapperClassName="flex h-8 w-8 items-center justify-center"
                  wrapperClassName="relative"
                />
              ))}
          </div>
        </div>
          <div className="min-w-0">
            <FaqSection items={faqItems} />
      </div>
    </div>
      </section>

      <SolutionCtaSection badge="Built for Immigration Consultants & Law Firms" businessType="Legal & Immigration Services" />
    </>
  );
}

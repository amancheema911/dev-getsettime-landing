import Heading from "@/app/component/Heading";
import Card from "@/app/component/Card";
import { CheckListItem } from "@/app/component/CheckList";
import Link from "next/link";
import Image from "next/image";
import { REGISTER_GOOGLE_URL, REGISTER_URL } from "@/lib/config";
import { FaqSection } from "@/app/component/FaqSection";
import SolutionCtaSection from "@/app/component/SolutionCtaSection";

export default function RealEstateAppointmentRedesign() {
const features = [
  {
    title: "Property viewing booking",
    description: "Let buyers and tenants book site visits, virtual tours, and office consultations without back-and-forth calls.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 21v-8a1 1 0 00-1-1h-4a1 1 0 00-1 1v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10a2 2 0 01.709-1.528l7-6a2 2 0 012.582 0l7 6A2 2 0 0121 10v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Lead routing",
    description: "Automatically assign inquiries by location, project, property type, or consultant availability.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Teams meeting booking",
    description: "Allow clients to book video consultations on Microsoft Teams for remote property discussions.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 10l6-3v10l-6-3" />
      </svg>
    ),
  },
  {
    title: "Multi-agent workspaces",
    description: "Manage multiple brokers, offices, and listings from one organized scheduling workspace.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const growthRoadmap = [
  {
    phase: "Week 1",
    title: "Move viewings online",
    detail: "Launch branded booking pages for site visits, rental tours, and Teams consultations. Share links on listings, WhatsApp, and your website.",
    metric: "2x faster lead response",
  },
  {
    phase: "Week 2",
    title: "Cut missed appointments",
    detail: "Turn on WhatsApp and email reminders so buyers confirm before each visit. Free cancelled slots for the next inquiry instantly.",
    metric: "Up to 40% fewer no-shows",
  },
  {
    phase: "Week 3+",
    title: "Scale your agent team",
    detail: "Route inquiries by location or project, sync agent calendars, and convert more viewings into follow-up consults.",
    metric: "Higher booking conversion",
  },
];

const steps = [
  {
    title: "Create branded booking pages",
    desc: "Set up pages for property tours, buyer consultations, rental meetings, or Teams-based demos.",
  },
  {
    title: "Connect your consultants",
    desc: "Sync calendars, add agents, define availability, and manage zones or property categories.",
  },
  {
    title: "Start capturing appointments",
    desc: "Share your booking link on property listings, WhatsApp, email campaigns, and your website.",
  },
];

const faqItems = [
  {
    title: "What is real-estate appointment booking software?",
    content: "It is a scheduling platform that lets buyers and tenants book property viewings, site visits, rental tours, and Teams consultations online — while agents manage availability, reminders, and follow-ups from one place.",
  },
  {
    title: "Can GetSetTime handle multiple agents and offices?",
    content: "Yes. You can add consultants, set individual availability, assign viewings by location or project, and keep every agent’s calendar synced without double-booking.",
  },
  {
    title: "Can clients book property viewings and Microsoft Teams calls?",
    content: "Yes. Create booking pages for in-person site visits, virtual tours, buyer consultations, and remote Teams meetings so clients can choose the format that works for them.",
  },
  {
    title: "How does it reduce missed viewings and no-shows?",
    content: "Automated WhatsApp and email reminders confirm appointments before each visit. Clients can also reschedule or cancel, freeing the slot for another buyer instantly.",
  },
  {
    title: "Is GetSetTime suitable for solo consultants and large agencies?",
    content: "Yes. Solo brokers can start with a free booking page, while growing teams and broker networks can scale with multi-agent workspaces, branding, and advanced scheduling tools.",
  },
];
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20">
          <div className="absolute inset-0 hidden sm:block">
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/3 -translate-y-1/2 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
                  {/* Left Side */}
                  <div className="space-y-6">
                      <Heading
                          badge="Built for modern real-estate teams"
                          title="Turn property inquiries into confirmed"
                          highlightText="viewings and Teams consultations"
                          description="GetSetTime helps real-estate consultants, brokers, and agencies automate booking for site visits, buyer calls, rental meetings, and remote property demos — all in one premium scheduling workflow."
                          headingTag="h1"
                          titleClassName="text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
                      />
      
                      <div className="flex gap-2 max-[425px]:flex-col flex-row flex-wrap">
                          <Link href={`${REGISTER_GOOGLE_URL}`} target="_blank" aria-label="Sign up with Google" className="bg-indigo-600 text-white text-xs sm:text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-3">
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
                          <Link href={`${REGISTER_URL}`} aria-label="Contact Us - Real Estate Appointment Booking Software" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-xs sm:text-sm text-white drop-shadow-lg transition">Get Started for Free</Link>
                      </div>
      

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4 0m4 0a4 4 0 014 4" />
                                    </svg>
                                </span>
                                <div>
                                    <div className="text-lg font-bold text-neutral-900">10,000+</div>
                                    <div className="text-xs font-semibold text-neutral-800">Appointments</div>
                                </div>
                            </div>
                            <div className="text-xs text-neutral-500">Booked across real-estate using GetSetTime</div>
                        </div>

                        <div className="rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <div className="text-lg font-bold text-neutral-900">3 hrs</div>
                                    <div className="text-xs font-semibold text-neutral-800">Time Saved</div>
                                </div>
                            </div>
                            <div className="text-xs text-neutral-500">Daily admin time back for your team</div>
                        </div>

                        <div className="rounded-2xl border border-neutral-100 bg-white p-3 drop-shadow-sm space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </span>
                                <div>
                                    <div className="text-lg font-bold text-neutral-900">4.8 ★</div>
                                    <div className="text-xs font-semibold text-neutral-800">Real Estate Rating</div>
                                </div>
                            </div>
                            <div className="text-xs text-neutral-500">Average feedback from buyers</div>
                        </div>
                      </div>
                  </div>
                  
                  {/* Right Side */}
                  <div className="relative">
                      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] animate-fade-in-scale">
                          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                            <Image
                              src="/real-estate.webp" 
                              alt="Real estate consultant working on a laptop" 
                              className="h-72 w-full object-cover" 
                              width={1200} 
                              height={720} 
                              loading="lazy" 
                            />
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                  <div>
                                      <div className="text-xs uppercase text-indigo-600">Live schedule</div>
                                      <div className="text-2xl font-bold text-neutral-900">Premium Property</div>
                                  </div>
                                </div>
            
                                <div className="mt-5 space-y-3">
                                {[
                                    ["10:00 AM", "Luxury apartment visit", "Confirmed", "bg-emerald-50 text-emerald-700"],
                                    ["12:30 PM", "Buyer consultation on Teams", "Reminder sent", "bg-amber-50 text-amber-700"],
                                    ["04:00 PM", "Site visit – Green Valley", "Agent assigned", "bg-sky-50 text-sky-700"],
                                ].map(([time, title, status, badgeClass]) => (
                                    <div key={time} className="flex items-center justify-between rounded-2xl bg-indigo-50/50 px-4 py-3">
                                      <div>
                                          <div className="text-sm font-semibold text-neutral-900">{time}</div>
                                          <div className="text-xs text-neutral-600">{title}</div>
                                      </div>
                                      <div className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}>{status}</div>
                                    </div>
                                ))}
                                </div>
                            </div>
                          </div>
          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                                <Image
                                src="/dashboard-real-estate.webp"
                                alt="Consultant in an online Teams-style property meeting"
                                className="h-44 w-full object-cover"
                                width={1200}
                                height={720}
                                loading="lazy"
                                />
                                <div className="p-5">
                                  <div className="text-xs uppercase text-indigo-600">Remote consultations</div>
                                  <div className="text-2xl font-bold text-neutral-900">Book property calls on Teams</div>
                                  <div className="text-neutral-600">Let clients schedule remote discussions, document reviews, and virtual walkthroughs.</div>
                                </div>
                            </div>
          
                            <div className="rounded-2xl bg-neutral-900 p-5 text-white shadow-xl">
                                <div className="text-xs uppercase text-indigo-300">Smart intake form</div>
                                <div className="mt-4 space-y-3">
                                {[
                                    "Property type",
                                    "Preferred date & time",
                                    "Budget range",
                                    "Meeting mode: In-person or Teams",
                                ].map((field) => (
                                    <div key={field} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/90">
                                    {field}
                                    </div>
                                ))}
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      {/* Features Section */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-b from-white to-indigo-50 overflow-hidden">
          <div className="absolute top-10 left-10 hidden sm:block w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 hidden sm:block w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
      
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
              <Heading 
                badge="Why teams choose GetSetTime"
                title="A scheduling system designed for" 
                highlightText="listings, viewings, and client meetings"
                description="Built for real-estate consultants who manage appointments across offices, projects, listings, and remote calls." 
                wrapperClassName="mx-auto max-w-4xl text-center space-y-4"
              />
              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {features.map((feature) => (
                      <Card key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
                  ))}
              </div>
          </div>
      </section>

      {/* How it works Section */}
      <section className="relative bg-slate-50 py-16">
        <div className="absolute inset-0 hidden sm:block">
            <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <div className="mx-auto grid relative container gap-10 px-6 lg:grid-cols-2 lg:px-8">
          
          {/* Left Side — professional agency scheduling preview */}
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white drop-shadow-2xl">
            {/* Window chrome */}
            <div className="relative z-10 flex items-center justify-between border-b border-neutral-200 px-3 py-3.5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                  <div className="absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full bg-red-400" />
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-600">Live</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 via-white to-sky-50/40 p-3 sm:p-4">
              {/* Agency header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative shrink-0">
                  <Image
                    src="/realestate-profile.webp"
                    alt="Property consultant profile"
                    className="h-12 w-12 rounded-full border-2 border-white object-cover ring-2 ring-slate-100 sm:h-14 sm:w-14"
                    width={56}
                    height={56}
                    loading="lazy"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500 sm:h-5 sm:w-5">
                    <svg className="h-2 w-2 text-white sm:h-2.5 sm:w-2.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Agency schedule</span>
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">Horizon Realty</span>
                  </div>
                  <div className="truncate text-base font-bold text-neutral-900 sm:text-lg">Kyle Grant</div>
                  <div className="truncate text-xs text-neutral-500">Lead consultant · West &amp; Central zone</div>
                </div>
              </div>

              {/* KPI strip */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Viewings", value: "12", hint: "confirmed", tone: "text-sky-700 bg-sky-50 border-sky-100" },
                  { label: "Show-up", value: "94%", hint: "this week", tone: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                  { label: "Open leads", value: "28", hint: "in pipeline", tone: "text-indigo-700 bg-indigo-50 border-indigo-100" },
                ].map((kpi) => (
                  <div key={kpi.label} className={`rounded-xl border px-2.5 py-2.5 ${kpi.tone}`}>
                    <div className="text-[10px] font-semibold uppercase tracking-wide opacity-80">{kpi.label}</div>
                    <div className="mt-0.5 text-lg font-bold leading-none text-neutral-900 sm:text-xl">{kpi.value}</div>
                    <div className="mt-1 text-[10px] font-medium text-neutral-500">{kpi.hint}</div>
                  </div>
                ))}
              </div>

              {/* Next viewing — property hero */}
              <div className="relative h-60 mt-3 overflow-hidden rounded-xl border border-slate-100 bg-slate-900">
                <Image
                  src="/real-estate-office-working.webp"
                  alt="Upcoming property site visit"
                  width={720}
                  height={250}
                  className="h-fit w-full object-cover opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                    Next viewing
                  </span>
                  <span className="rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold text-white">
                    In 18 min
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-white/70">10:30 AM · Gavin Spencer</div>
                      <div className="mt-0.5 truncate text-base font-semibold text-white sm:text-lg">Green Valley Residences</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-white/75">
                        <span>3 BHK site visit</span>
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        <span>Tower B · Floor 12</span>
                      </div>
                    </div>
                    <div className="hidden shrink-0 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 text-center backdrop-blur sm:block">
                      <div className="text-[10px] font-medium text-white/70">Agent</div>
                      <div className="text-xs font-semibold text-white">Kyle Grant</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today’s itinerary + slots */}
              <div className="mt-3 grid gap-3 sm:grid-cols-5">
                <div className="rounded-xl border border-slate-100 bg-white p-3 drop-shadow-sm sm:col-span-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-neutral-900">Today&apos;s itinerary</div>
                    <span className="text-[11px] font-medium text-sky-700">3 remaining</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      { time: "10:30", title: "Green Valley Residences", meta: "Site visit · Buyer", status: "Next", statusClass: "bg-sky-50 text-sky-700" },
                      { time: "12:30", title: "Buyer consult on Teams", meta: "Remote · Investment", status: "Reminder", statusClass: "bg-amber-50 text-amber-700" },
                      { time: "16:00", title: "Skyline Apartments tour", meta: "Rental · 2 BHK", status: "Assigned", statusClass: "bg-emerald-50 text-emerald-700" },
                    ].map((item) => (
                      <div key={item.time} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 px-2.5 py-2">
                        <div className="w-11 shrink-0 pt-0.5 text-center">
                          <div className="text-sm font-bold text-neutral-900">{item.time}</div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="truncate text-sm font-semibold text-neutral-900">{item.title}</div>
                            <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${item.statusClass}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="mt-0.5 truncate text-[11px] text-neutral-500">{item.meta}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-3 drop-shadow-sm sm:col-span-2">
                  <div className="text-sm font-semibold text-neutral-900">Availability</div>
                  <div className="mt-1 text-[11px] text-neutral-500">Shareable booking windows</div>
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    {[
                      { label: "11:00", open: false },
                      { label: "11:30", open: true },
                      { label: "13:00", open: true },
                      { label: "14:30", open: true },
                      { label: "15:00", open: false },
                      { label: "17:00", open: true },
                    ].map((slot) => (
                      <span
                        key={slot.label}
                        className={`rounded-lg px-2 py-1.5 text-center text-[11px] font-semibold ${
                          slot.open
                            ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border border-red-200 bg-red-50 text-red-700 line-through"
                        }`}
                      >
                        {slot.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">Active link</span>
                    </div>
                    <div className="mt-1 text-[11px] font-medium leading-snug text-neutral-700">
                      Shared on listings, WhatsApp &amp; website
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <Heading
              badge="How it works"
              title="Launch your real-estate booking flow in three simple steps"
              description="GetSetTime helps real-estate consultants, brokers, and agencies automate booking for site visits, buyer calls, rental meetings, and remote property demos — all in one premium scheduling workflow."
            />

            <div className="mt-6 space-y-3">
              {steps.map((step) => (
                  <div key={step.title} className="flex gap-4 rounded-xl bg-white p-5 drop-shadow-md hover:drop-shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="flex h-9 w-9 min-w-9 min-h-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white drop-shadow-lg drop-shadow-indigo-500/25"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 6 9 17l-5-5"/></svg></div>
                      <div>
                          <div className="font-medium text-neutral-900">{step.title}</div>
                          <p>{step.desc}</p>
                      </div>
                  </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl bg-white p-5 shadow-xl">
                <div className="text-xs uppercase text-indigo-600">Best for</div>
                <div className="mt-2 text-xl font-bold text-neutral-900">Property consultants</div>
                <p>Manage buyer calls, project visits, follow-ups, and document meetings from one place.</p>
              </div>
              
              <div className="relative rounded-2xl bg-indigo-50 p-5 shadow-xl">
                <div className="text-xs uppercase text-indigo-600">Includes</div>
                <div className="mt-2 text-xl font-bold text-neutral-900">Teams + calendar workflows</div>
                <p>Ideal for firms offering both office visits and remote advisory meetings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL ESTATE SCHEDULING CHALLENGES SECTION */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-[linear-gradient(180deg,#eef2ff_0%,#e0f2fe_55%,#f8fafc_100%)]">
        <div className="absolute inset-0 hidden sm:block bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_35%)]" />
        <div className="absolute -left-16 top-20 hidden sm:block h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
        <div className="absolute -right-14 bottom-16 hidden sm:block h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute left-1/2 top-0 hidden sm:block h-24 w-[60%] -translate-x-1/2 rounded-b-[48px] bg-white/35 blur-2xl" />
        
        <div className="relative mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Left */}
            <div className="space-y-4">
              <Heading
                badge="Real Estate Reality Check"
                title="One System For Before, During,"
                highlightText="And After Every Viewing"
                description="As inquiry volume grows, manual scheduling creates slow responses, missed site visits, and uneven agent workloads. A structured booking system helps your team convert more leads into confirmed viewings."
              />
              <div className="space-y-3">
                {[
                  "Slow replies to inquiries lose hot buyers before the first visit.",
                  "Overlapping site visits and agent conflicts waste valuable time.",
                  "Manual reminders increase no-shows on property tours.",
                  "WhatsApp, calls, and listing forms scatter requests across channels.",
                ].map((point) => (
                  <CheckListItem key={point} text={point} />
                ))}
              </div>

            </div>

            {/* Right */}
            <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-4 drop-shadow-2xl backdrop-blur sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">Today · May 16</div>
                  <div className="mt-1 text-lg font-bold text-neutral-900">Agency schedule</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <div className="relative mt-4 overflow-hidden rounded-2xl">
                <Image
                  src="/real-estate-working.webp"
                  alt="Real estate consultant scheduling property viewings"
                  width={700}
                  height={420}
                  className="h-44 w-full object-cover sm:h-52"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium text-white/70">Next up · 10:00 AM</div>
                      <div className="mt-0.5 text-base font-semibold text-white">Green Valley Residences</div>
                      <div className="mt-1 text-xs text-white/75">Site visit · Agent: Priya Mehta</div>
                    </div>
                    <span className="shrink-0 rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      In 18 min
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {/* Availability */}
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-neutral-900">Availability</div>
                    <span className="text-[11px] font-medium text-emerald-600">6 open</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {[
                      { time: "9:00 AM", open: true },
                      { time: "9:30 AM", open: true },
                      { time: "10:00 AM", open: false },
                      { time: "10:30 AM", open: false },
                      { time: "11:00 AM", open: true },
                      { time: "11:30 AM", open: true },
                      { time: "12:30 PM", open: true },
                      { time: "1:30 PM", open: true },
                      { time: "2:00 PM", open: true },
                      { time: "2:30 PM", open: true },
                      { time: "3:00 PM", open: true },
                      { time: "3:30 PM", open: false },
                      { time: "4:00 PM", open: false },
                    ].map((slot) => (
                      <span
                        key={slot.time}
                        className={`rounded-lg px-2 py-1.5 text-center text-sm font-medium ${
                          slot.open
                            ? "border border-emerald-200 bg-white text-emerald-700"
                            : "border border-red-200 bg-red-100 text-red-700 line-through"
                        }`}
                      >
                        {slot.time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bookings */}
                <div className="rounded-xl border border-neutral-100 bg-neutral-50/80 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-neutral-900">Bookings</div>
                    <span className="text-xs font-medium text-indigo-600">3 today</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      { time: "10:00 AM", title: "Green Valley Residences", status: "Confirmed", statusClass: "bg-emerald-50 text-emerald-700" },
                      { time: "12:30 PM", title: "Buyer consult on Teams", status: "Reminder sent", statusClass: "bg-amber-50 text-amber-700" },
                      { time: "04:00 PM", title: "Skyline Apartments tour", status: "Assigned", statusClass: "bg-sky-50 text-sky-700" },
                    ].map((item) => (
                      <div key={item.time} className="rounded-lg border border-neutral-100 bg-white px-2.5 py-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-sm font-bold text-neutral-900">{item.time}</div>
                          <span className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${item.statusClass}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="mt-1 truncate text-xs font-medium text-neutral-700">{item.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL ESTATE GROWTH ROADMAP SECTION */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-[linear-gradient(180deg,#eef2ff_0%,#f8fafc_45%,#ffffff_100%)]">
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
              <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
              <div className="absolute right-8 bottom-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
              <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
          </div>

          <div className="relative z-10 container mx-auto grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
              {/* LEFT CONTENT */}
              <div className="relative">
                  <div className="overflow-hidden rounded-2xl border border-white/80 bg-white p-2.5 drop-shadow-2xl sm:p-3">
                      <div className="relative overflow-hidden rounded-xl">
                        <Image
                          src="/real-estate-growth.webp"
                          alt="Real estate team coordinating property viewings"
                          width={600}
                          height={500}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Agency growth</div>
                          <div className="mt-1 text-lg font-bold text-white sm:text-xl">Confirm more viewings in 30 days</div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                          { label: "Viewings booked", value: "+48%" },
                          { label: "No-shows", value: "-40%" },
                          { label: "Lead response", value: "3x" },
                        ].map((stat) => (
                          <div key={stat.label} className="rounded-xl bg-indigo-50 px-2.5 py-3 text-center">
                            <div className="text-base font-bold text-indigo-700 sm:text-lg">{stat.value}</div>
                            <div className="mt-0.5 text-[10px] font-medium text-indigo-500 sm:text-[11px]">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                  </div>

                  <div className="absolute right-0 -top-10 hidden lg:block w-50 rounded-xl bg-white p-4 drop-shadow-md animate-float">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Weekly pipeline</div>
                      <div className="mt-1 text-sm font-bold text-neutral-900">Viewings confirmed</div>
                      <div className="mt-3 flex items-end gap-2">
                      <div className="h-5 w-3 rounded-full bg-indigo-200" />
                      <div className="h-8 w-3 rounded-full bg-indigo-300" />
                      <div className="h-12 w-3 rounded-full bg-violet-300" />
                      <div className="h-8 w-3 rounded-full bg-indigo-500" />
                      <div className="h-10 w-3 rounded-full bg-sky-400" />
                      <div className="h-14 w-3 rounded-full bg-violet-300" />
                      <div className="h-16 w-3 rounded-full bg-emerald-300" />
                      <div className="h-16 w-3 rounded-full bg-indigo-500" />
                      </div>
                  </div>

                  <div className="absolute -bottom-5 left-0 hidden max-w-[16rem] rounded-xl border border-indigo-100 bg-white p-3.5 drop-shadow-xl animate-float lg:block">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500">New viewing</div>
                      <div className="mt-1 text-sm font-bold text-neutral-900">Green Valley · 11:30 AM</div>
                      <div className="mt-0.5 text-xs text-neutral-600">Assigned to Priya Mehta · Reminder sent</div>
                  </div>
              </div>

              {/* RIGHT VISUAL */}
              <div className="space-y-5">
                  <Heading
                    badge="Growth Roadmap"
                    title="A Practical Plan To Grow Your"
                    highlightText="Agency In 30 Days"
                    description="Go from scattered WhatsApp requests to a clear viewing pipeline — with online booking, reminders, and agent coordination."
                  />

                  <div className="relative space-y-3">
                    <div className="absolute left-6 top-4 bottom-4 hidden w-px bg-indigo-100 sm:block" aria-hidden />
                    {growthRoadmap.map((point, i) => (
                      <div
                        key={point.phase}
                        className="relative overflow-hidden rounded-2xl border border-white bg-white/90 p-4 drop-shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-xl sm:p-5"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="relative z-10 flex h-12 w-12 min-h-12 min-w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white drop-shadow-lg drop-shadow-indigo-500/25">
                            <span className="font-bold">0{i + 1}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1.5 flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                                {point.phase}
                              </span>
                              <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                                {point.metric}
                              </span>
                            </div>
                            <div className="font-semibold text-neutral-900">{point.title}</div>
                            <p className="mt-1 text-sm leading-6 text-neutral-600">{point.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
          </div>
      </section>

      {/* FAQ SECTION */} 
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#f8fafc_100%)] py-14 sm:py-20">
          
          <div className="absolute inset-0 hidden sm:block pointer-events-none">
              <div className="absolute left-[-6rem] top-20 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
              <div className="absolute right-[-3rem] top-10 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
              <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
          </div>

          <div className="relative mx-auto grid container px-4 sm:px-6 lg:px-8 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
              {/* left: Title */}
              <div className="space-y-3">
                  <Heading
                    badge="Frequently Asked Questions"
                    title="Questions Real-Estate Teams Ask Before Getting Started"
                    description="GetSetTime is built for brokers, consultants, and agencies who want to convert property inquiries into confirmed viewings. Here are answers to the most common questions about our scheduling platform."
                  />
                  <div className="hidden sm:grid gap-4 sm:grid-cols-2 mt-6">
                      <Card title="Smart scheduling" description="Highlight automation, reminders, and live availability." icon={<svg className="h-8 w-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />

                      <Card title="Build trust" description="Reduce friction with short supportive answers and better clarity." icon={<svg className="h-7 w-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><path d="M8 15H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />
                      
                      <Card title="Premium feel" description="Matches polished hero and feature sections better than a plain list." icon={<svg className="h-8 w-8 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />
                      
                      <Card title="Easy growth" description="Scale bookings smoothly with structured workflows and clear next steps." icon={<svg fill="#00a63e" className="h-8 w-8" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enableBackground="new 0 0 512 512" stroke="#000000" strokeWidth="8.192"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="m266.1,237.1h-82.2c-6.2,0-10.4,5.2-10.4,10.4v243c0,6.3 5.2,10.4 10.4,10.4h82.2c5.2,0 10.4-4.2 10.4-10.4v-243c0-6.2-5.2-10.4-10.4-10.4zm-10.4,243h-61.4v-222.1h61.4v222.1z"></path> <path d="M103.7,272.6H21.5c-6.2,0-10.4,5.2-10.4,10.4v207.6c0,6.3,5.2,10.4,10.4,10.4h82.2c5.2,0,10.4-4.2,10.4-10.4V283 C114.1,276.7,108.9,272.6,103.7,272.6z M93.3,480.1H31.9V293.4h61.4V480.1z"></path> <path d="m499.2,157.8l-103-142.9c-4.2-5.2-12.5-5.2-16.6,0l-103,142.9c-4.2,5.9-2.6,15.6 8.3,15.6h51v317.1c0,6.3 5.2,10.4 10.4,10.4h82.2c5.2,0 10.4-4.2 11.4-10.4v-317h51c10.2,0 12.4-10.4 8.3-15.7zm-70.8-5.2c-6.2,0-10.4,5.2-10.4,10.4v317.1h-61.4-1v-317.1c0-6.3-5.2-10.4-10.4-10.4h-41.6l83.2-114.7 83.2,114.7h-41.6z"></path> </g> </g> </g></svg>} iconWrapperClassName = "flex h-8 w-8 items-center justify-center" wrapperClassName = "relative" />
                  </div>
              </div>
              {/* right: FAQ Section */}
              <div>
                  <FaqSection items={faqItems} />
              </div>
          </div>
      </section>

      {/* Call-to-Action Section */}
      <SolutionCtaSection
        badge="Built for Real Estate"
        businessType="Real Estate"
    />
    </>
  );
}  
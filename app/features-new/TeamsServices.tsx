"use client";
import { useState, type ReactNode } from "react";
type ServiceId = "health-consultation" | "follow-up-review";
type ProviderId = "maya" | "liam" | "priya" | "noah";
type SchedulingMode = "team" | "round-robin" | "collective" | "locations";

type Service = {
  id: ServiceId;
  title: string;
  duration: string;
};

type Provider = {
  id: ProviderId;
  name: string;
  initials: string;
  role: string;
  badge: string;
  avatarClass: string;
};

type Mode = {
  label: string;
  badge: string;
  location: string;
  helper: string;
  title: string;
  description: string;
};

const services: readonly Service[] = [
  { id: "health-consultation", title: "Health Consultation", duration: "60 mins" },
  { id: "follow-up-review", title: "Follow-up Care Review", duration: "30 mins" },
];

const providers: readonly Provider[] = [
  {
    id: "maya",
    name: "Dr. Maya Lin",
    initials: "ML",
    role: "General & Preventive Care • Clinic A",
    badge: "Available today",
    avatarClass: "bg-violet-100 text-violet-700",
  },
  {
    id: "liam",
    name: "Liam Carter",
    initials: "LC",
    role: "Sports & Mobility Specialist • Clinic B",
    badge: "2 slots open",
    avatarClass: "bg-teal-100 text-teal-700",
  },
  {
    id: "priya",
    name: "Dr. Priya Nair",
    initials: "PN",
    role: "Internal Medicine • Westside Hub",
    badge: "Morning slots",
    avatarClass: "bg-amber-100 text-amber-700",
  },
  {
    id: "noah",
    name: "Noah Bennett",
    initials: "NB",
    role: "Wellness & Nutrition • North Studio",
    badge: "Fastest booking",
    avatarClass: "bg-pink-100 text-pink-700",
  },
];

const timeSlots = ["8:30 am", "9:30 am", "10:00 am", "11:30 am"] as const;

const modes: Record<SchedulingMode, Mode> = {
  team: {
    label: "Explore team scheduling",
    badge: "Team Scheduling",
    location: "Downtown Clinic",
    helper: "Share one booking flow while each member keeps separate availability.",
    title: "Team scheduling active in preview",
    description:
      "Clients choose a specific specialist while every team member keeps individual working hours, services, and calendar availability.",
  },
  "round-robin": {
    label: "Round robin",
    badge: "Round Robin",
    location: "Auto-assigned",
    helper: "Distribute incoming sessions evenly across available team members.",
    title: "Round-robin distribution enabled",
    description:
      "The next eligible provider with an open slot receives the booking, helping the team maintain a balanced workload.",
  },
  collective: {
    label: "Collective scheduling",
    badge: "Collective Scheduling",
    location: "Panel Session",
    helper: "Find times when several team members are simultaneously free.",
    title: "Collective availability mode",
    description:
      "The booking page offers only the times when every required provider is available for a joint appointment.",
  },
  locations: {
    label: "Multiple locations",
    badge: "Multiple Locations",
    location: "4 clinics & studios",
    helper: "Route bookings to the correct branch, room, or regional team.",
    title: "Multi-location routing previewed",
    description:
      "Map services and providers to specific branches, rooms, capacities, and local working hours from one workspace.",
  },
};

export default function TeamsServices() {
  const [serviceId, setServiceId] = useState<ServiceId>("health-consultation");
  const [providerId, setProviderId] = useState<ProviderId>("maya");
  const [timeSlot, setTimeSlot] = useState<(typeof timeSlots)[number]>("9:30 am");
  const [modeId, setModeId] = useState<SchedulingMode>("team");
  const [showAllServices, setShowAllServices] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const service = services.find((item) => item.id === serviceId) ?? services[0];
  const provider = providers.find((item) => item.id === providerId) ?? providers[0];
  const mode = modes[modeId];
  const visibleServices = showAllServices ? services : services.filter((item) => item.id === serviceId);

  function resetDemo() {
    setServiceId("health-consultation");
    setProviderId("maya");
    setTimeSlot("9:30 am");
    setModeId("team");
    setShowAllServices(false);
    setConfirmed(false);
  }

  function updateSelection(callback: () => void) {
    callback();
    setConfirmed(false);
  }

  return (
    <section aria-labelledby="teams-services-heading" className="relative w-full overflow-hidden bg-white py-14 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[420px] -translate-y-1/2 bg-gradient-to-r from-purple-50/40 via-transparent to-amber-50/35 blur-3xl" />

      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">         
          <div className="w-full lg:col-span-6">
            <div className="mx-auto max-w-xl lg:mx-0">
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200/60 bg-[#DDF7EE] text-[#0F7657] shadow-sm">
                <TeamIcon />
              </div>

              <h2 id="teams-services-heading" className="text-3xl leading-[1.14] font-bold tracking-[-0.025em] text-[#11131A] sm:text-4xl lg:text-[42px]">
                Teams, services &amp; locations
              </h2>
              <p className="mt-4 text-base leading-[1.65] text-slate-600 sm:text-[17px]">
                Share one booking flow while each member keeps separate availability, service assignments, and locations.
              </p>

              <nav aria-label="Scheduling capabilities" className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {(Object.keys(modes) as SchedulingMode[]).map((id) => {
                  const active = id === modeId;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => updateSelection(() => setModeId(id))}
                      className={`group -mx-3.5 inline-flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold text-[#6D4AFF] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4AFF]/40 sm:mx-0 sm:justify-start sm:text-[15px] ${
                        active ? "bg-[#F3EFFF]/80" : "hover:bg-[#F3EFFF]/70"
                      }`}
                    >
                      <span>{modes[id].label}</span>
                      <span className={`transition-transform group-hover:translate-x-1 ${active ? "translate-x-1" : ""}`} aria-hidden>→</span>
                    </button>
                  );
                })}
              </nav>

              <div key={modeId} className="animate-fade-in mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 text-xs text-slate-600 sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6D4AFF]/10 text-xs font-bold text-[#6D4AFF]">i</span>
                  <div>
                    <p className="font-semibold text-[#11131A]">{mode.title}</p>
                    <p className="mt-0.5 leading-relaxed">{mode.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:col-span-6">
            <div className="relative rounded-3xl border border-purple-100/80 bg-[radial-gradient(circle_at_12%_10%,rgba(167,139,250,0.34)_0%,transparent_52%),radial-gradient(circle_at_88%_86%,rgba(251,191,146,0.36)_0%,transparent_54%),linear-gradient(145deg,#F6F3FF_0%,#FAF8FF_52%,#FFF5EE_100%)] p-4 shadow-sm sm:p-7 md:p-9">
              <div className="mb-4 flex items-center justify-between gap-2 px-1">
                <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-purple-100 bg-white/85 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#6D4AFF]" />
                  <span className="truncate">{mode.badge}</span>
                  <span className="text-slate-300">•</span>
                  <span className="hidden truncate text-slate-400 sm:inline">{mode.location}</span>
                </div>
                <button
                  type="button"
                  onClick={resetDemo}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:text-[#6D4AFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4AFF]/40"
                  title="Reset selection to defaults"
                >
                  Reset
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-100/90 bg-white shadow-[0_24px_60px_-15px_rgba(24,24,46,0.12),0_4px_16px_-4px_rgba(24,24,46,0.05)]">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#6D4AFF] via-purple-500 to-indigo-400" />

                <div className="p-5 sm:p-7">
                  <div className="mb-5 border-b border-slate-100 pb-4 text-center">
                    <h2 className="text-base font-semibold tracking-tight text-[#11131A] sm:text-lg">Book a Session</h2>
                    <p className="mt-1 text-xs text-slate-400">{mode.helper}</p>
                  </div>

                  <div className="relative space-y-6">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute top-3 bottom-5 left-[7px] w-px bg-gradient-to-b from-violet-400 via-violet-200 to-slate-200"
                    />

                    <BookingStep title="Select a service" aside="Click to switch">
                      <div className="space-y-2" role="radiogroup" aria-label="Select a service">
                        {visibleServices.map((item) => {
                          const selected = item.id === serviceId;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => updateSelection(() => setServiceId(item.id))}
                              className={`flex w-full items-center justify-center gap-2.5 rounded-xl border px-4 py-3.5 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4AFF]/40 ${
                                selected
                                  ? "border-[#D8CEFF] bg-[#F3EFFF]/85 shadow-sm"
                                  : "border-slate-200/90 bg-white hover:border-[#D8CEFF] hover:bg-[#F3EFFF]/35"
                              }`}
                            >
                              <span className="text-xs font-medium text-[#11131A] sm:text-sm">{item.title}</span>
                              <span className="font-light text-slate-300" aria-hidden>|</span>
                              <span className={`text-xs font-medium sm:text-sm ${selected ? "text-[#6D4AFF]" : "text-slate-600"}`}>
                                {item.duration}
                              </span>
                            </button>
                          );
                        })}
                        <div className="flex justify-end pt-0.5">
                          <button
                            type="button"
                            onClick={() => setShowAllServices((current) => !current)}
                            className="text-[11px] font-medium text-slate-400 transition-colors hover:text-[#6D4AFF]"
                          >
                            {showAllServices ? "Show compact view" : "+ Switch service"}
                          </button>
                        </div>
                      </div>
                    </BookingStep>

                    <BookingStep title="Choose your provider" aside={provider.name}>
                      <div className="rounded-xl border border-slate-200/85 bg-slate-50/50 p-3">
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5" role="radiogroup" aria-label="Choose your provider">
                          {providers.map((item) => {
                            const selected = item.id === providerId;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                aria-label={item.name}
                                title={`${item.name} — ${item.role}`}
                                onClick={() => updateSelection(() => setProviderId(item.id))}
                                className={`relative rounded-full p-0.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4AFF]/50 ${
                                  selected
                                    ? "scale-105 bg-[#F3EFFF] ring-2 ring-[#6D4AFF] shadow-sm"
                                    : "opacity-85 ring-1 ring-slate-200 hover:opacity-100 hover:ring-[#6D4AFF]/60"
                                }`}
                              >
                                <span className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold sm:h-11 sm:w-11 ${item.avatarClass}`}>
                                  {item.initials}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-slate-600">
                          <span>{provider.role}</span>
                          <span className="shrink-0 font-medium text-emerald-600">● {provider.badge}</span>
                        </p>
                      </div>
                    </BookingStep>

                    <BookingStep title="Pick a time" aside={`${timeSlot} selected`}>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Pick a time">
                        {timeSlots.map((slot) => {
                          const selected = slot === timeSlot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => updateSelection(() => setTimeSlot(slot))}
                              className={`rounded-xl border px-2.5 py-2 text-center text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4AFF]/40 ${
                                selected
                                  ? "border-[#D8CEFF] bg-[#F3EFFF] font-semibold text-[#6D4AFF] shadow-sm"
                                  : "border-slate-200/90 bg-white text-slate-600 hover:border-[#D8CEFF] hover:text-[#11131A]"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </BookingStep>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className={`text-xs leading-relaxed ${confirmed ? "font-medium text-emerald-700" : "text-slate-600"}`} role="status" aria-live="polite">
                      {confirmed ? "✓ Slot reserved: " : "Ready: "}
                      <strong className="font-semibold text-[#11131A]">
                        {service.title} ({service.duration}) with {provider.name} at {timeSlot}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConfirmed(true)}
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#6D4AFF] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_25px_-5px_rgba(109,74,255,0.25)] transition hover:bg-[#5B38F5] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4AFF]/50 focus-visible:ring-offset-1"
                    >
                      Confirm slot <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingStep({
  title,
  aside,
  children,
}: {
  title: string;
  aside: string;
  children: ReactNode;
}) {
  return (
    <div className="relative pl-7">
      <span aria-hidden className="absolute top-1 left-0 h-3.5 w-3.5 rounded-full bg-[#6D4AFF] ring-4 ring-[#F3EFFF]" />
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#11131A] sm:text-sm">{title}</span>
        <span className="text-right text-[11px] font-medium text-slate-400">{aside}</span>
      </div>
      {children}
    </div>
  );
}

function TeamIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

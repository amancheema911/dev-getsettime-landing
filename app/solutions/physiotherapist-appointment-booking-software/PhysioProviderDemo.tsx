"use client";

import { useState } from "react";

const SERVICES = [
  "Sports Injury Rehabilitation",
  "General Consultation",
  "Back Pain Therapy",
] as const;

type ServiceName = (typeof SERVICES)[number];

const THERAPISTS = [
  {
    id: "sarah",
    name: "Dr. Sarah",
    initial: "S",
    services: ["Sports Injury Rehabilitation", "General Consultation"] as ServiceName[],
  },
  {
    id: "james",
    name: "Dr. James",
    initial: "J",
    services: ["Sports Injury Rehabilitation", "Back Pain Therapy"] as ServiceName[],
  },
  {
    id: "michael",
    name: "Dr. Michael",
    initial: "M",
    services: ["General Consultation"] as ServiceName[],
  },
] as const;

function assignedLabel(services: readonly ServiceName[]) {
  if (services.length === 1 && services[0] === "General Consultation") return "General Consultation only";
  return services.join(", ");
}

function expectedResult(names: string[]) {
  if (names.length === 0) return "No therapist is assigned to this service.";
  if (names.length === 1) return `Only ${names[0]} appears in customer booking.`;
  const last = names[names.length - 1];
  return `Only ${names.slice(0, -1).join(", ")} and ${last} appear in customer booking.`;
}

export default function PhysioProviderDemo() {
  const [service, setService] = useState<ServiceName>("Sports Injury Rehabilitation");
  const eligible = THERAPISTS.filter((therapist) => therapist.services.includes(service));

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white shadow-xl shadow-indigo-500/10">
      <div className="overflow-hidden rounded-2xl bg-white text-neutral-900">
        <div className="border-b border-neutral-100 p-3">
          <div className="overflow-hidden rounded-2xl border border-neutral-200">
            <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] gap-3 border-b border-neutral-200 bg-neutral-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
              <span>Therapist</span>
              <span>Assigned services</span>
            </div>
            <ul>
              {THERAPISTS.map((therapist) => {
                const isEligible = therapist.services.includes(service);
                return (
                  <li key={therapist.id} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] items-center gap-3 border-b border-neutral-100 px-3 py-3 last:border-b-0">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{therapist.name}</div>
                      <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${isEligible ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                        {isEligible ? "Eligible" : "Excluded"}
                      </span>
                    </div>
                    <p className="text-xs leading-snug text-neutral-600">{assignedLabel(therapist.services)}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="bg-neutral-50/70 px-4 py-4 sm:px-5">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Customer selects</div>
          <div className="mt-2 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Service the customer selects">
            {SERVICES.map((item) => {
              const selected = item === service;
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setService(item)}
                  className={`rounded-full px-3 py-1.5 text-left text-xs font-semibold transition ${selected ? "bg-neutral-900 text-white" : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:bg-neutral-100"}`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Available therapists</p>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              {eligible.length} {eligible.length === 1 ? "result" : "results"}
            </span>
          </div>

          <ul className="mt-2">
            {THERAPISTS.map((therapist) => {
              const isEligible = therapist.services.includes(service);
              return (
                <li key={therapist.id} className="flex items-center gap-3 border-t border-neutral-200 py-2.5">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isEligible ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-400"}`} aria-hidden>
                    {therapist.initial}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={`truncate text-sm font-semibold ${isEligible ? "text-neutral-900" : "text-neutral-400"}`}>{therapist.name}</div>
                    <div className={`truncate text-xs ${isEligible ? "text-neutral-500" : "text-rose-500"}`}>
                      {isEligible ? service : "Not eligible for this service"}
                    </div>
                  </div>
                  {isEligible ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600" aria-label="Shown in booking">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.2 7.2a1 1 0 01-1.4 0L3.3 9.1a1 1 0 011.4-1.4l3.1 3.1 6.5-6.5a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
                    </span>
                  ) : (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-500" aria-label="Hidden from booking">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path fillRule="evenodd" d="M5.3 5.3a1 1 0 011.4 0L10 8.6l3.3-3.3a1 1 0 111.4 1.4L11.4 10l3.3 3.3a1 1 0 01-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 01-1.4-1.4L8.6 10 5.3 6.7a1 1 0 010-1.4z" clipRule="evenodd" /></svg>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-3 text-sm font-medium text-emerald-700">
            Expected result: {expectedResult(eligible.map((therapist) => therapist.name))}
          </div>
        </div>
      </div>
    </div>
  );
}

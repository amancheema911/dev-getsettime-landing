"use client";

import { useMemo, useState } from "react";
import {
  PHYSIO_FREQUENCIES,
  PHYSIO_SESSION_PRESETS,
  PHYSIO_WEEKDAYS,
  buildPhysioSessions,
  formatPhysioSessionDate,
  type PhysioFrequency,
  type PhysioSessionPreset,
  type PhysioWeekday,
} from "@/lib/physio-recurrence";

const PROVIDERS = ["Lead physiotherapist", "Associate physiotherapist"] as const;
const FREQUENCY_LABEL: Record<PhysioFrequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

function PackageRing({ value, selected }: { value: number; selected: boolean }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const filled = (value / 12) * circumference;
  return (
    <svg viewBox="0 0 48 48" className="mx-auto h-12 w-12" aria-hidden>
      <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke={selected ? "#ffffff" : "#a5b4fc"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference - filled}`}
        transform="rotate(-90 24 24)"
      />
      <text x="24" y="27" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">{value}</text>
    </svg>
  );
}

export default function PhysioRecurringDemo() {
  const [preset, setPreset] = useState<PhysioSessionPreset>(8);
  const [frequency, setFrequency] = useState<PhysioFrequency>("weekly");
  const [weekday, setWeekday] = useState<PhysioWeekday>("mon");
  const [startDate, setStartDate] = useState("2026-11-23");
  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]>(PROVIDERS[0]);

  const sessions = useMemo(
    () => buildPhysioSessions({
      preset,
      frequency,
      startDate,
      weekdays: [weekday],
      provider,
    }),
    [preset, frequency, startDate, weekday, provider],
  );

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-3 text-white shadow-2xl shadow-indigo-950/30 sm:p-4">
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 left-6 h-36 w-36 rounded-full bg-violet-500/20 blur-3xl" aria-hidden />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200">Treatment series</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{preset}-session {FREQUENCY_LABEL[frequency].toLowerCase()} plan</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Same time
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {PHYSIO_SESSION_PRESETS.map((option) => {
            const selected = preset === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setPreset(option)}
                className={`rounded-2xl px-2 py-3 text-center transition ${selected ? "bg-indigo-500 shadow-lg shadow-indigo-900/40" : "bg-white/10 ring-1 ring-white/10 hover:bg-white/15"}`}
              >
                <PackageRing value={option} selected={selected} />
                <span className={`mt-1 block text-[11px] font-semibold ${selected ? "text-indigo-100" : "text-slate-300"}`}>sessions</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-[22px] bg-white p-3 text-neutral-900 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex rounded-full bg-slate-100 p-1" role="group" aria-label="Frequency">
              {PHYSIO_FREQUENCIES.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={frequency === option}
                  onClick={() => setFrequency(option)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${frequency === option ? "bg-slate-950 text-white" : "text-slate-500"}`}
                >
                  {FREQUENCY_LABEL[option]}
                </button>
              ))}
            </div>
            <span className="text-xs font-medium text-slate-500">10:00 AM</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {frequency === "weekly" ? (
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Weekday
                <select
                  value={weekday}
                  onChange={(event) => setWeekday(event.target.value as PhysioWeekday)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm font-semibold normal-case tracking-normal text-slate-900"
                >
                  {PHYSIO_WEEKDAYS.map((day) => (
                    <option key={day.value} value={day.value}>{day.label}</option>
                  ))}
                </select>
              </label>
            ) : (
              <div className="flex items-end rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-800">
                {frequency === "daily" ? "Every next day" : "Same day each month"}
              </div>
            )}
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Starts
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm font-semibold normal-case tracking-normal text-slate-900"
              />
            </label>
          </div>

          <ol className="mt-2 max-h-36 space-y-1.5 overflow-y-auto">
            {sessions.map((session) => (
              <li key={session.index} className="flex items-center gap-2 rounded-xl px-1 py-1">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-700">{session.index}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">{formatPhysioSessionDate(session.date)}</span>
                <span className="text-xs font-medium text-slate-500">{session.time}</span>
              </li>
            ))}
          </ol>

          <label className="mt-2 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 px-2.5 py-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 text-xs font-bold text-white">PT</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Physiotherapist on every visit</span>
              <select
                value={provider}
                onChange={(event) => setProvider(event.target.value as (typeof PROVIDERS)[number])}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
              >
                {PROVIDERS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

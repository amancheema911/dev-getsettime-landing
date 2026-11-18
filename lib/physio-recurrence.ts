/** Session lengths the live app accepts as `session_preset`. */
export const PHYSIO_SESSION_PRESETS = [4, 8, 12] as const;

/** Frequencies the live app offers. Biweekly is stored as weekly, so it is not listed. */
export const PHYSIO_FREQUENCIES = ["daily", "weekly", "monthly"] as const;

export const PHYSIO_WEEKDAYS = [
  { value: "sun", label: "Sunday" },
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
] as const;

export type PhysioSessionPreset = (typeof PHYSIO_SESSION_PRESETS)[number];
export type PhysioFrequency = (typeof PHYSIO_FREQUENCIES)[number];
export type PhysioWeekday = (typeof PHYSIO_WEEKDAYS)[number]["value"];

const WEEKDAY_INDEX: Record<PhysioWeekday, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export type PhysioSession = {
  index: number;
  date: string;
  time: string;
  provider: string;
};

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function formatIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  return formatIso(new Date(year, month - 1, day + days));
}

function weekdayOf(iso: string): PhysioWeekday {
  const [year, month, day] = iso.split("-").map(Number);
  return PHYSIO_WEEKDAYS[new Date(year, month - 1, day).getDay()].value;
}

function matchesWeekday(iso: string, weekdays: readonly PhysioWeekday[]) {
  return weekdays.length > 0 && weekdays.includes(weekdayOf(iso));
}

/** Next occurrence, matching the live app's daily / weekly / monthly step. */
export function nextPhysioSessionDate(
  iso: string,
  frequency: PhysioFrequency,
  weekdays: readonly PhysioWeekday[],
) {
  if (frequency === "daily") return addDays(iso, 1);
  if (frequency === "monthly") {
    const [year, month, day] = iso.split("-").map(Number);
    const lastDayOfNextMonth = new Date(year, month - 1 + 2, 0).getDate();
    return formatIso(new Date(year, month, Math.min(day, lastDayOfNextMonth)));
  }
  let cursor = addDays(iso, 1);
  for (let step = 0; step < 7; step += 1) {
    if (matchesWeekday(cursor, weekdays)) return cursor;
    cursor = addDays(cursor, 1);
  }
  return addDays(iso, 7);
}

function firstWeeklyDate(iso: string, weekdays: readonly PhysioWeekday[]) {
  let cursor = iso;
  for (let step = 0; step < 7; step += 1) {
    if (matchesWeekday(cursor, weekdays)) return cursor;
    cursor = addDays(cursor, 1);
  }
  return iso;
}

export function buildPhysioSessions(input: {
  preset: PhysioSessionPreset;
  frequency: PhysioFrequency;
  startDate: string;
  weekdays: readonly PhysioWeekday[];
  provider: string;
  time?: string;
}): PhysioSession[] {
  if (!PHYSIO_SESSION_PRESETS.includes(input.preset) || !isIsoDate(input.startDate)) return [];
  const time = input.time ?? "10:00 AM";
  let cursor = input.frequency === "weekly"
    ? firstWeeklyDate(input.startDate, input.weekdays)
    : input.startDate;
  const sessions: PhysioSession[] = [];
  for (let index = 0; index < input.preset; index += 1) {
    sessions.push({
      index: index + 1,
      date: cursor,
      time,
      provider: input.provider,
    });
    cursor = nextPhysioSessionDate(cursor, input.frequency, input.weekdays);
  }
  return sessions;
}

export function formatPhysioSessionDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

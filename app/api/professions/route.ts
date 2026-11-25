import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type PublicProfession = {
  id: string;
  name: string;
};

function record(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function amount(value: unknown) {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(number) ? number : 0;
}

const LIST_KEYS = ["professions", "data", "items", "results", "records"] as const;

function listFrom(value: unknown, depth = 0): unknown[] {
  if (Array.isArray(value)) return value;
  if (depth > 3) return [];
  const root = record(value);
  if (!root) return [];

  for (const key of LIST_KEYS) {
    if (!(key in root)) continue;
    const nested = root[key];
    if (Array.isArray(nested)) return nested;
    const found = listFrom(nested, depth + 1);
    if (found.length) return found;
  }

  return [];
}

function inactive(row: Record<string, unknown>) {
  if (row.is_active === false || row.active === false || row.enabled === false) return true;
  const status = text(row.status).toLowerCase();
  return status === "inactive" || status === "disabled" || status === "archived";
}

function professionName(row: Record<string, unknown>) {
  return (
    text(row.name) ||
    text(row.title) ||
    text(row.label) ||
    text(row.profession) ||
    text(row.profession_name)
  );
}

function normalizeProfessions(payload: unknown): PublicProfession[] {
  const rows = listFrom(payload)
    .map((item, index) => {
      if (typeof item === "string") {
        const name = item.trim();
        return name ? { id: name, name, order: index } : null;
      }

      const row = record(item);
      if (!row || inactive(row)) return null;

      const name = professionName(row);
      if (!name) return null;

      const id = text(row.id) || text(row.slug) || name;
      const order = amount(row.display_order ?? row.sort_order ?? row.order ?? index);
      return { id, name, order };
    })
    .filter((item): item is { id: string; name: string; order: number } => item !== null)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

  const seen = new Set<string>();
  const professions: PublicProfession[] = [];

  for (const row of rows) {
    const key = row.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    professions.push({ id: row.id, name: row.name });
  }

  return professions;
}

function requestOrigin(req: Request) {
  const origin = req.headers.get("origin")?.trim();
  if (origin) return origin;
  return process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, "") ?? "";
}

async function loadPublicProfessions(origin: string): Promise<PublicProfession[] | null> {
  const apiUrl = process.env.PROFESSIONS_API_URL?.trim();
  const token = process.env.BEARER_TOKEN_API_KEY?.trim();
  if (!apiUrl || !token) return null;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    ...(origin ? { Origin: origin } : {}),
  };

  let response = await fetch(apiUrl, {
    method: "GET",
    cache: "no-store",
    headers,
  });

  if (response.status === 404 || response.status === 405) {
    response = await fetch(apiUrl, {
      method: "POST",
      cache: "no-store",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
  }

  if (!response.ok) return null;

  const payload = (await response.json().catch(() => null)) as unknown;
  const professions = normalizeProfessions(payload);
  return professions.length ? professions : null;
}

export async function GET(req: Request) {
  try {
    const professions = await loadPublicProfessions(requestOrigin(req));
    if (!professions) {
      return NextResponse.json({ success: false, error: "Failed to load professions." }, { status: 502 });
    }

    return NextResponse.json({ success: true, professions });
  } catch (error) {
    console.error("Professions API error:", error);
    return NextResponse.json({ success: false, error: "Failed to load professions." }, { status: 502 });
  }
}

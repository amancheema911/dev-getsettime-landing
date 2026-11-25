import { isValidCurrencyCode } from "@/utils/currency";
import { normalizePlans, type PublicPlans } from "@/lib/public-plans";

function requestOrigin(origin?: string | null) {
  const explicit = origin?.trim();
  if (explicit) return explicit;
  return process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, "") ?? "";
}

/** Loads plans for one ISO currency. `priceCurrency` is sent to PLANS_API_URL and selects the returned amounts. */
export async function loadPublicPlans(priceCurrency: string, origin?: string | null): Promise<PublicPlans | null> {
  const currency = priceCurrency.trim().toUpperCase();
  if (!isValidCurrencyCode(currency)) return null;

  const apiUrl = process.env.PLANS_API_URL?.trim();
  const token = process.env.BEARER_TOKEN_API_KEY?.trim();
  if (!apiUrl || !token) return null;

  const upstream = new URL(apiUrl);
  upstream.searchParams.set("priceCurrency", currency);
  const siteOrigin = requestOrigin(origin);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(siteOrigin ? { Origin: siteOrigin } : {}),
  };

  let response = await fetch(upstream, {
    method: "POST",
    cache: "no-store",
    headers,
    body: JSON.stringify({ priceCurrency: currency }),
  });

  if (response.status === 404 || response.status === 405) {
    response = await fetch(upstream, {
      method: "GET",
      cache: "no-store",
      headers,
    });
  }

  if (!response.ok) return null;
  const payload = (await response.json().catch(() => null)) as unknown;
  return normalizePlans(payload, currency);
}

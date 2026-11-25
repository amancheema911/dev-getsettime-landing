import { BASE_URL, LOGIN_URL, REGISTER_URL } from "@/lib/config";
import { getCurrencyForCountry } from "@/app/visitorLocation";
import { formatPrice, getCurrencySymbol } from "@/utils/currency";

export { formatPrice, getCurrencySymbol } from "@/utils/currency";

export type PricingTier = {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  seatTitle?: string;
  seatDescription?: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  buttonText: string;
  buttonLink: string;
  annualDiscountPercent?: number;
  currency?: string;
  extraSeatPrice?: number;
};

export type ComparisonCell = boolean | string;

export type ComparisonRow = {
  feature: string;
  free: ComparisonCell;
  starter: ComparisonCell;
  professional: ComparisonCell;
  enterprise: ComparisonCell;
  highlight?: boolean;
};

/**
 * Configurable regional rates by ISO2 country or currency code.
 * Currency for unlisted countries comes from `lib/CountryList` (via getCurrencyForCountry).
 * Example: FR → EUR rates from the EUR template.
 */
export type RegionalPricingRates = {
  /** ISO 4217 currency code, e.g. INR, USD */
  currency: string;
  /** Badge next to price (e.g. "GST Extra"). Omit or empty to hide. */
  taxLabel?: string;
  prices: {
    starter: number;
    professional: number;
    enterprise: number;
  };
  extraSeat: {
    starter: number;
    professional: number;
    enterprise: number;
  };
};

/** Fully resolved pricing for UI (includes Intl-derived symbol). */
export type RegionalPricing = {
  currency: string;
  symbol: string;
  taxLabel: string;
  currencyLabel: string;
  /** True only when amounts come from `regionalPricing`, not the unlisted-country fallback. */
  fromTable: boolean;
  prices: {
    starter: number;
    professional: number;
    enterprise: number;
  };
  extraSeat: {
    starter: number;
    professional: number;
    enterprise: number;
  };
};

function resolveRegionalPricing(rates: RegionalPricingRates, fromTable: boolean): RegionalPricing {
  const currency = rates.currency.trim().toUpperCase();
  return {
    currency,
    symbol: getCurrencySymbol(currency),
    taxLabel: rates.taxLabel ?? "",
    currencyLabel: currency,
    fromTable,
    prices: rates.prices,
    extraSeat: {
      starter: rates.extraSeat.starter,
      professional: rates.extraSeat.professional,
      enterprise: rates.extraSeat.enterprise,
    },
  };
}

/**
 * Country / currency rate table — amounts only; symbols come from Intl.
 * Keys: ISO2 country (IN, US, …) or currency template (EUR).
 * Unlisted countries resolve via CountryList currency, then nearest matching rates.
 */
export const regionalPricing: Record<string, RegionalPricingRates> = {
  US: {
    currency: "USD",
    taxLabel: "Taxes may apply",
    prices: {
      starter: 12,
      professional: 18,
      enterprise: 36,
    },
    extraSeat: {
      starter: 6,
      professional: 9,
      enterprise: 13,
    },
  },

  /** Pound — United Kingdom and other GBP markets */
  GB: {
    currency: "GBP",
    taxLabel: "VAT Extra",
    prices: {
      starter: 10,
      professional: 15,
      enterprise: 30,
    },
    extraSeat: {
      starter: 8,
      professional: 12,
      enterprise: 24,
    },
  },

  /** Eurozone template — IT, ES, NL, FR, DE, etc. resolve here via CountryList currency */
  EUR: {
    currency: "EUR",
    taxLabel: "VAT Extra",
    prices: {
      starter: 11,
      professional: 17,
      enterprise: 34,
    },
    extraSeat: {
      starter: 9,
      professional: 14,
      enterprise: 28,
    },
  },
};

/**
 * Resolve pricing for an ISO2 country code.
 * 1. Exact country override (IN, US, …)
 * 2. Currency from CountryList → currency template (EUR) or matching rates
 * 3. US amounts kept only as a non-display fallback (`fromTable: false`)
 */
export function getRegionalPricing(countryCode?: string | null): RegionalPricing {
  const key = (countryCode || "").trim().toUpperCase();

  if (key && regionalPricing[key]) {
    return resolveRegionalPricing(regionalPricing[key], true);
  }

  const currency = getCurrencyForCountry(key || "US");

  // Currency-keyed template (e.g. FR → EUR, GB → GBP)
  if (regionalPricing[currency]) {
    return resolveRegionalPricing(regionalPricing[currency], true);
  }

  // Same currency as a country-specific entry (e.g. other USD markets → US rates)
  for (const rates of Object.values(regionalPricing)) {
    if (rates.currency === currency) {
      return resolveRegionalPricing(rates, true);
    }
  }

  // Unlisted countries keep API prices in the UI. This fallback is not shown.
  const fallback = regionalPricing.US;
  if (currency && currency !== fallback.currency) {
    return resolveRegionalPricing({
      ...fallback,
      currency,
    }, false);
  }

  return resolveRegionalPricing(fallback, true);
}

export type RegionalPricePlan = "starter" | "professional" | "enterprise" | "extraSeat";

/** Amount + currency for a plan in a given country (or resolved region). */
export function getRegionalPlanAmount(
  plan: RegionalPricePlan,
  countryOrRegion?: string | null | RegionalPricing
): { amount: number; currency: string; region: RegionalPricing } {
  const region = isRegionalPricing(countryOrRegion)
    ? countryOrRegion
    : getRegionalPricing(typeof countryOrRegion === "string" ? countryOrRegion : null);

  const amount = plan === "extraSeat" ? region.extraSeat.starter : region.prices[plan];
  return { amount: amount as number, currency: region.currency, region };
}

function isRegionalPricing(value: unknown): value is RegionalPricing {
  if (!value || typeof value !== "object") return false;
  const v = value as RegionalPricing;
  return (
    typeof v.currency === "string" &&
    typeof v.extraSeat.starter === "number" &&
    typeof v.extraSeat.professional === "number" &&
    typeof v.extraSeat.enterprise === "number" &&
    !!v.prices &&
    typeof v.prices.starter === "number"
  );
}

/**
 * Format a plan price for any country — safe on server and client.
 * Use this anywhere (including non-React code).
 *
 * @example formatRegionalPrice("extraSeat", "CA")
 * @example formatRegionalPrice("starter", "IN")
 * @example formatRegionalPrice("extraSeat", region)
 */
export function formatRegionalPrice(
  plan: RegionalPricePlan,
  countryOrRegion?: string | null | RegionalPricing
): string {
  const { amount, currency } = getRegionalPlanAmount(plan, countryOrRegion);
  return formatPrice(amount, currency);
}

/**
 * Currency shown for a selected country.
 * India → INR, United States → USD, United Kingdom → GBP, euro countries → EUR.
 * Any other country keeps its own currency and the plans API.
 */
export function currencyForCountry(countryCode?: string | null): string {
  return getRegionalPricing(countryCode).currency;
}

/**
 * Plans API currency for this visitor.
 * USD, GBP, and EUR amounts live in `regionalPricing`, so those visitors still
 * load plan details with the INR catalog and never request those codes from the API.
 */
export function plansRequestCurrency(region: RegionalPricing): string {
  if (region.fromTable) return "INR";
  return region.currency || "INR";
}

/**
 * USD, GBP, and EUR amounts come only from `regionalPricing`.
 * INR and every other currency keep the plans API amounts, labeled in the visitor currency.
 */
export function tiersForRegion(tiers: PricingTier[], region: RegionalPricing): PricingTier[] {
  if (region.fromTable) return applyRegionalPrices(tiers, region);
  return tiers.map((tier) => ({ ...tier, currency: region.currency }));
}

/** Apply regional prices onto base pricingTiers (Free stays Free). */
export function applyRegionalPrices(
  tiers: PricingTier[],
  region: RegionalPricing
): PricingTier[] {
  return tiers.map((tier) => {
    if (tier.price === "Free" || tier.name === "Free") return tier;
    const name = tier.name.toLowerCase();
    if (name !== "starter" && name !== "professional" && name !== "enterprise") return tier;
    return {
      ...tier,
      price: String(region.prices[name]),
      currency: region.currency,
      extraSeatPrice: region.extraSeat[name],
    };
  });
}
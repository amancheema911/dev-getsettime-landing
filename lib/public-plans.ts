import { REGISTER_URL } from "@/lib/config";
import type { PricingTier } from "@/lib/pricing-data";

export type PublicPlan = {
  name: string;
  slug: string;
  description: string;
  subtitle: string;
  price: number;
  currency: string;
  period: string;
  annualDiscountPercent: number;
  bookingLimit: number | "unlimited";
  bookingLimitPeriod: string;
  seats: number;
  extraSeatPrice: number;
  features: string[];
  popular: boolean;
  badge: string;
  ctaLabel: string;
  publicBookingPage: boolean;
  emailNotifications: boolean;
  googleCalendarSync: boolean;
  whatsappAutomation: boolean;
  onlinePayments: boolean;
  additionalLocations: boolean;
};

export type PublicPlans = {
  priceCurrency: string;
  annualDiscountPercent: number;
  extraSeatPrice: number;
  plans: PublicPlan[];
};

function record(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function amount(value: unknown) {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(number) ? number : 0;
}

function planRows(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const root = record(payload);
  if (!root) return [];
  if (Array.isArray(root.plans)) return root.plans;
  const nested = record(root.plans);
  if (nested && Array.isArray(nested.plans)) return nested.plans;
  return [];
}

export function normalizePlans(payload: unknown, priceCurrency: string): PublicPlans | null {
  const currency = priceCurrency.trim().toUpperCase();
  const rows = planRows(payload)
    .map((row) => record(row))
    .filter((row): row is Record<string, unknown> => !!row && row.is_active !== false)
    .sort((a, b) => amount(a.display_order) - amount(b.display_order));

  if (!rows.length) return null;

  const plans = rows.map((row) => {
    const content = record(row.content);
    const features = Array.isArray(content?.features)
      ? content.features.filter((feature): feature is string => typeof feature === "string" && feature.trim().length > 0)
      : [];
    const limit = row.booking_limit;
    const bookingLimit =
      typeof limit === "string" && limit.toLowerCase() === "unlimited" ? "unlimited" : amount(limit);
    const badge = text(content?.badge_label);
    const enabled = (key: string) => row[key] === true;

    return {
      name: text(row.name),
      slug: text(row.slug).toLowerCase(),
      description: text(row.description),
      subtitle: text(content?.subtitle),
      price: amount(row.price),
      currency,
      period: text(row.billing_interval) || "month",
      annualDiscountPercent: amount(row.annual_discount_percent),
      bookingLimit,
      bookingLimitPeriod: text(row.booking_limit_period) || "month",
      seats: amount(row.service_provider_limit),
      extraSeatPrice: amount(row.extra_service_provider_seat_price),
      features,
      popular: content?.is_highlighted === true || badge.length > 0,
      badge,
      ctaLabel: text(content?.cta_label),
      publicBookingPage: enabled("public_booking_page"),
      emailNotifications: enabled("email_notifications"),
      googleCalendarSync: enabled("google_calendar_sync"),
      whatsappAutomation: enabled("whatsapp_automation"),
      onlinePayments: enabled("online_payments"),
      additionalLocations: enabled("additional_locations"),
    } satisfies PublicPlan;
  }).filter((plan) => plan.name && plan.slug);

  if (!plans.length) return null;

  return {
    priceCurrency: currency,
    annualDiscountPercent: Math.max(...plans.map((plan) => plan.annualDiscountPercent)),
    extraSeatPrice: Math.max(...plans.map((plan) => plan.extraSeatPrice)),
    plans,
  };
}

export function findPublicPlan(catalog: PublicPlans | null | undefined, slug: string) {
  return catalog?.plans.find((plan) => plan.slug === slug.toLowerCase()) ?? null;
}

export function bookingSummary(plan: PublicPlan) {
  if (plan.bookingLimit === "unlimited") return "Unlimited bookings";
  if (plan.bookingLimitPeriod === "lifetime") return `${plan.bookingLimit} bookings included`;
  return `${plan.bookingLimit} bookings/${plan.bookingLimitPeriod} included`;
}

const ANNUAL_DISCOUNT_TIERS = new Set(["professional", "enterprise"]);

/** Annual billing discount applies only to Professional and Enterprise. */
export function annualDiscountForTier(tierName: string, percent: number | undefined) {
  const name = tierName.trim().toLowerCase();
  if (!ANNUAL_DISCOUNT_TIERS.has(name)) return 0;
  return percent && percent > 0 ? percent : 0;
}

export function discountedPrice(price: number, discountPercent: number, annual: boolean) {
  if (!annual || discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
}

function includedFeatures(plan: PublicPlan) {
  if (plan.features.length) return plan.features;
  return [
    plan.publicBookingPage ? "Public booking page" : "",
    plan.emailNotifications ? "Email notifications" : "",
    plan.googleCalendarSync ? "Google Calendar sync" : "",
    plan.whatsappAutomation ? "WhatsApp automation" : "",
    plan.onlinePayments ? "Online payments" : "",
    plan.additionalLocations ? "Additional locations" : "",
  ].filter(Boolean);
}

export function toPricingTier(plan: PublicPlan): PricingTier {
  return {
    name: plan.name,
    subtitle: plan.subtitle,
    price: String(plan.price),
    period: plan.period,
    description: plan.description,
    seatTitle: plan.seats > 0 ? `${plan.seats} seat${plan.seats === 1 ? "" : "s"} included` : undefined,
    seatDescription: bookingSummary(plan),
    features: includedFeatures(plan),
    popular: plan.popular,
    badge: plan.badge,
    buttonText: plan.ctaLabel || "Get Started",
    buttonLink: REGISTER_URL ?? "",
    annualDiscountPercent: plan.annualDiscountPercent,
    currency: plan.currency,
    extraSeatPrice: plan.extraSeatPrice,
  };
}

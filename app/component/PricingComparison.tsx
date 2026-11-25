"use client";

import { Fragment, useMemo, useState } from "react";
import type { ComparisonCell, PricingTier, RegionalPricing } from "@/lib/pricing-data";
import { formatPrice, plansRequestCurrency, tiersForRegion } from "@/lib/pricing-data";
import { bookingSummary, toPricingTier, type PublicPlan, type PublicPlans } from "@/lib/public-plans";
import { usePlans } from "./usePlans";
import { useRegionalPricing } from "./useRegionalPricing";
import ScreenGate from "./ScreenGate";

type ComparisonViewRow = {
  feature: string;
  cells: ComparisonCell[];
  highlight?: boolean;
  category?: string;
};

/** Same feature Prices stay on the plans API. */
const LIVE_COMPARISON: {
  feature: string;
  category?: string;
  values: Record<string, ComparisonCell>;
}[] = [
  {
    category: "Booking & calendar",
    feature: "Online booking page",
    values: { starter: true, professional: true, enterprise: true },
  },
  {
    feature: "Google Calendar sync",
    values: { starter: "Basic", professional: "Advanced", enterprise: "Advanced" },
  },
  {
    feature: "WhatsApp reminders",
    values: { starter: false, professional: true, enterprise: true },
  },
  {
    feature: "Email notifications",
    values: { starter: true, professional: true, enterprise: true },
  },
  {
    category: "Automation & brand",
    feature: "Custom branding",
    values: { starter: false, professional: true, enterprise: true },
  },
  {
    feature: "Payment processing",
    values: { starter: false, professional: true, enterprise: true },
  },
  {
    feature: "Staff management",
    values: { starter: "Basic", professional: true, enterprise: true },
  },
  {
    category: "Team & analytics",
    feature: "Advanced analytics",
    values: { starter: false, professional: true, enterprise: true },
  },
  {
    feature: "API access",
    values: { starter: false, professional: true, enterprise: true },
  },
  {
    category: "Enterprise scale",
    feature: "Multi-location",
    values: { starter: false, professional: false, enterprise: true },
  },
  {
    feature: "SSO & custom integrations",
    values: { starter: false, professional: false, enterprise: true },
  },
  {
    feature: "Support",
    values: { starter: "Community", professional: "Priority", enterprise: "24/7" },
  },
];

const PLAN_ORDER = ["starter", "professional", "enterprise"];

function planKey(plan: PublicPlan) {
  return (plan.slug || plan.name).trim().toLowerCase();
}

function orderedPublicPlans(plans: PublicPlan[]) {
  return [...plans].sort((a, b) => {
    const aIndex = PLAN_ORDER.indexOf(planKey(a));
    const bIndex = PLAN_ORDER.indexOf(planKey(b));
    return (aIndex === -1 ? PLAN_ORDER.length : aIndex) - (bIndex === -1 ? PLAN_ORDER.length : bIndex);
  });
}

/** "+ GST" / "+ VAT" / "" — derived from the region's tax label */
function taxSuffix(region: RegionalPricing): string {
  const label = region.taxLabel ?? "";
  if (label.includes("GST")) return " + GST";
  if (label.includes("VAT")) return " + VAT";
  return "";
}

function CellValue({
  value,
  emphasized,
  compact,
}: {
  value: ComparisonCell;
  emphasized?: boolean;
  compact?: boolean;
}) {
  const size = compact ? "h-7 w-7" : "h-8 w-8";
  const iconSize = compact ? "h-3.5 w-3.5" : "h-4 w-4";

  if (value === true) {
    return (
      <span
        className={`inline-flex ${size} shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white drop-shadow-md drop-shadow-emerald-500/30 ${compact ? "" : "mx-auto"}`}
        aria-label="Included"
      >
        <svg className={iconSize} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.414-1.41l2.293 2.29 6.493-6.49a1 1 0 011.415 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }

  if (value === false) {
    return (
      <span
        className={`inline-flex ${size} shrink-0 items-center justify-center rounded-full border border-dashed border-slate-200 bg-slate-50 text-slate-300 ${compact ? "" : "mx-auto"}`}
        aria-label="Not included"
      >
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
          <path strokeLinecap="round" d="M6 12h12" />
        </svg>
      </span>
    );
  }

  const isPrice =
    typeof value === "string" &&
    (value === "Free" || (/[$€£¥₹₩₱฿₫₺₽₴]|\b[A-Z]{3}\s+\d/.test(value) && /\d/.test(value)));

  if (emphasized || isPrice || typeof value !== "string") {
    return (
      <span
        className={`shrink-0 whitespace-nowrap bg-gradient-to-r from-indigo-700 to-violet-600 bg-clip-text font-bold tabular-nums tracking-tight text-transparent ${
          compact ? "text-lg" : "text-xl sm:text-2xl"
        }`}
      >
        {value}
      </span>
    );
  }

  const tone =
    value === "Advanced" || value === "Unlimited"
      ? "bg-indigo-100 text-indigo-800 ring-indigo-200/80"
      : value === "Basic" || value === "Community"
        ? "bg-slate-100 text-slate-700 ring-slate-200/80"
        : value === "Priority" || value.includes("24/7")
          ? "bg-violet-100 text-violet-800 ring-violet-200/80"
          : "bg-cyan-50 text-cyan-900 ring-cyan-200/60";

  return (
    <span
      className={`inline-flex max-w-full shrink-0 items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 sm:px-3 sm:text-xs ${tone}`}
    >
      {value}
    </span>
  );
}

function CategoryLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-3 sm:px-5">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
    </div>
  );
}

function CategoryRow({ label, colSpan }: { label: string; colSpan: number }) {
  return (
    <tr className="bg-gradient-to-r from-slate-50 via-white to-slate-50">
      <td colSpan={colSpan} className="px-4 py-3 sm:px-5">
        <CategoryLabel label={label} />
      </td>
    </tr>
  );
}

function isListedFree(price: string) {
  const amount = Number(price);
  return price === "Free" || (Number.isFinite(amount) && amount <= 0);
}

function tierPriceLabel(tier: PricingTier, fallbackCurrency: string) {
  if (isListedFree(tier.price)) return "Free";
  return formatPrice(Number(tier.price), tier.currency || fallbackCurrency);
}

/** "+ GST" / "+ VAT" / "" — derived from the region's tax label */
// function priceFeatureLabel(region: RegionalPricing): string {
//   const tax = taxSuffix(region);
//   return tax ? `Monthly price (excl.${tax.replace(" + ", " ")})` : "Monthly price";
// }

function bookingFeatureLabel(plans: PublicPlan[]) {
  const periods = [...new Set(plans.map((plan) => plan.bookingLimitPeriod.trim().toLowerCase()).filter(Boolean))];
  if (periods.length === 1 && (periods[0] === "month" || periods[0] === "monthly")) return "Bookings / month";
  if (periods.length === 1 && periods[0] !== "lifetime") return `Bookings / ${periods[0]}`;
  return "Bookings";
}

function buildComparisonRows(catalog: PublicPlans, region: RegionalPricing): ComparisonViewRow[] {
  const plans = orderedPublicPlans(catalog.plans);
  const currency = catalog.priceCurrency || region.currency;
  const rows: ComparisonViewRow[] = [
    // {
    //   category: "Plans & capacity",
    //   feature: "Monthly price",
    //   highlight: true,
    //   cells: plans.map((plan) => (plan.price <= 0 ? "Free" : formatPrice(plan.price, plan.currency || currency))),
    // },
    {
      category: "capacity",
      feature: "Seats included",
      cells: plans.map((plan) => (plan.seats > 0 ? String(plan.seats) : "—")),
    },
    {
      feature: bookingFeatureLabel(plans),
      cells: plans.map((plan) => (plan.bookingLimit === "unlimited" ? "Unlimited" : bookingSummary(plan))),
    },
  ];

  for (const item of LIVE_COMPARISON) {
    rows.push({
      category: item.category,
      feature: item.feature,
      cells: plans.map((plan) => item.values[planKey(plan)] ?? false),
    });
  }

  return rows;
}

function planColumnClass(index: number, popularIndex: number, part: "head" | "body") {
  if (index !== popularIndex) {
    return part === "head" ? "bg-white/60" : "";
  }
  return part === "head"
    ? "relative z-10 bg-gradient-to-b from-indigo-600 to-violet-600 text-white drop-shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
    : "relative z-10 bg-gradient-to-b from-indigo-50/90 via-indigo-50/50 to-violet-50/30 drop-shadow-[inset_0_0_0_1px_rgba(99,102,241,0.08)]";
}

function ComparisonLegend({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3.5 text-xs text-neutral-500 sm:justify-start sm:gap-6 sm:px-6 sm:py-4 ${className}`}
    >
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.414-1.41l2.293 2.29 6.493-6.49a1 1 0 011.415 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        Included
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-slate-200 bg-slate-50 text-slate-300">
          <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" d="M6 12h12" />
          </svg>
        </span>
        Not on plan
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-800 ring-1 ring-indigo-200/80">
          Tier
        </span>
        Plan-specific level
      </span>
    </div>
  );
}

export default function PricingComparison() {
  const region = useRegionalPricing();
  const { plans: catalog, status } = usePlans(plansRequestCurrency(region));
  const tiers = useMemo(
    () => tiersForRegion(catalog ? orderedPublicPlans(catalog.plans).map(toPricingTier) : [], region),
    [catalog, region]
  );
  const rows = useMemo(() => (catalog ? buildComparisonRows(catalog, region) : []), [catalog, region]);
  const popularIndex = useMemo(() => {
    const index = tiers.findIndex((tier) => tier.popular);
    if (index >= 0) return index;
    return Math.min(1, Math.max(0, tiers.length - 1));
  }, [tiers]);
  const [pickedPlan, setPickedPlan] = useState<number | null>(null);
  const activePlan = tiers.length === 0 ? 0 : Math.min(pickedPlan ?? popularIndex, tiers.length - 1);

  return (
    <div className="relative">

      <div className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 drop-shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:rounded-3xl">
        {tiers.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-neutral-500">
            {status === "error" ? "Plans could not be loaded." : "Loading plans…"}
          </p>
        ) : (
        <>
        <ScreenGate maxWidth={1023}>
        {/* ——— Mobile & tablet: plan tabs + feature list ——— */}
        <div className="relative">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 p-3 sm:p-4">
            <p className="mb-3 text-center text-xs font-medium text-neutral-500">Tap a plan to compare features</p>
            <div className="flex gap-2 py-1 px-1 overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none]"
              role="tablist"
              aria-label="Select pricing plan"
            >
              {tiers.map((tier, i) => {
                const plan = tier.name;
                const isActive = activePlan === i;
                const isPopular = i === popularIndex;
                const priceLabel = tierPriceLabel(tier, region.currency);
                return (
                  <button
                    key={plan}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setPickedPlan(i)}
                    className={`min-w-0 flex-1 snap-center rounded-2xl border px-3 py-3 text-left transition-all sm:px-4 ${
                      isActive
                        ? isPopular
                          ? "border-indigo-500 bg-gradient-to-b from-indigo-600 to-violet-600 text-white drop-shadow-lg drop-shadow-indigo-300/40"
                          : "border-indigo-400 bg-indigo-50 drop-shadow-md ring-2 ring-indigo-200"
                        : "border-slate-200 bg-white text-neutral-900 hover:border-indigo-200"
                    }`}
                  >
                    {isPopular && (
                      <span
                        className={`mb-1.5 inline-block text-[9px] font-bold uppercase tracking-wider ${
                          isActive ? "text-cyan-200" : "text-indigo-600"
                        }`}
                      >
                        Popular
                      </span>
                    )}
                    <span
                      className={`block text-xs font-bold uppercase tracking-wide ${
                        isActive && isPopular ? "text-white" : isActive ? "text-indigo-700" : "text-indigo-600"
                      }`}
                    >
                      {plan}
                    </span>
                    <span
                      className={`mt-1 block text-lg font-black leading-none sm:text-xl ${
                        isActive && isPopular ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      {priceLabel}
                    </span>
                    <span
                      className={`mt-0.5 block text-[10px] ${
                        isActive && isPopular ? "text-indigo-100" : "text-neutral-500"
                      }`}
                    >
                      {priceLabel === "Free" ? "" : `/mo${taxSuffix(region)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div role="tabpanel" aria-label={`${tiers[activePlan]?.name ?? "Plan"} features`}>
            {rows.map((row) => {
              const cell = row.cells[activePlan];

              return (
                <Fragment key={row.feature}>
                  {row.category && <CategoryLabel label={row.category} />}
                  <div
                    className={`flex items-center justify-between gap-3 border-b border-slate-100/80 px-4 py-3.5 sm:px-5 ${
                      row.highlight ? "bg-gradient-to-r from-indigo-50/90 to-violet-50/50" : ""
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2.5">
                      <span
                        className={`h-7 w-1 shrink-0 rounded-full ${
                          row.highlight ? "bg-gradient-to-b from-indigo-500 to-violet-500" : "bg-slate-200"
                        }`}
                      />
                      <span
                        className={`text-sm leading-5 ${
                          row.highlight ? "block min-h-10 font-semibold text-neutral-900" : "font-medium text-neutral-700"
                        }`}
                      >
                        {row.feature}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center justify-end">
                      <CellValue value={cell} emphasized={row.highlight} compact />
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>

          <ComparisonLegend />
        </div>
        </ScreenGate>

        <ScreenGate minWidth={1024}>
        {/* ——— Desktop: full comparison table ——— */}
        <div className="relative">
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 w-[22%] min-w-[180px] border-b border-r border-slate-100 bg-slate-50/95 px-5 py-5 text-left align-bottom backdrop-blur-sm xl:min-w-[220px]">
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Compare</span>
                    <p className="mt-1 text-base font-bold text-neutral-900">What&apos;s included</p>
                  </th>
                  {tiers.map((tier, i) => {
                    const isPopular = i === popularIndex;
                    const priceLabel = tierPriceLabel(tier, region.currency);
                    return (
                      <th
                        key={tier.name}
                        className={`border-b px-3 py-5 text-center align-bottom xl:px-4 ${planColumnClass(i, popularIndex, "head")} ${
                          isPopular ? "border-indigo-500/30" : "border-slate-100"
                        }`}
                      >
                        {isPopular && (
                          <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/25">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                            {tier.badge || "Most popular"}
                          </span>
                        )}
                        <p className={`text-sm font-bold uppercase tracking-wide ${isPopular ? "text-white" : "text-indigo-600"}`}>
                          {tier.name}
                        </p>
                        <p className={`mt-2 text-2xl font-black tracking-tight xl:text-3xl ${isPopular ? "text-white" : "text-neutral-900"}`}>
                          {priceLabel}
                        </p>
                        <p className={`mt-0.5 text-xs ${isPopular ? "text-indigo-100" : "text-neutral-500"}`}>
                          {priceLabel === "Free" ? "No credit card required" : `/month${taxSuffix(region)}`}
                        </p>
                        {/* {tier.seatTitle && (
                          <p className={`mt-2 text-[11px] leading-snug ${isPopular ? "text-indigo-100/90" : "text-neutral-500"}`}>
                            {tier.seatTitle}
                          </p>
                        )} */}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => {
                  return (
                    <Fragment key={row.feature}>
                      {row.category && <CategoryRow label={row.category} colSpan={tiers.length + 1} />}
                      <tr
                        className={`group border-b border-slate-100/80 transition-colors last:border-b-0 ${
                          row.highlight
                            ? "bg-gradient-to-r from-indigo-50/80 via-violet-50/40 to-indigo-50/80"
                            : "hover:bg-slate-50/40"
                        }`}
                      >
                        <td className="sticky left-0 z-10 border-r border-slate-100 bg-white/95 px-5 py-3.5 backdrop-blur-sm transition-colors group-hover:bg-slate-50/80">
                          <div className="flex items-center gap-3">
                            <span
                              className={`h-8 w-1 shrink-0 rounded-full transition-all ${
                                row.highlight
                                  ? "bg-gradient-to-b from-indigo-500 to-violet-500"
                                  : "bg-slate-200 group-hover:bg-indigo-300"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                row.highlight ? "font-semibold text-neutral-900" : "text-neutral-700"
                              }`}
                            >
                              {row.feature}
                            </span>
                          </div>
                        </td>
                        {row.cells.map((cell, colIndex) => (
                          <td
                            key={colIndex}
                            className={`px-4 py-3.5 text-center xl:px-5 ${planColumnClass(colIndex, popularIndex, "body")} ${
                              colIndex === popularIndex ? "border-x border-indigo-100/80" : ""
                            }`}
                          >
                            <CellValue value={cell} emphasized={row.highlight} />
                          </td>
                        ))}
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ComparisonLegend />
        </div>
        </ScreenGate>
        </>
        )}
      </div>
    </div>
  );
}

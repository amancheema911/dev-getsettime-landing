"use client";

import { useMemo, useState } from "react";
import { formatPrice, plansRequestCurrency, tiersForRegion } from "@/lib/pricing-data";
import { annualDiscountForTier, discountedPrice, toPricingTier } from "@/lib/public-plans";
import { usePlans } from "./usePlans";
import { useRegionalPricing } from "./useRegionalPricing";

const planHighlights: Record<string, string[]> = {
  Starter: ["Public booking page", "Email notifications"],
  Professional: ["Advanced calendar sync", "WhatsApp & email reminders"],
  Enterprise: ["Multi-location support", "SSO integration"],
};

const planIcons: Record<string, { wrap: string; icon: string; path: string }> = {
  Starter: {
    wrap: "bg-indigo-50 text-indigo-600",
    icon: "text-indigo-600",
    path: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  Professional: {
    wrap: "bg-violet-50 text-violet-600",
    icon: "text-violet-600",
    path: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  Enterprise: {
    wrap: "bg-emerald-50 text-emerald-600",
    icon: "text-emerald-600",
    path: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6",
  },
};

const USED_BOOKINGS = 128;
const BOOKING_ALLOWANCE = 250;

export default function PricingHeroPreview() {
  const [isAnnual, setIsAnnual] = useState(false);
  const region = useRegionalPricing();
  const plans = usePlans(plansRequestCurrency(region)).plans;
  const tiers = useMemo(
    () => tiersForRegion(plans?.plans.length ? plans.plans.map(toPricingTier) : [], region),
    [plans, region]
  );
  const extraSeatPrice = region.fromTable ? region.extraSeat.starter : plans?.extraSeatPrice ?? 0;
  const extraSeatCurrency = region.currency;
  const starter = tiers.find((tier) => tier.name === "Starter") ?? tiers[0];
  const usagePercent = Math.round((USED_BOOKINGS / BOOKING_ALLOWANCE) * 100);

  return (
    <div className="relative animate-fade-in-scale">
      <div className="overflow-hidden rounded-2xl bg-[#f6f4fb] p-3 drop-shadow-xl">

        <div className="truncate text-base font-bold tracking-tight text-neutral-900 sm:text-lg">Plans &amp; billing</div>
        <div className="text-xs text-neutral-500 sm:text-sm">Manage your plan and booking allowance.</div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5b4dff] via-[#6d4bff] to-[#7a3dff] p-4 text-white">
            <div className="relative z-10 max-w-[70%]">
              <div className="text-[11px] text-white/80">Current plan</div>
              <p className="mt-1 text-xl font-bold">{starter?.name ?? "Starter"}</p>
              <p className="text-xs text-white/80">{starter?.seatTitle ?? "1 seat included"}</p>
              <span className="mt-3 inline-flex rounded-full border border-white/40 px-3 py-1 text-[11px] font-medium">
                View invoices
              </span>
            </div>
            <svg className="absolute -right-1 bottom-1 h-24 w-24 text-white/90" viewBox="0 0 96 96" fill="none" aria-hidden>
              <rect x="18" y="22" width="58" height="52" rx="10" fill="white" fillOpacity="0.16" stroke="white" strokeOpacity="0.7" />
              <path d="M30 18v10M64 18v10M18 38h58" stroke="white" strokeOpacity="0.75" strokeWidth="2" />
              <circle cx="68" cy="62" r="14" fill="#6d5efc" stroke="white" />
              <path d="M62 62.5 66.2 67 75 57" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="rounded-2xl border border-white bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-neutral-900">Booking usage</p>
              <div className="text-[11px] text-neutral-400">This month</div>
            </div>
            <p className="mt-3 text-lg font-bold text-neutral-950">
              {USED_BOOKINGS} <span className="font-semibold text-neutral-500">of {BOOKING_ALLOWANCE} bookings</span>
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${usagePercent}%` }} />
              </div>
              <span className="text-[11px] font-medium text-neutral-400">{usagePercent}%</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
          <div className="w-auto flex items-center rounded-full bg-white p-1 text-[11px] shadow-sm">
            <button type="button" onClick={() => setIsAnnual(false)} aria-label="Monthly billing" role="tab" className={`rounded-full px-3 py-2 font-semibold transition ${!isAnnual ? "bg-indigo-600 text-white" : "text-neutral-500"}`}>
              Monthly
            </button>
            <button type="button" onClick={() => setIsAnnual(true)} aria-label="Yearly billing" role="tab" className={`rounded-full px-3 py-2 font-semibold transition ${isAnnual ? "bg-indigo-600 text-white" : "text-neutral-500"}`}>
              Yearly
            </button>
          </div>
        </div>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          {tiers.map((tier) => {
            const icons = planIcons[tier.name] ?? planIcons.Starter;
            const discountPercent = annualDiscountForTier(tier.name, tier.annualDiscountPercent);
            const monthlyPrice = tier.price === "Free" ? "Free" : Number(tier.price);
            const displayPrice = monthlyPrice === "Free" ? "Free" : discountedPrice(monthlyPrice, discountPercent, isAnnual);
            const showDiscount = displayPrice !== "Free" && isAnnual && discountPercent > 0 && displayPrice !== monthlyPrice;
            const priceCurrency = tier.currency || region.currency;
            const highlights = planHighlights[tier.name] ?? tier.features.slice(0, 2);
            const isCurrent = tier.name === "Starter";
            const priceClass = tier.name === "Enterprise" ? "text-emerald-600" : tier.popular ? "text-violet-600" : "text-indigo-600";

            return (
              <div
                key={tier.name}
                className={`flex flex-col rounded-xl border bg-white p-3 shadow-sm ${
                  tier.popular ? "border-violet-400 ring-1 ring-violet-200" : "border-neutral-100"
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${icons.wrap}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d={icons.path} />
                    </svg>
                  </span>
                  {tier.popular && (
                    <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[9px] font-semibold text-white">Most popular</span>
                  )}
                </div>
                <p className="mt-2 text-sm font-bold text-neutral-950">{tier.name}</p>
                <div className="text-xs text-neutral-500">{tier.subtitle}</div>
                <div className={`mt-2 whitespace-nowrap text-xl font-bold tabular-nums leading-none ${priceClass}`}>
                  {displayPrice === "Free" ? "Free" : formatPrice(displayPrice, priceCurrency)}
                  {displayPrice !== "Free" && <span className="text-[11px] font-medium text-neutral-400"> / month</span>}
                </div>
                {showDiscount && monthlyPrice !== "Free" && (
                  <div className="mt-1 text-[10px] font-medium leading-tight text-emerald-600">
                    <span className="mr-1 font-normal text-neutral-400 line-through">{formatPrice(monthlyPrice, priceCurrency)}</span>
                    Save {discountPercent}% annually
                  </div>
                )}
                <div
                  className={`mt-3 rounded-xl px-2 py-2 text-center text-[11px] font-semibold ${
                    isCurrent
                      ? "bg-violet-100 text-violet-400"
                      : tier.popular
                        ? "bg-violet-600 text-white"
                        : "bg-emerald-600 text-white"
                  }`}
                >
                  {isCurrent ? "Current plan" : tier.popular ? "Upgrade to Professional" : "Contact sales"}
                </div>
              </div>
            );
          })}
        </div>

        {extraSeatPrice > 0 && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-[12px] text-neutral-700 shadow-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-50 text-violet-600">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
              <path strokeLinecap="round" d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
              <circle cx="9.5" cy="7" r="3" />
              <path strokeLinecap="round" d="M19 8v6M22 11h-6" />
            </svg>
          </span>
          <span>
            Extra seats{" "}
            <span className="whitespace-nowrap font-semibold tabular-nums">
              {formatPrice(extraSeatPrice, extraSeatCurrency)}/month + GST
            </span>
          </span>
        </div>
        )}
      </div>
    </div>
  );
}

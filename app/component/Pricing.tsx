"use client";
import { REGISTER_URL } from "@/lib/config";
import { formatPrice } from "@/utils/currency";
import { tiersForRegion } from "@/lib/pricing-data";
import { annualDiscountForTier, discountedPrice, toPricingTier } from "@/lib/public-plans";
import { usePlans } from "./usePlans";
import { useRegionalPricing } from "./useRegionalPricing";
import Button from "./ui/button/Button";
import type { FC } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Heading from "./Heading";
import type { PricingTier } from "@/lib/pricing-data";

function getSlidesPerView(width: number) {
  if (width >= 1280) return 3;
  if (width >= 800) return 2;
  return 1;
}

interface PricingHeaderContent {
  badge?: string;
  title?: string;
  highlightText?: string;
  description?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const defaultPricingHeaderContent: Required<Pick<PricingHeaderContent, "badge" | "title" | "description" | "wrapperClassName">> = {
  badge: "Pricing Plans",
  title: "Choose the plan that fits your team",
  description: "Transparent monthly pricing in {currency}. Annual billing saves {discount}%.",
  wrapperClassName: "mb-6 space-y-3 text-center",
};

function resolvePricingHeaderDescription(template: string, currencyLabel: string, discount: number) {
  return template.replaceAll("{currency}", currencyLabel).replaceAll("{discount}", String(discount));
}

interface CtaButton {
  text: string;
  href: string;
  className?: string;
}

interface PricingBottomCtaContent {
  title: string;
  description: string;
  buttons: CtaButton[];
}

interface TrustIndicator {
  text: string;
  dotColorClass: string;
}

interface PricingTrustContent {
  title: string;
  indicators: TrustIndicator[];
}

interface PricingProps {
  headerContent?: PricingHeaderContent;
  bottomCtaContent?: PricingBottomCtaContent;
  trustContent?: PricingTrustContent;
  variant?: "home" | "page";
  pricingSource?: string;
}

export type { PricingHeaderContent };

export const PricingCard: FC<{
  tier: PricingTier;
  isAnnual: boolean;
  pricingSource?: string;
}> = ({ tier, isAnnual, pricingSource }) => {
  const currency = tier.currency || "INR";
  const discountPercent = annualDiscountForTier(tier.name, tier.annualDiscountPercent);
  const monthlyPrice = Number(tier.price);
  const annualPrice = discountedPrice(monthlyPrice, discountPercent, true);
  const displayPrice = tier.price === "Free" ? "Free" : isAnnual ? annualPrice : monthlyPrice;
  const showDiscount = tier.price !== "Free" && isAnnual && discountPercent > 0 && annualPrice !== monthlyPrice;

  return (
    <div className={`pricing-card relative flex h-full flex-col rounded-2xl bg-white px-4 py-6 transition-transform duration-300 hover:-translate-y-2 hover:drop-shadow-xl ${tier.popular ? "border-indigo-300 drop-shadow-xl drop-shadow-indigo-200/70 ring-2 ring-indigo-200" : "drop-shadow-xl drop-shadow-slate-200/70"}`}>
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white drop-shadow-lg">{tier.badge || "Most Popular"}</div>
        </div>
      )}

      <div className="relative shrink-0 space-y-3">
        <div className="flex flex-row items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{tier.name}</div>
            <div className="min-h-5 text-sm">{tier.subtitle}</div>
          </div>
        </div>

        <div className="relative min-h-11">
          <div className="flex items-baseline whitespace-nowrap">
            <span className="text-4xl font-bold tabular-nums text-neutral-900">
              {tier.price === "Free" ? displayPrice : formatPrice(Number(displayPrice), currency)}
            </span>
            <span className={`ml-1 text-neutral-600 ${tier.price === "Free" ? "invisible" : ""}`}>
              /{tier.period}
            </span>
          </div>
          {showDiscount && (
            <div className="mt-1 text-sm font-medium text-emerald-600">
              <span className="mr-1 font-normal text-neutral-400 line-through">{formatPrice(monthlyPrice, currency)}</span>
              Save {discountPercent}% annually
            </div>
          )}
        </div>

        <div>{tier.description}</div>

        {tier.seatTitle && tier.seatDescription && (
          <div className="space-y-1 rounded-xl bg-indigo-50 p-4">
            <div className="text-md font-semibold text-indigo-700">{tier.seatTitle}</div>
            <div className="text-sm text-indigo-600">{tier.seatDescription}</div>
            {tier.extraSeatPrice && tier.extraSeatPrice > 0 ? (
              <div className="text-sm text-indigo-600">Extra seat {formatPrice(tier.extraSeatPrice, currency)}/{tier.period}</div>
            ) : null}
          </div>
        )}
      </div>

      <div className="mt-4 grid flex-1 grid-cols-1 content-start gap-1">
        {tier.features.map((feature, index) => (
          <div key={index} className="flex items-center justify-start gap-3">
            <div className="mt-0.5 shrink-0">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-100 text-indigo-700">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.414-1.41l2.293 2.29 6.493-6.49a1 1 0 011.415 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-neutral-600">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        buttonLink={tier.buttonLink}
        buttonText={tier.buttonText}
        ariaLabel={`Start with - ${tier.name} plan`}
        tone={tier.popular ? "primary" : "dark"}
        className={`mt-6 w-full`}
        source={pricingSource}
      />
    </div>
  );
};

export const BillingToggle: FC<{ isAnnual: boolean; onChange: (annual: boolean) => void; pricingSource?: string; savePercent?: number }> = ({ isAnnual, onChange, pricingSource, savePercent = 0 }) => (
  <div className="flex flex-col items-center gap-4 px-4 py-3" data-source={pricingSource}>
    <div className="relative">
      {savePercent > 0 && (
      <div className="pointer-events-none absolute -right-2 -top-3 z-20 sm:-right-5 sm:-top-3.5" aria-hidden>
        <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/25 ring-2 ring-white sm:px-3 sm:text-[11px]">
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Save {savePercent}%
        </div>
      </div>
      )}

      <div role="radiogroup" aria-label="Billing cycle" className="relative grid grid-cols-2 rounded-2xl border border-slate-200/90 bg-slate-50/90 p-1.5 shadow-[0_10px_40px_-16px_rgba(15,23,42,0.25)] backdrop-blur-sm">
        <div aria-hidden className={`pointer-events-none absolute bottom-1.5 top-1.5 w-[calc(50%-6px)] rounded-xl bg-white shadow-[0_4px_14px_-6px_rgba(79,70,229,0.35)] ring-1 ring-indigo-100 transition-all duration-300 ease-out ${ isAnnual ? "left-[calc(50%+3px)]" : "left-1.5" }`}/>

        <button
          type="button"
          role="radio"
          aria-checked={!isAnnual}
          onClick={() => onChange(false)}
          className={`relative z-10 flex min-w-[7.25rem] flex-col items-center justify-center rounded-xl px-4 py-3 transition-colors duration-200 sm:min-w-[8.75rem] sm:px-6 cursor-pointer ${
            !isAnnual ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="text-sm font-semibold">Monthly</span>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={isAnnual}
          onClick={() => onChange(true)}
          className={`relative z-10 flex min-w-[7.25rem] flex-col items-center justify-center rounded-xl px-4 py-3 transition-colors duration-200 sm:min-w-[8.75rem] sm:px-6 cursor-pointer ${
            isAnnual ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="text-sm font-semibold">Annual</span>
        </button>
      </div>
    </div>
  </div>
);

const PricingCardsSlider: FC<{
  tiers: PricingTier[];
  isAnnual: boolean;
  pricingSource?: string;
}> = ({ tiers, isAnnual, pricingSource }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const touchStartX = useRef<number | null>(null);

  useLayoutEffect(() => {
    const updateSlidesPerView = () => setSlidesPerView(getSlidesPerView(window.innerWidth));
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(0, tiers.length - slidesPerView);
  const canSlide = tiers.length > slidesPerView;

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex, slidesPerView]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  const trackOffset = `calc(-${currentIndex} * ((100% + 1.5rem) / ${slidesPerView}))`;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || !canSlide) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - touchEndX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative">
      {tiers.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Previous pricing plans"
            data-tier-count={tiers.length}
            className="pricing-slider-arrow absolute -left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-indigo-600 shadow-md transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 lg:-left-4"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next pricing plans"
            data-tier-count={tiers.length}
            className="pricing-slider-arrow absolute -right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-indigo-600 shadow-md transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 lg:-right-4"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className="overflow-hidden pt-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="flex items-stretch gap-6 transition-transform duration-300 ease-out" style={{ transform: `translateX(${trackOffset})` }}>
          {tiers.map((tier) => (
            <div key={tier.name} className="pricing-slide flex flex-col py-4">
              <PricingCard tier={tier} isAnnual={isAnnual} pricingSource={pricingSource} />
            </div>
          ))}
        </div>
      </div>

      {tiers.length > 1 && (
        <div className="pricing-slider-controls mt-6 flex items-center justify-center gap-3" data-tier-count={tiers.length}>
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Previous pricing plans"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-indigo-600 shadow-sm transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 sm:hidden"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to pricing slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-6 bg-indigo-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next pricing plans"
            data-source={pricingSource}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-indigo-600 shadow-sm transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 sm:hidden"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default function Pricing({
  variant = "home",
  headerContent,
  pricingSource,
}: PricingProps = {}) {
  const [isAnnual, setIsAnnual] = useState(false);
  const isPage = variant === "page";
  const region = useRegionalPricing();
  const { plans, status } = usePlans(region.currency);
  const priceCurrency = region.fromTable ? region.currency : plans?.priceCurrency ?? region.currency;
  const discountPercent = useMemo(() => {
    const percents = (plans?.plans ?? []).map((plan) => annualDiscountForTier(plan.name, plan.annualDiscountPercent));
    return percents.length ? Math.max(...percents) : 0;
  }, [plans]);
  const includedPlan = plans?.plans.find((plan) => typeof plan.bookingLimit === "number");
  const includedBookings = includedPlan && typeof includedPlan.bookingLimit === "number" ? includedPlan.bookingLimit : null;
  const includedPeriod = includedPlan?.bookingLimitPeriod === "lifetime" ? "included" : includedPlan?.bookingLimitPeriod || "month";

  const plansHeading = {
    badge: headerContent?.badge ?? defaultPricingHeaderContent.badge,
    title: headerContent?.title ?? defaultPricingHeaderContent.title,
    highlightText: headerContent?.highlightText,
    description: resolvePricingHeaderDescription(
      headerContent?.description ?? (discountPercent > 0 ? defaultPricingHeaderContent.description : "Transparent monthly pricing in {currency}."),
      priceCurrency,
      discountPercent,
    ),
    wrapperClassName: headerContent?.wrapperClassName ?? defaultPricingHeaderContent.wrapperClassName,
    titleClassName: headerContent?.titleClassName,
    descriptionClassName: headerContent?.descriptionClassName,
  };

  const tiers = useMemo(
    () => tiersForRegion(plans?.plans.length ? plans.plans.map(toPricingTier) : [], region),
    [plans, region]
  );
  const extraSeatPrice = region.fromTable ? region.extraSeat.starter : plans?.extraSeatPrice ?? 0;
  const extraSeatCurrency = region.fromTable ? region.currency : plans?.priceCurrency ?? region.currency;

  return (
    <section id="pricing" className={`relative bg-[#f6f7fb] scroll-mt-20 py-14 sm:py-20`}>
      
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block" aria-hidden>
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute left-10 top-1/3 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" />
      </div>

      <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">

        {!isPage && (
          <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-4 drop-shadow-xl drop-shadow-indigo-600/20 sm:p-8 md:p-10 max-w-7xl mx-auto">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <Heading
                  badge="Important Pricing Benefit"
                  title={includedBookings ? `Start with ${includedBookings} bookings` : "Plans are loading"}
                  description={includedBookings
                    ? `The first plan includes ${includedBookings} bookings ${includedPeriod}. Choose a plan based on the seats returned for your currency.`
                    : "Plan prices, seats, and booking limits load from the plans API."}
                  titleClassName="text-2xl sm:text-3xl font-bold text-white md:text-4xl lg:text-[40px]"
                  descriptionClassName="text-indigo-50"
                />
                <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white">
                  <span className="rounded-xl bg-white/15 px-4 py-2 ring-1 ring-white/20">Free for every workspace</span>
                  <span className="rounded-xl bg-white/15 px-4 py-2 ring-1 ring-white/20">Upgrade only when you grow</span>
                  <span className="rounded-xl bg-white/15 px-4 py-2 ring-1 ring-white/20">Plans based on seats</span>
                </div>
              </div>
              <div className="rounded-3xl bg-white p-4 drop-shadow-2xl sm:p-6 space-y-3">
                <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Included Free</div>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black tracking-tight text-neutral-900">{includedBookings ?? "—"}</span>
                  <span className="pb-2 text-sm font-bold text-neutral-600">bookings {includedPeriod}</span>
                </div>
                <div className="rounded-2xl bg-indigo-50 p-4">
                  <div className="text-sm">Start accepting appointments without payment. Upgrade when your workspace needs more seats or more capacity.</div>
                </div>
                <Button buttonLink={`${REGISTER_URL}`} buttonText="Start Free Now" ariaLabel="Start Free Now" source={pricingSource} tone="primary" className="w-full" />
              </div>
            </div>
          </div>
        )}

        <Heading
          badge={plansHeading.badge}
          title={plansHeading.title}
          highlightText={plansHeading.highlightText}
          description={plansHeading.description}
          wrapperClassName={plansHeading.wrapperClassName}
          titleClassName={plansHeading.titleClassName}
          descriptionClassName={plansHeading.descriptionClassName}
        />        

        <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} pricingSource={pricingSource} savePercent={discountPercent} />

        {tiers.length > 0 ? (
          <PricingCardsSlider tiers={tiers} isAnnual={isAnnual} pricingSource={pricingSource} />
        ) : (
          <p className="py-10 text-center text-sm text-neutral-500">
            {status === "error" ? "Plans could not be loaded." : "Loading plans…"}
          </p>
        )}

        {/* BOTTOM CTA SECTION */}
        <div className="mt-10 rounded-2xl bg-white p-6 drop-shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-2">
              <h3 className="text-xl text-neutral-900 font-bold">Need more service providers?</h3>
              <p>Add extra seats anytime as your team grows. Your pricing can scale based on the number of providers using GetSetTime.</p>
            </div>
            <div className="rounded-xl bg-neutral-900 px-6 py-4 text-white">
              <p className="text-sm text-white">Extra Seat</p>
              <p className="text-2xl font-bold">
                {extraSeatPrice > 0
                  ? `${formatPrice(extraSeatPrice, extraSeatCurrency)} / month`
                  : "Included"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

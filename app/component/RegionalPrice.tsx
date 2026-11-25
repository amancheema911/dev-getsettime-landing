"use client";
import type { RegionalPricePlan } from "@/lib/pricing-data";
import { findPublicPlan } from "@/lib/public-plans";
import { formatPrice } from "@/utils/currency";
import { usePlans } from "./usePlans";
import { useRegionalPricing } from "./useRegionalPricing";

type RegionalPriceProps = {
  /** Which value to display */
  plan?: RegionalPricePlan;
  /** Text rendered before the price, e.g. "Plans from " */
  prefix?: string;
  /** Text rendered after the amount, e.g. "/month" */
  suffix?: string;
  className?: string;
  amountClassName?: string;
  suffixClassName?: string;
};

/** Starter and extra-seat amounts from the plans API for the visitor currency. */
export default function RegionalPrice({
  plan = "extraSeat",
  prefix,
  suffix,
  className,
  amountClassName,
  suffixClassName,
}: RegionalPriceProps) {
  const region = useRegionalPricing();
  const { plans, status } = usePlans(region.currency);
  const regionalAmount = region.fromTable
    ? plan === "extraSeat"
      ? region.extraSeat.starter
      : region.prices[plan]
    : null;
  const apiPlan = plan === "extraSeat" ? null : findPublicPlan(plans, plan);
  const apiAmount = !plans
    ? null
    : plan === "extraSeat"
      ? plans.extraSeatPrice
      : apiPlan
        ? apiPlan.price
        : null;
  const currency = region.fromTable ? region.currency : plans?.priceCurrency || region.currency;
  const resolvedAmount = region.fromTable ? regionalAmount : apiAmount;
  const amount = resolvedAmount == null || resolvedAmount <= 0 ? null : formatPrice(resolvedAmount, currency);

  if (plan === "extraSeat" && !amount) return null;

  const price = (
    <>
      {prefix}
      <span className={amountClassName ?? "inline-block whitespace-nowrap tabular-nums"}>
        {amount ?? (status === "error" ? "—" : "\u00a0")}
      </span>
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </>
  );

  if (!className) return price;
  return <span className={className}>{price}</span>;
}

/** Highest annual discount percent returned by the plans API. */
export function AnnualDiscountPercent() {
  const region = useRegionalPricing();
  const plans = usePlans(region.currency).plans;
  const percent = plans?.annualDiscountPercent ?? 0;
  return <>{percent > 0 ? `${percent}%` : "—"}</>;
}

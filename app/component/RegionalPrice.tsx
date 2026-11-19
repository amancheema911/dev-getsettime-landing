"use client";
import {
  formatRegionalPrice,
  getRegionalPricing,
  type RegionalPricePlan,
} from "@/lib/pricing-data";
import { useRegionalPricing } from "./useRegionalPricing";

const INR_REGION = getRegionalPricing("IN");

type RegionalPriceProps = {
  /** Which value to display */
  plan?: RegionalPricePlan;
  /** Text rendered before the price, e.g. "Plans from " */
  prefix?: string;
  /** Text rendered after the amount, e.g. "/month" */
  suffix?: string;
};

/**
 * Client UI wrapper around `formatRegionalPrice` from `@/lib/pricing-data`.
 * Updates when the visitor/selected country changes.
 *
 * For non-React / server use, call formatRegionalPrice(plan, countryCode) directly.
 */
export default function RegionalPrice({
  plan = "extraSeat",
  prefix,
  suffix,
}: RegionalPriceProps) {
  const region = useRegionalPricing();
  const amount = formatRegionalPrice(plan, region);
  const reserved = formatRegionalPrice(plan, INR_REGION);

  return (
    <>
      {prefix}
      <span className="inline-grid align-baseline">
        <span className="invisible col-start-1 row-start-1 whitespace-nowrap tabular-nums" aria-hidden="true">
          {reserved}
        </span>
        <span className="col-start-1 row-start-1 whitespace-nowrap tabular-nums">{amount}</span>
      </span>
      {suffix}
    </>
  );
}

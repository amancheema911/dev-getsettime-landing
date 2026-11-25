"use client";

import { useEffect, useState } from "react";
import type { PublicPlans } from "@/lib/public-plans";

const memory = new Map<string, PublicPlans>();
const pending = new Map<string, Promise<PublicPlans | null>>();

function loadPlans(priceCurrency: string) {
  const cached = memory.get(priceCurrency);
  if (cached) return Promise.resolve(cached);

  const current = pending.get(priceCurrency);
  if (current) return current;

  const request = fetch(`/api/plans?priceCurrency=${encodeURIComponent(priceCurrency)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then(async (response) => {
      const body = (await response.json().catch(() => null)) as (PublicPlans & { success?: boolean }) | null;
      if (!response.ok || !body?.success || !Array.isArray(body.plans) || !body.plans.length) return null;
      const catalog: PublicPlans = {
        priceCurrency: body.priceCurrency,
        annualDiscountPercent: body.annualDiscountPercent,
        extraSeatPrice: body.extraSeatPrice,
        plans: body.plans,
      };
      memory.set(priceCurrency, catalog);
      return catalog;
    })
    .catch(() => null)
    .finally(() => {
      pending.delete(priceCurrency);
    });

  pending.set(priceCurrency, request);
  return request;
}

/** Plans catalog for one ISO currency. USD, GBP, and EUR prices are not requested here. */
export function usePlans(priceCurrency: string) {
  const code = (priceCurrency || "INR").trim().toUpperCase();
  const [plans, setPlans] = useState<PublicPlans | null>(memory.get(code) ?? null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(memory.has(code) ? "ready" : "loading");

  useEffect(() => {
    let cancelled = false;
    const cached = memory.get(code) ?? null;
    setPlans(cached);
    setStatus(cached ? "ready" : "loading");
    loadPlans(code).then((catalog) => {
      if (cancelled) return;
      setPlans(catalog);
      setStatus(catalog ? "ready" : "error");
    });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return {
    plans: plans?.priceCurrency === code ? plans : null,
    status,
  };
}

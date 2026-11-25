import { NextResponse } from "next/server";
import { loadPublicPlans } from "@/lib/load-public-plans";
import { isValidCurrencyCode } from "@/utils/currency";

export const dynamic = "force-dynamic";

const CURRENCY_PATTERN = /^[A-Za-z]{3}$/;

function requestOrigin(req: Request) {
  const origin = req.headers.get("origin")?.trim();
  if (origin) return origin;
  return process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, "") ?? "";
}

export async function GET(req: Request) {
  const priceCurrency = new URL(req.url).searchParams.get("priceCurrency")?.trim().toUpperCase() || "INR";
  if (!CURRENCY_PATTERN.test(priceCurrency) || !isValidCurrencyCode(priceCurrency)) {
    return NextResponse.json(
      { success: false, error: "priceCurrency must be a valid ISO currency code." },
      { status: 400 }
    );
  }

  try {
    const catalog = await loadPublicPlans(priceCurrency, requestOrigin(req));
    if (!catalog) {
      return NextResponse.json({ success: false, error: "Failed to load plans." }, { status: 502 });
    }

    return NextResponse.json({ success: true, ...catalog });
  } catch (error) {
    console.error("Plans API error:", error);
    return NextResponse.json({ success: false, error: "Failed to load plans." }, { status: 502 });
  }
}

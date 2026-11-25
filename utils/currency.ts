/**
 * Currency display helpers (native Intl only — safe on server and client).
 */

/** Preferred display symbols for common ISO 4217 codes. */
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

/** Currencies that display with a dollar sign, including non-USD dollars. */
const DOLLAR_CURRENCIES = new Set([
  "USD", "CAD", "AUD", "NZD", "SGD", "HKD", "TWD", "MXN", "COP", "CLP", "ARS",
  "XCD", "BBD", "BMD", "BSD", "BZD", "FJD", "GYD", "JMD", "KYD", "LRD", "NAD",
  "SBD", "SRD", "TTD", "BND",
]);

/** True when Intl accepts this as an ISO 4217 currency code. */
export function isValidCurrencyCode(currencyCode: string): boolean {
  const code = currencyCode.trim().toUpperCase();
  if (!code) return false;
  try {
    new Intl.NumberFormat("en", { style: "currency", currency: code }).format(0);
    return true;
  } catch {
    return false;
  }
}

/**
 * Currency symbol for an ISO 4217 code.
 * Uses a curated map first, then Intl, then the currency code.
 *
 * @example getCurrencySymbol("INR") → "₹"
 * @example getCurrencySymbol("USD") → "$"
 * @example getCurrencySymbol("AED") → "AED"
 * @example getCurrencySymbol("JPY") → "¥"
 * @example getCurrencySymbol("KRW") → "₩"
 * @example getCurrencySymbol("CNY") → "¥"
 * @example getCurrencySymbol("HKD") → "HK$"
 * @example getCurrencySymbol("SGD") → "S$"
 * @example getCurrencySymbol("MYR") → "RM"
 * @example getCurrencySymbol("PHP") → "₱"
 * @example getCurrencySymbol("THB") → "฿"
 * @example getCurrencySymbol("UNKNOWN") → "UNKNOWN"
 */
function intlCurrencySymbol(code: string): string {
  try {
    for (const currencyDisplay of ["symbol", "narrowSymbol"] as const) {
      const part = new Intl.NumberFormat("en", {
        style: "currency",
        currency: code,
        currencyDisplay,
      })
        .formatToParts(0)
        .find((entry) => entry.type === "currency");
      const symbol = part?.value?.trim() ?? "";
      if (symbol) return symbol;
    }
  } catch {
    return "";
  }
  return "";
}

export function getCurrencySymbol(currencyCode: string): string {
  const code = currencyCode.trim().toUpperCase();
  if (!code) return "";

  if (CURRENCY_SYMBOLS[code]) return CURRENCY_SYMBOLS[code];
  if (DOLLAR_CURRENCIES.has(code)) return "$";
  if (!isValidCurrencyCode(code)) return code;

  const symbol = intlCurrencySymbol(code);
  if (!symbol || symbol.toUpperCase() === code) return code;
  if (symbol.includes("$") || symbol.includes("＄")) return "$";
  if (symbol.includes("£")) return "£";
  if (symbol.includes("€")) return "€";
  return symbol;
}

/**
 * Format an amount with a currency symbol or code.
 *
 * @example formatPrice(999, "INR") → "₹999"
 * @example formatPrice(1499, "INR") → "₹1,499"
 * @example formatPrice(12, "USD") → "$12"
 * @example formatPrice(16, "SGD") → "$16"
 * @example formatPrice(10, "HKD") → "$10"
 * @example formatPrice(14, "CAD") → "$14"
 * @example formatPrice(10, "GBP") → "£10"
 * @example formatPrice(11, "EUR") → "€11"
 * @example formatPrice(45, "AED") → "AED 45"
 * @example formatPrice(100, "UNKNOWN") → "UNKNOWN 100"
 */
function formatAmount(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  const fractionDigits = Number.isInteger(safe) ? 0 : 2;
  return new Intl.NumberFormat("en", {
    useGrouping: true,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(safe);
}

export function formatPrice(amount: number, currencyCode: string): string {
  const code = currencyCode.trim().toUpperCase() || "USD";
  const symbol = getCurrencySymbol(code);
  const value = formatAmount(amount);

  if (!symbol) return `${code} ${value}`;

  // Same as ISO code (AED, CHF, UNKNOWN, …) → "CODE amount"
  if (symbol.toUpperCase() === code) {
    return `${code} ${value}`;
  }

  // Letter-only symbols (RM, kr, Rp, …) → "SYM amount"
  if (/^[A-Za-z]+$/.test(symbol)) {
    return `${symbol} ${value}`;
  }

  // Glyph / mixed symbols (₹, $, HK$, S$, CA$, …) → "SYM" + amount
  return `${symbol}${value}`;
}

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscriberBody = {
  success?: boolean;
  exists?: boolean;
  subscribed?: boolean;
  email?: string;
  error?: string;
  message?: string;
  reason?: string;
};

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

function apiMessage(data: SubscriberBody) {
  return [data.message, data.error, data.reason].filter(Boolean).join(" ");
}

function alreadySubscribed(status: number, data: SubscriberBody, email: string) {
  if (status === 404 || status === 405) return false;
  if (status === 409 || data.exists === true || data.subscribed === true) return true;
  if (/already/i.test(apiMessage(data))) return true;
  return status >= 200 && status < 300 && data.email?.trim().toLowerCase() === email;
}

async function subscribersApi(url: string, token: string, origin: string | null, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(origin ? { Origin: origin } : {}),
    },
  });
  const data = (await response.json().catch(() => ({}))) as SubscriberBody;
  return { response, data };
}

function siteOrigin(req: Request) {
  const hostHeader = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const host = hostHeader?.split(",")[0]?.trim();
  if (!host) return process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ?? "";

  const forwardedProto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto =
    forwardedProto ||
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");

  return `${proto}://${host}`;
}

async function notifyAdmin(req: Request, email: string) {
  const response = await fetch(`${siteOrigin(req)}/api/send-email`, {
    method: "POST",
    cache: "no-store",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ formType: "newsletter", email }),
  });
  const data = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };

  if (!response.ok || data.success === false) {
    throw new Error(data.error || "Failed to send admin email");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = normalizeEmail(body?.email);

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiUrl = process.env.SUBSCRIBERS_API_URL?.trim();
    const token = process.env.BEARER_TOKEN_API_KEY?.trim();
    const source = process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, "");
    if (!apiUrl || !token || !source) {
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const origin = req.headers.get("origin");
    const checkUrl = new URL(apiUrl);
    checkUrl.searchParams.set("email", email);

    const check = await subscribersApi(checkUrl.toString(), token, origin);
    if (alreadySubscribed(check.response.status, check.data, email)) {
      return NextResponse.json(
        { success: false, error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    if (!check.response.ok && check.response.status !== 404 && check.response.status !== 405) {
      console.error("Subscriber check failed:", check.response.status, apiMessage(check.data));
      return NextResponse.json(
        { success: false, error: "Something went wrong. Please try again in a moment." },
        { status: 502 }
      );
    }

    const created = await subscribersApi(apiUrl, token, origin, {
      method: "POST",
      body: JSON.stringify({ email, source }),
    });

    const duplicate =
      created.response.status === 409 ||
      created.data.exists === true ||
      /already/i.test(apiMessage(created.data));

    if (duplicate) {
      return NextResponse.json(
        { success: false, error: "This email is already subscribed." },
        { status: 409 }
      );
    }

    if (!created.response.ok || created.data.success === false) {
      console.error("Subscriber create failed:", created.response.status, apiMessage(created.data));
      return NextResponse.json(
        { success: false, error: "Something went wrong. Please try again in a moment." },
        { status: 502 }
      );
    }

    await notifyAdmin(req, email);

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! We'll keep you updated.",
    });
  } catch (error) {
    console.error("Newsletter subscribe failed:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UpstreamBody = {
  success?: boolean;
  error?: string;
  message?: string;
  reason?: string;
};

type ContactLead = {
  name: string;
  email: string;
  phone: string;
  professions: string;
  message: string;
};

function text(value: unknown, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function normalizeEmail(value: unknown) {
  const email = text(value, 254).toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

function apiMessage(data: UpstreamBody) {
  return [data.message, data.error, data.reason].filter(Boolean).join(" ");
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

/** Contact submissions are the name, email, phone, profession, and message fields. */
function isContactSubmission(body: Record<string, unknown>) {
  if (body.formType === "contact" || body.form_type === "contact") return true;
  return (
    typeof body.name === "string" &&
    typeof body.email === "string" &&
    typeof body.message === "string" &&
    ("professions" in body || "phone" in body)
  );
}

function readContactLead(body: Record<string, unknown>): ContactLead | { error: string } {
  const name = text(body.name, 200);
  const email = normalizeEmail(body.email);
  const message = text(body.message, 5000);
  const professions = text(body.professions ?? body.profession, 200);
  const phone = text(body.phone, 40);
  const phoneDigits = phone.replace(/\D/g, "");

  if (!name || !email || !message || !professions || !phone) {
    return { error: "Please fill all required fields." };
  }

  if (phoneDigits.length < 8) {
    return { error: "Please enter a valid phone number with country code." };
  }

  return {
    name,
    email,
    phone,
    professions,
    message,
  };
}

async function saveContactLead(
  apiUrl: string,
  token: string,
  origin: string | null,
  source: string,
  lead: ContactLead
) {
  const response = await fetch(apiUrl, {
    method: "POST",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(origin ? { Origin: origin } : {}),
    },
    body: JSON.stringify({
      form_type: "contact",
      formType: "contact",
      source,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      profession: lead.professions,
      message: lead.message,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as UpstreamBody;
  return { response, data };
}

async function notifyAdmin(req: Request, lead: ContactLead) {
  const response = await fetch(`${siteOrigin(req)}/api/send-email`, {
    method: "POST",
    cache: "no-store",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      formType: "contact",
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      professions: lead.professions,
      message: lead.message,
    }),
  });
  const data = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };

  if (!response.ok || data.success === false) {
    throw new Error(data.error || "Failed to send admin email");
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid form submission." },
        { status: 400 }
      );
    }

    if (!isContactSubmission(body)) {
      return NextResponse.json(
        { success: false, error: "Unknown or missing form type." },
        { status: 400 }
      );
    }

    const lead = readContactLead(body);
    if ("error" in lead) {
      return NextResponse.json({ success: false, error: lead.error }, { status: 400 });
    }

    const apiUrl = process.env.SUBMIT_FORMS_API_URL?.trim();
    const token = process.env.BEARER_TOKEN_API_KEY?.trim();
    const source = process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/$/, "");
    if (!apiUrl || !token || !source) {
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const saved = await saveContactLead(apiUrl, token, req.headers.get("origin"), source, lead);
    if (!saved.response.ok || saved.data.success === false) {
      console.error("Contact lead save failed:", saved.response.status, apiMessage(saved.data));
      const status = saved.response.status >= 400 && saved.response.status < 500 ? 400 : 502;
      return NextResponse.json(
        {
          success: false,
          error:
            status === 400 && apiMessage(saved.data)
              ? apiMessage(saved.data)
              : "Something went wrong. Please try again in a moment.",
        },
        { status }
      );
    }

    await notifyAdmin(req, lead);

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting GetSetTime! Your inquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Contact form submit failed:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}

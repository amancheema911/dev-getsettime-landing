import { contactInfo } from "@/lib/config";

export type SupportChannel = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
};

export type SupportEntitlement = {
  plan: string;
  label: string;
};

/**
 * Homepage support copy.
 * Hours stay unset until the business owner documents them.
 * Do not add chat, phone, response times, or an SLA figure here.
 */
export const supportContent = {
  badge: "Support",
  title: "Dedicated Support Around The Clock When You Need",
  description: "Our support team is always available to ensure the scheduling system runs smoothly, so no appointments are missed.",
  form: {
    eyebrow: "Email support",
    title: "Send a message",
    description: "This form emails the GetSetTime support inbox.",
  },
  channels: [
    {
      id: "help-center",
      title: "Help Center",
      description: "Step-by-step guides for account setup, bookings, and reminders.",
      actionLabel: "Browse Help Center",
      href: "/help-center",
    },
    {
      id: "contact-page",
      title: "Contact page",
      description: "The same form is also available on its own page.",
      actionLabel: "Open contact page",
      href: "/contact-us",
    },
  ] satisfies SupportChannel[],
};

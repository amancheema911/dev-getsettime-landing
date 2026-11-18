export type SolutionIconKey =
  | "doctor"
  | "dental"
  | "dermatology"
  | "physio"
  | "salon"
  | "tutor";

export type HubSolution = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: SolutionIconKey;
  benefits: readonly string[];
};

/**
 * Industry cards on /solutions.
 * Copy is limited to scheduling features already described on each destination page.
 * Hrefs match the navbar and sitemap and must not be renamed.
 */
export const hubSolutions: readonly HubSolution[] = [
  {
    id: "doctors-clinics",
    title: "Doctors & Clinics",
    description:
      "Let patients book a visit when the front desk is closed, and keep every provider’s day on one calendar.",
    href: "/solutions/doctor-appointment-scheduling-software",
    icon: "doctor",
    benefits: [
      "Patients book from live availability on any device",
      "WhatsApp and SMS reminders before each visit",
      "Hours, visit length, and breaks you set yourself",
    ],
  },
  {
    id: "dental-clinics",
    title: "Dental Clinics",
    description:
      "Fill the chair from a booking link instead of a full voicemail, and remind patients before they are due in.",
    href: "/solutions/dentist-appointment-scheduling-software",
    icon: "dental",
    benefits: [
      "Patients book open slots from your booking link",
      "Automatic reminders before each appointment",
      "Availability you set, so the book fills without double-booking",
    ],
  },
  {
    id: "dermatology-clinics",
    title: "Dermatology Clinics",
    description:
      "Give clients a way to book, move, or cancel a consult online, and keep every provider’s schedule visible.",
    href: "/solutions/dermatology-appointment-scheduling-software",
    icon: "dermatology",
    benefits: [
      "24/7 booking, cancellation, and rescheduling from one link",
      "Confirmations and reminders that reduce missed visits",
      "Staff schedules each provider can open on any device",
    ],
  },
  {
    id: "physiotherapy-wellness",
    title: "Physiotherapy & Wellness",
    description:
      "Let clients reserve a session without calling, and move it when their week changes.",
    href: "/solutions/physiotherapist-appointment-booking-software",
    icon: "physio",
    benefits: [
      "Online session booking from a personal link",
      "Automatic reminders before each session",
      "Reschedule in a few steps when plans change",
    ],
  },
  {
    id: "salons-beauty",
    title: "Salons & Beauty Studios",
    description:
      "Put every stylist’s book online so clients can reserve a service from Instagram, Google, or your site.",
    href: "/solutions/salon-appointment-scheduling-software",
    icon: "salon",
    benefits: [
      "24/7 booking for each service and stylist",
      "WhatsApp and SMS reminders before the visit",
      "Live availability that blocks a double-booked chair",
    ],
  },
  {
    id: "tutors-education",
    title: "Tutors & Education",
    description:
      "Let students book a lesson inside your rules, including the classes that repeat every week.",
    href: "/solutions/tutor-appointment-booking-software",
    icon: "tutor",
    benefits: [
      "Self-serve booking and rescheduling within your availability",
      "Daily, weekly, or monthly series, including 12 sessions",
      "Email reminders and a Google Meet join link on the booking",
    ],
  },
];

export type PlatformBenefit = {
  id: string;
  title: string;
  description: string;
};

/** Shared product capabilities, written once so industry cards stay specific. */
export const platformBenefits: readonly PlatformBenefit[] = [
  {
    id: "booking-link",
    title: "A booking link that stays open",
    description:
      "Clients book from a page you share on your website, Google profile, or messages — including after hours.",
  },
  {
    id: "reminders",
    title: "Reminders on the channels you use",
    description:
      "Send WhatsApp, SMS, and email reminders on the schedule you choose, so fewer appointments go empty.",
  },
  {
    id: "calendar-sync",
    title: "Calendars that match",
    description:
      "Two-way Google Calendar sync and live availability keep the book you show clients aligned with your day.",
  },
  {
    id: "team",
    title: "A roster the whole team can use",
    description:
      "Add staff, assign services, and give each person a view of their own schedule from phone, tablet, or desktop.",
  },
];

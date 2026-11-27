import Image from "next/image";
import type { ReactNode } from "react";
import Heading from "@/app/component/Heading";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: false as const,
};

function BoltIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5">
      <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg {...iconProps} className="h-4 w-4">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const benefits: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: "Save Time",
    description: "Let clients book anytime, anywhere",
    icon: <BoltIcon />,
  },
  {
    title: "Stay Organized",
    description: "Manage your schedule effortlessly",
    icon: <CalendarIcon />,
  },
  {
    title: "Grow Your Business",
    description: "Focus on what matters most",
    icon: <UsersIcon />,
  },
];

const bookingTypes: {
  title: string;
  description: string;
  image: string;
  imageClassName?: string;
  alt: string;
  icon: ReactNode;
  overlay: ReactNode;
}[] = [
  {
    title: "One Time Booking",
    description: "Let clients book a single appointment whenever they need.",
    image: "/booking-types/one-time.jpg",
    imageClassName: "object-cover object-[70%_center]",
    alt: "Printed calendar with a pin marking one date",
    icon: <CalendarIcon />,
    overlay: (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 drop-shadow">
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden focusable={false}>
          <path fill="currentColor" d="M12 2c-2.8 0-5 2.1-5 4.8 0 3.6 5 9.7 5 9.7s5-6.1 5-9.7C17 4.1 14.8 2 12 2zm0 6.4a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z" />
          <path fill="currentColor" d="M8.2 16.2h7.6l-.7 4.3H8.9l-.7-4.3z" />
        </svg>
      </span>
    ),
  },
  {
    title: "One on One",
    description: "Schedule personalized 1:1 sessions for clients, students or patients.",
    image: "/booking-types/one-on-one.jpg",
    alt: "Professional meeting a client one on one",
    icon: <UserIcon />,
    overlay: null,
  },
  {
    title: "Group Booking",
    description: "Host classes, workshops or group sessions with ease.",
    image: "/booking-types/group.jpg",
    alt: "Instructor leading a small group session",
    icon: <UsersIcon />,
    overlay: null,
  },
  {
    title: "Recurring Booking",
    description: "Set up repeat appointments for ongoing sessions.",
    image: "/booking-types/recurring.jpg",
    alt: "Desk calendar marked for repeating appointments",
    icon: <RefreshIcon />,
    overlay: (
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-indigo-600 shadow-sm">
          <RefreshIcon />
        </span>
      </span>
    ),
  },
];

export default function BookingTypesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="booking-types-heading">
      <div className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-indigo-100/80 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-indigo-100/70 blur-3xl" aria-hidden />

      <div className="relative mx-auto container grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative">
          <Heading
            badge="Choose your booking type"
            title="Flexible Scheduling for"
            highlightText="Every Need"
            description="Whether you need a quick appointment, a personal consultation, group session, or recurring bookings — GetSetTime makes it simple."
            titleClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black text-neutral-900 capitalize"
          />                          

          <ul className="mt-8 space-y-5">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  {benefit.icon}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-neutral-900">{benefit.title}</span>
                  <span className="mt-0.5 block text-sm text-neutral-500">{benefit.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="space-y-3.5 sm:space-y-4">
          {bookingTypes.map((type) => (
            <li key={type.title} className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:gap-4 sm:p-4">
              <span className="relative h-16 w-[4.75rem] shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-[4.5rem] sm:w-[5.5rem]">
                <Image src={type.image} alt={type.alt} fill sizes="88px" className={`${type.imageClassName ?? "object-cover"} transition duration-500 group-hover:scale-105`} />
                {type.overlay}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                {type.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-neutral-950 sm:text-base">{type.title}</span>
                <span className="mt-0.5 block text-xs leading-5 text-neutral-500 sm:text-sm">{type.description}</span>
              </span>
              <span className="shrink-0 pr-1 text-neutral-400 transition duration-300 group-hover:translate-x-1 group-hover:text-indigo-600">
                <ArrowIcon />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

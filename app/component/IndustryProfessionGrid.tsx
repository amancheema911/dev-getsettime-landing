"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useProfessions } from "@/app/component/useProfessions";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
  "aria-hidden": true as const,
  focusable: false as const,
};

function PaletteIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg {...iconProps}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...iconProps}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ToothIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8.1 3.6c-1.7.2-2.9 1.6-3 3.3-.1 2.1.6 3.5 1.1 5.2.4 1.5.5 3.6 1.5 3.6.8 0 1.1-1.2 1.4-2.6.3-1.3.6-2.1 1.4-2.1s1.1.8 1.4 2.1c.3 1.4.6 2.6 1.4 2.6 1 0 1.1-2.1 1.5-3.6.5-1.7 1.2-3.1 1.1-5.2-.1-1.7-1.3-3.1-3-3.3-1.1-.1-1.8.6-2.4 1.2-.6-.6-1.3-1.3-2.4-1.2Z" />
    </svg>
  );
}

function FaceIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      <path d="M9 14.4c.8.9 1.8 1.3 3 1.3s2.2-.4 3-1.3" />
    </svg>
  );
}

function HeartPulseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 5.2h6.2A3.3 3.3 0 0 1 12.5 8.5V19a2.6 2.6 0 0 0-2.6-2.2H3V5.2Z" />
      <path d="M21 5.2h-6.2A3.3 3.3 0 0 0 11.5 8.5V19a2.6 2.6 0 0 1 2.6-2.2H21V5.2Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function BanknoteIcon() {
  return (
    <svg {...iconProps}>
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg {...iconProps}>
      <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
      <path d="m2.5 21.5 1.4-1.4" />
      <path d="m20.1 3.9 1.4-1.4" />
      <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
      <path d="m9.6 14.4 4.8-4.8" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg {...iconProps}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg {...iconProps}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ScissorsIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88" />
      <path d="M14.47 14.48 20 20" />
      <path d="M8.12 8.12 12 12" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="5" r="1.6" />
      <path d="M12 6.8v4.2" />
      <path d="M8.2 9.2 12 11l3.8-1.8" />
      <path d="m8.5 20 3.5-6 3.5 6" />
    </svg>
  );
}

type ProfessionDetails = {
  href: string;
  /** Shown under the name once it has text. Leave "" until the copy is ready. */
  description: string;
  icon: ReactNode;
};

/**
 * Profession name (as returned by the API) → link, icon, and description.
 * Add a new profession by copying one entry and changing these three fields.
 */
const professionCards: Record<string, ProfessionDetails> = {
  Artist: {
    href: "/solutions",
    description: "",
    icon: <PaletteIcon />,
  },
  Automotive: {
    href: "/solutions",
    description: "",
    icon: <CarIcon />,
  },
  Consultant: {
    href: "/solutions",
    description: "",
    icon: <UserIcon />,
  },
  Dentist: {
    href: "/solutions/dentist-appointment-scheduling-software",
    description: "",
    icon: <ToothIcon />,
  },
  Dermatology: {
    href: "/solutions/dermatology-appointment-scheduling-software",
    description: "",
    icon: <FaceIcon />,
  },
  Doctor: {
    href: "/solutions/doctor-appointment-scheduling-software",
    description: "",
    icon: <HeartPulseIcon />,
  },
  Education: {
    href: "/solutions/tutor-appointment-booking-software",
    description: "",
    icon: <BookIcon />,
  },
  Events: {
    href: "/solutions",
    description: "",
    icon: <CalendarIcon />,
  },
  Finance: {
    href: "/solutions",
    description: "",
    icon: <BanknoteIcon />,
  },
  Fitness: {
    href: "/solutions/gym-appointment-booking-software",
    description: "",
    icon: <DumbbellIcon />,
  },
  "IT Services": {
    href: "/solutions",
    description: "",
    icon: <MonitorIcon />,
  },
  "Legal & Immigration Services": {
    href: "/solutions/immigration-appointment-booking-software",
    description: "",
    icon: <ScaleIcon />,
  },
  "Real Estate": {
    href: "/solutions/real-estate-appointment-booking-software",
    description: "",
    icon: <HouseIcon />,
  },
  Recruitment: {
    href: "/solutions",
    description: "",
    icon: <UsersIcon />,
  },
  Salon: {
    href: "/solutions/salon-appointment-scheduling-software",
    description: "",
    icon: <ScissorsIcon />,
  },
  "Sports & Fitness": {
    href: "/solutions/gym-appointment-booking-software",
    description: "",
    icon: <DumbbellIcon />,
  },
  "Therapy Consultant": {
    href: "/solutions/physiotherapist-appointment-booking-software",
    description: "",
    icon: <ActivityIcon />,
  },
};

function professionDetails(name: string) {
  const key = name.trim().toLowerCase();
  const match = Object.entries(professionCards).find(([label]) => label.toLowerCase() === key);
  return match?.[1];
}

const tones = [
  "bg-rose-50 text-rose-600",
  "bg-fuchsia-50 text-fuchsia-600",
  "bg-indigo-50 text-indigo-600",
  "bg-amber-50 text-amber-600",
  "bg-emerald-50 text-emerald-600",
  "bg-violet-50 text-violet-600",
];

const gridClassName =
  "mx-auto grid w-full max-w-md grid-cols-2 justify-items-center gap-4 sm:max-w-2xl sm:grid-cols-3 sm:gap-5 lg:max-w-3xl lg:grid-cols-3 lg:gap-4 xl:max-w-none xl:grid-cols-6";

export default function IndustryProfessionGrid() {
  const { professions, status } = useProfessions();

  if (status === "loading" && professions.length === 0) {
    return (
      <ul className={gridClassName} aria-busy="true" aria-label="Loading professions">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index} className="w-full max-w-[11.5rem] lg:max-w-none">
            <div className="flex h-full animate-pulse flex-col items-center rounded-2xl border border-white bg-white p-4 shadow-sm shadow-slate-200/70">
              <span className="mb-3 h-11 w-11 rounded-xl bg-slate-100" />
              <span className="h-4 w-16 rounded bg-slate-100" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (status === "error" || professions.length === 0) {
    return (
      <p className="text-center text-sm text-neutral-500" role="status">
        Professions could not be loaded.
      </p>
    );
  }

  return (
    <ul className={gridClassName}>
      {professions.map((profession, index) => {
        const details = professionDetails(profession.name);
        const href = details?.href ?? "/solutions";
        const description = details?.description.trim() ?? "";
        const initial = profession.name.trim().charAt(0).toUpperCase();
        return (
          <li key={profession.id} className="w-full max-w-[11.5rem] lg:max-w-none">
            <Link
              href={href}
              aria-label={`${profession.name} scheduling software`}
              className="flex h-full flex-col items-center rounded-2xl border border-white bg-white p-4 text-center shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold [&_svg]:h-5 [&_svg]:w-5 ${tones[index % tones.length]}`}>
                {details?.icon ?? initial}
              </span>
              <span className="block text-sm font-semibold leading-tight text-neutral-900">{profession.name}</span>
              {description ? (
                <span className="mt-1 block text-xs leading-snug text-neutral-500">{description}</span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

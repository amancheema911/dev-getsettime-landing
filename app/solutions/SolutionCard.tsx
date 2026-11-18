import Card from "@/app/component/Card";
import type {
  HubSolution,
  PlatformBenefit,
  SolutionIconKey,
} from "@/lib/solutions-hub-data";

const iconProps = {
  className: "h-5 w-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: false as const,
};

function SolutionIcon({ name }: { name: SolutionIconKey }) {
  switch (name) {
    case "doctor":
      return (
        <svg {...iconProps}>
          <path d="M11 2v2" />
          <path d="M5 2v2" />
          <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
          <path d="M8 15a6 6 0 0 0 12 0v-3" />
          <circle cx="20" cy="10" r="2" />
        </svg>
      );
    case "dental":
      return (
        <svg {...iconProps}>
          <path d="M8.1 3.6c-1.7.2-2.9 1.6-3 3.3-.1 2.1.6 3.5 1.1 5.2.4 1.5.5 3.6 1.5 3.6.8 0 1.1-1.2 1.4-2.6.3-1.3.6-2.1 1.4-2.1s1.1.8 1.4 2.1c.3 1.4.6 2.6 1.4 2.6 1 0 1.1-2.1 1.5-3.6.5-1.7 1.2-3.1 1.1-5.2-.1-1.7-1.3-3.1-3-3.3-1.1-.1-1.8.6-2.4 1.2-.6-.6-1.3-1.3-2.4-1.2Z" />
        </svg>
      );
    case "dermatology":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="9" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="15" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
          <path d="M9 14.4c.8.9 1.8 1.3 3 1.3s2.2-.4 3-1.3" />
        </svg>
      );
    case "physio":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="5" r="1.6" />
          <path d="M12 6.8v4.2" />
          <path d="M8.2 9.2 12 11l3.8-1.8" />
          <path d="m8.5 20 3.5-6 3.5 6" />
        </svg>
      );
    case "salon":
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="6" r="2.6" />
          <circle cx="6" cy="18" r="2.6" />
          <path d="M8.2 7.8 20 19.6" />
          <path d="M14.4 14.2 20 8.6" />
          <path d="M8.2 16.2 12 12.4" />
        </svg>
      );
    case "tutor":
      return (
        <svg {...iconProps}>
          <path d="M3 5.2h6.2A3.3 3.3 0 0 1 12.5 8.5V19a2.6 2.6 0 0 0-2.6-2.2H3V5.2Z" />
          <path d="M21 5.2h-6.2A3.3 3.3 0 0 0 11.5 8.5V19a2.6 2.6 0 0 1 2.6-2.2H21V5.2Z" />
        </svg>
      );
    default: {
      const _exhaustive: never = name;
      return _exhaustive;
    }
  }
}

function BenefitIcon({ id }: { id: string }) {
  switch (id) {
    case "booking-link":
      return (
        <svg {...iconProps}>
          <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
          <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" />
          <path d="m8.5 14.2 2.2 2.2 4.3-4.4" />
        </svg>
      );
    case "reminders":
      return (
        <svg {...iconProps}>
          <path d="M6 9.2a6 6 0 1 1 12 0c0 4.2 1.4 5.6 1.4 5.6H4.6S6 13.4 6 9.2Z" />
          <path d="M10.2 18.2a2 2 0 0 0 3.6 0" />
        </svg>
      );
    case "calendar-sync":
      return (
        <svg {...iconProps}>
          <path d="M16.5 4.2h.2A2.3 2.3 0 0 1 19 6.5V8" />
          <path d="M19 5.2 16.8 7.4 19 9.6" />
          <path d="M7.5 19.8h-.2A2.3 2.3 0 0 1 5 17.5V16" />
          <path d="M5 18.8 7.2 16.6 5 14.4" />
          <rect x="7" y="7" width="10" height="10" rx="1.8" />
        </svg>
      );
    case "team":
      return (
        <svg {...iconProps}>
          <path d="M16 19.5v-1.2a3.2 3.2 0 0 0-3.2-3.2H7.2A3.2 3.2 0 0 0 4 18.3v1.2" />
          <circle cx="10" cy="8.2" r="2.6" />
          <path d="M20 19.5v-1.1a3 3 0 0 0-2.2-2.9" />
          <path d="M16.2 5.7a2.6 2.6 0 0 1 0 4.8" />
        </svg>
      );
    default:
      return null;
  }
}

export function SolutionCardGrid({ solutions }: { solutions: readonly HubSolution[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
      {solutions.map((solution) => (
        <li key={solution.id} className="min-w-0">
          <Card
            href={solution.href}
            title={solution.title}
            description={solution.description}
            iconNode={<SolutionIcon name={solution.icon} />}
            bullets={solution.benefits}
            wrapperClassName="group relative"            
            iconWrapperClassName="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white"            
            footer={
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-neutral-950">
                Explore Solution
                <span className="sr-only"> for {solution.title}</span>
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden focusable="false">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            }
          />
        </li>
      ))}
    </ul>
  );
}

export function PlatformBenefits({ benefits }: { benefits: readonly PlatformBenefit[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      {benefits.map((benefit) => (
        <li key={benefit.id} className="min-w-0">
          <Card
            title={benefit.title}
            description={benefit.description}
            iconNode={<BenefitIcon id={benefit.id} />}
            wrapperClassName="group relative h-full"
            iconWrapperClassName="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white"
            titleClassName="text-base font-semibold tracking-tight text-neutral-950"
            descriptionClassName="text-sm leading-6 text-neutral-600"
          />
        </li>
      ))}
    </ul>
  );
}

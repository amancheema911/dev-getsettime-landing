import Link from "next/link";
import type { ReactNode } from "react";

const displayClass = /(?:^|\s)(?:[\w-]+:)*?(?:hidden|inline-flex|inline-block|inline|flex|block|grid|contents)(?=$|\s)/;

const tones = {
  dark: "bg-gray-900 text-white hover:bg-gray-800",
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  light: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
} as const;

export type ButtonTone = keyof typeof tones;

type ButtonProps = {
  buttonLink: string;
  buttonText: ReactNode;
  ariaLabel?: string;
  className?: string;
  target?: string;
  source?: string;
  tone?: ButtonTone;
};

export default function Button({
  buttonLink,
  buttonText,
  ariaLabel,
  className = "",
  target = "_blank",
  source = "",
  tone,
}: ButtonProps) {
  const label = ariaLabel ?? (typeof buttonText === "string" ? buttonText : undefined);
  const toneClass = tone ? tones[tone] : "";

  return (
    <Link
      href={buttonLink}
      target={target}
      aria-label={label}
      data-source={source}
      className={[
        displayClass.test(className) ? "" : "inline-flex",
        "items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2",
        toneClass,
        className,
      ].filter(Boolean).join(" ")}
    >
      {buttonText}
    </Link>
  );
}

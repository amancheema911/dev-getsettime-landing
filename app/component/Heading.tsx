import type { ReactNode } from "react";

type HeadingProps = {
  badge?: string;
  title: ReactNode;
  highlightText?: ReactNode;
  description?: ReactNode;
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  wrapperClassName?: string;
  badgeClassName?: string;
  badgeDotClassName?: string;
  titleClassName?: string;
  highlightClassName?: string;
  descriptionClassName?: string;
};

export default function Heading({
  badge,
  title,
  highlightText,
  description,
  headingTag = "h2",
  wrapperClassName = "space-y-3",
  badgeClassName = "inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-600 drop-shadow-sm sm:gap-3 sm:tracking-widest",
  badgeDotClassName = "hidden sm:block h-2 w-2 min-w-2 min-h-2 rounded-full bg-indigo-500",
  titleClassName = "text-2xl sm:text-3xl font-bold text-neutral-900 md:text-4xl lg:text-[40px] capitalize",
  highlightClassName = "bg-gradient-to-r from-indigo-700 via-violet-600 to-sky-500 bg-clip-text text-transparent",
  descriptionClassName = "",
}: HeadingProps) {
  const HeadingTag = headingTag;

  return (
    <div className={wrapperClassName}>
      {badge && (
        <div className={`${badgeClassName} max-w-full flex-wrap whitespace-normal`}>
          <span className={badgeDotClassName} />
          <span className="min-w-0">{badge}</span>
        </div>
      )}
      <HeadingTag className={`text-balance ${titleClassName}`}>
        {title} {highlightText && <span className={highlightClassName}>{highlightText}</span>}
      </HeadingTag>
      {description && (
        <p className={`text-pretty ${descriptionClassName}`}>{description}</p>
      )}
    </div>
  );
}
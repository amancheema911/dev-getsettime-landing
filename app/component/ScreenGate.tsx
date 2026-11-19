"use client";

import { useId, type ReactNode } from "react";

type ScreenGateProps = {
  children: ReactNode;
  fallback?: ReactNode;
  /** Render children when viewport width is >= this value (px). */
  minWidth?: number;
  /** Render children when viewport width is <= this value (px). */
  maxWidth?: number;
};

function buildMediaQuery(minWidth?: number, maxWidth?: number): string | null {
  const conditions: string[] = [];

  if (minWidth !== undefined) {
    conditions.push(`(min-width: ${minWidth}px)`);
  }

  if (maxWidth !== undefined) {
    conditions.push(`(max-width: ${maxWidth}px)`);
  }

  if (conditions.length === 0) {
    return null;
  }

  return conditions.join(" and ");
}

/** Known breakpoints are styled in globals.css so the first paint already has the right size. */
function gateShowClass(minWidth?: number, maxWidth?: number): string | null {
  if (minWidth != null && maxWidth != null) return null;
  if (minWidth === 640) return "sg-min-640";
  if (minWidth === 768) return "sg-min-768";
  if (minWidth === 1024) return "sg-min-1024";
  if (maxWidth === 639) return "sg-max-639";
  if (maxWidth === 1023) return "sg-max-1023";
  return null;
}

function DynamicGate({
  query,
  fallback,
  children,
}: {
  query: string;
  fallback?: ReactNode;
  children: ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const show = `sgc-${id}`;
  const hide = `sgc-${id}-f`;

  return (
    <>
      <style>{`.${show}{display:none}.${hide}{display:contents}@media ${query}{.${show}{display:contents}.${hide}{display:none}}`}</style>
      <div className={show}>{children}</div>
      {fallback != null ? <div className={hide}>{fallback}</div> : null}
    </>
  );
}

export default function ScreenGate({
  children,
  fallback = null,
  minWidth,
  maxWidth,
}: ScreenGateProps) {
  const query = buildMediaQuery(minWidth, maxWidth);

  if (!query) {
    return <>{children}</>;
  }

  const showClass = gateShowClass(minWidth, maxWidth);
  if (showClass && fallback == null) {
    return <div className={showClass}>{children}</div>;
  }

  return (
    <DynamicGate query={query} fallback={fallback}>
      {children}
    </DynamicGate>
  );
}

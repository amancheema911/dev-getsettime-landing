"use client";

import { useEffect, useState } from "react";
import { featureSections } from "./feature-data";

const links = featureSections.map((section) => ({
  id: section.id,
  label: section.navLabel,
}));

export function scrollToFeature(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export default function FeatureNav() {
  const [activeId, setActiveId] = useState(links[0].id);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) return;

    const update = () => {
      const marker = 220;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top - marker <= 0) current = section.id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return (
    <nav
      aria-label="Feature categories"
      className="sticky top-16 z-40 border-b border-indigo-100 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto container px-4 py-3 sm:px-6 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto rounded-xl bg-white p-2 drop-shadow-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const current = activeId === link.id;
            return (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  aria-current={current ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToFeature(link.id);
                    setActiveId(link.id);
                  }}
                  className={`inline-flex min-h-11 cursor-pointer items-center rounded-xl px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:px-4 ${
                    current
                      ? "bg-indigo-600 text-white drop-shadow-md"
                      : "text-neutral-700 hover:bg-indigo-500/10 hover:text-indigo-600"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

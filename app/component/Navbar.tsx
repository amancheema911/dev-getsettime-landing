"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
import { createPortal } from "react-dom";
import { BASE_URL, LOGIN_URL, REGISTER_URL } from "@/lib/config";
import Logo from "./Logo";
import Button from "./ui/button/Button";
import { useDialogBehavior } from "./useDialogBehavior";

const solutionLinks = [
  { href: "/solutions/doctor-appointment-scheduling-software", label: "Doctor", aria: "Doctor appointment Software - Navbar" },
  { href: "/solutions/dentist-appointment-scheduling-software", label: "Dentist", aria: "Dentist appointment Software - Navbar" },
  { href: "/solutions/dermatology-appointment-scheduling-software", label: "Dermatology", aria: "Dermatology appointment Software - Navbar" },
  { href: "/solutions/physiotherapist-appointment-booking-software", label: "Physiotherapy", aria: "Physiotherapy appointment Software - Navbar" },
  { href: "/solutions/salon-appointment-scheduling-software", label: "Salon", aria: "Salon appointment Software - Navbar" },
  { href: "/solutions/tutor-appointment-booking-software", label: "Tutor", aria: "Tutor appointment booking software - Navbar" },
] as const;

function scrollToHashSection(hash: string) {
  if (typeof window === "undefined" || !hash) return;
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function canHoverMenu() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState<boolean>(false);
  const [desktopSolutionsOpen, setDesktopSolutionsOpen] = useState<boolean>(false);
  const desktopSolutionsRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ left: number; top: number; width: number } | null>(null);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setOpen(false), []);
  useDialogBehavior(open, closeMenu, menuPanelRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDesktopSolutionsOpen(false);
    setMobileSolutionsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/" || pathname === "";

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return isHome;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname, isHome]
  );

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string | null) => {
      setOpen(false);
      setDesktopSolutionsOpen(false);
      if (!hash || !isHome) return;
      e.preventDefault();
      scrollToHashSection(hash);
      window.history.pushState(null, "", `/#${hash}`);
    },
    [isHome]
  );

  const placeDesktopSolutionsMenu = useCallback(() => {
    const trigger = desktopSolutionsRef.current;
    if (!trigger) return;
    const triggerRect = trigger.getBoundingClientRect();
    const padding = 16;
    const width = Math.min(400, window.innerWidth - padding * 2);
    const maxLeft = window.innerWidth - padding - width;
    const left = Math.min(Math.max(triggerRect.left, padding), Math.max(padding, maxLeft));
    const top = Math.min(triggerRect.bottom, window.innerHeight - padding);
    setMenuPosition({ left, top, width });
  }, []);

  useIsoLayoutEffect(() => {
    if (!desktopSolutionsOpen) return;
    placeDesktopSolutionsMenu();
    const closeOnScroll = () => setDesktopSolutionsOpen(false);
    window.addEventListener("resize", placeDesktopSolutionsMenu);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", placeDesktopSolutionsMenu);
      window.removeEventListener("scroll", closeOnScroll);
    };
  }, [desktopSolutionsOpen, placeDesktopSolutionsMenu]);

  useEffect(() => {
    if (!desktopSolutionsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!desktopSolutionsRef.current?.contains(event.target as Node)) {
        setDesktopSolutionsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopSolutionsOpen(false);
        desktopSolutionsRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopSolutionsOpen]);

  useEffect(() => {
    if (typeof window === "undefined" || !isHome) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const id = ["features", "support", "pricing"].includes(hash) ? hash : null;
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      const t = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isHome, pathname]);

  const linkClass = (active: boolean) =>
    `text-sm font-medium hover:text-indigo-600 transition-all duration-200 relative group flex items-center ${active ? "text-indigo-600" : ""}`;

  const underline = (active: boolean) =>
    `absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-secondary-500 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`;

  return (
    <>
    <header className="sticky z-999 top-0 border-b border-gray-200 bg-white w-full">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3 lg:items-stretch">
            <Logo />

            <nav className="hidden min-w-0 items-stretch justify-between gap-4 xl:gap-8 lg:flex" aria-label="Primary">
              <Link href="/features" onClick={(e) => handleAnchorClick(e, null)} aria-label="Features - Navbar" aria-current={isActive("/features") ? "page" : undefined} className={linkClass(isActive("/features"))}>
                Features
                <span className={underline(isActive("/features"))}></span>
              </Link>
              <Link href="/contact-us" onClick={(e) => handleAnchorClick(e, null)} aria-label="Support - Navbar" aria-current={isActive("/contact-us") ? "page" : undefined} className={linkClass(isActive("/contact-us"))}>
                Support
                <span className={underline(isActive("/contact-us"))}></span>
              </Link>
              <Link href="/pricing" onClick={(e) => handleAnchorClick(e, null)} aria-label="Pricing - Navbar" aria-current={isActive("/pricing") ? "page" : undefined} className={linkClass(isActive("/pricing"))}>
                Pricing
                <span className={underline(isActive("/pricing"))}></span>
              </Link>
              <div
                ref={desktopSolutionsRef}
                className="relative flex items-center"
                onMouseEnter={() => {
                  if (canHoverMenu()) setDesktopSolutionsOpen(true);
                }}
                onMouseLeave={() => {
                  if (canHoverMenu()) setDesktopSolutionsOpen(false);
                }}
                onBlur={(e) => {
                  if (!desktopSolutionsRef.current?.contains(e.relatedTarget as Node)) {
                    setDesktopSolutionsOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={desktopSolutionsOpen}
                  aria-haspopup="true"
                  aria-controls="desktop-solutions-menu"
                  aria-current={isActive("/solutions") ? "page" : undefined}
                  className={`relative inline-flex h-full cursor-pointer items-center gap-1 text-sm font-medium transition-all duration-200 hover:text-indigo-600 ${isActive("/solutions") ? "text-indigo-600" : ""}`}
                  onClick={() => setDesktopSolutionsOpen((v) => !v)}
                >
                  Solutions
                  <svg className={`h-4 w-4 transition-transform duration-200 ${desktopSolutionsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-secondary-500 transition-all duration-300 ${desktopSolutionsOpen || isActive("/solutions") ? "w-full" : "w-0"}`}></span>
                </button>
                {desktopSolutionsOpen && menuPosition && (
                <div
                  id="desktop-solutions-menu"
                  className="fixed z-50 max-h-[min(70dvh,calc(100dvh-5rem))] overflow-y-auto overscroll-contain"
                  style={{ left: menuPosition.left, top: menuPosition.top, width: menuPosition.width }}
                >
                  <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 drop-shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur">
                    <div className="mb-3 border-b border-[#e0dbd2] pb-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[12px] font-bold uppercase tracking-wider text-zinc-400">Solutions</div>
                        <Link className="text-[12px] font-bold tracking-wider text-zinc-600 hover:text-indigo-600" href="/solutions" onClick={() => setDesktopSolutionsOpen(false)}>VIEW ALL</Link>
                      </div>
                      <div className="mt-1 text-[14px] font-extrabold text-zinc-950">Explore industry-specific scheduling pages</div>
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      {solutionLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-label={item.aria}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          onClick={() => setDesktopSolutionsOpen(false)}
                          className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${isActive(item.href) ? "bg-indigo-50 font-semibold text-indigo-700" : "text-neutral-700 hover:bg-indigo-50 hover:text-indigo-700"}`}
                        >
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                          <span className="leading-5">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                )}
              </div>

              <Link href={`${BASE_URL}/blog`} onClick={(e) => handleAnchorClick(e, null)} aria-label="Blog - Navbar" aria-current={isActive("/blog") ? "page" : undefined} className={linkClass(isActive("/blog"))}>
                Blog
                <span className={underline(isActive("/blog"))}></span>
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Button buttonLink={`${LOGIN_URL}`} buttonText="Sign In" ariaLabel="Sign In - Navbar" source="navbar" tone="light" className="hidden sm:inline-flex" />
              <Button buttonLink={`${REGISTER_URL}`} buttonText="Start Free" ariaLabel="Sign Up - Navbar" source="navbar" tone="primary" />
              <button
                ref={menuButtonRef}
                type="button"
                className="hidden h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 text-neutral-800 transition hover:border-indigo-200 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:inline-flex lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="site-menu"
                onClick={() => setOpen((value) => !value)}
              >
                <MenuIcon open={open} />
              </button>
            </div>

          </div>
        </div>
    </header>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[1100] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-950/50"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            id="site-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <p className="text-sm font-semibold text-neutral-900">Menu</p>
              <button
                type="button"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                aria-label="Close menu"
              >
                <MenuIcon open />
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-2" aria-label="Mobile">
              <Link href="/features" onClick={(e) => handleAnchorClick(e, null)} aria-current={isActive("/features") ? "page" : undefined} className={`flex min-h-11 items-center rounded-xl px-3 text-base font-medium ${isActive("/features") ? "bg-indigo-50 text-indigo-700" : "text-neutral-800 hover:bg-neutral-50"}`}>Features</Link>
              <Link href="/contact-us" onClick={(e) => handleAnchorClick(e, null)} aria-current={isActive("/contact-us") ? "page" : undefined} className={`flex min-h-11 items-center rounded-xl px-3 text-base font-medium ${isActive("/contact-us") ? "bg-indigo-50 text-indigo-700" : "text-neutral-800 hover:bg-neutral-50"}`}>Support</Link>
              <Link href="/pricing" onClick={(e) => handleAnchorClick(e, null)} aria-current={isActive("/pricing") ? "page" : undefined} className={`flex min-h-11 items-center rounded-xl px-3 text-base font-medium ${isActive("/pricing") ? "bg-indigo-50 text-indigo-700" : "text-neutral-800 hover:bg-neutral-50"}`}>Pricing</Link>
              <div>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-base font-medium text-neutral-800 hover:bg-neutral-50"
                  aria-expanded={mobileSolutionsOpen}
                  aria-controls="tablet-solutions"
                  onClick={() => setMobileSolutionsOpen((value) => !value)}
                >
                  Solutions
                  <svg className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileSolutionsOpen && (
                  <div id="tablet-solutions" className="mb-2 ml-3 space-y-1 border-l border-neutral-200 pl-3">
                    <Link href="/solutions" onClick={closeMenu} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-neutral-700 hover:bg-indigo-50 hover:text-indigo-700">View all solutions</Link>
                    {solutionLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-label={item.aria}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={closeMenu}
                        className={`flex min-h-11 items-center rounded-xl px-3 text-sm ${isActive(item.href) ? "bg-indigo-50 font-semibold text-indigo-700" : "text-neutral-700 hover:bg-indigo-50 hover:text-indigo-700"}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href={`${BASE_URL}/blog`} onClick={(e) => handleAnchorClick(e, null)} aria-current={isActive("/blog") ? "page" : undefined} className={`flex min-h-11 items-center rounded-xl px-3 text-base font-medium ${isActive("/blog") ? "bg-indigo-50 text-indigo-700" : "text-neutral-800 hover:bg-neutral-50"}`}>Blog</Link>
            </nav>
            <div className="flex gap-3 border-t border-neutral-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button buttonLink={`${LOGIN_URL}`} buttonText="Sign In" ariaLabel="Sign In - Navbar" source="navbar" tone="light" className="flex-1" />
              <Button buttonLink={`${REGISTER_URL}`} buttonText="Start Free" ariaLabel="Sign Up - Navbar" source="navbar" tone="primary" className="flex-1" />
            </div>
          </div>
        </div>,
        document.body,
      )}

      {/* Phone bottom nav. Tablets use the header menu once the full bar no longer fits. */}
      <div className="fixed inset-x-0 bottom-0 z-[999] block max-w-[100vw] overflow-hidden bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(15,23,42,0.12)] md:hidden">
            <div className="relative">
              <nav className="flex justify-between gap-2" aria-label="Mobile">
                <Link href="/" onClick={(e) => handleAnchorClick(e, null)} aria-label="Home - Navbar" aria-current={isActive("/") ? "page" : undefined} className={`group relative rounded-xl text-center text-xs ${isActive("/") ? "text-indigo-600" : "text-neutral-700"}`}>
                  <span className="mx-auto flex justify-center text-center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>
                  <span className="relative z-10">Home</span>
                </Link>
                <Link href="/solutions" onClick={(e) => handleAnchorClick(e, null)} aria-label="solutions - Navbar" aria-current={isActive("/solutions") ? "page" : undefined} className={`group relative rounded-xl text-center text-xs ${isActive("/solutions") ? "text-indigo-600" : "text-neutral-700"}`}>
                  <span className="mx-auto flex justify-center text-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg></span>
                  <span className="relative z-10">Solutions</span>
                </Link>
                <Link href="/pricing" onClick={(e) => handleAnchorClick(e, null)} aria-label="Pricing - Navbar" aria-current={isActive("/pricing") ? "page" : undefined} className={`group relative rounded-xl text-center text-xs ${isActive("/pricing") ? "text-indigo-600" : "text-neutral-700"}`}>
                  <span className="mx-auto flex justify-center text-center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg></span>
                  <span className="relative z-10">Pricing</span>
                </Link>
                <Link href="/contact-us" onClick={(e) => handleAnchorClick(e, null)} aria-label="Support - Navbar" aria-current={isActive("/contact-us") ? "page" : undefined} className={`group relative rounded-xl text-center text-xs ${isActive("/contact-us") ? "text-indigo-600" : "text-neutral-700"}`}>
                  <span className="mx-auto flex justify-center text-center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg></span>
                  <span className="relative z-10">Support</span>
                </Link>
                <Link href={`${LOGIN_URL}`} target="_blank" aria-label="Sign In - Navbar" className="group relative rounded-xl text-center text-xs">
                <span className="mx-auto flex justify-center text-center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                <span className="relative z-10">Sign in</span>
                </Link>
              </nav>
            </div>
          </div>
    </>
  );
};

"use client";

import { useEffect, useState } from "react";
import { ThemeIcon } from "@/components/icons/theme-icon";
import { navItems, resumePath } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] =
    useState<(typeof navItems)[number]["href"]>("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let next: (typeof navItems)[number]["href"] = "#hero";
        const activationLine = window.innerHeight * 0.35;

        navItems.forEach((item) => {
          const section = document.querySelector<HTMLElement>(item.href);
          if (section && section.getBoundingClientRect().top <= activationLine) {
            next = item.href;
          }
        });

        setActiveHref(next);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/75 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#hero"
            className="inline-flex h-11 w-11 items-center font-mono text-lg font-semibold tracking-tight text-foreground hover:text-accent-hover"
          >
            OS
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 font-mono text-sm transition-colors hover:text-accent-hover",
                  activeHref === item.href
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={resumePath}
              download
              className="btn-ghost hidden gap-2 px-4 py-2 text-sm lg:inline-flex"
            >
              <ThemeIcon name="download-resume" className="h-4 w-4" />
              Resume
            </a>
            <ThemeToggle className="hidden lg:inline-flex" />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent-hover hover:text-accent-hover lg:hidden"
            >
              <ThemeIcon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        activeHref={activeHref}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

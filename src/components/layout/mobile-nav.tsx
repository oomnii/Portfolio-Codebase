"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ThemeIcon } from "@/components/icons/theme-icon";
import { navItems, resumePath } from "@/config/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  activeHref: (typeof navItems)[number]["href"];
  onClose: () => void;
}

export function MobileNav({ open, activeHref, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg lg:hidden"
        >
          <div className="flex h-full flex-col px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-semibold text-foreground">
                OS
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={onClose}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent-hover hover:text-accent-hover"
                >
                  <ThemeIcon name="close" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="mt-16 flex flex-1 flex-col justify-center gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.05 + index * 0.07, duration: 0.3 }}
                  className={cn(
                    "rounded-md px-3 py-2 font-mono text-3xl font-medium transition-colors hover:text-accent-hover",
                    activeHref === item.href
                      ? "bg-accent/10 text-accent"
                      : "text-foreground"
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href={resumePath}
              download
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="btn-primary mb-8 w-full gap-2"
            >
              <ThemeIcon name="download-resume" className="h-4 w-4" />
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { ThemeIcon } from "@/components/icons/theme-icon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground",
          className
        )}
      />
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-accent-hover hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className
      )}
    >
      {isDark ? (
        <ThemeIcon name="theme-sun" className="h-4 w-4" />
      ) : (
        <ThemeIcon name="theme-moon" className="h-4 w-4" />
      )}
    </button>
  );
}

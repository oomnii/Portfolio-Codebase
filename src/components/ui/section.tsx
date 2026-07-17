import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  innerClassName?: string;
}

export function Section({
  as: Component = "section",
  className,
  innerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Component className={cn("section", className)} {...props}>
      <div className={cn("section-inner", innerClassName)}>{children}</div>
    </Component>
  );
}

import { cn } from "@/lib/utils";

export type ThemeIconName =
  | "github"
  | "linkedin"
  | "leetcode"
  | "codeforces"
  | "menu"
  | "close"
  | "theme-sun"
  | "theme-moon"
  | "download-resume"
  | "external-link"
  | "live-project"
  | "mail"
  | "phone"
  | "send-message";

type ThemeIconProps = {
  name: ThemeIconName;
  className?: string;
  alt?: string;
};

export function ThemeIcon({ name, className, alt = "" }: ThemeIconProps) {
  return (
    <span className={cn("inline-flex shrink-0", className)} aria-hidden={!alt}>
      <img
        src={`/icons/black/${name}.png`}
        alt={alt}
        className="h-full w-full object-contain dark:hidden"
      />
      <img
        src={`/icons/white/${name}.png`}
        alt={alt}
        className="hidden h-full w-full object-contain dark:block"
      />
    </span>
  );
}

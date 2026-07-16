import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { CodeforcesIcon } from "@/components/icons/codeforces-icon";
import { LeetCodeIcon } from "@/components/icons/leetcode-icon";
import { socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";

const socialItems = [
  { label: "GitHub", href: socialLinks.github, icon: GitHubIcon },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedInIcon },
  { label: "LeetCode", href: socialLinks.leetcode, icon: LeetCodeIcon },
  { label: "Codeforces", href: socialLinks.codeforces, icon: CodeforcesIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pointer-events-auto border-t border-border bg-background-muted">
      <div className="section-inner flex flex-col items-center gap-6 py-10 text-center">
        <div className="flex items-center gap-3">
          {socialItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-accent-hover hover:text-accent-hover"
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="font-mono text-sm text-muted-foreground">
          © {year} Om Seth. All rights reserved.
        </p>

        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js, Tailwind, GSAP
        </p>
      </div>
    </footer>
  );
}

import { ThemeIcon } from "@/components/icons/theme-icon";

type IconProps = {
  className?: string;
};

export function CodeforcesIcon({ className }: IconProps) {
  return <ThemeIcon name="codeforces" className={className} />;
}

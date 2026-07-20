import { ThemeIcon } from "@/components/icons/theme-icon";

type IconProps = {
  className?: string;
};

export function LinkedInIcon({ className }: IconProps) {
  return <ThemeIcon name="linkedin" className={className} />;
}

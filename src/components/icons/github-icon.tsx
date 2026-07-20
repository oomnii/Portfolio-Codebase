import { ThemeIcon } from "@/components/icons/theme-icon";

type IconProps = {
  className?: string;
};

export function GitHubIcon({ className }: IconProps) {
  return <ThemeIcon name="github" className={className} />;
}

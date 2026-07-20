import { ThemeIcon } from "@/components/icons/theme-icon";

type IconProps = {
  className?: string;
};

export function LeetCodeIcon({ className }: IconProps) {
  return <ThemeIcon name="leetcode" className={className} />;
}

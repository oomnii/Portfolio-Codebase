import type { SVGProps } from "react";

export function LeetCodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.483 2.004a1.04 1.04 0 0 0-1.034 0L2.47 7.51a1.04 1.04 0 0 0-.52.9v8.18c0 .372.2.716.52.9l9.979 5.506a1.04 1.04 0 0 0 1.034 0l9.979-5.506a1.04 1.04 0 0 0 .52-.9V8.41a1.04 1.04 0 0 0-.52-.9L13.483 2.004zm-.483 2.18 7.5 4.14-7.5 4.14-7.5-4.14 7.5-4.14zM4.5 9.89l7.5 4.14v8.28l-7.5-4.14V9.89zm9 12.42v-8.28l7.5-4.14v8.28l-7.5 4.14z" />
    </svg>
  );
}

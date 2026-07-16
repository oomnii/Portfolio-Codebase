"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export function CountUp({
  end,
  suffix = "",
  durationMs = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, end, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

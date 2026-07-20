"use client";

import { motion } from "framer-motion";
import { CodeforcesIcon } from "@/components/icons/codeforces-icon";
import { LeetCodeIcon } from "@/components/icons/leetcode-icon";
import { ThemeIcon } from "@/components/icons/theme-icon";
import { CountUp } from "@/components/ui/count-up";
import { Section } from "@/components/ui/section";

function Stat({
  end,
  suffix = "",
  caption,
}: {
  end: number;
  suffix?: string;
  caption: string;
}) {
  return (
    <div>
      <p className="font-mono text-3xl font-semibold text-foreground md:text-4xl">
        <CountUp end={end} suffix={suffix} />
      </p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{caption}</p>
    </div>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" className="pointer-events-auto bg-background">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="heading-section mb-10"
      >
        Achievements
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-3">
        {/* LeetCode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <div className="mb-5 flex items-center gap-2">
            <LeetCodeIcon className="h-5 w-5" />
            <span className="font-mono text-sm font-semibold text-foreground">
              LeetCode
            </span>
          </div>
          <div className="flex flex-wrap gap-8">
            <Stat end={1870} caption="peak rating" />
            <Stat end={750} suffix="+" caption="problems solved" />
          </div>
        </motion.div>

        {/* Codeforces */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <div className="mb-5 flex items-center gap-2">
            <CodeforcesIcon className="h-5 w-5" />
            <span className="font-mono text-sm font-semibold text-foreground">
              Codeforces
            </span>
          </div>
          <div className="flex flex-wrap gap-8">
            <Stat end={1358} caption="peak rating" />
          </div>
        </motion.div>

        {/* Live quiz platform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <div className="mb-5 flex items-center gap-2">
            <ThemeIcon name="live-project" className="h-5 w-5" />
            <span className="font-mono text-sm font-semibold text-foreground">
              Live Quiz Platform
            </span>
          </div>
          <div className="flex flex-wrap gap-8">
            <Stat end={140} suffix="+" caption="concurrent students" />
          </div>
          <p className="mt-4 text-body text-sm">
            Designed and self-hosted a real-time quiz platform that supported
            140+ concurrent students with zero downtime.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

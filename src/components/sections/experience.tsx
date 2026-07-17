"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/section";

type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
};

// Currently a single formal role. New roles can be prepended here and the
// timeline rail + cards scale automatically — no redesign needed.
const experiences: Experience[] = [
  {
    company: "XelronAI",
    role: "AI Data Training Specialist",
    location: "Remote",
    period: "March 2026 – Present",
    current: true,
    bullets: [
      "Contributed to large-scale AI data training and annotation pipelines used for fine-tuning Large Language Models (LLMs), enhancing model accuracy and reasoning capabilities.",
      "Performed structured prompt-response labeling, factual verification, and rubric-based quality evaluations across multi-domain datasets.",
      "Collaborated with ML engineers and reviewers to refine evaluation guidelines, improving consistency, reliability, and overall training data quality.",
    ],
  },
];

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 pb-10 last:pb-0"
    >
      {/* Rail dot */}
      <div className="relative z-10 mt-1.5 shrink-0">
        <span className="relative flex h-4 w-4 items-center justify-center">
          {item.current && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          )}
          <span
            className={
              item.current
                ? "relative inline-flex h-4 w-4 rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent)]"
                : "relative inline-flex h-4 w-4 rounded-full border-2 border-accent bg-background"
            }
          />
        </span>
      </div>

      {/* Card */}
      <div className="min-w-0 flex-1 rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent-hover/60">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="font-mono text-lg font-semibold text-foreground md:text-xl">
            {item.company}
          </h3>
          {item.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Present
            </span>
          )}
        </div>

        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-mono text-sm text-accent">{item.role}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {item.location} · {item.period}
          </p>
        </div>

        <ul className="space-y-2.5">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-body text-sm md:text-base">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <Section id="experience" className="pointer-events-auto bg-background-muted">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="heading-section mb-10"
      >
        Experience
      </motion.h2>

      <div className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent/50 via-border to-transparent"
        />

        {experiences.map((item, index) => (
          <TimelineItem key={item.company} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
}

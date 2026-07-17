"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const education = [
  {
    school: "Indian Institute of Information Technology, Surat",
    detail: "B.Tech in Electronics and Communication Engineering",
    period: "2023-2027",
    score: "CGPA 8.01",
  },
  {
    school: "Kendriya Vidyalaya ITBP, Karera, Madhya Pradesh",
    detail: "CBSE Class XII: 89.4% | Class X: 94.6%",
    period: "2019-2022",
    score: null,
  },
] as const;

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  return (
    <Section id="about" className="pointer-events-auto bg-background-muted">
      <FadeIn>
        <h2 className="heading-section mb-8">About</h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-12 max-w-3xl space-y-4">
          <p className="text-body">
            I am an Electronics and Communication Engineering undergraduate at
            IIIT Surat, graduating in 2027. Since March 2026, I have worked
            remotely as an AI Data Training Specialist at XelronAI, contributing
            to multi-domain data pipelines for large language model training.
            My work includes prompt-response evaluation, factual verification,
            rubric-based quality review, and improving evaluation guidelines
            with engineers and reviewers.
          </p>
          <p className="text-body">
            I enjoy turning technical ideas into complete, usable systems. I
            have built an NLP-powered hiring platform, a fault-tolerant
            wireless-sensor-network simulator, and a self-hosted security vault
            deployed on Raspberry Pi. These projects let me work across model
            logic, APIs, databases, frontend dashboards, containers, and Linux
            infrastructure, while competitive programming continues to
            strengthen how I approach performance and edge cases.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-wider text-accent">
          Education
        </h3>
      </FadeIn>

      <div className="relative space-y-0">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-2 w-px bg-border md:left-[9px]"
        />

        {education.map((entry, index) => (
          <FadeIn key={entry.school} delay={0.25 + index * 0.1}>
            <div className="relative flex gap-6 pb-8 last:pb-0">
              <div className="relative z-10 mt-2 h-4 w-4 shrink-0 rounded-full border-2 border-accent bg-background md:h-5 md:w-5" />

              <div
                className={cn(
                  "flex-1 rounded-lg border border-border bg-surface p-5",
                  "transition-colors hover:border-accent-hover/60"
                )}
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-mono text-base font-semibold text-foreground md:text-lg">
                    {entry.school}
                  </h4>
                  <span className="font-mono text-xs text-muted-foreground">
                    {entry.period}
                  </span>
                </div>
                <p className="text-body text-sm md:text-base">{entry.detail}</p>
                {entry.score && (
                  <p className="mt-2 font-mono text-sm text-accent">
                    {entry.score}
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

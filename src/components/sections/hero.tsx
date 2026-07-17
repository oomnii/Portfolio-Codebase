"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { RoleTyper } from "@/components/ui/role-typer";
import { Section } from "@/components/ui/section";
import { resumePath } from "@/config/site";

const name = "Om Seth";

const stats = [
  { end: 1870, suffix: "", label: "LeetCode rating" },
  { end: 750, suffix: "+", label: "problems solved" },
  { end: 1358, suffix: "", label: "Codeforces rating" },
] as const;

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.15 + index * 0.06,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <Section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center pb-16 pt-16 lg:py-16"
      innerClassName="mt-[45vh] w-full lg:mt-0"
    >
      <div className="relative z-10 min-w-0 w-full lg:w-1/2 lg:pr-10 xl:pr-16">
        <h1 className="heading-display mb-4" aria-label={name}>
          {name.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className={
                index >= 3 && char !== " " ? "text-accent" : undefined
              }
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-6 min-h-[2rem]"
        >
          <RoleTyper />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-body mb-10 max-w-2xl break-words"
        >
          Third-year ECE student building AI-driven full-stack systems — from
          NLP resume scoring to self-hosted infra — while solving 750+
          algorithmic problems along the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-accent/40 bg-surface/70 px-4 py-3 backdrop-blur-sm transition-colors hover:border-accent-hover"
            >
              <p className="font-mono text-xl font-semibold text-foreground">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="pointer-events-auto flex flex-wrap gap-4"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href={resumePath} download className="btn-ghost gap-2">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 8, 0],
        }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: {
            delay: 2.2,
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="pointer-events-auto absolute bottom-6 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-accent-hover lg:left-1/4"
      >
        <ChevronDown className="h-6 w-6" aria-hidden="true" />
      </motion.a>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

const coreStack = [
  {
    heading: "Languages & Frontend",
    items: ["C++", "JavaScript", "Python", "React"],
  },
  {
    heading: "AI / ML & GenAI",
    items: [
      "PyTorch",
      "Scikit-learn",
      "Hugging Face",
      "LangChain",
      "OpenAI API",
    ],
  },
  {
    heading: "Backend & DB",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "WebSocket",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Firebase",
    ],
  },
  {
    heading: "DevOps & Infra",
    items: ["Docker", "AWS", "Linux", "Git", "GitHub"],
  },
] as const;

function Badge({ label }: { label: string }) {
  return (
    <span className="pointer-events-none inline-flex max-w-full items-center rounded-lg border border-accent/45 bg-surface/70 px-3 py-2 font-mono text-xs text-foreground">
      {label}
    </span>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      className="relative min-h-screen bg-transparent pb-24 pt-[calc(45vh+5rem)] lg:py-32"
      innerClassName="w-full max-w-none px-0"
    >
      <div className="skills-copy-column min-w-0 w-full lg:w-1/3">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h2 className="heading-section mb-2">Skills</h2>
          <p className="pointer-events-none text-body text-muted-foreground">
            hover the keys
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <h3 className="mb-5 font-mono text-sm font-semibold uppercase tracking-wider text-accent">
            Core Stack
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {coreStack.map((group, idx) => (
              <motion.div
                key={group.heading}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="pointer-events-none min-w-0"
              >
                <p className="mb-3 font-mono text-xs font-semibold text-muted-foreground">
                  {group.heading}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <Badge key={item} label={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}


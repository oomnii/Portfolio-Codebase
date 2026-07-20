"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { GitHubIcon } from "@/components/icons/github-icon";
import { ThemeIcon } from "@/components/icons/theme-icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Category = "AI-ML" | "Full-Stack" | "Systems-DevOps";

type Project = {
  title: string;
  stack: string[];
  bullets: string[];
  categories: Category[];
  github: string;
  demo?: string;
};

// Replace placeholder "#" links with real repo / live-demo URLs before deploy.
const projects: Project[] = [
  {
    title: "Smart Hiring & Resume Scoring Platform",
    stack: ["Python", "FastAPI", "React.js", "NLP", "Scikit-learn"],
    categories: ["AI-ML", "Full-Stack"],
    bullets: [
      "Built an end-to-end recruitment platform with separate candidate and recruiter workflows for resume upload, job matching, application tracking, and automated screening.",
      "Designed an NLP scoring pipeline for semantic job matching, skill extraction, missing-skill analysis, and candidate ranking.",
      "Created recruiter tools for candidate search, GitHub profile analysis, fraud signals, and interview readiness, reducing estimated manual screening effort by 60%.",
    ],
    github: "https://github.com/oomnii/Smart-Hiring-and-Resume-Scorer",
  },
  {
    title: "Voronoi WSN Scheduler",
    stack: ["Python", "Flask", "React.js", "Docker", "Machine Learning"],
    categories: ["Full-Stack", "Systems-DevOps", "AI-ML"],
    bullets: [
      "Developed a full-stack wireless-sensor-network simulator using Voronoi-based node scheduling and backup-node selection to study energy efficiency and network lifetime.",
      "Added fault injection, cascading-failure recovery, and interactive dashboards for comparing scheduling behavior under changing conditions.",
      "Containerized the complete application with Docker for reproducible, one-command deployment.",
    ],
    github:
      "https://github.com/oomnii/Energy-Efficient-Node-Scheduling-with-AI-Driven-Optimization",
    demo: "https://voronoi-wsn-scheduler.onrender.com/",
  },
  {
    title: "HomelabVault - SecureManager",
    stack: ["Flask", "SQLite", "SMTP", "Raspberry Pi", "Linux"],
    categories: ["Systems-DevOps", "Full-Stack"],
    bullets: [
      "Built a self-hosted password manager for encrypted credentials, secure IDs, and private notes using Flask and SQLite.",
      "Added email-based one-time-password authentication with SMTP, along with secure backup/export and timestamped audit logs.",
      "Deployed the application on a Raspberry Pi running Linux for private local-network access and hands-on infrastructure management.",
    ],
    github: "https://github.com/oomnii/Homelab-Vault-Secure-Manager",
  },
];

const filters = ["All", "AI-ML", "Full-Stack", "Systems-DevOps"] as const;
type Filter = (typeof filters)[number];

const ProjectCard = forwardRef<
  HTMLElement,
  { project: Project }
>(function ProjectCard({ project }, ref) {
  const hasValidGithub = Boolean(project.github && project.github !== "#");
  const hasValidDemo = Boolean(project.demo && project.demo !== "#");

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex min-w-0 flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-hover/60 hover:shadow-[0_10px_40px_-12px_var(--accent-hover)]"
    >
      <h3 className="mb-3 break-words font-mono text-lg font-semibold text-foreground transition-colors group-hover:text-accent-hover">
        {project.title}
      </h3>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-md border border-border bg-background-muted px-2 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="mb-6 space-y-2.5">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-body text-sm">
            <span
              aria-hidden="true"
              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-3">
        <a
          href={hasValidGithub ? project.github : undefined}
          target={hasValidGithub ? "_blank" : undefined}
          rel={hasValidGithub ? "noopener noreferrer" : undefined}
          aria-disabled={!hasValidGithub}
          className={cn(
            "btn-ghost gap-2 px-4 py-2 text-xs",
            !hasValidGithub &&
              "cursor-not-allowed border-border bg-muted/40 text-muted-foreground opacity-70 hover:border-border hover:text-muted-foreground"
          )}
          onClick={(e) => {
            if (!hasValidGithub) e.preventDefault();
          }}
        >
          <GitHubIcon className="h-4 w-4" />
          GitHub
        </a>

        {project.demo !== undefined && (
          <a
            href={hasValidDemo ? project.demo : undefined}
            target={hasValidDemo ? "_blank" : undefined}
            rel={hasValidDemo ? "noopener noreferrer" : undefined}
            aria-disabled={!hasValidDemo}
            className={cn(
              "btn-primary gap-2 px-4 py-2 text-xs",
              !hasValidDemo &&
                "cursor-not-allowed border-border bg-muted/40 text-muted-foreground opacity-70 hover:bg-muted/40 hover:text-muted-foreground"
            )}
            onClick={(e) => {
              if (!hasValidDemo) e.preventDefault();
            }}
          >
            <ThemeIcon name="external-link" className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
});

export function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active as Category));

  return (
    <Section id="projects" className="pointer-events-auto bg-background">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="heading-section mb-8"
      >
        Projects
      </motion.h2>

      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "min-h-11 rounded-full border px-4 py-1.5 font-mono text-xs transition-colors",
              active === filter
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent-hover/60 hover:text-accent-hover"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

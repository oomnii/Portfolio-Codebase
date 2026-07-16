// Skill data for the 3D interactive keyboard background.
//
// IMPORTANT: the `name` field for each skill MUST match an object name
// that already exists inside /public/assets/skills-keyboard.spline
// (the 3D scene only has physical keycap meshes for the names below —
// you cannot add a "python" or "fastapi" keycap without opening the
// scene in Spline's own editor and modeling/labeling a new key).
//
// These 12 keys are the ones from the original scene that genuinely
// overlap with Om's real stack. Everything else (Python, C++, FastAPI,
// Flask, ML/DL libs, Raspberry Pi, etc.) should be shown in a separate
// "Core Stack" section elsewhere on the page — see the Cursor prompt doc.
export enum SkillNames {
  JS = "js",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  NODEJS = "nodejs",
  GIT = "git",
  GITHUB = "github",
  DOCKER = "docker",
  AWS = "aws",
  LINUX = "linux",
  POSTGRES = "postgres",
  FIREBASE = "firebase",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription:
      "Used it to wire up the front end on every full-stack build I've shipped.",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.HTML]: {
    id: 2,
    name: "html",
    label: "HTML",
    shortDescription:
      "Markup for every dashboard and UI I've built, recruiter and candidate side.",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 3,
    name: "css",
    label: "CSS",
    shortDescription:
      "Responsive layouts for the vault dashboard and recruitment platform UI.",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.REACT]: {
    id: 4,
    name: "react",
    label: "React.js",
    shortDescription:
      "Built the recruiter and candidate dashboards for my Smart Hiring Platform.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 5,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "Backend tooling and APIs alongside FastAPI and Flask services.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  [SkillNames.GIT]: {
    id: 6,
    name: "git",
    label: "Git",
    shortDescription:
      "Version control across every project, from solo builds to team work.",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 7,
    name: "github",
    label: "GitHub",
    shortDescription: "750+ LeetCode problems, every project repo, every push.",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 8,
    name: "docker",
    label: "Docker",
    shortDescription:
      "Containerized the Voronoi WSN Scheduler for one-command reproducible deploys.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.AWS]: {
    id: 9,
    name: "aws",
    label: "AWS",
    shortDescription:
      "Cloud deployment for backend services and trained model artifacts.",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  [SkillNames.LINUX]: {
    id: 10,
    name: "linux",
    label: "Linux",
    shortDescription:
      "Self-hosted HomelabVault on a Raspberry Pi running Linux, 24/7.",
    color: "#fcc624",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "Primary database for the resume-screening platform's structured data.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 12,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "Quick auth and realtime data for smaller prototypes and side builds.",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
};


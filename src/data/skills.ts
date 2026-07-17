// Skill data for the interactive 3D keyboard.
//
// Spline object names are resolved through the aliases below. Matching ignores
// capitalization, spaces, punctuation, and common short forms so the published
// scene and portfolio remain in sync even when an editor uses names such as
// `pyTorch`, `C++`, `postgres`, or `next JS`.

export enum SkillNames {
  CPP = "cplusplus",
  JAVASCRIPT = "javascript",
  PYTHON = "python",
  REACT = "react",
  NODEJS = "nodejs",
  EXPRESS = "expressjs",
  FASTAPI = "fastapi",
  FLASK = "flask",
  WEBSOCKET = "websocket",
  MONGODB = "mongodb",
  POSTGRESQL = "postgresql",
  MYSQL = "mysql",
  SQLITE = "sqlite",
  FIREBASE = "firebase",
  DOCKER = "docker",
  AWS = "aws",
  LINUX = "linux",
  GIT = "git",
  GITHUB = "github",
  PYTORCH = "pytorch",
  SCIKIT_LEARN = "scikitlearn",
  HUGGING_FACE = "huggingface",
  LANGCHAIN = "langchain",
  OPENAI = "openai",
}

export type Skill = {
  id: number;
  name: SkillNames;
  label: string;
  shortDescription: string;
  objectNames: readonly string[];
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.CPP]: {
    id: 1,
    name: SkillNames.CPP,
    label: "C++",
    shortDescription:
      "I use C++ for data structures, algorithms, and competitive programming, which has helped me solve more than 750 problems.",
    objectNames: ["cplusplus", "cpp", "c++"],
  },
  [SkillNames.JAVASCRIPT]: {
    id: 2,
    name: SkillNames.JAVASCRIPT,
    label: "JavaScript",
    shortDescription:
      "I use JavaScript to build interactive dashboards and connect frontend behavior across my web projects.",
    objectNames: ["javascript", "js"],
  },
  [SkillNames.PYTHON]: {
    id: 3,
    name: SkillNames.PYTHON,
    label: "Python",
    shortDescription:
      "Python is my main language for NLP, machine learning, APIs, simulations, and automation.",
    objectNames: ["python", "py"],
  },
  [SkillNames.REACT]: {
    id: 4,
    name: SkillNames.REACT,
    label: "React",
    shortDescription:
      "I built candidate, recruiter, and simulation dashboards as reusable React interfaces.",
    objectNames: ["react", "reactjs", "re"],
  },
  [SkillNames.NODEJS]: {
    id: 5,
    name: SkillNames.NODEJS,
    label: "Node.js",
    shortDescription:
      "I use Node.js for JavaScript-based backend development and API tooling.",
    objectNames: ["nodejs", "node", "njs", "nextjs", "next js"],
  },
  [SkillNames.EXPRESS]: {
    id: 6,
    name: SkillNames.EXPRESS,
    label: "Express.js",
    shortDescription:
      "I am developing my Express.js skills through lightweight REST services and backend prototypes.",
    objectNames: ["expressjs", "express", "exp"],
  },
  [SkillNames.FASTAPI]: {
    id: 7,
    name: SkillNames.FASTAPI,
    label: "FastAPI",
    shortDescription:
      "I used FastAPI to expose the Smart Hiring platform's NLP scoring and recruitment workflows.",
    objectNames: ["fastapi", "fast api", "fa"],
  },
  [SkillNames.FLASK]: {
    id: 8,
    name: SkillNames.FLASK,
    label: "Flask",
    shortDescription:
      "Flask powers the backend of my WSN simulator and my self-hosted HomelabVault application.",
    objectNames: ["flask", "fl"],
  },
  [SkillNames.WEBSOCKET]: {
    id: 9,
    name: SkillNames.WEBSOCKET,
    label: "WebSocket",
    shortDescription:
      "I explore WebSockets for interfaces that need live, two-way updates.",
    objectNames: ["websocket", "websockets", "socketio", "socket.io", "ws"],
  },
  [SkillNames.MONGODB]: {
    id: 10,
    name: SkillNames.MONGODB,
    label: "MongoDB",
    shortDescription:
      "I am learning MongoDB for flexible, document-oriented application data.",
    objectNames: ["mongodb", "mongo", "mdb"],
  },
  [SkillNames.POSTGRESQL]: {
    id: 11,
    name: SkillNames.POSTGRESQL,
    label: "PostgreSQL",
    shortDescription:
      "I use PostgreSQL when a project needs structured relational data and dependable querying.",
    objectNames: ["postgresql", "postgres", "pg"],
  },
  [SkillNames.MYSQL]: {
    id: 12,
    name: SkillNames.MYSQL,
    label: "MySQL",
    shortDescription:
      "I use MySQL to practice relational schema design and application-focused SQL.",
    objectNames: ["mysql", "my sql", "my"],
  },
  [SkillNames.SQLITE]: {
    id: 13,
    name: SkillNames.SQLITE,
    label: "SQLite",
    shortDescription:
      "I used SQLite as the embedded database for HomelabVault on Raspberry Pi.",
    objectNames: ["sqlite", "sqlLite", "sqllite", "sqlite3", "sqlt"],
  },
  [SkillNames.FIREBASE]: {
    id: 14,
    name: SkillNames.FIREBASE,
    label: "Firebase",
    shortDescription:
      "I use Firebase for rapid application prototypes and managed backend services.",
    objectNames: ["firebase", "fb"],
  },
  [SkillNames.DOCKER]: {
    id: 15,
    name: SkillNames.DOCKER,
    label: "Docker",
    shortDescription:
      "I containerized the Voronoi WSN Scheduler for reproducible, one-command deployment.",
    objectNames: ["docker", "dkr", "dk"],
  },
  [SkillNames.AWS]: {
    id: 16,
    name: SkillNames.AWS,
    label: "AWS",
    shortDescription:
      "I use AWS while learning cloud deployment, hosting, and infrastructure workflows.",
    objectNames: ["aws", "amazonwebservices", "amazon web services"],
  },
  [SkillNames.LINUX]: {
    id: 17,
    name: SkillNames.LINUX,
    label: "Linux",
    shortDescription:
      "Linux powers my daily development environment and Raspberry Pi homelab deployments.",
    objectNames: ["linux", "lnx"],
  },
  [SkillNames.GIT]: {
    id: 18,
    name: SkillNames.GIT,
    label: "Git",
    shortDescription:
      "I use Git to manage changes across experiments, coursework, and full-stack projects.",
    objectNames: ["git"],
  },
  [SkillNames.GITHUB]: {
    id: 19,
    name: SkillNames.GITHUB,
    label: "GitHub",
    shortDescription:
      "GitHub is where I publish my projects, document progress, and manage source code.",
    objectNames: ["github", "git hub", "gh"],
  },
  [SkillNames.PYTORCH]: {
    id: 20,
    name: SkillNames.PYTORCH,
    label: "PyTorch",
    shortDescription:
      "I am developing hands-on PyTorch experience through deep-learning experiments.",
    objectNames: ["pytorch", "py torch", "pt"],
  },
  [SkillNames.SCIKIT_LEARN]: {
    id: 21,
    name: SkillNames.SCIKIT_LEARN,
    label: "Scikit-learn",
    shortDescription:
      "I used Scikit-learn to build semantic matching and candidate-ranking workflows for the Smart Hiring platform.",
    objectNames: ["scikitlearn", "scikit-learn", "sklearn", "skl"],
  },
  [SkillNames.HUGGING_FACE]: {
    id: 22,
    name: SkillNames.HUGGING_FACE,
    label: "Hugging Face",
    shortDescription:
      "I am exploring pretrained transformer models and practical NLP workflows with Hugging Face.",
    objectNames: ["huggingface", "hugging face", "hf"],
  },
  [SkillNames.LANGCHAIN]: {
    id: 23,
    name: SkillNames.LANGCHAIN,
    label: "LangChain",
    shortDescription:
      "I am learning LangChain for retrieval-based and tool-using generative AI prototypes.",
    objectNames: ["langchain", "lang chain", "lc"],
  },
  [SkillNames.OPENAI]: {
    id: 24,
    name: SkillNames.OPENAI,
    label: "OpenAI API",
    shortDescription:
      "I use the OpenAI API to prototype generative AI features and model-assisted workflows.",
    objectNames: ["openai", "open ai", "openaiapi", "oai"],
  },
};

const normalizeObjectName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const skillsByObjectName = new Map<string, Skill>();

Object.values(SKILLS).forEach((skill) => {
  [skill.name, skill.label, ...skill.objectNames].forEach((objectName) => {
    skillsByObjectName.set(normalizeObjectName(objectName), skill);
  });
});

export const getSkillByObjectName = (objectName: string) =>
  skillsByObjectName.get(normalizeObjectName(objectName));

export const isObjectForSkill = (objectName: string, skill: Skill) =>
  getSkillByObjectName(objectName)?.name === skill.name;

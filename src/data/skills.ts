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
      "I use C++ for data structures, algorithms, and competitive programming.",
    objectNames: ["cplusplus", "cpp", "c++"],
  },
  [SkillNames.JAVASCRIPT]: {
    id: 2,
    name: SkillNames.JAVASCRIPT,
    label: "JavaScript",
    shortDescription:
      "I use JavaScript to build interactive interfaces and connect full-stack features.",
    objectNames: ["javascript", "js"],
  },
  [SkillNames.PYTHON]: {
    id: 3,
    name: SkillNames.PYTHON,
    label: "Python",
    shortDescription:
      "Python powers my ML experiments, backend services, and automation work.",
    objectNames: ["python", "py"],
  },
  [SkillNames.REACT]: {
    id: 4,
    name: SkillNames.REACT,
    label: "React",
    shortDescription:
      "I built recruiter and candidate dashboards with reusable React components.",
    objectNames: ["react", "reactjs", "re"],
  },
  [SkillNames.NODEJS]: {
    id: 5,
    name: SkillNames.NODEJS,
    label: "Node.js",
    shortDescription:
      "I use Node.js for backend tooling, APIs, and JavaScript services.",
    objectNames: ["nodejs", "node", "njs", "nextjs", "next js"],
  },
  [SkillNames.EXPRESS]: {
    id: 6,
    name: SkillNames.EXPRESS,
    label: "Express.js",
    shortDescription:
      "I use Express.js to structure REST endpoints and lightweight backend services.",
    objectNames: ["expressjs", "express", "exp"],
  },
  [SkillNames.FASTAPI]: {
    id: 7,
    name: SkillNames.FASTAPI,
    label: "FastAPI",
    shortDescription:
      "I expose Python and ML workflows through typed, high-performance FastAPI services.",
    objectNames: ["fastapi", "fast api", "fa"],
  },
  [SkillNames.FLASK]: {
    id: 8,
    name: SkillNames.FLASK,
    label: "Flask",
    shortDescription:
      "I use Flask for focused Python APIs and rapid backend prototypes.",
    objectNames: ["flask", "fl"],
  },
  [SkillNames.WEBSOCKET]: {
    id: 9,
    name: SkillNames.WEBSOCKET,
    label: "WebSocket",
    shortDescription:
      "I use WebSockets when an interface needs live, two-way updates.",
    objectNames: ["websocket", "websockets", "socketio", "socket.io", "ws"],
  },
  [SkillNames.MONGODB]: {
    id: 10,
    name: SkillNames.MONGODB,
    label: "MongoDB",
    shortDescription:
      "I use MongoDB for document-oriented application data and API prototypes.",
    objectNames: ["mongodb", "mongo", "mdb"],
  },
  [SkillNames.POSTGRESQL]: {
    id: 11,
    name: SkillNames.POSTGRESQL,
    label: "PostgreSQL",
    shortDescription:
      "PostgreSQL stores structured data for my full-stack platforms and services.",
    objectNames: ["postgresql", "postgres", "pg"],
  },
  [SkillNames.MYSQL]: {
    id: 12,
    name: SkillNames.MYSQL,
    label: "MySQL",
    shortDescription:
      "I use MySQL to design relational schemas and query application data.",
    objectNames: ["mysql", "my sql", "my"],
  },
  [SkillNames.SQLITE]: {
    id: 13,
    name: SkillNames.SQLITE,
    label: "SQLite",
    shortDescription:
      "SQLite gives my local tools and prototypes a simple embedded database.",
    objectNames: ["sqlite", "sqlLite", "sqllite", "sqlite3", "sqlt"],
  },
  [SkillNames.FIREBASE]: {
    id: 14,
    name: SkillNames.FIREBASE,
    label: "Firebase",
    shortDescription:
      "I use Firebase for quick authentication and realtime prototype data.",
    objectNames: ["firebase", "fb"],
  },
  [SkillNames.DOCKER]: {
    id: 15,
    name: SkillNames.DOCKER,
    label: "Docker",
    shortDescription:
      "I containerize services so my projects run consistently across environments.",
    objectNames: ["docker", "dkr", "dk"],
  },
  [SkillNames.AWS]: {
    id: 16,
    name: SkillNames.AWS,
    label: "AWS",
    shortDescription:
      "I use AWS to deploy backend services and host application resources.",
    objectNames: ["aws", "amazonwebservices", "amazon web services"],
  },
  [SkillNames.LINUX]: {
    id: 17,
    name: SkillNames.LINUX,
    label: "Linux",
    shortDescription:
      "Linux is my daily development and self-hosting environment.",
    objectNames: ["linux", "lnx"],
  },
  [SkillNames.GIT]: {
    id: 18,
    name: SkillNames.GIT,
    label: "Git",
    shortDescription:
      "I use Git to manage every project from experiments to production builds.",
    objectNames: ["git"],
  },
  [SkillNames.GITHUB]: {
    id: 19,
    name: SkillNames.GITHUB,
    label: "GitHub",
    shortDescription:
      "GitHub is where I publish projects, collaborate, and track my engineering work.",
    objectNames: ["github", "git hub", "gh"],
  },
  [SkillNames.PYTORCH]: {
    id: 20,
    name: SkillNames.PYTORCH,
    label: "PyTorch",
    shortDescription:
      "I use PyTorch to experiment with neural networks and deep-learning workflows.",
    objectNames: ["pytorch", "py torch", "pt"],
  },
  [SkillNames.SCIKIT_LEARN]: {
    id: 21,
    name: SkillNames.SCIKIT_LEARN,
    label: "Scikit-learn",
    shortDescription:
      "I build and evaluate classical machine-learning pipelines with Scikit-learn.",
    objectNames: ["scikitlearn", "scikit-learn", "sklearn", "skl"],
  },
  [SkillNames.HUGGING_FACE]: {
    id: 22,
    name: SkillNames.HUGGING_FACE,
    label: "Hugging Face",
    shortDescription:
      "I explore pretrained models and transformer workflows through Hugging Face.",
    objectNames: ["huggingface", "hugging face", "hf"],
  },
  [SkillNames.LANGCHAIN]: {
    id: 23,
    name: SkillNames.LANGCHAIN,
    label: "LangChain",
    shortDescription:
      "I use LangChain to prototype tool-using and retrieval-based GenAI workflows.",
    objectNames: ["langchain", "lang chain", "lc"],
  },
  [SkillNames.OPENAI]: {
    id: 24,
    name: SkillNames.OPENAI,
    label: "OpenAI API",
    shortDescription:
      "I integrate OpenAI models into practical generative-AI features and experiments.",
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

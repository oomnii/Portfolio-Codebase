# Om Seth — Portfolio

A dark-first, animated personal portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, featuring an interactive **3D Spline keyboard** that reacts to scroll, hover, and key presses.

## Tech Stack

| Area          | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 14 (App Router)                            |
| Language      | TypeScript (strict)                                |
| Styling       | Tailwind CSS + CSS variables (light/dark theming)  |
| Animation     | Framer Motion, GSAP + ScrollTrigger                |
| 3D            | Spline (`@splinetool/react-spline`, runtime)       |
| Theming       | `next-themes`                                      |
| Icons         | `lucide-react` + custom brand SVGs                 |
| Contact form  | Formspree (client-side `fetch`)                    |

## Features

- Interactive 3D keyboard background that transitions per section and surfaces skills on key hover/press.
- Letter-reveal hero, animated role typer, and count-up stats.
- Light/dark theme toggle (dark by default).
- Filterable projects grid, experience timeline, and achievements stats.
- Working contact form (Formspree) with validation, loading, success, and error states.
- Responsive layout, SEO metadata, Open Graph tags, favicon, and a 3D-scene loading state.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the dev server              |
| `npm run build` | Production build                  |
| `npm run start` | Serve the production build        |
| `npm run lint`  | Run ESLint                        |

## Project Structure

```
.
├── public/
│   └── assets/                   # Spline scene, keycap sounds, resume.pdf
├── src/
│   ├── app/                      # App Router: layout, page, global styles, metadata
│   │   ├── fonts/                # Local Geist fonts
│   │   ├── globals.css           # Theme tokens + design-system classes
│   │   ├── icon.svg              # Favicon
│   │   ├── layout.tsx            # Root layout, metadata, providers
│   │   └── page.tsx              # Section composition
│   ├── components/
│   │   ├── animated-background/  # 3D Spline keyboard + per-section config
│   │   ├── icons/                # Brand SVG icons (GitHub, LinkedIn, LeetCode, Codeforces)
│   │   ├── layout/               # Header, footer, mobile nav
│   │   ├── providers/            # Theme provider
│   │   ├── sections/             # Hero, About, Skills, Experience, Projects, Achievements, Contact
│   │   └── ui/                   # Reusable primitives (Section, ThemeToggle, CountUp, RoleTyper)
│   ├── config/                   # Site config (nav, socials, contact, resume path)
│   ├── data/                     # Skills data for the 3D keyboard
│   ├── hooks/                    # useMediaQuery, useSounds
│   └── lib/                      # Utilities (cn, sleep)
├── next.config.mjs               # Next.js config
├── tailwind.config.ts            # Tailwind theme + tokens
├── tsconfig.json                 # TypeScript config
├── postcss.config.mjs            # PostCSS (Tailwind) config
├── vercel.json                   # Deployment config (headers, caching)
└── package.json
```

## Configuration

- **Site content** (nav, socials, contact, resume path): `src/config/site.ts`
- **Contact form**: set the Formspree endpoint in `src/components/sections/contact.tsx`
- **Deployment origin** (for Open Graph URLs): set `NEXT_PUBLIC_SITE_URL`

## Deployment

Optimized for [Vercel](https://vercel.com). Deployment config (framework, security headers, asset caching) lives in `vercel.json`.

```bash
npx vercel
```

Set `NEXT_PUBLIC_SITE_URL` to your production domain so metadata resolves correctly.

## Credits

The interactive 3D keyboard is adapted from [Naresh Khatri's open-source portfolio](https://github.com/Naresh-Khatri/Portfolio) (MIT).

## License

MIT © Om Seth

# Dranreb Jay Arzadon — Personal Portfolio

Built with **Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · Three.js**

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts — framework auto-detected as Next.js
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo → Vercel auto-detects Next.js
4. Click **Deploy** — done ✅

## Project Structure

```
app/
  layout.tsx        ← Root layout, dark-mode script, metadata
  page.tsx          ← Main page (assembles sections)
  globals.css       ← Tailwind directives + component classes

components/
  Navbar.tsx        ← Sticky navbar, active-section highlight, theme toggle
  Hero.tsx          ← Hero with typewriter, Three.js icosahedron, CTAs
  ThreeHero.tsx     ← Three.js rotating icosahedron (client-only)
  About.tsx         ← Bio, count-up stats, skills chips
  Projects.tsx      ← Projects grid section
  ProjectCard.tsx   ← Individual project card (hover only effects)
  Contact.tsx       ← Contact info + validated form + confetti
  Footer.tsx        ← Footer with back-to-top
  CustomCursor.tsx  ← Dot + ring cursor with lerp & click pulse
  ParticleCanvas.tsx← Background particles canvas

hooks/
  useThemeToggle.ts ← Dark/light mode persisted to localStorage

data/
  projects.ts       ← All 5 project definitions

public/
  (add photo.jpg here when ready, then update ThreeHero.tsx)
```

## Adding Your Photo

1. Drop `photo.jpg` into `public/`
2. In `components/ThreeHero.tsx`, replace the `<canvas>` with:
```tsx
import Image from "next/image";
// ...
<Image src="/photo.jpg" alt="Dranreb Jay Arzadon" fill className="object-cover rounded-2xl" />
```

## Customization

- **Projects** → edit `data/projects.ts`
- **Bio text** → edit `components/Hero.tsx` and `components/About.tsx`
- **Colors** → edit `tailwind.config.js` (brand/accent palette)
- **Contact form** → wire up real API in `components/Contact.tsx` `handleSubmit`

## Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Framework     | Next.js 14 (App Router)       |
| Language      | TypeScript (strict, no `any`) |
| Styling       | Tailwind CSS v3               |
| Animation     | Framer Motion v11             |
| 3D            | Three.js r166                 |
| Confetti      | canvas-confetti               |
| Deployment    | Vercel                        |

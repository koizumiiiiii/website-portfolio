# James Oliver Mendoza — Personal Portfolio

**Live site → [jamesoliver.vercel.app](https://jamesoliver.vercel.app)**

Hey! Welcome to my portfolio's source code. I'm **James Oliver Mendoza**, a CS student at the **University of Mindanao** looking for **OJT / internship opportunities**. I love building clean, user-friendly web experiences — especially frontend development with modern JavaScript frameworks.

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
3. Import your repo — Vercel auto-detects Next.js
4. Click **Deploy** — done

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
  About.tsx         ← Bio, education timeline, skills chips
  Projects.tsx      ← Projects grid section
  ProjectCard.tsx   ← Individual project card
  Certifications.tsx← Cert cards with lightbox modal
  Contact.tsx       ← Contact info + validated form + confetti
  Footer.tsx        ← Footer with back-to-top
  CustomCursor.tsx  ← Dot + ring cursor with lerp & click pulse
  ParticleCanvas.tsx← Background particles canvas

hooks/
  useThemeToggle.ts ← Dark/light mode + 5 theme colors persisted to localStorage

data/
  projects.ts       ← 4 project definitions
```

## Customization

- **Projects** — edit `data/projects.ts`
- **Bio text** — edit `components/Hero.tsx` and `components/About.tsx`
- **Colors** — edit `tailwind.config.js` (brand/accent palette) and `app/globals.css` (theme variable maps)
- **Contact form** — sign up at [formspree.io](https://formspree.io), create a form, then paste your form ID into `components/Contact.tsx:114`
- **Certifications** — edit `components/Certifications.tsx`

## Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Framework     | Next.js 14 (App Router)       |
| Language      | TypeScript (strict)           |
| Styling       | Tailwind CSS v3               |
| Animation     | Framer Motion v11             |
| 3D            | Three.js r166                 |
| Confetti      | canvas-confetti               |
| Deployment    | Vercel                        |

---

**James Oliver Mendoza** — CS Student @ University of Mindanao  
📧 mendozajames992@gmail.com  
🔗 [linkedin.com/in/james-mendoza-480903414](https://www.linkedin.com/in/james-mendoza-480903414)  
🐙 [github.com/koizumiiiiii](https://github.com/koizumiiiiii)  
🌐 [jamesoliver.vercel.app](https://jamesoliver.vercel.app)

*Open for OJT / internship opportunities — let's build something great together!*

# Muaz Ramzi — Portfolio

A single-page, Awwwards-style portfolio for Muaz Ramzi (Software Engineer — Full
Stack, AI Systems, modern UI/UX). Dark, monochrome theme with a single electric-blue
accent, glassmorphism panels, and a pseudo-3D hero character card with float,
idle sway, and mouse-parallax tilt.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [Framer Motion](https://motion.dev) available for future motion work
- [lucide-react](https://lucide.dev) for icons (GitHub/LinkedIn are custom SVGs — Lucide dropped brand logos)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Adding your portrait

The hero and about sections look for a portrait at `public/character.png`
(recommended: a transparent PNG, portrait/product-shot style, similar
proportions to a 4:5 or taller crop). Until that file exists, both sections
fall back to a placeholder silhouette so the layout still renders correctly.

## Project structure

```
src/
  components/   section + UI components (Navbar, Hero, About, TechStack, ...)
  data/         static content (nav items, socials, stats, projects, ...)
  hooks/        small reusable hooks (useInViewport)
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint

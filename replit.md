# Amber Studio - Creative Production Studio Website

## Overview

Amber Studio is a portfolio/marketing website clone for a creative production studio based in Los Angeles. The site features a cinematic dark design with full-screen stacking project reveals, scrolling logo marquee, and smooth scroll-driven animations. Built with React + Express in TypeScript.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: `wouter` — single route `/` (Home page) and catch-all 404
- **State/Data Fetching**: TanStack React Query v5
- **UI Components**: shadcn/ui component library on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties; dark theme by default
- **Animations**: Framer Motion — scroll-driven parallax, clip-path reveal transitions, opacity/translate animations
- **Typography**: Google Fonts — Antonio (headings) and Inter (body), loaded via `<link>`
- **Path aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Key Frontend Features

- **Hero Section**: Full-screen background image with parallax scroll, "AMBER STUDIO" heading, live LA clock, bottom info bar
- **Logo Marquee**: Infinite horizontal scroll of client brand names with CSS animation
- **Full-Screen Stacking Projects**: 6 projects displayed as full-viewport slides using a sticky container with clip-path reveal animation. Each project scrolls in from the bottom covering the previous one. Uses a tall container (`(projects + 1) * 100vh`) with a sticky `h-screen` viewport inside.
- **About Section**: Large Antonio-font statement text with scroll-triggered fade-in
- **Services Section**: Grid of 10 services with staggered reveal animations
- **Contact Section**: "Let's Talk" CTA with email link
- **Footer**: Minimal brand/location/copyright

### Project Images

Generated AI images stored in `client/public/images/`:
- `hero.png` — Hero section background
- `project-of-earth.png`, `project-after-quiet.png`, `project-echoes-of-us.png`, `project-still-breathing.png`, `project-scent-silence.png`, `project-light-between.png` — Project backgrounds

### Backend Architecture

- **Runtime**: Node.js with Express
- **Language**: TypeScript via `tsx`
- **Structure**: Minimal — no API routes needed for this static portfolio site
  - `server/index.ts` — Entry point
  - `server/routes.ts` — Empty route handler
  - `server/storage.ts` — In-memory storage (unused)
- **Build**: Vite for client, esbuild for server

### Data Storage

- No database needed — this is a static portfolio site
- Schema files exist but are unused

## External Dependencies

### Key Libraries
- **Framer Motion**: Scroll-driven animations and transitions
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **shadcn/ui + Radix UI**: Component primitives
- **wouter**: Client-side routing
- **Google Fonts**: Antonio + Inter typefaces

### Design Tokens
- Background: `#0A0A0A` (near-black)
- Text: White with varying opacity levels
- Heading font: `Antonio` (via `--font-heading` / `font-heading`)
- Body font: `Inter` (via `--font-sans` / `font-sans`)
- Marquee animation: `animate-marquee` (30s linear infinite)

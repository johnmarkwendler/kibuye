# Repository Exploration Notes

## High-level overview
- Full-stack TypeScript app with a React + Vite client and an Express server.
- The app is primarily a cinematic portfolio-style website with minimal backend logic.

## Structure
- `client/`: React UI, routing, animations, pages, and static assets.
- `server/`: Express bootstrapping, route registration, static serving, dev Vite integration.
- `shared/`: Shared schema/types (currently a user schema via Drizzle + Zod).
- `script/build.ts`: Production build orchestration for client and server bundles.

## Frontend findings
- Routing uses `wouter` with three paths: `/`, `/projects/:slug`, and a catch-all 404 page.
- The home page uses Framer Motion and Lenis for animation-heavy scrolling sections.
- Project content is statically defined in `client/src/lib/projects.ts`.
- A large set of shadcn/radix UI components is present under `client/src/components/ui`.

## Backend findings
- Express server starts from `server/index.ts`.
- `server/routes.ts` currently registers no API routes; it returns the existing HTTP server.
- `server/storage.ts` includes an in-memory user store abstraction with CRUD methods for users.

## Build/dev flow
- Dev: `npm run dev` starts the server with `tsx server/index.ts` and Vite middleware in development.
- Build: `npm run build` runs Vite client build, then bundles the server with esbuild into `dist/index.cjs`.
- Start: `npm run start` serves production build from `dist/index.cjs`.

## Notes
- Database-related dependencies and schema exist, but the current site appears mostly static and does not rely on active API endpoints.
- `replit.md` contains architecture notes and appears to document intended behavior/features.

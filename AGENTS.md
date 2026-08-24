# store — MODA Store

Next.js App Router storefront for a fashion store. UI copy, comments, and log messages are in Spanish — keep new content consistent (`lang="es"`).

## Commands

- Dev server: `npm run dev` → http://localhost:3003 (non-default port)
- Lint: `npm run lint` (flat ESLint config; passes with warnings only)
- Typecheck: `npx tsc --noEmit` (no npm script for this)
- Build: `npm run build`
- No test framework is configured.

## Data flow

- Single page: `app/page.tsx` (server component) calls `getProducts()` from `lib/products-api.ts`.
- `getProducts()` hits `${API_URL}/products` with HTTP Basic auth using axios (5s timeout). Credentials come from `.env.local`: `API_URL`, `API_AUTH_USER`, `API_AUTH_PASSWORD` (gitignored).
- On missing credentials, API error, or timeout it falls back to the static catalog in `data/products.ts`, so the site renders without a backend.
- Categories are the fixed union `"hombre" | "mujer" | "accesorios"` in `lib/types.ts`.

## Conventions

- Path alias `@/*` maps to the repo root.
- Tailwind CSS v4 via PostCSS — theme tokens (`accent`, `accent-light`, `surface`, `muted`) are defined in the `@theme inline` block of `app/globals.css`; there is no tailwind.config file.
- Components in `components/` are client components (`"use client")` with default exports, using framer-motion and lucide-react.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

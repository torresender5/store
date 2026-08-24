# MODA Store

Online storefront for a fashion store showcasing products for **hombre**, **mujer**, and **accesorios**. It features a filterable product catalog, a product detail modal, and a promotional section — all fully responsive. The UI copy is in Spanish (`lang="es"`).

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (theme tokens defined in `app/globals.css` via `@theme inline`; no tailwind.config file)
- [framer-motion](https://www.framer.com/motion/) for animations
- [lucide-react](https://lucide.dev) icons
- axios for API requests

## Features

- Hero landing section with call-to-action
- Product catalog filtered by category: `todos` / `hombre` / `mujer` / `accesorios`
- Product modal with available sizes
- Animated transitions between filters (AnimatePresence)
- WhatsApp promo section with discount code
- Responsive layout (mobile-first)

## Architecture & Data Flow

```
app/page.tsx (server component)
        │
        ▼
getProducts()  ── lib/products-api.ts
        │
        ├──► External API: GET ${API_URL}/products   (HTTP Basic auth, axios, 5s timeout)
        │            │
        │            ▼
        │    mapApiProduct() ── maps ApiProduct → Product
        │
        └──► Fallback: static catalog from data/products.ts
             (used when credentials are missing, the API fails,
              or the request times out)
```

Key points:

- Products come from an external API authenticated with HTTP Basic auth.
- On missing credentials (`API_AUTH_USER` / `API_AUTH_PASSWORD`), API error, or timeout, the app falls back to a static catalog, so the site renders without a backend.
- Categories are a fixed union type `"hombre" | "mujer" | "accesorios"` defined in `lib/types.ts`.

## Getting Started

### Prerequisites

- Node.js >= 20.9.0 (required by Next.js 16)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file at the repo root:

```bash
API_URL=http://localhost:3000      # Base URL of the products API
API_AUTH_USER=                     # Basic auth user
API_AUTH_PASSWORD=                 # Basic auth password
```

All three variables are optional — without them the site serves the static catalog in `data/products.ts`.

### Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Start dev server at **http://localhost:3003** (non-default port) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Typecheck |

There is no test framework configured.

## Project Structure

```
app/                  # App Router entrypoint: layout, page (server), home-client (client UI)
components/           # Client components: Header, FilterBar, ProductGrid, ProductCard, ProductModal, Footer
lib/                  # products-api.ts (data fetching + fallback) and types.ts (Product, Category, ApiProduct)
data/                 # Static product catalog used as fallback
public/               # Static assets (logo, icons)
```

## Deployment

This project deploys to [Vercel](https://vercel.com) with zero configuration.

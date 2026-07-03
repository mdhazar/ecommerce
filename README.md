# E-commerce Web Application

A modern e-commerce front end built with **TanStack Start** (SPA mode), React 19,
TanStack Query, Zustand, and Tailwind CSS v4. It lets users browse products,
filter by category, manage a cart, authenticate, and place orders against an
external REST API.

## Note

You can use the public demo users below (Password: `123456`):

- <customer@commerce.com>
- <store@commerce.com>
- <admin@commerce.com>

## Features

- User registration and authentication (token-based)
- Product browsing, category filtering, and search
- Shopping cart with automatic persistence
- Protected order & payment flow
- Address and payment card management
- Responsive design

## Tech Stack

### Framework & routing

- **TanStack Start** in SPA mode (`spa.enabled`) — type-safe file-based routing,
  loaders, and server functions available on demand, without per-request SSR.
- **TanStack Router** with `beforeLoad` guards for protected routes.

### State & data

- **TanStack Query** — all server data (products, categories, orders, auth verify).
- **Zustand** — client state (cart with `persist`, auth user, shop filters).
- **Axios** — HTTP transport with a request interceptor that attaches the auth token.

### UI & forms

- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin with CSS-first `@theme`
  configuration (see `src/index.css`).
- **shadcn/ui** primitives (Radix Slot, `class-variance-authority`, `clsx`, `tailwind-merge`).
- **lucide-react** icons, **Embla** carousel, **react-toastify** notifications.
- **react-hook-form** + **zod** (via `@hookform/resolvers`) for typed, validated forms.

### Tooling

- **Vite 7**, **TypeScript 6**, **Biome** (lint + format), **Vitest** + Testing Library.

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_URL if different
npm run dev            # http://localhost:3000
```

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Production build (Nitro output in `.output`) |
| `npm run preview`   | Preview the production build                 |
| `npm run typecheck` | `tsc --noEmit`                               |
| `npm run test`      | Run the Vitest suite                         |
| `npm run lint`      | Format + lint with Biome                     |

## Configuration

- **API base URL**: set `VITE_API_URL` (defaults to the hosted demo API).
- **Routing**: routes live in `src/routes/`. The route tree
  (`src/routeTree.gen.ts`) is generated automatically on `dev`/`build`.

## Deployment

The app builds to a Nitro server in `.output/`. On Vercel, Nitro auto-detects the
platform and emits Build Output API artifacts — no `vercel.json` is required. Set
`VITE_API_URL` as a project environment variable.

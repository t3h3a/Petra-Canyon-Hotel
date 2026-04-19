# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Petra Canyon Hotel Website (`artifacts/petra-canyon-hotel`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview path**: `/`
- **Description**: Professional 4-star hotel website for Petra Canyon Hotel in Wadi Musa, Jordan
- **Features**:
  - Fullscreen auto-sliding carousel hero (4 hotel images, auto-slides every 4 seconds)
  - Booking widget with check-in/check-out dates, adults/children selectors, links to Booking.com
  - Multilingual support: English, Arabic (RTL), French
  - Sections: Welcome, Rooms & Suites, Amenities, Restaurant, Location, Footer
  - Social links: WhatsApp, Facebook, YouTube, Instagram
  - Payment methods display
  - Fully responsive (mobile + desktop)
  - Framer Motion scroll animations
- **Key Files**:
  - `src/App.tsx` — main app entry
  - `src/components/Hero.tsx` — hero carousel
  - `src/components/BookingWidget.tsx` — booking search form
  - `src/components/LanguageProvider.tsx` — multilingual context
  - `src/lib/i18n.ts` — translations (EN, AR, FR)
  - `src/components/Navbar.tsx` — navigation with language switcher
  - `src/components/Rooms.tsx` — room types
  - `src/components/Amenities.tsx` — hotel amenities grid
  - `src/components/Restaurant.tsx` — restaurant section
  - `src/components/Location.tsx` — location & distances
  - `src/components/Footer.tsx` — contact, social, payment methods
- **Hotel Info**:
  - Address: Petra Wadi Mousa Box 26, 71882 Wadi Musa, Jordan
  - Booking.com: https://www.booking.com/hotel/jo/petra-canyon.en-gb.html
  - Rating: 9.4/10 from 527 reviews

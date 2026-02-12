# Product Dashboard

React SPA for browsing/managing products via [DummyJSON API](https://dummyjson.com/).

## Stack

- React 19, TypeScript, Vite
- TanStack Query + TanStack Table
- Radix UI (Dialog, Checkbox, Popover, Progress)
- Tailwind CSS 4
- React Hook Form + Zod
- Sonner (toasts)
- Biome (lint/format)

## Scripts

```bash
npm run dev       # dev server
npm run build     # type-check + production build
npm run lint      # biome check --write
npm run lint:ci   # biome ci
npm run preview   # preview production build
```

## Project Structure

```
src/
  api/          # HTTP client, endpoints, query keys, types
  assets/       # SVG icon components
  components/   # UI components
    ui/         # Generic reusable (Button, Combobox, DataTable, Modal, etc.)
  context/      # AuthContext
  hooks/        # useProducts, useSearchProducts, etc.
  lib/          # Query client config
  pages/        # LoginPage, ProductsPage
  schemas/      # Zod validation schemas
```

## Features

- Auth (login/logout, protected routes, lazy-loaded pages)
- Product table with server-side sorting and pagination
- Row selection (single + select all)
- Search combobox with debounced suggestions dropdown
- Add product modal with form validation

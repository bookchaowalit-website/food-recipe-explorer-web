# Recipe Explorer — Mise en Place Library

A client-only cooking desk over three hard-coded, synthetic recipes. Pick a dish to see its ingredient ledger, cook
time and servings, step through its prep sequence, and toggle pantry swaps (every ingredient that has a swap, two
per recipe, shows its substitute).

Live: https://recipe.bookchaowalit.com (Vercel builds every push to `main`, see `PRODUCT.md`).

## What it does not do

- No recipe search or database, meal planning, nutrition tracking, grocery prices or recipe licensing. Not
  nutrition or medical advice. No account or storage.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: recipe data and swap helpers, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/recipes.ts`: the sample recipes plus `findRecipe`, `ingredientName`, `swapCount`, `prepNote` and
  `stepCounter` (used by the page).
- `app/page.tsx`: the recipe index; `app/recipes/[id]/page.tsx`: one static page per recipe. Views live in
  `components/recipe-pages.tsx` on the Reader shell (`READER.md`); `components/recipe-board.tsx` is the only
  client piece (the pantry-swap toggle). `/more-projects` redirects (308) to https://bookchaowalit.com/.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.

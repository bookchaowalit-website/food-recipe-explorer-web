# Recipe Explorer — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `recipe-explorer`, evidence Prototype) on
> 2026-10-23.

## Product surface

Recipe Explorer is an illustrative cooking desk for choosing a dish, checking the ingredient rhythm, and making one practical substitution before cooking.

## Primary user

A home cook deciding what to make from a small pantry and wanting the recipe's sequence to feel as clear as the ingredients.

## Product promise

Turn a craving into a cookable sequence with a clear next prep move, not a feed of disconnected food photos.

## Boundaries

- Use synthetic recipes and ingredients only (the page shows no nutrition estimates).
- Do not imply live grocery prices, medical nutrition advice, or recipe licensing.
- The demo is a product design study, not a food delivery service.

## Design mode

operate

## Interaction contract

- Selecting a dish changes the ingredient ledger and cook time.
- Selecting a prep step changes the focused instruction.
- The pantry toggle swaps every ingredient that has a substitute (two per recipe) and replaces the second step's note with a swap note.

## What works today

1. Three synthetic recipes; selecting one changes the ingredient ledger, cook time, servings and prep sequence.
2. Selecting a prep step changes the focused instruction; the counter shows the step number.
3. The pantry toggle shows substitutes for two ingredients per recipe and a swap note on step two.
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No searchable recipe database, meal planning or nutrition tracking (removed from the portfolio card in the
  2026-10 review). No API route, account, storage or analytics.

## Live URL and deploy state

- Live: https://recipe.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-recipe-explorer-frontend` is linked to this repository (`bookchaowalit-website/food-recipe-explorer-web`, branch `main`), so every
  push to `main` deploys to production. Last production deploy: the Next 16.4.2 security patch (96c9607), by Git on
  2026-10-23.
- The L2 commits (lib/tests/Sentry/CI/docs) pushed on 2026-10-23 did not deploy: Vercel answered "Deployment rate
  limited — retry in 24 hours" (free-plan limit of 100 deployments per day). The live site shows the patch build
  until the next deploy of `main` after the quota resets.
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `food-recipe-explorer-web`, org `personal-yu0`); it takes effect
  with that next deploy.

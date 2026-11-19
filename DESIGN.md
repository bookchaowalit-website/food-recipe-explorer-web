# Recipe Explorer — Design

Since 2026-11-19 the site uses the shared **Reader shell** (see `READER.md`; `app/reader-shell.css`,
`components/reader-shell.tsx`, `tests/reader-shell.test.tsx` and `READER.md` are copied byte for byte from
content-techblog-web). It replaced the earlier "kitchen ledger" look, whose muted and clay text under 4.5:1,
9–10px letter-spaced Courier labels, 35px swap button with no sign of which lines changed, tall phone hero with
the recipe board far below the dish list, Apple-only system fonts, missing link back to the hub and code-like
labels (KITCHEN STUDY / 06, ON THE SHELF 01) failed the design floor (review 2026-11-11).

- `/`: the head says how many recipes and the time range ("3 recipes · 18–44 min"), then the recipes as cards
  (time and servings, what each holds, origin tags). One column on phones, three side by side from 700px.
- `/recipes/[id]` (static): back link, tags, the dish as h1, ingredients and method on one page, previous /
  next. Choosing a dish opens its page, so the result is never off screen.
- **Use N pantry swaps** is a 44px toggle (`aria-pressed`); each swapped line is underlined and tagged
  "Swap for …", and the base step gains the swap note.
- The footer says the recipes were written for this demo and are not nutrition or medical advice.

Floor: Geist via `next/font` (variable on `<html>`), text ≥ 12px, controls ≥ 44px, 4.5:1 text contrast in
light and dark, 3px focus ring, forced-colors support, no horizontal scroll at 320px. `/more-projects`
redirects (308) to https://bookchaowalit.com/ and the footer links there. Canonical domain, robots.txt and
sitemap.xml (home + each recipe): https://recipe.bookchaowalit.com.

# The Vault — Links Vault (Task 2, React Lesson 2)

## Problem statement

People bookmark things constantly, but browser bookmarks only exist on the
one device and browser they were saved on, get buried under folders nobody
opens again, and carry no context for *why* something was saved. The Vault
is a small, self-contained web app that treats saved links less like a
folder of shortcuts and more like a personal card catalog: every entry gets
a title, its link, a short description of why it matters, and optional
tags, and the whole collection is searchable across all four fields. For
this MVP, the "database" is the browser's `localStorage`, so the data
survives reloads on one device as a proof of concept — the architecture
(a single `useLinks` hook doing all reads/writes) is deliberately built so
that hook is the *only* place that would need to change to swap in a real
backend later.

## Design plan

- **Concept:** a personal archive / ledger, not another SaaS dashboard —
  entries read as filed index cards rather than generic rounded tiles.
- **Color:** deep ink navy (`#14213D`) header/background, warm parchment
  (`#F4EFE4`) for cards and surfaces, brass (`#B8873B`) as the single accent
  for tags/tabs/focus states, oxblood (`#8B3A3A`) reserved for destructive
  actions, slate (`#5B6478`) for secondary text.
- **Type:** Fraunces (serif) for the wordmark and card titles — gives the
  catalog feel — Inter for body/UI text, IBM Plex Mono for URLs and tags,
  echoing a ledger/typewriter register.
- **Layout:** search bar and an "Add link" button in the header; the form
  opens as a modal "filing slip" (also used for editing); cards fill the
  full width in a responsive grid. Each card has a small brass "tab" showing its first tag and a
  dashed top edge, referencing an index card rather than a flat SaaS tile.
- **Motion:** restrained — a small lift on card hover, a slide-in for
  toasts. No scattered fade-ins.

## Features delivered

- Full CRUD: add, view, edit (via the same form, pre-filled), delete
  (with an inline confirm step) — all backed by `localStorage`.
- Live search across title, link, description, and tags.
- Toast notifications for add / update / delete actions.
- Tag input with add-on-Enter and removable chips.
- Empty states for "no links yet" vs. "no search results."
- Fully responsive at 320 / 480 / 768 / 1024 / 1200px breakpoints.
- Hover + focus states on every interactive element; disabled submit
  button until the required fields are filled.

## Project structure

```
src/
 ├─ types.ts                 → LinkEntry / LinkDraft / ToastMessage types
 ├─ hooks/
 │   ├─ useLinks.ts           → localStorage-backed CRUD state
 │   └─ useToasts.ts          → notification queue
 ├─ components/
 │   ├─ LinkForm.tsx           → add/edit form (one component, two modes)
 │   ├─ LinkCard.tsx           → single entry display
 │   ├─ LinkList.tsx           → grid + empty states
 │   ├─ SearchBar.tsx          → search input + result count
 │   ├─ TagInput.tsx           → reusable tag chip input
 │   └─ ToastStack.tsx         → notification display
 ├─ components/Modal.tsx        → overlay dialog wrapper for the form
 ├─ App.tsx                  → composition root, owns search/edit state
 ├─ App.css                  → component + layout styles, media queries
 └─ index.css                → resets, fonts, CSS variables
```

## Images

Static images live in `public/` (`logo.svg`, `favicon.svg`) and are referenced
with `import.meta.env.BASE_URL` so they work on GitHub Pages. Each card also
shows the site's icon, fetched from its domain.

## Running locally

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repo, e.g. `links-vault`.
2. Confirm `vite.config.ts`'s `base` matches your repo name:
   `base: '/links-vault/'`.
3. Install the deploy dependency (already in `devDependencies`) and run:
   ```bash
   npm run build
   npm run deploy
   ```
   This uses `gh-pages` to push the `dist/` folder to a `gh-pages` branch.
4. In your repo's Settings → Pages, set the source to the `gh-pages`
   branch. Your app will be live at
   `https://<your-username>.github.io/links-vault/`.

If you'd rather use Netlify or Vercel instead: set the build command to
`npm run build`, the output directory to `dist`, and change `base` in
`vite.config.ts` back to `'/'`.

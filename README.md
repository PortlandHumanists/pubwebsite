# Portland Humanists Website

The website for the Humanists of Greater Portland, built with Astro, Tailwind CSS, and TinaCMS.

## Tech Stack

- **[Astro](https://astro.build)** — static site generator
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first CSS
- **[TinaCMS](https://tina.io)** — visual CMS with Git-backed content
- **[Netlify](https://netlify.com)** — hosting and CI/CD

## Project Structure

```
/
├── public/
│   ├── admin/           # TinaCMS admin interface (auto-generated)
│   └── uploads/         # Media uploads from CMS
├── scripts/
│   └── migrate-events.mjs  # One-time migration script from old Drupal archive
├── src/
│   ├── components/      # Astro and React components
│   │   ├── Navigation.astro
│   │   ├── PastEventsGrid.tsx   # Client-side search/filter for past events
│   │   ├── EventVisualEditor.tsx
│   │   ├── HomeVisualEditor.tsx
│   │   ├── JoinVisualEditor.tsx
│   │   └── PageVisualEditor.tsx
│   ├── content/         # Markdown/JSON content collections
│   │   ├── events/      # Sunday programs
│   │   ├── homepage/    # Homepage singleton
│   │   ├── join/        # Join page singleton
│   │   ├── pages/       # Static pages (about, outreach, etc.)
│   │   └── settings/    # Site settings singleton
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/           # Astro routes
│       ├── index.astro
│       ├── events.astro
│       ├── join.astro
│       ├── events/[slug].astro
│       └── [...slug].astro  # Dynamic page renderer
├── tina/
│   ├── config.ts        # TinaCMS schema (collections, fields)
│   └── __generated__/   # Auto-generated types — commit these
└── astro-tina-directive/ # Custom client:tina Astro directive
```

## Local Development

### Prerequisites

- Node.js 18+
- A `.env` file (copy from `.env.example` and fill in values)

### Setup

```bash
npm install
cp .env.example .env
# Fill in TINA_PUBLIC_CLIENT_ID, TINA_TOKEN, TINA_SEARCH_TOKEN from app.tina.io
```

### Dev server

```bash
npm run dev
```

Site: [http://localhost:4321](http://localhost:4321)
TinaCMS admin: [http://localhost:4321/admin](http://localhost:4321/admin)

The dev server auto-indexes content for search on startup.

## Content Management

Editors access the CMS at `/admin`. Changes are committed directly to the `main` branch via the TinaCMS GitHub App, triggering an automatic Netlify deploy.

### Adding a Sunday Program

1. Go to `/admin` → **Sunday Programs** → **New**
2. Fill in title, date, presenter, times, location, description
3. Set status to **Upcoming**
4. Add a Zoom link for the event
5. After the recording is posted: add the YouTube or Vimeo ID and change status to **Past**

### Managing Pages

Nav structure is driven by frontmatter in `src/content/pages/`:

- `showInNav: true` — include in the nav
- `navOrder: 1` — position (lower = first)
- `parent: about` — nests the page under a parent dropdown

## Deployment

Pushes to `main` deploy automatically via Netlify.

**Build command** (in `netlify.toml`):
```
tinacms build --skip-cloud-checks && astro build
```

`--skip-cloud-checks` avoids a build-time schema comparison race condition (Netlify sometimes starts before TinaCloud finishes re-indexing).

### Environment Variables (Netlify)

| Variable | Where to get it |
|----------|----------------|
| `TINA_PUBLIC_CLIENT_ID` | app.tina.io → project → Settings → Client ID |
| `TINA_TOKEN` | app.tina.io → project → Settings → Tokens |
| `TINA_SEARCH_TOKEN` | app.tina.io → project → Settings → Tokens (search indexer) |

## TinaCMS Schema Changes

When modifying `tina/config.ts`:

1. Make your changes
2. Run `npm run dev` — this regenerates `tina/tina-lock.json` and `tina/__generated__/`
3. Commit **all** generated files: `tina/tina-lock.json`, `tina/__generated__/*`, `public/admin/index.html`
4. Push — TinaCloud re-indexes from `tina-lock.json`

> **Do not** use `tinacms build --skip-cloud-checks` to regenerate after schema changes — it updates TypeScript types but does not update `tina-lock.json`.

## Key Notes

- **Collection name `joinPage`** (not `join`) — `join` is a SQL reserved word silently rejected by TinaCloud
- **`client:tina` directive** — custom Astro directive in `astro-tina-directive/`; only hydrates React islands inside the Tina admin iframe, not for regular visitors
- **Vimeo + YouTube** — past events support both; Vimeo was the primary platform through early 2025

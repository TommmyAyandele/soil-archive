# The Soil Archive

A public digital archive housing suppressed African voices, histories, and justice stories. Built to grow — adding a new collection requires only adding content files, no changes to the codebase.

**Current collections:**
- Collection 001: The Ogoni Nine (Nigeria, 1990–2024)

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How to Add a New Collection

Adding a new collection is entirely content-driven. You do not need to change any code.

### 1. Create a folder

```
content/collections/your-collection-slug/
```

The slug becomes the URL: `/collections/your-collection-slug`.

### 2. Add `config.json`

```json
{
  "number": "002",
  "title": "Collection Title",
  "subtitle": "A short subtitle for the collection",
  "region": "Country — Specific Region",
  "year": "1994",
  "yearRange": "1989–2005",
  "featured": true,
  "tags": ["Tag One", "Tag Two"],
  "coverColor": "#2D4A1E"
}
```

- `number`: The archive number (e.g. `"002"`). Used in display and sorting.
- `featured`: Set to `true` to show on the home page.
- `coverColor`: A dark hex colour used as the hero background for the collection.

### 3. Add `index.mdx`

The overview and historical context for the collection. Written in Markdown (MDX). Supports headings, paragraphs, bold, italic, blockquotes, and horizontal rules.

Use frontmatter at the top:

```mdx
---
title: Collection Title
description: A one-sentence description for metadata.
---

## Section Heading

Paragraph content...
```

### 4. Add `timeline.json`

A JSON array of timeline entries:

```json
[
  {
    "year": "1989",
    "title": "Something happened",
    "body": "A paragraph describing the event in detail."
  }
]
```

### 5. Add `documents.json`

A JSON array of primary documents:

```json
[
  {
    "type": "speech",
    "title": "Document Title",
    "date": "March 1994",
    "author": "Person Name",
    "placeholder": false,
    "body": "The document text..."
  }
]
```

**`type` options:** `text`, `letter`, `poem`, `photograph`, `speech`

Set `"placeholder": true` if the content is not yet verified or rights-cleared. This displays a "Placeholder" badge and styles the text as muted.

### 6. Add audio placeholders (for the Immersive Experience)

Create the folder `public/audio/your-collection-slug/` and add four audio files:

```
public/audio/your-collection-slug/
  judge-perspective.mp3
  front-row-perspective.mp3
  back-of-room-perspective.mp3
  side-gallery-perspective.mp3
```

These are the spatially mixed audio tracks for each perspective in the Immersive Courtroom component. Until real audio is ready, empty `.mp3` files serve as placeholders (the component handles `null` gracefully).

To wire up the audio, edit `components/courtroom/ImmersiveCourtroom.tsx` and update the `audioSrc` fields in the `PERSPECTIVES` array for the relevant collection. The component is designed to be passed the collection slug so this can be made dynamic.

---

## Project Structure

```
soil-archive/
├── app/
│   ├── layout.tsx               # Root layout — fonts, Navbar, Footer
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── collections/
│       ├── page.tsx             # Collections index
│       └── [slug]/page.tsx      # Collection detail (dynamic)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── ScrollReveal.tsx     # Intersection-observer scroll animation
│   │   ├── CursorEmbers.tsx     # Gold dust cursor trail (desktop only)
│   │   └── AdinkraSpinner.tsx   # African-inspired loading spinner
│   ├── courtroom/
│   │   └── ImmersiveCourtroom.tsx  # Perspective-switching courtroom experience
│   └── timeline/
│       └── Timeline.tsx         # Scroll-triggered ink-stamp timeline
│
├── content/collections/
│   └── ogoni-nine/
│       ├── config.json
│       ├── index.mdx
│       ├── timeline.json
│       └── documents.json
│
├── lib/
│   └── collections.ts           # Filesystem utilities for reading collection content
│
└── public/
    └── audio/
        └── ogoni-nine/          # Spatial audio placeholders
```

---

## Design System

**Palette:**
- Parchment: `#FBF6EC` / `#F0DEBB`
- Ochre: `#C17D11`
- Sienna: `#8B3A2F`
- Forest: `#1A3A1A`
- Gold: `#C9A84C`
- Charcoal: `#1C1C1A`

**Fonts (via `next/font/google`):**
- Headings: Playfair Display
- Body: EB Garamond
- UI: DM Sans

**Motion:**
- Scroll reveal: IntersectionObserver via `ScrollReveal` component
- Timeline: ink-stamp animation triggered on scroll
- Cursor: gold dust ember trail (desktop, respects `prefers-reduced-motion`)
- Collection cards: document-lift hover (CSS)
- All animations fall back to simple opacity transitions when `prefers-reduced-motion: reduce` is set

---

## Deploying to Vercel

This project is Vercel-ready. Connect the GitHub repository and deploy. No environment variables are required for basic functionality.

```bash
# Build check
npm run build
```

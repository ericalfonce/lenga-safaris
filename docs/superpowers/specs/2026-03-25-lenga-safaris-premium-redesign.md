# Lenga Safaris — Premium Redesign Spec
**Date:** 2026-03-25
**Scope:** All 5 pages (index, northern-circuit, wildebeest-migration, amboseli-safari) — CSS-first with minimal targeted HTML edits

---

## Goal
Elevate the site from a standard travel website to a premium luxury safari brand experience — inspired by the Chem Chem Safari reference — without changing any content.

---

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--green-dark` | `#1a2e1a` | Nav (scrolled), footer, dark overlays |
| `--green-mid` | `#2d5a27` | Accent, hover states |
| `--gold` | `#c9a84c` | CTAs, dividers, borders, highlights |
| `--gold-light` | `#e8d5a3` | Subtle gold tints |
| `--ivory` | `#faf8f5` | Page background |
| `--cream` | `#f5f0e8` | Section alternate background |
| `--text-dark` | `#1c1c1c` | Body text |
| `--white` | `#ffffff` | Card surfaces |

---

## Typography

- **Headings (h1–h3):** Cormorant Garamond (Google Fonts) — weight 400/600, letter-spacing `0.08em`
- **Body / UI:** Poppins (existing) — unchanged
- **Nav links:** Poppins, uppercase, `0.85rem`, letter-spacing `0.12em`
- **Section subheadings / labels:** Poppins, uppercase, `0.75rem`, letter-spacing `0.2em`, champagne gold

---

## Navigation

- **Default state:** Fully transparent, white text and logo, `position: fixed`, `z-index: 1000`
- **Scrolled state (>80px):** Background transitions to `#1a2e1a`, soft `box-shadow`, smooth `0.4s` CSS transition — triggered via JS `scroll` event adding `.scrolled` class
- **Links:** Text-only (remove FontAwesome icons from nav links), uppercase Poppins, white, hover underline in gold
- **Book Now CTA:** Outlined button — transparent fill, `1px solid #c9a84c`, gold text, `4px` border-radius; fills gold on hover
- **Mobile:** Existing hamburger/stacked behavior kept, refined with new colors

---

## Hero Section

- `min-height: 100vh` (up from 60vh)
- Overlay: `rgba(0,0,0,0.45)` straight black gradient — no green tint
- **Remove** the blurred glass box (`.hero-text` backdrop-filter and background)
- `h1` "Lenga Safaris": Cormorant Garamond, `4.5rem`, `#c9a84c`, `letter-spacing: 0.15em`
- `h2` subtitle: Cormorant Garamond, `2.8rem`, white, `font-style: italic`
- Tagline `p`: Poppins, `0.85rem`, uppercase, `letter-spacing: 0.2em`, `#e8d5a3`
- CTAs: Both outlined gold style, side by side, `4px` border-radius
- Scroll indicator: animated chevron/arrow at bottom center (`position: absolute; bottom: 2rem`)

---

## Tour Cards (Signature Safari Packages + Popular Packages)

**New layout — side-by-side alternating rows:**
- Each `.card` becomes a full-width flex row: image 50% | text 50%
- Odd cards: image left, text right
- Even cards: image right, text left (via `flex-direction: row-reverse`)
- Image: `height: 480px`, `object-fit: cover`, no border-radius; subtle zoom on hover
- Text side: `padding: 4rem`, left-aligned, white background
  - Cormorant heading with thin `2px` champagne gold line underneath (`::after`)
  - Poppins body text, `#555`, `1.8` line-height
  - Outlined gold CTA button
- HTML change needed: wrap `.card` image+text content in `.card-image` and `.card-body` divs

---

## About / Why Tanzania Sections

- Keep existing side-by-side image+text HTML structure
- Overlay background: `rgba(26,46,26,0.7)` dark green — text becomes white/ivory
- Headings: Cormorant Garamond, `2.4rem`, ivory
- Image border-radius: `4px` (reduced from `14px`)
- Image hover: scale `1.04`, no rotation

---

## Info Section (replacing table layout)

- Replace `<table>` with a CSS `display: grid; grid-template-columns: repeat(3, 1fr)` layout
- Each info card: white background, `border-left: 3px solid #c9a84c`, `padding: 2rem`
- Heading: Cormorant Garamond, `1.4rem`, `#1a2e1a` — **remove FontAwesome icons from headings**
- Body: Poppins, `0.95rem`, `#444`, `1.7` line-height
- Hover: `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`, lift `translateY(-4px)`
- Responsive: 2 columns at 900px, 1 column at 600px

---

## Gallery

- Image height: `260px` (up from `180px`)
- Hover: scale `1.04` + gold tint overlay (`rgba(201,168,76,0.15)`)
- Grid gap: `1.2rem` — unchanged

---

## Footer

- Background: `#1a2e1a` (matches scrolled nav)
- Remove `border-top-left-radius` and `border-top-right-radius` — straight clean edge
- Booking form inputs: `border: 1px solid #c9a84c`, ivory background `#faf8f5`
- "Book Now" button: solid `#c9a84c` fill, `#1a2e1a` text
- Footer bottom: thin `1px solid rgba(201,168,76,0.3)` top border
- Social icons: gold on hover (unchanged behavior, refined color to `#c9a84c`)

---

## Micro-details

- Section heading treatment: centered Cormorant, `::after` thin `40px` gold line `2px` height below heading
- Scroll reveal: slow to `transition: 1s`, translate from `20px` (down from `40px`) — more graceful
- Back-to-top button: `border-radius: 4px`, outlined gold style
- All pill buttons (`border-radius: 26px`) → `border-radius: 4px`
- Page background: `#faf8f5` (warm ivory)
- `html { scroll-behavior: smooth }`
- CSS custom properties (`:root` variables) for all color tokens

---

## Files to Modify

| File | Changes |
|---|---|
| `style.css` | Full rewrite with new design system |
| `index.html` | Add `.card-image`/`.card-body` wrappers on tour cards, replace `<table>` info layout with `<div>` grid, add nav scroll JS, remove FontAwesome icons from nav links |
| `northern-circuit.css` | Color + typography tokens |
| `northern-circuit.html` | Nav icon removal |
| `wildebeest-migration.css` | Color + typography tokens |
| `wildebeest-migration.html` | Nav icon removal |
| `amboseli-safari.css` | Color + typography tokens |
| `amboseli-safari.html` | Nav icon removal |

---

## Out of Scope

- No content changes (text, images, links, booking form fields)
- No new pages
- No backend/form logic changes

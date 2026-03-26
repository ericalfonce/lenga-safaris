# Lenga Safaris Premium Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Lenga Safaris from a standard travel site to a premium luxury safari brand experience — keeping all content, restructuring CSS and minimal HTML.

**Architecture:** Rewrite `style.css` as the single source of truth for shared styles (nav, hero, footer, tokens, animations). Sub-pages (`northern-circuit`, `wildebeest-migration`, `amboseli-safari`) will link to `style.css` as a shared base PLUS their own CSS for page-specific content. Minimal HTML edits for card wrappers, info grid, nav cleanup, and font/script additions.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, Google Fonts (Cormorant Garamond + Poppins), Font Awesome 6 (already loaded)

---

## File Map

| File | Role |
|---|---|
| `style.css` | Full rewrite — all shared styles: tokens, nav, hero, sections, cards, gallery, footer, animations |
| `index.html` | Add Google Fonts link, remove nav icons, add scroll JS, restructure tour cards, replace info table with grid, add scroll indicator to hero |
| `northern-circuit.html` | Add Google Fonts link, add `<link href="style.css">`, remove nav icons, add scroll JS |
| `northern-circuit.css` | Strip nav/hero/footer/token styles — keep only page-specific content section styles, update tokens |
| `wildebeest-migration.html` | Same as northern-circuit.html |
| `wildebeest-migration.css` | Same as northern-circuit.css |
| `amboseli-safari.html` | Same as northern-circuit.html |
| `amboseli-safari.css` | Same as northern-circuit.css |

---

## Task 1: CSS Design Tokens + Google Fonts

**Files:**
- Modify: `style.css` (replace entire file)
- Modify: `index.html` (add Google Fonts `<link>`)

- [ ] **Step 1: Add Google Fonts to index.html**

Open `index.html`. Add these two lines inside `<head>`, directly after the `<meta name="author">` line (line 9):

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Replace style.css with new design system**

Replace the entire content of `style.css` with:

```css
/* ============================================
   LENGA SAFARIS — PREMIUM DESIGN SYSTEM
   ============================================ */

/* --- Design Tokens --- */
:root {
  --green-dark: #1a2e1a;
  --green-mid: #2d5a27;
  --gold: #c9a84c;
  --gold-light: #e8d5a3;
  --ivory: #faf8f5;
  --cream: #f5f0e8;
  --text-dark: #1c1c1c;
  --white: #ffffff;
}

/* --- Base --- */
html {
  scroll-behavior: smooth;
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: var(--ivory);
  color: var(--text-dark);
  line-height: 1.6;
  max-width: 100vw;
  overflow-x: hidden;
}

/* --- Navigation --- */
.navbar.minimalist-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  padding: 1.2rem 5vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease;
}

.navbar.minimalist-navbar.scrolled {
  background: var(--green-dark);
  box-shadow: 0 2px 20px rgba(0,0,0,0.2);
  padding: 0.7rem 5vw;
}

.navbar-logo {
  text-decoration: none;
  color: var(--white);
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--white);
}

.navbar-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navbar-links a {
  color: var(--white);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 4px 0;
  transition: color 0.2s;
  position: relative;
}

.navbar-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.3s ease;
}

.navbar-links a:hover::after,
.navbar-links a:focus::after {
  width: 100%;
}

.navbar-links a:hover,
.navbar-links a:focus {
  color: var(--gold-light);
}

.navbar-btn {
  background: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
  border-radius: 4px;
  padding: 0.5rem 1.4rem;
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none !important;
  transition: background 0.2s, color 0.2s;
  margin-left: 1rem;
  display: inline-block;
}

.navbar-btn:hover,
.navbar-btn:focus {
  background: var(--gold);
  color: var(--green-dark);
}

/* --- Hero --- */
header.hero {
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 1;
}

.hero-text {
  position: relative;
  z-index: 2;
  background: none;
  backdrop-filter: none;
  border-radius: 0;
  padding: 2rem;
  box-shadow: none;
  display: inline-block;
  margin-top: 0;
  opacity: 0;
  transform: translateY(30px);
  animation: heroFadeIn 1.4s cubic-bezier(.4,0,.2,1) 0.3s forwards;
}

@keyframes heroFadeIn {
  to { opacity: 1; transform: none; }
}

.hero-text h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 5rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: var(--gold);
  margin-bottom: 0.3rem;
  text-shadow: none;
  line-height: 1.1;
}

.hero-text h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.6rem;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: var(--white);
  text-shadow: none;
}

.hero-text h2 span {
  color: var(--gold-light);
  text-shadow: none;
}

.hero-subtitle {
  font-size: 0.8rem;
  color: var(--gold-light);
  margin-bottom: 2.5rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.hero-text .cta,
.hero-text .secondary-cta {
  display: inline-block;
  background: transparent;
  color: var(--gold);
  font-weight: 500;
  border: 1px solid var(--gold);
  border-radius: 4px;
  padding: 0.9rem 2.5rem;
  margin: 0 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.25s, color 0.25s;
}

.hero-text .secondary-cta {
  background: var(--gold);
  color: var(--green-dark);
}

.hero-text .cta:hover,
.hero-text .cta:focus {
  background: var(--gold);
  color: var(--green-dark);
}

.hero-text .secondary-cta:hover,
.hero-text .secondary-cta:focus {
  background: transparent;
  color: var(--gold);
}

/* Scroll indicator */
.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: var(--gold-light);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  animation: scrollBounce 2.2s ease-in-out infinite;
}

.hero-scroll-indicator i {
  font-size: 1rem;
  color: var(--gold);
}

@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(7px); }
}

/* --- Sections (base) --- */
section {
  padding: 5rem 5vw;
  text-align: center;
  background: var(--white);
}

section h2 {
  font-family: 'Cormorant Garamond', serif;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--green-dark);
  font-size: 2.6rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  display: inline-block;
}

section h2::after {
  content: '';
  display: block;
  width: 40px;
  height: 2px;
  background: var(--gold);
  margin: 0.8rem auto 2rem auto;
}

section h2 span {
  color: var(--green-mid);
}

section h3 {
  font-family: 'Cormorant Garamond', serif;
  margin-top: 2rem;
  color: var(--green-dark);
  font-size: 1.5rem;
  font-weight: 400;
}

section h4 {
  color: var(--text-dark);
  font-size: 1rem;
  margin-top: 1.2rem;
}

/* --- Tours Section --- */
#tours.section {
  background: var(--ivory);
  padding: 5rem 0;
}

#tours.section > h2 {
  padding: 0 5vw;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 3rem;
}

.card {
  display: flex;
  flex-direction: row;
  background: var(--white);
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #ece9e3;
  overflow: hidden;
}

.card:nth-child(even) {
  flex-direction: row-reverse;
}

.card-image {
  flex: 1;
  min-height: 480px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
  border-radius: 0;
  margin-bottom: 0;
}

.card:hover .card-image img {
  transform: scale(1.04);
}

.card-body {
  flex: 1;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--white);
}

.card-body h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--green-dark);
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.05em;
}

.card-body h3::after {
  content: '';
  display: block;
  width: 40px;
  height: 2px;
  background: var(--gold);
  margin: 0.8rem 0 1.2rem 0;
}

.card-body p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.card-body a.cta {
  display: inline-block;
  background: transparent;
  color: var(--gold);
  font-weight: 500;
  border: 1px solid var(--gold);
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.25s, color 0.25s;
  align-self: flex-start;
}

.card-body a.cta:hover,
.card-body a.cta:focus {
  background: var(--gold);
  color: var(--green-dark);
}

/* Legacy card h3 (cards without .card-body wrapper) */
.card h3 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--green-dark);
  font-weight: 400;
}

.card button {
  background: var(--green-dark);
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  cursor: pointer;
}

/* --- About / Why Tanzania --- */
.section.section-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--white);
  position: relative;
  padding: 0;
}

.about-section {
  background-image: url('images/serengeti sunset.jpeg');
}

.why-section {
  background-image: url('images/mount kili.jpeg');
}

.section-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 5rem 8vw;
  background: rgba(26,46,26,0.75);
}

.section-text {
  flex: 2;
  min-width: 260px;
}

.section-text h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  color: var(--ivory);
  font-weight: 400;
  letter-spacing: 0.08em;
  display: inline-block;
}

.section-text h2::after {
  margin: 0.8rem 0 1.5rem 0;
}

.section-text p {
  color: var(--gold-light);
  line-height: 1.85;
  font-size: 0.95rem;
}

.section-image-wrapper {
  flex: 1;
  min-width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-image-wrapper img {
  width: 100%;
  max-width: 360px;
  border-radius: 4px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
  transition: transform 0.5s ease, box-shadow 0.5s;
}

.section-image-wrapper img.hover-zoom:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 48px rgba(0,0,0,0.32);
}

/* --- Info Section (grid) --- */
.info-section {
  background: var(--cream);
  padding: 5rem 5vw;
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto 0 auto;
  text-align: left;
}

.info-card {
  background: var(--white);
  border-left: 3px solid var(--gold);
  padding: 2rem 1.8rem;
  transition: box-shadow 0.3s, transform 0.3s;
  opacity: 0;
  transform: translateY(20px);
}

.info-card.visible {
  opacity: 1;
  transform: none;
}

.info-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  transform: translateY(-4px);
}

.info-card h2 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--green-dark);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: block;
  text-align: left;
  letter-spacing: 0.03em;
}

.info-card h2::after {
  display: none;
}

.info-card p {
  color: #444;
  font-size: 0.93rem;
  line-height: 1.75;
  margin-bottom: 0.7rem;
}

/* --- Packages Section --- */
#packages.section {
  background: var(--ivory);
}

/* --- Types Section --- */
#types.section {
  background: var(--white);
}

/* --- Tips Section --- */
#tips.section {
  background: var(--cream);
}

/* --- Image-less card sections (packages, tips, tanzania-overview) ---
   These cards have no images — override to 3-column grid layout */
#packages .cards,
#tips .cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

#packages .card,
#tips .card {
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #ece9e3;
  border-left: 3px solid var(--gold);
}

#packages .card h3,
#tips .card h4 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--green-dark);
  font-weight: 600;
  margin-top: 0;
}

@media (max-width: 768px) {
  #packages .cards,
  #tips .cards {
    grid-template-columns: 1fr;
  }
}

/* --- Gallery --- */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;
}

.gallery-grid img {
  width: 100%;
  border-radius: 2px;
  object-fit: cover;
  height: 260px;
  background: var(--ivory);
  transition: transform 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.3s;
  opacity: 0;
  transform: translateY(20px);
}

.gallery-grid img.visible {
  opacity: 1;
  transform: none;
}

.gallery-grid img:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 32px rgba(201,168,76,0.2);
}

/* --- Past Events --- */
.event-gallery-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.event-link-card {
  position: relative;
  width: 280px;
  height: 180px;
  border-radius: 4px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 24px rgba(26,46,26,0.13);
  display: flex;
  align-items: flex-end;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
}

.event-link-card:hover,
.event-link-card:focus {
  transform: scale(1.03) translateY(-4px);
  box-shadow: 0 12px 40px rgba(26,46,26,0.2);
}

.event-link-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26,46,26,0.75) 0%, rgba(0,0,0,0.1) 100%);
  z-index: 1;
}

.event-link-content {
  position: relative;
  z-index: 2;
  color: var(--gold-light);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  padding: 1.2rem;
}

.event-link-content i {
  font-size: 1.3rem;
  color: var(--gold);
  margin-bottom: 0.2rem;
}

.event-link-content span {
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

/* --- Footer --- */
footer {
  background: var(--green-dark);
  color: var(--white);
  padding: 0;
  text-align: center;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: none;
  position: relative;
  margin-top: 0;
}

.classic-footer {
  background: var(--green-dark);
  color: var(--white);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: 0;
  padding: 0;
}

.classic-footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 3rem;
  padding: 4rem 5vw 2rem 5vw;
}

.classic-footer-col {
  flex: 1 1 220px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}

.classic-footer-logo img {
  height: 70px;
  margin-bottom: 0.3rem;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
}

.classic-footer-brand {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--gold);
  letter-spacing: 0.1em;
  margin-bottom: 0.2rem;
  text-align: center;
}

.classic-footer-contact {
  font-size: 0.9rem;
  color: var(--gold-light);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
}

.classic-footer-contact i {
  margin-right: 0.4em;
  color: var(--gold);
}

.classic-footer-contact a {
  color: var(--gold-light);
  text-decoration: underline;
}

.classic-footer-booking {
  background: var(--white);
  color: var(--green-dark);
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  padding: 1.8rem;
  margin: 0 auto;
  max-width: 360px;
  width: 100%;
}

.classic-footer-form {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.classic-footer-form input,
.classic-footer-form select {
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 1px solid var(--gold);
  border-radius: 3px;
  font-size: 0.9rem;
  background: var(--ivory);
  color: var(--green-dark);
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.classic-footer-form button {
  background: var(--gold);
  color: var(--green-dark);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 0.3rem;
  transition: background 0.2s, color 0.2s, border 0.2s;
}

.classic-footer-form button:hover {
  background: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
}

.classic-footer-payments {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 0.7rem 0 0.2rem 0;
  justify-content: center;
}

.classic-footer-payments img {
  height: 26px;
  width: auto;
  background: var(--white);
  border-radius: 3px;
  padding: 2px 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.classic-footer-note {
  font-size: 0.82rem;
  color: #666;
  text-align: center;
}

.classic-footer-social > div:first-child {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gold-light);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.classic-footer-social-icons {
  display: flex;
  gap: 0.7rem;
  justify-content: center;
}

.classic-footer-social-icons a {
  color: var(--gold-light);
  background: rgba(255,255,255,0.07);
  font-size: 1.1rem;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  text-decoration: none;
  border: 1px solid rgba(201,168,76,0.3);
}

.classic-footer-social-icons a:hover {
  background: var(--gold);
  color: var(--green-dark);
  transform: scale(1.1);
}

.classic-footer-bottom {
  font-size: 0.82rem;
  color: var(--gold-light);
  letter-spacing: 0.05em;
  text-align: center;
  padding: 1.2rem 0 1rem 0;
  border-top: 1px solid rgba(201,168,76,0.25);
  margin-top: 1rem;
}

/* --- Back to Top --- */
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 24px;
  background: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
  border-radius: 4px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-decoration: none;
  z-index: 999;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}

.back-to-top:hover {
  background: var(--gold);
  color: var(--green-dark);
  transform: translateY(-3px);
}

/* --- Scroll Reveal --- */
.section, .cards .card, .info-card, .gallery-grid img {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s cubic-bezier(.4,0,.2,1), transform 1s cubic-bezier(.4,0,.2,1);
  will-change: opacity, transform;
}

.section.visible, .cards .card.visible, .info-card.visible, .gallery-grid img.visible {
  opacity: 1;
  transform: none;
}

/* --- Highlight Quote --- */
.highlight-quote {
  border-left: 3px solid var(--gold);
  padding: 1rem 1.2rem;
  margin: 1.5rem 0;
  font-style: italic;
  background: var(--cream);
  font-size: 1.05rem;
  color: var(--green-dark);
}

/* --- Section Lists --- */
.section ul,
.section ol {
  margin-left: 1.2rem;
  padding-left: 1.2rem;
}

/* --- Custom List: about-northern --- */
#about-northern ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

#about-northern ul li {
  position: relative;
  padding-left: 2em;
  margin-bottom: 0.7em;
  font-size: 1.05em;
  color: var(--green-dark);
}

#about-northern ul li::before {
  content: "\f058";
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  color: var(--gold);
  position: absolute;
  left: 0;
  top: 0.1em;
  font-size: 1.1em;
}

/* --- Container --- */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* --- Responsive --- */
@media (max-width: 1024px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .card {
    flex-direction: column !important;
  }
  .card-image {
    min-height: 280px;
    width: 100%;
  }
  .card-body {
    padding: 2rem;
  }
  .section-content {
    flex-direction: column;
    padding: 3rem 5vw;
  }
  .navbar.minimalist-navbar {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 2vw;
    background: var(--green-dark);
  }
  .navbar-links {
    justify-content: center;
    gap: 0.8rem;
    margin: 0.3rem 0;
    flex-wrap: wrap;
  }
  .navbar-btn {
    margin: 0.3rem auto 0 auto;
    width: 90%;
    text-align: center;
  }
  .hero-text h1 { font-size: 3rem; }
  .hero-text h2 { font-size: 1.8rem; }
  .classic-footer-content {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2.5rem 1rem 1rem 1rem;
  }
  .classic-footer-booking {
    width: 100%;
    max-width: 98vw;
  }
}

@media (max-width: 600px) {
  .info-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr; }
  section { padding: 3rem 1rem; }
  .hero-text h1 { font-size: 2.4rem; }
  .hero-text h2 { font-size: 1.5rem; }
}
```

- [ ] **Step 3: Verify fonts load**

Open `index.html` in a browser. Confirm:
- Page background is warm ivory (not bright white or green-tinted)
- Body font is Poppins (unchanged)
- No visual errors in the console

- [ ] **Step 4: Commit**

```bash
cd /c/Users/HP/Desktop/lenga-safaris
git add index.html style.css
git commit -m "feat: add CSS design tokens, Google Fonts, and full style rewrite"
```

---

## Task 2: Navigation HTML — Remove Icons + Add Scroll JS

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Remove FontAwesome icons from nav links in index.html**

Find this block in `index.html` (inside `.navbar-links`):

```html
    <a href="#tours"><i class="fa-solid fa-binoculars"></i> Tours</a>
    <a href="#about"><i class="fa-solid fa-info-circle"></i> About</a>
    <a href="#gallery"><i class="fa-solid fa-images"></i> Gallery</a>
    <a href="mailto:info@lengasafaris.com"><i class="fa-solid fa-envelope"></i> Contact Us</a>
```

Replace with:

```html
    <a href="#tours">Tours</a>
    <a href="#about">About</a>
    <a href="#gallery">Gallery</a>
    <a href="mailto:info@lengasafaris.com">Contact Us</a>
```

- [ ] **Step 2: Add nav scroll JS to index.html**

Find the existing scroll reveal `<script>` block at the bottom of `index.html` (the one with `revealOnScroll`). Add this new script block directly BEFORE it:

```html
<script>
(function() {
  var navbar = document.querySelector('.navbar.minimalist-navbar');
  if (!navbar) return;
  function updateNav() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();
</script>
```

- [ ] **Step 3: Verify nav behavior**

Open `index.html` in a browser:
- Nav should be transparent over the hero image on load
- Scroll down — nav should transition to dark green (`#1a2e1a`) background smoothly
- Nav links should be uppercase text with no icons

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: transparent nav with scroll transition and clean text links"
```

---

## Task 3: Hero Section HTML

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add scroll indicator to hero**

Find this in `index.html`:

```html
    <a href="#booking-form" class="cta secondary-cta">Book Now</a>
  </div>
</header>
```

Replace with:

```html
    <a href="#booking-form" class="cta secondary-cta">Book Now</a>
  </div>
  <div class="hero-scroll-indicator">
    <span>Scroll</span>
    <i class="fa-solid fa-chevron-down"></i>
  </div>
</header>
```

- [ ] **Step 2: Verify hero**

Open `index.html` in a browser. Confirm:
- Hero fills the full viewport height (100vh)
- No blurred glass box behind the text
- "Lenga Safaris" heading appears in champagne gold with Cormorant Garamond serif font
- Subtitle is italic white serif
- Tagline is small uppercase spaced text
- Both CTAs are outlined gold buttons
- Scroll indicator visible at bottom of hero, animating gently

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: full-screen hero with scroll indicator and premium typography"
```

---

## Task 4: Tour Cards — Side-by-Side Alternating Layout

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Restructure the Signature Safari Packages cards**

Find the 3 cards inside `<section id="tours">`. Each currently looks like this:

```html
      <div class="card">
        <img src="images/th-1494847037.jpeg" alt="Northern Circuit">
        <h3>Classic Northern Circuit</h3>
        <p>Explore Serengeti, Ngorongoro & Tarangire with expert guides and stunning landscapes.</p>
        <a href="northern-circuit.html" class="cta">Learn More</a>
      </div>
```

Wrap each card's content in `.card-image` and `.card-body` divs. Replace the entire three-card block with:

```html
      <div class="card">
        <div class="card-image">
          <img src="images/th-1494847037.jpeg" alt="Northern Circuit">
        </div>
        <div class="card-body">
          <h3>Classic Northern Circuit</h3>
          <p>Explore Serengeti, Ngorongoro & Tarangire with expert guides and stunning landscapes.</p>
          <a href="northern-circuit.html" class="cta">Learn More</a>
        </div>
      </div>
      <div class="card">
        <div class="card-image">
          <img src="images/wildbest.jpeg" alt="Migration">
        </div>
        <div class="card-body">
          <h3>Wildebeest Migration</h3>
          <p>Experience the great migration in its raw, awe-inspiring beauty.</p>
          <a href="wildebeest-migration.html" class="cta">View Details</a>
        </div>
      </div>
      <div class="card">
        <div class="card-image">
          <img src="images/amboseli-national-park-1544135262.jpg" alt="Amboseli Safari">
        </div>
        <div class="card-body">
          <h3>Kilimanjaro Safari</h3>
          <p>See elephants with Kilimanjaro in the background. A dream photo safari.</p>
          <a href="amboseli-safari.html" class="cta">See More</a>
        </div>
      </div>
```

- [ ] **Step 2: Restructure the Safari Types cards**

Find the 6 cards inside `<section id="types">`. Each currently looks like:

```html
    <div class="card">
      <img src="images/groupsafaris.jpg" alt="Family Safaris">
      <h3>Family Safaris</h3>
      <p>Adventures perfect for kids and parents alike.</p>
    </div>
```

Replace the entire six-card block with:

```html
    <div class="card">
      <div class="card-image">
        <img src="images/groupsafaris.jpg" alt="Family Safaris">
      </div>
      <div class="card-body">
        <h3>Family Safaris</h3>
        <p>Adventures perfect for kids and parents alike.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <img src="images/camping.jpg" alt="Budget Camping">
      </div>
      <div class="card-body">
        <h3>Budget Camping</h3>
        <p>Affordable journeys with close-to-nature experiences.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <img src="images/SBSJune2019-13_Web.webp" alt="Luxury Safaris">
      </div>
      <div class="card-body">
        <h3>Luxury Safaris</h3>
        <p>Stay in high-end lodges with personalized service.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <img src="images/SBS-1154.webp" alt="Balloon Rides">
      </div>
      <div class="card-body">
        <h3>Balloon Rides</h3>
        <p>Soar over the Serengeti during sunrise for unforgettable views.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <img src="images/lakemanyara.jpg" alt="Bird Watching">
      </div>
      <div class="card-body">
        <h3>Bird Watching</h3>
        <p>Join expert guides on ornithological expeditions.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <img src="images/kili.jpg" alt="Hiking & Climbing">
      </div>
      <div class="card-body">
        <h3>Hiking & Climbing</h3>
        <p>Conquer Mount Kilimanjaro or trek through the Usambara ranges.</p>
      </div>
    </div>
```

- [ ] **Step 3: Verify cards**

Open `index.html` in a browser:
- Tour cards should appear as full-width rows with image on the left and text on the right
- Card 2 (Wildebeest Migration) should have image on the RIGHT and text on the LEFT (alternating)
- Hovering a card should produce a subtle zoom on the image only
- The gold line divider should appear under each card heading

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: side-by-side alternating card layout for tours and safari types"
```

---

## Task 5: Info Section — Replace Table with Grid

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the table with a div grid**

Find the entire `<section id="info-highlights" class="info-section">` block (lines ~113–181 in the original). Replace it entirely with:

```html
<section id="info-highlights" class="info-section">
  <h2>Everything You Need to Know</h2>
  <div class="info-grid">
    <div class="info-card" id="safari-cost">
      <h2>Cost of a Tanzania Safari</h2>
      <p>Safari prices vary based on accommodation level, trip duration, destinations, transportation mode, and more. Luxury safari lodges may cost over $1500 per person per night, while budget-friendly options are also available.</p>
      <p>Reduce costs by traveling in groups, choosing shorter trips, selecting easily connected destinations, and bargaining smartly. Remember, combining both Northern and Southern regions often involves flights, adding to the cost.</p>
    </div>
    <div class="info-card" id="where-to-go">
      <h2>Where to Go</h2>
      <p>The Northern Circuit hosts top safari destinations: Serengeti, Ngorongoro, Lake Manyara, Arusha National Park, Mount Kilimanjaro, and Tarangire. Serengeti and Ngorongoro are must-visits and easiest to join.</p>
      <p>Southern parks like Ruaha and Selous offer more affordable, less crowded safaris, although they are remote and often require flights to access.</p>
    </div>
    <div class="info-card" id="northern-vs-southern">
      <h2>Southern VS Northern Tanzania Safaris</h2>
      <p>Northern Tanzania has iconic attractions and a high tourist influx, making it pricier and more competitive. Southern Tanzania is more affordable, less crowded, but requires more travel logistics. Choose the North for highlights and shorter trips; go South for solitude and budget-friendly options.</p>
    </div>
    <div class="info-card" id="best-time">
      <h2>Best Time to Go on a Safari in Tanzania</h2>
      <p>While Tanzania is a year-round destination, the dry season (June–October) is ideal for safaris. Witness the Great Wildebeest Migration between June and July or the calving season from January to February.</p>
      <p>Birdwatchers will enjoy the wet season when bird activity peaks, especially in the Southern Circuit.</p>
    </div>
    <div class="info-card" id="transport">
      <h2>Flights VS 4x4 Safari Cars</h2>
      <p>Flights offer aerial views and save time between distant parks but can be expensive. Many still require 4x4 safari vehicles for game drives, so budget accordingly. Opt for flights if time is limited and budget allows.</p>
    </div>
    <div class="info-card" id="budget-vs-luxury">
      <h2>Budget or Luxury Tanzania Safaris</h2>
      <p>With over 1.5 million tourists annually, Northern Tanzania is a premium safari region. Southern and Western circuits offer cheaper, less crowded options. Your choice of tour company also affects cost—some charge unreasonably high rates.</p>
      <p>At <strong>Lenga Safaris</strong>, we offer affordable packages without compromising on experience.</p>
    </div>
    <div class="info-card" id="packing">
      <h2>Packing List & Clothing for a Tanzania Safari</h2>
      <p>What you pack depends on your itinerary. A Kilimanjaro climb requires different gear than a wildlife safari. Once you book with us, we'll guide you on the appropriate clothing and equipment for your adventure.</p>
    </div>
    <div class="info-card" id="zanzibar">
      <h2>Zanzibar Extensions</h2>
      <p>Zanzibar is the ultimate beach paradise — ideal for winding down after your safari. It's a top honeymoon and romantic destination, easily accessed by flight. We can help you plan this extension to ensure a seamless and relaxing end to your trip.</p>
    </div>
    <div class="info-card" id="why-focus">
      <h2>Why Travel to Tanzania with Lenga Safaris?</h2>
      <p>Our passionate and professional team at <strong>Lenga Safaris</strong> is committed to crafting unforgettable safari experiences. With unbeatable prices and personalized service, we are your go-to partner for safaris in Tanzania and the East African region.</p>
      <p>Drop us a message — we'll respond promptly and help you plan the trip of a lifetime!</p>
    </div>
  </div>
</section>
```

Also remove the stray `</section>` tag that appears right after the info section closing tag (line ~182 in the original — it reads `  </section>` with no matching open tag).

- [ ] **Step 2: Verify info section**

Open `index.html` in a browser:
- 9 info cards should appear in a 3-column grid
- Each card has a champagne gold left border
- Cards lift slightly on hover
- No FontAwesome icons in the card headings
- Responsive: collapses to 2 columns at tablet width, 1 column on mobile

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace info table with premium CSS grid layout"
```

---

## Task 6: Sub-page — northern-circuit

**Files:**
- Modify: `northern-circuit.html`
- Modify: `northern-circuit.css`

- [ ] **Step 1: Update northern-circuit.html head section**

Find the `<head>` block in `northern-circuit.html`. Replace it with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>northern-circuit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="northern-circuit.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="icon" type="image/png" href="images/favicon.ico" />
</head>
```

- [ ] **Step 2: Remove nav icons in northern-circuit.html**

Find the nav links block:

```html
      <a href="index.html#tours"><i class="fa-solid fa-binoculars"></i> Tours</a>
      <a href="index.html#about"><i class="fa-solid fa-info-circle"></i> About</a>
      <a href="index.html#gallery"><i class="fa-solid fa-images"></i> Gallery</a>
      <a href="mailto:info@lengasafaris.com"><i class="fa-solid fa-envelope"></i> Contact Us</a>
```

Replace with:

```html
      <a href="index.html#tours">Tours</a>
      <a href="index.html#about">About</a>
      <a href="index.html#gallery">Gallery</a>
      <a href="mailto:info@lengasafaris.com">Contact Us</a>
```

- [ ] **Step 3: Add nav scroll JS to northern-circuit.html**

Find the closing `</body>` tag. Add this script block directly before it:

```html
<script>
(function() {
  var navbar = document.querySelector('.navbar.minimalist-navbar');
  if (!navbar) return;
  function updateNav() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();
</script>
```

- [ ] **Step 4: Strip duplicate styles from northern-circuit.css**

The `northern-circuit.css` file currently duplicates nav, hero, footer, and base styles that are now provided by `style.css`. Replace `northern-circuit.css` with only page-specific content styles. Read the full file first, then keep only the sections below `/* page-specific content */` (destination cards, itinerary, pricing, etc.). Replace the top of the file (everything from `body {` through the nav/hero/footer/animation duplicate blocks) by opening the file and deleting from line 1 through the last line that duplicates style.css patterns. Replace with just this token override at the top:

```css
/* northern-circuit.css — page-specific styles only */
/* Shared nav, hero, footer, tokens loaded via style.css */
```

Then keep all the page-specific rules that follow (`.destinations-grid`, `.destination-card`, `.itinerary-*`, `.pricing-*`, etc.) — do not delete those.

- [ ] **Step 5: Verify northern-circuit.html**

Open `northern-circuit.html` in a browser:
- Nav is transparent over the hero, transitions to dark green on scroll
- Hero is full-screen (100vh)
- No blurred glass box on hero text
- Heading fonts are Cormorant Garamond serif
- Page-specific content sections render correctly

- [ ] **Step 6: Commit**

```bash
git add northern-circuit.html northern-circuit.css
git commit -m "feat: apply premium design to northern-circuit page"
```

---

## Task 7: Sub-page — wildebeest-migration

**Files:**
- Modify: `wildebeest-migration.html`
- Modify: `wildebeest-migration.css`

- [ ] **Step 1: Update wildebeest-migration.html head**

Find the `<head>` block. Replace it with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>wildebeest-migration</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="wildebeest-migration.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="icon" type="image/png" href="images/favicon.ico" />
</head>
```

- [ ] **Step 2: Remove nav icons in wildebeest-migration.html**

Find the nav links block and replace:

```html
      <a href="index.html#tours"><i class="fa-solid fa-binoculars"></i> Tours</a>
      <a href="index.html#about"><i class="fa-solid fa-info-circle"></i> About</a>
      <a href="index.html#gallery"><i class="fa-solid fa-images"></i> Gallery</a>
      <a href="mailto:info@lengasafaris.com"><i class="fa-solid fa-envelope"></i> Contact Us</a>
```

With:

```html
      <a href="index.html#tours">Tours</a>
      <a href="index.html#about">About</a>
      <a href="index.html#gallery">Gallery</a>
      <a href="mailto:info@lengasafaris.com">Contact Us</a>
```

- [ ] **Step 3: Add nav scroll JS to wildebeest-migration.html**

Add directly before `</body>`:

```html
<script>
(function() {
  var navbar = document.querySelector('.navbar.minimalist-navbar');
  if (!navbar) return;
  function updateNav() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();
</script>
```

- [ ] **Step 4: Strip duplicate styles from wildebeest-migration.css**

Same as Task 6 Step 4. Open the file, remove all duplicate nav/hero/footer/base/token rules that now come from `style.css`. Replace the top with:

```css
/* wildebeest-migration.css — page-specific styles only */
/* Shared nav, hero, footer, tokens loaded via style.css */
```

Keep all page-specific content section styles.

- [ ] **Step 5: Verify wildebeest-migration.html**

Open in browser. Confirm: transparent nav on load → dark green on scroll, full-screen hero, Cormorant Garamond headings, no glass box.

- [ ] **Step 6: Commit**

```bash
git add wildebeest-migration.html wildebeest-migration.css
git commit -m "feat: apply premium design to wildebeest-migration page"
```

---

## Task 8: Sub-page — amboseli-safari

**Files:**
- Modify: `amboseli-safari.html`
- Modify: `amboseli-safari.css`

- [ ] **Step 1: Update amboseli-safari.html head**

Find the `<head>` block. Replace it with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>amboseli-safari</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="amboseli-safari.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="icon" type="image/png" href="images/favicon.ico" />
</head>
```

- [ ] **Step 2: Remove nav icons in amboseli-safari.html**

Find the nav links and replace:

```html
      <a href="index.html#tours"><i class="fa-solid fa-binoculars"></i> Tours</a>
      <a href="index.html#about"><i class="fa-solid fa-info-circle"></i> About</a>
      <a href="index.html#gallery"><i class="fa-solid fa-images"></i> Gallery</a>
      <a href="mailto:info@lengasafaris.com"><i class="fa-solid fa-envelope"></i> Contact Us</a>
```

With:

```html
      <a href="index.html#tours">Tours</a>
      <a href="index.html#about">About</a>
      <a href="index.html#gallery">Gallery</a>
      <a href="mailto:info@lengasafaris.com">Contact Us</a>
```

- [ ] **Step 3: Add nav scroll JS to amboseli-safari.html**

Add directly before `</body>`:

```html
<script>
(function() {
  var navbar = document.querySelector('.navbar.minimalist-navbar');
  if (!navbar) return;
  function updateNav() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();
</script>
```

- [ ] **Step 4: Strip duplicate styles from amboseli-safari.css**

Same as Tasks 6 & 7. Replace top duplicate styles with:

```css
/* amboseli-safari.css — page-specific styles only */
/* Shared nav, hero, footer, tokens loaded via style.css */
```

Keep all page-specific content section styles.

- [ ] **Step 5: Verify amboseli-safari.html**

Open in browser. Confirm: transparent nav → dark green on scroll, full-screen hero, serif headings, no glass box.

- [ ] **Step 6: Commit**

```bash
git add amboseli-safari.html amboseli-safari.css
git commit -m "feat: apply premium design to amboseli-safari page"
```

---

## Task 9: Final Cross-Page Verification

- [ ] **Step 1: Open all 4 pages and verify the complete checklist**

For each page (`index.html`, `northern-circuit.html`, `wildebeest-migration.html`, `amboseli-safari.html`):

| Check | Expected |
|---|---|
| Nav on load | Transparent, white text, no icons in links |
| Nav after scroll | Dark green `#1a2e1a`, smooth transition |
| Hero height | Full viewport (100vh) |
| Hero text box | No blurred glass box, clean text on image |
| H1 font | Cormorant Garamond serif, champagne gold |
| H2 subtitle | Italic serif, white |
| Section headings | Cormorant Garamond with thin gold underline |
| Tour cards (index) | Side-by-side rows, alternating image sides |
| Info section (index) | 3-column grid with gold left borders |
| CTA buttons | Outlined gold, `4px` radius (no pill shape) |
| Footer | Dark green, no rounded top corners |
| Back-to-top | Square outlined gold button |
| Page background | Warm ivory (not bright white) |

- [ ] **Step 2: Check mobile responsiveness**

Open browser DevTools, switch to mobile view (375px width). Verify:
- Cards stack vertically (image on top, text below)
- Nav collapses cleanly
- Info grid becomes 1 column
- Hero text is readable at reduced size

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Lenga Safaris premium redesign across all pages"
```

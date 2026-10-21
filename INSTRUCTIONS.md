# INSTRUCTIONS.md: NEILIAN.DEV Portfolio Rebuild

You are an AI coding agent. Rebuild the portfolio website at **neilian.dev** following this document exactly. When something is ambiguous, choose the simpler option and leave a `TODO` comment instead of inventing content.

---

## 1. Project summary

- **Owner:** Neilian, a solo web/mobile developer and graphic designer. Brand: **NEILIAN.DEV**.
- **Goal:** At first glance it looks like the website of a company in the creative industry. On exploration it is clearly built by one skilled, award-winning-caliber indie developer. **Do NOT add awards, "award-winning" claims, a process section, or a "reveal" section.** The quality of craft carries the impression.
- **Tone:** Professional, confident, minimal, with a touch of creative (typography, motion, the services mindmap). Copy is concise and in English.
- **Open source:** MIT license. Code and personal content must be cleanly separated so anyone can fork and replace the content.

---

## 2. Tech stack (fixed)

| Concern | Choice |
|---|---|
| Framework | **Astro** (static output) |
| Styling | **Tailwind CSS** |
| Scroll animation | **GSAP + ScrollTrigger** (hero typing is plain JS, no GSAP needed) |
| Content | Astro **Content Collections** (Markdown/MDX + frontmatter) |
| Font | **Syne** (self-hosted via `@fontsource-variable/syne`), plus one monospace (`@fontsource/jetbrains-mono` or `space-mono`) for small labels only |
| Icons | **Simple Icons** for brand logos (GitHub, Facebook, Instagram, LinkedIn, TikTok, YouTube) and **Lucide** for UI icons. **No emojis as icons.** |
| Contact form | **Web3Forms** (default) or Formspree, via a public env var. No backend. |
| Hosting | **Cloudflare Pages** (free), deployed from GitHub, custom domain neilian.dev (DNS is already on Cloudflare) |
| Language | TypeScript where practical |

Do not add heavy dependencies (no React/Vue unless a specific component truly needs it, and prefer vanilla JS in Astro `<script>` tags).

---

## 3. Design skill: use `ui-ux-pro-max`

Before building any UI, follow the `ui-ux-pro-max` skill workflow:

1. Run its `--design-system` search with something like: `portfolio creative agency developer designer minimal monochrome`, project name `NEILIAN.DEV`, stack `html-tailwind`. Use `--persist` to save `design-system/MASTER.md`.
2. Run supplementary searches for `ux` (animation, accessibility), `typography`, and `landing` (hero).
3. Follow its **Pre-Delivery Checklist** and **Common Rules** (no emoji icons, `cursor-pointer` on clickable items, smooth 150-300ms transitions, visible focus states, 4.5:1 contrast minimum, `prefers-reduced-motion`, no horizontal scroll, check at 375/768/1024/1440).

**Where the skill's output conflicts with this document, THIS DOCUMENT WINS.** In particular: the palette, the font, and the hover behavior below override any skill recommendation. Dark mode checks in the skill are not applicable (there is no dark mode).

---

## 4. Visual design rules

### 4.1 Palette (strict: nothing else)

Define as Tailwind theme tokens / CSS variables:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--ink` | `#0A0A0A` | Headings, primary text, primary buttons, icons |
| `--ink-soft` | `#3A3A3A` | Body text, secondary text (dark gray) |
| `--line` | `#E5E5E5` | Hairline borders, dividers (light tint of gray, allowed for borders only) |
| `--surface` | `#F5F5F5` | Optional subtle card/image placeholder background |

- **No accent colors.** No yellow, blue, gradients with color, or colored shadows. Project images and design work may of course contain their own colors.
- Inverted blocks (black background, white text) are allowed for emphasis, such as the counters band or footer. This is still within the palette.
- No dark mode and no theme toggle.

### 4.2 Typography

- **Syne** is the main font for everything: hero, headings, nav, body. Use heavy weights (700-800) for display text and tight tracking; regular weights for body.
- A **monospace** is used sparingly for tiny labels (section numbers like `[01]`, dates, tags, captions). This is the "creative touch."
- Fluid type scale with `clamp()`. The hero must scale from ~2.25rem (mobile) to ~7rem (desktop).

### 4.3 Layout and feel

- Generous whitespace, consistent `max-w-6xl` container, 12-column grid on desktop.
- Hairline borders, large type, numbered section labels (`[01] SERVICES`), subtle grid lines. This should feel like a polished studio site.
- Hover states: color/opacity/underline transitions. **No layout-shifting hover effects** (the services block below is the one exception, and it must not shift neighbors, see 6.2).
- Navbar: floating or sticky, white with a hairline bottom border, with spacing so content never hides behind it.

---

## 5. Information architecture

### Pages

| Route | Page |
|---|---|
| `/` | Home (all sections below) |
| `/web` | Web Dev projects gallery (grid) |
| `/mobile` | Mobile App projects gallery (grid) |
| `/design` | Graphic Design projects gallery (grid) |
| `/stories` | Stories list |
| `/stories/[slug]` | Story detail |
| `/404` | Simple branded 404 |

### Navigation

Items in order: **Services, Work, Design, Stories, Contact**.

- Services, Work, Design, Contact anchor-scroll to their sections on the home page (from other pages they link to `/#services` etc.).
- **Stories** goes to `/stories`.
- Logo (placeholder) on the left links to `/`.
- Mobile: hamburger button that opens a full-screen or slide-down menu. It must be keyboard accessible, trap focus while open, and close on link click or Escape.

### Home page sections (in order)

1. Hero
2. Services
3. Counters
4. Work: Featured Dev Projects (anchor `#work`)
5. Design: Featured Graphic Design Projects (anchor `#design`)
6. Contact (anchor `#contact`)
7. Footer

Each featured section has a **"View all →"** link: Work links to `/web` and `/mobile` (two links, or a link to `/web` with a secondary link to `/mobile`), and Design links to `/design`.

---

## 6. Section specifications

### 6.1 Hero

- Full viewport height (use `min-h-[100svh]`), left-aligned or centered large type, minimal supporting line below (placeholder, e.g. "Web, mobile, and brand design by Neilian." Mark as editable in config).
- Headline: **`I build systems that [word]`** where `[word]` is typed, held, deleted, then replaced by the next word, in an endless loop, with a **blinking cursor bar** (`|` or a thin block) after the word.
- Words (in this order, configurable in `src/config/site.ts`):
  `work, scale, solve, last, ship, adapt, perform, endure, connect, automate, protect, grow, simplify, deliver`
- Timing: ~80ms per char typing, ~45ms per char deleting, ~1500ms hold, ~300ms pause before next word.
- Implementation rules:
  - Vanilla JS, no library needed. Use `requestAnimationFrame` or `setTimeout`, and clean up properly.
  - **Reserve the line height** so the layout does not jump while typing; the headline must not shift on mobile when the word length changes (use a fixed-height container, and allow the typed word to sit on its own line on small screens).
  - Accessibility: `aria-label="I build systems that work"` on the heading (or visually hidden static text), and `aria-hidden` on the animated span. With `prefers-reduced-motion`, show the static headline "I build systems that work." with no typing.
  - Pause the animation when the tab is hidden (`visibilitychange`).

### 6.2 Services (mindmap-style typographic stack)

Render these 9 terms in this exact order, **centered, line by line, in varying sizes and weights so every line spans roughly the same width (justified block look)**, like a typographic poster. They are lowercase and **not clickable**.

```
information system        (medium)
mobile app                (large)
web development           (small-medium, wide)
automation                (large)
programming               (large)
custom software           (medium)
database management       (small, wide)
data privacy              (large)
it services               (large)
```

- Use Syne, heavy weight, tight letter-spacing. Each line should be sized with `clamp()` so the lines look justified (matching widths) at every breakpoint. Tune per-line font sizes (or use `text-wrap` tricks / SVG text fitting) so that widths stay visually aligned on desktop and mobile.
- **Hover (desktop):** the hovered term **enlarges** (e.g. `scale(1.08-1.15)`) with a 200-300ms ease. Use `transform` only, so it **does not shift or reflow neighboring lines** (set `transform-origin: center`, `will-change: transform`, and ensure `overflow: visible` on the parent so nothing gets clipped). Other terms may fade slightly (`opacity` to ~0.35) to focus attention on the hovered one.
- **Touch devices (no hover):** use an IntersectionObserver so the term nearest the viewport center enlarges as the user scrolls, or a tap-to-focus alternative. No hover-only behavior.
- `cursor: default` (not clickable). Wrap in a semantic list (`<ul>`) for accessibility.
- With `prefers-reduced-motion`, keep size changes but remove long transitions.
- Section label: `[01] SERVICES` (mono) with a short one-line intro.

### 6.3 Counters

Four counters in a row (2x2 grid on mobile), displayed in an inverted (black) band:

1. Deployed systems
2. Mobile apps launched
3. Logos designed
4. Books designed

- Numbers are **placeholders (`0`)** defined in `src/config/site.ts` as `counters: [{ label, value, suffix? }]` so the owner can enter them manually.
- Animate counting from 0 up to the value when the section scrolls into view (GSAP or a small vanilla counter), once only. With `prefers-reduced-motion`, show the final value immediately.
- Use `tabular-nums` so the digits do not jitter.

### 6.4 Featured Dev Projects (`#work`)

Four featured cards, in this order:

1. **RunnersPod**
2. **Wanminit w/ Fr. Elric Web**
3. **DailyAsk**
4. **MedTrack**

- Each card: image placeholder (16:10 or 4:3), project name, type tag (Web / Mobile, mono), one-line description (placeholder), and links.
- Cards link to the project's page or live link (placeholder `https://example.com/TODO`). Hover: image slight zoom inside a clipped container (no layout shift), underline on title, arrow nudges.
- Grid: 1 column on mobile, 2 on tablet/desktop.
- "View all →" links to `/web` and `/mobile`.

### 6.5 Featured Graphic Design Projects (`#design`)

Four featured cards, in this order:

1. **Rel-Event Creations**: Logo and Branding
2. **In His Steps 2025**: Book Cover and Layout
3. **Focal Point Pods**: Logo
4. **GVALIAS Architects**: Logo and Branding

- Each card: image placeholder, project name, discipline tag (mono). Use a slightly more editorial layout than dev cards (for example an asymmetric or masonry-like grid on desktop) to show the designer side. On mobile it must collapse to a clean single column.
- "View all →" links to `/design`.

### 6.6 Contact (`#contact`)

- Heading, short line of copy, and a **form**: Name, Email, Message, plus a hidden honeypot field for spam. Include labels (not placeholder-only), inline validation, a loading state, and clear success and error messages.
- Submits via Web3Forms (access key in `PUBLIC_WEB3FORMS_KEY` env var). Do not hardcode keys.
- Large, accessible inputs (min 44px height), visible focus rings.

### 6.7 Footer

- Inverted or white with a hairline top border. Contains: logo placeholder, a short tagline ("I build systems that work."), nav links in the numbered mono style (`[01] SERVICES` ...), and the copyright line "© {year} NEILIAN.DEV".
- **Social icons row:** GitHub, Email, Facebook, Instagram, LinkedIn, TikTok, YouTube.
  - Use Simple Icons SVGs (inline, `currentColor`), consistent 24px viewBox, inside a circular or rounded-square outlined button, 44px minimum tap target.
  - Hover: fill inverts (black to white or the reverse) with a smooth 200ms transition. Each has `aria-label` and `rel="noopener noreferrer"`, `target="_blank"` for external links.
  - URLs are placeholders in `src/config/site.ts` (`socials`).

---

## 7. Gallery pages (`/web`, `/mobile`, `/design`)

- Page header: large Syne title, short intro line, and a back-to-home link.
- Responsive **grid** of cards (1 col mobile, 2 tablet, 3 desktop), using the same card component as the home page.
- Content comes from Content Collections (see section 8). Each card shows image, title, tag and description, and links to the live link or case-study link if provided.
- Optional: an image lightbox for the design gallery (keep it lightweight, keyboard accessible, Escape to close). If it adds complexity, a simple grid with links is acceptable.
- Scroll-reveal animation on cards (staggered fade/translate).

---

## 8. Content model (Content Collections)

```
src/content/
  web/            *.md   (web dev projects)
  mobile/         *.md   (mobile app projects)
  design/         *.md   (graphic design projects)
  stories/        *.md   (blog: "Why I built ...")
```

### Project frontmatter (web, mobile, design)

```yaml
title: "RunnersPod"
tagline: "One-line description (placeholder)"
category: "Web"                     # Web | Mobile | Logo and Branding | Book Cover and Layout | Logo ...
image: "/placeholders/project-1.jpg"   # TODO: replace with real screenshot
gallery: []                         # optional extra images
link: "https://example.com/TODO"    # live link placeholder
storySlug: "why-i-built-runnerspod" # optional: link to its story
featured: true
order: 1
year: 2026
```

Seed these entries with the **placeholder** frontmatter above:

- `web`: Wanminit w/ Fr. Elric Web, DailyAsk, RunnersPod (set `featured` per section 6.4). Marriage is Beautiful Web may also be added as non-featured.
- `mobile`: MedTrack, RunnersPod (if applicable), and others as the owner decides. Mark each with a `TODO`.
- `design`: Rel-Event Creations (Logo and Branding), In His Steps 2025 (Book Cover and Layout), Focal Point Pods (Logo), GVALIAS Architects (Logo and Branding).

The owner will assign which projects belong to Web vs Mobile. Put RunnersPod, MedTrack, DailyAsk and Wanminit in sensible defaults and add a `TODO: confirm category` comment.

### Story frontmatter

```yaml
title: "Why I Built MedTrack"
project: "MedTrack"          # tag shown on card
tagline: "An offline, privacy first, ad-free family health companion."
date: 2026-08-12
icon: "/placeholders/icon.png"
ctaLabel: "Check out MedTrack"
ctaLink: "https://example.com/TODO"
draft: false
```

Seed story files (body = short placeholder text, since the owner will paste the real stories):

| Title | Project | Tagline | Date |
|---|---|---|---|
| Why I Built MedTrack | MedTrack | An offline, privacy first, ad-free family health companion. | 2026-08-12 |
| Why I Built SMSAPI | SMSAPI | Turn your Android phone into a powerful SMS Gateway. | 2026-08-12 |
| Why I Built Cenacle | Cenacle | A sacred space for anyone to gather in prayer. | 2026-08-12 |
| Why I Built GabayStrand | GabayStrand | Take our multi-dimensional assessment to find the perfect track for your skills, interests, and future career goals. | 2026-08-12 |
| Why I Built Wanminit with Fr. Elric Web | Wanminit with Fr. Elric Web | A sacred archive of daily one-minute Gospel reflections. | 2026-08-12 |
| Why I Built Marriage is Beautiful Web | Marriage is Beautiful Web | Share your reasons why the world celebrates marriage. | 2026-08-12 |
| Why I Built RunnersPod | RunnersPod | Connecting every runner, every race. | 2026-08-10 |
| Why I Built DailyAsk | DailyAsk | Bringing daily Catholic reflection in an intentional, distraction-free way. | 2024-03-15 |

### Stories list page (`/stories`)

- Title "Stories" with the subtitle "Why I built what I built."
- 2-column card grid (1 column on mobile), newest first. Each card: icon, date (mono), project tag (mono), title, tagline, "READ STORY →".
- Cards have hairline borders on white, hover shows a border color change to black and the arrow nudging right.

### Story detail page (`/stories/[slug]`)

- Narrow reading column (`max-w-2xl`), with icon, project tag, title, tagline (italic), and date.
- Markdown body with good typographic styles (`@tailwindcss/typography` or custom `prose` styles in the palette): headings, bold, italics, blockquotes, lists, links with underline, horizontal rules, and **support for emoji inside the body text** (stories contain emoji and checklist characters).
- Bottom: a "Ready to check it out?" block with a primary button (`ctaLabel` to `ctaLink`), then a "← BACK TO STORIES" link.
- Set per-story `<title>`, meta description (from tagline), and Open Graph tags.

---

## 9. Animation (scroll-based)

- Use **GSAP ScrollTrigger** for scroll animations on all sections except the hero typing:
  - Section headings: fade and rise (`y: 24` to `0`).
  - Cards and grids: staggered reveal.
  - Counters: count-up on enter.
  - Services: line-by-line reveal, then hover or in-view enlargement behavior.
  - Optional subtle parallax on project images (keep subtle and performant).
- Rules:
  - Animate only `transform` and `opacity`.
  - Each animation runs once (`once: true`) unless otherwise stated.
  - **Respect `prefers-reduced-motion`**: disable the animations and show content immediately.
  - Content must remain visible if JS fails (progressive enhancement: set initial hidden state via JS or an `.js` class on `<html>`, not in plain CSS).
  - Kill or refresh ScrollTrigger on Astro page transitions if view transitions are used.

---

## 10. Responsive requirements (TOP PRIORITY)

The site **must be fully mobile responsive**. Build **mobile-first**.

- Test and polish at **360, 390, 768, 1024, 1440 px** widths. No horizontal scroll at any width.
- Use `100svh` (not `100vh`) for full-height sections so mobile browser bars do not break the layout.
- Hamburger nav on mobile (see section 5).
- Tap targets minimum **44x44px**, with enough spacing between them.
- The hero headline scales fluidly with `clamp()` and does not break awkwardly while typing.
- The services block keeps its justified look on narrow screens (lines scale with the viewport) and uses in-view enlargement instead of hover.
- Grids collapse: 4-col counters to 2x2, 2-col cards to 1-col, footer columns stack with the social icons wrapping neatly.
- Images use `srcset`/Astro `<Image>` with lazy loading and explicit width/height to prevent layout shift.
- Form fields are full-width, readable (min 16px font to avoid iOS zoom), and keyboard-friendly (`inputmode`, `autocomplete`).
- Body text 16px minimum.

---

## 11. Placeholders (never invent real content)

All personal assets and links are placeholders that the owner will replace manually. Centralize them so replacing is easy.

- **Logo:** `public/placeholders/logo.svg`, a simple "NEILIAN.DEV" wordmark in Syne as a stand-in. Referenced from one `Logo.astro` component. Add a `TODO: replace with real logo` comment.
- **Images:** `public/placeholders/` with neutral light-gray (`#F5F5F5`) SVG or PNG placeholders (project cover 4:3, icon 1:1, design 1:1). Label them subtly (e.g. "Project image") so it is obvious they are placeholders.
- **Links and socials:** in `src/config/site.ts`:

```ts
export const site = {
  name: "NEILIAN.DEV",
  url: "https://neilian.dev",
  email: "hello@example.com", // TODO
  heroWords: ["work","scale","solve","last","ship","adapt","perform","endure","connect","automate","protect","grow","simplify","deliver"],
  counters: [
    { label: "Deployed systems", value: 0 },
    { label: "Mobile apps launched", value: 0 },
    { label: "Logos designed", value: 0 },
    { label: "Books designed", value: 0 },
  ],
  socials: {
    github: "https://github.com/TODO",
    email: "mailto:hello@example.com",
    facebook: "https://facebook.com/TODO",
    instagram: "https://instagram.com/TODO",
    linkedin: "https://linkedin.com/in/TODO",
    tiktok: "https://tiktok.com/@TODO",
    youtube: "https://youtube.com/@TODO",
  },
};
```

- Every placeholder gets a visible `TODO` in code so it can be found with a search.

---

## 12. SEO, accessibility, performance

- Per-page `<title>`, meta description, canonical URL, Open Graph and Twitter tags. Add `public/og-image.png` placeholder (white background, wordmark).
- `sitemap.xml` (Astro sitemap integration), `robots.txt`, `favicon` placeholder.
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), one `h1` per page, logical heading order.
- Skip-to-content link, visible focus states, `alt` text on all images, form labels, color is never the only indicator, 4.5:1 text contrast.
- Target Lighthouse 95+ in all four categories on mobile. Self-host fonts with `font-display: swap`, and preload the Syne file used in the hero.

---

## 13. Open-source setup (MIT)

Create:

- `LICENSE` with the **MIT License**, "Copyright (c) {year} Neilian".
- `README.md` including: what it is, tech stack, quick start (`npm i`, `npm run dev`, `npm run build`), project structure, **how to customize** (edit `src/config/site.ts`, add Markdown files in `src/content/*`, replace files in `public/placeholders`), how to deploy on Cloudflare Pages, and a note that the Syne font is under the SIL OFL license.
- `.env.example` with `PUBLIC_WEB3FORMS_KEY=`. **Never commit secrets.** Add `.env` to `.gitignore`.
- `CONTRIBUTING.md` (short) and a clean `.gitignore`.
- Keep personal content (stories, projects, links) in clearly separated content files so forks can replace them easily. Do not hardcode personal data in components.

---

## 14. Deployment (Cloudflare Pages)

- Build command: `npm run build`. Output directory: `dist`. Node version set via `.nvmrc`.
- Connect the GitHub repo in Cloudflare Pages, add the custom domain `neilian.dev`, and set `PUBLIC_WEB3FORMS_KEY` as an environment variable in the Pages dashboard.
- Add `public/_redirects` or headers as needed, with sensible security and cache headers in `public/_headers`.
- Note: Cloudflare is moving static sites toward Workers static assets. If the Pages setup flow has changed, use the equivalent Workers static assets deployment; the build output is the same.

---

## 15. Suggested project structure

```
/
├─ public/
│  ├─ placeholders/        # logo.svg, project/icon images
│  ├─ og-image.png
│  ├─ robots.txt
│  └─ _headers
├─ src/
│  ├─ components/          # Nav, Hero, Services, Counters, ProjectCard, DesignCard,
│  │                       # StoryCard, ContactForm, Footer, SocialIcons, Logo
│  ├─ config/site.ts
│  ├─ content/             # web, mobile, design, stories (+ config.ts)
│  ├─ layouts/Base.astro
│  ├─ pages/               # index, web, mobile, design, stories/index, stories/[slug], 404
│  ├─ scripts/             # typing.ts, reveal.ts, counters.ts
│  └─ styles/global.css
├─ design-system/          # from ui-ux-pro-max --persist
├─ LICENSE  README.md  CONTRIBUTING.md  .env.example  .nvmrc
└─ astro.config.mjs  tailwind config  package.json
```

---

## 16. Definition of done (checklist)

- [ ] Palette is strictly white, black, and dark gray (plus hairline light-gray borders). No yellow or other accents. No dark mode.
- [ ] Syne is used site-wide; a monospace is used only for tiny labels.
- [ ] Hero types "I build systems that [word]" through all 14 words in a loop with a blinking cursor, with no layout jump and a reduced-motion fallback.
- [ ] Services show the 9 terms in the exact order, centered and justified-looking, **not clickable**, enlarging on hover (desktop) or in view (touch) without shifting neighbors.
- [ ] Four counters with editable values in `site.ts` and count-up on scroll.
- [ ] Featured Dev: RunnersPod, Wanminit w/ Fr. Elric Web, DailyAsk, MedTrack. Featured Design: Rel-Event Creations, In His Steps 2025, Focal Point Pods, GVALIAS Architects.
- [ ] `/web`, `/mobile`, `/design` gallery pages (grid) are working.
- [ ] `/stories` and `/stories/[slug]` work with all 8 seeded stories.
- [ ] Contact form works via Web3Forms with validation and states.
- [ ] Footer has the 7 aesthetic social icons.
- [ ] Nav: Services, Work, Design, Stories, Contact, with a working mobile hamburger.
- [ ] Scroll-based animation on all sections except the hero, respecting `prefers-reduced-motion`.
- [ ] **Fully mobile responsive** at 360/390/768/1024/1440, no horizontal scroll.
- [ ] ui-ux-pro-max checklist passed.
- [ ] Lighthouse 95+ on mobile. SEO tags, sitemap, and robots in place.
- [ ] MIT LICENSE, README, `.env.example`, and CONTRIBUTING included. No secrets committed.
- [ ] All placeholders are marked `TODO` and centralized.
- [ ] Builds cleanly and deploys on Cloudflare Pages.

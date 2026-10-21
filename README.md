# NEILIAN.DEV

Personal developer and graphic designer portfolio website for **NEILIAN.DEV** — engineered with a minimalist, high-craft aesthetic, fluid typography, motion-driven microinteractions, and strict separation between code and content.

---

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: [Syne](https://gitlab.com/bonjour-monde/syne) (Self-hosted variable font) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Animation**: [GSAP](https://gsap.com/) & ScrollTrigger + Vanilla JavaScript hero typewriter
- **Content Engine**: Astro Content Collections (`web`, `mobile`, `design`, `stories`)
- **Icons**: [Simple Icons](https://simpleicons.org/) for brand logos & [Lucide](https://lucide.dev/) for UI icons
- **Contact**: [Web3Forms](https://web3forms.com/) (Zero backend needed)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

---

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/TODO/neilian.dev.git
cd neilian.dev
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and set your public Web3Forms access key:
```bash
cp .env.example .env
```
In `.env`:
```env
PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

### 3. Local Development
Start the local Astro dev server:
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```
Output bundle is generated into the `dist/` directory.

---

## Project Structure

```
/
├─ public/
│  ├─ placeholders/        # logo.svg, project-1.jpg, design-1.jpg, icon.png
│  ├─ og-image.png         # Open Graph preview card
│  ├─ robots.txt           # Crawler instructions
│  ├─ _headers             # Cloudflare Pages security & caching headers
│  └─ _redirects           # Static redirects
├─ src/
│  ├─ components/          # Nav, Hero, Services, Counters, ProjectCard, DesignCard,
│  │                       # StoryCard, ContactForm, Footer, SocialIcons, Logo
│  ├─ config/site.ts       # Central site configuration, copy, and socials
│  ├─ content/             # Markdown content collections:
│  │  ├─ web/              # Web projects
│  │  ├─ mobile/           # Mobile applications
│  │  ├─ design/           # Graphic design work
│  │  └─ stories/          # "Why I Built" case studies
│  ├─ layouts/Base.astro   # SEO meta, preload, layout, and global orchestrator
│  ├─ pages/               # index, web, mobile, design, stories/index, stories/[slug], 404
│  ├─ scripts/             # typing.ts, counters.ts, reveal.ts
│  └─ styles/global.css    # Strict monochrome design system tokens and resets
├─ design-system/          # UI/UX design system generated via ui-ux-pro-max
├─ LICENSE                 # MIT License
├─ CONTRIBUTING.md         # Contribution guide
└─ astro.config.mjs        # Astro configuration
```

---

## How to Customize

1. **Brand & Socials**:
   - Update `src/config/site.ts` with your email, social profile links, counter numbers, and hero keywords.
2. **Projects & Stories**:
   - Add or modify Markdown files inside `src/content/web/`, `src/content/mobile/`, `src/content/design/`, and `src/content/stories/`.
3. **Placeholders**:
   - Replace `public/placeholders/logo.svg` with your personal vector mark.
   - Replace `public/placeholders/project-1.jpg` and `public/placeholders/design-1.jpg` with high-resolution screenshots.
   - Replace `public/og-image.png` with your branded social share card.

---

## Deployment on Cloudflare Pages

1. Push your repository to GitHub or GitLab.
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Configure build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `22` (or set via `.nvmrc`)
4. Add Environment Variable:
   - Variable name: `PUBLIC_WEB3FORMS_KEY`
   - Value: Your Web3Forms key
5. Deploy and attach your custom domain (`neilian.dev`).

---

## Font Licenses

- **Syne**: Designed by Bonjour Monde & Lucas Descroix, released under the [SIL Open Font License (OFL)](https://openfontlicense.org/).
- **JetBrains Mono**: Released under the [Apache 2.0 License](https://www.jetbrains.com/lp/mono/).

---

## License

This project is licensed under the [MIT License](LICENSE).

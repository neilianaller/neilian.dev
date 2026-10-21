# Contributing to NEILIAN.DEV

Contributions, issues, and feature requests are welcome!

## Development Workflow

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in any required variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Check your build before submitting a pull request:
   ```bash
   npm run build
   ```

## Design System & Style Guidelines

- Maintain the strictly monochrome palette (`--bg`, `--ink`, `--ink-soft`, `--line`, `--surface`). No accent colors.
- Use **Syne** as the primary font and **JetBrains Mono** strictly for small labels.
- Do not add emoji icons. Use SVGs (Lucide and Simple Icons).
- Ensure animations respect `prefers-reduced-motion`.
- Maintain full responsiveness at 360px, 390px, 768px, 1024px, and 1440px.

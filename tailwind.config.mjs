/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#3A3A3A',
        },
        line: '#E5E5E5',
        surface: '#F5F5F5',
      },
      fontFamily: {
        sans: ['"Syne Variable"', 'Syne', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      maxWidth: {
        '6xl': '72rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/placeholders');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 36" fill="none">
  <!-- TODO: replace with real logo -->
  <text x="0" y="27" font-family="'Syne', system-ui, sans-serif" font-weight="800" font-size="24" letter-spacing="-0.04em" fill="#0A0A0A">NEILIAN.DEV</text>
  <circle cx="218" cy="24" r="3.5" fill="#0A0A0A" />
</svg>`;
fs.writeFileSync(path.join(outDir, 'logo.svg'), logoSvg);

// 2. Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="4" fill="#0A0A0A" />
  <text x="16" y="23" font-family="'Syne', system-ui, sans-serif" font-weight="800" font-size="18" fill="#FFFFFF" text-anchor="middle">N</text>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), faviconSvg);

// 3. Project 1 SVG + JPG (800x500)
const projectSvg = (label) => `<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="500" fill="#F5F5F5"/>
  <line x1="0" y1="0" x2="800" y2="500" stroke="#E5E5E5" stroke-width="1"/>
  <line x1="0" y1="500" x2="800" y2="0" stroke="#E5E5E5" stroke-width="1"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#E5E5E5" stroke-width="1"/>
  <circle cx="400" cy="250" r="48" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
  <text x="400" y="246" font-family="'JetBrains Mono', monospace" font-size="13" fill="#3A3A3A" text-anchor="middle" letter-spacing="0.05em">${label}</text>
  <text x="400" y="266" font-family="'JetBrains Mono', monospace" font-size="10" fill="#999999" text-anchor="middle">[TODO: replace with real image]</text>
</svg>`;

// 4. Square Design SVG + JPG (800x800)
const squareSvg = (label) => `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#F5F5F5"/>
  <rect x="24" y="24" width="752" height="752" fill="none" stroke="#E5E5E5" stroke-width="1"/>
  <circle cx="400" cy="400" r="64" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
  <text x="400" y="396" font-family="'JetBrains Mono', monospace" font-size="14" fill="#3A3A3A" text-anchor="middle" letter-spacing="0.05em">${label}</text>
  <text x="400" y="416" font-family="'JetBrains Mono', monospace" font-size="11" fill="#999999" text-anchor="middle">[TODO: replace with real image]</text>
</svg>`;

// 5. Icon SVG + PNG (256x256)
const iconSvg = `<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="32" fill="#F5F5F5" stroke="#E5E5E5" stroke-width="2"/>
  <text x="128" y="145" font-family="'Syne', system-ui, sans-serif" font-weight="800" font-size="72" fill="#0A0A0A" text-anchor="middle">ND</text>
</svg>`;

// 6. OG Image SVG (1200x630)
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#E5E5E5" stroke-width="1.5"/>
  <text x="100" y="270" font-family="'Syne', system-ui, sans-serif" font-weight="800" font-size="76" letter-spacing="-0.04em" fill="#0A0A0A">NEILIAN.DEV</text>
  <text x="100" y="340" font-family="'Syne', system-ui, sans-serif" font-weight="500" font-size="32" letter-spacing="-0.02em" fill="#3A3A3A">I build systems that work.</text>
  <text x="100" y="480" font-family="'JetBrains Mono', monospace" font-size="18" fill="#71717A" letter-spacing="0.08em">[WEB · MOBILE · BRAND DESIGN]</text>
</svg>`;

async function build() {
  await sharp(Buffer.from(projectSvg('PROJECT IMAGE'))).jpeg().toFile(path.join(outDir, 'project-1.jpg'));
  await sharp(Buffer.from(squareSvg('DESIGN WORK'))).jpeg().toFile(path.join(outDir, 'design-1.jpg'));
  await sharp(Buffer.from(iconSvg)).png().toFile(path.join(outDir, 'icon.png'));
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(__dirname, '../public/og-image.png'));
  console.log('Generated placeholder assets successfully.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});

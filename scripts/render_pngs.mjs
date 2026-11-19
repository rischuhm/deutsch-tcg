// Rendert die Karten-SVGs (mit eingebetteten Icons) zu PNGs via resvg.
// Aufruf: node scripts/render_pngs.mjs
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const svgDir = 'assets/cards/svg';
const pngDir = 'assets/cards/png';
let ok = 0;

for (const file of readdirSync(svgDir).filter(f => f.endsWith('.svg'))) {
  const svg = readFileSync(join(svgDir, file));
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 750 },
    font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' },
    background: 'rgba(255,255,255,0)'
  });
  const png = resvg.render().asPng();
  writeFileSync(join(pngDir, file.replace('.svg', '.png')), png);
  ok++;
}
console.log(`${ok} PNGs gerendert.`);

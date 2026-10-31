// Pour dessiner une carte et vérifier le dessin : une image de trois vues côte à côte,
//   1. l'image de la carte de 1909 là où elle tombe sur le canevas du kit, avec une grille tous les 100 points ;
//   2. le dessin, blanc sur noir, comme le verront les huit dessins ;
//   3. le dessin en rouge translucide posé sur la carte, pour en suivre les proportions.
//
//   node tools/cards/check.mjs ar00 [ar01 …] [--out <dossier>]      (par défaut /tmp/cartes)
//
// Le canevas fait 1000 × 1000. L'image de la carte, sans son cadre ni son titre, y est posée de y 70 à y 930, centrée :
// les huit dessins réduisent ensuite le tout autour du centre, ce qui laisse la marge que demandent leurs bords.
import { readFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { toParts } from './kit/silhouettes/lib.mjs';
import { ROOT, drawnCards } from './cards.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

// l'image dans le scan de 480 × 800 : entre les filets noirs du cadre, au-dessus du cartouche du titre
const ART = { x: 23, y: 16, w: 434, h: 711 };
const K = 860 / ART.h;
const AT = { x: 500 - (ART.w * K) / 2, y: 70, w: ART.w * K, h: 860 };

const args = process.argv.slice(2);
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : '/tmp/cartes';
const ids = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
const cards = await drawnCards(ids.length ? ids : null);
if (!cards.length) throw new Error(`aucun dessin pour ${ids.join(', ') || 'aucune carte'} dans tools/cards/figures/`);
await mkdir(out, { recursive: true });

const grid = () => {
  let g = '';
  for (let v = 100; v < 1000; v += 100) {
    g += `<line x1="${v}" y1="0" x2="${v}" y2="1000" stroke="#0bf" stroke-width="1.5" opacity=".55"/>`
      + `<line x1="0" y1="${v}" x2="1000" y2="${v}" stroke="#0bf" stroke-width="1.5" opacity=".55"/>`
      + `<text x="${v + 4}" y="22" fill="#0bf" font-size="20" font-family="sans-serif">${v}</text>`
      + `<text x="4" y="${v - 5}" fill="#0bf" font-size="20" font-family="sans-serif">${v}</text>`;
  }
  return g;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 3 * 620 + 20, height: 640 } });
for (const card of cards) {
  const scan = (await readFile(`${ROOT}assets/cards/${card.id}.jpg`)).toString('base64');
  const image = `<clipPath id="art"><rect x="${AT.x}" y="${AT.y}" width="${AT.w}" height="${AT.h}"/></clipPath>`
    + `<image href="data:image/jpeg;base64,${scan}" x="${AT.x - ART.x * K}" y="${AT.y - ART.y * K}" width="${480 * K}" height="${800 * K}" clip-path="url(#art)"/>`;
  const shapes = card.draw();
  const white = toParts(shapes, { fg: '#fff', ids: 'w' });
  const red = toParts(shapes, { fg: '#f22', ids: 'r' });
  const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="600" height="600">${inner}</svg>`;
  const html = '<html><body style="margin:0;background:#222;display:flex;gap:10px;padding:10px">'
    + svg(`<rect width="1000" height="1000" fill="#444"/>${image}${grid()}`)
    + svg(`<defs>${white.defs}</defs><rect width="1000" height="1000" fill="#000"/><g id="dessin">${white.body}</g>`)
    + svg(`<defs>${red.defs}</defs><rect width="1000" height="1000" fill="#444"/>${image}<g opacity=".55">${red.body}</g>${grid()}`)
    + '</body></html>';
  await page.setContent(html);
  const path = `${out}/${card.slug}.png`;
  await page.screenshot({ path, clip: { x: 0, y: 0, width: 3 * 610 + 10, height: 620 } });
  // l'étendue du dessin (sans l'épaisseur des traits) : il doit rester dans x 60–940, y 40–960
  const box = await page.evaluate(() => {
    const b = document.getElementById('dessin').getBBox();
    return [b.x, b.x + b.width, b.y, b.y + b.height].map(Math.round);
  });
  console.log(`${path}  (dessin de x ${box[0]}–${box[1]}, y ${box[2]}–${box[3]})`);
}
await browser.close();

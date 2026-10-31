// Chaque carte dessinée (figures/<id>.mjs) dans les huit dessins noir et blanc des réseaux, ceux des mythes de
// The Astro Study, en quatre versions, dans images/cards/<dessin>/ :
//
//   <id>-<slug>--white-on-black.png      2000 × 2000, blanc sur noir, en niveaux de gris
//   <id>-<slug>--black-on-white.png      la même image inversée, pixel pour pixel
//   <id>-<slug>--white-transparent.png   encre blanche sur fond transparent, à poser sur un fond de son choix
//   <id>-<slug>--black-transparent.png   encre noire sur fond transparent
//
// et la silhouette seule, noire sur fond transparent, à recolorer : images/cards/silhouettes/<id>-<slug>.svg
//
//   node tools/cards/render.mjs                                  tout
//   node tools/cards/render.mjs [dessin…] [--cards ar00,ar01]    une partie (id ou slug)
//   node tools/cards/render.mjs … --sheets <dossier>             plus une planche contact par dessin, pour vérifier
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { toSvg } from './kit/silhouettes/lib.mjs';
import { DESIGNS, ROOT, drawnCards } from './cards.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const styles = fileURLToPath(new URL('./kit/styles/', import.meta.url));
const out = `${ROOT}images/cards/`;
const args = process.argv.slice(2);
const option = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null);
const sheets = option('--sheets');
const words = args.filter((a, i) => !a.startsWith('--') && !['--sheets', '--cards'].includes(args[i - 1]));
const designs = words.length ? DESIGNS.filter((d) => words.includes(d)) : DESIGNS;
const cards = await drawnCards(option('--cards')?.split(',') ?? null);
if (!cards.length) throw new Error('aucune carte dessinée à rendre');

await mkdir(`${out}silhouettes`, { recursive: true });
for (const card of cards) await writeFile(`${out}silhouettes/${card.slug}.svg`, toSvg(card.draw(), { fg: '#000', bg: null }));

const kit = await readFile(`${styles}canvas-kit.js`, 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 2 });
const invert = (b64) => page.evaluate(async (data) => {
  const img = new Image();
  img.src = `data:image/png;base64,${data}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const g = c.getContext('2d');
  g.filter = 'invert(1)';
  g.drawImage(img, 0, 0);
  return c.toDataURL('image/png');
}, b64);
const bytes = (url) => Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');

const whites = [];
const written = [];
for (const design of designs) {
  const style = await import(pathToFileURL(`${styles}mono/${design}.mjs`).href);
  await mkdir(`${out}${design}`, { recursive: true });
  const started = Date.now();
  const cells = [];
  for (const card of cards) {
    // les dessins lisent la figure comme celles des mythes : une carte se tient sur son sol, elle ne flotte pas
    const fig = { slug: card.slug, draw: card.draw };
    let white;
    if (style.svg) {
      await page.setContent(`<html><body style="margin:0">${style.svg(fig)}</body></html>`);
      white = await page.locator('svg').first().screenshot({ type: 'png' });
    } else {
      await page.setContent('<html><body style="margin:0"></body></html>');
      await page.addScriptTag({ content: kit });
      white = bytes(await page.evaluate(style.paint, style.args(fig)));
    }
    const base = `${out}${design}/${card.slug}`;
    await writeFile(`${base}--white-on-black.png`, white);
    await writeFile(`${base}--black-on-white.png`, bytes(await invert(white.toString('base64'))));
    whites.push(`${base}--white-on-black.png`);
    written.push(`${base}--white-on-black.png`, `${base}--black-on-white.png`);
    if (sheets) cells.push(`<figure style="margin:0"><img src="data:image/png;base64,${white.toString('base64')}" style="width:300px;height:300px;display:block"><figcaption style="font:13px sans-serif;color:#bbb;padding:5px 0 10px">${card.slug}</figcaption></figure>`);
  }
  console.log(`✓ ${design} : ${cards.length} cartes (${((Date.now() - started) / 1000).toFixed(0)} s)`);
  if (sheets) {
    await mkdir(sheets, { recursive: true });
    const sheet = await browser.newPage({ viewport: { width: 6 * 310 + 10, height: 800 } });
    await sheet.setContent(`<html><body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(6,300px);gap:10px;padding:10px">${cells.join('')}</body></html>`);
    await sheet.screenshot({ path: `${sheets}/${design}.png`, fullPage: true });
    await sheet.close();
  }
}
await browser.close();
// le navigateur écrit du RGBA : un seul canal de gris tient ces images dans le tiers de la place
execFileSync('python3', ['-I', `${styles}grey.py`, ...written]);
// les versions transparentes se tirent de la version blanc sur noir (voir transparent.py pour la mosaïque)
execFileSync('python3', ['-I', `${styles}transparent.py`, ...whites]);
console.log(`${written.length * 2} images dans images/cards/`);

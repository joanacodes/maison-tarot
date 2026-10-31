// Une page pour voir d'un coup les cartes rendues par render.mjs, avant de s'en servir pour les réseaux :
//
//   node tools/cards/page.mjs <dossier>
//
// Elle écrit dans <dossier> index.html, de petites copies des images (thumbs/<dessin>/<slug>.webp, 512 px), les
// silhouettes (silhouettes/<slug>.svg) et les scans de 1909 réduits (cards/<id>.webp). Seul le blanc sur noir est
// copié : la page obtient le noir sur blanc en l'inversant, comme render.mjs, et porte ainsi deux fois moins de
// fichiers (une page publiée en tient au plus 511). Les cartes et leurs noms viennent de data/cards.yml, les dessins
// et leurs descriptions des modules de kit/styles/mono/.
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { DESIGNS, ROOT, drawnCards, readCards } from './cards.mjs';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.argv[2];
if (!out) throw new Error('usage : node tools/cards/page.mjs <dossier>');

const cards = await drawnCards();
const all = await readCards();
const designs = [];
for (const name of DESIGNS) {
  const style = await import(pathToFileURL(`${here}kit/styles/mono/${name}.mjs`).href);
  designs.push({ name, title: style.title, about: style.about });
}

// les copies réduites : 512 px pour les dessins (trois de front sur 760 px, au double des pixels de l'écran),
// 360 px pour les scans, qui ne servent qu'à comparer
const pairs = (rows) => rows.map(([src, dest]) => `${src}\t${dest}`).join('\n');
execFileSync('python3', ['-I', `${here}thumbs.py`, '512'], {
  input: pairs(designs.flatMap((d) => cards.map((c) => [`${ROOT}images/cards/${d.name}/${c.slug}--white-on-black.png`, `${out}/thumbs/${d.name}/${c.slug}.webp`]))),
});
execFileSync('python3', ['-I', `${here}thumbs.py`, '360'], {
  input: pairs(cards.map((c) => [`${ROOT}assets/cards/${c.id}.jpg`, `${out}/cards/${c.id}.webp`])),
});
await mkdir(`${out}/silhouettes`, { recursive: true });
for (const c of cards) await copyFile(`${ROOT}images/cards/silhouettes/${c.slug}.svg`, `${out}/silhouettes/${c.slug}.svg`);

const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI',
  'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
const SUITS = { major: 'Major Arcana', wands: 'Wands', cups: 'Cups', swords: 'Swords', pentacles: 'Pentacles' };
const tiles = cards.map((c) => ({
  id: c.id,
  slug: c.slug,
  kicker: c.suit === 'major' ? ROMAN[Number(c.number)] : SUITS[c.suit] ?? c.suit,
  title: c.name_en,
  about: c.name_fr,
}));
const majors = all.filter((c) => c.suit === 'major').length;
const heading = cards.length === all.length ? `The ${all.length} cards in eight designs`
  : cards.length === majors && cards.every((c) => c.suit === 'major') ? 'The Major Arcana in eight designs'
    : `${cards.length} cards in eight designs`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Tarot Card Designs</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600&family=Inter:wght@400;500&family=DM+Mono:wght@400&display=swap">
<style>
/* Maison Tarot's own system: black and white with no warm tone, gold only as a hairline; Schibsted Grotesk for titles,
   Inter for text, DM Mono for labels and numbers. Layout: a profile-like grid three across for the shuffled feed,
   a captioned sheet for one design at a time. */
:root { --bg: #ffffff; --bg-2: #f3f3f3; --fg: #0a0a0a; --muted: #707070; --line: #e2e2e2; --gold: #a88c52;
  --display: "Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif; --body: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --mono: "DM Mono", ui-monospace, Menlo, monospace; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #0a0a0a; --bg-2: #141414; --fg: #f4f4f4; --muted: #9a9a9a; --line: #262626; color-scheme: dark; } }
:root[data-theme="dark"] { --bg: #0a0a0a; --bg-2: #141414; --fg: #f4f4f4; --muted: #9a9a9a; --line: #262626; color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--fg); font: 15px/1.55 var(--body); -webkit-font-smoothing: antialiased; }
.wrap { max-width: 1240px; margin: 0 auto; padding-block: 28px 64px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
header { display: grid; gap: 12px; padding-bottom: 22px; border-bottom: 1px solid var(--gold); margin-bottom: 24px; }
.eyebrow { margin: 0; font: 12px/1.4 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
h1 { margin: 0; font: 600 clamp(28px, 4vw, 42px)/1.08 var(--display); letter-spacing: -0.01em; text-wrap: balance; }
.lede { margin: 0; max-width: 64ch; color: var(--muted); }
.controls { display: grid; gap: 10px; }
.pills { display: flex; flex-wrap: wrap; gap: 6px; }
.pills button { border: 1px solid var(--line); background: transparent; color: var(--fg); border-radius: 999px; padding: 6px 13px; font: 13px/1.4 var(--body); cursor: pointer; }
.pills button:hover { border-color: var(--gold); }
.pills button[aria-pressed="true"] { background: var(--fg); color: var(--bg); border-color: var(--fg); }
.about-design { margin: 0; min-height: 1.5em; font-size: 13px; color: var(--muted); max-width: 64ch; }
.feed { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3px; max-width: 760px; margin: 0 auto; }
.feed figcaption { display: none; }
.sheet { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px 14px; }
.sheet.with-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 900px) { .sheet, .sheet.with-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 10px; } }
@media (max-width: 420px) { .sheet.with-cards { grid-template-columns: minmax(0, 1fr); } }
figure { margin: 0; display: grid; gap: 8px; align-content: start; min-width: 0; }
.pair { display: grid; grid-template-columns: minmax(0, 1fr); gap: 6px; }
.with-cards .pair { grid-template-columns: minmax(0, 1fr) minmax(0, 0.6fr); align-items: start; }
.pair img { display: block; width: 100%; max-width: 100%; height: auto; border-radius: 2px; background: var(--bg-2); }
.pic { aspect-ratio: 1; }
.scan { aspect-ratio: 480 / 800; }
.ink-black .pic { filter: invert(1); }
.silhouettes .pic { background: #fff; filter: invert(1); }
.silhouettes.ink-black .pic { filter: none; }
figcaption { display: grid; gap: 1px; }
.kicker { font: 11px/1.4 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
.name { font: 500 15px/1.3 var(--display); }
.fr { font-size: 12px; line-height: 1.4; color: var(--muted); }
.note { margin: 32px 0 0; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; max-width: 72ch; }
.note code { font: 12px var(--mono); }
:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <p class="eyebrow">Maison Tarot &middot; Pictures for social posts</p>
    <h1>${esc(heading)}</h1>
    <p class="lede">Each card drawn as one silhouette after Pamela Colman Smith&rsquo;s 1909 picture, then put through the eight black-and-white designs of The Astro Study&rsquo;s feed.</p>
    <div class="controls">
      <div class="pills" role="group" aria-label="Design" id="designs"></div>
      <div class="pills" role="group" aria-label="Colours and comparison" id="options"></div>
      <p class="about-design" id="about-design"></p>
    </div>
  </header>
  <div id="view"></div>
  <p class="note">The full pictures are in the maison-tarot repo, in <code>images/cards/&lt;design&gt;/</code>: 2000 &times; 2000 px, four versions of each (white on black, black on white, white ink and black ink on a transparent ground). The silhouettes alone, black on a transparent ground, are SVG files in <code>images/cards/silhouettes/</code>. This page shows small copies.</p>
</div>
<script>
const CARDS = ${JSON.stringify(tiles)};
const DESIGNS = ${JSON.stringify(designs)};
const VIEWS = ['shuffled', ...DESIGNS.map((d) => d.name), 'silhouettes'];
const state = { view: 'shuffled', ink: 'white', cards: false, seed: 1 };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const titleOf = (view) => view === 'shuffled' ? 'Shuffled' : view === 'silhouettes' ? 'Silhouettes' : DESIGNS.find((d) => d.name === view).title;

// a seeded shuffle, so "Shuffle again" deals a new order and the order stays put while the colours change
function deal(seed) {
  let a = seed >>> 0;
  const rnd = () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const items = DESIGNS.flatMap((d) => CARDS.map((c) => ({ c, d })));
  for (let i = items.length - 1; i > 0; i -= 1) { const j = Math.floor(rnd() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }
  return items;
}

function pills() {
  document.getElementById('designs').innerHTML = VIEWS.map((v) => '<button type="button" data-view="' + v + '" aria-pressed="' + (state.view === v) + '">' + esc(titleOf(v)) + '</button>').join('');
  const opts = [['ink', 'white', 'White on black'], ['ink', 'black', 'Black on white']];
  if (state.view === 'shuffled') opts.push(['shuffle', '', 'Shuffle again']);
  else opts.push(['cards', '', '1909 card beside each']);
  document.getElementById('options').innerHTML = opts.map(([k, v, label]) => {
    const on = k === 'ink' ? state.ink === v : k === 'cards' ? state.cards : false;
    return '<button type="button" data-' + k + '="' + v + '"' + (k === 'shuffle' ? '' : ' aria-pressed="' + on + '"') + '>' + esc(label) + '</button>';
  }).join('');
  const d = DESIGNS.find((x) => x.name === state.view);
  document.getElementById('about-design').textContent = d ? d.about
    : state.view === 'silhouettes' ? 'The drawings themselves, before any design: one solid shape per card.'
      : 'Every card in every design, in a random order, as a profile grid would show them.';
}

const pic = (c, view, alt) => '<img class="pic" loading="lazy" decoding="async" width="512" height="512" src="'
  + (view === 'silhouettes' ? 'silhouettes/' + c.slug + '.svg' : 'thumbs/' + view + '/' + c.slug + '.webp') + '" alt="' + esc(alt) + '">';

function render() {
  pills();
  const view = document.getElementById('view');
  const ink = ' ink-' + state.ink;
  if (state.view === 'shuffled') {
    view.className = 'feed' + ink;
    view.innerHTML = deal(state.seed).map(({ c, d }) => '<figure>' + pic(c, d.name, c.title + ', ' + d.title.toLowerCase())
      + '<figcaption>' + esc(c.title) + '</figcaption></figure>').join('');
    return;
  }
  view.className = 'sheet' + ink + (state.cards ? ' with-cards' : '') + (state.view === 'silhouettes' ? ' silhouettes' : '');
  view.innerHTML = CARDS.map((c) => '<figure><div class="pair">' + pic(c, state.view, c.title + ', ' + titleOf(state.view).toLowerCase())
    + (state.cards ? '<img class="scan" loading="lazy" decoding="async" width="360" height="600" src="cards/' + c.id + '.webp" alt="' + esc(c.title) + ', the 1909 card">' : '')
    + '</div><figcaption><span class="kicker">' + esc(c.kicker) + '</span><span class="name">' + esc(c.title) + '</span><span class="fr">' + esc(c.about) + '</span></figcaption></figure>').join('');
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.view) { if (location.hash !== '#' + b.dataset.view) location.hash = b.dataset.view; return; }
  if (b.dataset.ink) state.ink = b.dataset.ink;
  if ('cards' in b.dataset) state.cards = !state.cards;
  if ('shuffle' in b.dataset) state.seed += 1;
  render();
});
function route() {
  const h = location.hash.slice(1);
  state.view = VIEWS.includes(h) ? h : 'shuffled';
  render();
}
window.addEventListener('hashchange', route);
route();
</script>
</body>
</html>
`;
await writeFile(`${out}/index.html`, html);
console.log(`${out}/index.html : ${cards.length} cartes, ${designs.length} dessins`);

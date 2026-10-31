// Les 78 cartes telles que data/cards.yml les décrit, et le dessin de chacune quand il existe (figures/<id>.mjs).
// Les noms et les slugs se lisent dans cards.yml : ils ne sont saisis qu'à cet endroit.
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = fileURLToPath(new URL('../../', import.meta.url));

// les huit dessins noir et blanc choisis pour les réseaux de The Astro Study (kit/styles/mono/), dans l'ordre du choix
export const DESIGNS = ['line', 'brush', 'stipple', 'halftone', 'mosaic', 'constellation', 'woodcut', 'paper-cut'];
const here = fileURLToPath(new URL('.', import.meta.url));

// cards.yml est une liste plate de clés à valeur simple : quelques lignes la lisent, sans dépendance à installer
export async function readCards() {
  const cards = [];
  for (const raw of (await readFile(`${ROOT}data/cards.yml`, 'utf8')).split('\n')) {
    const m = raw.match(/^(- )?\s*([a-z_]+):\s*(.*?)\s*$/);
    if (!m) continue;
    if (m[1]) cards.push({});
    cards.at(-1)[m[2]] = m[3].replace(/^(['"])(.*)\1$/, '$2');
  }
  // l'id en tête du nom de fichier garde les images dans l'ordre du jeu quand on les trie par nom
  return cards.map((c) => ({ ...c, slug: `${c.id}-${c.slug_en}` }));
}

// les cartes dessinées, dans l'ordre du jeu ; `only` en retient certaines (par id ou par slug)
export async function drawnCards(only = null) {
  const files = new Set(await readdir(`${here}figures`));
  const out = [];
  for (const card of await readCards()) {
    if (!files.has(`${card.id}.mjs`)) continue;
    if (only && !only.includes(card.id) && !only.includes(card.slug)) continue;
    const mod = await import(pathToFileURL(`${here}figures/${card.id}.mjs`).href);
    out.push({ ...card, draw: mod.draw });
  }
  return out;
}

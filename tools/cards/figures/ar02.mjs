// La Grande Prêtresse (The High Priestess, II), d'après la carte de Pamela Colman Smith, 1909 : assise entre les deux colonnes du temple, la couronne aux cornes et au disque de lune, le rouleau sur les genoux, le croissant de lune à ses pieds.
import { blob, circle, cut, ellipse, limb, poly } from '../kit/silhouettes/lib.mjs';

// une colonne : le chapiteau en lotus, évasé, au bord découpé en pétales ; le fût ; le socle.
// Les lettres B et J sont omises.
function pillar(cx, top) {
  return [
    poly([[cx - 41, top + 92], [cx - 50, top + 72], [cx - 58, top + 44], [cx - 58, top + 32], [cx - 46, top + 14],
      [cx - 34, top + 28], [cx - 23, top + 6], [cx - 12, top + 26], [cx, top], [cx + 12, top + 26], [cx + 23, top + 6],
      [cx + 34, top + 28], [cx + 46, top + 14], [cx + 58, top + 32], [cx + 58, top + 44], [cx + 50, top + 72],
      [cx + 41, top + 92]]),
    poly([[cx - 41, top + 92], [cx + 41, top + 92], [cx + 41, 840], [cx - 41, 840]]),
    poly([[cx - 53, 840], [cx + 53, 840], [cx + 53, 905], [cx - 53, 905]]),
  ];
}

// le croissant : le disque (c1, r1) moins le disque (c2, r2), contour pris entre leurs deux points de rencontre
function crescent([x1, y1], r1, [x2, y2], r2) {
  const d = Math.hypot(x2 - x1, y2 - y1);
  const toInner = Math.atan2(y2 - y1, x2 - x1);
  const half = Math.acos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d));
  const tip = [x1 + r1 * Math.cos(toInner + half), y1 + r1 * Math.sin(toInner + half)];
  const other = [x1 + r1 * Math.cos(toInner - half), y1 + r1 * Math.sin(toInner - half)];
  const pts = [];
  const steps = 40;
  // l'arc extérieur, du côté opposé au disque retiré
  for (let i = 0; i <= steps; i += 1) {
    const a = toInner + half + ((2 * Math.PI - 2 * half) * i) / steps;
    pts.push([x1 + r1 * Math.cos(a), y1 + r1 * Math.sin(a)]);
  }
  // puis l'arc intérieur, en revenant
  const a0 = Math.atan2(other[1] - y2, other[0] - x2);
  let a1 = Math.atan2(tip[1] - y2, tip[0] - x2);
  while (a1 > a0) a1 -= 2 * Math.PI;
  for (let i = 1; i < steps; i += 1) {
    const a = a0 + ((a1 - a0) * i) / steps;
    pts.push([x2 + r2 * Math.cos(a), y2 + r2 * Math.sin(a)]);
  }
  return poly(pts);
}

export function draw() {
  const robe = blob([[463, 318], [446, 336], [443, 365], [442, 395], [420, 410], [394, 422], [384, 448], [382, 500],
    [382, 560], [384, 610], [390, 650], [396, 680], [398, 730], [396, 780], [388, 830], [372, 870], [345, 900],
    [326, 908], [724, 908], [700, 896], [668, 870], [648, 830], [632, 780], [614, 735], [606, 690], [604, 650],
    [606, 600], [608, 540], [606, 490], [610, 448], [600, 422], [574, 410], [552, 395], [551, 365], [549, 336],
    [533, 318]]);
  const face = ellipse(498, 363, 25, 32);
  const roll = limb(440, 576, 15, 548, 576, 15);
  const sheet = [poly([[452, 588], [536, 588], [532, 616], [456, 622]]), limb(456, 620, 8, 532, 614, 8)];
  // le disque retiré est décalé vers le haut et la gauche : c'est de ce côté que pointent les cornes sur la carte
  const moon = crescent([548, 805], 100, [548 + 26 * Math.cos(4.01), 805 + 26 * Math.sin(4.01)], 96);
  return [
    // les deux colonnes de part et d'autre ; le voile aux grenades tendu entre elles est omis
    pillar(285, 160),
    pillar(709, 168),

    // la prêtresse assise, voilée de la tête aux pieds ; son manteau traîne sur le sol devant les socles, un jour l'en
    // détache
    cut({ ...robe, grow: 20 }),
    robe,
    // le visage dans l'ouverture du voile, détaché de lui par un jour, la couronne posée dessus
    cut({ ...face, grow: 20 }),
    face,

    // la couronne : le disque de la pleine lune posé entre deux cornes en croissant, couchées, pointes relevées
    circle(498, 281, 35),
    blob([[394, 250], [404, 274], [422, 296], [448, 316], [476, 328], [500, 332], [524, 328], [552, 316], [578, 296],
      [596, 274], [606, 250], [594, 258], [576, 270], [552, 284], [526, 292], [500, 294], [474, 292], [448, 284],
      [424, 270], [406, 258]]),

    // la croix solaire sur sa poitrine, découpée
    cut(poly([[492, 448], [506, 448], [506, 496], [492, 496]])),
    cut(poly([[476, 465], [522, 465], [522, 479], [476, 479]])),

    // le rouleau sur ses genoux, à demi déroulé, le bas de la feuille recourbé, détaché du manteau ; ses deux bouts
    // enroulés percés
    [roll, ...sheet].map((part) => cut({ ...part, grow: 20 })),
    roll,
    sheet,
    cut(circle(440, 576, 6)),
    cut(circle(548, 576, 6)),

    // le croissant de lune couché à ses pieds, les cornes vers le haut, posé sur le dallage
    cut({ ...moon, grow: 20 }),
    moon,

    // le dallage du temple
    poly([[232, 905], [766, 905], [766, 925], [232, 925]]),
  ];
}

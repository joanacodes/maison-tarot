// Le Magicien (The Magician, I), d'après la carte de Pamela Colman Smith, 1909 : derrière sa table, la baguette levée, l'index pointé vers la terre, l'infini au-dessus de la tête ; sur la table la coupe, l'épée, le denier et le bâton.
import { blob, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

// le signe de l'infini : une lemniscate tracée d'un trait épais, ses deux boucles ouvertes en vrais trous
function lemniscate(cx, cy, a, squash, width) {
  const pts = [];
  for (let i = 0; i <= 96; i += 1) {
    const t = (2 * Math.PI * i) / 96;
    const d = 1 + Math.sin(t) ** 2;
    pts.push([cx + (a * Math.cos(t)) / d, cy + (squash * a * Math.sin(t) * Math.cos(t)) / d]);
  }
  return line(pts, width);
}

// une étoile à cinq branches, pointe en haut
function star(cx, cy, r, inner) {
  return poly(Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (Math.PI * i) / 5;
    const k = i % 2 ? inner : r;
    return [cx + k * Math.cos(a), cy + k * Math.sin(a)];
  }));
}

// chaque objet posé sur la table s'en détache par un jour : on retire sa forme grossie, puis on le dessine
const onTable = (shapes) => [shapes.map((s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 })), shapes];

export function draw() {
  const wand = poly([[313, 94], [322, 110], [328, 250], [321, 268], [312, 252], [305, 112]]);
  const table = [
    poly([[236, 596], [552, 596], [552, 758], [236, 758]]),
    poly([[248, 750], [272, 750], [272, 895], [248, 895]]),
    poly([[516, 750], [540, 750], [540, 895], [516, 895]]),
  ];
  return [
    // la robe et le manteau tombant des épaules jusqu'au sol ; la ceinture est omise
    blob([[460, 372], [440, 362], [420, 352], [400, 342], [380, 338], [370, 352], [370, 420], [373, 520], [376, 620],
      [380, 720], [384, 820], [388, 895], [608, 895], [606, 800], [605, 700], [607, 600], [612, 530], [616, 494],
      [598, 462], [572, 418], [550, 384], [522, 368], [494, 372]]),

    // la tête de face, les cheveux tombant au ras de la mâchoire, et le cou
    blob([[476, 272], [497, 276], [510, 290], [514, 312], [513, 334], [509, 344], [500, 346], [492, 355], [476, 362],
      [460, 355], [452, 346], [443, 344], [439, 334], [437, 312], [441, 290], [455, 276]]),
    limb(476, 356, 15, 477, 376, 18),

    // le signe de l'infini au-dessus de la tête, plus gras que sur la carte pour que ses boucles restent ouvertes
    lemniscate(472, 230, 62, 0.9, 16),

    // le bras droit levé ; la baguette à deux pointes passe devant lui, détachée par un jour, puis la main qui la serre
    member([[398, 345], [358, 262], [328, 196]], [[[0, 24, 24], [0.5, 21, 21], [1, 18, 18]],
      [[0, 18, 18], [0.5, 15, 15], [1, 13, 13]]], 1),
    cut({ ...wand, grow: 20 }),
    wand,
    blob([[300, 172], [318, 166], [340, 172], [352, 186], [346, 202], [326, 206], [306, 200], [298, 186]]),

    // le bras gauche sort du manteau et pointe l'index vers le sol
    member([[602, 488], [648, 556]], [[[0, 16, 16], [0.5, 14, 14], [1, 12, 12]]], 1),
    blob([[642, 548], [660, 556], [670, 572], [676, 590], [680, 604], [671, 608], [664, 592], [652, 580], [640, 570],
      [636, 558]]),

    // la table devant lui, sur ses pieds : un jour la sépare de la robe qu'elle cache
    table.map((s) => cut({ ...s, grow: 20 })),
    table,

    // sur la table, le denier, couché sur la carte, est dressé ici pour que l'étoile découpée dans son disque se lise ;
    // puis la coupe
    onTable([circle(277, 588, 36)]),
    cut(star(277, 590, 27, 10.5)),
    onTable([poly([[300, 498], [372, 498], [368, 512], [350, 552], [348, 566], [348, 648], [366, 660], [366, 668],
      [314, 668], [314, 660], [332, 648], [332, 566], [330, 552], [312, 512]])]),
    // couchés sur le plateau : l'épée au fond, la garde dressée, et devant elle le bâton, que ses deux bourgeons
    // distinguent d'une simple barre
    onTable([poly([[384, 612], [400, 604], [472, 604], [472, 620], [400, 620]]), poly([[472, 588], [488, 588],
      [488, 636], [472, 636]]), poly([[488, 605], [512, 605], [512, 619], [488, 619]]), circle(520, 612, 10)]),
    onTable([limb(392, 680, 8, 520, 680, 10), ellipse(414, 667, 10, 7, -35), ellipse(450, 667, 10, 7, 35)]),

    // le sol du jardin, dont les fleurs sont omises
    poly([[236, 893], [764, 893], [764, 922], [236, 922]]),
  ];
}

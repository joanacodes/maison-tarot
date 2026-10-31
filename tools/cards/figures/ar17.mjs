// L’Étoile (The Star, XVII), d'après la carte de Pamela Colman Smith, 1909 : la femme nue agenouillée au bord de l'eau
// verse ses deux cruches, l'une dans le bassin, l'autre sur la terre, sous la grande étoile et les sept petites.
import { blob, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

// une étoile à huit branches : `r` est le creux entre deux branches
function star(cx, cy, R, r) {
  const points = [];
  for (let i = 0; i < 16; i += 1) {
    const a = ((-90 + i * 22.5) * Math.PI) / 180;
    const rad = i % 2 ? r : R;
    points.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  return poly(points);
}

// un anneau d'ellipse, pour les ronds que fait l'eau versée dans le bassin
function ring(cx, cy, rx, ry, width) {
  const points = [];
  for (let i = 0; i <= 48; i += 1) {
    const a = (i / 48) * 2 * Math.PI;
    points.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return line(points, width);
}

// une ligne lisse par des points (Catmull-Rom), pour le dessus du terrain dont le bas reste droit
function smooth(points, steps = 8) {
  const out = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const [p0, p1, p2, p3] = [points[Math.max(0, i - 1)], points[i], points[i + 1], points[Math.min(points.length - 1, i + 2)]];
    for (let s = 0; s < steps; s += 1) {
      const t = s / steps;
      out.push([0, 1].map((k) => 0.5 * (2 * p1[k] + (p2[k] - p0[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t
        + (3 * p1[k] - p0[k] - 3 * p2[k] + p3[k]) * t * t * t)));
    }
  }
  return [...out, points.at(-1)];
}

// une cruche penchée : la panse, le col qui se resserre et la lèvre évasée, tournée selon `deg` ; la lèvre est assez
// large pour que la cruche ne se lise pas comme une boule au bout du filet d'eau
function jug(cx, cy, deg) {
  const a = (deg * Math.PI) / 180;
  const at = ([u, v]) => [cx + u * Math.cos(a) - v * Math.sin(a), cy + u * Math.sin(a) + v * Math.cos(a)];
  return [
    ellipse(cx, cy, 39, 36, deg),
    poly([[21, 25], [41, 12], [52, 12], [54, 25], [67, 25], [67, -25], [54, -25], [52, -12], [41, -12], [21, -25]].map(at)),
  ];
}

// les membres d'une femme à cette échelle : [t, dehors, dedans]
const UPPER_ARM = [[0, 19, 19], [0.5, 17, 16], [1, 15, 15]];
const FOREARM = [[0, 15, 15], [0.5, 13, 13], [1, 11, 11]];
// la jambe levée, de la hanche au genou puis à la cheville : le dehors est le dessous de la cuisse et le mollet
const RAISED_THIGH = [[0, 32, 30], [0.5, 29, 27], [0.92, 26, 25]];
const RAISED_SHIN = [[0.06, 24, 25], [0.3, 27, 18], [0.6, 21, 14], [0.9, 13, 11], [1, 12, 11]];
// la jambe agenouillée : le dehors est l'arrière de la cuisse puis le dessus du mollet couché sur la rive
const KNEELING_THIGH = [[0, 34, 30], [0.5, 32, 28], [0.92, 27, 25]];
const KNEELING_SHIN = [[0.08, 25, 24], [0.3, 28, 20], [0.6, 22, 16], [0.9, 15, 13], [1, 14, 13]];

export function draw() {
  const raisedLeg = [
    member([[578, 578], [432, 594], [468, 724]], [RAISED_THIGH, RAISED_SHIN], 1),
    blob([[452, 716], [480, 722], [492, 740], [492, 754], [468, 758], [436, 759], [418, 755], [418, 746], [434, 739],
      [450, 732]]),
  ];
  const forearm = [[445, 560], [388, 626]];
  return [
    // la grande étoile et les sept petites autour ; la troisième de gauche et la dernière de droite sont un peu
    // écartées de la tête et du dos, qu'elles touchent presque sur la carte
    star(507, 230, 140, 58),
    [[309, 140], [309, 257], [355, 365], [308, 473], [690, 142], [694, 257], [626, 362]].map(([x, y], i) =>
      star(x, y, i === 2 ? 46 : 50, 20)),

    // l'arbre de la rive droite, sorti du cadre pour que son tronc descende à la rive sans passer derrière la cruche ;
    // l'ibis perché sur sa cime, l'aile levée, le long bec tendu vers le bas
    line([[802, 690], [802, 445]], 18),
    line([[802, 485], [778, 448]], 14),
    line([[803, 468], [826, 432]], 14),
    circle(774, 420, 24), circle(798, 397, 27), circle(826, 407, 24), circle(838, 437, 19), circle(802, 434, 22),
    circle(768, 447, 17),
    ellipse(772, 350, 26, 14, -8),
    limb(754, 344, 11, 740, 330, 11),
    limb(732, 334, 7, 710, 356, 5),
    poly([[762, 344], [792, 298], [806, 306], [792, 350]]),
    poly([[792, 348], [820, 340], [814, 360]]),
    line([[772, 360], [774, 392]], 14),

    // le bassin et la rive d'un seul tenant, le bas droit : l'eau ne se lit qu'à ses ronds, découpés autour du filet
    poly([[198, 935], ...smooth([[198, 850], [204, 805], [222, 768], [260, 738], [320, 716], [395, 707], [470, 712],
      [530, 726], [565, 736], [590, 729], [612, 724], [650, 712], [700, 698], [745, 686], [796, 680], [822, 690],
      [838, 715], [846, 770], [850, 935]])]),
    cut(ring(374, 812, 55, 19, 12)),
    cut(ring(374, 812, 125, 48, 12)),

    // le filet versé dans le bassin passe devant l'eau jusqu'au centre des ronds
    cut({ ...poly([[366, 700], [390, 700], [392, 795], [360, 795]]), grow: 20 }),
    poly([[366, 684], [390, 684], [393, 822], [358, 822]]),

    // le pied droit dans l'eau, détaché du bassin
    raisedLeg.map((s) => cut({ ...s, grow: 20 })),
    raisedLeg,

    // le genou gauche sur la rive, la jambe couchée derrière elle, le pied tendu
    member([[628, 598], [588, 708], [742, 662]], [KNEELING_THIGH, KNEELING_SHIN], 1),
    limb(740, 664, 14, 772, 660, 12),

    // le buste penché vers le bassin, le sein qui pend sous le bras droit ; sous le bras gauche, le dos s'en écarte
    blob([[495, 425], [530, 408], [565, 406], [595, 418], [612, 440], [622, 470], [634, 510], [647, 550], [657, 588],
      [658, 612], [640, 622], [612, 614], [588, 600], [565, 585], [548, 565], [538, 545], [530, 525], [524, 510],
      [510, 498], [496, 490], [486, 478], [484, 460], [487, 440]]),
    blob([[488, 498], [500, 525], [510, 537], [522, 533], [528, 518], [522, 503]]),

    // la tête baissée de profil vers le bassin, les cheveux tirés en arrière jusque sur le dos
    blob([[388, 432], [391, 414], [405, 400], [428, 392], [456, 390], [484, 394], [508, 402], [524, 411], [508, 420],
      [494, 432], [488, 448], [484, 462], [472, 474], [462, 478], [455, 489], [444, 485], [436, 478], [428, 475],
      [418, 473], [418, 464], [412, 456], [404, 450], [396, 446]]),

    // le bras gauche tendu en arrière tient la cruche de droite par le haut de la panse, loin du col : une main posée
    // contre le col n'y laisserait qu'une fente
    member([[580, 428], [640, 468], [700, 512]], [UPPER_ARM, FOREARM], 1),
    jug(742, 534, 140),
    blob([[700, 498], [716, 492], [732, 500], [732, 518], [718, 526], [702, 522]]),

    // le bras droit descend devant le genou levé jusqu'à la cruche de gauche : l'avant-bras en est détaché
    cut({ ...member(forearm, [FOREARM], -1), grow: 20 }),
    member([[480, 492], ...forearm], [UPPER_ARM, FOREARM], -1),
    jug(338, 632, 50),
    blob([[362, 606], [380, 600], [396, 612], [394, 632], [378, 638], [362, 628]]),

    // le filet versé sur la terre passe devant la jambe couchée et tombe sur la rive
    cut({ ...poly([[686, 628], [708, 628], [715, 830], [689, 830]]), grow: 20 }),
    poly([[684, 582], [706, 582], [717, 862], [687, 862]]),
  ];
}

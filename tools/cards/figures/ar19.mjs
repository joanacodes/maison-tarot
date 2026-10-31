// Le Soleil (The Sun, XIX), d'après la carte de Pamela Colman Smith, 1909 : sous le grand soleil, l'enfant nu chevauche
// le cheval blanc les bras grands ouverts, l'étendard flottant de sa hampe, les tournesols par-dessus le mur.
import { blob, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const SUN = [500, 236, 131];

// une ligne lisse par des points (Catmull-Rom), pour les contours dont un côté reste droit
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

// ce qui est devant, détaché d'un vide de 10 tout autour de ce qui est derrière
const apart = (shapes) => [shapes].flat(Infinity).map((s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 }));

// les seize rayons, droits et ondulés en alternance ; ceux du haut s'arrêtent au bord du dessin, ceux du bas au-dessus
// des tournesols
const RAY_LENGTHS = [180, 200, 250, 250, 250, 250, 250, 198, 186, 198, 245, 255, 255, 255, 245, 200];
function rays() {
  const [cx, cy] = SUN;
  return RAY_LENGTHS.map((len, k) => {
    const a = ((-90 + k * 22.5) * Math.PI) / 180;
    const at = (r, s) => [cx + r * Math.cos(a) - s * Math.sin(a), cy + r * Math.sin(a) + s * Math.cos(a)];
    if (k % 2 === 0) return poly([at(118, -18), at(len, 0), at(118, 18)]);
    const points = [];
    for (let r = 118; r <= len - 13; r += 5) points.push(at(r, 6 * Math.sin(((r - 118) / 46) * 2 * Math.PI)));
    return line(points, 26);
  });
}

// un tournesol : le cœur et la couronne de pétales qui s'y fondent
const sunflower = (x, y, r) => [
  ...Array.from({ length: 11 }, (_, i) => {
    const a = (i / 11) * 2 * Math.PI;
    return ellipse(x + r * 0.68 * Math.cos(a), y + r * 0.68 * Math.sin(a), r * 0.36, r * 0.2, (a * 180) / Math.PI);
  }),
  circle(x, y, r * 0.52),
];

// les membres potelés de l'enfant : [t, dehors, dedans]
const ARM = [[0, 14, 14], [0.5, 12, 12], [1, 11, 11]];
const FOREARM = [[0, 11, 11], [0.5, 10, 10], [1, 10, 10]];
const THIGH = [[0, 22, 22], [0.5, 19, 19], [1, 16, 16]];
const SHIN = [[0, 15, 15], [0.4, 15, 13], [1, 11, 11]];

// l'enfant, de face, les bras grands ouverts : la couronne de fleurs et la plume sur la tête, la jambe droite pendue
// le long du flanc du cheval ; la main gauche tient la hampe
const child = () => [
  circle(430, 582, 29),
  [-160, -132, -104, -76, -48, -20].map((d) => circle(430 + 30 * Math.cos((d * Math.PI) / 180),
    582 + 30 * Math.sin((d * Math.PI) / 180), 9)),
  // la plume est une lame courbe, plus large au milieu : un trait droit se lisait comme une main levée
  blob([[428, 556], [410, 548], [398, 524], [394, 496], [398, 472], [410, 456], [420, 452], [414, 470], [412, 494],
    [416, 520], [426, 540], [436, 552]]),
  limb(432, 604, 11, 438, 620, 13),
  blob([[412, 616], [446, 606], [472, 614], [484, 640], [482, 672], [474, 702], [448, 712], [424, 704], [414, 674],
    [406, 642]]),
  member([[418, 632], [366, 670], [324, 704]], [ARM, FOREARM], -1),
  blob([[324, 692], [334, 700], [332, 716], [314, 726], [298, 720], [300, 704]]),
  member([[470, 628], [510, 614], [540, 603]], [ARM, FOREARM], 1),
  blob([[534, 590], [552, 588], [562, 600], [556, 614], [538, 614]]),
  member([[448, 702], [410, 774], [392, 828]], [THIGH, SHIN], -1),
  blob([[380, 820], [400, 824], [400, 842], [382, 860], [362, 856], [366, 836]]),
];

export function draw() {
  const [cx, cy, r] = SUN;
  // l'étendard : il descend à droite de sa hampe, se roule vers la gauche, puis sa queue retombe derrière la tête du
  // cheval ; à droite, entre le rouleau et la queue, le fond reste ouvert comme sur la carte. Son bord gauche s'écarte
  // assez pour garder la hampe dedans
  const banner = poly([...smooth([[662, 935], [658, 860], [648, 790], [634, 712], [622, 650], [606, 612], [580, 594],
    [548, 574], [522, 548], [508, 515], [510, 478], [528, 446], [560, 424], [595, 408], [606, 398], [620, 350],
    [640, 300], [660, 250], [678, 200], [692, 168], [702, 157], [725, 168], [745, 200], [757, 260], [762, 330],
    [764, 400], [762, 450], [745, 495], [715, 530], [685, 560], [668, 590], [676, 640], [690, 712], [702, 790],
    [710, 860], [714, 935]])]);
  const horse = poly(smooth([[285, 935], [284, 860], [291, 796], [307, 752], [331, 724], [368, 707], [418, 700],
    [458, 695], [488, 680], [512, 660], [535, 638], [556, 618], [572, 608], [590, 614], [604, 650], [606, 720],
    [604, 800], [604, 870], [612, 935]]));
  const head = [
    blob([[565, 612], [585, 604], [610, 602], [636, 604], [654, 612], [660, 640], [656, 690], [646, 740], [634, 790],
      [626, 830], [620, 858], [610, 878], [592, 884], [576, 876], [570, 856], [566, 820], [556, 780], [546, 740],
      [540, 700], [542, 660], [552, 630]]),
    poly([[628, 610], [646, 560], [660, 614]]),
    poly([[568, 614], [578, 564], [594, 606]]),
    blob([[594, 612], [602, 594], [616, 590], [628, 606]]),
  ];
  return [
    // le soleil, ses rayons, et son visage de face découpé à traits larges : les yeux, le nez, la bouche (la carte le
    // montre de face, non de profil)
    rays(),
    circle(cx, cy, r),
    [437, 563].map((x) => cut(blob([[x - 27, 222], [x - 12, 212], [x + 12, 212], [x + 27, 222], [x + 12, 231],
      [x - 12, 231]]))),
    cut(line([[493, 236], [487, 272], [494, 286], [510, 288], [520, 280]], 11)),
    cut(line([[468, 316], [486, 320], [502, 318], [518, 320], [536, 316]], 12)),

    // le mur, là où il se voit : à gauche derrière le bras de l'enfant et le cheval, à droite derrière l'étendard ; ses
    // joints découpés en font des pierres
    poly([[237, 650], [430, 650], [430, 935], [237, 935]]),
    poly([[700, 650], [770, 650], [770, 935], [700, 935]]),
    cut(line([[300, 650], [300, 700]], 10)),
    [700, 775, 850].map((y) => cut(line([[230, y], [296, y]], 10))),
    [730, 810, 890].map((y) => cut(line([[700, y], [776, y]], 10))),

    // les tournesols par-dessus le mur
    [[275, 478, 34], [358, 505, 34], [458, 492, 31], [736, 592, 28]].map(([x, y, s]) =>
      [line([[x, y], [x, 650]], 14), sunflower(x, y, s)]),
    ellipse(296, 585, 24, 10, -30),
    ellipse(336, 598, 24, 10, 30),

    // l'étendard, devant les rayons et le mur ; deux plis découpés suivent son cours de la hampe jusqu'au bout du
    // rouleau, sans quoi sa masse se lit comme un pan de mur
    apart(banner),
    banner,
    cut(line([[708, 192], [698, 262], [686, 330], [670, 388], [636, 424], [592, 442], [552, 466], [528, 498]], 12)),
    cut(line([[738, 226], [736, 300], [730, 380], [708, 436], [668, 474], [620, 500], [578, 526], [552, 548]], 12)),

    // le cheval blanc devant le mur et l'étendard, sa tête détachée de l'encolure : de longues oreilles étroites et le
    // toupet entre elles, car deux oreilles larges sur un front plat en faisaient une tête de chat
    apart(horse),
    horse,
    apart(head),
    head,

    // l'enfant devant le cheval, puis la hampe de l'étendard qui part de sa main gauche
    apart(child()),
    child(),
    line([[550, 600], [721, 120]], 14),
    poly([[713, 124], [721, 94], [729, 124]]),
  ];
}

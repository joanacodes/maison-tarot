// Le Soleil (The Sun, XIX), d'après la carte de Pamela Colman Smith, 1909 : sous le grand soleil, l'enfant nu chevauche
// le cheval blanc les bras grands ouverts, l'étendard flottant de sa hampe, les tournesols par-dessus le mur.
import { blob, chain, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
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
const RAY_LENGTHS = [180, 196, 245, 245, 245, 245, 245, 200, 188, 200, 245, 245, 245, 245, 245, 196];
function rays() {
  const [cx, cy] = SUN;
  return RAY_LENGTHS.map((len, k) => {
    const a = ((-90 + k * 22.5) * Math.PI) / 180;
    const at = (r, s) => [cx + r * Math.cos(a) - s * Math.sin(a), cy + r * Math.sin(a) + s * Math.cos(a)];
    if (k % 2 === 0) return poly([at(118, -18), at(len, 0), at(118, 18)]);
    const points = [];
    for (let r = 118; r <= len - 11; r += 6) points.push(at(r, 9 * Math.sin(((r - 118) / 55) * 2 * Math.PI)));
    return line(points, 22);
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

// les membres de l'enfant : [t, dehors, dedans]
const ARM = [[0, 12, 12], [0.5, 10, 10], [1, 9, 9]];
const FOREARM = [[0, 9, 9], [0.5, 8, 8], [1, 8, 8]];
const THIGH = [[0, 19, 19], [0.5, 16, 16], [1, 13, 13]];
const SHIN = [[0, 13, 13], [0.4, 13, 11], [1, 9, 9]];

// l'enfant, de face, les bras grands ouverts : la couronne de fleurs et la plume rouge sur la tête, la jambe droite
// pendue le long du flanc du cheval ; la main gauche tient la hampe
const child = () => [
  circle(430, 584, 27),
  [-160, -132, -104, -76, -48, -20].map((d) => circle(430 + 29 * Math.cos((d * Math.PI) / 180),
    584 + 29 * Math.sin((d * Math.PI) / 180), 9)),
  chain([[420, 556, 10], [410, 520, 9], [404, 490, 8], [408, 466, 7]]),
  limb(432, 604, 10, 438, 620, 12),
  blob([[414, 616], [446, 608], [470, 616], [480, 640], [478, 672], [470, 700], [448, 708], [428, 700], [418, 672],
    [410, 642]]),
  member([[418, 630], [366, 668], [322, 704]], [ARM, FOREARM], -1),
  blob([[322, 694], [330, 700], [328, 714], [312, 722], [300, 718], [302, 704]]),
  member([[468, 626], [508, 614], [542, 602]], [ARM, FOREARM], 1),
  blob([[538, 592], [552, 590], [560, 600], [554, 612], [540, 612]]),
  member([[446, 700], [408, 772], [390, 828]], [THIGH, SHIN], -1),
  blob([[380, 822], [398, 826], [396, 842], [380, 856], [364, 852], [368, 836]]),
];

export function draw() {
  const [cx, cy, r] = SUN;
  const banner = poly([...smooth([[640, 935], [650, 870], [636, 790], [614, 710], [606, 630], [575, 595], [545, 565],
    [518, 535], [506, 500], [514, 462], [542, 442], [590, 430], [630, 425], [648, 380], [650, 310], [662, 240],
    [685, 180], [700, 145], [714, 128], [735, 140], [752, 180], [765, 240], [770, 310], [768, 380], [762, 430],
    [758, 500], [752, 560], [754, 640], [763, 720], [768, 800], [770, 935]])]);
  const horse = poly(smooth([[285, 935], [284, 860], [290, 800], [305, 752], [328, 722], [360, 708], [400, 702],
    [440, 698], [472, 688], [500, 668], [524, 645], [548, 624], [570, 612], [592, 620], [602, 660], [602, 720],
    [598, 800], [596, 860], [604, 935]]));
  const head = [
    blob([[578, 596], [600, 610], [625, 612], [650, 615], [658, 650], [653, 715], [639, 768], [625, 812], [618, 848],
      [607, 874], [587, 881], [570, 869], [563, 842], [555, 800], [547, 750], [544, 700], [549, 650], [562, 614]]),
    poly([[562, 620], [574, 584], [592, 612]]),
    poly([[628, 614], [648, 582], [658, 624]]),
  ];
  return [
    // le soleil, ses rayons, et son visage de face découpé à traits larges : les yeux, le nez, la bouche
    rays(),
    circle(cx, cy, r),
    [437, 563].map((x) => cut(blob([[x - 27, 222], [x - 12, 212], [x + 12, 212], [x + 27, 222], [x + 12, 231],
      [x - 12, 231]]))),
    cut(line([[493, 236], [487, 272], [494, 286], [510, 288], [520, 280]], 11)),
    cut(line([[468, 316], [486, 320], [502, 318], [518, 320], [536, 316]], 12)),

    // l'étendard qui flotte de sa hampe, devant les rayons : il descend à droite, se roule vers la gauche puis retombe
    // derrière la tête du cheval ; deux plis découpés disent l'étoffe
    apart(banner),
    banner,
    cut(line([[650, 448], [604, 466], [556, 488], [522, 502]], 12)),
    cut(line([[714, 600], [722, 720], [734, 840], [740, 940]], 12)),

    // les tournesols par-dessus le mur
    [[275, 478, 34], [358, 505, 34], [458, 492, 31]].map(([x, y, s]) => [line([[x, y], [x, 650]], 14), sunflower(x, y, s)]),
    ellipse(296, 585, 24, 10, -30),
    ellipse(336, 598, 24, 10, 30),

    // le mur, à gauche derrière le cheval : ses joints découpés en font des pierres
    poly([[237, 650], [425, 650], [425, 935], [237, 935]]),
    cut(line([[292, 650], [292, 700]], 10)),
    [700, 770, 840].map((y) => cut(line([[230, y], [300, y]], 10))),

    // le cheval blanc devant le mur et l'étendard, sa tête détachée de l'encolure
    apart(horse),
    horse,
    apart(head),
    head,

    // l'enfant devant le cheval, puis la hampe de l'étendard qui part de sa main gauche
    apart(child()),
    child(),
    line([[548, 600], [722, 112]], 14),
    poly([[714, 118], [722, 88], [730, 118]]),
  ];
}

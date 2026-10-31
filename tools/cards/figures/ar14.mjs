// Tempérance (Temperance, XIV), d'après la carte de Pamela Colman Smith, 1909 : l'ange aux grandes ailes qui verse l'eau d'une coupe dans l'autre, un pied sur la rive et l'autre dans le bassin, le triangle dans un carré sur la poitrine, les iris au bord de l'eau.
import { blob, circle, cut, limb, line, ellipse, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const rad = (d) => (d * Math.PI) / 180;

// ce qui passe devant une autre forme en est détaché par une marge : son contour grossi de g / 2 tout autour est ôté
// de ce qui est dessous, puis la forme est dessinée
const gap = (shapes, g = 20) => [shapes].flat(Infinity)
  .map((s) => cut(s.stroke ? { ...s, width: s.width + g } : { ...s, grow: (s.grow ?? 0) + g }));

// des points le long d'une courbe lisse ouverte passant par ceux donnés (Catmull-Rom, extrémités tenues)
function curve(points, steps = 8) {
  const n = points.length;
  const p = (i) => points[Math.max(0, Math.min(n - 1, i))];
  const out = [];
  for (let i = 0; i < n - 1; i += 1) {
    const [a, b, c, d] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    for (let k = 0; k < steps; k += 1) {
      const t = k / steps;
      const f = (j) => 0.5 * (2 * b[j] + (-a[j] + c[j]) * t + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t * t
        + (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t * t * t);
      out.push([f(0), f(1)]);
    }
  }
  return [...out, p(n - 1)];
}

// l'aile gauche (à notre gauche) : le bord d'attaque lisse, de l'épaule au sommet puis le long du dehors jusqu'à la
// pointe basse, et les rémiges en pointes le long du bord de fuite qui remonte vers le corps. La carte coupe les deux
// ailes à son cadre : elles débordent ici un peu de chaque côté pour garder leur bout
const WING = [
  ...curve([[412, 292], [402, 250], [386, 205], [368, 166], [348, 146], [320, 140], [288, 150], [256, 172], [228, 206],
    [208, 250], [198, 300], [196, 360], [201, 420], [211, 480], [224, 536]]),
  [244, 498], [266, 526], [282, 474], [302, 502], [314, 452], [334, 476], [344, 432], [362, 450], [372, 414], [392, 402],
  [405, 350],
];

// une coupe à pied, du pied (fx, fy) à la bouche (mx, my) : le pied en disque vu de biais, la tige assez longue
// pour que la main qui la tient laisse voir le pied d'un côté et la coupe de l'autre, la coupe ronde
function goblet(fx, fy, mx, my) {
  const len = Math.hypot(mx - fx, my - fy);
  const [ux, uy] = [(mx - fx) / len, (my - fy) / len];
  const at = (u, v) => [fx + ux * u - uy * v, fy + uy * u + ux * v];
  return [
    ellipse(fx, fy, 9, 27, (Math.atan2(uy, ux) * 180) / Math.PI),
    line([at(0, 0), at(len - 50, 0)], 16),
    blob([at(len - 64, -9), at(len - 58, -20), at(len - 46, -28), at(len - 26, -31), at(len, -31), at(len, 31),
      at(len - 26, 31), at(len - 46, 28), at(len - 58, 20), at(len - 64, 9)]),
  ];
}

// le poing qui serre la tige, à la distance u du pied, allongé en travers de la tige
function fist(fx, fy, mx, my, u) {
  const len = Math.hypot(mx - fx, my - fy);
  return ellipse(fx + ((mx - fx) * u) / len, fy + ((my - fy) * u) / len, 15, 21, (Math.atan2(my - fy, mx - fx) * 180) / Math.PI);
}

// une feuille d'iris, de la touffe à sa pointe, un peu courbée
function blade(x0, y0, x1, y1, w, bend) {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const mid = [(x0 + x1) / 2 + (bend * (y1 - y0)) / len, (y0 + y1) / 2 - (bend * (x1 - x0)) / len];
  return member([[x0, y0], mid, [x1, y1]], [[[0, w, w], [0.5, 0.9 * w, 0.9 * w]],
    [[0, 0.75 * w, 0.75 * w], [0.6, 0.45 * w, 0.45 * w], [1, 1.5, 1.5]]], 1);
}

// une fleur d'iris dessinée en fleur de lys, sa figure héraldique, qui se lit comme une fleur et non comme une
// feuille : le pétale dressé, les deux qui retombent de chaque côté
const iris = (x, y) => [ellipse(x, y - 14, 9, 20), ellipse(x - 14, y + 8, 8, 17, 50), ellipse(x + 14, y + 8, 8, 17, -50)];

// l'eau versée : une bande épaisse en arc d'une bouche à l'autre, ondulée comme sur la carte, droite à ses deux bouts
function stream(points, amp, waves, width) {
  const c = curve(points, 12);
  return line(c.map(([x, y], i) => {
    const [px, py] = c[Math.max(0, i - 1)];
    const [nx, ny] = c[Math.min(c.length - 1, i + 1)];
    const d = Math.hypot(nx - px, ny - py) || 1;
    const t = i / (c.length - 1);
    const o = amp * Math.sin(Math.PI * t) * Math.sin(2 * Math.PI * waves * t);
    return [x - ((ny - py) / d) * o, y + ((nx - px) / d) * o];
  }), width);
}

export function draw() {
  const head = [482, 200];

  // l'ange : la robe longue aux larges manches, un peu évasée vers l'ourlet, le cou, la tête aux cheveux bouclés
  // (une couronne de boucles autour du visage), les pieds nus
  const angel = [
    blob([[456, 262], [510, 260], [548, 266], [584, 272], [606, 284], [626, 304], [640, 330], [643, 354], [632, 371],
      [606, 374], [603, 420], [604, 520], [607, 640], [612, 740], [616, 784], [560, 790], [510, 786], [460, 782],
      [404, 776], [402, 700], [408, 600], [416, 520], [428, 470], [434, 424], [408, 426], [384, 414], [377, 370],
      [381, 320], [396, 288], [424, 270]]),
    limb(482, 236, 15, 484, 270, 17),
    circle(...head, 44),
    [150, 180, 210, 240, 270, 300, 330, 360, 390].map((deg) => circle(head[0] + 42 * Math.cos(rad(deg)),
      head[1] + 42 * Math.sin(rad(deg)), 13)),
    // le pied droit qui descend dans l'eau, le gauche posé à plat sur la rive
    limb(492, 774, 15, 494, 860, 13),
    blob([[574, 780], [602, 780], [608, 800], [622, 814], [638, 826], [634, 838], [600, 838], [578, 828], [572, 804]]),
  ];
  // trois longs plis de la robe, sous les coupes, arrêtés avant l'ourlet pour ne pas le trancher
  const folds = [[[450, 528], [446, 640], [440, 758]], [[502, 540], [502, 650], [500, 762]], [[556, 528], [560, 640],
    [566, 760]]].map((p) => cut(line(curve(p), 10)));

  // le carré sur la poitrine, et le triangle découpé dedans
  const square = poly([[456, 306], [516, 306], [516, 366], [456, 366]]);
  const triangle = poly([[486, 321], [502, 350], [470, 350]]);

  // devant la robe, les deux coupes, la plus haute penchée pour verser, et l'eau qui passe de l'une à l'autre ; l'eau
  // s'arrête un peu avant les bords des coupes pour que chacune garde sa forme
  const low = [378, 532, 466, 456];
  const high = [641, 442, 544, 390];
  const water = stream([[548, 402], [524, 402], [502, 412], [484, 430], [470, 452]], 5, 2, 18);
  const cups = [goblet(...low), goblet(...high)];
  // et devant les coupes, les mains qui les tiennent par la tige
  const hands = [
    member([[404, 422], [406, 492]], [[[0, 15, 15], [0.5, 15, 15], [1, 14, 14]]], 1),
    fist(...low, 37),
    member([[626, 366], [612, 412]], [[[0, 13, 13], [1, 13, 13]]], 1),
    fist(...high, 35),
  ];

  return [
    // les ailes déployées, derrière tout le reste
    poly(WING),
    poly(WING.map(([x, y]) => [1000 - x, y])),
    // le nimbe : quelques rayons courts au-dessus de la tête, là où les ailes leur laissent la place
    [200, 223, 247, 270, 293, 317, 340].map((deg, i) => {
      const r = [88, 100, 110, 116, 110, 100, 88][i];
      const [c, s] = [Math.cos(rad(deg)), Math.sin(rad(deg))];
      return line([[head[0] + 75 * c, head[1] + 75 * s], [head[0] + r * c, head[1] + r * s]], 14);
    }),
    // la touffe d'iris sur la rive, derrière la robe
    blade(642, 834, 636, 610, 10, -8),
    blade(662, 834, 676, 590, 11, 6),
    blade(690, 834, 730, 620, 10, 10),
    blade(716, 832, 772, 670, 10, 10),
    blade(740, 830, 792, 740, 9, 8),
    iris(676, 590),
    iris(730, 622),
    gap(angel),
    angel,
    folds,
    gap(square),
    square,
    cut(triangle),
    gap([water, cups]),
    water,
    gap(cups),
    cups,
    gap(hands),
    hands,
    // la rive à droite, plus haute que l'eau ; le bassin devant, rendu par ses rides
    poly([[545, 852], [562, 838], [610, 834], [680, 828], [792, 824], [794, 852]]),
    poly([[212, 850], [794, 850], [794, 932], [212, 932]]),
    cut(line(curve([[240, 878], [330, 872], [420, 880], [510, 874], [600, 880], [690, 874]]), 10)),
    cut(line(curve([[300, 906], [400, 900], [500, 908], [600, 902], [700, 908], [770, 904]]), 10)),
  ];
}

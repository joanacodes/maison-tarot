// La Lune (The Moon, XVIII), d'après la carte de Pamela Colman Smith, 1909 : la lune au visage de profil verse ses
// gouttes entre les deux tours ; le chien et le loup hurlent vers elle, l'écrevisse sort de l'eau au pied du chemin.
import { blob, chain, circle, cut, ellipse, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const MOON = [514, 261, 121];

// les rayons de la lune, longs et courts en alternance, posés sous le disque pour s'y fondre
function rays() {
  const [cx, cy] = MOON;
  const out = [];
  for (let k = 0; k < 24; k += 1) {
    const a = ((k * 15 - 90) * Math.PI) / 180;
    const [len, half] = k % 2 ? [160, 10] : [195, 13];
    const at = (r, s) => [cx + r * Math.cos(a) - s * Math.sin(a), cy + r * Math.sin(a) + s * Math.cos(a)];
    out.push(poly([at(110, -half), at(len, 0), at(110, half)]));
  }
  return out;
}

// une goutte (un yod) qui tombe, la queue relevée et un peu courbée
const drop = (x, y) => blob([[x - 13, y + 2], [x - 9, y - 10], [x - 1, y - 20], [x + 8, y - 30], [x + 6, y - 18],
  [x + 12, y - 6], [x + 13, y + 6], [x + 7, y + 15], [x - 3, y + 16], [x - 11, y + 11]]);

// une ligne de vagues en travers du bassin
function wave(y) {
  const points = [];
  for (let x = 232; x <= 768; x += 8) points.push([x, y + 6 * Math.sin(((x - 232) / 60) * 2 * Math.PI)]);
  return line(points, 14);
}

// une route vue en fuyant : des points [x, y, largeur] du plus près au plus loin, ses deux bords lissés
function road(spine) {
  const left = [];
  const right = [];
  spine.forEach(([x, y, w], i) => {
    const [px, py] = spine[Math.max(0, i - 1)];
    const [nx, ny] = spine[Math.min(spine.length - 1, i + 1)];
    const len = Math.hypot(nx - px, ny - py);
    const [ux, uy] = [(ny - py) / len, -(nx - px) / len];
    left.push([x - (ux * w) / 2, y - (uy * w) / 2]);
    right.push([x + (ux * w) / 2, y + (uy * w) / 2]);
  });
  return blob([...left, ...right.reverse()]);
}

// une ligne lisse par des points (Catmull-Rom), pour le dessus des collines dont le bas reste droit
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

// une tour : le fût droit et sa fenêtre en haut, découpée
const tower = (x1, x2, top, bottom) => [
  poly([[x1, top], [x2, top], [x2, bottom], [x1, bottom]]),
  cut(poly([[x1 + 24, top + 22], [x1 + 42, top + 22], [x1 + 42, top + 46], [x1 + 24, top + 46]])),
];

// ce qui est devant, détaché d'un vide de 10 tout autour de ce qui est derrière
const apart = (shapes) => shapes.flat(Infinity).map((s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 }));

// les pattes à cette échelle : [t, dehors, dedans]
const LEG = [[0, 15, 15], [0.5, 12, 12], [1, 10, 10]];
const SHANK = [[0, 10, 10], [0.5, 9, 9], [1, 8, 8]];

// le chien, cabré, le museau levé vers la lune, l'oreille tombante ; ses pattes de devant en l'air. La gueule reste
// fermée : ouverte vers le haut, ses deux mâchoires se lisaient comme deux oreilles de chat
const dog = () => [
  blob([[448, 516], [457, 522], [463, 538], [469, 554], [476, 572], [478, 590], [477, 604], [452, 610], [428, 598],
    [424, 580], [427, 562], [432, 546], [438, 530], [442, 520]]),
  blob([[432, 552], [420, 562], [410, 580], [414, 600], [424, 596], [434, 578]]),
  blob([[476, 598], [478, 622], [470, 646], [446, 664], [418, 684], [396, 700], [372, 708], [348, 704], [336, 686],
    [342, 666], [362, 656], [386, 640], [406, 620], [426, 598]]),
  chain([[344, 670, 11], [332, 650, 10], [328, 634, 9]]),
  member([[466, 645], [478, 676], [486, 704]], [LEG, SHANK], 1),
  blob([[478, 702], [496, 702], [502, 712], [492, 718], [478, 716]]),
  member([[448, 660], [452, 690], [460, 712]], [LEG, SHANK], 1),
  blob([[450, 708], [470, 708], [474, 718], [462, 722], [448, 720]]),
  member([[362, 690], [348, 726], [338, 750]], [LEG, SHANK], -1),
  blob([[326, 744], [348, 744], [354, 756], [324, 756]]),
  member([[392, 696], [388, 726], [378, 750]], [LEG, SHANK], 1),
  blob([[366, 744], [388, 744], [392, 756], [364, 756]]),
];

// le loup, assis, le museau tendu vers la lune et la gueule ouverte, les oreilles pointues, l'arrière touffu
const wolf = () => [
  blob([[510, 556], [528, 548], [548, 546], [570, 547], [592, 552], [614, 560], [630, 574], [632, 592], [606, 602],
    [578, 606], [556, 602], [540, 594], [524, 590], [512, 586], [522, 578], [546, 572], [526, 566], [512, 562]]),
  poly([[584, 558], [604, 522], [614, 562]]),
  poly([[608, 568], [634, 538], [634, 582]]),
  blob([[626, 586], [662, 582], [702, 586], [736, 596], [756, 616], [765, 650], [760, 690], [748, 718], [724, 738],
    [700, 748], [660, 752], [630, 752], [626, 738], [644, 724], [652, 698], [640, 672], [620, 660], [598, 652],
    [574, 646], [560, 630], [556, 612], [562, 596], [590, 594]]),
  member([[582, 640], [583, 700], [584, 742]], [LEG, SHANK], 1),
  blob([[570, 738], [596, 738], [600, 752], [568, 752]]),
  member([[614, 650], [616, 700], [617, 742]], [LEG, SHANK], 1),
  blob([[604, 738], [628, 738], [634, 752], [602, 752]]),
];

// l'écrevisse qui sort de l'eau, les pinces levées, la queue encore dans le bassin
const crayfish = () => [
  blob([[442, 796], [456, 784], [470, 796], [477, 820], [472, 846], [456, 854], [440, 846], [435, 820]]),
  poly([[448, 790], [456, 768], [464, 790]]),
  ellipse(456, 866, 18, 12), ellipse(457, 886, 16, 11), ellipse(458, 904, 14, 10),
  poly([[446, 908], [470, 908], [484, 932], [458, 926], [432, 932]]),
  chain([[444, 800, 9], [432, 782, 8]]),
  chain([[468, 800, 9], [480, 782, 8]]),
  // chaque pince ouverte : deux doigts écartés d'une fente
  blob([[418, 778], [416, 756], [420, 740], [430, 736], [432, 752], [440, 744], [444, 760], [440, 780], [430, 788]]),
  blob([[494, 778], [496, 756], [492, 740], [482, 736], [480, 752], [472, 744], [468, 760], [472, 780], [482, 788]]),
  [[[438, 822], [414, 830], [400, 848]], [[440, 840], [418, 860], [406, 884]], [[474, 822], [498, 830], [512, 848]],
    [[472, 840], [494, 860], [506, 884]]].map((leg) => line(leg, 14)),
];

export function draw() {
  const [cx, cy, r] = MOON;
  return [
    // la lune : le disque plein, ses rayons, et le profil du visage découpé d'un bord à l'autre, front, nez, lèvres,
    // menton, comme le croissant tracé dans le disque de la carte
    rays(),
    circle(cx, cy, r),
    cut(line([[412, 168], [440, 178], [462, 192], [476, 210], [486, 226], [490, 248], [494, 264], [482, 288],
      [500, 290], [514, 282], [520, 292], [512, 300], [526, 302], [520, 312], [532, 316], [534, 330], [552, 334],
      [570, 334], [590, 330], [608, 336], [612, 350]], 12)),

    // les gouttes, tenues hors de la couronne des rayons et loin des deux têtes
    [[330, 420], [365, 480], [420, 470], [480, 495], [548, 488], [610, 470], [665, 430]].map(([x, y]) => drop(x, y)),

    // les deux tours sur la ligne des collines au loin ; le loup cache le pied de celle de droite
    tower(240, 306, 380, 600),
    tower(692, 758, 375, 600),
    poly([[232, 616], ...smooth([[232, 592], [280, 585], [330, 590], [380, 586], [430, 592], [480, 590], [530, 594],
      [580, 590], [640, 588], [700, 586], [748, 588]]), [748, 616]]),
    // les deux bêtes passent devant les collines, qui s'arrêtent à un vide de leur contour ; le pré n'est posé
    // qu'ensuite, pour que leurs pattes s'y appuient au lieu d'en être détachées
    apart(wolf()),
    apart(dog()),

    // le pré où se tiennent les bêtes, creusé au milieu pour que les pinces de l'écrevisse se lèvent sur le vide
    // et non dans la masse
    poly([[230, 822], [230, 752], [300, 752], [392, 756], [404, 772], [418, 796], [505, 796], [518, 770], [530, 756],
      [770, 752], [770, 822]]),

    // l'eau du bassin, dite par ses vagues
    [852, 888, 922].map(wave),

    // le chemin qui serpente entre les bêtes et monte jusqu'aux collines
    road([[536, 766, 40], [532, 740, 36], [528, 716, 28], [528, 694, 26], [534, 674, 20], [534, 656, 16], [527, 640, 12],
      [522, 624, 8], [520, 606, 6]]),

    // l'écrevisse devant le pré et les vagues, qui s'arrêtent à un vide autour d'elle
    apart(crayfish()),
    crayfish(),
    dog(),
    wolf(),
  ];
}

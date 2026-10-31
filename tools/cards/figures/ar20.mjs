// Le Jugement (Judgement, XX), d'après la carte de Pamela Colman Smith, 1909 : l'ange ailé dans les nuées sonne de la
// longue trompette à l'étendard de la croix ; en bas, l'homme, la femme et l'enfant se lèvent de leurs cercueils.
import { blob, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

// ce qui est devant, détaché d'un vide de 10 tout autour de ce qui est derrière
const apart = (shapes) => [shapes].flat(Infinity).map((s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 }));

// l'aile gauche dressée derrière l'épaule, d'un seul tenant : le bord d'attaque monte de l'épaule à la pointe, en haut
// du coin, le bord de fuite en redescend en festons, un par grande plume ; la droite en est le reflet. Des plumes
// séparées en faisaient une main, des dents le long d'un bord plein un sapin
const WING = [[446, 300], [430, 250], [408, 200], [378, 150], [338, 108], [292, 76], [262, 62],
  [240, 84], [254, 108], [226, 130], [246, 152], [218, 180], [242, 198], [222, 230], [252, 242], [240, 278],
  [276, 282], [276, 318], [312, 314], [322, 346], [356, 336], [380, 360], [420, 340]];
const wing = (m) => blob(WING.map(([x, y]) => [m(x), y]));

// une nuée : des bosses rondes fondues ensemble
const cloud = (bumps) => bumps.map(([x, y, r]) => circle(x, y, r));

// les membres à cette échelle : [t, dehors, dedans]
const UPPER = [[0, 12, 12], [0.5, 11, 11], [1, 10, 10]];
const FORE = [[0, 10, 10], [0.5, 9, 9], [1, 8, 8]];

// l'homme, de dos, la tête renversée vers l'ange, les mains jointes levées devant lui
const man = () => [
  blob([[276, 642], [277, 620], [290, 604], [308, 598], [322, 600], [330, 612], [326, 628], [314, 642], [298, 652]]),
  limb(302, 650, 13, 310, 672, 15),
  blob([[276, 678], [318, 666], [352, 680], [360, 712], [350, 752], [340, 780], [346, 812], [344, 842], [292, 842],
    [286, 812], [292, 780], [280, 752], [272, 712]]),
  member([[346, 692], [368, 740], [386, 698]], [UPPER, FORE], 1),
  blob([[376, 702], [380, 674], [390, 658], [400, 664], [398, 690], [392, 708]]),
  limb(304, 836, 16, 300, 904, 12),
  limb(334, 836, 16, 338, 904, 12),
];

// l'enfant, de dos au milieu, les bras grands ouverts vers le ciel
const child = () => [
  circle(485, 750, 23),
  limb(485, 770, 10, 485, 784, 12),
  blob([[462, 786], [508, 786], [516, 820], [512, 866], [506, 898], [464, 898], [458, 866], [454, 820]]),
  member([[466, 792], [432, 768], [402, 742]], [UPPER, FORE], -1),
  circle(398, 738, 12),
  member([[504, 792], [544, 770], [580, 748]], [UPPER, FORE], 1),
  circle(585, 745, 12),
];

// la femme, de profil, ses longs cheveux dans le dos, les deux bras tendus vers l'ange
const woman = () => [
  blob([[676, 598], [670, 608], [660, 620], [672, 626], [670, 634], [678, 642], [694, 646], [712, 642], [724, 626],
    [724, 602], [712, 588], [694, 584]]),
  blob([[694, 582], [716, 584], [732, 600], [740, 630], [744, 680], [750, 730], [756, 780], [748, 806], [738, 796],
    [734, 750], [728, 700], [722, 664], [712, 644]]),
  limb(700, 640, 12, 704, 664, 14),
  blob([[690, 660], [716, 656], [730, 690], [726, 740], [744, 800], [740, 840], [728, 870], [690, 878], [684, 840],
    [680, 800], [686, 762], [676, 724], [664, 706], [672, 684]]),
  member([[690, 672], [596, 654], [508, 634]], [UPPER, FORE], 1),
  ellipse(500, 632, 14, 9, -10),
  member([[704, 660], [614, 622], [532, 592]], [UPPER, FORE], 1),
  ellipse(524, 589, 14, 9, -20),
  limb(704, 860, 17, 702, 904, 13),
  limb(722, 860, 15, 726, 904, 12),
];

// un cercueil ouvert vu depuis les pieds, ses parois pleines et épaisses autour du creux où se tient le mort : plein
// d'un bout à l'autre, il se lisait comme le socle d'une statue. [x1, x2, top] est le bord du fond, [x3, x4] celui de
// l'avant, en bas ; le creux est le même trapèze rentré de l'épaisseur des parois
const coffin = ([x1, x2, top], [x3, x4], wall) => {
  const t = wall / (935 - top);
  const lerp = (a, b, u) => a + (b - a) * u;
  return [
    poly([[x1, top], [x2, top], [x4, 935], [x3, 935]]),
    cut(poly([[lerp(x1, x3, t) + wall, top + wall], [lerp(x2, x4, t) - wall, top + wall],
      [lerp(x4, x2, t) - wall, 935 - wall], [lerp(x3, x1, t) + wall, 935 - wall]])),
  ];
};

export function draw() {
  const angel = [
    // la tête sous ses boucles, qui tombent jusqu'aux épaules, sur un cou large : une grosse chevelure sur un cou mince
    // se lisait comme la couronne d'un arbre
    blob([[432, 262], [420, 214], [422, 172], [436, 136], [462, 112], [492, 104], [522, 110], [546, 128], [560, 160],
      [564, 200], [558, 244], [550, 268], [520, 262], [494, 266], [468, 262]]),
    ...[[428, 150], [448, 122], [476, 106], [508, 104], [536, 116], [556, 140], [567, 172], [568, 210], [419, 188],
      [420, 228], [562, 246], [432, 258]].map(([x, y]) => circle(x, y, 15)),
    limb(494, 262, 22, 494, 290, 26),
    blob([[470, 284], [520, 284], [560, 286], [596, 296], [614, 336], [606, 400], [520, 420], [450, 420], [394, 400],
      [386, 340], [404, 300], [436, 286]]),
  ];
  const clouds = [
    cloud([[262, 372, 34], [300, 352, 40], [345, 368, 38], [368, 396, 30], [276, 425, 44], [330, 435, 40],
      [376, 432, 30], [255, 465, 26]]),
    cloud([[430, 410, 30], [470, 420, 28], [560, 410, 30], [600, 395, 30]]),
    cloud([[652, 322, 30], [662, 298, 42], [712, 305, 44], [748, 345, 30], [700, 368, 46], [640, 375, 40],
      [742, 410, 32], [690, 430, 36], [630, 425, 30]]),
  ];
  // la trompette droite qui s'évase en pavillon, détachée de la robe mais pas du visage où elle naît (le vide qui
  // l'entoure ne commence que sous le menton) ; le bras droit sort de la nuée pour la tenir
  const belowChin = poly([[497, 300], [508, 298], [549, 503], [523, 507]]);
  const trumpet = [
    poly([[486, 259], [500, 257], [549, 503], [523, 507]]),
    poly([[523, 507], [549, 503], [567, 530], [592, 544], [497, 561], [515, 539]]),
    ellipse(544, 553, 49, 10, -10),
    limb(650, 458, 17, 578, 470, 13),
    blob([[552, 456], [574, 452], [586, 466], [580, 488], [560, 492], [548, 478]]),
  ];
  const flag = poly([[358, 404], [430, 396], [505, 386], [508, 470], [510, 560], [432, 566], [362, 568], [360, 486]]);
  return [
    // les ailes dressées, derrière l'ange
    wing((x) => x),
    wing((x) => 1000 - x),

    // l'ange, détaché de ses ailes, et l'ovale du visage tracé dans les boucles : sans lui, la tête bouclée se lisait
    // comme la couronne d'un arbre
    apart(angel),
    angel,
    cut(line(Array.from({ length: 41 }, (_, i) => [494 + 38 * Math.sin((i * Math.PI) / 20), 196 - 50 * Math.cos((i * Math.PI) / 20)]), 10)),

    // les nuées devant le bas de la robe et des ailes, deux volutes découpées dedans
    apart(clouds),
    clouds,
    cut(line([[262, 425], [270, 410], [288, 408], [296, 424], [284, 438]], 10)),
    cut(line([[688, 368], [696, 352], [716, 350], [724, 368], [710, 382]], 10)),

    // l'étendard pendu à la trompette, la croix découpée sans toucher ses bords pour qu'il reste d'un seul tenant
    apart([flag, belowChin, trumpet.slice(1)]),
    flag,
    cut(poly([[421, 420], [445, 418], [447, 548], [423, 550]])),
    cut(poly([[378, 466], [490, 462], [491, 490], [379, 494]])),
    trumpet,

    // les cercueils ouverts, et les morts qui s'y lèvent, détachés des parois
    coffin([240, 362, 840], [236, 366], 20),
    coffin([440, 530, 806], [376, 594], 22),
    coffin([648, 766, 846], [644, 770], 20),
    apart([man(), child(), woman()]),
    man(),
    child(),
    woman(),
  ];
}

// Le Monde (The World, XXI), d'après la carte de Pamela Colman Smith, 1909 : la danseuse drapée de son écharpe, une
// baguette dans chaque main, dans la couronne de laurier nouée en haut et en bas ; l'ange, l'aigle, le taureau et le
// lion aux quatre coins.
import { blob, chain, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const WREATH = [490, 497, 225, 340];

// ce qui est devant, détaché d'un vide de 10 tout autour de ce qui est derrière
const apart = (shapes) => [shapes].flat(Infinity).map((s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 }));

// la couronne : un anneau ovale plein, ses feuilles en biais le long des deux bords pour en faire des bosses
function wreath() {
  const [cx, cy, rx, ry] = WREATH;
  const ring = [];
  for (let i = 0; i <= 72; i += 1) {
    const t = (i / 72) * 2 * Math.PI;
    ring.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]);
  }
  const leaves = [];
  for (let i = 0; i < 76; i += 1) {
    const t = (i / 76) * 2 * Math.PI;
    const [px, py] = [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
    const [tx, ty] = [-rx * Math.sin(t), ry * Math.cos(t)];
    const tl = Math.hypot(tx, ty);
    const [ux, uy] = [tx / tl, ty / tl];
    const [nx, ny] = [uy, -ux];
    const deg = (Math.atan2(uy, ux) * 180) / Math.PI;
    leaves.push(ellipse(px - nx * 14 + ux * 4, py - ny * 14 + uy * 4, 16, 8, deg + 30));
    leaves.push(ellipse(px + nx * 14 + ux * 4, py + ny * 14 + uy * 4, 16, 8, deg - 30));
  }
  return [line(ring, 30), leaves];
}

// un ruban noué en croix : deux bandes effilées qui se croisent sur la couronne
const band = (x1, y1, x2, y2) => {
  const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
  const l = Math.hypot(x2 - x1, y2 - y1);
  const [nx, ny] = [-(y2 - y1) / l, (x2 - x1) / l];
  return poly([[x1, y1], [mx + nx * 12, my + ny * 12], [x2, y2], [mx - nx * 12, my - ny * 12]]);
};
const ribbon = (cx, cy) => [band(cx - 64, cy - 26, cx + 64, cy + 28), band(cx + 60, cy - 26, cx - 58, cy + 28),
  circle(cx, cy, 13)];

// une baguette : la tige, une flamme en haut, un bouton en losange en bas
const wand = (x1, y1, x2, y2) => [
  line([[x1, y1], [x2, y2]], 14),
  ellipse(x1, y1 - 6, 9, 15, 0),
  poly([[x2 - 11, y2], [x2, y2 - 12], [x2 + 11, y2], [x2, y2 + 14]]),
];

// les membres de la danseuse : [t, dehors, dedans]
const UPPER = [[0, 13, 13], [0.5, 11, 11], [1, 10, 10]];
const FORE = [[0, 10, 10], [0.5, 9, 9], [1, 8, 8]];
const THIGH = [[0, 22, 22], [0.5, 19, 19], [1, 14, 14]];
const SHIN = [[0, 14, 14], [0.35, 15, 13], [1, 9, 9]];

export function draw() {
  const creatures = [
    // l'ange, de profil vers la couronne : front, nez, lèvres et menton marqués, le cou, les mèches derrière
    poly([[282, 84], [306, 88], [324, 100], [332, 116], [334, 128], [348, 148], [336, 153], [339, 161], [332, 166],
      [337, 173], [330, 180], [333, 191], [318, 197], [311, 204], [312, 224], [278, 224], [276, 206], [258, 200],
      [248, 184], [240, 160], [242, 134], [250, 108], [264, 92]]),
    [[252, 110], [243, 137], [244, 165], [254, 191], [270, 207]].map(([x, y]) => circle(x, y, 14)),
    // l'aigle, de profil vers la couronne : le bec crochu entrouvert, la crête du sourcil, les plumes de la nuque en
    // mèches
    poly([[660, 118], [640, 120], [624, 128], [612, 142], [606, 158], [608, 178], [618, 170], [626, 164], [660, 164],
      [632, 186], [648, 190], [668, 186], [686, 196], [708, 204], [730, 204], [748, 196], [760, 190], [754, 176],
      [768, 162], [754, 150], [766, 134], [748, 122], [730, 104], [706, 94], [684, 96], [668, 104]]),
    // le taureau, de face, ses deux cornes levées
    blob([[256, 820], [290, 812], [324, 820], [332, 842], [326, 868], [316, 896], [312, 922], [268, 922], [264, 896],
      [254, 868], [248, 842]]),
    ellipse(290, 914, 30, 16),
    chain([[258, 824, 11], [244, 806, 9], [242, 786, 6]]),
    chain([[322, 824, 11], [332, 808, 9], [328, 792, 6]]),
    ellipse(238, 842, 15, 8, 20), ellipse(342, 842, 15, 8, -20),
    // le lion, de face : la crinière en mèches inégales qui retombent vers le bas, comme une chevelure (rondes et
    // régulières, c'était une fleur ; droites et pointues, un soleil)
    Array.from({ length: 15 }, (_, i) => {
      const a = (i / 15) * 2 * Math.PI - Math.PI / 2;
      const len = [80, 70, 84, 66, 78][i % 5];
      const k = Math.abs(Math.cos(a));
      const at = (r, da, drop) => [700 + r * Math.cos(a + da), 846 + r * Math.sin(a + da) + drop * k];
      return blob([at(42, -0.2, 0), at(62, -0.12, 4), at(len, 0.1, 12), at(60, 0.18, 4), at(42, 0.22, 0)]);
    }),
    ellipse(700, 850, 64, 76),
  ];
  // l'écharpe : son bout qui vole à gauche de l'épaule, et sa traîne qui descend le long de la hanche droite puis
  // revient en boucle derrière les pieds
  const scarf = [
    poly([[456, 350], [436, 332], [412, 322], [388, 306], [364, 300], [340, 302], [354, 316], [336, 330], [362, 332],
      [386, 338], [408, 350], [428, 364], [442, 376]]),
    line([[548, 548], [574, 590], [598, 642], [606, 694], [594, 734], [564, 758], [520, 768], [478, 764], [446, 752],
      [432, 736]], 26),
  ];
  const standingFoot = blob([[536, 746], [556, 744], [566, 760], [576, 776], [560, 782], [540, 778], [532, 762]]);
  return [
    // la couronne, puis les rubans noués en croix devant elle, en haut et en bas
    wreath(),
    apart([ribbon(490, 158), ribbon(490, 837)]),
    ribbon(490, 158),
    ribbon(490, 837),

    // les quatre vivants aux coins, devant la couronne là où ils l'approchent ; la face du lion, grandes oreilles
    // rondes et mufle large, détachée de sa crinière par un trait découpé
    apart(creatures),
    creatures,
    cut(line([[665, 860], [667, 840], [668, 826], [663, 814], [670, 801], [684, 800], [692, 811], [700, 815],
      [708, 811], [716, 800], [730, 801], [737, 814], [732, 826], [733, 840], [737, 860], [733, 877], [721, 889],
      [711, 902], [700, 905], [689, 902], [679, 889], [667, 877], [665, 860]], 10)),

    // l'écharpe, puis la danseuse : le pied d'appui passe devant la boucle de l'écharpe
    scarf,
    apart(standingFoot),
    // la jambe d'appui, et l'autre repliée derrière elle, le pied levé
    member([[528, 560], [538, 652], [546, 748]], [THIGH, SHIN], 1),
    standingFoot,
    member([[490, 566], [488, 640], [468, 690]], [THIGH, SHIN], -1),
    blob([[458, 682], [478, 684], [478, 700], [468, 718], [456, 712]]),
    // le buste, la tête penchée vers la gauche, les bras écartés tenant chacun sa baguette
    blob([[460, 360], [500, 354], [538, 360], [552, 376], [552, 410], [548, 440], [540, 470], [538, 492], [548, 520],
      [556, 548], [552, 572], [530, 580], [500, 582], [474, 574], [462, 552], [466, 520], [474, 492], [468, 466],
      [456, 440], [452, 410], [446, 378]]),
    limb(492, 336, 11, 496, 362, 13),
    blob([[472, 276], [488, 268], [506, 272], [516, 286], [518, 304], [512, 322], [500, 334], [486, 338], [474, 332],
      [468, 322], [462, 314], [466, 306], [464, 292]]),
    circle(514, 276, 13),
    member([[452, 374], [406, 456], [378, 502]], [UPPER, FORE], -1),
    member([[546, 374], [586, 456], [622, 500]], [UPPER, FORE], 1),
    wand(352, 424, 344, 584),
    wand(630, 426, 652, 584),
    blob([[362, 494], [386, 492], [394, 506], [384, 520], [364, 518]]),
    blob([[612, 490], [634, 488], [644, 502], [636, 516], [614, 514]]),
    // le bord de l'écharpe qui lui barre les hanches, découpé sans traverser tout le corps, qui en serait coupé en deux
    cut(line([[560, 512], [526, 540], [494, 562]], 10)),
  ];
}

// La Roue de Fortune (Wheel of Fortune, X), d'après la carte de Pamela Colman Smith, 1909 : la roue sous le sphinx à l'épée, le serpent qui descend à gauche, Anubis qui monte à droite, et les quatre vivants ailés avec leurs livres aux coins.
import { blob, chain, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';

// la roue : son centre et son rayon, relevés sur la carte
const WHEEL = [494, 537];
const RIM = 184;

// un cercle tracé comme une tige : une rainure circulaire une fois découpée
function ring(cx, cy, r, width) {
  return line(Array.from({ length: 73 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 72;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }), width);
}

// un livre ouvert, en parallélogramme, détaché de qui le tient ; le dos découpé en sépare les deux pages. Ce sur quoi
// il repose (`under`) est posé entre la découpe et le livre, pour qu'il y tienne au lieu de flotter dans un liseré
function book(corners, spine, under = []) {
  const shape = poly(corners);
  return [cut({ ...shape, grow: 20 }), ...under, shape, cut(line(spine, 10))];
}

// le serpent : une ondulation régulière qui s'élargit en descendant, la queue en haut, la tête qui sort à droite
function snake() {
  const points = [];
  for (let y = 444; y <= 676; y += 4) {
    const t = (y - 444) / 220;
    points.push([276 - 0.05 * (y - 444) + (16 + 10 * t) * Math.sin((2 * Math.PI * (y - 444)) / 60 + Math.PI / 2), y]);
  }
  const [x1, y1] = points.at(-2);
  const [x2, y2] = points.at(-1);
  const a = Math.atan2(y2 - y1, x2 - x1);
  return [line(points, 16), ellipse(x2 + 9 * Math.cos(a), y2 + 9 * Math.sin(a), 16, 11, (a * 180) / Math.PI)];
}

// l'épée du sphinx, de la garde à la pointe : tenue plus droite et plus à droite que sur la carte, où elle barre la
// coiffe ; ici elle n'en effleure que le pan droit, et la coiffe, qui fait lire un sphinx, reste entière
const GUARD_AT = [530, 296];
const TIP = [566, 150];
const LEN = Math.hypot(TIP[0] - GUARD_AT[0], TIP[1] - GUARD_AT[1]);
const D = [(TIP[0] - GUARD_AT[0]) / LEN, (TIP[1] - GUARD_AT[1]) / LEN];
const N = [-D[1], D[0]];
const along = (s, w) => [GUARD_AT[0] + D[0] * s + N[0] * w, GUARD_AT[1] + D[1] * s + N[1] * w];
const BLADE = poly([along(0, -9), along(LEN * 0.85, -7), TIP, along(LEN * 0.85, 7), along(0, 9)]);
const CROSS = line([along(0, -24), along(0, 24)], 14);

// le visage du sphinx, de face, du front au menton
const FACE = blob([[473, 198], [499, 198], [503, 214], [498, 230], [486, 244], [474, 230], [469, 214]]);

function angel() {
  const head = ellipse(330, 131, 16, 18);
  return [
    // l'ange en haut à gauche : une aile vers le coin, l'autre derrière la tête vers la droite ; la tête détachée des
    // ailes, assise sur le buste
    poly([[308, 162], [300, 142], [288, 122], [272, 104], [255, 90], [236, 80], [244, 96], [234, 102], [250, 114],
      [240, 122], [256, 132], [248, 142], [266, 148], [262, 158], [282, 162], [286, 172], [306, 176]]),
    poly([[318, 142], [322, 122], [334, 102], [350, 86], [372, 73], [400, 62], [394, 77], [408, 80], [390, 92],
      [402, 98], [382, 106], [392, 114], [370, 120], [376, 130], [352, 132], [342, 146]]),
    cut({ ...head, grow: 20 }),
    blob([[314, 152], [344, 150], [356, 168], [358, 196], [350, 212], [312, 214], [302, 192], [306, 166]]),
    blob([[302, 198], [334, 204], [364, 228], [392, 254], [414, 278], [428, 298], [404, 302], [372, 296], [342, 284],
      [318, 266], [304, 240]]),
    head,
    // le nuage réduit à l'assise de la robe
    circle(334, 312, 15), circle(362, 306, 19), circle(396, 308, 17), circle(424, 314, 13),
    poly([[322, 312], [436, 312], [436, 326], [322, 326]]),
    book([[314, 186], [364, 170], [384, 214], [334, 230]], [[339, 178], [359, 222]]),
  ];
}

function eagle() {
  return [
    // l'aigle en haut à droite : les deux ailes levées, la tête de profil au bec crochu tournée vers la gauche, la
    // queue en éventail ; l'aile gauche est un peu remontée pour laisser passer la pointe de l'épée
    poly([[648, 158], [650, 134], [662, 112], [684, 96], [714, 86], [744, 80], [766, 76], [752, 92], [762, 100],
      [738, 108], [748, 118], [724, 124], [732, 136], [708, 140], [716, 154], [694, 158], [700, 172], [678, 178],
      [684, 192], [664, 196]]),
    poly([[614, 150], [606, 130], [594, 110], [578, 94], [558, 82], [536, 74], [548, 90], [538, 96], [560, 104],
      [552, 112], [574, 116], [570, 126], [592, 128], [598, 142]]),
    poly([[660, 214], [700, 210], [740, 205], [764, 210], [748, 222], [764, 232], [740, 240], [700, 242], [664, 240]]),
    blob([[586, 122], [592, 112], [604, 104], [619, 100], [633, 104], [641, 116], [643, 132], [649, 150], [659, 168],
      [666, 190], [668, 212], [662, 232], [648, 244], [630, 246], [614, 236], [606, 214], [604, 190], [604, 166],
      [606, 146], [604, 134], [597, 131], [590, 129]]),
    limb(630, 238, 8, 626, 256, 7),
    limb(650, 236, 8, 654, 256, 7),
    // son livre sous les serres, sur un reste de nuage
    book([[586, 258], [664, 252], [672, 284], [594, 290]], [[625, 255], [633, 287]], [
      circle(602, 300, 13), circle(630, 296, 17), circle(660, 300, 13),
      poly([[590, 300], [674, 300], [674, 314], [590, 314]]),
    ]),
  ];
}

function bull() {
  return [
    // le taureau couché en bas à gauche : l'aile dressée vers le coin, la tête aux deux cornes, le livre devant lui
    poly([[332, 864], [324, 834], [310, 804], [292, 774], [274, 746], [258, 716], [256, 736], [242, 740], [254, 756],
      [238, 764], [254, 776], [240, 786], [258, 796], [246, 808], [266, 816], [258, 830], [280, 834], [278, 850],
      [300, 852], [302, 866]]),
    blob([[244, 892], [252, 868], [280, 856], [322, 854], [356, 850], [386, 858], [406, 876], [420, 898], [416, 916],
      [380, 922], [320, 923], [270, 920], [248, 910]]),
    blob([[370, 830], [382, 818], [398, 815], [412, 822], [419, 838], [421, 854], [418, 868], [408, 874], [396, 870],
      [388, 858], [378, 848], [370, 840]]),
    chain([[380, 824, 8], [366, 814, 7.5], [360, 798, 7]]),
    chain([[408, 822, 8], [422, 812, 7.5], [426, 796, 7]]),
    ellipse(364, 840, 11, 7, 15),
    ellipse(426, 840, 11, 7, -15),
    // le livre, et sous les deux le sol de nuage
    book([[414, 880], [454, 872], [468, 912], [428, 922]], [[434, 876], [448, 917]], [
      poly([[236, 914], [476, 914], [476, 932], [236, 932]]),
    ]),
  ];
}

function lion() {
  // la crinière, en mèches inégales rejetées vers l'arrière, et le mufle qui en sort vers le livre
  const mane = blob([[586, 828], [594, 814], [606, 820], [614, 808], [626, 818], [638, 814], [640, 830], [652, 836],
    [644, 850], [654, 862], [640, 868], [642, 884], [626, 882], [616, 894], [604, 884], [590, 888], [580, 876]]);
  return [
    // le lion couché en bas à droite : l'aile dressée, la tête à crinière tournée vers son livre, la queue relevée
    poly([[646, 868], [654, 846], [668, 826], [686, 810], [706, 798], [726, 790], [718, 804], [732, 808], [712, 820],
      [724, 828], [704, 836], [714, 846], [694, 852], [700, 864], [680, 866], [676, 878]]),
    blob([[604, 862], [632, 854], [664, 860], [700, 866], [728, 872], [742, 888], [740, 906], [700, 910], [650, 910],
      [610, 908], [598, 892]]),
    mane,
    blob([[560, 858], [574, 848], [590, 852], [594, 878], [580, 890], [564, 882]]),
    line([[742, 892], [756, 870], [758, 848], [756, 832]], 14),
    ellipse(756, 822, 9, 12),
    book([[520, 884], [570, 872], [584, 900], [532, 910]], [[545, 878], [558, 905]], [
      poly([[512, 912], [764, 912], [764, 932], [512, 932]]),
    ]),
    // la patte avant posée sur le livre
    limb(604, 898, 9, 574, 896, 8),
  ];
}

export function draw() {
  return [
    // Anubis à tête de chacal, qui remonte le flanc droit de la roue : la cape étalée sous la roue, le corps, la tête
    // aux oreilles dressées et au long museau ; la roue le recouvre, détachée de lui par la découpe qui suit
    blob([[704, 568], [722, 590], [722, 614], [714, 640], [698, 666], [676, 690], [654, 712], [636, 732], [604, 750],
      [570, 768], [552, 776], [520, 762], [470, 748], [420, 738], [372, 733], [410, 716], [460, 700], [540, 670],
      [620, 610], [670, 560], [690, 548]]),
    poly([[698, 556], [692, 532], [690, 508], [688, 486], [698, 496], [708, 510], [714, 504], [724, 488], [730, 478],
      [731, 500], [729, 522], [737, 538], [746, 560], [754, 584], [758, 600], [748, 604], [736, 594], [724, 586],
      [712, 588], [704, 576]]),
    // le sphinx assis sur la roue : le buste, la croupe de lion à droite, les pattes sur la roue, la queue qui
    // s'enroule
    blob([[452, 262], [520, 262], [540, 270], [557, 286], [568, 306], [574, 328], [573, 348], [552, 356], [520, 357],
      [480, 357], [452, 356], [446, 344], [450, 316], [450, 290], [448, 272]]),
    line([[565, 336], [588, 340], [604, 350], [608, 362], [601, 370]], 16),
    // la coiffe à pans, en trapèze au sommet aplati, plus large que les épaules sur lesquelles elle tombe : c'est elle
    // qui fait le sphinx. Le visage au menton pointu s'y découpe, et les deux pans restent séparés sous le menton
    poly([[462, 154], [472, 147], [486, 144], [500, 147], [510, 154], [518, 170], [526, 192], [534, 216], [542, 238],
      [548, 250], [424, 250], [430, 238], [438, 216], [446, 192], [454, 170]]),
    cut({ ...FACE, grow: 20 }),
    FACE,
    // la roue, détachée de tout ce qui la touche ; ses cercles et ses rayons sont des rainures découpées, sans les
    // lettres ni les signes alchimiques de la carte
    cut(circle(...WHEEL, RIM + 10)),
    circle(...WHEEL, RIM),
    cut(ring(...WHEEL, 121, 14)),
    cut(ring(...WHEEL, 39, 14)),
    Array.from({ length: 8 }, (_, k) => {
      const a = (k * Math.PI) / 4;
      const at = (r) => [WHEEL[0] + r * Math.cos(a), WHEEL[1] + r * Math.sin(a)];
      return cut(line([at(39), at(121)], 14));
    }),
    // le serpent qui glisse le long du flanc gauche
    snake(),
    angel(),
    eagle(),
    bull(),
    lion(),
    // l'épée du sphinx, levée devant son épaule : la lame et la garde détachées de lui, la poignée et le pommeau
    // fondus dans la main
    cut({ ...BLADE, grow: 20 }),
    cut({ ...CROSS, width: 14 + 20 }),
    BLADE,
    CROSS,
    line([GUARD_AT, along(-32, 0)], 14),
    circle(...along(-40, 0), 10),
    ellipse(...along(-14, 0), 15, 13, (Math.atan2(D[1], D[0]) * 180) / Math.PI),
  ];
}

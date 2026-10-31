// Le Chariot (The Chariot, VII), d'après la carte de Pamela Colman Smith, 1909 : le conducteur en armure debout dans le char carré sous son dais, la baguette en main, la couronne à l'étoile, les deux sphinx couchés devant, les roues.
import { blob, circle, cut, ellipse, line, poly } from '../kit/silhouettes/lib.mjs';

const rad = (d) => (d * Math.PI) / 180;

// la marge qui détache une forme de ce qui est derrière elle
const halo = (s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 });

// le reflet d'une liste de points autour de l'axe du char
const mirror = (pts) => pts.map(([x, y]) => [1000 - x, y]);

// l'étoile à huit branches de la couronne
const star = (cx, cy, r1, r2) => poly(Array.from({ length: 16 }, (_, i) => {
  const a = rad(-90 + i * 22.5);
  const r = i % 2 ? r2 : r1;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}));

// un croissant de lune, cornes en l'air, entre deux demi-ellipses (l'épaulette)
function crescent(cx, cy) {
  const outer = Array.from({ length: 25 }, (_, i) => [cx + 50 * Math.cos(rad(i * 7.5)), cy + 2 + 44 * Math.sin(rad(i * 7.5))]);
  const inner = Array.from({ length: 25 }, (_, i) => [cx + 44 * Math.cos(rad(180 - i * 7.5)), cy + 18 * Math.sin(rad(180 - i * 7.5))]);
  return poly([...outer, ...inner]);
}

// une roue vue de côté, comme le jeu de Marseille les montre au flanc du char (la carte de 1909 ne les montre
// que de face, en planches, qui ne se liraient pas comme des roues) : la jante, le moyeu, six rayons
function wheel(cx, cy) {
  return [
    circle(cx, cy, 56),
    cut(circle(cx, cy, 42)),
    circle(cx, cy, 13),
    ...[0, 1, 2, 3, 4, 5].map((i) => line([[cx, cy], [cx + 48 * Math.cos(rad(30 + i * 60)), cy + 48 * Math.sin(rad(30 + i * 60))]], 14)),
  ];
}

// un sphinx couché, celui de gauche ; celui de droite en est le reflet. Derrière, le corps de lion couché de
// profil : le poitrail, les pattes de devant allongées au sol (une fente les sépare du poitrail), le dos, la croupe
// et la cuisse repliée. Devant, détachée du corps par une marge pour que le menton se lise entre les pans, la tête
// de face sous le némès, qui s'évase sous les oreilles et retombe en pans rayés
const BODY = [[290, 740], [338, 730], [400, 738], [420, 760], [440, 772], [458, 762], [474, 760], [486, 776],
  [494, 806], [494, 846], [490, 884], [494, 906], [488, 922], [470, 926], [400, 926], [330, 926], [300, 924],
  [262, 924], [240, 922], [228, 914], [226, 902], [232, 890], [246, 882], [268, 880], [270, 850], [272, 810],
  [280, 770]];
const LEG = [[264, 880], [330, 882]];
const THIGH = [[432, 906], [436, 880], [450, 852], [470, 838]];
const NEMES = [[338, 612], [362, 615], [380, 626], [386, 644], [386, 668], [398, 684], [412, 700], [418, 716],
  [418, 742], [416, 768], [408, 790], [388, 792], [378, 772], [360, 764], [338, 768], [316, 764], [298, 772],
  [288, 792], [268, 790], [260, 768], [258, 742], [258, 716], [264, 700], [278, 684], [290, 668], [290, 644],
  [296, 626], [314, 615]];
const STRIPES = [[[309, 640], [367, 640]], [[309, 660], [367, 660]], [[278, 724], [298, 724]], [[278, 752], [298, 752]],
  [[378, 724], [398, 724]], [[378, 752], [398, 752]]];
// la queue, au seul sphinx blanc comme sur la carte : relevée derrière la croupe, la touffe tournée vers la tête
const TAIL = [[484, 790], [492, 756], [488, 728], [470, 714]];

function sphinx(flip) {
  const f = (pts) => (flip ? mirror(pts) : pts);
  const body = [blob(f(BODY))];
  if (flip) body.push(line(f(TAIL), 14), ellipse(...f([[458, 714]])[0], 13, 9));
  const head = blob(f(NEMES));
  return [
    ...body.map(halo),
    ...body,
    cut(line(f(LEG), 10)),
    cut(line(f(THIGH), 10)),
    halo(head),
    head,
    ...STRIPES.map((s) => cut(line(f(s), 10))),
  ];
}

export function draw() {
  // le conducteur : la tête bouclée sous la couronne, l'étoile qui la surmonte, les croissants sur les épaules,
  // la cuirasse, et les bras, l'un tenant la baguette, l'autre posé sur le rebord du char
  const driver = [
    blob([[440, 304], [497, 300], [554, 304], [590, 322], [600, 350], [596, 400], [592, 440], [596, 470], [596, 545],
      [404, 545], [404, 470], [408, 440], [404, 400], [400, 350], [410, 322]]),
    blob([[385, 322], [408, 330], [404, 400], [390, 440], [376, 480], [366, 510], [340, 512], [334, 470], [338, 420],
      [352, 370], [366, 336]]),
    blob(mirror([[385, 322], [408, 330], [404, 400], [390, 440], [376, 480], [366, 510], [340, 512], [334, 470], [338, 420],
      [352, 370], [366, 336]])),
    crescent(390, 288),
    crescent(610, 288),
    poly([[484, 288], [512, 288], [514, 312], [482, 312]]),
    blob([[498, 206], [524, 210], [544, 222], [554, 244], [556, 266], [546, 284], [530, 290], [514, 284], [498, 296],
      [482, 284], [466, 290], [450, 284], [440, 266], [442, 244], [452, 222], [472, 210]]),
    poly([[450, 228], [452, 212], [462, 198], [472, 210], [498, 208], [524, 210], [534, 198], [544, 212], [546, 228]]),
    star(498, 180, 32, 16),
  ];
  // la baguette, tenue de biais dans la main droite, sa pointe en fer de lance
  const wand = [line([[356, 540], [327, 300]], 14), blob([[318, 276], [328, 290], [332, 306], [322, 316], [312, 306], [312, 290]])];
  return [
    // les roues au flanc du char, derrière tout
    ...wheel(282, 604),
    ...wheel(718, 604),
    // le dais : la frange relevée au milieu en deux festons, et les tentures qui pendent aux coins ; ses étoiles
    // brodées sont laissées de côté
    blob([[306, 110], [694, 110], [694, 150], [682, 180], [640, 192], [590, 196], [550, 182], [520, 158], [500, 144],
      [480, 158], [450, 182], [410, 196], [360, 192], [318, 180], [306, 150]], 0.7),
    blob([[318, 140], [372, 140], [374, 170], [366, 212], [356, 248], [344, 264], [332, 258], [324, 230], [320, 190]]),
    blob(mirror([[318, 140], [372, 140], [374, 170], [366, 212], [356, 248], [344, 264], [332, 258], [324, 230], [320, 190]])),
    // le conducteur debout, devant le dais ; la ceinture découpée sépare la cuirasse de la jupe
    ...driver.map(halo),
    ...driver,
    cut(line([[422, 470], [578, 470]], 10)),
    // la caisse du char et son rebord, posés après la marge du conducteur pour qu'il s'y tienne debout, et le
    // disque ailé découpé sur sa face
    poly([[344, 538], [656, 538], [662, 556], [338, 556]]),
    poly([[350, 550], [650, 550], [650, 800], [350, 800]]),
    cut(circle(500, 612, 14)),
    ...[false, true].map((flip) => cut(poly((flip ? mirror : (p) => p)([[488, 606], [470, 596], [446, 590], [420, 590],
      [396, 598], [418, 608], [404, 618], [432, 620], [420, 630], [456, 628], [488, 622]])))),
    // la baguette passe devant la manche : une marge la détache, puis les poings la reprennent, posés sur le rebord
    ...wand.map(halo),
    ...wand,
    circle(352, 526, 17),
    circle(632, 526, 17),
    // les deux sphinx couchés devant le char, le noir à gauche, le blanc à droite ; le sol est posé après leur marge
    ...sphinx(false),
    ...sphinx(true),
    poly([[236, 918], [764, 918], [764, 937], [236, 937]]),
  ];
}

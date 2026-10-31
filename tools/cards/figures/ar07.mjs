// Le Chariot (The Chariot, VII), d'après la carte de Pamela Colman Smith, 1909 : le conducteur en armure debout dans le char carré sous son dais, la baguette en main, la couronne à l'étoile, les deux sphinx couchés devant, les roues.
import { blob, circle, cut, line, poly } from '../kit/silhouettes/lib.mjs';

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

// un sphinx couché, celui de gauche ; celui de droite en est le reflet. Ils sont de profil et se font face, alors que
// la carte les montre de face : de face, une tête sous le némès posée sur un corps couché ne se lit pas en silhouette,
// de profil le sphinx se reconnaît d'emblée. Le corps de lion, la cuisse repliée marquée d'une fente, les pattes de
// devant allongées vers le milieu ; la tête humaine, le nez et le menton en avant, sous le némès qui s'évase derrière
// la tête jusqu'aux épaules, ses rayures découpées, le pan de devant tombant sur le poitrail
const BODY = [[232, 812], [270, 800], [315, 796], [360, 798], [395, 806], [415, 826], [425, 856], [432, 880],
  [470, 886], [490, 894], [494, 910], [486, 921], [410, 921], [300, 921], [232, 921], [213, 910], [206, 880],
  [212, 840]];
const HEAD = [[386, 688], [404, 680], [422, 684], [432, 696], [434, 708], [438, 722], [446, 736], [437, 741],
  [440, 750], [433, 761], [422, 765], [420, 772], [426, 800], [428, 830], [410, 832], [404, 800], [398, 790],
  [372, 798], [366, 770], [372, 730], [378, 704]];
const THIGH = [[300, 921], [284, 884], [262, 862], [236, 854]];
const STRIPES = [714, 740, 766].map((y) => [[360, y], [402, y]]);
// la tête agrandie autour du cou : à la taille du corps, le visage et les rayures se perdaient
const big = (pts) => pts.map(([x, y]) => [405 + (x - 405) * 1.3, 805 + (y - 805) * 1.3]);

function sphinx(flip) {
  const f = (pts) => (flip ? mirror(pts) : pts);
  const body = blob(f(BODY));
  const head = blob(f(big(HEAD)));
  return [
    halo(body),
    halo(head),
    body,
    head,
    cut(line(f(THIGH), 10)),
    ...STRIPES.map((s) => cut(line(f(big(s)), 12))),
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
    // les roues au flanc du char, derrière tout, au niveau de la caisse
    ...wheel(296, 640),
    ...wheel(704, 640),
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
    // disque ailé découpé sur sa face ; la face s'arrête au-dessus des sphinx, pour que leurs dos de lion se
    // détachent sur le fond au lieu de se fondre dans la caisse
    poly([[344, 538], [656, 538], [662, 556], [338, 556]]),
    poly([[350, 550], [650, 550], [650, 700], [350, 700]]),
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
    poly([[200, 918], [800, 918], [800, 937], [200, 937]]),
  ];
}

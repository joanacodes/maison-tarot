// La Force (Strength, VIII), d'après la carte de Pamela Colman Smith, 1909 : la femme en longue robe penchée sur le lion, les mains sur ses mâchoires, le signe de l'infini au-dessus de sa tête, le lion à la crinière et à la queue.
import { blob, circle, cut, ellipse, line, poly } from '../kit/silhouettes/lib.mjs';

const rad = (d) => (d * Math.PI) / 180;

// la marge qui détache une forme de ce qui est derrière elle
const halo = (s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 });

// le signe de l'infini, un huit couché tracé d'un seul trait, penché comme sur la carte ; ses deux boucles
// gardent un vrai jour au milieu, assez large pour survivre aux huit dessins
function lemniscate(cx, cy, a, b, deg) {
  const [c, s] = [Math.cos(rad(deg)), Math.sin(rad(deg))];
  const pts = Array.from({ length: 73 }, (_, i) => {
    const t = (i * Math.PI) / 36;
    const [u, v] = [a * Math.cos(t), (b / 2) * Math.sin(2 * t)];
    return [cx + u * c - v * s, cy + u * s + v * c];
  });
  return line(pts, 15);
}

// une ligne brisée recoupée en pas réguliers, puis hérissée de mèches inégales : la crinière (repris du lion
// d'Héraclès des silhouettes de The Astro Study)
function dense(list, step) {
  const out = [list[0]];
  for (let i = 1; i < list.length; i += 1) {
    const [x1, y1] = list[i - 1];
    const [x2, y2] = list[i];
    const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / step));
    for (let j = 1; j <= n; j += 1) out.push([x1 + ((x2 - x1) * j) / n, y1 + ((y2 - y1) * j) / n]);
  }
  return out;
}
function tufts(list, depth, sweep) {
  const out = [];
  for (let i = 0; i < list.length - 1; i += 1) {
    const [x1, y1] = list[i];
    const [x2, y2] = list[i + 1];
    const d = Math.hypot(x2 - x1, y2 - y1);
    const [tx, ty] = [(x2 - x1) / d, (y2 - y1) / d];
    const h = depth * (1 + 0.35 * Math.sin(i * 2.3));
    out.push([x1, y1], [(x1 + x2) / 2 + ty * h + tx * sweep, (y1 + y2) / 2 - tx * h + ty * sweep]);
  }
  out.push(list[list.length - 1]);
  return out;
}

export function draw() {
  // la femme penchée : la tête inclinée vers le lion sous sa couronne de fleurs, le dos arrondi de la robe, la
  // manche de gauche, gonflée, qui descend jusqu'au museau, la jupe qui tombe jusqu'au sol derrière la crinière ;
  // la guirlande de fleurs, qui ne serait qu'une bosse de plus sur la robe, est laissée de côté
  const woman = [
    ...[[344, 286], [362, 268], [386, 260], [410, 264], [428, 280]].map(([x, y]) => circle(x, y, 10)),
    blob([[338, 300], [350, 278], [372, 264], [398, 262], [418, 272], [430, 292], [428, 316], [418, 338], [404, 356],
      [390, 370], [372, 378], [360, 372], [350, 364], [344, 356], [338, 348], [332, 340], [334, 330], [334, 316]]),
    blob([[402, 350], [424, 306], [452, 300], [490, 314], [524, 338], [556, 372], [582, 414], [598, 462], [606, 512],
      [612, 560], [612, 640], [560, 660], [480, 640], [420, 600], [380, 570], [340, 572], [326, 560], [334, 530],
      [340, 500], [342, 450], [350, 410], [366, 388], [384, 380]]),
    blob([[352, 560], [382, 592], [400, 640], [404, 720], [410, 800], [420, 862], [332, 862], [320, 800], [314, 720],
      [314, 640], [318, 590], [328, 560]]),
  ];
  // la main qui tient la mâchoire du lion, les doigts allongés dessous, devant la crinière et devant sa propre
  // jupe : une marge la détache des deux, puis l'avant-bras la rattache à la manche (la jupe tient au buste par le
  // bord de la hanche) ; l'autre main, posée sur le haut de la tête, reste dans la masse de la robe
  const hand = blob([[350, 562], [366, 560], [382, 568], [396, 580], [402, 592], [396, 600], [380, 598], [364, 594], [350, 586], [346, 574]]);
  // le lion, la tête levée vers elle, gueule ouverte : le corps, la patte de devant qui sort sous la crinière, la
  // crinière hérissée, la tête
  const mane = [[466, 506], [500, 506], [530, 522], [552, 552], [564, 592], [568, 640], [562, 690], [548, 740],
    [528, 784], [496, 814], [458, 830], [420, 828], [396, 808], [386, 770], [386, 720], [392, 672], [404, 638],
    [430, 636]];
  const lion = [
    blob([[540, 600], [574, 586], [610, 578], [650, 580], [690, 576], [726, 568], [752, 578], [768, 604], [772, 640],
      [770, 682], [760, 720], [752, 756], [756, 800], [768, 836], [772, 862], [726, 862], [722, 832], [712, 796],
      [700, 760], [684, 734], [650, 722], [610, 718], [578, 726], [560, 752], [554, 800], [554, 862], [502, 862],
      [502, 820], [496, 780], [480, 740]]),
    blob([[424, 780], [462, 778], [466, 820], [470, 850], [474, 864], [416, 864], [418, 840], [422, 810]]),
    blob(tufts(dense(mane, 16), 10, 3), 0.8),
    blob([[388, 552], [396, 536], [414, 524], [440, 516], [468, 514], [492, 520], [510, 536], [518, 560], [514, 590],
      [500, 612], [478, 626], [452, 632], [430, 626], [414, 612], [402, 596], [394, 582], [390, 568]]),
  ];
  // la queue, posée sur le flanc, sa touffe entre les pattes
  const tail = [line([[732, 574], [706, 600], [688, 636], [682, 676], [670, 712], [648, 744], [628, 764]], 14),
    ellipse(614, 778, 17, 12, -35)];
  return [
    // le signe de l'infini au-dessus de sa tête
    lemniscate(312, 228, 60, 48, -27),
    ...woman,
    // le bord intérieur de la manche de gauche, fendu dans la robe, qui fait lire le bras descendant vers le museau
    cut(line([[412, 404], [404, 450], [398, 496], [394, 524]], 10)),
    // le lion devant elle : une marge les sépare là où ses mains et sa jupe le touchent ; le sol est posé après,
    // pour que les pattes et l'ourlet y tiennent
    ...lion.map(halo),
    poly([[240, 860], [760, 860], [760, 912], [240, 912]]),
    ...lion,
    // la gueule ouverte, et le bord de la tête dans la crinière
    cut(poly([[378, 557], [432, 566], [378, 582]])),
    cut(line([[480, 516], [510, 538], [522, 570], [512, 602], [490, 624]], 10)),
    ...tail.map(halo),
    ...tail,
    halo(hand),
    line([[356, 530], [358, 568]], 18),
    hand,
  ];
}

// La Tour (The Tower, XVI), d'après la carte de Pamela Colman Smith, 1909 : la haute tour sur son pic rocheux frappée par la foudre, sa couronne arrachée, les flammes à ses fenêtres, deux hommes qui tombent la tête la première.
import { blob, circle, cut, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const rad = (d) => (d * Math.PI) / 180;

// des points dessinés autour de (0, 0), tournés de deg et posés en (x, y)
const place = (points, x, y, deg = 0) => points.map(([u, v]) => [x + u * Math.cos(rad(deg)) - v * Math.sin(rad(deg)),
  y + u * Math.sin(rad(deg)) + v * Math.cos(rad(deg))]);

// ce qui passe devant une autre forme en est détaché par une marge : son contour grossi de g / 2 tout autour est ôté
// de ce qui est dessous, puis la forme est dessinée
const gap = (shapes, g = 20) => [shapes].flat(Infinity)
  .map((s) => cut(s.stroke ? { ...s, width: s.width + g } : { ...s, grow: (s.grow ?? 0) + g }));

// un membre de demi-largeurs égales des deux côtés, de jointure en jointure
const limbOf = (joints, ...widths) => member(joints, widths.map((seg) => seg.map(([t, w]) => [t, w, w])), 1);

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

// la foudre : une bande en zigzag aux angles vifs, de la demi-largeur w0 à w1 au bout qui frappe ; l'onglet de chaque
// angle est borné pour que les angles aigus ne lancent pas de pointes démesurées
function bolt(points, w0, w1) {
  const n = points.length;
  const w = (i) => w0 + ((w1 - w0) * i) / (n - 1);
  const unit = ([ax, ay], [bx, by]) => {
    const d = Math.hypot(bx - ax, by - ay);
    return [(bx - ax) / d, (by - ay) / d];
  };
  const left = [];
  const right = [];
  points.forEach(([x, y], i) => {
    const dirs = [i > 0 && unit(points[i - 1], points[i]), i < n - 1 && unit(points[i], points[i + 1])].filter(Boolean);
    const normals = dirs.map(([dx, dy]) => [-dy, dx]);
    const sum = normals.reduce(([a, b], [c, d]) => [a + c, b + d], [0, 0]);
    const len = Math.hypot(...sum);
    const m = [sum[0] / len, sum[1] / len];
    const reach = Math.min(w(i) / Math.max(m[0] * normals[0][0] + m[1] * normals[0][1], 0.25), 2.2 * w(i));
    left.push([x + m[0] * reach, y + m[1] * reach]);
    right.push([x - m[0] * reach, y - m[1] * reach]);
  });
  return poly([...left, ...right.reverse()]);
}

// une goutte de feu qui tombe (un yod) : pointue d'un bout, ronde de l'autre, penchée de deg
const drop = (x, y, deg) => blob(place([[0, -18], [9, -3], [11, 8], [0, 15], [-11, 8], [-9, -3]], x, y, deg));

export function draw() {
  // la tour, un peu plus large au pied, assise sur le pic
  const tower = poly([[430, 248], [556, 248], [560, 400], [566, 560], [576, 724], [398, 724], [412, 560], [422, 400]]);
  // le pic rocheux, ses crêtes au pied de la tour et ses pentes cassées jusqu'au bas de l'image
  const rock = poly([[394, 730], [410, 714], [426, 724], [446, 700], [462, 716], [480, 704], [500, 724], [520, 708],
    [540, 726], [562, 704], [580, 718], [600, 730], [616, 756], [622, 790], [640, 806], [650, 842], [666, 862],
    [676, 900], [700, 934], [340, 934], [352, 898], [364, 872], [360, 838], [372, 812], [376, 778], [386, 756]]);
  // les fenêtres découpées ; au-dessus des deux plus basses, le feu qui en sort, découpé lui aussi : deux langues
  // inégales qui s'évasent plus large que la fenêtre et lèchent le mur
  const windows = [
    poly([[466, 334], [466, 286], [483, 270], [500, 286], [500, 334]]),
    poly([[442, 466], [442, 404], [436, 390], [434, 372], [440, 356], [436, 340], [452, 354], [456, 364], [460, 346],
      [464, 330], [472, 348], [480, 366], [478, 388], [474, 404], [474, 466]]),
    poly([[498, 460], [498, 404], [494, 390], [494, 372], [500, 356], [498, 342], [512, 354], [516, 362], [520, 344],
      [526, 328], [532, 348], [536, 366], [532, 388], [526, 404], [526, 460]]),
  ];
  // le feu qui jaillit du sommet ouvert : trois langues inégales à gauche, et le panache qui part vers la droite
  const fire = [
    poly([[426, 254], [418, 236], [406, 216], [410, 194], [422, 208], [432, 222], [436, 200], [442, 180], [446, 164],
      [458, 184], [464, 210], [472, 196], [482, 182], [490, 204], [496, 230], [500, 254]]),
    poly([[540, 254], [548, 238], [566, 226], [592, 210], [586, 232], [606, 228], [628, 218], [620, 240], [642, 242],
      [660, 250], [640, 262], [614, 270], [588, 276], [562, 276], [548, 268]]),
  ];
  // la couronne de la tour, arrachée et renversée vers la gauche, ses pointes en l'air
  const crown = [
    poly(place([[-46, 0], [46, 0], [50, -56], [26, -32], [0, -62], [-26, -32], [-50, -56]], 402, 182, -45)),
    ...place([[-51, -64], [0, -71], [51, -64]], 402, 182, -45).map(([x, y]) => circle(x, y, 9)),
  ];

  // l'homme qui tombe à gauche, la tête la première : les jambes écartées en l'air, le manteau qui vole au-dessus de
  // ses épaules, les bras tendus vers le sol ; la tête, entre les bras, en est détachée pour rester lisible
  const leftMan = [
    blob([[332, 588], [306, 584], [280, 572], [254, 552], [240, 524], [248, 496], [264, 474], [282, 488], [300, 498],
      [322, 508], [346, 524], [364, 548]]),
    limbOf([[382, 524], [370, 466], [356, 414]], [[0, 13], [1, 12]], [[0, 12], [1, 10]]),
    blob([[344, 418], [344, 398], [352, 388], [364, 394], [366, 414]]),
    limbOf([[368, 530], [336, 494], [314, 458]], [[0, 13], [1, 12]], [[0, 12], [1, 10]]),
    blob([[302, 462], [300, 444], [310, 434], [324, 440], [324, 456]]),
    limbOf([[380, 524], [330, 600]], [[0, 22], [1, 25]]),
    limbOf([[310, 590], [268, 640], [246, 714]], [[0, 12], [1, 11]], [[0, 11], [1, 10]]),
    circle(244, 722, 12),
    limbOf([[350, 612], [360, 668], [366, 718]], [[0, 12], [1, 11]], [[0, 11], [1, 10]]),
    circle(366, 726, 12),
  ];
  const leftHead = [limbOf([[328, 602], [314, 618]], [[0, 12], [1, 12]]), circle(308, 636, 21)];
  // l'homme couronné qui tombe à droite : les jambes en l'air, celle qui touche la tour assez loin de la fenêtre pour
  // ne pas en manger le mur, la robe large qui retombe vers les épaules, les bras tendus vers le sol ; la tête
  // renversée et sa couronne, détachées de même
  const rightMan = [
    limbOf([[602, 546], [584, 500], [568, 458]], [[0, 14], [1, 13]], [[0, 13], [1, 11]]),
    blob([[556, 462], [552, 442], [562, 430], [576, 436], [580, 456]]),
    limbOf([[626, 540], [626, 496], [628, 458]], [[0, 14], [1, 13]], [[0, 13], [1, 11]]),
    blob([[616, 460], [616, 438], [628, 430], [640, 438], [640, 458]]),
    blob([[584, 540], [610, 526], [640, 534], [668, 572], [700, 614], [716, 646], [700, 664], [672, 668], [648, 666],
      [624, 650], [604, 614], [590, 578]]),
    limbOf([[650, 650], [636, 700], [628, 740]], [[0, 12], [1, 11]], [[0, 11], [1, 10]]),
    circle(628, 748, 12),
    limbOf([[694, 644], [720, 688], [736, 722]], [[0, 12], [1, 11]], [[0, 11], [1, 10]]),
    circle(738, 730, 12),
  ];
  const rightHead = [circle(670, 684, 22),
    poly(place([[-24, 0], [24, 0], [26, -26], [12, -14], [0, -30], [-12, -14], [-26, -26]], 670, 700, 180))];

  return [
    // quelques gouttes de feu qui tombent, de part et d'autre (la carte en sème une vingtaine)
    drop(226, 420, -20), drop(214, 534, 15), drop(222, 650, -10),
    drop(700, 244, 20), drop(746, 282, -15), drop(662, 308, 10), drop(728, 344, -25),
    // la foudre qui descend du coin du ciel en zigzag et frappe le sommet
    bolt([[744, 62], [742, 180], [654, 100], [610, 190], [574, 152], [524, 240]], 19, 6),
    crown,
    rock,
    tower,
    fire,
    windows.map(cut),
    // les failles du rocher, inégales, qui le distinguent de la tour qu'il porte
    [[[412, 760], [404, 820], [410, 872]], [[456, 748], [462, 800], [452, 860], [458, 912]], [[506, 752], [500, 812],
      [508, 880]], [[552, 750], [560, 820], [554, 902]], [[600, 772], [612, 832], [622, 904]]]
      .map((p) => cut(line(curve(p), 10))),
    gap([leftMan, leftHead]),
    leftMan,
    gap(leftHead),
    leftHead,
    gap([rightMan, rightHead]),
    rightMan,
    gap(rightHead),
    rightHead,
  ];
}

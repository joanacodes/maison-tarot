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

// une langue de feu ou une goutte de flamme (un yod) : pointue en haut, ronde en bas
const drop = (x, y, k = 1) => blob(place([[0, -18], [9, -3], [11, 8], [0, 15], [-11, 8], [-9, -3]], x, y).map(
  ([u, v]) => [x + (u - x) * k, y + (v - y) * k]));

export function draw() {
  // la tour, un peu plus large au pied, assise sur le pic
  const tower = poly([[430, 248], [556, 248], [560, 400], [566, 560], [576, 724], [398, 724], [412, 560], [422, 400]]);
  // le pic rocheux, ses crêtes au pied de la tour et ses pentes jusqu'au bas de l'image
  const rock = blob([[392, 728], [418, 712], [444, 724], [470, 704], [496, 726], [522, 712], [550, 730], [576, 710],
    [602, 728], [628, 764], [652, 816], [676, 872], [700, 932], [340, 932], [352, 872], [368, 812], [382, 760]]);
  // les fenêtres découpées, et le feu qui en sort en langues découpées elles aussi au-dessus de chacune
  const windows = [
    poly([[466, 334], [466, 286], [483, 270], [500, 286], [500, 334]]),
    poly([[442, 462], [442, 410], [458, 396], [474, 410], [474, 462]]),
    blob([[446, 404], [444, 384], [450, 368], [456, 352], [462, 370], [470, 380], [472, 404]]),
    poly([[498, 456], [498, 406], [511, 394], [524, 406], [524, 456]]),
    blob([[501, 400], [500, 380], [506, 364], [512, 348], [518, 366], [524, 378], [522, 400]]),
  ];
  // le feu qui jaillit du sommet ouvert, ses langues à gauche et le panache qui part vers la droite
  const fire = [
    blob([[432, 252], [428, 228], [422, 204], [424, 188], [440, 206], [452, 226], [460, 252]]),
    blob([[464, 252], [462, 222], [468, 196], [474, 178], [486, 200], [492, 226], [494, 252]]),
    blob([[546, 252], [558, 236], [580, 228], [602, 222], [604, 236], [626, 234], [644, 240], [632, 252], [656, 266],
      [634, 274], [608, 278], [582, 280], [558, 278]]),
  ];
  // la couronne de la tour, arrachée et renversée vers la gauche, ses pointes en l'air
  const crown = [
    poly(place([[-46, 0], [46, 0], [50, -56], [26, -32], [0, -62], [-26, -32], [-50, -56]], 402, 182, -45)),
    ...place([[-51, -64], [0, -71], [51, -64]], 402, 182, -45).map(([x, y]) => circle(x, y, 9)),
  ];

  // l'homme qui tombe à gauche, la tête la première, les jambes en l'air, le manteau qui vole au-dessus de lui
  const left = [
    blob([[326, 600], [312, 560], [306, 520], [286, 488], [258, 470], [252, 496], [240, 520], [252, 548], [236, 576],
      [252, 604], [274, 626], [296, 618]]),
    limbOf([[382, 522], [364, 462], [354, 410]], [[0, 13], [1, 12]], [[0, 11], [1, 9]]),
    blob([[342, 414], [340, 396], [348, 384], [360, 390], [362, 410]]),
    limbOf([[368, 528], [338, 484], [320, 450]], [[0, 13], [1, 12]], [[0, 11], [1, 9]]),
    blob([[308, 454], [304, 436], [312, 426], [326, 430], [328, 448]]),
    limbOf([[378, 528], [320, 608]], [[0, 22], [1, 24]]),
    circle(294, 640, 22),
    limbOf([[308, 612], [274, 668], [246, 724]], [[0, 11], [1, 10]], [[0, 10], [1, 9]]),
    circle(242, 732, 11),
    limbOf([[334, 616], [346, 672], [356, 724]], [[0, 11], [1, 10]], [[0, 10], [1, 9]]),
    circle(358, 732, 11),
  ];
  // l'homme couronné qui tombe à droite, sa robe encore contre la tour, la couronne au bas de sa tête renversée
  const right = [
    blob([[540, 444], [562, 430], [590, 444], [618, 472], [644, 512], [672, 560], [700, 610], [708, 640], [690, 660],
      [656, 662], [630, 640], [604, 600], [580, 556], [558, 512], [544, 476]]),
    blob([[540, 446], [542, 424], [554, 414], [564, 428], [560, 450]]),
    blob([[590, 470], [594, 448], [606, 442], [614, 456], [608, 476]]),
    circle(668, 682, 23),
    poly(place([[-24, 0], [24, 0], [26, -26], [12, -14], [0, -30], [-12, -14], [-26, -26]], 668, 700, 180)),
    limbOf([[648, 652], [636, 700], [628, 742]], [[0, 11], [1, 10]], [[0, 10], [1, 9]]),
    circle(628, 750, 11),
    limbOf([[696, 644], [720, 688], [736, 722]], [[0, 11], [1, 10]], [[0, 10], [1, 9]]),
    circle(738, 730, 11),
  ];

  return [
    // quelques gouttes de feu qui tombent, de part et d'autre (la carte en sème une vingtaine)
    drop(226, 420), drop(214, 532), drop(224, 652),
    drop(700, 244), drop(746, 280), drop(662, 306), drop(726, 342),
    // la foudre qui descend du coin du ciel en zigzag et frappe le sommet
    bolt([[744, 62], [742, 180], [654, 100], [610, 190], [574, 152], [524, 240]], 14, 4),
    crown,
    rock,
    tower,
    fire,
    windows.map(cut),
    // les failles du rocher, qui le distinguent de la tour qu'il porte
    [[[384, 790], [378, 850], [382, 912]], [[430, 766], [426, 840], [430, 912]], [[482, 760], [486, 836], [480, 912]],
      [[538, 766], [534, 840], [540, 912]], [[592, 772], [602, 846], [608, 912]]].map((p) => cut(line(curve(p), 10))),
    gap(left),
    left,
    gap(right),
    right,
  ];
}

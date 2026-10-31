// Le Diable (The Devil, XV), d'après la carte de Pamela Colman Smith, 1909 : le diable cornu aux ailes de chauve-souris perché sur son socle, la main droite levée, la torche tournée vers le bas, le pentagramme renversé au-dessus de sa tête, l'homme et la femme enchaînés au socle par le cou.
import { blob, circle, cut, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const rad = (d) => (d * Math.PI) / 180;

// ce qui passe devant une autre forme en est détaché par une marge : son contour grossi de g / 2 tout autour est ôté
// de ce qui est dessous, puis la forme est dessinée
const gap = (shapes, g = 20) => [shapes].flat(Infinity)
  .map((s) => cut(s.stroke ? { ...s, width: s.width + g } : { ...s, grow: (s.grow ?? 0) + g }));

// un membre de demi-largeurs égales des deux côtés, de jointure en jointure
const limbOf = (joints, ...widths) => member(joints, widths.map((seg) => seg.map(([t, w]) => [t, w, w])), 1);

// un trait effilé le long d'une courbe, de la demi-largeur w0 au départ à w1 au bout (une corne, une queue)
function taper(points, w0, w1) {
  const n = points.length - 1;
  const w = (k) => w0 + ((w1 - w0) * k) / n;
  return member(points, points.slice(0, -1).map((_, k) => [[0, w(k), w(k)], [0.5, w(k + 0.5), w(k + 0.5)],
    ...(k === n - 1 ? [[1, w1, w1]] : [])]), 1);
}

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

const mirror = (points) => points.map(([x, y]) => [994 - x, y]);

// l'aile gauche, de chauve-souris : le bras qui monte de l'épaule au poignet griffu, puis la membrane tendue entre les
// doigts, creusée en festons d'une pointe à l'autre. La carte la coupe à son cadre : elle déborde ici un peu
const WING = [
  ...curve([[408, 300], [380, 245], [350, 190], [318, 140], [298, 108]]),
  [292, 90], [280, 76], [264, 76], [262, 90], [276, 92], [282, 106],
  ...curve([[270, 116], [238, 146], [210, 186]]),
  ...curve([[210, 186], [234, 236], [196, 292]]).slice(1),
  ...curve([[196, 292], [248, 330], [226, 394]]).slice(1),
  ...curve([[226, 394], [272, 366], [318, 410]]).slice(1),
  ...curve([[318, 410], [352, 372], [394, 372]]).slice(1),
];

// une chaîne : un cordon épais renflé de maillon en maillon, assez gros pour tenir dans les huit dessins
function chainOf(points) {
  const c = curve(points, 10);
  const links = [];
  let run = 0;
  for (let i = 1; i < c.length; i += 1) {
    run += Math.hypot(c[i][0] - c[i - 1][0], c[i][1] - c[i - 1][1]);
    if (run >= 24) {
      links.push(circle(...c[i], 11));
      run = 0;
    }
  }
  return [line(c, 16), ...links];
}

// le pentagramme renversé : une étoile pleine, deux pointes en haut, une en bas, plus grasse que le tracé du
// pentagramme pour que ses pointes tiennent
function star(cx, cy, r) {
  return poly(Array.from({ length: 10 }, (_, k) => {
    const a = rad(90 + 36 * k);
    const d = k % 2 ? 0.45 * r : r;
    return [cx + d * Math.cos(a), cy + d * Math.sin(a)];
  }));
}

export function draw() {
  // le diable : le ventre lourd, les cuisses velues écartées jusqu'aux genoux, les jambes qui redescendent vers les
  // pieds griffus posés sur le socle
  const body = [
    blob([[412, 300], [455, 292], [497, 290], [540, 292], [584, 300], [606, 322], [614, 360], [616, 400], [612, 440],
      [604, 470], [560, 488], [497, 494], [434, 488], [392, 470], [382, 440], [380, 400], [384, 360], [392, 322]]),
    // la toison qui emplit l'entre-jambes jusqu'aux chevilles, comme sur la carte : elle fait des cuisses, des jambes et
    // du ventre une seule masse accroupie, une arche seulement entre les pieds
    blob([[336, 462], [440, 466], [556, 466], [658, 458], [614, 540], [574, 610], [540, 668], [514, 652], [497, 630],
      [480, 652], [454, 668], [420, 610], [380, 540]]),
    limbOf([[452, 478], [322, 474]], [[0, 38], [0.6, 36], [1, 30]]),
    circle(322, 474, 30),
    limbOf([[322, 474], [452, 686]], [[0, 30], [0.5, 24], [1, 18]]),
    blob([[426, 694], [446, 678], [470, 680], [490, 694], [488, 712], [420, 712]]),
    limbOf([[542, 478], [672, 470]], [[0, 38], [0.6, 36], [1, 30]]),
    circle(672, 470, 30),
    limbOf([[672, 470], [542, 686]], [[0, 30], [0.5, 24], [1, 18]]),
    blob(mirror([[426, 694], [446, 678], [470, 680], [490, 694], [488, 712], [420, 712]])),
    // le bras droit levé, coude en bas, la main ouverte, les doigts écartés en V
    limbOf([[418, 320], [350, 398]], [[0, 26], [1, 22]]),
    circle(350, 398, 22),
    limbOf([[350, 398], [318, 268]], [[0, 22], [1, 17]]),
    blob([[296, 272], [290, 250], [296, 228], [318, 222], [338, 228], [344, 250], [338, 272]]),
    limbOf([[304, 232], [296, 186]], [[0, 9], [1, 8]]),
    limbOf([[330, 234], [342, 192]], [[0, 9], [1, 8]]),
    limbOf([[298, 252], [270, 228]], [[0, 9], [1, 7.5]]),
    // le bras gauche qui descend, le poing serré sur la torche tenue la flamme en bas
    limbOf([[590, 322], [668, 440]], [[0, 26], [1, 22]]),
    circle(668, 440, 22),
    limbOf([[668, 440], [730, 540]], [[0, 22], [1, 16]]),
    line([[742, 452], [738, 612]], 18),
    blob([[722, 538], [742, 534], [756, 548], [754, 570], [736, 580], [720, 568]]),
    // la flamme, ses langues qui remontent le long de la torche
    blob([[716, 664], [712, 640], [720, 616], [728, 598], [736, 616], [746, 590], [756, 616], [768, 602], [772, 632],
      [768, 662], [750, 682], [730, 682]]),
  ];
  // la tête de bouc aux oreilles pointues et à la barbe, et les grandes cornes de bélier qui s'enroulent
  const head = [
    blob([[497, 184], [530, 186], [548, 182], [578, 168], [556, 202], [552, 236], [540, 270], [524, 300], [508, 326],
      [497, 342], [486, 326], [470, 300], [454, 270], [442, 236], [438, 202], [416, 168], [446, 182], [464, 186]]),
    taper([[452, 190], [432, 150], [410, 122], [384, 112], [362, 124], [352, 152], [352, 190], [360, 225], [372, 250]], 16, 7),
    taper(mirror([[452, 190], [432, 150], [410, 122], [384, 112], [362, 124], [352, 152], [352, 190], [360, 225], [372, 250]]), 16, 7),
  ];

  // la femme, à gauche : petites cornes, cheveux aux épaules, les bras le long du corps ; sa queue finit en grappe
  const womanTail = [
    taper([[314, 788], [306, 830], [296, 856], [278, 858], [266, 840], [266, 812]], 9, 7),
    circle(258, 790, 10), circle(278, 790, 10), circle(268, 806, 10), circle(268, 774, 10),
  ];
  const woman = [
    blob([[331, 534], [346, 538], [354, 552], [356, 570], [353, 590], [343, 598], [319, 598], [309, 590], [306, 570],
      [308, 552], [316, 538]]),
    taper([[318, 544], [311, 530], [304, 518]], 7.5, 2.5),
    taper([[344, 544], [351, 530], [358, 518]], 7.5, 2.5),
    blob([[331, 598], [352, 602], [368, 610], [372, 632], [366, 662], [362, 690], [370, 720], [374, 748], [368, 790],
      [362, 840], [360, 880], [368, 906], [298, 906], [306, 880], [304, 840], [298, 790], [292, 748], [296, 720],
      [304, 690], [300, 662], [294, 632], [298, 610], [310, 602]]),
    limbOf([[300, 612], [288, 680], [281, 744]], [[0, 12], [1, 11]], [[0, 11], [1, 9]]),
    circle(280, 750, 11),
    limbOf([[364, 612], [376, 680], [384, 744]], [[0, 12], [1, 11]], [[0, 11], [1, 9]]),
    circle(385, 750, 11),
  ];
  // l'homme, à droite : petites cornes, la main droite tendue vers le socle, la gauche sur la hanche ; sa queue
  // finit en flamme
  const manTail = [
    taper([[664, 792], [680, 830], [700, 846], [716, 832], [716, 806]], 9, 7),
    blob([[716, 752], [728, 776], [730, 796], [716, 808], [702, 796], [704, 776]]),
  ];
  const man = [
    blob([[624, 524], [638, 528], [646, 542], [647, 560], [640, 574], [624, 580], [608, 574], [601, 560], [602, 542],
      [610, 528]]),
    taper([[612, 534], [605, 520], [598, 508]], 7.5, 2.5),
    taper([[636, 534], [643, 520], [650, 508]], 7.5, 2.5),
    blob([[624, 580], [650, 596], [676, 604], [686, 624], [680, 656], [670, 690], [674, 730], [672, 780], [666, 840],
      [664, 884], [672, 906], [580, 906], [588, 884], [590, 840], [586, 780], [582, 730], [586, 690], [578, 656],
      [572, 624], [588, 604], [602, 596]]),
    limbOf([[588, 612], [562, 662], [540, 702]], [[0, 13], [1, 11]], [[0, 11], [1, 9]]),
    circle(536, 708, 11),
    limbOf([[680, 612], [712, 650], [672, 700]], [[0, 13], [1, 11]], [[0, 11], [1, 10]]),
  ];
  // les chaînes, du collier de chacun à l'anneau du socle ; le bout qui touche le cou n'en est pas détaché
  const chains = [
    [[480, 792], [454, 790], [430, 774], [414, 744], [404, 700], [396, 655], [384, 622], [366, 606], [348, 598]],
    [[520, 792], [546, 792], [566, 776], [578, 740], [586, 696], [594, 652], [604, 618], [614, 600]],
  ];

  return [
    // les ailes de chauve-souris, derrière tout le reste
    poly(WING),
    poly(mirror(WING)),
    gap([body, head]),
    body,
    gap(head),
    head,
    // le pentagramme au-dessus de la tête, entre les cornes
    star(497, 104, 56),
    // le socle, demi-cube plein sous les pieds du diable
    poly([[447, 700], [553, 700], [553, 908], [447, 908]]),
    womanTail,
    gap(woman),
    woman,
    // l'écart entre les jambes, qui fait deux jambes d'une seule forme
    cut(line([[333, 762], [333, 912]], 10)),
    manTail,
    gap(man),
    man,
    cut(line([[627, 752], [627, 912]], 10)),
    // l'anneau et les chaînes, posés devant tout ce qu'ils croisent
    cut(circle(500, 790, 34)),
    chains.map((c) => gap(chainOf(c.slice(0, -2)))),
    circle(500, 790, 24),
    chains.map(chainOf),
    cut(circle(500, 790, 10)),
    // le sol
    poly([[240, 906], [760, 906], [762, 932], [238, 932]]),
  ];
}

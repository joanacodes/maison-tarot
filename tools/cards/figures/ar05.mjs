// Le Hiérophante (The Hierophant, V), d'après la carte de Pamela Colman Smith, 1909 : le pontife assis entre deux colonnes, la tiare, la main qui bénit, la croix à trois branches, les clés croisées à ses pieds, deux moines tonsurés à genoux, de dos.
import { blob, circle, cut, line, poly } from '../kit/silhouettes/lib.mjs';

// les points d'un cercle, pour le tracer en anneau avec line() (la tonsure, l'anneau d'une clé)
const ring = (cx, cy, r) => Array.from({ length: 41 }, (_, i) => [cx + r * Math.cos((i * Math.PI) / 20), cy + r * Math.sin((i * Math.PI) / 20)]);

// la marge qui détache une forme de ce qui est derrière elle
const halo = (s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 });

// une clé couchée, découpée dans l'estrade : la tige de l'anneau au panneton, le panneton en drapeau côté dehors
// (side), l'anneau gardant son œil plein au milieu
function key(bow, bit, side) {
  const [bx, by] = bow;
  const [ex, ey] = bit;
  const len = Math.hypot(ex - bx, ey - by);
  const [ux, uy] = [(ex - bx) / len, (ey - by) / len];
  const [nx, ny] = [-uy * side, ux * side];
  const flag = [[ex, ey], [ex - 26 * ux, ey - 26 * uy], [ex - 26 * ux + 22 * nx, ey - 26 * uy + 22 * ny], [ex + 22 * nx, ey + 22 * ny]];
  return [
    cut(line([[bx + 20 * ux, by + 20 * uy], [ex, ey]], 14)),
    cut(poly(flag)),
    cut(line(ring(bx, by, 14), 12)),
  ];
}

// un moine à genoux vu de dos, coupé par le bas de la carte : le dos large aux épaules carrées, la tête penchée
// enfoncée entre elles, et la croix en Y de la chasuble, fendue dans le dos depuis les épaules (c'est elle qui fait
// lire un dos de prêtre, et non un sac) ; la tonsure est l'anneau de cheveux découpé autour du sommet du crâne
function monk(head, back, y, tonsure) {
  const [hx, hy, r] = head;
  const [a, b, j, end] = y;
  const parts = [blob(back), circle(hx, hy, r)];
  return [
    ...parts.map(halo),
    parts[0],
    cut(line([a, j, b], 12)),
    cut(line([j, end], 12)),
    parts[1],
    cut(line(ring(hx, hy, tonsure), 10)),
  ];
}

export function draw() {
  // le pontife, de la tiare aux pieds : une seule masse, détachée plus bas des colonnes par une marge
  const pontiff = [
    // la chape tombant des épaules sur les genoux jusqu'à l'ourlet ; à gauche elle couvre le bras levé
    blob([[478, 342], [450, 345], [420, 350], [396, 354], [375, 352], [352, 352], [330, 362], [312, 380], [304, 410],
      [303, 445], [308, 478], [324, 508], [348, 540], [367, 575], [376, 615], [379, 670], [383, 730], [391, 772],
      [402, 792], [450, 797], [500, 799], [560, 797], [615, 793], [630, 788], [644, 755], [653, 705], [657, 650],
      [654, 600], [648, 555], [650, 515], [656, 490], [660, 450], [662, 400], [658, 372], [640, 362], [615, 356],
      [590, 351], [560, 346], [522, 342]]),
    // l'avant-bras droit dressé dans sa manche, et la main qui bénit : deux doigts levés, les deux autres repliés,
    // le pouce écarté vers la tête
    blob([[322, 304], [356, 304], [361, 330], [364, 360], [362, 395], [340, 410], [312, 400], [308, 370], [314, 335]]),
    blob([[326, 300], [323, 280], [324, 262], [330, 252], [338, 250], [340, 236], [343, 224], [351, 218], [359, 222],
      [362, 234], [362, 255], [366, 262], [372, 268], [374, 276], [368, 282], [360, 286], [356, 300]]),
    // l'avant-bras gauche qui monte vers la croix
    blob([[636, 372], [652, 364], [664, 368], [668, 392], [667, 430], [664, 468], [656, 495], [640, 498], [634, 470],
      [632, 420], [633, 390]]),
    // le visage sous la tiare, le cou ; les fanons de la tiare sont laissés de côté pour que la tête se lise
    blob([[468, 258], [532, 258], [534, 278], [530, 298], [519, 314], [500, 322], [481, 314], [470, 298], [466, 278]]),
    poly([[482, 312], [518, 312], [522, 350], [478, 350]]),
    // la tiare : trois couronnes, chacune en retrait sur celle du dessous, et le bouton qui la coiffe
    blob([[447, 266], [440, 252], [440, 238], [444, 230], [455, 226], [450, 214], [451, 203], [455, 197], [465, 193],
      [460, 182], [464, 170], [474, 161], [488, 156], [500, 155], [512, 156], [526, 161], [536, 170], [540, 182],
      [535, 193], [545, 197], [549, 203], [550, 214], [545, 226], [556, 230], [560, 238], [560, 252], [553, 266],
      [500, 270]]),
    circle(500, 148, 10),
    // les pieds chaussés, un peu ouverts, posés sur l'estrade sous l'ourlet
    blob([[460, 794], [492, 794], [496, 808], [490, 819], [468, 821], [450, 816], [446, 806]]),
    blob([[516, 794], [548, 794], [562, 806], [558, 816], [540, 821], [518, 819], [512, 808]]),
  ];
  // la croix à trois branches, de plus en plus longues vers le bas, tenue de biais dans la main gauche
  const staff = line([[660, 240], [602, 572]], 14);
  const bars = [line([[639, 256], [675, 256]], 14), line([[622, 282], [684, 282]], 14), line([[604, 308], [692, 308]], 14)];
  const fist = blob([[630, 334], [646, 326], [662, 330], [668, 346], [666, 364], [650, 372], [634, 368], [628, 352]]);
  return [
    // les deux colonnes, chapiteau et fût, coupées par le cadre côté dehors comme sur la carte ; le dossier du trône,
    // entre elles, est laissé de côté : il noyait la tiare et la main levée dans une seule masse
    poly([[238, 128], [398, 128], [398, 150], [238, 150]]),
    poly([[238, 150], [394, 150], [392, 168], [386, 186], [374, 202], [356, 214], [334, 222], [322, 224], [240, 224]]),
    poly([[240, 222], [322, 222], [322, 900], [240, 900]]),
    poly([[602, 128], [762, 128], [762, 150], [602, 150]]),
    poly([[606, 150], [762, 150], [760, 224], [678, 224], [666, 222], [644, 214], [626, 202], [614, 186], [608, 168]]),
    poly([[678, 222], [760, 222], [760, 900], [678, 900]]),
    // le pontife et sa croix devant les colonnes
    ...pontiff.map(halo),
    halo(staff),
    ...bars.map(halo),
    halo(fist),
    ...pontiff,
    // les bandeaux qui séparent les trois couronnes, arrêtés avant le bord pour que la tiare reste d'un tenant
    cut(line([[466, 232], [484, 235], [500, 236], [516, 235], [534, 232]], 10)),
    cut(line([[476, 198], [490, 200], [500, 201], [510, 200], [524, 198]], 10)),
    // la hampe passe devant la manche et la chape : une marge la détache, puis la main la reprend
    halo(staff),
    staff,
    ...bars,
    fist,
    // l'estrade, et les deux clés croisées découpées dedans, anneaux en bas
    poly([[395, 815], [605, 815], [607, 937], [393, 937]]),
    ...key([536, 899], [454, 837], -1),
    ...key([464, 899], [546, 837], 1),
    // les deux moines, devant tout le reste
    ...monk([330, 754, 40], [[238, 808], [256, 797], [286, 789], [330, 786], [366, 789], [390, 799], [403, 816],
      [407, 850], [408, 937], [320, 938], [238, 937], [236, 870]], [[256, 786], [392, 790], [322, 868], [322, 921]], 21),
    ...monk([694, 758, 38], [[606, 937], [604, 866], [608, 832], [620, 812], [644, 800], [690, 794], [730, 797],
      [752, 806], [764, 818], [764, 870], [764, 937], [686, 938]], [[626, 792], [758, 800], [690, 872], [690, 921]], 19),
  ];
}

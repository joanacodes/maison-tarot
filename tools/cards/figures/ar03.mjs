// L’Impératrice (The Empress, III), d'après la carte de Pamela Colman Smith, 1909 : assise sur son trône aux coussins, la couronne de douze étoiles, le sceptre levé, le bouclier en cœur au signe de Vénus à ses côtés, le blé devant elle.
import { blob, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

// la couronne : un bandeau en arc posé sur la tête, hérissé de douze pointes pour les douze étoiles
function crown(cx, cy, r) {
  const arc = Array.from({ length: 15 }, (_, i) => {
    const a = (200 + (140 * i) / 14) * (Math.PI / 180);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const points = Array.from({ length: 12 }, (_, i) => {
    const a = (192 + (156 * i) / 11) * (Math.PI / 180);
    const at = (k, d) => [cx + k * Math.cos(a + d), cy + k * Math.sin(a + d)];
    return poly([at(r - 2, -0.24), at(r + 26, 0), at(r - 2, 0.24)]);
  });
  return [line(arc, 20), ...points];
}

// un épi de blé penché de `deg` degrés : la tige depuis le sol jusqu'à l'épi, ses grains par paires écartées et un
// grain à la pointe, comme on dessine le blé
function wheat(x, tip, deg) {
  const a = (deg * Math.PI) / 180;
  const [ux, uy] = [Math.sin(a), -Math.cos(a)];
  const [nx, ny] = [Math.cos(a), Math.sin(a)];
  const top = [x + ux * (925 - tip), 925 + uy * (925 - tip)];
  const at = (down, side) => [top[0] - ux * down + nx * side, top[1] - uy * down + ny * side];
  return [
    line([at(48, 0), [x, 925]], 14),
    ellipse(...at(11, 0), 7, 12, deg),
    [20, 33, 46].map((down) => [ellipse(...at(down, -8), 7, 11, deg - 28), ellipse(...at(down, 8), 7, 11, deg + 28)]),
  ];
}

// le bouclier en cœur, pointe en bas : la courbe classique du cœur, élargie et allongée à la taille voulue
function heart(cx, cy, sx, sy) {
  return blob(Array.from({ length: 36 }, (_, i) => {
    const t = (2 * Math.PI * i) / 36;
    return [cx + sx * 16 * Math.sin(t) ** 3, cy - sy * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t)
      - Math.cos(4 * t))];
  }));
}

// le signe de Vénus, tracé d'un trait : l'anneau et la croix dessous
function venus(cx, cy, r, width) {
  const ring = Array.from({ length: 33 }, (_, i) => {
    const a = (2 * Math.PI * i) / 32;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  return [line(ring, width), line([[cx, cy + r], [cx, cy + r + 58]], width),
    line([[cx - 22, cy + r + 32], [cx + 22, cy + r + 32]], width)];
}

export function draw() {
  const throne = [
    blob([[254, 430], [258, 380], [282, 346], [330, 330], [385, 332], [425, 345], [446, 380], [446, 590], [254, 590]]),
    poly([[266, 600], [446, 600], [446, 812], [266, 812]]),
  ];
  const gown = blob([[440, 345], [476, 344], [512, 345], [548, 338], [562, 360], [570, 400], [576, 440], [604, 470],
    [650, 480], [700, 490], [722, 512], [730, 560], [738, 640], [748, 730], [758, 812], [434, 812], [432, 700],
    [430, 560], [428, 440], [420, 385], [410, 355]]);
  const head = blob([[476, 216], [500, 220], [518, 234], [526, 256], [527, 284], [522, 306], [510, 320], [494, 328],
    [476, 331], [458, 328], [442, 320], [430, 306], [425, 284], [426, 256], [434, 234], [452, 220]]);
  const restingArm = [
    member([[550, 352], [592, 430], [640, 470]], [[[0, 21, 21], [0.5, 19, 19], [1, 17, 17]],
      [[0, 17, 17], [0.5, 15, 15], [1, 13, 13]]], 1),
    blob([[634, 462], [652, 458], [670, 464], [676, 474], [664, 482], [644, 484], [632, 478]]),
  ];
  const raisedArm = [
    member([[418, 352], [334, 374], [376, 300]], [[[0, 24, 24], [0.5, 23, 23], [1, 22, 22]],
      [[0, 22, 22], [0.5, 18, 18], [1, 14, 14]]], 1),
    blob([[372, 296], [374, 280], [388, 272], [402, 278], [404, 294], [394, 306], [380, 308]]),
  ];
  const sceptre = [circle(356, 182, 21), line([[360, 202], [392, 304]], 16)];
  const shield = heart(364, 697, 4.5, 6);
  // ce qui passe devant s'en détache par un jour : on retire sa forme grossie avant de le dessiner
  const apart = (shapes) => shapes.map((s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 }));
  return [
    // le trône : le gros coussin du dossier, à gauche derrière elle, posé sur le siège
    throne,

    // l'impératrice assise, la tête droite sur son cou, le buste puis les genoux tournés vers la droite, la robe
    // tombant des genoux jusqu'au sol ; ses motifs et le collier sont omis
    apart([gown]),
    gown,
    limb(476, 322, 17, 476, 346, 22),
    head,
    // la couronne posée sur la tête, qu'un jour sépare des cheveux pour qu'on la lise comme une couronne
    apart(crown(476, 254, 46)),
    crown(476, 254, 46),

    // le bras gauche posé, la main sur les genoux, détaché de la robe par un jour
    apart(restingArm),
    restingArm,

    // le bras droit levé, coude en dehors, la main près du visage tenant le sceptre surmonté du globe ; un jour les
    // détache du trône et des cheveux
    apart([...raisedArm, ...sceptre]),
    sceptre,
    raisedArm,

    // le bouclier en cœur appuyé contre le trône, le signe de Vénus découpé dedans
    apart([shield]),
    shield,
    venus(364, 676, 20, 12).map(cut),

    // le chemin de pierre où le trône est posé, puis au premier plan une rangée d'épis de blé, inégaux et penchés
    // pour qu'ils ne fassent pas une palissade ; les arbres et la cascade du fond sont omis
    poly([[240, 812], [762, 812], [762, 830], [240, 830]]),
    [[270, 848, -5], [332, 856, 4], [394, 846, -3], [456, 858, 5], [518, 848, -4], [580, 856, 3], [642, 846, -5],
      [704, 856, 4]].map(([x, tip, deg]) => wheat(x, tip, deg)),
    poly([[240, 916], [762, 916], [762, 930], [240, 930]]),
  ];
}

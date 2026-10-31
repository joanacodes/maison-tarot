// L’Ermite (The Hermit, IX), d'après la carte de Pamela Colman Smith, 1909 : le vieillard encapuchonné, tête baissée, tend sa lanterne à l'étoile et s'appuie sur son bâton, au sommet enneigé.
import { blob, cut, limb, line, poly } from '../kit/silhouettes/lib.mjs';

// l'étoile à six branches : douze sommets, pointes et creux en alternance
function star(cx, cy, outer, inner) {
  return poly(Array.from({ length: 12 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 6;
    const r = i % 2 ? inner : outer;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }));
}

// le bâton, à peine arqué comme sur la carte : une courbe du second degré, du bout arrondi jusqu'à la neige
const STAFF = Array.from({ length: 13 }, (_, i) => {
  const t = i / 12;
  const [a, b, c] = [[404, 146], [462, 520], [474, 893]];
  return [0, 1].map((k) => (1 - t) ** 2 * a[k] + 2 * (1 - t) * t * b[k] + t ** 2 * c[k]);
});

// la main qui serre le bâton, un peu plus bas que sur la carte : au-dessus d'elle, la barbe garde de la place
const GRIP = blob([[414, 272], [424, 262], [442, 260], [458, 266], [464, 280], [459, 296], [442, 303], [424, 301],
  [414, 291]]);

export function draw() {
  return [
    // la cape et le capuchon d'un seul tenant, le dos droit jusqu'à la neige, le pan de devant tombant à gauche du
    // bâton ; devant le visage la masse s'arrête, et le creux sombre du capuchon laisse lire le profil
    blob([[444, 187], [438, 171], [435, 157], [446, 145], [464, 135], [482, 129], [502, 127], [521, 130], [537, 140],
      [552, 158], [568, 176], [585, 192], [600, 207], [609, 226], [613, 252], [611, 285], [607, 330], [606, 450],
      [606, 620], [605, 780], [605, 872], [601, 888], [580, 892], [540, 893], [505, 895], [486, 897], [474, 893],
      [478, 880], [479, 840], [477, 760], [474, 722], [462, 712], [440, 711], [421, 706], [416, 690], [416, 590],
      [410, 568], [401, 560], [400, 470], [396, 425], [392, 300], [392, 215], [398, 200], [410, 196], [418, 228],
      [430, 262], [470, 262], [476, 230], [470, 202], [456, 190]]),
    // le visage penché, de profil vers la gauche, sous le bord du capuchon : front, nez, bouche, et la barbe
    blob([[448, 193], [447, 201], [454, 206], [449, 211], [440, 220], [450, 224], [449, 230], [457, 233], [454, 241],
      [457, 251], [468, 258], [484, 252], [486, 225], [480, 200], [466, 190], [452, 189]]),
    // le bras levé dans sa large manche, qui pend jusqu'à la taille
    blob([[340, 143], [352, 147], [362, 160], [370, 178], [376, 196], [388, 206], [398, 232], [401, 300], [401, 380],
      [400, 420], [390, 424], [376, 423], [367, 418], [365, 395], [364, 360], [360, 342], [352, 328], [350, 280],
      [349, 240], [346, 208], [340, 192], [334, 185]]),
    // la main qui tient l'anneau de la lanterne
    blob([[268, 158], [273, 147], [288, 141], [312, 140], [334, 141], [348, 147], [352, 162], [347, 177], [334, 184],
      [310, 185], [288, 182], [275, 173]]),
    // la lanterne : le crochet, le chapeau en dôme sur son rebord, la cage et le pied ; l'étoile découpée dans la
    // cage, c'est la lumière qui passe (les rayons autour, trop fins, sont laissés)
    line([[295, 182], [295, 204]], 14),
    poly([[257, 228], [261, 215], [275, 205], [295, 199], [315, 205], [329, 215], [333, 228]]),
    poly([[251, 224], [339, 224], [339, 237], [251, 237]]),
    poly([[255, 236], [335, 236], [339, 256], [339, 298], [335, 318], [255, 318], [251, 298], [251, 256]]),
    poly([[257, 316], [333, 316], [327, 330], [312, 338], [278, 338], [263, 330]]),
    cut(star(295, 277, 31, 18)),
    // le bâton et la main qui le serre passent devant la cape : un liseré sombre les en détache
    cut(line(STAFF, 16 + 20)),
    cut({ ...GRIP, grow: 20 }),
    // le sommet enneigé, posé après cette découpe pour que le pied du bâton s'y plante sans encoche
    poly([[238, 932], [238, 906], [250, 906], [273, 897], [294, 900], [314, 906], [344, 903], [373, 899], [400, 884],
      [417, 871], [434, 883], [451, 895], [470, 897], [500, 892], [540, 889], [575, 888], [615, 888], [636, 882],
      [651, 874], [668, 882], [690, 884], [706, 879], [723, 874], [740, 882], [762, 886], [762, 932]]),
    line(STAFF, 16),
    GRIP,
    // le poignet qui rentre dans la cape, posé après le liseré : la main sort du manteau au lieu de flotter
    limb(452, 290, 12, 490, 302, 14),
  ];
}

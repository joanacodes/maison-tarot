// L’Empereur (The Emperor, IV), d'après la carte de Pamela Colman Smith, 1909 : le vieil homme barbu et couronné, assis de face sur son trône de pierre aux têtes de bélier, la croix ansée dans la main droite, le globe dans la gauche.
import { blob, circle, cut, ellipse, limb, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

// une tête de bélier vue de face au bout d'un accoudoir : le chanfrein qui descend au mufle, et de chaque côté une
// corne enroulée, percée en son centre pour qu'on lise la spirale
function ram(cx, top) {
  return [
    blob([[cx, top], [cx + 18, top + 6], [cx + 25, top + 30], [cx + 19, top + 70], [cx + 10, top + 96], [cx, top + 102],
      [cx - 10, top + 96], [cx - 19, top + 70], [cx - 25, top + 30], [cx - 18, top + 6]]),
    circle(cx - 36, top + 30, 27),
    circle(cx + 36, top + 30, 27),
  ];
}
const ramHoles = (cx, top) => [cut(circle(cx - 39, top + 30, 9)), cut(circle(cx + 39, top + 30, 9))];

// ce qui passe devant s'en détache par un jour : on retire sa forme grossie avant de le dessiner
const apart = (shapes) => shapes.map((s) => cut({ ...s, grow: 20 }));

export function draw() {
  const leftLeg = [member([[446, 690], [484, 798]], [[[0, 24, 24], [0.6, 22, 22], [1, 19, 19]]], -1),
    limb(484, 798, 21, 494, 884, 8)];
  const rightLeg = [member([[612, 622], [566, 796]], [[[0, 26, 26], [0.5, 23, 23], [1, 20, 20]]], 1),
    limb(566, 798, 21, 614, 872, 8)];
  const torso = blob([[372, 318], [420, 304], [490, 298], [560, 304], [618, 316], [640, 336], [636, 400], [628, 470],
    [630, 530], [634, 600], [634, 660], [628, 712], [616, 748], [585, 762], [525, 770], [460, 756], [420, 730],
    [404, 690], [398, 620], [400, 540], [390, 470], [380, 400], [374, 345]]);
  const arms = [
    member([[380, 344], [362, 452], [322, 505]], [[[0, 27, 27], [0.5, 25, 25], [1, 22, 22]],
      [[0, 21, 21], [1, 16, 16]]], -1),
    member([[632, 344], [656, 452], [676, 512]], [[[0, 27, 27], [0.5, 25, 25], [1, 22, 22]],
      [[0, 21, 21], [1, 16, 16]]], 1),
  ];
  const fist = blob([[286, 494], [300, 484], [320, 484], [332, 494], [332, 516], [322, 530], [298, 532], [286, 520]]);
  const hand = blob([[656, 520], [668, 532], [684, 534], [698, 526], [706, 516], [712, 528], [702, 542], [684, 548],
    [666, 544]]);
  const head = [
    blob([[490, 228], [520, 230], [544, 244], [554, 272], [550, 298], [540, 304], [538, 326], [530, 340], [533, 352],
      [522, 372], [524, 386], [510, 402], [504, 418], [493, 430], [482, 418], [476, 402], [462, 386], [464, 372],
      [453, 352], [456, 340], [448, 326], [446, 304], [432, 298], [426, 272], [436, 244], [460, 230]]),
    // la couronne : le bandeau et trois fleurons pointus à bouton ; fleurons larges et boutons enfoncés dans leur
    // pointe, pour qu'aucun col ne soit plus mince que le reste
    poly([[433, 226], [547, 226], [547, 248], [433, 248]]),
    poly([[433, 230], [448, 198], [463, 230]]),
    poly([[473, 230], [490, 190], [507, 230]]),
    poly([[517, 230], [532, 198], [547, 230]]),
    circle(448, 206, 10),
    circle(490, 198, 11),
    circle(532, 206, 10),
  ];
  const ankh = [ellipse(299, 310, 22, 26), poly([[268, 334], [330, 334], [330, 350], [268, 350]]),
    poly([[291, 340], [307, 340], [307, 546], [291, 546]])];
  const orb = circle(681, 494, 27);
  return [
    // le trône de pierre, carré et massif : le dossier, dont on ne garde que le cadre pour que la tête s'y découpe sur
    // le vide, ses deux têtes de bélier de profil en haut, corne enroulée et museau ; les accoudoirs finis en têtes
    // de bélier vues de face ; les pieds
    poly([[306, 120], [706, 120], [706, 156], [306, 156]]),
    circle(330, 150, 30),
    circle(682, 150, 30),
    limb(314, 170, 14, 290, 198, 9),
    limb(698, 170, 14, 722, 198, 9),
    cut(circle(332, 146, 9)),
    cut(circle(680, 146, 9)),
    poly([[306, 150], [348, 150], [348, 560], [306, 560]]),
    poly([[664, 150], [706, 150], [706, 560], [664, 560]]),
    poly([[290, 630], [370, 630], [370, 866], [290, 866]]),
    poly([[654, 630], [734, 630], [734, 866], [654, 866]]),
    // les têtes de bélier des accoudoirs se détachent des pieds du trône par un jour, comme sculptées en avant
    apart([...ram(328, 548), ...ram(694, 548)]),
    ram(328, 548),
    ram(694, 548),
    ramHoles(328, 548),
    ramHoles(694, 548),
    // l'estrade sous ses pieds et le socle ; les montagnes du fond sont omises
    blob([[378, 866], [378, 838], [420, 824], [480, 816], [525, 814], [570, 816], [630, 824], [662, 838], [662, 866]]),
    poly([[248, 866], [752, 866], [752, 904], [248, 904]]),

    // sa jambe droite en armure (à gauche de l'image), qui sort sous la robe, le soleret pointé posé sur l'estrade
    apart([leftLeg[1]]),
    leftLeg,
    // l'empereur assis, détaché du trône par un jour : le manteau sur les larges épaules, la robe tombant sur les
    // genoux ; puis ses bras le long du corps jusqu'aux accoudoirs, détachés du buste
    apart([torso, ...arms, fist, hand]),
    torso,
    apart(arms),
    arms,
    fist,
    hand,
    // sa jambe gauche (à droite de l'image), le genou dégagé de la robe, passe devant elle
    apart(rightLeg),
    rightLeg,

    // la tête couronnée, la longue barbe blanche en mèches qui descend sur la poitrine
    apart(head),
    head,

    // la croix ansée tenue droite dans le poing, son anneau percé ; puis le poing refermé sur la hampe
    apart(ankh),
    ankh,
    cut(ellipse(299, 310, 8, 11)),
    fist,
    // le globe posé dans la main gauche, qui le tient par-dessous
    apart([orb]),
    orb,
    hand,
  ];
}

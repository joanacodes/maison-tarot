// Le Mat (The Fool, 0), d'après la carte de Pamela Colman Smith, 1909 : le jeune homme au bord de la falaise, la tête renversée, le baluchon à l'épaule, la rose à la main, le chien à ses talons, le soleil.
import { blob, chain, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

// le bâton, une seule droite de la main au baluchon ; on n'en dessine que ce qui se voit de part et d'autre de la tête
const STAFF_FROM = [238, 422];
const STAFF_TO = [614, 204];
const staffAt = (x) => [x,
  STAFF_FROM[1] + ((STAFF_TO[1] - STAFF_FROM[1]) * (x - STAFF_FROM[0])) / (STAFF_TO[0] - STAFF_FROM[0])];

// un rayon du soleil : un trait effilé qui part à distance du disque, pour que le disque reste rond
function ray(cx, cy, deg, from, to) {
  const a = (deg * Math.PI) / 180;
  return limb(cx + from * Math.cos(a), cy + from * Math.sin(a), 12, cx + to * Math.cos(a), cy + to * Math.sin(a), 7);
}

// les jambes, vues de face : [t, dehors, dedans] ; la botte évase un peu le bas de la jambe d'appui
const THIGH = [[0, 25, 25], [0.35, 25, 24], [0.7, 22, 21], [1, 19, 19]];
const STANDING_SHIN = [[0, 19, 19], [0.28, 25, 25], [0.42, 20, 20], [0.75, 18, 18], [1, 17, 17]];
const RAISED_SHIN = [[0, 19, 19], [0.2, 21, 18], [0.6, 15, 13], [1, 8, 8]];

export function draw() {
  const lowerStaff = line([STAFF_FROM, staffAt(460)], 16);
  return [
    // le soleil en haut à droite ; pas de rayon vers le bas à gauche, où pend le baluchon
    circle(716, 110, 55),
    [[160, 112], [185, 135], [210, 125], [95, 135], [70, 135]].map(([deg, to]) => ray(716, 110, deg, 80, to)),

    // la falaise : la corniche avance à gauche au-dessus du vide, son dessous rentrant ; le sol descend à droite
    // jusqu'au chien, plus bas que le jeune homme comme sur la carte. Les montagnes du fond sont omises.
    poly([[296, 768], [306, 750], [330, 742], [362, 745], [395, 760], [425, 785], [455, 797], [505, 798],
      [545, 792], [580, 796], [612, 808], [642, 828], [668, 852], [700, 866], [735, 870], [770, 864], [770, 930],
      [452, 930], [440, 905], [410, 888], [372, 870], [340, 845], [318, 818], [302, 792]]),

    // la jambe d'appui, droite, la botte posée près du bord ; l'autre pliée, le pied levé derrière lui dans l'élan
    member([[458, 575], [474, 670], [485, 768]], [THIGH, STANDING_SHIN], -1),
    blob([[470, 768], [500, 770], [508, 785], [505, 798], [470, 799], [440, 799], [430, 794], [438, 784], [455, 778]]),
    member([[512, 590], [568, 655], [632, 699]], [THIGH, RAISED_SHIN], 1),

    // la tunique, serrée à la taille, la jupe évasée vers la droite ; ses motifs sont omis
    blob([[478, 298], [452, 300], [428, 306], [414, 322], [410, 350], [410, 390], [406, 430], [400, 470], [398, 510],
      [402, 550], [410, 582], [445, 588], [490, 590], [535, 578], [568, 562], [588, 548], [572, 520], [552, 490],
      [540, 460], [545, 420], [552, 385], [550, 345], [540, 315], [526, 300]]),

    // le bras tendu vers la droite, la large manche pendant sous lui jusqu'à une pointe, comme sa doublure
    blob([[536, 304], [560, 312], [588, 326], [618, 340], [646, 348], [666, 348], [672, 360], [668, 374], [678, 392],
      [690, 416], [704, 440], [716, 464], [700, 462], [676, 452], [652, 452], [628, 446], [606, 432], [586, 416],
      [566, 404], [552, 396], [552, 370], [548, 340]]),
    // la main ouverte, paume en l'air, et la rose blanche tenue droite sur sa tige
    blob([[666, 345], [690, 340], [712, 342], [732, 344], [741, 350], [731, 358], [705, 365], [680, 368], [666, 366]]),
    line([[716, 312], [712, 346]], 14),
    ellipse(699, 326, 13, 7.5, -35),
    ellipse(731, 322, 13, 7.5, 30),
    circle(716, 300, 16),
    [[703, 291], [716, 285], [729, 291]].map(([x, y]) => circle(x, y, 8)),

    // l'autre bras descend vers la gauche tenir le bâton : la manche, le revers au poignet, la doublure qui pend
    blob([[432, 300], [380, 336], [340, 360], [300, 383], [290, 392], [286, 410], [290, 428], [305, 437], [330, 438],
      [345, 452], [356, 472], [370, 492], [386, 482], [398, 462], [406, 440], [410, 410], [416, 370], [422, 340]]),

    // le bâton passe devant l'épaule : un jour le détache de la manche ; il s'arrête au cou, derrière lequel il passe
    cut({ ...lowerStaff, width: lowerStaff.width + 20 }),
    lowerStaff,
    // la main fermée sur le bâton
    blob([[250, 400], [265, 393], [283, 396], [294, 405], [294, 422], [282, 432], [262, 432], [250, 425], [246, 412]]),

    // la tête renversée en arrière : le nez pointé vers le ciel, le menton en avant, la gorge découverte, le bonnet
    // serré sur le crâne et les cheveux tombant sur la nuque (la plume du bonnet, couchée le long du bâton, est omise)
    blob([[461, 270], [463, 262], [465, 258], [465, 253], [470, 249], [460, 238], [479, 233], [484, 231], [485, 224],
      [494, 214], [500, 205], [516, 200], [536, 206], [548, 220], [553, 240], [552, 262], [544, 280], [532, 292],
      [515, 292], [498, 286], [480, 285], [465, 279]]),
    limb(497, 282, 16, 500, 302, 18),

    // le bout du bâton ressort derrière la tête et porte le baluchon noué
    line([staffAt(574), STAFF_TO], 16),
    blob([[600, 215], [615, 205], [640, 203], [662, 212], [676, 232], [676, 255], [662, 272], [635, 278], [608, 272],
      [594, 255], [592, 232]]),
    blob([[622, 207], [618, 188], [626, 172], [640, 168], [650, 178], [650, 195], [645, 208]]),

    // le petit chien dressé sur ses pattes arrière, le museau levé vers lui, l'oreille couchée, la queue en panache
    blob([[653, 663], [664, 655], [673, 661], [686, 671], [700, 680], [705, 686], [697, 701], [677, 707], [669, 694],
      [660, 675]]),
    blob([[690, 700], [708, 722], [724, 752], [738, 782], [742, 806], [726, 822], [708, 820], [690, 796], [668, 768],
      [648, 748], [636, 728], [645, 708], [668, 698]]),
    chain([[656, 724, 11], [618, 714, 9], [592, 716, 8], [584, 727, 7.5]]),
    chain([[662, 746, 10.5], [630, 762, 9], [606, 774, 8]]),
    chain([[718, 806, 20], [702, 836, 11], [712, 864, 8.5]]),
    chain([[738, 806, 15], [750, 838, 10], [742, 864, 8.5]]),
    blob([[736, 792], [742, 770], [742, 748], [750, 726], [766, 730], [770, 752], [762, 778], [752, 802]]),
  ];
}

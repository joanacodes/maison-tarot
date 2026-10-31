// Les Amoureux (The Lovers, VI), d'après la carte de Pamela Colman Smith, 1909 : l'ange aux ailes ouvertes dans les nuées devant le grand soleil, la femme et l'homme nus au-dessous, l'arbre au serpent, l'arbre de flammes, la montagne entre eux.
import { blob, chain, circle, cut, ellipse, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const rad = (d) => (d * Math.PI) / 180;

// la marge qui détache une forme de ce qui est derrière elle
const halo = (s) => cut(s.stroke ? { ...s, width: s.width + 20 } : { ...s, grow: 20 });

// le reflet d'une liste de points autour de l'axe de l'ange
const mirror = (pts) => pts.map(([x, y]) => [1000 - x, y]);

// une flamme de l'arbre, en goutte dont la pointe se tord un peu, posée sur (x, y)
const flame = (x, y) => blob([[x + 9, y - 34], [x + 10, y - 18], [x + 16, y + 2], [x + 13, y + 16], [x, y + 22],
  [x - 13, y + 16], [x - 16, y + 2], [x - 8, y - 16]]);

// un rayon du soleil : un coin pointu partant du disque, à l'angle a (degrés, y vers le bas), jusqu'au rayon r
function ray(a, r) {
  const [c, s] = [Math.cos(rad(a)), Math.sin(rad(a))];
  return poly([[499 + 150 * c - 11 * s, 32 + 150 * s + 11 * c], [499 + r * c, 32 + r * s], [499 + 150 * c + 11 * s, 32 + 150 * s - 11 * c]]);
}

// l'aile gauche, la droite en est le reflet : le bord d'attaque qui monte de l'épaule, puis les grandes pennes
// qui pendent en éventail au bout de l'aile, chacune séparée de la suivante par une encoche
const WING = [[452, 330], [430, 300], [404, 266], [372, 234], [334, 206], [292, 188], [252, 180], [222, 184],
  [206, 200], [222, 214], [208, 236], [228, 252], [214, 280], [238, 290], [226, 322], [252, 326], [246, 356],
  [274, 352], [282, 380], [304, 368], [330, 392], [400, 388], [440, 360]];

// la main ouverte et levée de l'ange, côté gauche : les doigts serrés en moufle vers le haut, le pouce une bosse
const HAND = [[300, 352], [284, 356], [270, 346], [262, 328], [256, 306], [250, 284], [250, 268], [258, 260],
  [270, 264], [280, 280], [290, 300], [300, 304], [308, 312], [306, 326], [304, 340]];

// les membres des deux nus, [t, dehors, dedans] : la femme plus fine que l'homme
const W_UPPER = [[0, 13, 13], [0.5, 11, 11], [1, 10, 10]];
const W_FORE = [[0, 10, 10], [0.6, 9, 9], [1, 7.5, 7.5]];
const W_THIGH = [[0, 22, 20], [0.3, 21, 18], [0.6, 18, 15], [0.9, 15, 13], [1, 14, 12]];
const W_CALF = [[0.1, 15, 12], [0.3, 17, 13], [0.55, 14, 11], [0.8, 10, 8], [1, 8, 7.5]];
const M_UPPER = [[0, 15, 15], [0.5, 13, 12], [1, 11, 10]];
const M_FORE = [[0, 11, 10], [0.4, 11, 10], [1, 8, 8]];
const M_THIGH = [[0, 24, 22], [0.4, 22, 19], [0.8, 17, 15], [1, 15, 13]];
const M_CALF = [[0.1, 16, 13], [0.3, 18, 14], [0.6, 15, 11], [0.85, 11, 9], [1, 9, 8]];

export function draw() {
  // le soleil, coupé par le haut de la carte comme sur la carte, et ses rayons au-dessus des ailes ; il est
  // remonté d'un rien pour que son bord rond passe au-dessus de la chevelure au lieu d'y être entaillé
  const sun = [
    poly(Array.from({ length: 61 }, (_, i) => rad(14.2 + (151.6 * i) / 60)).map((a) => [499 + 156 * Math.cos(a), 32 + 156 * Math.sin(a)])),
    ...[[160, 250], [145, 225], [130, 205], [115, 190], [20, 250], [35, 225], [50, 205], [65, 190]].map(([a, r]) => ray(a, r)),
  ];
  // l'ange : la robe qui tombe dans les nuées, les bras ouverts aux mains levées, la tête, et la chevelure de
  // flammes, ronde sur le dessus pour que le soleil derrière garde un bord net
  const angel = [
    blob([[452, 304], [548, 304], [586, 318], [620, 346], [642, 380], [650, 418], [640, 452], [616, 476], [596, 490],
      [404, 490], [384, 476], [360, 452], [350, 418], [358, 380], [380, 346], [414, 318]], 0.8),
    chain([[420, 318, 20], [335, 382, 18], [294, 344, 13]]),
    blob(HAND),
    chain([[580, 318, 20], [665, 382, 18], [706, 344, 13]]),
    blob(mirror(HAND)),
    poly([[486, 292], [512, 292], [516, 322], [484, 322]]),
    ellipse(499, 268, 26, 36),
    blob([[499, 205], [524, 209], [544, 221], [554, 238], [570, 246], [560, 260], [574, 278], [552, 282], [540, 295],
      [528, 283], [526, 257], [499, 245], [472, 257], [470, 283], [458, 295], [446, 282], [426, 278], [440, 260],
      [430, 246], [446, 238], [456, 221], [474, 209]]),
  ];
  // les nuées sous la robe, en boules
  const cloud = [
    ellipse(508, 545, 80, 52),
    ...[[445, 492, 26], [490, 478, 30], [540, 478, 30], [580, 494, 24], [420, 530, 20], [585, 525, 20], [452, 596, 22],
      [500, 606, 26], [548, 600, 24]].map(([x, y, r]) => circle(x, y, r)),
  ];
  // le serpent enroulé autour du tronc : les tours qui passent devant, puis le cou dressé et la tête vers la femme
  const serpent = [
    ...[560, 650, 765, 845].map((y) => line([[232, y + 14], [270, y - 14]], 14)),
    line([[270, 546], [284, 528], [290, 514]], 14),
    ellipse(293, 494, 12, 21, 18),
  ];
  // la femme, à gauche comme sur la carte, tournée vers l'ange : la longue chevelure dans le dos, une main
  // pendante, l'autre ouverte vers l'homme
  const woman = [
    blob([[344, 496], [354, 489], [366, 488], [377, 493], [383, 502], [388, 508], [383, 514], [385, 520], [380, 528],
      [376, 535], [366, 540], [354, 538], [344, 530], [338, 516], [338, 504]]),
    blob([[342, 495], [330, 505], [326, 525], [324, 550], [322, 575], [320, 598], [330, 604], [338, 590], [342, 568],
      [348, 548], [352, 530]]),
    poly([[352, 532], [368, 534], [370, 566], [350, 566]]),
    blob([[338, 566], [368, 562], [400, 568], [406, 590], [400, 620], [394, 648], [402, 680], [410, 705], [388, 724],
      [368, 728], [348, 724], [326, 705], [334, 680], [342, 648], [336, 620], [332, 590]]),
    member([[338, 574], [318, 634], [308, 688]], [W_UPPER, W_FORE], -1),
    blob([[300, 684], [316, 684], [318, 700], [314, 716], [306, 720], [298, 714], [296, 700]]),
    member([[400, 574], [428, 634], [468, 674]], [W_UPPER, W_FORE], 1),
    blob([[462, 668], [476, 664], [490, 674], [500, 690], [498, 702], [486, 700], [474, 692], [464, 684]]),
    member([[350, 712], [347, 796], [345, 878]], [W_THIGH, W_CALF], -1),
    member([[388, 712], [389, 796], [391, 878]], [W_THIGH, W_CALF], 1),
    blob([[334, 872], [356, 872], [360, 890], [356, 906], [332, 906], [326, 896]]),
    blob([[380, 872], [402, 872], [412, 896], [408, 906], [382, 906], [378, 890]]),
  ];
  // l'homme, tourné vers elle : une main ouverte vers la femme, l'autre pendante
  const man = [
    blob([[646, 474], [662, 470], [677, 476], [686, 489], [686, 504], [679, 517], [668, 526], [654, 529], [644, 524],
      [637, 516], [633, 509], [628, 503], [633, 497], [634, 488]]),
    poly([[648, 520], [668, 520], [670, 552], [646, 552]]),
    blob([[614, 556], [658, 550], [702, 556], [708, 578], [702, 606], [692, 636], [690, 668], [696, 700], [680, 722],
      [662, 728], [644, 722], [626, 700], [630, 668], [626, 636], [616, 606], [610, 578]]),
    member([[618, 562], [598, 626], [584, 684]], [M_UPPER, M_FORE], -1),
    blob([[574, 680], [592, 680], [594, 698], [590, 714], [578, 720], [568, 712], [568, 694]]),
    member([[698, 562], [716, 626], [716, 684]], [M_UPPER, M_FORE], 1),
    blob([[706, 680], [726, 680], [728, 698], [724, 714], [714, 720], [704, 712], [704, 694]]),
    member([[642, 714], [640, 800], [640, 878]], [M_THIGH, M_CALF], -1),
    member([[682, 714], [686, 800], [694, 878]], [M_THIGH, M_CALF], 1),
    blob([[624, 870], [652, 870], [658, 890], [654, 906], [620, 906], [614, 894]]),
    blob([[684, 870], [706, 870], [722, 892], [718, 906], [688, 906], [682, 890]]),
  ];
  return [
    ...sun,
    // les grandes ailes, qui débordent un peu de la carte comme elles débordent de son cadre
    blob(WING, 0.6),
    blob(mirror(WING), 0.6),
    // l'ange devant le soleil et ses ailes
    ...angel.map(halo),
    ...angel,
    // les nuées devant le bas de la robe
    ...cloud.map(halo),
    ...cloud,
    // l'arbre de la connaissance derrière la femme, son feuillage chargé de fruits
    poly([[230, 897], [236, 862], [240, 600], [242, 478], [266, 478], [268, 600], [270, 862], [276, 897]]),
    blob([[226, 488], [216, 462], [222, 434], [242, 412], [270, 400], [298, 404], [318, 418], [330, 442], [326, 468],
      [310, 488], [282, 498], [252, 498]]),
    ...[[234, 418], [320, 430], [222, 472], [300, 494]].map(([x, y]) => circle(x, y, 11)),
    ...serpent.map(halo),
    ...serpent,
    // l'arbre de flammes derrière l'homme : les flammes sur de courtes branches, la plus haute au bout du tronc
    poly([[736, 897], [738, 620], [739, 400], [753, 400], [754, 620], [758, 897]]),
    ...[[720, 445], [720, 525], [770, 480], [770, 560], [770, 640], [770, 720], [768, 800]].map(([x, y]) => line([[746, y + 36], [x, y + 10]], 14)),
    ...[[746, 384], [720, 445], [720, 525], [770, 480], [770, 560], [770, 640], [770, 720], [768, 800]].map(([x, y]) => flame(x, y)),
    // la montagne entre eux, ses pentes creusées qui s'évasent vers le pied
    poly([[502, 742], [494, 752], [485, 768], [476, 790], [466, 818], [455, 850], [444, 880], [436, 897], [568, 897],
      [560, 880], [549, 850], [538, 818], [528, 790], [519, 768], [510, 752]]),
    // les deux nus, devant tout ; le sol est posé après leur marge, pour que leurs pieds y tiennent
    ...woman.map(halo),
    ...man.map(halo),
    poly([[226, 895], [774, 895], [774, 937], [226, 937]]),
    ...woman,
    ...man,
  ];
}

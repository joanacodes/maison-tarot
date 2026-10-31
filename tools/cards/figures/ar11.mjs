// La Justice (Justice, XI), d'après la carte de Pamela Colman Smith, 1909 : la reine couronnée assise entre deux piliers, l'épée droite dans une main, la balance pendue à l'autre.
import { blob, circle, cut, ellipse, line, poly } from '../kit/silhouettes/lib.mjs';

// la robe, des épaules qui descendent du cou jusqu'à l'ourlet étalé sur l'estrade, avec les deux larges manches
const ROBE = blob([[506, 396], [526, 400], [556, 407], [590, 416], [620, 424], [642, 432], [654, 440], [661, 452],
  [663, 470], [656, 495], [645, 520], [632, 548], [619, 576], [609, 604], [605, 640], [605, 690], [608, 740],
  [622, 776], [650, 806], [678, 830], [697, 855], [670, 859], [610, 860], [540, 860], [492, 861], [440, 860],
  [380, 859], [336, 857], [334, 838], [340, 812], [350, 785], [362, 752], [372, 712], [378, 670], [380, 640],
  [376, 622], [364, 606], [352, 584], [342, 550], [336, 512], [331, 475], [328, 448], [336, 434], [352, 428],
  [374, 424], [398, 420], [430, 412], [462, 403], [484, 398]]);
// la tête en ovale qui s'amincit vers le menton, puis le cou, et des épaules qui descendent : coiffée de la couronne
// crénelée, une tête aux flancs droits sur des épaules plates ferait une tour d'échecs
const HEAD = blob([[452, 308], [466, 296], [494, 292], [522, 296], [536, 308], [540, 330], [537, 350], [528, 366],
  [514, 378], [506, 384], [505, 400], [483, 400], [482, 384], [474, 378], [460, 366], [451, 350], [448, 330]]);
const FOOT = ellipse(468, 864, 22, 9);
// la main gauche, posée en bout de bras, qui tient la balance par sa poignée
const HAND = blob([[652, 446], [668, 438], [690, 440], [706, 450], [714, 468], [711, 488], [700, 497], [688, 492],
  [678, 496], [668, 489], [658, 474]]);
// la main droite, levée, serrée sur la poignée de l'épée sous la garde
const FIST = blob([[306, 400], [318, 392], [338, 396], [347, 410], [345, 432], [337, 447], [320, 449], [307, 441],
  [302, 420]]);

// l'épée, un peu décalée vers la droite par rapport à la carte, dans le vide entre le pilier et la reine
const BLADE = poly([[306, 367], [307, 104], [316, 64], [325, 104], [326, 367]]);
const CROSS = line([[262, 378], [370, 378]], 16);

// la balance, pendue à la main par une poignée : le fléau, et pour chaque plateau deux cordons en triangle
const PIVOT = [680, 548];
function pan(cx) {
  return [
    line([[cx, PIVOT[1]], [cx - 21, 638]], 14),
    line([[cx, PIVOT[1]], [cx + 21, 638]], 14),
    line([[cx - 24, 638], [cx + 24, 638]], 14),
    blob(Array.from({ length: 9 }, (_, i) => {
      const t = (Math.PI * i) / 8;
      return [cx + 26 * Math.cos(t), 638 + 18 * Math.sin(t)];
    })),
  ];
}

export function draw() {
  return [
    // l'estrade, d'un bord à l'autre
    poly([[237, 813], [763, 813], [763, 930], [237, 930]]),
    // les deux piliers sur leurs socles, plus minces que sur la carte : la lame de l'épée tient à côté du pilier
    // gauche au lieu de le ronger sur toute sa hauteur
    poly([[240, 70], [298, 70], [298, 813], [240, 813]]),
    poly([[234, 762], [304, 762], [304, 813], [234, 813]]),
    poly([[690, 70], [748, 70], [748, 813], [690, 813]]),
    poly([[684, 762], [754, 762], [754, 813], [684, 813]]),
    // le trône de pierre, dont la carte ne montre que le flanc gauche à côté de la robe ; le voile derrière est laissé
    poly([[316, 606], [386, 592], [386, 813], [316, 813]]),
    // la reine passe devant les piliers, le trône et l'estrade : un liseré sombre l'en détache
    cut({ ...ROBE, grow: 20 }),
    cut({ ...HAND, grow: 20 }),
    cut({ ...FIST, grow: 20 }),
    cut({ ...FOOT, grow: 20 }),
    ROBE,
    FOOT,
    HAND,
    // les manches détachées du buste par un trait, pour que les bras se lisent dans la masse de la robe
    cut(line([[404, 446], [402, 520], [396, 590], [376, 628]], 10)),
    cut(line([[590, 450], [593, 520], [600, 572], [612, 602]], 10)),
    // la tête, et la couronne crénelée à trois merlons ; un trait découpé sous la couronne la pose sur la tête au lieu
    // de la fondre dans les cheveux
    HEAD,
    poly([[444, 280], [540, 280], [536, 308], [448, 308]]),
    poly([[444, 262], [466, 262], [466, 282], [444, 282]]),
    poly([[481, 257], [503, 257], [503, 282], [481, 282]]),
    poly([[518, 262], [540, 262], [540, 282], [518, 282]]),
    cut(line([[440, 316], [492, 312], [544, 316]], 10)),
    // l'épée tenue droite : la lame et la garde détachées de ce qui est derrière, la poignée et le pommeau dans le poing
    cut({ ...BLADE, grow: 20 }),
    cut({ ...CROSS, width: 16 + 20 }),
    cut({ ...circle(262, 378, 10), grow: 20 }),
    cut({ ...circle(370, 378, 10), grow: 20 }),
    BLADE,
    CROSS,
    circle(262, 378, 10),
    circle(370, 378, 10),
    line([[316, 386], [316, 444]], 16),
    circle(316, 455, 11),
    FIST,
    // la balance : sous le poing, la poignée se détache du pilier ; autour du fléau et des plateaux, tout le champ est
    // découpé d'un bloc, pour qu'aucun éclat de pilier ou de robe ne reste pris entre les cordons
    cut(line([[PIVOT[0], 512], [PIVOT[0], 545]], 16 + 20)),
    cut(poly([[621, 529], [752, 529], [764, 636], [758, 668], [604, 668], [599, 636]])),
    line([[PIVOT[0], 486], [PIVOT[0], 584]], 16),
    circle(PIVOT[0], 590, 10),
    line([[PIVOT[0] - 40, PIVOT[1]], [PIVOT[0] + 40, PIVOT[1]]], 14),
    circle(PIVOT[0] - 40, PIVOT[1], 9),
    circle(PIVOT[0] + 40, PIVOT[1], 9),
    pan(PIVOT[0] - 40),
    pan(PIVOT[0] + 40),
  ];
}

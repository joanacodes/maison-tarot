// La Mort (Death, XIII), d'après la carte de Pamela Colman Smith, 1909 : le squelette en armure sur le cheval blanc, la bannière noire à la rose découpée, le roi tombé sous les sabots, l'évêque aux mains jointes, la jeune fille et l'enfant à genoux.
import { blob, circle, cut, ellipse, limb, line, poly } from '../kit/silhouettes/lib.mjs';
import { member } from '../shapes.mjs';

const rad = (d) => (d * Math.PI) / 180;

// des points dessinés autour de (0, 0), tournés de deg et posés en (x, y)
const place = (points, x, y, deg = 0) => points.map(([u, v]) => [x + u * Math.cos(rad(deg)) - v * Math.sin(rad(deg)),
  y + u * Math.sin(rad(deg)) + v * Math.cos(rad(deg))]);

// ce qui passe devant une autre forme en est détaché par une marge : son contour grossi de g / 2 tout autour est ôté
// de ce qui est dessous, puis la forme est dessinée
const gap = (shapes, g = 20) => [shapes].flat(Infinity)
  .map((s) => cut(s.stroke ? { ...s, width: s.width + g } : { ...s, grow: (s.grow ?? 0) + g }));

// un trait effilé le long d'une courbe, de la demi-largeur w0 au départ à w1 au bout (un panache)
function taper(points, w0, w1) {
  const n = points.length - 1;
  const w = (k) => w0 + ((w1 - w0) * k) / n;
  return member(points, points.slice(0, -1).map((_, k) => [[0, w(k), w(k)], [0.5, w(k + 0.5), w(k + 0.5)],
    ...(k === n - 1 ? [[1, w1, w1]] : [])]), 1);
}

// un membre de demi-largeurs égales des deux côtés, de jointure en jointure
const limbOf = (joints, ...widths) => member(joints, widths.map((seg) => seg.map(([t, w]) => [t, w, w])), 1);

// la rose, signe de la carte, découpée dans la bannière : cinq pétales ronds, un sépale en feuille dans chaque creux,
// et le cœur laissé plein au milieu pour qu'on lise une fleur et non une tache
function rose(cx, cy) {
  const holes = [circle(cx, cy, 46)];
  for (let k = 0; k < 5; k += 1) {
    const a = rad(-90 + 72 * k);
    holes.push(circle(cx + 46 * Math.cos(a), cy + 46 * Math.sin(a), 33));
    const b = a + rad(36);
    holes.push(ellipse(cx + 72 * Math.cos(b), cy + 72 * Math.sin(b), 18, 11, (b * 180) / Math.PI));
  }
  return [...holes.map(cut), circle(cx, cy, 21)];
}

export function draw() {
  // le roi tombé, couché sur le dos : la tête à gauche, le manteau d'hermine sur le corps, les jambes sous le sabot
  const king = blob([[300, 912], [302, 878], [318, 856], [346, 840], [378, 838], [404, 850], [422, 866], [446, 874],
    [472, 878], [474, 912]]);
  const kingHead = circle(284, 888, 23);
  // sa couronne a roulé sous le sabot levé : posée à l'écart de la jambe d'appui et ne touchant le sol que d'un coin,
  // elle garde sa forme de couronne, ce qu'elle ne ferait pas tombée contre son manteau comme sur la carte
  const fallenCrown = [
    poly(place([[-28, 0], [28, 0], [30, -32], [14, -17], [0, -36], [-14, -17], [-30, -32]], 512, 902, -16)),
    ...place([[-31, -38], [0, -43], [31, -38]], 512, 902, -16).map(([x, y]) => circle(x, y, 7.5)),
  ];

  // le cheval blanc qui marche vers la droite, l'antérieur droit levé ; la carte coupe son arrière-main au cadre :
  // on l'achève un peu au-delà (croupe, queue, un postérieur) pour qu'il tienne debout sans le cadre
  const plantedLeg = limbOf([[456, 616], [449, 742], [440, 868]], [[0, 30], [0.4, 24], [0.85, 18]],
    [[0, 17], [0.5, 14], [1, 16]]);
  const plantedHoof = poly([[424, 876], [456, 873], [470, 911], [418, 913]]);
  const horse = [
    // la queue qui pend derrière la fesse
    blob([[192, 494], [178, 506], [164, 530], [154, 566], [149, 606], [149, 646], [154, 684], [163, 712], [173, 690],
      [176, 656], [180, 616], [185, 578], [192, 546]]),
    // le postérieur : la jambe qui descend en arrière jusqu'au jarret, puis le canon droit
    limbOf([[238, 612], [198, 758], [204, 866]], [[0, 32], [0.5, 24], [0.9, 16]], [[0, 15], [0.5, 12], [1, 14]]),
    poly([[190, 872], [216, 868], [232, 909], [184, 911]]),
    // l'encolure épaisse et le corps
    blob([
      [428, 442], [446, 410], [472, 382], [506, 358], [546, 342], [586, 333], [612, 332], [604, 370], [598, 410],
      [596, 446], [590, 472], [578, 498], [568, 522], [564, 548], [552, 572], [532, 592],
      [500, 608], [460, 620], [410, 630], [350, 638], [290, 640], [250, 634], [214, 618], [190, 598], [174, 566],
      [172, 530], [182, 502], [204, 482], [240, 472], [290, 470], [340, 466], [390, 456]]),
    // l'antérieur levé, le genou plié, le sabot replié en arrière
    limbOf([[508, 612], [580, 700], [562, 778]], [[0, 30], [0.4, 24], [0.85, 19]], [[0, 18], [0.5, 14], [1, 15]]),
    poly([[536, 780], [558, 786], [550, 818], [512, 814]]),
    plantedLeg,
    plantedHoof,
  ];
  // la tête portée droite, chanfrein vertical, détachée de l'encolure par son contour comme sur la carte
  const horseHead = blob([[616, 332], [636, 338], [650, 352], [655, 380], [656, 420], [653, 455], [647, 480], [636, 495],
    [622, 497], [610, 488], [603, 472], [597, 452], [594, 425], [596, 395], [601, 365], [607, 343]]);
  // l'oreille et le panache de la têtière, assez bas pour ne pas toucher la bannière
  const horseCrest = [
    blob([[638, 352], [646, 332], [656, 314], [664, 324], [662, 344], [656, 356]]),
    taper([[626, 344], [622, 324], [608, 314], [592, 320]], 10, 7),
  ];
  // les rênes, du gantelet à la bouche, tracées en creux sur l'encolure blanche
  const reins = cut(line([[444, 428], [520, 452], [604, 482]], 13));
  // la housse de selle, posée sur le flanc ; la jambe du cavalier passe devant
  const saddle = blob([[282, 494], [330, 497], [376, 496], [378, 535], [372, 572], [356, 600], [326, 611], [300, 602],
    [287, 572], [281, 532]]);

  // la hampe et la bannière noire ; la rose y est découpée
  const banner = [
    line([[448, 60], [431, 420]], 16),
    circle(448, 54, 13),
    poly([[452, 74], [575, 77], [690, 84], [695, 150], [688, 222], [693, 292], [575, 296], [452, 290]]),
  ];

  // le cavalier : la cuirasse bombée, le bras qui tient la hampe, la jambe armée jusqu'au soleret pointu
  const rider = [
    blob([[340, 244], [374, 246], [380, 272], [336, 272]]),
    blob([[358, 258], [376, 274], [384, 300], [382, 336], [374, 376], [366, 414], [364, 446], [370, 474], [356, 496],
      [322, 502], [290, 498], [275, 472], [268, 432], [264, 384], [262, 332], [268, 300], [284, 276], [312, 260]]),
    limbOf([[346, 286], [366, 330], [378, 344], [418, 347]], [[0, 18], [0.5, 17]], [[0, 16]], [[0, 15], [0.5, 14], [1, 13]]),
    blob([[418, 332], [436, 328], [452, 334], [456, 348], [450, 362], [432, 365], [416, 358]]),
    limbOf([[330, 488], [404, 562], [414, 684]], [[0, 26], [0.5, 24]], [[0, 21], [0.5, 17], [1, 14]]),
    circle(404, 562, 22),
    blob([[398, 676], [428, 678], [452, 700], [484, 738], [452, 734], [416, 722], [396, 706]]),
  ];
  // le crâne, tourné de trois quarts vers la droite comme sur la carte : deux orbites et le trou du nez le disent
  // squelette mieux qu'un profil, qui se lit comme un visage
  const skull = blob([[338, 200], [364, 196], [390, 198], [402, 208], [404, 224], [401, 240], [394, 252], [390, 262],
    [382, 272], [364, 276], [350, 270], [342, 256], [336, 236]]);
  const sockets = [circle(354, 225, 7), ellipse(382, 224, 6.5, 7.5), ellipse(370, 253, 5.5, 6.5)].map(cut);
  // le casque à visière et couvre-nuque, détaché du crâne pour que celui-ci se lise, et son panache rouge qui retombe
  // derrière, dessiné après lui pour y rester attaché
  const plume = taper([[318, 166], [294, 152], [268, 162], [252, 186], [244, 212], [242, 238]], 13, 8);
  const helmet = blob([[268, 246], [278, 226], [290, 204], [302, 184], [316, 168], [330, 154], [348, 145], [366, 150],
    [380, 164], [390, 180], [402, 190], [386, 194], [362, 191], [344, 193], [328, 203], [312, 220], [292, 238]]);
  // le bras de la bride passe devant la cuirasse : il en est détaché
  const reinsArm = [
    limbOf([[300, 296], [312, 378], [398, 416]], [[0, 18], [0.5, 17]], [[0, 16], [0.5, 15], [1, 13]]),
    blob([[392, 404], [414, 400], [436, 406], [446, 420], [440, 436], [418, 442], [396, 434]]),
  ];

  // l'évêque debout devant le cheval, la tête levée vers la Mort, les mains jointes dressées
  const bishop = [
    blob([[670, 576], [652, 588], [636, 602], [626, 640], [620, 700], [616, 780], [612, 860], [610, 912], [764, 912],
      [766, 820], [764, 720], [760, 640], [752, 596], [736, 572], [712, 562]]),
    blob([[658, 534], [649, 544], [642, 554], [648, 560], [648, 568], [655, 577], [672, 583], [694, 576], [708, 558],
      [706, 536]]),
    limbOf([[652, 626], [616, 598]], [[0, 15], [0.5, 14], [1, 13]]),
    blob([[618, 606], [624, 590], [612, 574], [598, 560], [586, 552], [584, 566], [592, 584], [602, 600]]),
  ];
  // la mitre, haute et pointue, penchée en arrière avec la tête : détachée du visage
  const mitre = poly(place([[-27, 0], [-27, -20], [-22, -40], [-12, -56], [0, -68], [12, -56], [22, -40], [27, -20],
    [27, 0]], 680, 540, 22));

  // l'enfant à genoux face au cheval, qui lui tend des fleurs
  const child = [
    circle(624, 784, 18),
    blob([[612, 800], [638, 802], [650, 826], [654, 862], [654, 900], [622, 906], [584, 906], [578, 884], [586, 852],
      [598, 822]]),
    limbOf([[608, 818], [592, 812]], [[0, 11], [1, 9]]),
    blob([[574, 804], [584, 794], [598, 798], [604, 810], [598, 822], [584, 824], [574, 816]]),
  ];

  // la jeune fille agenouillée qui se détourne, la tête renversée, les cheveux longs dans le dos
  const maiden = [
    ellipse(732, 722, 19, 25, -30),
    blob([[728, 702], [744, 694], [758, 702], [765, 722], [768, 748], [770, 776], [762, 792], [755, 770], [749, 746],
      [742, 728]]),
    limb(718, 740, 11, 714, 762, 13),
    blob([[704, 754], [740, 752], [758, 764], [764, 800], [766, 860], [766, 912], [700, 914], [662, 912], [670, 886],
      [682, 850], [692, 806], [698, 774]]),
  ];

  return [
    king,
    gap(kingHead),
    kingHead,
    // la jambe d'appui du cheval passe devant le roi
    gap([plantedLeg, plantedHoof]),
    horse,
    gap(horseHead),
    horseHead,
    horseCrest,
    reins,
    gap(saddle),
    saddle,
    banner,
    rose(570, 186),
    gap(rider),
    rider,
    skull,
    gap(helmet),
    helmet,
    plume,
    sockets,
    gap(reinsArm),
    reinsArm,
    bishop,
    gap(mitre),
    mitre,
    gap(child),
    child,
    gap(maiden),
    maiden,
    fallenCrown,
    // le sol
    poly([[170, 910], [768, 906], [770, 936], [168, 938]]),
  ];
}

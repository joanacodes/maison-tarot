// Le Pendu (The Hanged Man, XII), d'après la carte de Pamela Colman Smith, 1909 : l'homme pendu la tête en bas par un pied au tau de bois vivant, l'autre jambe repliée en 4, les bras dans le dos, la tête dans son auréole.
import { blob, circle, cut, line } from '../kit/silhouettes/lib.mjs';

const HALO = [490, 756];

// la tunique renversée : les hanches en haut, la ceinture, puis le buste qui s'élargit jusqu'aux coudes ramenés
// dans le dos, ce triangle sous la ceinture que dessinent les bras liés
const TUNIC = blob([[414, 448], [430, 436], [460, 432], [500, 432], [540, 436], [556, 452], [558, 480], [552, 510],
  [546, 535], [548, 560], [556, 588], [590, 608], [624, 626], [648, 645], [654, 662], [642, 684], [610, 694],
  [570, 698], [530, 700], [510, 698], [474, 698], [450, 700], [410, 698], [370, 692], [340, 682], [324, 664],
  [330, 644], [356, 624], [392, 606], [424, 588], [436, 562], [438, 538], [428, 510], [416, 480]]);
// la jambe libre, repliée derrière l'autre : le genou à gauche, la cuisse qui rentre sous la tunique, le tibia à
// l'horizontale et le pied qui ressort à droite en pointant vers le haut
const FREE_LEG = blob([[372, 402], [392, 392], [430, 390], [480, 391], [520, 393], [552, 397], [560, 412], [552, 425],
  [520, 428], [480, 428], [452, 432], [456, 452], [450, 470], [430, 470], [402, 454], [378, 440], [364, 422]]);
const FREE_FOOT = blob([[548, 398], [570, 384], [592, 370], [612, 362], [619, 368], [611, 382], [592, 400],
  [572, 416], [552, 426]]);
// la jambe pendue, droite, le pied plié vers la traverse
const HANGING_LEG = blob([[503, 452], [504, 400], [507, 340], [511, 280], [514, 236], [515, 220], [512, 206],
  [516, 192], [528, 178], [542, 166], [554, 159], [561, 165], [557, 181], [550, 198], [547, 216], [546, 240],
  [545, 300], [544, 380], [545, 452]]);
// la tête renversée, le cou en haut, les cheveux qui pendent, raccourcis pour tenir dans l'auréole
const HEAD = blob([[474, 692], [506, 692], [516, 712], [519, 740], [521, 772], [522, 796], [514, 810], [500, 816],
  [482, 816], [466, 810], [458, 796], [459, 772], [461, 740], [464, 712]]);

export function draw() {
  return [
    // l'arbre en tau : la traverse d'un bord à l'autre, le tronc jusqu'en bas ; des feuillages, seulement quelques
    // bourgeons pris dans le contour du bois, loin des bouts (des bosses aux deux bouts en feraient un os)
    blob([[238, 112], [300, 109], [338, 107], [352, 98], [366, 107], [430, 110], [520, 106], [600, 109], [638, 105],
      [652, 97], [666, 106], [712, 108], [762, 111], [764, 146], [712, 150], [654, 149], [640, 158], [626, 150],
      [560, 151], [470, 150], [400, 149], [332, 151], [318, 160], [304, 151], [237, 148]]),
    blob([[452, 140], [503, 140], [505, 300], [506, 480], [509, 700], [511, 900], [511, 930], [446, 930], [446, 900],
      [448, 700], [449, 480], [446, 316], [438, 300], [448, 286], [450, 230], [440, 214], [450, 200]]),
    // l'auréole en anneau : le tronc s'efface derrière elle, et le vide entre l'anneau et la tête reste ouvert
    cut(circle(...HALO, 102)),
    circle(...HALO, 92),
    cut(circle(...HALO, 74)),
    // le corps passe devant l'arbre et l'auréole : un liseré sombre l'en détache
    cut({ ...TUNIC, grow: 20 }),
    cut({ ...FREE_LEG, grow: 20 }),
    cut({ ...FREE_FOOT, grow: 20 }),
    cut({ ...HANGING_LEG, grow: 20 }),
    cut({ ...HEAD, grow: 20 }),
    FREE_LEG,
    FREE_FOOT,
    // le pli du genou, entre le tibia et la cuisse : sans lui la jambe repliée se fond dans les hanches
    cut(line([[398, 423], [450, 426], [494, 428]], 10)),
    // la jambe pendue passe devant le tibia replié : la croix du 4 se lit grâce à ce second liseré
    cut({ ...HANGING_LEG, grow: 20 }),
    HANGING_LEG,
    // la corde qui lie la cheville à la traverse
    line([[522, 128], [524, 210]], 16),
    TUNIC,
    HEAD,
  ];
}

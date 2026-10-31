// Une forme de plus que le kit (kit/silhouettes/lib.mjs), pour les personnages des cartes.
import { blob } from './kit/silhouettes/lib.mjs';

// un membre d'un seul contour lisse, sans les bosses qu'auraient des cercles mis bout à bout : `joints`, les points de
// l'os, du corps vers l'extrémité ; pour chaque segment, un profil [t, dehors, dedans] des demi-largeurs à la fraction t
// du segment, le dehors étant à gauche de l'écran (out = -1) ou à droite (out = 1) quand l'os pointe vers le bas.
// Repris du Zeus des silhouettes de The Astro Study.
export function member(joints, profiles, out) {
  const outer = [];
  const inner = [];
  for (let k = 0; k < joints.length - 1; k += 1) {
    const [ax, ay] = joints[k];
    const [bx, by] = joints[k + 1];
    const len = Math.hypot(bx - ax, by - ay);
    const nx = (by - ay) / len;
    const ny = -(bx - ax) / len;
    for (const [t, wo, wi] of profiles[k]) {
      const px = ax + (bx - ax) * t;
      const py = ay + (by - ay) * t;
      outer.push([px + out * nx * wo, py + out * ny * wo]);
      inner.push([px - out * nx * wi, py - out * ny * wi]);
    }
  }
  return blob([...outer, ...inner.reverse()]);
}

#!/usr/bin/env python3
"""Gros plans des symboles, découpés dans les scans de 1909 (domaine public) d'après data/zoom/<symbole>.yml.

  python3 tools/zoom.py              # tous les symboles
  python3 tools/zoom.py dog lion     # seulement ceux-là

Chaque entrée du fichier donne la carte et le cadre à découper, en fractions de la carte
(gauche, haut, droite, bas : 0 = bord gauche ou haut, 1 = bord droit ou bas). Les fractions survivent
à un changement de résolution des scans ; des pixels non. Le résultat va dans assets/zoom/<symbole>/,
agrandi pour que le grand côté fasse 900 px : un détail de 150 px reste lisible sur un écran de téléphone.
Le cadre est la seule saisie : pour corriger un gros plan, on corrige le YAML et on relance.
"""
import os, sys
from PIL import Image
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LONG_SIDE = 900


def render(symbol):
    entries = yaml.safe_load(open(os.path.join(ROOT, 'data', 'zoom', symbol + '.yml'), encoding='utf-8')) or []
    out_dir = os.path.join(ROOT, 'assets', 'zoom', symbol)
    os.makedirs(out_dir, exist_ok=True)
    wanted = set()
    for i, e in enumerate(entries, 1):
        x0, y0, x1, y1 = e['box']
        if not (0 <= x0 < x1 <= 1 and 0 <= y0 < y1 <= 1):
            sys.exit(f'{symbol} #{i}: cadre hors de la carte ou inversé : {e["box"]}')
        card = Image.open(os.path.join(ROOT, 'assets', 'cards', e['card'] + '.webp')).convert('RGB')
        w, h = card.size
        crop = card.crop((round(x0 * w), round(y0 * h), round(x1 * w), round(y1 * h)))
        scale = LONG_SIDE / max(crop.size)
        if scale > 1:
            crop = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.LANCZOS)
        name = f'{i}-{e["card"]}.jpg'
        crop.save(os.path.join(out_dir, name), 'JPEG', quality=86, optimize=True)
        wanted.add(name)
        print(f'{symbol}/{name}  {crop.width}×{crop.height}')
    # Un gros plan retiré du YAML ne doit pas rester en ligne
    for f in os.listdir(out_dir):
        if f not in wanted:
            os.remove(os.path.join(out_dir, f))


if __name__ == '__main__':
    names = sys.argv[1:] or sorted(f[:-4] for f in os.listdir(os.path.join(ROOT, 'data', 'zoom')) if f.endswith('.yml'))
    for n in names:
        render(n)

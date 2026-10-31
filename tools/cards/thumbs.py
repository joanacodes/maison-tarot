"""Petites copies WebP des images, pour la page qui les montre toutes (page.mjs) : les originaux de 2000 px, par
centaines, ne tiendraient pas dans une page. Lit sur l'entrée standard une paire « source<TAB>destination » par ligne
et écrit chaque destination à LARGEUR px de large, proportions gardées.

    python3 -I tools/cards/thumbs.py <largeur> < paires.tsv
"""

import sys
from pathlib import Path

from PIL import Image

width = int(sys.argv[1])
for row in sys.stdin:
    src, dest = row.rstrip('\n').split('\t')
    picture = Image.open(src)
    # les dessins sont en niveaux de gris, les scans de 1909 en couleur : chacun garde ses canaux
    picture = picture.convert('L' if picture.mode in ('L', 'LA') else 'RGB')
    height = round(picture.height * width / picture.width)
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    picture.resize((width, height), Image.LANCZOS).save(dest, 'WEBP', quality=82, method=6)

# Images du site — prompts Gemini

Le site affiche tout en noir et blanc et rend la couleur au survol (bureau) ou au défilement (mobile). Donc **chaque image doit exister en couleur**, et être belle dans les deux états. Générez en couleur ; le site fait le reste.

## Règles pour toutes les images

- Pas de lune, pas d’étoiles, pas de bougies, pas de boule de cristal, pas de fumée, pas de mains de sorcière, pas de violet. Rien de « mystique » : on démystifie.
- Une seule source de lumière, naturelle (fenêtre), contraste net, ombres franches — c’est ce qui rend bien en noir et blanc.
- Décor : la Maison — bois sombre, papier, plantes, une table, une théière, des livres. Une maison, pas un cabinet.
- Cartes : toujours le Rider-Waite-Smith de 1909 (domaine public). Jamais un autre jeu, jamais un jeu inventé.
- Pas de texte lisible dans l’image (Gemini l’écrit mal). Pas de visage d’une personne réelle autre que vous.
- Format : demandez du **4:5 vertical** pour les portraits, **16:10 horizontal** pour les scènes. Résolution maximale ; le site redimensionne.
- Style constant d’une image à l’autre : « photographie éditoriale, film 35 mm, grain léger, tons chauds, pas de retouche beauté ».

Suffixe à coller à la fin de chaque prompt :

> Editorial photograph, 35mm film look, light grain, single natural window light, warm tones, high contrast that also reads well in black and white, no text, no moon, no stars, no candles, no crystal ball, no smoke, no purple, Rider-Waite-Smith 1909 tarot deck only.

## Les images, par fichier

Chaque fichier va dans `content/fr/` **et** `content/en/` (même image, deux emplacements), sauf mention contraire.

### `hero.jpg` — accueil (portrait 4:5)
> A woman in her thirties sits at a dark wooden table in a lived-in Parisian apartment, holding a small stack of Rider-Waite-Smith tarot cards loosely in one hand, looking directly at the camera with a calm, slightly amused, honest expression. Plants on the windowsill, a teapot and an open notebook with tally marks on the table. Shot from slightly above the table, waist up.

Si vous préférez ne pas apparaître : remplacez « A woman … looking at the camera » par « Two hands … » et gardez le reste.

### `method.jpg` — bloc méthode de l’accueil (paysage 16:10)
> Overhead shot of an open notebook filled with handwritten tally marks and short notes, next to three Rider-Waite-Smith cards face up, a pencil, and a cup of tea on a dark wooden table. Daylight from the left.

### `session.jpg` — page Sessions (portrait 4:5)
> A laptop open on a wooden table showing a video call (screen blurred, no readable text), beside it one Rider-Waite-Smith card face up and a hand about to turn a second card. Late afternoon light, plants in the background.

### `workshop.jpg` — page Ateliers (portrait 4:5)
> A long wooden table seen from one end, eight to ten people of different ages leaning over spreads of Rider-Waite-Smith cards, talking, one person laughing, one pointing at a card. Bright room with tall windows and plants. Candid, not posed.

### `guide.jpg` — page Guide (paysage 16:10, optionnel)
> A single Rider-Waite-Smith card lying on cream paper next to a fountain pen and a folded letter, overhead, hard daylight, very simple composition.

### `about.jpg` — page À propos (portrait 4:5)
> The same woman as the hero image, standing by a window with a cup of tea, not looking at the camera, a bookshelf behind her. Relaxed, ordinary, at home.

### Les 78 cartes — `content/fr/bibliotheque/cartes/<slug>.jpg`
Pas de génération : utilisez les scans du **Rider-Waite-Smith de 1909** (domaine public, par exemple sur Wikimedia Commons, version « Pamela-A »). Une image par carte, nommée comme le fichier de la carte (`le-mat.jpg`, `the-fool.jpg`).

### Nouvelles images demandées par la mise en page bureau
Mêmes règles, même suffixe. Toutes dans `content/fr/` et `content/en/`.

- `step-1.jpg`, `step-2.jpg`, `step-3.jpg` (paysage 4:3) — la séquence « on essaie d'abord » : (1) une main qui retourne une carte, (2) une carte à côté d'un carnet et d'une note manuscrite, (3) deux personnes penchées sur un tirage.
- `event.jpg` (paysage) — une soirée de lectures en ligne : un écran avec une grille de visages floutés, une carte tenue devant la caméra.
- `guide.jpg` (paysage, servira sous une carte de verre) — texture simple : cartes en éventail sur papier blanc, lumière dure, beaucoup de vide.
- `booking.jpg` (paysage, sous une carte de verre) — une table vide, une théière, une chaise qui attend. Calme.
- `ws-colours.jpg`, `ws-numbers.jpg`, `ws-elements.jpg` (paysage 4:3) — trois gros plans de cartes classées par couleur / par nombre / par famille.
- `cover.jpg` par article (`content/fr/blog/<slug>/cover.jpg`, portrait 3:4) — une image par article, générée d'après son sujet.
- `country-1.jpg`, `country-2.jpg` par pays (paysage 16:11) — pas de cliché touristique : une pièce, une fenêtre, une table ; la ville se devine, elle ne s'affiche pas.

### Six visuels par lentille (fin de chaque page de la Bibliothèque, sauf les cartes)
Fichiers `visual-1.jpg` … `visual-6.jpg` dans le dossier de la page (`content/fr/bibliotheque/elements/eau/visual-1.jpg` — la page devient alors un dossier avec `index.md`). Portrait 4:5. Chaque image illustre une idée de la page, sans texte. Décrivez-les dans le front matter (`gallery:` — src, title, text).
> Exemple pour l'Eau : (1) une goutte qui s'infiltre dans du bois, (2) une maison dont un mur est moisi, (3) une rivière calme qui porte une barque, (4) deux personnes en conversation chaleureuse, (5) une tasse renversée sur une table, (6) un verre d'eau plein, en plein soleil.

### Témoignages
`testimonials.jpg` (paysage 4:3) — une table en bois vue de dessus avec un tirage et un carnet ; sobre, la photo ne montre personne. Les portraits des personnes citées : `content/<lang>/t-<prenom>.jpg`, carré, uniquement avec accord écrit.

### Figures historiques
Une gravure ou un portrait d'époque par figure (domaine public), `content/fr/bibliotheque/figures/<slug>/portrait.jpg`, portrait 3:4. La mise en page reprend l'article éditorial : titre à gauche, portrait au centre, chapeau à droite.

### Textures (optionnel)
Le site génère déjà le grain papier et les hachures en CSS. Si vous voulez une texture gravée derrière certains titres :
> Close-up of an antique copperplate engraving texture, fine cross-hatching lines on cream paper, no recognisable subject, black ink only, scanned flat.

## Ce que vous m’envoyez
Les fichiers nommés comme ci-dessus, en JPG qualité maximale. Je les place, je vérifie le rendu noir et blanc / couleur, et j’ajuste le cadrage si besoin.

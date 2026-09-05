# Maison Tarot — site

Hugo (v0.165, extended) · bilingue FR/EN · GitHub Pages · noir et blanc, clair/sombre, un filet d’or. Polices : Schibsted Grotesk (titres), Inter (texte), DM Mono (étiquettes).

## Lancer en local

```
hugo server -D        # -D affiche aussi les brouillons (modèles d'article, d'événement, de carte, de ville)
```
Puis http://localhost:1313/ — la racine est le site anglais ; le français est sous /fr/. Le bandeau propose l'autre langue, ne redirige jamais.

## Où sont les choses

| Quoi | Où |
| --- | --- |
| Réglages (domaine, Cal.com, Brevo, autrice, mentions légales, chiffres) | `hugo.toml` → `[params]` — tout ce qui est vide affiche un marqueur ¶ doré sur le site |
| Textes d’interface FR/EN (menus, bandeau langue, disclaimer, boutons) | `i18n/fr.toml`, `i18n/en.toml` |
| Pays (devise, fuseaux, hreflang) et refus | `data/countries.yml`, `data/refusals.yml` |
| Pages françaises / anglaises | `content/fr/…` / `content/en/…` — chaque paire est liée par `translationKey` |
| Design | `assets/css/site.css` (variables en tête), `assets/js/site.js` |
| Gabarits | `layouts/` — `offer/` (sessions, ateliers), `events/`, `library/`, `cards/`, `blog/`, `country/`, `metro/`, `legal/` |
| Images | à côté du contenu qui les utilise : `content/fr/hero.jpg` → `heroImage: hero.jpg`. Hugo les convertit en WebP (3 tailles). Tant qu’une image manque, un cadre texturé dit laquelle. |

## Ajouter…

- **un événement** : copier `content/fr/evenements/exemple-lectures-en-ligne.md`, renommer, remplir, `draft: false`. Un événement en personne dans une ville apparaît aussi sur la page de cette ville (champ `city`).
- **un article** : copier `content/fr/blog/modele-article.md` (et son jumeau EN, même `translationKey`).
- **une carte** : copier `content/fr/bibliotheque/cartes/le-mat.md` ; le tableau des lentilles vient du front matter.
- **une ville** : copier `content/fr/france/tarot-lyon.md` dans le dossier du pays. Elle reste `draft` tant que le corps n’est pas rempli avec du vrai.
- **une page de la Bibliothèque** : un `.md` dans la section, `type: library`, `related:` pour le maillage.

## Ajouts v3

- **Avertissements** : une seule page (`content/fr/avertissements.md`, `content/en/disclaimers.md`) avec des ancres ; chaque page y renvoie via le partial `see-disclaimers.html` (ⓘ). La phrase légale complète reste dans le bloc de réservation (point de vente).
- **Recherche** : index JSON par langue (`/fr/index.json`, `/en/index.json`, gabarit `layouts/home.searchindex.json`), overlay verre, raccourci Ctrl/⌘ K.
- **Cartes** : `data/cards.yml` (78 cartes, lentilles Golden Dawn — à valider par l'hôte), images 1909 dans `assets/cards/` (domaine public), page index en accordéon plein écran avec diaporama aléatoire, filtres.
- **Événements** : inscription dans un dialogue (verre) sans changer de page ; `eventFormAction` dans `hugo.toml` ; bandeau mobile « prochain événement » qui disparaît après inscription.
- **Contact** : `languages.<lang>.params.email` (bonjour@maisontarot.fr / hello@maisontarot.com).

## Ajouts v4

- Badge « complet jusqu'en … » + liste d'attente : `languages.<lang>.params.bookedUntil` (vide = rien).
- Guide : bouton → email → téléchargement immédiat de `languages.<lang>.params.guideFile` (déposer le PDF dans `static/guide/`).
- Témoignages : `data/testimonials.yml` (le bloc n'apparaît que s'il y a des entrées).
- Cartes : préchargeur, accordéon au clavier (← →), mobile en défilement horizontal ; symboles via `partials/sym.html`.
- Bibliothèque : ligne de lecture (ordre), filtres (`categories`/`tags` sur chaque page), tuile 78 cartes en diaporama.
- Blog : dernier article en héros, article `featured: true`, recherche + filtres par `categories`, grille infinie.
- Shortcodes `{{< six >}}` (six visuels depuis `gallery:`) et `{{< versus >}}`.

## Ajouts v5

- Anglais à la racine (`/`), français sous `/fr/` ; `/en/` redirige vers `/`.
- Podcast : `content/<lang>/podcast/` (section `type: podcast`, un `.md` par épisode, modèle fourni). Plateformes dans `hugo.toml` → `[params.podcast]` ; un épisode avec `start:` futur affiche un compte à rebours.
- Badge « Disponible en … » (vert) ; ligne de lecture réduite aux cinq essentiels ; page cartes : header et héros noirs, survol = ouvre, clic = verrouille.

## Avant la mise en ligne

1. `baseURL` dans `hugo.toml` + `static/CNAME` avec le domaine choisi (un seul ; les autres domaines redirigent en 301 chez le registrar).
2. Les champs vides de `[params.author]` et `[params.legal]`.
3. `calLink` **seulement** après l’accord écrit du processeur de paiement ; `formAction` quand Brevo est prêt (double opt-in activé).
4. Relire les CGV avec un·e avocat·e (rétractation, annulation, médiateur).
5. Settings → Pages → Source : GitHub Actions. Pousser sur `main`.

## Règles du site (résumé)

Jamais de redirection par langue. Un seul domaine canonique. Rien d’inventé : pas de Person schema sans nom, pas de Review/AggregateRating, pas de page ville sans contenu réel. Le disclaimer est dans le pied de chaque page, dans la réservation et dans chaque événement. Medium et Substack ne publient jamais en premier.

#!/usr/bin/env python3
"""Toutes les images du site à partir de leurs prompts, rangées là où le site les attend.

  python3 tools/images.py                    # liste ce qui manque et écrit docs/image-prompts.csv
  python3 tools/images.py --generate         # génère ce qui manque (clé : variable GEMINI_API_KEY)
  python3 tools/images.py --generate --only covers --limit 5   # essai sur cinq couvertures

Sources des prompts (une seule saisie, dans le front matter) :
  - couverture d'article : `imagePrompt` → assets/covers/<slug anglais>.jpg (le français réutilise l'image anglaise) ;
  - six visuels de la Bibliothèque : `gallery[].prompt` → assets/visuals/<translationKey>/<n>.jpg.
Un fichier déjà présent n'est jamais régénéré : pour refaire une image, supprimez-la.
Quand le sujet d'un prompt nomme une carte du jeu de 1909, le scan de cette carte (assets/cards/<id>.webp) part avec
le prompt : un générateur qui redessine une carte de mémoire la trahit toujours (mauvais personnages, texte inventé).
Il faut Pillow (`pip install pillow`) pour enregistrer en JPEG ce que l'API renvoie en PNG.
"""
import argparse, base64, csv, io, json, os, re, sys, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = 'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'


def front_matter(path):
    text = open(path, encoding='utf-8').read()
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        return {}
    try:
        import yaml
    except ImportError:
        sys.exit('PyYAML est nécessaire : pip install pyyaml')
    return yaml.safe_load(m.group(1)) or {}


def card_ids(prompt):
    """Les cartes que nomme la première phrase d'un prompt « … from the 1909 Rider-Waite-Smith deck … »."""
    subject = prompt.split('. ')[0]
    if '1909 Rider-Waite-Smith' not in subject:
        return []
    import yaml
    cards = yaml.safe_load(open(os.path.join(ROOT, 'data', 'cards.yml'), encoding='utf-8'))
    found = []
    # Les noms longs d'abord : « Ten of Swords » ne doit pas aussi trouver « The Sun » dans « The Sun and … »
    for c in sorted(cards, key=lambda c: -len(c['name_en'])):
        name = re.sub(r'^The ', '', c['name_en'])
        m = re.search(r'\b(?:the )?' + re.escape(name) + r'\b', subject, re.I)
        if m and not any(a <= m.start() < b for a, b, _ in found):
            found.append((m.start(), m.end(), c['id']))
    return [i for _, _, i in sorted(found)][:4]


def jobs():
    """Une ligne par image attendue, dédoublonnée : l'anglais et le français partagent le même fichier."""
    seen = {}
    for lang in ('en', 'fr'):
        for dirpath, _, files in os.walk(os.path.join(ROOT, 'content', lang)):
            for f in sorted(files):
                if not f.endswith('.md'):
                    continue
                p = os.path.join(dirpath, f)
                fm = front_matter(p)
                if fm.get('draft'):
                    continue
                img, prompt = fm.get('image'), fm.get('imagePrompt')
                if isinstance(img, str) and img.startswith('covers/') and prompt:
                    seen.setdefault(img, dict(kind='covers', target='assets/' + img, aspect='4:3', prompt=prompt, page=os.path.relpath(p, ROOT), cards=' '.join(card_ids(prompt))))
                for g in fm.get('gallery') or []:
                    if isinstance(g, dict) and g.get('src') and g.get('prompt'):
                        seen.setdefault(g['src'], dict(kind='visuals', target='assets/' + g['src'], aspect='4:5', prompt=g['prompt'], page=os.path.relpath(p, ROOT), cards=' '.join(card_ids(g['prompt']))))
    return list(seen.values())


def card_part(card_id):
    from PIL import Image
    buf = io.BytesIO()
    Image.open(os.path.join(ROOT, 'assets', 'cards', card_id + '.webp')).convert('RGB').save(buf, 'PNG')
    return {'inlineData': {'mimeType': 'image/png', 'data': base64.b64encode(buf.getvalue()).decode()}}


def generate(job, model, key):
    parts = [card_part(i) for i in job['cards'].split()]
    text = job['prompt']
    if parts:
        text = ('The attached image(s) are scans of the real cards. Show each card exactly as scanned: same drawing, '
                'same colours, same title, nothing redrawn or added. ' + text)
    body = {
        'contents': [{'parts': parts + [{'text': text}]}],
        'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': job['aspect']}},
    }
    req = urllib.request.Request(API.format(model=model), data=json.dumps(body).encode(),
                                 headers={'Content-Type': 'application/json', 'x-goog-api-key': key})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                data = json.load(r)
            break
        except urllib.error.HTTPError as e:
            # 429 et 5xx : le quota par minute est vite atteint sur un lot de plusieurs centaines d'images
            if e.code in (429, 500, 503) and attempt < 4:
                time.sleep(15 * (attempt + 1))
                continue
            raise RuntimeError(f'HTTP {e.code}: {e.read()[:300]!r}')
    # Les modèles récents renvoient parfois des brouillons marqués `thought` avant l'image finale : on garde la dernière vraie image
    images = [p.get('inlineData') or p.get('inline_data') for p in data.get('candidates', [{}])[0].get('content', {}).get('parts', [])
              if not p.get('thought') and (p.get('inlineData') or p.get('inline_data') or {}).get('data')]
    if images:
        return base64.b64decode(images[-1]['data'])
    raise RuntimeError('aucune image dans la réponse : ' + json.dumps(data)[:300])


def save_jpeg(raw, target):
    from PIL import Image
    os.makedirs(os.path.dirname(target), exist_ok=True)
    Image.open(io.BytesIO(raw)).convert('RGB').save(target, 'JPEG', quality=92)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--generate', action='store_true')
    ap.add_argument('--only', choices=['covers', 'visuals'])
    ap.add_argument('--limit', type=int, default=0)
    ap.add_argument('--model', default=os.environ.get('IMAGE_MODEL', 'gemini-2.5-flash-image'))
    a = ap.parse_args()

    all_jobs = [j for j in jobs() if not a.only or j['kind'] == a.only]
    missing = [j for j in all_jobs if not os.path.exists(os.path.join(ROOT, j['target']))]
    os.makedirs(os.path.join(ROOT, 'docs'), exist_ok=True)
    with open(os.path.join(ROOT, 'docs', 'image-prompts.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=['kind', 'target', 'aspect', 'exists', 'page', 'cards', 'prompt'])
        w.writeheader()
        for j in all_jobs:
            w.writerow({**j, 'exists': 'yes' if j not in missing else 'no'})
    print(f'{len(all_jobs)} images attendues, {len(missing)} manquantes — liste : docs/image-prompts.csv')
    if not a.generate:
        return

    key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
    if not key:
        sys.exit('Définissez GEMINI_API_KEY (clé Google AI Studio).')
    todo = missing[:a.limit] if a.limit else missing
    done = failed = 0
    for i, j in enumerate(todo, 1):
        try:
            save_jpeg(generate(j, a.model, key), os.path.join(ROOT, j['target']))
            done += 1
            print(f'[{i}/{len(todo)}] {j["target"]}')
        except Exception as e:
            failed += 1
            print(f'[{i}/{len(todo)}] ÉCHEC {j["target"]} — {e}', file=sys.stderr)
    print(f'{done} générées, {failed} en échec. Relancez la commande pour reprendre : les images existantes sont sautées.')


if __name__ == '__main__':
    main()

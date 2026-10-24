# Making the pictures

Every picture the site is waiting for already has its prompt, written in the page's front matter:

- **Article covers:** `imagePrompt` → `assets/covers/<english slug>.jpg`, landscape 4:3. The French article reuses the English picture.
- **The six pictures on Library pages:** `gallery[].prompt` → `assets/visuals/<translationKey>/1.jpg` … `6.jpg`, portrait 4:5. These pages cover colours, numbers, elements, energies, modes, astrology and symbols.

The full list (760 pictures), with the page each picture belongs to, is in `docs/image-prompts.csv`. The `cards` column shows the 37 covers that will be sent with a real card scan. It opens in any spreadsheet. Run `python3 tools/images.py` to refresh it.

Nothing breaks while pictures are missing. A cover simply doesn't show, and the six-picture block on a Library page stays hidden until at least one of its pictures exists.

## The generator I recommend: Google Gemini ("Nano Banana")

**Model:** `gemini-2.5-flash-image`, through a Google AI Studio API key.

- **It can take an image as input.** For articles about one card, the script sends the real 1909 scan of that card along with the prompt. The generator then only has to place the card on the table; it doesn't redraw it. Generators that work from text alone always get the cards wrong: wrong figures, invented titles.
- **Price.** About $0.039 per image at the time of writing, so roughly $30 for the whole site (760 pictures: 244 covers and 516 Library pictures). Google's Batch API halves that but takes up to a day. The script uses the normal API, which is simpler.
- **Your writer app (mt-writer-web)** already knows how to call Gemini.
- **Watermark.** Gemini adds an invisible SynthID watermark to its images. Nothing shows.

**Alternatives:**
- *Imagen 4* (also Google) is excellent for the Library pictures but works from text only, so it can't use the card scans.
- *OpenAI's gpt-image-1* is listed by OpenAI as retired on 23 October 2026. If mt-writer-web still points to it, switch that setting to Gemini.

## Step by step

1. **Get a key.** Go to [Google AI Studio](https://aistudio.google.com/), sign in, choose *Get API key*, and turn on billing for the project (image generation through the API usually needs it; the cost is per picture, with no subscription).
2. **Install the two helpers once:** `pip install pillow pyyaml`
3. **Try five covers:**
   ```
   export GEMINI_API_KEY="your key"
   python3 tools/images.py --generate --only covers --limit 5
   ```
   Look at the five files in `assets/covers/`. If you don't like one, delete it and run the command again: only missing pictures are made.
4. **Make the rest:** `python3 tools/images.py --generate`. If it stops because of the per-minute quota, run it again; it picks up where it stopped.
5. **Preview** with `hugo server -D`, then commit the new files in `assets/`.

## What the pictures look like

- They are generated **in colour**. The site shows every picture in grey and brings the colour back when the reader hovers or scrolls to it, so a colour image is what makes that effect work. The prompts ask for colours that also hold up in black and white.
- The style is the same everywhere: editorial photograph, 35 mm film, one soft light source, people seen from behind or as hands.
- Every prompt rules out moons, stars, candles, crystal balls, smoke, purple light, mystical props and text.
- The style lines are fixed in `docs/image-prompts.csv`. If you change the style, change it in the pages' front matter, not only in the CSV. The front matter is the one place a prompt lives.

## Pictures only you can make

The Library history and figure pages have no cover. A public-domain portrait would suit the figure pages: Pamela Colman Smith, Waite, Lévi, Court de Gébelin and others. Old portraits of these people are on Wikimedia Commons and in Gallica (BnF). Check that each one is marked public domain before using it.

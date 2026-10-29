# Review list

Everything on the branch `claude/write-all-articles` that needs you, most important first. Nothing here blocks publishing: every article is complete as it stands.

- **Decisions** (below): a short answer each, then I make the edits on every page concerned.
- **Questions** ([`docs/QUESTIONNAIRE.md`](QUESTIONNAIRE.md), 124 questions): details only you know. Each answer adds a line of first-hand experience to an article — the thing Google rewards and nobody else can write.
- **Pictures**: [`docs/IMAGES.md`](IMAGES.md).

## Still open

1. **A business phone number for the legal notice.**
   - French law (the LCEN) asks a person who publishes a site professionally for a name, an address and a phone number.
   - A professional number is fine, such as a second line or a virtual number. It goes in `hugo.toml`, `phone = ""` under `[params.legal]`.
   - Until then the legal notice shows a gold "to complete" mark.
2. **A consumer mediator.**
   - Because you sell lessons to the public, French law asks you to name a consumer mediator customers can turn to, free for them.
   - You sign up with one (several approved mediators exist, for a yearly fee), then put its name and website in `mediator = ""`. The terms already have the sentence waiting for it.

## Worth knowing

- **Your registration.** The public listing you sent shows two things worth checking with the guichet unique (INPI) or your accountant:
  - It still gives Sucy-en-Brie, so the registry should get your new address.
  - It lists your activity as "artistic creation (plastic arts)". Selling tarot lessons may need adding as an activity.
- **Cookies.** No banner is needed today. The site stores only your visitors' language and theme choices, and loads no tracker or advertising. That changes if you add an analytics or advertising tool: tell me first and I'll set it up the compliant way.
- **A date clash, fixed.** The page on 20th-century tarot said Waite's *Key to the Tarot* came out in 1910. The Waite and Pamela Colman Smith pages, which cite their source, say it was sold with the deck from December 1909, and that the illustrated *Pictorial Key* followed in 1910. The 20th-century page now says that too.
- **Sign colours, aligned.** The table on the astrology page gave eight signs different colours from their own pages; Virgo, for instance, was "beige, brown" in the table and "blue, grey" on its page. The table now follows the sign pages, which come from your notes.
- **Depression.** Your notes ask that nothing about depression be used. Pisces and Black listed it among their keywords; they no longer do, in either language. Two of your published articles, *Tarot and mental health* and *Shadow work for beginners*, name depression as a reason to see a professional. They're yours, and unchanged.
- **Legal texts keep their legal wording.** The terms of sale and the disclaimers kept their exact sentences, even where another page quotes them.
- **Without sales** a legal notice would still be required. A private person with a non-commercial site may stay anonymous by giving their details to the host only, but selling lessons is a professional activity, so the notice names you. It now shows your business address, never your home.

## Your answers, applied

- **Sign ↔ card.** Your Taurus and Cancer pages said their cards were the Empress and the High Priestess "in the Golden Dawn tradition". In that tradition, Taurus is the Hierophant and Cancer is the Chariot. The Empress and the High Priestess belong to Venus and the Moon, the planets that rule those two signs. Both pages, the modes tables and *I tested my birth chart* now give the right cards, and each sign page mentions its ruling planet's card.
- **Jupiter** no longer claims a test result. It now says it wasn't part of your tested numbers.
  - Three pages in each language also said you "distrust" Jupiter, or "hold it lightly": the Jupiter page, the Wheel of Fortune and the Nine of Cups. Your notes say the opposite: you like adding it, and its sign and house show someone's biggest struggles. The Jupiter page now says that and links to *Sun, Moon, rising*, where you explain it.
  - The card pages keep only the planet's usual meaning.
- **French verbs:** « Je veux » for Leo, « Je ressens » for Cancer, everywhere.
- **No repeats.** Each of your sayings now lives on one page in each language:
  - "I read; you decide": sessions;
  - "A miss is a miss": method;
  - "Take a break from your cards": *Why you should quit tarot reading*;
  - "Tell me nothing": *The silence rule*;
  - "Not everything is about spirits": *Tarot and mental health*;
  - "Don't take my words as ultimate truth": about;
  - "You can't be told what it's like": *What reading tarot feels like*.

  "The cards aren't magic. You are." is now your tagline under every article.

  Beyond the sayings, nothing repeats any more:
  - no sentence appears on two pages, nor any run of eight words or more;
  - the one exception is your legal disclaimer. The article on "for entertainment purposes only" restates it close to word for word on purpose, because explaining it is that article's job.

  In practice:
  - **Card pages.** Every card page opens with its own line: what its drawing shows and the question it asks. All 78 used to open with the same template. The pages also lost "Lenses first.", their identical example openings and the Golden Dawn titles.
  - **Stock lines.** The lines that came back from page to page are gone, or written differently each time. Examples: "The sentence I'd say out loud", "A kinder question", "Say someone draws…", "In the Instagram story", "Read the colours before the card".
  - **Love articles** no longer describe a card in its card page's words.
  - **Your stories and definitions** keep their exact wording on one page. Elsewhere they get a short mention in other words, with the same meaning and nothing added.
  - **Library sections.** Each sign, symbol, colour, element and sephirah page has its own FAQ answers and headings. What applies to a whole section is said once, on the section's main page.
- **Timing.** Some articles used to say, in your voice, that your misses are mostly about *when* things happen. Your notes don't say that. They say a reading is "not the best" at telling exactly what happens in the next days, so the articles now say that. That was seven pages in each language, the Hanged Man among them. Nothing for you to do.
- **12 €.** Three of your published articles quoted a 12 € price with no source. Since you didn't recognise it, it's gone. It stays only where an article clearly uses it as an example price for the arithmetic.
- **Raised between two.** *Is tarot a sin?* now says it in your words: a Christian family that didn't practise, you wanting peace and fairness for everyone, then your father going into a branch of Buddhism and later leaving it. Two pages that said he "prays at his temple" today now say it in the past.
- **The Fool page** example is now hypothetical, like every other card's.
- **No course, no certificate.** The certificates article says it plainly. "My course notes" became "my notes" everywhere.
- **Prices:**
  - one-to-one lesson: £60 / 60 €;
  - group: £45 / 46 € per person, £39.99 / 39,99 € from seven people.

  They're on the sessions, workshops and home pages.
- **Author:** "Joana from Maison Tarot" / "Joana de Maison Tarot". A short description from your notes ends with your tagline. It shows under every article and is sent to Google as the author. `params.author.name` was simply the setting where your name goes.
- **The method page** is written from your notes. It covers the silence, expecting to talk nonsense, how you counted, what doesn't work, and why you stop after two hours.
- **The two sayings in French:**
  - « Ne prenez pas mes mots pour une vérité absolue. Testez, et faites-en l'expérience vous-même. »
  - « Ça ne se raconte pas. Ça s'essaie. »
- **Golden Dawn titles** are the old names a 19th-century occult society gave the minor cards, like "Lord of Swiftness". They stay on the Kabbalah pages, where they're the subject, and left the card pages.
- **Helplines:**
  - France's 3919: free, anonymous, day and night;
  - the UK's National Domestic Abuse Helpline: 0808 2000 247, free, 24 hours.

  Both are on the Tower, Devil and Eight of Swords love pages, with the emergency numbers.
- **Events.** "Halloween 2027: a free online readings night" (Sunday 31 October 2027) and "Samhain 2027: one hour on the Samhain spread" (Monday 1 November 2027). Both are online and free, and linked from their articles. Registration links are empty until you have them.
- **City pages.** London (English) and Paris (English and French) have their own pages now. The 72 other cities and their country pages redirect to one page per language: "Learn tarot online, wherever you are" / « Apprendre le tarot en ligne, où que vous soyez ». Their old addresses keep working.
- **Prices from seven people:** £39.99 on the English site, 39,99 € on the French one, per person.
- **Legal notice:** Joana Mehou-Loko EI, entrepreneur individuel, 47 rue Vivienne, 75002 Paris, SIREN 908 032 139. You are the publication director. The host is GitHub, with its phone number.
- **Pictures:** you plan about sixty, redesigned with CSS. The 747-prompt list stays in `docs/` as a reference only.

## Your published articles: what the check found

All 26 published English articles were read against the same two questions:
- Does it fully answer its title on its own page?
- Does it hold at least one sentence only you could write?

13 pass as they are. I didn't rewrite any of them. I only fixed plain errors and added links:
- a count that didn't add up: "switch off all three", after four reasons;
- the documentary figure, which now matches the sourced €44,000;
- a promised article that now exists and is linked;
- the two beginner guides, which now link to each other;
- a few claims now linked to the sourced pages: the law, the surveys, the Christian teaching.

What's left is yours to decide:

| Article | What the check found | What would fix it |
|---|---|---|
| Shadow work for beginners | No sentence of yours: the definition is general Jung. | Add one or two lines from your shadow-work notes (the cell where you hide what you couldn't deal with; the veil you have to acknowledge before you take it off; "be as gentle and tolerant with yourself as you are with others") and link *Afraid of the dark*. |
| Delulu is the solulu | Little of yours; "it's well documented" has no source; "I've heard this said to grieving people" isn't in your notes. | One line of yours, and either a source or "in my view". |
| No contact readings | Strict tone ("I refuse it", "every honest reader refuses it"); "I've watched people do a no-contact reading every day for a month" isn't in your notes. | Your consent line (reading someone without consent is like going through their bedroom), and "I don't read on that, and here's why". The new *Will they come back?* now links here. |
| Pick-a-card criticism / TarotTok | They shared the same argument, list and closing line. | DONE: under your no-repeats rule, one keeps the list and the other links to it. |
| How to spot a fake tarot reader | "I spend a surprising amount of my time helping people who've been fleeced" isn't in your notes. Heading 8 ("no ethical reader touches") is strict. | Confirm or soften the opening; soften heading 8. |
| Before a free online reading | Its "four signs of a hook" repeated *How to spot a fake tarot reader*. | DONE: cut to two sentences and a link. |
| Is tarot a sin? | "Raised between two" is now explained in your words. A light aside on Judaism could read as flippant. | Consider dropping the aside. |
| I tested my birth chart | "The High Priestess is Cancer" is corrected to the Chariot. "A mockery vibe" uses a word your brand book avoids. | "A mocking look". |

## Softer titles and headings for pages that were already published

These pages were already online, so I haven't touched their text. Each line gives the current wording, then a kinder version that says the same thing. Tell me "apply the softer titles" and I'll change them; the addresses (URLs) stay the same.

| Page | Now | Suggested |
|---|---|---|
| blog/twin-flame-tarot (title) | Twin flame tarot: the reading I refuse, and why | Twin flame tarot: why I gently set this reading aside, and what I offer instead |
| blog/twin-flame-tarot (heading) | Why I refuse it | Why I don’t read it, and what helps more |
| blog/flamme-jumelle-tarot (heading) | Pourquoi je ne lis pas ce tirage | Pourquoi je laisse ce tirage de côté, et ce que je propose à la place |
| blog/why-you-should-quit-tarot-reading (heading) | The people I refuse | The people I’d rather not read for, and where I send them |
| blog/pourquoi-arreter-de-tirer-les-cartes (heading) | Les gens que je refuse | Les personnes pour qui je préfère ne pas lire, et vers qui je les oriente |
| blog/i-tested-my-birth-chart (heading) | What I refuse to do with it | What I’d rather not do with it |
| blog/j-ai-teste-mon-theme-astral (heading) | Ce que je refuse d’en faire | Ce que je préfère ne pas en faire |
| blog/is-tarot-a-sin (heading) | What I refuse, and why it helps here | What I don’t read on, and why it helps here |
| blog/tarot-and-mental-health (heading) | The people I don't read for | When I suggest we don’t read, and who can help instead |
| blog/before-a-free-online-reading (heading) | What's refused, even for free | What I don’t read on, even for free, and why |
| blog/avant-une-lecture-gratuite-en-ligne (heading) | Ce qui est refusé, même gratuitement | Ce sur quoi je ne lis pas, même gratuitement, et pourquoi |
| blog/tarot-ethics-short-version (heading) | 3. Refuse the subjects where wrong does damage | 3. Set aside the subjects where a mistake can hurt |
| blog/deontologie-tarologue (heading) | 3. Refuser les sujets où l’erreur blesse | 3. Mettre de côté les sujets où une erreur peut blesser |
| blog/become-a-tarot-reader (heading) | What will you refuse? | What will you gently say no to? |
| blog/devenir-tarologue (heading) | Qu’allez-vous refuser ? | À quoi direz-vous non, avec douceur ? |
| terms / cgv (heading) | 6. What the publisher refuses / Ce que l’éditeur refuse | 6. What I don’t offer / Ce que je ne propose pas |
| 24 French city pages (heading) | Ce que la Maison ne fait pas, à … comme ailleurs | Ce que je ne lis pas, à … comme ailleurs — et ce que je propose à la place |

## Site pages still waiting for your words

These are pages of the site, not articles: your method, your sessions and workshops, and the legal pages. They hold gold notes that show only when you run `hugo server -D`. No article has any left.

- `content/en/privacy.md`
  - TO FILL, e.g. 3 years after the last service
  - TO FILL (Brevo — hosted in France)
  - TO FILL if an analytics or ad tool is added: name, and whether a consent banner is needed.
  - TO FILL — server location and safeguards for transfers outside the EU.
- `content/en/sessions.md`
  - TO WRITE, by you — a paragraph on what it feels like during, and the setting you ask for: somewhere quiet, nobody else in the room, a deck within reach.
- `content/en/terms.md`
  - TO FILL — processor names once approved in writing.
  - LAWYER — exact wording of the checkbox.
  - TO FILL — free cancellation window, rescheduling, no-shows, cancellation by the publisher (full refund). Special case: a person in distress → free rescheduling, always.
- `content/en/workshops.md`
  - TO WRITE, by you — the exact run of a first workshop, minute by minute if you like; what you have people do from the very start.
- `content/fr/ateliers.md`
  - À COMPLÉTER par vous — le déroulé exact d’un premier atelier, minute par minute si vous voulez ; ce que vous faites faire dès l’ouverture.
- `content/fr/cgv.md`
  - À COMPLÉTER — nom des processeurs une fois approuvés par écrit.
  - À FAIRE VALIDER par un·e avocat·e — formulation exacte de la case à cocher.
  - À COMPLÉTER — délai d’annulation gratuite, conditions de report, absence, annulation par l’éditeur (remboursement intégral). Cas particulier : la personne en détresse → report sans frais, systématique.
- `content/fr/confidentialite.md`
  - À COMPLÉTER, ex. 3 ans après la dernière prestation
  - À COMPLÉTER (Brevo — hébergé en France)
  - À COMPLÉTER si un outil d’audience ou de publicité est ajouté : nom, exemption ou bandeau de consentement conforme CNIL.
  - À COMPLÉTER — localisation des serveurs et garanties de transfert hors UE.
- `content/fr/sessions.md`
  - À COMPLÉTER par vous — un paragraphe sur ce qu’on ressent pendant, et le cadre que vous demandez : au calme, personne d’autre dans la pièce, un jeu de cartes sous la main.

## Articles to update now and then (trends and dates)

Each depends on what platforms, apps or the calendar look like now (autumn 2026). A yearly look is enough for most; the date-bound ones need their dates changed.

- **Etsy spells and paid rituals: what you're actually buying** — `/blog/etsy-spells/` · `/fr/blog/sorts-payants-etsy/` — *trend*
- **Tarot on Instagram: the reader you follow and the reader you need** — `/blog/tarot-on-instagram/` · `/fr/blog/tarot-instagram/` — *trend*
- **Tarot apps: are they any good? What to look for** — `/blog/tarot-apps/` · `/fr/blog/applications-tarot/` — *trend*
- **Tarot subscriptions, ‘extended readings’ and pay-per-question: how the model works** — `/blog/tarot-subscriptions/` · `/fr/blog/tarot-payant-a-la-question/` — *trend*
- **Scorpio season tarot: what to read for between late October and November** — `/blog/scorpio-season-tarot/` · `/fr/blog/saison-scorpion-tarot/` — *date-bound*
- **Samhain tarot: why October is when people finally ask** — `/blog/samhain-tarot/` · `/fr/blog/samhain-tarot/` — *date-bound*
- **Halloween tarot reading: what to expect if it's your first** — `/blog/halloween-tarot-reading/` · `/fr/blog/tirage-tarot-halloween/` — *date-bound*
- **Ancestor tarot spread for Samhain: remembering, gently** — `/blog/ancestor-tarot-spread/` · `/fr/blog/tirage-des-ancetres/` — *date-bound*
- **New Year tarot spread 2027: one card a month, no promises** — `/blog/new-year-tarot-spread/` · `/fr/blog/tirage-nouvel-an-tarot/` — *date-bound*
- **Year-ahead tarot reading: how I do it, month by month** — `/blog/year-ahead-tarot-reading/` · `/fr/blog/tirage-de-lannee/` — *date-bound*
- **Reading tarot live on Instagram: what works and what breaks** — `/blog/tarot-live-instagram/` · `/fr/blog/tarot-en-live/` — *trend*
- **Readers accused of using AI: how the accusation works** — `/blog/tarot-readers-accused-of-ai/` · `/fr/blog/tarologues-accuses-ia/` — *trend*
- **Should tarot readers use AI at all? Where I draw the line** — `/blog/should-tarot-readers-use-ai/` · `/fr/blog/tarologue-et-ia/` — *trend*
- **‘For entertainment purposes only’: what it really means (and why I like it)** — `/blog/entertainment-purposes-only/` · `/fr/blog/fins-de-divertissement/` — *trend*
- Already published and time-sensitive: `/blog/tarottok/`, `/blog/pick-a-card-criticism/`, `/blog/is-ai-tarot-accurate/`, `/blog/ai-tarot-vs-human/`, `/blog/delulu-manifestation-tarot/`, `/blog/no-contact-tarot-readings/`.

## Researched articles: click each source link once

The writers checked every fact through search results; this session’s network blocked opening many source pages, so one click per link is worth it. The Kabbalah, History and Figures sections of the Library are researched the same way, each page ending with its sources.

- **The Death card in films and series: what pop culture gets wrong** — `/blog/death-card-pop-culture/` · `/fr/blog/carte-de-la-mort-cinema/` — *check film references*
- **Mercury retrograde 2026 and 2027: the dates, and what to expect** — `/blog/mercury-retrograde-dates/` · `/fr/blog/mercure-retrograde-dates/` — *dates to verify*
- **Venus retrograde 2026: dates and a calm guide for your relationships** — `/blog/venus-retrograde-2026/` · `/fr/blog/venus-retrograde-2026/` — *dates to verify*
- **Pluto in Aquarius: what this long transit means, explained calmly** — `/blog/pluto-in-aquarius/` · `/fr/blog/pluton-en-verseau/` — *dates to verify*
- **Saturn–Neptune conjunction at 0° Aries (February 2026): what it meant** — `/blog/saturn-neptune-conjunction-2026/` · `/fr/blog/conjonction-saturne-neptune-2026/` — *dates to verify*
- **Eclipses 2027: dates, signs, and a gentle tarot spread** — `/blog/eclipses-2027/` · `/fr/blog/eclipses-2027/` — *dates to verify*
- **Rider-Waite-Smith tarot: why it became the standard, and who 'Rider' was** — `/blog/rider-waite-smith-tarot/` · `/fr/blog/tarot-rider-waite-smith/` — *check facts*
- **Lenormand vs tarot: two systems, two kinds of question** — `/blog/lenormand-vs-tarot/` · `/fr/blog/lenormand-ou-tarot/` — *check facts*
- **Thoth tarot vs Rider-Waite-Smith: what changes when you switch decks** — `/blog/thoth-vs-rider-waite/` · `/fr/blog/thoth-ou-rider-waite/` — *check facts*
- **Why is Death the card with no name? The Marseille arcane and the RWS card** — `/blog/death-card-no-name/` · `/fr/blog/arcane-sans-nom-tarot/` — *check facts*
- **Overcharged psychic phone lines: what a French investigation revealed** — `/blog/psychic-phone-lines-france/` · `/fr/blog/arnaque-plateforme-voyance/` — *facts to verify*
- **Is tarot reading legal? What the law says in France and the UK** — `/blog/is-tarot-reading-legal/` · `/fr/blog/voyance-legale-france/` — *facts to verify*
- **Tarot and Christianity: what the texts say, and what people do** — `/blog/tarot-and-christianity/` · `/fr/blog/tarot-et-christianisme/` — *religion*
- **Is tarot haram? What I read, and how I answer with respect** — `/blog/is-tarot-haram/` · `/fr/blog/voyance-haram-islam/` — *religion*
- **Why young people are turning to tarot (and what it says about now)** — `/blog/young-people-and-tarot/` · `/fr/blog/jeunes-et-voyance/` — *facts to verify*
- **The decans: the astrology hidden in the minor arcana** — `/blog/decans-tarot/` · `/fr/blog/decans-tarot/` — *check facts*

## Your personal stories: read them once, as you would tell them

- **Why a reading can be wrong: the voice that gave my friend’s name** — `/blog/why-a-reading-can-be-wrong/` · `/fr/blog/tirage-faux-tarot/` — *personal story*
- **Dream interpretation and tarot: what dreams can tell you, and the gentle tsunami** — `/blog/dream-interpretation-and-tarot/` · `/fr/blog/interpretation-des-reves-tarot/` — *personal story*
- **The strangest things that happened during my tarot readings** — `/blog/weird-tarot-reading-stories/` · `/fr/blog/histoires-etranges-tarot/` — *personal story*
- **My first tarot reading for a stranger was ‘wrong’ — then she texted me a few days later** — `/blog/first-tarot-reading-story/` · `/fr/blog/premier-tirage-tarot/` — *personal story*
- **What it actually feels like to read a tarot card** — `/blog/what-reading-tarot-feels-like/` · `/fr/blog/que-ressent-on-en-tirant-les-cartes/` — *personal story*
- **Reading for someone I admired: the sentence I said out loud** — `/blog/reading-for-someone-i-admired/` · `/fr/blog/lire-pour-quelquun-que-jadmirais/` — *personal story*
- **The night I heard my father call my name from another country** — `/blog/father-calling-premonition/` · `/fr/blog/premonition-experience/` — *personal story*
- **Do you need to cleanse your tarot deck? I sold sage in 2021 — here’s why I stopped** — `/blog/cleanse-tarot-deck/` · `/fr/blog/purifier-son-jeu-de-tarot/` — *personal story*
- **What I believed about tarot in 2020 that I see differently now** — `/blog/what-i-believed-about-tarot/` · `/fr/blog/ce-que-je-croyais-du-tarot/` — *personal story*
- **Can tarot tell you when something will happen? Why timing is the weak spot** — `/blog/tarot-timing/` · `/fr/blog/tarot-quand/` — *personal story*
- **Afraid of the dark? What changed for me, and what shadow work has to do with it** — `/blog/afraid-of-the-dark/` · `/fr/blog/peur-du-noir/` — *personal story*
- **Spiritual, but not into ‘spiritual’ circles: why I keep a little distance** — `/blog/spiritual-but-not-in-spiritual-circles/` · `/fr/blog/spirituelle-mais-pas-dans-les-cercles/` — *personal story*

## Money, positioning, and future affiliate links

- **Tarot gift guide: what to buy a beginner (and what to skip)** — `/blog/tarot-gift-guide/` · `/fr/blog/offrir-un-jeu-de-tarot/` — *affiliate later*
- **Best tarot decks for beginners in 2027: a reader's shortlist** — `/blog/best-tarot-decks/` · `/fr/blog/meilleurs-jeux-de-tarot/` — *affiliate later*
- **How much does a tarot reading cost? Prices, and what justifies them** — `/blog/tarot-reading-price/` · `/fr/blog/prix-tirage-tarot/` — *money*
- **What I charge for (lessons) and what I give away (readings)** — `/blog/what-i-charge-for/` · `/fr/blog/ce-que-je-fais-payer/` — *money*
- **Tarot certificates and lineages: what they can and can't prove** — `/blog/tarot-certificates/` · `/fr/blog/certificat-tarologue/` — *positioning*
- **North Node and South Node: what they mean in a birth chart** — `/blog/north-node-south-node/` · `/fr/blog/noeud-nord-noeud-sud/` — *not tested*

## What changed in this round

- **Every English article was tested against Google's helpful-content questions, then the French followed.** The two questions: does it fully answer its title on its own page, and does it hold a sentence only you could write?
  - Gaps were written around without inventing anything. Each gap became a question in the questionnaire.
  - Where two articles answered the same question, one now owns it and the other links to it.
  - Claims your notes don't support were made general. Example: "timing is where I miss most" became your method page's own words.
- **The 13 "card at work" articles are now an *At work* section on their card pages.** Three pages per card (meaning, love, career) is the pattern Google treats as mass-produced.
- **The 21 "card in love" articles were rebuilt from their own card.** Each opens with what that card's number, element and energy do in a relationship, instead of describing the drawing again. Each has its own headings.
- **One story, one home.** Your stories were told in full on many pages: the sage you sold in 2021, your first Discord reading, the people who keep asking. Each now lives in full on one article. Elsewhere it gets a short mention and a link, or no mention where it didn't serve the question.
- **Every symbol page shows the symbol itself.** The close-ups are cut from the 1909 scans (`data/zoom/`, `tools/zoom.py`).
- **The Kabbalah has a Tree of Life you can explore.**
  - Tap a sphere for its cards, or a path for its letter and its arcanum. A button traces the spheres from 1 to 10.
  - Every card page shows its own place on the Tree and links straight to it.
  - It is drawn from the data, so the Tree, the letters table and the card pages can't disagree.
- **The French follows the English.** Every French article got the same fixes as its English twin, written in French rather than translated: the same cuts, links and first-hand lines. The love articles have French headings of their own.
- **Your notes settled the friends' genders.** In your own telling of the voice story, the friend who died of cancer is a man and the friend the voice named is a woman. Two French pages said « ma meilleure amie » for him; they now say « mon meilleur ami ». The English already matched.
- **Small things you may want to know:**
  - « Le téléphone arabe » is on your French Gemini page and in the French *Lovers in love* article. Some readers now avoid the phrase because it leans on a stereotype; « le téléphone sans fil » says the same thing. Your English says "the game of telephone".
  - The significator article gives Waite's rule (rank by age, suit by colouring) but no longer lists the four colourings. I believe Waite also lets temperament override colouring, which would back the way you read courts, but I couldn't check it: this session can't open sacred-texts.com or gutenberg.org. One look at his *Pictorial Key* would settle it before it goes in.

## Earlier notes, batch by batch

From the first round of writing. Lines marked FIXED or CHANGED are done and are here only so you know; some questions here have since moved to the questionnaire.

### French adaptations batch 2 (B10–B17)
- B10 curse scam (EN published): body uses "blessed" (banned word) — left as is. FR drops the unverified "retired teacher in the French documentary"; FR adds SignalConso + police complaint as reporting routes — confirm.
- B11 no contact (EN): "I've watched people do a reading every day for a month" isn't in your notes — FR made it general.
- B13 shadow work / B14 mental health (EN): mention depression in general terms (not her story) — FR uses other words. B14 FR adds 3114 (French suicide prevention line, 24/7, free) and 15/112 — confirm.
- B15 TarotTok (EN + FR): two unsourced claims — a 2025 TV investigation (reader charging €12 per question) and surveys saying belief is highest among 18–24s → verify or cut. FR adds a Minitel/phone-psychic reference.
- B16 twin flame (EN): "I've watched it keep someone waiting for three years" isn't in your notes — FR made it general.
- B17 feel accurate (EN): the three-sentence example is presented as "from my notebook" (not in facts); EN says "switch off all three" after listing four mechanisms (FR says four) — small fix to make in EN.
### Card pages — Wands 8–King
- Golden Dawn titles named on Eight/Nine/Ten of Wands (Lord of Swiftness, Great Strength, Oppression) — keep or drop.
- Ten of Wands: a gentle health note (bodily exhaustion → a doctor) + mention of her Saturn result.
- Pages run ~700–940 words (a little above the 550–800 target).
### French adaptations batch 1 (B1–B9) + English silence-rule article
- FIXED: 12 broken links in published articles pointed to old planned slugs — repointed to the pages that now cover those subjects.
- FIXED: is-tarot-a-sin said her father called "from six thousand kilometres away" (London–Paris ≈ 340 km) → "as if from the next room" (your notes). The planned story title was corrected too.
- B2/B6 (EN): imageAlt quotes text on a note/message that a no-text image can't show; prompts say it's blurred.
- B6 FR adds French specifics (SignalConso, surcharged phone psychics, « retour de l’être aimé » flyers). B9 FR adds the French card game and the Marseille habit.
- B9 (EN): "four centuries later" (1440s → 1780s is closer to three) — consider "three centuries".
- B8 (EN) uses "I refuse" four times — the French is gentler; you may want to soften the English.
- Silence rule: FR category « Méthode », EN "For readers" — harmless, align if you like. FR body contains « je refuse de l’entendre ».
- Some adaptations keep 2–3 links (same as their English originals).
### Seasonal batch (Samhain, Halloween, ancestors, New Year, year ahead, new job)
- Samhain: one todo line — what you notice in October at your events/messages (no data in notes). Samhain facts checked online, no external link cited.
- Halloween: no Maison Tarot Halloween event is claimed — add one to the events page if you plan it.
- Ancestor spread: remembering and gratitude only; gently leaves aside contacting the dead, how someone died, inheritance; points to the grief article and a therapist.
- New Year 2027: year card worked as 2+0+2+7 = 11 (Justice in RWS) → 2 (High Priestess); examples worked the same way.
- Year-ahead: one todo line (your own year-ahead reading); the month-by-month method is written as yours — confirm it matches what you do.
### Card pages — majors 8–14, 15–21, Cups 8–King
- FIXED (me, checked against the 1909 scans): colour pages said Strength's robe is red and Temperance's robe is blue (both white) and that the Wheel's background is orange (only the wheel is); FR red page said « les ailes du lion des Amoureux » (it's the angel). Fool page said the Golden Dawn gave the Fool Uranus (it gave it Air; Uranus is modern) — corrected EN+FR.
- FIXED: French elisions in card data (« Terre de Eau », « Huit de Épées » → « Terre d’Eau », « Huit d’Épées »).
- Strength: lion's tail between its legs and Waite's "closing the jaws" — from memory, glance at the scan. Waite swapped Strength (8) and Justice (11) vs Marseille — stated on the page.
- Justice: gentle note that you don't read on ongoing court cases (lawyer + refusals link). White shoe detail from memory.
- Hanged Man / Judgement: the astrology sections say the Golden Dawn gave them Water / Fire and that Neptune / Pluto are modern links (accurate; the outline headings show the modern planet).
- Death, Tower, Sun, Ten of Cups: gentle passages saying the card doesn't announce a death / accident / illness / pregnancy, with links to the refusals section.
- The Devil: "the reverse of the Hierophant's blessing" (Waite) — from memory.
- Cups: Waite quotes (Pictorial Key) on Page/Knight/Queen/Ten; Eight of Cups mentions Instagram's founders leaving in 2018 (real, not in your notes). King of Cups cloak colour left out (the purple colour page says purple — unconfirmed).
- Golden Dawn titles (e.g. "Lord of Abandoned Success") named on some minors — keep or drop.
- Card bodies run 750–970 words (above the 550–800 aim).
- The Fool page (written before) tells its example reading as if it happened ("She had resigned the week before…") — not in your facts; consider making it hypothetical like the others.
### Card pages — Wands Ace–7, Swords Ace–7, majors 15–21 re-check
- FIXED: 10 of the 78 card .jpg files in assets/cards showed the wrong card (e.g. swki.jpg was the Two of Wands). The site only uses the .webp files (correct), so nothing wrong was ever shown; all .jpg files are now regenerated from the correct .webp.
- Majors 15–21 re-checked against the scans: Devil (inverted star between the horns; the couple drawn in the creature's orange), Sun (banner streams beside the child), World (crossed red bands) — corrected.
- Golden Dawn titles named on Swords and Wands minors (from general knowledge) — keep or drop.
- Four of Wands: gentle passage on hoping for a wedding or a baby (cards give no dates; pregnancy → doctors). Five of Wands quotes Waite "mimic warfare" (checked).
- Four of Swords FR compares the knight to the royal tomb effigies at Saint-Denis (writer's addition). Seven of Swords: FAQ "does it mean someone is cheating?" answered gently.
### Astrology dates + Death in films (R1)
- Mercury retrograde 2026: 26 Feb–20 Mar, 29 Jun–23 Jul, 24 Oct–13 Nov; 2027: 9 Feb–3 Mar, 10 Jun–4 Jul, 7–28 Oct (UK time; FR in Paris time). Venus retrograde 3 Oct–14 Nov 2026 (UK/FR time; 13 Nov in the US). Pluto in Aquarius ingress dates cited. Saturn–Neptune exact 20 Feb 2026 at 0°45′ Aries — one todo line each language (your own observation around that date).
- Death in films: three verified examples (Cléo de 5 à 7, The Simpsons "Lisa's Wedding", Tarot 2024); others dropped as unverifiable.
### Card pages — majors 1–7, Cups Ace–7
- Your sign ↔ card table (from your notes, used on the Library sign and mode pages) gives Taurus → the Empress and Cancer → the High Priestess (through Venus and the Moon); the Golden Dawn gives Taurus → the Hierophant and Cancer → the Chariot. The Hierophant and Chariot pages explain both; decide whether the sign pages should mention the Golden Dawn version too.
- Hierophant: "priest of the mysteries at Eleusis" not source-checked. FR mentions le compagnonnage. Lovers FR quotes Pascal and uses « téléphone arabe » (as your Gemini page does) — you may prefer « téléphone sans fil ».
- Empress / Sun / Ten of Cups / Four of Wands: gentle pregnancy passages pointing to a doctor.
- Magician: covers the "manifestation card" label without endorsing it.
- Drawings for majors 1–7 written from knowledge of the 1909 cards — worth a glance against the scans.
- FIXED: French Ace labels now « Racine du Feu / de l’Eau / de l’Air / de la Terre ».
### Love readings 1 (Death, Tower, Lovers, Devil, Three/Ten of Swords, Moon)
- Death in love: glance at drawing details (child looking up; sun between two towers). Lovers: gazes (man → woman, woman → angel) and the angel's purple robe.
- Tower / Devil in love: a gentle step for anyone afraid of a partner — not a card question; points to a professional/support line (no numbers given; you may want to add France's 3919 and the UK's National Domestic Abuse Helpline after checking them).
- FR quotes « Chagrin d’amour dure toute la vie », « Choisir, c’est renoncer », « Il n’y a pas de fumée sans feu ».
- The Moon in love retells your Discord first-reading story (as in your notes).
### Love readings 2 (Hanged Man, Star, Fool, Wheel, Judgement, Empress, Two of Cups)
- French version of your saying "You can't be told what it's like. You can only try." written as « On ne peut pas vous raconter ce que ça fait. On ne peut qu’essayer. » — confirm or give yours.
- Empress in love: the pregnancy question answered gently (doctor / fertility specialist).
- Two of Cups and the Moon both retell your Discord first-reading story — fine, but you may want it in only one of them.
### Card pages — Swords 8–King
- Nine of Swords: the Golden Dawn title "Lord of Despair and Cruelty" left out on purpose, to keep the page gentle. Nine/Ten of Swords: gentle passages, therapist's door linked.
- French Golden Dawn titles (« Seigneur de la force écourtée », « Seigneur de la ruine ») are the writer's own translations.
### Love readings 3 + Death in career
- Eight of Swords in love: a short paragraph for anyone literally controlled or afraid of a partner → someone you trust / a domestic-abuse support service (no numbers). Please approve.
- Nine of Swords in love: a doctor or therapist if sleepless nights go on; "don't pull cards at 3 a.m."
- Queen of Swords in love says, in your voice, "I don't give the court cards an astrological lens" (your Library leaves courts without astrology) — confirm.
- Death in career FR uses French work references (CDD, rupture conventionnelle, bilan de compétences, conseiller en évolution professionnelle).
### Career readings (Tower, Lovers, Devil, Moon, Sun, Empress, Emperor)
- Devil in career uses your Capricorn archetype (Miranda Priestly, The Devil Wears Prada) — confirm you want it there.
- Your saying "Don't take my words as ultimate truth…" has no official French version yet; writers translated it themselves — give yours if you have one.
- FR uses « radio moquette », « rupture conventionnelle », « bilan de compétences ».
### Learn 1 (major/minor, suits, court cards, shuffling, life path, angel numbers, 11:11)
- Court cards: "Some older books read court cards as physical types… I don't" and "I read without a significator card" — written in your voice, inferred from your pages; confirm.
- Life path: you reduce master numbers (11 → 2, 22 → 4, 33 → 6) "the way I reduce the major arcana", and you "haven't run the same test on life path numbers" — confirm.
### Practice 2 (yes/no, questions to avoid, same question twice, same card, inconsistent, reading for yourself, clarifier)
- Questions to avoid: each sensitive subject = acknowledge the worry → why a card isn't the tool → a kinder question → the right professional (doctor, midwife/fertility specialist, lawyer, financial adviser; FR adds accountant and notary). I read it: the tone is right.
- Same question twice: "wait until something has changed — measure in events, not days" is written as your position — confirm.
- Same card keeps coming up: the probabilities are the writer's own arithmetic (random shuffle assumed).
- Clarifier: "Counting is the backbone of my method" — confirm the phrasing.
### Card pages — Pentacles 8–King
- Ten of Pentacles / Knight / King: gentle money passages (decisions stay yours); FAQs "does it mean money is coming?" answered the same way.
- Ten of Pentacles states the ten coins form the Tree of Life diagram.
- IMPORTANT: the Fool page (EN+FR, written before this work) tells its example as a real reading ("She had resigned the week before to retrain in a manual trade"). It isn't in your your notes. If it happened, keep it; if not, it should be made hypothetical like all the other card pages.
### Card pages — Pentacles Ace–7; Practice 1 (reversals, spreads, Celtic Cross, love and career spreads)
- ALL 78 CARD PAGES NOW FINISHED in both languages; none shows a TO-WRITE box.
- Pentacles: classical-astrology statements (Jupiter in fall in Capricorn, Mars exalted in Capricorn, Moon exalted in Taurus) — standard tradition, not your notes. FR adds Notre-Dame's rebuilding (Three), Harpagon (Four), La Fontaine (Seven), the CCAS for help (Five — the sensitive poverty/illness page).
- Celtic Cross: says Waite printed the spread in his guide (checked, not cited). Love spread uses your "snooping in a bedroom" consent comparison.
- CHANGED: {{< todo >}} notes now appear only in local preview (hugo server), never online — like missing images. Run `hugo server -D` to see them all.
### Learn 2 (oracle vs tarot, learning from a book, Marseille vs RWS, runes/pendulum/I Ching, dreams, baby witch, types of witches)
- Learning from a book: one todo line — the exact title of the Corrine Kenner book you recommend.
- Dreams (personal story): your late-2020 dreams told as in your notes, including "I dreamt I was dying, and I was disappointed to wake up" — sensitive; please reread. A separate general paragraph points readers to a doctor/therapist.
- FR additions: Oracle Belline, Mona Chollet's *Sorcières*, *Ma sorcière bien-aimée*, the French card game (l’Excuse, le petit au bout).
- Unsourced general facts: ideomotor effect for pendulums; I Ching ~3,000 years; Marseille woodblock/stencil printing.
### Happiest cards + careers (Ten/Three of Swords, Hanged Man, Judgement, Magician) + Magician in love
- Three of Swords at work: a paragraph on repeated hurt at work (humiliation, pressure) → HR, staff rep, occupational health, lawyer, therapist; FR names médecine du travail and prud’hommes. Please check the tone.
- Ten of Swords at work FR names France Travail. Happiest cards: one sentence answers the hope that the Ten of Cups means a baby (→ doctor).
### Six pictures — colours, elements, energies, modes (36 pages)
- Water uses your own six pictures, in your order.
- FIXED: the purple page's prompts no longer say "no purple". The French Air page now shows its card row.
- The black page's flip side uses « dépression » from your own colour grid (Noir : … dépression …) — that's your definition, not your story; keep or change.
### Card-meaning hubs (major arcana, minor arcana, combinations, pregnancy, money, love, scariest)
- Major arcana hub: 22 drawings described from memory — glance at them. Minor arcana hub: court-card elements (Page Earth, Knight Air, Queen Water, King Fire) presented as "the convention I use".
- Pregnancy: no "pregnancy cards" list; gentle; mentions grief after a loss — please read once for tone.
- Money FR names the Banque de France over-indebtedness commission as help — confirm.
- Scariest cards tells the voice story (your closest friend's death, the other friend's accident) — sensitive; your brand book allows it "in your own articles when you choose".
### Learn 3 (journal, intuition, one-card pull, later in life, glossary, best deck, gifted deck)
- Gifted first deck: your notes say your very first reading (26 Dec 2020) was accurate; your notes’ first reading for a stranger (Discord) seemed to miss and was confirmed days later. Both are told — confirm they don't clash (one for yourself/friends, one for a stranger?).
- Best deck: "I still read with the Rider-Waite-Smith" is inferred from your facts — confirm.
- Later in life: a short passage on subjects you don't read (mentions waiting for a medical result) — check tone.
### Researched: eclipses 2027, Rider-Waite-Smith, Lenormand, Thoth, card with no name, decans
- The writer could only verify through search results (page fetching failed) — click each external source link once.
- Eclipses 2027: 6 Feb annular, 20 Feb penumbral, 18 Jul penumbral, 2 Aug total (Spain/North Africa, ~6 min 20 s near Luxor), 17 Aug penumbral; London ~42%, Paris ~51% on 2 Aug; eye-safety line (ISO 12312-2).
- RWS: US Games licence "early 1970s" (sources disagree 1970/71); Smith's use of the Sola Busca "very likely".
- Decans: says plainly you never tested them; mentions the Sun entering Scorpio on 23 Oct 2026.
### Learn 4 (workshop's first ten minutes, lots of Cups, no majors, practising alone, finding people, feedback, a card you dislike)
- First ten minutes of a workshop: one todo line — your exact first words/instructions (the workshop page has the same gap).
- A card you've never liked: one todo line — which card, and why (yours).
- Odds in "lots of Cups" / "no major arcana" are the writer's own arithmetic.
### Six pictures — numerology (28 pages)
- Flip sides for 6, 9, 10 taken from your notes/FAQ (believing you've arrived; letting go just before the finish; a sandcastle with the tide coming in).
- Number 1 picture 2: an uncut diamond on a jeweller's bench (your "rough diamond") — a generator may make it look like a crystal.
### Six pictures — 12 signs
- Pisces pages list « dépression » as an unfavourable side — from your own sign notes (Défavorables : dépression, effacement); the pictures show only self-erasure. Keep or change the page wording.
- Your archetypes (Jinx, Jon Snow, Miranda Priestly, Hodor, Action Man, MKBHD) are never depicted — generic scenes instead.
### Learn 5 (build a spread, 12 mistakes, how long, cheat sheet, majors only, oracles dangerous?, guidance vs clairvoyance)
- How long: "within months, not years" phrased as your experience; your start (Christmas 2020 deck, first reading 26 Dec) used.
- Majors only: cultural claims (common in France, cross spread often with majors), odds computed by the writer.
- Guidance vs clairvoyance: word definitions from general knowledge (clairvoyance in French = lucidity; guidance borrowed from English; tarologie vs taromancie); FR uses « je ne suis pas Madame Soleil ».
### Practice 4 (decisions, etiquette, cold reading, Barnum, cross spread, when to get a reading, art form)
- Barnum: Forer 1948 facts checked by search (no link cited); FR uses a Kaamelott quiz example. Art form FR adds a Soulages reference.
- Cross spread: the writer's own suggestion for court cards when adding up the centre card (not a tradition).
### Practice 3 (reading for others, wrong reading, ending, touching cards, new deck, significator, how many cards)
- Reading for friends: five rules written in your voice (general advice, not from your notes) — check you'd say them.
- Significator: Waite's age/colouring correspondences quoted from search snippets; "from Wands for the fairest to Pentacles for the darkest" from memory — check.
- How many cards: two table rows are the writer's own rules of thumb.
### Ideas 1 (crystals, protection spells, timing, video call, believing, sceptics, is tarot dangerous)
- Crystals: the plan says you sold crystals in 2021, but facts.md only has sage, candles and "channelled" cards. One todo line asks whether crystals were part of it.
- Timing: a todo asks for a real timing miss from your notebook. The general timing conventions (suits as seasons, Three of Wands = Sun in Aries) are standard teaching, not web-checked.
- Video call: says "most" of the 300 readings were online, "some" face to face. A todo asks whether you noticed a difference.
- Is tarot dangerous: sensitive by nature; it points to a doctor, therapist or crisis line, with no helpline numbers.
### Ideas 2 (reading when upset, tarot for a child, not feeling anything, tired cards, making it up, bad news, someone cries)
- Tarot for a child: the positions ("play with the cards, no readings"; the child says yes and a parent knows; no age rule) are written as yours but aren't in your notes — confirm them.
- Bad news: tells the voice story, including that you were furious after losing your closest friend, and uses the admired friend's chart as an example of saying a hard thing kindly. Check you're comfortable with both.
- Someone cries: one todo asks for a time someone cried during one of your readings.
- French title of "Why a reading can be wrong" says « le prénom de mon amie » (feminine). Your notes don't say whether that friend is a man or a woman, so confirm or tell me the right word.
- CHANGED: Six pictures: the style line now says "one soft light source (daylight or a lamp)" instead of "natural window light", so night scenes (the Moon kitchen, the Chiron torch) no longer contradict it.
### Ideas 3 (two readers, what I charge for, do readers believe, disagreements, is tarot a scam, reading about someone else, health/pregnancy/death)
- What I charge for: no prices; sends readers to /sessions/ and /workshops/, which show no price yet. Tells the 2021 sage/candles/"channelled" cards story.
- What readers disagree about: "decide what each position means before you turn the cards over" extends your "decide before you shuffle" rule — confirm.
- Health, pregnancy, death (most sensitive): its personal "why" is the voice story (your closest friend's death, "who's next?", the accident) — confirm you're comfortable with it here. French uses « mon amie » for the second friend (same question as above). French adds 15/112, médecin traitant, centre de PMA.
### Ideas 4 (will they come back, not an authority, astrology isn't an excuse, why a reading can be wrong, predicting the future, spiritual bypassing, awakening)
- Why a reading can be wrong (personal story): told as in your notes; the friend is alive and well, and nothing implies you're no longer friends. One optional todo: what you did in the two weeks between the voice and the accident. Two short passages are the writer's analysis, not your words ("next" was your word and grief heard "death"; "sometimes it's our own mind… sometimes it may be more").
- Spiritual bypassing: credits John Welwood (1984) for the term — web-checked.
- Spiritual awakening: your notes don't say which word you use instead of "awakening"; it uses "a beginning" and "developing your senses". A todo asks you to confirm.
### Ideas 5 (tarot and capitalism, reading prices, what is magic, ego death, affirmations vs toxic positivity)
- Tarot and capitalism: says plainly your free events are where people first meet you before booking a workshop — check the wording of how your business works.
- Tarot reading price (money): a todo per language asks for current price ranges in France/UK with a source; no reputable survey was found, so no figures are given.
- Ego death: uses the late-2020 tsunami dream (the dream of dying was left out on purpose). A short passage on psychedelics says you don't advise on substances and points to a doctor.
- Your "don't go too high too fast… start crescendo" line now appears in six articles (baby witch, intuitive reading, not feeling anything, awakening, ego death + FR). You may want to keep it in two or three.
### Library — symbols 11–20 (pillars, veil, throne, crown, wreath, lemniscate, angel, snake, lion, horse)
- Every card listed was checked on the 1909 scans. Waite's own descriptions are used for three tiny details (the Magician's serpent belt, the caduceus on the Two of Cups, the faint crown at the end of Temperance's path); each page says how small they are on the print.
- Judgement calls on what counts: the Nine of Cups' hanging cloth and the Queen of Pentacles' head-veil (veil); the Chariot's canopy posts (pillars); the High Priestess's stone cube (throne). The World is left out of the lemniscate row.
- Your published French Leo page (astrologie/lion.md, from September) gives Leo's verb "I will" as « Je vais ». The usual French formula is « Je veux » (will as volonté, not the future tense). Not changed, since it's your published text; your call.
### Astrology tested 3 (chart without permission, six cards, birth chart, big three, the Nodes)
- Big three: gives Jupiter as your bonus placement ("its house and sign: your biggest struggles", from your notes, not part of the tested numbers). Your published Jupiter page says Jupiter = luck and that it held "a third" in the test. Your notes say Jupiter and the Nodes were not part of the tested numbers. Please reconcile.
- Six cards: chosen among cards where your sign table and the Golden Dawn agree (Lovers, Hermit, Temperance, Death, Star, Devil). Names *The Devil Wears Prada* (Miranda Priestly, from your Capricorn notes), no scene described.
- What is a birth chart: says the birth time is on French and Scottish birth certificates, usually not English/Welsh ones (except multiple births); checked against National Records of Scotland. Names Astro-Seek as the site you use. Check that's right.
- The Nodes: "2027 eclipses mostly on the Leo–Aquarius axis" matches the eclipses-2027 article; the karmic reading is presented as other astrologers' view.
### Astrology tested 2 (new moon spread, moon phases, compatibility, astrology or tarot, birth card, Scorpio season)
- Moon phases: says your notebook had only "what I said / what was confirmed" columns, nothing on the moon (inferred). Confirm.
- Compatibility: suggests Saturn, Lilith and Chiron for couples, says plainly your test was one chart at a time.
- Birth card: uses the classic method (day + month + year, then the digits of the total: 14 + 3 + 1992 = 2009 → 11 → 2, Justice and the High Priestess), with the digit-by-digit version as a variant. The life-path article says the birth card "uses the same addition" — slightly out of step.
- Scorpio season (date-bound): 2026 dates (23 October → 22 November); "this year" lines need updating each year.
- Sign ↔ card table: your published pages (the sign pages, i-tested-my-birth-chart) give Taurus → Empress and Cancer → High Priestess; the card pages and the Golden Dawn give Taurus → Hierophant and Cancer → Chariot. New articles avoid the two disputed cards. Decide which table the site uses, or say on the sign pages that yours is a personal table.
### Astrology tested 1 (rising sign, Saturn/Lilith/Chiron hub, Saturn return, Mercury retrograde, eclipses, full moon spread)
- Full moon spread: your notes have no full moon spread, so the three positions (what has come to light / what you can put down / what you keep) are the writer's. I changed the title from "the one I use" to "three cards, small enough for a napkin", and the text now says "the spread I suggest". If you have your own, swap it in.
- Saturn/Lilith/Chiron: the line "I read Lilith only for people who asked" was an extension of your Lilith page; changed to your own "I read Lilith with care: you knock first."
- Saturn return: says your test checked birth placements, not transits, so you "have no number" for the return. Confirm.
- Mercury retrograde (date-bound): "there's one on as I write this, in Scorpio" — true 24 Oct–13 Nov 2026; update after.
- Rising sign (FR): says the birth time is on the full copy of the French birth certificate (acte de naissance intégral, mairie of birth) — from the writer's knowledge, check.
### Law, religion, France (phone-line platforms, is it legal, Christianity, haram, young people) — researched, with sources
- Sources were checked through search results (the proxy blocked opening the pages). Click the cited links once to make sure they open, especially hadeethenc.com and the vatican.va page.
- Phone lines: *Complément d'enquête* (France 2, 30 Oct 2025) and the €44,000 case (franceinfo) confirmed; the platform isn't named. INAD's "100,000 practitioners / €3–4bn" is labelled as the trade body's own estimate.
- Is it legal: not legal advice; gives the escroquerie penalty, not abus de faiblesse (articles reorganised by the law of 10 May 2024); UK: 1951 Act repealed 2008, rules now in the DMCCA 2024 (since 6 April 2025).
- Christianity: Pew figures are American (2018). Mentions your father's Buddhist temple in one line.
- Is tarot haram (sensitive, please read): the Shia position rests on one thin source; doesn't say whether you are Muslim; points readers to istikhara and an imam, and doesn't argue tarot is permitted.
- Young people: the plan's "70% of 18–24s" is really 69% (Ifop/Femme Actuelle, Nov 2020) and counts belief in any of six practices, not tarot; the article says so and uses Pew 2024 (23% of 18–29s) for tarot.
### Seasonal 2 (break-up spread, grief, birthday spread, gift guide, best decks, winter spread)
- Grief (sensitive): mentions your closest friend once, as in your notes ("When my closest friend died of cancer, I was angry, not only sad."). Gives crisis numbers: Samaritans 116 123, 988 (US/Canada), Lifeline 13 11 14, 3114 / 15 / 112 in French.
- Gender in French: several French pages write « ma meilleure amie » (the friend who died) and « mon amie » (the friend in the voice story). Your notes don't say whether they were women or men. Confirm, or tell me and I'll make them consistent.
- Gift guide and best decks (affiliate later): no prices, no affiliate links. The decks named were checked against catalogue pages: classic Rider-Waite (U.S. Games), Smith-Waite Centennial, Universal Waite, Radiant Rider-Waite, Grimaud's Ancien Tarot de Marseille, Camoin-Jodorowsky, Thoth (AGM-Urania). A todo asks which decks you've held yourself.
- Birthday spread: names Astro-Seek for the solar return (confirmed it offers one).
### For readers 1 (drained after reading, "protecting yourself", teaching, strangest things, reading live, a free reading night)
- Drained: a todo asks what the tiredness felt like for you (your notes only have the two-hour stop).
- Strangest things: retells only the Facebook reviews, the messages-before-shuffling note and the pen-pal "magician"; the other stories get one line and a link. A todo asks what came up about spells in the "chills" reading.
- Reading live (trend): your lives were on Facebook; no Instagram features described. A todo asks what happens in your body during a live.
- Free reading night: 90 minutes, about six readings of ten minutes, matching your published before-a-free-online-reading article.
### For readers 3 (spiritual to teach, practice without a guru, certificates, do you still need cards, meditation, glossary words)
- Certificates (positioning): a todo asks your position. Your 2024 course FAQ offered a certificate and your brand book says no certification; the article says nothing about Maison Tarot either way. "No state diploma or licence for tarot reading in France" was confirmed by search.
- Meditation: tells the yellow ribbon story as in your notes, then adds "if you have headaches like those, the first door is a doctor's." Read it once.
- Glossary (empath, starseed, lightworker, higher self…): "spirit guides" uses a general definition (your notes don't define it) with your remarks attached; names Pleiadian/Arcturian as starseed types people use online.
### For readers 2 (client boundaries, two languages, a place for readers, reading in public, "is this real?", a reading that lands too hard)
- Two languages: Marseille facts (names table, Strength/Justice swap, L'Amoureux, the French card game with 21 trumps and l'Excuse) from general knowledge; they match your Marseille vs RWS article. Quick look.
- A place for readers: a todo asks what you wish had existed for readers when you started in 2020. No forum, membership or numbers.
- Reading in public: the body-shaking detail (not in your notes) is given only as general advice.
### Personal stories (first reading for a stranger, what reading feels like, someone I admired, your father, cleansing a deck)
- First reading: title changed to "…then she texted me a few days later" (your notes say three or four days) and "for a stranger" (your notes say your very first reading, 26 Dec 2020, was accurate). One optional todo: what you said, or what you replied to her message.
- What reading feels like: a todo asks what you feel in your body when you read.
- Someone you admired: says plainly it was astrology, not tarot (French title changed to « Lire le thème de… »). Nothing says or hints that he died. A todo asks how the reading came about and which placements made the chart harsh.
- Your father: two todos (what you were doing that night; how you learned he was at the temple thinking of you). "Night" comes from your published is-tarot-a-sin. Distance about 340 km. One gentle line: if hearing your name called happens often or frightens you, see a doctor.
- Cleansing a deck: your notes don't say why you stopped selling sage and candles. A todo asks why, and an optional one asks what the "channelled" cards were.
### Stories 2 (what I believed in 2020, "you have a gift", afraid of the dark, spiritual circles)
- What I believed: a todo asks whether you once believed "only special people can read" (planned angle, not in your notes). Uses only what's in your notes: expecting to need training, "I don't need the cards anymore", the sage/candles, mocking astrology.
- "You have a gift": a todo asks for a real moment someone told you that.
- Afraid of the dark: a todo asks what changed for you. "Corridor at night" isn't in the notes I have, so it says "a dark room"; put the corridor back if it's yours. Shadow work is offered as a hypothesis, not as what changed things.
- Spiritual circles: no friends named; the three egos get one sentence and a link.
### Library — Kabbalah: Keter, Chokhmah, Binah, Chesed, Gevurah (researched)
- Sources were checked through search results (the proxy blocked opening pages). Click the source links once.
- Court cards: the pages put the Rider-Waite-Smith Kings in Chokhmah (matching the site's card data, King of Wands = Fire of Fire) and give the Knights as the alternative reading; "this is debated" cites Benebell Wen's blog.
- Golden Dawn card titles ("Lord of Dominion"…) checked against secondary tarot sources, not Book T itself; "Lord of Material Works" rests on one source. The French titles are translations, and the pages say so.
- Mentions that some modern writers attach Pluto/Uranus to Keter and Uranus/Neptune to Chokhmah (not the Golden Dawn's scheme) — popular sources only.
### Library — Kabbalah: Tree of Life, the 22 Hebrew letters, section intro (researched)
- Sources from search results only: click through once, especially sefaria.org/Sefer_Yetzirah.1 and hermetic.com/crowley/book-4/app5.
- The French/Marseille letter order (Lévi: Aleph = the Magician … Shin = the Fool, Tav = the World) is from secondary sources, not Lévi's own text.
- Notes that Uranus/Neptune/Pluto on the Fool, Hanged Man and Judgement card pages are modern additions (the Golden Dawn used elements).
### Trends (readers accused of AI, should readers use AI, "for entertainment purposes only", Etsy spells, tarot on Instagram, tarot apps, subscriptions)
- All flagged "trend": update when the platforms change.
- Entertainment purposes only: cites legislation.gov.uk for the 1951 Act (replaced in 2008); the exact wording of the old Act's exemption couldn't be confirmed, so it's not quoted. Your Etsy past isn't mentioned.
- Etsy spells: cites Etsy's own services policy (seen through search; a policy update dated 11 August 2026 was mentioned — check the live page once). No listing named. French adds « retour affectif » flyers.
- Tarot apps: a todo asks which apps you've tried. No app named. French adds a GDPR line (access and erasure); keep or cut.
- Subscriptions: "12 € a question" is a model price only. French says 08 numbers are regulated (Arcep cap, surmafacture.fr).
### Library — Kabbalah: Tiferet, Netzach, Hod, Yesod, Malkhut (researched)
- Same court-card convention as Chokhmah (Princes = Knights, Princesses = Pages), "debated" cited once.
- Yesod's place on the body is named plainly ("the organ of generation, marked by the covenant of circumcision", after the Jewish Virtual Library and Chabad) — read once.
- Malkhut: "the ten coins of the Ten of Pentacles form the Tree of Life" is common in tarot books, not scholarly. I added the four Golden Dawn titles of the Tens (Oppression, Perfected Success, Ruin, Wealth) to its table, like the other pages.
- Sources include Book T (PDF hosted by Benebell Wen) and a hermetics.org transcription; the Jewish side relies on the Jewish Virtual Library, Sefaria and Chabad.
### Library — historical figures (10) + section intro (researched)
- Checked through search results only (opening pages was blocked); click each source once. Where sources disagree, the pages say less rather than pick one: Smith's exact death day and the year she moved to the Lizard; Waite's place of death; Harris's death date; Court de Gébelin's birth (around 1725, Nîmes by most accounts); where Lévi, Etteilla and Wirth died (left out).
- Smith: no fee figure is documented, so "a flat fee"; her 1909 "a little cash" letter is paraphrased, not quoted. Her monogram is on most cards, not all (checked on the scans).
- Crowley: the Thoth deck's first printing "usually dated 1969" (some date it 1971–72).
- Etteilla: his tarot deck dated about 1788–1789 (not 1785, which is his book); "often called the first professional reader", with why.
- Lenormand: the prediction to Joséphine is told as a story the Fondation Napoléon retells, not as fact.
- Wirth: weakest sources (Wikipedia, learntarot.com, a library record); strengthen if you find a BnF entry.
- Paul Foster Case: completed by me after the writer ran out of searches — born 1884 in Fairport (NY), Alpha et Omega, 1921 break with Moina Mathers, B.O.T.A. founded about a year later, died 1954 in Mexico City; deck printed uncoloured for students; book first published 1947 (Macoy). Sources: Wikipedia ×2, Benebell Wen, a library catalogue record.
### Library — history of tarot (7) + section intro (researched)
- Checked through search results only; click each source once (especially the AIM25 and Museum of Witchcraft records on the Golden Dawn pages, and the Morgan's 2026 *Tarot!* exhibition page).
- Corrections to the plan, following the sources: Etteilla's deck about 1788–1789 (1783–1785 is his book); Noblet "about 1659, often given as around 1650"; the "Tarot de Marseille" name coined by 19th-century scholars and occultists and fixed by Paul Marteau's 1930 Grimaud edition; Florence's ban dated March 1377.
- The Morgan's "Time" card is identified as the Hermit by the writer.
- 20th century: I filled the 1960s–70s gap (Eden Gray's *The Tarot Revealed* 1960 and *Complete Guide* 1970 with the Fool's Journey; U.S. Games, founded 1968, Rider-Waite rights in 1970 or 1971; the Thoth deck printed in an edition usually dated 1969). Sources added: Mary K. Greer, Wikipedia.
### Library — symbols 1–10 (dog, sun, moon, stars, water, river, sea, mountain, cloud, hand from a cloud) + symbols and energies section intros
- Cards checked on the 1909 scans; anything not clearly visible was left out (the Three of Wands' sea, a river on the Emperor, moons on the Swords court thrones).
- Worth a glance: the Hermit's lantern light "drawn like a star, half hidden behind the bars"; the High Priestess's headdress "many readers see as the moon in its phases"; the Temperance angel's forehead circle with a dot as "the old sign for the sun"; the Wheel's jackal-headed figure "usually identified as Anubis".
- French: « Il n’est pire eau que l’eau qui dort » is used loosely about still water — swap if you prefer.
- The energies section intro is built on your feminine/masculine definition.
### Library — symbols 21–30 (bird, rose, lily, sunflower, pomegranate, grapes, key, path, tower, child)
- Every card checked on the scans; left out when unclear (butterflies/birds on the Knight of Swords' harness, a castle on the Ace of Wands' hill, a road on Death).
- Hedged as "usually read as…": the Hierophant monk's lilies, the Two of Wands' roses and lilies, the Queen of Wands' throne sunflowers. Grapes on the Ten of Pentacles' robe: fairly sure but small.
- Key: the Hierophant's are the only keys in the deck; a second labelled row shows cards about access without a key.
- Unsourced background (standard): Peter's keys, Persephone, the ibis of Thoth, Annunciation lilies, Noah's dove, the eagle as Scorpio; FR: grenade (weapon) from the fruit, la paulée.
- Pregnancy and fertility FAQs on the child and pomegranate pages follow the compassion pattern.
### Six pictures — symbols (30 pages)
- No celestial bodies drawn: the moon page uses street lamps and night streets, the stars page a lighthouse and a lit window, the sun page daylight scenes. Angels, snakes, crowns and thrones appear as everyday objects (a stone angel on a façade, a grass snake, paper party crowns, armchairs).
- Grapes are green or golden (the style line bans purple). Children appear only as hands or from behind — check child pictures 2 and 5 once generated. Path picture 4 is fog: make sure it doesn't come out looking like smoke.
- Lion picture 4 and pillars picture 4 are the most detailed prompts; they may need a second try.

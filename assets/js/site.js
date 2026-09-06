/* Maison Tarot — comportements. Sobre : un tiroir, une apparition, une couleur qui revient. */
(() => {
  const d = document;
  const body = d.body;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hover = matchMedia('(hover: hover)').matches;

  /* — Header : transparent sur héros sombre, verre une fois défilé — */
  const header = d.querySelector('.site-header');
  if (header) {
    if (d.querySelector('.hero-ink')) header.classList.add('on-ink');
    const update = () => header.classList.toggle('scrolled', scrollY > 40);
    update();
    addEventListener('scroll', update, { passive: true });
  }

  /* — Tiroir (mobile) : ouvre de droite à gauche — */
  const drawer = d.querySelector('.drawer');
  const burger = d.querySelector('.burger');
  if (drawer && burger) {
    const open = () => { drawer.setAttribute('aria-hidden', 'false'); burger.setAttribute('aria-expanded', 'true'); body.classList.add('menu-open'); drawer.querySelector('nav a')?.focus({ preventScroll: true }); };
    const close = () => { drawer.setAttribute('aria-hidden', 'true'); burger.setAttribute('aria-expanded', 'false'); body.classList.remove('menu-open'); burger.focus({ preventScroll: true }); };
    burger.addEventListener('click', () => (drawer.getAttribute('aria-hidden') === 'false' ? close() : open()));
    drawer.querySelector('.scrim')?.addEventListener('click', close);
    drawer.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') close(); });
  }

  /* — Apparition au défilement — */
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    d.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  } else {
    d.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in'));
  }

  /* — Images : noir et blanc → couleur. Survol sur bureau (CSS) ; entrée dans l'écran sur tactile — */
  if (!hover && 'IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((en) => en.target.classList.toggle('in-color', en.isIntersecting && en.intersectionRatio > 0.55));
    }, { threshold: [0, 0.55, 1] });
    d.querySelectorAll('.img-reveal').forEach((el) => io2.observe(el));
  }

  /* — Halo qui suit le curseur sur le héros sombre — */
  const hero = d.querySelector('.hero-ink');
  if (hero && hover && !reduce) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
        raf = 0;
      });
    });
  }

  /* — Thème : clair / sombre, mémorisé. L'attribut est posé avant le rendu par le script inline du <head>. — */
  d.querySelectorAll('[data-theme-toggle]').forEach((b) => b.addEventListener('click', () => {
    const cur = d.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    d.documentElement.dataset.theme = next;
    try { localStorage.setItem('mt_theme', next); } catch (e) {}
  }));

  /* — Compte à rebours (page événement) — */
  const cd = d.querySelector('[data-countdown]');
  if (cd) {
    const target = new Date(cd.dataset.countdown).getTime();
    const cells = ['d', 'h', 'm', 's'].map((k) => cd.querySelector(`[data-${k}]`));
    const tick = () => {
      let diff = Math.max(0, target - Date.now()) / 1000;
      const v = [Math.floor(diff / 86400), Math.floor((diff % 86400) / 3600), Math.floor((diff % 3600) / 60), Math.floor(diff % 60)];
      cells.forEach((c, i) => { if (c) c.textContent = String(v[i]).padStart(2, '0'); });
    };
    tick(); setInterval(tick, 1000);
  }


  /* — Cartes : accordéon des maisons + diaporama aléatoire (3–5 s) — */
  d.querySelectorAll('[data-suits] .suit').forEach((panel) => {
    const imgs = [...panel.querySelectorAll('[data-slides] img')];
    let cur = 0;
    const next = () => {
      if (imgs.length < 2) return;
      let n; do { n = Math.floor(Math.random() * imgs.length); } while (n === cur);
      imgs[cur].classList.remove('on'); imgs[n].classList.add('on'); cur = n;
      panel.style.setProperty('--slide', `url(${imgs[n].currentSrc || imgs[n].src})`);
      setTimeout(next, 3000 + Math.random() * 2000);
    };
    if (imgs.length) panel.style.setProperty('--slide', `url(${imgs[0].src})`);
    if (!reduce) setTimeout(next, 3000 + Math.random() * 2000);
    const open = () => {
      d.querySelectorAll('[data-suits] .suit').forEach((p) => { p.classList.toggle('is-open', p === panel); p.setAttribute('aria-expanded', p === panel ? 'true' : 'false'); });
      d.querySelectorAll('[data-filter="suit"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.value === panel.dataset.suit ? 'true' : 'false'));
      applyFilters();
    };
    panel.addEventListener('click', () => { open(); d.querySelectorAll('[data-suits] .suit').forEach((p) => (p.dataset.locked = p === panel ? '1' : '')); });
    if (hover) panel.addEventListener('mouseenter', () => { if (!d.querySelector('[data-suits] .suit[data-locked="1"]')) open(); });
    panel.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  /* — Filtres (Bibliothèque, cartes) — */
  const applyFilters = () => {
    const suit = d.querySelector('[data-filter="suit"][aria-pressed="true"]')?.dataset.value || '';
    const rank = d.querySelector('[data-filter="rank"][aria-pressed="true"]')?.dataset.value || '';
    d.querySelectorAll('[data-suit-block]').forEach((b) => { b.hidden = !!suit && b.dataset.suitBlock !== suit; });
    d.querySelectorAll('[data-cards] .card-thumb').forEach((c) => { c.hidden = !!rank && c.dataset.rank !== rank; });
    const kind = d.querySelector('[data-filter="kind"][aria-pressed="true"]')?.dataset.value || '';
    d.querySelectorAll('[data-kind]').forEach((t) => { t.hidden = !!kind && t.dataset.kind !== kind; });
  };
  d.querySelectorAll('.chip[data-filter]').forEach((b) => b.addEventListener('click', () => {
    const group = b.dataset.filter;
    const wasOn = b.getAttribute('aria-pressed') === 'true';
    d.querySelectorAll(`.chip[data-filter="${group}"]`).forEach((x) => x.setAttribute('aria-pressed', 'false'));
    if (!wasOn || b.dataset.value === '') b.setAttribute('aria-pressed', 'true');
    else d.querySelector(`.chip[data-filter="${group}"][data-value=""]`)?.setAttribute('aria-pressed', 'true');
    if (group === 'suit' && b.dataset.value) d.querySelector(`[data-suits] .suit[data-suit="${b.dataset.value}"]`)?.click();
    applyFilters();
  }));

  /* — Recherche (index JSON par langue, tout côté client) — */
  const sBox = d.querySelector('[data-search]');
  if (sBox) {
    const input = sBox.querySelector('input'); const list = sBox.querySelector('.results'); const hint = sBox.querySelector('.hint');
    let idx = null;
    const openS = async () => {
      sBox.setAttribute('aria-hidden', 'false'); input.focus();
      if (!idx) { try { idx = await (await fetch(sBox.dataset.index)).json(); } catch (e) { idx = []; } }
    };
    const closeS = () => sBox.setAttribute('aria-hidden', 'true');
    d.querySelectorAll('[data-search-open]').forEach((b) => { b.addEventListener('click', openS); b.addEventListener('focus', openS); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const a = list.querySelector('a'); if (a) location.href = a.href; } });
    sBox.querySelector('.scrim')?.addEventListener('click', closeS);
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeS(); if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openS(); } });
    const norm = (t) => (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    input.addEventListener('input', () => {
      const q = norm(input.value).trim(); list.innerHTML = '';
      if (!idx || q.length < 2) { hint.hidden = q.length >= 2; return; }
      const terms = q.split(/\s+/);
      const scored = idx.map((p) => {
        const t = norm(p.title), dsc = norm(p.description), body = norm(p.content);
        let score = 0;
        terms.forEach((w) => { if (t.includes(w)) score += 6; if (dsc.includes(w)) score += 3; if (body.includes(w)) score += 1; });
        return [score, p];
      }).filter((x) => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 12);
      hint.hidden = scored.length > 0;
      scored.forEach(([, p]) => {
        const li = d.createElement('li');
        li.innerHTML = `<a href="${p.url}"><span class="s">${p.section}</span><br><span class="t"></span><br><span class="d"></span></a>`;
        li.querySelector('.t').textContent = p.title; li.querySelector('.d').textContent = p.description; list.appendChild(li);
      });
    });
  }

  /* — Prochain événement (bandeau mobile) : disparaît une fois inscrit — */
  const strip = d.querySelector('[data-next-strip]');
  if (strip) { try { if (localStorage.getItem('mt_reg_' + strip.dataset.event)) strip.hidden = true; } catch (e) {} }

  /* — Inscription à un événement : dialogue, pas de nouvelle page — */
  d.querySelectorAll('[data-register]').forEach((btn) => btn.addEventListener('click', (e) => {
    const dlg = d.querySelector(`[data-dialog="${btn.dataset.register}"]`);
    if (!dlg) return;
    e.preventDefault(); dlg.setAttribute('aria-hidden', 'false'); body.classList.add('menu-open'); dlg.querySelector('input')?.focus();
    const close = () => { dlg.setAttribute('aria-hidden', 'true'); body.classList.remove('menu-open'); };
    dlg.querySelectorAll('[data-close]').forEach((c) => c.addEventListener('click', close));
    dlg.querySelector('.scrim')?.addEventListener('click', close);
    dlg.querySelector('form')?.addEventListener('submit', () => { try { localStorage.setItem('mt_reg_' + btn.dataset.register, '1'); } catch (er) {} });
    dlg.querySelectorAll('a[data-external-register]').forEach((a) => a.addEventListener('click', () => { try { localStorage.setItem('mt_reg_' + btn.dataset.register, '1'); } catch (er) {} }));
  }));


  /* — Préchargeur (page cartes) : disparaît dès que la première image est là, 2,4 s maximum — */
  const pre = d.querySelector('[data-preloader]');
  if (pre) {
    const finish = () => pre.classList.add('done');
    setTimeout(finish, 2500);
  }

  /* — Accordéon : flèches clavier ; mobile : défilement horizontal → contenu dessous — */
  const suitsWrap = d.querySelector('[data-suits]');
  if (suitsWrap) {
    const panels = [...suitsWrap.querySelectorAll('.suit')];
    const syncInfo = (key) => d.querySelectorAll('[data-suit-info]').forEach((b) => { b.hidden = b.dataset.suitInfo !== key; });
    d.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key) || d.activeElement?.tagName === 'INPUT') return;
      const i = panels.findIndex((p) => p.classList.contains('is-open'));
      const n = e.key === 'ArrowRight' ? Math.min(panels.length - 1, i + 1) : Math.max(0, i - 1);
      if (n !== i) { panels[n].click(); panels[n].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); }
    });
    if (!hover) {
      const io3 = new IntersectionObserver((entries) => { entries.forEach((en) => { if (en.isIntersecting && en.intersectionRatio > 0.6) { panels.forEach((p) => p.classList.toggle('is-open', p === en.target)); syncInfo(en.target.dataset.suit); d.querySelectorAll('[data-filter="suit"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.value === en.target.dataset.suit ? 'true' : 'false')); applyFilters(); } }); }, { root: suitsWrap, threshold: [0.6] });
      panels.forEach((p) => io3.observe(p));
    }
    panels.forEach((p) => p.addEventListener('click', () => syncInfo(p.dataset.suit)));
  }

  /* — Tuile « 78 cartes » : diaporama — */
  d.querySelectorAll('.tile.slideshow').forEach((t) => {
    const imgs = [...t.querySelectorAll('img')]; let cur = 0;
    if (imgs.length > 1 && !reduce) setInterval(() => { imgs[cur].classList.remove('on'); cur = (cur + 1) % imgs.length; imgs[cur].classList.add('on'); }, 3500);
  });

  /* — Le Guide : bouton → champ → téléchargement, sans quitter la page — */
  d.querySelectorAll('[data-guide]').forEach((box) => {
    const form = box.querySelector('.dl-form'); const open = box.querySelector('[data-guide-open]');
    open?.addEventListener('click', () => { open.hidden = true; form.hidden = false; form.querySelector('input[type=email]')?.focus(); });
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button'); btn.disabled = true;
      if (box.dataset.action) { try { await fetch(box.dataset.action, { method: 'POST', mode: 'no-cors', body: new FormData(form) }); } catch (er) {} }
      const a = d.createElement('a'); a.href = box.dataset.file; a.download = ''; d.body.appendChild(a); a.click(); a.remove();
      btn.disabled = false; form.querySelector('.small').textContent = '✓';
    });
  });

  /* — Blog : recherche, filtres, défilement infini par lots — */
  const grid = d.querySelector('[data-posts]');
  if (grid) {
    const cards = [...grid.querySelectorAll('.post-card')]; const batch = +grid.dataset.batch || 8; const end = d.querySelector('[data-posts-end]');
    let shown = 0; let pool = cards;
    const norm = (t) => (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const reflow = () => {
      const q = norm(d.querySelector('[data-post-search]')?.value || '').trim();
      const cat = d.querySelector('[data-filter="cat"][aria-pressed="true"]')?.dataset.value || '';
      const len = d.querySelector('[data-filter="len"][aria-pressed="true"]')?.dataset.value || '';
      const sort = d.querySelector('[data-sort][aria-pressed="true"]')?.dataset.sort || 'new';
      cards.forEach((c) => (c.hidden = true));
      pool = cards.filter((c) => (!cat || c.dataset.cat.split(' ').includes(cat)) && (!q || norm(c.dataset.text).includes(q)) && (!len || (len === 's' ? +c.dataset.min <= 4 : +c.dataset.min > 4)));
      pool.sort((a, b) => sort === 'old' ? a.dataset.date - b.dataset.date : sort === 'short' ? a.dataset.min - b.dataset.min : sort === 'long' ? b.dataset.min - a.dataset.min : b.dataset.date - a.dataset.date);
      pool.forEach((c) => grid.appendChild(c));
      shown = 0; more();
    };
    d.querySelectorAll('[data-sort]').forEach((b) => b.addEventListener('click', () => { d.querySelectorAll('[data-sort]').forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); reflow(); }));
    d.querySelectorAll('[data-filter="len"]').forEach((b) => b.addEventListener('click', () => setTimeout(reflow, 0)));
    const funnel = d.querySelector('[data-funnel]'); const menu = d.querySelector('.funnel-menu');
    if (funnel && menu) {
      funnel.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; funnel.setAttribute('aria-expanded', String(open)); });
      d.addEventListener('click', (e) => { if (!e.target.closest('.funnel-wrap')) { menu.hidden = true; funnel.setAttribute('aria-expanded', 'false'); } });
    }
    /* placeholder qui s'écrit et s'efface */
    const inp = d.querySelector('[data-post-search]'); const ghost = d.querySelector('[data-type-text]');
    if (inp && ghost && !reduce) {
      inp.setAttribute('placeholder', ' ');
      const words = (inp.dataset.typeWords || '').split('|').filter(Boolean); let wi = 0, ci = 0, del = false;
      const step = () => {
        const w = words[wi] || '';
        ghost.textContent = w.slice(0, ci);
        if (!del) { ci++; if (ci > w.length) { del = true; return setTimeout(step, 1600); } }
        else { ci--; if (ci < 0) { del = false; ci = 0; wi = (wi + 1) % words.length; return setTimeout(step, 400); } }
        setTimeout(step, del ? 45 : 90);
      };
      if (words.length) step();
    }
    const more = () => { pool.slice(shown, shown + batch).forEach((c) => (c.hidden = false)); shown = Math.min(pool.length, shown + batch); end.hidden = shown < pool.length; };
    d.querySelector('[data-post-search]')?.addEventListener('input', reflow);
    d.querySelectorAll('[data-filter="cat"]').forEach((b) => b.addEventListener('click', () => setTimeout(reflow, 0)));
    const sentinel = new IntersectionObserver((en) => { if (en[0].isIntersecting && shown < pool.length) more(); }, { rootMargin: '400px' });
    if (end) sentinel.observe(end);
    reflow();
  }

  /* — Ondes : cercles fins qui convergent vers le point (clic sur bureau ; doigt, défilement et tap sur mobile) — */
  const cv = d.querySelector('[data-ripples]');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d'); let waves = []; let raf2 = 0;
    const size = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px'; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
    size(); addEventListener('resize', size);
    const ink = () => (getComputedStyle(d.documentElement).getPropertyValue('--fg').trim() || '#000');
    const emit = (x, y, n = 3) => { for (let i = 0; i < n; i++) waves.push({ x, y, r: 160 + i * 70, t: 0 }); if (!raf2) raf2 = requestAnimationFrame(draw); };
    const draw = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight); ctx.strokeStyle = ink(); ctx.lineWidth = 1;
      waves = waves.filter((w) => w.t < 1);
      waves.forEach((w) => { w.t += 0.005; const r = w.r * (1 - w.t); ctx.globalAlpha = 0.02 + 0.06 * (1 - w.t); ctx.beginPath(); ctx.arc(w.x, w.y, Math.max(0, r), 0, Math.PI * 2); ctx.stroke(); });
      raf2 = waves.length ? requestAnimationFrame(draw) : 0;
    };
    if (hover) d.addEventListener('click', (e) => emit(e.clientX, e.clientY));
    else {
      let last = 0; const throttle = (e) => { const t = performance.now(); if (t - last > 140) { last = t; const p = e.touches ? e.touches[0] : e; emit(p.clientX, p.clientY, 1); } };
      d.addEventListener('touchstart', (e) => { const p = e.touches[0]; emit(p.clientX, p.clientY); }, { passive: true });
      d.addEventListener('touchmove', throttle, { passive: true });
      addEventListener('scroll', () => emit(innerWidth / 2, innerHeight * 0.55, 1), { passive: true });
    }
  }

  /* — Dossier « Glossaire » (mobile) — */
  const folder = d.querySelector('[data-folder]');
  if (folder) {
    const openF = () => { body.classList.add('folder-open'); folder.querySelector('[data-folder-open]').setAttribute('aria-expanded', 'true'); };
    const closeF = () => { body.classList.remove('folder-open'); folder.querySelector('[data-folder-open]').setAttribute('aria-expanded', 'false'); };
    folder.querySelector('[data-folder-open]')?.addEventListener('click', () => (body.classList.contains('folder-open') ? closeF() : openF()));
    folder.querySelector('[data-folder-close]')?.addEventListener('click', closeF);
    folder.querySelectorAll('.folder-panel a').forEach((a) => a.addEventListener('click', closeF));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeF(); });
    const strip = d.querySelector('[data-next-strip]');
    const setStrip = () => d.documentElement.style.setProperty('--strip-h', strip && !strip.hidden ? strip.offsetHeight + 'px' : '0px');
    setStrip(); addEventListener('resize', setStrip);
  }

  /* — Bulle Guide (blog) : apparaît après 2 s, se ferme pour la session — */
  const bubble = d.querySelector('[data-guide-bubble]');
  if (bubble) {
    let seen = false; try { seen = sessionStorage.getItem('mt_bubble') === '1'; } catch (e) {}
    if (!seen) setTimeout(() => { bubble.hidden = false; }, 2000);
    bubble.querySelector('[data-bubble-close]')?.addEventListener('click', () => { bubble.hidden = true; try { sessionStorage.setItem('mt_bubble', '1'); } catch (e) {} });
  }

  /* — Langue : proposer, mémoriser, ne jamais rediriger — */
  const KEY = 'mt_lang';
  const read = () => d.cookie.split('; ').find((c) => c.startsWith(KEY + '='))?.split('=')[1];
  const write = (v) => { d.cookie = `${KEY}=${v}; Max-Age=${60 * 60 * 24 * 30}; Path=/; SameSite=Lax`; };
  const banner = d.querySelector('[data-lang-banner]');
  if (banner) {
    const pageLang = d.documentElement.lang.slice(0, 2);
    const target = banner.dataset.target;
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    if (read() !== pageLang && browser === target && browser !== pageLang) banner.hidden = false;
    banner.querySelector('[data-lang-close]')?.addEventListener('click', () => { write(pageLang); banner.hidden = true; });
    banner.querySelector('a')?.addEventListener('click', () => write(target));
  }
  d.querySelectorAll('[data-lang-switch]').forEach((a) => a.addEventListener('click', () => write(a.getAttribute('hreflang') || '')));

  /* — Cal.com : chargé seulement si un lien est configuré — */
  const cal = d.querySelector('[data-cal-embed]');
  if (cal && cal.dataset.calLink) {
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let dd = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; dd.head.appendChild(dd.createElement('script')).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, 'https://app.cal.com/embed/embed.js', 'init');
    window.Cal('init', 'mt', { origin: 'https://cal.com' });
    window.Cal.ns.mt('inline', { elementOrSelector: '[data-cal-embed]', calLink: cal.dataset.calLink, config: { layout: 'month_view', theme: 'light' } });
    window.Cal.ns.mt('ui', { hideEventTypeDetails: false, layout: 'month_view' });
  }
})();

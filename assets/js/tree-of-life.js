/* Arbre de vie interactif ({{< tree-of-life interactive="true" >}}).
   Le dessin et ses liens existent déjà sans ce script ; il ne fait qu’ouvrir, au lieu de quitter la page,
   un panneau qui rassemble ce que le site sait d’une sphère ou d’un sentier. Toutes les données viennent du
   JSON écrit par le shortcode (data/kabbalah.yml, data/cards.yml, chapeaux des pages) : rien n’est saisi ici. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function link(href, text, cls) {
    var a = el('a', cls, text);
    a.href = href;
    return a;
  }

  function init(root) {
    var dataEl = root.querySelector('[data-tol-data]');
    if (!dataEl) return;
    var D = JSON.parse(dataEl.textContent);
    var ui = D.ui;
    var fig = root.querySelector('.tree-of-life');
    var svg = fig.querySelector('svg');
    var body = root.querySelector('[data-tol-body]');
    var intro = root.querySelector('.tol-intro');
    var tools = root.querySelector('[data-tol-tools]');
    var flashBtn = root.querySelector('[data-tol-flash]');
    var lettersBtn = root.querySelector('[data-tol-letters]');
    var flash = svg.querySelector('.tol-flash');
    var timers = [];
    tools.hidden = false;

    function clear() {
      fig.classList.remove('has-sel');
      svg.querySelectorAll('.sel, .near').forEach(function (n) { n.classList.remove('sel', 'near'); });
    }

    function cardTile(id) {
      var c = D.cards[id];
      var a = link(c.url, '', 'tol-card');
      if (c.img) {
        var img = el('img');
        img.src = c.img; img.alt = c.name; img.loading = 'lazy'; img.width = 160; img.height = 267;
        a.appendChild(img);
      }
      a.appendChild(el('span', null, c.name));
      return a;
    }

    function sphereButton(key) {
      var s = D.spheres[key];
      var b = el('button', 'tol-chip', s.n + ' · ' + s.name);
      b.type = 'button';
      b.addEventListener('click', function () { select('sphere', key, true); });
      return b;
    }

    function showSphere(key) {
      var s = D.spheres[key];
      body.textContent = '';
      var head = el('p', 'tol-kicker', ui.sphere + ' ' + s.n + ' · ' + ui.pillars[s.pillar]);
      var h = el('h3', 'tol-title');
      h.appendChild(document.createTextNode(s.name + ' '));
      var he = el('span', 'tol-he', s.he); he.lang = 'he'; he.dir = 'rtl';
      h.appendChild(he);
      body.append(head, h, el('p', 'tol-sub', s.t));
      if (s.lede) body.appendChild(el('p', 'tol-lede', s.lede));
      var facts = el('p', 'tol-facts');
      facts.appendChild(el('strong', null, ui.planet + ui.colon));
      facts.appendChild(document.createTextNode(s.planet));
      body.appendChild(facts);
      if (s.pips && s.pips.length) {
        body.appendChild(el('p', 'tol-label-small', ui.pips));
        var g = el('div', 'tol-cards');
        s.pips.forEach(function (id) { g.appendChild(cardTile(id)); });
        body.appendChild(g);
      }
      if (s.courts && s.courts.length) {
        body.appendChild(el('p', 'tol-label-small', ui.courts));
        var g2 = el('div', 'tol-cards');
        s.courts.forEach(function (id) { g2.appendChild(cardTile(id)); });
        body.appendChild(g2);
      }
      var more = el('p', 'tol-actions');
      if (s.url) more.appendChild(link(s.url, ui.open + ' →', 'tol-open'));
      body.appendChild(more);
    }

    function showPath(n) {
      var p = D.paths[String(n)];
      var c = D.cards[p.card];
      body.textContent = '';
      body.appendChild(el('p', 'tol-kicker', ui.path + ' ' + p.n + ' · ' + ui.kinds[p.kind]));
      var h = el('h3', 'tol-title');
      var g = el('span', 'tol-glyph', p.glyph); g.lang = 'he';
      h.append(g, document.createTextNode(' ' + p.letter));
      body.appendChild(h);
      body.appendChild(el('p', 'tol-sub', ui.means + ui.colon + p.means));
      var joins = el('p', 'tol-joins');
      joins.appendChild(el('span', 'tol-label-small', ui.joins));
      joins.append(sphereButton(p.from), sphereButton(p.to));
      body.appendChild(joins);
      var row = el('div', 'tol-major');
      row.appendChild(cardTile(p.card));
      var txt = el('div');
      txt.appendChild(el('p', 'tol-major-name', p.roman + ' · ' + c.name));
      if (c.lede) txt.appendChild(el('p', 'tol-lede', c.lede));
      row.appendChild(txt);
      body.appendChild(row);
      var more = el('p', 'tol-actions');
      if (c.url) more.appendChild(link(c.url, ui.openCard + ' →', 'tol-open'));
      if (D.lettersUrl) more.appendChild(link(D.lettersUrl, ui.letters + ' →', 'tol-open'));
      body.appendChild(more);
    }

    function select(type, key, fromUser) {
      stopFlash();
      clear();
      fig.classList.add('has-sel');
      if (type === 'sphere') {
        var sEl = svg.querySelector('.tol-sphere[data-key="' + key + '"]');
        if (!sEl) return;
        sEl.classList.add('sel');
        svg.querySelectorAll('line[data-from="' + key + '"], line[data-to="' + key + '"]').forEach(function (l) {
          l.classList.add('near');
          var lab = svg.querySelector('.tol-label[data-path="' + l.dataset.path + '"]');
          if (lab) lab.classList.add('near');
          var other = l.dataset.from === key ? l.dataset.to : l.dataset.from;
          var o = svg.querySelector('.tol-sphere[data-key="' + other + '"]');
          if (o) o.classList.add('near');
        });
        showSphere(key);
      } else {
        var p = D.paths[String(key)];
        if (!p) return;
        var lab2 = svg.querySelector('.tol-label[data-path="' + key + '"]');
        var line = svg.querySelector('line[data-path="' + key + '"]');
        if (lab2) lab2.classList.add('sel');
        if (line) line.classList.add('sel');
        [p.from, p.to].forEach(function (k) {
          var o = svg.querySelector('.tol-sphere[data-key="' + k + '"]');
          if (o) o.classList.add('near');
        });
        showPath(key);
      }
      intro.hidden = true;
      if (fromUser && history.replaceState) history.replaceState(null, '', '#' + (type === 'sphere' ? 'sphere-' + key : 'path-' + key));
      // Sur téléphone, le panneau est sous le dessin : on y descend, sans quoi le toucher semblerait sans effet
      if (fromUser && window.matchMedia('(max-width: 899px)').matches) body.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }

    function reset() {
      stopFlash();
      clear();
      body.textContent = '';
      intro.hidden = false;
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    }

    function stopFlash() {
      timers.forEach(clearTimeout); timers = [];
      fig.classList.remove('flashing');
      svg.querySelectorAll('.lit').forEach(function (n) { n.classList.remove('lit'); });
    }

    // L’éclair : les sphères s’allument dans l’ordre d’émanation, le trait les suit
    function playFlash() {
      reset();
      fig.classList.add('flashing');
      var order = Object.keys(D.spheres).sort(function (a, b) { return D.spheres[a].n - D.spheres[b].n; });
      var step = reduceMotion ? 0 : 420;
      order.forEach(function (key, i) {
        timers.push(setTimeout(function () {
          var s = svg.querySelector('.tol-sphere[data-key="' + key + '"]');
          if (s) s.classList.add('lit');
        }, step * i));
      });
      timers.push(setTimeout(function () {
        fig.classList.remove('flashing');
        fig.classList.add('flashed');
      }, step * order.length + 600));
    }

    svg.querySelectorAll('.tol-sphere').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); select('sphere', a.dataset.key, true); });
    });
    svg.querySelectorAll('.tol-label').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); select('path', a.dataset.path, true); });
    });
    flashBtn.addEventListener('click', function () { fig.classList.remove('flashed'); playFlash(); });
    lettersBtn.addEventListener('click', function () {
      var on = fig.classList.toggle('mode-letters');
      lettersBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape') reset(); });

    // Un lien #path-11 ou #sphere-keter (depuis une page carte, par exemple) ouvre directement le bon panneau
    function fromHash() {
      var h = decodeURIComponent(location.hash.slice(1));
      var m;
      if ((m = /^path-(\d+)$/.exec(h)) && D.paths[m[1]]) { select('path', m[1], false); fig.scrollIntoView({ block: 'start' }); }
      else if ((m = /^sphere-([a-z]+)$/.exec(h)) && D.spheres[m[1]]) { select('sphere', m[1], false); fig.scrollIntoView({ block: 'start' }); }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }

  function boot() { document.querySelectorAll('[data-tol]').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

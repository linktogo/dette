// Graphiques SVG sans dépendance : courbes avec réticule, colonnes avec survol.
const Graphiques = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  const infobulle = () => document.getElementById('infobulle');

  function el(nom, attrs = {}, parent) {
    const n = document.createElementNS(NS, nom);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    if (parent) parent.appendChild(n);
    return n;
  }

  // Graduations « rondes » couvrant [min, max].
  function graduations(min, max, cible = 5) {
    if (min === max) { min -= 1; max += 1; }
    const brut = (max - min) / cible;
    const puissance = Math.pow(10, Math.floor(Math.log10(brut)));
    const pas = [1, 2, 2.5, 5, 10].map((m) => m * puissance).find((p) => p >= brut);
    const debut = Math.floor(min / pas) * pas;
    const fin = Math.ceil(max / pas) * pas;
    const t = [];
    for (let v = debut; v <= fin + pas / 2; v += pas) t.push(Math.round(v * 1e6) / 1e6);
    return t;
  }

  function montrerInfobulle(html, x, y) {
    const b = infobulle();
    b.innerHTML = html;
    b.hidden = false;
    const r = b.getBoundingClientRect();
    let gauche = x + 14;
    if (gauche + r.width > window.innerWidth - 8) gauche = x - r.width - 14;
    b.style.left = Math.max(8, gauche) + 'px';
    b.style.top = Math.max(8, Math.min(window.innerHeight - r.height - 8, y - r.height / 2)) + 'px';
  }
  function cacherInfobulle() { infobulle().hidden = true; }

  function cadre(conteneur, hauteur, marges) {
    conteneur.textContent = '';
    const largeur = Math.max(280, conteneur.clientWidth);
    const svg = el('svg', { viewBox: `0 0 ${largeur} ${hauteur}`, height: hauteur, role: 'img' }, conteneur);
    return { svg, largeur, x0: marges.g, x1: largeur - marges.d, y0: marges.h, y1: hauteur - marges.b };
  }

  function axeY(c, ticks, y, format) {
    for (const t of ticks) {
      el('line', { x1: c.x0, x2: c.x1, y1: y(t), y2: y(t), stroke: t === 0 ? 'var(--axe)' : 'var(--grille)', 'stroke-width': 1 }, c.svg);
      el('text', { x: c.x0 - 8, y: y(t) + 4, 'text-anchor': 'end' }, c.svg).textContent = format(t);
    }
  }

  // series : [{ nom, couleur, points: [{ x, y }], etiquette }]
  function courbes(conteneur, { series, format, formatAxe = format, hauteur = 300, description }) {
    const c = cadre(conteneur, hauteur, { g: 46, d: 64, h: 14, b: 26 });
    c.svg.setAttribute('aria-label', description);
    const xs = series[0].points.map((p) => p.x);
    const valeurs = series.flatMap((s) => s.points.map((p) => p.y));
    const ticks = graduations(Math.min(...valeurs), Math.max(...valeurs));
    const [min, max] = [ticks[0], ticks[ticks.length - 1]];
    const x = (v) => c.x0 + ((v - xs[0]) / (xs[xs.length - 1] - xs[0])) * (c.x1 - c.x0);
    const y = (v) => c.y1 - ((v - min) / (max - min)) * (c.y1 - c.y0);

    axeY(c, ticks, y, formatAxe);
    const pasX = c.largeur < 520 ? 3 : c.largeur < 760 ? 2 : 1;
    xs.forEach((v, i) => {
      if ((xs.length - 1 - i) % pasX) return;
      el('text', { x: x(v), y: c.y1 + 18, 'text-anchor': 'middle' }, c.svg).textContent = v;
    });

    const reticule = el('line', { y1: c.y0, y2: c.y1, stroke: 'var(--axe)', 'stroke-width': 1, visibility: 'hidden' }, c.svg);

    // Étiquettes de fin : écartées si elles se chevauchent, omises sinon illisibles.
    const fins = series.filter((s) => s.etiquette !== false)
      .map((s) => ({ s, y: y(s.points[s.points.length - 1].y) }))
      .sort((a, b) => a.y - b.y);
    const collision = fins.length > 1 && fins.some((f, i) => i && f.y - fins[i - 1].y < 15);

    for (const s of series) {
      const d = s.points.map((p, i) => `${i ? 'L' : 'M'}${x(p.x).toFixed(1)},${y(p.y).toFixed(1)}`).join('');
      el('path', { d, fill: 'none', stroke: s.couleur, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, c.svg);
      const fin = s.points[s.points.length - 1];
      el('circle', { cx: x(fin.x), cy: y(fin.y), r: 4, fill: s.couleur, stroke: 'var(--surface)', 'stroke-width': 2 }, c.svg);
      const principale = s === series[series.length - 1];
      if (s.etiquette !== false && (!collision || principale)) {
        el('text', { x: x(fin.x) + 9, y: y(fin.y) + 4, class: 'etiquette' }, c.svg).textContent = format(fin.y);
      }
    }

    const points = series.map((s) => el('circle', { r: 4, fill: s.couleur, stroke: 'var(--surface)', 'stroke-width': 2, visibility: 'hidden' }, c.svg));
    const zone = el('rect', { x: c.x0, y: c.y0, width: c.x1 - c.x0, height: c.y1 - c.y0, fill: 'transparent' }, c.svg);
    zone.addEventListener('pointermove', (e) => {
      const r = c.svg.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * c.largeur;
      const i = Math.max(0, Math.min(xs.length - 1, Math.round(((px - c.x0) / (c.x1 - c.x0)) * (xs.length - 1))));
      reticule.setAttribute('x1', x(xs[i])); reticule.setAttribute('x2', x(xs[i]));
      reticule.setAttribute('visibility', 'visible');
      series.forEach((s, k) => {
        points[k].setAttribute('cx', x(xs[i])); points[k].setAttribute('cy', y(s.points[i].y));
        points[k].setAttribute('visibility', 'visible');
      });
      const lignes = series.map((s) =>
        `<div><span><i style="background:${s.couleur}"></i>${s.nom}</span><span>${format(s.points[i].y)}</span></div>`).join('');
      montrerInfobulle(`<b>${xs[i]}</b>${lignes}`, e.clientX, e.clientY);
    });
    zone.addEventListener('pointerleave', () => {
      reticule.setAttribute('visibility', 'hidden');
      points.forEach((p) => p.setAttribute('visibility', 'hidden'));
      cacherInfobulle();
    });
  }

  // points : [{ x, y, detail }]
  function colonnes(conteneur, { points, couleur, format, formatAxe = format, hauteur = 260, description }) {
    const c = cadre(conteneur, hauteur, { g: 46, d: 12, h: 22, b: 26 });
    c.svg.setAttribute('aria-label', description);
    const ticks = graduations(0, Math.max(...points.map((p) => p.y)), 4);
    const max = ticks[ticks.length - 1];
    const y = (v) => c.y1 - (v / max) * (c.y1 - c.y0);
    axeY(c, ticks, y, formatAxe);

    const bande = (c.x1 - c.x0) / points.length;
    const epaisseur = Math.min(24, bande - 2);
    const pasX = bande < 34 ? 2 : 1;
    points.forEach((p, i) => {
      const cx = c.x0 + bande * (i + 0.5);
      const haut = y(p.y);
      const h = Math.max(0, c.y1 - haut);
      const r = Math.min(4, h);
      const g = cx - epaisseur / 2;
      const d = `M${g},${c.y1}V${haut + r}Q${g},${haut} ${g + r},${haut}H${g + epaisseur - r}Q${g + epaisseur},${haut} ${g + epaisseur},${haut + r}V${c.y1}Z`;
      const barre = el('path', { d, fill: couleur }, c.svg);
      if (!((points.length - 1 - i) % pasX)) {
        el('text', { x: cx, y: c.y1 + 18, 'text-anchor': 'middle' }, c.svg).textContent = p.x;
      }
      if (i === 0 || i === points.length - 1) {
        el('text', { x: cx, y: haut - 6, 'text-anchor': 'middle', class: 'etiquette' }, c.svg).textContent = format(p.y);
      }
      const cible = el('rect', { x: c.x0 + bande * i, y: c.y0, width: bande, height: c.y1 - c.y0, fill: 'transparent' }, c.svg);
      cible.addEventListener('pointermove', (e) => {
        barre.setAttribute('opacity', 0.75);
        montrerInfobulle(`<b>${p.x}</b>${p.detail}`, e.clientX, e.clientY);
      });
      cible.addEventListener('pointerleave', () => { barre.removeAttribute('opacity'); cacherInfobulle(); });
    });
  }

  return { courbes, colonnes };
})();

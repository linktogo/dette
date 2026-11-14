// Page d'accueil : une tuile par pays, chiffres tirés des modèles (scénario tendanciel).
const nf = (d) => new Intl.NumberFormat('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmt = (v, d = 1) => nf(d).format(v);
const signe = (v, d = 1) => {
  const arrondi = Number(v.toFixed(d));
  return (arrondi > 0 ? '+' : arrondi < 0 ? '−' : '') + fmt(Math.abs(arrondi), d);
};
const pct = (v, d = 1) => fmt(v, d) + ' %';
const mds = (v) => fmt(v, 0) + ' Md€';

const PAYS = [
  { id: 'fr', nom: 'France', drapeau: '🇫🇷', modele: globalThis.DetteModel,
    resume: 'Dette au-dessus de 115 % du PIB et déficit d’environ 5 % : sans mesures, la dette continue de monter.' },
  { id: 'es', nom: 'Espagne', drapeau: '🇪🇸', modele: globalThis.DetteEspagne,
    resume: 'Dette repassée sous 100 % du PIB grâce à une forte croissance, mais les retraites et les intérêts la font remonter après 2030.' },
];

// Mini-courbe du ratio de dette, 2025 à 2036, sur une échelle commune aux pays
// pour que les pentes soient comparables. Repère pointillé à 100 % du PIB.
function sparkline(points, min, max) {
  const l = 280, h = 72, m = 6;
  const ecart = max - min || 1;
  const x = (i) => m + (i / (points.length - 1)) * (l - 2 * m);
  const y = (v) => h - m - ((v - min) / ecart) * (h - 2 * m);
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.y).toFixed(1)}`).join('');
  const fin = points.length - 1;
  return `<svg class="mini-courbe" viewBox="0 0 ${l} ${h}" preserveAspectRatio="none" role="img"
      aria-label="Dette en % du PIB de ${points[0].x} à ${points[fin].x} : de ${pct(points[0].y)} à ${pct(points[fin].y)}">
    ${min < 100 && max > 100 ? `<line x1="0" x2="${l}" y1="${y(100)}" y2="${y(100)}" stroke="var(--axe)" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>` : ''}
    <path d="${d}" fill="none" stroke="var(--serie-1)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <circle cx="${x(fin)}" cy="${y(points[fin].y)}" r="3.5" fill="var(--serie-1)"/>
  </svg>`;
}

function trajectoire(m) {
  const depart = m.pointDeDepart();
  const t = m.simuler(m.DEFAUTS);
  return { depart, t, courbe: [{ x: 2025, y: m.COMPTES_2025.ratio }, ...[depart, ...t].map((a) => ({ x: a.annee, y: a.ratio }))] };
}

function carte(p, echelle) {
  const m = p.modele;
  const { depart, t, courbe } = trajectoire(m);
  const fin = t[t.length - 1];
  const c25 = m.COMPTES_2025;
  const pic = [depart, ...t].reduce((a, b) => (b.ratio > a.ratio ? b : a));
  const tendance = fin.ratio > depart.ratio
    ? { etat: 'critique', icone: '×', texte: `${signe(fin.ratio - depart.ratio)} points entre ${depart.annee} (${pct(depart.ratio)}) et ${fin.annee}` }
    : { etat: 'bon', icone: '✓', texte: `${signe(fin.ratio - depart.ratio)} points entre ${depart.annee} (${pct(depart.ratio)}) et ${fin.annee}` };

  return `
    <a class="carte pays-carte" href="${p.id}/">
      <header>
        <h2><span aria-hidden="true">${p.drapeau}</span> ${p.nom}</h2>
        <span class="ouvrir">Ouvrir le simulateur →</span>
      </header>
      <p class="pays-resume">${p.resume}</p>
      <div class="pays-hero">
        <div>
          <div class="libelle">Dette fin 2025</div>
          <div class="valeur">${pct(c25.ratio)} <span class="libelle">du PIB</span></div>
          <div class="detail">${mds(c25.dette)}</div>
        </div>
        <div>
          <div class="libelle">Tendanciel ${fin.annee}</div>
          <div class="valeur">${pct(fin.ratio)}</div>
          <div class="detail">${mds(fin.dette)}${pic !== fin && pic !== depart ? ` · pic ${pct(pic.ratio)} en ${pic.annee}` : ''}</div>
        </div>
      </div>
      <div class="mini-legende"><span>2025</span><span>% du PIB, même échelle pour les deux pays · pointillés : 100 %</span><span>${fin.annee}</span></div>
      ${sparkline(courbe, echelle.min, echelle.max)}
      <div class="verdict" data-etat="${tendance.etat}"><span class="pastille" aria-hidden="true">${tendance.icone}</span>${tendance.texte}</div>
      <dl class="pays-chiffres">
        <div><dt>Déficit ${depart.annee}</dt><dd>${pct(-depart.soldePib)} du PIB</dd></div>
        <div><dt>Déficit ${fin.annee}</dt><dd>${pct(-fin.soldePib)} du PIB</dd></div>
        <div><dt>Intérêts ${depart.annee}</dt><dd>${mds(depart.interets)} · ${pct(depart.interetsPib)}</dd></div>
        <div><dt>Intérêts ${fin.annee}</dt><dd>${mds(fin.interets)} · ${pct(fin.interetsPib)}</dd></div>
        <div><dt>Recettes publiques</dt><dd>${pct(c25.recettesPib)} du PIB</dd></div>
        <div><dt>Solde stabilisant</dt><dd>${signe(t[0].soldeStabilisant)} % du PIB</dd></div>
      </dl>
    </a>`;
}

const valeurs = PAYS.flatMap((p) => trajectoire(p.modele).courbe.map((c) => c.y));
const echelle = { min: Math.min(...valeurs) - 2, max: Math.max(...valeurs) + 2 };
document.getElementById('pays').innerHTML = PAYS.map((p) => carte(p, echelle)).join('');

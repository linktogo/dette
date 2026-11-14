// Page d'accueil : une tuile par pays, chiffres tirés des modèles (scénario tendanciel).
(() => {
  const { code, u, T } = I18N.preparer();
  const A = T.accueil;
  const { pct, pctSigne, signe } = u;
  document.title = A.titre;

  const PAYS = [
    { id: 'fr', drapeau: '🇫🇷', modele: globalThis.DetteModel },
    { id: 'es', drapeau: '🇪🇸', modele: globalThis.DetteEspagne },
    { id: 'de', drapeau: '🇩🇪', modele: globalThis.DetteAllemagne },
    { id: 'uk', drapeau: '🇬🇧', modele: globalThis.DetteRoyaumeUni, devise: 'GBP' },
  ];

  function trajectoire(m) {
    const depart = m.pointDeDepart();
    const t = m.simuler(m.DEFAUTS);
    return { depart, t, courbe: [{ x: 2025, y: m.COMPTES_2025.ratio }, ...[depart, ...t].map((a) => ({ x: a.annee, y: a.ratio }))] };
  }

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
        aria-label="${A.courbeAria(points[0].x, points[fin].x, pct(points[0].y), pct(points[fin].y))}">
      ${min < 100 && max > 100 ? `<line x1="0" x2="${l}" y1="${y(100)}" y2="${y(100)}" stroke="var(--axe)" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>` : ''}
      <path d="${d}" fill="none" stroke="var(--serie-1)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
      <circle cx="${x(fin)}" cy="${y(points[fin].y)}" r="3.5" fill="var(--serie-1)"/>
    </svg>`;
  }

  function carte(p, echelle) {
    const m = p.modele;
    const { mds, euros: eu } = I18N.outils(code, p.devise); // montants dans la devise du pays
    const { depart, t, courbe } = trajectoire(m);
    const fin = t[t.length - 1];
    const c25 = m.COMPTES_2025;
    const pic = [depart, ...t].reduce((a, b) => (b.ratio > a.ratio ? b : a));
    const ecart = fin.ratio - depart.ratio;
    const tendance = { etat: ecart > 0 ? 'critique' : 'bon', icone: ecart > 0 ? '×' : '✓',
      texte: A.evolution(`${signe(ecart)} ${Math.abs(ecart) >= 2 ? u.mots.points : u.mots.point}`, depart.annee, pct(depart.ratio), fin.annee) };

    return `
      <a class="carte pays-carte" href="${I18N.lien(p.id + '/', code)}">
        <header>
          <h2><span aria-hidden="true">${p.drapeau}</span> ${T.pays[p.id]}</h2>
          <span class="ouvrir">${A.ouvrir}</span>
        </header>
        <p class="pays-resume">${A.resume[p.id]}</p>
        <div class="pays-hero">
          <div>
            <div class="libelle">${A.detteFin2025}</div>
            <div class="valeur">${pct(c25.ratio)} <span class="libelle">${u.mots.duPib}</span></div>
            <div class="detail">${mds(c25.dette)}</div>
          </div>
          <div>
            <div class="libelle">${A.tendanciel(fin.annee)}</div>
            <div class="valeur">${pct(fin.ratio)}</div>
            <div class="detail">${mds(fin.dette)}${pic !== fin && pic !== depart ? ` · ${A.pic(pct(pic.ratio), pic.annee)}` : ''}</div>
          </div>
        </div>
        <div class="mini-legende"><span>2025</span><span>${A.legendeCourbe}</span><span>${fin.annee}</span></div>
        ${sparkline(courbe, echelle.min, echelle.max)}
        <div class="verdict" data-etat="${tendance.etat}"><span class="pastille" aria-hidden="true">${tendance.icone}</span>${tendance.texte}</div>
        <dl class="pays-chiffres">
          <div><dt>${A.deficit(depart.annee)}</dt><dd>${pct(-depart.soldePib)} ${u.mots.duPib}</dd></div>
          <div><dt>${A.deficit(fin.annee)}</dt><dd>${pct(-fin.soldePib)} ${u.mots.duPib}</dd></div>
          <div><dt>${A.interets(depart.annee)}</dt><dd>${mds(depart.interets)} · ${pct(depart.interetsPib)}</dd></div>
          <div><dt>${A.interets(fin.annee)}</dt><dd>${mds(fin.interets)} · ${pct(fin.interetsPib)}</dd></div>
          <div><dt>${A.detteHab(depart.annee)}</dt><dd>${eu(depart.dette / depart.population * 1000)}</dd></div>
          <div><dt>${A.detteHab(fin.annee)}</dt><dd>${eu(fin.dette / fin.population * 1000)}</dd></div>
          <div><dt>${A.recettes}</dt><dd>${pct(c25.recettesPib)} ${u.mots.duPib}</dd></div>
          <div><dt>${A.soldeStab}</dt><dd>${pctSigne(t[0].soldeStabilisant)} ${u.mots.duPib}</dd></div>
        </dl>
      </a>`;
  }

  const valeurs = PAYS.flatMap((p) => trajectoire(p.modele).courbe.map((c) => c.y));
  const echelle = { min: Math.min(...valeurs) - 2, max: Math.max(...valeurs) + 2 };
  document.getElementById('pays').innerHTML = PAYS.map((p) => carte(p, echelle)).join('');
})();

// Moteur commun des simulateurs : curseurs, préréglages, tuiles, graphiques, tableau,
// méthode et sources. Chaque pays fournit globalThis.PAYS (structure et textes par
// langue) et son modèle ; les textes communs viennent de i18n.js.
(() => {
  const { code, u, T: C } = I18N.preparer();
  const P = globalThis.PAYS;
  const M = P.modele;
  const { BASE, DEFAUTS, H, COMPTES_2025, simuler, pointDeDepart } = M;
  const L = P.textes[code](u, M, C);
  const { fmt, signe, pct, pctSigne, mds, points } = u;

  document.title = L.titreDoc;
  document.getElementById('titre').textContent = L.h1;
  document.getElementById('h2-postes').textContent = C.h2.postes(BASE.annee + 10);
  document.getElementById('legende-postes').innerHTML =
    `<span><i style="background:var(--serie-1);height:8px"></i>${BASE.annee + 10}</span><span><i style="background:var(--encre);width:2px;height:12px"></i>${BASE.annee}</span>`;

  // Curseurs : structure du pays (bornes, pas) + textes de la langue.
  const GROUPES = P.structure.groupes.map((g) => {
    const tg = L.groupes[g.id];
    const curseurs = g.postes
      ? H.postes.map((q) => ({
        id: 'poste_' + q.id, min: g.min, max: g.max, pas: g.pas,
        nom: L.postes[q.id].nom,
        f: (v, p) => pctSigne(p.depenses + v) + u.mots.an,
        repere: C.postesRepere(mds(q.montant), pct(q.montant / P.pib2024 * 100), L.postes[q.id].note),
      }))
      : g.curseurs.map((c) => ({ ...c, ...L.curseurs[c.id] }));
    return { id: g.id, titre: tg.titre, intro: tg.intro, resume: tg.resume, curseurs };
  });
  const PREREGLAGES = P.structure.prereglages.map((s) => ({ ...s, nom: L.prereglages[s.id] }));

  const CURSEURS = GROUPES.flatMap((g) => g.curseurs);
  let params = lireAdresse();
  const tendanciel = [pointDeDepart(), ...simuler(DEFAUTS)];

  function lireAdresse() {
    const p = { ...DEFAUTS };
    for (const [k, v] of new URLSearchParams(location.hash.slice(1))) {
      const c = CURSEURS.find((x) => x.id === k);
      const n = Number(v);
      if (c && Number.isFinite(n)) p[k] = Math.min(c.max, Math.max(c.min, n));
    }
    return p;
  }

  function ecrireAdresse() {
    const q = new URLSearchParams();
    for (const c of CURSEURS) if (params[c.id] !== DEFAUTS[c.id]) q.set(c.id, params[c.id]);
    history.replaceState(null, '', q.size ? '#' + q : location.pathname + location.search);
  }

  function construireCurseurs() {
    const racine = document.getElementById('curseurs');
    for (const g of GROUPES) {
      const bloc = document.createElement('details');
      bloc.className = 'groupe';
      // Seuls le premier groupe et ceux déjà modifiés sont dépliés au chargement.
      bloc.open = g === GROUPES[0] || g.curseurs.some((c) => params[c.id] !== DEFAUTS[c.id]);
      g.bloc = bloc;
      bloc.innerHTML = `<summary>${g.titre}<span class="pastille-groupe" hidden></span></summary>${g.intro ? `<p class="repere">${g.intro}</p>` : ''}`;
      if (g.resume) {
        const r = document.createElement('p');
        r.className = 'resume';
        g.elementResume = r;
        bloc.appendChild(r);
      }
      for (const c of g.curseurs) {
        const div = document.createElement('div');
        div.className = 'curseur';
        div.id = 'c-' + c.id;
        div.innerHTML = `
          <div class="ligne"><label for="i-${c.id}">${c.nom}</label><output for="i-${c.id}"></output></div>
          <input type="range" id="i-${c.id}" min="${c.min}" max="${c.max}" step="${c.pas}">
          <p class="repere">${c.repere}</p>`;
        div.querySelector('input').addEventListener('input', (e) => {
          params[c.id] = Number(e.target.value);
          rendre();
        });
        bloc.appendChild(div);
      }
      racine.appendChild(bloc);
    }
  }

  function construirePrereglages() {
    const racine = document.getElementById('prereglages');
    for (const s of PREREGLAGES) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = s.nom;
      b.addEventListener('click', () => {
        params = { ...DEFAUTS, ...s.p };
        for (const g of GROUPES) if (g.curseurs.some((c) => params[c.id] !== DEFAUTS[c.id])) g.bloc.open = true;
        rendre();
      });
      racine.appendChild(b);
    }
  }

  function majCurseurs() {
    for (const c of CURSEURS) {
      const div = document.getElementById('c-' + c.id);
      div.querySelector('input').value = params[c.id];
      div.querySelector('output').textContent = c.f(params[c.id], params);
      div.classList.toggle('modifie', params[c.id] !== DEFAUTS[c.id]);
      div.classList.toggle('inactif', c.actifSi ? !c.actifSi(params) : false);
    }
    for (const g of GROUPES) {
      if (g.resume) g.elementResume.textContent = g.resume(params);
      const modifies = g.curseurs.filter((c) => params[c.id] !== DEFAUTS[c.id] && !(c.actifSi && !c.actifSi(params))).length;
      const pastille = g.bloc.querySelector('.pastille-groupe');
      pastille.hidden = !modifies;
      pastille.textContent = modifies;
      pastille.title = C.modifies(modifies);
    }
    const boutons = document.querySelectorAll('#prereglages button');
    PREREGLAGES.forEach((s, i) => {
      const cible = { ...DEFAUTS, ...s.p };
      // Un curseur inactif (année de crise sans crise, par exemple) ne compte pas.
      const egal = CURSEURS.every((c) => params[c.id] === cible[c.id] || (c.actifSi && !c.actifSi(params) && !c.actifSi(cible)));
      boutons[i].setAttribute('aria-pressed', egal);
    });
  }

  function verdict(t) {
    const debut = t[0], fin = t[t.length - 1], avant = t[t.length - 2];
    const pic = t.reduce((a, b) => (b.ratio > a.ratio ? b : a));
    const creux = t.reduce((a, b) => (b.ratio < a.ratio ? b : a));
    if (fin.ratio < debut.ratio && fin.ratio <= avant.ratio) {
      return { etat: 'bon', icone: '✓', texte: pic === debut ? C.verdict.baisseTout : C.verdict.baissePic(pct(pic.ratio), pic.annee) };
    }
    if (fin.ratio <= avant.ratio) return { etat: 'alerte', icone: '!', texte: C.verdict.stabilisee(pct(pic.ratio), pic.annee) };
    if (creux !== fin && creux !== debut) {
      return { etat: 'critique', icone: '×', texte: C.verdict.remonte(creux.annee, pct(creux.ratio), points(fin.ratio - avant.ratio), fin.annee) };
    }
    return { etat: 'critique', icone: '×', texte: C.verdict.derive(points(fin.ratio - avant.ratio), fin.annee) };
  }

  function majTuiles(t) {
    const debut = t[0], fin = t[t.length - 1];
    const ref = tendanciel[tendanciel.length - 1];
    const v = verdict(t);
    const ecart = fin.ratio - ref.ratio;
    const vsTendanciel = Math.abs(ecart) < 0.05 ? C.tuiles.identique : C.tuiles.vsTendanciel(points(ecart));
    document.getElementById('tuiles').innerHTML = `
      <div class="tuile hero">
        <div class="libelle">${C.tuiles.detteEn(fin.annee)}</div>
        <div class="valeur">${pct(fin.ratio)} <span class="libelle">${u.mots.duPib}</span></div>
        <div class="detail">${C.tuiles.depuis(points(fin.ratio - debut.ratio), debut.annee, pct(debut.ratio))} · ${vsTendanciel}</div>
        <div class="verdict" data-etat="${v.etat}"><span class="pastille" aria-hidden="true">${v.icone}</span>${v.texte}</div>
      </div>
      <div class="tuile">
        <div class="libelle">${C.tuiles.encoursEn(fin.annee)}</div>
        <div class="valeur">${mds(fin.dette)}</div>
        <div class="detail">${C.tuiles.enDixAns(u.mdsSigne(fin.dette - debut.dette, 0))}</div>
      </div>
      <div class="tuile">
        <div class="libelle">${C.tuiles.chargeEn(fin.annee)}</div>
        <div class="valeur">${mds(fin.interets)}</div>
        <div class="detail">${C.tuiles.pibContre(pct(fin.interetsPib), pct(debut.interetsPib), debut.annee)}</div>
      </div>
      <div class="tuile">
        <div class="libelle">${C.tuiles.soldeEn(fin.annee)}</div>
        <div class="valeur">${pctSigne(fin.soldePib)}</div>
        <div class="detail">${C.tuiles.soldeStab(pctSigne(fin.soldeStabilisant))}</div>
      </div>`;
  }

  const css = (nom) => `var(--${nom})`;
  const legende = (id, items) => {
    document.getElementById(id).innerHTML = items.map(([nom, couleur]) => `<span><i style="background:${css(couleur)}"></i>${nom}</span>`).join('');
  };
  // Une décimale sur l'axe seulement quand le pas de graduation n'est pas entier.
  const dec = (v) => (Number.isInteger(v) ? 0 : 1);

  function majGraphiques(t) {
    const identique = t.every((a, i) => Math.abs(a.ratio - tendanciel[i].ratio) < 1e-9);
    const mesure = { x: 2025, y: COMPTES_2025.ratio };
    Graphiques.courbes(document.getElementById('g-ratio'), {
      description: C.graph.descRatio(C.pays[P.id]),
      format: (v) => pct(v), formatAxe: (v) => pct(v, dec(v)),
      series: [
        { nom: C.legende.tendanciel, couleur: css('reference'), etiquette: !identique, points: [mesure, ...tendanciel.map((a) => ({ x: a.annee, y: a.ratio }))] },
        { nom: C.legende.scenario, couleur: css('serie-1'), points: [mesure, ...t.map((a) => ({ x: a.annee, y: a.ratio }))] },
      ],
    });
    legende('legende-ratio', [[C.legende.scenario, 'serie-1'], [C.legende.tendanciel, 'reference']]);

    const projete = t.slice(1);
    Graphiques.courbes(document.getElementById('g-solde'), {
      hauteur: 260,
      description: C.graph.descSolde,
      format: (v) => pctSigne(v), formatAxe: (v) => pctSigne(v, dec(v)),
      series: [
        { nom: C.legende.soldeStabilisant, couleur: css('serie-2'), points: projete.map((a) => ({ x: a.annee, y: a.soldeStabilisant })) },
        { nom: C.legende.soldePublic, couleur: css('serie-1'), points: projete.map((a) => ({ x: a.annee, y: a.soldePib })) },
      ],
    });
    legende('legende-solde', [[C.legende.soldePublic, 'serie-1'], [C.legende.soldeStabilisant, 'serie-2']]);

    Graphiques.colonnes(document.getElementById('g-interets'), {
      description: C.graph.descInterets,
      couleur: css('serie-1'), format: (v) => fmt(v, 0), formatAxe: (v) => fmt(v, 0),
      points: t.map((a) => ({
        x: a.annee, y: a.interets,
        detail: `<div><span>${C.graph.interets}</span><span>${mds(a.interets)}</span></div>
          <div><span>${C.graph.enPctPib}</span><span>${pct(a.interetsPib)}</span></div>
          <div><span>${C.graph.tauxMoyen}</span><span>${pct(a.tauxMoyen, 2)}</span></div>`,
      })),
    });
    const fin = t[t.length - 1];
    document.getElementById('note-interets').textContent =
      C.graph.noteInterets(pct(t[0].tauxMoyen, 2), t[0].annee, pct(fin.tauxMoyen, 2), fin.annee);
  }

  function majPostes(t) {
    const debut = t[0], fin = t[t.length - 1];
    const part = (a, id) => (a.postes[id] / a.pib) * 100;
    const max = Math.max(...H.postes.flatMap((q) => [part(debut, q.id), part(fin, q.id)]));
    const lignes = H.postes.map((q) => {
      const avant = part(debut, q.id), apres = part(fin, q.id);
      return `
        <div class="poste">
          <span class="nom">${L.postes[q.id].nom}</span>
          <span class="piste" title="${debut.annee} : ${pct(avant)}">
            <span class="barre" style="width:${(apres / max) * 100}%"></span>
            <span class="repere-depart" style="left:${(avant / max) * 100}%"></span>
          </span>
          <span class="chiffres"><b>${pct(apres)}</b> ${signe(apres - avant)} ${u.mots.point} · ${mds(fin.postes[q.id])}</span>
        </div>`;
    }).join('');
    const reste = fin.nonVentile;
    document.getElementById('postes').innerHTML = lignes + (Math.abs(reste) < 0.5 ? '' :
      `<p class="note">${L.nonVentile(u.mdsSigne(reste, 0), fin.annee)}</p>`);
  }

  function majTableau(t) {
    const lignes = t.map((a, i) => `
      <tr${i ? '' : ' class="depart"'}>
        <td>${a.annee}${i ? '' : ` (${C.tableau.depart})`}</td>
        <td>${fmt(a.pib, 0)}</td>
        <td>${a.croissanceNominale === null ? '–' : pct(a.croissanceNominale)}</td>
        <td>${fmt(a.recettes, 0)}</td>
        <td>${fmt(a.depensesPrimaires, 0)}</td>
        <td>${pctSigne(a.soldePrimairePib)}</td>
        <td>${fmt(a.interets, 0)}</td>
        <td>${pct(a.tauxMoyen, 2)}</td>
        <td>${pctSigne(a.soldePib)}</td>
        <td>${a.soldeStabilisant === null ? '–' : pctSigne(a.soldeStabilisant)}</td>
        <td>${fmt(a.dette, 0)}</td>
        <td>${pct(a.ratio)}</td>
      </tr>`).join('');
    document.getElementById('tableau').innerHTML = `
      <thead><tr>${C.tableau.entetes.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${lignes}</tbody>`;
  }

  function construireTextes() {
    document.getElementById('methode').innerHTML = L.methode(pointDeDepart());
    const traduire = (v) => (v && typeof v === 'object' ? v[code] || v.fr : v);
    document.getElementById('sources').innerHTML = P.sources.map((s) => `
      <li><a href="${s.url}" target="_blank" rel="noopener">${traduire(s.nom)}</a><br>${traduire(s.chiffre)}
        <div class="usage">${C.usage} ${traduire(s.usage)}</div></li>`).join('');
  }

  function rendre() {
    const t = [pointDeDepart(), ...simuler(params)];
    majCurseurs();
    majTuiles(t);
    majGraphiques(t);
    majPostes(t);
    majTableau(t);
    ecrireAdresse();
  }

  construireCurseurs();
  construirePrereglages();
  construireTextes();
  rendre();
  new ResizeObserver(() => majGraphiques([pointDeDepart(), ...simuler(params)])).observe(document.getElementById('g-ratio'));
  window.addEventListener('hashchange', () => { params = lireAdresse(); rendre(); });
})();

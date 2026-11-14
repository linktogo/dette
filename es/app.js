const { BASE, DEFAUTS, H, COMPTES_2025, simuler, pointDeDepart, effetImpot, effetIVA, effetSmi, effetRevenuUniversel } = DetteEspagne;

const nf = (d) => new Intl.NumberFormat('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const fmt = (v, d = 1) => nf(d).format(v);
const signe = (v, d = 1) => {
  const arrondi = Number(v.toFixed(d));
  return (arrondi > 0 ? '+' : arrondi < 0 ? '−' : '') + fmt(Math.abs(arrondi), d);
};
const pct = (v, d = 1) => fmt(v, d) + ' %';
const mds = (v) => fmt(v, 0) + ' Md€';
const points = (v, d = 1) => `${signe(v, d)} ${Math.abs(v) >= 2 ? 'points' : 'point'}`;
const euros = (v) => nf(0).format(v) + ' €';

const ansMois = (v) => {
  const mois = Math.round(v * 12);
  return `${Math.floor(mois / 12)} ans${mois % 12 ? ` et ${mois % 12} mois` : ''}`;
};

const PIB_2024 = 1595;
const NOTES_POSTES = {
  defense: 'Fonction défense au sens d’Eurostat. Au sens de l’OTAN (pensions militaires, Garde civile en mission…), 33 Md€ en 2025, soit 2 % du PIB ; l’Espagne s’est engagée à 2,1 %.',
  enseignement: 'Du primaire au supérieur, géré surtout par les communautés autonomes.',
  sante: 'Système national de santé, géré par les communautés autonomes.',
  retraites: 'Pensions de vieillesse et de réversion. Les curseurs du groupe « Retraites » s’y ajoutent.',
  social: 'Chômage, invalidité, famille, dépendance, exclusion. Le revenu universel, net des aides qu’il remplace, s’y ajoute.',
  securite: 'Police nationale, Garde civile, polices régionales, justice, prisons.',
  economie: 'Transports, énergie, agriculture, aides aux entreprises, fonds européens.',
  general: 'Administration générale, transferts à l’UE, recherche fondamentale. Hors intérêts.',
  cadre: 'Logement, environnement, culture et sport.',
};

const iraTaux = H.irpf.taux;
const iraSeuils = H.irpf.seuils;
const trancheNom = (i) => (i === iraSeuils.length - 1
  ? `Au-delà de ${euros(iraSeuils[i])}`
  : i === 0 ? `Jusqu’à ${euros(iraSeuils[1])}` : `De ${euros(iraSeuils[i])} à ${euros(iraSeuils[i + 1])}`);
const NOTES_IR = [
  'Tous les contribuables la traversent ; le minimum personnel (5 550 €) y est imputé.',
  '',
  '',
  'Revenus moyens supérieurs.',
  'Hauts revenus.',
  'Très hauts revenus, environ 0,1 % des déclarants.',
];

const GROUPES = [
  {
    titre: 'Économie',
    curseurs: [
      { id: 'croissance', nom: 'Croissance du PIB en volume', min: -1, max: 3.5, pas: 0.1, f: (v) => pct(v) + '/an',
        repere: 'Rythme moyen sur 10 ans, hors inflation. AIReF : 2,5 % en 2026, 2,1 % en 2027, puis un ralentissement.' },
      { id: 'inflation', nom: 'Inflation', min: 0, max: 5, pas: 0.1, f: (v) => pct(v) + '/an',
        repere: 'Avec 1,6 % de croissance et 2,0 % d’inflation, un déficit d’environ 3,5 % du PIB suffit à stabiliser la dette.' },
      { id: 'tauxMarche', nom: 'Taux d’emprunt du Trésor', min: 0, max: 8, pas: 0.1, f: (v) => pct(v),
        repere: 'Tesoro : émissions à 2,71 % en moyenne en 2025, encours à 2,32 %. Vie moyenne : 7,9 ans.' },
    ],
  },
  {
    titre: 'Dépenses',
    curseurs: [
      { id: 'depenses', nom: 'Dépense publique hors intérêts, en volume', min: -1, max: 4, pas: 0.1, f: (v) => pct(v) + '/an',
        repere: 'Référence : au rythme de la croissance. Les règles européennes plafonnent la dépense nette ; l’AIReF juge l’Espagne en dépassement.' },
      { id: 'economies', nom: 'Économies pérennes supplémentaires', min: 0, max: 80, pas: 2.5, f: (v) => mds(v),
        repere: 'En Md€ de 2026, atteints en 3 ans. AIReF : un ajustement de 0,9 point de PIB (environ 15 Md€) serait nécessaire d’ici 2028.' },
    ],
  },
  {
    titre: 'Dépenses par poste',
    intro: 'Rythme de chaque poste en volume. Sans réglage, tous suivent le rythme général ci-dessus.',
    curseurs: H.postes.map((q) => ({
      id: 'poste_' + q.id, nom: q.nom, min: -4, max: 10, pas: 0.1,
      f: (v, p) => signe(p.depenses + v) + ' %/an',
      repere: `≈ ${fmt(q.montant, 0)} Md€ en 2024, soit ${pct(q.montant / PIB_2024 * 100)} du PIB. ${NOTES_POSTES[q.id]}`,
    })),
  },
  {
    titre: 'Recettes',
    curseurs: [
      { id: 'prelevements', nom: 'Taux de recettes publiques', min: -3, max: 4, pas: 0.1, f: (v) => signe(v) + ' pt de PIB',
        repere: 'Banco de España : recettes à 42,9 % du PIB en 2025, dépenses à 45,3 %.' },
      { id: 'niches', nom: 'Bénéfices fiscaux supprimés', min: 0, max: 100, pas: 5, f: (v) => fmt(v, 0) + ' %',
        repere: 'AIReF : environ 60 Md€ par an, dont 17,8 Md€ de taux réduits d’IVA (qui recoupent les curseurs IVA). Gain net retenu : la moitié.' },
      { id: 'fraude', nom: 'Fraude recouvrée en plus', min: 0, max: 15, pas: 0.5, f: (v) => '+' + fmt(v) + ' Md€/an',
        repere: 'Agencia Tributaria : 22,7 Md€ recouvrés grâce au contrôle en 2025.' },
    ],
  },
  {
    titre: 'IVA',
    intro: 'Trois taux en vigueur. Effet immédiat, calculé à consommation inchangée.',
    resume: (p) => {
      const gain = effetIVA(p);
      return Math.abs(gain) < 0.05 ? 'Taux inchangés.' : `Effet : ${signe(gain)} Md€ par an, en euros de 2026.`;
    },
    curseurs: [
      { id: 'iva21', nom: 'Taux général', min: 15, max: 25, pas: 0.5, f: (v) => pct(v),
        repere: `Actuel : 21 %. La plupart des biens et services. Un point ≈ ${fmt(H.iva.parPoint[0])} Md€ (estimation de l’application).` },
      { id: 'iva10', nom: 'Taux réduit', min: 4, max: 21, pas: 0.5, f: (v) => pct(v),
        repere: `Actuel : 10 %. Hôtellerie, restauration, transports, logement neuf. Un point ≈ ${fmt(H.iva.parPoint[1])} Md€. Bruxelles évoque 7 Md€ pour passer l’hôtellerie à 21 %.` },
      { id: 'iva4', nom: 'Taux super-réduit', min: 0, max: 10, pas: 0.5, f: (v) => pct(v),
        repere: `Actuel : 4 %. Pain, lait, fruits et légumes, médicaments, livres. Un point ≈ ${fmt(H.iva.parPoint[2], 2)} Md€.` },
    ],
  },
  {
    titre: 'IRPF, sociétés et hauts patrimoines',
    intro: 'Barème général combiné (part de l’État et part d’une communauté autonome « type »). Les communautés fixent leur propre part : le taux marginal maximal va de 45 % (Madrid) à 54 % (Communauté valencienne).',
    resume: (p) => {
      const gain = effetImpot(p);
      return Math.abs(gain) < 0.05 ? 'Barème inchangé.' : `Effet à terme : ${signe(gain)} Md€ par an, en euros de 2026.`;
    },
    curseurs: [
      ...iraTaux.map((t, i) => ({
        id: 'ir' + t, nom: trancheNom(i), min: Math.max(5, t - 10), max: t + 25, pas: 0.5, f: (v) => pct(v),
        repere: `Tranche à ${t} %. Un point ≈ ${fmt(H.irpf.parPoint[i], 2)} Md€. ${NOTES_IR[i]}`.trim(),
      })),
      { id: 'irSurtaxe', nom: 'Nouvelle tranche supérieure', min: 0, max: 25, pas: 1, f: (v, p) => (v ? `${pct(p.ir47 + v)} (+${v} pts)` : 'aucune'),
        repere: 'Taux ajouté à celui de la dernière tranche, au-delà du seuil ci-dessous.' },
      { id: 'irSeuil', nom: 'Seuil de la nouvelle tranche', min: 400000, max: 3000000, pas: 100000, f: (v) => euros(v),
        repere: 'Plus le seuil est haut, moins il reste de revenus à taxer.', actifSi: (p) => p.irSurtaxe > 0 },
      { id: 'societes', nom: 'Impôt sur les sociétés', min: 15, max: 35, pas: 0.5, f: (v) => pct(v),
        repere: `Taux général : 25 %. 45,6 Md€ en 2024 (Funcas). Un point ≈ ${fmt(H.societes.parPoint)} Md€ avant réaction des entreprises.` },
      { id: 'patrimoine', nom: 'Impôt plancher sur les patrimoines de plus de 100 M€', min: 0, max: 3, pas: 0.1, f: (v) => (v ? pct(v) + ' par an' : 'aucun'),
        repere: `S’ajouterait à l’impôt de solidarité sur les grandes fortunes. Un point ≈ ${fmt(H.patrimoineParPoint, 0)} Md€ bruts (estimation de l’application).` },
      { id: 'erosion', nom: 'Réaction des contribuables', min: 0, max: 80, pas: 5, f: (v) => `−${fmt(v, 0)} % du gain`,
        repere: 'Part du gain perdue par départs, optimisation ou moindre activité. S’applique aux hausses sur les tranches à 37 % et plus, sur les sociétés et sur les patrimoines.',
        actifSi: (p) => p.ir37 > 37 || p.ir45 > 45 || p.ir47 > 47 || p.irSurtaxe > 0 || p.societes > 25 || p.patrimoine > 0 },
    ],
  },
  {
    titre: 'Retraites',
    intro: 'Les pensions sont revalorisées sur l’IPC (loi de 2021). Le MEI, cotisation de 0,9 % en 2026 portée à 1,2 % en 2029, est compté dans le tendanciel.',
    curseurs: [
      { id: 'ageLegal', nom: 'Âge légal de départ', min: -2, max: 3, pas: 0.25, f: (v) => ansMois(67 + v),
        repere: `Référence : 67 ans, atteint en 2027 (65 ans avec une longue carrière). Estimation de l’application : un an de plus rapporte environ ${fmt(H.age.plus[0] + H.age.plus[1], 0)} Md€ en 2035.` },
      { id: 'cotisation', nom: 'Cotisation retraite en plus du MEI', min: -1, max: 3, pas: 0.1, f: (v) => points(v),
        repere: `Un point ≈ ${fmt(H.cotisationPoint)} Md€ par an (le MEI à 0,9 % doit rapporter 5,3 Md€ en 2026), mais renchérit le travail.` },
      { id: 'sousIndexation', nom: 'Pensions revalorisées sous l’IPC', min: 0, max: 2, pas: 0.1, f: (v) => (v ? '−' + fmt(v) + ' pt/an' : 'non'),
        repere: `Un point de moins économise environ ${fmt(H.sousIndexationPoint)} Md€ par an, acquis les années suivantes (pensions contributives : ~203 Md€).` },
      { id: 'anneesSousIndexation', nom: 'Durée de la sous-indexation', min: 1, max: 10, pas: 1, f: (v) => `${v} an${v > 1 ? 's' : ''}`,
        repere: 'À partir de 2027.', actifSi: (p) => p.sousIndexation > 0 },
      { id: 'retraites', nom: 'Dérive de la dépense de pensions', min: 0, max: 200, pas: 10, f: (v) => fmt(v, 0) + ' % de la projection AIReF',
        repere: 'AIReF : 12,7 % du PIB en 2022, 16,1 % en 2050, sous l’effet de l’arrivée à la retraite du baby-boom.' },
    ],
  },
  {
    titre: 'Emploi et vieillissement',
    curseurs: [
      { id: 'chomage', nom: 'Taux de chômage visé', min: 5, max: 16, pas: 0.1, f: (v) => pct(v),
        repere: `Référence : 10,2 % (EPA, T3 2026). Un point en moins rapporte environ ${fmt(H.chomagePoint[0] + H.chomagePoint[1], 0)} Md€ par an (estimation), atteint en ${H.monteeChomage} ans.` },
      { id: 'dependance', nom: 'Dépenses de dépendance en 2050', min: 0.8, max: 2.5, pas: 0.1, f: (v) => pct(v) + ' du PIB',
        repere: 'Ageing Report 2024 : environ 0,8 % en 2022, +0,6 point en 2050 (référence 1,4 %).' },
    ],
  },
  {
    titre: 'SMI',
    intro: 'Salaire minimum interprofessionnel. Hausse ajoutée à la revalorisation décidée chaque année par le gouvernement.',
    resume: (p) => {
      const s = effetSmi(p);
      if (!p.smi) return 'SMI inchangé.';
      const solde = s.recettes - s.depenses - (H.chomagePoint[0] + H.chomagePoint[1]) * s.chomage;
      return `Chômage ${points(s.chomage, 2)}. Effet à terme sur le solde : ${signe(solde)} Md€ par an, en euros de 2026.`;
    },
    curseurs: [
      { id: 'smi', nom: 'Hausse du SMI', min: 0, max: 25, pas: 1,
        f: (v) => (v ? `+${v} % (≈ ${euros(H.smi.brutMensuel * (1 + v / 100))} bruts × 14)` : 'aucune'),
        repere: `${euros(H.smi.brutMensuel)} bruts par mois sur 14 versements en 2026, exonérés d’IRPF. Par point : +${fmt(H.smi.recettesPoint, 2)} Md€ de cotisations, −${fmt(H.smi.publicPoint, 2)} Md€ de salaires publics.` },
      { id: 'smiEmplois', nom: 'Emplois perdus par point de hausse', min: 0, max: 30, pas: 1,
        f: (v) => (v ? `${fmt(v * 1000, 0)} emplois` : 'aucun'),
        repere: 'Hypothèse débattue, notamment après la hausse de 22 % de 2019. Les emplois perdus passent par le levier « chômage ».',
        actifSi: (p) => p.smi > 0 },
    ],
  },
  {
    titre: 'Revenu universel',
    intro: 'Versé à chaque résident, sans condition. Il remplace les aides non contributives à hauteur de son montant ; pensions contributives et allocations chômage d’assurance ne sont pas touchées.',
    resume: (p) => {
      const r = effetRevenuUniversel(p);
      if (r.brut < 0.05) return 'Aucun revenu universel.';
      const pib = (v) => pct((v / BASE.pib) * 100);
      return `Coût brut ${mds(r.brut)}, aides supprimées −${mds(r.aides)}, coût net ${mds(r.net)} par an (${pib(r.net)} du PIB)`
        + (r.financement > 0.05 ? `, dont ${mds(r.financement)} couverts par le prélèvement dédié.` : '.');
    },
    curseurs: [
      { id: 'ruAdulte', nom: 'Montant par adulte', min: 0, max: 1200, pas: 50, f: (v) => (v ? euros(v) + '/mois' : 'aucun'),
        repere: `${fmt(H.ru.adultes)} millions d’adultes : 100 € par mois coûtent ${mds(H.ru.adultes * 1.2)} par an. Pour mémoire, ingreso mínimo vital moyen : 517 € par foyer.` },
      { id: 'ruMineur', nom: 'Montant par mineur', min: 0, max: 600, pas: 25, f: (v) => (v ? euros(v) + '/mois' : 'aucun'),
        repere: `${fmt(H.ru.mineurs)} millions de mineurs, versé aux parents. Remplace les prestations familiales.` },
      { id: 'ruAides', nom: 'Aides supprimées en contrepartie', min: 0, max: 100, pas: 5, f: (v) => fmt(v, 0) + ' % de l’absorbable',
        repere: 'Une aide est supprimée en proportion du revenu universel rapporté à son montant moyen : IMV, pensions non contributives, allocation chômage d’assistance, revenus minimums régionaux, la moitié des aides au logement, 80 % des prestations familiales.',
        actifSi: (p) => p.ruAdulte > 0 || p.ruMineur > 0 },
      { id: 'ruFinancement', nom: 'Part financée par un prélèvement dédié', min: 0, max: 100, pas: 5, f: (v) => fmt(v, 0) + ' %',
        repere: 'Impôt proportionnel sur tous les revenus, par exemple. Calculé sans effet sur l’activité.',
        actifSi: (p) => p.ruAdulte > 0 || p.ruMineur > 0 },
    ],
  },
  {
    titre: 'Chocs',
    curseurs: [
      { id: 'crise', nom: 'Coût d’une crise', min: 0, max: 300, pas: 10, f: (v) => (v ? mds(v) : 'aucune'),
        repere: 'Covid : la dette est passée d’environ 98 % à 120 % du PIB en 2020. DANA de Valence : 3,6 Md€ de dépenses en 2025.' },
      { id: 'anneeCrise', nom: 'Année de la crise', min: 2027, max: 2035, pas: 1, f: (v) => String(v),
        repere: 'Coût réparti 60 % / 40 % sur deux ans, avec recul du PIB.', actifSi: (p) => p.crise > 0 },
    ],
  },
];

const PREREGLAGES = [
  { nom: 'Tendanciel', p: {} },
  { nom: 'Taux élevés', p: { tauxMarche: 4.5 } },
  { nom: 'Croissance faible', p: { croissance: 0.8, depenses: 0.8 } },
  { nom: 'Retraite à 68 ans', p: { ageLegal: 1 } },
  { nom: 'Sans dérive des pensions', p: { retraites: 0 } },
  { nom: 'Chômage à 7 %', p: { chomage: 7 } },
  // Proposition de l'assistant : aucun levier poussé à l'extrême, le déficit reste sous 3 %.
  { nom: 'Effort partagé', p: {
    depenses: 1.3, poste_defense: 3,
    prelevements: 0.5, niches: 15, fraude: 2,
    sousIndexation: 0.3, anneesSousIndexation: 4,
    chomage: 8.5,
  } },
  { nom: 'Taxer les hauts revenus', p: { ir45: 48, ir47: 51, irSurtaxe: 5, irSeuil: 1000000, patrimoine: 1.5 } },
  { nom: 'SMI +10 %', p: { smi: 10 } },
  { nom: 'Revenu universel', p: { ruAdulte: 500, ruMineur: 125, ruFinancement: 50 } },
  { nom: 'Crise en 2029', p: { crise: 150, anneeCrise: 2029 } },
];

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
    pastille.title = `${modifies} curseur${modifies > 1 ? 's' : ''} modifié${modifies > 1 ? 's' : ''}`;
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
    return { etat: 'bon', icone: '✓', texte: pic === debut ? 'Dette en baisse sur toute la période' : `Dette en baisse : pic à ${pct(pic.ratio)} en ${pic.annee}` };
  }
  if (fin.ratio <= avant.ratio) {
    return { etat: 'alerte', icone: '!', texte: `Stabilisée après un pic à ${pct(pic.ratio)} en ${pic.annee}` };
  }
  if (creux !== fin && creux !== debut) {
    return { etat: 'critique', icone: '×', texte: `Remonte depuis ${creux.annee} (${pct(creux.ratio)}) : ${points(fin.ratio - avant.ratio)} en ${fin.annee}` };
  }
  return { etat: 'critique', icone: '×', texte: `En dérive : ${points(fin.ratio - avant.ratio)} en ${fin.annee}` };
}

function majTuiles(t) {
  const debut = t[0], fin = t[t.length - 1];
  const ref = tendanciel[tendanciel.length - 1];
  const v = verdict(t);
  const ecart = fin.ratio - ref.ratio;
  const vsTendanciel = Math.abs(ecart) < 0.05 ? 'identique au tendanciel' : `${points(ecart)} vs tendanciel`;
  document.getElementById('tuiles').innerHTML = `
    <div class="tuile hero">
      <div class="libelle">Dette en ${fin.annee}</div>
      <div class="valeur">${pct(fin.ratio)} <span class="libelle">du PIB</span></div>
      <div class="detail">${points(fin.ratio - debut.ratio)} depuis ${debut.annee} (${pct(debut.ratio)}) · ${vsTendanciel}</div>
      <div class="verdict" data-etat="${v.etat}"><span class="pastille" aria-hidden="true">${v.icone}</span>${v.texte}</div>
    </div>
    <div class="tuile">
      <div class="libelle">Encours en ${fin.annee}</div>
      <div class="valeur">${mds(fin.dette)}</div>
      <div class="detail">${signe(fin.dette - debut.dette, 0)} Md€ en 10 ans</div>
    </div>
    <div class="tuile">
      <div class="libelle">Charge d’intérêts en ${fin.annee}</div>
      <div class="valeur">${mds(fin.interets)}</div>
      <div class="detail">${pct(fin.interetsPib)} du PIB, contre ${pct(debut.interetsPib)} en ${debut.annee}</div>
    </div>
    <div class="tuile">
      <div class="libelle">Solde public en ${fin.annee}</div>
      <div class="valeur">${signe(fin.soldePib)} %</div>
      <div class="detail">Solde stabilisant : ${signe(fin.soldeStabilisant)} % du PIB · seuil européen : −3 %</div>
    </div>`;
}

const css = (nom) => `var(--${nom})`;
const legende = (id, items) => {
  document.getElementById(id).innerHTML = items.map(([nom, couleur]) => `<span><i style="background:${css(couleur)}"></i>${nom}</span>`).join('');
};

function majGraphiques(t) {
  const identique = t.every((a, i) => Math.abs(a.ratio - tendanciel[i].ratio) < 1e-9);
  const mesure = { x: 2025, y: COMPTES_2025.ratio };
  Graphiques.courbes(document.getElementById('g-ratio'), {
    description: 'Dette publique espagnole en pourcentage du PIB, de 2025 à 2036, votre scénario comparé au tendanciel',
    format: (v) => pct(v), formatAxe: (v) => fmt(v, 0) + ' %',
    series: [
      { nom: 'Tendanciel', couleur: css('reference'), etiquette: !identique, points: [mesure, ...tendanciel.map((a) => ({ x: a.annee, y: a.ratio }))] },
      { nom: 'Votre scénario', couleur: css('serie-1'), points: [mesure, ...t.map((a) => ({ x: a.annee, y: a.ratio }))] },
    ],
  });
  legende('legende-ratio', [['Votre scénario', 'serie-1'], ['Tendanciel', 'reference']]);

  const projete = t.slice(1);
  Graphiques.courbes(document.getElementById('g-solde'), {
    hauteur: 260,
    description: 'Solde public et solde stabilisant en pourcentage du PIB, de 2027 à 2036',
    format: (v) => signe(v) + ' %', formatAxe: (v) => signe(v, Number.isInteger(v) ? 0 : 1) + ' %',
    series: [
      { nom: 'Solde stabilisant', couleur: css('serie-2'), points: projete.map((a) => ({ x: a.annee, y: a.soldeStabilisant })) },
      { nom: 'Solde public', couleur: css('serie-1'), points: projete.map((a) => ({ x: a.annee, y: a.soldePib })) },
    ],
  });
  legende('legende-solde', [['Solde public', 'serie-1'], ['Solde stabilisant', 'serie-2']]);

  Graphiques.colonnes(document.getElementById('g-interets'), {
    description: 'Charge d’intérêts annuelle en milliards d’euros, de 2026 à 2036',
    couleur: css('serie-1'), format: (v) => fmt(v, 0), formatAxe: (v) => fmt(v, 0),
    points: t.map((a) => ({
      x: a.annee, y: a.interets,
      detail: `<div><span>Intérêts</span><span>${mds(a.interets)}</span></div>
        <div><span>En % du PIB</span><span>${pct(a.interetsPib)}</span></div>
        <div><span>Taux moyen de la dette</span><span>${pct(a.tauxMoyen, 2)}</span></div>`,
    })),
  });
  const fin = t[t.length - 1];
  document.getElementById('note-interets').textContent =
    `Taux moyen payé sur la dette : ${pct(t[0].tauxMoyen, 2)} en ${t[0].annee}, ${pct(fin.tauxMoyen, 2)} en ${fin.annee}.`;
}

function majPostes(t) {
  const debut = t[0], fin = t[t.length - 1];
  const part = (a, id) => (a.postes[id] / a.pib) * 100;
  const max = Math.max(...H.postes.flatMap((q) => [part(debut, q.id), part(fin, q.id)]));
  const lignes = H.postes.map((q) => {
    const avant = part(debut, q.id), apres = part(fin, q.id);
    return `
      <div class="poste">
        <span class="nom">${q.nom}</span>
        <span class="piste" title="${debut.annee} : ${pct(avant)} du PIB">
          <span class="barre" style="width:${(apres / max) * 100}%"></span>
          <span class="repere-depart" style="left:${(avant / max) * 100}%"></span>
        </span>
        <span class="chiffres"><b>${pct(apres)}</b> ${signe(apres - avant)} pt · ${mds(fin.postes[q.id])}</span>
      </div>`;
  }).join('');
  const reste = fin.nonVentile;
  document.getElementById('postes').innerHTML = lignes + (Math.abs(reste) < 0.5 ? '' :
    `<p class="note">Non ventilé (économies transversales, SMI des agents publics, crise) : ${signe(reste, 0)} Md€ en ${fin.annee}.</p>`);
}

function majTableau(t) {
  const lignes = t.map((a, i) => `
    <tr${i ? '' : ' class="depart"'}>
      <td>${a.annee}${i ? '' : ' (départ)'}</td>
      <td>${fmt(a.pib, 0)}</td>
      <td>${a.croissanceNominale === null ? '–' : pct(a.croissanceNominale)}</td>
      <td>${fmt(a.recettes, 0)}</td>
      <td>${fmt(a.depensesPrimaires, 0)}</td>
      <td>${signe(a.soldePrimairePib)} %</td>
      <td>${fmt(a.interets, 0)}</td>
      <td>${pct(a.tauxMoyen, 2)}</td>
      <td>${signe(a.soldePib)} %</td>
      <td>${a.soldeStabilisant === null ? '–' : signe(a.soldeStabilisant) + ' %'}</td>
      <td>${fmt(a.dette, 0)}</td>
      <td>${pct(a.ratio)}</td>
    </tr>`).join('');
  document.getElementById('tableau').innerHTML = `
    <thead><tr>
      <th>Année</th><th>PIB (Md€)</th><th>Croissance en valeur</th><th>Recettes (Md€)</th>
      <th>Dépenses hors intérêts (Md€)</th><th>Solde primaire</th><th>Intérêts (Md€)</th><th>Taux moyen</th>
      <th>Solde public</th><th>Solde stabilisant</th><th>Dette (Md€)</th><th>Dette / PIB</th>
    </tr></thead><tbody>${lignes}</tbody>`;
}

function construireTextes() {
  const d = pointDeDepart();
  document.getElementById('methode').innerHTML = `
    <p>Même méthode que le simulateur français. Chaque année, la dette augmente du déficit : dépenses hors intérêts, moins recettes, plus intérêts. Le PIB progresse de la croissance en volume et de l’inflation ; les recettes suivent le PIB ; les dépenses hors intérêts suivent leur propre rythme.</p>
    <p><strong>Point de départ estimé (fin ${d.annee}) :</strong> PIB ${mds(d.pib)}, dette ${mds(d.dette)} (${pct(d.ratio)} du PIB, prévision de l’AIReF de juillet 2026), déficit ${pct(-d.soldePib)} du PIB, intérêts ${mds(d.interets)}. Le dernier chiffre mesuré est celui du Banco de España pour fin 2025 : ${fmt(COMPTES_2025.dette, 0)} Md€, ${pct(COMPTES_2025.ratio)} du PIB. En novembre 2026, l’AIReF a relevé sa prévision de déficit 2026 à 2,8 %.</p>
    <p><strong>Hypothèses propres à l’application, non tirées des sources :</strong></p>
    <ul>
      <li>${fmt(H.refinancement * 100)} % de l’encours est refinancé chaque année au taux de marché, et toute dette nouvelle l’est en totalité. C’est le calage du modèle français, ajusté à la vie moyenne plus courte de la dette espagnole (7,9 ans contre 8,6).</li>
      <li>La dépense hors intérêts de 2026 est répartie entre postes selon leur poids estimé de 2024. Les montants par poste sont reconstitués à partir des parts du PIB publiées par Eurostat et du total de l’IGAE : ce sont des ordres de grandeur.</li>
      <li>Supprimer un bénéfice fiscal rapporte ${fmt(H.nichesRendement * 100, 0)} % de son coût affiché.</li>
      <li>Les rendements par point de l’IVA, de l’IRPF, de l’impôt sur les sociétés et de l’impôt plancher sur les patrimoines sont des estimations de l’application, fiables à 30 % près. L’IVA est calée sur les 17,8 Md€ de taux réduits chiffrés par l’AIReF ; l’IRPF sur ses 142,5 Md€ de 2025. Le barème est celui d’une communauté « type » : les communautés autonomes fixent leur propre part.</li>
      <li>L’IVA est calculée à consommation inchangée : une hausse ne réduit pas les achats et ne pèse pas sur la croissance, une baisse ne les stimule pas.</li>
      <li>Un an d’âge légal en plus ou en moins vaut ${fmt(H.age.plus[0] + H.age.plus[1])} Md€ par an en 2035, atteints progressivement (estimation de l’application, à 50 % près : environ 330 000 départs par an et une pension d’entrée d’environ 21 000 €).</li>
      <li>La dérive des pensions suit la projection de l’AIReF (de 13,0 % du PIB en 2026 à 16,1 % en 2050) ; le MEI suit le calendrier légal. Les dépenses de dépendance progressent en ligne droite vers leur niveau de 2050.</li>
      <li>Un point de chômage en moins rapporte ${fmt(H.chomagePoint[0] + H.chomagePoint[1])} Md€ par an, en ${H.monteeChomage} ans, sans effet ajouté sur le PIB (estimation de l’application).</li>
      <li>Les effets par point de hausse du SMI sont des estimations de l’application, fiables à 50 % près. Le SMI étant exonéré d’IRPF, seules les cotisations sont comptées. Les emplois perdus sont convertis en chômage sur une population active de ${fmt(H.smi.populationActive, 1)} millions.</li>
      <li>Le revenu universel est imputé au poste « Autre protection sociale ». Hormis l’IMV, les montants des aides qu’il remplace (${mds(H.ru.aides.reduce((s, a) => s + a.montant, 0))} au total) sont des ordres de grandeur ; leur réduction suit le rapport entre le revenu universel et l’aide moyenne.</li>
      <li>Les leviers budgétaires montent en charge sur ${H.montee} ans, puis suivent le PIB.</li>
      <li>Une crise réduit le PIB de 1 % par tranche de 50 Md€, dont la moitié est rattrapée l’année suivante.</li>
      <li>Le « tendanciel » maintient les dépenses hors intérêts au rythme de la croissance, plus la dérive des pensions et de la dépendance : ce n’est pas une prévision officielle.</li>
    </ul>
    <p><strong>Ce que le modèle ignore :</strong> l’effet des économies ou des hausses d’impôts sur la croissance, la réaction des taux au niveau de dette, la fin des fonds européens NextGenerationEU en 2026, les transferts entre administrations (la reprise de dette des communautés autonomes par l’État ne change pas la dette consolidée), les cessions d’actifs et les écarts entre déficit et variation de dette.</p>`;

  document.getElementById('sources').innerHTML = Object.values(SOURCES).map((s) => `
    <li><a href="${s.url}" target="_blank" rel="noopener">${s.nom}</a><br>${s.chiffre}
      <div class="usage">Usage : ${s.usage}</div></li>`).join('');
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

// Textes et structure communs aux pays construits sur le modèle commun (modele.js).
// Chaque pays n'apporte que ses particularités : noms des taux, repères chiffrés,
// notes des postes, point de départ et hypothèses propres.
// Navigateur : window.PaysCommun ; Node : require('../textes-communs.js').
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PaysCommun = fabrique();
})(globalThis, function () {
  // Structure des curseurs à partir du modèle : bornes et pas.
  function structure(m, options = {}) {
    const H = m.H, D = m.DEFAUTS;
    const top = H.ir.top;
    const actifIR = (p) => p[top.id] > top.taux || p.irSurtaxe > 0 || (H.societes && p.societes > H.societes.taux);
    const actifRU = (p) => p.ruAdulte > 0 || p.ruMineur > 0;
    const groupes = [
      { id: 'economie', curseurs: [
        { id: 'croissance', min: -1, max: 3.5, pas: 0.1 },
        { id: 'inflation', min: 0, max: 5, pas: 0.1 },
        { id: 'tauxMarche', min: 0, max: 8, pas: 0.1 },
      ] },
      { id: 'depenses', curseurs: [
        { id: 'depenses', min: -1, max: 4, pas: 0.1 },
        { id: 'economies', min: 0, max: options.economiesMax, pas: options.economiesPas },
      ] },
      { id: 'postes', postes: true, min: -4, max: 8, pas: 0.1 },
      { id: 'recettes', curseurs: [
        { id: 'prelevements', min: -3, max: 3, pas: 0.1 },
        { id: 'fraude', min: 0, max: options.fraudeMax, pas: options.fraudeMax / 40 },
      ] },
      { id: 'tva', curseurs: H.tva.ids.map((id, i) => ({ id, min: Math.max(0, H.tva.taux[i] - 6), max: H.tva.taux[i] + 6, pas: 0.5 })) },
      { id: 'ir', curseurs: [
        { id: 'irZone', min: -3, max: 5, pas: 0.5 },
        { id: top.id, min: top.taux - 8, max: top.taux + 15, pas: 0.5 },
        { id: 'irSurtaxe', min: 0, max: 20, pas: 1 },
        { id: 'irSeuil', min: Math.round(top.seuil * 2 / 50000) * 50000 || 100000, max: 3000000, pas: 50000, actifSi: (p) => p.irSurtaxe > 0 },
        ...(H.societes ? [{ id: 'societes', min: H.societes.taux - 8, max: H.societes.taux + 10, pas: 0.5 }] : []),
        { id: 'erosion', min: 0, max: 80, pas: 5, actifSi: actifIR },
      ] },
      { id: 'retraites', curseurs: [
        { id: 'ageLegal', min: -2, max: 3, pas: 0.25 },
        { id: 'cotisation', min: -1, max: 3, pas: 0.1 },
        { id: 'sousIndexation', min: 0, max: 2, pas: 0.1 },
        { id: 'anneesSousIndexation', min: 1, max: 10, pas: 1, actifSi: (p) => p.sousIndexation > 0 },
        { id: 'retraites', min: 0, max: 200, pas: 10 },
      ] },
      { id: 'emploi', curseurs: [
        { id: 'chomage', min: Math.max(2, Math.round(D.chomage - 3)), max: Math.round(D.chomage + 5), pas: 0.1 },
        { id: 'dependance', min: H.dependance2022, max: Math.round((D.dependance + 1.5) * 10) / 10, pas: 0.1 },
      ] },
      ...(H.smi ? [{ id: 'smi', curseurs: [
        { id: 'smi', min: 0, max: 25, pas: 1 },
        { id: 'smiEmplois', min: 0, max: 20, pas: 1, actifSi: (p) => p.smi > 0 },
      ] }] : []),
      { id: 'ru', curseurs: [
        { id: 'ruAdulte', min: 0, max: 1200, pas: 50 },
        { id: 'ruMineur', min: 0, max: 600, pas: 25 },
        { id: 'ruAides', min: 0, max: 100, pas: 5, actifSi: actifRU },
        { id: 'ruFinancement', min: 0, max: 100, pas: 5, actifSi: actifRU },
      ] },
      { id: 'chocs', curseurs: [
        { id: 'crise', min: 0, max: options.criseMax, pas: options.criseMax / 20 },
        { id: 'anneeCrise', min: 2027, max: 2035, pas: 1, actifSi: (p) => p.crise > 0 },
      ] },
    ];
    const tva0 = H.tva.ids[0];
    const prereglages = [
      { id: 'tendanciel', p: {} },
      ...(options.prereglages || []),
      { id: 'taux', p: { tauxMarche: D.tauxMarche + 1.5 } },
      { id: 'croissance', p: { croissance: Math.round((D.croissance + 0.8) * 10) / 10 } },
      { id: 'faible', p: { croissance: Math.max(0, Math.round((D.croissance - 0.8) * 10) / 10), depenses: Math.max(0, Math.round((D.croissance - 0.8) * 10) / 10) } },
      { id: 'retraite', p: { ageLegal: 1 } },
      { id: 'tvaHausse', p: { [tva0]: H.tva.taux[0] + 1 } },
      { id: 'hauts', p: { [top.id]: top.taux + 5, irSurtaxe: 5, irSeuil: D.irSeuil } },
      ...(H.smi ? [{ id: 'smi', p: { smi: 10 } }] : []),
      { id: 'ru', p: { ruAdulte: options.ruAdulte, ruMineur: Math.round(options.ruAdulte / 4 / 25) * 25, ruFinancement: 50 } },
      { id: 'crise', p: { crise: options.criseMax / 2, anneeCrise: 2029 } },
    ];
    return { groupes, prereglages };
  }

  const calc = (m) => ({
    totalAides: m.H.ru.aides.reduce((s, a) => s + a.montant, 0),
    agePlus: m.H.age.plus[0] + m.H.age.plus[1],
    chomagePt: m.H.chomagePoint[0] + m.H.chomagePoint[1],
    stabilisant: (() => {
      const n = (1 + m.DEFAUTS.croissance / 100) * (1 + m.DEFAUTS.inflation / 100) - 1;
      return -m.BASE.dette / m.BASE.pib * 100 * n / (1 + n);
    })(),
    smiSolde: (p) => {
      const s = m.effetSmi(p);
      return { s, solde: s.recettes - s.depenses - (m.H.chomagePoint[0] + m.H.chomagePoint[1]) * s.chomage };
    },
  });

  // Textes génériques par langue ; s = particularités du pays dans cette langue.
  const GENERIQUE = {
    fr: (u, m, s) => {
      const { H, BASE, DEFAUTS: D, COMPTES_2025: C } = m;
      const { fmt, pct, pctSigne, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Effet${aTerme ? ' à terme' : ''} : ${mdsSigne(g)} par an, en euros de 2026.`);
      const top = H.ir.top;
      return {
        groupes: {
          economie: { titre: 'Économie' },
          depenses: { titre: 'Dépenses' },
          postes: { titre: 'Dépenses par poste', intro: 'Rythme de chaque poste en volume. Sans réglage, tous suivent le rythme général ci-dessus.' },
          recettes: { titre: 'Recettes' },
          tva: { titre: 'TVA', intro: 'Effet immédiat, calculé à consommation inchangée.', resume: (p) => effet(m.effetIVA(p), 'Taux inchangés.', false) },
          ir: { titre: 'Impôt sur le revenu et sociétés', resume: (p) => effet(m.effetImpot(p), 'Barème inchangé.') },
          retraites: { titre: 'Retraites' },
          emploi: { titre: 'Emploi et vieillissement' },
          smi: { titre: 'Salaire minimum', resume: (p) => {
            if (!p.smi) return 'Salaire minimum inchangé.';
            const { s: e, solde } = k.smiSolde(p);
            return `Chômage ${points(e.chomage, 2)}. Effet à terme sur le solde : ${mdsSigne(solde)} par an, en euros de 2026.`;
          } },
          ru: { titre: 'Revenu universel', intro: 'Versé à chaque résident, sans condition. Il remplace les aides non contributives à hauteur de son montant ; les retraites et l’assurance chômage ne sont pas touchées.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Aucun revenu universel.';
              return `Coût brut ${mds(r.brut)}, aides supprimées −${mds(r.aides)}, coût net ${mds(r.net)} par an (${pct(r.net / BASE.pib * 100)} du PIB)`
                + (r.financement > 0.05 ? `, dont ${mds(r.financement)} couverts par le prélèvement dédié.` : '.');
            } },
          chocs: { titre: 'Chocs' },
        },
        curseurs: {
          croissance: { nom: 'Croissance du PIB en volume', f: (v) => pctAn(v), repere: 'Rythme moyen sur 10 ans, hors inflation.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: `Avec ${pct(D.croissance)} de croissance et ${pct(D.inflation)} d’inflation, un solde de ${pctSigne(k.stabilisant)} du PIB stabilise la dette.` },
          tauxMarche: { nom: 'Taux d’emprunt de l’État', f: (v) => pct(v), repere: `Taux moyen à l’émission. Référence : ${pct(D.tauxMarche)}.` },
          depenses: { nom: 'Dépense publique hors intérêts, en volume', f: (v) => pctAn(v), repere: 'Référence : au rythme de la croissance.' },
          economies: { nom: 'Économies pérennes supplémentaires', f: (v) => mds(v), repere: 'En Md€ de 2026, atteints en 3 ans.' },
          prelevements: { nom: 'Taux de recettes publiques', f: (v) => signe(v) + ' pt de PIB', repere: `Recettes à ${pct(C.recettesPib)} du PIB en 2025.` },
          fraude: { nom: 'Fraude recouvrée en plus', f: (v) => '+' + fmt(v) + ' Md€/an', repere: 'Recettes supplémentaires, en Md€ de 2026 par an, atteintes en 3 ans.' },
          ...Object.fromEntries(H.tva.ids.map((id, i) => [id, { nom: s.tva[i].nom, f: (v) => pct(v),
            repere: `Actuel : ${pct(H.tva.taux[i], H.tva.taux[i] % 1 ? 1 : 0)}. ${s.tva[i].note} Un point ≈ ${fmt(H.tva.parPoint[i], 2)} Md€ (estimation de l’application).` }])),
          irZone: { nom: s.irZone || 'Taux des tranches inférieures', f: (v) => signe(v) + ' pt', repere: `Points ajoutés à tous les taux sous ${pct(top.taux, 0)}. Un point ≈ ${fmt(H.ir.zone, 1)} Md€ (estimation de l’application).` },
          [top.id]: { nom: 'Taux supérieur', f: (v) => pct(v), repere: `Actuel : ${pct(top.taux, 0)} au-delà de ${euros(top.seuil)}. Un point ≈ ${fmt(top.parPoint, 2)} Md€ (estimation).` },
          irSurtaxe: { nom: 'Nouvelle tranche supérieure', f: (v, p) => (v ? `${pct(p[top.id] + v)} (+${v} pts)` : 'aucune'), repere: 'Taux ajouté à celui de la dernière tranche, au-delà du seuil ci-dessous.' },
          irSeuil: { nom: 'Seuil de la nouvelle tranche', f: (v) => euros(v), repere: 'Plus le seuil est haut, moins il reste de revenus à taxer.' },
          ...(H.societes ? { societes: { nom: 'Impôt sur les sociétés', f: (v) => pct(v), repere: `Taux actuel : ${pct(H.societes.taux, 0)}. Un point ≈ ${fmt(H.societes.parPoint)} Md€ (estimation).` } } : {}),
          erosion: { nom: 'Réaction des contribuables', f: (v) => `−${fmt(v, 0)} % du gain`, repere: 'Part du gain perdue par départs, optimisation ou moindre activité. S’applique aux hausses sur les hauts revenus et les sociétés.' },
          ageLegal: { nom: 'Âge légal de départ', f: (v) => ansMois(s.ageRef + v), repere: `${s.ageNote} Estimation de l’application : un an de plus rapporte environ ${fmt(k.agePlus, 1)} Md€ par an à terme.` },
          cotisation: { nom: 'Taux de cotisation retraite', f: (v) => points(v), repere: `Un point ≈ ${fmt(H.cotisationPoint, 1)} Md€ par an (estimation), mais renchérit le travail.` },
          sousIndexation: { nom: 'Pensions revalorisées sous l’inflation', f: (v) => (v ? '−' + fmt(v) + ' pt/an' : 'non'), repere: `Un point de moins économise environ ${fmt(H.sousIndexationPoint, 2)} Md€ par an, acquis les années suivantes (estimation).` },
          anneesSousIndexation: { nom: 'Durée de la sous-indexation', f: (v) => u.annees(v), repere: 'À partir de 2027.' },
          retraites: { nom: 'Dérive de la dépense de pensions', f: (v) => fmt(v, 0) + ' % de l’hypothèse', repere: s.deriveNote },
          chomage: { nom: 'Taux de chômage visé', f: (v) => pct(v), repere: `Référence : ${pct(D.chomage)} (${s.chomageSource}). Un point en moins rapporte environ ${fmt(k.chomagePt, 1)} Md€ par an (estimation), en 5 ans.` },
          dependance: { nom: 'Dépenses de dépendance en 2050', f: (v) => pct(v) + ' du PIB', repere: `Environ ${pct(H.dependance2022)} du PIB en 2022 ; ${pct(D.dependance)} retenu pour 2050 (hypothèse de l’application).` },
          ...(H.smi ? {
            smi: { nom: 'Hausse du salaire minimum', f: (v) => (v ? `+${v} % (≈ ${euros(H.smi.mensuel * (1 + v / 100))}/mois)` : 'aucune'), repere: `${euros(H.smi.mensuel)} bruts par mois en 2026. ${s.smiNote || ''} Par point : +${fmt(H.smi.recettesPoint, 2)} Md€ de recettes, −${fmt(H.smi.publicPoint, 2)} Md€ de salaires publics (estimations).` },
            smiEmplois: { nom: 'Emplois perdus par point de hausse', f: (v) => (v ? `${fmt(v * 1000, 0)} emplois` : 'aucun'), repere: 'Hypothèse débattue. Les emplois perdus passent par le levier « chômage ».' },
          } : {}),
          ruAdulte: { nom: 'Montant par adulte', f: (v) => (v ? euros(v) + '/mois' : 'aucun'), repere: `${fmt(H.ru.adultes)} millions d’adultes : 100 € par mois coûtent ${mds(H.ru.adultes * 1.2, 1)} par an.` },
          ruMineur: { nom: 'Montant par mineur', f: (v) => (v ? euros(v) + '/mois' : 'aucun'), repere: `${fmt(H.ru.mineurs)} millions de mineurs, versé aux parents. Remplace les prestations familiales.` },
          ruAides: { nom: 'Aides supprimées en contrepartie', f: (v) => fmt(v, 0) + ' % de l’absorbable', repere: `Une aide est supprimée en proportion du revenu universel rapporté à son montant moyen : ${s.aides}.` },
          ruFinancement: { nom: 'Part financée par un prélèvement dédié', f: (v) => fmt(v, 0) + ' %', repere: 'Impôt proportionnel sur tous les revenus, par exemple. Calculé sans effet sur l’activité.' },
          crise: { nom: 'Coût d’une crise', f: (v) => (v ? mds(v) : 'aucune'), repere: s.criseNote },
          anneeCrise: { nom: 'Année de la crise', f: (v) => String(v), repere: 'Coût réparti 60 % / 40 % sur deux ans, avec recul du PIB.' },
        },
        postes: {
          defense: 'Défense', enseignement: 'Enseignement', sante: 'Santé', retraites: 'Retraites', social: 'Autre protection sociale',
          securite: 'Sécurité et justice', economie: 'Affaires économiques', general: 'Services généraux', cadre: 'Logement, environnement, culture',
        },
        prereglages: {
          tendanciel: 'Tendanciel', taux: 'Taux élevés', croissance: 'Croissance forte', faible: 'Croissance faible',
          retraite: `Retraite à ${s.ageRefCourt + 1} ans`, tvaHausse: 'TVA +1 point', hauts: 'Taxer les hauts revenus',
          smi: 'Salaire minimum +10 %', ru: 'Revenu universel', crise: 'Crise en 2029',
        },
        nonVentile: (montant, annee) => `Non ventilé (économies transversales, crise) : ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Même méthode que les autres simulateurs. Chaque année, la dette augmente du déficit : dépenses hors intérêts, moins recettes, plus intérêts. Le PIB progresse de la croissance en volume et de l’inflation ; les recettes suivent le PIB ; les dépenses hors intérêts suivent leur propre rythme.</p>
          <p><strong>Point de départ estimé (fin ${d.annee}) :</strong> PIB ${mds(d.pib)}, dette ${mds(d.dette)} (${pct(d.ratio)} du PIB), solde ${pctSigne(d.soldePib)} du PIB, intérêts ${mds(d.interets)}. ${s.depart}</p>
          <p><strong>Hypothèses propres à l’application, non tirées des sources :</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % de l’encours est refinancé chaque année au taux de marché, et toute dette nouvelle l’est en totalité. ${s.refinancement || ''}</li>
            <li>Les montants par poste sont des ordres de grandeur reconstitués à partir des parts du PIB publiées par Eurostat.</li>
            <li>Les rendements par point de la TVA et de l’impôt sur le revenu, les effets de l’âge légal (${mds(k.agePlus, 1)} par an et par année), d’un point de chômage (${mds(k.chomagePt, 1)}) et du salaire minimum sont des estimations de l’application, fiables à 50 % près. La TVA est calculée à consommation inchangée.</li>
            <li>${s.deriveNote} Les aides remplacées par le revenu universel (${mds(k.totalAides, 1)} au total) sont des ordres de grandeur.</li>
            <li>Les leviers budgétaires montent en charge sur 3 ans, puis suivent le PIB. Une crise coûtant 1 % du PIB réduit la croissance d’un point, dont la moitié est rattrapée l’année suivante.</li>
            ${(s.hypotheses || []).map((h) => `<li>${h}</li>`).join('')}
            <li>Le « tendanciel » maintient les dépenses hors intérêts au rythme de la croissance : ce n’est pas une prévision officielle.</li>
          </ul>
          <p><strong>Ce que le modèle ignore :</strong> l’effet des économies et des impôts sur la croissance, la réaction des taux au niveau de dette, les écarts entre déficit et variation de dette. ${s.ignore || ''}</p>`,
      };
    },

    en: (u, m, s) => {
      const { H, BASE, DEFAUTS: D, COMPTES_2025: C } = m;
      const { fmt, pct, pctSigne, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Long-run effect' : 'Effect'}: ${mdsSigne(g)} a year, in 2026 euros.`);
      const top = H.ir.top;
      return {
        groupes: {
          economie: { titre: 'Economy' },
          depenses: { titre: 'Spending' },
          postes: { titre: 'Spending by function', intro: 'Real growth of each function. Left untouched, they all follow the overall pace above.' },
          recettes: { titre: 'Revenue' },
          tva: { titre: 'VAT', intro: 'Immediate effect, computed with unchanged consumption.', resume: (p) => effet(m.effetIVA(p), 'Rates unchanged.', false) },
          ir: { titre: 'Income tax and corporate tax', resume: (p) => effet(m.effetImpot(p), 'Schedule unchanged.') },
          retraites: { titre: 'Pensions' },
          emploi: { titre: 'Jobs and ageing' },
          smi: { titre: 'Minimum wage', resume: (p) => {
            if (!p.smi) return 'Minimum wage unchanged.';
            const { s: e, solde } = k.smiSolde(p);
            return `Unemployment ${points(e.chomage, 2)}. Long-run effect on the balance: ${mdsSigne(solde)} a year, in 2026 euros.`;
          } },
          ru: { titre: 'Universal basic income', intro: 'Paid to every resident, unconditionally. It replaces non-contributory benefits up to its amount; pensions and unemployment insurance are untouched.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'No universal basic income.';
              return `Gross cost ${mds(r.brut)}, benefits removed −${mds(r.aides)}, net cost ${mds(r.net)} a year (${pct(r.net / BASE.pib * 100)} of GDP)`
                + (r.financement > 0.05 ? `, of which ${mds(r.financement)} covered by the dedicated levy.` : '.');
            } },
          chocs: { titre: 'Shocks' },
        },
        curseurs: {
          croissance: { nom: 'Real GDP growth', f: (v) => pctAn(v), repere: '10-year average, excluding inflation.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: `With ${pct(D.croissance)} growth and ${pct(D.inflation)} inflation, a balance of ${pctSigne(k.stabilisant)} of GDP stabilises debt.` },
          tauxMarche: { nom: 'Government borrowing rate', f: (v) => pct(v), repere: `Average issuance rate. Reference: ${pct(D.tauxMarche)}.` },
          depenses: { nom: 'Primary public spending, real terms', f: (v) => pctAn(v), repere: 'Reference: in line with growth.' },
          economies: { nom: 'Additional permanent savings', f: (v) => mds(v), repere: 'In 2026 €bn, reached over 3 years.' },
          prelevements: { nom: 'Public revenue ratio', f: (v) => signe(v) + ' pp of GDP', repere: `Revenue at ${pct(C.recettesPib)} of GDP in 2025.` },
          fraude: { nom: 'Extra tax fraud recovered', f: (v) => `+€${fmt(v)}bn/yr`, repere: 'Extra revenue, in 2026 €bn a year, reached over 3 years.' },
          ...Object.fromEntries(H.tva.ids.map((id, i) => [id, { nom: s.tva[i].nom, f: (v) => pct(v),
            repere: `Current: ${pct(H.tva.taux[i], H.tva.taux[i] % 1 ? 1 : 0)}. ${s.tva[i].note} One point ≈ €${fmt(H.tva.parPoint[i], 2)}bn (app estimate).` }])),
          irZone: { nom: s.irZone || 'Lower bracket rates', f: (v) => signe(v) + ' pt', repere: `Points added to every rate below ${pct(top.taux, 0)}. One point ≈ €${fmt(H.ir.zone, 1)}bn (app estimate).` },
          [top.id]: { nom: 'Top rate', f: (v) => pct(v), repere: `Current: ${pct(top.taux, 0)} above ${euros(top.seuil)}. One point ≈ €${fmt(top.parPoint, 2)}bn (estimate).` },
          irSurtaxe: { nom: 'New top bracket', f: (v, p) => (v ? `${pct(p[top.id] + v)} (+${v} pts)` : 'none'), repere: 'Rate added to the top bracket, above the threshold below.' },
          irSeuil: { nom: 'Threshold of the new bracket', f: (v) => euros(v), repere: 'The higher the threshold, the less income is left to tax.' },
          ...(H.societes ? { societes: { nom: 'Corporate income tax', f: (v) => pct(v), repere: `Current rate: ${pct(H.societes.taux, 0)}. One point ≈ €${fmt(H.societes.parPoint)}bn (estimate).` } } : {}),
          erosion: { nom: 'Taxpayer response', f: (v) => `−${fmt(v, 0)}% of the gain`, repere: 'Share of the gain lost to emigration, tax planning or lower activity. Applies to increases on high incomes and corporate tax.' },
          ageLegal: { nom: 'Statutory retirement age', f: (v) => ansMois(s.ageRef + v), repere: `${s.ageNote} App estimate: one more year yields about €${fmt(k.agePlus, 1)}bn a year at full effect.` },
          cotisation: { nom: 'Pension contribution rate', f: (v) => points(v), repere: `One point ≈ €${fmt(H.cotisationPoint, 1)}bn a year (estimate), but raises labour costs.` },
          sousIndexation: { nom: 'Pensions uprated below inflation', f: (v) => (v ? '−' + fmt(v) + ' pt/yr' : 'no'), repere: `One point less saves about €${fmt(H.sousIndexationPoint, 2)}bn a year, kept in following years (estimate).` },
          anneesSousIndexation: { nom: 'Length of under-indexation', f: (v) => u.annees(v), repere: 'From 2027.' },
          retraites: { nom: 'Drift in pension spending', f: (v) => fmt(v, 0) + '% of the assumption', repere: s.deriveNote },
          chomage: { nom: 'Target unemployment rate', f: (v) => pct(v), repere: `Reference: ${pct(D.chomage)} (${s.chomageSource}). One point less yields about €${fmt(k.chomagePt, 1)}bn a year (estimate), over 5 years.` },
          dependance: { nom: 'Long-term care spending in 2050', f: (v) => pct(v) + ' of GDP', repere: `About ${pct(H.dependance2022)} of GDP in 2022; ${pct(D.dependance)} assumed for 2050 (app assumption).` },
          ...(H.smi ? {
            smi: { nom: 'Minimum wage increase', f: (v) => (v ? `+${v}% (≈ ${euros(H.smi.mensuel * (1 + v / 100))}/month)` : 'none'), repere: `${euros(H.smi.mensuel)} gross a month in 2026. ${s.smiNote || ''} Per point: +€${fmt(H.smi.recettesPoint, 2)}bn of revenue, −€${fmt(H.smi.publicPoint, 2)}bn of public wages (estimates).` },
            smiEmplois: { nom: 'Jobs lost per point of increase', f: (v) => (v ? `${fmt(v * 1000, 0)} jobs` : 'none'), repere: 'Disputed assumption. Lost jobs feed the “unemployment” lever.' },
          } : {}),
          ruAdulte: { nom: 'Amount per adult', f: (v) => (v ? euros(v) + '/month' : 'none'), repere: `${fmt(H.ru.adultes)} million adults: €100 a month costs ${mds(H.ru.adultes * 1.2, 1)} a year.` },
          ruMineur: { nom: 'Amount per child', f: (v) => (v ? euros(v) + '/month' : 'none'), repere: `${fmt(H.ru.mineurs)} million children, paid to parents. Replaces family benefits.` },
          ruAides: { nom: 'Benefits removed in return', f: (v) => fmt(v, 0) + '% of what can be absorbed', repere: `A benefit is removed in proportion to the basic income relative to its average amount: ${s.aides}.` },
          ruFinancement: { nom: 'Share funded by a dedicated levy', f: (v) => fmt(v, 0) + '%', repere: 'A flat tax on all income, for instance. Computed with no effect on activity.' },
          crise: { nom: 'Cost of a crisis', f: (v) => (v ? mds(v) : 'none'), repere: s.criseNote },
          anneeCrise: { nom: 'Year of the crisis', f: (v) => String(v), repere: 'Cost split 60% / 40% over two years, with a fall in GDP.' },
        },
        postes: {
          defense: 'Defence', enseignement: 'Education', sante: 'Health', retraites: 'Pensions', social: 'Other social protection',
          securite: 'Public order and justice', economie: 'Economic affairs', general: 'General services', cadre: 'Housing, environment, culture',
        },
        prereglages: {
          tendanciel: 'Baseline', taux: 'High rates', croissance: 'Strong growth', faible: 'Weak growth',
          retraite: `Retirement at ${s.ageRefCourt + 1}`, tvaHausse: 'VAT +1 point', hauts: 'Tax top incomes',
          smi: 'Minimum wage +10%', ru: 'Basic income', crise: 'Crisis in 2029',
        },
        nonVentile: (montant, annee) => `Not allocated (across-the-board savings, crisis): ${montant} in ${annee}.`,
        methode: (d) => `
          <p>Same method as the other simulators. Each year, debt rises by the deficit: primary spending, minus revenue, plus interest. GDP grows with real growth and inflation; revenue tracks GDP; primary spending follows its own path.</p>
          <p><strong>Estimated starting point (end-${d.annee}):</strong> GDP ${mds(d.pib)}, debt ${mds(d.dette)} (${pct(d.ratio)} of GDP), balance ${pctSigne(d.soldePib)} of GDP, interest ${mds(d.interets)}. ${s.depart}</p>
          <p><strong>Assumptions specific to the app, not taken from the sources:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)}% of the debt stock is refinanced each year at the market rate, and all new debt is. ${s.refinancement || ''}</li>
            <li>Amounts by function are orders of magnitude reconstructed from the GDP shares published by Eurostat.</li>
            <li>Per-point yields of VAT and income tax, and the effects of the retirement age (${mds(k.agePlus, 1)} a year per year), one point of unemployment (${mds(k.chomagePt, 1)}) and the minimum wage are app estimates, reliable to within 50%. VAT is computed with unchanged consumption.</li>
            <li>${s.deriveNote} The benefits replaced by basic income (${mds(k.totalAides, 1)} in total) are orders of magnitude.</li>
            <li>Fiscal levers phase in over 3 years, then grow with GDP. A crisis costing 1% of GDP cuts growth by one point, half of which is recovered the following year.</li>
            ${(s.hypotheses || []).map((h) => `<li>${h}</li>`).join('')}
            <li>The “baseline” keeps primary spending growing with the economy: it is not an official forecast.</li>
          </ul>
          <p><strong>What the model ignores:</strong> the effect of savings and taxes on growth, the response of interest rates to the debt level, and gaps between the deficit and the change in debt. ${s.ignore || ''}</p>`,
      };
    },

    es: (u, m, s) => {
      const { H, BASE, DEFAUTS: D, COMPTES_2025: C } = m;
      const { fmt, pct, pctSigne, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Efecto${aTerme ? ' a largo plazo' : ''}: ${mdsSigne(g)} al año, en euros de 2026.`);
      const top = H.ir.top;
      return {
        groupes: {
          economie: { titre: 'Economía' },
          depenses: { titre: 'Gasto' },
          postes: { titre: 'Gasto por función', intro: 'Crecimiento real de cada función. Sin ajustes, todas siguen el ritmo general indicado arriba.' },
          recettes: { titre: 'Ingresos' },
          tva: { titre: 'IVA', intro: 'Efecto inmediato, calculado con consumo constante.', resume: (p) => effet(m.effetIVA(p), 'Tipos sin cambios.', false) },
          ir: { titre: 'Impuesto sobre la renta y sociedades', resume: (p) => effet(m.effetImpot(p), 'Tarifa sin cambios.') },
          retraites: { titre: 'Pensiones' },
          emploi: { titre: 'Empleo y envejecimiento' },
          smi: { titre: 'Salario mínimo', resume: (p) => {
            if (!p.smi) return 'Salario mínimo sin cambios.';
            const { s: e, solde } = k.smiSolde(p);
            return `Paro ${points(e.chomage, 2)}. Efecto a largo plazo sobre el saldo: ${mdsSigne(solde)} al año, en euros de 2026.`;
          } },
          ru: { titre: 'Renta básica universal', intro: 'Pagada a cada residente, sin condiciones. Sustituye las ayudas no contributivas hasta su importe; las pensiones y el seguro de desempleo no se tocan.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Sin renta básica.';
              return `Coste bruto ${mds(r.brut)}, ayudas suprimidas −${mds(r.aides)}, coste neto ${mds(r.net)} al año (${pct(r.net / BASE.pib * 100)} del PIB)`
                + (r.financement > 0.05 ? `, de los que ${mds(r.financement)} cubiertos por el impuesto específico.` : '.');
            } },
          chocs: { titre: 'Perturbaciones' },
        },
        curseurs: {
          croissance: { nom: 'Crecimiento real del PIB', f: (v) => pctAn(v), repere: 'Media a 10 años, sin inflación.' },
          inflation: { nom: 'Inflación', f: (v) => pctAn(v), repere: `Con un ${pct(D.croissance)} de crecimiento y un ${pct(D.inflation)} de inflación, un saldo del ${pctSigne(k.stabilisant)} del PIB estabiliza la deuda.` },
          tauxMarche: { nom: 'Tipo de emisión del Estado', f: (v) => pct(v), repere: `Tipo medio de emisión. Referencia: ${pct(D.tauxMarche)}.` },
          depenses: { nom: 'Gasto público primario, en volumen', f: (v) => pctAn(v), repere: 'Referencia: al ritmo del crecimiento.' },
          economies: { nom: 'Ahorros permanentes adicionales', f: (v) => mds(v), repere: 'En mil M€ de 2026, alcanzados en 3 años.' },
          prelevements: { nom: 'Ratio de ingresos públicos', f: (v) => signe(v) + ' pp del PIB', repere: `Ingresos del ${pct(C.recettesPib)} del PIB en 2025.` },
          fraude: { nom: 'Fraude recuperado adicional', f: (v) => '+' + fmt(v) + ' mil M€/año', repere: 'Ingresos adicionales, en mil M€ de 2026 al año, alcanzados en 3 años.' },
          ...Object.fromEntries(H.tva.ids.map((id, i) => [id, { nom: s.tva[i].nom, f: (v) => pct(v),
            repere: `Actual: ${pct(H.tva.taux[i], H.tva.taux[i] % 1 ? 1 : 0)}. ${s.tva[i].note} Un punto ≈ ${fmt(H.tva.parPoint[i], 2)} mil M€ (estimación de la aplicación).` }])),
          irZone: { nom: s.irZone || 'Tipos de los tramos inferiores', f: (v) => signe(v) + ' pt', repere: `Puntos añadidos a todos los tipos por debajo del ${pct(top.taux, 0)}. Un punto ≈ ${fmt(H.ir.zone, 1)} mil M€ (estimación de la aplicación).` },
          [top.id]: { nom: 'Tipo superior', f: (v) => pct(v), repere: `Actual: ${pct(top.taux, 0)} por encima de ${euros(top.seuil)}. Un punto ≈ ${fmt(top.parPoint, 2)} mil M€ (estimación).` },
          irSurtaxe: { nom: 'Nuevo tramo superior', f: (v, p) => (v ? `${pct(p[top.id] + v)} (+${v} pts)` : 'ninguno'), repere: 'Tipo añadido al del último tramo, por encima del umbral siguiente.' },
          irSeuil: { nom: 'Umbral del nuevo tramo', f: (v) => euros(v), repere: 'Cuanto más alto el umbral, menos renta queda por gravar.' },
          ...(H.societes ? { societes: { nom: 'Impuesto sobre sociedades', f: (v) => pct(v), repere: `Tipo actual: ${pct(H.societes.taux, 0)}. Un punto ≈ ${fmt(H.societes.parPoint)} mil M€ (estimación).` } } : {}),
          erosion: { nom: 'Reacción de los contribuyentes', f: (v) => `−${fmt(v, 0)} % de la ganancia`, repere: 'Parte de la ganancia perdida por marchas, optimización o menor actividad. Se aplica a las subidas sobre rentas altas y sociedades.' },
          ageLegal: { nom: 'Edad legal de jubilación', f: (v) => ansMois(s.ageRef + v), repere: `${s.ageNote} Estimación de la aplicación: un año más aporta unos ${fmt(k.agePlus, 1)} mil M€ al año a pleno efecto.` },
          cotisation: { nom: 'Tipo de cotización por jubilación', f: (v) => points(v), repere: `Un punto ≈ ${fmt(H.cotisationPoint, 1)} mil M€ al año (estimación), pero encarece el trabajo.` },
          sousIndexation: { nom: 'Pensiones revalorizadas por debajo de la inflación', f: (v) => (v ? '−' + fmt(v) + ' pt/año' : 'no'), repere: `Un punto menos ahorra unos ${fmt(H.sousIndexationPoint, 2)} mil M€ al año, que se consolidan los años siguientes (estimación).` },
          anneesSousIndexation: { nom: 'Duración de la subindexación', f: (v) => u.annees(v), repere: 'A partir de 2027.' },
          retraites: { nom: 'Deriva del gasto en pensiones', f: (v) => fmt(v, 0) + ' % de la hipótesis', repere: s.deriveNote },
          chomage: { nom: 'Tasa de paro objetivo', f: (v) => pct(v), repere: `Referencia: ${pct(D.chomage)} (${s.chomageSource}). Un punto menos aporta unos ${fmt(k.chomagePt, 1)} mil M€ al año (estimación), en 5 años.` },
          dependance: { nom: 'Gasto en dependencia en 2050', f: (v) => pct(v) + ' del PIB', repere: `En torno al ${pct(H.dependance2022)} del PIB en 2022; se supone un ${pct(D.dependance)} en 2050 (hipótesis de la aplicación).` },
          ...(H.smi ? {
            smi: { nom: 'Subida del salario mínimo', f: (v) => (v ? `+${v} % (≈ ${euros(H.smi.mensuel * (1 + v / 100))}/mes)` : 'ninguna'), repere: `${euros(H.smi.mensuel)} brutos al mes en 2026. ${s.smiNote || ''} Por punto: +${fmt(H.smi.recettesPoint, 2)} mil M€ de ingresos, −${fmt(H.smi.publicPoint, 2)} mil M€ de salarios públicos (estimaciones).` },
            smiEmplois: { nom: 'Empleos perdidos por punto de subida', f: (v) => (v ? `${fmt(v * 1000, 0)} empleos` : 'ninguno'), repere: 'Hipótesis discutida. Los empleos perdidos pasan por el control «paro».' },
          } : {}),
          ruAdulte: { nom: 'Importe por adulto', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'), repere: `${fmt(H.ru.adultes)} millones de adultos: 100 € al mes cuestan ${mds(H.ru.adultes * 1.2, 1)} al año.` },
          ruMineur: { nom: 'Importe por menor', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'), repere: `${fmt(H.ru.mineurs)} millones de menores, pagado a los padres. Sustituye las prestaciones familiares.` },
          ruAides: { nom: 'Ayudas suprimidas a cambio', f: (v) => fmt(v, 0) + ' % de lo absorbible', repere: `Una ayuda se suprime en proporción a la renta básica respecto a su importe medio: ${s.aides}.` },
          ruFinancement: { nom: 'Parte financiada por un impuesto específico', f: (v) => fmt(v, 0) + ' %', repere: 'Un impuesto proporcional sobre todas las rentas, por ejemplo. Calculado sin efecto sobre la actividad.' },
          crise: { nom: 'Coste de una crisis', f: (v) => (v ? mds(v) : 'ninguna'), repere: s.criseNote },
          anneeCrise: { nom: 'Año de la crisis', f: (v) => String(v), repere: 'Coste repartido 60 % / 40 % en dos años, con caída del PIB.' },
        },
        postes: {
          defense: 'Defensa', enseignement: 'Educación', sante: 'Sanidad', retraites: 'Pensiones', social: 'Otra protección social',
          securite: 'Orden público y justicia', economie: 'Asuntos económicos', general: 'Servicios generales', cadre: 'Vivienda, medio ambiente, cultura',
        },
        prereglages: {
          tendanciel: 'Tendencial', taux: 'Tipos altos', croissance: 'Crecimiento fuerte', faible: 'Crecimiento débil',
          retraite: `Jubilación a los ${s.ageRefCourt + 1}`, tvaHausse: 'IVA +1 punto', hauts: 'Gravar las rentas altas',
          smi: 'Salario mínimo +10 %', ru: 'Renta básica', crise: 'Crisis en 2029',
        },
        nonVentile: (montant, annee) => `Sin asignar (ahorros transversales, crisis): ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Mismo método que los demás simuladores. Cada año, la deuda aumenta en el importe del déficit: gasto primario, menos ingresos, más intereses. El PIB crece con el crecimiento real y la inflación; los ingresos siguen al PIB; el gasto primario sigue su propio ritmo.</p>
          <p><strong>Punto de partida estimado (finales de ${d.annee}):</strong> PIB ${mds(d.pib)}, deuda ${mds(d.dette)} (${pct(d.ratio)} del PIB), saldo del ${pctSigne(d.soldePib)} del PIB, intereses ${mds(d.interets)}. ${s.depart}</p>
          <p><strong>Hipótesis propias de la aplicación, no tomadas de las fuentes:</strong></p>
          <ul>
            <li>El ${fmt(H.refinancement * 100)} % del saldo vivo se refinancia cada año al tipo de mercado, y toda la deuda nueva también. ${s.refinancement || ''}</li>
            <li>Los importes por función son órdenes de magnitud reconstruidos a partir de los porcentajes del PIB publicados por Eurostat.</li>
            <li>Los rendimientos por punto del IVA y del impuesto sobre la renta y los efectos de la edad legal (${mds(k.agePlus, 1)} al año por año), de un punto de paro (${mds(k.chomagePt, 1)}) y del salario mínimo son estimaciones de la aplicación, fiables con un margen del 50 %. El IVA se calcula con consumo constante.</li>
            <li>${s.deriveNote} Las ayudas sustituidas por la renta básica (${mds(k.totalAides, 1)} en total) son órdenes de magnitud.</li>
            <li>Las palancas presupuestarias se despliegan en 3 años y después siguen al PIB. Una crisis que cuesta el 1 % del PIB reduce el crecimiento un punto, la mitad del cual se recupera al año siguiente.</li>
            ${(s.hypotheses || []).map((h) => `<li>${h}</li>`).join('')}
            <li>El «tendencial» mantiene el gasto primario al ritmo del crecimiento: no es una previsión oficial.</li>
          </ul>
          <p><strong>Lo que el modelo no tiene en cuenta:</strong> el efecto de los ahorros y los impuestos sobre el crecimiento, la reacción de los tipos al nivel de deuda y las diferencias entre déficit y variación de la deuda. ${s.ignore || ''}</p>`,
      };
    },

    de: (u, m, s) => {
      const { H, BASE, DEFAUTS: D, COMPTES_2025: C } = m;
      const { fmt, pct, pctSigne, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Langfristige Wirkung' : 'Wirkung'}: ${mdsSigne(g)} pro Jahr, in Euro von 2026.`);
      const top = H.ir.top;
      return {
        groupes: {
          economie: { titre: 'Wirtschaft' },
          depenses: { titre: 'Ausgaben' },
          postes: { titre: 'Ausgaben nach Aufgabenbereich', intro: 'Reales Wachstum jedes Bereichs. Ohne Einstellung folgen alle dem allgemeinen Tempo oben.' },
          recettes: { titre: 'Einnahmen' },
          tva: { titre: 'Mehrwertsteuer', intro: 'Sofortige Wirkung, berechnet bei unverändertem Konsum.', resume: (p) => effet(m.effetIVA(p), 'Sätze unverändert.', false) },
          ir: { titre: 'Einkommen- und Körperschaftsteuer', resume: (p) => effet(m.effetImpot(p), 'Tarif unverändert.') },
          retraites: { titre: 'Renten' },
          emploi: { titre: 'Beschäftigung und Alterung' },
          smi: { titre: 'Mindestlohn', resume: (p) => {
            if (!p.smi) return 'Mindestlohn unverändert.';
            const { s: e, solde } = k.smiSolde(p);
            return `Arbeitslosigkeit ${points(e.chomage, 2)}. Langfristige Wirkung auf den Saldo: ${mdsSigne(solde)} pro Jahr, in Euro von 2026.`;
          } },
          ru: { titre: 'Bedingungsloses Grundeinkommen', intro: 'An jede Einwohnerin und jeden Einwohner ohne Bedingungen gezahlt. Es ersetzt beitragsunabhängige Leistungen bis zu seiner Höhe; Renten und Arbeitslosenversicherung bleiben unberührt.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Kein Grundeinkommen.';
              return `Bruttokosten ${mds(r.brut)}, gestrichene Leistungen −${mds(r.aides)}, Nettokosten ${mds(r.net)} pro Jahr (${pct(r.net / BASE.pib * 100)} des BIP)`
                + (r.financement > 0.05 ? `, davon ${mds(r.financement)} durch die eigene Abgabe gedeckt.` : '.');
            } },
          chocs: { titre: 'Schocks' },
        },
        curseurs: {
          croissance: { nom: 'Reales BIP-Wachstum', f: (v) => pctAn(v), repere: 'Durchschnitt über 10 Jahre, ohne Inflation.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: `Bei ${pct(D.croissance)} Wachstum und ${pct(D.inflation)} Inflation stabilisiert ein Saldo von ${pctSigne(k.stabilisant)} des BIP die Schulden.` },
          tauxMarche: { nom: 'Emissionszins des Staates', f: (v) => pct(v), repere: `Durchschnittlicher Emissionszins. Referenz: ${pct(D.tauxMarche)}.` },
          depenses: { nom: 'Primärausgaben, real', f: (v) => pctAn(v), repere: 'Referenz: im Tempo des Wachstums.' },
          economies: { nom: 'Zusätzliche dauerhafte Einsparungen', f: (v) => mds(v), repere: 'In Mrd. € von 2026, in 3 Jahren erreicht.' },
          prelevements: { nom: 'Staatliche Einnahmenquote', f: (v) => signe(v) + ' Pp. des BIP', repere: `Einnahmen 2025 bei ${pct(C.recettesPib)} des BIP.` },
          fraude: { nom: 'Zusätzlich eingetriebener Steuerbetrug', f: (v) => '+' + fmt(v) + ' Mrd. €/Jahr', repere: 'Zusätzliche Einnahmen in Mrd. € von 2026 pro Jahr, in 3 Jahren erreicht.' },
          ...Object.fromEntries(H.tva.ids.map((id, i) => [id, { nom: s.tva[i].nom, f: (v) => pct(v),
            repere: `Aktuell: ${pct(H.tva.taux[i], H.tva.taux[i] % 1 ? 1 : 0)}. ${s.tva[i].note} Ein Punkt ≈ ${fmt(H.tva.parPoint[i], 2)} Mrd. € (Schätzung der Anwendung).` }])),
          irZone: { nom: s.irZone || 'Sätze der unteren Stufen', f: (v) => signe(v) + ' Pkt.', repere: `Punkte, die zu allen Sätzen unter ${pct(top.taux, 0)} hinzukommen. Ein Punkt ≈ ${fmt(H.ir.zone, 1)} Mrd. € (Schätzung der Anwendung).` },
          [top.id]: { nom: 'Spitzensteuersatz', f: (v) => pct(v), repere: `Aktuell: ${pct(top.taux, 0)} ab ${euros(top.seuil)}. Ein Punkt ≈ ${fmt(top.parPoint, 2)} Mrd. € (Schätzung).` },
          irSurtaxe: { nom: 'Neue Spitzenstufe', f: (v, p) => (v ? `${pct(p[top.id] + v)} (+${v} Pkt.)` : 'keine'), repere: 'Zuschlag auf den Satz der obersten Stufe, oberhalb der folgenden Schwelle.' },
          irSeuil: { nom: 'Schwelle der neuen Stufe', f: (v) => euros(v), repere: 'Je höher die Schwelle, desto weniger Einkommen bleibt zu besteuern.' },
          ...(H.societes ? { societes: { nom: 'Körperschaftsteuer', f: (v) => pct(v), repere: `Aktueller Satz: ${pct(H.societes.taux, 0)}. Ein Punkt ≈ ${fmt(H.societes.parPoint)} Mrd. € (Schätzung).` } } : {}),
          erosion: { nom: 'Reaktion der Steuerpflichtigen', f: (v) => `−${fmt(v, 0)} % des Ertrags`, repere: 'Anteil des Ertrags, der durch Abwanderung, Steuergestaltung oder geringere Aktivität verloren geht. Gilt für Erhöhungen auf hohe Einkommen und Unternehmen.' },
          ageLegal: { nom: 'Gesetzliches Renteneintrittsalter', f: (v) => ansMois(s.ageRef + v), repere: `${s.ageNote} Schätzung der Anwendung: Ein Jahr mehr bringt bei voller Wirkung etwa ${fmt(k.agePlus, 1)} Mrd. € pro Jahr.` },
          cotisation: { nom: 'Rentenbeitragssatz', f: (v) => points(v), repere: `Ein Punkt ≈ ${fmt(H.cotisationPoint, 1)} Mrd. € pro Jahr (Schätzung), verteuert aber die Arbeit.` },
          sousIndexation: { nom: 'Rentenanpassung unter der Inflation', f: (v) => (v ? '−' + fmt(v) + ' Pkt./Jahr' : 'nein'), repere: `Ein Punkt weniger spart etwa ${fmt(H.sousIndexationPoint, 2)} Mrd. € pro Jahr, die in den Folgejahren erhalten bleiben (Schätzung).` },
          anneesSousIndexation: { nom: 'Dauer der Unterindexierung', f: (v) => u.annees(v), repere: 'Ab 2027.' },
          retraites: { nom: 'Entwicklung der Rentenausgaben', f: (v) => fmt(v, 0) + ' % der Annahme', repere: s.deriveNote },
          chomage: { nom: 'Angestrebte Arbeitslosenquote', f: (v) => pct(v), repere: `Referenz: ${pct(D.chomage)} (${s.chomageSource}). Ein Punkt weniger bringt etwa ${fmt(k.chomagePt, 1)} Mrd. € pro Jahr (Schätzung), in 5 Jahren.` },
          dependance: { nom: 'Pflegeausgaben im Jahr 2050', f: (v) => pct(v) + ' des BIP', repere: `Etwa ${pct(H.dependance2022)} des BIP im Jahr 2022; für 2050 werden ${pct(D.dependance)} angenommen (Annahme der Anwendung).` },
          ...(H.smi ? {
            smi: { nom: 'Erhöhung des Mindestlohns', f: (v) => (v ? `+${v} % (≈ ${euros(H.smi.mensuel * (1 + v / 100))}/Monat)` : 'keine'), repere: `${euros(H.smi.mensuel)} brutto pro Monat im Jahr 2026. ${s.smiNote || ''} Je Punkt: +${fmt(H.smi.recettesPoint, 2)} Mrd. € Einnahmen, −${fmt(H.smi.publicPoint, 2)} Mrd. € öffentliche Löhne (Schätzungen).` },
            smiEmplois: { nom: 'Verlorene Stellen je Erhöhungspunkt', f: (v) => (v ? `${fmt(v * 1000, 0)} Stellen` : 'keine'), repere: 'Umstrittene Annahme. Verlorene Stellen wirken über den Regler „Arbeitslosigkeit“.' },
          } : {}),
          ruAdulte: { nom: 'Betrag je Erwachsenem', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'), repere: `${fmt(H.ru.adultes)} Millionen Erwachsene: 100 € pro Monat kosten ${mds(H.ru.adultes * 1.2, 1)} pro Jahr.` },
          ruMineur: { nom: 'Betrag je Kind', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'), repere: `${fmt(H.ru.mineurs)} Millionen Minderjährige, an die Eltern gezahlt. Ersetzt die Familienleistungen.` },
          ruAides: { nom: 'Im Gegenzug gestrichene Leistungen', f: (v) => fmt(v, 0) + ' % des Ersetzbaren', repere: `Eine Leistung wird im Verhältnis des Grundeinkommens zu ihrem Durchschnittsbetrag gestrichen: ${s.aides}.` },
          ruFinancement: { nom: 'Durch eine eigene Abgabe finanzierter Anteil', f: (v) => fmt(v, 0) + ' %', repere: 'Zum Beispiel eine proportionale Steuer auf alle Einkommen. Ohne Wirkung auf die Wirtschaftstätigkeit berechnet.' },
          crise: { nom: 'Kosten einer Krise', f: (v) => (v ? mds(v) : 'keine'), repere: s.criseNote },
          anneeCrise: { nom: 'Jahr der Krise', f: (v) => String(v), repere: 'Kosten zu 60 % / 40 % auf zwei Jahre verteilt, mit BIP-Rückgang.' },
        },
        postes: {
          defense: 'Verteidigung', enseignement: 'Bildung', sante: 'Gesundheit', retraites: 'Renten', social: 'Sonstige soziale Sicherung',
          securite: 'Öffentliche Ordnung und Justiz', economie: 'Wirtschaftliche Angelegenheiten', general: 'Allgemeine Verwaltung', cadre: 'Wohnen, Umwelt, Kultur',
        },
        prereglages: {
          tendanciel: 'Basisszenario', taux: 'Hohe Zinsen', croissance: 'Starkes Wachstum', faible: 'Schwaches Wachstum',
          retraite: `Rente mit ${s.ageRefCourt + 1}`, tvaHausse: 'Mehrwertsteuer +1 Punkt', hauts: 'Hohe Einkommen besteuern',
          smi: 'Mindestlohn +10 %', ru: 'Grundeinkommen', crise: 'Krise 2029',
        },
        nonVentile: (montant, annee) => `Nicht zugeordnet (Querschnittseinsparungen, Krise): ${montant} im Jahr ${annee}.`,
        methode: (d) => `
          <p>Gleiche Methode wie die anderen Simulatoren. Jedes Jahr steigen die Schulden um das Defizit: Primärausgaben minus Einnahmen plus Zinsen. Das BIP wächst mit dem realen Wachstum und der Inflation; die Einnahmen folgen dem BIP; die Primärausgaben folgen ihrem eigenen Tempo.</p>
          <p><strong>Geschätzter Ausgangspunkt (Ende ${d.annee}):</strong> BIP ${mds(d.pib)}, Schulden ${mds(d.dette)} (${pct(d.ratio)} des BIP), Saldo ${pctSigne(d.soldePib)} des BIP, Zinsen ${mds(d.interets)}. ${s.depart}</p>
          <p><strong>Eigene Annahmen der Anwendung, nicht aus den Quellen:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % des Schuldenstands werden jedes Jahr zum Marktzins refinanziert, neue Schulden vollständig. ${s.refinancement || ''}</li>
            <li>Die Beträge je Aufgabenbereich sind aus den von Eurostat veröffentlichten BIP-Anteilen rekonstruierte Größenordnungen.</li>
            <li>Die Erträge je Punkt von Mehrwert- und Einkommensteuer sowie die Wirkungen des Rentenalters (${mds(k.agePlus, 1)} pro Jahr und Altersjahr), eines Punkts Arbeitslosigkeit (${mds(k.chomagePt, 1)}) und des Mindestlohns sind Schätzungen der Anwendung, auf 50 % genau. Die Mehrwertsteuer wird bei unverändertem Konsum berechnet.</li>
            <li>${s.deriveNote} Die vom Grundeinkommen ersetzten Leistungen (${mds(k.totalAides, 1)} insgesamt) sind Größenordnungen.</li>
            <li>Haushaltshebel wirken schrittweise über 3 Jahre und folgen danach dem BIP. Eine Krise, die 1 % des BIP kostet, senkt das Wachstum um einen Punkt, wovon die Hälfte im Folgejahr aufgeholt wird.</li>
            ${(s.hypotheses || []).map((h) => `<li>${h}</li>`).join('')}
            <li>Das „Basisszenario“ lässt die Primärausgaben mit dem Wachstum steigen: Es ist keine offizielle Prognose.</li>
          </ul>
          <p><strong>Was das Modell nicht berücksichtigt:</strong> die Wirkung von Einsparungen und Steuern auf das Wachstum, die Reaktion der Zinsen auf die Schuldenhöhe und Abweichungen zwischen Defizit und Schuldenänderung. ${s.ignore || ''}</p>`,
      };
    },
  };

  // Assemble les textes d'une langue : génériques + particularités du pays.
  function textes(code, u, m, specifique) {
    const s = specifique[code](u, m);
    const g = GENERIQUE[code](u, m, s);
    for (const [id, t] of Object.entries(s.groupes || {})) g.groupes[id] = { ...g.groupes[id], ...t };
    for (const [id, t] of Object.entries(s.curseurs || {})) g.curseurs[id] = { ...g.curseurs[id], ...t };
    const postes = {};
    for (const [id, nom] of Object.entries(g.postes)) postes[id] = { nom, note: s.postes[id] };
    return {
      titreDoc: s.titreDoc, h1: s.h1,
      groupes: g.groupes, curseurs: g.curseurs, postes,
      prereglages: { ...g.prereglages, ...(s.prereglages || {}) },
      nonVentile: g.nonVentile, methode: g.methode,
    };
  }

  // Construit l'objet PAYS attendu par simulateur.js.
  function creerPays({ id, modele, sources, pib2024, options, specifique }) {
    const codes = Object.keys(GENERIQUE);
    return {
      id, modele, sources, pib2024, devise: 'EUR',
      structure: structure(modele, options),
      textes: Object.fromEntries(codes.map((c) => [c, (u, m) => textes(c, u, m, specifique)])),
    };
  }

  return { creerPays, structure, GENERIQUE };
});

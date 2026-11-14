// Simulateur français : structure des curseurs (bornes, pas, préréglages) et textes
// de l'interface en quatre langues. Les chiffres viennent du modèle (model.js).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique;
  else racine.PAYS = fabrique(racine.DetteModel, racine.SOURCES);
})(globalThis, function (modele, sources) {
  const actifIR = (p) => p.ir41 > 41 || p.ir45 > 45 || p.irSurtaxe > 0 || p.patrimoine > 0;
  const actifRU = (p) => p.ruAdulte > 0 || p.ruMineur > 0;

  const structure = {
    groupes: [
      { id: 'economie', curseurs: [
        { id: 'croissance', min: -1, max: 3, pas: 0.1 },
        { id: 'inflation', min: 0, max: 5, pas: 0.1 },
        { id: 'tauxMarche', min: 0, max: 8, pas: 0.1 },
        { id: 'productivite', min: 0, max: 100, pas: 5 },
      ] },
      { id: 'depenses', curseurs: [
        { id: 'depenses', min: -1, max: 3, pas: 0.1 },
        { id: 'economies', min: 0, max: 150, pas: 5 },
      ] },
      { id: 'postes', postes: true, min: -4, max: 8, pas: 0.1 },
      { id: 'recettes', curseurs: [
        { id: 'prelevements', min: -3, max: 3, pas: 0.1 },
        { id: 'niches', min: 0, max: 100, pas: 5 },
        { id: 'fraude', min: 0, max: 20, pas: 0.5 },
      ] },
      { id: 'aides', curseurs: [
        { id: 'allegements', min: 0, max: 100, pas: 5 },
        { id: 'subventions', min: 0, max: 100, pas: 5 },
      ] },
      { id: 'tva', curseurs: [
        { id: 'tva20', min: 15, max: 25, pas: 0.5 },
        { id: 'tva10', min: 5.5, max: 20, pas: 0.5 },
        { id: 'tva55', min: 0, max: 10, pas: 0.5 },
        { id: 'tva21', min: 0, max: 5.5, pas: 0.1 },
      ] },
      { id: 'ir', curseurs: [
        { id: 'ir11', min: 5, max: 20, pas: 0.5 },
        { id: 'ir30', min: 20, max: 40, pas: 0.5 },
        { id: 'ir41', min: 30, max: 60, pas: 0.5 },
        { id: 'ir45', min: 35, max: 75, pas: 0.5 },
        { id: 'irSurtaxe', min: 0, max: 30, pas: 1 },
        { id: 'irSeuil', min: 200000, max: 2000000, pas: 50000, actifSi: (p) => p.irSurtaxe > 0 },
        { id: 'patrimoine', min: 0, max: 3, pas: 0.1 },
        { id: 'erosion', min: 0, max: 80, pas: 5, actifSi: actifIR },
      ] },
      { id: 'retraites', curseurs: [
        { id: 'ageLegal', min: -2, max: 3, pas: 0.25 },
        { id: 'dureeAssurance', min: -2, max: 2, pas: 0.25 },
        { id: 'cotisation', min: -1, max: 3, pas: 0.1 },
        { id: 'sousIndexation', min: 0, max: 2, pas: 0.1 },
        { id: 'anneesSousIndexation', min: 1, max: 10, pas: 1, actifSi: (p) => p.sousIndexation > 0 },
        { id: 'retraites', min: 0, max: 300, pas: 10 },
      ] },
      { id: 'emploi', curseurs: [
        { id: 'chomage', min: 4, max: 11, pas: 0.1 },
        { id: 'seniors', min: 0, max: 10, pas: 0.5 },
        { id: 'autonomie', min: 1.9, max: 4.8, pas: 0.1 },
      ] },
      { id: 'smic', curseurs: [
        { id: 'smic', min: 0, max: 25, pas: 1 },
        { id: 'smicEmplois', min: 0, max: 40, pas: 1, actifSi: (p) => p.smic > 0 },
      ] },
      { id: 'ru', curseurs: [
        { id: 'ruAdulte', min: 0, max: 1200, pas: 50 },
        { id: 'ruMineur', min: 0, max: 600, pas: 25 },
        { id: 'ruAides', min: 0, max: 100, pas: 5, actifSi: actifRU },
        { id: 'ruFinancement', min: 0, max: 100, pas: 5, actifSi: actifRU },
      ] },
      { id: 'chocs', curseurs: [
        { id: 'climat', min: 0, max: 100, pas: 5 },
        { id: 'crise', min: 0, max: 600, pas: 25 },
        { id: 'anneeCrise', min: 2027, max: 2035, pas: 1, actifSi: (p) => p.crise > 0 },
      ] },
    ],
    prereglages: [
      { id: 'tendanciel', p: {} },
      { id: 'plan', p: { depenses: -0.2 } },
      { id: 'taux', p: { tauxMarche: 5.5 } },
      { id: 'croissance', p: { croissance: 2.0, productivite: 50 } },
      { id: 'retraite65', p: { ageLegal: 1 } },
      // Proposition de l'assistant : aucun levier poussé à l'extrême, la dette plafonne vers 2030.
      { id: 'effort', p: {
        depenses: 0.3, poste_defense: 2.5, poste_enseignement: 0.6,
        prelevements: 0.7, niches: 20, fraude: 3,
        dureeAssurance: 0.5, sousIndexation: 0.4, anneesSousIndexation: 4,
        chomage: 6.2, seniors: 4,
      } },
      { id: 'hauts', p: { ir41: 45, ir45: 50, irSurtaxe: 10, irSeuil: 500000, patrimoine: 2 } },
      { id: 'smic', p: { smic: 10 } },
      { id: 'ru', p: { ruAdulte: 600, ruMineur: 150, ruFinancement: 50 } },
      { id: 'crise', p: { crise: 300, anneeCrise: 2029 } },
    ],
  };

  // Calculs repris par les résumés de groupe, identiques dans toutes les langues.
  const calc = (m) => ({
    aides: (p) => m.H.allegementsTotal * m.H.allegementsRendement * p.allegements / 100 + m.H.subventionsTotal * p.subventions / 100,
    smicSolde: (p) => {
      const s = m.effetSmic(p);
      return { s, solde: s.recettes - s.depenses - (m.H.chomagePoint[0] + m.H.chomagePoint[1]) * s.chomage };
    },
    totalAides: m.H.ru.aides.reduce((s, a) => s + a.montant, 0),
  });

  const textes = {
    fr: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Effet${aTerme ? ' à terme' : ''} : ${mdsSigne(g)} par an, en euros de 2026.`);
      return {
        titreDoc: 'Dette publique française : projection à 10 ans',
        h1: 'Dette publique française : projection 2027-2036',
        groupes: {
          economie: { titre: 'Économie' },
          depenses: { titre: 'Dépenses' },
          postes: { titre: 'Dépenses par poste', intro: 'Rythme de chaque poste en volume. Sans réglage, tous suivent le rythme général ci-dessus.' },
          recettes: { titre: 'Recettes' },
          aides: { titre: 'Aides aux entreprises',
            intro: 'Sénat : 211 Md€ en 2023, dont 88 Md€ de dépenses fiscales (curseur « niches ») et 41 Md€ de prêts et garanties Bpifrance, non comptés ici. Le Haut-commissariat au Plan retient de 82 à 187 Md€ selon le périmètre.',
            resume: (p) => effet(k.aides(p), 'Aides inchangées.') },
          tva: { titre: 'TVA', intro: 'Quatre taux en vigueur. Effet immédiat, calculé à consommation inchangée.',
            resume: (p) => effet(m.effetTVA(p), 'Taux inchangés.', false) },
          ir: { titre: 'Impôt sur le revenu et hauts patrimoines',
            intro: `Barème proposé pour 2027, par part de quotient familial : 0 % jusqu’à ${euros(H.ir.seuils[0])}, puis les quatre tranches ci-dessous.`,
            resume: (p) => effet(m.effetImpot(p), 'Barème inchangé.') },
          retraites: { titre: 'Retraites' },
          emploi: { titre: 'Emploi et vieillissement' },
          smic: { titre: 'SMIC', intro: 'Hausse ajoutée à la revalorisation légale annuelle. Environ 3,1 millions de salariés sont au SMIC (DARES).',
            resume: (p) => {
              if (!p.smic) return 'SMIC revalorisé selon la règle légale.';
              const { s, solde } = k.smicSolde(p);
              return `Chômage ${points(s.chomage, 2)}. Effet à terme sur le solde : ${mdsSigne(solde)} par an, en euros de 2026.`;
            } },
          ru: { titre: 'Revenu universel',
            intro: 'Versé à chaque résident, sans condition. Il remplace les aides non contributives à hauteur de son montant ; retraites et allocations chômage ne sont pas touchées.',
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
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'Avec 1,0 % de croissance et 1,4 % d’inflation, le déficit stabilisant est d’environ 2,8 % du PIB (Cour des comptes).' },
          tauxMarche: { nom: 'Taux d’emprunt de l’État', f: (v) => pct(v), repere: 'Sénat : +1 point coûte 13,9 Md€ par an au bout de 3 ans, 32,6 Md€ au bout de 9 ans.' },
          productivite: { nom: 'Rattrapage de productivité', f: (v) => fmt(v, 0) + ' % de l’écart', repere: 'Banque de France : productivité 8,5 % sous sa tendance pré-Covid. Rattrapage étalé sur 10 ans.' },
          depenses: { nom: 'Dépense publique hors intérêts, en volume', f: (v) => pctAn(v), repere: 'Plan 2025-2029 : plafond de 1,2 % en valeur, soit environ −0,2 % en volume.' },
          economies: { nom: 'Économies pérennes supplémentaires', f: (v) => mds(v), repere: 'En Md€ de 2026, atteints en 3 ans. Budget 2027 : 54 Md€ d’effort annoncés.' },
          prelevements: { nom: 'Taux de recettes publiques', f: (v) => signe(v) + ' pt de PIB', repere: 'Insee : recettes à 52,1 % du PIB en 2025, dont 43,6 % de prélèvements obligatoires.' },
          niches: { nom: 'Niches fiscales supprimées', f: (v) => fmt(v, 0) + ' %', repere: 'PLF 2026 : 88,3 Md€. Gain net retenu : la moitié du coût affiché.' },
          fraude: { nom: 'Fraude recouvrée en plus', f: (v) => '+' + fmt(v) + ' Md€/an', repere: 'Contrôle fiscal 2025 : 17,1 Md€ notifiés, 11,4 Md€ encaissés.' },
          allegements: { nom: 'Allègements de cotisations supprimés', f: (v) => fmt(v, 0) + ' %',
            repere: `Sénat : ${fmt(H.allegementsTotal, 0)} Md€ en 2023, surtout sur les bas salaires. Gain net retenu : ${fmt(H.allegementsRendement * 100, 0)} %, le reste étant perdu en emplois.` },
          subventions: { nom: 'Subventions de l’État supprimées', f: (v) => fmt(v, 0) + ' %',
            repere: `Sénat : ${fmt(H.subventionsTotal, 0)} Md€ en 2023. Imputées au poste « Affaires économiques ».` },
          tva20: { nom: 'Taux normal', f: (v) => pct(v), repere: 'Actuel : 20 %. La plupart des biens et services. Un point = 7,5 Md€ (Trésor).' },
          tva10: { nom: 'Taux intermédiaire', f: (v) => pct(v), repere: 'Actuel : 10 %. Restauration, transports, travaux. Un point = 1,6 Md€.' },
          tva55: { nom: 'Taux réduit', f: (v) => pct(v), repere: 'Actuel : 5,5 %. Alimentation, énergie, livres. Un point = 2,0 Md€.' },
          tva21: { nom: 'Taux particulier', f: (v) => pct(v), repere: 'Actuel : 2,1 %. Médicaments remboursés, presse. Un point = 0,4 Md€.' },
          ir11: { nom: `De ${euros(H.ir.seuils[0])} à ${euros(H.ir.seuils[1])}`, f: (v) => pct(v), repere: 'Tranche à 11 %. Un point ≈ 3,5 Md€ : tous les foyers imposables la traversent.' },
          ir30: { nom: `De ${euros(H.ir.seuils[1])} à ${euros(H.ir.seuils[2])}`, f: (v) => pct(v), repere: 'Tranche à 30 %. Un point ≈ 1,15 Md€. Environ 16 % des foyers l’atteignent.' },
          ir41: { nom: `De ${euros(H.ir.seuils[2])} à ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: 'Tranche à 41 %. Un point ≈ 0,3 Md€. Environ 1,3 % des foyers.' },
          ir45: { nom: `Au-delà de ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: 'Tranche à 45 %. Un point ≈ 0,13 Md€. Environ 0,2 % des foyers (67 000). Sa création en 2013 a rapporté 344 M€.' },
          irSurtaxe: { nom: 'Nouvelle tranche supérieure', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'aucune'), repere: 'Taux ajouté à celui de la dernière tranche, au-delà du seuil ci-dessous.' },
          irSeuil: { nom: 'Seuil de la nouvelle tranche', f: (v) => euros(v), repere: 'Par part. Plus le seuil est haut, moins il reste de revenus à taxer.' },
          patrimoine: { nom: 'Impôt plancher sur les patrimoines de plus de 100 M€', f: (v) => (v ? pct(v) + ' par an' : 'aucun'),
            repere: 'Proposition dite Zucman à 2 % : environ 1 800 foyers, 15 à 25 Md€ selon son auteur, autour de 5 Md€ selon ses critiques.' },
          erosion: { nom: 'Réaction des contribuables', f: (v) => `−${fmt(v, 0)} % du gain`,
            repere: 'Part du gain perdue par départs, optimisation ou moindre activité. S’applique aux hausses sur les tranches à 41 % et plus et sur les patrimoines.' },
          ageLegal: { nom: 'Âge légal de départ', f: (v) => ansMois(64 + v),
            repere: 'Référence : 64 ans (réforme 2023). Cour des comptes : 65 ans rapporte 17,7 Md€ en 2035, 63 ans coûte 13 Md€.' },
          dureeAssurance: { nom: 'Durée de cotisation pour le taux plein', f: (v) => `${ansMois(43 + v)} (${fmt((43 + v) * 4, 0)} trimestres)`,
            repere: 'Référence : 43 ans. Cour des comptes : 44 ans rapporte 9,7 Md€ en 2035, 42 ans coûte 7,1 Md€.' },
          cotisation: { nom: 'Taux de cotisation retraite', f: (v) => points(v), repere: 'Cour des comptes : un point rapporte 4,8 à 7,6 Md€ par an (6,2 retenus), mais renchérit le travail.' },
          sousIndexation: { nom: 'Pensions revalorisées sous l’inflation', f: (v) => (v ? '−' + fmt(v) + ' pt/an' : 'non'),
            repere: 'Cour des comptes : un point de moins économise 2,9 Md€ par an, acquis les années suivantes.' },
          anneesSousIndexation: { nom: 'Durée de la sous-indexation', f: (v) => u.annees(v), repere: 'À partir de 2027.' },
          retraites: { nom: 'Dérive du solde des retraites', f: (v) => fmt(v, 0) + ' % du scénario COR', repere: 'COR 2025 : −0,1 point de PIB en 2024, −0,2 en 2030, −1,4 en 2070.' },
          chomage: { nom: 'Taux de chômage visé', f: (v) => pct(v), repere: 'Référence : 7,4 %. Atteindre 5 % rapporterait 30 à 40 Md€ par an (35 retenus), en 5 ans.' },
          seniors: { nom: 'Taux d’emploi des 55-64 ans', f: (v) => points(v),
            repere: 'DARES : 60,4 % en 2024. Hypothèse de l’application : +0,2 % de PIB par point, en 10 ans. Recoupe en partie l’âge légal.' },
          autonomie: { nom: 'Dépenses d’autonomie en 2070', f: (v) => pct(v) + ' du PIB', repere: 'Ageing Report : 1,9 % en 2022 ; 2,6 % (référence) à 4,8 % (risque) en 2070.' },
          smic: { nom: 'Hausse du SMIC', f: (v) => (v ? `+${v} % (≈ ${euros(H.smic.netMensuel * (1 + v / 100))} nets)` : 'aucune'),
            repere: `Environ ${euros(H.smic.netMensuel)} nets par mois en 2026. Par point : +${fmt(H.smic.recettesPoint, 2)} Md€ de cotisations et d’impôts, −${fmt(H.smic.allegementsPoint)} Md€ d’allègements en plus, −${fmt(H.smic.publicPoint)} Md€ de salaires publics.` },
          smicEmplois: { nom: 'Emplois perdus par point de hausse', f: (v) => (v ? `${fmt(v * 1000, 0)} emplois` : 'aucun'),
            repere: 'Hypothèse débattue : les estimations vont de presque rien à plusieurs dizaines de milliers d’emplois par point. Les emplois perdus passent par le levier « chômage ».' },
          ruAdulte: { nom: 'Montant par adulte', f: (v) => (v ? euros(v) + '/mois' : 'aucun'),
            repere: `${fmt(H.ru.adultes)} millions d’adultes : 100 € par mois coûtent ${mds(H.ru.adultes * 1.2)} par an. Pour mémoire, RSA d’une personne seule : environ 650 €.` },
          ruMineur: { nom: 'Montant par mineur', f: (v) => (v ? euros(v) + '/mois' : 'aucun'),
            repere: `${fmt(H.ru.mineurs)} millions de mineurs, versé aux parents. Remplace les prestations familiales.` },
          ruAides: { nom: 'Aides supprimées en contrepartie', f: (v) => fmt(v, 0) + ' % de l’absorbable',
            repere: 'Une aide est supprimée en proportion du revenu universel rapporté à son montant moyen : RSA, prime d’activité, AAH, minimum vieillesse, ASS, la moitié des aides au logement, 80 % des prestations familiales.' },
          ruFinancement: { nom: 'Part financée par un prélèvement dédié', f: (v) => fmt(v, 0) + ' %', repere: 'Impôt proportionnel sur tous les revenus, par exemple. Calculé sans effet sur l’activité.' },
          climat: { nom: 'Risque climat matérialisé', f: (v) => fmt(v, 0) + ' %', repere: 'France Stratégie : +10 points de dette en 2030, +15 en 2035. Ampleur contestée.' },
          crise: { nom: 'Coût d’une crise', f: (v) => (v ? mds(v) : 'aucune'), repere: 'Subprimes, Covid, énergie : +200 à +600 Md€ de dette à chaque choc.' },
          anneeCrise: { nom: 'Année de la crise', f: (v) => String(v), repere: 'Coût réparti 60 % / 40 % sur deux ans, avec recul du PIB.' },
        },
        postes: {
          defense: { nom: 'Défense', note: 'Engagement Otan de 2025 : 3,5 % du PIB en 2035, soit environ +7,6 %/an.' },
          enseignement: { nom: 'Enseignement', note: 'Du primaire au supérieur, dont 64 Md€ pour le secondaire et 42 Md€ pour le primaire.' },
          sante: { nom: 'Santé', note: 'Hôpital, soins de ville, médicaments.' },
          retraites: { nom: 'Retraites', note: 'Pensions de vieillesse. Les curseurs du groupe « Retraites » s’y ajoutent.' },
          social: { nom: 'Autre protection sociale', note: 'Chômage (49 Md€), famille, invalidité, logement, exclusion. Le revenu universel, net des aides qu’il remplace, s’y ajoute.' },
          securite: { nom: 'Sécurité et justice', note: 'Police, gendarmerie, justice, prisons, pompiers.' },
          economie: { nom: 'Affaires économiques', note: 'Transports, aides aux entreprises, énergie, agriculture.' },
          general: { nom: 'Services généraux', note: 'Administration générale, contribution à l’UE, recherche fondamentale. Hors intérêts.' },
          cadre: { nom: 'Logement, environnement, culture', note: 'Logement et équipements collectifs, environnement, culture et sport.' },
        },
        prereglages: {
          tendanciel: 'Tendanciel', plan: 'Plan budgétaire', taux: 'Taux élevés', croissance: 'Croissance forte',
          retraite65: 'Retraite à 65 ans', effort: 'Effort partagé', hauts: 'Taxer les hauts revenus',
          smic: 'SMIC +10 %', ru: 'Revenu universel', crise: 'Crise en 2029',
        },
        nonVentile: (montant, annee) => `Non ventilé (économies transversales, SMIC des agents publics, climat, crise) : ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Chaque année, la dette augmente du déficit : dépenses hors intérêts, moins recettes, plus intérêts. Le PIB progresse de la croissance en volume et de l’inflation ; les recettes suivent le PIB ; les dépenses hors intérêts suivent leur propre rythme.</p>
          <p><strong>Point de départ estimé (fin ${d.annee}) :</strong> PIB ${mds(d.pib)}, dette ${mds(d.dette)} (${pct(d.ratio)} du PIB, projection de la Cour des comptes), déficit ${pct(-d.soldePib)} du PIB, intérêts ${mds(d.interets)}. Le dernier chiffre mesuré est celui de l’Insee pour fin 2025 : ${fmt(COMPTES_2025.dette)} Md€, ${pct(COMPTES_2025.ratio)} du PIB.</p>
          <p><strong>Hypothèses propres à l’application, non tirées des sources :</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % de l’encours est refinancé chaque année au taux de marché, et toute dette nouvelle l’est en totalité. Ce réglage reproduit les trois chiffres du Sénat à 15 % près.</li>
            <li>Supprimer une niche fiscale rapporte ${fmt(H.nichesRendement * 100, 0)} % de son coût affiché.</li>
            <li>Supprimer des allègements de cotisations patronales rapporte ${fmt(H.allegementsRendement * 100, 0)} % de leur montant : le reste est perdu en emplois et en salaires. Les subventions supprimées sont des économies nettes.</li>
            <li>Un point de taux d’emploi des seniors ajoute ${fmt(H.pibParPointSeniors)} % au PIB.</li>
            <li>La dépense hors intérêts de 2026 est répartie entre postes selon leur poids de 2024 (Eurostat). L’objectif Otan de 3,5 % du PIB cité pour la défense ne vient pas des sources du site.</li>
            <li>Les rendements par point de chaque tranche de l’impôt sur le revenu sont des estimations de l’application, fiables à 30 % près : elles partent du nombre de foyers et de l’impôt moyen par tranche (DGFiP, revenus 2022) et des chiffrages cités par le Sénat. Le rendement de l’impôt plancher sur les patrimoines (10 Md€ bruts par point) vient du débat public de 2025, pas des sources du site.</li>
            <li>La TVA est calculée à consommation inchangée : une hausse ne réduit pas les achats et ne pèse pas sur la croissance, une baisse ne les stimule pas.</li>
            <li>Les effets de l’âge légal et de la durée de cotisation sont ceux de la Cour des comptes pour un an, étendus en proportion au-delà d’un an et atteints progressivement en 2035. Leur effet sur le PIB n’est compté que par les recettes.</li>
            <li>Un point de chômage en moins rapporte ${fmt(H.chomagePoint[0] + H.chomagePoint[1])} Md€ par an, en ${H.monteeChomage} ans, sans effet ajouté sur le PIB.</li>
            <li>Les effets par point de hausse du SMIC (recettes, allègements, salaires publics) sont des estimations de l’application, fiables à 50 % près. Les emplois perdus sont convertis en chômage sur une population active de ${fmt(H.smic.populationActive, 0)} millions. L’effet sur la consommation et sur la prime d’activité n’est pas compté.</li>
            <li>Le revenu universel est versé à toute la population et imputé au poste « Autre protection sociale ». Les montants des aides qu’il remplace (${mds(k.totalAides)} au total) sont des ordres de grandeur DREES et CNAF ; leur réduction suit le rapport entre le revenu universel et l’aide moyenne par foyer. Ni l’effet sur l’offre de travail, ni l’imposition du revenu universel ne sont modélisés.</li>
            <li>Les leviers budgétaires montent en charge sur ${H.montee} ans, puis suivent le PIB.</li>
            <li>Une crise réduit le PIB de 1 % par tranche de 100 Md€, dont la moitié est rattrapée l’année suivante.</li>
            <li>Le « tendanciel » maintient les dépenses hors intérêts au rythme de la croissance : ce n’est pas une prévision officielle.</li>
          </ul>
          <p><strong>Ce que le modèle ignore :</strong> l’effet des économies ou des hausses d’impôts sur la croissance, la réaction des taux au niveau de dette, les titres indexés sur l’inflation, les cessions d’actifs et les écarts entre déficit et variation de dette.</p>`,
      };
    },

    en: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Long-run effect' : 'Effect'}: ${mdsSigne(g)} a year, in 2026 euros.`);
      return {
        titreDoc: 'French public debt: 10-year projection',
        h1: 'French public debt: projection 2027-2036',
        groupes: {
          economie: { titre: 'Economy' },
          depenses: { titre: 'Spending' },
          postes: { titre: 'Spending by function', intro: 'Real growth of each function. Left untouched, they all follow the overall pace above.' },
          recettes: { titre: 'Revenue' },
          aides: { titre: 'Business support',
            intro: 'French Senate: €211bn in 2023, including €88bn of tax expenditures (“tax breaks” slider) and €41bn of Bpifrance loans and guarantees, not counted here. The Planning Commissioner puts it at €82bn to €187bn depending on scope.',
            resume: (p) => effet(k.aides(p), 'Support unchanged.') },
          tva: { titre: 'VAT', intro: 'Four rates in force. Immediate effect, computed with unchanged consumption.',
            resume: (p) => effet(m.effetTVA(p), 'Rates unchanged.', false) },
          ir: { titre: 'Income tax and large fortunes',
            intro: `Schedule proposed for 2027, per family-quotient share: 0% up to ${euros(H.ir.seuils[0])}, then the four brackets below.`,
            resume: (p) => effet(m.effetImpot(p), 'Schedule unchanged.') },
          retraites: { titre: 'Pensions' },
          emploi: { titre: 'Jobs and ageing' },
          smic: { titre: 'Minimum wage (SMIC)', intro: 'Increase on top of the annual statutory uprating. About 3.1 million employees are paid the minimum wage (DARES).',
            resume: (p) => {
              if (!p.smic) return 'Minimum wage uprated by the statutory rule.';
              const { s, solde } = k.smicSolde(p);
              return `Unemployment ${points(s.chomage, 2)}. Long-run effect on the balance: ${mdsSigne(solde)} a year, in 2026 euros.`;
            } },
          ru: { titre: 'Universal basic income',
            intro: 'Paid to every resident, unconditionally. It replaces means-tested benefits up to its amount; pensions and unemployment insurance are untouched.',
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
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'With 1.0% growth and 1.4% inflation, the debt-stabilising deficit is about 2.8% of GDP (Cour des comptes).' },
          tauxMarche: { nom: 'Government borrowing rate', f: (v) => pct(v), repere: 'Senate: +1 point costs €13.9bn a year after 3 years, €32.6bn after 9 years.' },
          productivite: { nom: 'Productivity catch-up', f: (v) => fmt(v, 0) + '% of the gap', repere: 'Banque de France: productivity 8.5% below its pre-Covid trend. Catch-up spread over 10 years.' },
          depenses: { nom: 'Primary public spending, real terms', f: (v) => pctAn(v), repere: '2025-2029 plan: cap of 1.2% in nominal terms, about −0.2% in real terms.' },
          economies: { nom: 'Additional permanent savings', f: (v) => mds(v), repere: 'In 2026 €bn, reached over 3 years. 2027 budget: €54bn of effort announced.' },
          prelevements: { nom: 'Public revenue ratio', f: (v) => signe(v) + ' pp of GDP', repere: 'Insee: revenue at 52.1% of GDP in 2025, of which 43.6% taxes and social contributions.' },
          niches: { nom: 'Tax breaks removed', f: (v) => fmt(v, 0) + '%', repere: '2026 budget bill: €88.3bn. Net gain assumed: half of the stated cost.' },
          fraude: { nom: 'Extra tax fraud recovered', f: (v) => `+€${fmt(v)}bn/yr`, repere: 'Tax audits 2025: €17.1bn assessed, €11.4bn collected.' },
          allegements: { nom: 'Social-contribution relief removed', f: (v) => fmt(v, 0) + '%',
            repere: `Senate: €${fmt(H.allegementsTotal, 0)}bn in 2023, mostly on low wages. Net gain assumed: ${fmt(H.allegementsRendement * 100, 0)}%, the rest being lost in jobs.` },
          subventions: { nom: 'State subsidies removed', f: (v) => fmt(v, 0) + '%',
            repere: `Senate: €${fmt(H.subventionsTotal, 0)}bn in 2023. Booked under “Economic affairs”.` },
          tva20: { nom: 'Standard rate', f: (v) => pct(v), repere: 'Current: 20%. Most goods and services. One point = €7.5bn (Treasury).' },
          tva10: { nom: 'Intermediate rate', f: (v) => pct(v), repere: 'Current: 10%. Restaurants, transport, renovation work. One point = €1.6bn.' },
          tva55: { nom: 'Reduced rate', f: (v) => pct(v), repere: 'Current: 5.5%. Food, energy, books. One point = €2.0bn.' },
          tva21: { nom: 'Special rate', f: (v) => pct(v), repere: 'Current: 2.1%. Reimbursed medicines, press. One point = €0.4bn.' },
          ir11: { nom: `${euros(H.ir.seuils[0])} to ${euros(H.ir.seuils[1])}`, f: (v) => pct(v), repere: '11% bracket. One point ≈ €3.5bn: every taxable household passes through it.' },
          ir30: { nom: `${euros(H.ir.seuils[1])} to ${euros(H.ir.seuils[2])}`, f: (v) => pct(v), repere: '30% bracket. One point ≈ €1.15bn. About 16% of households reach it.' },
          ir41: { nom: `${euros(H.ir.seuils[2])} to ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: '41% bracket. One point ≈ €0.3bn. About 1.3% of households.' },
          ir45: { nom: `Above ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: '45% bracket. One point ≈ €0.13bn. About 0.2% of households (67,000). Its creation in 2013 raised €344m.' },
          irSurtaxe: { nom: 'New top bracket', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'none'), repere: 'Rate added to the top bracket, above the threshold below.' },
          irSeuil: { nom: 'Threshold of the new bracket', f: (v) => euros(v), repere: 'Per share. The higher the threshold, the less income is left to tax.' },
          patrimoine: { nom: 'Minimum tax on fortunes above €100m', f: (v) => (v ? pct(v) + ' a year' : 'none'),
            repere: 'The so-called Zucman proposal at 2%: about 1,800 households, €15-25bn according to its author, around €5bn according to its critics.' },
          erosion: { nom: 'Taxpayer response', f: (v) => `−${fmt(v, 0)}% of the gain`,
            repere: 'Share of the gain lost to emigration, tax planning or lower activity. Applies to increases on the 41%+ brackets and on fortunes.' },
          ageLegal: { nom: 'Statutory retirement age', f: (v) => ansMois(64 + v),
            repere: 'Reference: 64 (2023 reform). Cour des comptes: 65 yields €17.7bn in 2035, 63 costs €13bn.' },
          dureeAssurance: { nom: 'Contribution period for a full pension', f: (v) => `${ansMois(43 + v)} (${fmt((43 + v) * 4, 0)} quarters)`,
            repere: 'Reference: 43 years. Cour des comptes: 44 years yields €9.7bn in 2035, 42 years costs €7.1bn.' },
          cotisation: { nom: 'Pension contribution rate', f: (v) => points(v), repere: 'Cour des comptes: one point yields €4.8-7.6bn a year (6.2 assumed), but raises labour costs.' },
          sousIndexation: { nom: 'Pensions uprated below inflation', f: (v) => (v ? '−' + fmt(v) + ' pt/yr' : 'no'),
            repere: 'Cour des comptes: one point less saves €2.9bn a year, kept in following years.' },
          anneesSousIndexation: { nom: 'Length of under-indexation', f: (v) => u.annees(v), repere: 'From 2027.' },
          retraites: { nom: 'Drift of the pension balance', f: (v) => fmt(v, 0) + '% of the COR scenario', repere: 'COR 2025: −0.1 pp of GDP in 2024, −0.2 in 2030, −1.4 in 2070.' },
          chomage: { nom: 'Target unemployment rate', f: (v) => pct(v), repere: 'Reference: 7.4%. Reaching 5% would yield €30-40bn a year (35 assumed), over 5 years.' },
          seniors: { nom: 'Employment rate, ages 55-64', f: (v) => points(v),
            repere: 'DARES: 60.4% in 2024. App assumption: +0.2% of GDP per point, over 10 years. Partly overlaps with the retirement age.' },
          autonomie: { nom: 'Long-term care spending in 2070', f: (v) => pct(v) + ' of GDP', repere: 'Ageing Report: 1.9% in 2022; 2.6% (reference) to 4.8% (risk) in 2070.' },
          smic: { nom: 'Minimum wage increase', f: (v) => (v ? `+${v}% (≈ ${euros(H.smic.netMensuel * (1 + v / 100))} net)` : 'none'),
            repere: `About ${euros(H.smic.netMensuel)} net a month in 2026. Per point: +€${fmt(H.smic.recettesPoint, 2)}bn of contributions and taxes, −€${fmt(H.smic.allegementsPoint)}bn of extra relief, −€${fmt(H.smic.publicPoint)}bn of public wages.` },
          smicEmplois: { nom: 'Jobs lost per point of increase', f: (v) => (v ? `${fmt(v * 1000, 0)} jobs` : 'none'),
            repere: 'Disputed assumption: estimates range from almost nothing to tens of thousands of jobs per point. Lost jobs feed the “unemployment” lever.' },
          ruAdulte: { nom: 'Amount per adult', f: (v) => (v ? euros(v) + '/month' : 'none'),
            repere: `${fmt(H.ru.adultes)} million adults: €100 a month costs ${mds(H.ru.adultes * 1.2)} a year. For reference, RSA for a single person: about €650.` },
          ruMineur: { nom: 'Amount per child', f: (v) => (v ? euros(v) + '/month' : 'none'),
            repere: `${fmt(H.ru.mineurs)} million children, paid to parents. Replaces family benefits.` },
          ruAides: { nom: 'Benefits removed in return', f: (v) => fmt(v, 0) + '% of what can be absorbed',
            repere: 'A benefit is removed in proportion to the basic income relative to its average amount: RSA, activity bonus, AAH, minimum old-age pension, ASS, half of housing benefits, 80% of family benefits.' },
          ruFinancement: { nom: 'Share funded by a dedicated levy', f: (v) => fmt(v, 0) + '%', repere: 'A flat tax on all income, for instance. Computed with no effect on activity.' },
          climat: { nom: 'Climate risk materialising', f: (v) => fmt(v, 0) + '%', repere: 'France Stratégie: +10 points of debt in 2030, +15 in 2035. Size disputed.' },
          crise: { nom: 'Cost of a crisis', f: (v) => (v ? mds(v) : 'none'), repere: 'Subprime, Covid, energy: +€200-600bn of debt each time.' },
          anneeCrise: { nom: 'Year of the crisis', f: (v) => String(v), repere: 'Cost split 60% / 40% over two years, with a fall in GDP.' },
        },
        postes: {
          defense: { nom: 'Defence', note: '2025 NATO pledge: 3.5% of GDP in 2035, i.e. about +7.6% a year.' },
          enseignement: { nom: 'Education', note: 'Primary to higher education, including €64bn for secondary and €42bn for primary.' },
          sante: { nom: 'Health', note: 'Hospitals, outpatient care, medicines.' },
          retraites: { nom: 'Pensions', note: 'Old-age pensions. The “Pensions” sliders add to it.' },
          social: { nom: 'Other social protection', note: 'Unemployment (€49bn), family, disability, housing, exclusion. Universal basic income, net of the benefits it replaces, is added here.' },
          securite: { nom: 'Public order and justice', note: 'Police, gendarmerie, courts, prisons, fire services.' },
          economie: { nom: 'Economic affairs', note: 'Transport, business support, energy, agriculture.' },
          general: { nom: 'General services', note: 'General administration, EU contribution, basic research. Excluding interest.' },
          cadre: { nom: 'Housing, environment, culture', note: 'Housing and community amenities, environment, culture and sport.' },
        },
        prereglages: {
          tendanciel: 'Baseline', plan: 'Fiscal plan', taux: 'High rates', croissance: 'Strong growth',
          retraite65: 'Retirement at 65', effort: 'Shared effort', hauts: 'Tax top incomes',
          smic: 'Minimum wage +10%', ru: 'Basic income', crise: 'Crisis in 2029',
        },
        nonVentile: (montant, annee) => `Not allocated (across-the-board savings, public-sector minimum wage, climate, crisis): ${montant} in ${annee}.`,
        methode: (d) => `
          <p>Each year, debt rises by the deficit: primary spending, minus revenue, plus interest. GDP grows with real growth and inflation; revenue tracks GDP; primary spending follows its own path.</p>
          <p><strong>Estimated starting point (end-${d.annee}):</strong> GDP ${mds(d.pib)}, debt ${mds(d.dette)} (${pct(d.ratio)} of GDP, Cour des comptes projection), deficit ${pct(-d.soldePib)} of GDP, interest ${mds(d.interets)}. The latest outturn is Insee’s for end-2025: ${mds(COMPTES_2025.dette, 1)}, ${pct(COMPTES_2025.ratio)} of GDP.</p>
          <p><strong>Assumptions specific to the app, not taken from the sources:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)}% of the debt stock is refinanced each year at the market rate, and all new debt is. This setting reproduces the Senate’s three figures to within 15%.</li>
            <li>Removing a tax break yields ${fmt(H.nichesRendement * 100, 0)}% of its stated cost.</li>
            <li>Removing employer contribution relief yields ${fmt(H.allegementsRendement * 100, 0)}% of its amount: the rest is lost in jobs and wages. Subsidies removed are net savings.</li>
            <li>One point of senior employment adds ${fmt(H.pibParPointSeniors)}% to GDP.</li>
            <li>2026 primary spending is split between functions according to their 2024 weights (Eurostat). The 3.5%-of-GDP NATO target quoted for defence does not come from the site’s sources.</li>
            <li>Yields per point of each income-tax bracket are the app’s estimates, reliable to within 30%: they start from the number of households and the average tax per bracket (DGFiP, 2022 incomes) and from figures quoted by the Senate. The yield of the minimum tax on fortunes (€10bn gross per point) comes from the 2025 public debate, not from the site’s sources.</li>
            <li>VAT is computed with unchanged consumption: an increase does not reduce purchases or weigh on growth, a cut does not stimulate them.</li>
            <li>The effects of the retirement age and contribution period are those of the Cour des comptes for one year, scaled proportionally beyond one year and phased in by 2035. Their effect on GDP is counted only through revenue.</li>
            <li>One point less unemployment yields €${fmt(H.chomagePoint[0] + H.chomagePoint[1])}bn a year, over ${H.monteeChomage} years, with no added effect on GDP.</li>
            <li>The per-point effects of a minimum-wage increase (revenue, relief, public wages) are the app’s estimates, reliable to within 50%. Lost jobs are converted into unemployment over a labour force of ${fmt(H.smic.populationActive, 0)} million. Effects on consumption and on the activity bonus are not counted.</li>
            <li>Universal basic income is paid to the whole population and booked under “Other social protection”. The amounts of the benefits it replaces (${mds(k.totalAides)} in total) are DREES and CNAF orders of magnitude; their reduction follows the ratio between basic income and the average benefit per household. Neither labour-supply effects nor taxation of the basic income are modelled.</li>
            <li>Fiscal levers phase in over ${H.montee} years, then grow with GDP.</li>
            <li>A crisis cuts GDP by 1% per €100bn, half of which is recovered the following year.</li>
            <li>The “baseline” keeps primary spending growing with the economy: it is not an official forecast.</li>
          </ul>
          <p><strong>What the model ignores:</strong> the effect of savings or tax rises on growth, the response of interest rates to the debt level, inflation-linked bonds, asset sales and gaps between the deficit and the change in debt.</p>`,
      };
    },

    es: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Efecto${aTerme ? ' a largo plazo' : ''}: ${mdsSigne(g)} al año, en euros de 2026.`);
      return {
        titreDoc: 'Deuda pública francesa: proyección a 10 años',
        h1: 'Deuda pública francesa: proyección 2027-2036',
        groupes: {
          economie: { titre: 'Economía' },
          depenses: { titre: 'Gasto' },
          postes: { titre: 'Gasto por función', intro: 'Crecimiento real de cada función. Sin ajustes, todas siguen el ritmo general indicado arriba.' },
          recettes: { titre: 'Ingresos' },
          aides: { titre: 'Ayudas a las empresas',
            intro: 'Senado francés: 211 mil M€ en 2023, de los que 88 mil M€ son gastos fiscales (control «beneficios fiscales») y 41 mil M€ préstamos y garantías de Bpifrance, no contabilizados aquí. El Alto Comisionado para la Planificación da entre 82 y 187 mil M€ según el perímetro.',
            resume: (p) => effet(k.aides(p), 'Ayudas sin cambios.') },
          tva: { titre: 'IVA', intro: 'Cuatro tipos vigentes. Efecto inmediato, calculado con consumo constante.',
            resume: (p) => effet(m.effetTVA(p), 'Tipos sin cambios.', false) },
          ir: { titre: 'Impuesto sobre la renta y grandes patrimonios',
            intro: `Tarifa propuesta para 2027, por parte de cociente familiar: 0 % hasta ${euros(H.ir.seuils[0])} y después los cuatro tramos siguientes.`,
            resume: (p) => effet(m.effetImpot(p), 'Tarifa sin cambios.') },
          retraites: { titre: 'Pensiones' },
          emploi: { titre: 'Empleo y envejecimiento' },
          smic: { titre: 'Salario mínimo (SMIC)', intro: 'Subida añadida a la revalorización legal anual. Unos 3,1 millones de asalariados cobran el SMIC (DARES).',
            resume: (p) => {
              if (!p.smic) return 'SMIC revalorizado según la regla legal.';
              const { s, solde } = k.smicSolde(p);
              return `Paro ${points(s.chomage, 2)}. Efecto a largo plazo sobre el saldo: ${mdsSigne(solde)} al año, en euros de 2026.`;
            } },
          ru: { titre: 'Renta básica universal',
            intro: 'Pagada a cada residente, sin condiciones. Sustituye las ayudas no contributivas hasta su importe; las pensiones y las prestaciones contributivas por desempleo no se tocan.',
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
          inflation: { nom: 'Inflación', f: (v) => pctAn(v), repere: 'Con un 1,0 % de crecimiento y un 1,4 % de inflación, el déficit que estabiliza la deuda es de un 2,8 % del PIB (Cour des comptes).' },
          tauxMarche: { nom: 'Tipo de emisión del Estado', f: (v) => pct(v), repere: 'Senado: +1 punto cuesta 13,9 mil M€ al año a los 3 años y 32,6 mil M€ a los 9 años.' },
          productivite: { nom: 'Recuperación de la productividad', f: (v) => fmt(v, 0) + ' % de la brecha', repere: 'Banque de France: productividad un 8,5 % por debajo de su tendencia previa a la covid. Recuperación repartida en 10 años.' },
          depenses: { nom: 'Gasto público primario, en volumen', f: (v) => pctAn(v), repere: 'Plan 2025-2029: tope del 1,2 % nominal, es decir, en torno al −0,2 % en volumen.' },
          economies: { nom: 'Ahorros permanentes adicionales', f: (v) => mds(v), repere: 'En mil M€ de 2026, alcanzados en 3 años. Presupuesto 2027: 54 mil M€ de esfuerzo anunciados.' },
          prelevements: { nom: 'Ratio de ingresos públicos', f: (v) => signe(v) + ' pp del PIB', repere: 'Insee: ingresos del 52,1 % del PIB en 2025, de los que el 43,6 % son impuestos y cotizaciones.' },
          niches: { nom: 'Beneficios fiscales suprimidos', f: (v) => fmt(v, 0) + ' %', repere: 'Proyecto de presupuesto 2026: 88,3 mil M€. Ganancia neta supuesta: la mitad del coste declarado.' },
          fraude: { nom: 'Fraude recuperado adicional', f: (v) => '+' + fmt(v) + ' mil M€/año', repere: 'Control fiscal 2025: 17,1 mil M€ liquidados, 11,4 mil M€ cobrados.' },
          allegements: { nom: 'Reducciones de cotizaciones suprimidas', f: (v) => fmt(v, 0) + ' %',
            repere: `Senado: ${fmt(H.allegementsTotal, 0)} mil M€ en 2023, sobre todo en salarios bajos. Ganancia neta supuesta: ${fmt(H.allegementsRendement * 100, 0)} %; el resto se pierde en empleo.` },
          subventions: { nom: 'Subvenciones del Estado suprimidas', f: (v) => fmt(v, 0) + ' %',
            repere: `Senado: ${fmt(H.subventionsTotal, 0)} mil M€ en 2023. Imputadas a «Asuntos económicos».` },
          tva20: { nom: 'Tipo general', f: (v) => pct(v), repere: 'Actual: 20 %. La mayoría de bienes y servicios. Un punto = 7,5 mil M€ (Tesoro).' },
          tva10: { nom: 'Tipo intermedio', f: (v) => pct(v), repere: 'Actual: 10 %. Restauración, transporte, obras. Un punto = 1,6 mil M€.' },
          tva55: { nom: 'Tipo reducido', f: (v) => pct(v), repere: 'Actual: 5,5 %. Alimentación, energía, libros. Un punto = 2,0 mil M€.' },
          tva21: { nom: 'Tipo especial', f: (v) => pct(v), repere: 'Actual: 2,1 %. Medicamentos reembolsados, prensa. Un punto = 0,4 mil M€.' },
          ir11: { nom: `De ${euros(H.ir.seuils[0])} a ${euros(H.ir.seuils[1])}`, f: (v) => pct(v), repere: 'Tramo del 11 %. Un punto ≈ 3,5 mil M€: todos los hogares sujetos lo atraviesan.' },
          ir30: { nom: `De ${euros(H.ir.seuils[1])} a ${euros(H.ir.seuils[2])}`, f: (v) => pct(v), repere: 'Tramo del 30 %. Un punto ≈ 1,15 mil M€. Lo alcanza en torno al 16 % de los hogares.' },
          ir41: { nom: `De ${euros(H.ir.seuils[2])} a ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: 'Tramo del 41 %. Un punto ≈ 0,3 mil M€. En torno al 1,3 % de los hogares.' },
          ir45: { nom: `Más de ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: 'Tramo del 45 %. Un punto ≈ 0,13 mil M€. En torno al 0,2 % de los hogares (67 000). Su creación en 2013 recaudó 344 M€.' },
          irSurtaxe: { nom: 'Nuevo tramo superior', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'ninguno'), repere: 'Tipo añadido al del último tramo, por encima del umbral siguiente.' },
          irSeuil: { nom: 'Umbral del nuevo tramo', f: (v) => euros(v), repere: 'Por parte. Cuanto más alto el umbral, menos renta queda por gravar.' },
          patrimoine: { nom: 'Impuesto mínimo sobre patrimonios de más de 100 M€', f: (v) => (v ? pct(v) + ' al año' : 'ninguno'),
            repere: 'La llamada propuesta Zucman al 2 %: unos 1800 hogares, de 15 a 25 mil M€ según su autor, en torno a 5 mil M€ según sus críticos.' },
          erosion: { nom: 'Reacción de los contribuyentes', f: (v) => `−${fmt(v, 0)} % de la ganancia`,
            repere: 'Parte de la ganancia perdida por marchas, optimización o menor actividad. Se aplica a las subidas en los tramos del 41 % o más y en los patrimonios.' },
          ageLegal: { nom: 'Edad legal de jubilación', f: (v) => ansMois(64 + v),
            repere: 'Referencia: 64 años (reforma de 2023). Cour des comptes: 65 años aporta 17,7 mil M€ en 2035, 63 años cuesta 13 mil M€.' },
          dureeAssurance: { nom: 'Periodo de cotización para la pensión completa', f: (v) => `${ansMois(43 + v)} (${fmt((43 + v) * 4, 0)} trimestres)`,
            repere: 'Referencia: 43 años. Cour des comptes: 44 años aporta 9,7 mil M€ en 2035, 42 años cuesta 7,1 mil M€.' },
          cotisation: { nom: 'Tipo de cotización por jubilación', f: (v) => points(v), repere: 'Cour des comptes: un punto aporta de 4,8 a 7,6 mil M€ al año (6,2 supuestos), pero encarece el trabajo.' },
          sousIndexation: { nom: 'Pensiones revalorizadas por debajo de la inflación', f: (v) => (v ? '−' + fmt(v) + ' pt/año' : 'no'),
            repere: 'Cour des comptes: un punto menos ahorra 2,9 mil M€ al año, que se consolidan los años siguientes.' },
          anneesSousIndexation: { nom: 'Duración de la subindexación', f: (v) => u.annees(v), repere: 'A partir de 2027.' },
          retraites: { nom: 'Deriva del saldo de las pensiones', f: (v) => fmt(v, 0) + ' % del escenario del COR', repere: 'COR 2025: −0,1 pp del PIB en 2024, −0,2 en 2030, −1,4 en 2070.' },
          chomage: { nom: 'Tasa de paro objetivo', f: (v) => pct(v), repere: 'Referencia: 7,4 %. Llegar al 5 % aportaría de 30 a 40 mil M€ al año (35 supuestos), en 5 años.' },
          seniors: { nom: 'Tasa de empleo de 55 a 64 años', f: (v) => points(v),
            repere: 'DARES: 60,4 % en 2024. Hipótesis de la aplicación: +0,2 % del PIB por punto, en 10 años. Se solapa en parte con la edad legal.' },
          autonomie: { nom: 'Gasto en dependencia en 2070', f: (v) => pct(v) + ' del PIB', repere: 'Ageing Report: 1,9 % en 2022; del 2,6 % (referencia) al 4,8 % (riesgo) en 2070.' },
          smic: { nom: 'Subida del SMIC', f: (v) => (v ? `+${v} % (≈ ${euros(H.smic.netMensuel * (1 + v / 100))} netos)` : 'ninguna'),
            repere: `Unos ${euros(H.smic.netMensuel)} netos al mes en 2026. Por punto: +${fmt(H.smic.recettesPoint, 2)} mil M€ de cotizaciones e impuestos, −${fmt(H.smic.allegementsPoint)} mil M€ de reducciones adicionales, −${fmt(H.smic.publicPoint)} mil M€ de salarios públicos.` },
          smicEmplois: { nom: 'Empleos perdidos por punto de subida', f: (v) => (v ? `${fmt(v * 1000, 0)} empleos` : 'ninguno'),
            repere: 'Hipótesis discutida: las estimaciones van de casi nada a decenas de miles de empleos por punto. Los empleos perdidos pasan por el control «paro».' },
          ruAdulte: { nom: 'Importe por adulto', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'),
            repere: `${fmt(H.ru.adultes)} millones de adultos: 100 € al mes cuestan ${mds(H.ru.adultes * 1.2)} al año. Como referencia, RSA de una persona sola: unos 650 €.` },
          ruMineur: { nom: 'Importe por menor', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'),
            repere: `${fmt(H.ru.mineurs)} millones de menores, pagado a los padres. Sustituye las prestaciones familiares.` },
          ruAides: { nom: 'Ayudas suprimidas a cambio', f: (v) => fmt(v, 0) + ' % de lo absorbible',
            repere: 'Una ayuda se suprime en proporción a la renta básica respecto a su importe medio: RSA, prima de actividad, AAH, mínimo de vejez, ASS, la mitad de las ayudas a la vivienda, el 80 % de las prestaciones familiares.' },
          ruFinancement: { nom: 'Parte financiada por un impuesto específico', f: (v) => fmt(v, 0) + ' %', repere: 'Un impuesto proporcional sobre todas las rentas, por ejemplo. Calculado sin efecto sobre la actividad.' },
          climat: { nom: 'Riesgo climático materializado', f: (v) => fmt(v, 0) + ' %', repere: 'France Stratégie: +10 puntos de deuda en 2030, +15 en 2035. Magnitud discutida.' },
          crise: { nom: 'Coste de una crisis', f: (v) => (v ? mds(v) : 'ninguna'), repere: 'Subprime, covid, energía: de +200 a +600 mil M€ de deuda en cada perturbación.' },
          anneeCrise: { nom: 'Año de la crisis', f: (v) => String(v), repere: 'Coste repartido 60 % / 40 % en dos años, con caída del PIB.' },
        },
        postes: {
          defense: { nom: 'Defensa', note: 'Compromiso OTAN de 2025: 3,5 % del PIB en 2035, es decir, en torno a +7,6 % al año.' },
          enseignement: { nom: 'Educación', note: 'De primaria a universidad; 64 mil M€ para secundaria y 42 mil M€ para primaria.' },
          sante: { nom: 'Sanidad', note: 'Hospitales, atención ambulatoria, medicamentos.' },
          retraites: { nom: 'Pensiones', note: 'Pensiones de vejez. Los controles del grupo «Pensiones» se suman aquí.' },
          social: { nom: 'Otra protección social', note: 'Desempleo (49 mil M€), familia, invalidez, vivienda, exclusión. La renta básica, neta de las ayudas que sustituye, se suma aquí.' },
          securite: { nom: 'Orden público y justicia', note: 'Policía, gendarmería, justicia, prisiones, bomberos.' },
          economie: { nom: 'Asuntos económicos', note: 'Transporte, ayudas a empresas, energía, agricultura.' },
          general: { nom: 'Servicios generales', note: 'Administración general, contribución a la UE, investigación básica. Sin intereses.' },
          cadre: { nom: 'Vivienda, medio ambiente, cultura', note: 'Vivienda y servicios comunitarios, medio ambiente, cultura y deporte.' },
        },
        prereglages: {
          tendanciel: 'Tendencial', plan: 'Plan presupuestario', taux: 'Tipos altos', croissance: 'Crecimiento fuerte',
          retraite65: 'Jubilación a los 65', effort: 'Esfuerzo compartido', hauts: 'Gravar las rentas altas',
          smic: 'SMIC +10 %', ru: 'Renta básica', crise: 'Crisis en 2029',
        },
        nonVentile: (montant, annee) => `Sin asignar (ahorros transversales, SMIC de los empleados públicos, clima, crisis): ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Cada año, la deuda aumenta en el importe del déficit: gasto primario, menos ingresos, más intereses. El PIB crece con el crecimiento real y la inflación; los ingresos siguen al PIB; el gasto primario sigue su propio ritmo.</p>
          <p><strong>Punto de partida estimado (finales de ${d.annee}):</strong> PIB ${mds(d.pib)}, deuda ${mds(d.dette)} (${pct(d.ratio)} del PIB, proyección de la Cour des comptes), déficit del ${pct(-d.soldePib)} del PIB, intereses ${mds(d.interets)}. El último dato observado es el del Insee para finales de 2025: ${mds(COMPTES_2025.dette, 1)}, el ${pct(COMPTES_2025.ratio)} del PIB.</p>
          <p><strong>Hipótesis propias de la aplicación, no tomadas de las fuentes:</strong></p>
          <ul>
            <li>El ${fmt(H.refinancement * 100)} % del saldo vivo se refinancia cada año al tipo de mercado, y toda la deuda nueva también. Este ajuste reproduce las tres cifras del Senado con un margen del 15 %.</li>
            <li>Suprimir un beneficio fiscal aporta el ${fmt(H.nichesRendement * 100, 0)} % de su coste declarado.</li>
            <li>Suprimir reducciones de cotizaciones empresariales aporta el ${fmt(H.allegementsRendement * 100, 0)} % de su importe: el resto se pierde en empleo y salarios. Las subvenciones suprimidas son ahorros netos.</li>
            <li>Un punto de tasa de empleo de los mayores añade un ${fmt(H.pibParPointSeniors)} % al PIB.</li>
            <li>El gasto primario de 2026 se reparte entre funciones según su peso en 2024 (Eurostat). El objetivo OTAN del 3,5 % del PIB citado para defensa no procede de las fuentes del sitio.</li>
            <li>Los rendimientos por punto de cada tramo del impuesto sobre la renta son estimaciones de la aplicación, fiables con un margen del 30 %: parten del número de hogares y del impuesto medio por tramo (DGFiP, rentas de 2022) y de las cifras citadas por el Senado. El rendimiento del impuesto mínimo sobre patrimonios (10 mil M€ brutos por punto) procede del debate público de 2025, no de las fuentes del sitio.</li>
            <li>El IVA se calcula con consumo constante: una subida no reduce las compras ni frena el crecimiento, y una bajada no las estimula.</li>
            <li>Los efectos de la edad legal y del periodo de cotización son los de la Cour des comptes para un año, ampliados proporcionalmente más allá de un año y alcanzados progresivamente en 2035. Su efecto sobre el PIB solo se cuenta a través de los ingresos.</li>
            <li>Un punto menos de paro aporta ${fmt(H.chomagePoint[0] + H.chomagePoint[1])} mil M€ al año, en ${H.monteeChomage} años, sin efecto adicional sobre el PIB.</li>
            <li>Los efectos por punto de subida del SMIC (ingresos, reducciones, salarios públicos) son estimaciones de la aplicación, fiables con un margen del 50 %. Los empleos perdidos se convierten en paro sobre una población activa de ${fmt(H.smic.populationActive, 0)} millones. No se cuenta el efecto sobre el consumo ni sobre la prima de actividad.</li>
            <li>La renta básica se paga a toda la población y se imputa a «Otra protección social». Los importes de las ayudas que sustituye (${mds(k.totalAides)} en total) son órdenes de magnitud de la DREES y la CNAF; su reducción sigue la relación entre la renta básica y la ayuda media por hogar. No se modelizan ni el efecto sobre la oferta de trabajo ni la tributación de la renta básica.</li>
            <li>Las palancas presupuestarias se despliegan en ${H.montee} años y después siguen al PIB.</li>
            <li>Una crisis reduce el PIB un 1 % por cada 100 mil M€, la mitad del cual se recupera al año siguiente.</li>
            <li>El «tendencial» mantiene el gasto primario al ritmo del crecimiento: no es una previsión oficial.</li>
          </ul>
          <p><strong>Lo que el modelo no tiene en cuenta:</strong> el efecto de los ahorros o de las subidas de impuestos sobre el crecimiento, la reacción de los tipos al nivel de deuda, los bonos indexados a la inflación, las ventas de activos y las diferencias entre déficit y variación de la deuda.</p>`,
      };
    },

    de: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Langfristige Wirkung' : 'Wirkung'}: ${mdsSigne(g)} pro Jahr, in Euro von 2026.`);
      return {
        titreDoc: 'Französische Staatsschulden: Projektion über 10 Jahre',
        h1: 'Französische Staatsschulden: Projektion 2027-2036',
        groupes: {
          economie: { titre: 'Wirtschaft' },
          depenses: { titre: 'Ausgaben' },
          postes: { titre: 'Ausgaben nach Aufgabenbereich', intro: 'Reales Wachstum jedes Bereichs. Ohne Einstellung folgen alle dem allgemeinen Tempo oben.' },
          recettes: { titre: 'Einnahmen' },
          aides: { titre: 'Unternehmenshilfen',
            intro: 'Französischer Senat: 211 Mrd. € im Jahr 2023, davon 88 Mrd. € Steuervergünstigungen (Regler „Steuervergünstigungen“) und 41 Mrd. € Kredite und Garantien der Bpifrance, die hier nicht gezählt werden. Der Hochkommissar für Planung nennt je nach Abgrenzung 82 bis 187 Mrd. €.',
            resume: (p) => effet(k.aides(p), 'Hilfen unverändert.') },
          tva: { titre: 'Mehrwertsteuer', intro: 'Vier geltende Sätze. Sofortige Wirkung, berechnet bei unverändertem Konsum.',
            resume: (p) => effet(m.effetTVA(p), 'Sätze unverändert.', false) },
          ir: { titre: 'Einkommensteuer und große Vermögen',
            intro: `Für 2027 vorgeschlagener Tarif je Anteil des Familienquotienten: 0 % bis ${euros(H.ir.seuils[0])}, danach die vier folgenden Stufen.`,
            resume: (p) => effet(m.effetImpot(p), 'Tarif unverändert.') },
          retraites: { titre: 'Renten' },
          emploi: { titre: 'Beschäftigung und Alterung' },
          smic: { titre: 'Mindestlohn (SMIC)', intro: 'Erhöhung zusätzlich zur jährlichen gesetzlichen Anpassung. Rund 3,1 Millionen Beschäftigte verdienen den SMIC (DARES).',
            resume: (p) => {
              if (!p.smic) return 'SMIC nach der gesetzlichen Regel angepasst.';
              const { s, solde } = k.smicSolde(p);
              return `Arbeitslosigkeit ${points(s.chomage, 2)}. Langfristige Wirkung auf den Saldo: ${mdsSigne(solde)} pro Jahr, in Euro von 2026.`;
            } },
          ru: { titre: 'Bedingungsloses Grundeinkommen',
            intro: 'An jede Einwohnerin und jeden Einwohner ohne Bedingungen gezahlt. Es ersetzt beitragsunabhängige Leistungen bis zu seiner Höhe; Renten und Arbeitslosenversicherung bleiben unberührt.',
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
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'Bei 1,0 % Wachstum und 1,4 % Inflation liegt das schuldenstabilisierende Defizit bei etwa 2,8 % des BIP (Cour des comptes).' },
          tauxMarche: { nom: 'Emissionszins des Staates', f: (v) => pct(v), repere: 'Senat: +1 Punkt kostet nach 3 Jahren 13,9 Mrd. € pro Jahr, nach 9 Jahren 32,6 Mrd. €.' },
          productivite: { nom: 'Aufholen der Produktivität', f: (v) => fmt(v, 0) + ' % der Lücke', repere: 'Banque de France: Produktivität 8,5 % unter dem Trend vor Covid. Aufholen über 10 Jahre verteilt.' },
          depenses: { nom: 'Primärausgaben, real', f: (v) => pctAn(v), repere: 'Plan 2025-2029: Obergrenze von 1,2 % nominal, also etwa −0,2 % real.' },
          economies: { nom: 'Zusätzliche dauerhafte Einsparungen', f: (v) => mds(v), repere: 'In Mrd. € von 2026, in 3 Jahren erreicht. Haushalt 2027: 54 Mrd. € Anstrengung angekündigt.' },
          prelevements: { nom: 'Staatliche Einnahmenquote', f: (v) => signe(v) + ' Pp. des BIP', repere: 'Insee: Einnahmen 2025 bei 52,1 % des BIP, davon 43,6 % Steuern und Sozialabgaben.' },
          niches: { nom: 'Gestrichene Steuervergünstigungen', f: (v) => fmt(v, 0) + ' %', repere: 'Haushaltsentwurf 2026: 88,3 Mrd. €. Angenommener Nettoertrag: die Hälfte der ausgewiesenen Kosten.' },
          fraude: { nom: 'Zusätzlich eingetriebener Steuerbetrug', f: (v) => '+' + fmt(v) + ' Mrd. €/Jahr', repere: 'Steuerprüfungen 2025: 17,1 Mrd. € festgesetzt, 11,4 Mrd. € eingenommen.' },
          allegements: { nom: 'Gestrichene Beitragsentlastungen', f: (v) => fmt(v, 0) + ' %',
            repere: `Senat: ${fmt(H.allegementsTotal, 0)} Mrd. € im Jahr 2023, vor allem bei niedrigen Löhnen. Angenommener Nettoertrag: ${fmt(H.allegementsRendement * 100, 0)} %, der Rest geht durch Stellenabbau verloren.` },
          subventions: { nom: 'Gestrichene staatliche Subventionen', f: (v) => fmt(v, 0) + ' %',
            repere: `Senat: ${fmt(H.subventionsTotal, 0)} Mrd. € im Jahr 2023. Dem Bereich „Wirtschaftliche Angelegenheiten“ zugeordnet.` },
          tva20: { nom: 'Regelsatz', f: (v) => pct(v), repere: 'Aktuell: 20 %. Die meisten Waren und Dienstleistungen. Ein Punkt = 7,5 Mrd. € (Trésor).' },
          tva10: { nom: 'Zwischensatz', f: (v) => pct(v), repere: 'Aktuell: 10 %. Gastronomie, Verkehr, Bauarbeiten. Ein Punkt = 1,6 Mrd. €.' },
          tva55: { nom: 'Ermäßigter Satz', f: (v) => pct(v), repere: 'Aktuell: 5,5 %. Lebensmittel, Energie, Bücher. Ein Punkt = 2,0 Mrd. €.' },
          tva21: { nom: 'Sondersatz', f: (v) => pct(v), repere: 'Aktuell: 2,1 %. Erstattete Arzneimittel, Presse. Ein Punkt = 0,4 Mrd. €.' },
          ir11: { nom: `${euros(H.ir.seuils[0])} bis ${euros(H.ir.seuils[1])}`, f: (v) => pct(v), repere: 'Stufe 11 %. Ein Punkt ≈ 3,5 Mrd. €: Alle steuerpflichtigen Haushalte durchlaufen sie.' },
          ir30: { nom: `${euros(H.ir.seuils[1])} bis ${euros(H.ir.seuils[2])}`, f: (v) => pct(v), repere: 'Stufe 30 %. Ein Punkt ≈ 1,15 Mrd. €. Etwa 16 % der Haushalte erreichen sie.' },
          ir41: { nom: `${euros(H.ir.seuils[2])} bis ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: 'Stufe 41 %. Ein Punkt ≈ 0,3 Mrd. €. Etwa 1,3 % der Haushalte.' },
          ir45: { nom: `Über ${euros(H.ir.seuils[3])}`, f: (v) => pct(v), repere: 'Stufe 45 %. Ein Punkt ≈ 0,13 Mrd. €. Etwa 0,2 % der Haushalte (67 000). Ihre Einführung 2013 brachte 344 Mio. €.' },
          irSurtaxe: { nom: 'Neue Spitzenstufe', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} Pkt.)` : 'keine'), repere: 'Zuschlag auf den Satz der obersten Stufe, oberhalb der folgenden Schwelle.' },
          irSeuil: { nom: 'Schwelle der neuen Stufe', f: (v) => euros(v), repere: 'Je Anteil. Je höher die Schwelle, desto weniger Einkommen bleibt zu besteuern.' },
          patrimoine: { nom: 'Mindeststeuer auf Vermögen über 100 Mio. €', f: (v) => (v ? pct(v) + ' pro Jahr' : 'keine'),
            repere: 'Der sogenannte Zucman-Vorschlag mit 2 %: etwa 1 800 Haushalte, 15 bis 25 Mrd. € laut seinem Urheber, rund 5 Mrd. € laut seinen Kritikern.' },
          erosion: { nom: 'Reaktion der Steuerpflichtigen', f: (v) => `−${fmt(v, 0)} % des Ertrags`,
            repere: 'Anteil des Ertrags, der durch Abwanderung, Steuergestaltung oder geringere Aktivität verloren geht. Gilt für Erhöhungen ab der 41-%-Stufe und auf Vermögen.' },
          ageLegal: { nom: 'Gesetzliches Renteneintrittsalter', f: (v) => ansMois(64 + v),
            repere: 'Referenz: 64 Jahre (Reform 2023). Cour des comptes: 65 Jahre bringen 2035 17,7 Mrd. €, 63 Jahre kosten 13 Mrd. €.' },
          dureeAssurance: { nom: 'Beitragsdauer für die volle Rente', f: (v) => `${ansMois(43 + v)} (${fmt((43 + v) * 4, 0)} Quartale)`,
            repere: 'Referenz: 43 Jahre. Cour des comptes: 44 Jahre bringen 2035 9,7 Mrd. €, 42 Jahre kosten 7,1 Mrd. €.' },
          cotisation: { nom: 'Rentenbeitragssatz', f: (v) => points(v), repere: 'Cour des comptes: Ein Punkt bringt 4,8 bis 7,6 Mrd. € pro Jahr (6,2 angenommen), verteuert aber die Arbeit.' },
          sousIndexation: { nom: 'Rentenanpassung unter der Inflation', f: (v) => (v ? '−' + fmt(v) + ' Pkt./Jahr' : 'nein'),
            repere: 'Cour des comptes: Ein Punkt weniger spart 2,9 Mrd. € pro Jahr, die in den Folgejahren erhalten bleiben.' },
          anneesSousIndexation: { nom: 'Dauer der Unterindexierung', f: (v) => u.annees(v), repere: 'Ab 2027.' },
          retraites: { nom: 'Entwicklung des Rentensaldos', f: (v) => fmt(v, 0) + ' % des COR-Szenarios', repere: 'COR 2025: −0,1 Pp. des BIP im Jahr 2024, −0,2 im Jahr 2030, −1,4 im Jahr 2070.' },
          chomage: { nom: 'Angestrebte Arbeitslosenquote', f: (v) => pct(v), repere: 'Referenz: 7,4 %. 5 % zu erreichen brächte 30 bis 40 Mrd. € pro Jahr (35 angenommen), in 5 Jahren.' },
          seniors: { nom: 'Beschäftigungsquote der 55- bis 64-Jährigen', f: (v) => points(v),
            repere: 'DARES: 60,4 % im Jahr 2024. Annahme der Anwendung: +0,2 % des BIP pro Punkt, über 10 Jahre. Überschneidet sich teilweise mit dem Rentenalter.' },
          autonomie: { nom: 'Pflegeausgaben im Jahr 2070', f: (v) => pct(v) + ' des BIP', repere: 'Ageing Report: 1,9 % im Jahr 2022; 2,6 % (Referenz) bis 4,8 % (Risiko) im Jahr 2070.' },
          smic: { nom: 'Erhöhung des SMIC', f: (v) => (v ? `+${v} % (≈ ${euros(H.smic.netMensuel * (1 + v / 100))} netto)` : 'keine'),
            repere: `Etwa ${euros(H.smic.netMensuel)} netto pro Monat im Jahr 2026. Je Punkt: +${fmt(H.smic.recettesPoint, 2)} Mrd. € Beiträge und Steuern, −${fmt(H.smic.allegementsPoint)} Mrd. € zusätzliche Entlastungen, −${fmt(H.smic.publicPoint)} Mrd. € öffentliche Löhne.` },
          smicEmplois: { nom: 'Verlorene Stellen je Erhöhungspunkt', f: (v) => (v ? `${fmt(v * 1000, 0)} Stellen` : 'keine'),
            repere: 'Umstrittene Annahme: Die Schätzungen reichen von fast nichts bis zu zehntausenden Stellen je Punkt. Verlorene Stellen wirken über den Regler „Arbeitslosigkeit“.' },
          ruAdulte: { nom: 'Betrag je Erwachsenem', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'),
            repere: `${fmt(H.ru.adultes)} Millionen Erwachsene: 100 € pro Monat kosten ${mds(H.ru.adultes * 1.2)} pro Jahr. Zum Vergleich: RSA für eine alleinstehende Person rund 650 €.` },
          ruMineur: { nom: 'Betrag je Kind', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'),
            repere: `${fmt(H.ru.mineurs)} Millionen Minderjährige, an die Eltern gezahlt. Ersetzt die Familienleistungen.` },
          ruAides: { nom: 'Im Gegenzug gestrichene Leistungen', f: (v) => fmt(v, 0) + ' % des Ersetzbaren',
            repere: 'Eine Leistung wird im Verhältnis des Grundeinkommens zu ihrem Durchschnittsbetrag gestrichen: RSA, Aktivitätsprämie, AAH, Mindestrente, ASS, die Hälfte des Wohngelds, 80 % der Familienleistungen.' },
          ruFinancement: { nom: 'Durch eine eigene Abgabe finanzierter Anteil', f: (v) => fmt(v, 0) + ' %', repere: 'Zum Beispiel eine proportionale Steuer auf alle Einkommen. Ohne Wirkung auf die Wirtschaftstätigkeit berechnet.' },
          climat: { nom: 'Eingetretenes Klimarisiko', f: (v) => fmt(v, 0) + ' %', repere: 'France Stratégie: +10 Punkte Schulden im Jahr 2030, +15 im Jahr 2035. Ausmaß umstritten.' },
          crise: { nom: 'Kosten einer Krise', f: (v) => (v ? mds(v) : 'keine'), repere: 'Subprime, Covid, Energie: +200 bis +600 Mrd. € Schulden bei jedem Schock.' },
          anneeCrise: { nom: 'Jahr der Krise', f: (v) => String(v), repere: 'Kosten zu 60 % / 40 % auf zwei Jahre verteilt, mit BIP-Rückgang.' },
        },
        postes: {
          defense: { nom: 'Verteidigung', note: 'NATO-Zusage von 2025: 3,5 % des BIP im Jahr 2035, also etwa +7,6 % pro Jahr.' },
          enseignement: { nom: 'Bildung', note: 'Von der Grundschule bis zur Hochschule, davon 64 Mrd. € Sekundarstufe und 42 Mrd. € Primarstufe.' },
          sante: { nom: 'Gesundheit', note: 'Krankenhäuser, ambulante Versorgung, Arzneimittel.' },
          retraites: { nom: 'Renten', note: 'Altersrenten. Die Regler der Gruppe „Renten“ kommen hinzu.' },
          social: { nom: 'Sonstige soziale Sicherung', note: 'Arbeitslosigkeit (49 Mrd. €), Familie, Invalidität, Wohnen, Ausgrenzung. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.' },
          securite: { nom: 'Öffentliche Ordnung und Justiz', note: 'Polizei, Gendarmerie, Justiz, Gefängnisse, Feuerwehr.' },
          economie: { nom: 'Wirtschaftliche Angelegenheiten', note: 'Verkehr, Unternehmenshilfen, Energie, Landwirtschaft.' },
          general: { nom: 'Allgemeine Verwaltung', note: 'Allgemeine Verwaltung, EU-Beitrag, Grundlagenforschung. Ohne Zinsen.' },
          cadre: { nom: 'Wohnen, Umwelt, Kultur', note: 'Wohnungswesen und kommunale Einrichtungen, Umwelt, Kultur und Sport.' },
        },
        prereglages: {
          tendanciel: 'Basisszenario', plan: 'Haushaltsplan', taux: 'Hohe Zinsen', croissance: 'Starkes Wachstum',
          retraite65: 'Rente mit 65', effort: 'Geteilte Anstrengung', hauts: 'Hohe Einkommen besteuern',
          smic: 'SMIC +10 %', ru: 'Grundeinkommen', crise: 'Krise 2029',
        },
        nonVentile: (montant, annee) => `Nicht zugeordnet (Querschnittseinsparungen, SMIC im öffentlichen Dienst, Klima, Krise): ${montant} im Jahr ${annee}.`,
        methode: (d) => `
          <p>Jedes Jahr steigen die Schulden um das Defizit: Primärausgaben minus Einnahmen plus Zinsen. Das BIP wächst mit dem realen Wachstum und der Inflation; die Einnahmen folgen dem BIP; die Primärausgaben folgen ihrem eigenen Tempo.</p>
          <p><strong>Geschätzter Ausgangspunkt (Ende ${d.annee}):</strong> BIP ${mds(d.pib)}, Schulden ${mds(d.dette)} (${pct(d.ratio)} des BIP, Projektion der Cour des comptes), Defizit ${pct(-d.soldePib)} des BIP, Zinsen ${mds(d.interets)}. Der letzte gemessene Wert ist der des Insee für Ende 2025: ${mds(COMPTES_2025.dette, 1)}, ${pct(COMPTES_2025.ratio)} des BIP.</p>
          <p><strong>Eigene Annahmen der Anwendung, nicht aus den Quellen:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % des Schuldenstands werden jedes Jahr zum Marktzins refinanziert, neue Schulden vollständig. Diese Einstellung reproduziert die drei Zahlen des Senats auf 15 % genau.</li>
            <li>Die Streichung einer Steuervergünstigung bringt ${fmt(H.nichesRendement * 100, 0)} % ihrer ausgewiesenen Kosten.</li>
            <li>Die Streichung von Entlastungen bei den Arbeitgeberbeiträgen bringt ${fmt(H.allegementsRendement * 100, 0)} % ihres Betrags: Der Rest geht durch Stellen- und Lohnverluste verloren. Gestrichene Subventionen sind Nettoeinsparungen.</li>
            <li>Ein Punkt Beschäftigungsquote der Älteren erhöht das BIP um ${fmt(H.pibParPointSeniors)} %.</li>
            <li>Die Primärausgaben 2026 werden nach ihrem Gewicht von 2024 auf die Bereiche verteilt (Eurostat). Das für die Verteidigung genannte NATO-Ziel von 3,5 % des BIP stammt nicht aus den Quellen der Website.</li>
            <li>Die Erträge je Punkt jeder Einkommensteuerstufe sind Schätzungen der Anwendung, auf 30 % genau: Sie beruhen auf der Zahl der Haushalte und der durchschnittlichen Steuer je Stufe (DGFiP, Einkommen 2022) sowie auf vom Senat genannten Zahlen. Der Ertrag der Mindeststeuer auf Vermögen (10 Mrd. € brutto je Punkt) stammt aus der öffentlichen Debatte 2025, nicht aus den Quellen der Website.</li>
            <li>Die Mehrwertsteuer wird bei unverändertem Konsum berechnet: Eine Erhöhung verringert weder die Käufe noch das Wachstum, eine Senkung regt sie nicht an.</li>
            <li>Die Wirkungen von Rentenalter und Beitragsdauer sind die der Cour des comptes für ein Jahr, über ein Jahr hinaus proportional erweitert und bis 2035 schrittweise erreicht. Ihre Wirkung auf das BIP wird nur über die Einnahmen gezählt.</li>
            <li>Ein Punkt weniger Arbeitslosigkeit bringt ${fmt(H.chomagePoint[0] + H.chomagePoint[1])} Mrd. € pro Jahr, in ${H.monteeChomage} Jahren, ohne zusätzliche Wirkung auf das BIP.</li>
            <li>Die Wirkungen je Punkt SMIC-Erhöhung (Einnahmen, Entlastungen, öffentliche Löhne) sind Schätzungen der Anwendung, auf 50 % genau. Verlorene Stellen werden auf eine Erwerbsbevölkerung von ${fmt(H.smic.populationActive, 0)} Millionen in Arbeitslosigkeit umgerechnet. Wirkungen auf Konsum und Aktivitätsprämie werden nicht gezählt.</li>
            <li>Das Grundeinkommen wird an die gesamte Bevölkerung gezahlt und der „Sonstigen sozialen Sicherung“ zugeordnet. Die Beträge der ersetzten Leistungen (${mds(k.totalAides)} insgesamt) sind Größenordnungen von DREES und CNAF; ihre Kürzung folgt dem Verhältnis von Grundeinkommen und durchschnittlicher Leistung je Haushalt. Weder die Wirkung auf das Arbeitsangebot noch die Besteuerung des Grundeinkommens werden modelliert.</li>
            <li>Haushaltshebel wirken schrittweise über ${H.montee} Jahre und folgen danach dem BIP.</li>
            <li>Eine Krise senkt das BIP um 1 % je 100 Mrd. €, wovon die Hälfte im Folgejahr aufgeholt wird.</li>
            <li>Das „Basisszenario“ lässt die Primärausgaben mit dem Wachstum steigen: Es ist keine offizielle Prognose.</li>
          </ul>
          <p><strong>Was das Modell nicht berücksichtigt:</strong> die Wirkung von Einsparungen oder Steuererhöhungen auf das Wachstum, die Reaktion der Zinsen auf die Schuldenhöhe, inflationsindexierte Anleihen, Vermögensverkäufe und Abweichungen zwischen Defizit und Schuldenänderung.</p>`,
      };
    },
  };

  return { id: 'fr', modele, sources, pib2024: 2920, structure, textes };
});

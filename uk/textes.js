// Simulateur britannique : structure des curseurs (bornes, pas, préréglages) et textes
// de l'interface en quatre langues. Montants en livres sterling (Md£).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique;
  else racine.PAYS = fabrique(racine.DetteRoyaumeUni, racine.SOURCES);
})(globalThis, function (modele, sources) {
  const actifIR = (p) => p.ir40 > 40 || p.ir45 > 45 || p.irSurtaxe > 0 || p.societes > 25;
  const actifRU = (p) => p.ruAdulte > 0 || p.ruMineur > 0;

  const structure = {
    groupes: [
      { id: 'economie', curseurs: [
        { id: 'croissance', min: -1, max: 3, pas: 0.1 },
        { id: 'inflation', min: 0, max: 6, pas: 0.1 },
        { id: 'tauxMarche', min: 0, max: 8, pas: 0.1 },
      ] },
      { id: 'depenses', curseurs: [
        { id: 'depenses', min: -1, max: 3, pas: 0.1 },
        { id: 'economies', min: 0, max: 100, pas: 5 },
      ] },
      { id: 'postes', postes: true, min: -4, max: 8, pas: 0.1 },
      { id: 'recettes', curseurs: [
        { id: 'prelevements', min: -3, max: 4, pas: 0.1 },
        { id: 'fraude', min: 0, max: 20, pas: 0.5 },
      ] },
      { id: 'tva', curseurs: [
        { id: 'tva20', min: 15, max: 25, pas: 0.5 },
        { id: 'tva5', min: 0, max: 20, pas: 0.5 },
      ] },
      { id: 'ir', curseurs: [
        { id: 'ir20', min: 15, max: 30, pas: 0.5 },
        { id: 'ir40', min: 30, max: 55, pas: 0.5 },
        { id: 'ir45', min: 40, max: 65, pas: 0.5 },
        { id: 'irSurtaxe', min: 0, max: 20, pas: 1 },
        { id: 'irSeuil', min: 200000, max: 2000000, pas: 50000, actifSi: (p) => p.irSurtaxe > 0 },
        { id: 'nics8', min: 0, max: 15, pas: 0.5 },
        { id: 'nics15', min: 10, max: 20, pas: 0.5 },
        { id: 'societes', min: 15, max: 35, pas: 0.5 },
        { id: 'erosion', min: 0, max: 80, pas: 5, actifSi: actifIR },
      ] },
      { id: 'retraites', curseurs: [
        { id: 'ageLegal', min: -1, max: 3, pas: 0.25 },
        { id: 'sousIndexation', min: 0, max: 2, pas: 0.1 },
        { id: 'anneesSousIndexation', min: 1, max: 10, pas: 1, actifSi: (p) => p.sousIndexation > 0 },
        { id: 'retraites', min: 0, max: 200, pas: 10 },
      ] },
      { id: 'emploi', curseurs: [
        { id: 'chomage', min: 3, max: 9, pas: 0.1 },
        { id: 'dependance', min: 1.2, max: 3, pas: 0.1 },
      ] },
      { id: 'smi', curseurs: [
        { id: 'smi', min: 0, max: 25, pas: 1 },
        { id: 'smiEmplois', min: 0, max: 30, pas: 1, actifSi: (p) => p.smi > 0 },
      ] },
      { id: 'ru', curseurs: [
        { id: 'ruAdulte', min: 0, max: 1200, pas: 50 },
        { id: 'ruMineur', min: 0, max: 500, pas: 25 },
        { id: 'ruAides', min: 0, max: 100, pas: 5, actifSi: actifRU },
        { id: 'ruFinancement', min: 0, max: 100, pas: 5, actifSi: actifRU },
      ] },
      { id: 'chocs', curseurs: [
        { id: 'crise', min: 0, max: 500, pas: 25 },
        { id: 'anneeCrise', min: 2027, max: 2035, pas: 1, actifSi: (p) => p.crise > 0 },
      ] },
    ],
    prereglages: [
      { id: 'tendanciel', p: {} },
      // Approximation de l'application : recettes et dépenses calées sur l'emprunt de 1,8 % du PIB prévu par l'OBR pour 2030-31.
      { id: 'plans', p: { prelevements: 1.5, depenses: 0.5 } },
      { id: 'taux', p: { tauxMarche: 6 } },
      { id: 'inflation', p: { inflation: 4 } },
      { id: 'croissance', p: { croissance: 2.2 } },
      { id: 'retraite68', p: { ageLegal: 1 } },
      { id: 'tripleVerrou', p: { sousIndexation: 0.5, anneesSousIndexation: 10 } },
      { id: 'hauts', p: { ir40: 42, ir45: 50, irSurtaxe: 5, irSeuil: 500000 } },
      { id: 'ru', p: { ruAdulte: 500, ruMineur: 100, ruFinancement: 50 } },
      { id: 'crise', p: { crise: 150, anneeCrise: 2029 } },
    ],
  };

  const calc = (m) => ({
    smiSolde: (p) => {
      const s = m.effetSmi(p);
      return { s, solde: s.recettes - s.depenses - (m.H.chomagePoint[0] + m.H.chomagePoint[1]) * s.chomage };
    },
    totalAides: m.H.ru.aides.reduce((s, a) => s + a.montant, 0),
    agePlus: m.H.age.plus[0] + m.H.age.plus[1],
    chomagePt: m.H.chomagePoint[0] + m.H.chomagePoint[1],
    indexe: m.H.partIndexee * m.BASE.dette / 100,
  });

  const textes = {
    fr: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Effet${aTerme ? ' à terme' : ''} : ${mdsSigne(g)} par an, en livres de 2026.`);
      return {
        titreDoc: 'Dette britannique : projection à 10 ans',
        h1: 'Dette publique britannique : projection 2027-2036',
        groupes: {
          economie: { titre: 'Économie' },
          depenses: { titre: 'Dépenses' },
          postes: { titre: 'Dépenses par poste', intro: 'Rythme de chaque poste en volume. Sans réglage, tous suivent le rythme général ci-dessus.' },
          recettes: { titre: 'Recettes' },
          tva: { titre: 'TVA', intro: 'Taux normal et taux réduit (énergie domestique, sièges auto…). Effet immédiat, à consommation inchangée.',
            resume: (p) => effet(m.effetIVA(p), 'Taux inchangés.', false) },
          ir: { titre: 'Impôt sur le revenu, cotisations et sociétés',
            intro: `Barème 2026-27 (hors Écosse) : 20 % de ${euros(H.ir.seuils[0])} à ${euros(H.ir.seuils[1])}, 40 % jusqu’à ${euros(H.ir.seuils[2])}, 45 % au-delà. Seuils gelés jusqu’en 2031 : le « fiscal drag » alourdit l’impôt chaque année.`,
            resume: (p) => effet(m.effetImpot(p), 'Barème inchangé.') },
          retraites: { titre: 'Retraites', intro: 'Âge de la pension d’État porté de 66 à 67 ans entre 2026 et 2028. Le « triple verrou » revalorise la pension du plus élevé entre inflation, salaires et 2,5 %.' },
          emploi: { titre: 'Emploi et vieillissement' },
          smi: { titre: 'Salaire minimum (National Living Wage)', intro: '12,71 £ de l’heure depuis avril 2026, pour les 21 ans et plus. Hausse ajoutée à la revalorisation annuelle.',
            resume: (p) => {
              if (!p.smi) return 'Revalorisation annuelle inchangée.';
              const { s, solde } = k.smiSolde(p);
              return `Chômage ${points(s.chomage, 2)}. Effet à terme sur le solde : ${mdsSigne(solde)} par an, en livres de 2026.`;
            } },
          ru: { titre: 'Revenu universel',
            intro: 'Versé à chaque résident, sans condition. Il remplace les aides sous condition de ressources (Universal Credit, Pension Credit…) et le Child Benefit à hauteur de son montant ; la pension d’État n’est pas touchée.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Aucun revenu universel.';
              return `Coût brut ${mds(r.brut)}, aides supprimées −${mds(r.aides)}, coût net ${mds(r.net)} par an (${pct(r.net / BASE.pib * 100)} du PIB)`
                + (r.financement > 0.05 ? `, dont ${mds(r.financement)} couverts par le prélèvement dédié.` : '.');
            } },
          chocs: { titre: 'Chocs' },
        },
        curseurs: {
          croissance: { nom: 'Croissance du PIB en volume', f: (v) => pctAn(v), repere: 'Rythme moyen sur 10 ans, hors inflation. OBR : 1,2 % en 2026, 1,0 % en 2027.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: `Un quart des gilts est indexé sur l’inflation : un point de plus coûte environ ${mds(k.indexe)} d’intérêts par an.` },
          tauxMarche: { nom: 'Taux d’emprunt de l’État (gilts)', f: (v) => pct(v), repere: 'Taux moyen à l’émission, toutes maturités. Référence : 4,5 %.' },
          depenses: { nom: 'Dépense publique hors intérêts, en volume', f: (v) => pctAn(v), repere: 'Référence : au rythme de la croissance. Les plans du gouvernement sont plus serrés (préréglage « Plans du gouvernement »).' },
          economies: { nom: 'Économies pérennes supplémentaires', f: (v) => mds(v), repere: 'En Md£ de 2026, atteints en 3 ans. Marge de l’OBR sur la règle budgétaire : 15 Md£ en 2029-30.' },
          prelevements: { nom: 'Taux de recettes publiques', f: (v) => signe(v) + ' pt de PIB', repere: 'Recettes d’environ 40,6 % du PIB (estimation). L’OBR prévoit une pression fiscale record, portée par le gel des seuils.' },
          fraude: { nom: 'Fraude et évasion recouvrées en plus', f: (v) => `+${fmt(v)} Md£/an`, repere: 'HMRC : écart fiscal (« tax gap ») d’environ 46,8 Md£ par an, 5,3 % des impôts dus.' },
          tva20: { nom: 'Taux normal', f: (v) => pct(v), repere: `Actuel : 20 %. Un point ≈ ${fmt(H.tva.parPoint[0])} Md£.` },
          tva5: { nom: 'Taux réduit', f: (v) => pct(v), repere: `Actuel : 5 %. Énergie domestique, produits pour enfants. Un point ≈ ${fmt(H.tva.parPoint[1])} Md£ (estimation). L’alimentation est au taux zéro.` },
          ir20: { nom: 'Taux de base', f: (v) => pct(v), repere: `Actuel : 20 %. Un penny ≈ ${fmt(H.ir.parPoint[0])} Md£ en 2026-27 (HMRC).` },
          ir40: { nom: 'Taux supérieur', f: (v) => pct(v), repere: `Actuel : 40 % au-delà de ${euros(H.ir.seuils[1])}. Un penny ≈ ${fmt(H.ir.parPoint[1])} Md£.` },
          ir45: { nom: 'Taux additionnel', f: (v) => pct(v), repere: `Actuel : 45 % au-delà de ${euros(H.ir.seuils[2])}. Un penny ≈ ${fmt(H.ir.parPoint[2], 2)} Md£.` },
          irSurtaxe: { nom: 'Nouvelle tranche supérieure', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'aucune'), repere: 'Taux ajouté à celui de la dernière tranche, au-delà du seuil ci-dessous.' },
          irSeuil: { nom: 'Seuil de la nouvelle tranche', f: (v) => euros(v), repere: 'Plus le seuil est haut, moins il reste de revenus à taxer.' },
          nics8: { nom: 'Cotisations salariales (NICs)', f: (v) => pct(v), repere: `Actuel : 8 %. Un point ≈ ${fmt(H.nics.parPoint[0], 2)} Md£. Ramenées de 12 % à 8 % en 2024.` },
          nics15: { nom: 'Cotisations patronales (NICs)', f: (v) => pct(v), repere: `Actuel : 15 % depuis avril 2025. Un point ≈ ${fmt(H.nics.parPoint[1])} Md£ net des effets sur les salaires (IFS).` },
          societes: { nom: 'Impôt sur les sociétés', f: (v) => pct(v), repere: `Taux principal : 25 % depuis 2023. Un point ≈ ${fmt(H.societes.parPoint)} Md£ (estimation).` },
          erosion: { nom: 'Réaction des contribuables', f: (v) => `−${fmt(v, 0)} % du gain`, repere: 'Part du gain perdue par départs, optimisation ou moindre activité. S’applique aux hausses sur les hauts revenus et les sociétés.' },
          ageLegal: { nom: 'Âge de la pension d’État', f: (v) => ansMois(67 + v), repere: `Référence : 67 ans à partir de 2028 ; 68 ans prévus entre 2044 et 2046. Estimation de l’application : un an de plus rapporte environ ${fmt(k.agePlus, 0)} Md£ en 2035.` },
          sousIndexation: { nom: 'Pension d’État revalorisée sous le triple verrou', f: (v) => (v ? '−' + fmt(v) + ' pt/an' : 'non'), repere: `Pension d’État : environ 154 Md£ en 2026-27, +4,8 % en avril 2026. Un point de moins économise environ ${fmt(H.sousIndexationPoint)} Md£ par an, acquis ensuite.` },
          anneesSousIndexation: { nom: 'Durée de la sous-indexation', f: (v) => u.annees(v), repere: 'À partir de 2027.' },
          retraites: { nom: 'Dérive de la pension d’État', f: (v) => fmt(v, 0) + ' % de la projection', repere: 'OBR (2025) : d’environ 5 % du PIB aujourd’hui à 7,7 % au début des années 2070, dont 1,6 point dû au triple verrou.' },
          chomage: { nom: 'Taux de chômage visé', f: (v) => pct(v), repere: `Référence : 4,7 % (ONS, juin-août 2026). Un point en moins rapporte environ ${fmt(k.chomagePt, 0)} Md£ par an (estimation).` },
          dependance: { nom: 'Soins de longue durée en 2050', f: (v) => pct(v) + ' du PIB', repere: 'Aide sociale aux adultes : environ 1,2 % du PIB, 1,7 % retenu pour 2050 (hypothèse).' },
          smi: { nom: 'Hausse du salaire minimum', f: (v) => (v ? `+${v} % (≈ ${fmt(H.smi.horaire * (1 + v / 100), 2)} £/h)` : 'aucune'), repere: `Par point : +${fmt(H.smi.recettesPoint, 2)} Md£ d’impôts, de cotisations et de crédits sociaux en moins, −${fmt(H.smi.publicPoint, 2)} Md£ de salaires publics et de soins (estimations).` },
          smiEmplois: { nom: 'Emplois perdus par point de hausse', f: (v) => (v ? `${fmt(v * 1000, 0)} emplois` : 'aucun'), repere: 'Hypothèse débattue : la Low Pay Commission a constaté peu d’effets sur l’emploi des hausses passées. Les emplois perdus passent par le levier « chômage ».' },
          ruAdulte: { nom: 'Montant par adulte', f: (v) => (v ? euros(v) + '/mois' : 'aucun'), repere: `${fmt(H.ru.adultes)} millions d’adultes : 100 £ par mois coûtent ${mds(H.ru.adultes * 1.2)} par an.` },
          ruMineur: { nom: 'Montant par mineur', f: (v) => (v ? euros(v) + '/mois' : 'aucun'), repere: `${fmt(H.ru.mineurs)} millions de mineurs. Remplace le Child Benefit (environ 113 £ par mois pour le premier enfant).` },
          ruAides: { nom: 'Aides supprimées en contrepartie', f: (v) => fmt(v, 0) + ' % de l’absorbable', repere: 'Une aide est supprimée en proportion du revenu universel rapporté à son montant moyen : Universal Credit, Pension Credit, Carer’s Allowance, Child Benefit, la moitié des aides au logement.' },
          ruFinancement: { nom: 'Part financée par un prélèvement dédié', f: (v) => fmt(v, 0) + ' %', repere: 'Impôt proportionnel sur tous les revenus, par exemple. Calculé sans effet sur l’activité.' },
          crise: { nom: 'Coût d’une crise', f: (v) => (v ? mds(v) : 'aucune'), repere: 'Covid : l’emprunt a atteint environ 15 % du PIB en 2020-21.' },
          anneeCrise: { nom: 'Année de la crise', f: (v) => String(v), repere: 'Coût réparti 60 % / 40 % sur deux ans, avec recul du PIB.' },
        },
        postes: {
          defense: { nom: 'Défense', note: 'Objectif : 2,5 % du PIB en 2027, 3,5 % pour la défense de base d’ici 2035 (engagement OTAN).' },
          enseignement: { nom: 'Enseignement', note: 'Écoles, universités, formation.' },
          sante: { nom: 'Santé', note: 'NHS en Angleterre et dans les nations décentralisées.' },
          retraites: { nom: 'Retraites', note: 'Pension d’État et Pension Credit. Les curseurs du groupe « Retraites » s’y ajoutent.' },
          social: { nom: 'Autre protection sociale', note: 'Universal Credit, invalidité, logement, famille. Le revenu universel, net des aides qu’il remplace, s’y ajoute.' },
          securite: { nom: 'Sécurité et justice', note: 'Police, justice, prisons.' },
          economie: { nom: 'Affaires économiques', note: 'Transports, énergie, aides aux entreprises, recherche appliquée.' },
          general: { nom: 'Services généraux', note: 'Administration générale, aide internationale. Hors intérêts.' },
          cadre: { nom: 'Logement, environnement, culture', note: 'Logement, collectivités, environnement, culture et sport.' },
        },
        prereglages: {
          tendanciel: 'Tendanciel', plans: 'Plans du gouvernement (OBR)', taux: 'Taux élevés', inflation: 'Inflation à 4 %',
          croissance: 'Croissance forte', retraite68: 'Pension à 68 ans', tripleVerrou: 'Triple verrou allégé',
          hauts: 'Taxer les hauts revenus', ru: 'Revenu universel', crise: 'Crise en 2029',
        },
        nonVentile: (montant, annee) => `Non ventilé (économies transversales, salaire minimum dans le secteur public, crise) : ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Même méthode que les autres simulateurs. Chaque année, la dette augmente du déficit : dépenses hors intérêts, moins recettes, plus intérêts. Le PIB progresse de la croissance en volume et de l’inflation ; les recettes suivent le PIB ; les dépenses hors intérêts suivent leur propre rythme.</p>
          <p><strong>Particularités britanniques :</strong> la dette suivie est la dette nette du secteur public (PSND), mesure de référence de l’OBR, et non la dette brute au sens de Maastricht ; les années sont des exercices d’avril à mars (« 2027 » = 2027-28) ; les montants sont en milliards de livres.</p>
          <p><strong>Point de départ estimé (fin de l’exercice ${d.annee}-${String(d.annee + 1).slice(2)}) :</strong> PIB ${mds(d.pib)}, dette ${mds(d.dette)} (${pct(d.ratio)} du PIB, OBR, octobre 2026), emprunt ${pct(-d.soldePib)} du PIB, intérêts ${mds(d.interets)}. Dernier chiffre mesuré : ${pct(COMPTES_2025.ratio)} du PIB fin mars 2026 (ONS).</p>
          <p><strong>Hypothèses propres à l’application, non tirées des sources :</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % de l’encours est refinancé chaque année au taux de marché, et toute dette nouvelle l’est en totalité : les gilts sont longs, mais les rachats de la Banque d’Angleterre, financés par des réserves au taux directeur, raccourcissent la maturité effective.</li>
            <li>${fmt(H.partIndexee * 100, 0)} % de la dette est indexée sur l’inflation : chaque point d’inflation au-dessus de la référence ajoute ${fmt(H.partIndexee)} % de la dette aux intérêts.</li>
            <li>Les intérêts de départ (${mds(d.interets)}) sont interpolés entre 109 Md£ en 2025-26 et 160 Md£ prévus en 2031-32 ; le taux de recettes (40,6 % du PIB) et les montants par poste (PESA) sont des ordres de grandeur.</li>
            <li>Les rendements par point de l’impôt sur le revenu, des cotisations et de la TVA reprennent les chiffrages HMRC et IFS ; ceux du taux réduit de TVA et de l’impôt sur les sociétés sont des estimations.</li>
            <li>Un an d’âge de pension vaut ${fmt(k.agePlus)} Md£ par an en 2035 ; un point de chômage ${fmt(k.chomagePt)} Md£ ; les aides remplacées par le revenu universel totalisent ${mds(k.totalAides)} : ordres de grandeur.</li>
            <li>Les leviers budgétaires montent en charge sur ${H.montee} ans, puis suivent le PIB. Une crise réduit le PIB de 1 % par tranche de 100 Md£, dont la moitié est rattrapée l’année suivante.</li>
            <li>Le « tendanciel » maintient les dépenses hors intérêts au rythme de la croissance et les recettes constantes en part du PIB : il ignore le gel des seuils et les plans de dépenses, que l’OBR intègre. Le préréglage « Plans du gouvernement » s’en approche : emprunt d’environ 1,8 % du PIB en 2030-31.</li>
          </ul>
          <p><strong>Ce que le modèle ignore :</strong> l’effet des économies et des impôts sur la croissance, la réaction des taux au niveau de dette, les pertes de la Banque d’Angleterre sur ses rachats d’actifs et les écarts entre emprunt et variation de la dette nette.</p>`,
      };
    },

    en: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Long-run effect' : 'Effect'}: ${mdsSigne(g)} a year, in 2026 pounds.`);
      return {
        titreDoc: 'UK public debt: 10-year projection',
        h1: 'UK public debt: projection 2027-2036',
        groupes: {
          economie: { titre: 'Economy' },
          depenses: { titre: 'Spending' },
          postes: { titre: 'Spending by function', intro: 'Real growth of each function. Left untouched, they all follow the overall pace above.' },
          recettes: { titre: 'Revenue' },
          tva: { titre: 'VAT', intro: 'Standard rate and reduced rate (domestic energy, car seats…). Immediate effect, with unchanged consumption.',
            resume: (p) => effet(m.effetIVA(p), 'Rates unchanged.', false) },
          ir: { titre: 'Income tax, National Insurance and corporation tax',
            intro: `2026-27 schedule (outside Scotland): 20% from ${euros(H.ir.seuils[0])} to ${euros(H.ir.seuils[1])}, 40% up to ${euros(H.ir.seuils[2])}, 45% above. Thresholds frozen until 2031: fiscal drag raises the tax take every year.`,
            resume: (p) => effet(m.effetImpot(p), 'Schedule unchanged.') },
          retraites: { titre: 'Pensions', intro: 'State Pension age rising from 66 to 67 between 2026 and 2028. The triple lock uprates the pension by the highest of inflation, earnings and 2.5%.' },
          emploi: { titre: 'Jobs and ageing' },
          smi: { titre: 'Minimum wage (National Living Wage)', intro: '£12.71 an hour since April 2026, for those aged 21 and over. Increase on top of the annual uprating.',
            resume: (p) => {
              if (!p.smi) return 'Annual uprating unchanged.';
              const { s, solde } = k.smiSolde(p);
              return `Unemployment ${points(s.chomage, 2)}. Long-run effect on the balance: ${mdsSigne(solde)} a year, in 2026 pounds.`;
            } },
          ru: { titre: 'Universal basic income',
            intro: 'Paid to every resident, unconditionally. It replaces means-tested benefits (Universal Credit, Pension Credit…) and Child Benefit up to its amount; the State Pension is untouched.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'No universal basic income.';
              return `Gross cost ${mds(r.brut)}, benefits removed −${mds(r.aides)}, net cost ${mds(r.net)} a year (${pct(r.net / BASE.pib * 100)} of GDP)`
                + (r.financement > 0.05 ? `, of which ${mds(r.financement)} covered by the dedicated levy.` : '.');
            } },
          chocs: { titre: 'Shocks' },
        },
        curseurs: {
          croissance: { nom: 'Real GDP growth', f: (v) => pctAn(v), repere: '10-year average, excluding inflation. OBR: 1.2% in 2026, 1.0% in 2027.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: `A quarter of gilts are index-linked: one more point costs about ${mds(k.indexe)} of interest a year.` },
          tauxMarche: { nom: 'Government borrowing rate (gilts)', f: (v) => pct(v), repere: 'Average issuance rate across maturities. Reference: 4.5%.' },
          depenses: { nom: 'Primary public spending, real terms', f: (v) => pctAn(v), repere: 'Reference: in line with growth. Government plans are tighter (“Government plans” preset).' },
          economies: { nom: 'Additional permanent savings', f: (v) => mds(v), repere: 'In 2026 £bn, reached over 3 years. OBR headroom against the fiscal rule: £15bn in 2029-30.' },
          prelevements: { nom: 'Public revenue ratio', f: (v) => signe(v) + ' pp of GDP', repere: 'Receipts of about 40.6% of GDP (estimate). The OBR expects a record tax burden, driven by frozen thresholds.' },
          fraude: { nom: 'Extra fraud and evasion recovered', f: (v) => `+£${fmt(v)}bn/yr`, repere: 'HMRC: a tax gap of about £46.8bn a year, 5.3% of tax due.' },
          tva20: { nom: 'Standard rate', f: (v) => pct(v), repere: `Current: 20%. One point ≈ £${fmt(H.tva.parPoint[0])}bn.` },
          tva5: { nom: 'Reduced rate', f: (v) => pct(v), repere: `Current: 5%. Domestic energy, children’s products. One point ≈ £${fmt(H.tva.parPoint[1])}bn (estimate). Food is zero-rated.` },
          ir20: { nom: 'Basic rate', f: (v) => pct(v), repere: `Current: 20%. One penny ≈ £${fmt(H.ir.parPoint[0])}bn in 2026-27 (HMRC).` },
          ir40: { nom: 'Higher rate', f: (v) => pct(v), repere: `Current: 40% above ${euros(H.ir.seuils[1])}. One penny ≈ £${fmt(H.ir.parPoint[1])}bn.` },
          ir45: { nom: 'Additional rate', f: (v) => pct(v), repere: `Current: 45% above ${euros(H.ir.seuils[2])}. One penny ≈ £${fmt(H.ir.parPoint[2], 2)}bn.` },
          irSurtaxe: { nom: 'New top bracket', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'none'), repere: 'Rate added to the top bracket, above the threshold below.' },
          irSeuil: { nom: 'Threshold of the new bracket', f: (v) => euros(v), repere: 'The higher the threshold, the less income is left to tax.' },
          nics8: { nom: 'Employee National Insurance', f: (v) => pct(v), repere: `Current: 8%. One point ≈ £${fmt(H.nics.parPoint[0], 2)}bn. Cut from 12% to 8% in 2024.` },
          nics15: { nom: 'Employer National Insurance', f: (v) => pct(v), repere: `Current: 15% since April 2025. One point ≈ £${fmt(H.nics.parPoint[1])}bn net of wage effects (IFS).` },
          societes: { nom: 'Corporation tax', f: (v) => pct(v), repere: `Main rate: 25% since 2023. One point ≈ £${fmt(H.societes.parPoint)}bn (estimate).` },
          erosion: { nom: 'Taxpayer response', f: (v) => `−${fmt(v, 0)}% of the gain`, repere: 'Share of the gain lost to emigration, tax planning or lower activity. Applies to increases on high incomes and corporation tax.' },
          ageLegal: { nom: 'State Pension age', f: (v) => ansMois(67 + v), repere: `Reference: 67 from 2028; 68 planned between 2044 and 2046. App estimate: one more year yields about £${fmt(k.agePlus, 0)}bn in 2035.` },
          sousIndexation: { nom: 'State Pension uprated below the triple lock', f: (v) => (v ? '−' + fmt(v) + ' pt/yr' : 'no'), repere: `State Pension: about £154bn in 2026-27, +4.8% in April 2026. One point less saves about £${fmt(H.sousIndexationPoint)}bn a year, kept thereafter.` },
          anneesSousIndexation: { nom: 'Length of under-indexation', f: (v) => u.annees(v), repere: 'From 2027.' },
          retraites: { nom: 'State Pension drift', f: (v) => fmt(v, 0) + '% of the projection', repere: 'OBR (2025): from about 5% of GDP today to 7.7% in the early 2070s, 1.6 points of it due to the triple lock.' },
          chomage: { nom: 'Target unemployment rate', f: (v) => pct(v), repere: `Reference: 4.7% (ONS, June-August 2026). One point less yields about £${fmt(k.chomagePt, 0)}bn a year (estimate).` },
          dependance: { nom: 'Social care spending in 2050', f: (v) => pct(v) + ' of GDP', repere: 'Adult social care: about 1.2% of GDP, 1.7% assumed for 2050.' },
          smi: { nom: 'Minimum wage increase', f: (v) => (v ? `+${v}% (≈ £${fmt(H.smi.horaire * (1 + v / 100), 2)}/h)` : 'none'), repere: `Per point: +£${fmt(H.smi.recettesPoint, 2)}bn of taxes, contributions and lower Universal Credit, −£${fmt(H.smi.publicPoint, 2)}bn of public-sector and care wages (estimates).` },
          smiEmplois: { nom: 'Jobs lost per point of increase', f: (v) => (v ? `${fmt(v * 1000, 0)} jobs` : 'none'), repere: 'Disputed assumption: the Low Pay Commission has found little job loss from past rises. Lost jobs feed the “unemployment” lever.' },
          ruAdulte: { nom: 'Amount per adult', f: (v) => (v ? euros(v) + '/month' : 'none'), repere: `${fmt(H.ru.adultes)} million adults: £100 a month costs ${mds(H.ru.adultes * 1.2)} a year.` },
          ruMineur: { nom: 'Amount per child', f: (v) => (v ? euros(v) + '/month' : 'none'), repere: `${fmt(H.ru.mineurs)} million children. Replaces Child Benefit (about £113 a month for the first child).` },
          ruAides: { nom: 'Benefits removed in return', f: (v) => fmt(v, 0) + '% of what can be absorbed', repere: 'A benefit is removed in proportion to the basic income relative to its average amount: Universal Credit, Pension Credit, Carer’s Allowance, Child Benefit, half of housing support.' },
          ruFinancement: { nom: 'Share funded by a dedicated levy', f: (v) => fmt(v, 0) + '%', repere: 'A flat tax on all income, for instance. Computed with no effect on activity.' },
          crise: { nom: 'Cost of a crisis', f: (v) => (v ? mds(v) : 'none'), repere: 'Covid: borrowing reached about 15% of GDP in 2020-21.' },
          anneeCrise: { nom: 'Year of the crisis', f: (v) => String(v), repere: 'Cost split 60% / 40% over two years, with a fall in GDP.' },
        },
        postes: {
          defense: { nom: 'Defence', note: 'Target: 2.5% of GDP in 2027, 3.5% on core defence by 2035 (NATO pledge).' },
          enseignement: { nom: 'Education', note: 'Schools, universities, training.' },
          sante: { nom: 'Health', note: 'The NHS in England and the devolved nations.' },
          retraites: { nom: 'Pensions', note: 'State Pension and Pension Credit. The “Pensions” sliders add to it.' },
          social: { nom: 'Other social protection', note: 'Universal Credit, disability, housing, family. Universal basic income, net of the benefits it replaces, is added here.' },
          securite: { nom: 'Public order and justice', note: 'Police, courts, prisons.' },
          economie: { nom: 'Economic affairs', note: 'Transport, energy, business support, applied research.' },
          general: { nom: 'General services', note: 'General administration, international aid. Excluding interest.' },
          cadre: { nom: 'Housing, environment, culture', note: 'Housing, local services, environment, culture and sport.' },
        },
        prereglages: {
          tendanciel: 'Baseline', plans: 'Government plans (OBR)', taux: 'High rates', inflation: 'Inflation at 4%',
          croissance: 'Strong growth', retraite68: 'Pension age 68', tripleVerrou: 'Lighter triple lock',
          hauts: 'Tax top incomes', ru: 'Basic income', crise: 'Crisis in 2029',
        },
        nonVentile: (montant, annee) => `Not allocated (across-the-board savings, public-sector minimum wage, crisis): ${montant} in ${annee}.`,
        methode: (d) => `
          <p>Same method as the other simulators. Each year, debt rises by the deficit: primary spending, minus revenue, plus interest. GDP grows with real growth and inflation; revenue tracks GDP; primary spending follows its own path.</p>
          <p><strong>UK specifics:</strong> the debt measure is public sector net debt (PSND), the OBR’s headline measure, not Maastricht gross debt; years are fiscal years from April to March (“2027” = 2027-28); amounts are in billions of pounds.</p>
          <p><strong>Estimated starting point (end of fiscal year ${d.annee}-${String(d.annee + 1).slice(2)}):</strong> GDP ${mds(d.pib)}, debt ${mds(d.dette)} (${pct(d.ratio)} of GDP, OBR, October 2026), borrowing ${pct(-d.soldePib)} of GDP, interest ${mds(d.interets)}. Latest outturn: ${pct(COMPTES_2025.ratio)} of GDP at end-March 2026 (ONS).</p>
          <p><strong>Assumptions specific to the app, not taken from the sources:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)}% of the debt stock is refinanced each year at the market rate, and all new debt is: gilts are long, but Bank of England asset purchases, financed by reserves paid Bank Rate, shorten the effective maturity.</li>
            <li>${fmt(H.partIndexee * 100, 0)}% of debt is index-linked: each point of inflation above the reference adds ${fmt(H.partIndexee)}% of debt to interest.</li>
            <li>Starting interest (${mds(d.interets)}) is interpolated between £109bn in 2025-26 and £160bn forecast for 2031-32; the revenue ratio (40.6% of GDP) and amounts by function (PESA) are orders of magnitude.</li>
            <li>Per-point yields of income tax, National Insurance and VAT follow HMRC and IFS costings; those of the reduced VAT rate and corporation tax are estimates.</li>
            <li>One year of pension age is worth £${fmt(k.agePlus)}bn a year in 2035; one point of unemployment £${fmt(k.chomagePt)}bn; benefits replaced by basic income total ${mds(k.totalAides)}: orders of magnitude.</li>
            <li>Fiscal levers phase in over ${H.montee} years, then grow with GDP. A crisis cuts GDP by 1% per £100bn, half of which is recovered the following year.</li>
            <li>The “baseline” keeps primary spending growing with the economy and revenue constant as a share of GDP: it ignores frozen thresholds and spending plans, which the OBR includes. The “Government plans” preset approximates them: borrowing of about 1.8% of GDP in 2030-31.</li>
          </ul>
          <p><strong>What the model ignores:</strong> the effect of savings and taxes on growth, the response of interest rates to the debt level, Bank of England losses on asset purchases, and gaps between borrowing and the change in net debt.</p>`,
      };
    },

    es: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Efecto${aTerme ? ' a largo plazo' : ''}: ${mdsSigne(g)} al año, en libras de 2026.`);
      return {
        titreDoc: 'Deuda pública británica: proyección a 10 años',
        h1: 'Deuda pública británica: proyección 2027-2036',
        groupes: {
          economie: { titre: 'Economía' },
          depenses: { titre: 'Gasto' },
          postes: { titre: 'Gasto por función', intro: 'Crecimiento real de cada función. Sin ajustes, todas siguen el ritmo general indicado arriba.' },
          recettes: { titre: 'Ingresos' },
          tva: { titre: 'IVA', intro: 'Tipo general y tipo reducido (energía doméstica, sillas de coche…). Efecto inmediato, con consumo constante.',
            resume: (p) => effet(m.effetIVA(p), 'Tipos sin cambios.', false) },
          ir: { titre: 'Impuesto sobre la renta, cotizaciones y sociedades',
            intro: `Tarifa 2026-27 (fuera de Escocia): 20 % de ${euros(H.ir.seuils[0])} a ${euros(H.ir.seuils[1])}, 40 % hasta ${euros(H.ir.seuils[2])}, 45 % por encima. Umbrales congelados hasta 2031: la progresividad en frío eleva la recaudación cada año.`,
            resume: (p) => effet(m.effetImpot(p), 'Tarifa sin cambios.') },
          retraites: { titre: 'Pensiones', intro: 'La edad de la pensión estatal sube de 66 a 67 años entre 2026 y 2028. El «triple candado» revaloriza la pensión con el mayor de inflación, salarios y 2,5 %.' },
          emploi: { titre: 'Empleo y envejecimiento' },
          smi: { titre: 'Salario mínimo (National Living Wage)', intro: '12,71 £ por hora desde abril de 2026, para mayores de 21 años. Subida añadida a la revalorización anual.',
            resume: (p) => {
              if (!p.smi) return 'Revalorización anual sin cambios.';
              const { s, solde } = k.smiSolde(p);
              return `Paro ${points(s.chomage, 2)}. Efecto a largo plazo sobre el saldo: ${mdsSigne(solde)} al año, en libras de 2026.`;
            } },
          ru: { titre: 'Renta básica universal',
            intro: 'Pagada a cada residente, sin condiciones. Sustituye las ayudas sujetas a recursos (Universal Credit, Pension Credit…) y el Child Benefit hasta su importe; la pensión estatal no se toca.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Sin renta básica.';
              return `Coste bruto ${mds(r.brut)}, ayudas suprimidas −${mds(r.aides)}, coste neto ${mds(r.net)} al año (${pct(r.net / BASE.pib * 100)} del PIB)`
                + (r.financement > 0.05 ? `, de los que ${mds(r.financement)} cubiertos por el impuesto específico.` : '.');
            } },
          chocs: { titre: 'Perturbaciones' },
        },
        curseurs: {
          croissance: { nom: 'Crecimiento real del PIB', f: (v) => pctAn(v), repere: 'Media a 10 años, sin inflación. OBR: 1,2 % en 2026 y 1,0 % en 2027.' },
          inflation: { nom: 'Inflación', f: (v) => pctAn(v), repere: `Una cuarta parte de los gilts está indexada a la inflación: un punto más cuesta unos ${mds(k.indexe)} de intereses al año.` },
          tauxMarche: { nom: 'Tipo de emisión del Estado (gilts)', f: (v) => pct(v), repere: 'Tipo medio de emisión, todos los plazos. Referencia: 4,5 %.' },
          depenses: { nom: 'Gasto público primario, en volumen', f: (v) => pctAn(v), repere: 'Referencia: al ritmo del crecimiento. Los planes del Gobierno son más estrictos (escenario «Planes del Gobierno»).' },
          economies: { nom: 'Ahorros permanentes adicionales', f: (v) => mds(v), repere: 'En mil M£ de 2026, alcanzados en 3 años. Margen de la OBR frente a la regla fiscal: 15 mil M£ en 2029-30.' },
          prelevements: { nom: 'Ratio de ingresos públicos', f: (v) => signe(v) + ' pp del PIB', repere: 'Ingresos de en torno al 40,6 % del PIB (estimación). La OBR prevé una presión fiscal récord, impulsada por la congelación de umbrales.' },
          fraude: { nom: 'Fraude y evasión recuperados adicionales', f: (v) => `+${fmt(v)} mil M£/año`, repere: 'HMRC: brecha fiscal («tax gap») de unos 46,8 mil M£ al año, el 5,3 % de los impuestos debidos.' },
          tva20: { nom: 'Tipo general', f: (v) => pct(v), repere: `Actual: 20 %. Un punto ≈ ${fmt(H.tva.parPoint[0])} mil M£.` },
          tva5: { nom: 'Tipo reducido', f: (v) => pct(v), repere: `Actual: 5 %. Energía doméstica, productos infantiles. Un punto ≈ ${fmt(H.tva.parPoint[1])} mil M£ (estimación). Los alimentos tributan al tipo cero.` },
          ir20: { nom: 'Tipo básico', f: (v) => pct(v), repere: `Actual: 20 %. Un penique ≈ ${fmt(H.ir.parPoint[0])} mil M£ en 2026-27 (HMRC).` },
          ir40: { nom: 'Tipo superior', f: (v) => pct(v), repere: `Actual: 40 % por encima de ${euros(H.ir.seuils[1])}. Un penique ≈ ${fmt(H.ir.parPoint[1])} mil M£.` },
          ir45: { nom: 'Tipo adicional', f: (v) => pct(v), repere: `Actual: 45 % por encima de ${euros(H.ir.seuils[2])}. Un penique ≈ ${fmt(H.ir.parPoint[2], 2)} mil M£.` },
          irSurtaxe: { nom: 'Nuevo tramo superior', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'ninguno'), repere: 'Tipo añadido al del último tramo, por encima del umbral siguiente.' },
          irSeuil: { nom: 'Umbral del nuevo tramo', f: (v) => euros(v), repere: 'Cuanto más alto el umbral, menos renta queda por gravar.' },
          nics8: { nom: 'Cotizaciones de los asalariados (NICs)', f: (v) => pct(v), repere: `Actual: 8 %. Un punto ≈ ${fmt(H.nics.parPoint[0], 2)} mil M£. Rebajadas del 12 % al 8 % en 2024.` },
          nics15: { nom: 'Cotizaciones empresariales (NICs)', f: (v) => pct(v), repere: `Actual: 15 % desde abril de 2025. Un punto ≈ ${fmt(H.nics.parPoint[1])} mil M£ netos de efectos sobre los salarios (IFS).` },
          societes: { nom: 'Impuesto sobre sociedades', f: (v) => pct(v), repere: `Tipo principal: 25 % desde 2023. Un punto ≈ ${fmt(H.societes.parPoint)} mil M£ (estimación).` },
          erosion: { nom: 'Reacción de los contribuyentes', f: (v) => `−${fmt(v, 0)} % de la ganancia`, repere: 'Parte de la ganancia perdida por marchas, optimización o menor actividad. Se aplica a las subidas sobre rentas altas y sociedades.' },
          ageLegal: { nom: 'Edad de la pensión estatal', f: (v) => ansMois(67 + v), repere: `Referencia: 67 años desde 2028; 68 previstos entre 2044 y 2046. Estimación de la aplicación: un año más aporta unos ${fmt(k.agePlus, 0)} mil M£ en 2035.` },
          sousIndexation: { nom: 'Pensión estatal revalorizada por debajo del triple candado', f: (v) => (v ? '−' + fmt(v) + ' pt/año' : 'no'), repere: `Pensión estatal: unos 154 mil M£ en 2026-27, +4,8 % en abril de 2026. Un punto menos ahorra unos ${fmt(H.sousIndexationPoint)} mil M£ al año, que se consolidan.` },
          anneesSousIndexation: { nom: 'Duración de la subindexación', f: (v) => u.annees(v), repere: 'A partir de 2027.' },
          retraites: { nom: 'Deriva de la pensión estatal', f: (v) => fmt(v, 0) + ' % de la proyección', repere: 'OBR (2025): de en torno al 5 % del PIB hoy al 7,7 % a principios de la década de 2070, 1,6 puntos de ellos por el triple candado.' },
          chomage: { nom: 'Tasa de paro objetivo', f: (v) => pct(v), repere: `Referencia: 4,7 % (ONS, junio-agosto de 2026). Un punto menos aporta unos ${fmt(k.chomagePt, 0)} mil M£ al año (estimación).` },
          dependance: { nom: 'Cuidados de larga duración en 2050', f: (v) => pct(v) + ' del PIB', repere: 'Atención social a adultos: en torno al 1,2 % del PIB; se supone un 1,7 % en 2050.' },
          smi: { nom: 'Subida del salario mínimo', f: (v) => (v ? `+${v} % (≈ ${fmt(H.smi.horaire * (1 + v / 100), 2)} £/h)` : 'ninguna'), repere: `Por punto: +${fmt(H.smi.recettesPoint, 2)} mil M£ de impuestos, cotizaciones y menor Universal Credit, −${fmt(H.smi.publicPoint, 2)} mil M£ de salarios públicos y de cuidados (estimaciones).` },
          smiEmplois: { nom: 'Empleos perdidos por punto de subida', f: (v) => (v ? `${fmt(v * 1000, 0)} empleos` : 'ninguno'), repere: 'Hipótesis discutida: la Low Pay Commission apenas ha constatado pérdidas de empleo por subidas anteriores. Los empleos perdidos pasan por el control «paro».' },
          ruAdulte: { nom: 'Importe por adulto', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'), repere: `${fmt(H.ru.adultes)} millones de adultos: 100 £ al mes cuestan ${mds(H.ru.adultes * 1.2)} al año.` },
          ruMineur: { nom: 'Importe por menor', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'), repere: `${fmt(H.ru.mineurs)} millones de menores. Sustituye el Child Benefit (unas 113 £ al mes por el primer hijo).` },
          ruAides: { nom: 'Ayudas suprimidas a cambio', f: (v) => fmt(v, 0) + ' % de lo absorbible', repere: 'Una ayuda se suprime en proporción a la renta básica respecto a su importe medio: Universal Credit, Pension Credit, Carer’s Allowance, Child Benefit, la mitad de las ayudas a la vivienda.' },
          ruFinancement: { nom: 'Parte financiada por un impuesto específico', f: (v) => fmt(v, 0) + ' %', repere: 'Un impuesto proporcional sobre todas las rentas, por ejemplo. Calculado sin efecto sobre la actividad.' },
          crise: { nom: 'Coste de una crisis', f: (v) => (v ? mds(v) : 'ninguna'), repere: 'Covid: el endeudamiento alcanzó en torno al 15 % del PIB en 2020-21.' },
          anneeCrise: { nom: 'Año de la crisis', f: (v) => String(v), repere: 'Coste repartido 60 % / 40 % en dos años, con caída del PIB.' },
        },
        postes: {
          defense: { nom: 'Defensa', note: 'Objetivo: 2,5 % del PIB en 2027 y 3,5 % en defensa básica de aquí a 2035 (compromiso OTAN).' },
          enseignement: { nom: 'Educación', note: 'Escuelas, universidades, formación.' },
          sante: { nom: 'Sanidad', note: 'El NHS en Inglaterra y en las naciones descentralizadas.' },
          retraites: { nom: 'Pensiones', note: 'Pensión estatal y Pension Credit. Los controles del grupo «Pensiones» se suman aquí.' },
          social: { nom: 'Otra protección social', note: 'Universal Credit, discapacidad, vivienda, familia. La renta básica, neta de las ayudas que sustituye, se suma aquí.' },
          securite: { nom: 'Orden público y justicia', note: 'Policía, justicia, prisiones.' },
          economie: { nom: 'Asuntos económicos', note: 'Transporte, energía, ayudas a empresas, investigación aplicada.' },
          general: { nom: 'Servicios generales', note: 'Administración general, ayuda internacional. Sin intereses.' },
          cadre: { nom: 'Vivienda, medio ambiente, cultura', note: 'Vivienda, servicios locales, medio ambiente, cultura y deporte.' },
        },
        prereglages: {
          tendanciel: 'Tendencial', plans: 'Planes del Gobierno (OBR)', taux: 'Tipos altos', inflation: 'Inflación al 4 %',
          croissance: 'Crecimiento fuerte', retraite68: 'Pensión a los 68', tripleVerrou: 'Triple candado aligerado',
          hauts: 'Gravar las rentas altas', ru: 'Renta básica', crise: 'Crisis en 2029',
        },
        nonVentile: (montant, annee) => `Sin asignar (ahorros transversales, salario mínimo en el sector público, crisis): ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Mismo método que los demás simuladores. Cada año, la deuda aumenta en el importe del déficit: gasto primario, menos ingresos, más intereses. El PIB crece con el crecimiento real y la inflación; los ingresos siguen al PIB; el gasto primario sigue su propio ritmo.</p>
          <p><strong>Particularidades británicas:</strong> la deuda seguida es la deuda neta del sector público (PSND), medida de referencia de la OBR, y no la deuda bruta según Maastricht; los años son ejercicios de abril a marzo («2027» = 2027-28); los importes están en miles de millones de libras.</p>
          <p><strong>Punto de partida estimado (final del ejercicio ${d.annee}-${String(d.annee + 1).slice(2)}):</strong> PIB ${mds(d.pib)}, deuda ${mds(d.dette)} (${pct(d.ratio)} del PIB, OBR, octubre de 2026), endeudamiento del ${pct(-d.soldePib)} del PIB, intereses ${mds(d.interets)}. Último dato observado: ${pct(COMPTES_2025.ratio)} del PIB a finales de marzo de 2026 (ONS).</p>
          <p><strong>Hipótesis propias de la aplicación, no tomadas de las fuentes:</strong></p>
          <ul>
            <li>El ${fmt(H.refinancement * 100)} % del saldo vivo se refinancia cada año al tipo de mercado, y toda la deuda nueva también: los gilts son largos, pero las compras de activos del Banco de Inglaterra, financiadas con reservas remuneradas al tipo oficial, acortan el vencimiento efectivo.</li>
            <li>El ${fmt(H.partIndexee * 100, 0)} % de la deuda está indexado a la inflación: cada punto de inflación por encima de la referencia añade el ${fmt(H.partIndexee)} % de la deuda a los intereses.</li>
            <li>Los intereses de partida (${mds(d.interets)}) se interpolan entre 109 mil M£ en 2025-26 y 160 mil M£ previstos en 2031-32; la ratio de ingresos (40,6 % del PIB) y los importes por función (PESA) son órdenes de magnitud.</li>
            <li>Los rendimientos por punto del impuesto sobre la renta, de las cotizaciones y del IVA siguen las cuantificaciones de HMRC y del IFS; los del tipo reducido de IVA y del impuesto sobre sociedades son estimaciones.</li>
            <li>Un año de edad de pensión equivale a ${fmt(k.agePlus)} mil M£ al año en 2035; un punto de paro, a ${fmt(k.chomagePt)} mil M£; las ayudas sustituidas por la renta básica suman ${mds(k.totalAides)}: órdenes de magnitud.</li>
            <li>Las palancas presupuestarias se despliegan en ${H.montee} años y después siguen al PIB. Una crisis reduce el PIB un 1 % por cada 100 mil M£, la mitad del cual se recupera al año siguiente.</li>
            <li>El «tendencial» mantiene el gasto primario al ritmo del crecimiento y los ingresos constantes en porcentaje del PIB: ignora la congelación de umbrales y los planes de gasto, que la OBR sí incluye. El escenario «Planes del Gobierno» se aproxima a ellos: endeudamiento de en torno al 1,8 % del PIB en 2030-31.</li>
          </ul>
          <p><strong>Lo que el modelo no tiene en cuenta:</strong> el efecto de los ahorros y los impuestos sobre el crecimiento, la reacción de los tipos al nivel de deuda, las pérdidas del Banco de Inglaterra en sus compras de activos y las diferencias entre endeudamiento y variación de la deuda neta.</p>`,
      };
    },

    de: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Langfristige Wirkung' : 'Wirkung'}: ${mdsSigne(g)} pro Jahr, in Pfund von 2026.`);
      return {
        titreDoc: 'Britische Staatsschulden: Projektion über 10 Jahre',
        h1: 'Britische Staatsschulden: Projektion 2027-2036',
        groupes: {
          economie: { titre: 'Wirtschaft' },
          depenses: { titre: 'Ausgaben' },
          postes: { titre: 'Ausgaben nach Aufgabenbereich', intro: 'Reales Wachstum jedes Bereichs. Ohne Einstellung folgen alle dem allgemeinen Tempo oben.' },
          recettes: { titre: 'Einnahmen' },
          tva: { titre: 'Mehrwertsteuer', intro: 'Regelsatz und ermäßigter Satz (Haushaltsenergie, Kindersitze…). Sofortige Wirkung, bei unverändertem Konsum.',
            resume: (p) => effet(m.effetIVA(p), 'Sätze unverändert.', false) },
          ir: { titre: 'Einkommensteuer, Sozialversicherung und Körperschaftsteuer',
            intro: `Tarif 2026-27 (außer Schottland): 20 % von ${euros(H.ir.seuils[0])} bis ${euros(H.ir.seuils[1])}, 40 % bis ${euros(H.ir.seuils[2])}, darüber 45 %. Schwellen bis 2031 eingefroren: Die kalte Progression erhöht das Aufkommen jedes Jahr.`,
            resume: (p) => effet(m.effetImpot(p), 'Tarif unverändert.') },
          retraites: { titre: 'Renten', intro: 'Das Alter für die Staatsrente steigt zwischen 2026 und 2028 von 66 auf 67 Jahre. Der „Triple Lock“ erhöht die Rente um den höchsten Wert aus Inflation, Lohnwachstum und 2,5 %.' },
          emploi: { titre: 'Beschäftigung und Alterung' },
          smi: { titre: 'Mindestlohn (National Living Wage)', intro: '12,71 £ pro Stunde seit April 2026, ab 21 Jahren. Erhöhung zusätzlich zur jährlichen Anpassung.',
            resume: (p) => {
              if (!p.smi) return 'Jährliche Anpassung unverändert.';
              const { s, solde } = k.smiSolde(p);
              return `Arbeitslosigkeit ${points(s.chomage, 2)}. Langfristige Wirkung auf den Saldo: ${mdsSigne(solde)} pro Jahr, in Pfund von 2026.`;
            } },
          ru: { titre: 'Bedingungsloses Grundeinkommen',
            intro: 'An jede Einwohnerin und jeden Einwohner ohne Bedingungen gezahlt. Es ersetzt bedürftigkeitsgeprüfte Leistungen (Universal Credit, Pension Credit…) und das Child Benefit bis zu seiner Höhe; die Staatsrente bleibt unberührt.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Kein Grundeinkommen.';
              return `Bruttokosten ${mds(r.brut)}, gestrichene Leistungen −${mds(r.aides)}, Nettokosten ${mds(r.net)} pro Jahr (${pct(r.net / BASE.pib * 100)} des BIP)`
                + (r.financement > 0.05 ? `, davon ${mds(r.financement)} durch die eigene Abgabe gedeckt.` : '.');
            } },
          chocs: { titre: 'Schocks' },
        },
        curseurs: {
          croissance: { nom: 'Reales BIP-Wachstum', f: (v) => pctAn(v), repere: 'Durchschnitt über 10 Jahre, ohne Inflation. OBR: 1,2 % im Jahr 2026, 1,0 % im Jahr 2027.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: `Ein Viertel der Gilts ist inflationsindexiert: Ein Punkt mehr kostet etwa ${mds(k.indexe)} Zinsen pro Jahr.` },
          tauxMarche: { nom: 'Emissionszins des Staates (Gilts)', f: (v) => pct(v), repere: 'Durchschnittlicher Emissionszins über alle Laufzeiten. Referenz: 4,5 %.' },
          depenses: { nom: 'Primärausgaben, real', f: (v) => pctAn(v), repere: 'Referenz: im Tempo des Wachstums. Die Pläne der Regierung sind straffer (Szenario „Regierungspläne“).' },
          economies: { nom: 'Zusätzliche dauerhafte Einsparungen', f: (v) => mds(v), repere: 'In Mrd. £ von 2026, in 3 Jahren erreicht. Spielraum des OBR gegenüber der Fiskalregel: 15 Mrd. £ im Jahr 2029-30.' },
          prelevements: { nom: 'Staatliche Einnahmenquote', f: (v) => signe(v) + ' Pp. des BIP', repere: 'Einnahmen von etwa 40,6 % des BIP (Schätzung). Das OBR erwartet eine Rekord-Steuerquote, getrieben von eingefrorenen Schwellen.' },
          fraude: { nom: 'Zusätzlich eingetriebener Betrug und Steuerhinterziehung', f: (v) => `+${fmt(v)} Mrd. £/Jahr`, repere: 'HMRC: Steuerlücke („tax gap“) von etwa 46,8 Mrd. £ pro Jahr, 5,3 % der geschuldeten Steuern.' },
          tva20: { nom: 'Regelsatz', f: (v) => pct(v), repere: `Aktuell: 20 %. Ein Punkt ≈ ${fmt(H.tva.parPoint[0])} Mrd. £.` },
          tva5: { nom: 'Ermäßigter Satz', f: (v) => pct(v), repere: `Aktuell: 5 %. Haushaltsenergie, Kinderprodukte. Ein Punkt ≈ ${fmt(H.tva.parPoint[1])} Mrd. £ (Schätzung). Lebensmittel sind nullbesteuert.` },
          ir20: { nom: 'Eingangssatz (basic rate)', f: (v) => pct(v), repere: `Aktuell: 20 %. Ein Penny ≈ ${fmt(H.ir.parPoint[0])} Mrd. £ im Jahr 2026-27 (HMRC).` },
          ir40: { nom: 'Höherer Satz (higher rate)', f: (v) => pct(v), repere: `Aktuell: 40 % ab ${euros(H.ir.seuils[1])}. Ein Penny ≈ ${fmt(H.ir.parPoint[1])} Mrd. £.` },
          ir45: { nom: 'Zusatzsatz (additional rate)', f: (v) => pct(v), repere: `Aktuell: 45 % ab ${euros(H.ir.seuils[2])}. Ein Penny ≈ ${fmt(H.ir.parPoint[2], 2)} Mrd. £.` },
          irSurtaxe: { nom: 'Neue Spitzenstufe', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} Pkt.)` : 'keine'), repere: 'Zuschlag auf den Satz der obersten Stufe, oberhalb der folgenden Schwelle.' },
          irSeuil: { nom: 'Schwelle der neuen Stufe', f: (v) => euros(v), repere: 'Je höher die Schwelle, desto weniger Einkommen bleibt zu besteuern.' },
          nics8: { nom: 'Sozialversicherung der Beschäftigten (NICs)', f: (v) => pct(v), repere: `Aktuell: 8 %. Ein Punkt ≈ ${fmt(H.nics.parPoint[0], 2)} Mrd. £. 2024 von 12 % auf 8 % gesenkt.` },
          nics15: { nom: 'Sozialversicherung der Arbeitgeber (NICs)', f: (v) => pct(v), repere: `Aktuell: 15 % seit April 2025. Ein Punkt ≈ ${fmt(H.nics.parPoint[1])} Mrd. £ nach Lohneffekten (IFS).` },
          societes: { nom: 'Körperschaftsteuer', f: (v) => pct(v), repere: `Hauptsatz: 25 % seit 2023. Ein Punkt ≈ ${fmt(H.societes.parPoint)} Mrd. £ (Schätzung).` },
          erosion: { nom: 'Reaktion der Steuerpflichtigen', f: (v) => `−${fmt(v, 0)} % des Ertrags`, repere: 'Anteil des Ertrags, der durch Abwanderung, Steuergestaltung oder geringere Aktivität verloren geht. Gilt für Erhöhungen auf hohe Einkommen und Unternehmen.' },
          ageLegal: { nom: 'Alter für die Staatsrente', f: (v) => ansMois(67 + v), repere: `Referenz: 67 Jahre ab 2028; 68 Jahre zwischen 2044 und 2046 geplant. Schätzung der Anwendung: Ein Jahr mehr bringt 2035 etwa ${fmt(k.agePlus, 0)} Mrd. £.` },
          sousIndexation: { nom: 'Staatsrente unter dem Triple Lock angepasst', f: (v) => (v ? '−' + fmt(v) + ' Pkt./Jahr' : 'nein'), repere: `Staatsrente: etwa 154 Mrd. £ im Jahr 2026-27, +4,8 % im April 2026. Ein Punkt weniger spart etwa ${fmt(H.sousIndexationPoint)} Mrd. £ pro Jahr, die erhalten bleiben.` },
          anneesSousIndexation: { nom: 'Dauer der Unterindexierung', f: (v) => u.annees(v), repere: 'Ab 2027.' },
          retraites: { nom: 'Anstieg der Staatsrente', f: (v) => fmt(v, 0) + ' % der Projektion', repere: 'OBR (2025): von etwa 5 % des BIP heute auf 7,7 % Anfang der 2070er-Jahre, davon 1,6 Punkte durch den Triple Lock.' },
          chomage: { nom: 'Angestrebte Arbeitslosenquote', f: (v) => pct(v), repere: `Referenz: 4,7 % (ONS, Juni-August 2026). Ein Punkt weniger bringt etwa ${fmt(k.chomagePt, 0)} Mrd. £ pro Jahr (Schätzung).` },
          dependance: { nom: 'Pflegeausgaben im Jahr 2050', f: (v) => pct(v) + ' des BIP', repere: 'Soziale Pflege für Erwachsene: etwa 1,2 % des BIP; für 2050 werden 1,7 % angenommen.' },
          smi: { nom: 'Erhöhung des Mindestlohns', f: (v) => (v ? `+${v} % (≈ ${fmt(H.smi.horaire * (1 + v / 100), 2)} £/Std.)` : 'keine'), repere: `Je Punkt: +${fmt(H.smi.recettesPoint, 2)} Mrd. £ Steuern, Beiträge und geringeres Universal Credit, −${fmt(H.smi.publicPoint, 2)} Mrd. £ Löhne im öffentlichen Dienst und in der Pflege (Schätzungen).` },
          smiEmplois: { nom: 'Verlorene Stellen je Erhöhungspunkt', f: (v) => (v ? `${fmt(v * 1000, 0)} Stellen` : 'keine'), repere: 'Umstrittene Annahme: Die Low Pay Commission fand bei früheren Erhöhungen kaum Stellenverluste. Verlorene Stellen wirken über den Regler „Arbeitslosigkeit“.' },
          ruAdulte: { nom: 'Betrag je Erwachsenem', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'), repere: `${fmt(H.ru.adultes)} Millionen Erwachsene: 100 £ pro Monat kosten ${mds(H.ru.adultes * 1.2)} pro Jahr.` },
          ruMineur: { nom: 'Betrag je Kind', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'), repere: `${fmt(H.ru.mineurs)} Millionen Minderjährige. Ersetzt das Child Benefit (etwa 113 £ pro Monat für das erste Kind).` },
          ruAides: { nom: 'Im Gegenzug gestrichene Leistungen', f: (v) => fmt(v, 0) + ' % des Ersetzbaren', repere: 'Eine Leistung wird im Verhältnis des Grundeinkommens zu ihrem Durchschnittsbetrag gestrichen: Universal Credit, Pension Credit, Carer’s Allowance, Child Benefit, die Hälfte der Wohnhilfen.' },
          ruFinancement: { nom: 'Durch eine eigene Abgabe finanzierter Anteil', f: (v) => fmt(v, 0) + ' %', repere: 'Zum Beispiel eine proportionale Steuer auf alle Einkommen. Ohne Wirkung auf die Wirtschaftstätigkeit berechnet.' },
          crise: { nom: 'Kosten einer Krise', f: (v) => (v ? mds(v) : 'keine'), repere: 'Covid: Die Neuverschuldung erreichte 2020-21 etwa 15 % des BIP.' },
          anneeCrise: { nom: 'Jahr der Krise', f: (v) => String(v), repere: 'Kosten zu 60 % / 40 % auf zwei Jahre verteilt, mit BIP-Rückgang.' },
        },
        postes: {
          defense: { nom: 'Verteidigung', note: 'Ziel: 2,5 % des BIP im Jahr 2027, 3,5 % für Kernverteidigung bis 2035 (NATO-Zusage).' },
          enseignement: { nom: 'Bildung', note: 'Schulen, Hochschulen, Ausbildung.' },
          sante: { nom: 'Gesundheit', note: 'Der NHS in England und in den dezentralisierten Landesteilen.' },
          retraites: { nom: 'Renten', note: 'Staatsrente und Pension Credit. Die Regler der Gruppe „Renten“ kommen hinzu.' },
          social: { nom: 'Sonstige soziale Sicherung', note: 'Universal Credit, Behinderung, Wohnen, Familie. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.' },
          securite: { nom: 'Öffentliche Ordnung und Justiz', note: 'Polizei, Justiz, Gefängnisse.' },
          economie: { nom: 'Wirtschaftliche Angelegenheiten', note: 'Verkehr, Energie, Unternehmenshilfen, angewandte Forschung.' },
          general: { nom: 'Allgemeine Verwaltung', note: 'Allgemeine Verwaltung, Entwicklungshilfe. Ohne Zinsen.' },
          cadre: { nom: 'Wohnen, Umwelt, Kultur', note: 'Wohnungswesen, kommunale Dienste, Umwelt, Kultur und Sport.' },
        },
        prereglages: {
          tendanciel: 'Basisszenario', plans: 'Regierungspläne (OBR)', taux: 'Hohe Zinsen', inflation: 'Inflation 4 %',
          croissance: 'Starkes Wachstum', retraite68: 'Staatsrente mit 68', tripleVerrou: 'Gelockerter Triple Lock',
          hauts: 'Hohe Einkommen besteuern', ru: 'Grundeinkommen', crise: 'Krise 2029',
        },
        nonVentile: (montant, annee) => `Nicht zugeordnet (Querschnittseinsparungen, Mindestlohn im öffentlichen Dienst, Krise): ${montant} im Jahr ${annee}.`,
        methode: (d) => `
          <p>Gleiche Methode wie die anderen Simulatoren. Jedes Jahr steigen die Schulden um das Defizit: Primärausgaben minus Einnahmen plus Zinsen. Das BIP wächst mit dem realen Wachstum und der Inflation; die Einnahmen folgen dem BIP; die Primärausgaben folgen ihrem eigenen Tempo.</p>
          <p><strong>Britische Besonderheiten:</strong> Betrachtet werden die Nettoschulden des öffentlichen Sektors (PSND), die Leitgröße des OBR, nicht die Bruttoschulden nach Maastricht; die Jahre sind Haushaltsjahre von April bis März („2027“ = 2027-28); die Beträge sind in Milliarden Pfund.</p>
          <p><strong>Geschätzter Ausgangspunkt (Ende des Haushaltsjahres ${d.annee}-${String(d.annee + 1).slice(2)}):</strong> BIP ${mds(d.pib)}, Schulden ${mds(d.dette)} (${pct(d.ratio)} des BIP, OBR, Oktober 2026), Neuverschuldung ${pct(-d.soldePib)} des BIP, Zinsen ${mds(d.interets)}. Letzter gemessener Wert: ${pct(COMPTES_2025.ratio)} des BIP Ende März 2026 (ONS).</p>
          <p><strong>Eigene Annahmen der Anwendung, nicht aus den Quellen:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % des Schuldenstands werden jedes Jahr zum Marktzins refinanziert, neue Schulden vollständig: Gilts sind lang, doch die Anleihekäufe der Bank of England, finanziert über zum Leitzins verzinste Reserven, verkürzen die effektive Laufzeit.</li>
            <li>${fmt(H.partIndexee * 100, 0)} % der Schulden sind inflationsindexiert: Jeder Inflationspunkt über der Referenz erhöht die Zinsen um ${fmt(H.partIndexee)} % der Schulden.</li>
            <li>Die Zinsen zu Beginn (${mds(d.interets)}) sind zwischen 109 Mrd. £ im Jahr 2025-26 und den für 2031-32 erwarteten 160 Mrd. £ interpoliert; die Einnahmenquote (40,6 % des BIP) und die Beträge je Bereich (PESA) sind Größenordnungen.</li>
            <li>Die Erträge je Punkt von Einkommensteuer, Sozialversicherung und Mehrwertsteuer folgen Schätzungen von HMRC und IFS; die des ermäßigten Mehrwertsteuersatzes und der Körperschaftsteuer sind Schätzungen.</li>
            <li>Ein Jahr Rentenalter entspricht 2035 ${fmt(k.agePlus)} Mrd. £ pro Jahr; ein Punkt Arbeitslosigkeit ${fmt(k.chomagePt)} Mrd. £; die vom Grundeinkommen ersetzten Leistungen summieren sich auf ${mds(k.totalAides)}: Größenordnungen.</li>
            <li>Haushaltshebel wirken schrittweise über ${H.montee} Jahre und folgen danach dem BIP. Eine Krise senkt das BIP um 1 % je 100 Mrd. £, wovon die Hälfte im Folgejahr aufgeholt wird.</li>
            <li>Das „Basisszenario“ lässt die Primärausgaben mit dem Wachstum steigen und hält die Einnahmen als Anteil am BIP konstant: Es ignoriert die eingefrorenen Schwellen und die Ausgabenpläne, die das OBR berücksichtigt. Das Szenario „Regierungspläne“ nähert sich ihnen an: Neuverschuldung von etwa 1,8 % des BIP im Jahr 2030-31.</li>
          </ul>
          <p><strong>Was das Modell nicht berücksichtigt:</strong> die Wirkung von Einsparungen und Steuern auf das Wachstum, die Reaktion der Zinsen auf die Schuldenhöhe, Verluste der Bank of England aus ihren Anleihekäufen und Abweichungen zwischen Neuverschuldung und Veränderung der Nettoschulden.</p>`,
      };
    },
  };

  return { id: 'uk', modele, sources, pib2024: 3070, anneePostes: '2025-26', devise: 'GBP', horsUE: true, structure, textes };
});

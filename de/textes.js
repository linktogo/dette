// Simulateur allemand : structure des curseurs (bornes, pas, préréglages) et textes
// de l'interface en quatre langues. Les chiffres viennent du modèle (model.js).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique;
  else racine.PAYS = fabrique(racine.DetteAllemagne, racine.SOURCES);
})(globalThis, function (modele, sources) {
  const actifIR = (p) => p.ir42 > 42 || p.ir45 > 45 || p.irSurtaxe > 0 || p.societes > 0 || p.patrimoine > 0;
  const actifRU = (p) => p.ruAdulte > 0 || p.ruMineur > 0;

  const structure = {
    groupes: [
      { id: 'economie', curseurs: [
        { id: 'croissance', min: -1, max: 3, pas: 0.1 },
        { id: 'inflation', min: 0, max: 5, pas: 0.1 },
        { id: 'tauxMarche', min: 0, max: 7, pas: 0.1 },
      ] },
      { id: 'depenses', curseurs: [
        { id: 'depenses', min: -1, max: 3, pas: 0.1 },
        { id: 'economies', min: 0, max: 150, pas: 5 },
        { id: 'infra', min: 0, max: 150, pas: 10 },
        { id: 'otan', min: 0, max: 150, pas: 10 },
      ] },
      { id: 'postes', postes: true, min: -4, max: 8, pas: 0.1 },
      { id: 'recettes', curseurs: [
        { id: 'prelevements', min: -3, max: 3, pas: 0.1 },
      ] },
      { id: 'tva', curseurs: [
        { id: 'tva19', min: 15, max: 25, pas: 0.5 },
        { id: 'tva7', min: 0, max: 19, pas: 0.5 },
      ] },
      { id: 'ir', curseurs: [
        { id: 'irZone', min: -3, max: 5, pas: 0.5 },
        { id: 'ir42', min: 35, max: 55, pas: 0.5 },
        { id: 'ir45', min: 40, max: 60, pas: 0.5 },
        { id: 'irSurtaxe', min: 0, max: 15, pas: 1 },
        { id: 'irSeuil', min: 500000, max: 5000000, pas: 250000, actifSi: (p) => p.irSurtaxe > 0 },
        { id: 'societes', min: -5, max: 10, pas: 0.5 },
        { id: 'patrimoine', min: 0, max: 3, pas: 0.1 },
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
        { id: 'chomage', min: 3, max: 10, pas: 0.1 },
        { id: 'dependance', min: 1.5, max: 3.5, pas: 0.1 },
      ] },
      { id: 'smi', curseurs: [
        { id: 'smi', min: 0, max: 25, pas: 1 },
        { id: 'smiEmplois', min: 0, max: 40, pas: 1, actifSi: (p) => p.smi > 0 },
      ] },
      { id: 'ru', curseurs: [
        { id: 'ruAdulte', min: 0, max: 1500, pas: 50 },
        { id: 'ruMineur', min: 0, max: 600, pas: 25 },
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
      // Proposition de l'assistant : ramener le déficit vers 3,8 % sans toucher aux programmes votés.
      { id: 'consolidation', p: { depenses: 0.3, economies: 30 } },
      { id: 'sansInfra', p: { infra: 0 } },
      { id: 'defenseGelee', p: { otan: 0 } },
      { id: 'taux', p: { tauxMarche: 4.5 } },
      { id: 'croissance', p: { croissance: 1.8 } },
      { id: 'retraite68', p: { ageLegal: 1 } },
      { id: 'tva21', p: { tva19: 21 } },
      { id: 'hauts', p: { ir42: 45, ir45: 48, patrimoine: 1 } },
      { id: 'ru', p: { ruAdulte: 600, ruMineur: 150, ruFinancement: 50 } },
      { id: 'crise', p: { crise: 200, anneeCrise: 2029 } },
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
  });

  const textes = {
    fr: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Effet${aTerme ? ' à terme' : ''} : ${mdsSigne(g)} par an, en euros de 2026.`);
      return {
        titreDoc: 'Dette allemande : projection à 10 ans',
        h1: 'Dette publique allemande : projection 2027-2036',
        groupes: {
          economie: { titre: 'Économie' },
          depenses: { titre: 'Dépenses et programmes votés', intro: 'Depuis la réforme constitutionnelle de mars 2025, la défense au-delà de 1 % du PIB et le fonds spécial de 500 Md€ pour l’infrastructure échappent au frein à l’endettement.' },
          postes: { titre: 'Dépenses par poste', intro: 'Rythme de chaque poste en volume. Sans réglage, tous suivent le rythme général ci-dessus.' },
          recettes: { titre: 'Recettes' },
          tva: { titre: 'TVA (Mehrwertsteuer)', intro: 'Deux taux. Effet immédiat, calculé à consommation inchangée.',
            resume: (p) => effet(m.effetIVA(p), 'Taux inchangés.', false) },
          ir: { titre: 'Impôt sur le revenu, sociétés et hauts patrimoines',
            intro: `Barème 2026 : 14 % puis zone progressive jusqu’à 42 % au-delà de ${euros(H.ir.seuils[0])}, 45 % au-delà de ${euros(H.ir.seuils[1])} (célibataire). Pas d’impôt sur la fortune depuis 1997.`,
            resume: (p) => effet(m.effetImpot(p), 'Barème inchangé.') },
          retraites: { titre: 'Retraites', intro: 'Âge légal porté à 67 ans d’ici 2031. Le paquet retraites 2025 garantit un niveau des pensions de 48 % jusqu’en 2031, financé par l’État fédéral.' },
          emploi: { titre: 'Emploi et vieillissement' },
          smi: { titre: 'Salaire minimum (Mindestlohn)', intro: '13,90 € de l’heure en 2026, 14,60 € en 2027. Hausse ajoutée à cette trajectoire.',
            resume: (p) => {
              if (!p.smi) return 'Trajectoire décidée inchangée.';
              const { s, solde } = k.smiSolde(p);
              return `Chômage ${points(s.chomage, 2)}. Effet à terme sur le solde : ${mdsSigne(solde)} par an, en euros de 2026.`;
            } },
          ru: { titre: 'Revenu universel',
            intro: 'Versé à chaque résident, sans condition. Il remplace les aides sous condition de ressources et le Kindergeld à hauteur de son montant ; les retraites et l’assurance chômage ne sont pas touchées.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Aucun revenu universel.';
              return `Coût brut ${mds(r.brut)}, aides supprimées −${mds(r.aides)}, coût net ${mds(r.net)} par an (${pct(r.net / BASE.pib * 100)} du PIB)`
                + (r.financement > 0.05 ? `, dont ${mds(r.financement)} couverts par le prélèvement dédié.` : '.');
            } },
          chocs: { titre: 'Chocs' },
        },
        curseurs: {
          croissance: { nom: 'Croissance du PIB en volume', f: (v) => pctAn(v), repere: 'Rythme moyen sur 10 ans, hors inflation. Croissance potentielle estimée autour de 0,5 à 1 % par an.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'Avec 0,9 % de croissance et 2,0 % d’inflation, un déficit d’environ 1,9 % du PIB suffit à stabiliser la dette.' },
          tauxMarche: { nom: 'Taux d’emprunt de l’État', f: (v) => pct(v), repere: 'Taux moyen à l’émission. Le Bund à 10 ans reste le taux de référence de la zone euro.' },
          depenses: { nom: 'Dépense publique hors intérêts, en volume', f: (v) => pctAn(v), repere: 'Référence : au rythme de la croissance. Hors programmes ci-dessous.' },
          economies: { nom: 'Économies pérennes supplémentaires', f: (v) => mds(v), repere: 'En Md€ de 2026, atteints en 3 ans. Le frein à l’endettement imposerait des économies que le tendanciel n’inclut pas.' },
          infra: { nom: 'Fonds spécial Infrastructure dépensé', f: (v) => fmt(v, 0) + ' %', repere: '500 Md€ sur 12 ans (2025-2036) : 57,9 Md€ prévus en 2026, environ 40 Md€ par an ensuite. Imputé aux affaires économiques.' },
          otan: { nom: 'Trajectoire de défense vers 3,5 % du PIB', f: (v) => fmt(v, 0) + ' % réalisés', repere: 'Défense au sens de l’OTAN : environ 2,8 % du PIB en 2026, 3,5 % visés en 2029. 0 % gèle la dépense à son niveau de 2026.' },
          prelevements: { nom: 'Taux de recettes publiques', f: (v) => signe(v) + ' pt de PIB', repere: 'Destatis : recettes à 47,9 % du PIB en 2025, dépenses à 50,3 %.' },
          tva19: { nom: 'Taux normal', f: (v) => pct(v), repere: `Actuel : 19 %. Un point ≈ ${fmt(H.tva.parPoint[0], 0)} Md€ pour l’ensemble des administrations. Une hausse à 21 % est débattue.` },
          tva7: { nom: 'Taux réduit', f: (v) => pct(v), repere: `Actuel : 7 %. Alimentation, livres, transports locaux, restauration (depuis 2026). Un point ≈ ${fmt(H.tva.parPoint[1])} Md€.` },
          irZone: { nom: 'Zone progressive (14 à 42 %)', f: (v) => signe(v) + ' pt', repere: `Points ajoutés à tous les taux sous 42 %. Un point ≈ ${fmt(H.ir.zone, 0)} Md€ (estimation de l’application).` },
          ir42: { nom: 'Taux supérieur (Spitzensteuersatz)', f: (v) => pct(v), repere: `Actuel : 42 % au-delà de ${euros(H.ir.seuils[0])}. Gouvernement fédéral : passer à 45 % rapporterait 14 Md€.` },
          ir45: { nom: 'Taux des hauts revenus (Reichensteuer)', f: (v) => pct(v), repere: `Actuel : 45 % au-delà de ${euros(H.ir.seuils[1])}. Passer à 48 % rapporterait 3 Md€. La coalition envisage 47 % au-delà de 280 000 €.` },
          irSurtaxe: { nom: 'Nouvelle tranche supérieure', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'aucune'), repere: 'Taux ajouté à celui de la dernière tranche, au-delà du seuil ci-dessous.' },
          irSeuil: { nom: 'Seuil de la nouvelle tranche', f: (v) => euros(v), repere: 'Plus le seuil est haut, moins il reste de revenus à taxer.' },
          societes: { nom: 'Impôt sur les sociétés, écart au calendrier légal', f: (v) => (v ? signe(v) + ' pt' : 'calendrier légal'), repere: `Le taux de 15 % descend à 10 % de 2028 à 2032 (loi de 2025), baisse comprise dans le tendanciel. Un point ≈ ${fmt(H.societes.parPoint)} Md€.` },
          patrimoine: { nom: 'Impôt plancher sur les patrimoines de plus de 100 M€', f: (v) => (v ? pct(v) + ' par an' : 'aucun'), repere: `L’impôt sur la fortune est suspendu depuis 1997. Un point ≈ ${fmt(H.patrimoineParPoint, 0)} Md€ bruts (estimation de l’application).` },
          erosion: { nom: 'Réaction des contribuables', f: (v) => `−${fmt(v, 0)} % du gain`, repere: 'Part du gain perdue par départs, optimisation ou moindre activité. S’applique aux hausses sur les hauts revenus, les sociétés et les patrimoines.' },
          ageLegal: { nom: 'Âge légal de départ', f: (v) => ansMois(67 + v), repere: `Référence : 67 ans, atteint en 2031. Estimation de l’application : un an de plus rapporte environ ${fmt(k.agePlus, 0)} Md€ en 2035.` },
          cotisation: { nom: 'Taux de cotisation retraite', f: (v) => points(v), repere: `Taux de 18,6 % en 2026, appelé à monter vers 20 % d’ici 2028. Un point ≈ ${fmt(H.cotisationPoint)} Md€ (estimation), mais renchérit le travail.` },
          sousIndexation: { nom: 'Pensions revalorisées moins que les salaires', f: (v) => (v ? '−' + fmt(v) + ' pt/an' : 'non'), repere: `Un point de moins économise environ ${fmt(H.sousIndexationPoint)} Md€ par an, acquis les années suivantes. Contraire à la garantie de 48 % jusqu’en 2031.` },
          anneesSousIndexation: { nom: 'Durée de la sous-indexation', f: (v) => u.annees(v), repere: 'À partir de 2027.' },
          retraites: { nom: 'Dérive nette des retraites', f: (v) => fmt(v, 0) + ' % de l’hypothèse', repere: 'Départ des baby-boomers et niveau garanti à 48 % : +0,6 point de PIB en 2036, net des hausses de cotisations (hypothèse de l’application).' },
          chomage: { nom: 'Taux de chômage visé', f: (v) => pct(v), repere: `Référence : 6,3 % (Bundesagentur für Arbeit, octobre 2026), 2,96 millions de chômeurs. Un point en moins rapporte environ ${fmt(k.chomagePt, 0)} Md€ par an (estimation).` },
          dependance: { nom: 'Dépenses de dépendance en 2050', f: (v) => pct(v) + ' du PIB', repere: 'Assurance dépendance et aide sociale : environ 1,5 % du PIB en 2022, 2,1 % retenu pour 2050 (hypothèse).' },
          smi: { nom: 'Hausse du salaire minimum', f: (v) => (v ? `+${v} % (≈ ${fmt(H.smi.horaire * (1 + v / 100), 2)} €/h)` : 'aucune'), repere: `Par point : +${fmt(H.smi.recettesPoint, 2)} Md€ de cotisations, d’impôts et de compléments sociaux en moins, −${fmt(H.smi.publicPoint, 2)} Md€ de salaires publics (estimations).` },
          smiEmplois: { nom: 'Emplois perdus par point de hausse', f: (v) => (v ? `${fmt(v * 1000, 0)} emplois` : 'aucun'), repere: 'Hypothèse débattue : l’introduction du salaire minimum en 2015 a eu des effets limités sur l’emploi. Les emplois perdus passent par le levier « chômage ».' },
          ruAdulte: { nom: 'Montant par adulte', f: (v) => (v ? euros(v) + '/mois' : 'aucun'), repere: `${fmt(H.ru.adultes)} millions d’adultes : 100 € par mois coûtent ${mds(H.ru.adultes * 1.2)} par an. Pour mémoire, revenu minimum d’une personne seule : 563 € plus le logement.` },
          ruMineur: { nom: 'Montant par mineur', f: (v) => (v ? euros(v) + '/mois' : 'aucun'), repere: `${fmt(H.ru.mineurs)} millions de mineurs. Remplace le Kindergeld (259 € par mois en 2026).` },
          ruAides: { nom: 'Aides supprimées en contrepartie', f: (v) => fmt(v, 0) + ' % de l’absorbable', repere: 'Une aide est supprimée en proportion du revenu universel rapporté à son montant moyen : Bürgergeld, minimum vieillesse, Kindergeld, la moitié des aides au logement.' },
          ruFinancement: { nom: 'Part financée par un prélèvement dédié', f: (v) => fmt(v, 0) + ' %', repere: 'Impôt proportionnel sur tous les revenus, par exemple. Calculé sans effet sur l’activité.' },
          crise: { nom: 'Coût d’une crise', f: (v) => (v ? mds(v) : 'aucune'), repere: 'Covid : la dette est passée d’environ 59 % à 68 % du PIB entre 2019 et 2020.' },
          anneeCrise: { nom: 'Année de la crise', f: (v) => String(v), repere: 'Coût réparti 60 % / 40 % sur deux ans, avec recul du PIB.' },
        },
        postes: {
          defense: { nom: 'Défense', note: 'Fonction défense au sens d’Eurostat, plus étroite que celle de l’OTAN. La trajectoire vers 3,5 % du PIB s’y ajoute.' },
          enseignement: { nom: 'Enseignement', note: 'Écoles et universités, gérées surtout par les Länder.' },
          sante: { nom: 'Santé', note: 'Assurance maladie légale, hôpitaux.' },
          retraites: { nom: 'Retraites', note: 'Assurance vieillesse légale et pensions des fonctionnaires. Les curseurs du groupe « Retraites » s’y ajoutent.' },
          social: { nom: 'Autre protection sociale', note: 'Chômage, famille, invalidité, dépendance, Bürgergeld. Le revenu universel, net des aides qu’il remplace, s’y ajoute.' },
          securite: { nom: 'Sécurité et justice', note: 'Polices fédérale et des Länder, justice, prisons.' },
          economie: { nom: 'Affaires économiques', note: 'Transports, énergie, aides aux entreprises. Le fonds spécial d’infrastructure s’y ajoute.' },
          general: { nom: 'Services généraux', note: 'Administration générale, transferts à l’UE, recherche fondamentale. Hors intérêts.' },
          cadre: { nom: 'Logement, environnement, culture', note: 'Logement, environnement, culture et sport.' },
        },
        prereglages: {
          tendanciel: 'Tendanciel', consolidation: 'Consolidation', sansInfra: 'Sans fonds infrastructure', defenseGelee: 'Défense gelée',
          taux: 'Taux élevés', croissance: 'Croissance forte', retraite68: 'Retraite à 68 ans', tva21: 'TVA à 21 %',
          hauts: 'Taxer les hauts revenus', ru: 'Revenu universel', crise: 'Crise en 2029',
        },
        nonVentile: (montant, annee) => `Non ventilé (économies transversales, salaire minimum des agents publics, crise) : ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Même méthode que les simulateurs français et espagnol. Chaque année, la dette augmente du déficit : dépenses hors intérêts, moins recettes, plus intérêts. Le PIB progresse de la croissance en volume et de l’inflation ; les recettes suivent le PIB ; les dépenses hors intérêts suivent leur propre rythme.</p>
          <p><strong>Point de départ estimé (fin ${d.annee}) :</strong> PIB ${mds(d.pib)}, dette ${mds(d.dette)} (${pct(d.ratio)} du PIB, projection du Stabilitätsrat de mai 2026), déficit ${pct(-d.soldePib)} du PIB, intérêts ${mds(d.interets)}. Le dernier chiffre mesuré est celui de la Bundesbank pour fin 2025 : ${mds(COMPTES_2025.dette)}, ${pct(COMPTES_2025.ratio)} du PIB.</p>
          <p><strong>Hypothèses propres à l’application, non tirées des sources :</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % de l’encours est refinancé chaque année au taux de marché, et toute dette nouvelle l’est en totalité.</li>
            <li>Le fonds spécial d’infrastructure dépense 1,25 % du PIB en 2026, puis 0,85 % en 2027 et 0,7 % en 2036 ; la défense au sens de l’OTAN passe de 2,8 % du PIB en 2026 à 3,5 % en 2029. Ces trajectoires sont des approximations des plans annoncés.</li>
            <li>Les montants par poste de 2024 sont reconstitués à partir des parts du PIB publiées par Eurostat et du total de Destatis : ce sont des ordres de grandeur.</li>
            <li>Les rendements par point de la TVA et de l’impôt sur le revenu reprennent les chiffrages publics cités ; ceux de la zone progressive, de l’impôt sur les sociétés et de l’impôt plancher sur les patrimoines sont des estimations de l’application, fiables à 30 à 50 % près.</li>
            <li>La TVA est calculée à consommation inchangée.</li>
            <li>Un an d’âge légal vaut ${fmt(k.agePlus)} Md€ par an en 2035, atteints progressivement ; la dérive nette des retraites et les dépenses de dépendance sont des hypothèses de l’application.</li>
            <li>Un point de chômage en moins rapporte ${fmt(k.chomagePt)} Md€ par an, en ${H.monteeChomage} ans, sans effet ajouté sur le PIB.</li>
            <li>Les effets du salaire minimum et les aides remplacées par le revenu universel (${mds(k.totalAides)} au total) sont des ordres de grandeur.</li>
            <li>Les leviers budgétaires montent en charge sur ${H.montee} ans, puis suivent le PIB. Une crise réduit le PIB de 1 % par tranche de 150 Md€, dont la moitié est rattrapée l’année suivante.</li>
            <li>Le « tendanciel » maintient les dépenses hors intérêts au rythme de la croissance, plus les programmes votés : il ignore le frein à l’endettement, qui imposerait des économies non encore décidées. Ce n’est pas une prévision officielle.</li>
          </ul>
          <p><strong>Ce que le modèle ignore :</strong> l’effet des économies, des impôts et des investissements sur la croissance, la réaction des taux au niveau de dette, les écarts entre déficit et variation de dette (le Stabilitätsrat projette une dette d’environ 80 % du PIB en 2029, en partie par des opérations financières).</p>`,
      };
    },

    en: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Long-run effect' : 'Effect'}: ${mdsSigne(g)} a year, in 2026 euros.`);
      return {
        titreDoc: 'German public debt: 10-year projection',
        h1: 'German public debt: projection 2027-2036',
        groupes: {
          economie: { titre: 'Economy' },
          depenses: { titre: 'Spending and adopted programmes', intro: 'Since the constitutional reform of March 2025, defence above 1% of GDP and the €500bn infrastructure special fund are exempt from the debt brake.' },
          postes: { titre: 'Spending by function', intro: 'Real growth of each function. Left untouched, they all follow the overall pace above.' },
          recettes: { titre: 'Revenue' },
          tva: { titre: 'VAT (Mehrwertsteuer)', intro: 'Two rates. Immediate effect, computed with unchanged consumption.',
            resume: (p) => effet(m.effetIVA(p), 'Rates unchanged.', false) },
          ir: { titre: 'Income tax, corporate tax and large fortunes',
            intro: `2026 schedule: 14%, then a progressive zone up to 42% above ${euros(H.ir.seuils[0])}, 45% above ${euros(H.ir.seuils[1])} (single person). No wealth tax since 1997.`,
            resume: (p) => effet(m.effetImpot(p), 'Schedule unchanged.') },
          retraites: { titre: 'Pensions', intro: 'Retirement age rising to 67 by 2031. The 2025 pension package guarantees a pension level of 48% until 2031, funded by the federal government.' },
          emploi: { titre: 'Jobs and ageing' },
          smi: { titre: 'Minimum wage (Mindestlohn)', intro: '€13.90 an hour in 2026, €14.60 in 2027. Increase on top of this path.',
            resume: (p) => {
              if (!p.smi) return 'Agreed path unchanged.';
              const { s, solde } = k.smiSolde(p);
              return `Unemployment ${points(s.chomage, 2)}. Long-run effect on the balance: ${mdsSigne(solde)} a year, in 2026 euros.`;
            } },
          ru: { titre: 'Universal basic income',
            intro: 'Paid to every resident, unconditionally. It replaces means-tested benefits and child benefit (Kindergeld) up to its amount; pensions and unemployment insurance are untouched.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'No universal basic income.';
              return `Gross cost ${mds(r.brut)}, benefits removed −${mds(r.aides)}, net cost ${mds(r.net)} a year (${pct(r.net / BASE.pib * 100)} of GDP)`
                + (r.financement > 0.05 ? `, of which ${mds(r.financement)} covered by the dedicated levy.` : '.');
            } },
          chocs: { titre: 'Shocks' },
        },
        curseurs: {
          croissance: { nom: 'Real GDP growth', f: (v) => pctAn(v), repere: '10-year average, excluding inflation. Potential growth estimated at around 0.5-1% a year.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'With 0.9% growth and 2.0% inflation, a deficit of about 1.9% of GDP is enough to stabilise debt.' },
          tauxMarche: { nom: 'Government borrowing rate', f: (v) => pct(v), repere: 'Average issuance rate. The 10-year Bund remains the euro area’s benchmark rate.' },
          depenses: { nom: 'Primary public spending, real terms', f: (v) => pctAn(v), repere: 'Reference: in line with growth. Excluding the programmes below.' },
          economies: { nom: 'Additional permanent savings', f: (v) => mds(v), repere: 'In 2026 €bn, reached over 3 years. The debt brake would require savings that the baseline does not include.' },
          infra: { nom: 'Infrastructure special fund spent', f: (v) => fmt(v, 0) + '%', repere: '€500bn over 12 years (2025-2036): €57.9bn planned for 2026, about €40bn a year thereafter. Booked under economic affairs.' },
          otan: { nom: 'Defence path to 3.5% of GDP', f: (v) => fmt(v, 0) + '% achieved', repere: 'Defence on NATO’s definition: about 2.8% of GDP in 2026, 3.5% targeted for 2029. 0% freezes spending at its 2026 level.' },
          prelevements: { nom: 'Public revenue ratio', f: (v) => signe(v) + ' pp of GDP', repere: 'Destatis: revenue at 47.9% of GDP in 2025, spending at 50.3%.' },
          tva19: { nom: 'Standard rate', f: (v) => pct(v), repere: `Current: 19%. One point ≈ €${fmt(H.tva.parPoint[0], 0)}bn across all levels of government. A rise to 21% is being debated.` },
          tva7: { nom: 'Reduced rate', f: (v) => pct(v), repere: `Current: 7%. Food, books, local transport, restaurants (since 2026). One point ≈ €${fmt(H.tva.parPoint[1])}bn.` },
          irZone: { nom: 'Progressive zone (14% to 42%)', f: (v) => signe(v) + ' pt', repere: `Points added to every rate below 42%. One point ≈ €${fmt(H.ir.zone, 0)}bn (app estimate).` },
          ir42: { nom: 'Top rate (Spitzensteuersatz)', f: (v) => pct(v), repere: `Current: 42% above ${euros(H.ir.seuils[0])}. Federal government: raising it to 45% would yield €14bn.` },
          ir45: { nom: 'High-income rate (Reichensteuer)', f: (v) => pct(v), repere: `Current: 45% above ${euros(H.ir.seuils[1])}. Raising it to 48% would yield €3bn. The coalition is considering 47% above €280,000.` },
          irSurtaxe: { nom: 'New top bracket', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'none'), repere: 'Rate added to the top bracket, above the threshold below.' },
          irSeuil: { nom: 'Threshold of the new bracket', f: (v) => euros(v), repere: 'The higher the threshold, the less income is left to tax.' },
          societes: { nom: 'Corporate tax, gap to the legal timetable', f: (v) => (v ? signe(v) + ' pt' : 'legal timetable'), repere: `The 15% rate falls to 10% from 2028 to 2032 (2025 law), a cut included in the baseline. One point ≈ €${fmt(H.societes.parPoint)}bn.` },
          patrimoine: { nom: 'Minimum tax on fortunes above €100m', f: (v) => (v ? pct(v) + ' a year' : 'none'), repere: `The wealth tax has been suspended since 1997. One point ≈ €${fmt(H.patrimoineParPoint, 0)}bn gross (app estimate).` },
          erosion: { nom: 'Taxpayer response', f: (v) => `−${fmt(v, 0)}% of the gain`, repere: 'Share of the gain lost to emigration, tax planning or lower activity. Applies to increases on high incomes, corporate tax and fortunes.' },
          ageLegal: { nom: 'Statutory retirement age', f: (v) => ansMois(67 + v), repere: `Reference: 67, reached in 2031. App estimate: one more year yields about €${fmt(k.agePlus, 0)}bn in 2035.` },
          cotisation: { nom: 'Pension contribution rate', f: (v) => points(v), repere: `18.6% in 2026, set to rise towards 20% by 2028. One point ≈ €${fmt(H.cotisationPoint)}bn (estimate), but raises labour costs.` },
          sousIndexation: { nom: 'Pensions uprated below wages', f: (v) => (v ? '−' + fmt(v) + ' pt/yr' : 'no'), repere: `One point less saves about €${fmt(H.sousIndexationPoint)}bn a year, kept in following years. Conflicts with the 48% guarantee until 2031.` },
          anneesSousIndexation: { nom: 'Length of under-indexation', f: (v) => u.annees(v), repere: 'From 2027.' },
          retraites: { nom: 'Net pension drift', f: (v) => fmt(v, 0) + '% of the assumption', repere: 'Baby boomers retiring and the 48% guarantee: +0.6 pp of GDP in 2036, net of contribution rises (app assumption).' },
          chomage: { nom: 'Target unemployment rate', f: (v) => pct(v), repere: `Reference: 6.3% (Federal Employment Agency, October 2026), 2.96 million unemployed. One point less yields about €${fmt(k.chomagePt, 0)}bn a year (estimate).` },
          dependance: { nom: 'Long-term care spending in 2050', f: (v) => pct(v) + ' of GDP', repere: 'Long-term care insurance and social assistance: about 1.5% of GDP in 2022, 2.1% assumed for 2050.' },
          smi: { nom: 'Minimum wage increase', f: (v) => (v ? `+${v}% (≈ €${fmt(H.smi.horaire * (1 + v / 100), 2)}/h)` : 'none'), repere: `Per point: +€${fmt(H.smi.recettesPoint, 2)}bn of contributions, taxes and lower top-up benefits, −€${fmt(H.smi.publicPoint, 2)}bn of public wages (estimates).` },
          smiEmplois: { nom: 'Jobs lost per point of increase', f: (v) => (v ? `${fmt(v * 1000, 0)} jobs` : 'none'), repere: 'Disputed assumption: the 2015 introduction of the minimum wage had limited job effects. Lost jobs feed the “unemployment” lever.' },
          ruAdulte: { nom: 'Amount per adult', f: (v) => (v ? euros(v) + '/month' : 'none'), repere: `${fmt(H.ru.adultes)} million adults: €100 a month costs ${mds(H.ru.adultes * 1.2)} a year. For reference, minimum income for a single person: €563 plus housing.` },
          ruMineur: { nom: 'Amount per child', f: (v) => (v ? euros(v) + '/month' : 'none'), repere: `${fmt(H.ru.mineurs)} million children. Replaces Kindergeld (€259 a month in 2026).` },
          ruAides: { nom: 'Benefits removed in return', f: (v) => fmt(v, 0) + '% of what can be absorbed', repere: 'A benefit is removed in proportion to the basic income relative to its average amount: Bürgergeld, old-age minimum income, Kindergeld, half of housing support.' },
          ruFinancement: { nom: 'Share funded by a dedicated levy', f: (v) => fmt(v, 0) + '%', repere: 'A flat tax on all income, for instance. Computed with no effect on activity.' },
          crise: { nom: 'Cost of a crisis', f: (v) => (v ? mds(v) : 'none'), repere: 'Covid: debt rose from about 59% to 68% of GDP between 2019 and 2020.' },
          anneeCrise: { nom: 'Year of the crisis', f: (v) => String(v), repere: 'Cost split 60% / 40% over two years, with a fall in GDP.' },
        },
        postes: {
          defense: { nom: 'Defence', note: 'Defence function as defined by Eurostat, narrower than NATO’s. The path to 3.5% of GDP is added here.' },
          enseignement: { nom: 'Education', note: 'Schools and universities, run mostly by the Länder.' },
          sante: { nom: 'Health', note: 'Statutory health insurance, hospitals.' },
          retraites: { nom: 'Pensions', note: 'Statutory pension insurance and civil-service pensions. The “Pensions” sliders add to it.' },
          social: { nom: 'Other social protection', note: 'Unemployment, family, disability, long-term care, Bürgergeld. Universal basic income, net of the benefits it replaces, is added here.' },
          securite: { nom: 'Public order and justice', note: 'Federal and state police, courts, prisons.' },
          economie: { nom: 'Economic affairs', note: 'Transport, energy, business support. The infrastructure special fund is added here.' },
          general: { nom: 'General services', note: 'General administration, transfers to the EU, basic research. Excluding interest.' },
          cadre: { nom: 'Housing, environment, culture', note: 'Housing, environment, culture and sport.' },
        },
        prereglages: {
          tendanciel: 'Baseline', consolidation: 'Consolidation', sansInfra: 'No infrastructure fund', defenseGelee: 'Defence frozen',
          taux: 'High rates', croissance: 'Strong growth', retraite68: 'Retirement at 68', tva21: 'VAT at 21%',
          hauts: 'Tax top incomes', ru: 'Basic income', crise: 'Crisis in 2029',
        },
        nonVentile: (montant, annee) => `Not allocated (across-the-board savings, public-sector minimum wage, crisis): ${montant} in ${annee}.`,
        methode: (d) => `
          <p>Same method as the French and Spanish simulators. Each year, debt rises by the deficit: primary spending, minus revenue, plus interest. GDP grows with real growth and inflation; revenue tracks GDP; primary spending follows its own path.</p>
          <p><strong>Estimated starting point (end-${d.annee}):</strong> GDP ${mds(d.pib)}, debt ${mds(d.dette)} (${pct(d.ratio)} of GDP, Stability Council projection of May 2026), deficit ${pct(-d.soldePib)} of GDP, interest ${mds(d.interets)}. The latest outturn is the Bundesbank’s for end-2025: ${mds(COMPTES_2025.dette)}, ${pct(COMPTES_2025.ratio)} of GDP.</p>
          <p><strong>Assumptions specific to the app, not taken from the sources:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)}% of the debt stock is refinanced each year at the market rate, and all new debt is.</li>
            <li>The infrastructure special fund spends 1.25% of GDP in 2026, then 0.85% in 2027 and 0.7% in 2036; defence on NATO’s definition goes from 2.8% of GDP in 2026 to 3.5% in 2029. These paths approximate announced plans.</li>
            <li>2024 amounts per function are reconstructed from the GDP shares published by Eurostat and the Destatis total: they are orders of magnitude.</li>
            <li>Per-point yields of VAT and income tax follow the public costings quoted; those of the progressive zone, corporate tax and the minimum tax on fortunes are the app’s estimates, reliable to within 30-50%.</li>
            <li>VAT is computed with unchanged consumption.</li>
            <li>One year of retirement age is worth €${fmt(k.agePlus)}bn a year in 2035, phased in; net pension drift and long-term care spending are app assumptions.</li>
            <li>One point less unemployment yields €${fmt(k.chomagePt)}bn a year, over ${H.monteeChomage} years, with no added effect on GDP.</li>
            <li>Minimum-wage effects and the benefits replaced by basic income (${mds(k.totalAides)} in total) are orders of magnitude.</li>
            <li>Fiscal levers phase in over ${H.montee} years, then grow with GDP. A crisis cuts GDP by 1% per €150bn, half of which is recovered the following year.</li>
            <li>The “baseline” keeps primary spending growing with the economy, plus the adopted programmes: it ignores the debt brake, which would require savings not yet decided. It is not an official forecast.</li>
          </ul>
          <p><strong>What the model ignores:</strong> the effect of savings, taxes and investment on growth, the response of interest rates to the debt level, and gaps between the deficit and the change in debt (the Stability Council projects debt of about 80% of GDP in 2029, partly through financial transactions).</p>`,
      };
    },

    es: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Efecto${aTerme ? ' a largo plazo' : ''}: ${mdsSigne(g)} al año, en euros de 2026.`);
      return {
        titreDoc: 'Deuda pública alemana: proyección a 10 años',
        h1: 'Deuda pública alemana: proyección 2027-2036',
        groupes: {
          economie: { titre: 'Economía' },
          depenses: { titre: 'Gasto y programas aprobados', intro: 'Desde la reforma constitucional de marzo de 2025, el gasto en defensa por encima del 1 % del PIB y el fondo especial de 500 mil M€ para infraestructuras quedan fuera del freno de la deuda.' },
          postes: { titre: 'Gasto por función', intro: 'Crecimiento real de cada función. Sin ajustes, todas siguen el ritmo general indicado arriba.' },
          recettes: { titre: 'Ingresos' },
          tva: { titre: 'IVA (Mehrwertsteuer)', intro: 'Dos tipos. Efecto inmediato, calculado con consumo constante.',
            resume: (p) => effet(m.effetIVA(p), 'Tipos sin cambios.', false) },
          ir: { titre: 'Impuesto sobre la renta, sociedades y grandes patrimonios',
            intro: `Tarifa 2026: 14 % y después una zona progresiva hasta el 42 % por encima de ${euros(H.ir.seuils[0])}, 45 % por encima de ${euros(H.ir.seuils[1])} (persona sola). Sin impuesto sobre el patrimonio desde 1997.`,
            resume: (p) => effet(m.effetImpot(p), 'Tarifa sin cambios.') },
          retraites: { titre: 'Pensiones', intro: 'Edad de jubilación elevada a 67 años de aquí a 2031. El paquete de pensiones de 2025 garantiza un nivel de las pensiones del 48 % hasta 2031, financiado por el Estado federal.' },
          emploi: { titre: 'Empleo y envejecimiento' },
          smi: { titre: 'Salario mínimo (Mindestlohn)', intro: '13,90 € por hora en 2026 y 14,60 € en 2027. Subida añadida a esta senda.',
            resume: (p) => {
              if (!p.smi) return 'Senda acordada sin cambios.';
              const { s, solde } = k.smiSolde(p);
              return `Paro ${points(s.chomage, 2)}. Efecto a largo plazo sobre el saldo: ${mdsSigne(solde)} al año, en euros de 2026.`;
            } },
          ru: { titre: 'Renta básica universal',
            intro: 'Pagada a cada residente, sin condiciones. Sustituye las ayudas sujetas a recursos y el Kindergeld hasta su importe; las pensiones y el seguro de desempleo no se tocan.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Sin renta básica.';
              return `Coste bruto ${mds(r.brut)}, ayudas suprimidas −${mds(r.aides)}, coste neto ${mds(r.net)} al año (${pct(r.net / BASE.pib * 100)} del PIB)`
                + (r.financement > 0.05 ? `, de los que ${mds(r.financement)} cubiertos por el impuesto específico.` : '.');
            } },
          chocs: { titre: 'Perturbaciones' },
        },
        curseurs: {
          croissance: { nom: 'Crecimiento real del PIB', f: (v) => pctAn(v), repere: 'Media a 10 años, sin inflación. Crecimiento potencial estimado en torno al 0,5-1 % anual.' },
          inflation: { nom: 'Inflación', f: (v) => pctAn(v), repere: 'Con un 0,9 % de crecimiento y un 2,0 % de inflación, un déficit de en torno al 1,9 % del PIB basta para estabilizar la deuda.' },
          tauxMarche: { nom: 'Tipo de emisión del Estado', f: (v) => pct(v), repere: 'Tipo medio de emisión. El Bund a 10 años sigue siendo el tipo de referencia de la zona del euro.' },
          depenses: { nom: 'Gasto público primario, en volumen', f: (v) => pctAn(v), repere: 'Referencia: al ritmo del crecimiento. Sin los programas siguientes.' },
          economies: { nom: 'Ahorros permanentes adicionales', f: (v) => mds(v), repere: 'En mil M€ de 2026, alcanzados en 3 años. El freno de la deuda exigiría ahorros que el tendencial no incluye.' },
          infra: { nom: 'Fondo especial de infraestructuras gastado', f: (v) => fmt(v, 0) + ' %', repere: '500 mil M€ en 12 años (2025-2036): 57,9 mil M€ previstos en 2026 y unos 40 mil M€ anuales después. Imputado a asuntos económicos.' },
          otan: { nom: 'Senda de defensa hacia el 3,5 % del PIB', f: (v) => fmt(v, 0) + ' % cumplido', repere: 'Defensa según la OTAN: en torno al 2,8 % del PIB en 2026 y un 3,5 % previsto para 2029. Un 0 % congela el gasto en su nivel de 2026.' },
          prelevements: { nom: 'Ratio de ingresos públicos', f: (v) => signe(v) + ' pp del PIB', repere: 'Destatis: ingresos del 47,9 % del PIB en 2025, gasto del 50,3 %.' },
          tva19: { nom: 'Tipo general', f: (v) => pct(v), repere: `Actual: 19 %. Un punto ≈ ${fmt(H.tva.parPoint[0], 0)} mil M€ para el conjunto de las administraciones. Se debate una subida al 21 %.` },
          tva7: { nom: 'Tipo reducido', f: (v) => pct(v), repere: `Actual: 7 %. Alimentación, libros, transporte local, restauración (desde 2026). Un punto ≈ ${fmt(H.tva.parPoint[1])} mil M€.` },
          irZone: { nom: 'Zona progresiva (del 14 al 42 %)', f: (v) => signe(v) + ' pt', repere: `Puntos añadidos a todos los tipos por debajo del 42 %. Un punto ≈ ${fmt(H.ir.zone, 0)} mil M€ (estimación de la aplicación).` },
          ir42: { nom: 'Tipo superior (Spitzensteuersatz)', f: (v) => pct(v), repere: `Actual: 42 % por encima de ${euros(H.ir.seuils[0])}. Gobierno federal: pasar al 45 % aportaría 14 mil M€.` },
          ir45: { nom: 'Tipo de las rentas altas (Reichensteuer)', f: (v) => pct(v), repere: `Actual: 45 % por encima de ${euros(H.ir.seuils[1])}. Pasar al 48 % aportaría 3 mil M€. La coalición estudia un 47 % por encima de 280 000 €.` },
          irSurtaxe: { nom: 'Nuevo tramo superior', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} pts)` : 'ninguno'), repere: 'Tipo añadido al del último tramo, por encima del umbral siguiente.' },
          irSeuil: { nom: 'Umbral del nuevo tramo', f: (v) => euros(v), repere: 'Cuanto más alto el umbral, menos renta queda por gravar.' },
          societes: { nom: 'Impuesto sobre sociedades, desvío del calendario legal', f: (v) => (v ? signe(v) + ' pt' : 'calendario legal'), repere: `El tipo del 15 % baja al 10 % de 2028 a 2032 (ley de 2025), bajada incluida en el tendencial. Un punto ≈ ${fmt(H.societes.parPoint)} mil M€.` },
          patrimoine: { nom: 'Impuesto mínimo sobre patrimonios de más de 100 M€', f: (v) => (v ? pct(v) + ' al año' : 'ninguno'), repere: `El impuesto sobre el patrimonio está suspendido desde 1997. Un punto ≈ ${fmt(H.patrimoineParPoint, 0)} mil M€ brutos (estimación de la aplicación).` },
          erosion: { nom: 'Reacción de los contribuyentes', f: (v) => `−${fmt(v, 0)} % de la ganancia`, repere: 'Parte de la ganancia perdida por marchas, optimización o menor actividad. Se aplica a las subidas sobre rentas altas, sociedades y patrimonios.' },
          ageLegal: { nom: 'Edad legal de jubilación', f: (v) => ansMois(67 + v), repere: `Referencia: 67 años, alcanzados en 2031. Estimación de la aplicación: un año más aporta unos ${fmt(k.agePlus, 0)} mil M€ en 2035.` },
          cotisation: { nom: 'Tipo de cotización por jubilación', f: (v) => points(v), repere: `18,6 % en 2026, con previsión de subir hacia el 20 % en 2028. Un punto ≈ ${fmt(H.cotisationPoint)} mil M€ (estimación), pero encarece el trabajo.` },
          sousIndexation: { nom: 'Pensiones revalorizadas por debajo de los salarios', f: (v) => (v ? '−' + fmt(v) + ' pt/año' : 'no'), repere: `Un punto menos ahorra unos ${fmt(H.sousIndexationPoint)} mil M€ al año, que se consolidan los años siguientes. Contrario a la garantía del 48 % hasta 2031.` },
          anneesSousIndexation: { nom: 'Duración de la subindexación', f: (v) => u.annees(v), repere: 'A partir de 2027.' },
          retraites: { nom: 'Deriva neta de las pensiones', f: (v) => fmt(v, 0) + ' % de la hipótesis', repere: 'Jubilación del baby boom y nivel garantizado del 48 %: +0,6 puntos del PIB en 2036, neto de subidas de cotizaciones (hipótesis de la aplicación).' },
          chomage: { nom: 'Tasa de paro objetivo', f: (v) => pct(v), repere: `Referencia: 6,3 % (Agencia Federal de Empleo, octubre de 2026), 2,96 millones de parados. Un punto menos aporta unos ${fmt(k.chomagePt, 0)} mil M€ al año (estimación).` },
          dependance: { nom: 'Gasto en dependencia en 2050', f: (v) => pct(v) + ' del PIB', repere: 'Seguro de dependencia y asistencia social: en torno al 1,5 % del PIB en 2022; se supone un 2,1 % en 2050.' },
          smi: { nom: 'Subida del salario mínimo', f: (v) => (v ? `+${v} % (≈ ${fmt(H.smi.horaire * (1 + v / 100), 2)} €/h)` : 'ninguna'), repere: `Por punto: +${fmt(H.smi.recettesPoint, 2)} mil M€ de cotizaciones, impuestos y menores complementos sociales, −${fmt(H.smi.publicPoint, 2)} mil M€ de salarios públicos (estimaciones).` },
          smiEmplois: { nom: 'Empleos perdidos por punto de subida', f: (v) => (v ? `${fmt(v * 1000, 0)} empleos` : 'ninguno'), repere: 'Hipótesis discutida: la introducción del salario mínimo en 2015 tuvo efectos limitados sobre el empleo. Los empleos perdidos pasan por el control «paro».' },
          ruAdulte: { nom: 'Importe por adulto', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'), repere: `${fmt(H.ru.adultes)} millones de adultos: 100 € al mes cuestan ${mds(H.ru.adultes * 1.2)} al año. Como referencia, renta mínima de una persona sola: 563 € más la vivienda.` },
          ruMineur: { nom: 'Importe por menor', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'), repere: `${fmt(H.ru.mineurs)} millones de menores. Sustituye el Kindergeld (259 € al mes en 2026).` },
          ruAides: { nom: 'Ayudas suprimidas a cambio', f: (v) => fmt(v, 0) + ' % de lo absorbible', repere: 'Una ayuda se suprime en proporción a la renta básica respecto a su importe medio: Bürgergeld, mínimo de vejez, Kindergeld, la mitad de las ayudas a la vivienda.' },
          ruFinancement: { nom: 'Parte financiada por un impuesto específico', f: (v) => fmt(v, 0) + ' %', repere: 'Un impuesto proporcional sobre todas las rentas, por ejemplo. Calculado sin efecto sobre la actividad.' },
          crise: { nom: 'Coste de una crisis', f: (v) => (v ? mds(v) : 'ninguna'), repere: 'Covid: la deuda pasó de en torno al 59 % al 68 % del PIB entre 2019 y 2020.' },
          anneeCrise: { nom: 'Año de la crisis', f: (v) => String(v), repere: 'Coste repartido 60 % / 40 % en dos años, con caída del PIB.' },
        },
        postes: {
          defense: { nom: 'Defensa', note: 'Función de defensa según Eurostat, más estrecha que la de la OTAN. La senda hacia el 3,5 % del PIB se suma aquí.' },
          enseignement: { nom: 'Educación', note: 'Escuelas y universidades, gestionadas sobre todo por los Länder.' },
          sante: { nom: 'Sanidad', note: 'Seguro de enfermedad obligatorio, hospitales.' },
          retraites: { nom: 'Pensiones', note: 'Seguro de pensiones obligatorio y pensiones de los funcionarios. Los controles del grupo «Pensiones» se suman aquí.' },
          social: { nom: 'Otra protección social', note: 'Desempleo, familia, invalidez, dependencia, Bürgergeld. La renta básica, neta de las ayudas que sustituye, se suma aquí.' },
          securite: { nom: 'Orden público y justicia', note: 'Policías federal y de los Länder, justicia, prisiones.' },
          economie: { nom: 'Asuntos económicos', note: 'Transporte, energía, ayudas a empresas. El fondo especial de infraestructuras se suma aquí.' },
          general: { nom: 'Servicios generales', note: 'Administración general, transferencias a la UE, investigación básica. Sin intereses.' },
          cadre: { nom: 'Vivienda, medio ambiente, cultura', note: 'Vivienda, medio ambiente, cultura y deporte.' },
        },
        prereglages: {
          tendanciel: 'Tendencial', consolidation: 'Consolidación', sansInfra: 'Sin fondo de infraestructuras', defenseGelee: 'Defensa congelada',
          taux: 'Tipos altos', croissance: 'Crecimiento fuerte', retraite68: 'Jubilación a los 68', tva21: 'IVA al 21 %',
          hauts: 'Gravar las rentas altas', ru: 'Renta básica', crise: 'Crisis en 2029',
        },
        nonVentile: (montant, annee) => `Sin asignar (ahorros transversales, salario mínimo de los empleados públicos, crisis): ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Mismo método que los simuladores francés y español. Cada año, la deuda aumenta en el importe del déficit: gasto primario, menos ingresos, más intereses. El PIB crece con el crecimiento real y la inflación; los ingresos siguen al PIB; el gasto primario sigue su propio ritmo.</p>
          <p><strong>Punto de partida estimado (finales de ${d.annee}):</strong> PIB ${mds(d.pib)}, deuda ${mds(d.dette)} (${pct(d.ratio)} del PIB, proyección del Consejo de Estabilidad de mayo de 2026), déficit del ${pct(-d.soldePib)} del PIB, intereses ${mds(d.interets)}. El último dato observado es el del Bundesbank para finales de 2025: ${mds(COMPTES_2025.dette)}, el ${pct(COMPTES_2025.ratio)} del PIB.</p>
          <p><strong>Hipótesis propias de la aplicación, no tomadas de las fuentes:</strong></p>
          <ul>
            <li>El ${fmt(H.refinancement * 100)} % del saldo vivo se refinancia cada año al tipo de mercado, y toda la deuda nueva también.</li>
            <li>El fondo especial de infraestructuras gasta el 1,25 % del PIB en 2026, después el 0,85 % en 2027 y el 0,7 % en 2036; la defensa según la OTAN pasa del 2,8 % del PIB en 2026 al 3,5 % en 2029. Estas sendas aproximan los planes anunciados.</li>
            <li>Los importes por función de 2024 se reconstruyen a partir de los porcentajes del PIB publicados por Eurostat y del total de Destatis: son órdenes de magnitud.</li>
            <li>Los rendimientos por punto del IVA y del impuesto sobre la renta siguen las cuantificaciones públicas citadas; los de la zona progresiva, del impuesto sobre sociedades y del impuesto mínimo sobre patrimonios son estimaciones de la aplicación, fiables con un margen del 30 al 50 %.</li>
            <li>El IVA se calcula con consumo constante.</li>
            <li>Un año de edad legal equivale a ${fmt(k.agePlus)} mil M€ al año en 2035, alcanzados progresivamente; la deriva neta de las pensiones y el gasto en dependencia son hipótesis de la aplicación.</li>
            <li>Un punto menos de paro aporta ${fmt(k.chomagePt)} mil M€ al año, en ${H.monteeChomage} años, sin efecto adicional sobre el PIB.</li>
            <li>Los efectos del salario mínimo y las ayudas sustituidas por la renta básica (${mds(k.totalAides)} en total) son órdenes de magnitud.</li>
            <li>Las palancas presupuestarias se despliegan en ${H.montee} años y después siguen al PIB. Una crisis reduce el PIB un 1 % por cada 150 mil M€, la mitad del cual se recupera al año siguiente.</li>
            <li>El «tendencial» mantiene el gasto primario al ritmo del crecimiento, más los programas aprobados: ignora el freno de la deuda, que exigiría ahorros aún no decididos. No es una previsión oficial.</li>
          </ul>
          <p><strong>Lo que el modelo no tiene en cuenta:</strong> el efecto de los ahorros, los impuestos y la inversión sobre el crecimiento, la reacción de los tipos al nivel de deuda y las diferencias entre déficit y variación de la deuda (el Consejo de Estabilidad proyecta una deuda de en torno al 80 % del PIB en 2029, en parte por operaciones financieras).</p>`,
      };
    },

    de: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Langfristige Wirkung' : 'Wirkung'}: ${mdsSigne(g)} pro Jahr, in Euro von 2026.`);
      return {
        titreDoc: 'Deutsche Staatsschulden: Projektion über 10 Jahre',
        h1: 'Deutsche Staatsschulden: Projektion 2027-2036',
        groupes: {
          economie: { titre: 'Wirtschaft' },
          depenses: { titre: 'Ausgaben und beschlossene Programme', intro: 'Seit der Grundgesetzänderung vom März 2025 sind Verteidigungsausgaben über 1 % des BIP und das Sondervermögen Infrastruktur von 500 Mrd. € von der Schuldenbremse ausgenommen.' },
          postes: { titre: 'Ausgaben nach Aufgabenbereich', intro: 'Reales Wachstum jedes Bereichs. Ohne Einstellung folgen alle dem allgemeinen Tempo oben.' },
          recettes: { titre: 'Einnahmen' },
          tva: { titre: 'Mehrwertsteuer', intro: 'Zwei Sätze. Sofortige Wirkung, berechnet bei unverändertem Konsum.',
            resume: (p) => effet(m.effetIVA(p), 'Sätze unverändert.', false) },
          ir: { titre: 'Einkommensteuer, Körperschaftsteuer und große Vermögen',
            intro: `Tarif 2026: 14 %, dann eine Progressionszone bis 42 % ab ${euros(H.ir.seuils[0])}, 45 % ab ${euros(H.ir.seuils[1])} (Alleinstehende). Keine Vermögensteuer seit 1997.`,
            resume: (p) => effet(m.effetImpot(p), 'Tarif unverändert.') },
          retraites: { titre: 'Renten', intro: 'Regelaltersgrenze steigt bis 2031 auf 67 Jahre. Das Rentenpaket 2025 garantiert ein Rentenniveau von 48 % bis 2031, finanziert vom Bund.' },
          emploi: { titre: 'Beschäftigung und Alterung' },
          smi: { titre: 'Mindestlohn', intro: '13,90 € pro Stunde im Jahr 2026, 14,60 € im Jahr 2027. Erhöhung zusätzlich zu diesem Pfad.',
            resume: (p) => {
              if (!p.smi) return 'Beschlossener Pfad unverändert.';
              const { s, solde } = k.smiSolde(p);
              return `Arbeitslosigkeit ${points(s.chomage, 2)}. Langfristige Wirkung auf den Saldo: ${mdsSigne(solde)} pro Jahr, in Euro von 2026.`;
            } },
          ru: { titre: 'Bedingungsloses Grundeinkommen',
            intro: 'An jede Einwohnerin und jeden Einwohner ohne Bedingungen gezahlt. Es ersetzt bedürftigkeitsgeprüfte Leistungen und das Kindergeld bis zu seiner Höhe; Renten und Arbeitslosenversicherung bleiben unberührt.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Kein Grundeinkommen.';
              return `Bruttokosten ${mds(r.brut)}, gestrichene Leistungen −${mds(r.aides)}, Nettokosten ${mds(r.net)} pro Jahr (${pct(r.net / BASE.pib * 100)} des BIP)`
                + (r.financement > 0.05 ? `, davon ${mds(r.financement)} durch die eigene Abgabe gedeckt.` : '.');
            } },
          chocs: { titre: 'Schocks' },
        },
        curseurs: {
          croissance: { nom: 'Reales BIP-Wachstum', f: (v) => pctAn(v), repere: 'Durchschnitt über 10 Jahre, ohne Inflation. Das Potenzialwachstum wird auf etwa 0,5 bis 1 % pro Jahr geschätzt.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'Bei 0,9 % Wachstum und 2,0 % Inflation reicht ein Defizit von etwa 1,9 % des BIP, um die Schulden zu stabilisieren.' },
          tauxMarche: { nom: 'Emissionszins des Staates', f: (v) => pct(v), repere: 'Durchschnittlicher Emissionszins. Die zehnjährige Bundesanleihe bleibt der Referenzzins des Euroraums.' },
          depenses: { nom: 'Primärausgaben, real', f: (v) => pctAn(v), repere: 'Referenz: im Tempo des Wachstums. Ohne die folgenden Programme.' },
          economies: { nom: 'Zusätzliche dauerhafte Einsparungen', f: (v) => mds(v), repere: 'In Mrd. € von 2026, in 3 Jahren erreicht. Die Schuldenbremse würde Einsparungen erfordern, die das Basisszenario nicht enthält.' },
          infra: { nom: 'Ausgeschöpftes Sondervermögen Infrastruktur', f: (v) => fmt(v, 0) + ' %', repere: '500 Mrd. € über 12 Jahre (2025-2036): 57,9 Mrd. € für 2026 veranschlagt, danach etwa 40 Mrd. € pro Jahr. Den wirtschaftlichen Angelegenheiten zugeordnet.' },
          otan: { nom: 'Verteidigungspfad zu 3,5 % des BIP', f: (v) => fmt(v, 0) + ' % umgesetzt', repere: 'Verteidigung nach NATO-Definition: etwa 2,8 % des BIP im Jahr 2026, 3,5 % für 2029 angestrebt. 0 % friert die Ausgaben auf dem Niveau von 2026 ein.' },
          prelevements: { nom: 'Staatliche Einnahmenquote', f: (v) => signe(v) + ' Pp. des BIP', repere: 'Destatis: Einnahmen 2025 bei 47,9 % des BIP, Ausgaben bei 50,3 %.' },
          tva19: { nom: 'Regelsatz', f: (v) => pct(v), repere: `Aktuell: 19 %. Ein Punkt ≈ ${fmt(H.tva.parPoint[0], 0)} Mrd. € für alle staatlichen Ebenen. Eine Anhebung auf 21 % wird diskutiert.` },
          tva7: { nom: 'Ermäßigter Satz', f: (v) => pct(v), repere: `Aktuell: 7 %. Lebensmittel, Bücher, Nahverkehr, Gastronomie (seit 2026). Ein Punkt ≈ ${fmt(H.tva.parPoint[1])} Mrd. €.` },
          irZone: { nom: 'Progressionszone (14 bis 42 %)', f: (v) => signe(v) + ' Pkt.', repere: `Punkte, die zu allen Sätzen unter 42 % hinzukommen. Ein Punkt ≈ ${fmt(H.ir.zone, 0)} Mrd. € (Schätzung der Anwendung).` },
          ir42: { nom: 'Spitzensteuersatz', f: (v) => pct(v), repere: `Aktuell: 42 % ab ${euros(H.ir.seuils[0])}. Bundesregierung: 45 % brächten 14 Mrd. €.` },
          ir45: { nom: 'Reichensteuer', f: (v) => pct(v), repere: `Aktuell: 45 % ab ${euros(H.ir.seuils[1])}. 48 % brächten 3 Mrd. €. Die Koalition erwägt 47 % ab 280 000 €.` },
          irSurtaxe: { nom: 'Neue Spitzenstufe', f: (v, p) => (v ? `${pct(p.ir45 + v)} (+${v} Pkt.)` : 'keine'), repere: 'Zuschlag auf den Satz der obersten Stufe, oberhalb der folgenden Schwelle.' },
          irSeuil: { nom: 'Schwelle der neuen Stufe', f: (v) => euros(v), repere: 'Je höher die Schwelle, desto weniger Einkommen bleibt zu besteuern.' },
          societes: { nom: 'Körperschaftsteuer, Abweichung vom gesetzlichen Pfad', f: (v) => (v ? signe(v) + ' Pkt.' : 'gesetzlicher Pfad'), repere: `Der Satz von 15 % sinkt von 2028 bis 2032 auf 10 % (Gesetz von 2025); die Senkung ist im Basisszenario enthalten. Ein Punkt ≈ ${fmt(H.societes.parPoint)} Mrd. €.` },
          patrimoine: { nom: 'Mindeststeuer auf Vermögen über 100 Mio. €', f: (v) => (v ? pct(v) + ' pro Jahr' : 'keine'), repere: `Die Vermögensteuer ist seit 1997 ausgesetzt. Ein Punkt ≈ ${fmt(H.patrimoineParPoint, 0)} Mrd. € brutto (Schätzung der Anwendung).` },
          erosion: { nom: 'Reaktion der Steuerpflichtigen', f: (v) => `−${fmt(v, 0)} % des Ertrags`, repere: 'Anteil des Ertrags, der durch Abwanderung, Steuergestaltung oder geringere Aktivität verloren geht. Gilt für Erhöhungen auf hohe Einkommen, Unternehmen und Vermögen.' },
          ageLegal: { nom: 'Regelaltersgrenze', f: (v) => ansMois(67 + v), repere: `Referenz: 67 Jahre, erreicht 2031. Schätzung der Anwendung: Ein Jahr mehr bringt 2035 etwa ${fmt(k.agePlus, 0)} Mrd. €.` },
          cotisation: { nom: 'Rentenbeitragssatz', f: (v) => points(v), repere: `18,6 % im Jahr 2026, bis 2028 voraussichtlich gegen 20 %. Ein Punkt ≈ ${fmt(H.cotisationPoint)} Mrd. € (Schätzung), verteuert aber die Arbeit.` },
          sousIndexation: { nom: 'Rentenanpassung unter den Löhnen', f: (v) => (v ? '−' + fmt(v) + ' Pkt./Jahr' : 'nein'), repere: `Ein Punkt weniger spart etwa ${fmt(H.sousIndexationPoint)} Mrd. € pro Jahr, die in den Folgejahren erhalten bleiben. Widerspricht der 48-%-Garantie bis 2031.` },
          anneesSousIndexation: { nom: 'Dauer der Unterindexierung', f: (v) => u.annees(v), repere: 'Ab 2027.' },
          retraites: { nom: 'Netto-Anstieg der Rentenlasten', f: (v) => fmt(v, 0) + ' % der Annahme', repere: 'Renteneintritt der Babyboomer und garantiertes Niveau von 48 %: +0,6 Pp. des BIP im Jahr 2036, abzüglich Beitragserhöhungen (Annahme der Anwendung).' },
          chomage: { nom: 'Angestrebte Arbeitslosenquote', f: (v) => pct(v), repere: `Referenz: 6,3 % (Bundesagentur für Arbeit, Oktober 2026), 2,96 Millionen Arbeitslose. Ein Punkt weniger bringt etwa ${fmt(k.chomagePt, 0)} Mrd. € pro Jahr (Schätzung).` },
          dependance: { nom: 'Pflegeausgaben im Jahr 2050', f: (v) => pct(v) + ' des BIP', repere: 'Pflegeversicherung und Hilfe zur Pflege: etwa 1,5 % des BIP im Jahr 2022; für 2050 werden 2,1 % angenommen.' },
          smi: { nom: 'Erhöhung des Mindestlohns', f: (v) => (v ? `+${v} % (≈ ${fmt(H.smi.horaire * (1 + v / 100), 2)} €/Std.)` : 'keine'), repere: `Je Punkt: +${fmt(H.smi.recettesPoint, 2)} Mrd. € Beiträge, Steuern und geringere Aufstockerleistungen, −${fmt(H.smi.publicPoint, 2)} Mrd. € öffentliche Löhne (Schätzungen).` },
          smiEmplois: { nom: 'Verlorene Stellen je Erhöhungspunkt', f: (v) => (v ? `${fmt(v * 1000, 0)} Stellen` : 'keine'), repere: 'Umstrittene Annahme: Die Einführung des Mindestlohns 2015 hatte begrenzte Beschäftigungseffekte. Verlorene Stellen wirken über den Regler „Arbeitslosigkeit“.' },
          ruAdulte: { nom: 'Betrag je Erwachsenem', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'), repere: `${fmt(H.ru.adultes)} Millionen Erwachsene: 100 € pro Monat kosten ${mds(H.ru.adultes * 1.2)} pro Jahr. Zum Vergleich: Regelsatz für Alleinstehende 563 € plus Unterkunft.` },
          ruMineur: { nom: 'Betrag je Kind', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'), repere: `${fmt(H.ru.mineurs)} Millionen Minderjährige. Ersetzt das Kindergeld (259 € pro Monat im Jahr 2026).` },
          ruAides: { nom: 'Im Gegenzug gestrichene Leistungen', f: (v) => fmt(v, 0) + ' % des Ersetzbaren', repere: 'Eine Leistung wird im Verhältnis des Grundeinkommens zu ihrem Durchschnittsbetrag gestrichen: Bürgergeld, Grundsicherung im Alter, Kindergeld, die Hälfte der Wohnkostenhilfen.' },
          ruFinancement: { nom: 'Durch eine eigene Abgabe finanzierter Anteil', f: (v) => fmt(v, 0) + ' %', repere: 'Zum Beispiel eine proportionale Steuer auf alle Einkommen. Ohne Wirkung auf die Wirtschaftstätigkeit berechnet.' },
          crise: { nom: 'Kosten einer Krise', f: (v) => (v ? mds(v) : 'keine'), repere: 'Covid: Die Schulden stiegen zwischen 2019 und 2020 von etwa 59 % auf 68 % des BIP.' },
          anneeCrise: { nom: 'Jahr der Krise', f: (v) => String(v), repere: 'Kosten zu 60 % / 40 % auf zwei Jahre verteilt, mit BIP-Rückgang.' },
        },
        postes: {
          defense: { nom: 'Verteidigung', note: 'Verteidigung nach Eurostat-Abgrenzung, enger als die der NATO. Der Pfad zu 3,5 % des BIP kommt hinzu.' },
          enseignement: { nom: 'Bildung', note: 'Schulen und Hochschulen, überwiegend Sache der Länder.' },
          sante: { nom: 'Gesundheit', note: 'Gesetzliche Krankenversicherung, Krankenhäuser.' },
          retraites: { nom: 'Renten', note: 'Gesetzliche Rentenversicherung und Beamtenpensionen. Die Regler der Gruppe „Renten“ kommen hinzu.' },
          social: { nom: 'Sonstige soziale Sicherung', note: 'Arbeitslosigkeit, Familie, Invalidität, Pflege, Bürgergeld. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.' },
          securite: { nom: 'Öffentliche Ordnung und Justiz', note: 'Bundes- und Landespolizei, Justiz, Gefängnisse.' },
          economie: { nom: 'Wirtschaftliche Angelegenheiten', note: 'Verkehr, Energie, Unternehmenshilfen. Das Sondervermögen Infrastruktur kommt hinzu.' },
          general: { nom: 'Allgemeine Verwaltung', note: 'Allgemeine Verwaltung, Zahlungen an die EU, Grundlagenforschung. Ohne Zinsen.' },
          cadre: { nom: 'Wohnen, Umwelt, Kultur', note: 'Wohnungswesen, Umwelt, Kultur und Sport.' },
        },
        prereglages: {
          tendanciel: 'Basisszenario', consolidation: 'Konsolidierung', sansInfra: 'Ohne Infrastrukturfonds', defenseGelee: 'Verteidigung eingefroren',
          taux: 'Hohe Zinsen', croissance: 'Starkes Wachstum', retraite68: 'Rente mit 68', tva21: 'Mehrwertsteuer 21 %',
          hauts: 'Hohe Einkommen besteuern', ru: 'Grundeinkommen', crise: 'Krise 2029',
        },
        nonVentile: (montant, annee) => `Nicht zugeordnet (Querschnittseinsparungen, Mindestlohn im öffentlichen Dienst, Krise): ${montant} im Jahr ${annee}.`,
        methode: (d) => `
          <p>Gleiche Methode wie die Simulatoren für Frankreich und Spanien. Jedes Jahr steigen die Schulden um das Defizit: Primärausgaben minus Einnahmen plus Zinsen. Das BIP wächst mit dem realen Wachstum und der Inflation; die Einnahmen folgen dem BIP; die Primärausgaben folgen ihrem eigenen Tempo.</p>
          <p><strong>Geschätzter Ausgangspunkt (Ende ${d.annee}):</strong> BIP ${mds(d.pib)}, Schulden ${mds(d.dette)} (${pct(d.ratio)} des BIP, Projektion des Stabilitätsrats vom Mai 2026), Defizit ${pct(-d.soldePib)} des BIP, Zinsen ${mds(d.interets)}. Der letzte gemessene Wert ist der der Bundesbank für Ende 2025: ${mds(COMPTES_2025.dette)}, ${pct(COMPTES_2025.ratio)} des BIP.</p>
          <p><strong>Eigene Annahmen der Anwendung, nicht aus den Quellen:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % des Schuldenstands werden jedes Jahr zum Marktzins refinanziert, neue Schulden vollständig.</li>
            <li>Das Sondervermögen Infrastruktur gibt 2026 1,25 % des BIP aus, 2027 dann 0,85 % und 2036 0,7 %; die Verteidigung nach NATO-Definition steigt von 2,8 % des BIP im Jahr 2026 auf 3,5 % im Jahr 2029. Diese Pfade nähern die angekündigten Pläne an.</li>
            <li>Die Beträge je Aufgabenbereich 2024 sind aus den von Eurostat veröffentlichten BIP-Anteilen und der Destatis-Gesamtsumme rekonstruiert: Es sind Größenordnungen.</li>
            <li>Die Erträge je Punkt von Mehrwert- und Einkommensteuer folgen den zitierten öffentlichen Schätzungen; die der Progressionszone, der Körperschaftsteuer und der Mindeststeuer auf Vermögen sind Schätzungen der Anwendung, auf 30 bis 50 % genau.</li>
            <li>Die Mehrwertsteuer wird bei unverändertem Konsum berechnet.</li>
            <li>Ein Jahr Rentenalter entspricht 2035 ${fmt(k.agePlus)} Mrd. € pro Jahr, schrittweise erreicht; der Netto-Anstieg der Rentenlasten und die Pflegeausgaben sind Annahmen der Anwendung.</li>
            <li>Ein Punkt weniger Arbeitslosigkeit bringt ${fmt(k.chomagePt)} Mrd. € pro Jahr, in ${H.monteeChomage} Jahren, ohne zusätzliche Wirkung auf das BIP.</li>
            <li>Die Wirkungen des Mindestlohns und die vom Grundeinkommen ersetzten Leistungen (${mds(k.totalAides)} insgesamt) sind Größenordnungen.</li>
            <li>Haushaltshebel wirken schrittweise über ${H.montee} Jahre und folgen danach dem BIP. Eine Krise senkt das BIP um 1 % je 150 Mrd. €, wovon die Hälfte im Folgejahr aufgeholt wird.</li>
            <li>Das „Basisszenario“ lässt die Primärausgaben mit dem Wachstum steigen, zuzüglich der beschlossenen Programme: Es ignoriert die Schuldenbremse, die noch nicht beschlossene Einsparungen erfordern würde. Es ist keine offizielle Prognose.</li>
          </ul>
          <p><strong>Was das Modell nicht berücksichtigt:</strong> die Wirkung von Einsparungen, Steuern und Investitionen auf das Wachstum, die Reaktion der Zinsen auf die Schuldenhöhe und Abweichungen zwischen Defizit und Schuldenänderung (der Stabilitätsrat projiziert für 2029 Schulden von etwa 80 % des BIP, teils durch finanzielle Transaktionen).</p>`,
      };
    },
  };

  return { id: 'de', modele, sources, pib2024: 4330, devise: 'EUR', structure, textes };
});

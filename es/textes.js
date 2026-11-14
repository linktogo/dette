// Simulateur espagnol : structure des curseurs (bornes, pas, préréglages) et textes
// de l'interface en quatre langues. Les chiffres viennent du modèle (model.js).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique;
  else racine.PAYS = fabrique(racine.DetteEspagne, racine.SOURCES);
})(globalThis, function (modele, sources) {
  const TAUX_IR = [19, 24, 30, 37, 45, 47];
  const actifIR = (p) => p.ir37 > 37 || p.ir45 > 45 || p.ir47 > 47 || p.irSurtaxe > 0 || p.societes > 25 || p.patrimoine > 0;
  const actifRU = (p) => p.ruAdulte > 0 || p.ruMineur > 0;

  const structure = {
    groupes: [
      { id: 'economie', curseurs: [
        { id: 'croissance', min: -1, max: 3.5, pas: 0.1 },
        { id: 'inflation', min: 0, max: 5, pas: 0.1 },
        { id: 'tauxMarche', min: 0, max: 8, pas: 0.1 },
      ] },
      { id: 'depenses', curseurs: [
        { id: 'depenses', min: -1, max: 4, pas: 0.1 },
        { id: 'economies', min: 0, max: 80, pas: 2.5 },
      ] },
      { id: 'postes', postes: true, min: -4, max: 10, pas: 0.1 },
      { id: 'recettes', curseurs: [
        { id: 'prelevements', min: -3, max: 4, pas: 0.1 },
        { id: 'niches', min: 0, max: 100, pas: 5 },
        { id: 'fraude', min: 0, max: 15, pas: 0.5 },
      ] },
      { id: 'iva', curseurs: [
        { id: 'iva21', min: 15, max: 25, pas: 0.5 },
        { id: 'iva10', min: 4, max: 21, pas: 0.5 },
        { id: 'iva4', min: 0, max: 10, pas: 0.5 },
      ] },
      { id: 'irpf', curseurs: [
        ...TAUX_IR.map((t) => ({ id: 'ir' + t, min: Math.max(5, t - 10), max: t + 25, pas: 0.5 })),
        { id: 'irSurtaxe', min: 0, max: 25, pas: 1 },
        { id: 'irSeuil', min: 400000, max: 3000000, pas: 100000, actifSi: (p) => p.irSurtaxe > 0 },
        { id: 'societes', min: 15, max: 35, pas: 0.5 },
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
        { id: 'chomage', min: 5, max: 16, pas: 0.1 },
        { id: 'dependance', min: 0.8, max: 2.5, pas: 0.1 },
      ] },
      { id: 'smi', curseurs: [
        { id: 'smi', min: 0, max: 25, pas: 1 },
        { id: 'smiEmplois', min: 0, max: 30, pas: 1, actifSi: (p) => p.smi > 0 },
      ] },
      { id: 'ru', curseurs: [
        { id: 'ruAdulte', min: 0, max: 1200, pas: 50 },
        { id: 'ruMineur', min: 0, max: 600, pas: 25 },
        { id: 'ruAides', min: 0, max: 100, pas: 5, actifSi: actifRU },
        { id: 'ruFinancement', min: 0, max: 100, pas: 5, actifSi: actifRU },
      ] },
      { id: 'chocs', curseurs: [
        { id: 'crise', min: 0, max: 300, pas: 10 },
        { id: 'anneeCrise', min: 2027, max: 2035, pas: 1, actifSi: (p) => p.crise > 0 },
      ] },
    ],
    prereglages: [
      { id: 'tendanciel', p: {} },
      { id: 'taux', p: { tauxMarche: 4.5 } },
      { id: 'faible', p: { croissance: 0.8, depenses: 0.8 } },
      { id: 'retraite68', p: { ageLegal: 1 } },
      { id: 'sansDerive', p: { retraites: 0 } },
      { id: 'chomage7', p: { chomage: 7 } },
      // Proposition de l'assistant : aucun levier poussé à l'extrême, le déficit reste sous 3 %.
      { id: 'effort', p: {
        depenses: 1.3, poste_defense: 3,
        prelevements: 0.5, niches: 15, fraude: 2,
        sousIndexation: 0.3, anneesSousIndexation: 4,
        chomage: 8.5,
      } },
      { id: 'hauts', p: { ir45: 48, ir47: 51, irSurtaxe: 5, irSeuil: 1000000, patrimoine: 1.5 } },
      { id: 'smi', p: { smi: 10 } },
      { id: 'ru', p: { ruAdulte: 500, ruMineur: 125, ruFinancement: 50 } },
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
  });

  // Tranches de l'IRPF : nom (bornes) par langue.
  const tranches = (euros, mots) => TAUX_IR.map((t, i) => {
    const s = modele.H.irpf.seuils;
    if (i === 0) return mots.jusqua(euros(s[1]));
    if (i === s.length - 1) return mots.audela(euros(s[i]));
    return mots.de(euros(s[i]), euros(s[i + 1]));
  });

  // Ajoute les curseurs d'IRPF (nom, repère, format) à un dictionnaire de curseurs.
  const curseursIR = (u, m, mots, notes) => {
    const noms = tranches(u.euros, mots);
    const r = {};
    TAUX_IR.forEach((t, i) => {
      r['ir' + t] = { nom: noms[i], f: (v) => u.pct(v), repere: `${mots.tranche(t)} ${mots.unPoint(u.fmt(m.H.irpf.parPoint[i], 2))} ${notes[i]}`.trim() };
    });
    return r;
  };

  const textes = {
    fr: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Effet${aTerme ? ' à terme' : ''} : ${mdsSigne(g)} par an, en euros de 2026.`);
      return {
        titreDoc: 'Dette espagnole : projection à 10 ans',
        h1: 'Dette publique espagnole : projection 2027-2036',
        groupes: {
          economie: { titre: 'Économie' },
          depenses: { titre: 'Dépenses' },
          postes: { titre: 'Dépenses par poste', intro: 'Rythme de chaque poste en volume. Sans réglage, tous suivent le rythme général ci-dessus.' },
          recettes: { titre: 'Recettes' },
          iva: { titre: 'IVA', intro: 'Trois taux en vigueur. Effet immédiat, calculé à consommation inchangée.',
            resume: (p) => effet(m.effetIVA(p), 'Taux inchangés.', false) },
          irpf: { titre: 'IRPF, sociétés et hauts patrimoines',
            intro: 'Barème général combiné (part de l’État et part d’une communauté autonome « type »). Les communautés fixent leur propre part : le taux marginal maximal va de 45 % (Madrid) à 54 % (Communauté valencienne).',
            resume: (p) => effet(m.effetImpot(p), 'Barème inchangé.') },
          retraites: { titre: 'Retraites',
            intro: 'Les pensions sont revalorisées sur l’IPC (loi de 2021). Le MEI, cotisation de 0,9 % en 2026 portée à 1,2 % en 2029, est compté dans le tendanciel.' },
          emploi: { titre: 'Emploi et vieillissement' },
          smi: { titre: 'SMI', intro: 'Salaire minimum interprofessionnel. Hausse ajoutée à la revalorisation décidée chaque année par le gouvernement.',
            resume: (p) => {
              if (!p.smi) return 'SMI inchangé.';
              const { s, solde } = k.smiSolde(p);
              return `Chômage ${points(s.chomage, 2)}. Effet à terme sur le solde : ${mdsSigne(solde)} par an, en euros de 2026.`;
            } },
          ru: { titre: 'Revenu universel',
            intro: 'Versé à chaque résident, sans condition. Il remplace les aides non contributives à hauteur de son montant ; pensions contributives et allocations chômage d’assurance ne sont pas touchées.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Aucun revenu universel.';
              return `Coût brut ${mds(r.brut)}, aides supprimées −${mds(r.aides)}, coût net ${mds(r.net)} par an (${pct(r.net / BASE.pib * 100)} du PIB)`
                + (r.financement > 0.05 ? `, dont ${mds(r.financement)} couverts par le prélèvement dédié.` : '.');
            } },
          chocs: { titre: 'Chocs' },
        },
        curseurs: {
          croissance: { nom: 'Croissance du PIB en volume', f: (v) => pctAn(v), repere: 'Rythme moyen sur 10 ans, hors inflation. AIReF : 2,5 % en 2026, 2,1 % en 2027, puis un ralentissement.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'Avec 1,6 % de croissance et 2,0 % d’inflation, un déficit d’environ 3,5 % du PIB suffit à stabiliser la dette.' },
          tauxMarche: { nom: 'Taux d’emprunt du Trésor', f: (v) => pct(v), repere: 'Tesoro : émissions à 2,71 % en moyenne en 2025, encours à 2,32 %. Vie moyenne : 7,9 ans.' },
          depenses: { nom: 'Dépense publique hors intérêts, en volume', f: (v) => pctAn(v), repere: 'Référence : au rythme de la croissance. Les règles européennes plafonnent la dépense nette ; l’AIReF juge l’Espagne en dépassement.' },
          economies: { nom: 'Économies pérennes supplémentaires', f: (v) => mds(v), repere: 'En Md€ de 2026, atteints en 3 ans. AIReF : un ajustement de 0,9 point de PIB (environ 15 Md€) serait nécessaire d’ici 2028.' },
          prelevements: { nom: 'Taux de recettes publiques', f: (v) => signe(v) + ' pt de PIB', repere: 'Banco de España : recettes à 42,9 % du PIB en 2025, dépenses à 45,3 %.' },
          niches: { nom: 'Bénéfices fiscaux supprimés', f: (v) => fmt(v, 0) + ' %', repere: 'AIReF : environ 60 Md€ par an, dont 17,8 Md€ de taux réduits d’IVA (qui recoupent les curseurs IVA). Gain net retenu : la moitié.' },
          fraude: { nom: 'Fraude recouvrée en plus', f: (v) => '+' + fmt(v) + ' Md€/an', repere: 'Agencia Tributaria : 22,7 Md€ recouvrés grâce au contrôle en 2025.' },
          iva21: { nom: 'Taux général', f: (v) => pct(v), repere: `Actuel : 21 %. La plupart des biens et services. Un point ≈ ${fmt(H.iva.parPoint[0])} Md€ (estimation de l’application).` },
          iva10: { nom: 'Taux réduit', f: (v) => pct(v), repere: `Actuel : 10 %. Hôtellerie, restauration, transports, logement neuf. Un point ≈ ${fmt(H.iva.parPoint[1])} Md€. Bruxelles évoque 7 Md€ pour passer l’hôtellerie à 21 %.` },
          iva4: { nom: 'Taux super-réduit', f: (v) => pct(v), repere: `Actuel : 4 %. Pain, lait, fruits et légumes, médicaments, livres. Un point ≈ ${fmt(H.iva.parPoint[2], 2)} Md€.` },
          ...curseursIR(u, m, {
            jusqua: (a) => `Jusqu’à ${a}`, de: (a, b) => `De ${a} à ${b}`, audela: (a) => `Au-delà de ${a}`,
            tranche: (t) => `Tranche à ${t} %.`, unPoint: (v) => `Un point ≈ ${v} Md€.`,
          }, ['Tous les contribuables la traversent ; le minimum personnel (5 550 €) y est imputé.', '', '', 'Revenus moyens supérieurs.', 'Hauts revenus.', 'Très hauts revenus, environ 0,1 % des déclarants.']),
          irSurtaxe: { nom: 'Nouvelle tranche supérieure', f: (v, p) => (v ? `${pct(p.ir47 + v)} (+${v} pts)` : 'aucune'), repere: 'Taux ajouté à celui de la dernière tranche, au-delà du seuil ci-dessous.' },
          irSeuil: { nom: 'Seuil de la nouvelle tranche', f: (v) => euros(v), repere: 'Plus le seuil est haut, moins il reste de revenus à taxer.' },
          societes: { nom: 'Impôt sur les sociétés', f: (v) => pct(v), repere: `Taux général : 25 %. 45,6 Md€ en 2024 (Funcas). Un point ≈ ${fmt(H.societes.parPoint)} Md€ avant réaction des entreprises.` },
          patrimoine: { nom: 'Impôt plancher sur les patrimoines de plus de 100 M€', f: (v) => (v ? pct(v) + ' par an' : 'aucun'),
            repere: `S’ajouterait à l’impôt de solidarité sur les grandes fortunes. Un point ≈ ${fmt(H.patrimoineParPoint, 0)} Md€ bruts (estimation de l’application).` },
          erosion: { nom: 'Réaction des contribuables', f: (v) => `−${fmt(v, 0)} % du gain`,
            repere: 'Part du gain perdue par départs, optimisation ou moindre activité. S’applique aux hausses sur les tranches à 37 % et plus, sur les sociétés et sur les patrimoines.' },
          ageLegal: { nom: 'Âge légal de départ', f: (v) => ansMois(67 + v),
            repere: `Référence : 67 ans, atteint en 2027 (65 ans avec une longue carrière). Estimation de l’application : un an de plus rapporte environ ${fmt(k.agePlus, 0)} Md€ en 2035.` },
          cotisation: { nom: 'Cotisation retraite en plus du MEI', f: (v) => points(v), repere: `Un point ≈ ${fmt(H.cotisationPoint)} Md€ par an (le MEI à 0,9 % doit rapporter 5,3 Md€ en 2026), mais renchérit le travail.` },
          sousIndexation: { nom: 'Pensions revalorisées sous l’IPC', f: (v) => (v ? '−' + fmt(v) + ' pt/an' : 'non'),
            repere: `Un point de moins économise environ ${fmt(H.sousIndexationPoint)} Md€ par an, acquis les années suivantes (pensions contributives : ~203 Md€).` },
          anneesSousIndexation: { nom: 'Durée de la sous-indexation', f: (v) => u.annees(v), repere: 'À partir de 2027.' },
          retraites: { nom: 'Dérive de la dépense de pensions', f: (v) => fmt(v, 0) + ' % de la projection AIReF', repere: 'AIReF : 12,7 % du PIB en 2022, 16,1 % en 2050, sous l’effet de l’arrivée à la retraite du baby-boom.' },
          chomage: { nom: 'Taux de chômage visé', f: (v) => pct(v), repere: `Référence : 10,2 % (EPA, T3 2026). Un point en moins rapporte environ ${fmt(k.chomagePt, 0)} Md€ par an (estimation), atteint en ${H.monteeChomage} ans.` },
          dependance: { nom: 'Dépenses de dépendance en 2050', f: (v) => pct(v) + ' du PIB', repere: 'Ageing Report 2024 : environ 0,8 % en 2022, +0,6 point en 2050 (référence 1,4 %).' },
          smi: { nom: 'Hausse du SMI', f: (v) => (v ? `+${v} % (≈ ${euros(H.smi.brutMensuel * (1 + v / 100))} bruts × 14)` : 'aucune'),
            repere: `${euros(H.smi.brutMensuel)} bruts par mois sur 14 versements en 2026, exonérés d’IRPF. Par point : +${fmt(H.smi.recettesPoint, 2)} Md€ de cotisations, −${fmt(H.smi.publicPoint, 2)} Md€ de salaires publics.` },
          smiEmplois: { nom: 'Emplois perdus par point de hausse', f: (v) => (v ? `${fmt(v * 1000, 0)} emplois` : 'aucun'),
            repere: 'Hypothèse débattue, notamment après la hausse de 22 % de 2019. Les emplois perdus passent par le levier « chômage ».' },
          ruAdulte: { nom: 'Montant par adulte', f: (v) => (v ? euros(v) + '/mois' : 'aucun'),
            repere: `${fmt(H.ru.adultes)} millions d’adultes : 100 € par mois coûtent ${mds(H.ru.adultes * 1.2)} par an. Pour mémoire, ingreso mínimo vital moyen : 517 € par foyer.` },
          ruMineur: { nom: 'Montant par mineur', f: (v) => (v ? euros(v) + '/mois' : 'aucun'),
            repere: `${fmt(H.ru.mineurs)} millions de mineurs, versé aux parents. Remplace les prestations familiales.` },
          ruAides: { nom: 'Aides supprimées en contrepartie', f: (v) => fmt(v, 0) + ' % de l’absorbable',
            repere: 'Une aide est supprimée en proportion du revenu universel rapporté à son montant moyen : IMV, pensions non contributives, allocation chômage d’assistance, revenus minimums régionaux, la moitié des aides au logement, 80 % des prestations familiales.' },
          ruFinancement: { nom: 'Part financée par un prélèvement dédié', f: (v) => fmt(v, 0) + ' %', repere: 'Impôt proportionnel sur tous les revenus, par exemple. Calculé sans effet sur l’activité.' },
          crise: { nom: 'Coût d’une crise', f: (v) => (v ? mds(v) : 'aucune'), repere: 'Covid : la dette est passée d’environ 98 % à 120 % du PIB en 2020. DANA de Valence : 3,6 Md€ de dépenses en 2025.' },
          anneeCrise: { nom: 'Année de la crise', f: (v) => String(v), repere: 'Coût réparti 60 % / 40 % sur deux ans, avec recul du PIB.' },
        },
        postes: {
          defense: { nom: 'Défense', note: 'Fonction défense au sens d’Eurostat. Au sens de l’OTAN (pensions militaires, Garde civile en mission…), 33 Md€ en 2025, soit 2 % du PIB ; l’Espagne s’est engagée à 2,1 %.' },
          enseignement: { nom: 'Enseignement', note: 'Du primaire au supérieur, géré surtout par les communautés autonomes.' },
          sante: { nom: 'Santé', note: 'Système national de santé, géré par les communautés autonomes.' },
          retraites: { nom: 'Retraites', note: 'Pensions de vieillesse et de réversion. Les curseurs du groupe « Retraites » s’y ajoutent.' },
          social: { nom: 'Autre protection sociale', note: 'Chômage, invalidité, famille, dépendance, exclusion. Le revenu universel, net des aides qu’il remplace, s’y ajoute.' },
          securite: { nom: 'Sécurité et justice', note: 'Police nationale, Garde civile, polices régionales, justice, prisons.' },
          economie: { nom: 'Affaires économiques', note: 'Transports, énergie, agriculture, aides aux entreprises, fonds européens.' },
          general: { nom: 'Services généraux', note: 'Administration générale, transferts à l’UE, recherche fondamentale. Hors intérêts.' },
          cadre: { nom: 'Logement, environnement, culture', note: 'Logement, environnement, culture et sport.' },
        },
        prereglages: {
          tendanciel: 'Tendanciel', taux: 'Taux élevés', faible: 'Croissance faible', retraite68: 'Retraite à 68 ans',
          sansDerive: 'Sans dérive des pensions', chomage7: 'Chômage à 7 %', effort: 'Effort partagé',
          hauts: 'Taxer les hauts revenus', smi: 'SMI +10 %', ru: 'Revenu universel', crise: 'Crise en 2029',
        },
        nonVentile: (montant, annee) => `Non ventilé (économies transversales, SMI des agents publics, crise) : ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Même méthode que le simulateur français. Chaque année, la dette augmente du déficit : dépenses hors intérêts, moins recettes, plus intérêts. Le PIB progresse de la croissance en volume et de l’inflation ; les recettes suivent le PIB ; les dépenses hors intérêts suivent leur propre rythme.</p>
          <p><strong>Point de départ estimé (fin ${d.annee}) :</strong> PIB ${mds(d.pib)}, dette ${mds(d.dette)} (${pct(d.ratio)} du PIB, prévision de l’AIReF de juillet 2026), déficit ${pct(-d.soldePib)} du PIB, intérêts ${mds(d.interets)}. Le dernier chiffre mesuré est celui du Banco de España pour fin 2025 : ${mds(COMPTES_2025.dette)}, ${pct(COMPTES_2025.ratio)} du PIB. En novembre 2026, l’AIReF a relevé sa prévision de déficit 2026 à 2,8 %.</p>
          <p><strong>Hypothèses propres à l’application, non tirées des sources :</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % de l’encours est refinancé chaque année au taux de marché, et toute dette nouvelle l’est en totalité. C’est le calage du modèle français, ajusté à la vie moyenne plus courte de la dette espagnole (7,9 ans contre 8,6).</li>
            <li>La dépense hors intérêts de 2026 est répartie entre postes selon leur poids estimé de 2024. Les montants par poste sont reconstitués à partir des parts du PIB publiées par Eurostat et du total de l’IGAE : ce sont des ordres de grandeur.</li>
            <li>Supprimer un bénéfice fiscal rapporte ${fmt(H.nichesRendement * 100, 0)} % de son coût affiché.</li>
            <li>Les rendements par point de l’IVA, de l’IRPF, de l’impôt sur les sociétés et de l’impôt plancher sur les patrimoines sont des estimations de l’application, fiables à 30 % près. L’IVA est calée sur les 17,8 Md€ de taux réduits chiffrés par l’AIReF ; l’IRPF sur ses 142,5 Md€ de 2025. Le barème est celui d’une communauté « type » : les communautés autonomes fixent leur propre part.</li>
            <li>L’IVA est calculée à consommation inchangée : une hausse ne réduit pas les achats et ne pèse pas sur la croissance, une baisse ne les stimule pas.</li>
            <li>Un an d’âge légal en plus ou en moins vaut ${fmt(k.agePlus)} Md€ par an en 2035, atteints progressivement (estimation de l’application, à 50 % près : environ 330 000 départs par an et une pension d’entrée d’environ 21 000 €).</li>
            <li>La dérive des pensions suit la projection de l’AIReF (de 13,0 % du PIB en 2026 à 16,1 % en 2050) ; le MEI suit le calendrier légal. Les dépenses de dépendance progressent en ligne droite vers leur niveau de 2050.</li>
            <li>Un point de chômage en moins rapporte ${fmt(k.chomagePt)} Md€ par an, en ${H.monteeChomage} ans, sans effet ajouté sur le PIB (estimation de l’application).</li>
            <li>Les effets par point de hausse du SMI sont des estimations de l’application, fiables à 50 % près. Le SMI étant exonéré d’IRPF, seules les cotisations sont comptées. Les emplois perdus sont convertis en chômage sur une population active de ${fmt(H.smi.populationActive, 1)} millions.</li>
            <li>Le revenu universel est imputé au poste « Autre protection sociale ». Hormis l’IMV, les montants des aides qu’il remplace (${mds(k.totalAides)} au total) sont des ordres de grandeur ; leur réduction suit le rapport entre le revenu universel et l’aide moyenne.</li>
            <li>Les leviers budgétaires montent en charge sur ${H.montee} ans, puis suivent le PIB.</li>
            <li>Une crise réduit le PIB de 1 % par tranche de 50 Md€, dont la moitié est rattrapée l’année suivante.</li>
            <li>Le « tendanciel » maintient les dépenses hors intérêts au rythme de la croissance, plus la dérive des pensions et de la dépendance : ce n’est pas une prévision officielle.</li>
          </ul>
          <p><strong>Ce que le modèle ignore :</strong> l’effet des économies ou des hausses d’impôts sur la croissance, la réaction des taux au niveau de dette, la fin des fonds européens NextGenerationEU en 2026, les transferts entre administrations (la reprise de dette des communautés autonomes par l’État ne change pas la dette consolidée), les cessions d’actifs et les écarts entre déficit et variation de dette.</p>`,
      };
    },

    en: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Long-run effect' : 'Effect'}: ${mdsSigne(g)} a year, in 2026 euros.`);
      return {
        titreDoc: 'Spanish public debt: 10-year projection',
        h1: 'Spanish public debt: projection 2027-2036',
        groupes: {
          economie: { titre: 'Economy' },
          depenses: { titre: 'Spending' },
          postes: { titre: 'Spending by function', intro: 'Real growth of each function. Left untouched, they all follow the overall pace above.' },
          recettes: { titre: 'Revenue' },
          iva: { titre: 'VAT (IVA)', intro: 'Three rates in force. Immediate effect, computed with unchanged consumption.',
            resume: (p) => effet(m.effetIVA(p), 'Rates unchanged.', false) },
          irpf: { titre: 'Income tax (IRPF), corporate tax and large fortunes',
            intro: 'Combined general schedule (central government share plus a “typical” autonomous community’s share). Each region sets its own share: the top marginal rate ranges from 45% (Madrid) to 54% (Valencian Community).',
            resume: (p) => effet(m.effetImpot(p), 'Schedule unchanged.') },
          retraites: { titre: 'Pensions',
            intro: 'Pensions are uprated in line with CPI (2021 law). The MEI, an intergenerational equity contribution of 0.9% in 2026 rising to 1.2% in 2029, is included in the baseline.' },
          emploi: { titre: 'Jobs and ageing' },
          smi: { titre: 'Minimum wage (SMI)', intro: 'Statutory minimum wage. Increase on top of the uprating decided each year by the government.',
            resume: (p) => {
              if (!p.smi) return 'Minimum wage unchanged.';
              const { s, solde } = k.smiSolde(p);
              return `Unemployment ${points(s.chomage, 2)}. Long-run effect on the balance: ${mdsSigne(solde)} a year, in 2026 euros.`;
            } },
          ru: { titre: 'Universal basic income',
            intro: 'Paid to every resident, unconditionally. It replaces means-tested benefits up to its amount; contributory pensions and unemployment insurance are untouched.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'No universal basic income.';
              return `Gross cost ${mds(r.brut)}, benefits removed −${mds(r.aides)}, net cost ${mds(r.net)} a year (${pct(r.net / BASE.pib * 100)} of GDP)`
                + (r.financement > 0.05 ? `, of which ${mds(r.financement)} covered by the dedicated levy.` : '.');
            } },
          chocs: { titre: 'Shocks' },
        },
        curseurs: {
          croissance: { nom: 'Real GDP growth', f: (v) => pctAn(v), repere: '10-year average, excluding inflation. AIReF: 2.5% in 2026, 2.1% in 2027, then slowing.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'With 1.6% growth and 2.0% inflation, a deficit of about 3.5% of GDP is enough to stabilise debt.' },
          tauxMarche: { nom: 'Treasury borrowing rate', f: (v) => pct(v), repere: 'Tesoro: 2025 issuance at 2.71% on average, stock at 2.32%. Average life: 7.9 years.' },
          depenses: { nom: 'Primary public spending, real terms', f: (v) => pctAn(v), repere: 'Reference: in line with growth. EU rules cap net expenditure; AIReF finds Spain is overshooting.' },
          economies: { nom: 'Additional permanent savings', f: (v) => mds(v), repere: 'In 2026 €bn, reached over 3 years. AIReF: an adjustment of 0.9 pp of GDP (about €15bn) would be needed by 2028.' },
          prelevements: { nom: 'Public revenue ratio', f: (v) => signe(v) + ' pp of GDP', repere: 'Banco de España: revenue at 42.9% of GDP in 2025, spending at 45.3%.' },
          niches: { nom: 'Tax benefits removed', f: (v) => fmt(v, 0) + '%', repere: 'AIReF: about €60bn a year, including €17.8bn of reduced VAT rates (overlapping with the VAT sliders). Net gain assumed: half.' },
          fraude: { nom: 'Extra tax fraud recovered', f: (v) => `+€${fmt(v)}bn/yr`, repere: 'Agencia Tributaria: €22.7bn recovered through audits in 2025.' },
          iva21: { nom: 'Standard rate', f: (v) => pct(v), repere: `Current: 21%. Most goods and services. One point ≈ €${fmt(H.iva.parPoint[0])}bn (app estimate).` },
          iva10: { nom: 'Reduced rate', f: (v) => pct(v), repere: `Current: 10%. Hotels, restaurants, transport, new housing. One point ≈ €${fmt(H.iva.parPoint[1])}bn. Brussels cites €7bn for moving hospitality to 21%.` },
          iva4: { nom: 'Super-reduced rate', f: (v) => pct(v), repere: `Current: 4%. Bread, milk, fruit and vegetables, medicines, books. One point ≈ €${fmt(H.iva.parPoint[2], 2)}bn.` },
          ...curseursIR(u, m, {
            jusqua: (a) => `Up to ${a}`, de: (a, b) => `${a} to ${b}`, audela: (a) => `Above ${a}`,
            tranche: (t) => `${t}% bracket.`, unPoint: (v) => `One point ≈ €${v}bn.`,
          }, ['Every taxpayer passes through it; the personal allowance (€5,550) is offset here.', '', '', 'Upper-middle incomes.', 'High incomes.', 'Very high incomes, about 0.1% of filers.']),
          irSurtaxe: { nom: 'New top bracket', f: (v, p) => (v ? `${pct(p.ir47 + v)} (+${v} pts)` : 'none'), repere: 'Rate added to the top bracket, above the threshold below.' },
          irSeuil: { nom: 'Threshold of the new bracket', f: (v) => euros(v), repere: 'The higher the threshold, the less income is left to tax.' },
          societes: { nom: 'Corporate income tax', f: (v) => pct(v), repere: `Standard rate: 25%. €45.6bn in 2024 (Funcas). One point ≈ €${fmt(H.societes.parPoint)}bn before firms respond.` },
          patrimoine: { nom: 'Minimum tax on fortunes above €100m', f: (v) => (v ? pct(v) + ' a year' : 'none'),
            repere: `Would come on top of the solidarity tax on large fortunes. One point ≈ €${fmt(H.patrimoineParPoint, 0)}bn gross (app estimate).` },
          erosion: { nom: 'Taxpayer response', f: (v) => `−${fmt(v, 0)}% of the gain`,
            repere: 'Share of the gain lost to emigration, tax planning or lower activity. Applies to increases on the 37%+ brackets, corporate tax and fortunes.' },
          ageLegal: { nom: 'Statutory retirement age', f: (v) => ansMois(67 + v),
            repere: `Reference: 67, reached in 2027 (65 with a long career). App estimate: one more year yields about €${fmt(k.agePlus, 0)}bn in 2035.` },
          cotisation: { nom: 'Pension contribution on top of the MEI', f: (v) => points(v), repere: `One point ≈ €${fmt(H.cotisationPoint)}bn a year (the MEI at 0.9% should raise €5.3bn in 2026), but raises labour costs.` },
          sousIndexation: { nom: 'Pensions uprated below CPI', f: (v) => (v ? '−' + fmt(v) + ' pt/yr' : 'no'),
            repere: `One point less saves about €${fmt(H.sousIndexationPoint)}bn a year, kept in following years (contributory pensions: ~€203bn).` },
          anneesSousIndexation: { nom: 'Length of under-indexation', f: (v) => u.annees(v), repere: 'From 2027.' },
          retraites: { nom: 'Drift in pension spending', f: (v) => fmt(v, 0) + '% of the AIReF projection', repere: 'AIReF: 12.7% of GDP in 2022, 16.1% in 2050, as the baby boomers retire.' },
          chomage: { nom: 'Target unemployment rate', f: (v) => pct(v), repere: `Reference: 10.2% (EPA, Q3 2026). One point less yields about €${fmt(k.chomagePt, 0)}bn a year (estimate), reached over ${H.monteeChomage} years.` },
          dependance: { nom: 'Long-term care spending in 2050', f: (v) => pct(v) + ' of GDP', repere: 'Ageing Report 2024: about 0.8% in 2022, +0.6 pp by 2050 (reference 1.4%).' },
          smi: { nom: 'Minimum wage increase', f: (v) => (v ? `+${v}% (≈ ${euros(H.smi.brutMensuel * (1 + v / 100))} gross × 14)` : 'none'),
            repere: `${euros(H.smi.brutMensuel)} gross a month over 14 payments in 2026, exempt from income tax. Per point: +€${fmt(H.smi.recettesPoint, 2)}bn of contributions, −€${fmt(H.smi.publicPoint, 2)}bn of public wages.` },
          smiEmplois: { nom: 'Jobs lost per point of increase', f: (v) => (v ? `${fmt(v * 1000, 0)} jobs` : 'none'),
            repere: 'Disputed assumption, especially after the 22% rise of 2019. Lost jobs feed the “unemployment” lever.' },
          ruAdulte: { nom: 'Amount per adult', f: (v) => (v ? euros(v) + '/month' : 'none'),
            repere: `${fmt(H.ru.adultes)} million adults: €100 a month costs ${mds(H.ru.adultes * 1.2)} a year. For reference, average minimum living income (IMV): €517 per household.` },
          ruMineur: { nom: 'Amount per child', f: (v) => (v ? euros(v) + '/month' : 'none'),
            repere: `${fmt(H.ru.mineurs)} million children, paid to parents. Replaces family benefits.` },
          ruAides: { nom: 'Benefits removed in return', f: (v) => fmt(v, 0) + '% of what can be absorbed',
            repere: 'A benefit is removed in proportion to the basic income relative to its average amount: IMV, non-contributory pensions, unemployment assistance, regional minimum incomes, half of housing support, 80% of family benefits.' },
          ruFinancement: { nom: 'Share funded by a dedicated levy', f: (v) => fmt(v, 0) + '%', repere: 'A flat tax on all income, for instance. Computed with no effect on activity.' },
          crise: { nom: 'Cost of a crisis', f: (v) => (v ? mds(v) : 'none'), repere: 'Covid: debt rose from about 98% to 120% of GDP in 2020. Valencia DANA floods: €3.6bn of spending in 2025.' },
          anneeCrise: { nom: 'Year of the crisis', f: (v) => String(v), repere: 'Cost split 60% / 40% over two years, with a fall in GDP.' },
        },
        postes: {
          defense: { nom: 'Defence', note: 'Defence function as defined by Eurostat. On NATO’s definition (military pensions, Guardia Civil on missions…), €33bn in 2025, i.e. 2% of GDP; Spain has committed to 2.1%.' },
          enseignement: { nom: 'Education', note: 'Primary to higher education, run mostly by the autonomous communities.' },
          sante: { nom: 'Health', note: 'National health system, run by the autonomous communities.' },
          retraites: { nom: 'Pensions', note: 'Old-age and survivors’ pensions. The “Pensions” sliders add to it.' },
          social: { nom: 'Other social protection', note: 'Unemployment, disability, family, long-term care, exclusion. Universal basic income, net of the benefits it replaces, is added here.' },
          securite: { nom: 'Public order and justice', note: 'National Police, Guardia Civil, regional police forces, courts, prisons.' },
          economie: { nom: 'Economic affairs', note: 'Transport, energy, agriculture, business support, EU funds.' },
          general: { nom: 'General services', note: 'General administration, transfers to the EU, basic research. Excluding interest.' },
          cadre: { nom: 'Housing, environment, culture', note: 'Housing, environment, culture and sport.' },
        },
        prereglages: {
          tendanciel: 'Baseline', taux: 'High rates', faible: 'Weak growth', retraite68: 'Retirement at 68',
          sansDerive: 'No pension drift', chomage7: 'Unemployment at 7%', effort: 'Shared effort',
          hauts: 'Tax top incomes', smi: 'Minimum wage +10%', ru: 'Basic income', crise: 'Crisis in 2029',
        },
        nonVentile: (montant, annee) => `Not allocated (across-the-board savings, public-sector minimum wage, crisis): ${montant} in ${annee}.`,
        methode: (d) => `
          <p>Same method as the French simulator. Each year, debt rises by the deficit: primary spending, minus revenue, plus interest. GDP grows with real growth and inflation; revenue tracks GDP; primary spending follows its own path.</p>
          <p><strong>Estimated starting point (end-${d.annee}):</strong> GDP ${mds(d.pib)}, debt ${mds(d.dette)} (${pct(d.ratio)} of GDP, AIReF forecast of July 2026), deficit ${pct(-d.soldePib)} of GDP, interest ${mds(d.interets)}. The latest outturn is the Banco de España’s for end-2025: ${mds(COMPTES_2025.dette)}, ${pct(COMPTES_2025.ratio)} of GDP. In November 2026, AIReF raised its 2026 deficit forecast to 2.8%.</p>
          <p><strong>Assumptions specific to the app, not taken from the sources:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)}% of the debt stock is refinanced each year at the market rate, and all new debt is. This is the French model’s calibration, adjusted for the shorter average life of Spanish debt (7.9 years against 8.6).</li>
            <li>2026 primary spending is split between functions according to their estimated 2024 weights. Amounts per function are reconstructed from the GDP shares published by Eurostat and the IGAE total: they are orders of magnitude.</li>
            <li>Removing a tax benefit yields ${fmt(H.nichesRendement * 100, 0)}% of its stated cost.</li>
            <li>Yields per point of VAT, income tax, corporate tax and the minimum tax on fortunes are the app’s estimates, reliable to within 30%. VAT is calibrated on the €17.8bn of reduced rates costed by AIReF; income tax on its €142.5bn in 2025. The schedule is that of a “typical” region: each autonomous community sets its own share.</li>
            <li>VAT is computed with unchanged consumption: an increase does not reduce purchases or weigh on growth, a cut does not stimulate them.</li>
            <li>One year of retirement age more or less is worth €${fmt(k.agePlus)}bn a year in 2035, phased in (app estimate, reliable to within 50%: about 330,000 retirements a year and an initial pension of about €21,000).</li>
            <li>Pension drift follows the AIReF projection (from 13.0% of GDP in 2026 to 16.1% in 2050); the MEI follows the legal timetable. Long-term care spending rises in a straight line to its 2050 level.</li>
            <li>One point less unemployment yields €${fmt(k.chomagePt)}bn a year, over ${H.monteeChomage} years, with no added effect on GDP (app estimate).</li>
            <li>The per-point effects of a minimum-wage increase are the app’s estimates, reliable to within 50%. As the minimum wage is exempt from income tax, only contributions are counted. Lost jobs are converted into unemployment over a labour force of ${fmt(H.smi.populationActive, 1)} million.</li>
            <li>Universal basic income is booked under “Other social protection”. Apart from the IMV, the amounts of the benefits it replaces (${mds(k.totalAides)} in total) are orders of magnitude; their reduction follows the ratio between basic income and the average benefit.</li>
            <li>Fiscal levers phase in over ${H.montee} years, then grow with GDP.</li>
            <li>A crisis cuts GDP by 1% per €50bn, half of which is recovered the following year.</li>
            <li>The “baseline” keeps primary spending growing with the economy, plus the drift in pensions and long-term care: it is not an official forecast.</li>
          </ul>
          <p><strong>What the model ignores:</strong> the effect of savings or tax rises on growth, the response of interest rates to the debt level, the end of the NextGenerationEU funds in 2026, transfers between levels of government (the central government taking over regional debt does not change consolidated debt), asset sales and gaps between the deficit and the change in debt.</p>`,
      };
    },

    es: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `Efecto${aTerme ? ' a largo plazo' : ''}: ${mdsSigne(g)} al año, en euros de 2026.`);
      return {
        titreDoc: 'Deuda pública española: proyección a 10 años',
        h1: 'Deuda pública española: proyección 2027-2036',
        groupes: {
          economie: { titre: 'Economía' },
          depenses: { titre: 'Gasto' },
          postes: { titre: 'Gasto por función', intro: 'Crecimiento real de cada función. Sin ajustes, todas siguen el ritmo general indicado arriba.' },
          recettes: { titre: 'Ingresos' },
          iva: { titre: 'IVA', intro: 'Tres tipos vigentes. Efecto inmediato, calculado con consumo constante.',
            resume: (p) => effet(m.effetIVA(p), 'Tipos sin cambios.', false) },
          irpf: { titre: 'IRPF, sociedades y grandes patrimonios',
            intro: 'Escala general combinada (parte estatal y parte de una comunidad autónoma «tipo»). Cada comunidad fija su propia parte: el tipo marginal máximo va del 45 % (Madrid) al 54 % (Comunitat Valenciana).',
            resume: (p) => effet(m.effetImpot(p), 'Escala sin cambios.') },
          retraites: { titre: 'Pensiones',
            intro: 'Las pensiones se revalorizan con el IPC (ley de 2021). El MEI, cotización del 0,9 % en 2026 que sube al 1,2 % en 2029, está incluido en el tendencial.' },
          emploi: { titre: 'Empleo y envejecimiento' },
          smi: { titre: 'SMI', intro: 'Salario mínimo interprofesional. Subida añadida a la revalorización que decide cada año el Gobierno.',
            resume: (p) => {
              if (!p.smi) return 'SMI sin cambios.';
              const { s, solde } = k.smiSolde(p);
              return `Paro ${points(s.chomage, 2)}. Efecto a largo plazo sobre el saldo: ${mdsSigne(solde)} al año, en euros de 2026.`;
            } },
          ru: { titre: 'Renta básica universal',
            intro: 'Pagada a cada residente, sin condiciones. Sustituye las ayudas no contributivas hasta su importe; las pensiones contributivas y las prestaciones contributivas por desempleo no se tocan.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Sin renta básica.';
              return `Coste bruto ${mds(r.brut)}, ayudas suprimidas −${mds(r.aides)}, coste neto ${mds(r.net)} al año (${pct(r.net / BASE.pib * 100)} del PIB)`
                + (r.financement > 0.05 ? `, de los que ${mds(r.financement)} cubiertos por el impuesto específico.` : '.');
            } },
          chocs: { titre: 'Perturbaciones' },
        },
        curseurs: {
          croissance: { nom: 'Crecimiento real del PIB', f: (v) => pctAn(v), repere: 'Media a 10 años, sin inflación. AIReF: 2,5 % en 2026, 2,1 % en 2027 y después una desaceleración.' },
          inflation: { nom: 'Inflación', f: (v) => pctAn(v), repere: 'Con un 1,6 % de crecimiento y un 2,0 % de inflación, un déficit de en torno al 3,5 % del PIB basta para estabilizar la deuda.' },
          tauxMarche: { nom: 'Tipo de emisión del Tesoro', f: (v) => pct(v), repere: 'Tesoro: emisiones al 2,71 % de media en 2025, cartera al 2,32 %. Vida media: 7,9 años.' },
          depenses: { nom: 'Gasto público primario, en volumen', f: (v) => pctAn(v), repere: 'Referencia: al ritmo del crecimiento. Las reglas europeas limitan el gasto neto; la AIReF considera que España las supera.' },
          economies: { nom: 'Ahorros permanentes adicionales', f: (v) => mds(v), repere: 'En mil M€ de 2026, alcanzados en 3 años. AIReF: haría falta un ajuste de 0,9 puntos del PIB (unos 15 mil M€) de aquí a 2028.' },
          prelevements: { nom: 'Ratio de ingresos públicos', f: (v) => signe(v) + ' pp del PIB', repere: 'Banco de España: ingresos del 42,9 % del PIB en 2025, gasto del 45,3 %.' },
          niches: { nom: 'Beneficios fiscales suprimidos', f: (v) => fmt(v, 0) + ' %', repere: 'AIReF: unos 60 mil M€ al año, de los que 17,8 mil M€ son tipos reducidos de IVA (que se solapan con los controles de IVA). Ganancia neta supuesta: la mitad.' },
          fraude: { nom: 'Fraude recuperado adicional', f: (v) => '+' + fmt(v) + ' mil M€/año', repere: 'Agencia Tributaria: 22,7 mil M€ recaudados por la lucha contra el fraude en 2025.' },
          iva21: { nom: 'Tipo general', f: (v) => pct(v), repere: `Actual: 21 %. La mayoría de bienes y servicios. Un punto ≈ ${fmt(H.iva.parPoint[0])} mil M€ (estimación de la aplicación).` },
          iva10: { nom: 'Tipo reducido', f: (v) => pct(v), repere: `Actual: 10 %. Hostelería, restauración, transporte, vivienda nueva. Un punto ≈ ${fmt(H.iva.parPoint[1])} mil M€. Bruselas cifra en 7 mil M€ pasar la hostelería al 21 %.` },
          iva4: { nom: 'Tipo superreducido', f: (v) => pct(v), repere: `Actual: 4 %. Pan, leche, frutas y verduras, medicamentos, libros. Un punto ≈ ${fmt(H.iva.parPoint[2], 2)} mil M€.` },
          ...curseursIR(u, m, {
            jusqua: (a) => `Hasta ${a}`, de: (a, b) => `De ${a} a ${b}`, audela: (a) => `Más de ${a}`,
            tranche: (t) => `Tramo del ${t} %.`, unPoint: (v) => `Un punto ≈ ${v} mil M€.`,
          }, ['Todos los contribuyentes lo atraviesan; en él se aplica el mínimo personal (5550 €).', '', '', 'Rentas medias-altas.', 'Rentas altas.', 'Rentas muy altas, en torno al 0,1 % de los declarantes.']),
          irSurtaxe: { nom: 'Nuevo tramo superior', f: (v, p) => (v ? `${pct(p.ir47 + v)} (+${v} pts)` : 'ninguno'), repere: 'Tipo añadido al del último tramo, por encima del umbral siguiente.' },
          irSeuil: { nom: 'Umbral del nuevo tramo', f: (v) => euros(v), repere: 'Cuanto más alto el umbral, menos renta queda por gravar.' },
          societes: { nom: 'Impuesto sobre sociedades', f: (v) => pct(v), repere: `Tipo general: 25 %. 45,6 mil M€ en 2024 (Funcas). Un punto ≈ ${fmt(H.societes.parPoint)} mil M€ antes de la reacción de las empresas.` },
          patrimoine: { nom: 'Impuesto mínimo sobre patrimonios de más de 100 M€', f: (v) => (v ? pct(v) + ' al año' : 'ninguno'),
            repere: `Se sumaría al impuesto de solidaridad de las grandes fortunas. Un punto ≈ ${fmt(H.patrimoineParPoint, 0)} mil M€ brutos (estimación de la aplicación).` },
          erosion: { nom: 'Reacción de los contribuyentes', f: (v) => `−${fmt(v, 0)} % de la ganancia`,
            repere: 'Parte de la ganancia perdida por marchas, optimización o menor actividad. Se aplica a las subidas en los tramos del 37 % o más, en sociedades y en patrimonios.' },
          ageLegal: { nom: 'Edad legal de jubilación', f: (v) => ansMois(67 + v),
            repere: `Referencia: 67 años, alcanzados en 2027 (65 con carrera larga). Estimación de la aplicación: un año más aporta unos ${fmt(k.agePlus, 0)} mil M€ en 2035.` },
          cotisation: { nom: 'Cotización por jubilación además del MEI', f: (v) => points(v), repere: `Un punto ≈ ${fmt(H.cotisationPoint)} mil M€ al año (el MEI al 0,9 % debe recaudar 5,3 mil M€ en 2026), pero encarece el trabajo.` },
          sousIndexation: { nom: 'Pensiones revalorizadas por debajo del IPC', f: (v) => (v ? '−' + fmt(v) + ' pt/año' : 'no'),
            repere: `Un punto menos ahorra unos ${fmt(H.sousIndexationPoint)} mil M€ al año, que se consolidan los años siguientes (pensiones contributivas: ~203 mil M€).` },
          anneesSousIndexation: { nom: 'Duración de la subindexación', f: (v) => u.annees(v), repere: 'A partir de 2027.' },
          retraites: { nom: 'Deriva del gasto en pensiones', f: (v) => fmt(v, 0) + ' % de la proyección de la AIReF', repere: 'AIReF: 12,7 % del PIB en 2022 y 16,1 % en 2050, por la jubilación del baby boom.' },
          chomage: { nom: 'Tasa de paro objetivo', f: (v) => pct(v), repere: `Referencia: 10,2 % (EPA, T3 2026). Un punto menos aporta unos ${fmt(k.chomagePt, 0)} mil M€ al año (estimación), alcanzados en ${H.monteeChomage} años.` },
          dependance: { nom: 'Gasto en dependencia en 2050', f: (v) => pct(v) + ' del PIB', repere: 'Ageing Report 2024: en torno al 0,8 % en 2022, +0,6 puntos en 2050 (referencia 1,4 %).' },
          smi: { nom: 'Subida del SMI', f: (v) => (v ? `+${v} % (≈ ${euros(H.smi.brutMensuel * (1 + v / 100))} brutos × 14)` : 'ninguna'),
            repere: `${euros(H.smi.brutMensuel)} brutos al mes en 14 pagas en 2026, exentos de IRPF. Por punto: +${fmt(H.smi.recettesPoint, 2)} mil M€ de cotizaciones, −${fmt(H.smi.publicPoint, 2)} mil M€ de salarios públicos.` },
          smiEmplois: { nom: 'Empleos perdidos por punto de subida', f: (v) => (v ? `${fmt(v * 1000, 0)} empleos` : 'ninguno'),
            repere: 'Hipótesis discutida, sobre todo tras la subida del 22 % de 2019. Los empleos perdidos pasan por el control «paro».' },
          ruAdulte: { nom: 'Importe por adulto', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'),
            repere: `${fmt(H.ru.adultes)} millones de adultos: 100 € al mes cuestan ${mds(H.ru.adultes * 1.2)} al año. Como referencia, ingreso mínimo vital medio: 517 € por hogar.` },
          ruMineur: { nom: 'Importe por menor', f: (v) => (v ? euros(v) + '/mes' : 'ninguno'),
            repere: `${fmt(H.ru.mineurs)} millones de menores, pagado a los padres. Sustituye las prestaciones familiares.` },
          ruAides: { nom: 'Ayudas suprimidas a cambio', f: (v) => fmt(v, 0) + ' % de lo absorbible',
            repere: 'Una ayuda se suprime en proporción a la renta básica respecto a su importe medio: IMV, pensiones no contributivas, subsidio por desempleo, rentas mínimas autonómicas, la mitad de las ayudas a la vivienda, el 80 % de las prestaciones familiares.' },
          ruFinancement: { nom: 'Parte financiada por un impuesto específico', f: (v) => fmt(v, 0) + ' %', repere: 'Un impuesto proporcional sobre todas las rentas, por ejemplo. Calculado sin efecto sobre la actividad.' },
          crise: { nom: 'Coste de una crisis', f: (v) => (v ? mds(v) : 'ninguna'), repere: 'Covid: la deuda pasó de en torno al 98 % al 120 % del PIB en 2020. DANA de Valencia: 3,6 mil M€ de gasto en 2025.' },
          anneeCrise: { nom: 'Año de la crisis', f: (v) => String(v), repere: 'Coste repartido 60 % / 40 % en dos años, con caída del PIB.' },
        },
        postes: {
          defense: { nom: 'Defensa', note: 'Función de defensa según Eurostat. Según la OTAN (pensiones militares, Guardia Civil en misiones…), 33 mil M€ en 2025, el 2 % del PIB; España se ha comprometido al 2,1 %.' },
          enseignement: { nom: 'Educación', note: 'De primaria a universidad, gestionada sobre todo por las comunidades autónomas.' },
          sante: { nom: 'Sanidad', note: 'Sistema Nacional de Salud, gestionado por las comunidades autónomas.' },
          retraites: { nom: 'Pensiones', note: 'Pensiones de jubilación y de supervivencia. Los controles del grupo «Pensiones» se suman aquí.' },
          social: { nom: 'Otra protección social', note: 'Desempleo, incapacidad, familia, dependencia, exclusión. La renta básica, neta de las ayudas que sustituye, se suma aquí.' },
          securite: { nom: 'Orden público y justicia', note: 'Policía Nacional, Guardia Civil, policías autonómicas, justicia, prisiones.' },
          economie: { nom: 'Asuntos económicos', note: 'Transporte, energía, agricultura, ayudas a empresas, fondos europeos.' },
          general: { nom: 'Servicios generales', note: 'Administración general, transferencias a la UE, investigación básica. Sin intereses.' },
          cadre: { nom: 'Vivienda, medio ambiente, cultura', note: 'Vivienda, medio ambiente, cultura y deporte.' },
        },
        prereglages: {
          tendanciel: 'Tendencial', taux: 'Tipos altos', faible: 'Crecimiento débil', retraite68: 'Jubilación a los 68',
          sansDerive: 'Sin deriva de las pensiones', chomage7: 'Paro al 7 %', effort: 'Esfuerzo compartido',
          hauts: 'Gravar las rentas altas', smi: 'SMI +10 %', ru: 'Renta básica', crise: 'Crisis en 2029',
        },
        nonVentile: (montant, annee) => `Sin asignar (ahorros transversales, SMI de los empleados públicos, crisis): ${montant} en ${annee}.`,
        methode: (d) => `
          <p>Mismo método que el simulador francés. Cada año, la deuda aumenta en el importe del déficit: gasto primario, menos ingresos, más intereses. El PIB crece con el crecimiento real y la inflación; los ingresos siguen al PIB; el gasto primario sigue su propio ritmo.</p>
          <p><strong>Punto de partida estimado (finales de ${d.annee}):</strong> PIB ${mds(d.pib)}, deuda ${mds(d.dette)} (${pct(d.ratio)} del PIB, previsión de la AIReF de julio de 2026), déficit del ${pct(-d.soldePib)} del PIB, intereses ${mds(d.interets)}. El último dato observado es el del Banco de España para finales de 2025: ${mds(COMPTES_2025.dette)}, el ${pct(COMPTES_2025.ratio)} del PIB. En noviembre de 2026, la AIReF elevó su previsión de déficit para 2026 al 2,8 %.</p>
          <p><strong>Hipótesis propias de la aplicación, no tomadas de las fuentes:</strong></p>
          <ul>
            <li>El ${fmt(H.refinancement * 100)} % del saldo vivo se refinancia cada año al tipo de mercado, y toda la deuda nueva también. Es la calibración del modelo francés, ajustada a la vida media más corta de la deuda española (7,9 años frente a 8,6).</li>
            <li>El gasto primario de 2026 se reparte entre funciones según su peso estimado en 2024. Los importes por función se reconstruyen a partir de los porcentajes del PIB publicados por Eurostat y del total de la IGAE: son órdenes de magnitud.</li>
            <li>Suprimir un beneficio fiscal aporta el ${fmt(H.nichesRendement * 100, 0)} % de su coste declarado.</li>
            <li>Los rendimientos por punto del IVA, del IRPF, del impuesto sobre sociedades y del impuesto mínimo sobre patrimonios son estimaciones de la aplicación, fiables con un margen del 30 %. El IVA se calibra con los 17,8 mil M€ de tipos reducidos cuantificados por la AIReF; el IRPF con sus 142,5 mil M€ de 2025. La escala es la de una comunidad «tipo»: cada comunidad autónoma fija su propia parte.</li>
            <li>El IVA se calcula con consumo constante: una subida no reduce las compras ni frena el crecimiento, y una bajada no las estimula.</li>
            <li>Un año más o menos de edad legal equivale a ${fmt(k.agePlus)} mil M€ al año en 2035, alcanzados progresivamente (estimación de la aplicación, con un margen del 50 %: unas 330 000 jubilaciones al año y una pensión inicial de unos 21 000 €).</li>
            <li>La deriva de las pensiones sigue la proyección de la AIReF (del 13,0 % del PIB en 2026 al 16,1 % en 2050); el MEI sigue el calendario legal. El gasto en dependencia avanza en línea recta hasta su nivel de 2050.</li>
            <li>Un punto menos de paro aporta ${fmt(k.chomagePt)} mil M€ al año, en ${H.monteeChomage} años, sin efecto adicional sobre el PIB (estimación de la aplicación).</li>
            <li>Los efectos por punto de subida del SMI son estimaciones de la aplicación, fiables con un margen del 50 %. Como el SMI está exento de IRPF, solo se cuentan las cotizaciones. Los empleos perdidos se convierten en paro sobre una población activa de ${fmt(H.smi.populationActive, 1)} millones.</li>
            <li>La renta básica se imputa a «Otra protección social». Salvo el IMV, los importes de las ayudas que sustituye (${mds(k.totalAides)} en total) son órdenes de magnitud; su reducción sigue la relación entre la renta básica y la ayuda media.</li>
            <li>Las palancas presupuestarias se despliegan en ${H.montee} años y después siguen al PIB.</li>
            <li>Una crisis reduce el PIB un 1 % por cada 50 mil M€, la mitad del cual se recupera al año siguiente.</li>
            <li>El «tendencial» mantiene el gasto primario al ritmo del crecimiento, más la deriva de las pensiones y de la dependencia: no es una previsión oficial.</li>
          </ul>
          <p><strong>Lo que el modelo no tiene en cuenta:</strong> el efecto de los ahorros o de las subidas de impuestos sobre el crecimiento, la reacción de los tipos al nivel de deuda, el final de los fondos europeos NextGenerationEU en 2026, las transferencias entre administraciones (la asunción por el Estado de deuda autonómica no cambia la deuda consolidada), las ventas de activos y las diferencias entre déficit y variación de la deuda.</p>`,
      };
    },

    de: (u, m) => {
      const { H, BASE, COMPTES_2025 } = m;
      const { fmt, pct, mds, signe, mdsSigne, points, euros, ansMois, pctAn } = u;
      const k = calc(m);
      const effet = (g, inchange, aTerme = true) => (Math.abs(g) < 0.05 ? inchange : `${aTerme ? 'Langfristige Wirkung' : 'Wirkung'}: ${mdsSigne(g)} pro Jahr, in Euro von 2026.`);
      return {
        titreDoc: 'Spanische Staatsschulden: Projektion über 10 Jahre',
        h1: 'Spanische Staatsschulden: Projektion 2027-2036',
        groupes: {
          economie: { titre: 'Wirtschaft' },
          depenses: { titre: 'Ausgaben' },
          postes: { titre: 'Ausgaben nach Aufgabenbereich', intro: 'Reales Wachstum jedes Bereichs. Ohne Einstellung folgen alle dem allgemeinen Tempo oben.' },
          recettes: { titre: 'Einnahmen' },
          iva: { titre: 'Mehrwertsteuer (IVA)', intro: 'Drei geltende Sätze. Sofortige Wirkung, berechnet bei unverändertem Konsum.',
            resume: (p) => effet(m.effetIVA(p), 'Sätze unverändert.', false) },
          irpf: { titre: 'Einkommensteuer (IRPF), Körperschaftsteuer und große Vermögen',
            intro: 'Kombinierter allgemeiner Tarif (Anteil des Zentralstaats und einer „typischen“ autonomen Gemeinschaft). Jede Region legt ihren Anteil selbst fest: Der Spitzensteuersatz reicht von 45 % (Madrid) bis 54 % (Valencianische Gemeinschaft).',
            resume: (p) => effet(m.effetImpot(p), 'Tarif unverändert.') },
          retraites: { titre: 'Renten',
            intro: 'Die Renten werden an den Verbraucherpreisindex angepasst (Gesetz von 2021). Der MEI, ein Generationengerechtigkeitsbeitrag von 0,9 % im Jahr 2026, der bis 2029 auf 1,2 % steigt, ist im Basisszenario enthalten.' },
          emploi: { titre: 'Beschäftigung und Alterung' },
          smi: { titre: 'Mindestlohn (SMI)', intro: 'Gesetzlicher Mindestlohn. Erhöhung zusätzlich zur jährlich von der Regierung beschlossenen Anpassung.',
            resume: (p) => {
              if (!p.smi) return 'Mindestlohn unverändert.';
              const { s, solde } = k.smiSolde(p);
              return `Arbeitslosigkeit ${points(s.chomage, 2)}. Langfristige Wirkung auf den Saldo: ${mdsSigne(solde)} pro Jahr, in Euro von 2026.`;
            } },
          ru: { titre: 'Bedingungsloses Grundeinkommen',
            intro: 'An jede Einwohnerin und jeden Einwohner ohne Bedingungen gezahlt. Es ersetzt beitragsunabhängige Leistungen bis zu seiner Höhe; beitragsfinanzierte Renten und Arbeitslosenversicherung bleiben unberührt.',
            resume: (p) => {
              const r = m.effetRevenuUniversel(p);
              if (r.brut < 0.05) return 'Kein Grundeinkommen.';
              return `Bruttokosten ${mds(r.brut)}, gestrichene Leistungen −${mds(r.aides)}, Nettokosten ${mds(r.net)} pro Jahr (${pct(r.net / BASE.pib * 100)} des BIP)`
                + (r.financement > 0.05 ? `, davon ${mds(r.financement)} durch die eigene Abgabe gedeckt.` : '.');
            } },
          chocs: { titre: 'Schocks' },
        },
        curseurs: {
          croissance: { nom: 'Reales BIP-Wachstum', f: (v) => pctAn(v), repere: 'Durchschnitt über 10 Jahre, ohne Inflation. AIReF: 2,5 % im Jahr 2026, 2,1 % im Jahr 2027, danach eine Abschwächung.' },
          inflation: { nom: 'Inflation', f: (v) => pctAn(v), repere: 'Bei 1,6 % Wachstum und 2,0 % Inflation reicht ein Defizit von etwa 3,5 % des BIP, um die Schulden zu stabilisieren.' },
          tauxMarche: { nom: 'Emissionszins des Schatzamts', f: (v) => pct(v), repere: 'Tesoro: Emissionen 2025 im Schnitt zu 2,71 %, Bestand zu 2,32 %. Durchschnittliche Laufzeit: 7,9 Jahre.' },
          depenses: { nom: 'Primärausgaben, real', f: (v) => pctAn(v), repere: 'Referenz: im Tempo des Wachstums. Die EU-Regeln begrenzen die Nettoausgaben; laut AIReF überschreitet Spanien sie.' },
          economies: { nom: 'Zusätzliche dauerhafte Einsparungen', f: (v) => mds(v), repere: 'In Mrd. € von 2026, in 3 Jahren erreicht. AIReF: Bis 2028 wäre eine Anpassung von 0,9 Pp. des BIP (etwa 15 Mrd. €) nötig.' },
          prelevements: { nom: 'Staatliche Einnahmenquote', f: (v) => signe(v) + ' Pp. des BIP', repere: 'Banco de España: Einnahmen 2025 bei 42,9 % des BIP, Ausgaben bei 45,3 %.' },
          niches: { nom: 'Gestrichene Steuervergünstigungen', f: (v) => fmt(v, 0) + ' %', repere: 'AIReF: etwa 60 Mrd. € pro Jahr, davon 17,8 Mrd. € ermäßigte Mehrwertsteuersätze (Überschneidung mit den Mehrwertsteuer-Reglern). Angenommener Nettoertrag: die Hälfte.' },
          fraude: { nom: 'Zusätzlich eingetriebener Steuerbetrug', f: (v) => '+' + fmt(v) + ' Mrd. €/Jahr', repere: 'Agencia Tributaria: 22,7 Mrd. € durch Kontrollen im Jahr 2025 eingenommen.' },
          iva21: { nom: 'Regelsatz', f: (v) => pct(v), repere: `Aktuell: 21 %. Die meisten Waren und Dienstleistungen. Ein Punkt ≈ ${fmt(H.iva.parPoint[0])} Mrd. € (Schätzung der Anwendung).` },
          iva10: { nom: 'Ermäßigter Satz', f: (v) => pct(v), repere: `Aktuell: 10 %. Hotellerie, Gastronomie, Verkehr, Neubauwohnungen. Ein Punkt ≈ ${fmt(H.iva.parPoint[1])} Mrd. €. Brüssel nennt 7 Mrd. € für die Anhebung des Gastgewerbes auf 21 %.` },
          iva4: { nom: 'Stark ermäßigter Satz', f: (v) => pct(v), repere: `Aktuell: 4 %. Brot, Milch, Obst und Gemüse, Arzneimittel, Bücher. Ein Punkt ≈ ${fmt(H.iva.parPoint[2], 2)} Mrd. €.` },
          ...curseursIR(u, m, {
            jusqua: (a) => `Bis ${a}`, de: (a, b) => `${a} bis ${b}`, audela: (a) => `Über ${a}`,
            tranche: (t) => `Stufe ${t} %.`, unPoint: (v) => `Ein Punkt ≈ ${v} Mrd. €.`,
          }, ['Alle Steuerpflichtigen durchlaufen sie; hier wird der persönliche Grundfreibetrag (5 550 €) angerechnet.', '', '', 'Obere mittlere Einkommen.', 'Hohe Einkommen.', 'Sehr hohe Einkommen, etwa 0,1 % der Steuerpflichtigen.']),
          irSurtaxe: { nom: 'Neue Spitzenstufe', f: (v, p) => (v ? `${pct(p.ir47 + v)} (+${v} Pkt.)` : 'keine'), repere: 'Zuschlag auf den Satz der obersten Stufe, oberhalb der folgenden Schwelle.' },
          irSeuil: { nom: 'Schwelle der neuen Stufe', f: (v) => euros(v), repere: 'Je höher die Schwelle, desto weniger Einkommen bleibt zu besteuern.' },
          societes: { nom: 'Körperschaftsteuer', f: (v) => pct(v), repere: `Regelsatz: 25 %. 45,6 Mrd. € im Jahr 2024 (Funcas). Ein Punkt ≈ ${fmt(H.societes.parPoint)} Mrd. € vor Reaktion der Unternehmen.` },
          patrimoine: { nom: 'Mindeststeuer auf Vermögen über 100 Mio. €', f: (v) => (v ? pct(v) + ' pro Jahr' : 'keine'),
            repere: `Käme zur Solidaritätssteuer auf große Vermögen hinzu. Ein Punkt ≈ ${fmt(H.patrimoineParPoint, 0)} Mrd. € brutto (Schätzung der Anwendung).` },
          erosion: { nom: 'Reaktion der Steuerpflichtigen', f: (v) => `−${fmt(v, 0)} % des Ertrags`,
            repere: 'Anteil des Ertrags, der durch Abwanderung, Steuergestaltung oder geringere Aktivität verloren geht. Gilt für Erhöhungen ab der 37-%-Stufe, bei der Körperschaftsteuer und auf Vermögen.' },
          ageLegal: { nom: 'Gesetzliches Renteneintrittsalter', f: (v) => ansMois(67 + v),
            repere: `Referenz: 67 Jahre, erreicht 2027 (65 bei langer Erwerbsbiografie). Schätzung der Anwendung: Ein Jahr mehr bringt 2035 etwa ${fmt(k.agePlus, 0)} Mrd. €.` },
          cotisation: { nom: 'Rentenbeitrag zusätzlich zum MEI', f: (v) => points(v), repere: `Ein Punkt ≈ ${fmt(H.cotisationPoint)} Mrd. € pro Jahr (der MEI mit 0,9 % soll 2026 5,3 Mrd. € bringen), verteuert aber die Arbeit.` },
          sousIndexation: { nom: 'Rentenanpassung unter dem VPI', f: (v) => (v ? '−' + fmt(v) + ' Pkt./Jahr' : 'nein'),
            repere: `Ein Punkt weniger spart etwa ${fmt(H.sousIndexationPoint)} Mrd. € pro Jahr, die in den Folgejahren erhalten bleiben (beitragsfinanzierte Renten: ~203 Mrd. €).` },
          anneesSousIndexation: { nom: 'Dauer der Unterindexierung', f: (v) => u.annees(v), repere: 'Ab 2027.' },
          retraites: { nom: 'Entwicklung der Rentenausgaben', f: (v) => fmt(v, 0) + ' % der AIReF-Projektion', repere: 'AIReF: 12,7 % des BIP im Jahr 2022, 16,1 % im Jahr 2050, durch den Renteneintritt der Babyboomer.' },
          chomage: { nom: 'Angestrebte Arbeitslosenquote', f: (v) => pct(v), repere: `Referenz: 10,2 % (EPA, 3. Quartal 2026). Ein Punkt weniger bringt etwa ${fmt(k.chomagePt, 0)} Mrd. € pro Jahr (Schätzung), erreicht in ${H.monteeChomage} Jahren.` },
          dependance: { nom: 'Pflegeausgaben im Jahr 2050', f: (v) => pct(v) + ' des BIP', repere: 'Ageing Report 2024: etwa 0,8 % im Jahr 2022, +0,6 Pp. bis 2050 (Referenz 1,4 %).' },
          smi: { nom: 'Erhöhung des Mindestlohns', f: (v) => (v ? `+${v} % (≈ ${euros(H.smi.brutMensuel * (1 + v / 100))} brutto × 14)` : 'keine'),
            repere: `${euros(H.smi.brutMensuel)} brutto pro Monat bei 14 Zahlungen im Jahr 2026, einkommensteuerfrei. Je Punkt: +${fmt(H.smi.recettesPoint, 2)} Mrd. € Beiträge, −${fmt(H.smi.publicPoint, 2)} Mrd. € öffentliche Löhne.` },
          smiEmplois: { nom: 'Verlorene Stellen je Erhöhungspunkt', f: (v) => (v ? `${fmt(v * 1000, 0)} Stellen` : 'keine'),
            repere: 'Umstrittene Annahme, besonders nach der Erhöhung um 22 % im Jahr 2019. Verlorene Stellen wirken über den Regler „Arbeitslosigkeit“.' },
          ruAdulte: { nom: 'Betrag je Erwachsenem', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'),
            repere: `${fmt(H.ru.adultes)} Millionen Erwachsene: 100 € pro Monat kosten ${mds(H.ru.adultes * 1.2)} pro Jahr. Zum Vergleich: durchschnittliches Mindesteinkommen (IMV) 517 € je Haushalt.` },
          ruMineur: { nom: 'Betrag je Kind', f: (v) => (v ? euros(v) + '/Monat' : 'keiner'),
            repere: `${fmt(H.ru.mineurs)} Millionen Minderjährige, an die Eltern gezahlt. Ersetzt die Familienleistungen.` },
          ruAides: { nom: 'Im Gegenzug gestrichene Leistungen', f: (v) => fmt(v, 0) + ' % des Ersetzbaren',
            repere: 'Eine Leistung wird im Verhältnis des Grundeinkommens zu ihrem Durchschnittsbetrag gestrichen: IMV, beitragsunabhängige Renten, Arbeitslosenhilfe, regionale Mindesteinkommen, die Hälfte der Wohnhilfen, 80 % der Familienleistungen.' },
          ruFinancement: { nom: 'Durch eine eigene Abgabe finanzierter Anteil', f: (v) => fmt(v, 0) + ' %', repere: 'Zum Beispiel eine proportionale Steuer auf alle Einkommen. Ohne Wirkung auf die Wirtschaftstätigkeit berechnet.' },
          crise: { nom: 'Kosten einer Krise', f: (v) => (v ? mds(v) : 'keine'), repere: 'Covid: Die Schulden stiegen 2020 von etwa 98 % auf 120 % des BIP. DANA-Flut in Valencia: 3,6 Mrd. € Ausgaben im Jahr 2025.' },
          anneeCrise: { nom: 'Jahr der Krise', f: (v) => String(v), repere: 'Kosten zu 60 % / 40 % auf zwei Jahre verteilt, mit BIP-Rückgang.' },
        },
        postes: {
          defense: { nom: 'Verteidigung', note: 'Verteidigung nach Eurostat-Abgrenzung. Nach NATO-Definition (Militärrenten, Guardia Civil im Einsatz…) 33 Mrd. € im Jahr 2025, also 2 % des BIP; Spanien hat sich zu 2,1 % verpflichtet.' },
          enseignement: { nom: 'Bildung', note: 'Von der Grundschule bis zur Hochschule, überwiegend von den autonomen Gemeinschaften verwaltet.' },
          sante: { nom: 'Gesundheit', note: 'Nationales Gesundheitssystem, von den autonomen Gemeinschaften verwaltet.' },
          retraites: { nom: 'Renten', note: 'Alters- und Hinterbliebenenrenten. Die Regler der Gruppe „Renten“ kommen hinzu.' },
          social: { nom: 'Sonstige soziale Sicherung', note: 'Arbeitslosigkeit, Invalidität, Familie, Pflege, Ausgrenzung. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.' },
          securite: { nom: 'Öffentliche Ordnung und Justiz', note: 'Nationalpolizei, Guardia Civil, Regionalpolizeien, Justiz, Gefängnisse.' },
          economie: { nom: 'Wirtschaftliche Angelegenheiten', note: 'Verkehr, Energie, Landwirtschaft, Unternehmenshilfen, EU-Fonds.' },
          general: { nom: 'Allgemeine Verwaltung', note: 'Allgemeine Verwaltung, Zahlungen an die EU, Grundlagenforschung. Ohne Zinsen.' },
          cadre: { nom: 'Wohnen, Umwelt, Kultur', note: 'Wohnungswesen, Umwelt, Kultur und Sport.' },
        },
        prereglages: {
          tendanciel: 'Basisszenario', taux: 'Hohe Zinsen', faible: 'Schwaches Wachstum', retraite68: 'Rente mit 68',
          sansDerive: 'Ohne Rentenanstieg', chomage7: 'Arbeitslosigkeit 7 %', effort: 'Geteilte Anstrengung',
          hauts: 'Hohe Einkommen besteuern', smi: 'Mindestlohn +10 %', ru: 'Grundeinkommen', crise: 'Krise 2029',
        },
        nonVentile: (montant, annee) => `Nicht zugeordnet (Querschnittseinsparungen, Mindestlohn im öffentlichen Dienst, Krise): ${montant} im Jahr ${annee}.`,
        methode: (d) => `
          <p>Gleiche Methode wie der französische Simulator. Jedes Jahr steigen die Schulden um das Defizit: Primärausgaben minus Einnahmen plus Zinsen. Das BIP wächst mit dem realen Wachstum und der Inflation; die Einnahmen folgen dem BIP; die Primärausgaben folgen ihrem eigenen Tempo.</p>
          <p><strong>Geschätzter Ausgangspunkt (Ende ${d.annee}):</strong> BIP ${mds(d.pib)}, Schulden ${mds(d.dette)} (${pct(d.ratio)} des BIP, AIReF-Prognose vom Juli 2026), Defizit ${pct(-d.soldePib)} des BIP, Zinsen ${mds(d.interets)}. Der letzte gemessene Wert ist der des Banco de España für Ende 2025: ${mds(COMPTES_2025.dette)}, ${pct(COMPTES_2025.ratio)} des BIP. Im November 2026 hob die AIReF ihre Defizitprognose für 2026 auf 2,8 % an.</p>
          <p><strong>Eigene Annahmen der Anwendung, nicht aus den Quellen:</strong></p>
          <ul>
            <li>${fmt(H.refinancement * 100)} % des Schuldenstands werden jedes Jahr zum Marktzins refinanziert, neue Schulden vollständig. Das ist die Kalibrierung des französischen Modells, angepasst an die kürzere durchschnittliche Laufzeit der spanischen Schulden (7,9 statt 8,6 Jahre).</li>
            <li>Die Primärausgaben 2026 werden nach ihrem geschätzten Gewicht von 2024 auf die Bereiche verteilt. Die Beträge je Bereich sind aus den von Eurostat veröffentlichten BIP-Anteilen und der IGAE-Gesamtsumme rekonstruiert: Es sind Größenordnungen.</li>
            <li>Die Streichung einer Steuervergünstigung bringt ${fmt(H.nichesRendement * 100, 0)} % ihrer ausgewiesenen Kosten.</li>
            <li>Die Erträge je Punkt der Mehrwertsteuer, der Einkommensteuer, der Körperschaftsteuer und der Mindeststeuer auf Vermögen sind Schätzungen der Anwendung, auf 30 % genau. Die Mehrwertsteuer ist auf die von der AIReF bezifferten 17,8 Mrd. € ermäßigter Sätze kalibriert, die Einkommensteuer auf ihre 142,5 Mrd. € von 2025. Der Tarif ist der einer „typischen“ Region: Jede autonome Gemeinschaft legt ihren Anteil selbst fest.</li>
            <li>Die Mehrwertsteuer wird bei unverändertem Konsum berechnet: Eine Erhöhung verringert weder die Käufe noch das Wachstum, eine Senkung regt sie nicht an.</li>
            <li>Ein Jahr Rentenalter mehr oder weniger entspricht 2035 ${fmt(k.agePlus)} Mrd. € pro Jahr, schrittweise erreicht (Schätzung der Anwendung, auf 50 % genau: etwa 330 000 Renteneintritte pro Jahr und eine Anfangsrente von rund 21 000 €).</li>
            <li>Die Rentenausgaben folgen der AIReF-Projektion (von 13,0 % des BIP im Jahr 2026 auf 16,1 % im Jahr 2050); der MEI folgt dem gesetzlichen Zeitplan. Die Pflegeausgaben steigen linear auf ihr Niveau von 2050.</li>
            <li>Ein Punkt weniger Arbeitslosigkeit bringt ${fmt(k.chomagePt)} Mrd. € pro Jahr, in ${H.monteeChomage} Jahren, ohne zusätzliche Wirkung auf das BIP (Schätzung der Anwendung).</li>
            <li>Die Wirkungen je Punkt Mindestlohnerhöhung sind Schätzungen der Anwendung, auf 50 % genau. Da der Mindestlohn einkommensteuerfrei ist, werden nur Beiträge gezählt. Verlorene Stellen werden auf eine Erwerbsbevölkerung von ${fmt(H.smi.populationActive, 1)} Millionen in Arbeitslosigkeit umgerechnet.</li>
            <li>Das Grundeinkommen wird der „Sonstigen sozialen Sicherung“ zugeordnet. Abgesehen vom IMV sind die Beträge der ersetzten Leistungen (${mds(k.totalAides)} insgesamt) Größenordnungen; ihre Kürzung folgt dem Verhältnis von Grundeinkommen und Durchschnittsleistung.</li>
            <li>Haushaltshebel wirken schrittweise über ${H.montee} Jahre und folgen danach dem BIP.</li>
            <li>Eine Krise senkt das BIP um 1 % je 50 Mrd. €, wovon die Hälfte im Folgejahr aufgeholt wird.</li>
            <li>Das „Basisszenario“ lässt die Primärausgaben mit dem Wachstum steigen, zuzüglich der Entwicklung von Renten und Pflege: Es ist keine offizielle Prognose.</li>
          </ul>
          <p><strong>Was das Modell nicht berücksichtigt:</strong> die Wirkung von Einsparungen oder Steuererhöhungen auf das Wachstum, die Reaktion der Zinsen auf die Schuldenhöhe, das Ende der EU-Mittel aus NextGenerationEU im Jahr 2026, Transfers zwischen staatlichen Ebenen (die Übernahme regionaler Schulden durch den Zentralstaat ändert die konsolidierten Schulden nicht), Vermögensverkäufe und Abweichungen zwischen Defizit und Schuldenänderung.</p>`,
      };
    },
  };

  return { id: 'es', modele, sources, pib2024: 1595, structure, textes };
});

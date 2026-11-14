// Modèle de projection de la dette publique espagnole (périmètre de Maastricht, PDE).
// Montants en Md€, taux et ratios en %. Aucune dépendance : utilisable dans le
// navigateur (window.DetteEspagne) comme sous Node (require).
// Même mécanique que le modèle français (../fr/model.js), leviers adaptés à l'Espagne.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.DetteEspagne = fabrique();
})(globalThis, function () {
  // Dernier exercice mesuré : Banco de España (dette PDE fin 2025), IGAE (déficit
  // notifié à Eurostat, DANA comprise), Banco de España (recettes en % du PIB).
  const COMPTES_2025 = { dette: 1698, ratio: 100.8, deficit: 40.3, recettesPib: 42.9 };

  // Point de départ : fin 2026, estimé. PIB 2025 (dette / ratio) + 5,0 % en valeur
  // (2,5 % en volume selon l'AIReF, déflateur d'environ 2,5 %) ; dette à 99,3 % du
  // PIB et déficit à 2,6 % (AIReF, juillet 2026) ; recettes au taux 2025 ;
  // intérêts ~42 Md€ (40,3 Md€ en 2025, coût moyen en légère hausse).
  const PIB_2026 = Math.round((COMPTES_2025.dette / COMPTES_2025.ratio) * 100 * 1.05);
  const BASE = (() => {
    const pib = PIB_2026;
    const recettes = pib * COMPTES_2025.recettesPib / 100;
    const interets = 42;
    return {
      annee: 2026,
      pib,
      dette: pib * 0.993,
      dettePrecedente: COMPTES_2025.dette,
      recettes,
      interets,
      depensesPrimaires: recettes + pib * 0.026 - interets,
    };
  })();

  // Hypothèses fixes, documentées dans l'interface.
  const H = {
    // Part de l'encours refinancée chaque année au taux de marché. Calage français
    // (0,145 pour une maturité de 8,6 ans) transposé à la vie moyenne espagnole
    // de 7,9 ans (Tesoro Público, fin 2025).
    refinancement: 0.158,
    montee: 3,              // années de montée en charge des leviers
    nichesTotal: 60,        // AIReF, Spending review : environ 60 Md€ de bénéfices fiscaux
    nichesRendement: 0.5,   // gain net / coût brut d'un bénéfice fiscal supprimé
    // Dépenses par fonction en 2024, Md€, hors intérêts. Reconstitution de
    // l'application à partir des parts du PIB (Eurostat, gov_10a_exp) et du total
    // IGAE (725,0 Md€ dont ~38,8 Md€ d'intérêts).
    postes: [
      { id: 'defense', nom: 'Défense', montant: 16.0 },
      { id: 'enseignement', nom: 'Enseignement', montant: 65.4 },
      { id: 'sante', nom: 'Santé', montant: 103.7 },
      { id: 'retraites', nom: 'Retraites', montant: 205.0 },
      { id: 'social', nom: 'Autre protection sociale', montant: 93.0 },
      { id: 'securite', nom: 'Sécurité et justice', montant: 28.0 },
      { id: 'economie', nom: 'Affaires économiques', montant: 80.0 },
      { id: 'general', nom: 'Services généraux', montant: 57.0 },
      { id: 'cadre', nom: 'Logement, environnement, culture', montant: 38.0 },
    ],
    // IRPF : barème général combiné État + communauté autonome « type » (19 à 47 %).
    // parPoint : Md€ par point de taux de chaque tranche, estimations de
    // l'application calées sur 142,5 Md€ d'IRPF en 2025 (AEAT).
    irpf: {
      taux: [19, 24, 30, 37, 45, 47],
      seuils: [0, 12450, 20200, 35200, 60000, 300000],
      parPoint: [1.35, 0.7, 0.9, 0.7, 0.6, 0.1],
      pareto: 1.5, // décroissance de l'assiette au-delà du dernier seuil
    },
    // IVA : Md€ nets par point de chaque taux en 2026, à consommation inchangée.
    // Calage : taux réduits = 17,8 Md€ de bénéfices fiscaux en 2020 (AIReF),
    // revalorisés ; le reste des ~98 Md€ d'IVA au taux général.
    iva: { taux: [21, 10, 4], parPoint: [3.9, 1.4, 0.45] },
    // Impôt sur les sociétés : 45,6 Md€ en 2024 (Funcas) au taux de 25 %.
    societes: { taux: 25, parPoint: 1.6 },
    patrimoineParPoint: 3, // Md€ bruts par point d'impôt plancher au-delà de 100 M€
    // Âge légal (67 ans en 2027) : effet en 2035 d'un an de plus ou de moins,
    // Md€ de 2026 : [moindres pensions, recettes en plus]. Estimation de
    // l'application (environ 330 000 départs par an, pension d'entrée ~21 000 €).
    age: { plus: [6.5, 3.5], moins: [6.5, 3.5] },
    pleinEffet: 2035,
    // Mécanisme d'équité intergénérationnelle (MEI) : 0,9 % en 2026, 5,3 Md€ attendus.
    cotisationPoint: 5.9,   // Md€ par point de cotisation
    mei: [[2026, 0.9], [2027, 1.0], [2028, 1.1], [2029, 1.2], [2050, 1.2]],
    // Pensions contributives : nómina ~14,5 Md€ × 14 versements ≈ 203 Md€.
    sousIndexationPoint: 2.0, // Md€ par point et par année
    // Chômage : 10,18 % au T3 2026 (EPA). Md€ par point : [dépenses, recettes],
    // estimations de l'application.
    chomageRef: 10.2,
    chomagePoint: [2.0, 4.0],
    monteeChomage: 5,
    // Dépense de pensions, % du PIB (AIReF, mars 2025 : 12,7 % en 2022, 16,1 % en
    // 2050 ; Ivie : ~13 % en 2026).
    pensions: [[2022, 12.7], [2026, 13.0], [2050, 16.1]],
    // Dépendance (soins de longue durée) : ~0,8 % du PIB en 2022, +0,6 point en 2050
    // (Ageing Report 2024, via CaixaBank Research).
    dependance2022: 0.8,
    // Hausse du SMI au-delà de la revalorisation décidée : Md€ de 2026 par point,
    // estimations de l'application. Le SMI n'ouvre pas d'allègements de cotisations.
    smi: {
      brutMensuel: 1221,     // € bruts par mois, 14 versements (RD 126/2026)
      recettesPoint: 0.12,   // cotisations sur le surcroît de salaire (exonéré d'IRPF)
      publicPoint: 0.03,     // agents publics rémunérés au SMI
      populationActive: 25.4, // millions de personnes (EPA)
    },
    // Revenu universel versé à chaque résident (49,6 millions au 1er janvier 2026,
    // INE ; part des mineurs estimée à 16,3 %). Aides non contributives absorbées,
    // Md€ par an, ordres de grandeur : part absorbée = min(1, montant / seuil) × plafond.
    ru: {
      adultes: 41.5,
      mineurs: 8.1,
      aides: [
        { id: 'imv', nom: 'Ingreso mínimo vital', montant: 5.5, seuil: 500, plafond: 1, base: 'adultes' },
        { id: 'pnc', nom: 'Pensions non contributives', montant: 3.3, seuil: 560, plafond: 1, base: 'adultes' },
        { id: 'subsidio', nom: 'Allocation chômage d’assistance', montant: 6.0, seuil: 480, plafond: 1, base: 'adultes' },
        { id: 'rentas', nom: 'Revenus minimums régionaux', montant: 1.5, seuil: 500, plafond: 1, base: 'adultes' },
        { id: 'logement', nom: 'Aides au logement', montant: 1.5, seuil: 250, plafond: 0.5, base: 'adultes' },
        { id: 'famille', nom: 'Prestations familiales', montant: 2.5, seuil: 100, plafond: 0.8, base: 'mineurs' },
      ],
    },
  };

  const DEFAUTS = {
    croissance: 1.6,   // PIB en volume, %/an
    inflation: 2.0,    // déflateur du PIB, %/an
    tauxMarche: 3.0,   // taux moyen à l'émission, %
    depenses: 1.6,     // dépense primaire en volume, %/an
    economies: 0,      // économies pérennes, Md€ de 2026
    prelevements: 0,   // variation du taux de recettes, points de PIB
    niches: 0,         // % des bénéfices fiscaux supprimés
    fraude: 0,         // recouvrement supplémentaire, Md€ de 2026 par an
    iva21: 21, iva10: 10, iva4: 4, // taux d'IVA, %
    ir19: 19, ir24: 24, ir30: 30, ir37: 37, ir45: 45, ir47: 47, // barème IRPF, %
    irSurtaxe: 0,      // points ajoutés au-delà de irSeuil
    irSeuil: 1000000,  // seuil de la nouvelle tranche, €
    societes: 25,      // taux de l'impôt sur les sociétés, %
    patrimoine: 0,     // impôt plancher sur les patrimoines > 100 M€, %
    erosion: 30,       // % du gain sur les hauts revenus, sociétés et patrimoines perdu par réaction
    ageLegal: 0,       // années de décalage de l'âge légal vs 67 ans
    cotisation: 0,     // points de cotisation en plus du MEI
    sousIndexation: 0, // points de revalorisation des pensions sous l'IPC, par an
    anneesSousIndexation: 4,
    retraites: 100,    // % de la dérive projetée par l'AIReF
    chomage: 10.2,     // taux de chômage visé, %
    dependance: 1.4,   // dépenses de dépendance en 2050, % du PIB
    crise: 0,          // coût budgétaire d'une crise, Md€
    anneeCrise: 2029,
    smi: 0,            // hausse du SMI au-delà de la revalorisation décidée, %
    smiEmplois: 8,     // milliers d'emplois perdus par point de hausse
    ruAdulte: 0,       // revenu universel par adulte, € de 2026 par mois
    ruMineur: 0,       // revenu universel par mineur, € de 2026 par mois
    ruAides: 100,      // % des aides absorbables effectivement supprimées
    ruFinancement: 0,  // % du coût net couvert par un prélèvement dédié
  };

  // Écart de croissance en volume de chaque poste par rapport au rythme général, points/an.
  for (const q of H.postes) DEFAUTS['poste_' + q.id] = 0;
  const TOTAL_POSTES = H.postes.reduce((s, q) => s + q.montant, 0);
  const IR_IDS = ['ir19', 'ir24', 'ir30', 'ir37', 'ir45', 'ir47'];

  function interpoler(points, x) {
    if (x <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return points[points.length - 1][1];
  }

  // Recettes supplémentaires à terme (IRPF, sociétés, patrimoine), en Md€ de 2026.
  // Les trois premières tranches ne subissent pas d'érosion ; les tranches à
  // 37 % et plus, les sociétés et les patrimoines, si.
  function effetImpot(params) {
    const p = { ...DEFAUTS, ...params };
    const b = H.irpf.parPoint;
    const ecart = (i) => (p[IR_IDS[i]] - H.irpf.taux[i]) * b[i];
    const base = ecart(0) + ecart(1) + ecart(2);
    const nouvelle = p.irSurtaxe * b[5] * Math.pow(p.irSeuil / H.irpf.seuils[5], -H.irpf.pareto);
    const hauts = ecart(3) + ecart(4) + ecart(5) + nouvelle
      + (p.societes - H.societes.taux) * H.societes.parPoint
      + p.patrimoine * H.patrimoineParPoint;
    return base + hauts * (hauts > 0 ? 1 - p.erosion / 100 : 1);
  }

  // Recettes d'IVA supplémentaires, en Md€ de 2026, à comportement inchangé.
  function effetIVA(params) {
    const p = { ...DEFAUTS, ...params };
    return [p.iva21, p.iva10, p.iva4]
      .reduce((s, taux, i) => s + (taux - H.iva.taux[i]) * H.iva.parPoint[i], 0);
  }

  // Effet à terme d'une hausse du SMI, en Md€ de 2026 ; chômage en points.
  function effetSmi(params) {
    const p = { ...DEFAUTS, ...params };
    const s = H.smi;
    return {
      recettes: s.recettesPoint * p.smi,
      depenses: s.publicPoint * p.smi,
      chomage: (p.smi * p.smiEmplois / 1000 / s.populationActive) * 100,
    };
  }

  // Coût du revenu universel à terme, en Md€ de 2026 par an.
  function effetRevenuUniversel(params) {
    const p = { ...DEFAUTS, ...params };
    const brut = (H.ru.adultes * p.ruAdulte + H.ru.mineurs * p.ruMineur) * 12 / 1000;
    const parAide = H.ru.aides.map((a) => {
      const verse = a.base === 'mineurs' ? p.ruMineur : p.ruAdulte;
      return { ...a, absorbe: a.montant * a.plafond * Math.min(1, verse / a.seuil) * p.ruAides / 100 };
    });
    const aides = parAide.reduce((s, a) => s + a.absorbe, 0);
    const net = brut - aides;
    return { brut, aides, parAide, net, financement: Math.max(0, net) * p.ruFinancement / 100 };
  }

  function simuler(params, base = BASE, horizon = 10) {
    const p = { ...DEFAUTS, ...params };
    const tauxRecettes = base.recettes / base.pib;
    const trajectoire = [];

    let pib = base.pib;
    let dette = base.dette;
    let dettePrec = base.dettePrecedente;
    let tauxMoyen = base.interets / base.dettePrecedente;
    const postes = H.postes.map((q) => (base.depensesPrimaires * q.montant) / TOTAL_POSTES);
    const impot = effetImpot(p);
    const iva = effetIVA(p);
    const smi = effetSmi(p);
    const ru = effetRevenuUniversel(p);

    for (let k = 1; k <= horizon; k++) {
      const annee = base.annee + k;
      const montee = Math.min(1, k / H.montee);

      // Croissance
      let reel = p.croissance;
      if (p.crise > 0 && annee === p.anneeCrise) reel -= p.crise / 50;
      if (p.crise > 0 && annee === p.anneeCrise + 1) reel += p.crise / 100;
      const nominal = (1 + reel / 100) * (1 + p.inflation / 100) - 1;
      const ratioPrec = (dette / pib) * 100;
      pib *= 1 + nominal;
      const echelle = pib / base.pib; // convertit les Md€ de 2026 en Md€ courants

      // Retraites et emploi, en Md€ de 2026 : [moindre dépense, recette en plus]
      const versPleinEffet = Math.min(1, k / Math.max(1, H.pleinEffet - base.annee));
      const age = (p.ageLegal > 0 ? H.age.plus : H.age.moins).map((v) => v * p.ageLegal * versPleinEffet);
      const emploi = H.chomagePoint.map((v) =>
        v * (H.chomageRef - p.chomage - smi.chomage) * Math.min(1, k / H.monteeChomage));
      const pensions = H.sousIndexationPoint * p.sousIndexation * Math.min(k, p.anneesSousIndexation);
      // MEI : hausse programmée par la loi, comprise dans le tendanciel.
      const mei = (interpoler(H.mei, annee) - interpoler(H.mei, base.annee)) * H.cotisationPoint;
      const recetteEnPlus = age[1] + emploi[1] + mei + H.cotisationPoint * p.cotisation * montee + iva;

      // Dépenses primaires
      H.postes.forEach((q, i) => {
        postes[i] *= (1 + (p.depenses + p['poste_' + q.id]) / 100) * (1 + p.inflation / 100);
      });
      const retraites = (interpoler(H.pensions, annee) - interpoler(H.pensions, base.annee)) * p.retraites / 100;
      const dependance = ((p.dependance - H.dependance2022) / (2050 - 2022)) * k;
      let coutCrise = 0;
      if (p.crise > 0 && annee === p.anneeCrise) coutCrise = 0.6 * p.crise;
      if (p.crise > 0 && annee === p.anneeCrise + 1) coutCrise = 0.4 * p.crise;
      // Ventilation : les mesures identifiables sont rattachées à leur poste.
      const parPoste = {};
      H.postes.forEach((q, i) => { parPoste[q.id] = postes[i]; });
      parPoste.retraites += pib * retraites / 100 - (age[0] + pensions) * echelle;
      parPoste.social += pib * dependance / 100 - emploi[0] * echelle + ru.net * montee * echelle;
      const nonVentile = (smi.depenses - p.economies) * montee * echelle + coutCrise;
      const depensesPrimaires = Object.values(parPoste).reduce((s, v) => s + v, 0) + nonVentile;

      // Recettes
      const recettes = pib * (tauxRecettes + (p.prelevements / 100) * montee)
        + ((H.nichesTotal * H.nichesRendement * p.niches / 100 + p.fraude + impot
          + smi.recettes + ru.financement) * montee + recetteEnPlus) * echelle;

      // Intérêts : l'ancien encours est repris pour partie au taux de marché,
      // la dette nouvelle l'est en totalité.
      const marche = p.tauxMarche / 100;
      const nouvelle = Math.max(0, dette - dettePrec);
      const ancienne = dette - nouvelle;
      tauxMoyen = (ancienne * ((1 - H.refinancement) * tauxMoyen + H.refinancement * marche)
        + nouvelle * marche) / dette;
      const interets = tauxMoyen * dette;

      const soldePrimaire = recettes - depensesPrimaires;
      const solde = soldePrimaire - interets;
      dettePrec = dette;
      dette -= solde;

      trajectoire.push({
        annee, pib, dette,
        ratio: (dette / pib) * 100,
        recettes, depensesPrimaires, interets, soldePrimaire, solde,
        postes: parPoste, nonVentile,
        soldePib: (solde / pib) * 100,
        soldePrimairePib: (soldePrimaire / pib) * 100,
        interetsPib: (interets / pib) * 100,
        tauxMoyen: tauxMoyen * 100,
        croissanceNominale: nominal * 100,
        soldeStabilisant: -ratioPrec * nominal / (1 + nominal),
      });
    }
    return trajectoire;
  }

  // Ligne « 2026 » au même format que la trajectoire, pour les graphiques.
  function pointDeDepart(base = BASE) {
    const soldePrimaire = base.recettes - base.depensesPrimaires;
    const solde = soldePrimaire - base.interets;
    const postes = {};
    for (const q of H.postes) postes[q.id] = (base.depensesPrimaires * q.montant) / TOTAL_POSTES;
    return {
      postes, nonVentile: 0,
      annee: base.annee, pib: base.pib, dette: base.dette,
      ratio: (base.dette / base.pib) * 100,
      recettes: base.recettes, depensesPrimaires: base.depensesPrimaires,
      interets: base.interets, soldePrimaire, solde,
      soldePib: (solde / base.pib) * 100,
      soldePrimairePib: (soldePrimaire / base.pib) * 100,
      interetsPib: (base.interets / base.pib) * 100,
      tauxMoyen: (base.interets / base.dettePrecedente) * 100,
      croissanceNominale: null, soldeStabilisant: null,
    };
  }

  return { COMPTES_2025, BASE, DEFAUTS, H, simuler, pointDeDepart, effetImpot, effetIVA, effetSmi, effetRevenuUniversel };
});

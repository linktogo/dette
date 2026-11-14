// Modèle de projection de la dette publique allemande (périmètre de Maastricht).
// Montants en Md€, taux et ratios en %. Aucune dépendance : utilisable dans le
// navigateur (window.DetteAllemagne) comme sous Node (require).
// Même mécanique que les modèles français et espagnol, leviers adaptés à l'Allemagne.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.DetteAllemagne = fabrique();
})(globalThis, function () {
  // Dernier exercice mesuré : Bundesbank (dette fin 2025), Destatis (déficit,
  // recettes 2 140,2 Md€ et dépenses 2 259,3 Md€).
  const COMPTES_2025 = { dette: 2838, ratio: 63.5, deficit: 119.1, recettesPib: 47.9 };

  // Point de départ : fin 2026, estimé. PIB 2025 (dette / ratio) + 3,0 % en valeur ;
  // dette à 66,5 % du PIB et déficit à 4,25 % (Stabilitätsrat, mai 2026) ; recettes
  // au taux 2025 ; intérêts ~1,15 % du PIB (1,1 % en 2025).
  const PIB_2026 = Math.round((COMPTES_2025.dette / COMPTES_2025.ratio) * 100 * 1.03);
  const BASE = (() => {
    const pib = PIB_2026;
    const recettes = pib * COMPTES_2025.recettesPib / 100;
    const interets = 53;
    return {
      annee: 2026,
      pib,
      dette: pib * 0.665,
      dettePrecedente: COMPTES_2025.dette,
      recettes,
      interets,
      depensesPrimaires: recettes + pib * 0.0425 - interets,
    };
  })();

  const H = {
    // Part de l'encours refinancée chaque année au taux de marché : calage français
    // transposé à une maturité un peu plus courte (hypothèse de l'application).
    refinancement: 0.16,
    montee: 3,
    // Dépenses par fonction en 2024, Md€, hors intérêts. Reconstitution de
    // l'application (parts du PIB Eurostat, total Destatis 2 139,7 Md€ dont ~45 Md€
    // d'intérêts) : ordres de grandeur.
    postes: [
      { id: 'defense', nom: 'Défense', montant: 48 },
      { id: 'enseignement', nom: 'Enseignement', montant: 190 },
      { id: 'sante', nom: 'Santé', montant: 350 },
      { id: 'retraites', nom: 'Retraites', montant: 490 },
      { id: 'social', nom: 'Autre protection sociale', montant: 430 },
      { id: 'securite', nom: 'Sécurité et justice', montant: 70 },
      { id: 'economie', nom: 'Affaires économiques', montant: 210 },
      { id: 'general', nom: 'Services généraux', montant: 220 },
      { id: 'cadre', nom: 'Logement, environnement, culture', montant: 87 },
    ],
    // Programmes votés en 2025, en % du PIB (hypothèses de l'application) :
    // fonds spécial Infrastructure et neutralité climatique, 500 Md€ sur 12 ans, dont
    // 37,2 Md€ en 2025 et 57,9 Md€ prévus en 2026, puis ~40 Md€ par an ; défense au
    // sens de l'OTAN portée à 3,5 % du PIB en 2029 (2,83 % en 2026).
    infra: [[2026, 1.25], [2027, 0.85], [2036, 0.7], [2037, 0]],
    otan: [[2026, 2.8], [2027, 3.0], [2028, 3.2], [2029, 3.5], [2036, 3.5]],
    // TVA (Mehrwertsteuer) : Md€ par point, tous niveaux d'administration.
    tva: { taux: [19, 7], parPoint: [15, 2.3] },
    // Impôt sur le revenu : Md€ par point. 42 → 45 % = 14 Md€ ; 45 → 48 % = 3 Md€
    // (réponse du gouvernement fédéral, 2025). Zone progressive : estimation.
    ir: { zone: 9, taux: [42, 45], parPoint: [4.7, 1.0], seuils: [69878, 277826], pareto: 1.5 },
    // Impôt sur les sociétés (Körperschaftsteuer) : 15 %, ramené à 10 % de 2028 à
    // 2032 (loi de 2025). Md€ par point, estimation de l'application.
    societes: { taux: 15, parPoint: 2.6, calendrier: [[2027, 15], [2028, 14], [2032, 10]] },
    patrimoineParPoint: 6, // Md€ bruts par point d'impôt plancher au-delà de 100 M€ (estimation)
    // Âge légal (67 ans en 2031) : effet en 2035 d'un an de plus ou de moins, Md€ de 2026 :
    // [moindres pensions, recettes en plus]. Estimation de l'application.
    age: { plus: [12, 5], moins: [12, 5] },
    pleinEffet: 2035,
    cotisationPoint: 16.5,    // Md€ par point de cotisation retraite (estimation)
    sousIndexationPoint: 4.0, // Md€ par point et par année (pensions légales ~400 Md€)
    // Dérive nette des retraites (dépenses moins hausses de cotisations), points de
    // PIB par rapport à 2026 : départ des baby-boomers et maintien du niveau à 48 %
    // jusqu'en 2031. Hypothèse de l'application.
    derive: [[2026, 0], [2031, 0.4], [2036, 0.6], [2050, 0.9]],
    // Chômage au sens de la BA : 6,3 % en octobre 2026. Md€ par point : [dépenses, recettes].
    chomageRef: 6.3,
    chomagePoint: [3.0, 6.0],
    monteeChomage: 5,
    dependance2022: 1.5, // dépenses de dépendance, % du PIB (estimation de l'application)
    // Salaire minimum (Mindestlohn) : 13,90 € de l'heure en 2026, 14,60 € en 2027.
    smi: { horaire: 13.9, recettesPoint: 0.25, publicPoint: 0.02, populationActive: 46.5 },
    // Revenu universel : 83,6 millions d'habitants, dont 13,8 millions de mineurs.
    // Aides absorbées, Md€ par an, ordres de grandeur.
    ru: {
      adultes: 69.8,
      mineurs: 13.8,
      aides: [
        { id: 'grundsicherung', nom: 'Bürgergeld / Grundsicherung', montant: 27, seuil: 563, plafond: 1, base: 'adultes' },
        { id: 'logement', nom: 'Frais de logement', montant: 20, seuil: 500, plafond: 0.5, base: 'adultes' },
        { id: 'vieillesse', nom: 'Minimum vieillesse', montant: 10, seuil: 563, plafond: 1, base: 'adultes' },
        { id: 'wohngeld', nom: 'Wohngeld', montant: 4.5, seuil: 200, plafond: 0.5, base: 'adultes' },
        { id: 'kindergeld', nom: 'Kindergeld', montant: 52, seuil: 259, plafond: 1, base: 'mineurs' },
      ],
    },
  };

  const DEFAUTS = {
    croissance: 0.9,   // PIB en volume, %/an
    inflation: 2.0,    // déflateur du PIB, %/an
    tauxMarche: 3.0,   // taux moyen à l'émission, %
    depenses: 0.9,     // dépense primaire en volume, %/an
    economies: 0,      // économies pérennes, Md€ de 2026
    infra: 100,        // % du fonds spécial d'infrastructure dépensé
    otan: 100,         // % de la trajectoire de défense vers 3,5 % du PIB réalisée
    prelevements: 0,   // variation du taux de recettes, points de PIB
    tva19: 19, tva7: 7,
    irZone: 0,         // points ajoutés à la zone progressive (14 à 42 %)
    ir42: 42, ir45: 45,
    irSurtaxe: 0, irSeuil: 1000000,
    societes: 0,       // points d'écart avec le calendrier légal de l'impôt sur les sociétés
    patrimoine: 0,
    erosion: 30,
    ageLegal: 0,       // années de décalage de l'âge légal vs 67 ans
    cotisation: 0,     // points de cotisation retraite
    sousIndexation: 0,
    anneesSousIndexation: 4,
    retraites: 100,    // % de la dérive nette des retraites
    chomage: 6.3,
    dependance: 2.1,   // dépenses de dépendance en 2050, % du PIB
    crise: 0,
    anneeCrise: 2029,
    smi: 0,            // hausse du salaire minimum au-delà de la trajectoire décidée, %
    smiEmplois: 10,    // milliers d'emplois perdus par point
    ruAdulte: 0, ruMineur: 0, ruAides: 100, ruFinancement: 0,
  };
  for (const q of H.postes) DEFAUTS['poste_' + q.id] = 0;
  const TOTAL_POSTES = H.postes.reduce((s, q) => s + q.montant, 0);

  function interpoler(points, x) {
    if (x <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return points[points.length - 1][1];
  }

  // Recettes supplémentaires à terme (impôt sur le revenu, sociétés, patrimoine), Md€ de 2026.
  function effetImpot(params) {
    const p = { ...DEFAUTS, ...params };
    const base = p.irZone * H.ir.zone;
    const nouvelle = p.irSurtaxe * H.ir.parPoint[1] * Math.pow(p.irSeuil / H.ir.seuils[1], -H.ir.pareto);
    const hauts = (p.ir42 - 42) * H.ir.parPoint[0] + (p.ir45 - 45) * H.ir.parPoint[1] + nouvelle
      + p.societes * H.societes.parPoint + p.patrimoine * H.patrimoineParPoint;
    return base + hauts * (hauts > 0 ? 1 - p.erosion / 100 : 1);
  }

  function effetIVA(params) {
    const p = { ...DEFAUTS, ...params };
    return (p.tva19 - 19) * H.tva.parPoint[0] + (p.tva7 - 7) * H.tva.parPoint[1];
  }

  function effetSmi(params) {
    const p = { ...DEFAUTS, ...params };
    const s = H.smi;
    return {
      recettes: s.recettesPoint * p.smi,
      depenses: s.publicPoint * p.smi,
      chomage: (p.smi * p.smiEmplois / 1000 / s.populationActive) * 100,
    };
  }

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

      let reel = p.croissance;
      if (p.crise > 0 && annee === p.anneeCrise) reel -= p.crise / 150;
      if (p.crise > 0 && annee === p.anneeCrise + 1) reel += p.crise / 300;
      const nominal = (1 + reel / 100) * (1 + p.inflation / 100) - 1;
      const ratioPrec = (dette / pib) * 100;
      pib *= 1 + nominal;
      const echelle = pib / base.pib;

      const versPleinEffet = Math.min(1, k / Math.max(1, H.pleinEffet - base.annee));
      const age = (p.ageLegal > 0 ? H.age.plus : H.age.moins).map((v) => v * p.ageLegal * versPleinEffet);
      const emploi = H.chomagePoint.map((v) =>
        v * (H.chomageRef - p.chomage - smi.chomage) * Math.min(1, k / H.monteeChomage));
      const pensions = H.sousIndexationPoint * p.sousIndexation * Math.min(k, p.anneesSousIndexation);
      // Baisse légale de l'impôt sur les sociétés, comprise dans le tendanciel.
      const kst = (interpoler(H.societes.calendrier, annee) - H.societes.taux) * H.societes.parPoint;
      const recetteEnPlus = age[1] + emploi[1] + kst + H.cotisationPoint * p.cotisation * montee + iva;

      H.postes.forEach((q, i) => {
        postes[i] *= (1 + (p.depenses + p['poste_' + q.id]) / 100) * (1 + p.inflation / 100);
      });
      const retraites = interpoler(H.derive, annee) * p.retraites / 100;
      const dependance = ((p.dependance - H.dependance2022) / (2050 - 2022)) * k;
      // Programmes votés : écart avec leur niveau de 2026, en % du PIB.
      const infra = interpoler(H.infra, annee) * p.infra / 100 - interpoler(H.infra, base.annee);
      const otan = (interpoler(H.otan, annee) - interpoler(H.otan, base.annee)) * p.otan / 100;
      let coutCrise = 0;
      if (p.crise > 0 && annee === p.anneeCrise) coutCrise = 0.6 * p.crise;
      if (p.crise > 0 && annee === p.anneeCrise + 1) coutCrise = 0.4 * p.crise;
      const parPoste = {};
      H.postes.forEach((q, i) => { parPoste[q.id] = postes[i]; });
      parPoste.retraites += pib * retraites / 100 - (age[0] + pensions) * echelle;
      parPoste.social += pib * dependance / 100 - emploi[0] * echelle + ru.net * montee * echelle;
      parPoste.economie += pib * infra / 100;
      parPoste.defense += pib * otan / 100;
      const nonVentile = (smi.depenses - p.economies) * montee * echelle + coutCrise;
      const depensesPrimaires = Object.values(parPoste).reduce((s, v) => s + v, 0) + nonVentile;

      const recettes = pib * (tauxRecettes + (p.prelevements / 100) * montee)
        + ((impot + smi.recettes + ru.financement) * montee + recetteEnPlus) * echelle;

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

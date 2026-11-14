// Modèle de projection de la dette publique britannique (dette nette du secteur
// public, PSND). Montants en milliards de livres (Md£), taux et ratios en %.
// Exercices budgétaires d'avril à mars : « 2026 » désigne l'exercice 2026-27.
// Aucune dépendance : utilisable dans le navigateur (window.DetteRoyaumeUni) comme sous Node.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.DetteRoyaumeUni = fabrique();
})(globalThis, function () {
  // Dernier exercice mesuré, 2025-26 (ONS, OBR) : dette nette 93,8 % du PIB fin
  // mars 2026 ; emprunt 132,0 Md£ (4,3 % du PIB). Recettes : estimation de l'application.
  const COMPTES_2025 = { dette: 2880, ratio: 93.8, deficit: 132.0, recettesPib: 40.6 };

  // Point de départ : fin de l'exercice 2026-27, estimé. PIB 2025-26 (dette / ratio)
  // + 4,2 % en valeur ; dette à 95,0 % du PIB et emprunt à 4,2 % (OBR, octobre 2026) ;
  // intérêts ~117 Md£ (109 Md£ en 2025-26, 160 Md£ prévus en 2031-32).
  const PIB_2026 = Math.round((COMPTES_2025.dette / COMPTES_2025.ratio) * 100 * 1.042);
  const BASE = (() => {
    const pib = PIB_2026;
    const recettes = pib * COMPTES_2025.recettesPib / 100;
    const interets = 117;
    return {
      annee: 2026,
      pib,
      dette: pib * 0.95,
      dettePrecedente: COMPTES_2025.dette,
      recettes,
      interets,
      depensesPrimaires: recettes + pib * 0.042 - interets,
    };
  })();

  const H = {
    // Les gilts sont longs (14,6 ans en moyenne), mais les rachats de la Banque
    // d'Angleterre sont financés par des réserves rémunérées au taux directeur :
    // l'encours se refinance plus vite que sa maturité ne le laisse croire. Hypothèse.
    refinancement: 0.13,
    // Environ un quart des gilts sont indexés sur l'inflation (RPI) : un point
    // d'inflation en plus alourdit les intérêts de 0,25 % de la dette.
    partIndexee: 0.25,
    montee: 3,
    // Dépenses par fonction, exercice 2025-26, Md£, hors intérêts. Ordres de
    // grandeur de l'application à partir des PESA du Trésor.
    postes: [
      { id: 'defense', nom: 'Défense', montant: 66 },
      { id: 'enseignement', nom: 'Enseignement', montant: 130 },
      { id: 'sante', nom: 'Santé', montant: 250 },
      { id: 'retraites', nom: 'Retraites', montant: 175 },
      { id: 'social', nom: 'Autre protection sociale', montant: 220 },
      { id: 'securite', nom: 'Sécurité et justice', montant: 55 },
      { id: 'economie', nom: 'Affaires économiques', montant: 110 },
      { id: 'general', nom: 'Services généraux', montant: 60 },
      { id: 'cadre', nom: 'Logement, environnement, culture', montant: 75 },
    ],
    // TVA : 20 % (8,8 Md£ par point) et taux réduit de 5 % (estimation).
    tva: { taux: [20, 5], parPoint: [8.8, 0.6] },
    // Impôt sur le revenu, 2026-27, Md£ par point (HMRC, via la presse) :
    // taux de base 20 %, supérieur 40 %, additionnel 45 % au-delà de 125 140 £.
    ir: { taux: [20, 40, 45], parPoint: [6.9, 1.6, 0.23], seuils: [12570, 50270, 125140], pareto: 1.5 },
    // Cotisations nationales (NICs) : salariés 8 % (5,35 Md£ par point), employeurs
    // 15 % (6,0 Md£, IFS, net des effets sur les salaires).
    nics: { taux: [8, 15], parPoint: [5.35, 6.0] },
    societes: { taux: 25, parPoint: 3.5 }, // impôt sur les sociétés, estimation
    tauxPerte: 46.8, // écart fiscal (tax gap), Md£
    // Âge de la pension d'État : 67 ans entre 2026 et 2028. Effet en 2035 d'un an
    // de plus ou de moins, Md£ de 2026 : [moindres pensions, recettes]. Estimation.
    age: { plus: [9, 2], moins: [9, 2] },
    pleinEffet: 2035,
    sousIndexationPoint: 1.5, // Md£ par point sous le « triple verrou » (pension d'État ~154 Md£)
    // Pension d'État, % du PIB : environ 5 % aujourd'hui, 7,7 % au début des
    // années 2070 avec le triple verrou (OBR, rapport sur les risques budgétaires 2025).
    pensions: [[2026, 4.8], [2074, 7.7]],
    chomageRef: 4.7,
    chomagePoint: [1.5, 3.5],
    monteeChomage: 5,
    dependance2022: 1.2, // soins de longue durée, % du PIB (estimation de l'application)
    // Salaire minimum (National Living Wage) : 12,71 £ de l'heure en avril 2026.
    smi: { horaire: 12.71, recettesPoint: 0.3, publicPoint: 0.1, populationActive: 36 },
    // Revenu universel : 69,3 millions d'habitants, dont 14,2 millions de mineurs.
    // Aides absorbées, Md£ par an, ordres de grandeur.
    ru: {
      adultes: 55.1,
      mineurs: 14.2,
      aides: [
        { id: 'uc', nom: 'Universal Credit', montant: 55, seuil: 400, plafond: 1, base: 'adultes' },
        { id: 'logement', nom: 'Aides au logement', montant: 32, seuil: 350, plafond: 0.5, base: 'adultes' },
        { id: 'pensionCredit', nom: 'Pension Credit', montant: 6.5, seuil: 900, plafond: 1, base: 'adultes' },
        { id: 'carers', nom: 'Carer’s Allowance', montant: 4.5, seuil: 360, plafond: 1, base: 'adultes' },
        { id: 'childBenefit', nom: 'Child Benefit', montant: 13.5, seuil: 115, plafond: 1, base: 'mineurs' },
      ],
    },
  };

  const DEFAUTS = {
    croissance: 1.4,
    inflation: 2.0,
    tauxMarche: 4.5,
    depenses: 1.4,
    economies: 0,
    prelevements: 0,
    fraude: 0,
    tva20: 20, tva5: 5,
    ir20: 20, ir40: 40, ir45: 45,
    irSurtaxe: 0, irSeuil: 500000,
    nics8: 8, nics15: 15,
    societes: 25,
    erosion: 30,
    ageLegal: 0,
    sousIndexation: 0,
    anneesSousIndexation: 4,
    retraites: 100,
    chomage: 4.7,
    dependance: 1.7,
    crise: 0,
    anneeCrise: 2029,
    smi: 0,
    smiEmplois: 5,
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

  // Impôt sur le revenu, cotisations et impôt sur les sociétés, Md£ de 2026.
  function effetImpot(params) {
    const p = { ...DEFAUTS, ...params };
    const b = H.ir.parPoint;
    const base = (p.ir20 - 20) * b[0] + (p.nics8 - 8) * H.nics.parPoint[0] + (p.nics15 - 15) * H.nics.parPoint[1];
    const nouvelle = p.irSurtaxe * b[2] * Math.pow(p.irSeuil / H.ir.seuils[2], -H.ir.pareto);
    const hauts = (p.ir40 - 40) * b[1] + (p.ir45 - 45) * b[2] + nouvelle + (p.societes - 25) * H.societes.parPoint;
    return base + hauts * (hauts > 0 ? 1 - p.erosion / 100 : 1);
  }

  function effetIVA(params) {
    const p = { ...DEFAUTS, ...params };
    return (p.tva20 - 20) * H.tva.parPoint[0] + (p.tva5 - 5) * H.tva.parPoint[1];
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
      if (p.crise > 0 && annee === p.anneeCrise) reel -= p.crise / 100;
      if (p.crise > 0 && annee === p.anneeCrise + 1) reel += p.crise / 200;
      const nominal = (1 + reel / 100) * (1 + p.inflation / 100) - 1;
      const ratioPrec = (dette / pib) * 100;
      pib *= 1 + nominal;
      const echelle = pib / base.pib;

      const versPleinEffet = Math.min(1, k / Math.max(1, H.pleinEffet - base.annee));
      const age = (p.ageLegal > 0 ? H.age.plus : H.age.moins).map((v) => v * p.ageLegal * versPleinEffet);
      const emploi = H.chomagePoint.map((v) =>
        v * (H.chomageRef - p.chomage - smi.chomage) * Math.min(1, k / H.monteeChomage));
      const pensions = H.sousIndexationPoint * p.sousIndexation * Math.min(k, p.anneesSousIndexation);
      const recetteEnPlus = age[1] + emploi[1] + iva;

      H.postes.forEach((q, i) => {
        postes[i] *= (1 + (p.depenses + p['poste_' + q.id]) / 100) * (1 + p.inflation / 100);
      });
      const retraites = (interpoler(H.pensions, annee) - interpoler(H.pensions, base.annee)) * p.retraites / 100;
      const dependance = ((p.dependance - H.dependance2022) / (2050 - 2022)) * k;
      let coutCrise = 0;
      if (p.crise > 0 && annee === p.anneeCrise) coutCrise = 0.6 * p.crise;
      if (p.crise > 0 && annee === p.anneeCrise + 1) coutCrise = 0.4 * p.crise;
      const parPoste = {};
      H.postes.forEach((q, i) => { parPoste[q.id] = postes[i]; });
      parPoste.retraites += pib * retraites / 100 - (age[0] + pensions) * echelle;
      parPoste.social += pib * dependance / 100 - emploi[0] * echelle + ru.net * montee * echelle;
      const nonVentile = (smi.depenses - p.economies) * montee * echelle + coutCrise;
      const depensesPrimaires = Object.values(parPoste).reduce((s, v) => s + v, 0) + nonVentile;

      const recettes = pib * (tauxRecettes + (p.prelevements / 100) * montee)
        + ((p.fraude + impot + smi.recettes + ru.financement) * montee + recetteEnPlus) * echelle;

      // Intérêts : refinancement au taux de marché, plus l'indexation des gilts
      // indexés quand l'inflation s'écarte de l'hypothèse de référence.
      const marche = p.tauxMarche / 100;
      const nouvelle = Math.max(0, dette - dettePrec);
      const ancienne = dette - nouvelle;
      tauxMoyen = (ancienne * ((1 - H.refinancement) * tauxMoyen + H.refinancement * marche)
        + nouvelle * marche) / dette;
      const indexation = H.partIndexee * (p.inflation - DEFAUTS.inflation) / 100;
      const interets = (tauxMoyen + indexation) * dette;

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
        tauxMoyen: (tauxMoyen + indexation) * 100,
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

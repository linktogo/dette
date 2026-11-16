// Modèle de projection paramétrable, commun aux pays ajoutés après l'Allemagne et le
// Royaume-Uni (Portugal, Grèce, Italie). Même mécanique que les modèles par pays :
// la dette augmente du déficit, les recettes suivent le PIB, les leviers montent en
// charge sur trois ans. Montants en Md€, taux et ratios en %.
// Navigateur : window.CreerModele ; Node : require('../modele.js').
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.CreerModele = fabrique();
})(globalThis, function () {
  function interpoler(points, x) {
    if (x <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
    return points[points.length - 1][1];
  }

  // c : configuration du pays.
  //   comptes2025 { dette, ratio, solde, recettesPib }      dernier exercice mesuré
  //   depart { croissanceValeur, ratio, solde, interets }   fin 2026 estimée (%, Md€)
  //   H : hypothèses (voir les fichiers de pays)
  //   defauts : valeurs de référence des curseurs propres au pays
  return function creerModele(c) {
    const H = c.H;
    const COMPTES_2025 = { ...c.comptes2025, deficit: -c.comptes2025.solde * c.comptes2025.dette / c.comptes2025.ratio };
    const pib = Math.round((c.comptes2025.dette / c.comptes2025.ratio) * 100 * (1 + c.depart.croissanceValeur / 100));
    const recettes = pib * c.comptes2025.recettesPib / 100;
    const BASE = {
      annee: 2026,
      pib,
      dette: pib * c.depart.ratio / 100,
      dettePrecedente: c.comptes2025.dette,
      recettes,
      interets: c.depart.interets,
      depensesPrimaires: recettes - pib * c.depart.solde / 100 - c.depart.interets,
    };

    const DEFAUTS = {
      depenses: c.defauts.croissance, economies: 0, nouvellesDepenses: 0, montee: 3, prelevements: 0, fraude: 0,
      irZone: 0, irSurtaxe: 0, erosion: 30, patrimoine: 0,
      ageLegal: 0, cotisation: 0, sousIndexation: 0, anneesSousIndexation: 4, retraites: 100,
      crise: 0, anneeCrise: 2029, smi: 0, smiEmplois: 5,
      ruAdulte: 0, ruMineur: 0, ruAides: 100, ruFinancement: 0,
      ...c.defauts,
    };
    H.tva.ids.forEach((id, i) => { DEFAUTS[id] = H.tva.taux[i]; });
    DEFAUTS[H.ir.top.id] = H.ir.top.taux;
    if (H.societes) DEFAUTS.societes = H.societes.taux;
    for (const q of H.postes) DEFAUTS['poste_' + q.id] = 0;
    const TOTAL_POSTES = H.postes.reduce((s, q) => s + q.montant, 0);

    // Population en millions : celle du revenu universel en 2026, puis rythme constant.
    // Sert aux indicateurs par habitant, sans effet sur la trajectoire de dette.
    const habitants = (annee) =>
      (H.ru.adultes + H.ru.mineurs) * Math.pow(1 + H.croissancePopulation / 100, annee - BASE.annee);

    // Impôts directs : zone générale (sans érosion) et hauts revenus, sociétés, patrimoines.
    function effetImpot(params) {
      const p = { ...DEFAUTS, ...params };
      const t = H.ir.top;
      const base = p.irZone * H.ir.zone;
      const nouvelle = p.irSurtaxe * t.parPoint * Math.pow(p.irSeuil / t.seuil, -H.ir.pareto);
      const hauts = (p[t.id] - t.taux) * t.parPoint + nouvelle
        + (H.societes ? (p.societes - H.societes.taux) * H.societes.parPoint : 0)
        + p.patrimoine * (H.patrimoineParPoint || 0);
      return base + hauts * (hauts > 0 ? 1 - p.erosion / 100 : 1);
    }

    function effetIVA(params) {
      const p = { ...DEFAUTS, ...params };
      return H.tva.ids.reduce((s, id, i) => s + (p[id] - H.tva.taux[i]) * H.tva.parPoint[i], 0);
    }

    function effetSmi(params) {
      const p = { ...DEFAUTS, ...params };
      const s = H.smi;
      if (!s) return { recettes: 0, depenses: 0, chomage: 0 };
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
      let pibC = base.pib;
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
        const montee = Math.min(1, k / p.montee);

        // Une crise de 1 % du PIB de départ réduit la croissance d'un point, dont la moitié est rattrapée.
        let reel = p.croissance;
        const criseEnPib = p.crise / base.pib * 100;
        if (p.crise > 0 && annee === p.anneeCrise) reel -= criseEnPib;
        if (p.crise > 0 && annee === p.anneeCrise + 1) reel += criseEnPib / 2;
        const nominal = (1 + reel / 100) * (1 + p.inflation / 100) - 1;
        const ratioPrec = (dette / pibC) * 100;
        pibC *= 1 + nominal;
        const echelle = pibC / base.pib;

        const versPleinEffet = Math.min(1, k / 9);
        const age = (p.ageLegal > 0 ? H.age.plus : H.age.moins).map((v) => v * p.ageLegal * versPleinEffet);
        const emploi = H.chomagePoint.map((v) =>
          v * (DEFAUTS.chomage - p.chomage - smi.chomage) * Math.min(1, k / 5));
        const pensions = H.sousIndexationPoint * p.sousIndexation * Math.min(k, p.anneesSousIndexation);
        const recetteEnPlus = age[1] + emploi[1] + (H.cotisationPoint || 0) * p.cotisation * montee + iva;

        H.postes.forEach((q, i) => {
          postes[i] *= (1 + (p.depenses + p['poste_' + q.id]) / 100) * (1 + p.inflation / 100);
        });
        const retraites = (interpoler(H.derive, annee) - interpoler(H.derive, base.annee)) * p.retraites / 100;
        const dependance = ((p.dependance - H.dependance2022) / (2050 - 2022)) * k;
        let coutCrise = 0;
        if (p.crise > 0 && annee === p.anneeCrise) coutCrise = 0.6 * p.crise;
        if (p.crise > 0 && annee === p.anneeCrise + 1) coutCrise = 0.4 * p.crise;
        const parPoste = {};
        H.postes.forEach((q, i) => { parPoste[q.id] = postes[i]; });
        parPoste.retraites += pibC * retraites / 100 - (age[0] + pensions) * echelle;
        parPoste.social += pibC * dependance / 100 - emploi[0] * echelle + ru.net * montee * echelle;
        const nonVentile = (smi.depenses + p.nouvellesDepenses - p.economies) * montee * echelle + coutCrise;
        const depensesPrimaires = Object.values(parPoste).reduce((s, v) => s + v, 0) + nonVentile;

        const recettes = pibC * (tauxRecettes + (p.prelevements / 100) * montee)
          + ((p.fraude + impot + smi.recettes + ru.financement) * montee + recetteEnPlus) * echelle;

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
          annee, pib: pibC, dette, population: habitants(annee),
          ratio: (dette / pibC) * 100,
          recettes, depensesPrimaires, interets, soldePrimaire, solde,
          postes: parPoste, nonVentile,
          soldePib: (solde / pibC) * 100,
          soldePrimairePib: (soldePrimaire / pibC) * 100,
          interetsPib: (interets / pibC) * 100,
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
        annee: base.annee, pib: base.pib, dette: base.dette, population: habitants(base.annee),
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

    return { COMPTES_2025, BASE, DEFAUTS, H, habitants, simuler, pointDeDepart, effetImpot, effetIVA, effetSmi, effetRevenuUniversel };
  };
});

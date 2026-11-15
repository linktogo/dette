// Pays-Bas : configuration du modèle commun (../modele.js). Montants en Md€.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique(require('../modele.js'));
  else racine.DettePaysBas = fabrique(racine.CreerModele);
})(globalThis, function (creerModele) {
  return creerModele({
    // 2025 (CBS) : dette EMU 524 Md€, 44,7 % du PIB après révision (44,4 % en première estimation) ;
    // déficit 1,6 % (19 Md€) ; dépenses 529 Md€ = 45,2 % du PIB, donc recettes d'environ 43,6 % ;
    // intérêts 8,5 Md€. PIB d'environ 1 170 Md€.
    comptes2025: { dette: 524, ratio: 44.7, solde: -1.6, recettesPib: 43.6 },
    // 2026 (CPB, MEV 2027, septembre 2026) : déficit 2,7 %, dette 46,1 % ; le gouvernement
    // (Miljoenennota 2027) retient 2,3 % et 45,6 %. PIB +4,0 % en valeur et intérêts ~9,5 Md€ (hypothèses).
    depart: { croissanceValeur: 4.0, ratio: 46.1, solde: -2.7, interets: 9.5 },
    // Chômage 2026 : 3,9 % (CPB, MEV 2027).
    defauts: { croissance: 1.3, inflation: 2.2, tauxMarche: 2.8, chomage: 3.9, dependance: 4.5, irSeuil: 500000 },
    H: {
      // Population : hausse portée par l'immigration (hypothèse de l'application).
      croissancePopulation: 0.5,
      refinancement: 0.15, // maturité moyenne proche de 8 ans (hypothèse)
      postes: [
        { id: 'defense', montant: 19 }, { id: 'enseignement', montant: 60 }, { id: 'sante', montant: 100 },
        { id: 'retraites', montant: 75 }, { id: 'social', montant: 95 }, { id: 'securite', montant: 23 },
        { id: 'economie', montant: 55 }, { id: 'general', montant: 40 }, { id: 'cadre', montant: 25 },
      ],
      // TVA 21 / 9 % : Md€ par point, estimations de l'application.
      tva: { ids: ['tva21', 'tva9'], taux: [21, 9], parPoint: [3.2, 0.9] },
      // Impôt sur le revenu (box 1) : zone = tranches à ~36-38 % ; top = 49,5 %.
      ir: { zone: 4.0, top: { id: 'ir495', taux: 49.5, parPoint: 0.9, seuil: 78000 }, pareto: 1.5 },
      societes: { taux: 25.8, parPoint: 1.4 },
      age: { plus: [5.0, 2.0], moins: [5.0, 2.0] },
      cotisationPoint: 3.5,
      sousIndexationPoint: 0.6,
      // Dérive des pensions publiques (AOW), points de PIB (hypothèse de l'application).
      derive: [[2026, 0], [2036, 0.3], [2050, 0.8]],
      chomagePoint: [1.2, 2.0],
      dependance2022: 3.5,
      // Salaire minimum : 14,71 € bruts de l'heure en 2026 (Rijksoverheid), soit ~2 300 € par mois à 36 h.
      smi: { mensuel: 2300, recettesPoint: 0.15, publicPoint: 0.03, populationActive: 10.1 },
      ru: {
        adultes: 14.8, mineurs: 3.3,
        aides: [
          { id: 'bijstand', montant: 7, seuil: 1400, plafond: 1, base: 'adultes' },
          { id: 'aio', montant: 0.5, seuil: 1400, plafond: 1, base: 'adultes' },
          { id: 'huurtoeslag', montant: 5, seuil: 300, plafond: 0.5, base: 'adultes' },
          { id: 'zorgtoeslag', montant: 5.5, seuil: 130, plafond: 0.5, base: 'adultes' },
          { id: 'kinderen', montant: 9, seuil: 120, plafond: 1, base: 'mineurs' },
        ],
      },
    },
  });
});

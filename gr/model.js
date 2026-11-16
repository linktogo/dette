// Grèce : configuration du modèle commun (../modele.js). Montants en Md€.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique(require('../modele.js'));
  else racine.DetteGrece = fabrique(racine.CreerModele);
})(globalThis, function (creerModele) {
  return creerModele({
    // 2025 : dette 362,9 Md€ soit 146,1 % du PIB, excédent 1,7 %, recettes ~50 % du PIB
    // (ELSTAT, notification d'avril 2026).
    comptes2025: { dette: 362.9, ratio: 146.1, solde: 1.7, recettesPib: 50.0 },
    // Fin 2026 : dette 136,7 %, excédent 0,6 %, intérêts 3,0 % du PIB, soit ~7,8 Md€
    // (projet de plan budgétaire 2027, ministère des Finances, octobre 2026) ;
    // PIB +4,6 % en valeur (hypothèse).
    depart: { croissanceValeur: 4.6, ratio: 136.7, solde: 0.6, interets: 7.8 },
    defauts: { croissance: 1.5, inflation: 2.0, tauxMarche: 3.5, chomage: 7.6, dependance: 0.4, irSeuil: 200000 },
    H: {
      // Population en baisse, vieillissement et émigration (hypothèse de l'application).
      croissancePopulation: -0.4,
      // Dette surtout composée de prêts européens à taux fixe et très longue maturité :
      // une faible part se refinance chaque année au taux de marché (hypothèse).
      refinancement: 0.06,
      postes: [
        { id: 'defense', montant: 6 }, { id: 'enseignement', montant: 9 }, { id: 'sante', montant: 13 },
        { id: 'retraites', montant: 36 }, { id: 'social', montant: 9 }, { id: 'securite', montant: 5 },
        { id: 'economie', montant: 13 }, { id: 'general', montant: 9 }, { id: 'cadre', montant: 5 },
      ],
      tva: { ids: ['tva24', 'tva13', 'tva6'], taux: [24, 13, 6], parPoint: [0.75, 0.2, 0.1] },
      ir: { zone: 0.5, top: { id: 'ir44', taux: 44, parPoint: 0.08, seuil: 60000 }, pareto: 1.5 },
      age: { plus: [1.5, 0.4], moins: [1.5, 0.4] },
      cotisationPoint: 0.9,
      sousIndexationPoint: 0.35,
      // Les pensions reculent en part du PIB (Ageing Report 2024 : −2,5 points d'ici 2070).
      derive: [[2026, 0], [2036, -0.4], [2050, -1.2]],
      chomagePoint: [0.3, 0.4],
      dependance2022: 0.3,
      smi: { mensuel: 920, recettesPoint: 0.05, publicPoint: 0.01, populationActive: 4.7 },
      ru: {
        adultes: 8.6, mineurs: 1.8,
        aides: [
          { id: 'revenuMinimum', montant: 0.8, seuil: 216, plafond: 1, base: 'adultes' },
          { id: 'ageesNonAssurees', montant: 0.4, seuil: 360, plafond: 1, base: 'adultes' },
          { id: 'handicap', montant: 0.6, seuil: 300, plafond: 1, base: 'adultes' },
          { id: 'logement', montant: 0.4, seuil: 70, plafond: 0.5, base: 'adultes' },
          { id: 'famille', montant: 1.0, seuil: 70, plafond: 1, base: 'mineurs' },
        ],
      },
    },
  });
});

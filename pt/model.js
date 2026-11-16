// Portugal : configuration du modèle commun (../modele.js). Montants en Md€.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique(require('../modele.js'));
  else racine.DettePortugal = fabrique(racine.CreerModele);
})(globalThis, function (creerModele) {
  return creerModele({
    // 2025 : dette 89,2 % du PIB (2e notification PDE), excédent 0,7 % du PIB,
    // recettes 43,4 % du PIB (CFP).
    comptes2025: { dette: 272.8, ratio: 89.2, solde: 0.7, recettesPib: 43.4 },
    // Fin 2026 : dette 87,5 % et solde nul (gouvernement, rapport du budget 2027, octobre 2026) ;
    // PIB +4,5 % en valeur (hypothèse) ; intérêts 2,0 % du PIB (CFP), soit ~6,4 Md€.
    depart: { croissanceValeur: 4.5, ratio: 87.5, solde: 0, interets: 6.4 },
    defauts: { croissance: 1.8, inflation: 2.0, tauxMarche: 3.2, chomage: 5.6, dependance: 0.9, irSeuil: 250000 },
    H: {
      // Population : légère hausse portée par l'immigration (hypothèse de l'application).
      croissancePopulation: 0.3,
      refinancement: 0.16, // vie moyenne proche de 7,5 ans (hypothèse)
      // Dépenses par fonction 2024, Md€, hors intérêts : ordres de grandeur de l'application.
      postes: [
        { id: 'defense', montant: 2.6 }, { id: 'enseignement', montant: 13 }, { id: 'sante', montant: 19 },
        { id: 'retraites', montant: 34 }, { id: 'social', montant: 10 }, { id: 'securite', montant: 5 },
        { id: 'economie', montant: 13 }, { id: 'general', montant: 11 }, { id: 'cadre', montant: 7.5 },
      ],
      // IVA 23 / 13 / 6 % : Md€ par point, estimations de l'application.
      tva: { ids: ['tva23', 'tva13', 'tva6'], taux: [23, 13, 6], parPoint: [0.75, 0.15, 0.3] },
      // IRS : zone = un point sur tous les échelons ; top = taux marginal de 48 %.
      ir: { zone: 0.6, top: { id: 'ir48', taux: 48, parPoint: 0.08, seuil: 83696 }, pareto: 1.5 },
      // Âge légal (66 ans et 9 mois en 2026) : Md€ en plein effet [pensions, recettes].
      age: { plus: [1.2, 0.5], moins: [1.2, 0.5] },
      cotisationPoint: 1.0,
      sousIndexationPoint: 0.3,
      // Dérive des pensions, points de PIB (hypothèse de l'application).
      derive: [[2026, 0], [2036, 0.8], [2050, 1.5]],
      chomagePoint: [0.25, 0.45],
      dependance2022: 0.6,
      // Salaire minimum : 920 € sur 14 mois en 2026.
      smi: { mensuel: 920, recettesPoint: 0.05, publicPoint: 0.01, populationActive: 5.5 },
      ru: {
        adultes: 9.0, mineurs: 1.7,
        aides: [
          { id: 'rsi', montant: 0.4, seuil: 240, plafond: 1, base: 'adultes' },
          { id: 'csi', montant: 0.4, seuil: 630, plafond: 1, base: 'adultes' },
          { id: 'psi', montant: 0.6, seuil: 324, plafond: 1, base: 'adultes' },
          { id: 'logement', montant: 0.3, seuil: 150, plafond: 0.5, base: 'adultes' },
          { id: 'famille', montant: 1.2, seuil: 50, plafond: 1, base: 'mineurs' },
        ],
      },
    },
  });
});

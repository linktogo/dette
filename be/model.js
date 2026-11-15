// Belgique : configuration du modèle commun (../modele.js). Montants en Md€.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique(require('../modele.js'));
  else racine.DetteBelgique = fabrique(racine.CreerModele);
})(globalThis, function (creerModele) {
  return creerModele({
    // 2025 (BNB, comptes nationaux) : dette 107,9 % du PIB, déficit 5,2 %, recettes 49,2 % du PIB,
    // intérêts 14,3 Md€ (2,2 % du PIB), soit un PIB d'environ 650 Md€ et une dette d'environ 700 Md€.
    comptes2025: { dette: 700, ratio: 107.9, solde: -5.2, recettesPib: 49.2 },
    // 2026 (BNB, projections de juin 2026) : déficit 5,3 %, dette 111,3 %, croissance réelle 0,6 %,
    // inflation 3,4 % ; intérêts d'environ 2,5 % du PIB (solde primaire −2,8 %).
    depart: { croissanceValeur: 3.1, ratio: 111.3, solde: -5.3, interets: 16.5 },
    // Chômage harmonisé 2026 : 6,6 % (BNB, juin 2026).
    defauts: { croissance: 1.1, inflation: 2.0, tauxMarche: 3.2, chomage: 6.6, dependance: 3.0, irSeuil: 500000 },
    H: {
      // Population : légère hausse (hypothèse de l'application).
      croissancePopulation: 0.4,
      refinancement: 0.13, // maturité moyenne proche de 10 ans (hypothèse)
      // Dépenses par fonction 2024, Md€, hors intérêts : ordres de grandeur de l'application.
      postes: [
        { id: 'defense', montant: 7 }, { id: 'enseignement', montant: 39 }, { id: 'sante', montant: 50 },
        { id: 'retraites', montant: 70 }, { id: 'social', montant: 75 }, { id: 'securite', montant: 11 },
        { id: 'economie', montant: 40 }, { id: 'general', montant: 22 }, { id: 'cadre', montant: 12 },
      ],
      // TVA 21 / 12 / 6 % : Md€ par point, estimations de l'application.
      tva: { ids: ['tva21', 'tva12', 'tva6'], taux: [21, 12, 6], parPoint: [1.5, 0.1, 0.4] },
      // Impôt des personnes physiques : zone = tranches de 25 à 45 % ; top = 50 %.
      ir: { zone: 2.0, top: { id: 'ir50', taux: 50, parPoint: 0.6, seuil: 49000 }, pareto: 1.5 },
      societes: { taux: 25, parPoint: 0.9 },
      age: { plus: [3.0, 1.2], moins: [3.0, 1.2] },
      cotisationPoint: 1.9,
      sousIndexationPoint: 0.7,
      // Dérive des pensions, points de PIB (hypothèse de l'application, coût du vieillissement).
      derive: [[2026, 0], [2036, 0.5], [2050, 1.2]],
      chomagePoint: [1.0, 1.3],
      dependance2022: 2.2,
      // Revenu minimum mensuel moyen garanti : 2 233,61 € bruts depuis le 1er juillet 2026 (CNT).
      smi: { mensuel: 2234, recettesPoint: 0.08, publicPoint: 0.02, populationActive: 5.3 },
      ru: {
        adultes: 9.5, mineurs: 2.4,
        aides: [
          { id: 'ris', montant: 1.6, seuil: 1300, plafond: 1, base: 'adultes' },
          { id: 'grapa', montant: 0.8, seuil: 1500, plafond: 1, base: 'adultes' },
          { id: 'handicap', montant: 2.5, seuil: 1000, plafond: 1, base: 'adultes' },
          { id: 'logement', montant: 0.3, seuil: 150, plafond: 0.5, base: 'adultes' },
          { id: 'famille', montant: 13, seuil: 180, plafond: 1, base: 'mineurs' },
        ],
      },
    },
  });
});

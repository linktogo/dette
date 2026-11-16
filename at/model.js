// Autriche : configuration du modèle commun (../modele.js). Montants en Md€.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique(require('../modele.js'));
  else racine.DetteAutriche = fabrique(racine.CreerModele);
})(globalThis, function (creerModele) {
  return creerModele({
    // 2025 : dette 418,1 Md€ soit 81,5 % du PIB, déficit 4,2 %, recettes 261,5 Md€
    // (Statistik Austria, mars 2026), soit environ 51 % du PIB.
    comptes2025: { dette: 418.1, ratio: 81.5, solde: -4.2, recettesPib: 51.0 },
    // Fin 2026 : dette 82,4 % (ministère des Finances, octobre 2026 ; déficit 4,1 %) et
    // déficit 4,0 % (Fiskalrat, octobre 2026) ; intérêts ~2,0 % du PIB et PIB +3,3 % en
    // valeur (hypothèses de l'application).
    depart: { croissanceValeur: 3.3, ratio: 82.4, solde: -4.0, interets: 10.6 },
    defauts: { croissance: 1.0, inflation: 2.2, tauxMarche: 3.0, chomage: 7.3, dependance: 2.4, irSeuil: 2000000 },
    H: {
      // Population : légère hausse portée par l'immigration (hypothèse de l'application).
      croissancePopulation: 0.4,
      // Dette fédérale à maturité longue (environ 10 ans, hypothèse de l'application).
      refinancement: 0.12,
      // Dépenses par fonction 2024, Md€, hors intérêts : ordres de grandeur de l'application.
      postes: [
        { id: 'defense', montant: 3.5 }, { id: 'enseignement', montant: 23 }, { id: 'sante', montant: 40 },
        { id: 'retraites', montant: 67 }, { id: 'social', montant: 45 }, { id: 'securite', montant: 8 },
        { id: 'economie', montant: 30 }, { id: 'general', montant: 20 }, { id: 'cadre', montant: 13 },
      ],
      // TVA 20 / 13 / 10 % : Md€ par point, estimations de l'application.
      tva: { ids: ['tva20', 'tva13', 'tva10'], taux: [20, 13, 10], parPoint: [1.4, 0.1, 0.5] },
      // Impôt sur le revenu : zone = tranches de 20 à 48 % ; top = 50 % au-delà d'environ
      // 105 000 € (55 % au-delà de 1 M€, temporaire). Estimations de l'application.
      ir: { zone: 1.8, top: { id: 'ir50', taux: 50, parPoint: 0.25, seuil: 105000 }, pareto: 1.5 },
      societes: { taux: 23, parPoint: 0.6 },
      age: { plus: [2.5, 1.0], moins: [2.5, 1.0] },
      cotisationPoint: 1.7,
      sousIndexationPoint: 0.7,
      // Dérive des pensions, points de PIB (hypothèse de l'application, départ des baby-boomers).
      derive: [[2026, 0], [2036, 0.6], [2050, 0.8]],
      chomagePoint: [0.6, 0.9],
      dependance2022: 1.6,
      // Pas de salaire minimum légal : les minima sont fixés par les conventions collectives.
      ru: {
        adultes: 7.6, mineurs: 1.6,
        aides: [
          { id: 'sozialhilfe', montant: 1.2, seuil: 1200, plafond: 1, base: 'adultes' },
          { id: 'ausgleichszulage', montant: 1.2, seuil: 1270, plafond: 1, base: 'adultes' },
          { id: 'notstandshilfe', montant: 1.5, seuil: 900, plafond: 1, base: 'adultes' },
          { id: 'logement', montant: 0.4, seuil: 200, plafond: 0.5, base: 'adultes' },
          { id: 'familienbeihilfe', montant: 5.0, seuil: 150, plafond: 1, base: 'mineurs' },
        ],
      },
    },
  });
});

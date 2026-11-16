// Italie : configuration du modèle commun (../modele.js). Montants en Md€.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique(require('../modele.js'));
  else racine.DetteItalie = fabrique(racine.CreerModele);
})(globalThis, function (creerModele) {
  return creerModele({
    // 2025 (Istat) : déficit 3,1 % du PIB, dette 136,7 % (notification d'octobre 2026),
    // recettes 48,0 % du PIB, PIB 2 265 Md€ (comptes nationaux, septembre 2026) ;
    // intérêts 87,1 Md€, 3,9 % du PIB (notification d'avril 2026).
    comptes2025: { dette: 3096, ratio: 136.7, solde: -3.1, recettesPib: 48.0 },
    // Fin 2026 : dette 138,1 % et déficit 2,9 % (MEF, Documento programmatico di bilancio 2027) ;
    // PIB +2,8 % en valeur (hypothèse) ; intérêts ~4,0 % du PIB, en hausse selon l'UPB.
    depart: { croissanceValeur: 2.8, ratio: 138.1, solde: -2.9, interets: 93 },
    defauts: { croissance: 0.7, inflation: 2.0, tauxMarche: 3.1, chomage: 6.3, dependance: 2.0, irSeuil: 500000 },
    H: {
      // Population en légère baisse (hypothèse de l'application).
      croissancePopulation: -0.2,
      // Vie moyenne des titres d'État : 6,87 ans fin octobre 2026 (Trésor) ; émissions à 3,08 %.
      refinancement: 0.18,
      postes: [
        { id: 'defense', montant: 28 }, { id: 'enseignement', montant: 88 }, { id: 'sante', montant: 140 },
        { id: 'retraites', montant: 340 }, { id: 'social', montant: 100 }, { id: 'securite', montant: 37 },
        { id: 'economie', montant: 110 }, { id: 'general', montant: 95 }, { id: 'cadre', montant: 82 },
      ],
      // IVA 22 / 10 / 5 / 4 % : Md€ par point, estimations de l'application.
      tva: { ids: ['tva22', 'tva10', 'tva5', 'tva4'], taux: [22, 10, 5, 4], parPoint: [4.5, 1.6, 0.1, 0.6] },
      // IRPEF 23 / 33 / 43 % : zone = les deux premières tranches ; top = 43 % au-delà de 50 000 €.
      // Passer de 35 à 33 % coûte 2,9 Md€ en 2026 (Ragioneria, loi de budget 2026).
      ir: { zone: 6.4, top: { id: 'ir43', taux: 43, parPoint: 2.0, seuil: 50000 }, pareto: 1.5 },
      societes: { taux: 24, parPoint: 1.6 },
      age: { plus: [10, 4], moins: [10, 4] },
      cotisationPoint: 8.0,
      sousIndexationPoint: 3.0,
      // Dépense de pensions : pic vers 2040 puis repli (hypothèse de l'application).
      derive: [[2026, 0], [2036, 0.8], [2040, 1.0], [2050, 0.6]],
      chomagePoint: [2.0, 4.0],
      dependance2022: 1.7,
      // Pas de salaire minimum légal en Italie.
      ru: {
        adultes: 49.6, mineurs: 9.3,
        aides: [
          { id: 'inclusion', montant: 6, seuil: 500, plafond: 1, base: 'adultes' },
          { id: 'assegnoSociale', montant: 6, seuil: 540, plafond: 1, base: 'adultes' },
          { id: 'logement', montant: 1, seuil: 200, plafond: 0.5, base: 'adultes' },
          { id: 'assegnoUnico', montant: 20, seuil: 150, plafond: 1, base: 'mineurs' },
        ],
      },
    },
  });
});

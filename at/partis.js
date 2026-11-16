// Double budget autrichien 2027-2028 et propositions de l'opposition, traduits avec
// les curseurs du simulateur (sources consultées le 16 novembre 2026) ; les écarts au
// modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'koalition',
      p: { economies: 2.5, montee: 2 },
      sources: [
        { nom: 'ORF, double budget adopté', url: 'https://orf.at/stories/3435859/' },
        { nom: 'Börse Express, déficit de 15,5 Md€', url: 'https://www.boerse-express.com/news/articles/oesterreich-budget-202728-155-mrd-defizit-und-streit-um-entlastung-916329' },
        { nom: 'Parlement autrichien, débats budgétaires', url: 'https://www.parlament.gv.at/aktuelles/news/Doppelbudget-2027-28-Parlamentarische-Beratungen-haben-begonnen' },
      ],
    },
    {
      id: 'gruene',
      p: { prelevements: 0.3 },
      sources: [
        { nom: 'VOL.AT, jusqu’à 2 Md€', url: 'https://www.vol.at/bis-zu-zwei-milliarden-euro-gruene-draengen-auf-erbschaftssteuer/10009919' },
        { nom: 'Parlement autrichien, motion rejetée', url: 'https://www.parlament.gv.at/aktuelles/pk/jahr_2026/pk0135' },
        { nom: 'ORF, Verts et SPÖ', url: 'https://orf.at/stories/3421307/' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Propositions des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Double budget 2027-2028 de la coalition et propositions de l’opposition, traduits avec les curseurs du simulateur. Les montants sont ceux annoncés ; ce qui n’est pas chiffré n’est pas repris. Les mesures s’ajoutent au tendanciel du simulateur, en euros de 2026. L’effet sur la croissance n’est pas modélisé. Le FPÖ réclame de fortes baisses d’impôts et des économies sans montant publié : il n’a pas de scénario. Après une modification d’un curseur, la fiche disparaît.',
      koalition: {
        nom: 'ÖVP-SPÖ-NEOS',
        titre: 'Coalition ÖVP, SPÖ et NEOS',
        date: 'Double budget 2027-2028, adopté par le Conseil national (2026)',
        mesures: [
          'Consolidation nette de 1,5 Md€ en 2027 et 2,5 Md€ en 2028 → 2,5 Md€ d’économies, atteints en 2 ans.',
        ],
        nonModelise: [
          'Hors mesures nouvelles (« offensives »), l’effort atteint 2,1 Md€ en 2027 et 5 Md€ en 2028 : seul le montant net est repris.',
          'Ces montants ne concernent que l’État fédéral ; Länder et sécurité sociale n’y sont pas.',
        ],
        avis: 'Le budget prévoit un déficit fédéral de 15,5 Md€ en 2027 et 13,2 Md€ en 2028, avec l’objectif de passer sous 3 % du PIB en 2028. Le FPÖ parle de « massue fiscale » ; les Verts critiquent la manière d’économiser et le manque de moyens pour la transition énergétique.',
      },
      gruene: {
        nom: 'Grüne',
        titre: 'Les Verts',
        date: 'Motion urgente pour un impôt sur les successions (février 2026)',
        mesures: [
          'Impôt sur les successions et donations au-delà d’un million d’euros (1,5 M€ pour la résidence principale), taux de 25, 30 et 35 %, 1,5 à 2 Md€ par an selon les Verts → +0,3 point de PIB de recettes.',
        ],
        nonModelise: [
          'Davantage de moyens pour la transition énergétique : pas de montant.',
        ],
        avis: 'La motion a été rejetée par le Conseil national : ÖVP, FPÖ et NEOS s’opposent à tout nouvel impôt ; le SPÖ est favorable aux impôts sur le patrimoine. Le rendement est un calcul du parti.',
      },
    },
    en: {
      titre: 'Party proposals',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The coalition’s 2027-2028 double budget and opposition proposals, translated into the simulator’s sliders. Amounts are those announced; anything not costed is left out. Measures are added to the simulator’s baseline, in 2026 euros. Effects on growth are not modelled. The FPÖ calls for large tax cuts and savings with no published amount, so it has no scenario. The card disappears once a slider is changed.',
      koalition: {
        nom: 'ÖVP-SPÖ-NEOS',
        titre: 'ÖVP, SPÖ and NEOS coalition',
        date: '2027-2028 double budget, passed by the National Council (2026)',
        mesures: [
          'Net consolidation of €1.5bn in 2027 and €2.5bn in 2028 → €2.5bn of savings, reached over 2 years.',
        ],
        nonModelise: [
          'Excluding new (“offensive”) measures, the effort reaches €2.1bn in 2027 and €5bn in 2028: only the net amount is included.',
          'These amounts cover the federal government only, not the Länder or social security.',
        ],
        avis: 'The budget plans a federal deficit of €15.5bn in 2027 and €13.2bn in 2028, aiming to get below 3% of GDP in 2028. The FPÖ calls it a “tax bludgeon”; the Greens criticise how savings are made and the lack of money for the energy transition.',
      },
      gruene: {
        nom: 'Greens',
        titre: 'The Greens',
        date: 'Urgent motion for an inheritance tax (February 2026)',
        mesures: [
          'Inheritance and gift tax above €1m (€1.5m for the main home), rates of 25%, 30% and 35%, €1.5-2bn a year according to the Greens → +0.3 points of GDP of revenue.',
        ],
        nonModelise: [
          'More money for the energy transition: no amount.',
        ],
        avis: 'The National Council rejected the motion: the ÖVP, FPÖ and NEOS oppose any new tax; the SPÖ supports wealth taxes. The yield is the party’s own estimate.',
      },
    },
    es: {
      titre: 'Propuestas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Presupuesto doble 2027-2028 de la coalición y propuestas de la oposición, traducidos con los controles del simulador. Los importes son los anunciados; lo que no está cuantificado no se recoge. Las medidas se suman al tendencial del simulador, en euros de 2026. No se modeliza su efecto sobre el crecimiento. El FPÖ pide fuertes rebajas de impuestos y ahorros sin importe publicado: no tiene escenario. Al mover un control, la ficha desaparece.',
      koalition: {
        nom: 'ÖVP-SPÖ-NEOS',
        titre: 'Coalición ÖVP, SPÖ y NEOS',
        date: 'Presupuesto doble 2027-2028, aprobado por el Consejo Nacional (2026)',
        mesures: [
          'Consolidación neta de 1.500 M€ en 2027 y 2.500 M€ en 2028 → 2,5 mil M€ de ahorros, alcanzados en 2 años.',
        ],
        nonModelise: [
          'Sin contar las medidas nuevas («ofensivas»), el esfuerzo llega a 2.100 M€ en 2027 y 5.000 M€ en 2028: solo se recoge el importe neto.',
          'Estos importes solo afectan al Estado federal, no a los Länder ni a la seguridad social.',
        ],
        avis: 'El presupuesto prevé un déficit federal de 15.500 M€ en 2027 y 13.200 M€ en 2028, con el objetivo de bajar del 3 % del PIB en 2028. El FPÖ habla de «mazazo fiscal»; los Verdes critican cómo se ahorra y la falta de dinero para la transición energética.',
      },
      gruene: {
        nom: 'Verdes',
        titre: 'Los Verdes',
        date: 'Moción urgente por un impuesto de sucesiones (febrero de 2026)',
        mesures: [
          'Impuesto de sucesiones y donaciones por encima de un millón de euros (1,5 M€ para la vivienda habitual), tipos del 25, el 30 y el 35 %, de 1.500 a 2.000 M€ al año según los Verdes → +0,3 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'Más dinero para la transición energética: sin importe.',
        ],
        avis: 'El Consejo Nacional rechazó la moción: ÖVP, FPÖ y NEOS se oponen a cualquier impuesto nuevo; el SPÖ apoya los impuestos sobre el patrimonio. El rendimiento es un cálculo del partido.',
      },
    },
    de: {
      titre: 'Vorschläge der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Doppelbudget 2027/28 der Koalition und Vorschläge der Opposition, mit den Reglern des Simulators übersetzt. Die Beträge sind die angekündigten; nicht Beziffertes wird nicht übernommen. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, in Euro von 2026. Wachstumseffekte werden nicht modelliert. Die FPÖ fordert deutliche Steuersenkungen und Einsparungen ohne veröffentlichte Beträge und hat daher kein Szenario. Sobald ein Regler verändert wird, verschwindet die Karte.',
      koalition: {
        nom: 'ÖVP-SPÖ-NEOS',
        titre: 'Koalition aus ÖVP, SPÖ und NEOS',
        date: 'Doppelbudget 2027/28, vom Nationalrat beschlossen (2026)',
        mesures: [
          'Nettokonsolidierung von 1,5 Mrd. € im Jahr 2027 und 2,5 Mrd. € im Jahr 2028 → 2,5 Mrd. € Einsparungen, in 2 Jahren erreicht.',
        ],
        nonModelise: [
          'Ohne die Offensivmaßnahmen beträgt die Konsolidierung 2,1 Mrd. € im Jahr 2027 und 5 Mrd. € im Jahr 2028: Übernommen wird nur der Nettobetrag.',
          'Die Beträge betreffen nur den Bund, nicht Länder und Sozialversicherung.',
        ],
        avis: 'Das Budget sieht ein Bundesdefizit von 15,5 Mrd. € im Jahr 2027 und 13,2 Mrd. € im Jahr 2028 vor; Ziel ist ein Defizit unter 3 % des BIP bis 2028. Die FPÖ spricht von einer „Belastungskeule“, die Grünen kritisieren, wie gespart wird, und fehlende Mittel für die Energiewende.',
      },
      gruene: {
        nom: 'Grüne',
        titre: 'Die Grünen',
        date: 'Dringlicher Antrag für eine Erbschaftssteuer (Februar 2026)',
        mesures: [
          'Erbschafts- und Schenkungssteuer ab einer Million Euro (1,5 Mio. € für selbst bewohnte Immobilien), Sätze von 25, 30 und 35 %, laut Grünen 1,5 bis 2 Mrd. € pro Jahr → +0,3 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Mehr Geld für die Energiewende: kein Betrag.',
        ],
        avis: 'Der Nationalrat lehnte den Antrag ab: ÖVP, FPÖ und NEOS sind gegen neue Steuern, die SPÖ befürwortet Vermögenssteuern. Das Aufkommen ist eine Berechnung der Partei.',
      },
    },
  };

  return { liste, textes };
});

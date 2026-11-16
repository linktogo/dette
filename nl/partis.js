// Accord de coalition néerlandais et programme de GroenLinks-PvdA, traduits avec les
// curseurs du simulateur à partir des évaluations du CPB (sources consultées le
// 16 novembre 2026) ; les écarts au modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'coalitie',
      p: { prelevements: 0.5, economies: 8, nouvellesDepenses: 11.6, montee: 4 },
      sources: [
        { nom: 'CPB, analyse de l’accord de coalition', url: 'https://www.cpb.nl/publicatie/analyse-coalitieakkoord-2026-2030' },
        { nom: 'CPB et PBL, rapport complet', url: 'https://www.cpb.nl/system/files/cpbmedia/CPB_publicatie-analyse-coalitieakkoord-2026-2030.pdf' },
        { nom: 'Wim Suyker, annexe budgétaire', url: 'https://wbcs99etc.wordpress.com/wp-content/uploads/2026/02/coalitieakkoord_wbcs_02.pdf' },
        { nom: 'Synthèse du Miljoenennota 2027', url: 'https://www.rijksoverheid.nl/site/binaries/site-content/collections/documents/2026/09/15/samenvatting-miljoenennota-2027/samenvatting-miljoenennota-2027.pdf' },
      ],
    },
    {
      id: 'glpvda',
      p: { prelevements: 1.1, nouvellesDepenses: 15, montee: 4 },
      sources: [
        { nom: 'CPB, Keuzes in Kaart 2027-2030', url: 'https://www.cpb.nl/system/files/cpbmedia/CPB_Keuzes-in-Kaart-2027-2030.pdf' },
        { nom: 'CPB, annexes par parti', url: 'https://www.cpb.nl/system/files/cpbmedia/H13-Bijlagen%20per%20partij.pdf' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Propositions des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Accord de coalition et programme électoral évalués par le Bureau néerlandais d’analyse de la politique économique (CPB), traduits avec les curseurs du simulateur. Les montants sont ceux du CPB pour 2030, en euros de 2026. Ils s’ajoutent au tendanciel du simulateur. L’effet sur la croissance n’est pas modélisé. Le PVV n’a pas fait évaluer son programme par le CPB. Après une modification d’un curseur, la fiche disparaît.',
      coalitie: {
        nom: 'D66-VVD-CDA',
        titre: 'Coalition D66, VVD et CDA',
        date: 'Accord de coalition 2026-2030, analysé par le CPB (février 2026)',
        mesures: [
          'Hausse des prélèvements de 5,8 Md€ en 2030 selon le CPB → +0,5 point de PIB de recettes.',
          'Économies sur l’assurance maladie collective, 7,9 Md€ → 8 Md€ d’économies.',
          'Dépenses de défense en plus, 8,1 Md€ en 2030, et autres dépenses, ajustées pour retrouver l’amélioration du solde de 0,2 point de PIB estimée par le CPB → 11,6 Md€ de dépenses nouvelles.',
        ],
        nonModelise: [
          'Abandon du relèvement de l’âge de la retraite (2,8 Md€) et report à 2028-2029 de plusieurs économies dans le budget 2027 : non repris.',
        ],
        avis: 'Le CPB prévoit une baisse du pouvoir d’achat moyen de 0,4 % par an et une dette publique à 137 % du PIB en 2060. Le gouvernement est minoritaire et a besoin de l’opposition pour faire voter son budget.',
      },
      glpvda: {
        nom: 'GL-PvdA',
        titre: 'GroenLinks-PvdA',
        date: 'Programme électoral évalué par le CPB (Keuzes in Kaart 2027-2030, octobre 2025)',
        mesures: [
          'Hausse nette des prélèvements de 13,2 Md€ en 2030 → +1,1 point de PIB de recettes.',
          'Hausse nette des dépenses publiques de 15,0 Md€ en 2030 → 15 Md€ de dépenses nouvelles, atteints en 4 ans.',
        ],
        nonModelise: [
          'Le programme a été chiffré avant les élections d’octobre 2025 ; le parti est depuis dans l’opposition.',
        ],
        avis: 'Le CPB note que presque tous les partis augmentent les prélèvements entre 2027 et 2030. Depuis les élections, Jesse Klaver demande de retirer les économies du budget 2027.',
      },
    },
    en: {
      titre: 'Party proposals',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The coalition agreement and an election programme assessed by the Netherlands Bureau for Economic Policy Analysis (CPB), translated into the simulator’s sliders. Amounts are the CPB’s for 2030, in 2026 euros. They are added to the simulator’s baseline. Effects on growth are not modelled. The PVV did not have its programme assessed by the CPB. The card disappears once a slider is changed.',
      coalitie: {
        nom: 'D66-VVD-CDA',
        titre: 'D66, VVD and CDA coalition',
        date: 'Coalition agreement 2026-2030, analysed by the CPB (February 2026)',
        mesures: [
          'Higher taxes and levies of €5.8bn in 2030 according to the CPB → +0.5 points of GDP of revenue.',
          'Savings on collective health insurance, €7.9bn → €8bn of savings.',
          'Extra defence spending, €8.1bn in 2030, and other spending, set to match the 0.2 points of GDP improvement in the balance estimated by the CPB → €11.6bn of new spending.',
        ],
        nonModelise: [
          'Dropping the higher pension age (€2.8bn) and postponing several savings to 2028-2029 in the 2027 budget: not included.',
        ],
        avis: 'The CPB expects average purchasing power to fall by 0.4% a year and public debt to reach 137% of GDP in 2060. The government is a minority one and needs the opposition to pass its budget.',
      },
      glpvda: {
        nom: 'GL-PvdA',
        titre: 'GroenLinks-PvdA',
        date: 'Election programme assessed by the CPB (Keuzes in Kaart 2027-2030, October 2025)',
        mesures: [
          'Net increase in taxes and levies of €13.2bn in 2030 → +1.1 points of GDP of revenue.',
          'Net increase in public spending of €15.0bn in 2030 → €15bn of new spending, reached over 4 years.',
        ],
        nonModelise: [
          'The programme was costed before the October 2025 election; the party has since been in opposition.',
        ],
        avis: 'The CPB notes that nearly all parties raise taxes between 2027 and 2030. Since the election, Jesse Klaver has called for the savings to be dropped from the 2027 budget.',
      },
    },
    es: {
      titre: 'Propuestas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Acuerdo de coalición y programa electoral evaluados por la Oficina neerlandesa de análisis de política económica (CPB), traducidos con los controles del simulador. Los importes son los del CPB para 2030, en euros de 2026. Se suman al tendencial del simulador. No se modeliza su efecto sobre el crecimiento. El PVV no sometió su programa al CPB. Al mover un control, la ficha desaparece.',
      coalitie: {
        nom: 'D66-VVD-CDA',
        titre: 'Coalición D66, VVD y CDA',
        date: 'Acuerdo de coalición 2026-2030, analizado por el CPB (febrero de 2026)',
        mesures: [
          'Subida de la presión fiscal de 5.800 M€ en 2030 según el CPB → +0,5 puntos del PIB de ingresos.',
          'Ahorros en el seguro de salud colectivo, 7.900 M€ → 8 mil M€ de ahorros.',
          'Más gasto en defensa, 8.100 M€ en 2030, y otros gastos, ajustados para obtener la mejora del saldo de 0,2 puntos del PIB estimada por el CPB → 11,6 mil M€ de gasto nuevo.',
        ],
        nonModelise: [
          'Renuncia a subir la edad de jubilación (2.800 M€) y aplazamiento a 2028-2029 de varios ahorros en el presupuesto de 2027: no se recogen.',
        ],
        avis: 'El CPB prevé una pérdida de poder adquisitivo medio del 0,4 % anual y una deuda pública del 137 % del PIB en 2060. El Gobierno está en minoría y necesita a la oposición para aprobar su presupuesto.',
      },
      glpvda: {
        nom: 'GL-PvdA',
        titre: 'GroenLinks-PvdA',
        date: 'Programa electoral evaluado por el CPB (Keuzes in Kaart 2027-2030, octubre de 2025)',
        mesures: [
          'Subida neta de la presión fiscal de 13.200 M€ en 2030 → +1,1 puntos del PIB de ingresos.',
          'Subida neta del gasto público de 15.000 M€ en 2030 → 15 mil M€ de gasto nuevo, alcanzados en 4 años.',
        ],
        nonModelise: [
          'El programa se cuantificó antes de las elecciones de octubre de 2025; el partido está desde entonces en la oposición.',
        ],
        avis: 'El CPB señala que casi todos los partidos suben los impuestos entre 2027 y 2030. Desde las elecciones, Jesse Klaver pide retirar los ahorros del presupuesto de 2027.',
      },
    },
    de: {
      titre: 'Vorschläge der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Koalitionsvertrag und ein Wahlprogramm, vom niederländischen Zentralen Planbüro (CPB) bewertet und mit den Reglern des Simulators übersetzt. Die Beträge sind die des CPB für 2030, in Euro von 2026. Sie kommen zum Basisszenario des Simulators hinzu. Wachstumseffekte werden nicht modelliert. Die PVV hat ihr Programm nicht vom CPB prüfen lassen. Sobald ein Regler verändert wird, verschwindet die Karte.',
      coalitie: {
        nom: 'D66-VVD-CDA',
        titre: 'Koalition aus D66, VVD und CDA',
        date: 'Koalitionsvertrag 2026-2030, vom CPB analysiert (Februar 2026)',
        mesures: [
          'Höhere Steuern und Abgaben von 5,8 Mrd. € im Jahr 2030 laut CPB → +0,5 BIP-Punkte Einnahmen.',
          'Einsparungen bei der kollektiven Krankenversicherung, 7,9 Mrd. € → 8 Mrd. € Einsparungen.',
          'Mehr Verteidigungsausgaben, 8,1 Mrd. € im Jahr 2030, und weitere Ausgaben, so angesetzt, dass sich die vom CPB geschätzte Saldoverbesserung von 0,2 BIP-Punkten ergibt → 11,6 Mrd. € neue Ausgaben.',
        ],
        nonModelise: [
          'Verzicht auf die Anhebung des Rentenalters (2,8 Mrd. €) und Verschiebung mehrerer Einsparungen auf 2028-2029 im Haushalt 2027: nicht übernommen.',
        ],
        avis: 'Das CPB erwartet einen Rückgang der durchschnittlichen Kaufkraft um 0,4 % pro Jahr und eine Staatsschuld von 137 % des BIP im Jahr 2060. Die Minderheitsregierung braucht die Opposition für ihren Haushalt.',
      },
      glpvda: {
        nom: 'GL-PvdA',
        titre: 'GroenLinks-PvdA',
        date: 'Wahlprogramm, vom CPB bewertet (Keuzes in Kaart 2027-2030, Oktober 2025)',
        mesures: [
          'Netto höhere Steuern und Abgaben von 13,2 Mrd. € im Jahr 2030 → +1,1 BIP-Punkte Einnahmen.',
          'Netto höhere Staatsausgaben von 15,0 Mrd. € im Jahr 2030 → 15 Mrd. € neue Ausgaben, in 4 Jahren erreicht.',
        ],
        nonModelise: [
          'Das Programm wurde vor der Wahl im Oktober 2025 beziffert; die Partei ist seither in der Opposition.',
        ],
        avis: 'Das CPB stellt fest, dass fast alle Parteien die Abgaben zwischen 2027 und 2030 erhöhen. Seit der Wahl fordert Jesse Klaver, die Einsparungen aus dem Haushalt 2027 zu streichen.',
      },
    },
  };

  return { liste, textes };
});

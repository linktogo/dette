// Effort budgétaire de la coalition fédérale belge et propositions de l'opposition,
// traduits avec les curseurs du simulateur (sources consultées le 16 novembre 2026) ;
// les écarts au modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'arizona',
      p: { economies: 6, prelevements: 0.6 },
      sources: [
        { nom: 'The Belgium Times, octobre 2026', url: 'https://belgium-times.be/2026/10/budget-federal-belge-2027-blocage-politique-crise-au-gouvernement-de-wever-et-tensions-sur-les-10-milliards-deuros-deconomies/' },
        { nom: 'Moustique, 15 octobre 2026', url: 'https://www.moustique.be/notre-epoque/les-infos/2026/10/15/budget-federal-bart-de-wever-veut-mettre-en-place-un-filet-de-securite-pour-preserver-larizona-et-rassurer-les-marches-financiers-YM5OUP7NHZE7VGFPCR6LVZ4VJA/' },
        { nom: 'Forum for the Future, accord de novembre 2025', url: 'https://blog.forumforthefuture.be/fr/article/accord-budgetaire-arizona-un-tour-de-vis-discret-sur-le-vvprbis-de-15-a-18-/29219' },
      ],
    },
    {
      id: 'ptb',
      p: { prelevements: 1.2 },
      sources: [
        { nom: 'La DH, 11 septembre 2026', url: 'https://www.dhnet.be/actu/belgique/2026/09/11/le-ptb-revient-sur-la-taxe-des-millionnaires-avec-une-nouvelle-etude-le-top-1-en-belgique-sest-enrichi-de-22-milliards-en-un-an-4C76TOQROJFWVPNI5Z7K3C3J2E/' },
        { nom: 'RTBF, Raoul Hedebouw', url: 'https://www.rtbf.be/article/taxe-des-millionnaires-je-veux-qu-ils-contribuent-assene-raoul-hedebouw-le-president-du-ptb-11781601' },
        { nom: 'PTB, « L’Arizona démasqué »', url: 'https://www.ptb.be/arizonademasque/mirage-fiscal' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Propositions des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Objectif budgétaire de la coalition fédérale et propositions de l’opposition, traduits avec les curseurs du simulateur. Les montants sont ceux annoncés ; ce qui n’est pas chiffré n’est pas repris. Les mesures s’ajoutent au tendanciel du simulateur, en euros de 2026. L’effet sur la croissance n’est pas modélisé. Le PS n’a pas de contre-budget chiffré dans les sources consultées. Après une modification d’un curseur, la fiche disparaît.',
      arizona: {
        nom: 'Arizona',
        titre: 'Coalition Arizona (N-VA, MR, Les Engagés, Vooruit, CD&V)',
        date: 'Négociation du budget fédéral 2027 (octobre et novembre 2026)',
        mesures: [
          'Effort de 10 Md€ d’ici 2029, entre économies et recettes nouvelles. Réparti comme l’accord de novembre 2025, 60 % d’économies et 40 % de recettes → 6 Md€ d’économies et +0,6 point de PIB de recettes (4 Md€).',
        ],
        nonModelise: [
          'Composition de l’effort : non arrêtée (TVA, contribution des plus aisés — Vooruit réclame 1,5 Md€ —, soins de santé).',
          'Effort ciblé d’environ 4 Md€ dès 2027 évoqué par la presse : le scénario étale l’effort sur 3 ans.',
        ],
        avis: 'Faute d’accord, 2027 commencera sous le régime des douzièmes provisoires. La Cour des comptes juge surestimé le rendement de la taxe sur les plus-values votée en 2026 (environ 120 M€ contre 414 M€ attendus).',
      },
      ptb: {
        nom: 'PTB',
        titre: 'Parti du travail de Belgique',
        date: 'Étude sur la taxe des millionnaires (septembre 2026)',
        mesures: [
          'Taxe de 2 % sur les fortunes nettes de plus de 5 M€ et de 3 % au-delà de 10 M€, au moins 8 Md€ par an selon le PTB → +1,2 point de PIB de recettes.',
        ],
        nonModelise: [
          'Refus de la hausse de la TVA, du blocage des salaires et des économies dans les services publics : pas de montant.',
        ],
        avis: 'Vooruit, le CD&V et Les Engagés soutiennent une taxe sur les millionnaires, le MR et la N-VA la refusent. Le rendement est celui calculé par le PTB, sans évaluation indépendante.',
      },
    },
    en: {
      titre: 'Party proposals',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The federal coalition’s budget target and opposition proposals, translated into the simulator’s sliders. Amounts are those announced; anything not costed is left out. Measures are added to the simulator’s baseline, in 2026 euros. Effects on growth are not modelled. The PS has no costed counter-budget in the sources consulted. The card disappears once a slider is changed.',
      arizona: {
        nom: 'Arizona',
        titre: 'Arizona coalition (N-VA, MR, Les Engagés, Vooruit, CD&V)',
        date: 'Negotiations on the 2027 federal budget (October and November 2026)',
        mesures: [
          'An effort of €10bn by 2029, split between savings and new revenue. Split like the November 2025 agreement, 60% savings and 40% revenue → €6bn of savings and +0.6 points of GDP of revenue (€4bn).',
        ],
        nonModelise: [
          'Composition of the effort: not settled (VAT, a contribution from the wealthiest — Vooruit wants €1.5bn —, healthcare).',
          'A targeted effort of about €4bn in 2027 reported by the press: the scenario spreads the effort over 3 years.',
        ],
        avis: 'With no agreement, 2027 will start under provisional twelfths. The Court of Audit finds the yield of the capital gains tax passed in 2026 overestimated (about €120m against €414m expected).',
      },
      ptb: {
        nom: 'PTB',
        titre: 'Workers’ Party of Belgium',
        date: 'Study on the millionaires’ tax (September 2026)',
        mesures: [
          'A 2% tax on net fortunes above €5m and 3% above €10m, at least €8bn a year according to the PTB → +1.2 points of GDP of revenue.',
        ],
        nonModelise: [
          'Opposition to a VAT rise, a wage freeze and public service cuts: no amount.',
        ],
        avis: 'Vooruit, CD&V and Les Engagés support a millionaires’ tax; the MR and N-VA reject it. The yield is the PTB’s own estimate, with no independent assessment.',
      },
    },
    es: {
      titre: 'Propuestas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Objetivo presupuestario de la coalición federal y propuestas de la oposición, traducidos con los controles del simulador. Los importes son los anunciados; lo que no está cuantificado no se recoge. Las medidas se suman al tendencial del simulador, en euros de 2026. No se modeliza su efecto sobre el crecimiento. El PS no tiene un contrapresupuesto cuantificado en las fuentes consultadas. Al mover un control, la ficha desaparece.',
      arizona: {
        nom: 'Arizona',
        titre: 'Coalición Arizona (N-VA, MR, Les Engagés, Vooruit, CD&V)',
        date: 'Negociación del presupuesto federal de 2027 (octubre y noviembre de 2026)',
        mesures: [
          'Esfuerzo de 10.000 M€ hasta 2029, entre ahorros e ingresos nuevos. Repartido como el acuerdo de noviembre de 2025, 60 % de ahorros y 40 % de ingresos → 6 mil M€ de ahorros y +0,6 puntos del PIB de ingresos (4.000 M€).',
        ],
        nonModelise: [
          'Composición del esfuerzo: sin cerrar (IVA, aportación de los más ricos —Vooruit pide 1.500 M€—, sanidad).',
          'Esfuerzo de unos 4.000 M€ ya en 2027 según la prensa: el escenario reparte el esfuerzo en 3 años.',
        ],
        avis: 'Sin acuerdo, 2027 empezará con presupuestos prorrogados por doceavas partes. El Tribunal de Cuentas considera sobrestimado el rendimiento del impuesto sobre plusvalías aprobado en 2026 (unos 120 M€ frente a 414 M€ previstos).',
      },
      ptb: {
        nom: 'PTB',
        titre: 'Partido del Trabajo de Bélgica',
        date: 'Estudio sobre el impuesto a los millonarios (septiembre de 2026)',
        mesures: [
          'Impuesto del 2 % sobre los patrimonios netos de más de 5 M€ y del 3 % por encima de 10 M€, al menos 8.000 M€ al año según el PTB → +1,2 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'Rechazo a la subida del IVA, a la congelación salarial y a los recortes en servicios públicos: sin importe.',
        ],
        avis: 'Vooruit, CD&V y Les Engagés apoyan un impuesto a los millonarios; MR y N-VA lo rechazan. El rendimiento es el calculado por el PTB, sin evaluación independiente.',
      },
    },
    de: {
      titre: 'Vorschläge der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Haushaltsziel der föderalen Koalition und Vorschläge der Opposition, mit den Reglern des Simulators übersetzt. Die Beträge sind die angekündigten; nicht Beziffertes wird nicht übernommen. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, in Euro von 2026. Wachstumseffekte werden nicht modelliert. Die PS hat in den Quellen keinen bezifferten Gegenhaushalt. Sobald ein Regler verändert wird, verschwindet die Karte.',
      arizona: {
        nom: 'Arizona',
        titre: 'Arizona-Koalition (N-VA, MR, Les Engagés, Vooruit, CD&V)',
        date: 'Verhandlungen über den föderalen Haushalt 2027 (Oktober und November 2026)',
        mesures: [
          'Anstrengung von 10 Mrd. € bis 2029, aufgeteilt auf Einsparungen und neue Einnahmen. Aufgeteilt wie die Einigung vom November 2025, 60 % Einsparungen und 40 % Einnahmen → 6 Mrd. € Einsparungen und +0,6 BIP-Punkte Einnahmen (4 Mrd. €).',
        ],
        nonModelise: [
          'Zusammensetzung: nicht festgelegt (Mehrwertsteuer, Beitrag der Reichsten — Vooruit fordert 1,5 Mrd. € —, Gesundheitswesen).',
          'Laut Presse eine gezielte Anstrengung von etwa 4 Mrd. € schon 2027: Das Szenario verteilt sie auf 3 Jahre.',
        ],
        avis: 'Ohne Einigung beginnt 2027 mit vorläufigen Zwölfteln. Der Rechnungshof hält das Aufkommen der 2026 beschlossenen Steuer auf Kapitalgewinne für überschätzt (etwa 120 Mio. € statt erwarteter 414 Mio. €).',
      },
      ptb: {
        nom: 'PTB',
        titre: 'Partei der Arbeit Belgiens',
        date: 'Studie zur Millionärssteuer (September 2026)',
        mesures: [
          'Steuer von 2 % auf Nettovermögen über 5 Mio. € und 3 % über 10 Mio. €, laut PTB mindestens 8 Mrd. € pro Jahr → +1,2 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Ablehnung höherer Mehrwertsteuer, eines Lohnstopps und von Kürzungen im öffentlichen Dienst: kein Betrag.',
        ],
        avis: 'Vooruit, CD&V und Les Engagés unterstützen eine Millionärssteuer, MR und N-VA lehnen sie ab. Das Aufkommen ist eine Berechnung der PTB, ohne unabhängige Prüfung.',
      },
    },
  };

  return { liste, textes };
});

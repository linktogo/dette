// Propositions budgétaires des partis britanniques, traduites avec les curseurs du
// simulateur. Montants en livres sterling, tels qu'annoncés (sources consultées le
// 16 novembre 2026) ; les écarts au modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'labour',
      p: { prelevements: 0.2 },
      sources: [
        { nom: 'IFS, Autumn Budget 2026', url: 'https://ifs.org.uk/collections/autumn-budget-2026' },
        { nom: 'Fidelity, Autumn Budget 2026', url: 'https://www.fidelity.co.uk/markets-insights/personal-finance/personal-finance/autumn-budget-2026-what-it-means-for-you-and-your-money/' },
        { nom: 'St. James’s Place, mesures du budget', url: 'https://www.sjp.co.uk/individuals/news/2026-autumn-budget-aftermath-what-is-changing' },
      ],
    },
    {
      id: 'conservateurs',
      p: { economies: 40 },
      sources: [
        { nom: 'City AM, 36 Md£ sur les prestations', url: 'https://www.cityam.com/tories-push-for-savings-as-36bn-welfare-cuts-laid-out/' },
        { nom: 'ITV, 10 novembre 2026', url: 'https://www.itv.com/news/2026-11-10/tories-warn-young-people-that-if-they-dont-show-up-they-wont-get-welfare' },
        { nom: 'ITV, 19 octobre 2026', url: 'https://www.itv.com/news/2026-10-19/healey-should-adopt-cuts-at-budget-to-live-within-our-means-badenoch-to-say' },
        { nom: 'Arts Professional, culture', url: 'https://www.artsprofessional.co.uk/news/badenoch-pledges-to-reduce-dcms-budget-by-1bn-among-wider-cuts' },
      ],
    },
    {
      id: 'reform',
      p: { prelevements: -0.7, economies: 80 },
      sources: [
        { nom: 'CIOT, congrès de Reform UK 2026', url: 'https://www.tax.org.uk/reform-uk-conference-2026-tax-policy' },
        { nom: 'News Beep, 80 Md£ de coupes', url: 'https://www.newsbeep.com/717470/' },
        { nom: 'Breitbart, 5 septembre 2026', url: 'https://www.breitbart.com/europe/2026/09/05/farages-reform-uk-party-vows-tax-cuts-for-40-million-britons-within-100-days-if-elected/' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Propositions des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Budget d’automne 2026 du gouvernement et propositions de l’opposition, traduits avec les curseurs du simulateur. Les montants sont ceux annoncés, en livres de 2026 ; ce qui n’est pas chiffré n’est pas repris. Les mesures s’ajoutent au tendanciel du simulateur. L’effet sur la croissance n’est pas modélisé. Les libéraux-démocrates et les Verts n’ont pas de programme chiffré récent dans les sources consultées. Après une modification d’un curseur, la fiche disparaît.',
      labour: {
        nom: 'Labour',
        titre: 'Parti travailliste (gouvernement)',
        date: 'Budget d’automne présenté par John Healey (28 octobre 2026)',
        mesures: [
          'Hausse de deux points de l’impôt sur les revenus de l’épargne et de la propriété à partir d’avril 2027 (taux de 24, 44 et 49 %) et autres hausses : environ 0,2 point de PIB selon l’IFS, 6,5 Md£ d’ici 2031 → +0,2 point de PIB de recettes.',
        ],
        nonModelise: [
          'Petit paquet sur le coût de la vie, financé dans le même budget : pas de montant séparé dans les sources consultées.',
        ],
        avis: 'L’IFS juge ce budget sans surprise, avec une hausse d’impôts bien plus faible que les deux précédents. La marge sur la règle budgétaire reste mince, 15 Md£.',
      },
      conservateurs: {
        nom: 'Conservateurs',
        titre: 'Parti conservateur',
        date: 'Plans de Kemi Badenoch (octobre et novembre 2026)',
        mesures: [
          'Plus de 36 Md£ par an d’économies sur les prestations sociales, dont le retour du plafond à deux enfants (3,1 Md£) et la fin des droits des étrangers sans statut de résident (9,5 Md£), 2,5 Md£ d’aide au développement, 1 Md£ sur la culture → 40 Md£ d’économies.',
        ],
        nonModelise: [
          'Le total de 70 Md£ annoncé avant le budget (prestations, fonctionnaires, aide au développement) n’est pas détaillé au-delà des 40 Md£ repris.',
          'Baisses d’impôts promises, dont les droits de mutation : pas de chiffrage récent.',
        ],
        avis: 'Les chiffres varient selon les sources (36, 47 ou 70 Md£). Aucune évaluation indépendante du plan n’a été trouvée.',
      },
      reform: {
        nom: 'Reform UK',
        titre: 'Reform UK',
        date: 'Propositions présentées au congrès de Birmingham (septembre 2026)',
        mesures: [
          '20 à 25 Md£ de baisses d’impôts, dont l’abandon de la hausse des cotisations patronales et un seuil d’imposition relevé de 12 570 à 15 000 £ → −0,7 point de PIB de recettes.',
          '80 Md£ de coupes dans les dépenses publiques, dont 50 Md£ sur les prestations sociales → 80 Md£ d’économies.',
        ],
        nonModelise: [
          'Une autre source parle de 108 Md£ d’économies au total : seule la fourchette basse est reprise.',
        ],
        avis: 'En 2024, l’IFS jugeait que les économies promises par Reform « ne tenaient pas ». Le parti met désormais en avant la rigueur budgétaire ; son nouveau plan n’a pas été évalué de façon indépendante.',
      },
    },

    en: {
      titre: 'Party proposals',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The government’s Autumn Budget 2026 and opposition proposals, translated into the simulator’s sliders. Amounts are those announced, in 2026 pounds; anything not costed is left out. Measures are added to the simulator’s baseline. Effects on growth are not modelled. The Liberal Democrats and the Greens have no recent costed programme in the sources consulted. The card disappears once a slider is changed.',
      labour: {
        nom: 'Labour',
        titre: 'Labour Party (government)',
        date: 'Autumn Budget presented by John Healey (28 October 2026)',
        mesures: [
          'Two-point rise in tax on savings and property income from April 2027 (rates of 24%, 44% and 49%) and other rises: about 0.2% of GDP according to the IFS, £6.5bn by 2031 → +0.2 points of GDP of revenue.',
        ],
        nonModelise: [
          'Small cost-of-living package funded in the same Budget: no separate amount in the sources consulted.',
        ],
        avis: 'The IFS found the Budget broadly as expected, with a much smaller tax rise than the previous two. Headroom against the fiscal rule remains thin, at £15bn.',
      },
      conservateurs: {
        nom: 'Conservatives',
        titre: 'Conservative Party',
        date: 'Kemi Badenoch’s plans (October and November 2026)',
        mesures: [
          'Over £36bn a year of welfare savings, including bringing back the two-child limit (£3.1bn) and ending claims by foreign nationals without settled status (£9.5bn), £2.5bn of aid, £1bn from culture → £40bn of savings.',
        ],
        nonModelise: [
          'The £70bn total announced before the Budget (welfare, civil servants, aid) is not itemised beyond the £40bn included.',
          'Promised tax cuts, including stamp duty: no recent costing.',
        ],
        avis: 'Figures differ across sources (£36bn, £47bn or £70bn). No independent assessment of the plan was found.',
      },
      reform: {
        nom: 'Reform UK',
        titre: 'Reform UK',
        date: 'Proposals presented at the Birmingham conference (September 2026)',
        mesures: [
          '£20-25bn of tax cuts, including reversing the employer national insurance rise and a personal allowance raised from £12,570 to £15,000 → −0.7 points of GDP of revenue.',
          '£80bn of public spending cuts, of which £50bn from welfare → £80bn of savings.',
        ],
        nonModelise: [
          'Another source cites £108bn of savings in total: only the lower figure is included.',
        ],
        avis: 'In 2024, the IFS said Reform’s promised savings “do not add up”. The party now stresses fiscal responsibility; its new plan has not been independently assessed.',
      },
    },

    es: {
      titre: 'Propuestas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Presupuesto de otoño de 2026 del Gobierno y propuestas de la oposición, traducidos con los controles del simulador. Los importes son los anunciados, en libras de 2026; lo que no está cuantificado no se recoge. Las medidas se suman al tendencial del simulador. No se modeliza su efecto sobre el crecimiento. Los liberaldemócratas y los Verdes no tienen un programa cuantificado reciente en las fuentes consultadas. Al mover un control, la ficha desaparece.',
      labour: {
        nom: 'Laboristas',
        titre: 'Partido Laborista (Gobierno)',
        date: 'Presupuesto de otoño presentado por John Healey (28 de octubre de 2026)',
        mesures: [
          'Subida de dos puntos del impuesto sobre las rentas del ahorro y de la propiedad desde abril de 2027 (tipos del 24, el 44 y el 49 %) y otras subidas: alrededor del 0,2 % del PIB según el IFS, 6.500 M£ hasta 2031 → +0,2 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'Pequeño paquete contra el coste de la vida, financiado en el mismo presupuesto: sin importe separado en las fuentes consultadas.',
        ],
        avis: 'El IFS considera el presupuesto previsible, con una subida de impuestos mucho menor que las dos anteriores. El margen frente a la regla fiscal sigue siendo escaso: 15.000 M£.',
      },
      conservateurs: {
        nom: 'Conservadores',
        titre: 'Partido Conservador',
        date: 'Planes de Kemi Badenoch (octubre y noviembre de 2026)',
        mesures: [
          'Más de 36.000 M£ al año de ahorros en prestaciones sociales, entre ellos la vuelta del límite de dos hijos (3.100 M£) y el fin de las prestaciones a extranjeros sin estatuto de residente (9.500 M£), 2.500 M£ de ayuda al desarrollo, 1.000 M£ en cultura → 40 mil M£ de ahorros.',
        ],
        nonModelise: [
          'El total de 70.000 M£ anunciado antes del presupuesto (prestaciones, funcionarios, ayuda al desarrollo) no se detalla más allá de los 40.000 M£ recogidos.',
          'Rebajas de impuestos prometidas, entre ellas el impuesto sobre transmisiones: sin cuantificación reciente.',
        ],
        avis: 'Las cifras varían según la fuente (36.000, 47.000 o 70.000 M£). No se ha encontrado ninguna evaluación independiente del plan.',
      },
      reform: {
        nom: 'Reform UK',
        titre: 'Reform UK',
        date: 'Propuestas presentadas en el congreso de Birmingham (septiembre de 2026)',
        mesures: [
          'Entre 20.000 y 25.000 M£ de rebajas de impuestos, entre ellas revertir la subida de las cotizaciones empresariales y elevar el mínimo exento de 12.570 a 15.000 £ → −0,7 puntos del PIB de ingresos.',
          '80.000 M£ de recortes del gasto público, 50.000 de ellos en prestaciones sociales → 80 mil M£ de ahorros.',
        ],
        nonModelise: [
          'Otra fuente habla de 108.000 M£ de ahorros en total: solo se recoge la cifra baja.',
        ],
        avis: 'En 2024, el IFS consideró que los ahorros prometidos por Reform «no cuadraban». El partido insiste ahora en la responsabilidad fiscal; su nuevo plan no se ha evaluado de forma independiente.',
      },
    },

    de: {
      titre: 'Vorschläge der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Herbsthaushalt 2026 der Regierung und Vorschläge der Opposition, mit den Reglern des Simulators übersetzt. Die Beträge sind die angekündigten, in Pfund von 2026; nicht Beziffertes wird nicht übernommen. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu. Wachstumseffekte werden nicht modelliert. Liberaldemokraten und Grüne haben in den Quellen kein aktuelles beziffertes Programm. Sobald ein Regler verändert wird, verschwindet die Karte.',
      labour: {
        nom: 'Labour',
        titre: 'Labour Party (Regierung)',
        date: 'Herbsthaushalt von John Healey (28. Oktober 2026)',
        mesures: [
          'Um zwei Punkte höhere Steuer auf Spar- und Mieteinkünfte ab April 2027 (Sätze von 24, 44 und 49 %) und weitere Erhöhungen: laut IFS etwa 0,2 % des BIP, 6,5 Mrd. £ bis 2031 → +0,2 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Kleines Paket gegen die Lebenshaltungskosten, im selben Haushalt finanziert: kein eigener Betrag in den Quellen.',
        ],
        avis: 'Das IFS hält den Haushalt für erwartbar, mit einer viel kleineren Steuererhöhung als in den beiden vorherigen. Der Spielraum gegenüber der Fiskalregel bleibt mit 15 Mrd. £ knapp.',
      },
      conservateurs: {
        nom: 'Konservative',
        titre: 'Konservative Partei',
        date: 'Pläne von Kemi Badenoch (Oktober und November 2026)',
        mesures: [
          'Über 36 Mrd. £ pro Jahr Einsparungen bei Sozialleistungen, darunter die Rückkehr der Zwei-Kind-Grenze (3,1 Mrd. £) und das Ende der Ansprüche von Ausländern ohne Aufenthaltsstatus (9,5 Mrd. £), 2,5 Mrd. £ Entwicklungshilfe, 1 Mrd. £ bei der Kultur → 40 Mrd. £ Einsparungen.',
        ],
        nonModelise: [
          'Die vor dem Haushalt angekündigte Summe von 70 Mrd. £ (Sozialleistungen, Beamte, Entwicklungshilfe) ist über die übernommenen 40 Mrd. £ hinaus nicht aufgeschlüsselt.',
          'Versprochene Steuersenkungen, darunter die Grunderwerbsteuer: keine aktuelle Bezifferung.',
        ],
        avis: 'Die Zahlen schwanken je nach Quelle (36, 47 oder 70 Mrd. £). Eine unabhängige Bewertung des Plans wurde nicht gefunden.',
      },
      reform: {
        nom: 'Reform UK',
        titre: 'Reform UK',
        date: 'Vorschläge vom Parteitag in Birmingham (September 2026)',
        mesures: [
          '20 bis 25 Mrd. £ Steuersenkungen, darunter die Rücknahme der höheren Arbeitgeberbeiträge und ein Grundfreibetrag von 15.000 £ statt 12.570 £ → −0,7 BIP-Punkte Einnahmen.',
          '80 Mrd. £ Kürzungen bei den Staatsausgaben, davon 50 Mrd. £ bei Sozialleistungen → 80 Mrd. £ Einsparungen.',
        ],
        nonModelise: [
          'Eine andere Quelle nennt insgesamt 108 Mrd. £ Einsparungen: Übernommen wird nur die niedrigere Zahl.',
        ],
        avis: '2024 urteilte das IFS, die versprochenen Einsparungen von Reform „gehen nicht auf“. Die Partei betont nun Haushaltsdisziplin; ihr neuer Plan wurde nicht unabhängig geprüft.',
      },
    },
  };

  return { liste, textes };
});

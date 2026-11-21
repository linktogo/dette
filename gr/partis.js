// Budget grec pour 2027 et propositions de l'opposition, traduits avec les curseurs du
// simulateur (sources consultées le 16 novembre 2026) ; les écarts au modèle sont
// signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'nd',
      p: { nouvellesDepenses: 2.3 },
      sources: [
        { nom: 'Voria, paquet de 7,28 Md€', url: 'https://www.voria.gr/article/proypologismos-2027-paketo-metron-728-dis-eyro-poioi-einai-oi-dikaioyhoi' },
        { nom: 'Taxheaven, mesures du projet de budget', url: 'https://www.taxheaven.gr/news/74791/ola-ta-metra-poy-perilambanei-to-prosxedio-kratikoy-proypologismoy-2027' },
        { nom: 'GreekReporter, 7 octobre 2026', url: 'https://greekreporter.com/2026/10/07/greece-economy-grow/' },
      ],
    },
    {
      id: 'pasok',
      p: { nouvellesDepenses: 3.1, montee: 4 },
      sources: [
        { nom: 'News247, coût du programme', url: 'https://www.news247.gr/politiki/androulakis-to-kostos-tou-programmatos-mas-einai-13-dis-ton-1o-xrono-se-doseis-i-13i-sintaxi/' },
        { nom: 'ERT, Androulakis à la foire de Thessalonique', url: 'https://www.ertnews.gr/roi-idiseon/androulakis-sti-deth-kostologimeno-kai-olistiko-sxedio-apenanti-stis-anekplirotes-yposxeseis-tis-nd-stoxos-i-proti-thesi-gia-tin-politiki-allagi/' },
        { nom: 'tvxs, débat au Parlement', url: 'https://tvxs.gr/news/ellada/androylakis-pierrakakis-sfodri-antiparathesi-sti-voyli-gia-ta-metra-stirixis-tis-deth/' },
      ],
    },
    {
      id: 'syriza',
      p: { prelevements: -1.2 },
      sources: [
        { nom: 'iefimerida, proposition de S. Famellos', url: 'https://www.iefimerida.gr/politiki/famellos-yperpleonasma-na-dothei-gia-anastoli-toy-fpa' },
        { nom: 'Eleftheros Typos, réponse du ministre', url: 'https://www.eleftherostypos.gr/oikonomia/sygkrousi-pierraki-famellou-gia-yperpleonasma-kai-fpa-einai-paranomo-afto-pou-proteinei-o-proedros-tou-syriza' },
        { nom: 'Documento, excédents et prix', url: 'https://www.documentonews.gr/article/syriza-gia-mitsotaki-i-akriveia-fouskonei-ta-pleonasmata-kai-adeiazei-tis-tsepes-ton-politon/' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Propositions des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Budget 2027 du gouvernement et programmes de l’opposition, traduits avec les curseurs du simulateur. Les montants sont ceux annoncés ; ce qui n’est pas chiffré n’est pas repris. Les mesures s’ajoutent au tendanciel du simulateur, en euros de 2026. L’effet sur la croissance n’est pas modélisé. Après une modification d’un curseur, la fiche disparaît.',
      nd: {
        nom: 'ND',
        titre: 'Nouvelle Démocratie (gouvernement)',
        date: 'Projet de budget 2027 (5 octobre 2026)',
        mesures: [
          'Paquet permanent de 7,28 Md€, dont 2,27 Md€ de mesures nouvelles (baisses d’impôts et aides ciblées pour les ménages modestes et les retraités) et 5,48 Md€ de mesures déjà votées → 2,3 Md€ de dépenses nouvelles.',
        ],
        nonModelise: [
          'Hausse des pensions de 2,8 % au 1er janvier 2027 (807 M€) : c’est l’indexation, comprise dans le tendanciel.',
          'Les mesures déjà votées (5,48 Md€) sont supposées comprises dans le tendanciel.',
        ],
        avis: 'Le gouvernement vise un excédent primaire de 3,3 % du PIB en 2027 et une dette ramenée de 136,7 % à 128,8 % du PIB. Les mesures nouvelles sont des baisses d’impôts et des aides, regroupées ici en dépenses.',
      },
      pasok: {
        nom: 'PASOK',
        titre: 'PASOK – Mouvement pour le changement',
        date: 'Programme présenté par Nikos Androulakis à la foire de Thessalonique (septembre 2026)',
        mesures: [
          'Coût net de 1,2 Md€ la première année et 3,1 Md€ par an après quatre ans, avec le retour de la 13e pension (en deux étapes, 2027 et 2030) et un 13e salaire (1,3 Md€) → 3,1 Md€ de dépenses nouvelles, atteints en 4 ans.',
        ],
        nonModelise: [
          'Indexation du barème de l’impôt sur le revenu, TVA nulle sur les protections périodiques : pas de chiffrage séparé.',
          'Paiement de 2,6 Md€ d’arriérés de l’État : opération ponctuelle, sans effet durable.',
        ],
        avis: 'Le ministre des Finances, Kyriakos Pierrakakis, évalue les sept mesures principales à plus de 6 Md€ et demande leur examen par le Conseil budgétaire grec. Nikos Androulakis maintient son chiffrage.',
      },
      syriza: {
        nom: 'SYRIZA',
        titre: 'SYRIZA',
        date: 'Propositions de Sokratis Famellos sur l’excédent (2026)',
        mesures: [
          'Utiliser l’excédent de 3 Md€ pour suspendre la TVA sur les aliments et les médicaments, baisser les accises et financer une 13e pension → −1,2 point de PIB de recettes, soit 3,1 Md€.',
        ],
        nonModelise: [
          '13e salaire dans la fonction publique : pas de chiffrage.',
          'La 13e pension est une dépense, comptée ici avec les baisses d’impôts faute de répartition publiée.',
        ],
        avis: 'Le ministre des Finances juge la proposition contraire aux règles européennes et évalue la marge disponible à environ 1 Md€. La proposition date du printemps 2026.',
      },
    },
    en: {
      titre: 'Party proposals',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The government’s 2027 budget and opposition programmes, translated into the simulator’s sliders. Amounts are those announced; anything not costed is left out. Measures are added to the simulator’s baseline, in 2026 euros. Effects on growth are not modelled. The card disappears once a slider is changed.',
      nd: {
        nom: 'ND',
        titre: 'New Democracy (government)',
        date: 'Draft 2027 budget (5 October 2026)',
        mesures: [
          'A permanent €7.28bn package, of which €2.27bn of new measures (tax cuts and targeted support for low-income households and pensioners) and €5.48bn of measures already legislated → €2.3bn of new spending.',
        ],
        nonModelise: [
          'Pensions up 2.8% on 1 January 2027 (€807m): this is indexation, included in the baseline.',
          'Measures already legislated (€5.48bn) are assumed to be in the baseline.',
        ],
        avis: 'The government targets a primary surplus of 3.3% of GDP in 2027 and debt down from 136.7% to 128.8% of GDP. The new measures are tax cuts and benefits, grouped here as spending.',
      },
      pasok: {
        nom: 'PASOK',
        titre: 'PASOK – Movement for Change',
        date: 'Programme presented by Nikos Androulakis at the Thessaloniki fair (September 2026)',
        mesures: [
          'Net cost of €1.2bn in the first year and €3.1bn a year after four years, with the return of the 13th pension (in two steps, 2027 and 2030) and a 13th salary (€1.3bn) → €3.1bn of new spending, reached over 4 years.',
        ],
        nonModelise: [
          'Indexing income tax brackets, zero VAT on period products: no separate costing.',
          'Paying €2.6bn of State arrears: a one-off, with no lasting effect.',
        ],
        avis: 'Finance Minister Kyriakos Pierrakakis puts the seven main measures at over €6bn and asks for them to be reviewed by the Hellenic Fiscal Council. Nikos Androulakis stands by his costing.',
      },
      syriza: {
        nom: 'SYRIZA',
        titre: 'SYRIZA',
        date: 'Sokratis Famellos’s proposals on the surplus (2026)',
        mesures: [
          'Use the €3bn surplus to suspend VAT on food and medicines, cut excise duties and fund a 13th pension → −1.2 points of GDP of revenue, i.e. €3.1bn.',
        ],
        nonModelise: [
          '13th salary in the public sector: no costing.',
          'The 13th pension is spending, counted here with the tax cuts as no split is published.',
        ],
        avis: 'The Finance Minister says the proposal breaks EU rules and puts the available room at about €1bn. The proposal dates from spring 2026.',
      },
    },
    es: {
      titre: 'Propuestas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Presupuesto de 2027 del Gobierno y programas de la oposición, traducidos con los controles del simulador. Los importes son los anunciados; lo que no está cuantificado no se recoge. Las medidas se suman al tendencial del simulador, en euros de 2026. No se modeliza su efecto sobre el crecimiento. Al mover un control, la ficha desaparece.',
      nd: {
        nom: 'ND',
        titre: 'Nueva Democracia (Gobierno)',
        date: 'Proyecto de presupuesto de 2027 (5 de octubre de 2026)',
        mesures: [
          'Paquete permanente de 7.280 M€, del que 2.270 M€ son medidas nuevas (rebajas de impuestos y ayudas a hogares modestos y pensionistas) y 5.480 M€ medidas ya aprobadas → 2,3 mil M€ de gasto nuevo.',
        ],
        nonModelise: [
          'Subida de las pensiones del 2,8 % el 1 de enero de 2027 (807 M€): es la indexación, incluida en el tendencial.',
          'Las medidas ya aprobadas (5.480 M€) se suponen incluidas en el tendencial.',
        ],
        avis: 'El Gobierno prevé un superávit primario del 3,3 % del PIB en 2027 y una deuda que baja del 136,7 % al 128,8 % del PIB. Las medidas nuevas son rebajas de impuestos y ayudas, agrupadas aquí como gasto.',
      },
      pasok: {
        nom: 'PASOK',
        titre: 'PASOK – Movimiento por el Cambio',
        date: 'Programa presentado por Nikos Androulakis en la feria de Salónica (septiembre de 2026)',
        mesures: [
          'Coste neto de 1.200 M€ el primer año y 3.100 M€ al año tras cuatro años, con la vuelta de la 13.ª pensión (en dos fases, 2027 y 2030) y una 13.ª paga (1.300 M€) → 3,1 mil M€ de gasto nuevo, alcanzados en 4 años.',
        ],
        nonModelise: [
          'Indexación de la tarifa del impuesto sobre la renta, IVA cero en productos de higiene menstrual: sin cuantificación separada.',
          'Pago de 2.600 M€ de deudas atrasadas del Estado: operación puntual, sin efecto duradero.',
        ],
        avis: 'El ministro de Finanzas, Kyriakos Pierrakakis, cifra las siete medidas principales en más de 6.000 M€ y pide que las examine el Consejo Fiscal griego. Nikos Androulakis mantiene su cálculo.',
      },
      syriza: {
        nom: 'SYRIZA',
        titre: 'SYRIZA',
        date: 'Propuestas de Sokratis Famellos sobre el superávit (2026)',
        mesures: [
          'Destinar el superávit de 3.000 M€ a suspender el IVA de alimentos y medicamentos, bajar los impuestos especiales y financiar una 13.ª pensión → −1,2 puntos del PIB de ingresos, es decir 3,1 mil M€.',
        ],
        nonModelise: [
          '13.ª paga en el sector público: sin cuantificar.',
          'La 13.ª pensión es gasto, contado aquí con las rebajas de impuestos al no publicarse un reparto.',
        ],
        avis: 'El ministro de Finanzas considera la propuesta contraria a las reglas europeas y cifra el margen disponible en unos 1.000 M€. La propuesta es de la primavera de 2026.',
      },
    },
    de: {
      titre: 'Vorschläge der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Haushalt 2027 der Regierung und Programme der Opposition, mit den Reglern des Simulators übersetzt. Die Beträge sind die angekündigten; nicht Beziffertes wird nicht übernommen. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, in Euro von 2026. Wachstumseffekte werden nicht modelliert. Sobald ein Regler verändert wird, verschwindet die Karte.',
      nd: {
        nom: 'ND',
        titre: 'Nea Dimokratia (Regierung)',
        date: 'Haushaltsentwurf 2027 (5. Oktober 2026)',
        mesures: [
          'Dauerhaftes Paket von 7,28 Mrd. €, davon 2,27 Mrd. € neue Maßnahmen (Steuersenkungen und gezielte Hilfen für Geringverdiener und Rentner) und 5,48 Mrd. € bereits beschlossene → 2,3 Mrd. € neue Ausgaben.',
        ],
        nonModelise: [
          'Rentenerhöhung um 2,8 % zum 1. Januar 2027 (807 Mio. €): Das ist die Indexierung, im Basisszenario enthalten.',
          'Die bereits beschlossenen Maßnahmen (5,48 Mrd. €) gelten als im Basisszenario enthalten.',
        ],
        avis: 'Die Regierung strebt 2027 einen Primärüberschuss von 3,3 % des BIP an, die Schuldenquote soll von 136,7 % auf 128,8 % sinken. Die neuen Maßnahmen sind Steuersenkungen und Hilfen, hier als Ausgaben zusammengefasst.',
      },
      pasok: {
        nom: 'PASOK',
        titre: 'PASOK – Bewegung für den Wandel',
        date: 'Programm von Nikos Androulakis auf der Messe in Thessaloniki (September 2026)',
        mesures: [
          'Nettokosten von 1,2 Mrd. € im ersten Jahr und 3,1 Mrd. € pro Jahr nach vier Jahren, mit der Rückkehr der 13. Rente (in zwei Schritten, 2027 und 2030) und einem 13. Gehalt (1,3 Mrd. €) → 3,1 Mrd. € neue Ausgaben, in 4 Jahren erreicht.',
        ],
        nonModelise: [
          'Inflationsausgleich im Einkommensteuertarif, Mehrwertsteuer null auf Menstruationsprodukte: nicht gesondert beziffert.',
          'Begleichung von 2,6 Mrd. € Zahlungsrückständen des Staates: einmalig, ohne dauerhafte Wirkung.',
        ],
        avis: 'Finanzminister Kyriakos Pierrakakis beziffert die sieben Kernmaßnahmen auf über 6 Mrd. € und fordert eine Prüfung durch den griechischen Fiskalrat. Nikos Androulakis hält an seiner Rechnung fest.',
      },
      syriza: {
        nom: 'SYRIZA',
        titre: 'SYRIZA',
        date: 'Vorschläge von Sokratis Famellos zum Überschuss (2026)',
        mesures: [
          'Den Überschuss von 3 Mrd. € nutzen, um die Mehrwertsteuer auf Lebensmittel und Arzneimittel auszusetzen, Verbrauchsteuern zu senken und eine 13. Rente zu finanzieren → −1,2 BIP-Punkte Einnahmen, also 3,1 Mrd. €.',
        ],
        nonModelise: [
          '13. Gehalt im öffentlichen Dienst: nicht beziffert.',
          'Die 13. Rente ist eine Ausgabe, hier mangels veröffentlichter Aufteilung zusammen mit den Steuersenkungen gezählt.',
        ],
        avis: 'Der Finanzminister hält den Vorschlag für unvereinbar mit den EU-Regeln und beziffert den verfügbaren Spielraum auf etwa 1 Mrd. €. Der Vorschlag stammt aus dem Frühjahr 2026.',
      },
    },
  };

  return { liste, textes };
});

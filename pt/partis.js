// Budget de l'État portugais pour 2027 et propositions des partis, traduits avec les
// curseurs du simulateur (sources consultées le 16 novembre 2026) ; les écarts au
// modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'governo',
      p: { prelevements: -0.1 },
      sources: [
        { nom: 'ZAP, budget 2027 déposé', url: 'https://zap.aeiou.pt/oe2027-entregue-escaloes-do-irs-sobem-388-768655' },
        { nom: 'Jornal de Negócios, dépôt du budget', url: 'https://www.jornaldenegocios.pt/economia/financas-publicas/orcamento-do-estado/detalhe/miranda-sarmento-ja-entregou-proposta-de-orcamento-do-estado-no-parlamento' },
      ],
    },
    {
      id: 'ps',
      p: { nouvellesDepenses: 0.5 },
      sources: [
        { nom: 'TSF, 2026', url: 'https://www.tsf.pt/economia/artigo/oe2027-miranda-sarmento-avisa-que-propostas-do-ps-podem-levar-a-defice-de-500-milhoes/18146304' },
        { nom: 'Observador, 9 novembre 2026', url: 'https://observador.pt/2026/11/09/oe2027-ps-acusa-ministro-das-financas-de-dramatizar-e-nega-que-propostas-levem-a-defice/' },
        { nom: 'Groupe parlementaire du PS', url: 'https://www.psparlamento.pt/ps-apresenta-180-propostas-de-alteracao-ao-oe2027-e-exige-fim-das-rendas-moderadas-de-2-300-euros/' },
      ],
    },
    {
      id: 'chega',
      p: { nouvellesDepenses: 0.4 },
      sources: [
        { nom: 'ZAP, conditions du Chega', url: 'https://zap.aeiou.pt/chega-promete-juntar-se-ao-ps-para-viabilizar-medidas-no-oe-preco-travar-descida-do-irc-775315' },
        { nom: 'ECO, 2 847 amendements', url: 'https://eco.sapo.pt/2026/11/06/partidos-apresentam-2-847-propostas-de-alteracao-ao-orcamento-novo-maximo-historico/' },
      ],
    },
    {
      id: 'il',
      p: { prelevements: -0.5 },
      sources: [
        { nom: 'ECO, 2 847 amendements', url: 'https://eco.sapo.pt/2026/11/06/partidos-apresentam-2-847-propostas-de-alteracao-ao-orcamento-novo-maximo-historico/' },
        { nom: 'Observador, amendements des partis', url: 'https://observador.pt/especiais/portas-abertas-algumas-atraves-de-coligacoes-negativas-para-alteracoes-ao-orcamento-propostas-pelo-psd-ps-e-chega-com-desafio-ao-governo/' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Propositions des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Budget de l’État pour 2027 et amendements des partis, traduits avec les curseurs du simulateur. Les montants sont ceux annoncés ; ce qui n’est pas chiffré n’est pas repris. Les mesures s’ajoutent au tendanciel du simulateur, en euros de 2026. L’effet sur la croissance n’est pas modélisé. Après une modification d’un curseur, la fiche disparaît.',
      governo: {
        nom: 'Gouvernement',
        titre: 'Gouvernement AD (PSD, CDS)',
        date: 'Proposition de budget de l’État pour 2027 (octobre 2026), adoptée en première lecture le 28 octobre',
        mesures: [
          'Impôt sur les sociétés (IRC) de 19 % à 18 %, 300 M€ en 2027 → −0,1 point de PIB de recettes.',
        ],
        nonModelise: [
          'Sixième baisse de l’IRS, barème relevé de 3,88 % : l’indexation est dans le tendanciel, la baisse n’est pas chiffrée dans les sources.',
          'Salaire minimum à 970 € en 2027 : hausse prévue, sans effet ajouté au tendanciel.',
        ],
        avis: 'Le gouvernement vise un excédent de 0,1 % du PIB en 2027 et une dette de 84,5 % du PIB. Le budget a été adopté en première lecture grâce à l’abstention du PS ; le vote final est prévu le 24 novembre.',
      },
      ps: {
        nom: 'PS',
        titre: 'Parti socialiste',
        date: '180 amendements au budget 2027 (novembre 2026)',
        mesures: [
          'Baisse temporaire de l’impôt sur les carburants (ISP), TVA nulle et autres mesures, 480 M€ selon le PS → 0,5 Md€ de dépenses nouvelles.',
          'Compensation : suspendre en 2027 la baisse d’un point de l’IRC (300 à 400 M€ selon l’UTAO). Le scénario ne reprend donc pas cette baisse, contrairement à celui du gouvernement.',
        ],
        nonModelise: [
          'Garantie publique pour les loyers et moratoire d’un an sur les baux qui expirent en 2027 : pas de chiffrage.',
        ],
        avis: 'Le ministre des Finances estime que ces amendements transformeraient l’excédent d’environ 250 M€ en un déficit proche de 500 M€, soit 0,2 % du PIB. Le PS conteste ce calcul.',
      },
      chega: {
        nom: 'Chega',
        titre: 'Chega',
        date: 'Amendements au budget 2027 (novembre 2026)',
        mesures: [
          'Mesures pour le logement (227 M€) et aide de trésorerie aux exploitations agricoles (140 M€) → 0,4 Md€ de dépenses nouvelles.',
        ],
        nonModelise: [
          'Maintien de la baisse de la TVA sur les carburants et exonération de péages : pas de chiffrage.',
          'Le Chega veut aussi bloquer la baisse de l’IRC : non reprise, faute de montant attribué.',
        ],
        avis: 'Le ministre des Finances juge les propositions du Chega « irréalistes ». André Ventura n’a pas donné leur coût total.',
      },
      il: {
        nom: 'IL',
        titre: 'Initiative libérale',
        date: 'Amendements au budget 2027 (novembre 2026)',
        mesures: [
          'Baisse de l’IRS d’environ 1 600 M€ en 2027 → −0,5 point de PIB de recettes.',
        ],
        nonModelise: [
          'La baisse est conditionnée à une maîtrise de la dépense courante, sans montant d’économies précisé.',
        ],
        avis: 'L’IL annonce un vote probable contre le budget si le gouvernement ne change pas de cap. Aucune évaluation indépendante de la mesure n’a été trouvée.',
      },
    },
    en: {
      titre: 'Party proposals',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The 2027 State Budget and the parties’ amendments, translated into the simulator’s sliders. Amounts are those announced; anything not costed is left out. Measures are added to the simulator’s baseline, in 2026 euros. Effects on growth are not modelled. The card disappears once a slider is changed.',
      governo: {
        nom: 'Government',
        titre: 'AD government (PSD, CDS)',
        date: 'Proposed 2027 State Budget (October 2026), passed at first reading on 28 October',
        mesures: [
          'Corporate tax (IRC) from 19% to 18%, €300m in 2027 → −0.1 points of GDP of revenue.',
        ],
        nonModelise: [
          'Sixth income tax (IRS) cut, brackets raised by 3.88%: indexation is in the baseline, the cut is not costed in the sources.',
          'Minimum wage at €970 in 2027: a planned rise, with no effect added to the baseline.',
        ],
        avis: 'The government targets a surplus of 0.1% of GDP in 2027 and debt of 84.5% of GDP. The budget passed at first reading thanks to the PS abstaining; the final vote is set for 24 November.',
      },
      ps: {
        nom: 'PS',
        titre: 'Socialist Party',
        date: '180 amendments to the 2027 budget (November 2026)',
        mesures: [
          'Temporary cut in fuel tax (ISP), zero VAT and other measures, €480m according to the PS → €0.5bn of new spending.',
          'Offset: suspending the one-point IRC cut in 2027 (€300m to €400m according to UTAO). The scenario therefore leaves out that cut, unlike the government’s.',
        ],
        nonModelise: [
          'Public rent guarantee and a one-year moratorium on leases expiring in 2027: no costing.',
        ],
        avis: 'The Finance Minister says these amendments would turn the surplus of about €250m into a deficit of nearly €500m, or 0.2% of GDP. The PS disputes this.',
      },
      chega: {
        nom: 'Chega',
        titre: 'Chega',
        date: 'Amendments to the 2027 budget (November 2026)',
        mesures: [
          'Housing measures (€227m) and cash-flow support for farms (€140m) → €0.4bn of new spending.',
        ],
        nonModelise: [
          'Keeping the fuel VAT cut and toll exemptions: no costing.',
          'Chega also wants to block the IRC cut: not included, as no amount is attributed.',
        ],
        avis: 'The Finance Minister calls Chega’s proposals “unrealistic”. André Ventura did not give their total cost.',
      },
      il: {
        nom: 'IL',
        titre: 'Liberal Initiative',
        date: 'Amendments to the 2027 budget (November 2026)',
        mesures: [
          'Income tax (IRS) cut of about €1,600m in 2027 → −0.5 points of GDP of revenue.',
        ],
        nonModelise: [
          'The cut depends on curbing current spending, with no amount of savings specified.',
        ],
        avis: 'IL says it will probably vote against the budget unless the government changes course. No independent assessment of the measure was found.',
      },
    },
    es: {
      titre: 'Propuestas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Presupuesto del Estado para 2027 y enmiendas de los partidos, traducidos con los controles del simulador. Los importes son los anunciados; lo que no está cuantificado no se recoge. Las medidas se suman al tendencial del simulador, en euros de 2026. No se modeliza su efecto sobre el crecimiento. Al mover un control, la ficha desaparece.',
      governo: {
        nom: 'Gobierno',
        titre: 'Gobierno de AD (PSD, CDS)',
        date: 'Proyecto de presupuesto del Estado para 2027 (octubre de 2026), aprobado en primera lectura el 28 de octubre',
        mesures: [
          'Impuesto de sociedades (IRC) del 19 % al 18 %, 300 M€ en 2027 → −0,1 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'Sexta rebaja del IRS, tramos elevados un 3,88 %: la indexación está en el tendencial, la rebaja no está cuantificada en las fuentes.',
          'Salario mínimo de 970 € en 2027: subida prevista, sin efecto añadido al tendencial.',
        ],
        avis: 'El Gobierno prevé un superávit del 0,1 % del PIB en 2027 y una deuda del 84,5 % del PIB. El presupuesto se aprobó en primera lectura gracias a la abstención del PS; la votación final está prevista el 24 de noviembre.',
      },
      ps: {
        nom: 'PS',
        titre: 'Partido Socialista',
        date: '180 enmiendas al presupuesto de 2027 (noviembre de 2026)',
        mesures: [
          'Rebaja temporal del impuesto sobre carburantes (ISP), IVA cero y otras medidas, 480 M€ según el PS → 0,5 mil M€ de gasto nuevo.',
          'Compensación: suspender en 2027 la rebaja de un punto del IRC (de 300 a 400 M€ según la UTAO). El escenario no recoge por tanto esa rebaja, a diferencia del del Gobierno.',
        ],
        nonModelise: [
          'Garantía pública de alquiler y moratoria de un año para los contratos que vencen en 2027: sin cuantificar.',
        ],
        avis: 'El ministro de Finanzas calcula que estas enmiendas convertirían el superávit de unos 250 M€ en un déficit cercano a 500 M€, el 0,2 % del PIB. El PS lo niega.',
      },
      chega: {
        nom: 'Chega',
        titre: 'Chega',
        date: 'Enmiendas al presupuesto de 2027 (noviembre de 2026)',
        mesures: [
          'Medidas de vivienda (227 M€) y apoyo de tesorería a las explotaciones agrarias (140 M€) → 0,4 mil M€ de gasto nuevo.',
        ],
        nonModelise: [
          'Mantener la rebaja del IVA de los carburantes y la exención de peajes: sin cuantificar.',
          'Chega también quiere frenar la rebaja del IRC: no se recoge, al no tener importe atribuido.',
        ],
        avis: 'El ministro de Finanzas califica de «irrealistas» las propuestas de Chega. André Ventura no dio su coste total.',
      },
      il: {
        nom: 'IL',
        titre: 'Iniciativa Liberal',
        date: 'Enmiendas al presupuesto de 2027 (noviembre de 2026)',
        mesures: [
          'Rebaja del IRS de unos 1.600 M€ en 2027 → −0,5 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'La rebaja depende de contener el gasto corriente, sin importe de ahorro precisado.',
        ],
        avis: 'IL anuncia un probable voto en contra si el Gobierno no cambia de rumbo. No se ha encontrado ninguna evaluación independiente de la medida.',
      },
    },
    de: {
      titre: 'Vorschläge der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Staatshaushalt 2027 und Änderungsanträge der Parteien, mit den Reglern des Simulators übersetzt. Die Beträge sind die angekündigten; nicht Beziffertes wird nicht übernommen. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, in Euro von 2026. Wachstumseffekte werden nicht modelliert. Sobald ein Regler verändert wird, verschwindet die Karte.',
      governo: {
        nom: 'Regierung',
        titre: 'AD-Regierung (PSD, CDS)',
        date: 'Entwurf des Staatshaushalts 2027 (Oktober 2026), in erster Lesung am 28. Oktober angenommen',
        mesures: [
          'Körperschaftsteuer (IRC) von 19 % auf 18 %, 300 Mio. € im Jahr 2027 → −0,1 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Sechste Senkung der Einkommensteuer (IRS), Tarifstufen um 3,88 % angehoben: Die Indexierung ist im Basisszenario, die Senkung ist in den Quellen nicht beziffert.',
          'Mindestlohn von 970 € im Jahr 2027: geplante Erhöhung, ohne zusätzliche Wirkung auf das Basisszenario.',
        ],
        avis: 'Die Regierung strebt 2027 einen Überschuss von 0,1 % des BIP und eine Schuldenquote von 84,5 % an. Der Haushalt passierte die erste Lesung dank der Enthaltung der PS; die Schlussabstimmung ist für den 24. November geplant.',
      },
      ps: {
        nom: 'PS',
        titre: 'Sozialistische Partei',
        date: '180 Änderungsanträge zum Haushalt 2027 (November 2026)',
        mesures: [
          'Befristete Senkung der Kraftstoffsteuer (ISP), Mehrwertsteuer null und weitere Maßnahmen, laut PS 480 Mio. € → 0,5 Mrd. € neue Ausgaben.',
          'Ausgleich: Aussetzen der IRC-Senkung um einen Punkt im Jahr 2027 (300 bis 400 Mio. € laut UTAO). Das Szenario enthält diese Senkung daher nicht, anders als das der Regierung.',
        ],
        nonModelise: [
          'Staatliche Mietgarantie und einjähriges Moratorium für 2027 auslaufende Mietverträge: nicht beziffert.',
        ],
        avis: 'Der Finanzminister rechnet vor, dass diese Anträge den Überschuss von etwa 250 Mio. € in ein Defizit von fast 500 Mio. € (0,2 % des BIP) verwandeln würden. Die PS bestreitet das.',
      },
      chega: {
        nom: 'Chega',
        titre: 'Chega',
        date: 'Änderungsanträge zum Haushalt 2027 (November 2026)',
        mesures: [
          'Maßnahmen für Wohnen (227 Mio. €) und Liquiditätshilfe für landwirtschaftliche Betriebe (140 Mio. €) → 0,4 Mrd. € neue Ausgaben.',
        ],
        nonModelise: [
          'Beibehaltung der gesenkten Mehrwertsteuer auf Kraftstoffe und Mautbefreiung: nicht beziffert.',
          'Chega will auch die IRC-Senkung stoppen: nicht übernommen, da kein Betrag zugeordnet ist.',
        ],
        avis: 'Der Finanzminister nennt die Vorschläge von Chega „unrealistisch“. André Ventura nannte keine Gesamtkosten.',
      },
      il: {
        nom: 'IL',
        titre: 'Liberale Initiative',
        date: 'Änderungsanträge zum Haushalt 2027 (November 2026)',
        mesures: [
          'Senkung der Einkommensteuer (IRS) um etwa 1.600 Mio. € im Jahr 2027 → −0,5 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Die Senkung setzt voraus, dass die laufenden Ausgaben gebremst werden, ohne bezifferte Einsparungen.',
        ],
        avis: 'Die IL kündigt eine wahrscheinliche Gegenstimme an, falls die Regierung nicht umsteuert. Eine unabhängige Bewertung der Maßnahme wurde nicht gefunden.',
      },
    },
  };

  return { liste, textes };
});

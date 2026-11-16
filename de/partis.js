// Propositions budgétaires des partis du Bundestag pour 2027, traduites avec les
// curseurs du simulateur allemand. Chaque mesure reprend le chiffrage annoncé par
// le parti ou par la coalition (sources consultées le 16 novembre 2026) ; les écarts
// au modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'koalition',
      p: { prelevements: 0.1, economies: 10 },
      sources: [
        { nom: 'Euronews, 11 novembre 2026', url: 'https://de.euronews.com/2026/11/11/zuckersteuer-2028-plastiksteuer-fallt-vorerst-weg-koalition-geeinigt' },
        { nom: 'ad-hoc-news, impôts sur la consommation', url: 'https://www.ad-hoc-news.de/wirtschaft/bundeshaushalt-2027-neue-verbrauchsteuern-sollen-3-5-milliarden-euro-bringen/70485213' },
        { nom: 'Wirtschaft und Industrie, économies', url: 'https://www.wirtschaft-und-industrie.de/bundeshaushalt-2027-rekordinvestitionen-und-mehr-geld-fuer-verteidigung/' },
        { nom: 'Perspektive, coupes sociales', url: 'https://perspektive-online.net/2026/11/bundeshaushalt-fuer-2027-die-grossen-einschnitte-kommen-erst-noch/' },
        { nom: 'WirtschaftsWoche, 210 Md€ d’emprunts', url: 'https://www.wiwo.de/politik/deutschland/bundeshaushalt-2027-steht-neuverschuldung-steigt-auf-210-milliarden-euro/100269598.html' },
      ],
    },
    {
      id: 'afd',
      p: { prelevements: -1.0, infra: 50, economies: 170, montee: 1 },
      sources: [
        { nom: 'Groupe AfD au Bundestag, budget alternatif 2027', url: 'https://afdbundestag.de/afd-bundestagsfraktion-legt-alternativhaushalt-2027-vor/' },
        { nom: 'AfD, Chrupalla et Weidel', url: 'https://www.afd.de/tino-chrupalla-und-alice-weidel-bundesregierung-verschuldet-deutschland-als-gaebe-es-kein-morgen/' },
        { nom: 'Bundestag, adoption en commission du budget', url: 'https://www.bundestag.de/presse/hib/kurzmeldungen-1233152' },
      ],
    },
    {
      id: 'gruene',
      p: { nouvellesDepenses: 3 },
      sources: [
        { nom: 'Groupe des Verts, « Kein Zufall, wer die Rechnung zahlt »', url: 'https://www.gruene-bundestag.de/unsere-politik/was-unsere-politik-fuer-dich-bedeutet/haushalt-2027-kein-zufall-wer-die-rechnung-zahlt/' },
        { nom: 'Groupe des Verts, climat et investissements', url: 'https://www.gruene-bundestag.de/unsere-politik/was-unsere-politik-fuer-dich-bedeutet/haushalt-2027-rasur-beim-klimaschutz-und-geschoente-zahlen/' },
        { nom: 'taz, fonds climat', url: 'https://taz.de/Bundeshaushalt-fuer-2027/!6211410/' },
      ],
    },
    {
      id: 'linke',
      p: { prelevements: 2.2 },
      sources: [
        { nom: 'Surplus, étude du DIW', url: 'https://www.surplusmagazin.de/linke-vermogensteuer-vermogen-konzept-studie/' },
        { nom: 'evangelisch.de, 6 février 2026', url: 'https://www.evangelisch.de/inhalte/252594/06-02-2026/linke-rueckkehr-der-vermoegensteuer-sichert-dem-staat-milliarden' },
        { nom: 'Bundestag, motion sur l’impôt sur le revenu', url: 'https://www.bundestag.de/dokumente/textarchiv/2026/kw26-de-einkommen-1184318' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Propositions des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Budget 2027 de la coalition et propositions des groupes d’opposition, traduits avec les curseurs du simulateur. Les montants sont ceux annoncés ; ce qui n’est pas chiffré n’est pas repris. Les mesures s’ajoutent au tendanciel du simulateur, qui comprend déjà le fonds d’infrastructure et la défense à 3,5 % du PIB, à terme et en euros de 2026. L’effet sur la croissance n’est pas modélisé. Après une modification d’un curseur, la fiche disparaît.',
      koalition: {
        nom: 'CDU/CSU-SPD',
        titre: 'Coalition CDU/CSU-SPD',
        date: 'Budget fédéral 2027, adopté en commission des finances (novembre 2026)',
        mesures: [
          'Hausse de l’impôt sur le tabac, impôt sur le sucre en trois étapes à partir de 2028 (environ 1,5 Md€ par an) : 3,5 Md€ d’impôts sur la consommation en 2027 → +0,1 point de PIB de recettes.',
          '4 Md€ d’économies dans tous les ministères, 2,5 Md€ de baisse des subventions, 3 Md€ de moins pour la subvention fédérale à l’assurance retraite → 10 Md€ d’économies.',
        ],
        nonModelise: [
          'Baisses de l’allocation citoyenne (Bürgergeld) et réserves globales du budget : pas de montant fiable publié.',
          'Transfert de 2,7 Md€ de recettes du marché du carbone du fonds climat vers le budget fédéral : sans effet sur le solde des administrations publiques.',
        ],
        avis: 'Avec les fonds spéciaux, l’emprunt fédéral atteint 210 Md€ en 2027 selon la WirtschaftsWoche. La taxe sur le plastique a été abandonnée et la presse relève des trous de financement à partir de 2028.',
      },
      afd: {
        nom: 'AfD',
        titre: 'Alternative pour l’Allemagne',
        date: 'Budget alternatif 2027 du groupe AfD au Bundestag (novembre 2026)',
        mesures: [
          'Environ 44 Md€ de baisses d’impôts et de prélèvements, dont l’énergie et le prix du CO₂ → −1,0 point de PIB de recettes.',
          'Fonds spécial d’infrastructure supprimé, 18,7 Md€ pour les routes, le rail, les voies navigables et le haut débit repris au budget → moitié du fonds dépensée.',
          'Environ 147 Md€ d’emprunts en moins que le gouvernement : réforme du Bürgergeld (15,1 Md€), climat, asile, aide au développement, contribution à l’UE, aide militaire à l’Ukraine, 8 % des postes de l’administration civile → 170 Md€ d’économies dès 2027.',
        ],
        nonModelise: [
          'Défense : l’AfD annonce de fortes économies sans montant détaillé dans les sources consultées. Le simulateur garde la trajectoire vers 3,5 % du PIB.',
          'Programme de 5 Md€ pour les communes : transfert entre administrations, sans effet sur le solde.',
        ],
        avis: 'Il reste 63 Md€ d’emprunt net dans ce budget alternatif. Le député CDU Mathias Middelberg demande que les économies soient précisées. Les chiffres viennent du communiqué de l’AfD et n’ont pas été évalués de façon indépendante.',
      },
      gruene: {
        nom: 'Grüne',
        titre: 'Alliance 90 / Les Verts',
        date: 'Amendements au budget 2027 (septembre à novembre 2026)',
        mesures: [
          'Garder les recettes du marché du carbone dans le fonds climat pour la protection du climat (2,7 Md€ en 2027, plus de 13 Md€ d’ici 2030) et annuler les coupes visant les familles → 3 Md€ de dépenses nouvelles.',
        ],
        nonModelise: [
          'Fin de l’aide aux grandes voitures de fonction et autres « privilèges » pour financer ces mesures : rendement non publié.',
          'Davantage d’investissements dans le rail, les routes, les réseaux d’énergie et le numérique : pas de montant dans les sources consultées.',
        ],
        avis: 'Les Verts jugent que le budget investit trop peu dans le budget de base et ne respecte pas le principe d’additionnalité du fonds d’infrastructure. Leurs amendements ont été rejetés en commission.',
      },
      linke: {
        nom: 'Linke',
        titre: 'Die Linke',
        date: 'Concept d’impôt sur la fortune (février 2026) et motions au Bundestag (2026)',
        mesures: [
          'Retour de l’impôt sur la fortune, à partir de 1 % au-delà d’un million d’euros (deux pour un couple, cinq pour les entreprises). Le DIW l’évalue à près de 100 Md€ par an après réactions des contribuables, 147 Md€ avant → +2,2 points de PIB de recettes.',
        ],
        nonModelise: [
          'Revenus exonérés jusqu’à 16 800 €, financés par un taux de 75 % sur les millionnaires : chiffrage non publié, motion rejetée.',
          'Baisse de l’impôt sur l’électricité pour les ménages, hausse de l’impôt sur les successions et investissements : pas de montant.',
        ],
        avis: 'Les recettes de l’impôt sur la fortune iraient aux Länder et aux communes, qui les dépenseraient en partie : le scénario montre l’amélioration maximale du solde. Le DIW souligne la forte incertitude du rendement.',
      },
    },

    en: {
      titre: 'Party proposals',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The coalition’s 2027 budget and the opposition groups’ proposals, translated into the simulator’s sliders. Amounts are those announced; anything not costed is left out. Measures are added to the simulator’s baseline, which already includes the infrastructure fund and defence at 3.5% of GDP, as long-run effects in 2026 euros. Effects on growth are not modelled. The card disappears once a slider is changed.',
      koalition: {
        nom: 'CDU/CSU-SPD',
        titre: 'CDU/CSU-SPD coalition',
        date: 'Federal budget 2027, adopted by the budget committee (November 2026)',
        mesures: [
          'Higher tobacco tax, a sugar tax in three steps from 2028 (about €1.5bn a year): €3.5bn of consumption taxes in 2027 → +0.1 points of GDP of revenue.',
          '€4bn of savings across all ministries, €2.5bn of subsidy cuts, €3bn less for the federal grant to the pension insurance → €10bn of savings.',
        ],
        nonModelise: [
          'Cuts to citizen’s income (Bürgergeld) and global reserves in the budget: no reliable amount published.',
          'Moving €2.7bn of carbon-market revenue from the climate fund to the federal budget: no effect on the general government balance.',
        ],
        avis: 'Including the special funds, federal borrowing reaches €210bn in 2027 according to WirtschaftsWoche. The plastic tax was dropped and the press points to funding gaps from 2028.',
      },
      afd: {
        nom: 'AfD',
        titre: 'Alternative for Germany',
        date: 'Alternative budget 2027 of the AfD group in the Bundestag (November 2026)',
        mesures: [
          'About €44bn of tax and levy cuts, including energy and the CO₂ price → −1.0 points of GDP of revenue.',
          'Infrastructure special fund abolished, €18.7bn for roads, rail, waterways and broadband moved into the budget → half of the fund spent.',
          'About €147bn less borrowing than the government: Bürgergeld reform (€15.1bn), climate, asylum, development aid, EU contribution, military aid to Ukraine, 8% of civil administration posts → €170bn of savings from 2027.',
        ],
        nonModelise: [
          'Defence: the AfD announces large savings with no detailed amount in the sources consulted. The simulator keeps the path to 3.5% of GDP.',
          '€5bn programme for municipalities: a transfer between levels of government, with no effect on the balance.',
        ],
        avis: 'This alternative budget still has €63bn of net borrowing. CDU MP Mathias Middelberg asks for the savings to be specified. The figures come from the AfD’s press release and have not been independently assessed.',
      },
      gruene: {
        nom: 'Greens',
        titre: 'Alliance 90 / The Greens',
        date: 'Amendments to the 2027 budget (September to November 2026)',
        mesures: [
          'Keep carbon-market revenue in the climate fund for climate protection (€2.7bn in 2027, over €13bn by 2030) and reverse cuts hitting families → €3bn of new spending.',
        ],
        nonModelise: [
          'Ending support for large company cars and other “privileges” to fund these measures: yield not published.',
          'More investment in rail, roads, energy grids and digital: no amount in the sources consulted.',
        ],
        avis: 'The Greens argue that the core budget invests too little and that the infrastructure fund breaks the additionality principle. Their amendments were rejected in committee.',
      },
      linke: {
        nom: 'Linke',
        titre: 'Die Linke',
        date: 'Wealth tax concept (February 2026) and Bundestag motions (2026)',
        mesures: [
          'Return of the wealth tax, from 1% above €1m (€2m for a couple, €5m for businesses). DIW puts it at nearly €100bn a year after taxpayer responses, €147bn before → +2.2 points of GDP of revenue.',
        ],
        nonModelise: [
          'Income up to €16,800 tax-free, funded by a 75% rate on millionaires: no published costing, motion rejected.',
          'Lower electricity tax for households, higher inheritance tax and investment: no amount.',
        ],
        avis: 'Wealth tax revenue would go to the Länder and municipalities, which would spend part of it: the scenario shows the largest possible improvement in the balance. DIW stresses the high uncertainty of the yield.',
      },
    },

    es: {
      titre: 'Propuestas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Presupuesto de 2027 de la coalición y propuestas de los grupos de la oposición, traducidos con los controles del simulador. Los importes son los anunciados; lo que no está cuantificado no se recoge. Las medidas se suman al tendencial del simulador, que ya incluye el fondo de infraestructuras y la defensa al 3,5 % del PIB, a largo plazo y en euros de 2026. No se modeliza su efecto sobre el crecimiento. Al mover un control, la ficha desaparece.',
      koalition: {
        nom: 'CDU/CSU-SPD',
        titre: 'Coalición CDU/CSU-SPD',
        date: 'Presupuesto federal de 2027, aprobado en la comisión de presupuestos (noviembre de 2026)',
        mesures: [
          'Subida del impuesto sobre el tabaco, impuesto sobre el azúcar en tres fases desde 2028 (unos 1.500 M€ al año): 3.500 M€ de impuestos sobre el consumo en 2027 → +0,1 puntos del PIB de ingresos.',
          '4.000 M€ de ahorros en todos los ministerios, 2.500 M€ menos de subvenciones, 3.000 M€ menos de aportación federal al seguro de pensiones → 10 mil M€ de ahorros.',
        ],
        nonModelise: [
          'Recortes del ingreso ciudadano (Bürgergeld) y reservas globales del presupuesto: sin importe fiable publicado.',
          'Traspaso de 2.700 M€ de ingresos del mercado de carbono del fondo climático al presupuesto federal: sin efecto en el saldo de las administraciones públicas.',
        ],
        avis: 'Con los fondos especiales, el endeudamiento federal llega a 210.000 M€ en 2027 según WirtschaftsWoche. Se ha abandonado el impuesto sobre el plástico y la prensa señala agujeros de financiación a partir de 2028.',
      },
      afd: {
        nom: 'AfD',
        titre: 'Alternativa para Alemania',
        date: 'Presupuesto alternativo de 2027 del grupo de AfD en el Bundestag (noviembre de 2026)',
        mesures: [
          'Unos 44.000 M€ de rebajas de impuestos y cargas, entre ellas la energía y el precio del CO₂ → −1,0 puntos del PIB de ingresos.',
          'Fondo especial de infraestructuras suprimido, con 18.700 M€ para carreteras, ferrocarril, vías navegables y banda ancha pasados al presupuesto → la mitad del fondo gastada.',
          'Unos 147.000 M€ menos de endeudamiento que el Gobierno: reforma del Bürgergeld (15.100 M€), clima, asilo, ayuda al desarrollo, aportación a la UE, ayuda militar a Ucrania, 8 % de los puestos de la administración civil → 170 mil M€ de ahorros desde 2027.',
        ],
        nonModelise: [
          'Defensa: AfD anuncia fuertes ahorros sin importe detallado en las fuentes consultadas. El simulador mantiene la senda hacia el 3,5 % del PIB.',
          'Programa de 5.000 M€ para los municipios: transferencia entre administraciones, sin efecto en el saldo.',
        ],
        avis: 'Este presupuesto alternativo mantiene 63.000 M€ de endeudamiento neto. El diputado de la CDU Mathias Middelberg pide que se concreten los recortes. Las cifras proceden del comunicado de AfD y no se han evaluado de forma independiente.',
      },
      gruene: {
        nom: 'Verdes',
        titre: 'Alianza 90 / Los Verdes',
        date: 'Enmiendas al presupuesto de 2027 (septiembre a noviembre de 2026)',
        mesures: [
          'Mantener los ingresos del mercado de carbono en el fondo climático para la protección del clima (2.700 M€ en 2027, más de 13.000 M€ hasta 2030) y revertir los recortes a las familias → 3 mil M€ de gasto nuevo.',
        ],
        nonModelise: [
          'Fin de la ayuda a los grandes coches de empresa y otros «privilegios» para financiarlo: rendimiento no publicado.',
          'Más inversión en ferrocarril, carreteras, redes energéticas y digitalización: sin importe en las fuentes consultadas.',
        ],
        avis: 'Los Verdes consideran que el presupuesto básico invierte demasiado poco y que el fondo de infraestructuras no respeta el principio de adicionalidad. Sus enmiendas fueron rechazadas en comisión.',
      },
      linke: {
        nom: 'Linke',
        titre: 'Die Linke',
        date: 'Propuesta de impuesto sobre el patrimonio (febrero de 2026) y mociones en el Bundestag (2026)',
        mesures: [
          'Vuelta del impuesto sobre el patrimonio, desde el 1 % por encima de un millón de euros (dos para una pareja, cinco para las empresas). El DIW lo cifra en casi 100.000 M€ al año tras la reacción de los contribuyentes, 147.000 M€ antes → +2,2 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'Rentas exentas hasta 16.800 €, financiadas con un tipo del 75 % para los millonarios: sin cuantificación publicada, moción rechazada.',
          'Rebaja del impuesto sobre la electricidad para los hogares, subida del impuesto de sucesiones e inversiones: sin importe.',
        ],
        avis: 'Lo recaudado iría a los Länder y los municipios, que gastarían una parte: el escenario muestra la mejora máxima del saldo. El DIW subraya la gran incertidumbre del rendimiento.',
      },
    },

    de: {
      titre: 'Vorschläge der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Haushalt 2027 der Koalition und Vorschläge der Oppositionsfraktionen, mit den Reglern des Simulators übersetzt. Die Beträge sind die angekündigten; nicht Beziffertes wird nicht übernommen. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, das Infrastrukturfonds und Verteidigung bei 3,5 % des BIP bereits enthält, als langfristige Wirkung in Euro von 2026. Wachstumseffekte werden nicht modelliert. Sobald ein Regler verändert wird, verschwindet die Karte.',
      koalition: {
        nom: 'CDU/CSU-SPD',
        titre: 'Koalition aus CDU/CSU und SPD',
        date: 'Bundeshaushalt 2027, vom Haushaltsausschuss beschlossen (November 2026)',
        mesures: [
          'Höhere Tabaksteuer, Zuckersteuer in drei Stufen ab 2028 (etwa 1,5 Mrd. € pro Jahr): 3,5 Mrd. € Verbrauchsteuern im Jahr 2027 → +0,1 BIP-Punkte Einnahmen.',
          '4 Mrd. € Einsparungen über alle Ressorts, 2,5 Mrd. € Subventionsabbau, 3 Mrd. € weniger Bundeszuschuss zur Rentenversicherung → 10 Mrd. € Einsparungen.',
        ],
        nonModelise: [
          'Kürzungen beim Bürgergeld und Globalpositionen im Haushalt: kein verlässlicher Betrag veröffentlicht.',
          'Umleitung von 2,7 Mrd. € Emissionshandelserlösen vom Klima- und Transformationsfonds in den Kernhaushalt: ohne Wirkung auf den gesamtstaatlichen Saldo.',
        ],
        avis: 'Mit den Sondervermögen erreicht die Neuverschuldung des Bundes 2027 laut WirtschaftsWoche 210 Mrd. €. Die Plastiksteuer entfällt, und die Presse sieht ab 2028 Finanzierungslücken.',
      },
      afd: {
        nom: 'AfD',
        titre: 'Alternative für Deutschland',
        date: 'Alternativhaushalt 2027 der AfD-Bundestagsfraktion (November 2026)',
        mesures: [
          'Etwa 44 Mrd. € Entlastungen bei Steuern und Abgaben, darunter Energie und CO₂-Preis → −1,0 BIP-Punkte Einnahmen.',
          'Sondervermögen Infrastruktur abgeschafft, 18,7 Mrd. € für Straße, Schiene, Wasserstraße und Breitband in den Kernhaushalt übertragen → die Hälfte des Fonds ausgegeben.',
          'Etwa 147 Mrd. € weniger neue Schulden als die Regierung: Bürgergeldreform (15,1 Mrd. €), Klima, Asyl, Entwicklungshilfe, EU-Beitrag, Waffenhilfe für die Ukraine, 8 % der Stellen in der zivilen Bundesverwaltung → 170 Mrd. € Einsparungen ab 2027.',
        ],
        nonModelise: [
          'Verteidigung: Die AfD kündigt deutliche Einsparungen ohne detaillierten Betrag in den Quellen an. Der Simulator behält den Pfad zu 3,5 % des BIP.',
          'Kommunales Finanzprogramm von 5 Mrd. €: Transfer zwischen staatlichen Ebenen, ohne Wirkung auf den Saldo.',
        ],
        avis: 'Auch dieser Alternativhaushalt sieht 63 Mrd. € Nettokreditaufnahme vor. Der CDU-Haushälter Mathias Middelberg fordert, die Kürzungen konkret zu benennen. Die Zahlen stammen aus der Pressemitteilung der AfD und wurden nicht unabhängig geprüft.',
      },
      gruene: {
        nom: 'Grüne',
        titre: 'Bündnis 90/Die Grünen',
        date: 'Änderungsanträge zum Haushalt 2027 (September bis November 2026)',
        mesures: [
          'Emissionshandelserlöse im Klima- und Transformationsfonds für Klimaschutz belassen (2,7 Mrd. € im Jahr 2027, über 13 Mrd. € bis 2030) und Kürzungen bei Familien zurücknehmen → 3 Mrd. € neue Ausgaben.',
        ],
        nonModelise: [
          'Streichung der Förderung großer Dienstwagen und anderer „Privilegien“ zur Gegenfinanzierung: Aufkommen nicht veröffentlicht.',
          'Mehr Investitionen in Schiene, Straßen, Energienetze und Digitalisierung: kein Betrag in den Quellen.',
        ],
        avis: 'Die Grünen kritisieren, dass im Kernhaushalt zu wenig investiert wird und das Sondervermögen das Zusätzlichkeitsprinzip verletzt. Ihre Änderungsanträge fanden im Ausschuss keine Mehrheit.',
      },
      linke: {
        nom: 'Linke',
        titre: 'Die Linke',
        date: 'Vermögensteuerkonzept (Februar 2026) und Anträge im Bundestag (2026)',
        mesures: [
          'Wiedereinführung der Vermögensteuer, ab 1 % oberhalb von einer Million Euro (zwei für Ehepaare, fünf für Unternehmensvermögen). Das DIW beziffert sie nach Verhaltensreaktionen auf knapp 100 Mrd. € pro Jahr, davor auf 147 Mrd. € → +2,2 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Einkommen bis 16.800 € steuerfrei, finanziert durch einen Millionärssteuersatz von 75 %: keine veröffentlichte Bezifferung, Antrag abgelehnt.',
          'Senkung der Stromsteuer für Privathaushalte, höhere Erbschaftsteuer und Investitionen: kein Betrag.',
        ],
        avis: 'Das Aufkommen der Vermögensteuer stünde Ländern und Kommunen zu, die einen Teil ausgeben würden: Das Szenario zeigt die größtmögliche Verbesserung des Saldos. Das DIW betont die große Unsicherheit des Aufkommens.',
      },
    },
  };

  return { liste, textes };
});

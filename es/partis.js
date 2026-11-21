// Programmes des partis espagnols pour les élections générales du 29 novembre 2026,
// traduits avec les curseurs du simulateur. Chaque mesure reprend le chiffrage
// annoncé par le parti ou, à défaut, celui cité par la presse (sources consultées
// le 16 novembre 2026) ; les écarts au modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'psoe',
      p: { nouvellesDepenses: 17.5, montee: 4 },
      sources: [
        { nom: 'El Independiente, 15 novembre 2026', url: 'https://www.elindependiente.com/espana/2026/11/15/programa-psoe-29n-gestion-adif-renfe-vivienda-corrupcion-tecnoligarcas/' },
        { nom: 'Demócrata, programme du PSOE', url: 'https://www.democrata.es/en/general-elections-spain/all-the-psoe-program-keys-for-29n-100-000-homes-aid-per-child-and-new-taxes/' },
        { nom: 'DatosClaros, comparateur des programmes', url: 'https://www.datosclaros.es/comparador-de-programas-29n/' },
      ],
    },
    {
      id: 'pp',
      p: { iva4: 0, prelevements: -0.2 },
      sources: [
        { nom: 'Infobae, 10 novembre 2026', url: 'https://www.infobae.com/espana/2026/11/10/el-pp-anuncia-sus-propuestas-economicas-para-el-29-n-los-jovenes-de-18-a-35-anos-no-pagaran-irpf-en-su-primer-ano-como-contribuyentes-y-los-alimentos-basicos-tendran-iva-cero/' },
        { nom: 'Que.es, 14 novembre 2026', url: 'https://www.que.es/2026/11/14/rebajas-fiscales-jovenes-feijoo/' },
        { nom: 'Moncloa.com, rebaja de 3 200 M€ (30 juin 2026)', url: 'https://www.moncloa.com/2026/06/30/feijoo-rebaja-fiscal-pp-congreso-3392154' },
        { nom: 'Rankia, programmes du 29-N', url: 'https://www.rankia.com/blog/opiniones/7550647-programas-electorales-29-n-que-propone-cada-partido-economia' },
      ],
    },
    {
      id: 'vox',
      p: { prelevements: -2.3, iva21: 18, iva10: 8.5, societes: 19, economies: 60, montee: 4 },
      sources: [
        { nom: 'Infobae, 4 novembre 2026', url: 'https://www.infobae.com/espana/2026/11/04/vox-anuncia-bajada-masiva-de-impuestos-y-reducir-el-iva-al-18-como-pretende-hacerlo/' },
        { nom: 'Demócrata, subventions et IVA', url: 'https://www.democrata.es/economia/vox-propone-bajar-el-iva-al-18-recortar-cotizaciones-y-revisar-52-000-millones-en-subvenciones/' },
        { nom: 'El Independiente, chiffrage de Hacienda (13 octobre 2026)', url: 'https://www.elindependiente.com/economia/2026/10/13/hacienda-cifra-en-85-000-millones-el-coste-de-la-rebaja-del-irpf-de-vox-el-61-de-toda-la-recaudacion-del-impuesto/' },
        { nom: 'Herqles, 10 octobre 2026', url: 'https://herqles.com/2026/10/10/rebaja-fiscal-vox-aumentaria-poder-adquisitivo-38-pib/' },
      ],
    },
    {
      id: 'sumar',
      p: { nouvellesDepenses: 17.5, ir47: 52, patrimoine: 0.5, montee: 4 },
      sources: [
        { nom: 'Papeleta Clara, programme du Frente Amplio', url: 'https://papeletaclara.es/partidos/sumar/' },
        { nom: 'Demócrata, programme du Frente Amplio', url: 'https://www.democrata.es/en/general-elections-spain/front-broad-electoral-program-29n-pdf-and-proposals/' },
        { nom: 'Analyse de Marcos Ramírez', url: 'https://blog.marcosramirez.info/programa-electoral-frente-amplio-29n/' },
        { nom: 'elDiario.es, réforme fiscale', url: 'https://www.eldiario.es/politica/sumar-presiona-psoe-incluir-reforma-fiscal-integral-presupuestos_1_11751687.html' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Programmes des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Programmes pour les élections générales du 29 novembre 2026, traduits avec les curseurs du simulateur. Aucun parti n’a publié de chiffrage complet : les montants viennent des partis eux-mêmes ou de la presse, et ce qui n’est pas chiffré n’est pas repris. Les mesures s’ajoutent au tendanciel du simulateur, à terme et en euros de 2026. L’effet sur la croissance n’est pas modélisé. Après une modification d’un curseur, la fiche disparaît.',
      psoe: {
        nom: 'PSOE',
        titre: 'Parti socialiste ouvrier espagnol',
        date: 'Programme électoral pour le 29-N (15 novembre 2026)',
        mesures: [
          '1 % du PIB par an pour le logement, avec un parc public de 100 000 logements abordables → 17,5 Md€ de dépenses nouvelles, atteints en 4 ans. C’est un maximum : le modèle compte tout comme dépense publique nouvelle.',
        ],
        nonModelise: [
          'Programme TuCasa : ligne de crédit de 10 Md€ (prêts sans intérêt jusqu’à 50 000 €). Ce sont des prêts, sans effet direct sur le déficit.',
          'Hausse des impôts des « technoligarques », aides par enfant à l’IRPF, maintien des impôts sur la banque et l’énergie : pas de chiffrage publié.',
        ],
        avis: 'Le programme ne chiffre ni le coût du 1 % du PIB pour le logement ni ses nouvelles recettes. Une partie de l’effort pourrait passer par des prêts ou par l’argent déjà prévu au plan national du logement 2026-2030 (7 Md€).',
      },
      pp: {
        nom: 'PP',
        titre: 'Parti populaire',
        date: 'Programme électoral pour le 29-N, 249 mesures (10 novembre 2026)',
        mesures: [
          'IVA à 0 % sur les aliments de base → taux super-réduit de 4 % à 0 %, soit −1,8 Md€. Le curseur touche aussi médicaments et livres ; les estimations passées vont de 1,2 à 1,9 Md€.',
          'Indexation du barème de l’IRPF et IRPF nul la première année pour les 18-35 ans, puis réduit de 75 %, 50 % et 25 % : non chiffrés. Repris avec le chiffrage de la baisse d’impôts proposée par le PP en juin 2026 (3,2 Md€) → −0,2 point de PIB de recettes.',
        ],
        nonModelise: [
          'Audit des comptes publics et économies annoncées : aucun montant publié.',
          'Aides à l’achat de logement, crèches gratuites de 0 à 3 ans : pas de chiffrage.',
        ],
        avis: 'Le programme n’a pas de mémoire économique chiffrant ses mesures. Le coût des baisses d’IRPF pour les jeunes dépend de l’impôt qu’ils payaient : il n’est pas estimé.',
      },
      vox: {
        nom: 'Vox',
        titre: 'Vox',
        date: 'Programme électoral pour le 29-N, 115 mesures (12 novembre 2026), chiffres du document économique de Vox de 2025',
        mesures: [
          'IRPF à deux taux de 15 et 25 % avec 22 000 € exonérés, 40 Md€ selon Vox → −2,3 points de PIB de recettes. Le ministère des Finances l’estime à 85 Md€.',
          'IVA général à 18 % et taux réduit abaissé, 14 Md€ selon Vox → taux de 21 % à 18 % et de 10 % à 8,5 %, soit −13,8 Md€.',
          'Impôt sur les sociétés, 10 Md€ selon Vox → taux de 25 % à 19 %, soit −9,6 Md€.',
          '180 Md€ par an de dépenses « non essentielles », surtout des transferts aux communautés autonomes, ramenés d’abord à 120 Md€ → 60 Md€ d’économies, atteints en 4 ans.',
        ],
        nonModelise: [
          'Deuxième étape, de 120 à 80 Md€ de transferts, et revue de 52 Md€ de subventions : pas de calendrier.',
          'Ces transferts financent pour l’essentiel la santé et l’éducation des communautés autonomes : le modèle ne répartit pas les économies par poste.',
        ],
        avis: 'Herqles évalue les trois baisses d’impôts à 64 Md€, soit 3,8 % du PIB. Interrogé sur le financement, Santiago Abascal a jugé le système exact « accessoire » et évoqué un recours temporaire à la dette.',
      },
      sumar: {
        nom: 'Sumar',
        titre: 'Sumar (Frente Amplio)',
        date: 'Programme du Frente Amplio pour le 29-N (novembre 2026)',
        mesures: [
          '1 % du PIB par an pour un parc public de 1,5 million de logements en 12 ans → 17,5 Md€ de dépenses nouvelles, atteints en 4 ans.',
          'Taux marginal de l’IRPF à 52 % au-delà de 300 000 € → dernière tranche de 47 % à 52 %.',
          'Impôt sur les grandes fortunes rendu permanent, avec des taux d’au moins 4 % (3,5 % aujourd’hui) → impôt plancher de 0,5 % sur les patrimoines de plus de 100 M€.',
        ],
        nonModelise: [
          'Taux effectif minimum de 20 % de l’impôt sur les sociétés, impôt d’État sur les successions de plus d’un million d’euros : pas de chiffrage publié.',
          'Réduction du temps de travail et hausse du SMI : sans montant ni calendrier dans les sources consultées.',
        ],
        avis: 'Le Frente Amplio veut que l’investissement public échappe aux règles européennes de 3 % de déficit et 60 % de dette. Une analyse indépendante évalue ses deux mesures phares à environ 20 Md€ par an ; les recettes annoncées sont celles du parti.',
      },
    },

    en: {
      titre: 'Party programmes',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'Programmes for the general election of 29 November 2026, translated into the simulator’s sliders. No party has published a full costing: amounts come from the parties themselves or from the press, and anything not costed is left out. Measures are added to the simulator’s baseline, as long-run effects in 2026 euros. Effects on growth are not modelled. The card disappears once a slider is changed.',
      psoe: {
        nom: 'PSOE',
        titre: 'Spanish Socialist Workers’ Party',
        date: 'Election programme for 29 November (15 November 2026)',
        mesures: [
          '1% of GDP a year for housing, with a public stock of 100,000 affordable homes → €17.5bn of new spending, reached over 4 years. This is an upper bound: the model counts all of it as new public spending.',
        ],
        nonModelise: [
          'TuCasa programme: a €10bn credit line (interest-free loans up to €50,000). These are loans, with no direct effect on the deficit.',
          'Higher taxes on “tech oligarchs”, child allowances in income tax, keeping the bank and energy levies: no published costing.',
        ],
        avis: 'The programme costs neither the 1% of GDP for housing nor its new revenue. Part of the effort could go through loans or through money already planned in the 2026-2030 national housing plan (€7bn).',
      },
      pp: {
        nom: 'PP',
        titre: 'People’s Party',
        date: 'Election programme for 29 November, 249 measures (10 November 2026)',
        mesures: [
          '0% VAT on basic food → super-reduced rate from 4% to 0%, i.e. −€1.8bn. The slider also covers medicines and books; past estimates range from €1.2bn to €1.9bn.',
          'Indexing income tax brackets and no income tax in the first year for 18-35 year-olds, then cut by 75%, 50% and 25%: not costed. Carried over using the costing of the tax cut the PP proposed in June 2026 (€3.2bn) → −0.2 points of GDP of revenue.',
        ],
        nonModelise: [
          'Audit of the public accounts and announced savings: no amount published.',
          'Home-purchase aid, free childcare from 0 to 3: no costing.',
        ],
        avis: 'The programme has no economic annex costing its measures. The cost of the youth income tax cuts depends on the tax they paid: it is not estimated.',
      },
      vox: {
        nom: 'Vox',
        titre: 'Vox',
        date: 'Election programme for 29 November, 115 measures (12 November 2026), figures from Vox’s 2025 economic document',
        mesures: [
          'Two-rate income tax of 15% and 25% with €22,000 exempt, €40bn according to Vox → −2.3 points of GDP of revenue. The Finance Ministry puts it at €85bn.',
          'Standard VAT at 18% and a lower reduced rate, €14bn according to Vox → rates from 21% to 18% and from 10% to 8.5%, i.e. −€13.8bn.',
          'Corporate tax, €10bn according to Vox → rate from 25% to 19%, i.e. −€9.6bn.',
          '€180bn a year of “non-essential” spending, mostly transfers to the regions, first brought down to €120bn → €60bn of savings, reached over 4 years.',
        ],
        nonModelise: [
          'Second step, from €120bn to €80bn of transfers, and a review of €52bn of subsidies: no timetable.',
          'These transfers mostly fund the regions’ health and education: the model does not allocate savings by function.',
        ],
        avis: 'Herqles puts the three tax cuts at €64bn, or 3.8% of GDP. Asked about funding, Santiago Abascal called the exact system “incidental” and mentioned temporary borrowing.',
      },
      sumar: {
        nom: 'Sumar',
        titre: 'Sumar (Frente Amplio)',
        date: 'Frente Amplio programme for 29 November (November 2026)',
        mesures: [
          '1% of GDP a year for a public stock of 1.5 million homes over 12 years → €17.5bn of new spending, reached over 4 years.',
          'Top income tax rate of 52% above €300,000 → top bracket from 47% to 52%.',
          'Permanent tax on large fortunes, with rates of at least 4% (3.5% today) → 0.5% minimum tax on fortunes above €100m.',
        ],
        nonModelise: [
          'Minimum effective corporate tax rate of 20%, state tax on inheritances above €1m: no published costing.',
          'Shorter working week and higher minimum wage: no amount or timetable in the sources consulted.',
        ],
        avis: 'The Frente Amplio wants public investment exempted from the EU rules of 3% deficit and 60% debt. An independent analysis puts its two flagship measures at about €20bn a year; the revenue figures are the party’s own.',
      },
    },

    es: {
      titre: 'Programas de los partidos',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Programas para las elecciones generales del 29 de noviembre de 2026, traducidos con los controles del simulador. Ningún partido ha publicado una cuantificación completa: los importes proceden de los propios partidos o de la prensa, y lo que no está cuantificado no se recoge. Las medidas se suman al tendencial del simulador, a largo plazo y en euros de 2026. No se modeliza su efecto sobre el crecimiento. Al mover un control, la ficha desaparece.',
      psoe: {
        nom: 'PSOE',
        titre: 'Partido Socialista Obrero Español',
        date: 'Programa electoral para el 29-N (15 de noviembre de 2026)',
        mesures: [
          'El 1 % del PIB al año para vivienda, con un parque público de 100.000 viviendas asequibles → 17,5 mil M€ de gasto nuevo, alcanzados en 4 años. Es un máximo: el modelo lo cuenta todo como gasto público nuevo.',
        ],
        nonModelise: [
          'Programa TuCasa: línea de crédito de 10.000 M€ (préstamos sin intereses de hasta 50.000 €). Son préstamos, sin efecto directo en el déficit.',
          'Más impuestos a los «tecnoligarcas», incentivos por hijo en el IRPF, mantenimiento de los impuestos a la banca y las energéticas: sin cuantificación publicada.',
        ],
        avis: 'El programa no cuantifica ni el coste del 1 % del PIB para vivienda ni sus nuevos ingresos. Parte del esfuerzo podría hacerse con préstamos o con fondos ya previstos en el Plan Estatal de Vivienda 2026-2030 (7.000 M€).',
      },
      pp: {
        nom: 'PP',
        titre: 'Partido Popular',
        date: 'Programa electoral para el 29-N, 249 medidas (10 de noviembre de 2026)',
        mesures: [
          'IVA del 0 % para los alimentos básicos → tipo superreducido del 4 % al 0 %, es decir −1,8 mil M€. El control incluye también medicamentos y libros; las estimaciones anteriores van de 1.200 a 1.900 M€.',
          'Deflactación de la tarifa del IRPF e IRPF cero el primer año para los jóvenes de 18 a 35 años, después rebajado un 75 %, un 50 % y un 25 %: sin cuantificar. Se recoge con la cifra de la rebaja fiscal propuesta por el PP en junio de 2026 (3.200 M€) → −0,2 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'Auditoría de las cuentas públicas y ahorros anunciados: sin importe publicado.',
          'Ayudas a la compra de vivienda, guarderías gratuitas de 0 a 3 años: sin cuantificar.',
        ],
        avis: 'El programa no incluye una memoria económica con el coste de sus medidas. El coste de las rebajas del IRPF para jóvenes depende de lo que pagaba cada uno: no está estimado.',
      },
      vox: {
        nom: 'Vox',
        titre: 'Vox',
        date: 'Programa electoral para el 29-N, 115 medidas (12 de noviembre de 2026), cifras del documento económico de Vox de 2025',
        mesures: [
          'IRPF con dos tipos del 15 % y el 25 % y 22.000 € exentos, 40.000 M€ según Vox → −2,3 puntos del PIB de ingresos. Hacienda lo cifra en 85.000 M€.',
          'IVA general al 18 % y rebaja del reducido, 14.000 M€ según Vox → tipos del 21 % al 18 % y del 10 % al 8,5 %, es decir −13,8 mil M€.',
          'Impuesto de sociedades, 10.000 M€ según Vox → tipo del 25 % al 19 %, es decir −9,6 mil M€.',
          '180.000 M€ al año de gasto «no esencial», sobre todo transferencias a las comunidades autónomas, reducidos primero a 120.000 M€ → 60 mil M€ de ahorros, alcanzados en 4 años.',
        ],
        nonModelise: [
          'Segunda fase, de 120.000 a 80.000 M€ de transferencias, y revisión de 52.000 M€ de subvenciones: sin calendario.',
          'Esas transferencias financian sobre todo la sanidad y la educación autonómicas: el modelo no reparte los ahorros por funciones.',
        ],
        avis: 'Herqles calcula que las tres rebajas suman 64.000 M€, el 3,8 % del PIB. Preguntado por la financiación, Santiago Abascal dijo que el sistema exacto es «accesorio» y planteó recurrir temporalmente a la deuda.',
      },
      sumar: {
        nom: 'Sumar',
        titre: 'Sumar (Frente Amplio)',
        date: 'Programa del Frente Amplio para el 29-N (noviembre de 2026)',
        mesures: [
          'El 1 % del PIB al año para un parque público de 1,5 millones de viviendas en 12 años → 17,5 mil M€ de gasto nuevo, alcanzados en 4 años.',
          'Tipo marginal del IRPF del 52 % desde 300.000 € → último tramo del 47 % al 52 %.',
          'Impuesto a las grandes fortunas permanente, con tipos de al menos el 4 % (hoy 3,5 %) → impuesto mínimo del 0,5 % sobre los patrimonios de más de 100 M€.',
        ],
        nonModelise: [
          'Tipo efectivo mínimo del 20 % en sociedades, impuesto estatal sobre herencias de más de un millón de euros: sin cuantificación publicada.',
          'Reducción de jornada y subida del SMI: sin importe ni calendario en las fuentes consultadas.',
        ],
        avis: 'El Frente Amplio quiere que la inversión pública no quede limitada por las reglas europeas del 3 % de déficit y el 60 % de deuda. Un análisis independiente cifra sus dos medidas principales en unos 20.000 M€ al año; las cifras de recaudación son del partido.',
      },
    },

    de: {
      titre: 'Parteiprogramme',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Programme zur Parlamentswahl am 29. November 2026, mit den Reglern des Simulators übersetzt. Keine Partei hat eine vollständige Kostenrechnung veröffentlicht: Die Beträge stammen von den Parteien selbst oder aus der Presse, nicht Beziffertes wird nicht übernommen. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, als langfristige Wirkung in Euro von 2026. Wachstumseffekte werden nicht modelliert. Sobald ein Regler verändert wird, verschwindet die Karte.',
      psoe: {
        nom: 'PSOE',
        titre: 'Spanische Sozialistische Arbeiterpartei',
        date: 'Wahlprogramm für den 29. November (15. November 2026)',
        mesures: [
          '1 % des BIP pro Jahr für Wohnen, mit einem öffentlichen Bestand von 100.000 bezahlbaren Wohnungen → 17,5 Mrd. € neue Ausgaben, in 4 Jahren erreicht. Das ist eine Obergrenze: Das Modell zählt alles als neue öffentliche Ausgabe.',
        ],
        nonModelise: [
          'Programm TuCasa: Kreditlinie von 10 Mrd. € (zinslose Darlehen bis 50.000 €). Es sind Darlehen ohne direkte Wirkung auf das Defizit.',
          'Höhere Steuern für „Tech-Oligarchen“, Kinderfreibeträge in der Einkommensteuer, Beibehaltung der Bank- und Energieabgaben: keine veröffentlichte Bezifferung.',
        ],
        avis: 'Das Programm beziffert weder die Kosten von 1 % des BIP für Wohnen noch die neuen Einnahmen. Ein Teil könnte über Darlehen oder bereits im staatlichen Wohnungsplan 2026-2030 (7 Mrd. €) vorgesehene Mittel laufen.',
      },
      pp: {
        nom: 'PP',
        titre: 'Volkspartei (Partido Popular)',
        date: 'Wahlprogramm für den 29. November, 249 Maßnahmen (10. November 2026)',
        mesures: [
          '0 % Mehrwertsteuer auf Grundnahrungsmittel → stark ermäßigter Satz von 4 % auf 0 %, also −1,8 Mrd. €. Der Regler erfasst auch Arzneimittel und Bücher; frühere Schätzungen liegen bei 1,2 bis 1,9 Mrd. €.',
          'Inflationsausgleich im Einkommensteuertarif und keine Einkommensteuer im ersten Jahr für 18- bis 35-Jährige, danach um 75 %, 50 % und 25 % gesenkt: nicht beziffert. Übernommen mit der Bezifferung der Steuersenkung, die die PP im Juni 2026 vorschlug (3,2 Mrd. €) → −0,2 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Prüfung der öffentlichen Finanzen und angekündigte Einsparungen: kein Betrag veröffentlicht.',
          'Hilfen beim Wohnungskauf, kostenlose Kinderbetreuung von 0 bis 3 Jahren: nicht beziffert.',
        ],
        avis: 'Das Programm enthält keinen Finanzanhang mit den Kosten der Maßnahmen. Die Kosten der Steuersenkung für junge Menschen hängen von ihrer bisherigen Steuer ab und sind nicht geschätzt.',
      },
      vox: {
        nom: 'Vox',
        titre: 'Vox',
        date: 'Wahlprogramm für den 29. November, 115 Maßnahmen (12. November 2026), Zahlen aus dem Wirtschaftspapier von Vox von 2025',
        mesures: [
          'Einkommensteuer mit zwei Sätzen von 15 % und 25 % und 22.000 € steuerfrei, 40 Mrd. € laut Vox → −2,3 BIP-Punkte Einnahmen. Das Finanzministerium beziffert sie auf 85 Mrd. €.',
          'Mehrwertsteuer-Regelsatz 18 % und niedrigerer ermäßigter Satz, 14 Mrd. € laut Vox → Sätze von 21 % auf 18 % und von 10 % auf 8,5 %, also −13,8 Mrd. €.',
          'Körperschaftsteuer, 10 Mrd. € laut Vox → Satz von 25 % auf 19 %, also −9,6 Mrd. €.',
          '180 Mrd. € pro Jahr „nicht wesentlicher“ Ausgaben, vor allem Transfers an die Regionen, zunächst auf 120 Mrd. € gesenkt → 60 Mrd. € Einsparungen, in 4 Jahren erreicht.',
        ],
        nonModelise: [
          'Zweiter Schritt von 120 auf 80 Mrd. € Transfers und Überprüfung von 52 Mrd. € Subventionen: ohne Zeitplan.',
          'Diese Transfers finanzieren vor allem Gesundheit und Bildung der Regionen: Das Modell verteilt die Einsparungen nicht auf Bereiche.',
        ],
        avis: 'Herqles beziffert die drei Steuersenkungen auf 64 Mrd. €, 3,8 % des BIP. Auf die Finanzierung angesprochen, nannte Santiago Abascal das genaue System „nebensächlich“ und brachte eine vorübergehende Verschuldung ins Spiel.',
      },
      sumar: {
        nom: 'Sumar',
        titre: 'Sumar (Frente Amplio)',
        date: 'Programm des Frente Amplio für den 29. November (November 2026)',
        mesures: [
          '1 % des BIP pro Jahr für einen öffentlichen Bestand von 1,5 Millionen Wohnungen in 12 Jahren → 17,5 Mrd. € neue Ausgaben, in 4 Jahren erreicht.',
          'Einkommensteuer-Spitzensatz von 52 % ab 300.000 € → oberste Stufe von 47 % auf 52 %.',
          'Dauerhafte Steuer auf große Vermögen mit Sätzen von mindestens 4 % (heute 3,5 %) → Mindeststeuer von 0,5 % auf Vermögen über 100 Mio. €.',
        ],
        nonModelise: [
          'Effektiver Mindestsatz von 20 % bei der Körperschaftsteuer, staatliche Erbschaftsteuer ab einer Million Euro: keine veröffentlichte Bezifferung.',
          'Arbeitszeitverkürzung und höherer Mindestlohn: ohne Betrag oder Zeitplan in den Quellen.',
        ],
        avis: 'Der Frente Amplio will öffentliche Investitionen von den EU-Regeln (3 % Defizit, 60 % Schulden) ausnehmen. Eine unabhängige Analyse beziffert die zwei Kernmaßnahmen auf etwa 20 Mrd. € pro Jahr; die Einnahmezahlen stammen von der Partei.',
      },
    },
  };

  return { liste, textes };
});

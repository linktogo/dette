// Sources du modèle autrichien (consultées en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: 'Statistik Austria, Öffentliche Finanzen 2025',
      url: 'https://www.statistik.at/fileadmin/announcement/2026/03/20260331OEffentlicheFinanzen2025.pdf',
      chiffre: {
        fr: 'Déficit de 21,5 Md€ en 2025, soit 4,2 % du PIB (4,6 % en 2024) ; dette de 418,1 Md€, soit 81,5 % du PIB ; recettes de 261,5 Md€.',
        en: 'Deficit of €21.5bn in 2025, i.e. 4.2% of GDP (4.6% in 2024); debt of €418.1bn, i.e. 81.5% of GDP; revenue of €261.5bn.',
        es: 'Déficit de 21,5 mil M€ en 2025, el 4,2 % del PIB (4,6 % en 2024); deuda de 418,1 mil M€, el 81,5 % del PIB; ingresos de 261,5 mil M€.',
        de: 'Defizit von 21,5 Mrd. € im Jahr 2025, also 4,2 % des BIP (4,6 % im Jahr 2024); Schulden von 418,1 Mrd. €, also 81,5 % des BIP; Einnahmen von 261,5 Mrd. €.',
      },
      usage: usage('Point de départ de la projection.', 'Starting point of the projection.', 'Punto de partida de la proyección.', 'Ausgangspunkt der Projektion.'),
    },
    {
      nom: { fr: 'Fiskalrat, prévision d’automne 2026, via ORF', en: 'Fiscal Council, autumn 2026 forecast, via ORF', es: 'Consejo Fiscal, previsión de otoño de 2026, vía ORF', de: 'Fiskalrat, Herbstprognose 2026, über ORF' },
      url: 'https://orf.at/stories/3445941/',
      chiffre: {
        fr: 'Déficit de 4,0 % du PIB en 2026 et 3,6 % en 2027 ; dette de 80,7 % en 2025 portée à 83,6 % en 2027 (83,2 % selon le ministère) ; intérêts de 1,7 % du PIB en 2025, 2,0 % en 2026.',
        en: 'Deficit of 4.0% of GDP in 2026 and 3.6% in 2027; debt of 80.7% in 2025 rising to 83.6% in 2027 (83.2% according to the ministry); interest of 1.7% of GDP in 2025, 2.0% in 2026.',
        es: 'Déficit del 4,0 % del PIB en 2026 y del 3,6 % en 2027; deuda del 80,7 % en 2025 que sube al 83,6 % en 2027 (83,2 % según el ministerio); intereses del 1,7 % del PIB en 2025 y del 2,0 % en 2026.',
        de: 'Defizit von 4,0 % des BIP im Jahr 2026 und 3,6 % im Jahr 2027; Schuldenquote von 80,7 % 2025 steigt auf 83,6 % 2027 (83,2 % laut Ministerium); Zinsen von 1,7 % des BIP 2025, 2,0 % 2026.',
      },
      usage: usage('Déficit et intérêts de départ.', 'Starting deficit and interest.', 'Déficit e intereses de partida.', 'Defizit und Zinsen zu Beginn.'),
    },
    {
      nom: { fr: 'Fiskalrat, recommandations de juin 2026', en: 'Fiscal Council, June 2026 recommendations', es: 'Consejo Fiscal, recomendaciones de junio de 2026', de: 'Fiskalrat, Empfehlungen Juni 2026' },
      url: 'https://www.fiskalrat.at/dam/jcr:4d506173-a45e-4776-a0a9-d9f305414cc3/Empfehlungen-Juni%202026-Web.pdf',
      chiffre: {
        fr: 'Malgré les mesures de consolidation, dette attendue à 88,0 % du PIB fin 2030 ; un déficit moyen de 2,5 % au plus serait nécessaire pour la stabiliser.',
        en: 'Despite the consolidation measures, debt expected at 88.0% of GDP at end-2030; an average deficit of at most 2.5% would be needed to stabilise it.',
        es: 'Pese a las medidas de consolidación, deuda prevista del 88,0 % del PIB a finales de 2030; haría falta un déficit medio de como máximo el 2,5 % para estabilizarla.',
        de: 'Trotz der Konsolidierungsmaßnahmen wird für Ende 2030 eine Schuldenquote von 88,0 % erwartet; zur Stabilisierung wäre ein durchschnittliches Defizit von höchstens 2,5 % nötig.',
      },
      usage: usage('Vraisemblance du tendanciel.', 'Plausibility of the baseline.', 'Verosimilitud del tendencial.', 'Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'Service parlementaire du budget, rapport 2026', en: 'Parliamentary Budget Office, 2026 report', es: 'Servicio presupuestario del Parlamento, informe de 2026', de: 'Budgetdienst des Parlaments, Bericht 2026' },
      url: 'https://www.parlament.gv.at/dokument/budgetdienst/europaeisches-semester/BD-UeD-Bericht-2026.pdf',
      chiffre: {
        fr: 'Prévision du ministère des Finances d’octobre 2026 : dette de 82,4 % du PIB en 2026.',
        en: 'Finance Ministry forecast of October 2026: debt of 82.4% of GDP in 2026.',
        es: 'Previsión del Ministerio de Finanzas de octubre de 2026: deuda del 82,4 % del PIB en 2026.',
        de: 'Prognose des Finanzministeriums vom Oktober 2026: Schuldenquote von 82,4 % des BIP im Jahr 2026.',
      },
      usage: usage('Dette de départ fin 2026.', 'Starting debt at end-2026.', 'Deuda de partida a finales de 2026.', 'Schulden zu Beginn Ende 2026.'),
    },
    {
      nom: { fr: 'AMS, marché du travail en octobre 2026, via news.at', en: 'AMS, labour market in October 2026, via news.at', es: 'AMS, mercado laboral en octubre de 2026, vía news.at', de: 'AMS, Arbeitsmarkt im Oktober 2026, über news.at' },
      url: 'https://www.news.at/wirtschaft/arbeitslosigkeit-oktober-2026-oesterreich-bundeslaender-ams',
      chiffre: {
        fr: 'Taux de chômage de 7,3 % (définition nationale), 389 941 personnes au chômage ou en formation ; 6,3 % au sens d’Eurostat en septembre.',
        en: 'Unemployment rate of 7.3% (national definition), 389,941 people unemployed or in training; 6.3% on Eurostat’s definition in September.',
        es: 'Tasa de paro del 7,3 % (definición nacional), 389 941 personas en paro o en formación; 6,3 % según Eurostat en septiembre.',
        de: 'Arbeitslosenquote von 7,3 % (nationale Definition), 389 941 Personen arbeitslos oder in Schulung; 6,3 % nach Eurostat im September.',
      },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
    {
      nom: { fr: 'Statistik Austria, emploi des femmes de 60 à 64 ans, via 5min.at', en: 'Statistik Austria, employment of women aged 60-64, via 5min.at', es: 'Statistik Austria, empleo de las mujeres de 60 a 64 años, vía 5min.at', de: 'Statistik Austria, Erwerbstätigkeit der Frauen von 60 bis 64, über 5min.at' },
      url: 'https://www.5min.at/oesterreich/5202606041230/aufgrund-erhoehung-des-pensionsantrittsalters-jede-dritte-frau-von-60-64-erwerbstaetig/',
      chiffre: {
        fr: 'L’âge de la retraite des femmes est relevé d’une demi-année par an depuis 2024 ; le taux d’emploi des femmes de 60 à 64 ans est passé de 18,7 % à 32,2 %.',
        en: 'The women’s retirement age has been raised by half a year each year since 2024; the employment rate of women aged 60-64 rose from 18.7% to 32.2%.',
        es: 'La edad de jubilación de las mujeres sube medio año cada año desde 2024; la tasa de empleo de las mujeres de 60 a 64 años pasó del 18,7 % al 32,2 %.',
        de: 'Das Pensionsantrittsalter der Frauen steigt seit 2024 jährlich um ein halbes Jahr; die Erwerbstätigenquote der 60- bis 64-jährigen Frauen stieg von 18,7 % auf 32,2 %.',
      },
      usage: usage('Groupe « Retraites ».', '“Pensions” group.', 'Grupo «Pensiones».', 'Gruppe „Renten“.'),
    },
  ];
});

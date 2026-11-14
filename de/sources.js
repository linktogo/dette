// Sources du modèle allemand (consultées en novembre 2026). Seules celles qui
// alimentent le modèle figurent ici ; les autres chiffres sont des estimations de
// l'application, signalées comme telles dans l'interface.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  return [
    {
      nom: {
        fr: 'Bundesbank, dette publique allemande 2025',
        en: 'Bundesbank, German government debt 2025',
        es: 'Bundesbank, deuda pública alemana 2025',
        de: 'Bundesbank, Deutsche Staatsschulden 2025',
      },
      url: 'https://www.bundesbank.de/de/aufgaben/themen/deutsche-staatsschulden-wachsen-2025-um-144-milliarden-euro--992732',
      chiffre: {
        fr: 'Dette de Maastricht : 2 838 Md€ fin 2025, soit 63,5 % du PIB (62,5 % en 2024), en hausse de 144 Md€.',
        en: 'Maastricht debt: €2,838bn at end-2025, i.e. 63.5% of GDP (62.5% in 2024), up €144bn.',
        es: 'Deuda según Maastricht: 2838 mil M€ a finales de 2025, el 63,5 % del PIB (62,5 % en 2024), 144 mil M€ más.',
        de: 'Maastricht-Schulden: 2 838 Mrd. € Ende 2025, also 63,5 % des BIP (62,5 % im Jahr 2024), ein Plus von 144 Mrd. €.',
      },
      usage: { fr: 'Point de départ de la projection.', en: 'Starting point of the projection.', es: 'Punto de partida de la proyección.', de: 'Ausgangspunkt der Projektion.' },
    },
    {
      nom: {
        fr: 'Destatis, déficit public 2025, via Vergabeblog',
        en: 'Destatis, 2025 government deficit, via Vergabeblog',
        es: 'Destatis, déficit público 2025, vía Vergabeblog',
        de: 'Destatis, Staatsdefizit 2025, über Vergabeblog',
      },
      url: 'https://vergabeblog.de/2026-03-06/staatsdefizit-erhoeht-sich-im-jahr-2025-leicht-auf-1191-milliarden-euro/',
      chiffre: {
        fr: 'Déficit de 119,1 Md€ (2,7 % du PIB). Dépenses 2 259,3 Md€ (50,3 % du PIB), recettes 2 140,2 Md€.',
        en: 'Deficit of €119.1bn (2.7% of GDP). Spending €2,259.3bn (50.3% of GDP), revenue €2,140.2bn.',
        es: 'Déficit de 119,1 mil M€ (2,7 % del PIB). Gasto de 2259,3 mil M€ (50,3 % del PIB), ingresos de 2140,2 mil M€.',
        de: 'Defizit von 119,1 Mrd. € (2,7 % des BIP). Ausgaben 2 259,3 Mrd. € (Staatsquote 50,3 %), Einnahmen 2 140,2 Mrd. €.',
      },
      usage: { fr: 'Recettes et dépenses de départ.', en: 'Starting revenue and spending.', es: 'Ingresos y gasto de partida.', de: 'Einnahmen und Ausgaben zu Beginn.' },
    },
    {
      nom: {
        fr: 'Destatis, déficit public au 1er semestre 2026',
        en: 'Destatis, government deficit in the first half of 2026',
        es: 'Destatis, déficit público en el primer semestre de 2026',
        de: 'Destatis, Staatsdefizit im 1. Halbjahr 2026',
      },
      url: 'https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/08/PD26_305_813.html',
      chiffre: {
        fr: 'Déficit de 71,3 Md€ au premier semestre 2026, en nette hausse.',
        en: 'Deficit of €71.3bn in the first half of 2026, sharply higher.',
        es: 'Déficit de 71,3 mil M€ en el primer semestre de 2026, en clara subida.',
        de: 'Defizit von 71,3 Mrd. € im ersten Halbjahr 2026, deutlich höher.',
      },
      usage: { fr: 'Contrôle de cohérence du déficit 2026.', en: 'Consistency check of the 2026 deficit.', es: 'Control de coherencia del déficit de 2026.', de: 'Plausibilitätsprüfung des Defizits 2026.' },
    },
    {
      nom: {
        fr: 'Ministère fédéral des Finances, 35e séance du Stabilitätsrat (mai 2026)',
        en: 'Federal Ministry of Finance, 35th meeting of the Stability Council (May 2026)',
        es: 'Ministerio Federal de Finanzas, 35.ª reunión del Consejo de Estabilidad (mayo de 2026)',
        de: 'Bundesministerium der Finanzen, 35. Sitzung des Stabilitätsrats (Mai 2026)',
      },
      url: 'https://www.bundesfinanzministerium.de/Content/DE/Pressemitteilungen/Finanzpolitik/2026/05/2026-05-11-35-sitzung-des-stabilitaetsrats.html',
      chiffre: {
        fr: 'Le plafond de 3 % du PIB pourrait être dépassé. Selon la presse : déficit d’environ 4,25 % et dette de 66,5 % du PIB en 2026.',
        en: 'The 3%-of-GDP ceiling could be exceeded. According to press reports: deficit of about 4.25% and debt of 66.5% of GDP in 2026.',
        es: 'El límite del 3 % del PIB podría superarse. Según la prensa: déficit de en torno al 4,25 % y deuda del 66,5 % del PIB en 2026.',
        de: 'Die Obergrenze von 3 % des BIP könnte überschritten werden. Laut Presseberichten: Defizit von rund 4,25 % und Schulden von 66,5 % des BIP im Jahr 2026.',
      },
      usage: { fr: 'Dette et déficit de départ (fin 2026).', en: 'Starting debt and deficit (end-2026).', es: 'Deuda y déficit de partida (finales de 2026).', de: 'Schulden und Defizit zu Beginn (Ende 2026).' },
    },
    {
      nom: {
        fr: 'Conseil consultatif du Stabilitätsrat, projection d’octobre 2025',
        en: 'Stability Council advisory board, October 2025 projection',
        es: 'Consejo asesor del Consejo de Estabilidad, proyección de octubre de 2025',
        de: 'Beirat des Stabilitätsrats, Projektion vom Oktober 2025',
      },
      url: 'https://www.steuerzahler.de/fileadmin/user_upload/Dateien/2025/20251007_Beschluss_Einhaltung_Europaeischer_Fiskalregeln.pdf',
      chiffre: {
        fr: 'Dette de Maastricht attendue autour de 65 % du PIB fin 2025, puis environ 80 ¼ % en 2029 ; déficit au-dessus de 3 % en 2026 et 2027.',
        en: 'Maastricht debt expected at around 65% of GDP at end-2025, then about 80¼% in 2029; deficit above 3% in 2026 and 2027.',
        es: 'Deuda según Maastricht prevista en torno al 65 % del PIB a finales de 2025 y en torno al 80 ¼ % en 2029; déficit por encima del 3 % en 2026 y 2027.',
        de: 'Maastricht-Schulden Ende 2025 bei rund 65 % des BIP erwartet, 2029 bei etwa 80 ¼ %; Defizit 2026 und 2027 über 3 %.',
      },
      usage: { fr: 'Vraisemblance du tendanciel.', en: 'Plausibility of the baseline.', es: 'Verosimilitud del tendencial.', de: 'Plausibilität des Basisszenarios.' },
    },
    {
      nom: {
        fr: 'Wirtschaftsdienst, « Steigende Zinssätze » (octobre 2026)',
        en: 'Wirtschaftsdienst, “Steigende Zinssätze” (October 2026)',
        es: 'Wirtschaftsdienst, «Steigende Zinssätze» (octubre de 2026)',
        de: 'Wirtschaftsdienst, „Steigende Zinssätze: schmerzhafte Normalisierung“ (Oktober 2026)',
      },
      url: 'https://www.wirtschaftsdienst.eu/inhalt/jahr/2026/heft/10/beitrag/steigende-zinssaetze-schmerzhafte-normalisierung.html',
      chiffre: {
        fr: 'Charge d’intérêts de l’ensemble des administrations : 1,1 % du PIB en 2025.',
        en: 'General government interest bill: 1.1% of GDP in 2025.',
        es: 'Gasto en intereses del conjunto de las administraciones: 1,1 % del PIB en 2025.',
        de: 'Gesamtstaatliche Zinsausgaben: 1,1 % des BIP im Jahr 2025.',
      },
      usage: { fr: 'Intérêts de départ.', en: 'Starting interest.', es: 'Intereses de partida.', de: 'Zinsen zu Beginn.' },
    },
    {
      nom: {
        fr: 'Gouvernement fédéral, questions-réponses sur le budget 2026, et analyse IMI',
        en: 'Federal government, Q&A on the 2026 budget, and IMI analysis',
        es: 'Gobierno federal, preguntas y respuestas sobre el presupuesto 2026, y análisis del IMI',
        de: 'Bundesregierung, Fragen und Antworten zum Bundeshaushalt 2026, und IMI-Analyse',
      },
      url: 'https://www.bundesregierung.de/breg-de/aktuelles/bundeshaushalt-2026-2374030',
      chiffre: {
        fr: 'Fonds spécial Infrastructure et neutralité climatique : 500 Md€ sur 12 ans, 37,2 Md€ en 2025 et 57,9 Md€ en 2026. Défense au sens de l’OTAN : environ 2,4 % du PIB en 2025, 2,83 % en 2026, 3,5 % visés en 2029.',
        en: 'Infrastructure and climate neutrality special fund: €500bn over 12 years, €37.2bn in 2025 and €57.9bn in 2026. Defence on NATO’s definition: about 2.4% of GDP in 2025, 2.83% in 2026, 3.5% targeted for 2029.',
        es: 'Fondo especial de infraestructuras y neutralidad climática: 500 mil M€ en 12 años, 37,2 mil M€ en 2025 y 57,9 mil M€ en 2026. Defensa según la OTAN: en torno al 2,4 % del PIB en 2025, 2,83 % en 2026 y un 3,5 % previsto para 2029.',
        de: 'Sondervermögen Infrastruktur und Klimaneutralität: 500 Mrd. € über 12 Jahre, 37,2 Mrd. € im Jahr 2025 und 57,9 Mrd. € im Jahr 2026. Verteidigung nach NATO-Definition: etwa 2,4 % des BIP 2025, 2,83 % 2026, 3,5 % für 2029 angestrebt.',
      },
      usage: { fr: 'Curseurs « fonds spécial » et « trajectoire de défense ».', en: '“Special fund” and “defence path” sliders.', es: 'Controles «fondo especial» y «senda de defensa».', de: 'Regler „Sondervermögen“ und „Verteidigungspfad“.' },
    },
    {
      nom: {
        fr: 'ZDF, effets d’une hausse de la TVA',
        en: 'ZDF, effects of a VAT increase',
        es: 'ZDF, efectos de una subida del IVA',
        de: 'ZDF, Folgen einer höheren Mehrwertsteuer',
      },
      url: 'https://www.zdfheute.de/politik/deutschland/mehrwertsteuer-erhoehung-deutschland-inflation-entlastung-100.html',
      chiffre: {
        fr: 'Un point de TVA au taux normal : environ 15 à 16 Md€ pour l’ensemble des administrations (8 Md€ pour l’État fédéral). Ramener le taux réduit de 7 à 4 % coûterait environ 7 Md€.',
        en: 'One point on the standard VAT rate: about €15-16bn for all levels of government (€8bn for the federal government). Cutting the reduced rate from 7% to 4% would cost about €7bn.',
        es: 'Un punto del tipo general de IVA: unos 15-16 mil M€ para el conjunto de las administraciones (8 mil M€ para el Estado federal). Bajar el tipo reducido del 7 al 4 % costaría unos 7 mil M€.',
        de: 'Ein Punkt beim Regelsatz: etwa 15 bis 16 Mrd. € für alle staatlichen Ebenen (8 Mrd. € für den Bund). Den ermäßigten Satz von 7 auf 4 % zu senken, kostete etwa 7 Mrd. €.',
      },
      usage: { fr: 'Curseurs « TVA ».', en: '“VAT” sliders.', es: 'Controles «IVA».', de: 'Regler „Mehrwertsteuer“.' },
    },
    {
      nom: {
        fr: 'Bundestag, réponse du gouvernement sur le taux supérieur (hib 87/2025)',
        en: 'Bundestag, government answer on the top rate (hib 87/2025)',
        es: 'Bundestag, respuesta del Gobierno sobre el tipo superior (hib 87/2025)',
        de: 'Bundestag, Antwort der Bundesregierung zum Spitzensteuersatz (hib 87/2025)',
      },
      url: 'https://www.bundestag.de/presse/hib/kurzmeldungen-1050526',
      chiffre: {
        fr: 'Taux supérieur porté de 42 à 45 % : 14 Md€ de recettes en plus ; taux des hauts revenus de 45 à 48 % : environ 3 Md€.',
        en: 'Top rate raised from 42% to 45%: €14bn of extra revenue; high-income rate from 45% to 48%: about €3bn.',
        es: 'Tipo superior del 42 al 45 %: 14 mil M€ más de ingresos; tipo de las rentas altas del 45 al 48 %: unos 3 mil M€.',
        de: 'Spitzensteuersatz von 42 auf 45 %: 14 Mrd. € Mehreinnahmen; Reichensteuer von 45 auf 48 %: etwa 3 Mrd. €.',
      },
      usage: { fr: 'Curseurs « impôt sur le revenu ».', en: '“Income tax” sliders.', es: 'Controles «impuesto sobre la renta».', de: 'Regler „Einkommensteuer“.' },
    },
    {
      nom: {
        fr: 'Bundestag, projet de loi sur le paquet retraites 2025 (21/1929)',
        en: 'Bundestag, 2025 pension package bill (21/1929)',
        es: 'Bundestag, proyecto de ley del paquete de pensiones 2025 (21/1929)',
        de: 'Bundestag, Gesetzentwurf Rentenpaket 2025 (Drucksache 21/1929)',
      },
      url: 'https://dserver.bundestag.de/btd/21/019/2101929.pdf',
      chiffre: {
        fr: 'Niveau des pensions maintenu à 48 % jusqu’au 1er juillet 2031 ; coût d’environ 9,3 Md€, puis 11 Md€ en 2031, porté par le budget fédéral. Cotisation de 18,6 % appelée à monter vers 20 % à partir de 2028 selon les projections.',
        en: 'Pension level held at 48% until 1 July 2031; cost of about €9.3bn, then €11bn in 2031, borne by the federal budget. The 18.6% contribution rate is projected to rise towards 20% from 2028.',
        es: 'Nivel de las pensiones mantenido en el 48 % hasta el 1 de julio de 2031; coste de unos 9,3 mil M€ y de 11 mil M€ en 2031, a cargo del presupuesto federal. Según las proyecciones, la cotización del 18,6 % subiría hacia el 20 % a partir de 2028.',
        de: 'Rentenniveau bis zum 1. Juli 2031 bei 48 %; Kosten von etwa 9,3 Mrd. €, 2031 dann 11 Mrd. €, getragen vom Bundeshaushalt. Der Beitragssatz von 18,6 % soll laut Projektionen ab 2028 gegen 20 % steigen.',
      },
      usage: { fr: 'Groupe « Retraites ».', en: '“Pensions” group.', es: 'Grupo «Pensiones».', de: 'Gruppe „Renten“.' },
    },
    {
      nom: {
        fr: 'Bundesagentur für Arbeit, marché du travail en octobre 2026',
        en: 'Federal Employment Agency, labour market in October 2026',
        es: 'Agencia Federal de Empleo, mercado laboral en octubre de 2026',
        de: 'Bundesagentur für Arbeit, Arbeitsmarkt im Oktober 2026',
      },
      url: 'https://www.arbeitsagentur.de/presse/2026-41-arbeitsmarkt-im-oktober-2026',
      chiffre: {
        fr: '2,955 millions de chômeurs, taux de 6,3 %.',
        en: '2.955 million unemployed, a rate of 6.3%.',
        es: '2,955 millones de parados, una tasa del 6,3 %.',
        de: '2,955 Millionen Arbeitslose, Quote 6,3 %.',
      },
      usage: { fr: 'Curseur « taux de chômage ».', en: '“Unemployment rate” slider.', es: 'Control «tasa de paro».', de: 'Regler „Arbeitslosenquote“.' },
    },
    {
      nom: {
        fr: 'Commission du salaire minimum, décision du 27 juin 2025, via ETL',
        en: 'Minimum Wage Commission, decision of 27 June 2025, via ETL',
        es: 'Comisión del Salario Mínimo, decisión del 27 de junio de 2025, vía ETL',
        de: 'Mindestlohnkommission, Beschluss vom 27. Juni 2025, über ETL',
      },
      url: 'https://www.etl.de/aktuelles/mindestlohn-steigt-2026-und-2027/',
      chiffre: {
        fr: 'Salaire minimum de 12,82 € porté à 13,90 € au 1er janvier 2026, puis à 14,60 € au 1er janvier 2027.',
        en: 'Minimum wage raised from €12.82 to €13.90 on 1 January 2026, then to €14.60 on 1 January 2027.',
        es: 'Salario mínimo elevado de 12,82 € a 13,90 € el 1 de enero de 2026 y a 14,60 € el 1 de enero de 2027.',
        de: 'Mindestlohn von 12,82 € auf 13,90 € zum 1. Januar 2026, dann auf 14,60 € zum 1. Januar 2027.',
      },
      usage: { fr: 'Curseurs « salaire minimum ». Rendements par point estimés par l’application.', en: '“Minimum wage” sliders. Per-point yields estimated by the app.', es: 'Controles «salario mínimo». Rendimientos por punto estimados por la aplicación.', de: 'Regler „Mindestlohn“. Erträge je Punkt von der Anwendung geschätzt.' },
    },
    {
      nom: 'Destatis, 15. koordinierte Bevölkerungsvorausberechnung',
      url: 'https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Bevoelkerungsvorausberechnung/_inhalt.html',
      chiffre: {
        fr: '83,6 millions d’habitants en 2026 ; population quasi stable d’ici 2036 (variante moyenne).',
        en: '83.6 million inhabitants in 2026; population roughly stable to 2036 (central variant).',
        es: '83,6 millones de habitantes en 2026; población casi estable hasta 2036 (variante central).',
        de: '83,6 Millionen Einwohner 2026; Bevölkerung bis 2036 nahezu stabil (mittlere Variante).',
      },
      usage: { fr: 'Indicateurs par habitant (dette, intérêts, dépenses par poste), sans effet sur la trajectoire.', en: 'Per-person indicators (debt, interest, spending by function), with no effect on the trajectory.', es: 'Indicadores por habitante (deuda, intereses, gasto por función), sin efecto en la trayectoria.', de: 'Pro-Kopf-Kennzahlen (Schulden, Zinsen, Ausgaben nach Aufgaben), ohne Einfluss auf den Pfad.' },
    },
  ];
});

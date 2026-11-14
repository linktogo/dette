// Sources du modèle britannique (consultées en novembre 2026). Seules celles qui
// alimentent le modèle figurent ici ; les autres chiffres sont des estimations de
// l'application, signalées comme telles dans l'interface.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  return [
    {
      nom: {
        fr: 'OBR, commentaire sur les finances publiques de mars 2026',
        en: 'OBR, public finances commentary, March 2026',
        es: 'OBR, comentario sobre las finanzas públicas de marzo de 2026',
        de: 'OBR, Kommentar zu den öffentlichen Finanzen, März 2026',
      },
      url: 'https://obr.uk/docs/c70cb44b22c00a610/PSF-commentary-March-2026.pdf',
      chiffre: {
        fr: 'Emprunt du secteur public de 132,0 Md£ en 2025-26 (4,3 % du PIB), en baisse de 19,8 Md£ sur un an.',
        en: 'Public sector net borrowing of £132.0bn in 2025-26 (4.3% of GDP), down £19.8bn on the year.',
        es: 'Endeudamiento neto del sector público de 132,0 mil M£ en 2025-26 (4,3 % del PIB), 19,8 mil M£ menos que un año antes.',
        de: 'Nettokreditaufnahme des öffentlichen Sektors von 132,0 Mrd. £ im Jahr 2025-26 (4,3 % des BIP), 19,8 Mrd. £ weniger als im Vorjahr.',
      },
      usage: { fr: 'Point de départ de la projection.', en: 'Starting point of the projection.', es: 'Punto de partida de la proyección.', de: 'Ausgangspunkt der Projektion.' },
    },
    {
      nom: {
        fr: 'ICAEW, résultats de fin d’exercice 2025-26',
        en: 'ICAEW, end-of-year numbers for 2025-26',
        es: 'ICAEW, resultados de cierre del ejercicio 2025-26',
        de: 'ICAEW, Jahresabschlusszahlen 2025-26',
      },
      url: 'https://www.icaew.com/insights/viewpoints-on-the-news/2026/apr-2026/end-of-year-numbers-show-uk-deficit-lower-than-expected',
      chiffre: {
        fr: 'Dette nette du secteur public : 93,8 % du PIB au 31 mars 2026 (93,2 % un an plus tôt) ; dette brute : 3 422 Md£.',
        en: 'Public sector net debt: 93.8% of GDP at 31 March 2026 (93.2% a year earlier); gross debt: £3,422bn.',
        es: 'Deuda neta del sector público: 93,8 % del PIB a 31 de marzo de 2026 (93,2 % un año antes); deuda bruta: 3422 mil M£.',
        de: 'Nettoschulden des öffentlichen Sektors: 93,8 % des BIP am 31. März 2026 (93,2 % ein Jahr zuvor); Bruttoschulden: 3 422 Mrd. £.',
      },
      usage: { fr: 'Dernier chiffre mesuré de la dette.', en: 'Latest debt outturn.', es: 'Último dato observado de la deuda.', de: 'Letzter gemessener Schuldenstand.' },
    },
    {
      nom: {
        fr: 'Sarasin & Partners, « Budget 2026 : higher inflation, narrower margins »',
        en: 'Sarasin & Partners, “Budget 2026: higher inflation, narrower margins”',
        es: 'Sarasin & Partners, «Budget 2026: higher inflation, narrower margins»',
        de: 'Sarasin & Partners, „Budget 2026: higher inflation, narrower margins“',
      },
      url: 'https://sarasinandpartners.com/our-thinking/budget-2026-higher-inflation-narrower-margins/',
      chiffre: {
        fr: 'Prévisions de l’OBR d’octobre 2026 : emprunt de 4,2 % du PIB (133 Md£) en 2026-27, ramené à 1,8 % (67 Md£) en 2030-31 ; intérêts de 109 Md£ en 2025-26, 160 Md£ en 2031-32 ; marge de 15 Md£ sur la règle budgétaire ; croissance de 1,2 % en 2026 et 1,0 % en 2027.',
        en: 'OBR October 2026 forecast: borrowing of 4.2% of GDP (£133bn) in 2026-27, falling to 1.8% (£67bn) in 2030-31; debt interest of £109bn in 2025-26, £160bn in 2031-32; £15bn headroom against the fiscal rule; growth of 1.2% in 2026 and 1.0% in 2027.',
        es: 'Previsiones de la OBR de octubre de 2026: endeudamiento del 4,2 % del PIB (133 mil M£) en 2026-27, que baja al 1,8 % (67 mil M£) en 2030-31; intereses de 109 mil M£ en 2025-26 y 160 mil M£ en 2031-32; margen de 15 mil M£ frente a la regla fiscal; crecimiento del 1,2 % en 2026 y del 1,0 % en 2027.',
        de: 'OBR-Prognose vom Oktober 2026: Neuverschuldung von 4,2 % des BIP (133 Mrd. £) im Jahr 2026-27, sinkend auf 1,8 % (67 Mrd. £) im Jahr 2030-31; Zinsen von 109 Mrd. £ im Jahr 2025-26 und 160 Mrd. £ im Jahr 2031-32; Spielraum von 15 Mrd. £ gegenüber der Fiskalregel; Wachstum von 1,2 % im Jahr 2026 und 1,0 % im Jahr 2027.',
      },
      usage: { fr: 'Emprunt et intérêts de départ ; préréglage « Plans du gouvernement ».', en: 'Starting borrowing and interest; “Government plans” preset.', es: 'Endeudamiento e intereses de partida; escenario «Planes del Gobierno».', de: 'Neuverschuldung und Zinsen zu Beginn; Szenario „Regierungspläne“.' },
    },
    {
      nom: {
        fr: 'GB News, prévision de dette de l’OBR (octobre 2026)',
        en: 'GB News, OBR debt forecast (October 2026)',
        es: 'GB News, previsión de deuda de la OBR (octubre de 2026)',
        de: 'GB News, Schuldenprognose des OBR (Oktober 2026)',
      },
      url: 'https://www.gbnews.com/money/economy-uk-debt-borrowing-costs-soar',
      chiffre: {
        fr: 'Dette nette d’environ 95 % du PIB cette année, 97 % en 2028-29 ; plus de 3 000 Md£ en 2026-27.',
        en: 'Net debt of about 95% of GDP this year, 97% in 2028-29; over £3 trillion in 2026-27.',
        es: 'Deuda neta de en torno al 95 % del PIB este año y del 97 % en 2028-29; más de 3 billones de libras en 2026-27.',
        de: 'Nettoschulden von etwa 95 % des BIP in diesem Jahr, 97 % im Jahr 2028-29; über 3 Billionen £ im Jahr 2026-27.',
      },
      usage: { fr: 'Dette de départ (fin 2026-27).', en: 'Starting debt (end of 2026-27).', es: 'Deuda de partida (final de 2026-27).', de: 'Schulden zu Beginn (Ende 2026-27).' },
    },
    {
      nom: {
        fr: 'Debt Management Office, rapport trimestriel avril-juin 2025',
        en: 'Debt Management Office, quarterly review April-June 2025',
        es: 'Debt Management Office, informe trimestral abril-junio de 2025',
        de: 'Debt Management Office, Quartalsbericht April-Juni 2025',
      },
      url: 'https://www.dmo.gov.uk/media/opunj3ps/apr-jun25.pdf',
      chiffre: {
        fr: 'Gilts indexés : environ 661 Md£ (valeur réévaluée) contre 1 879 Md£ de gilts classiques, soit environ un quart. Maturité moyenne du portefeuille : 14,65 ans.',
        en: 'Index-linked gilts: about £661bn (uplifted value) against £1,879bn of conventional gilts, i.e. about a quarter. Average portfolio maturity: 14.65 years.',
        es: 'Gilts indexados: unos 661 mil M£ (valor revalorizado) frente a 1879 mil M£ de gilts convencionales, es decir, en torno a una cuarta parte. Vencimiento medio de la cartera: 14,65 años.',
        de: 'Inflationsindexierte Gilts: etwa 661 Mrd. £ (aufgezinster Wert) gegenüber 1 879 Mrd. £ konventioneller Gilts, also etwa ein Viertel. Durchschnittliche Laufzeit des Portfolios: 14,65 Jahre.',
      },
      usage: { fr: 'Part indexée de la dette et vitesse de refinancement.', en: 'Index-linked share of debt and refinancing speed.', es: 'Parte indexada de la deuda y velocidad de refinanciación.', de: 'Indexierter Schuldenanteil und Refinanzierungsgeschwindigkeit.' },
    },
    {
      nom: {
        fr: 'OBR, intérêts de la dette (prévisions détaillées)',
        en: 'OBR, debt interest (forecast in depth)',
        es: 'OBR, intereses de la deuda (previsiones detalladas)',
        de: 'OBR, Schuldzinsen (detaillierte Prognose)',
      },
      url: 'https://obr.uk/forecasts-in-depth/tax-by-tax-spend-by-spend/debt-interest/',
      chiffre: {
        fr: 'Intérêts d’environ 111 Md£ en 2025-26, 8,3 % des dépenses publiques et plus de 3,7 % du revenu national ; les gilts indexés suivent l’indice RPI.',
        en: 'Debt interest of about £111bn in 2025-26, 8.3% of public spending and over 3.7% of national income; index-linked gilts track the RPI.',
        es: 'Intereses de unos 111 mil M£ en 2025-26, el 8,3 % del gasto público y más del 3,7 % de la renta nacional; los gilts indexados siguen el índice RPI.',
        de: 'Schuldzinsen von etwa 111 Mrd. £ im Jahr 2025-26, 8,3 % der Staatsausgaben und über 3,7 % des Nationaleinkommens; indexierte Gilts folgen dem RPI.',
      },
      usage: { fr: 'Sensibilité des intérêts à l’inflation.', en: 'Sensitivity of interest to inflation.', es: 'Sensibilidad de los intereses a la inflación.', de: 'Inflationsempfindlichkeit der Zinsen.' },
    },
    {
      nom: {
        fr: 'Rendements par point de l’impôt sur le revenu et des cotisations, via Actuarial Post ; IFS, Green Budget 2025',
        en: 'Per-point yields of income tax and National Insurance, via Actuarial Post; IFS Green Budget 2025',
        es: 'Rendimientos por punto del impuesto sobre la renta y de las cotizaciones, vía Actuarial Post; IFS, Green Budget 2025',
        de: 'Erträge je Punkt von Einkommensteuer und Sozialversicherung, über Actuarial Post; IFS Green Budget 2025',
      },
      url: 'https://www.actuarialpost.co.uk/article/changing-a-big-hitting-tax-may-raise-billions-but-at-a-cost-25177.htm',
      chiffre: {
        fr: 'En 2026-27, un penny sur le taux de base rapporte 6,9 Md£, sur le taux supérieur 1,6 Md£ (additionnel : 0,23 Md£ en 2028-29) ; un point de cotisation salariale 5,35 Md£. IFS : un point de cotisation patronale 6,0 Md£ en 2029-30 ; un point de TVA environ 8,8 Md£.',
        en: 'In 2026-27, one penny on the basic rate raises £6.9bn, on the higher rate £1.6bn (additional rate: £0.23bn in 2028-29); one point of employee NICs £5.35bn. IFS: one point of employer NICs £6.0bn in 2029-30; one point of VAT about £8.8bn.',
        es: 'En 2026-27, un penique en el tipo básico aporta 6,9 mil M£ y en el superior 1,6 mil M£ (adicional: 0,23 mil M£ en 2028-29); un punto de cotización de los asalariados, 5,35 mil M£. IFS: un punto de cotización empresarial, 6,0 mil M£ en 2029-30; un punto de IVA, unos 8,8 mil M£.',
        de: 'Im Jahr 2026-27 bringt ein Penny auf den Eingangssatz 6,9 Mrd. £, auf den höheren Satz 1,6 Mrd. £ (Zusatzsatz: 0,23 Mrd. £ im Jahr 2028-29); ein Punkt Arbeitnehmerbeitrag 5,35 Mrd. £. IFS: ein Punkt Arbeitgeberbeitrag 6,0 Mrd. £ im Jahr 2029-30; ein Punkt Mehrwertsteuer etwa 8,8 Mrd. £.',
      },
      usage: { fr: 'Curseurs « impôt sur le revenu », « cotisations » et « TVA ».', en: '“Income tax”, “National Insurance” and “VAT” sliders.', es: 'Controles «impuesto sobre la renta», «cotizaciones» e «IVA».', de: 'Regler „Einkommensteuer“, „Sozialversicherung“ und „Mehrwertsteuer“.' },
    },
    {
      nom: {
        fr: 'IFS, ce qu’il faut savoir sur le triple verrou',
        en: 'IFS, what you need to know about the triple lock',
        es: 'IFS, lo que hay que saber sobre el triple candado',
        de: 'IFS, was man über den Triple Lock wissen muss',
      },
      url: 'https://ifs.org.uk/articles/what-do-you-need-know-about-triple-lock',
      chiffre: {
        fr: 'Pension d’État : environ 154 Md£ en 2026-27 ; pleine pension de 241,30 £ par semaine après une hausse de 4,8 % en avril 2026.',
        en: 'State Pension: about £154bn in 2026-27; full pension of £241.30 a week after a 4.8% rise in April 2026.',
        es: 'Pensión estatal: unos 154 mil M£ en 2026-27; pensión completa de 241,30 £ semanales tras una subida del 4,8 % en abril de 2026.',
        de: 'Staatsrente: etwa 154 Mrd. £ im Jahr 2026-27; volle Rente von 241,30 £ pro Woche nach einer Erhöhung um 4,8 % im April 2026.',
      },
      usage: { fr: 'Groupe « Retraites ».', en: '“Pensions” group.', es: 'Grupo «Pensiones».', de: 'Gruppe „Renten“.' },
    },
    {
      nom: {
        fr: 'OBR, rapport sur les risques budgétaires et la soutenabilité (juillet 2025), via Intergenerational Foundation',
        en: 'OBR, Fiscal risks and sustainability (July 2025), via the Intergenerational Foundation',
        es: 'OBR, informe sobre riesgos fiscales y sostenibilidad (julio de 2025), vía Intergenerational Foundation',
        de: 'OBR, Bericht über fiskalische Risiken und Tragfähigkeit (Juli 2025), über Intergenerational Foundation',
      },
      url: 'https://if.org.uk/2025/07/15/unsustainable-unpredictable-and-unfair-the-obr-highlights-why-the-triple-lock-on-the-state-pension-must-go/',
      chiffre: {
        fr: 'Pension d’État : d’environ 5 % du PIB à 7,7 % au début des années 2070, dont 1,6 point dû au triple verrou et 1,1 point à la démographie.',
        en: 'State Pension: from about 5% of GDP to 7.7% in the early 2070s, of which 1.6 points due to the triple lock and 1.1 points to demographics.',
        es: 'Pensión estatal: de en torno al 5 % del PIB al 7,7 % a principios de la década de 2070, de los que 1,6 puntos se deben al triple candado y 1,1 a la demografía.',
        de: 'Staatsrente: von etwa 5 % des BIP auf 7,7 % Anfang der 2070er-Jahre, davon 1,6 Punkte durch den Triple Lock und 1,1 Punkte durch die Demografie.',
      },
      usage: { fr: 'Curseur « dérive de la pension d’État ».', en: '“State Pension drift” slider.', es: 'Control «deriva de la pensión estatal».', de: 'Regler „Anstieg der Staatsrente“.' },
    },
    {
      nom: {
        fr: 'HMRC, mesure de l’écart fiscal 2023-24',
        en: 'HMRC, Measuring tax gaps 2023-24',
        es: 'HMRC, medición de la brecha fiscal 2023-24',
        de: 'HMRC, Messung der Steuerlücke 2023-24',
      },
      url: 'https://www.gov.uk/government/statistics/measuring-tax-gaps/1-tax-gaps-summary',
      chiffre: {
        fr: 'Écart fiscal de 46,8 Md£, soit 5,3 % des impôts théoriquement dus ; 60 % viennent des petites entreprises.',
        en: 'Tax gap of £46.8bn, 5.3% of theoretical tax liabilities; 60% comes from small businesses.',
        es: 'Brecha fiscal de 46,8 mil M£, el 5,3 % de los impuestos teóricamente debidos; el 60 % procede de pequeñas empresas.',
        de: 'Steuerlücke von 46,8 Mrd. £, also 5,3 % der theoretisch geschuldeten Steuern; 60 % entfallen auf kleine Unternehmen.',
      },
      usage: { fr: 'Repère du curseur « fraude recouvrée ».', en: 'Reference for the “fraud recovered” slider.', es: 'Referencia del control «fraude recuperado».', de: 'Referenz für den Regler „eingetriebener Betrug“.' },
    },
    {
      nom: {
        fr: 'ONS, marché du travail (octobre 2026), via ITV',
        en: 'ONS, labour market (October 2026), via ITV',
        es: 'ONS, mercado laboral (octubre de 2026), vía ITV',
        de: 'ONS, Arbeitsmarkt (Oktober 2026), über ITV',
      },
      url: 'https://www.itv.com/news/2026-10-20/uk-unemployment-falls-to-lowest-in-a-year-but-vacancies-slide-further',
      chiffre: {
        fr: 'Taux de chômage de 4,7 % sur juin-août 2026, au plus bas depuis un an.',
        en: 'Unemployment rate of 4.7% in June-August 2026, the lowest in a year.',
        es: 'Tasa de paro del 4,7 % en junio-agosto de 2026, la más baja en un año.',
        de: 'Arbeitslosenquote von 4,7 % im Zeitraum Juni-August 2026, der niedrigste Stand seit einem Jahr.',
      },
      usage: { fr: 'Curseur « taux de chômage ».', en: '“Unemployment rate” slider.', es: 'Control «tasa de paro».', de: 'Regler „Arbeitslosenquote“.' },
    },
    {
      nom: {
        fr: 'Gouvernement britannique, le National Living Wage passe à 12,71 £',
        en: 'UK Government, National Living Wage increases to £12.71',
        es: 'Gobierno británico, el National Living Wage sube a 12,71 £',
        de: 'Britische Regierung, National Living Wage steigt auf 12,71 £',
      },
      url: 'https://www.gov.uk/government/news/national-living-wage-increases-to-1271-per-hour',
      chiffre: {
        fr: '12,71 £ de l’heure à partir du 1er avril 2026, sur recommandation de la Low Pay Commission.',
        en: '£12.71 an hour from 1 April 2026, following Low Pay Commission recommendations.',
        es: '12,71 £ por hora a partir del 1 de abril de 2026, según las recomendaciones de la Low Pay Commission.',
        de: '12,71 £ pro Stunde ab dem 1. April 2026, auf Empfehlung der Low Pay Commission.',
      },
      usage: { fr: 'Curseurs « salaire minimum ». Rendements par point estimés par l’application.', en: '“Minimum wage” sliders. Per-point yields estimated by the app.', es: 'Controles «salario mínimo». Rendimientos por punto estimados por la aplicación.', de: 'Regler „Mindestlohn“. Erträge je Punkt von der Anwendung geschätzt.' },
    },
    {
      nom: 'ONS, National population projections',
      url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationprojections',
      chiffre: {
        fr: '69,3 millions d’habitants en 2026 ; croissance d’environ 0,5 % par an d’ici 2036, portée par l’immigration.',
        en: '69.3 million inhabitants in 2026; growth of about 0.5% a year to 2036, driven by net migration.',
        es: '69,3 millones de habitantes en 2026; crecimiento de en torno al 0,5 % anual hasta 2036, impulsado por la inmigración.',
        de: '69,3 Millionen Einwohner 2026; Wachstum von etwa 0,5 % pro Jahr bis 2036, getragen von Zuwanderung.',
      },
      usage: { fr: 'Indicateurs par habitant (dette, intérêts, dépenses par poste), sans effet sur la trajectoire.', en: 'Per-person indicators (debt, interest, spending by function), with no effect on the trajectory.', es: 'Indicadores por habitante (deuda, intereses, gasto por función), sin efecto en la trayectoria.', de: 'Pro-Kopf-Kennzahlen (Schulden, Zinsen, Ausgaben nach Aufgaben), ohne Einfluss auf den Pfad.' },
    },
  ];
});

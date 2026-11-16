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
      nom: { fr: 'Ministère des Finances, budget 2027 (octobre 2026)', en: 'Finance Ministry, 2027 budget (October 2026)', es: 'Ministerio de Finanzas, presupuesto 2027 (octubre de 2026)', de: 'Finanzministerium, Budget 2027 (Oktober 2026)' },
      url: 'https://www.bmf.gv.at/services/startseite-budget.html',
      chiffre: {
        fr: 'Déficit de 4,1 % du PIB estimé en 2026 et 3,6 % en 2027 ; dette de 82,4 % du PIB en 2026 et 83,2 % en 2027 (83,6 % dans la prévision de juin).',
        en: 'Deficit of 4.1% of GDP estimated for 2026 and 3.6% for 2027; debt of 82.4% of GDP in 2026 and 83.2% in 2027 (83.6% in the June forecast).',
        es: 'Déficit estimado del 4,1 % del PIB en 2026 y del 3,6 % en 2027; deuda del 82,4 % del PIB en 2026 y del 83,2 % en 2027 (83,6 % en la previsión de junio).',
        de: 'Geschätztes Defizit von 4,1 % des BIP 2026 und 3,6 % 2027; Schuldenquote von 82,4 % 2026 und 83,2 % 2027 (83,6 % in der Juniprognose).',
      },
      usage: usage('Dette de départ fin 2026.', 'End-2026 starting debt.', 'Deuda de partida a finales de 2026.', 'Schulden zu Beginn Ende 2026.'),
    },
    {
      nom: { fr: 'Fiskalrat, rapport sur le respect des règles budgétaires (juin 2026) et page d’accueil (octobre 2026)', en: 'Fiscal Council, fiscal rules compliance report (June 2026) and home page (October 2026)', es: 'Consejo Fiscal, informe sobre el cumplimiento de las reglas fiscales (junio de 2026) y página de inicio (octubre de 2026)', de: 'Fiskalrat, Fiskalregelbericht (Juni 2026) und Startseite (Oktober 2026)' },
      url: 'https://www.fiskalrat.at/dam/jcr:be76daed-8993-4cdc-a860-5ed79ed71d75/Fiskalregelbericht-2026-Web.pdf',
      chiffre: {
        fr: 'Déficit de 4,0 % du PIB en 2026 et 3,6 % en 2027 malgré la consolidation ; dette portée à 87,8 % du PIB en 2030 ; un déficit moyen de 2,5 % au plus serait nécessaire pour la stabiliser.',
        en: 'Deficit of 4.0% of GDP in 2026 and 3.6% in 2027 despite consolidation; debt rising to 87.8% of GDP in 2030; an average deficit of at most 2.5% would be needed to stabilise it.',
        es: 'Déficit del 4,0 % del PIB en 2026 y del 3,6 % en 2027 pese a la consolidación; deuda que sube al 87,8 % del PIB en 2030; haría falta un déficit medio de como máximo el 2,5 % para estabilizarla.',
        de: 'Defizit von 4,0 % des BIP 2026 und 3,6 % 2027 trotz Konsolidierung; Schuldenquote steigt bis 2030 auf 87,8 %; zur Stabilisierung wäre ein durchschnittliches Defizit von höchstens 2,5 % nötig.',
      },
      usage: usage('Déficit de départ ; vraisemblance du tendanciel.', 'Starting deficit; plausibility of the baseline.', 'Déficit de partida; verosimilitud del tendencial.', 'Defizit zu Beginn; Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'AMS, marché du travail en octobre 2026', en: 'AMS, labour market in October 2026', es: 'AMS, mercado laboral en octubre de 2026', de: 'AMS, Arbeitsmarkt im Oktober 2026' },
      url: 'https://www.ams.at/content/dam/download/arbeitsmarktdaten/%C3%B6sterreich/berichte-auswertungen/001_uebersicht_aktuell.pdf',
      chiffre: {
        fr: 'Taux de chômage de 7,3 % (définition nationale), 314 499 chômeurs inscrits ; 6,3 % au sens d’Eurostat.',
        en: 'Unemployment rate of 7.3% (national definition), 314,499 registered unemployed; 6.3% on Eurostat’s definition.',
        es: 'Tasa de paro del 7,3 % (definición nacional), 314 499 parados registrados; 6,3 % según Eurostat.',
        de: 'Arbeitslosenquote von 7,3 % (nationale Berechnung), 314 499 vorgemerkte Arbeitslose; 6,3 % nach Eurostat.',
      },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
    {
      nom: { fr: 'Ministère des Affaires sociales, pension de vieillesse', en: 'Ministry of Social Affairs, old-age pension', es: 'Ministerio de Asuntos Sociales, pensión de jubilación', de: 'Sozialministerium, Alterspension' },
      url: 'https://www.sozialministerium.gv.at/Themen/Soziales/Sozialversicherung/Pensionsversicherung/Pensionsarten/Alterspension.html',
      chiffre: {
        fr: 'L’âge de la retraite des femmes est relevé de six mois par an depuis le 1er janvier 2024, de 60 ans à 65 ans en 2033.',
        en: 'Women’s pension age has been raised by six months a year since 1 January 2024, from 60 to 65 in 2033.',
        es: 'La edad de jubilación de las mujeres sube seis meses al año desde el 1 de enero de 2024, de 60 a 65 años en 2033.',
        de: 'Das Pensionsantrittsalter der Frauen steigt seit 1. Jänner 2024 um sechs Monate pro Jahr, von 60 auf 65 Jahre im Jahr 2033.',
      },
      usage: usage('Groupe « Retraites ».', '“Pensions” group.', 'Grupo «Pensiones».', 'Gruppe „Renten“.'),
    },
  ];
});

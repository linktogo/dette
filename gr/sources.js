// Sources du modèle grec (sites officiels, consultés en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'ELSTAT, données budgétaires 2022-2025 (notification d’avril 2026)', en: 'ELSTAT, fiscal data 2022-2025 (April 2026 notification)', es: 'ELSTAT, datos presupuestarios 2022-2025 (notificación de abril de 2026)', de: 'ELSTAT, Haushaltsdaten 2022-2025 (Meldung vom April 2026)' },
      url: 'https://www.statistics.gr/en/statistics/-/publication/SEL03/-',
      chiffre: {
        fr: 'Excédent de 4,29 Md€ en 2025, soit 1,7 % du PIB ; dette de 362,9 Md€, soit 146,1 % du PIB ; recettes de 124,2 Md€ et dépenses de 119,9 Md€ (48,3 % du PIB), soit des recettes d’environ 50 % du PIB.',
        en: 'Surplus of €4.29bn in 2025, i.e. 1.7% of GDP; debt of €362.9bn, i.e. 146.1% of GDP; revenue of €124.2bn and expenditure of €119.9bn (48.3% of GDP), so revenue of about 50% of GDP.',
        es: 'Superávit de 4,29 mil M€ en 2025, el 1,7 % del PIB; deuda de 362,9 mil M€, el 146,1 % del PIB; ingresos de 124,2 mil M€ y gasto de 119,9 mil M€ (48,3 % del PIB), es decir, ingresos de en torno al 50 % del PIB.',
        de: 'Überschuss von 4,29 Mrd. € im Jahr 2025, also 1,7 % des BIP; Schulden von 362,9 Mrd. €, also 146,1 % des BIP; Einnahmen von 124,2 Mrd. € und Ausgaben von 119,9 Mrd. € (48,3 % des BIP), also Einnahmen von etwa 50 % des BIP.',
      },
      usage: usage('Point de départ de la projection et taux de recettes.', 'Starting point of the projection and revenue ratio.', 'Punto de partida de la proyección y ratio de ingresos.', 'Ausgangspunkt der Projektion und Einnahmenquote.'),
    },
    {
      nom: { fr: 'Ministère des Finances, projet de plan budgétaire 2027 (octobre 2026)', en: 'Ministry of Finance, 2027 draft budgetary plan (October 2026)', es: 'Ministerio de Finanzas, proyecto de plan presupuestario 2027 (octubre de 2026)', de: 'Finanzministerium, Übersicht über die Haushaltsplanung 2027 (Oktober 2026)' },
      url: 'https://minfin.gov.gr/wp-content/uploads/2026/10/Greece_DBP_2027_final.pdf',
      chiffre: {
        fr: 'Excédent de 0,6 % du PIB et excédent primaire de 3,6 % en 2026 ; dette de 136,7 % fin 2026 puis 128,8 % fin 2027 ; intérêts de 3,0 % du PIB en 2026 et 3,1 % en 2027.',
        en: 'Surplus of 0.6% of GDP and primary surplus of 3.6% in 2026; debt of 136.7% at end-2026 then 128.8% at end-2027; interest of 3.0% of GDP in 2026 and 3.1% in 2027.',
        es: 'Superávit del 0,6 % del PIB y superávit primario del 3,6 % en 2026; deuda del 136,7 % a finales de 2026 y del 128,8 % a finales de 2027; intereses del 3,0 % del PIB en 2026 y del 3,1 % en 2027.',
        de: 'Überschuss von 0,6 % des BIP und Primärüberschuss von 3,6 % im Jahr 2026; Schulden von 136,7 % Ende 2026, dann 128,8 % Ende 2027; Zinsen von 3,0 % des BIP 2026 und 3,1 % 2027.',
      },
      usage: usage('Point de départ fin 2026 et intérêts.', 'End-2026 starting point and interest.', 'Punto de partida a finales de 2026 e intereses.', 'Ausgangspunkt Ende 2026 und Zinsen.'),
    },
    {
      nom: { fr: 'Banque de Grèce, note sur l’économie grecque (23 octobre 2026)', en: 'Bank of Greece, note on the Greek economy (23 October 2026)', es: 'Banco de Grecia, nota sobre la economía griega (23 de octubre de 2026)', de: 'Bank von Griechenland, Notiz zur griechischen Wirtschaft (23. Oktober 2026)' },
      url: 'https://www.bankofgreece.gr/Publications/Note_on_the_Greek_economy_23_10_2026.pdf',
      chiffre: {
        fr: 'Dette ramenée à 136,1 % du PIB fin juin 2026 ; le projet de budget 2027 révise à la hausse l’excédent primaire et à la baisse la dette.',
        en: 'Debt down to 136.1% of GDP at end-June 2026; the draft 2027 budget revises the primary surplus up and debt down.',
        es: 'Deuda reducida al 136,1 % del PIB a finales de junio de 2026; el proyecto de presupuesto 2027 revisa al alza el superávit primario y a la baja la deuda.',
        de: 'Schulden Ende Juni 2026 auf 136,1 % des BIP gesunken; der Haushaltsentwurf 2027 revidiert den Primärüberschuss nach oben und die Schulden nach unten.',
      },
      usage: usage('Vraisemblance du point de départ.', 'Plausibility of the starting point.', 'Verosimilitud del punto de partida.', 'Plausibilität des Ausgangspunkts.'),
    },
    {
      nom: { fr: 'ELSTAT, enquête sur les forces de travail (septembre 2026)', en: 'ELSTAT, labour force survey (September 2026)', es: 'ELSTAT, encuesta de población activa (septiembre de 2026)', de: 'ELSTAT, Arbeitskräfteerhebung (September 2026)' },
      url: 'https://www.statistics.gr/en/statistics/-/publication/SJO02/-',
      chiffre: {
        fr: 'Taux de chômage de 7,6 % en septembre 2026 (7,4 % en août).',
        en: 'Unemployment rate of 7.6% in September 2026 (7.4% in August).',
        es: 'Tasa de paro del 7,6 % en septiembre de 2026 (7,4 % en agosto).',
        de: 'Arbeitslosenquote von 7,6 % im September 2026 (7,4 % im August).',
      },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
    {
      nom: { fr: 'Ministère du Travail, salaire minimum', en: 'Ministry of Labour, minimum wage', es: 'Ministerio de Trabajo, salario mínimo', de: 'Arbeitsministerium, Mindestlohn' },
      url: 'https://ypergasias.gov.gr/en/labour-relations/collective-employment-relations/minimum-wage/',
      chiffre: {
        fr: 'Salaire minimum porté de 880 € à 920 € bruts par mois au 1er avril 2026 ; 950 € visés en 2027.',
        en: 'Minimum wage raised from €880 to €920 gross a month on 1 April 2026; €950 targeted for 2027.',
        es: 'Salario mínimo elevado de 880 € a 920 € brutos al mes el 1 de abril de 2026; 950 € previstos en 2027.',
        de: 'Mindestlohn am 1. April 2026 von 880 € auf 920 € brutto pro Monat angehoben; 950 € für 2027 angestrebt.',
      },
      usage: usage('Curseurs « salaire minimum ». Rendements estimés par l’application.', '“Minimum wage” sliders. Yields estimated by the app.', 'Controles «salario mínimo». Rendimientos estimados por la aplicación.', 'Regler „Mindestlohn“. Erträge von der Anwendung geschätzt.'),
    },
    {
      nom: { fr: 'Ministère des Finances, réforme fiscale (loi 5246/2025)', en: 'Ministry of Finance, tax reform (Law 5246/2025)', es: 'Ministerio de Finanzas, reforma fiscal (Ley 5246/2025)', de: 'Finanzministerium, Steuerreform (Gesetz 5246/2025)' },
      url: 'https://minfin.gov.gr/en/tax-policy/tax-guide/income-taxation/',
      chiffre: {
        fr: 'Barème 2026 : 9 % jusqu’à 10 000 €, 20 %, 26 % (contre 28 %), 34 % (contre 36 %), nouvelle tranche à 39 % de 40 000 à 60 000 €, 44 % au-delà.',
        en: '2026 scale: 9% up to €10,000, 20%, 26% (down from 28%), 34% (down from 36%), a new 39% bracket from €40,000 to €60,000, 44% above.',
        es: 'Escala 2026: 9 % hasta 10 000 €, 20 %, 26 % (antes 28 %), 34 % (antes 36 %), nuevo tramo del 39 % de 40 000 a 60 000 €, 44 % por encima.',
        de: 'Tarif 2026: 9 % bis 10 000 €, 20 %, 26 % (zuvor 28 %), 34 % (zuvor 36 %), neue Stufe von 39 % zwischen 40 000 und 60 000 €, darüber 44 %.',
      },
      usage: usage('Groupe « impôt sur le revenu ».', '“Income tax” group.', 'Grupo «impuesto sobre la renta».', 'Gruppe „Einkommensteuer“.'),
    },
  ];
});

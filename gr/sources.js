// Sources du modèle grec (consultées en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'ELSTAT, dette publique 2025, via ered.gr', en: 'ELSTAT, 2025 public debt, via ered.gr', es: 'ELSTAT, deuda pública de 2025, vía ered.gr', de: 'ELSTAT, Staatsschulden 2025, über ered.gr' },
      url: 'https://ered.gr/en/greeces-public-debt-moves-higher-in-2025/',
      chiffre: {
        fr: 'Dette de 362,9 Md€ fin 2025, soit 146,1 % du PIB (154,2 % en 2024, 164,3 % en 2023) ; excédent primaire de 4,9 % du PIB.',
        en: 'Debt of €362.9bn at end-2025, i.e. 146.1% of GDP (154.2% in 2024, 164.3% in 2023); primary surplus of 4.9% of GDP.',
        es: 'Deuda de 362,9 mil M€ a finales de 2025, el 146,1 % del PIB (154,2 % en 2024, 164,3 % en 2023); superávit primario del 4,9 % del PIB.',
        de: 'Schulden von 362,9 Mrd. € Ende 2025, also 146,1 % des BIP (154,2 % im Jahr 2024, 164,3 % im Jahr 2023); Primärüberschuss von 4,9 % des BIP.',
      },
      usage: usage('Point de départ de la projection.', 'Starting point of the projection.', 'Punto de partida de la proyección.', 'Ausgangspunkt der Projektion.'),
    },
    {
      nom: { fr: 'FMI, article IV 2026, via Greek City Times', en: 'IMF, 2026 Article IV, via Greek City Times', es: 'FMI, artículo IV de 2026, vía Greek City Times', de: 'IWF, Artikel-IV-Bericht 2026, über Greek City Times' },
      url: 'https://greekcitytimes.com/2026/10/14/imf-forecasts-greek-public-debt-to-fall-to-111-1-of-gdp/',
      chiffre: {
        fr: 'Excédent de 1,7 % du PIB en 2025, 0,3 % prévu en 2026 ; recettes d’environ 50 % du PIB ; dette ramenée vers 111 % du PIB à l’horizon de la prévision.',
        en: 'Surplus of 1.7% of GDP in 2025, 0.3% forecast for 2026; revenue of about 50% of GDP; debt falling towards 111% of GDP by the end of the forecast.',
        es: 'Superávit del 1,7 % del PIB en 2025 y del 0,3 % previsto en 2026; ingresos de en torno al 50 % del PIB; deuda hacia el 111 % del PIB al final de la previsión.',
        de: 'Überschuss von 1,7 % des BIP im Jahr 2025, 0,3 % für 2026 erwartet; Einnahmen von etwa 50 % des BIP; Schulden sinken bis zum Ende der Prognose gegen 111 % des BIP.',
      },
      usage: usage('Solde de départ ; vraisemblance du tendanciel.', 'Starting balance; plausibility of the baseline.', 'Saldo de partida; verosimilitud del tendencial.', 'Saldo zu Beginn; Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'Commission européenne, prévisions économiques pour la Grèce (mai 2026)', en: 'European Commission, economic forecast for Greece (May 2026)', es: 'Comisión Europea, previsiones económicas para Grecia (mayo de 2026)', de: 'Europäische Kommission, Wirtschaftsprognose für Griechenland (Mai 2026)' },
      url: 'https://economy-finance.ec.europa.eu/economic-surveillance-eu-member-states/country-pages/greece/economic-forecast-greece_en',
      chiffre: {
        fr: 'Excédent de 0,8 % du PIB en 2026 ; dette de 140,7 % du PIB, puis 134,4 % en 2027.',
        en: 'Surplus of 0.8% of GDP in 2026; debt of 140.7% of GDP, then 134.4% in 2027.',
        es: 'Superávit del 0,8 % del PIB en 2026; deuda del 140,7 % del PIB y del 134,4 % en 2027.',
        de: 'Überschuss von 0,8 % des BIP im Jahr 2026; Schulden von 140,7 % des BIP, dann 134,4 % im Jahr 2027.',
      },
      usage: usage('Dette de départ fin 2026.', 'Starting debt at end-2026.', 'Deuda de partida a finales de 2026.', 'Schulden zu Beginn Ende 2026.'),
    },
    {
      nom: { fr: 'To Vima, budget 2026', en: 'To Vima, 2026 budget', es: 'To Vima, presupuesto de 2026', de: 'To Vima, Haushalt 2026' },
      url: 'https://www.tovima.com/finance/2026-budget-greece-aims-for-2-4-growth-2-2-inflation/amp/',
      chiffre: {
        fr: 'Budget 2026 : croissance de 2,4 %, inflation de 2,2 %.',
        en: '2026 budget: growth of 2.4%, inflation of 2.2%.',
        es: 'Presupuesto de 2026: crecimiento del 2,4 %, inflación del 2,2 %.',
        de: 'Haushalt 2026: Wachstum von 2,4 %, Inflation von 2,2 %.',
      },
      usage: usage('Croissance du PIB en 2026.', '2026 GDP growth.', 'Crecimiento del PIB en 2026.', 'BIP-Wachstum 2026.'),
    },
    {
      nom: { fr: 'ELSTAT, chômage de septembre 2026, via To Vima', en: 'ELSTAT, unemployment in September 2026, via To Vima', es: 'ELSTAT, paro de septiembre de 2026, vía To Vima', de: 'ELSTAT, Arbeitslosigkeit im September 2026, über To Vima' },
      url: 'https://www.tovima.com/finance/unemployment-rate-falls-to-7-6-in-september/',
      chiffre: { fr: 'Taux de chômage de 7,6 % (8,8 % un an plus tôt), 359 609 chômeurs.', en: 'Unemployment rate of 7.6% (8.8% a year earlier), 359,609 unemployed.', es: 'Tasa de paro del 7,6 % (8,8 % un año antes), 359 609 parados.', de: 'Arbeitslosenquote von 7,6 % (8,8 % ein Jahr zuvor), 359 609 Arbeitslose.' },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
    {
      nom: { fr: 'JD Supra, hausse du salaire minimum grec en avril 2026', en: 'JD Supra, Greek minimum wage rise in April 2026', es: 'JD Supra, subida del salario mínimo griego en abril de 2026', de: 'JD Supra, Erhöhung des griechischen Mindestlohns im April 2026' },
      url: 'https://www.jdsupra.com/legalnews/greece-minimum-wage-rises-in-april-2026-7948107/',
      chiffre: { fr: 'Salaire minimum porté de 880 € à 920 € bruts par mois au 1er avril 2026 ; 950 € visés en 2027.', en: 'Minimum wage raised from €880 to €920 gross a month on 1 April 2026; €950 targeted for 2027.', es: 'Salario mínimo elevado de 880 € a 920 € brutos al mes el 1 de abril de 2026; objetivo de 950 € en 2027.', de: 'Mindestlohn am 1. April 2026 von 880 € auf 920 € brutto pro Monat angehoben; 950 € für 2027 angestrebt.' },
      usage: usage('Curseurs « salaire minimum ». Rendements estimés par l’application.', '“Minimum wage” sliders. Yields estimated by the app.', 'Controles «salario mínimo». Rendimientos estimados por la aplicación.', 'Regler „Mindestlohn“. Erträge von der Anwendung geschätzt.'),
    },
    {
      nom: { fr: 'Protothema, impôts et salaires en 2026', en: 'Protothema, taxes and wages in 2026', es: 'Protothema, impuestos y salarios en 2026', de: 'Protothema, Steuern und Löhne 2026' },
      url: 'https://en.protothema.gr/2026/01/02/what-changes-in-taxes-and-wages-in-2026-who-gains-and-who-loses/',
      chiffre: { fr: 'Nouvelle tranche à 39 % entre 40 000 et 60 000 € ; baisse de 2 points pour les revenus moyens au-dessus de 10 000 €.', en: 'New 39% bracket between €40,000 and €60,000; 2-point cut for middle incomes above €10,000.', es: 'Nuevo tramo del 39 % entre 40 000 y 60 000 €; rebaja de 2 puntos para las rentas medias por encima de 10 000 €.', de: 'Neue Stufe von 39 % zwischen 40 000 und 60 000 €; Senkung um 2 Punkte für mittlere Einkommen über 10 000 €.' },
      usage: usage('Groupe « impôt sur le revenu ».', '“Income tax” group.', 'Grupo «impuesto sobre la renta».', 'Gruppe „Einkommensteuer“.'),
    },
  ];
});

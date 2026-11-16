// Sources du modèle italien (sites officiels, consultés en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'Istat, notification à l’UE d’octobre 2026', en: 'Istat, October 2026 notification to the EU', es: 'Istat, notificación a la UE de octubre de 2026', de: 'Istat, Meldung an die EU vom Oktober 2026' },
      url: 'https://www.istat.it/en/press-release/notification-of-general-government-deficit-and-debt-according-to-the-excessive-deficit-procedure-years-2022-2025/',
      chiffre: {
        fr: 'Déficit de 3,1 % du PIB en 2025 ; excédent primaire de 0,8 % ; dette de 136,7 % du PIB (137,1 % dans la notification d’avril), en hausse de 2,5 points sur un an.',
        en: 'Deficit of 3.1% of GDP in 2025; primary surplus of 0.8%; debt of 136.7% of GDP (137.1% in the April notification), up 2.5 points on the year.',
        es: 'Déficit del 3,1 % del PIB en 2025; superávit primario del 0,8 %; deuda del 136,7 % del PIB (137,1 % en la notificación de abril), 2,5 puntos más que un año antes.',
        de: 'Defizit von 3,1 % des BIP im Jahr 2025; Primärüberschuss von 0,8 %; Schulden von 136,7 % des BIP (137,1 % in der Aprilmeldung), 2,5 Punkte mehr als im Vorjahr.',
      },
      usage: usage('Point de départ de la projection.', 'Starting point of the projection.', 'Punto de partida de la proyección.', 'Ausgangspunkt der Projektion.'),
    },
    {
      nom: { fr: 'Istat, comptes économiques nationaux 2010-2025 (septembre 2026)', en: 'Istat, national economic accounts 2010-2025 (September 2026)', es: 'Istat, cuentas económicas nacionales 2010-2025 (septiembre de 2026)', de: 'Istat, Volkswirtschaftliche Gesamtrechnungen 2010-2025 (September 2026)' },
      url: 'https://www.istat.it/wp-content/uploads/2026/09/CONTI-ECONOMICI-NAZIONALI_2010-2025-22settembre2026.pdf',
      chiffre: {
        fr: 'Recettes publiques de 48,0 % du PIB et dépenses de 51,1 % en 2025 ; pression fiscale de 42,9 % ; PIB de 2 265 Md€.',
        en: 'Government revenue of 48.0% of GDP and expenditure of 51.1% in 2025; tax burden of 42.9%; GDP of €2,265bn.',
        es: 'Ingresos públicos del 48,0 % del PIB y gasto del 51,1 % en 2025; presión fiscal del 42,9 %; PIB de 2265 mil M€.',
        de: 'Staatseinnahmen von 48,0 % des BIP und Ausgaben von 51,1 % im Jahr 2025; Abgabenquote 42,9 %; BIP von 2 265 Mrd. €.',
      },
      usage: usage('Taux de recettes et PIB.', 'Revenue ratio and GDP.', 'Ratio de ingresos y PIB.', 'Einnahmenquote und BIP.'),
    },
    {
      nom: { fr: 'Istat, notification d’avril 2026', en: 'Istat, April 2026 notification', es: 'Istat, notificación de abril de 2026', de: 'Istat, Meldung vom April 2026' },
      url: 'https://www.istat.it/wp-content/uploads/2026/04/Notifica_22_04_2026.pdf',
      chiffre: {
        fr: 'Intérêts de 87,1 Md€ en 2025, soit 3,9 % du PIB, comme en 2024.',
        en: 'Interest of €87.1bn in 2025, i.e. 3.9% of GDP, as in 2024.',
        es: 'Intereses de 87,1 mil M€ en 2025, el 3,9 % del PIB, como en 2024.',
        de: 'Zinsen von 87,1 Mrd. € im Jahr 2025, also 3,9 % des BIP, wie 2024.',
      },
      usage: usage('Intérêts de départ.', 'Starting interest.', 'Intereses de partida.', 'Zinsen zu Beginn.'),
    },
    {
      nom: { fr: 'Ministère de l’Économie, projet de plan budgétaire 2027', en: 'Ministry of Economy and Finance, 2027 draft budgetary plan', es: 'Ministerio de Economía, proyecto de plan presupuestario 2027', de: 'Wirtschafts- und Finanzministerium, Übersicht über die Haushaltsplanung 2027' },
      url: 'https://www.mef.gov.it/export/sites/MEF/inevidenza/2026/article_00393/Italys-DBP-2027.pdf',
      chiffre: {
        fr: 'Déficit de 2,9 % du PIB en 2026 et 3,4 % en 2027 (2,8 % hors clause dérogatoire pour la défense et l’énergie) ; dette de 138,1 % en 2026, 138,5 % en 2027, 137,9 % en 2028 et 136,6 % en 2029.',
        en: 'Deficit of 2.9% of GDP in 2026 and 3.4% in 2027 (2.8% excluding the escape clause for defence and energy); debt of 138.1% in 2026, 138.5% in 2027, 137.9% in 2028 and 136.6% in 2029.',
        es: 'Déficit del 2,9 % del PIB en 2026 y del 3,4 % en 2027 (2,8 % sin la cláusula de escape para defensa y energía); deuda del 138,1 % en 2026, del 138,5 % en 2027, del 137,9 % en 2028 y del 136,6 % en 2029.',
        de: 'Defizit von 2,9 % des BIP 2026 und 3,4 % 2027 (2,8 % ohne die Ausweichklausel für Verteidigung und Energie); Schulden von 138,1 % 2026, 138,5 % 2027, 137,9 % 2028 und 136,6 % 2029.',
      },
      usage: usage('Point de départ fin 2026 ; vraisemblance du tendanciel.', 'End-2026 starting point; plausibility of the baseline.', 'Punto de partida a finales de 2026; verosimilitud del tendencial.', 'Ausgangspunkt Ende 2026; Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'Office parlementaire du budget (UPB), audition sur le document de finances publiques 2026', en: 'Parliamentary Budget Office (UPB), hearing on the 2026 public finance document', es: 'Oficina Parlamentaria de Presupuesto (UPB), comparecencia sobre el documento de finanzas públicas 2026', de: 'Parlamentarisches Haushaltsbüro (UPB), Anhörung zum Finanzdokument 2026' },
      url: 'https://www.upbilancio.it/en/hearing-as-part-of-the-review-of-the-2026-pfpd/',
      chiffre: {
        fr: 'Intérêts attendus à 4,6 % du PIB en 2028-2029 ; déficit programmé de 3,4 % en 2027 et 3,2 % en 2028.',
        en: 'Interest expected at 4.6% of GDP in 2028-2029; planned deficit of 3.4% in 2027 and 3.2% in 2028.',
        es: 'Intereses previstos del 4,6 % del PIB en 2028-2029; déficit programado del 3,4 % en 2027 y del 3,2 % en 2028.',
        de: 'Zinsen von 4,6 % des BIP in den Jahren 2028-2029 erwartet; geplantes Defizit von 3,4 % 2027 und 3,2 % 2028.',
      },
      usage: usage('Vraisemblance de la charge d’intérêts.', 'Plausibility of the interest burden.', 'Verosimilitud de la carga de intereses.', 'Plausibilität der Zinslast.'),
    },
    {
      nom: { fr: 'Trésor italien, dette publique', en: 'Italian Treasury, public debt', es: 'Tesoro italiano, deuda pública', de: 'Italienisches Schatzamt, Staatsschulden' },
      url: 'https://www.dt.mef.gov.it/it/index.html',
      chiffre: {
        fr: 'Rendement moyen des émissions de 3,08 % de janvier à octobre 2026 ; vie moyenne des titres de 6,87 ans au 31 octobre 2026.',
        en: 'Average issuance yield of 3.08% from January to October 2026; average life of securities of 6.87 years at 31 October 2026.',
        es: 'Rendimiento medio de las emisiones del 3,08 % de enero a octubre de 2026; vida media de los títulos de 6,87 años a 31 de octubre de 2026.',
        de: 'Durchschnittliche Emissionsrendite von 3,08 % von Januar bis Oktober 2026; durchschnittliche Laufzeit der Wertpapiere von 6,87 Jahren am 31. Oktober 2026.',
      },
      usage: usage('Taux de marché et vitesse de refinancement.', 'Market rate and refinancing speed.', 'Tipo de mercado y ritmo de refinanciación.', 'Marktzins und Refinanzierungstempo.'),
    },
    {
      nom: { fr: 'Agence des recettes, barème de l’IRPEF', en: 'Revenue Agency, IRPEF rates', es: 'Agencia Tributaria, tipos del IRPEF', de: 'Steuerbehörde, IRPEF-Tarif' },
      url: 'https://www.agenziaentrate.gov.it/portale/imposta-sul-reddito-delle-persone-fisiche-irpef-/aliquote-e-calcolo-dell-irpef',
      chiffre: {
        fr: '23 % jusqu’à 28 000 €, 33 % jusqu’à 50 000 € (35 % avant la loi de budget 2026), 43 % au-delà. Coût de la baisse : environ 2,9 Md€ en 2026 (ministère de l’Économie).',
        en: '23% up to €28,000, 33% up to €50,000 (35% before the 2026 budget law), 43% above. Cost of the cut: about €2.9bn in 2026 (Ministry of Economy).',
        es: '23 % hasta 28 000 €, 33 % hasta 50 000 € (35 % antes de la ley de presupuestos de 2026), 43 % por encima. Coste de la rebaja: unos 2,9 mil M€ en 2026 (Ministerio de Economía).',
        de: '23 % bis 28 000 €, 33 % bis 50 000 € (35 % vor dem Haushaltsgesetz 2026), darüber 43 %. Kosten der Senkung: etwa 2,9 Mrd. € im Jahr 2026 (Wirtschaftsministerium).',
      },
      usage: usage('Groupe « impôt sur le revenu ».', '“Income tax” group.', 'Grupo «impuesto sobre la renta».', 'Gruppe „Einkommensteuer“.'),
    },
    {
      nom: { fr: 'Istat, emploi et chômage de septembre 2026', en: 'Istat, employment and unemployment, September 2026', es: 'Istat, empleo y paro de septiembre de 2026', de: 'Istat, Beschäftigung und Arbeitslosigkeit September 2026' },
      url: 'https://www.istat.it/en/press-release/employment-and-unemployment-provisional-data-september-2026/',
      chiffre: {
        fr: 'Taux de chômage de 6,3 % ; chômage des jeunes de 19,9 % ; taux d’emploi de 63,0 %.',
        en: 'Unemployment rate of 6.3%; youth unemployment of 19.9%; employment rate of 63.0%.',
        es: 'Tasa de paro del 6,3 %; paro juvenil del 19,9 %; tasa de empleo del 63,0 %.',
        de: 'Arbeitslosenquote von 6,3 %; Jugendarbeitslosigkeit von 19,9 %; Beschäftigungsquote von 63,0 %.',
      },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
  ];
});

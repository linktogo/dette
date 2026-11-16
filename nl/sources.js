// Sources du modèle néerlandais (sites officiels, consultés en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'CBS, déficit et dette publics en 2025', en: 'CBS, government deficit and debt in 2025', es: 'CBS, déficit y deuda públicos en 2025', de: 'CBS, Staatsdefizit und Staatsschulden 2025' },
      url: 'https://www.cbs.nl/nl-nl/longread/diversen/2026/overheidstekort-en-schuld-toegenomen-in-2025?onepage=true',
      chiffre: {
        fr: 'Déficit de 19 Md€ en 2025, soit 1,6 % du PIB (0,7 % en 2024) ; dépenses de 529 Md€, soit 45,2 % du PIB ; dette de 524 Md€, soit 44,4 % du PIB ; intérêts de 8,5 Md€.',
        en: 'Deficit of €19bn in 2025, i.e. 1.6% of GDP (0.7% in 2024); expenditure of €529bn, i.e. 45.2% of GDP; debt of €524bn, i.e. 44.4% of GDP; interest of €8.5bn.',
        es: 'Déficit de 19 mil M€ en 2025, el 1,6 % del PIB (0,7 % en 2024); gasto de 529 mil M€, el 45,2 % del PIB; deuda de 524 mil M€, el 44,4 % del PIB; intereses de 8,5 mil M€.',
        de: 'Defizit von 19 Mrd. € im Jahr 2025, also 1,6 % des BIP (0,7 % im Jahr 2024); Ausgaben von 529 Mrd. €, also 45,2 % des BIP; Schulden von 524 Mrd. €, also 44,4 % des BIP; Zinsen von 8,5 Mrd. €.',
      },
      usage: usage('Point de départ : dette, déficit, recettes (dépenses moins déficit) et intérêts 2025.', 'Starting point: 2025 debt, deficit, revenue (expenditure minus deficit) and interest.', 'Punto de partida: deuda, déficit, ingresos (gasto menos déficit) e intereses de 2025.', 'Ausgangspunkt: Schulden, Defizit, Einnahmen (Ausgaben minus Defizit) und Zinsen 2025.'),
    },
    {
      nom: { fr: 'CBS, finances publiques du premier semestre 2026', en: 'CBS, public finances in the first half of 2026', es: 'CBS, finanzas públicas del primer semestre de 2026', de: 'CBS, Staatsfinanzen im ersten Halbjahr 2026' },
      url: 'https://www.cbs.nl/nl-nl/nieuws/2026/39/overheid-kwam-8-miljard-euro-tekort-in-eerste-helft-van-2026',
      chiffre: {
        fr: 'Déficit de 8 Md€ au premier semestre 2026 ; dette stable à 524 Md€ ; taux d’endettement révisé à 44,7 % fin 2025, 43,7 % mi-2026.',
        en: 'Deficit of €8bn in the first half of 2026; debt unchanged at €524bn; debt ratio revised to 44.7% at end-2025, 43.7% in mid-2026.',
        es: 'Déficit de 8 mil M€ en el primer semestre de 2026; deuda estable en 524 mil M€; ratio de deuda revisada al 44,7 % a finales de 2025 y 43,7 % a mediados de 2026.',
        de: 'Defizit von 8 Mrd. € im ersten Halbjahr 2026; Schulden unverändert bei 524 Mrd. €; Schuldenquote Ende 2025 auf 44,7 % revidiert, Mitte 2026 43,7 %.',
      },
      usage: usage('Taux d’endettement 2025 révisé.', 'Revised 2025 debt ratio.', 'Ratio de deuda de 2025 revisada.', 'Revidierte Schuldenquote 2025.'),
    },
    {
      nom: { fr: 'CPB, prévision de septembre 2026 (MEV 2027)', en: 'CPB, September 2026 projection (MEV 2027)', es: 'CPB, previsión de septiembre de 2026 (MEV 2027)', de: 'CPB, Prognose September 2026 (MEV 2027)' },
      url: 'https://www.cpb.nl/system/files/cpbmedia/CPB-kerngegevens-MEV-2027.pdf',
      chiffre: {
        fr: 'Déficit de 2,7 % du PIB en 2026 et 2,2 % en 2027 ; dette de 46,1 % puis 46,7 % ; chômage de 3,9 % puis 4,0 % ; inflation de 2,7 % en 2027.',
        en: 'Deficit of 2.7% of GDP in 2026 and 2.2% in 2027; debt of 46.1% then 46.7%; unemployment of 3.9% then 4.0%; inflation of 2.7% in 2027.',
        es: 'Déficit del 2,7 % del PIB en 2026 y del 2,2 % en 2027; deuda del 46,1 % y del 46,7 %; paro del 3,9 % y del 4,0 %; inflación del 2,7 % en 2027.',
        de: 'Defizit von 2,7 % des BIP 2026 und 2,2 % 2027; Schulden von 46,1 %, dann 46,7 %; Arbeitslosigkeit von 3,9 %, dann 4,0 %; Inflation von 2,7 % im Jahr 2027.',
      },
      usage: usage('Point de départ 2026 et chômage.', '2026 starting point and unemployment.', 'Punto de partida 2026 y paro.', 'Ausgangspunkt 2026 und Arbeitslosigkeit.'),
    },
    {
      nom: { fr: 'Ministère des Finances, Miljoenennota 2027', en: 'Ministry of Finance, Miljoenennota 2027', es: 'Ministerio de Finanzas, Miljoenennota 2027', de: 'Finanzministerium, Miljoenennota 2027' },
      url: 'https://www.rijksfinancien.nl/miljoenennota/2027',
      chiffre: {
        fr: 'Déficit de 28,6 Md€ (2,3 % du PIB) en 2026 et de 36,7 Md€ (2,9 %) en 2027 ; dette de 45,6 % fin 2026, 46,9 % fin 2027 (599,6 Md€) et 49,6 % en 2031.',
        en: 'Deficit of €28.6bn (2.3% of GDP) in 2026 and €36.7bn (2.9%) in 2027; debt of 45.6% at end-2026, 46.9% at end-2027 (€599.6bn) and 49.6% in 2031.',
        es: 'Déficit de 28,6 mil M€ (2,3 % del PIB) en 2026 y de 36,7 mil M€ (2,9 %) en 2027; deuda del 45,6 % a finales de 2026, del 46,9 % a finales de 2027 (599,6 mil M€) y del 49,6 % en 2031.',
        de: 'Defizit von 28,6 Mrd. € (2,3 % des BIP) 2026 und 36,7 Mrd. € (2,9 %) 2027; Schulden von 45,6 % Ende 2026, 46,9 % Ende 2027 (599,6 Mrd. €) und 49,6 % im Jahr 2031.',
      },
      usage: usage('Vraisemblance du tendanciel.', 'Plausibility of the baseline.', 'Verosimilitud del tendencial.', 'Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'Gouvernement néerlandais, montants du salaire minimum 2026', en: 'Dutch government, 2026 minimum wage amounts', es: 'Gobierno neerlandés, importes del salario mínimo 2026', de: 'Niederländische Regierung, Mindestlohnbeträge 2026' },
      url: 'https://www.rijksoverheid.nl/themas/werk/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026',
      chiffre: {
        fr: 'Salaire minimum de 14,71 € bruts de l’heure au 1er janvier 2026 pour les 21 ans et plus.',
        en: 'Minimum wage of €14.71 gross per hour from 1 January 2026 for those aged 21 and over.',
        es: 'Salario mínimo de 14,71 € brutos por hora desde el 1 de enero de 2026 para mayores de 21 años.',
        de: 'Mindestlohn von 14,71 € brutto pro Stunde ab 1. Januar 2026 für Personen ab 21 Jahren.',
      },
      usage: usage('Curseur du salaire minimum.', 'Minimum wage slider.', 'Control del salario mínimo.', 'Mindestlohn-Regler.'),
    },
  ];
});

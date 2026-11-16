// Sources du modèle belge (sites officiels, consultés en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'Banque nationale de Belgique, comptes des administrations publiques 2025', en: 'National Bank of Belgium, general government accounts 2025', es: 'Banco Nacional de Bélgica, cuentas de las administraciones públicas 2025', de: 'Belgische Nationalbank, Konten des Staatssektors 2025' },
      url: 'https://www.nbb.be/doc/dq/f/dq3/nfco.pdf',
      chiffre: {
        fr: 'Déficit de 5,2 % du PIB en 2025 (4,4 % en 2024) ; dette de 107,9 % du PIB fin 2025 (103,9 % un an plus tôt) ; dépenses primaires de 52,0 % du PIB ; charges d’intérêts de 14,28 Md€, soit 2,2 % du PIB.',
        en: 'Deficit of 5.2% of GDP in 2025 (4.4% in 2024); debt of 107.9% of GDP at end-2025 (103.9% a year earlier); primary expenditure of 52.0% of GDP; interest charges of €14.28bn, i.e. 2.2% of GDP.',
        es: 'Déficit del 5,2 % del PIB en 2025 (4,4 % en 2024); deuda del 107,9 % del PIB a finales de 2025 (103,9 % un año antes); gasto primario del 52,0 % del PIB; intereses de 14,28 mil M€, el 2,2 % del PIB.',
        de: 'Defizit von 5,2 % des BIP im Jahr 2025 (4,4 % im Jahr 2024); Schulden von 107,9 % des BIP Ende 2025 (103,9 % ein Jahr zuvor); Primärausgaben von 52,0 % des BIP; Zinslasten von 14,28 Mrd. €, also 2,2 % des BIP.',
      },
      usage: usage('Point de départ : dette, déficit et intérêts 2025.', 'Starting point: 2025 debt, deficit and interest.', 'Punto de partida: deuda, déficit e intereses de 2025.', 'Ausgangspunkt: Schulden, Defizit und Zinsen 2025.'),
    },
    {
      nom: { fr: 'Banque nationale de Belgique, comptes annuels détaillés 2025', en: 'National Bank of Belgium, detailed annual accounts 2025', es: 'Banco Nacional de Bélgica, cuentas anuales detalladas 2025', de: 'Belgische Nationalbank, detaillierte Jahreskonten 2025' },
      url: 'https://www.nbb.be/en/statistics/latest-figures/nai-detailed-annual-accounts-and-tables-2025',
      chiffre: {
        fr: 'Recettes de 49,2 % du PIB, dépenses primaires de 52,2 %, intérêts de 2,3 % ; dette révisée à 108,1 % du PIB.',
        en: 'Revenue of 49.2% of GDP, primary expenditure of 52.2%, interest of 2.3%; debt revised to 108.1% of GDP.',
        es: 'Ingresos del 49,2 % del PIB, gasto primario del 52,2 %, intereses del 2,3 %; deuda revisada al 108,1 % del PIB.',
        de: 'Einnahmen von 49,2 % des BIP, Primärausgaben von 52,2 %, Zinsen von 2,3 %; Schulden auf 108,1 % des BIP revidiert.',
      },
      usage: usage('Taux de recettes du modèle.', 'Revenue ratio of the model.', 'Ratio de ingresos del modelo.', 'Einnahmenquote des Modells.'),
    },
    {
      nom: { fr: 'Banque nationale de Belgique, projections économiques de juin 2026', en: 'National Bank of Belgium, June 2026 economic projections', es: 'Banco Nacional de Bélgica, proyecciones económicas de junio de 2026', de: 'Belgische Nationalbank, Wirtschaftsprojektionen Juni 2026' },
      url: 'https://www.nbb.be/en/publications-research/all-publications/economic-projections-belgium-june-2026',
      chiffre: {
        fr: 'Déficit de 5,3 % du PIB en 2026, 5,5 % en 2027, 5,7 % en 2028 ; dette de 111,3 %, 112,9 % puis 114,8 % ; solde primaire autour de −2,8 % ; croissance de 0,6 % en 2026 ; inflation de 3,4 % ; chômage harmonisé de 6,6 %.',
        en: 'Deficit of 5.3% of GDP in 2026, 5.5% in 2027, 5.7% in 2028; debt of 111.3%, 112.9% then 114.8%; primary balance around −2.8%; growth of 0.6% in 2026; inflation of 3.4%; harmonised unemployment of 6.6%.',
        es: 'Déficit del 5,3 % del PIB en 2026, del 5,5 % en 2027 y del 5,7 % en 2028; deuda del 111,3 %, 112,9 % y 114,8 %; saldo primario en torno al −2,8 %; crecimiento del 0,6 % en 2026; inflación del 3,4 %; paro armonizado del 6,6 %.',
        de: 'Defizit von 5,3 % des BIP im Jahr 2026, 5,5 % 2027, 5,7 % 2028; Schulden von 111,3 %, 112,9 %, dann 114,8 %; Primärsaldo um −2,8 %; Wachstum von 0,6 % 2026; Inflation 3,4 %; harmonisierte Arbeitslosenquote 6,6 %.',
      },
      usage: usage('Point de départ 2026, intérêts et chômage ; vraisemblance du tendanciel.', '2026 starting point, interest and unemployment; plausibility of the baseline.', 'Punto de partida 2026, intereses y paro; verosimilitud del tendencial.', 'Ausgangspunkt 2026, Zinsen und Arbeitslosigkeit; Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'Bureau fédéral du Plan, budget économique 2026 et perspectives 2027-2031', en: 'Federal Planning Bureau, 2026 economic budget and 2027-2031 outlook', es: 'Oficina Federal del Plan, presupuesto económico 2026 y perspectivas 2027-2031', de: 'Föderales Planbüro, Wirtschaftshaushalt 2026 und Ausblick 2027-2031' },
      url: 'https://news.belgium.be/fr/budget-economique-2026-et-perspectives-2027-2031',
      chiffre: {
        fr: 'Dette estimée à 107 % du PIB en 2025, 117 % en 2029 et 122 % en 2031 ; déficit de 5,1 % en 2027, 5,7 % en 2029 et 6,3 % en 2031 (février 2026).',
        en: 'Debt estimated at 107% of GDP in 2025, 117% in 2029 and 122% in 2031; deficit of 5.1% in 2027, 5.7% in 2029 and 6.3% in 2031 (February 2026).',
        es: 'Deuda estimada en el 107 % del PIB en 2025, el 117 % en 2029 y el 122 % en 2031; déficit del 5,1 % en 2027, el 5,7 % en 2029 y el 6,3 % en 2031 (febrero de 2026).',
        de: 'Schulden geschätzt auf 107 % des BIP 2025, 117 % 2029 und 122 % 2031; Defizit von 5,1 % 2027, 5,7 % 2029 und 6,3 % 2031 (Februar 2026).',
      },
      usage: usage('Vraisemblance du tendanciel à moyen terme.', 'Plausibility of the medium-term baseline.', 'Verosimilitud del tendencial a medio plazo.', 'Plausibilität des mittelfristigen Basisszenarios.'),
    },
    {
      nom: { fr: 'Bureau fédéral du Plan, perspectives de juin 2026', en: 'Federal Planning Bureau, June 2026 outlook', es: 'Oficina Federal del Plan, perspectivas de junio de 2026', de: 'Föderales Planbüro, Ausblick Juni 2026' },
      url: 'https://www.plan.be/en/publications/economic-and-fiscal-outlook-weighed-down-middle',
      chiffre: {
        fr: 'Croissance de 0,7 % en 2026 ; déficit de 5,1 % du PIB en 2026, qui se creuse ensuite jusqu’à 6,4 % en 2031.',
        en: 'Growth of 0.7% in 2026; deficit of 5.1% of GDP in 2026, widening afterwards to 6.4% in 2031.',
        es: 'Crecimiento del 0,7 % en 2026; déficit del 5,1 % del PIB en 2026, que después se amplía hasta el 6,4 % en 2031.',
        de: 'Wachstum von 0,7 % im Jahr 2026; Defizit von 5,1 % des BIP 2026, das sich danach bis 2031 auf 6,4 % ausweitet.',
      },
      usage: usage('Vraisemblance du tendanciel.', 'Plausibility of the baseline.', 'Verosimilitud del tendencial.', 'Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'Conseil national du Travail, salaire minimum', en: 'National Labour Council, minimum wage', es: 'Consejo Nacional del Trabajo, salario mínimo', de: 'Nationaler Arbeitsrat, Mindestlohn' },
      url: 'https://cnt-nar.be/fr/dossiers-thematiques/salaire-minimum',
      chiffre: {
        fr: 'Revenu minimum mensuel moyen garanti de 2 233,61 € bruts depuis le 1er juillet 2026.',
        en: 'Guaranteed average monthly minimum income of €2,233.61 gross since 1 July 2026.',
        es: 'Renta mínima mensual media garantizada de 2233,61 € brutos desde el 1 de julio de 2026.',
        de: 'Garantiertes durchschnittliches Mindestmonatseinkommen von 2 233,61 € brutto seit dem 1. Juli 2026.',
      },
      usage: usage('Curseur du salaire minimum.', 'Minimum wage slider.', 'Control del salario mínimo.', 'Mindestlohn-Regler.'),
    },
  ];
});

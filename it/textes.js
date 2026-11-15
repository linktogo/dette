// Simulateur italien : particularités du pays en quatre langues. Le reste des textes
// et la structure des curseurs viennent de ../textes-communs.js. L'Italie n'a pas de
// salaire minimum légal : le groupe correspondant n'apparaît pas.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) {
    module.exports = (modele, sources) => fabrique(require('../textes-communs.js'), modele, sources);
  } else racine.PAYS = fabrique(racine.PaysCommun, racine.DetteItalie, racine.SOURCES);
})(globalThis, function (commun, modele, sources) {
  const options = {
    economiesMax: 100, economiesPas: 5, fraudeMax: 20, criseMax: 200, ruAdulte: 500,
    // Proposition de l'assistant : effort modéré pour sortir durablement sous 3 % de déficit.
    prereglages: [{ id: 'effort', p: { economies: 20, fraude: 5 } }],
  };
  const specifique = {
    fr: (u) => ({
      titreDoc: 'Dette italienne : projection à 10 ans',
      h1: 'Dette publique italienne : projection 2027-2036',
      tva: [
        { nom: 'Taux normal', note: 'La plupart des biens et services.' },
        { nom: 'Taux réduit', note: 'Restauration, hôtellerie, énergie domestique.' },
        { nom: 'Taux réduit spécial', note: 'Certains services sociaux et produits.' },
        { nom: 'Taux super-réduit', note: 'Produits de première nécessité, livres, presse.' },
      ],
      irZone: 'Tranches à 23 % et 33 %',
      groupes: {
        ir: { intro: 'IRPEF 2026 : 23 % jusqu’à 28 000 €, 33 % jusqu’à 50 000 € (contre 35 % auparavant, pour 2,8 Md€), 43 % au-delà. Impôt sur les sociétés (IRES) : 24 %.' },
        retraites: { intro: 'Âge légal de 67 ans, indexé sur l’espérance de vie. La dépense de pensions est l’une des plus élevées d’Europe, autour de 15 % du PIB.' },
      },
      curseurs: { tauxMarche: { repere: 'Trésor : émissions à 2,75 % en moyenne en 2025, 2,94 % de janvier à août 2026. Vie moyenne : 6,9 ans.' } },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Référence : 67 ans, relevé avec l’espérance de vie.',
      deriveNote: 'Dépense de pensions : pic vers 2040 sous l’effet des départs du baby-boom, +1 point de PIB par rapport à 2026, puis repli (hypothèse de l’application).',
      chomageSource: 'Istat, septembre 2026',
      aides: 'assegno di inclusione, allocation sociale aux personnes âgées, la moitié des aides au logement, assegno unico pour les enfants',
      criseNote: 'Covid : la dette est passée d’environ 134 % à 155 % du PIB en 2020.',
      depart: 'Prévisions de Moody’s : dette de 138 % du PIB et déficit de 3,0 % en 2026. Dernier chiffre mesuré : 136,7 % du PIB fin 2025, déficit de 3,1 % : l’Italie reste en procédure pour déficit excessif.',
      hypotheses: ['Le taux de recettes (47,4 % du PIB) est estimé à partir de la pression fiscale de 42,9 % mesurée par l’Istat, plus les recettes non fiscales.'],
      ignore: 'Il ignore aussi les crédits d’impôt du « Superbonus », qui gonflent la dette au-delà du déficit, et la fin du plan de relance européen en 2026.',
      postes: {
        defense: 'Environ 1,3 % du PIB au sens d’Eurostat ; l’objectif OTAN de 2 % est atteint en comptant d’autres dépenses.', enseignement: 'Du primaire au supérieur.', sante: 'Service sanitaire national, géré par les régions.',
        retraites: 'Pensions de vieillesse et de réversion (INPS). Les curseurs du groupe « Retraites » s’y ajoutent.',
        social: 'Chômage, famille, invalidité, exclusion. Le revenu universel, net des aides qu’il remplace, s’y ajoute.',
        securite: 'Police, carabiniers, justice.', economie: 'Transports, énergie, aides aux entreprises, plan de relance.',
        general: 'Administration générale. Hors intérêts.', cadre: 'Logement, environnement, culture et sport.',
      },
      prereglages: { effort: 'Effort partagé' },
    }),
    en: (u) => ({
      titreDoc: 'Italian public debt: 10-year projection',
      h1: 'Italian public debt: projection 2027-2036',
      tva: [
        { nom: 'Standard rate', note: 'Most goods and services.' },
        { nom: 'Reduced rate', note: 'Restaurants, hotels, domestic energy.' },
        { nom: 'Special reduced rate', note: 'Some social services and products.' },
        { nom: 'Super-reduced rate', note: 'Basic necessities, books, press.' },
      ],
      irZone: '23% and 33% brackets',
      groupes: {
        ir: { intro: '2026 IRPEF: 23% up to €28,000, 33% up to €50,000 (down from 35%, at a cost of €2.8bn), 43% above. Corporate tax (IRES): 24%.' },
        retraites: { intro: 'Statutory age of 67, indexed to life expectancy. Pension spending is among the highest in Europe, around 15% of GDP.' },
      },
      curseurs: { tauxMarche: { repere: 'Treasury: issuance at 2.75% on average in 2025, 2.94% from January to August 2026. Average life: 6.9 years.' } },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Reference: 67, raised in line with life expectancy.',
      deriveNote: 'Pension spending: peaks around 2040 as the baby boomers retire, +1 pp of GDP relative to 2026, then eases (app assumption).',
      chomageSource: 'Istat, September 2026',
      aides: 'inclusion allowance, social allowance for older people, half of housing support, single child allowance (assegno unico)',
      criseNote: 'Covid: debt rose from about 134% to 155% of GDP in 2020.',
      depart: 'Moody’s forecasts: debt of 138% of GDP and a 3.0% deficit in 2026. Latest outturn: 136.7% of GDP at end-2025, a 3.1% deficit: Italy remains under the excessive deficit procedure.',
      hypotheses: ['The revenue ratio (47.4% of GDP) is estimated from Istat’s 42.9% tax burden plus non-tax revenue.'],
      ignore: 'It also ignores the “Superbonus” tax credits, which swell debt beyond the deficit, and the end of the EU recovery plan in 2026.',
      postes: {
        defense: 'About 1.3% of GDP on Eurostat’s definition; the NATO 2% target is met by counting other spending.', enseignement: 'Primary to higher education.', sante: 'National health service, run by the regions.',
        retraites: 'Old-age and survivors’ pensions (INPS). The “Pensions” sliders add to it.',
        social: 'Unemployment, family, disability, exclusion. Universal basic income, net of the benefits it replaces, is added here.',
        securite: 'Police, Carabinieri, courts.', economie: 'Transport, energy, business support, recovery plan.',
        general: 'General administration. Excluding interest.', cadre: 'Housing, environment, culture and sport.',
      },
      prereglages: { effort: 'Shared effort' },
    }),
    es: (u) => ({
      titreDoc: 'Deuda pública italiana: proyección a 10 años',
      h1: 'Deuda pública italiana: proyección 2027-2036',
      tva: [
        { nom: 'Tipo general', note: 'La mayoría de bienes y servicios.' },
        { nom: 'Tipo reducido', note: 'Restauración, hostelería, energía doméstica.' },
        { nom: 'Tipo reducido especial', note: 'Algunos servicios sociales y productos.' },
        { nom: 'Tipo superreducido', note: 'Productos de primera necesidad, libros, prensa.' },
      ],
      irZone: 'Tramos del 23 % y del 33 %',
      groupes: {
        ir: { intro: 'IRPEF 2026: 23 % hasta 28 000 €, 33 % hasta 50 000 € (antes 35 %, con un coste de 2,8 mil M€), 43 % por encima. Impuesto sobre sociedades (IRES): 24 %.' },
        retraites: { intro: 'Edad legal de 67 años, vinculada a la esperanza de vida. El gasto en pensiones está entre los más altos de Europa, en torno al 15 % del PIB.' },
      },
      curseurs: { tauxMarche: { repere: 'Tesoro: emisiones al 2,75 % de media en 2025 y al 2,94 % de enero a agosto de 2026. Vida media: 6,9 años.' } },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Referencia: 67 años, elevada con la esperanza de vida.',
      deriveNote: 'Gasto en pensiones: máximo hacia 2040 por la jubilación del baby boom, +1 punto del PIB respecto a 2026, y después repliegue (hipótesis de la aplicación).',
      chomageSource: 'Istat, septiembre de 2026',
      aides: 'assegno di inclusione, prestación social para mayores, la mitad de las ayudas a la vivienda, assegno unico por hijos',
      criseNote: 'Covid: la deuda pasó de en torno al 134 % al 155 % del PIB en 2020.',
      depart: 'Previsiones de Moody’s: deuda del 138 % del PIB y déficit del 3,0 % en 2026. Último dato observado: 136,7 % del PIB a finales de 2025 y déficit del 3,1 %: Italia sigue en procedimiento por déficit excesivo.',
      hypotheses: ['La ratio de ingresos (47,4 % del PIB) se estima a partir de la presión fiscal del 42,9 % medida por el Istat, más los ingresos no tributarios.'],
      ignore: 'Tampoco tiene en cuenta los créditos fiscales del «Superbonus», que inflan la deuda por encima del déficit, ni el final del plan de recuperación europeo en 2026.',
      postes: {
        defense: 'En torno al 1,3 % del PIB según Eurostat; el objetivo OTAN del 2 % se alcanza contando otros gastos.', enseignement: 'De primaria a universidad.', sante: 'Servicio sanitario nacional, gestionado por las regiones.',
        retraites: 'Pensiones de jubilación y de supervivencia (INPS). Los controles del grupo «Pensiones» se suman aquí.',
        social: 'Desempleo, familia, invalidez, exclusión. La renta básica, neta de las ayudas que sustituye, se suma aquí.',
        securite: 'Policía, carabineros, justicia.', economie: 'Transporte, energía, ayudas a empresas, plan de recuperación.',
        general: 'Administración general. Sin intereses.', cadre: 'Vivienda, medio ambiente, cultura y deporte.',
      },
      prereglages: { effort: 'Esfuerzo compartido' },
    }),
    de: (u) => ({
      titreDoc: 'Italienische Staatsschulden: Projektion über 10 Jahre',
      h1: 'Italienische Staatsschulden: Projektion 2027-2036',
      tva: [
        { nom: 'Regelsatz', note: 'Die meisten Waren und Dienstleistungen.' },
        { nom: 'Ermäßigter Satz', note: 'Gastronomie, Hotellerie, Haushaltsenergie.' },
        { nom: 'Ermäßigter Sondersatz', note: 'Einige soziale Dienstleistungen und Produkte.' },
        { nom: 'Stark ermäßigter Satz', note: 'Güter des Grundbedarfs, Bücher, Presse.' },
      ],
      irZone: 'Stufen von 23 % und 33 %',
      groupes: {
        ir: { intro: 'IRPEF 2026: 23 % bis 28 000 €, 33 % bis 50 000 € (zuvor 35 %, Kosten 2,8 Mrd. €), darüber 43 %. Körperschaftsteuer (IRES): 24 %.' },
        retraites: { intro: 'Regelaltersgrenze 67 Jahre, an die Lebenserwartung gekoppelt. Die Rentenausgaben gehören mit rund 15 % des BIP zu den höchsten in Europa.' },
      },
      curseurs: { tauxMarche: { repere: 'Schatzamt: Emissionen 2025 im Schnitt zu 2,75 %, von Januar bis August 2026 zu 2,94 %. Durchschnittliche Laufzeit: 6,9 Jahre.' } },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Referenz: 67 Jahre, mit der Lebenserwartung angehoben.',
      deriveNote: 'Rentenausgaben: Höhepunkt um 2040 durch den Renteneintritt der Babyboomer, +1 Pp. des BIP gegenüber 2026, danach Rückgang (Annahme der Anwendung).',
      chomageSource: 'Istat, September 2026',
      aides: 'Inklusionsgeld (assegno di inclusione), Sozialrente für Ältere, die Hälfte der Wohnhilfen, einheitliches Kindergeld (assegno unico)',
      criseNote: 'Covid: Die Schulden stiegen 2020 von etwa 134 % auf 155 % des BIP.',
      depart: 'Prognosen von Moody’s: Schulden von 138 % des BIP und Defizit von 3,0 % im Jahr 2026. Letzter gemessener Wert: 136,7 % des BIP Ende 2025, Defizit 3,1 %: Italien bleibt im Defizitverfahren.',
      hypotheses: ['Die Einnahmenquote (47,4 % des BIP) ist aus der vom Istat gemessenen Abgabenquote von 42,9 % plus nichtsteuerlichen Einnahmen geschätzt.'],
      ignore: 'Es ignoriert auch die Steuergutschriften des „Superbonus“, die die Schulden über das Defizit hinaus erhöhen, und das Auslaufen des EU-Aufbauplans im Jahr 2026.',
      postes: {
        defense: 'Etwa 1,3 % des BIP nach Eurostat; das NATO-Ziel von 2 % wird durch Anrechnung weiterer Ausgaben erreicht.', enseignement: 'Von der Grundschule bis zur Hochschule.', sante: 'Nationaler Gesundheitsdienst, von den Regionen verwaltet.',
        retraites: 'Alters- und Hinterbliebenenrenten (INPS). Die Regler der Gruppe „Renten“ kommen hinzu.',
        social: 'Arbeitslosigkeit, Familie, Invalidität, Ausgrenzung. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.',
        securite: 'Polizei, Carabinieri, Justiz.', economie: 'Verkehr, Energie, Unternehmenshilfen, Aufbauplan.',
        general: 'Allgemeine Verwaltung. Ohne Zinsen.', cadre: 'Wohnen, Umwelt, Kultur und Sport.',
      },
      prereglages: { effort: 'Geteilte Anstrengung' },
    }),
  };
  return commun.creerPays({ id: 'it', modele, sources, pib2024: 2190, options, specifique });
});

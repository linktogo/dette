// Simulateur néerlandais : particularités du pays en quatre langues. Le reste des textes
// et la structure des curseurs viennent de ../textes-communs.js.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) {
    module.exports = (modele, sources, partis = require('./partis.js')) => fabrique(require('../textes-communs.js'), modele, sources, partis);
  } else racine.PAYS = fabrique(racine.PaysCommun, racine.DettePaysBas, racine.SOURCES, racine.PARTIS);
})(globalThis, function (commun, modele, sources, partis) {
  const options = {
    economiesMax: 50, economiesPas: 1, fraudeMax: 10, criseMax: 120, ruAdulte: 700,
    // Approximation de l'application : défense portée vers 3,5 % du PIB en 2036 (engagement OTAN).
    prereglages: [{ id: 'defense', p: { poste_defense: 7.5 } }],
  };
  const specifique = {
    fr: (u) => ({
      titreDoc: 'Dette néerlandaise : projection à 10 ans',
      h1: 'Dette publique néerlandaise : projection 2027-2036',
      tva: [
        { nom: 'Taux normal', note: 'La plupart des biens et services.' },
        { nom: 'Taux réduit', note: 'Alimentation, médicaments, livres, hébergement.' },
      ],
      irZone: 'Tranches de la « box 1 » sous 49,5 %',
      groupes: {
        ir: { intro: 'Impôt sur le revenu (box 1) : environ 36 et 37,5 %, puis 49,5 % au-delà d’environ 78 000 €. Impôt sur les sociétés : 25,8 % (19 % sur les premiers bénéfices).' },
        retraites: { intro: 'Pension publique (AOW) à 67 ans, puis relevée avec l’espérance de vie (67 ans et 3 mois en 2028). Les pensions professionnelles par capitalisation complètent l’AOW.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Référence : 67 ans, lié à l’espérance de vie.',
      deriveNote: 'Dérive de la pension publique (AOW) : +0,3 point de PIB en 2036 et +0,8 en 2050 par rapport à 2026 (hypothèse de l’application).',
      chomageSource: 'CPB, prévision 2026',
      smiNote: '14,71 € bruts de l’heure en 2026 (21 ans et plus), soit environ 2 300 € par mois à 36 heures par semaine.',
      aides: 'aide sociale (bijstand), revenu minimum des retraités (AIO), la moitié des allocations logement et santé (huurtoeslag, zorgtoeslag), allocations familiales',
      criseNote: 'Covid : la dette est passée d’environ 48 % à 55 % du PIB en 2020.',
      depart: 'Bureau néerlandais d’analyse économique (CPB, septembre 2026) : déficit de 2,7 % et dette de 46,1 % du PIB en 2026. Le gouvernement (Miljoenennota 2027) retient 2,3 % et 45,6 %, puis 2,9 % de déficit en 2027. Dernier chiffre mesuré (CBS) : 44,7 % du PIB fin 2025, déficit de 1,6 %.',
      hypotheses: ['Le gouvernement projette une dette de 49,6 % du PIB fin 2031 avec un déficit ramené à 2,3 % ; le tendanciel de l’application, sans ces mesures, arrive plus haut. Les intérêts restent faibles : 8,5 Md€ en 2025, moins de 1 % du PIB.'],
      ignore: 'Il ignore aussi les fonds de pension professionnels, qui pèsent plus que le PIB mais ne font pas partie de la dette publique.',
      postes: {
        defense: 'Engagement OTAN de 3,5 % du PIB d’ici 2035 ; voir le préréglage « Défense à 3,5 % ».', enseignement: 'Du primaire au supérieur.', sante: 'Assurance santé et soins de longue durée, parmi les plus élevés d’Europe.',
        retraites: 'Pension publique (AOW) et pensions des fonctionnaires. Les curseurs du groupe « Retraites » s’y ajoutent.',
        social: 'Chômage, invalidité, famille, aide sociale, allocations. Le revenu universel, net des aides qu’il remplace, s’y ajoute.',
        securite: 'Police, justice.', economie: 'Transports, énergie, gestion de l’eau, aides aux entreprises.',
        general: 'Administration générale, contribution à l’UE. Hors intérêts.', cadre: 'Logement, environnement, culture et sport.',
      },
      prereglages: { defense: 'Défense à 3,5 % du PIB' },
    }),
    en: (u) => ({
      titreDoc: 'Dutch public debt: 10-year projection',
      h1: 'Dutch public debt: projection 2027-2036',
      tva: [
        { nom: 'Standard rate', note: 'Most goods and services.' },
        { nom: 'Reduced rate', note: 'Food, medicines, books, accommodation.' },
      ],
      irZone: '“Box 1” brackets below 49.5%',
      groupes: {
        ir: { intro: 'Income tax (box 1): about 36% and 37.5%, then 49.5% above about €78,000. Corporate tax: 25.8% (19% on the first profits).' },
        retraites: { intro: 'State pension (AOW) at 67, then rising with life expectancy (67 years 3 months in 2028). Funded occupational pensions top up the AOW.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Reference: 67, linked to life expectancy.',
      deriveNote: 'State pension (AOW) drift: +0.3 pp of GDP in 2036 and +0.8 in 2050 relative to 2026 (app assumption).',
      chomageSource: 'CPB, 2026 forecast',
      smiNote: '€14.71 gross per hour in 2026 (aged 21 and over), about €2,300 a month at 36 hours a week.',
      aides: 'social assistance (bijstand), minimum income for pensioners (AIO), half of housing and health allowances (huurtoeslag, zorgtoeslag), child benefits',
      criseNote: 'Covid: debt rose from about 48% to 55% of GDP in 2020.',
      depart: 'Netherlands Bureau for Economic Policy Analysis (CPB, September 2026): deficit of 2.7% and debt of 46.1% of GDP in 2026. The government (Miljoenennota 2027) assumes 2.3% and 45.6%, then a 2.9% deficit in 2027. Latest outturn (CBS): 44.7% of GDP at end-2025, a 1.6% deficit.',
      hypotheses: ['The government projects debt of 49.6% of GDP at end-2031 with the deficit brought back to 2.3%; the app baseline, without those measures, ends higher. Interest stays low: €8.5bn in 2025, under 1% of GDP.'],
      ignore: 'It also ignores occupational pension funds, which are larger than GDP but not part of public debt.',
      postes: {
        defense: 'NATO pledge of 3.5% of GDP by 2035; see the “Defence at 3.5%” preset.', enseignement: 'Primary to higher education.', sante: 'Health insurance and long-term care, among the highest in Europe.',
        retraites: 'State pension (AOW) and civil-service pensions. The “Pensions” sliders add to it.',
        social: 'Unemployment, disability, family, social assistance, allowances. Universal basic income, net of the benefits it replaces, is added here.',
        securite: 'Police, courts.', economie: 'Transport, energy, water management, business support.',
        general: 'General administration, EU contribution. Excluding interest.', cadre: 'Housing, environment, culture and sport.',
      },
      prereglages: { defense: 'Defence at 3.5% of GDP' },
    }),
    es: (u) => ({
      titreDoc: 'Deuda pública neerlandesa: proyección a 10 años',
      h1: 'Deuda pública neerlandesa: proyección 2027-2036',
      tva: [
        { nom: 'Tipo general', note: 'La mayoría de bienes y servicios.' },
        { nom: 'Tipo reducido', note: 'Alimentación, medicamentos, libros, alojamiento.' },
      ],
      irZone: 'Tramos del «box 1» por debajo del 49,5 %',
      groupes: {
        ir: { intro: 'Impuesto sobre la renta (box 1): en torno al 36 % y al 37,5 % y después 49,5 % por encima de unos 78 000 €. Impuesto sobre sociedades: 25,8 % (19 % sobre los primeros beneficios).' },
        retraites: { intro: 'Pensión pública (AOW) a los 67 años, que después sube con la esperanza de vida (67 años y 3 meses en 2028). Las pensiones profesionales por capitalización complementan la AOW.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Referencia: 67 años, vinculada a la esperanza de vida.',
      deriveNote: 'Deriva de la pensión pública (AOW): +0,3 puntos del PIB en 2036 y +0,8 en 2050 respecto a 2026 (hipótesis de la aplicación).',
      chomageSource: 'CPB, previsión 2026',
      smiNote: '14,71 € brutos por hora en 2026 (21 años o más), unos 2300 € al mes con 36 horas semanales.',
      aides: 'asistencia social (bijstand), renta mínima de los jubilados (AIO), la mitad de las ayudas a la vivienda y a la sanidad (huurtoeslag, zorgtoeslag), prestaciones familiares',
      criseNote: 'Covid: la deuda pasó de en torno al 48 % al 55 % del PIB en 2020.',
      depart: 'Oficina neerlandesa de análisis económico (CPB, septiembre de 2026): déficit del 2,7 % y deuda del 46,1 % del PIB en 2026. El Gobierno (Miljoenennota 2027) prevé el 2,3 % y el 45,6 %, y después un déficit del 2,9 % en 2027. Último dato observado (CBS): 44,7 % del PIB a finales de 2025 y déficit del 1,6 %.',
      hypotheses: ['El Gobierno proyecta una deuda del 49,6 % del PIB a finales de 2031 con el déficit reducido al 2,3 %; el tendencial de la aplicación, sin esas medidas, termina más alto. Los intereses siguen siendo bajos: 8,5 mil M€ en 2025, menos del 1 % del PIB.'],
      ignore: 'Tampoco tiene en cuenta los fondos de pensiones profesionales, mayores que el PIB pero ajenos a la deuda pública.',
      postes: {
        defense: 'Compromiso OTAN del 3,5 % del PIB de aquí a 2035; véase el escenario «Defensa al 3,5 %».', enseignement: 'De primaria a universidad.', sante: 'Seguro de salud y cuidados de larga duración, entre los más altos de Europa.',
        retraites: 'Pensión pública (AOW) y pensiones de los funcionarios. Los controles del grupo «Pensiones» se suman aquí.',
        social: 'Desempleo, invalidez, familia, asistencia social, subsidios. La renta básica, neta de las ayudas que sustituye, se suma aquí.',
        securite: 'Policía, justicia.', economie: 'Transporte, energía, gestión del agua, ayudas a empresas.',
        general: 'Administración general, contribución a la UE. Sin intereses.', cadre: 'Vivienda, medio ambiente, cultura y deporte.',
      },
      prereglages: { defense: 'Defensa al 3,5 % del PIB' },
    }),
    de: (u) => ({
      titreDoc: 'Niederländische Staatsschulden: Projektion über 10 Jahre',
      h1: 'Niederländische Staatsschulden: Projektion 2027-2036',
      tva: [
        { nom: 'Regelsatz', note: 'Die meisten Waren und Dienstleistungen.' },
        { nom: 'Ermäßigter Satz', note: 'Lebensmittel, Arzneimittel, Bücher, Beherbergung.' },
      ],
      irZone: 'Stufen der „Box 1“ unter 49,5 %',
      groupes: {
        ir: { intro: 'Einkommensteuer (Box 1): etwa 36 % und 37,5 %, dann 49,5 % ab etwa 78 000 €. Körperschaftsteuer: 25,8 % (19 % auf die ersten Gewinne).' },
        retraites: { intro: 'Staatliche Rente (AOW) mit 67, danach an die Lebenserwartung gekoppelt (67 Jahre und 3 Monate im Jahr 2028). Kapitalgedeckte Betriebsrenten ergänzen die AOW.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Referenz: 67 Jahre, an die Lebenserwartung gekoppelt.',
      deriveNote: 'Anstieg der staatlichen Rente (AOW): +0,3 Pp. des BIP im Jahr 2036 und +0,8 im Jahr 2050 gegenüber 2026 (Annahme der Anwendung).',
      chomageSource: 'CPB, Prognose 2026',
      smiNote: '14,71 € brutto pro Stunde im Jahr 2026 (ab 21 Jahren), etwa 2 300 € im Monat bei 36 Wochenstunden.',
      aides: 'Sozialhilfe (bijstand), Mindesteinkommen für Rentner (AIO), die Hälfte der Wohn- und Gesundheitszuschüsse (huurtoeslag, zorgtoeslag), Kindergeld',
      criseNote: 'Covid: Die Schulden stiegen 2020 von etwa 48 % auf 55 % des BIP.',
      depart: 'Niederländisches Büro für wirtschaftspolitische Analyse (CPB, September 2026): Defizit von 2,7 % und Schulden von 46,1 % des BIP im Jahr 2026. Die Regierung (Miljoenennota 2027) rechnet mit 2,3 % und 45,6 %, dann mit 2,9 % Defizit im Jahr 2027. Letzter gemessener Wert (CBS): 44,7 % des BIP Ende 2025, Defizit 1,6 %.',
      hypotheses: ['Die Regierung projiziert für Ende 2031 Schulden von 49,6 % des BIP bei einem auf 2,3 % gesenkten Defizit; das Basisszenario der Anwendung ohne diese Maßnahmen endet höher. Die Zinsen bleiben niedrig: 8,5 Mrd. € im Jahr 2025, unter 1 % des BIP.'],
      ignore: 'Es ignoriert auch die betrieblichen Pensionsfonds, die größer als das BIP sind, aber nicht zu den Staatsschulden zählen.',
      postes: {
        defense: 'NATO-Zusage von 3,5 % des BIP bis 2035; siehe Szenario „Verteidigung bei 3,5 %“.', enseignement: 'Von der Grundschule bis zur Hochschule.', sante: 'Krankenversicherung und Langzeitpflege, mit die höchsten in Europa.',
        retraites: 'Staatliche Rente (AOW) und Beamtenpensionen. Die Regler der Gruppe „Renten“ kommen hinzu.',
        social: 'Arbeitslosigkeit, Invalidität, Familie, Sozialhilfe, Zuschüsse. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.',
        securite: 'Polizei, Justiz.', economie: 'Verkehr, Energie, Wassermanagement, Unternehmenshilfen.',
        general: 'Allgemeine Verwaltung, EU-Beitrag. Ohne Zinsen.', cadre: 'Wohnen, Umwelt, Kultur und Sport.',
      },
      prereglages: { defense: 'Verteidigung bei 3,5 % des BIP' },
    }),
  };
  return commun.creerPays({ id: 'nl', modele, sources, partis, pib2024: 1130, options, specifique });
});

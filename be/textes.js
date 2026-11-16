// Simulateur belge : particularités du pays en quatre langues. Le reste des textes
// et la structure des curseurs viennent de ../textes-communs.js.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) {
    module.exports = (modele, sources, partis = require('./partis.js')) => fabrique(require('../textes-communs.js'), modele, sources, partis);
  } else racine.PAYS = fabrique(racine.PaysCommun, racine.DetteBelgique, racine.SOURCES, racine.PARTIS);
})(globalThis, function (commun, modele, sources, partis) {
  const options = {
    economiesMax: 30, economiesPas: 1, fraudeMax: 6, criseMax: 70, ruAdulte: 600,
    // 16 Md€ d'économies : déficit ramené vers 3 % du PIB en 2029 (calcul de l'application).
    prereglages: [{ id: 'deficit3', p: { economies: 16 } }],
  };
  const specifique = {
    fr: (u) => ({
      titreDoc: 'Dette belge : projection à 10 ans',
      h1: 'Dette publique belge : projection 2027-2036',
      tva: [
        { nom: 'Taux normal', note: 'La plupart des biens et services.' },
        { nom: 'Taux intermédiaire', note: 'Restauration, certains travaux.' },
        { nom: 'Taux réduit', note: 'Alimentation, médicaments, livres.' },
      ],
      irZone: 'Tranches de 25 à 45 %',
      groupes: {
        ir: { intro: 'Impôt des personnes physiques : 25, 40, 45 et 50 %, ce dernier au-delà d’environ 49 000 € ; additionnels communaux en plus. Impôt des sociétés : 25 %.' },
        retraites: { intro: 'Âge légal de la pension : 66 ans depuis 2025, 67 ans en 2030.' },
      },
      ageRef: 66, ageRefCourt: 66,
      ageNote: 'Référence : 66 ans, porté à 67 ans en 2030 par la loi.',
      deriveNote: 'Dérive des pensions : +0,5 point de PIB en 2036 et +1,2 en 2050 par rapport à 2026 (hypothèse de l’application, coût du vieillissement net des réformes).',
      chomageSource: 'BNB, projection 2026 (taux harmonisé)',
      smiNote: 'Revenu minimum mensuel moyen garanti : 2 233,61 € bruts depuis juillet 2026 (CNT).',
      aides: 'revenu d’intégration sociale, garantie de revenus aux personnes âgées (GRAPA), allocations aux personnes handicapées, la moitié des aides au logement, allocations familiales',
      criseNote: 'Covid : la dette est passée d’environ 98 % à 112 % du PIB en 2020.',
      depart: 'Banque nationale (projections de juin 2026) : déficit de 5,3 % et dette de 111,3 % du PIB en 2026, puis 5,7 % et 114,8 % en 2028. Dernier chiffre mesuré : 107,9 % du PIB fin 2025, déficit de 5,2 % ; recettes de 49,2 % du PIB.',
      hypotheses: ['Le Bureau fédéral du Plan projette une dette de 117 % en 2029 et de 122 % en 2031 (février 2026), et un déficit de 6,4 % en 2031 (juin 2026). Le préréglage « Déficit vers 3 % » applique 16 Md€ d’économies, ce qui ramène le déficit vers 3,7 % en 2029 (calcul de l’application).'],
      ignore: 'Il ignore aussi la répartition du déficit entre le fédéral, les régions et les communautés.',
      postes: {
        defense: 'Environ 1,1 % du PIB dans la nomenclature des fonctions publiques ; l’effort au sens de l’OTAN, plus large (pensions militaires comprises), est plus élevé.', enseignement: 'Compétence des communautés.', sante: 'Assurance soins de santé (INAMI).',
        retraites: 'Pensions des salariés, indépendants et fonctionnaires. Les curseurs du groupe « Retraites » s’y ajoutent.',
        social: 'Chômage, allocations familiales, invalidité, aide sociale. Le revenu universel, net des aides qu’il remplace, s’y ajoute.',
        securite: 'Police fédérale et locale, justice.', economie: 'Transports, énergie, aides aux entreprises.',
        general: 'Administration générale. Hors intérêts.', cadre: 'Logement, environnement, culture et sport.',
      },
      prereglages: { deficit3: 'Déficit vers 3 % (16 Md€)' },
    }),
    en: (u) => ({
      titreDoc: 'Belgian public debt: 10-year projection',
      h1: 'Belgian public debt: projection 2027-2036',
      tva: [
        { nom: 'Standard rate', note: 'Most goods and services.' },
        { nom: 'Intermediate rate', note: 'Restaurants, some building work.' },
        { nom: 'Reduced rate', note: 'Food, medicines, books.' },
      ],
      irZone: 'Brackets from 25% to 45%',
      groupes: {
        ir: { intro: 'Personal income tax: 25, 40, 45 and 50%, the latter above about €49,000; plus municipal surcharges. Corporate tax: 25%.' },
        retraites: { intro: 'Statutory pension age: 66 since 2025, 67 in 2030.' },
      },
      ageRef: 66, ageRefCourt: 66,
      ageNote: 'Reference: 66, raised by law to 67 in 2030.',
      deriveNote: 'Pension drift: +0.5 pp of GDP in 2036 and +1.2 in 2050 relative to 2026 (app assumption, cost of ageing net of reforms).',
      chomageSource: 'NBB, 2026 projection (harmonised rate)',
      smiNote: 'Guaranteed average monthly minimum income: €2,233.61 gross since July 2026 (CNT).',
      aides: 'social integration income, income guarantee for older people (GRAPA), disability allowances, half of housing support, family allowances',
      criseNote: 'Covid: debt rose from about 98% to 112% of GDP in 2020.',
      depart: 'National Bank (June 2026 projections): deficit of 5.3% and debt of 111.3% of GDP in 2026, then 5.7% and 114.8% in 2028. Latest outturn: 107.9% of GDP at end-2025, a 5.2% deficit; revenue of 49.2% of GDP.',
      hypotheses: ['The Federal Planning Bureau projects debt of 117% in 2029 and 122% in 2031 (February 2026), and a 6.4% deficit in 2031 (June 2026). The “Deficit towards 3%” preset applies €16bn of savings, bringing the deficit to about 3.7% in 2029 (app calculation).'],
      ignore: 'It also ignores how the deficit is split between the federal level, the regions and the communities.',
      postes: {
        defense: 'About 1.1% of GDP in the classification of government functions; the NATO measure, which is broader (military pensions included), is higher.', enseignement: 'A competence of the communities.', sante: 'Health care insurance (INAMI).',
        retraites: 'Pensions of employees, the self-employed and civil servants. The “Pensions” sliders add to it.',
        social: 'Unemployment, family allowances, disability, social assistance. Universal basic income, net of the benefits it replaces, is added here.',
        securite: 'Federal and local police, courts.', economie: 'Transport, energy, business support.',
        general: 'General administration. Excluding interest.', cadre: 'Housing, environment, culture and sport.',
      },
      prereglages: { deficit3: 'Deficit towards 3% (€16bn)' },
    }),
    es: (u) => ({
      titreDoc: 'Deuda pública belga: proyección a 10 años',
      h1: 'Deuda pública belga: proyección 2027-2036',
      tva: [
        { nom: 'Tipo general', note: 'La mayoría de bienes y servicios.' },
        { nom: 'Tipo intermedio', note: 'Restauración, algunas obras.' },
        { nom: 'Tipo reducido', note: 'Alimentación, medicamentos, libros.' },
      ],
      irZone: 'Tramos del 25 al 45 %',
      groupes: {
        ir: { intro: 'Impuesto sobre la renta de las personas físicas: 25, 40, 45 y 50 %, este por encima de unos 49 000 €; más recargos municipales. Impuesto sobre sociedades: 25 %.' },
        retraites: { intro: 'Edad legal de jubilación: 66 años desde 2025 y 67 en 2030.' },
      },
      ageRef: 66, ageRefCourt: 66,
      ageNote: 'Referencia: 66 años, elevada por ley a 67 en 2030.',
      deriveNote: 'Deriva de las pensiones: +0,5 puntos del PIB en 2036 y +1,2 en 2050 respecto a 2026 (hipótesis de la aplicación, coste del envejecimiento neto de reformas).',
      chomageSource: 'BNB, proyección 2026 (tasa armonizada)',
      smiNote: 'Renta mínima mensual media garantizada: 2233,61 € brutos desde julio de 2026 (CNT).',
      aides: 'renta de integración social, garantía de ingresos para mayores (GRAPA), prestaciones por discapacidad, la mitad de las ayudas a la vivienda, prestaciones familiares',
      criseNote: 'Covid: la deuda pasó de en torno al 98 % al 112 % del PIB en 2020.',
      depart: 'Banco Nacional (proyecciones de junio de 2026): déficit del 5,3 % y deuda del 111,3 % del PIB en 2026, y después 5,7 % y 114,8 % en 2028. Último dato observado: 107,9 % del PIB a finales de 2025 y déficit del 5,2 %; ingresos del 49,2 % del PIB.',
      hypotheses: ['La Oficina Federal del Plan proyecta una deuda del 117 % en 2029 y del 122 % en 2031 (febrero de 2026), y un déficit del 6,4 % en 2031 (junio de 2026). El escenario «Déficit hacia el 3 %» aplica 16 mil M€ de ahorros, lo que lleva el déficit hacia el 3,7 % en 2029 (cálculo de la aplicación).'],
      ignore: 'Tampoco tiene en cuenta el reparto del déficit entre el nivel federal, las regiones y las comunidades.',
      postes: {
        defense: 'En torno al 1,1 % del PIB en la clasificación de funciones públicas; el esfuerzo según la OTAN, más amplio (incluye pensiones militares), es mayor.', enseignement: 'Competencia de las comunidades.', sante: 'Seguro de asistencia sanitaria (INAMI).',
        retraites: 'Pensiones de asalariados, autónomos y funcionarios. Los controles del grupo «Pensiones» se suman aquí.',
        social: 'Desempleo, prestaciones familiares, invalidez, asistencia social. La renta básica, neta de las ayudas que sustituye, se suma aquí.',
        securite: 'Policía federal y local, justicia.', economie: 'Transporte, energía, ayudas a empresas.',
        general: 'Administración general. Sin intereses.', cadre: 'Vivienda, medio ambiente, cultura y deporte.',
      },
      prereglages: { deficit3: 'Déficit hacia el 3 % (16 mil M€)' },
    }),
    de: (u) => ({
      titreDoc: 'Belgische Staatsschulden: Projektion über 10 Jahre',
      h1: 'Belgische Staatsschulden: Projektion 2027-2036',
      tva: [
        { nom: 'Regelsatz', note: 'Die meisten Waren und Dienstleistungen.' },
        { nom: 'Zwischensatz', note: 'Gastronomie, einige Bauarbeiten.' },
        { nom: 'Ermäßigter Satz', note: 'Lebensmittel, Arzneimittel, Bücher.' },
      ],
      irZone: 'Stufen von 25 bis 45 %',
      groupes: {
        ir: { intro: 'Einkommensteuer natürlicher Personen: 25, 40, 45 und 50 %, Letzterer ab etwa 49 000 €; zuzüglich Gemeindezuschläge. Körperschaftsteuer: 25 %.' },
        retraites: { intro: 'Gesetzliches Rentenalter: 66 Jahre seit 2025, 67 Jahre ab 2030.' },
      },
      ageRef: 66, ageRefCourt: 66,
      ageNote: 'Referenz: 66 Jahre, per Gesetz 2030 auf 67 angehoben.',
      deriveNote: 'Anstieg der Rentenausgaben: +0,5 Pp. des BIP im Jahr 2036 und +1,2 im Jahr 2050 gegenüber 2026 (Annahme der Anwendung, Alterungskosten abzüglich Reformen).',
      chomageSource: 'NBB, Projektion 2026 (harmonisierte Quote)',
      smiNote: 'Garantiertes durchschnittliches Mindestmonatseinkommen: 2 233,61 € brutto seit Juli 2026 (CNT).',
      aides: 'soziales Eingliederungseinkommen, Einkommensgarantie für Ältere (GRAPA), Behindertenbeihilfen, die Hälfte der Wohnhilfen, Familienbeihilfen',
      criseNote: 'Covid: Die Schulden stiegen 2020 von etwa 98 % auf 112 % des BIP.',
      depart: 'Nationalbank (Projektionen Juni 2026): Defizit von 5,3 % und Schulden von 111,3 % des BIP im Jahr 2026, dann 5,7 % und 114,8 % im Jahr 2028. Letzter gemessener Wert: 107,9 % des BIP Ende 2025, Defizit 5,2 %; Einnahmen 49,2 % des BIP.',
      hypotheses: ['Das Föderale Planbüro projiziert Schulden von 117 % im Jahr 2029 und 122 % im Jahr 2031 (Februar 2026) sowie ein Defizit von 6,4 % im Jahr 2031 (Juni 2026). Das Szenario „Defizit Richtung 3 %“ wendet Einsparungen von 16 Mrd. € an und senkt das Defizit 2029 auf etwa 3,7 % (Berechnung der Anwendung).'],
      ignore: 'Es ignoriert auch die Aufteilung des Defizits zwischen Föderalstaat, Regionen und Gemeinschaften.',
      postes: {
        defense: 'Etwa 1,1 % des BIP in der Gliederung nach Staatsaufgaben; nach NATO-Definition, die breiter ist (inklusive Militärpensionen), liegt der Wert höher.', enseignement: 'Zuständigkeit der Gemeinschaften.', sante: 'Krankenversicherung (LIKIV).',
        retraites: 'Renten von Arbeitnehmern, Selbstständigen und Beamten. Die Regler der Gruppe „Renten“ kommen hinzu.',
        social: 'Arbeitslosigkeit, Familienbeihilfen, Invalidität, Sozialhilfe. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.',
        securite: 'Föderale und lokale Polizei, Justiz.', economie: 'Verkehr, Energie, Unternehmenshilfen.',
        general: 'Allgemeine Verwaltung. Ohne Zinsen.', cadre: 'Wohnen, Umwelt, Kultur und Sport.',
      },
      prereglages: { deficit3: 'Defizit Richtung 3 % (16 Mrd. €)' },
    }),
  };
  return commun.creerPays({ id: 'be', modele, sources, partis, pib2024: 615, options, specifique });
});

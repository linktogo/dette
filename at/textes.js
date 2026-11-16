// Simulateur autrichien : particularités du pays en quatre langues. Le reste des textes
// et la structure des curseurs viennent de ../textes-communs.js. Pas de salaire minimum
// légal en Autriche : le groupe correspondant n'apparaît pas.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) {
    module.exports = (modele, sources) => fabrique(require('../textes-communs.js'), modele, sources);
  } else racine.PAYS = fabrique(racine.PaysCommun, racine.DetteAutriche, racine.SOURCES);
})(globalThis, function (commun, modele, sources) {
  const options = {
    economiesMax: 20, economiesPas: 0.5, fraudeMax: 4, criseMax: 50, ruAdulte: 600,
    // Approximation de l'application : mesures de consolidation de 2025-2026, environ 0,6 point de PIB.
    prereglages: [{ id: 'consolidation', p: { economies: 3.5 } }],
  };
  const specifique = {
    fr: (u) => ({
      titreDoc: 'Dette autrichienne : projection à 10 ans',
      h1: 'Dette publique autrichienne : projection 2027-2036',
      tva: [
        { nom: 'Taux normal', note: 'La plupart des biens et services.' },
        { nom: 'Taux réduit', note: 'Culture, hébergement, certains produits agricoles.' },
        { nom: 'Taux super-réduit', note: 'Alimentation, loyers, médicaments, livres.' },
      ],
      irZone: 'Tranches de 20 à 48 %',
      groupes: {
        ir: { intro: 'Impôt sur le revenu progressif de 0 à 50 % ; 55 % au-delà de 1 M€, à titre temporaire. Impôt sur les sociétés (KöSt) : 23 %.' },
        retraites: { intro: 'Âge légal de 65 ans ; celui des femmes est relevé d’une demi-année par an depuis 2024 pour atteindre 65 ans en 2033.' },
      },
      ageRef: 65, ageRefCourt: 65,
      ageNote: 'Référence : 65 ans (convergence en cours de l’âge des femmes).',
      deriveNote: 'Dérive des pensions : +0,6 point de PIB en 2036 et +0,8 en 2050 par rapport à 2026, avec les départs des baby-boomers (hypothèse de l’application).',
      chomageSource: 'AMS, définition nationale, octobre 2026 ; 6,3 % au sens d’Eurostat',
      aides: 'aide sociale, complément de pension minimale (Ausgleichszulage), allocation de chômage d’assistance (Notstandshilfe), la moitié des aides au logement, allocations familiales',
      criseNote: 'Covid : la dette est passée d’environ 71 % à 83 % du PIB en 2020.',
      depart: 'Ministère des Finances (octobre 2026) : dette de 82,4 % du PIB et déficit de 4,1 % en 2026, puis 83,2 % et 3,6 % en 2027 ; le Fiskalrat prévoit 4,0 % de déficit en 2026. Intérêts d’environ 2,0 % du PIB (hypothèse de l’application). Dernier chiffre mesuré : 81,5 % du PIB fin 2025 (418,1 Md€), déficit de 4,2 % : l’Autriche est en procédure pour déficit excessif.',
      hypotheses: ['Le Fiskalrat prévoit une dette de 87,8 % du PIB en 2030 malgré les mesures de consolidation ; le préréglage « Consolidation votée » en donne une approximation (environ 3,5 Md€).'],
      ignore: 'Il ignore aussi le pacte de stabilité interne entre l’État fédéral, les Länder et les communes.',
      postes: {
        defense: 'Pays neutre ; la dépense doit être portée progressivement vers 2 % du PIB.', enseignement: 'Du primaire au supérieur.', sante: 'Assurance maladie, hôpitaux des Länder.',
        retraites: 'Assurance pension et pensions des fonctionnaires. Les curseurs du groupe « Retraites » s’y ajoutent.',
        social: 'Chômage, famille, dépendance, aide sociale. Le revenu universel, net des aides qu’il remplace, s’y ajoute.',
        securite: 'Police, justice.', economie: 'Transports, énergie, agriculture, aides aux entreprises.',
        general: 'Administration générale. Hors intérêts.', cadre: 'Logement, environnement, culture et sport.',
      },
      prereglages: { consolidation: 'Consolidation votée' },
    }),
    en: (u) => ({
      titreDoc: 'Austrian public debt: 10-year projection',
      h1: 'Austrian public debt: projection 2027-2036',
      tva: [
        { nom: 'Standard rate', note: 'Most goods and services.' },
        { nom: 'Reduced rate', note: 'Culture, accommodation, some farm products.' },
        { nom: 'Super-reduced rate', note: 'Food, rents, medicines, books.' },
      ],
      irZone: 'Brackets from 20% to 48%',
      groupes: {
        ir: { intro: 'Progressive income tax from 0% to 50%; 55% above €1m, on a temporary basis. Corporate tax (KöSt): 23%.' },
        retraites: { intro: 'Statutory age of 65; the women’s age has been rising by half a year each year since 2024, reaching 65 in 2033.' },
      },
      ageRef: 65, ageRefCourt: 65,
      ageNote: 'Reference: 65 (women’s age converging).',
      deriveNote: 'Pension drift: +0.6 pp of GDP in 2036 and +0.8 in 2050 relative to 2026, as the baby boomers retire (app assumption).',
      chomageSource: 'AMS, national definition, October 2026; 6.3% on Eurostat’s definition',
      aides: 'social assistance, minimum-pension supplement (Ausgleichszulage), unemployment assistance (Notstandshilfe), half of housing support, family allowances',
      criseNote: 'Covid: debt rose from about 71% to 83% of GDP in 2020.',
      depart: 'Finance Ministry (October 2026): debt of 82.4% of GDP and a 4.1% deficit in 2026, then 83.2% and 3.6% in 2027; the Fiscal Council expects a 4.0% deficit in 2026. Interest of about 2.0% of GDP (app assumption). Latest outturn: 81.5% of GDP at end-2025 (€418.1bn), a 4.2% deficit: Austria is under the excessive deficit procedure.',
      hypotheses: ['The Fiscal Council expects debt of 87.8% of GDP in 2030 despite the consolidation measures; the “Adopted consolidation” preset approximates them (about €3.5bn).'],
      ignore: 'It also ignores the internal stability pact between the federal government, the Länder and municipalities.',
      postes: {
        defense: 'Neutral country; spending is to rise gradually towards 2% of GDP.', enseignement: 'Primary to higher education.', sante: 'Health insurance, Länder hospitals.',
        retraites: 'Pension insurance and civil-service pensions. The “Pensions” sliders add to it.',
        social: 'Unemployment, family, long-term care, social assistance. Universal basic income, net of the benefits it replaces, is added here.',
        securite: 'Police, courts.', economie: 'Transport, energy, agriculture, business support.',
        general: 'General administration. Excluding interest.', cadre: 'Housing, environment, culture and sport.',
      },
      prereglages: { consolidation: 'Adopted consolidation' },
    }),
    es: (u) => ({
      titreDoc: 'Deuda pública austriaca: proyección a 10 años',
      h1: 'Deuda pública austriaca: proyección 2027-2036',
      tva: [
        { nom: 'Tipo general', note: 'La mayoría de bienes y servicios.' },
        { nom: 'Tipo reducido', note: 'Cultura, alojamiento, algunos productos agrícolas.' },
        { nom: 'Tipo superreducido', note: 'Alimentación, alquileres, medicamentos, libros.' },
      ],
      irZone: 'Tramos del 20 al 48 %',
      groupes: {
        ir: { intro: 'Impuesto sobre la renta progresivo del 0 al 50 %; 55 % por encima de 1 M€, con carácter temporal. Impuesto sobre sociedades (KöSt): 23 %.' },
        retraites: { intro: 'Edad legal de 65 años; la de las mujeres sube medio año cada año desde 2024 hasta alcanzar los 65 en 2033.' },
      },
      ageRef: 65, ageRefCourt: 65,
      ageNote: 'Referencia: 65 años (convergencia en curso de la edad de las mujeres).',
      deriveNote: 'Deriva de las pensiones: +0,6 puntos del PIB en 2036 y +0,8 en 2050 respecto a 2026, por la jubilación del baby boom (hipótesis de la aplicación).',
      chomageSource: 'AMS, definición nacional, octubre de 2026; 6,3 % según Eurostat',
      aides: 'asistencia social, complemento de pensión mínima (Ausgleichszulage), subsidio de desempleo asistencial (Notstandshilfe), la mitad de las ayudas a la vivienda, prestaciones familiares',
      criseNote: 'Covid: la deuda pasó de en torno al 71 % al 83 % del PIB en 2020.',
      depart: 'Ministerio de Finanzas (octubre de 2026): deuda del 82,4 % del PIB y déficit del 4,1 % en 2026, y después 83,2 % y 3,6 % en 2027; el Consejo Fiscal prevé un déficit del 4,0 % en 2026. Intereses de en torno al 2,0 % del PIB (hipótesis de la aplicación). Último dato observado: 81,5 % del PIB a finales de 2025 (418,1 mil M€) y déficit del 4,2 %: Austria está en procedimiento por déficit excesivo.',
      hypotheses: ['El Consejo Fiscal prevé una deuda del 87,8 % del PIB en 2030 pese a las medidas de consolidación; el escenario «Consolidación aprobada» las aproxima (unos 3,5 mil M€).'],
      ignore: 'Tampoco tiene en cuenta el pacto de estabilidad interno entre el Estado federal, los Länder y los municipios.',
      postes: {
        defense: 'País neutral; el gasto debe subir progresivamente hacia el 2 % del PIB.', enseignement: 'De primaria a universidad.', sante: 'Seguro de enfermedad, hospitales de los Länder.',
        retraites: 'Seguro de pensiones y pensiones de los funcionarios. Los controles del grupo «Pensiones» se suman aquí.',
        social: 'Desempleo, familia, dependencia, asistencia social. La renta básica, neta de las ayudas que sustituye, se suma aquí.',
        securite: 'Policía, justicia.', economie: 'Transporte, energía, agricultura, ayudas a empresas.',
        general: 'Administración general. Sin intereses.', cadre: 'Vivienda, medio ambiente, cultura y deporte.',
      },
      prereglages: { consolidation: 'Consolidación aprobada' },
    }),
    de: (u) => ({
      titreDoc: 'Österreichische Staatsschulden: Projektion über 10 Jahre',
      h1: 'Österreichische Staatsschulden: Projektion 2027-2036',
      tva: [
        { nom: 'Normalsteuersatz', note: 'Die meisten Waren und Dienstleistungen.' },
        { nom: 'Ermäßigter Satz', note: 'Kultur, Beherbergung, einige landwirtschaftliche Produkte.' },
        { nom: 'Stark ermäßigter Satz', note: 'Lebensmittel, Mieten, Arzneimittel, Bücher.' },
      ],
      irZone: 'Tarifstufen von 20 bis 48 %',
      groupes: {
        ir: { intro: 'Progressive Einkommensteuer von 0 bis 50 %; 55 % ab 1 Mio. €, befristet. Körperschaftsteuer (KöSt): 23 %.' },
        retraites: { intro: 'Regelpensionsalter 65 Jahre; das der Frauen steigt seit 2024 jedes Jahr um ein halbes Jahr und erreicht 2033 ebenfalls 65.' },
      },
      ageRef: 65, ageRefCourt: 65,
      ageNote: 'Referenz: 65 Jahre (Angleichung des Frauenpensionsalters läuft).',
      deriveNote: 'Anstieg der Pensionsausgaben: +0,6 Pp. des BIP im Jahr 2036 und +0,8 im Jahr 2050 gegenüber 2026, durch den Pensionsantritt der Babyboomer (Annahme der Anwendung).',
      chomageSource: 'AMS, nationale Definition, Oktober 2026; 6,3 % nach Eurostat',
      aides: 'Sozialhilfe, Ausgleichszulage, Notstandshilfe, die Hälfte der Wohnbeihilfen, Familienbeihilfe',
      criseNote: 'Covid: Die Schulden stiegen 2020 von etwa 71 % auf 83 % des BIP.',
      depart: 'Finanzministerium (Oktober 2026): Schulden von 82,4 % des BIP und Defizit von 4,1 % im Jahr 2026, dann 83,2 % und 3,6 % im Jahr 2027; der Fiskalrat erwartet 2026 ein Defizit von 4,0 %. Zinsen von etwa 2,0 % des BIP (Annahme der Anwendung). Letzter gemessener Wert: 81,5 % des BIP Ende 2025 (418,1 Mrd. €), Defizit 4,2 %: Österreich ist im Defizitverfahren.',
      hypotheses: ['Der Fiskalrat erwartet trotz der Konsolidierungsmaßnahmen eine Schuldenquote von 87,8 % im Jahr 2030; das Szenario „Beschlossene Konsolidierung“ bildet diese Maßnahmen näherungsweise ab (etwa 3,5 Mrd. €).'],
      ignore: 'Es ignoriert auch den innerösterreichischen Stabilitätspakt zwischen Bund, Ländern und Gemeinden.',
      postes: {
        defense: 'Neutrales Land; die Ausgaben sollen schrittweise gegen 2 % des BIP steigen.', enseignement: 'Von der Volksschule bis zur Hochschule.', sante: 'Krankenversicherung, Landeskrankenhäuser.',
        retraites: 'Pensionsversicherung und Beamtenpensionen. Die Regler der Gruppe „Renten“ kommen hinzu.',
        social: 'Arbeitslosigkeit, Familie, Pflege, Sozialhilfe. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.',
        securite: 'Polizei, Justiz.', economie: 'Verkehr, Energie, Landwirtschaft, Unternehmenshilfen.',
        general: 'Allgemeine Verwaltung. Ohne Zinsen.', cadre: 'Wohnen, Umwelt, Kultur und Sport.',
      },
      prereglages: { consolidation: 'Beschlossene Konsolidierung' },
    }),
  };
  return commun.creerPays({ id: 'at', modele, sources, pib2024: 480, options, specifique });
});

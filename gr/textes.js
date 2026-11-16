// Simulateur grec : particularités du pays en quatre langues. Le reste des textes
// et la structure des curseurs viennent de ../textes-communs.js.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) {
    module.exports = (modele, sources, partis = require('./partis.js')) => fabrique(require('../textes-communs.js'), modele, sources, partis);
  } else racine.PAYS = fabrique(racine.PaysCommun, racine.DetteGrece, racine.SOURCES, racine.PARTIS);
})(globalThis, function (commun, modele, sources, partis) {
  const options = {
    economiesMax: 12, economiesPas: 0.5, fraudeMax: 4, criseMax: 30, ruAdulte: 300,
    prereglages: [{ id: 'relache', p: { depenses: 2.5 } }],
  };
  const specifique = {
    fr: (u) => ({
      titreDoc: 'Dette grecque : projection à 10 ans',
      h1: 'Dette publique grecque : projection 2027-2036',
      tva: [
        { nom: 'Taux normal', note: 'La plupart des biens et services (taux réduits dans certaines îles).' },
        { nom: 'Taux réduit', note: 'Alimentation, restauration, transports.' },
        { nom: 'Taux super-réduit', note: 'Médicaments, livres, spectacles.' },
      ],
      irZone: 'Tranches sous 44 %',
      groupes: {
        ir: { intro: 'Impôt sur le revenu de 9 % à 44 % au-delà de 60 000 € ; la réforme de 2026 a abaissé les taux des revenus moyens et créé une tranche à 39 %.' },
        retraites: { intro: 'Âge légal de 67 ans (62 ans avec 40 années de cotisation). Les réformes de la crise font reculer le poids des pensions à long terme.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Référence : 67 ans ; une indexation sur l’espérance de vie est prévue après 2027.',
      deriveNote: 'Dépense de pensions en recul : −0,4 point de PIB en 2036 et −1,2 en 2050 par rapport à 2026 (hypothèse de l’application ; l’Ageing Report 2024 prévoit −2,5 points d’ici 2070).',
      chomageSource: 'ELSTAT, septembre 2026',
      smiNote: '920 € sur 14 mois depuis avril 2026 ; 950 € visés en 2027.',
      aides: 'revenu minimum garanti, allocation aux personnes âgées non assurées, prestations d’invalidité non contributives, la moitié de l’aide au logement, allocations familiales',
      criseNote: 'Crise de la dette de 2010-2012 : dette au-delà de 170 % du PIB malgré la restructuration de 2012 ; Covid : plus de 200 % en 2020.',
      depart: 'Ministère des Finances (projet de plan budgétaire 2027, octobre 2026) : dette de 136,7 % du PIB, excédent de 0,6 % et intérêts de 3,0 % du PIB en 2026, puis dette de 128,8 % en 2027. Dernier chiffre mesuré : 146,1 % du PIB fin 2025 (362,9 Md€), excédent de 1,7 % et excédent primaire de 4,9 %.',
      refinancement: 'La dette grecque est surtout faite de prêts européens à taux fixe et à très longue échéance : le taux de marché ne la touche que lentement.',
      hypotheses: ['Les remboursements anticipés de prêts européens, qui réduisent la dette en valeur, ne sont pas représentés.'],
      ignore: 'Il ignore aussi les engagements d’excédent primaire pris auprès des créanciers européens.',
      postes: {
        defense: 'Parmi les plus élevées de l’OTAN en part du PIB.', enseignement: 'Du primaire au supérieur.', sante: 'Système national de santé (ESY).',
        retraites: 'Pensions principales et complémentaires (EFKA). Les curseurs du groupe « Retraites » s’y ajoutent.',
        social: 'Chômage, famille, invalidité, exclusion. Le revenu universel, net des aides qu’il remplace, s’y ajoute.',
        securite: 'Police, garde-côtes, justice.', economie: 'Transports, énergie, aides aux entreprises, fonds européens.',
        general: 'Administration générale. Hors intérêts.', cadre: 'Logement, environnement, culture et sport.',
      },
      prereglages: { relache: 'Excédents relâchés' },
    }),
    en: (u) => ({
      titreDoc: 'Greek public debt: 10-year projection',
      h1: 'Greek public debt: projection 2027-2036',
      tva: [
        { nom: 'Standard rate', note: 'Most goods and services (lower rates on some islands).' },
        { nom: 'Reduced rate', note: 'Food, restaurants, transport.' },
        { nom: 'Super-reduced rate', note: 'Medicines, books, performances.' },
      ],
      irZone: 'Brackets below 44%',
      groupes: {
        ir: { intro: 'Income tax from 9% to 44% above €60,000; the 2026 reform cut rates on middle incomes and created a 39% bracket.' },
        retraites: { intro: 'Statutory age of 67 (62 with 40 years of contributions). The crisis-era reforms reduce the weight of pensions in the long run.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Reference: 67; indexation to life expectancy is planned after 2027.',
      deriveNote: 'Pension spending falling: −0.4 pp of GDP in 2036 and −1.2 in 2050 relative to 2026 (app assumption; the 2024 Ageing Report projects −2.5 points by 2070).',
      chomageSource: 'ELSTAT, September 2026',
      smiNote: '€920 over 14 payments since April 2026; €950 targeted for 2027.',
      aides: 'guaranteed minimum income, allowance for uninsured older people, non-contributory disability benefits, half of housing support, family allowances',
      criseNote: '2010-2012 debt crisis: debt above 170% of GDP despite the 2012 restructuring; Covid: over 200% in 2020.',
      depart: 'Finance Ministry (2027 draft budgetary plan, October 2026): debt of 136.7% of GDP, a 0.6% surplus and interest of 3.0% of GDP in 2026, then debt of 128.8% in 2027. Latest outturn: 146.1% of GDP at end-2025 (€362.9bn), a 1.7% surplus and a 4.9% primary surplus.',
      refinancement: 'Greek debt is mostly European loans at fixed rates with very long maturities: market rates affect it only slowly.',
      hypotheses: ['Early repayments of European loans, which reduce debt in euros, are not modelled.'],
      ignore: 'It also ignores the primary-surplus commitments made to European creditors.',
      postes: {
        defense: 'Among the highest in NATO as a share of GDP.', enseignement: 'Primary to higher education.', sante: 'National health system (ESY).',
        retraites: 'Main and supplementary pensions (EFKA). The “Pensions” sliders add to it.',
        social: 'Unemployment, family, disability, exclusion. Universal basic income, net of the benefits it replaces, is added here.',
        securite: 'Police, coast guard, courts.', economie: 'Transport, energy, business support, EU funds.',
        general: 'General administration. Excluding interest.', cadre: 'Housing, environment, culture and sport.',
      },
      prereglages: { relache: 'Looser surpluses' },
    }),
    es: (u) => ({
      titreDoc: 'Deuda pública griega: proyección a 10 años',
      h1: 'Deuda pública griega: proyección 2027-2036',
      tva: [
        { nom: 'Tipo general', note: 'La mayoría de bienes y servicios (tipos reducidos en algunas islas).' },
        { nom: 'Tipo reducido', note: 'Alimentación, restauración, transporte.' },
        { nom: 'Tipo superreducido', note: 'Medicamentos, libros, espectáculos.' },
      ],
      irZone: 'Tramos por debajo del 44 %',
      groupes: {
        ir: { intro: 'Impuesto sobre la renta del 9 % al 44 % por encima de 60 000 €; la reforma de 2026 rebajó los tipos de las rentas medias y creó un tramo del 39 %.' },
        retraites: { intro: 'Edad legal de 67 años (62 con 40 años cotizados). Las reformas de la crisis reducen el peso de las pensiones a largo plazo.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Referencia: 67 años; se prevé vincularla a la esperanza de vida después de 2027.',
      deriveNote: 'Gasto en pensiones a la baja: −0,4 puntos del PIB en 2036 y −1,2 en 2050 respecto a 2026 (hipótesis de la aplicación; el Ageing Report 2024 prevé −2,5 puntos de aquí a 2070).',
      chomageSource: 'ELSTAT, septiembre de 2026',
      smiNote: '920 € en 14 pagas desde abril de 2026; objetivo de 950 € en 2027.',
      aides: 'renta mínima garantizada, prestación para mayores sin seguro, prestaciones no contributivas por discapacidad, la mitad de la ayuda a la vivienda, prestaciones familiares',
      criseNote: 'Crisis de la deuda de 2010-2012: deuda por encima del 170 % del PIB pese a la reestructuración de 2012; covid: más del 200 % en 2020.',
      depart: 'Ministerio de Finanzas (proyecto de plan presupuestario 2027, octubre de 2026): deuda del 136,7 % del PIB, superávit del 0,6 % e intereses del 3,0 % del PIB en 2026, y deuda del 128,8 % en 2027. Último dato observado: 146,1 % del PIB a finales de 2025 (362,9 mil M€), superávit del 1,7 % y superávit primario del 4,9 %.',
      refinancement: 'La deuda griega es sobre todo préstamos europeos a tipo fijo y plazo muy largo: el tipo de mercado solo la afecta lentamente.',
      hypotheses: ['No se representan los reembolsos anticipados de préstamos europeos, que reducen la deuda en euros.'],
      ignore: 'Tampoco tiene en cuenta los compromisos de superávit primario asumidos ante los acreedores europeos.',
      postes: {
        defense: 'Entre las más altas de la OTAN en porcentaje del PIB.', enseignement: 'De primaria a universidad.', sante: 'Sistema nacional de salud (ESY).',
        retraites: 'Pensiones principales y complementarias (EFKA). Los controles del grupo «Pensiones» se suman aquí.',
        social: 'Desempleo, familia, invalidez, exclusión. La renta básica, neta de las ayudas que sustituye, se suma aquí.',
        securite: 'Policía, guardacostas, justicia.', economie: 'Transporte, energía, ayudas a empresas, fondos europeos.',
        general: 'Administración general. Sin intereses.', cadre: 'Vivienda, medio ambiente, cultura y deporte.',
      },
      prereglages: { relache: 'Superávits relajados' },
    }),
    de: (u) => ({
      titreDoc: 'Griechische Staatsschulden: Projektion über 10 Jahre',
      h1: 'Griechische Staatsschulden: Projektion 2027-2036',
      tva: [
        { nom: 'Regelsatz', note: 'Die meisten Waren und Dienstleistungen (niedrigere Sätze auf einigen Inseln).' },
        { nom: 'Ermäßigter Satz', note: 'Lebensmittel, Gastronomie, Verkehr.' },
        { nom: 'Stark ermäßigter Satz', note: 'Arzneimittel, Bücher, Veranstaltungen.' },
      ],
      irZone: 'Stufen unter 44 %',
      groupes: {
        ir: { intro: 'Einkommensteuer von 9 % bis 44 % ab 60 000 €; die Reform von 2026 senkte die Sätze für mittlere Einkommen und schuf eine Stufe von 39 %.' },
        retraites: { intro: 'Regelaltersgrenze 67 Jahre (62 mit 40 Beitragsjahren). Die Reformen aus der Krisenzeit senken das Gewicht der Renten langfristig.' },
      },
      ageRef: 67, ageRefCourt: 67,
      ageNote: 'Referenz: 67 Jahre; eine Kopplung an die Lebenserwartung ist nach 2027 vorgesehen.',
      deriveNote: 'Rentenausgaben sinkend: −0,4 Pp. des BIP im Jahr 2036 und −1,2 im Jahr 2050 gegenüber 2026 (Annahme der Anwendung; der Ageing Report 2024 erwartet −2,5 Punkte bis 2070).',
      chomageSource: 'ELSTAT, September 2026',
      smiNote: '920 € bei 14 Zahlungen seit April 2026; 950 € für 2027 angestrebt.',
      aides: 'garantiertes Mindesteinkommen, Leistung für nicht versicherte Ältere, beitragsunabhängige Invaliditätsleistungen, die Hälfte der Wohnhilfe, Familienleistungen',
      criseNote: 'Schuldenkrise 2010-2012: Schulden über 170 % des BIP trotz Umschuldung 2012; Covid: über 200 % im Jahr 2020.',
      depart: 'Finanzministerium (Übersicht über die Haushaltsplanung 2027, Oktober 2026): Schulden von 136,7 % des BIP, Überschuss von 0,6 % und Zinsen von 3,0 % des BIP im Jahr 2026, dann Schulden von 128,8 % im Jahr 2027. Letzter gemessener Wert: 146,1 % des BIP Ende 2025 (362,9 Mrd. €), Überschuss von 1,7 % und Primärüberschuss von 4,9 %.',
      refinancement: 'Die griechischen Schulden bestehen überwiegend aus europäischen Krediten mit festem Zins und sehr langer Laufzeit: Der Marktzins wirkt nur langsam.',
      hypotheses: ['Vorzeitige Rückzahlungen europäischer Kredite, die die Schulden in Euro senken, sind nicht abgebildet.'],
      ignore: 'Es ignoriert auch die gegenüber den europäischen Gläubigern eingegangenen Zusagen zum Primärüberschuss.',
      postes: {
        defense: 'Gemessen am BIP unter den höchsten der NATO.', enseignement: 'Von der Grundschule bis zur Hochschule.', sante: 'Nationales Gesundheitssystem (ESY).',
        retraites: 'Haupt- und Zusatzrenten (EFKA). Die Regler der Gruppe „Renten“ kommen hinzu.',
        social: 'Arbeitslosigkeit, Familie, Invalidität, Ausgrenzung. Das Grundeinkommen, abzüglich der ersetzten Leistungen, kommt hinzu.',
        securite: 'Polizei, Küstenwache, Justiz.', economie: 'Verkehr, Energie, Unternehmenshilfen, EU-Fonds.',
        general: 'Allgemeine Verwaltung. Ohne Zinsen.', cadre: 'Wohnen, Umwelt, Kultur und Sport.',
      },
      prereglages: { relache: 'Gelockerte Überschüsse' },
    }),
  };
  return commun.creerPays({ id: 'gr', modele, sources, partis, pib2024: 236, options, specifique });
});

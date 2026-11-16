// Sources du modèle portugais (sites officiels, consultés en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'INE, procédure de déficit excessif, notification de septembre 2026', en: 'INE, excessive deficit procedure, September 2026 notification', es: 'INE, procedimiento de déficit excesivo, notificación de septiembre de 2026', de: 'INE, Verfahren bei einem übermäßigen Defizit, Meldung vom September 2026' },
      url: 'https://www.ine.pt/xportal/xmain?xpid=INE&xpgid=ine_destaques&DESTAQUEStipo=ea&DESTAQUEScoleccao=69838&selTab=tab0&xlang=pt',
      chiffre: {
        fr: 'Excédent de 2 045 M€ en 2025, soit 0,7 % du PIB ; dette de 89,2 % du PIB (93,0 % en 2024 ; 89,7 % dans la notification de mars).',
        en: 'Surplus of €2,045m in 2025, i.e. 0.7% of GDP; debt of 89.2% of GDP (93.0% in 2024; 89.7% in the March notification).',
        es: 'Superávit de 2045 M€ en 2025, el 0,7 % del PIB; deuda del 89,2 % del PIB (93,0 % en 2024; 89,7 % en la notificación de marzo).',
        de: 'Überschuss von 2 045 Mio. € im Jahr 2025, also 0,7 % des BIP; Schulden von 89,2 % des BIP (93,0 % 2024; 89,7 % in der Märzmeldung).',
      },
      usage: usage('Point de départ de la projection.', 'Starting point of the projection.', 'Punto de partida de la proyección.', 'Ausgangspunkt der Projektion.'),
    },
    {
      nom: { fr: 'Conseil des finances publiques (CFP), évolution budgétaire 2025', en: 'Public Finance Council (CFP), budgetary developments in 2025', es: 'Consejo de Finanzas Públicas (CFP), evolución presupuestaria de 2025', de: 'Rat für öffentliche Finanzen (CFP), Haushaltsentwicklung 2025' },
      url: 'https://www.cfp.pt/uploads/publicacoes_ficheiros/cfp-rel-03-2026_ap2025_.pdf',
      chiffre: {
        fr: 'Recettes publiques de 43,4 % du PIB en 2025 (43,0 % en 2024), portées par la fiscalité indirecte et les cotisations ; pression fiscale de 35,3 % ; l’excédent doit beaucoup à la sécurité sociale.',
        en: 'Government revenue of 43.4% of GDP in 2025 (43.0% in 2024), driven by indirect taxes and contributions; tax burden of 35.3%; the surplus owes much to social security.',
        es: 'Ingresos públicos del 43,4 % del PIB en 2025 (43,0 % en 2024), impulsados por la imposición indirecta y las cotizaciones; presión fiscal del 35,3 %; el superávit debe mucho a la Seguridad Social.',
        de: 'Staatseinnahmen von 43,4 % des BIP im Jahr 2025 (43,0 % 2024), getragen von indirekten Steuern und Beiträgen; Abgabenquote 35,3 %; der Überschuss verdankt viel der Sozialversicherung.',
      },
      usage: usage('Taux de recettes.', 'Revenue ratio.', 'Ratio de ingresos.', 'Einnahmenquote.'),
    },
    {
      nom: { fr: 'Gouvernement portugais, rapport du budget 2027 (octobre 2026)', en: 'Portuguese government, 2027 budget report (October 2026)', es: 'Gobierno portugués, informe del presupuesto 2027 (octubre de 2026)', de: 'Portugiesische Regierung, Haushaltsbericht 2027 (Oktober 2026)' },
      url: 'https://portugal.gov.pt/api/media/edge/Project/Portal-do-Governo/Portal-do-Governo/gc25/documentos/Financas/20261008-CM-Relat%C3%B3rio-do-Or%C3%A7amento-do-Estado-27.pdf',
      chiffre: {
        fr: 'Solde nul et dette de 87,5 % du PIB en 2026 ; en 2027, croissance de 2,1 %, excédent de 0,1 % et dette ramenée à 84,5 %.',
        en: 'Balanced budget and debt of 87.5% of GDP in 2026; in 2027, growth of 2.1%, a 0.1% surplus and debt brought down to 84.5%.',
        es: 'Saldo nulo y deuda del 87,5 % del PIB en 2026; en 2027, crecimiento del 2,1 %, superávit del 0,1 % y deuda reducida al 84,5 %.',
        de: 'Ausgeglichener Haushalt und Schulden von 87,5 % des BIP 2026; 2027 Wachstum von 2,1 %, Überschuss von 0,1 % und Schulden von 84,5 %.',
      },
      usage: usage('Point de départ fin 2026 ; vraisemblance du tendanciel.', 'End-2026 starting point; plausibility of the baseline.', 'Punto de partida a finales de 2026; verosimilitud del tendencial.', 'Ausgangspunkt Ende 2026; Plausibilität des Basisszenarios.'),
    },
    {
      nom: { fr: 'Conseil des finances publiques (CFP), analyse du projet de budget 2027', en: 'Public Finance Council (CFP), analysis of the draft 2027 budget', es: 'Consejo de Finanzas Públicas (CFP), análisis del proyecto de presupuesto 2027', de: 'Rat für öffentliche Finanzen (CFP), Analyse des Haushaltsentwurfs 2027' },
      url: 'https://www.cfp.pt/pt/publicacoes/orcamento-do-estado/analise-da-proposta-de-orcamento-do-estado-para-2027',
      chiffre: {
        fr: 'Intérêts de 2,0 % du PIB en 2026, 2,4 % en 2027 ; excédent de 0,1 % en 2027 ; déficit de l’État central porté à 2,8 % du PIB, compensé par la sécurité sociale.',
        en: 'Interest of 2.0% of GDP in 2026, 2.4% in 2027; a 0.1% surplus in 2027; central government deficit rising to 2.8% of GDP, offset by social security.',
        es: 'Intereses del 2,0 % del PIB en 2026 y del 2,4 % en 2027; superávit del 0,1 % en 2027; déficit del Estado central que sube al 2,8 % del PIB, compensado por la Seguridad Social.',
        de: 'Zinsen von 2,0 % des BIP 2026 und 2,4 % 2027; Überschuss von 0,1 % 2027; Defizit des Zentralstaats steigt auf 2,8 % des BIP, ausgeglichen durch die Sozialversicherung.',
      },
      usage: usage('Intérêts de départ.', 'Starting interest.', 'Intereses de partida.', 'Zinsen zu Beginn.'),
    },
    {
      nom: { fr: 'INE, estimations mensuelles de l’emploi et du chômage (septembre 2026)', en: 'INE, monthly employment and unemployment estimates (September 2026)', es: 'INE, estimaciones mensuales de empleo y paro (septiembre de 2026)', de: 'INE, monatliche Schätzungen zu Beschäftigung und Arbeitslosigkeit (September 2026)' },
      url: 'https://www.ine.pt/xportal/xmain?xpgid=ine_tema&xpid=INE&tema_cod=1114&xlang=pt',
      chiffre: {
        fr: 'Taux de chômage de 5,6 % en septembre 2026 ; taux de sous-utilisation du travail de 9,6 %.',
        en: 'Unemployment rate of 5.6% in September 2026; labour underutilisation rate of 9.6%.',
        es: 'Tasa de paro del 5,6 % en septiembre de 2026; tasa de subutilización del trabajo del 9,6 %.',
        de: 'Arbeitslosenquote von 5,6 % im September 2026; Unterauslastungsquote von 9,6 %.',
      },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
    {
      nom: { fr: 'Journal officiel, arrêté 476/2025/1 (âge de la retraite 2027)', en: 'Official Journal, Order 476/2025/1 (2027 pension age)', es: 'Diario Oficial, Orden 476/2025/1 (edad de jubilación 2027)', de: 'Amtsblatt, Verordnung 476/2025/1 (Rentenalter 2027)' },
      url: 'https://files.diariodarepublica.pt/1s/2025/12/24900/0005500056.pdf',
      chiffre: {
        fr: 'Âge normal de la pension de vieillesse : 66 ans et 9 mois en 2026, 66 ans et 11 mois en 2027, calculé selon l’espérance de vie à 65 ans.',
        en: 'Normal old-age pension age: 66 years 9 months in 2026, 66 years 11 months in 2027, based on life expectancy at 65.',
        es: 'Edad normal de la pensión de jubilación: 66 años y 9 meses en 2026, 66 años y 11 meses en 2027, según la esperanza de vida a los 65 años.',
        de: 'Reguläres Rentenalter: 66 Jahre und 9 Monate 2026, 66 Jahre und 11 Monate 2027, abhängig von der Lebenserwartung mit 65.',
      },
      usage: usage('Curseur « âge légal ».', '“Statutory age” slider.', 'Control «edad legal».', 'Regler „gesetzliches Alter“.'),
    },
    {
      nom: { fr: 'Gouvernement portugais, salaire minimum 2026', en: 'Portuguese government, 2026 minimum wage', es: 'Gobierno portugués, salario mínimo 2026', de: 'Portugiesische Regierung, Mindestlohn 2026' },
      url: 'https://portugal.gov.pt/gc25/comunicacao/noticias/governo-aumenta-salario-minimo-para-920-euros-em-2026',
      chiffre: {
        fr: 'Salaire minimum porté de 870 € à 920 € par mois en 2026 (14 versements).',
        en: 'Minimum wage raised from €870 to €920 a month in 2026 (14 payments).',
        es: 'Salario mínimo elevado de 870 € a 920 € al mes en 2026 (14 pagas).',
        de: 'Mindestlohn 2026 von 870 € auf 920 € pro Monat angehoben (14 Zahlungen).',
      },
      usage: usage('Curseurs « salaire minimum ». Rendements estimés par l’application.', '“Minimum wage” sliders. Yields estimated by the app.', 'Controles «salario mínimo». Rendimientos estimados por la aplicación.', 'Regler „Mindestlohn“. Erträge von der Anwendung geschätzt.'),
    },
  ];
});

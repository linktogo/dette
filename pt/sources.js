// Sources du modèle portugais (consultées en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'INE, 2e notification de la procédure de déficit excessif 2025, via Notícias ao Minuto', en: 'INE, second excessive deficit procedure notification for 2025, via Notícias ao Minuto', es: 'INE, segunda notificación del procedimiento de déficit excesivo de 2025, vía Notícias ao Minuto', de: 'INE, zweite Meldung im Defizitverfahren 2025, über Notícias ao Minuto' },
      url: 'https://www.noticiasaominuto.com/pais/3055971/racio-da-divida-publica-foi-de-89-2-em-2025',
      chiffre: {
        fr: 'Dette publique de 89,2 % du PIB en 2025 (89,7 % lors de la notification de mars).',
        en: 'Public debt of 89.2% of GDP in 2025 (89.7% in the March notification).',
        es: 'Deuda pública del 89,2 % del PIB en 2025 (89,7 % en la notificación de marzo).',
        de: 'Staatsschulden von 89,2 % des BIP im Jahr 2025 (89,7 % in der Meldung vom März).',
      },
      usage: usage('Point de départ de la projection.', 'Starting point of the projection.', 'Punto de partida de la proyección.', 'Ausgangspunkt der Projektion.'),
    },
    {
      nom: { fr: 'RTP, comptes publics 2025', en: 'RTP, 2025 public accounts', es: 'RTP, cuentas públicas de 2025', de: 'RTP, öffentliche Finanzen 2025' },
      url: 'https://www.rtp.pt/noticias/economia/contas-publicas-completaram-2025-com-excedente-de-07-do-pib_n1729384',
      chiffre: {
        fr: 'Excédent de 2 058,6 M€ en 2025, soit 0,7 % du PIB, au-dessus des 0,3 % prévus.',
        en: 'Surplus of €2,058.6m in 2025, i.e. 0.7% of GDP, above the 0.3% forecast.',
        es: 'Superávit de 2058,6 M€ en 2025, el 0,7 % del PIB, por encima del 0,3 % previsto.',
        de: 'Überschuss von 2 058,6 Mio. € im Jahr 2025, also 0,7 % des BIP, über den erwarteten 0,3 %.',
      },
      usage: usage('Solde de départ.', 'Starting balance.', 'Saldo de partida.', 'Saldo zu Beginn.'),
    },
    {
      nom: { fr: 'Conseil des finances publiques (CFP), recettes 2025, via ECO', en: 'Public Finance Council (CFP), 2025 revenue, via ECO', es: 'Consejo de Finanzas Públicas (CFP), ingresos de 2025, vía ECO', de: 'Rat für öffentliche Finanzen (CFP), Einnahmen 2025, über ECO' },
      url: 'https://eco.sapo.pt/2026/05/21/cfp-avisa-que-excedente-continua-dependente-da-seguranca-social-e-alerta-para-aumento-da-despesa-com-salarios-e-pensoes/',
      chiffre: {
        fr: 'Recettes publiques de 43,4 % du PIB en 2025 (132,7 Md€) ; l’excédent dépend fortement de la sécurité sociale.',
        en: 'Public revenue of 43.4% of GDP in 2025 (€132.7bn); the surplus depends heavily on social security.',
        es: 'Ingresos públicos del 43,4 % del PIB en 2025 (132,7 mil M€); el superávit depende mucho de la Seguridad Social.',
        de: 'Staatseinnahmen von 43,4 % des BIP im Jahr 2025 (132,7 Mrd. €); der Überschuss hängt stark von der Sozialversicherung ab.',
      },
      usage: usage('Taux de recettes.', 'Revenue ratio.', 'Ratio de ingresos.', 'Einnahmenquote.'),
    },
    {
      nom: { fr: 'Observador, révision des objectifs 2026 (avril 2026)', en: 'Observador, revised 2026 targets (April 2026)', es: 'Observador, revisión de los objetivos de 2026 (abril de 2026)', de: 'Observador, revidierte Ziele für 2026 (April 2026)' },
      url: 'https://observador.pt/2026/04/30/governo-reve-metas-para-2026-aponta-agora-a-saldo-nulo-e-a-crescimento-menor/',
      chiffre: {
        fr: 'Le gouvernement vise désormais un solde nul en 2026 et une dette de 87,5 % du PIB. Le FMI voit en 2026 la première de plusieurs années de déficit.',
        en: 'The government now targets a balanced budget in 2026 and debt of 87.5% of GDP. The IMF sees 2026 as the first of several deficit years.',
        es: 'El Gobierno apunta ahora a un saldo nulo en 2026 y a una deuda del 87,5 % del PIB. El FMI ve en 2026 el primero de varios años de déficit.',
        de: 'Die Regierung strebt nun für 2026 einen ausgeglichenen Haushalt und Schulden von 87,5 % des BIP an. Der IWF sieht 2026 als erstes von mehreren Defizitjahren.',
      },
      usage: usage('Point de départ fin 2026.', 'Starting point at end-2026.', 'Punto de partida a finales de 2026.', 'Ausgangspunkt Ende 2026.'),
    },
    {
      nom: { fr: 'INE, chômage de septembre 2026, via Simula', en: 'INE, unemployment in September 2026, via Simula', es: 'INE, paro de septiembre de 2026, vía Simula', de: 'INE, Arbeitslosigkeit im September 2026, über Simula' },
      url: 'https://simula.pt/noticias/desemprego-setembro-2026/',
      chiffre: { fr: 'Taux de chômage de 5,6 % (5,9 % un an plus tôt).', en: 'Unemployment rate of 5.6% (5.9% a year earlier).', es: 'Tasa de paro del 5,6 % (5,9 % un año antes).', de: 'Arbeitslosenquote von 5,6 % (5,9 % ein Jahr zuvor).' },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
    {
      nom: { fr: 'RTP, âge de la retraite 2026 et 2027', en: 'RTP, retirement age in 2026 and 2027', es: 'RTP, edad de jubilación en 2026 y 2027', de: 'RTP, Rentenalter 2026 und 2027' },
      url: 'https://www.rtp.pt/noticias/politica/ine-idade-da-reforma-sobe-para-os-66-anos-e-11-meses-em-2027_n1701115',
      chiffre: { fr: '66 ans et 9 mois en 2026, 66 ans et 11 mois en 2027, selon l’espérance de vie à 65 ans.', en: '66 years 9 months in 2026, 66 years 11 months in 2027, following life expectancy at 65.', es: '66 años y 9 meses en 2026 y 66 años y 11 meses en 2027, según la esperanza de vida a los 65 años.', de: '66 Jahre und 9 Monate im Jahr 2026, 66 Jahre und 11 Monate im Jahr 2027, gemäß der Lebenserwartung mit 65.' },
      usage: usage('Curseur « âge légal ».', '“Retirement age” slider.', 'Control «edad legal».', 'Regler „Rentenalter“.'),
    },
    {
      nom: { fr: 'Gouvernement portugais, salaire minimum 2026', en: 'Portuguese Government, 2026 minimum wage', es: 'Gobierno portugués, salario mínimo de 2026', de: 'Portugiesische Regierung, Mindestlohn 2026' },
      url: 'https://portugal.gov.pt/gc25/comunicacao/noticias/governo-aumenta-salario-minimo-para-920-euros-em-2026',
      chiffre: { fr: 'Salaire minimum porté de 870 € à 920 € par mois en 2026 (14 versements).', en: 'Minimum wage raised from €870 to €920 a month in 2026 (14 payments).', es: 'Salario mínimo elevado de 870 € a 920 € al mes en 2026 (14 pagas).', de: 'Mindestlohn 2026 von 870 € auf 920 € pro Monat angehoben (14 Zahlungen).' },
      usage: usage('Curseurs « salaire minimum ». Rendements estimés par l’application.', '“Minimum wage” sliders. Yields estimated by the app.', 'Controles «salario mínimo». Rendimientos estimados por la aplicación.', 'Regler „Mindestlohn“. Erträge von der Anwendung geschätzt.'),
    },
  ];
});

// Programmes budgétaires des partis, traduits avec les curseurs du simulateur
// français. Chaque mesure reprend le chiffrage annoncé par le parti (sources
// consultées en novembre 2026) ; les écarts au modèle sont signalés dans les textes.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'lfi',
      p: { patrimoine: 2, niches: 50, prelevements: 2.3, nouvellesDepenses: 73, smic: 18, ageLegal: -2, dureeAssurance: -2 },
      sources: [
        { nom: 'Public Sénat, 14 octobre 2026', url: 'https://www.publicsenat.fr/actualites/politique/presidentielle-2027-jean-luc-melenchon-table-sur-106-milliards-de-recettes-supplementaires-et-82-milliards-de-depenses-nouvelles-pour-2027' },
        { nom: 'LCP, contre-budget LFI', url: 'https://lcp.fr/actualites/contre-budget-lfi-propose-1064-milliards-d-euros-de-recettes-supplementaires-et-817' },
        { nom: 'L’Avenir en commun, retraites', url: 'https://www.lavenirencommun.org/programme/economie-travail-et-logement/retraites/' },
        { nom: 'Économie Matin, 7 novembre 2026', url: 'https://www.economiematin.fr/melenchon-programme-2027-smic-1700-retraite-60-7-novembre-2026' },
      ],
    },
    {
      id: 'ps',
      p: { patrimoine: 2, prelevements: 0.8, niches: 10, economies: 5, fraude: 3, smic: 18, nouvellesDepenses: 28 },
      sources: [
        { nom: 'Journal du Net, contre-budget PS 2027', url: 'https://www.journaldunet.com/business/action-publique/1554951-le-parti-socialiste-propose-un-contre-budget-pour-2027-a-l-assemblee-nationale/' },
        { nom: 'Selectra, détail du contre-budget', url: 'https://selectra.info/finance/actualites/marche/csg-progressive-2027-salaire-net-smic' },
        { nom: 'NosParlementaires, vote sur la taxe Zucman', url: 'https://nosparlementaires.fr/actualites/impot-plancher-2-ultrariches-taxe-zucman-parlement' },
      ],
    },
    {
      id: 'eco',
      p: { patrimoine: 2, prelevements: 0.8, nouvellesDepenses: 15 },
      sources: [
        { nom: 'Les Écologistes, Plan de sortie de crise (2025)', url: 'https://lesecologistes.fr/document/21lvzpwEXkL8pJg16dsil4/25-09-plan-de-sortie-de-crise.pdf' },
        { nom: 'Public Sénat, plan de sortie de crise', url: 'https://www.publicsenat.fr/actualites/politique/les-ecologistes-presentent-leur-plan-de-sortie-de-crise-et-preparent-la-cohabitation' },
        { nom: 'ÉlyséeScope, fiscalité de Marine Tondelier', url: 'https://www.elyseescope.com/candidat/marine-tondelier/fiscalite-q08-' },
      ],
    },
    {
      id: 'ren',
      p: { economies: 150, montee: 6 },
      sources: [
        { nom: 'Objectif 2027, programme de Gabriel Attal', url: 'https://objectif2027.fr/candidats/gabriel-attal/' },
        { nom: 'ÉlyséeScope, plan d’économies', url: 'https://www.elyseescope.com/questions/gabriel-attal-plan-economies' },
      ],
    },
    {
      id: 'lr',
      p: { economies: 190, fraude: 5, prelevements: -1.7, montee: 6 },
      sources: [
        { nom: 'LCP, plan de Bruno Retailleau', url: 'https://lcp.fr/actualites/face-a-une-france-quasiment-en-faillite-bruno-retailleau-presente-un-plan-d-economies-de' },
        { nom: 'Public Sénat, 197 Md€ d’économies', url: 'https://www.publicsenat.fr/actualites/economie/presidentielle-2027-bruno-retailleau-sengage-sur-un-plan-deconomies-de-pres-de-200-milliards-deuros-sil-est-elu' },
        { nom: 'Renseignement Économique, retraites', url: 'https://renseignementeconomique.fr/retailleau-propose-une-retraite-plein-taux-a-65-ans-deux-ages-de-depart-et-economies-massives' },
      ],
    },
    {
      id: 'rn',
      p: { economies: 140, prelevements: -1.0, montee: 6 },
      sources: [
        { nom: 'Public Sénat, contre-budget du RN', url: 'https://www.publicsenat.fr/actualites/politique/140-milliards-deuros-deconomies-dici-2032-leffort-radical-propose-par-marine-le-pen-pour-redresser-les-f' },
        { nom: 'Europe 1, 6 octobre 2026', url: 'https://www.europe1.fr/politique/140-milliards-deuros-deconomies-deficit-public-sous-les-3-ce-quil-faut-retenir-du-discours-de-marine-le-pen-qui-a-presente-le-contre-budget-2027-du-rn-1126400' },
        { nom: 'Institut de l’Entreprise, analyse du contre-budget', url: 'https://www.institut-entreprise.fr/wp-content/uploads/2026/10/Analyse-primaire-contre-budget-RN-Note-de-contexte-IDEP.pdf' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Programmes des partis',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Chiffrage annoncé par le parti, traduit avec les curseurs du simulateur. Les mesures s’ajoutent au tendanciel du simulateur, pas au budget du gouvernement, et sont exprimées à terme en euros de 2026. L’effet des mesures sur la croissance et leur faisabilité juridique ne sont pas modélisés. Après une modification d’un curseur, la fiche disparaît.',
      lfi: {
        nom: 'LFI',
        titre: 'La France insoumise',
        date: 'Budget rectificatif pour 2027 (14 octobre 2026) et programme présidentiel (7 novembre 2026)',
        mesures: [
          'Taxe Zucman, 2 % au-delà de 100 M€ de patrimoine, 15 Md€ annoncés → impôt plancher à 2 %. Le modèle en retient 14 Md€ après 30 % d’érosion.',
          'Rabot des principales niches fiscales (crédit d’impôt recherche, pacte Dutreil…), 22 Md€ → 50 % des niches supprimées.',
          'ISF climatique (10 Md€), fin de la flat tax (9 Md€), taxe sur les héritages (20 Md€), taxe sur les Gafam à 15 % : le reste des 106,4 Md€ de recettes annoncées → +2,3 points de PIB de recettes.',
          '81,7 Md€ de dépenses nouvelles, dont 9 Md€ pour les retraites en 2027 → 73 Md€ de dépenses nouvelles, les retraites passant par leurs curseurs.',
          'Retour à 62 ans puis à 60 ans avec 40 annuités → âge légal −2 ans et durée de cotisation −2 ans, les bornes du simulateur.',
          'SMIC à 1 700 € net → +18 % au-delà de la revalorisation légale.',
        ],
        nonModelise: [
          'Retraite à 60 ans et 40 annuités : au-delà des bornes du simulateur (62 ans, 41 ans de cotisation).',
          'Blocage des prix, sortie du nucléaire, remplacement des mutuelles par la Sécurité sociale : pas de chiffrage dans les sources consultées.',
        ],
        avis: 'Des économistes jugent ce budget « peu détaillé » et « optimiste », surtout sur les recettes. LFI annonce le chiffrage complet de son programme pour début 2027.',
      },
      ps: {
        nom: 'PS',
        titre: 'Parti socialiste',
        date: 'Contre-budget pour 2027 du groupe socialiste (16 septembre 2026)',
        mesures: [
          'Taxe Zucman, 2 % au-delà de 100 M€ de patrimoine, 15 Md€ annoncés → impôt plancher à 2 %. Le modèle en retient 14 Md€ après 30 % d’érosion.',
          'CSG sur les très gros héritages (10 Md€), taxe sur les géants du numérique (10 Md€) et autres recettes : le reste des 39,5 Md€ annoncés → +0,8 point de PIB de recettes.',
          '12,1 Md€ d’économies : niches fiscales (4 Md€) → 10 % des niches supprimées ; fonctionnement de l’État, médicaments et lutte contre la fraude → 5 Md€ d’économies et 3 Md€ de fraude recouvrée.',
          'SMIC à 1 700 € net → +18 % au-delà de la revalorisation légale.',
          'Réduction du déficit annoncée : 24 Md€ en 2027. L’écart avec les recettes et économies, environ 28 Md€, finance la CSG progressive, le pouvoir d’achat et le climat → 28 Md€ de dépenses nouvelles.',
        ],
        nonModelise: [
          'CSG progressive (taux de 0,55 % à 0,85 % au niveau du SMIC selon les sources) : son coût n’est pas publié séparément. Il est compris dans les 28 Md€.',
          'Retraites : le PS refuse le gel des pensions, absent du tendanciel. Le simulateur part de la réforme de 2023 (64 ans).',
        ],
        avis: 'La taxe Zucman a été rejetée à l’Assemblée nationale le 16 octobre 2026. Sa version allégée rapporterait 5 à 7 Md€ par an selon le PS lui-même.',
      },
      eco: {
        nom: 'Les Écologistes',
        titre: 'Les Écologistes',
        date: 'Plan de sortie de crise (25 septembre 2025) et propositions de campagne de Marine Tondelier (2026)',
        mesures: [
          '28,5 Md€ de recettes, dont la taxe Zucman → impôt plancher à 2 % (14 Md€ dans le modèle). Contribution exceptionnelle des grandes entreprises et taxe sur les superprofits pétro-gaziers pour le reste, 14,5 Md€.',
          'Taxe de 20 % sur le 1 % des héritages les plus élevés, 10 Md€ en 2027 selon la candidate. Avec la ligne précédente → +0,8 point de PIB de recettes.',
          'Budget de la transition écologique +9,1 Md€, défense +6,2 Md€ → 15 Md€ de dépenses nouvelles.',
        ],
        nonModelise: [
          'Plan d’adaptation à la chaleur, 7 Md€ par an jusqu’en 2032, financé par un ISF climatique : sans effet net sur le solde, il n’est pas repris.',
          'Trajectoire annoncée en 2025 (déficit à 3,7 % du PIB en 2030) : elle partait du budget 2026, révisé depuis.',
        ],
        avis: 'Aucun contre-budget complet pour 2027 n’a été trouvé : le scénario combine le plan de 2025 et les propositions de campagne. Le rendement de la taxe Zucman reste discuté.',
      },
      ren: {
        nom: 'Renaissance',
        titre: 'Renaissance',
        date: 'Programme de Gabriel Attal, lettre aux Français (15 octobre 2026)',
        mesures: [
          '150 Md€ d’économies sur le quinquennat, sans hausse d’impôts → 150 Md€ d’économies atteints en 2032, montée en charge sur 6 ans.',
          'Deux tiers sur les dépenses sociales (arrêts maladie, assurance chômage pour 5 Md€, nouvelle réforme des retraites, année blanche sur les prestations en 2028) et suppression de 100 000 postes de fonctionnaires, environ 7 Md€ par an : compris dans le total.',
        ],
        nonModelise: [
          'Aucune ventilation détaillée n’est publiée : les économies ne sont pas réparties par poste.',
          'Retraites : la nouvelle réforme jouerait sur la durée de cotisation, sans cible ni calendrier publiés.',
        ],
        avis: 'Objectif affiché : retour à l’équilibre en 2037. Aucune évaluation indépendante du programme n’a été trouvée.',
      },
      lr: {
        nom: 'LR',
        titre: 'Les Républicains',
        date: 'Plan de Bruno Retailleau (12 octobre 2026)',
        mesures: [
          '197 Md€ d’économies d’ici 2032 : État 91 à 96 Md€ selon les sources (non-remplacement de 400 000 départs à la retraite, agences, trois jours de carence…), retraites 42 Md€, immigration 10 Md€, arrêts maladie 4 Md€, collectivités 10 Md€. Hors fraude → 190 Md€ d’économies atteints en 2032.',
          'Lutte contre la fraude fiscale et sociale, 5 Md€ → 5 Md€ de fraude recouvrée.',
          '51 Md€ rendus, dont 21 Md€ aux ménages et 30 Md€ aux entreprises (impôts de production) → −1,7 point de PIB de recettes.',
        ],
        nonModelise: [
          'Retraites : départ possible à 63 ans avec décote, taux plein à 65 ans. Le gain annoncé de 42 Md€ est compris dans les économies, pas dans le curseur d’âge.',
          'Santé : pas d’engagement chiffré.',
        ],
        avis: 'Objectif affiché : déficit sous 3 % du PIB en 2031, sans hausse d’impôts. Aucune évaluation indépendante du plan n’a été trouvée.',
      },
      rn: {
        nom: 'RN',
        titre: 'Rassemblement national',
        date: 'Contre-budget pour 2027 (6 octobre 2026)',
        mesures: [
          '140 Md€ nets d’économies d’ici 2032 : contribution à l’UE plafonnée à 5 Md€ (contre près de 29), immigration, opérateurs et agences de l’État (3,4 Md€), aides aux énergies renouvelables, sécurité sociale → 140 Md€ d’économies atteints en 2032.',
          '30 Md€ nets de baisses d’impôts sur le quinquennat, dont la TVA à 5,5 % sur l’énergie et une TVA nulle sur 100 produits essentiels, en partie financées par une taxe sur les rachats d’actions → −1,0 point de PIB de recettes.',
        ],
        nonModelise: [
          'Retraites : retour à 62 ans, coût estimé à 9,5 Md€ en 2031 par l’Institut de l’Entreprise. Il est supposé compris dans le solde net annoncé.',
          'TVA sur l’énergie : le simulateur n’a qu’un curseur par taux. La baisse passe par le total des baisses d’impôts.',
        ],
        avis: 'L’Institut de l’Entreprise estime l’amélioration nette du solde à 2,9 Md€ en 2027, contre 71,6 Md€ affichés, et juge le coût des retraites sous-estimé. Le gouvernement juge le projet inapplicable.',
      },
    },

    en: {
      titre: 'Party programmes',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'Costing announced by the party, translated into the simulator’s sliders. Measures are added to the simulator’s baseline, not to the government budget, and are expressed as long-run effects in 2026 euros. Effects on growth and legal feasibility are not modelled. The card disappears once a slider is changed.',
      lfi: {
        nom: 'LFI',
        titre: 'La France insoumise',
        date: 'Amending budget for 2027 (14 October 2026) and presidential programme (7 November 2026)',
        mesures: [
          'Zucman tax, 2% on fortunes above €100m, €15bn announced → 2% minimum tax. The model keeps €14bn after 30% erosion.',
          'Cuts to the main tax breaks (research tax credit, Dutreil pact…), €22bn → 50% of tax breaks removed.',
          'Climate wealth tax (€10bn), end of the flat tax (€9bn), inheritance tax (€20bn), 15% tax on big tech: the rest of the €106.4bn of revenue announced → +2.3 points of GDP of revenue.',
          '€81.7bn of new spending, of which €9bn for pensions in 2027 → €73bn of new spending, pensions going through their own sliders.',
          'Back to 62, then 60 with 40 years of contributions → legal age −2 years and contribution period −2 years, the simulator’s limits.',
          'Minimum wage at €1,700 net → +18% above the statutory uprating.',
        ],
        nonModelise: [
          'Retirement at 60 with 40 years of contributions: beyond the simulator’s limits (62, 41 years).',
          'Price freeze, nuclear phase-out, replacing top-up health insurance with social security: no costing in the sources consulted.',
        ],
        avis: 'Economists find the budget “not detailed” and “optimistic”, especially on revenue. LFI says the full costing of its programme will come in early 2027.',
      },
      ps: {
        nom: 'PS',
        titre: 'Socialist Party',
        date: 'Socialist group’s counter-budget for 2027 (16 September 2026)',
        mesures: [
          'Zucman tax, 2% on fortunes above €100m, €15bn announced → 2% minimum tax. The model keeps €14bn after 30% erosion.',
          'CSG on very large inheritances (€10bn), tax on digital giants (€10bn) and other revenue: the rest of the €39.5bn announced → +0.8 points of GDP of revenue.',
          '€12.1bn of savings: tax breaks (€4bn) → 10% of tax breaks removed; running costs of the State, medicines and anti-fraud → €5bn of savings and €3bn of fraud recovered.',
          'Minimum wage at €1,700 net → +18% above the statutory uprating.',
          'Announced deficit reduction: €24bn in 2027. The gap with revenue and savings, about €28bn, funds the progressive CSG, purchasing power and climate → €28bn of new spending.',
        ],
        nonModelise: [
          'Progressive CSG (rate of 0.55% to 0.85% at minimum-wage level depending on the source): its cost is not published separately. It is included in the €28bn.',
          'Pensions: the PS rejects a pension freeze, which the baseline does not include. The simulator starts from the 2023 reform (age 64).',
        ],
        avis: 'The Zucman tax was rejected by the National Assembly on 16 October 2026. Its lighter version would raise €5–7bn a year according to the PS itself.',
      },
      eco: {
        nom: 'Les Écologistes',
        titre: 'Les Écologistes (Greens)',
        date: 'Crisis exit plan (25 September 2025) and Marine Tondelier’s campaign proposals (2026)',
        mesures: [
          '€28.5bn of revenue, including the Zucman tax → 2% minimum tax (€14bn in the model). Exceptional contribution from large companies and windfall tax on oil and gas for the rest, €14.5bn.',
          '20% tax on the top 1% of inheritances, €10bn in 2027 according to the candidate. With the previous line → +0.8 points of GDP of revenue.',
          'Ecological transition budget +€9.1bn, defence +€6.2bn → €15bn of new spending.',
        ],
        nonModelise: [
          'Heat adaptation plan, €7bn a year until 2032, funded by a climate wealth tax: no net effect on the balance, not included.',
          'Path announced in 2025 (deficit at 3.7% of GDP in 2030): it started from the 2026 budget, since revised.',
        ],
        avis: 'No complete counter-budget for 2027 was found: the scenario combines the 2025 plan and campaign proposals. The yield of the Zucman tax is disputed.',
      },
      ren: {
        nom: 'Renaissance',
        titre: 'Renaissance',
        date: 'Gabriel Attal’s programme, letter to the French (15 October 2026)',
        mesures: [
          '€150bn of savings over the five-year term, with no tax rise → €150bn of savings reached in 2032, phased in over 6 years.',
          'Two thirds from social spending (sick leave, unemployment insurance for €5bn, a new pension reform, a freeze on benefits in 2028) and 100,000 civil-service jobs cut, about €7bn a year: included in the total.',
        ],
        nonModelise: [
          'No detailed breakdown is published: savings are not allocated to functions.',
          'Pensions: the new reform would act on the contribution period, with no target or timetable published.',
        ],
        avis: 'Stated goal: a balanced budget in 2037. No independent assessment of the programme was found.',
      },
      lr: {
        nom: 'LR',
        titre: 'Les Républicains',
        date: 'Bruno Retailleau’s plan (12 October 2026)',
        mesures: [
          '€197bn of savings by 2032: State €91–96bn depending on the source (not replacing 400,000 retirees, agencies, three waiting days for sick leave…), pensions €42bn, immigration €10bn, sick leave €4bn, local authorities €10bn. Excluding fraud → €190bn of savings reached in 2032.',
          'Tax and benefit fraud, €5bn → €5bn of fraud recovered.',
          '€51bn given back, of which €21bn to households and €30bn to businesses (production taxes) → −1.7 points of GDP of revenue.',
        ],
        nonModelise: [
          'Pensions: retirement possible at 63 with a reduction, full rate at 65. The €42bn announced is included in savings, not in the age slider.',
          'Health: no costed commitment.',
        ],
        avis: 'Stated goal: deficit below 3% of GDP in 2031, with no tax rise. No independent assessment of the plan was found.',
      },
      rn: {
        nom: 'RN',
        titre: 'Rassemblement national',
        date: 'Counter-budget for 2027 (6 October 2026)',
        mesures: [
          '€140bn of net savings by 2032: EU contribution capped at €5bn (against almost €29bn), immigration, State bodies and agencies (€3.4bn), support for renewables, social security → €140bn of savings reached in 2032.',
          '€30bn of net tax cuts over the term, including 5.5% VAT on energy and zero VAT on 100 essential goods, partly funded by a tax on share buybacks → −1.0 point of GDP of revenue.',
        ],
        nonModelise: [
          'Pensions: back to 62, cost estimated at €9.5bn in 2031 by the Institut de l’Entreprise. It is assumed to be included in the announced net balance.',
          'VAT on energy: the simulator has one slider per rate. The cut goes through the total of tax cuts.',
        ],
        avis: 'The Institut de l’Entreprise puts the net improvement in the balance at €2.9bn in 2027, against €71.6bn announced, and finds the pension cost underestimated. The government calls the plan unworkable.',
      },
    },

    es: {
      titre: 'Programas de los partidos',
      mesures: 'Medidas incluidas',
      nonModelise: 'No incluido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Cuantificación anunciada por el partido, traducida con los controles del simulador. Las medidas se suman al tendencial del simulador, no al presupuesto del Gobierno, y se expresan a largo plazo en euros de 2026. No se modelizan el efecto sobre el crecimiento ni la viabilidad jurídica. La ficha desaparece al modificar un control.',
      lfi: {
        nom: 'LFI',
        titre: 'La France insoumise',
        date: 'Presupuesto rectificativo para 2027 (14 de octubre de 2026) y programa presidencial (7 de noviembre de 2026)',
        mesures: [
          'Impuesto Zucman, 2 % sobre los patrimonios de más de 100 M€, 15 mil M€ anunciados → impuesto mínimo del 2 %. El modelo retiene 14 mil M€ tras un 30 % de erosión.',
          'Recorte de los principales beneficios fiscales (crédito por investigación, pacto Dutreil…), 22 mil M€ → 50 % de los beneficios suprimidos.',
          'ISF climático (10 mil M€), fin de la flat tax (9 mil M€), impuesto sobre herencias (20 mil M€), impuesto del 15 % a las grandes tecnológicas: el resto de los 106,4 mil M€ de ingresos anunciados → +2,3 puntos del PIB de ingresos.',
          '81,7 mil M€ de gasto nuevo, de los que 9 mil M€ para pensiones en 2027 → 73 mil M€ de gasto nuevo; las pensiones pasan por sus propios controles.',
          'Vuelta a los 62 años y después a los 60 con 40 años cotizados → edad legal −2 años y cotización −2 años, los límites del simulador.',
          'SMIC a 1700 € netos → +18 % por encima de la revalorización legal.',
        ],
        nonModelise: [
          'Jubilación a los 60 con 40 años cotizados: fuera de los límites del simulador (62 años, 41 años cotizados).',
          'Congelación de precios, salida de la energía nuclear, sustitución de las mutuas por la Seguridad Social: sin cuantificación en las fuentes consultadas.',
        ],
        avis: 'Algunos economistas consideran el presupuesto «poco detallado» y «optimista», sobre todo en ingresos. LFI anuncia la cuantificación completa de su programa para principios de 2027.',
      },
      ps: {
        nom: 'PS',
        titre: 'Partido Socialista',
        date: 'Contrapresupuesto para 2027 del grupo socialista (16 de septiembre de 2026)',
        mesures: [
          'Impuesto Zucman, 2 % sobre los patrimonios de más de 100 M€, 15 mil M€ anunciados → impuesto mínimo del 2 %. El modelo retiene 14 mil M€ tras un 30 % de erosión.',
          'CSG sobre las herencias muy grandes (10 mil M€), impuesto a los gigantes digitales (10 mil M€) y otros ingresos: el resto de los 39,5 mil M€ anunciados → +0,8 puntos del PIB de ingresos.',
          '12,1 mil M€ de ahorros: beneficios fiscales (4 mil M€) → 10 % suprimidos; funcionamiento del Estado, medicamentos y lucha contra el fraude → 5 mil M€ de ahorros y 3 mil M€ de fraude recuperado.',
          'SMIC a 1700 € netos → +18 % por encima de la revalorización legal.',
          'Reducción del déficit anunciada: 24 mil M€ en 2027. La diferencia con ingresos y ahorros, unos 28 mil M€, financia la CSG progresiva, el poder adquisitivo y el clima → 28 mil M€ de gasto nuevo.',
        ],
        nonModelise: [
          'CSG progresiva (tipo del 0,55 % al 0,85 % al nivel del SMIC según las fuentes): su coste no se publica por separado. Está incluido en los 28 mil M€.',
          'Pensiones: el PS rechaza la congelación de las pensiones, que el tendencial no incluye. El simulador parte de la reforma de 2023 (64 años).',
        ],
        avis: 'La Asamblea Nacional rechazó el impuesto Zucman el 16 de octubre de 2026. Su versión reducida aportaría entre 5 y 7 mil M€ al año según el propio PS.',
      },
      eco: {
        nom: 'Les Écologistes',
        titre: 'Les Écologistes (verdes)',
        date: 'Plan de salida de la crisis (25 de septiembre de 2025) y propuestas de campaña de Marine Tondelier (2026)',
        mesures: [
          '28,5 mil M€ de ingresos, entre ellos el impuesto Zucman → impuesto mínimo del 2 % (14 mil M€ en el modelo). Contribución excepcional de las grandes empresas e impuesto sobre los superbeneficios petroleros y gasistas para el resto, 14,5 mil M€.',
          'Impuesto del 20 % sobre el 1 % de las herencias más altas, 10 mil M€ en 2027 según la candidata. Con la línea anterior → +0,8 puntos del PIB de ingresos.',
          'Presupuesto de la transición ecológica +9,1 mil M€, defensa +6,2 mil M€ → 15 mil M€ de gasto nuevo.',
        ],
        nonModelise: [
          'Plan de adaptación al calor, 7 mil M€ al año hasta 2032, financiado con un ISF climático: sin efecto neto sobre el saldo, no se incluye.',
          'Trayectoria anunciada en 2025 (déficit del 3,7 % del PIB en 2030): partía del presupuesto de 2026, revisado después.',
        ],
        avis: 'No se ha encontrado un contrapresupuesto completo para 2027: el escenario combina el plan de 2025 y las propuestas de campaña. El rendimiento del impuesto Zucman sigue en discusión.',
      },
      ren: {
        nom: 'Renaissance',
        titre: 'Renaissance',
        date: 'Programa de Gabriel Attal, carta a los franceses (15 de octubre de 2026)',
        mesures: [
          '150 mil M€ de ahorros en la legislatura, sin subir impuestos → 150 mil M€ de ahorros alcanzados en 2032, desplegados en 6 años.',
          'Dos tercios en gasto social (bajas por enfermedad, seguro de desempleo por 5 mil M€, nueva reforma de pensiones, congelación de las prestaciones en 2028) y supresión de 100 000 puestos de funcionarios, unos 7 mil M€ al año: incluidos en el total.',
        ],
        nonModelise: [
          'No se publica un desglose detallado: los ahorros no se reparten por función.',
          'Pensiones: la nueva reforma actuaría sobre el periodo de cotización, sin objetivo ni calendario publicados.',
        ],
        avis: 'Objetivo declarado: equilibrio presupuestario en 2037. No se ha encontrado ninguna evaluación independiente del programa.',
      },
      lr: {
        nom: 'LR',
        titre: 'Les Républicains',
        date: 'Plan de Bruno Retailleau (12 de octubre de 2026)',
        mesures: [
          '197 mil M€ de ahorros hasta 2032: Estado 91 a 96 mil M€ según las fuentes (no sustitución de 400 000 jubilaciones, agencias, tres días de carencia…), pensiones 42 mil M€, inmigración 10 mil M€, bajas por enfermedad 4 mil M€, entes locales 10 mil M€. Sin el fraude → 190 mil M€ de ahorros alcanzados en 2032.',
          'Lucha contra el fraude fiscal y social, 5 mil M€ → 5 mil M€ de fraude recuperado.',
          '51 mil M€ devueltos, de los que 21 mil M€ a los hogares y 30 mil M€ a las empresas (impuestos a la producción) → −1,7 puntos del PIB de ingresos.',
        ],
        nonModelise: [
          'Pensiones: jubilación posible a los 63 con penalización, tasa plena a los 65. Los 42 mil M€ anunciados se incluyen en los ahorros, no en el control de edad.',
          'Sanidad: sin compromiso cuantificado.',
        ],
        avis: 'Objetivo declarado: déficit por debajo del 3 % del PIB en 2031, sin subir impuestos. No se ha encontrado ninguna evaluación independiente del plan.',
      },
      rn: {
        nom: 'RN',
        titre: 'Rassemblement national',
        date: 'Contrapresupuesto para 2027 (6 de octubre de 2026)',
        mesures: [
          '140 mil M€ netos de ahorros hasta 2032: contribución a la UE limitada a 5 mil M€ (frente a casi 29), inmigración, organismos y agencias del Estado (3,4 mil M€), ayudas a las renovables, seguridad social → 140 mil M€ de ahorros alcanzados en 2032.',
          '30 mil M€ netos de rebajas de impuestos en la legislatura, entre ellas el IVA al 5,5 % en la energía y un IVA cero en 100 productos básicos, financiadas en parte con un impuesto sobre la recompra de acciones → −1,0 punto del PIB de ingresos.',
        ],
        nonModelise: [
          'Pensiones: vuelta a los 62 años, coste estimado en 9,5 mil M€ en 2031 por el Institut de l’Entreprise. Se supone incluido en el saldo neto anunciado.',
          'IVA de la energía: el simulador solo tiene un control por tipo. La rebaja pasa por el total de rebajas de impuestos.',
        ],
        avis: 'El Institut de l’Entreprise estima la mejora neta del saldo en 2,9 mil M€ en 2027, frente a los 71,6 mil M€ anunciados, y considera infravalorado el coste de las pensiones. El Gobierno juzga el proyecto inaplicable.',
      },
    },

    de: {
      titre: 'Programme der Parteien',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Im Simulator nicht berücksichtigt',
      sources: 'Quellen',
      avertissement: 'Von der Partei angekündigte Bezifferung, übertragen auf die Regler des Simulators. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, nicht zum Haushalt der Regierung, und gelten langfristig in Euro von 2026. Wirkungen auf das Wachstum und die rechtliche Umsetzbarkeit werden nicht modelliert. Sobald ein Regler verändert wird, verschwindet die Übersicht.',
      lfi: {
        nom: 'LFI',
        titre: 'La France insoumise',
        date: 'Nachtragshaushalt für 2027 (14. Oktober 2026) und Präsidentschaftsprogramm (7. November 2026)',
        mesures: [
          'Zucman-Steuer, 2 % auf Vermögen über 100 Mio. €, 15 Mrd. € angekündigt → Mindeststeuer von 2 %. Das Modell setzt nach 30 % Erosion 14 Mrd. € an.',
          'Kürzung der wichtigsten Steuervergünstigungen (Forschungsgutschrift, Dutreil-Pakt…), 22 Mrd. € → 50 % der Vergünstigungen gestrichen.',
          'Klima-Vermögensteuer (10 Mrd. €), Ende der Flat Tax (9 Mrd. €), Erbschaftsteuer (20 Mrd. €), 15 % Steuer auf große Digitalkonzerne: der Rest der angekündigten 106,4 Mrd. € Einnahmen → +2,3 BIP-Punkte Einnahmen.',
          '81,7 Mrd. € neue Ausgaben, davon 9 Mrd. € für Renten im Jahr 2027 → 73 Mrd. € neue Ausgaben; die Renten laufen über ihre eigenen Regler.',
          'Rückkehr zu 62, dann zu 60 Jahren mit 40 Beitragsjahren → gesetzliches Alter −2 Jahre und Beitragsdauer −2 Jahre, die Grenzen des Simulators.',
          'Mindestlohn (SMIC) von 1 700 € netto → +18 % über der gesetzlichen Anpassung.',
        ],
        nonModelise: [
          'Rente mit 60 und 40 Beitragsjahren: außerhalb der Grenzen des Simulators (62 Jahre, 41 Beitragsjahre).',
          'Preisstopp, Atomausstieg, Ersatz der Zusatzversicherungen durch die Sozialversicherung: keine Bezifferung in den herangezogenen Quellen.',
        ],
        avis: 'Ökonomen halten den Haushalt für „wenig detailliert“ und „optimistisch“, vor allem bei den Einnahmen. LFI kündigt die vollständige Bezifferung ihres Programms für Anfang 2027 an.',
      },
      ps: {
        nom: 'PS',
        titre: 'Parti socialiste',
        date: 'Gegenhaushalt der sozialistischen Fraktion für 2027 (16. September 2026)',
        mesures: [
          'Zucman-Steuer, 2 % auf Vermögen über 100 Mio. €, 15 Mrd. € angekündigt → Mindeststeuer von 2 %. Das Modell setzt nach 30 % Erosion 14 Mrd. € an.',
          'CSG auf sehr große Erbschaften (10 Mrd. €), Steuer auf Digitalkonzerne (10 Mrd. €) und weitere Einnahmen: der Rest der angekündigten 39,5 Mrd. € → +0,8 BIP-Punkte Einnahmen.',
          '12,1 Mrd. € Einsparungen: Steuervergünstigungen (4 Mrd. €) → 10 % gestrichen; Verwaltung, Arzneimittel und Betrugsbekämpfung → 5 Mrd. € Einsparungen und 3 Mrd. € zurückgeholter Betrug.',
          'Mindestlohn (SMIC) von 1 700 € netto → +18 % über der gesetzlichen Anpassung.',
          'Angekündigte Defizitsenkung: 24 Mrd. € im Jahr 2027. Die Differenz zu Einnahmen und Einsparungen, etwa 28 Mrd. €, finanziert die progressive CSG, Kaufkraft und Klima → 28 Mrd. € neue Ausgaben.',
        ],
        nonModelise: [
          'Progressive CSG (Satz von 0,55 % bis 0,85 % auf Mindestlohnniveau, je nach Quelle): ihre Kosten werden nicht gesondert veröffentlicht. Sie sind in den 28 Mrd. € enthalten.',
          'Renten: Die PS lehnt ein Einfrieren der Renten ab, das im Basisszenario nicht vorgesehen ist. Der Simulator geht von der Reform 2023 aus (64 Jahre).',
        ],
        avis: 'Die Nationalversammlung lehnte die Zucman-Steuer am 16. Oktober 2026 ab. Die abgeschwächte Fassung brächte laut PS selbst 5 bis 7 Mrd. € pro Jahr.',
      },
      eco: {
        nom: 'Les Écologistes',
        titre: 'Les Écologistes (Grüne)',
        date: 'Plan zur Überwindung der Krise (25. September 2025) und Wahlkampfvorschläge von Marine Tondelier (2026)',
        mesures: [
          '28,5 Mrd. € Einnahmen, darunter die Zucman-Steuer → Mindeststeuer von 2 % (14 Mrd. € im Modell). Sonderabgabe großer Unternehmen und Übergewinnsteuer auf Öl und Gas für den Rest, 14,5 Mrd. €.',
          '20 % Steuer auf das oberste 1 % der Erbschaften, laut der Kandidatin 10 Mrd. € im Jahr 2027. Zusammen mit der vorigen Zeile → +0,8 BIP-Punkte Einnahmen.',
          'Haushalt für den ökologischen Wandel +9,1 Mrd. €, Verteidigung +6,2 Mrd. € → 15 Mrd. € neue Ausgaben.',
        ],
        nonModelise: [
          'Hitzeanpassungsplan, 7 Mrd. € pro Jahr bis 2032, finanziert durch eine Klima-Vermögensteuer: ohne Nettowirkung auf den Saldo, nicht übernommen.',
          '2025 angekündigter Pfad (Defizit 2030 bei 3,7 % des BIP): Er ging vom Haushalt 2026 aus, der seither überarbeitet wurde.',
        ],
        avis: 'Ein vollständiger Gegenhaushalt für 2027 wurde nicht gefunden: Das Szenario verbindet den Plan von 2025 mit den Wahlkampfvorschlägen. Der Ertrag der Zucman-Steuer ist umstritten.',
      },
      ren: {
        nom: 'Renaissance',
        titre: 'Renaissance',
        date: 'Programm von Gabriel Attal, Brief an die Franzosen (15. Oktober 2026)',
        mesures: [
          '150 Mrd. € Einsparungen in der Amtszeit, ohne Steuererhöhung → 150 Mrd. € Einsparungen im Jahr 2032 erreicht, Einführung über 6 Jahre.',
          'Zwei Drittel bei den Sozialausgaben (Krankschreibungen, Arbeitslosenversicherung mit 5 Mrd. €, neue Rentenreform, Nullrunde bei den Leistungen 2028) und Abbau von 100 000 Stellen im öffentlichen Dienst, etwa 7 Mrd. € pro Jahr: in der Summe enthalten.',
        ],
        nonModelise: [
          'Keine detaillierte Aufschlüsselung veröffentlicht: Die Einsparungen werden keinem Bereich zugeordnet.',
          'Renten: Die neue Reform setzte bei der Beitragsdauer an, ohne veröffentlichtes Ziel oder Zeitplan.',
        ],
        avis: 'Erklärtes Ziel: ausgeglichener Haushalt im Jahr 2037. Eine unabhängige Bewertung des Programms wurde nicht gefunden.',
      },
      lr: {
        nom: 'LR',
        titre: 'Les Républicains',
        date: 'Plan von Bruno Retailleau (12. Oktober 2026)',
        mesures: [
          '197 Mrd. € Einsparungen bis 2032: Staat 91 bis 96 Mrd. € je nach Quelle (400 000 Ruhestandsabgänge nicht ersetzt, Agenturen, drei Karenztage…), Renten 42 Mrd. €, Einwanderung 10 Mrd. €, Krankschreibungen 4 Mrd. €, Gebietskörperschaften 10 Mrd. €. Ohne Betrugsbekämpfung → 190 Mrd. € Einsparungen im Jahr 2032 erreicht.',
          'Bekämpfung von Steuer- und Sozialbetrug, 5 Mrd. € → 5 Mrd. € zurückgeholter Betrug.',
          '51 Mrd. € zurückgegeben, davon 21 Mrd. € an Haushalte und 30 Mrd. € an Unternehmen (Produktionssteuern) → −1,7 BIP-Punkte Einnahmen.',
        ],
        nonModelise: [
          'Renten: Ruhestand mit 63 mit Abschlag möglich, volle Rente mit 65. Die angekündigten 42 Mrd. € sind in den Einsparungen enthalten, nicht im Altersregler.',
          'Gesundheit: keine bezifferte Zusage.',
        ],
        avis: 'Erklärtes Ziel: Defizit unter 3 % des BIP im Jahr 2031, ohne Steuererhöhung. Eine unabhängige Bewertung des Plans wurde nicht gefunden.',
      },
      rn: {
        nom: 'RN',
        titre: 'Rassemblement national',
        date: 'Gegenhaushalt für 2027 (6. Oktober 2026)',
        mesures: [
          '140 Mrd. € Netto-Einsparungen bis 2032: EU-Beitrag auf 5 Mrd. € begrenzt (statt fast 29), Einwanderung, staatliche Einrichtungen und Agenturen (3,4 Mrd. €), Förderung erneuerbarer Energien, Sozialversicherung → 140 Mrd. € Einsparungen im Jahr 2032 erreicht.',
          '30 Mrd. € Netto-Steuersenkungen in der Amtszeit, darunter 5,5 % Mehrwertsteuer auf Energie und null Mehrwertsteuer auf 100 Grundprodukte, teilweise finanziert durch eine Steuer auf Aktienrückkäufe → −1,0 BIP-Punkt Einnahmen.',
        ],
        nonModelise: [
          'Renten: Rückkehr zu 62 Jahren, laut Institut de l’Entreprise 9,5 Mrd. € Kosten im Jahr 2031. Sie gelten als im angekündigten Nettosaldo enthalten.',
          'Mehrwertsteuer auf Energie: Der Simulator hat nur einen Regler je Satz. Die Senkung läuft über die Summe der Steuersenkungen.',
        ],
        avis: 'Das Institut de l’Entreprise beziffert die Nettoverbesserung des Saldos 2027 auf 2,9 Mrd. € statt der angekündigten 71,6 Mrd. € und hält die Rentenkosten für unterschätzt. Die Regierung hält den Plan für nicht umsetzbar.',
      },
    },
  };

  return { liste, textes };
});

// Sources reprises de https://dettedelafrance.fr/sources-bibliographie
// (consultée le 7 octobre 2026). Seules celles qui alimentent le modèle figurent ici.
// Les titres restent dans leur langue d'origine ; chiffres et usages sont traduits.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  return [
    {
      nom: 'Insee, Finances publiques 2025',
      url: 'https://www.insee.fr/fr/statistiques/8956575',
      chiffre: {
        fr: 'Dette 3 460,5 Md€ fin 2025 (115,6 % du PIB) ; déficit 152,5 Md€ (5,1 %) ; dépenses 57,2 %, recettes 52,1 %, prélèvements 43,6 % du PIB.',
        en: 'Debt €3,460.5bn at end-2025 (115.6% of GDP); deficit €152.5bn (5.1%); spending 57.2%, revenue 52.1%, taxes and contributions 43.6% of GDP.',
        es: 'Deuda de 3460,5 mil M€ a finales de 2025 (115,6 % del PIB); déficit de 152,5 mil M€ (5,1 %); gasto del 57,2 %, ingresos del 52,1 % y presión fiscal del 43,6 % del PIB.',
        de: 'Schulden von 3 460,5 Mrd. € Ende 2025 (115,6 % des BIP); Defizit 152,5 Mrd. € (5,1 %); Ausgaben 57,2 %, Einnahmen 52,1 %, Abgaben 43,6 % des BIP.',
      },
      usage: { fr: 'Point de départ de la projection.', en: 'Starting point of the projection.', es: 'Punto de partida de la proyección.', de: 'Ausgangspunkt der Projektion.' },
    },
    {
      nom: 'Insee, Dette publique au T1 2026',
      url: 'https://www.insee.fr/fr/statistiques/9010340',
      chiffre: {
        fr: '3 536,1 Md€ à fin mars 2026, soit 117,5 % du PIB. État 2 889,0 Md€, sécurité sociale 301,2 Md€, collectivités 276,5 Md€.',
        en: '€3,536.1bn at end-March 2026, i.e. 117.5% of GDP. State €2,889.0bn, social security €301.2bn, local authorities €276.5bn.',
        es: '3536,1 mil M€ a finales de marzo de 2026, es decir, el 117,5 % del PIB. Estado 2889,0 mil M€, seguridad social 301,2 mil M€, entes locales 276,5 mil M€.',
        de: '3 536,1 Mrd. € Ende März 2026, also 117,5 % des BIP. Staat 2 889,0 Mrd. €, Sozialversicherung 301,2 Mrd. €, Gebietskörperschaften 276,5 Mrd. €.',
      },
      usage: { fr: 'Contrôle de cohérence du point de départ 2026.', en: 'Consistency check of the 2026 starting point.', es: 'Control de coherencia del punto de partida de 2026.', de: 'Plausibilitätsprüfung des Ausgangspunkts 2026.' },
    },
    {
      nom: 'Cour des comptes, Finances publiques début 2026',
      url: 'https://program-evaluation.ccomptes.fr/fr/publications/la-situation-des-finances-publiques-debut-2026',
      chiffre: {
        fr: 'Dette projetée à 118,6 % du PIB en 2026 ; déficit stabilisant d’environ 2,8 % du PIB.',
        en: 'Debt projected at 118.6% of GDP in 2026; debt-stabilising deficit of about 2.8% of GDP.',
        es: 'Deuda proyectada del 118,6 % del PIB en 2026; déficit estabilizador de en torno al 2,8 % del PIB.',
        de: 'Schulden für 2026 auf 118,6 % des BIP projiziert; schuldenstabilisierendes Defizit von etwa 2,8 % des BIP.',
      },
      usage: { fr: 'Niveau de dette fin 2026 ; test du solde stabilisant.', en: 'Debt level at end-2026; test of the stabilising balance.', es: 'Nivel de deuda a finales de 2026; prueba del saldo estabilizador.', de: 'Schuldenstand Ende 2026; Test des stabilisierenden Saldos.' },
    },
    {
      nom: 'Banque de France, Dette publique 2025',
      url: 'https://www.banque-france.fr/system/files/2025-06/Eco-Bref_Dette-publique.%20DEFpdf.pdf',
      chiffre: {
        fr: 'Si le taux d’intérêt dépasse la croissance nominale, un excédent primaire est requis pour stabiliser le ratio.',
        en: 'If the interest rate exceeds nominal growth, a primary surplus is needed to stabilise the ratio.',
        es: 'Si el tipo de interés supera el crecimiento nominal, se necesita un superávit primario para estabilizar la ratio.',
        de: 'Liegt der Zins über dem nominalen Wachstum, ist ein Primärüberschuss nötig, um die Quote zu stabilisieren.',
      },
      usage: { fr: 'Équation de dynamique de la dette.', en: 'Debt dynamics equation.', es: 'Ecuación de dinámica de la deuda.', de: 'Gleichung der Schuldendynamik.' },
    },
    {
      nom: 'Sénat, Charge de la dette (rapport n° 719)',
      url: 'https://www.senat.fr/rap/r23-719/r23-719_mono.html',
      chiffre: {
        fr: 'Choc de +100 points de base : +13,9 Md€ fin 2027, +24,0 Md€ fin 2030, +32,6 Md€ fin 2033. Maturité moyenne 8,6 ans.',
        en: '+100 basis-point shock: +€13.9bn at end-2027, +€24.0bn at end-2030, +€32.6bn at end-2033. Average maturity 8.6 years.',
        es: 'Perturbación de +100 puntos básicos: +13,9 mil M€ a finales de 2027, +24,0 mil M€ a finales de 2030, +32,6 mil M€ a finales de 2033. Vencimiento medio de 8,6 años.',
        de: 'Schock von +100 Basispunkten: +13,9 Mrd. € Ende 2027, +24,0 Mrd. € Ende 2030, +32,6 Mrd. € Ende 2033. Durchschnittliche Laufzeit 8,6 Jahre.',
      },
      usage: { fr: 'Vitesse à laquelle le taux de marché se transmet à la charge d’intérêts.', en: 'Speed at which the market rate passes through to the interest bill.', es: 'Velocidad a la que el tipo de mercado se transmite al gasto en intereses.', de: 'Geschwindigkeit, mit der der Marktzins auf die Zinsausgaben durchschlägt.' },
    },
    {
      nom: 'Agence France Trésor, financement 2026',
      url: 'https://www.aft.gouv.fr/en/publications/communiques-presse/30122025-indicative-state-financing-programme-2026',
      chiffre: {
        fr: 'Programme d’émissions de moyen et long terme nettes des rachats : 310 Md€ en 2026.',
        en: 'Medium- and long-term issuance programme net of buybacks: €310bn in 2026.',
        es: 'Programa de emisiones a medio y largo plazo neto de recompras: 310 mil M€ en 2026.',
        de: 'Emissionsprogramm mittel- und langfristiger Anleihen abzüglich Rückkäufen: 310 Mrd. € im Jahr 2026.',
      },
      usage: { fr: 'Ordre de grandeur du refinancement annuel.', en: 'Order of magnitude of annual refinancing.', es: 'Orden de magnitud de la refinanciación anual.', de: 'Größenordnung der jährlichen Refinanzierung.' },
    },
    {
      nom: 'Trésor, Plan budgétaire et structurel 2025-2029',
      url: 'https://www.tresor.economie.gouv.fr/Articles/2024/10/23/publication-du-plan-budgetaire-et-structurel-a-moyen-terme-psmt-pour-2025-2029',
      chiffre: {
        fr: 'Dépense primaire nette plafonnée à 0,8 % en 2025, 1,2 % les années suivantes, 1,1 % en 2029.',
        en: 'Net primary expenditure capped at 0.8% in 2025, 1.2% in following years, 1.1% in 2029.',
        es: 'Gasto primario neto limitado al 0,8 % en 2025, al 1,2 % los años siguientes y al 1,1 % en 2029.',
        de: 'Netto-Primärausgaben begrenzt auf 0,8 % im Jahr 2025, 1,2 % in den Folgejahren, 1,1 % im Jahr 2029.',
      },
      usage: { fr: 'Repère du curseur « dépense primaire » et préréglage « Plan budgétaire ».', en: 'Reference for the “primary spending” slider and the “Fiscal plan” preset.', es: 'Referencia del control «gasto primario» y del escenario «Plan presupuestario».', de: 'Referenz für den Regler „Primärausgaben“ und das Szenario „Haushaltsplan“.' },
    },
    {
      nom: 'Banque de France, Productivité 2024',
      url: 'https://www.banque-france.fr/fr/publications-et-statistiques/publications/comment-expliquer-les-pertes-de-productivite-observees-en-france-depuis-la-periode-pre-covid',
      chiffre: {
        fr: 'Productivité du travail inférieure de 8,5 % à sa tendance pré-Covid en 2023.',
        en: 'Labour productivity 8.5% below its pre-Covid trend in 2023.',
        es: 'Productividad del trabajo un 8,5 % inferior a su tendencia previa a la covid en 2023.',
        de: 'Arbeitsproduktivität 2023 um 8,5 % unter ihrem Trend vor Covid.',
      },
      usage: { fr: 'Curseur « rattrapage de productivité ».', en: '“Productivity catch-up” slider.', es: 'Control «recuperación de la productividad».', de: 'Regler „Aufholen der Produktivität“.' },
    },
    {
      nom: 'PLF 2026, Voies et moyens tome II',
      url: 'https://www.assemblee-nationale.fr/dyn/dyn/contenu/visualisation/1087933/file/Voies_et_moyens_Tome_2_2026.pdf',
      chiffre: {
        fr: '465 dépenses fiscales, 88,3 Md€ en 2026. Supprimer une niche ne rapporte pas son coût affiché.',
        en: '465 tax expenditures, €88.3bn in 2026. Removing a tax break does not yield its stated cost.',
        es: '465 gastos fiscales, 88,3 mil M€ en 2026. Suprimir un beneficio fiscal no recauda su coste declarado.',
        de: '465 Steuervergünstigungen, 88,3 Mrd. € im Jahr 2026. Die Streichung einer Vergünstigung bringt nicht deren ausgewiesene Kosten ein.',
      },
      usage: { fr: 'Curseur « niches fiscales ».', en: '“Tax breaks” slider.', es: 'Control «beneficios fiscales».', de: 'Regler „Steuervergünstigungen“.' },
    },
    {
      nom: 'Ministère de l’Économie, Contrôle fiscal 2025',
      url: 'https://www.economie.gouv.fr/actualites/lutte-contre-la-fraude-un-controle-fiscal-toujours-plus-efficace-en-2025',
      chiffre: {
        fr: '17,1 Md€ notifiés, 11,4 Md€ encaissés en 2025.',
        en: '€17.1bn assessed, €11.4bn collected in 2025.',
        es: '17,1 mil M€ liquidados y 11,4 mil M€ cobrados en 2025.',
        de: '17,1 Mrd. € festgesetzt, 11,4 Mrd. € eingenommen im Jahr 2025.',
      },
      usage: { fr: 'Curseur « fraude recouvrée ».', en: '“Fraud recovered” slider.', es: 'Control «fraude recuperado».', de: 'Regler „eingetriebener Steuerbetrug“.' },
    },
    {
      nom: 'Conseil d’orientation des retraites, rapport annuel 2025',
      url: 'https://www.cor-retraites.fr/rapports-du-cor/rapport-annuel-cor-juin-2025-evolutions-perspectives-retraites-france',
      chiffre: {
        fr: 'Solde du système de retraite : −0,1 point de PIB en 2024, −0,2 en 2030, −1,4 en 2070.',
        en: 'Pension system balance: −0.1 pp of GDP in 2024, −0.2 in 2030, −1.4 in 2070.',
        es: 'Saldo del sistema de pensiones: −0,1 pp del PIB en 2024, −0,2 en 2030, −1,4 en 2070.',
        de: 'Saldo des Rentensystems: −0,1 Pp. des BIP im Jahr 2024, −0,2 im Jahr 2030, −1,4 im Jahr 2070.',
      },
      usage: { fr: 'Curseur « dérive des retraites ».', en: '“Pension drift” slider.', es: 'Control «deriva de las pensiones».', de: 'Regler „Entwicklung des Rentensaldos“.' },
    },
    {
      nom: 'Eurostat, dépenses des administrations publiques par fonction, 2024',
      url: 'https://dettedelafrance.fr/compteurs/depenses-cofog-total',
      chiffre: {
        fr: 'Total 1 671,8 Md€ : protection sociale 693,0 (dont vieillesse 392,0), santé 261,2, services généraux 181,1 (dont dette 58,9), affaires économiques 166,1, enseignement 148,6, défense 54,2, ordre et sécurité 52,1.',
        en: 'Total €1,671.8bn: social protection 693.0 (of which old age 392.0), health 261.2, general services 181.1 (of which debt 58.9), economic affairs 166.1, education 148.6, defence 54.2, public order 52.1.',
        es: 'Total 1671,8 mil M€: protección social 693,0 (de ella vejez 392,0), sanidad 261,2, servicios generales 181,1 (de ellos deuda 58,9), asuntos económicos 166,1, educación 148,6, defensa 54,2, orden público 52,1.',
        de: 'Insgesamt 1 671,8 Mrd. €: soziale Sicherung 693,0 (davon Alter 392,0), Gesundheit 261,2, allgemeine Verwaltung 181,1 (davon Schulden 58,9), Wirtschaft 166,1, Bildung 148,6, Verteidigung 54,2, öffentliche Ordnung 52,1.',
      },
      usage: { fr: 'Curseurs « Dépenses par poste ». Montants relevés sur les compteurs de dettedelafrance.fr.', en: '“Spending by function” sliders. Amounts taken from the counters on dettedelafrance.fr.', es: 'Controles «Gasto por función». Importes tomados de los contadores de dettedelafrance.fr.', de: 'Regler „Ausgaben nach Aufgabenbereich“. Beträge von den Zählern auf dettedelafrance.fr.' },
    },
    {
      nom: 'Sénat, rapport sur le projet de loi de finances pour 2025 (article 2)',
      url: 'https://www.senat.fr/rap/l24-144-21/l24-144-212.html',
      chiffre: {
        fr: 'Impôt sur le revenu : 88,1 Md€ en 2024, 93,8 Md€ prévus en 2025. Les 10 % de foyers aux revenus les plus élevés en paient 72 à 74 %. Tranche à 45 % (2013) : +344 M€. Baisse de 14 à 11 % (2020) : −5 Md€. Contribution différentielle sur les hauts revenus : 2 Md€ attendus, 24 300 foyers.',
        en: 'Income tax: €88.1bn in 2024, €93.8bn forecast for 2025. The top 10% of households pay 72-74% of it. 45% bracket (2013): +€344m. Cut from 14% to 11% (2020): −€5bn. Differential contribution on high incomes: €2bn expected, 24,300 households.',
        es: 'Impuesto sobre la renta: 88,1 mil M€ en 2024, 93,8 mil M€ previstos en 2025. El 10 % de hogares con más renta paga entre el 72 y el 74 %. Tramo del 45 % (2013): +344 M€. Bajada del 14 al 11 % (2020): −5 mil M€. Contribución diferencial sobre las rentas altas: 2 mil M€ previstos, 24 300 hogares.',
        de: 'Einkommensteuer: 88,1 Mrd. € im Jahr 2024, 93,8 Mrd. € für 2025 erwartet. Die 10 % der Haushalte mit den höchsten Einkommen zahlen 72 bis 74 % davon. Stufe 45 % (2013): +344 Mio. €. Senkung von 14 auf 11 % (2020): −5 Mrd. €. Differenzbeitrag auf hohe Einkommen: 2 Mrd. € erwartet, 24 300 Haushalte.',
      },
      usage: { fr: 'Calage des rendements par tranche. Hors bibliographie du site.', en: 'Calibration of yields per bracket. Not in the site’s bibliography.', es: 'Calibración de los rendimientos por tramo. Fuera de la bibliografía del sitio.', de: 'Kalibrierung der Erträge je Stufe. Nicht in der Bibliografie der Website.' },
    },
    {
      nom: 'DGFiP, foyers par tranche marginale (revenus 2022), via MoneyVox',
      url: 'https://www.moneyvox.fr/impot/actualites/97424/impot-sur-le-revenu-0-11-ou-45-combien-de-francais-paient-le-meme-taux-que-vous',
      chiffre: {
        fr: '13 millions de foyers à 0 %, 20 millions à 11 %, 6,4 millions à 30 %, 436 000 à 41 %, 67 000 à 45 %. Impôt moyen : 530 €, 6 678 €, 38 180 € et 185 046 €.',
        en: '13 million households at 0%, 20 million at 11%, 6.4 million at 30%, 436,000 at 41%, 67,000 at 45%. Average tax: €530, €6,678, €38,180 and €185,046.',
        es: '13 millones de hogares al 0 %, 20 millones al 11 %, 6,4 millones al 30 %, 436 000 al 41 %, 67 000 al 45 %. Impuesto medio: 530 €, 6678 €, 38 180 € y 185 046 €.',
        de: '13 Millionen Haushalte bei 0 %, 20 Millionen bei 11 %, 6,4 Millionen bei 30 %, 436 000 bei 41 %, 67 000 bei 45 %. Durchschnittliche Steuer: 530 €, 6 678 €, 38 180 € und 185 046 €.',
      },
      usage: { fr: 'Estimation des revenus taxés dans chaque tranche. Hors bibliographie du site.', en: 'Estimate of income taxed in each bracket. Not in the site’s bibliography.', es: 'Estimación de la renta gravada en cada tramo. Fuera de la bibliografía del sitio.', de: 'Schätzung der in jeder Stufe besteuerten Einkommen. Nicht in der Bibliografie der Website.' },
    },
    {
      nom: 'Barème 2027 de l’impôt sur le revenu (projet de loi de finances), via Tout sur mes finances',
      url: 'https://www.toutsurmesfinances.com/actualites/?p=2202',
      chiffre: {
        fr: 'Revalorisation de 2,1 % : 0 % jusqu’à 11 844 €, 11 % jusqu’à 30 200 €, 30 % jusqu’à 86 353 €, 41 % jusqu’à 185 737 €, 45 % au-delà. Provisoire jusqu’au vote du budget.',
        en: 'Uprated by 2.1%: 0% up to €11,844, 11% up to €30,200, 30% up to €86,353, 41% up to €185,737, 45% above. Provisional until the budget is passed.',
        es: 'Revalorización del 2,1 %: 0 % hasta 11 844 €, 11 % hasta 30 200 €, 30 % hasta 86 353 €, 41 % hasta 185 737 €, 45 % por encima. Provisional hasta la votación del presupuesto.',
        de: 'Anpassung um 2,1 %: 0 % bis 11 844 €, 11 % bis 30 200 €, 30 % bis 86 353 €, 41 % bis 185 737 €, darüber 45 %. Vorläufig bis zur Verabschiedung des Haushalts.',
      },
      usage: { fr: 'Seuils affichés sur les curseurs. Hors bibliographie du site.', en: 'Thresholds shown on the sliders. Not in the site’s bibliography.', es: 'Umbrales mostrados en los controles. Fuera de la bibliografía del sitio.', de: 'Auf den Reglern angezeigte Schwellen. Nicht in der Bibliografie der Website.' },
    },
    {
      nom: 'DG Trésor, Analyse de la composition des recettes de TVA (septembre 2025), via Vie publique',
      url: 'https://www.vie-publique.fr/en-bref/300325-hausse-de-la-tva-quels-effets-les-reponses-de-la-direction-du-tresor',
      chiffre: {
        fr: 'TVA : 202,7 Md€ en 2022, dont 65,1 % payés par les ménages. Un point de plus en 2025 : 7,5 Md€ au taux de 20 %, 1,6 Md€ à 10 %, 2,0 Md€ à 5,5 %, 0,4 Md€ à 2,1 %, soit 11,4 Md€ nets pour tous les taux, à comportement inchangé.',
        en: 'VAT: €202.7bn in 2022, 65.1% paid by households. One more point in 2025: €7.5bn at the 20% rate, €1.6bn at 10%, €2.0bn at 5.5%, €0.4bn at 2.1%, i.e. €11.4bn net for all rates, with unchanged behaviour.',
        es: 'IVA: 202,7 mil M€ en 2022, el 65,1 % pagado por los hogares. Un punto más en 2025: 7,5 mil M€ al tipo del 20 %, 1,6 mil M€ al 10 %, 2,0 mil M€ al 5,5 %, 0,4 mil M€ al 2,1 %, es decir, 11,4 mil M€ netos para todos los tipos, con comportamiento constante.',
        de: 'Mehrwertsteuer: 202,7 Mrd. € im Jahr 2022, davon 65,1 % von Haushalten gezahlt. Ein Punkt mehr im Jahr 2025: 7,5 Mrd. € beim Satz von 20 %, 1,6 Mrd. € bei 10 %, 2,0 Mrd. € bei 5,5 %, 0,4 Mrd. € bei 2,1 %, also 11,4 Mrd. € netto für alle Sätze, bei unverändertem Verhalten.',
      },
      usage: { fr: 'Curseurs « TVA ». Hors bibliographie du site.', en: '“VAT” sliders. Not in the site’s bibliography.', es: 'Controles «IVA». Fuera de la bibliografía del sitio.', de: 'Regler „Mehrwertsteuer“. Nicht in der Bibliografie der Website.' },
    },
    {
      nom: 'Sénat, commission d’enquête sur les aides publiques aux entreprises (juillet 2025), via Public Sénat',
      url: 'https://www.publicsenat.fr/actualites/economie/211-milliards-deuros-daides-publiques-aux-entreprises-sur-quoi-repose-le-calcul-de-la-commission-denquete-du-senat',
      chiffre: {
        fr: '211 Md€ en 2023 : 88 Md€ de dépenses fiscales, 75 Md€ d’allègements de cotisations sociales, 41 Md€ d’aides de Bpifrance, 7 Md€ de subventions de l’État. Hors collectivités et Union européenne.',
        en: '€211bn in 2023: €88bn of tax expenditures, €75bn of social-contribution relief, €41bn of Bpifrance support, €7bn of State subsidies. Excluding local authorities and the European Union.',
        es: '211 mil M€ en 2023: 88 mil M€ de gastos fiscales, 75 mil M€ de reducciones de cotizaciones sociales, 41 mil M€ de ayudas de Bpifrance y 7 mil M€ de subvenciones del Estado. Sin entes locales ni Unión Europea.',
        de: '211 Mrd. € im Jahr 2023: 88 Mrd. € Steuervergünstigungen, 75 Mrd. € Entlastungen bei Sozialbeiträgen, 41 Mrd. € Hilfen der Bpifrance, 7 Mrd. € staatliche Subventionen. Ohne Gebietskörperschaften und Europäische Union.',
      },
      usage: { fr: 'Curseurs « Aides aux entreprises ». Hors bibliographie du site.', en: '“Business support” sliders. Not in the site’s bibliography.', es: 'Controles «Ayudas a las empresas». Fuera de la bibliografía del sitio.', de: 'Regler „Unternehmenshilfen“. Nicht in der Bibliografie der Website.' },
    },
    {
      nom: 'Haut-commissariat au Plan, Les aides aux entreprises en France : de quoi parle-t-on ? (note n° 157)',
      url: 'https://www.strategie-plan.gouv.fr/files/files/Publications/2025/2025-07-17%20-%20NA%20157%20-%20Aides%20aux%20entreprises/HCSP-2025-Edito-Aides%20aux%20entreprises-Juillet.pdf',
      chiffre: {
        fr: 'De 82 à 187 Md€ selon le périmètre. Seuls 3,2 Md€ des 73,8 Md€ d’exonérations de cotisations sont comptés comme aides dans le périmètre étroit.',
        en: '€82bn to €187bn depending on scope. Only €3.2bn of the €73.8bn of contribution exemptions count as support in the narrow scope.',
        es: 'De 82 a 187 mil M€ según el perímetro. Solo 3,2 de los 73,8 mil M€ de exenciones de cotizaciones se cuentan como ayudas en el perímetro estricto.',
        de: '82 bis 187 Mrd. € je nach Abgrenzung. Nur 3,2 der 73,8 Mrd. € Beitragsbefreiungen gelten in der engen Abgrenzung als Hilfen.',
      },
      usage: { fr: 'Fourchette rappelée en tête du groupe « Aides aux entreprises ». Hors bibliographie du site.', en: 'Range quoted at the top of the “Business support” group. Not in the site’s bibliography.', es: 'Horquilla citada al principio del grupo «Ayudas a las empresas». Fuera de la bibliografía del sitio.', de: 'Spanne zu Beginn der Gruppe „Unternehmenshilfen“. Nicht in der Bibliografie der Website.' },
    },
    {
      nom: 'Cour des comptes, Situation financière et perspectives du système de retraites (février 2025)',
      url: 'https://www.vie-publique.fr/files/rapport/pdf/297428.pdf',
      chiffre: {
        fr: 'En 2035, toutes finances publiques : âge légal à 65 ans +17,7 Md€, à 63 ans −13 Md€ ; durée à 44 ans +9,7 Md€, à 42 ans −7,1 Md€. Un point de cotisation : 4,8 à 7,6 Md€. Un point de sous-indexation : 2,9 Md€.',
        en: 'In 2035, across all public finances: retirement age 65 +€17.7bn, 63 −€13bn; contribution period 44 years +€9.7bn, 42 years −€7.1bn. One contribution point: €4.8-7.6bn. One point of under-indexation: €2.9bn.',
        es: 'En 2035, para el conjunto de las finanzas públicas: edad legal a 65 años +17,7 mil M€, a 63 años −13 mil M€; periodo de 44 años +9,7 mil M€, de 42 años −7,1 mil M€. Un punto de cotización: de 4,8 a 7,6 mil M€. Un punto de subindexación: 2,9 mil M€.',
        de: 'Im Jahr 2035, über alle öffentlichen Finanzen: Rentenalter 65 +17,7 Mrd. €, 63 −13 Mrd. €; Beitragsdauer 44 Jahre +9,7 Mrd. €, 42 Jahre −7,1 Mrd. €. Ein Beitragspunkt: 4,8 bis 7,6 Mrd. €. Ein Punkt Unterindexierung: 2,9 Mrd. €.',
      },
      usage: { fr: 'Curseurs « âge légal », « durée de cotisation », « taux de cotisation » et « sous-indexation ». Hors bibliographie du site.', en: '“Retirement age”, “contribution period”, “contribution rate” and “under-indexation” sliders. Not in the site’s bibliography.', es: 'Controles «edad legal», «periodo de cotización», «tipo de cotización» y «subindexación». Fuera de la bibliografía del sitio.', de: 'Regler „Rentenalter“, „Beitragsdauer“, „Beitragssatz“ und „Unterindexierung“. Nicht in der Bibliografie der Website.' },
    },
    {
      nom: 'dettedelafrance.fr, Scénario plein emploi',
      url: 'https://dettedelafrance.fr/scenario-plein-emploi',
      chiffre: {
        fr: 'Chômage de 7,4 % à 5 % : environ 700 000 emplois, 30 à 40 Md€ par an d’effet budgétaire net. Fourchette pédagogique du site.',
        en: 'Unemployment from 7.4% to 5%: about 700,000 jobs, €30-40bn a year of net budget effect. The site’s illustrative range.',
        es: 'Paro del 7,4 % al 5 %: unos 700 000 empleos y de 30 a 40 mil M€ al año de efecto presupuestario neto. Horquilla didáctica del sitio.',
        de: 'Arbeitslosigkeit von 7,4 % auf 5 %: etwa 700 000 Stellen, 30 bis 40 Mrd. € Nettowirkung auf den Haushalt pro Jahr. Didaktische Spanne der Website.',
      },
      usage: { fr: 'Curseur « taux de chômage ».', en: '“Unemployment rate” slider.', es: 'Control «tasa de paro».', de: 'Regler „Arbeitslosenquote“.' },
    },
    {
      nom: 'Commission européenne, Ageing Report 2024',
      url: 'https://economy-finance.ec.europa.eu/publications/2024-ageing-report-economic-and-budgetary-projections-eu-member-states-2022-2070_en',
      chiffre: {
        fr: 'Dépenses publiques d’autonomie : de 1,9 à 2,6 points de PIB entre 2022 et 2070, jusqu’à 4,8 dans le scénario de risque.',
        en: 'Public long-term care spending: from 1.9 to 2.6 pp of GDP between 2022 and 2070, up to 4.8 in the risk scenario.',
        es: 'Gasto público en dependencia: de 1,9 a 2,6 pp del PIB entre 2022 y 2070, hasta 4,8 en el escenario de riesgo.',
        de: 'Öffentliche Pflegeausgaben: von 1,9 auf 2,6 Pp. des BIP zwischen 2022 und 2070, bis zu 4,8 im Risikoszenario.',
      },
      usage: { fr: 'Curseur « autonomie ».', en: '“Long-term care” slider.', es: 'Control «dependencia».', de: 'Regler „Pflege“.' },
    },
    {
      nom: 'DARES / Vie publique, Seniors 2024',
      url: 'https://www.vie-publique.fr/en-bref/300161-emploi-des-seniors-des-metiers-souvent-moins-qualifies',
      chiffre: {
        fr: 'Taux d’emploi des 55-64 ans : 60,4 % en 2024, en retrait des meilleurs pays européens.',
        en: 'Employment rate of 55-64 year-olds: 60.4% in 2024, behind the best European countries.',
        es: 'Tasa de empleo de 55 a 64 años: 60,4 % en 2024, por detrás de los mejores países europeos.',
        de: 'Beschäftigungsquote der 55- bis 64-Jährigen: 60,4 % im Jahr 2024, hinter den besten europäischen Ländern.',
      },
      usage: { fr: 'Curseur « emploi des seniors ».', en: '“Senior employment” slider.', es: 'Control «empleo de los mayores».', de: 'Regler „Beschäftigung Älterer“.' },
    },
    {
      nom: 'DARES, salariés bénéficiaires de la revalorisation du SMIC',
      url: 'https://dares.travail-emploi.gouv.fr',
      chiffre: {
        fr: 'Environ 17 % des salariés du secteur privé, soit près de 3,1 millions de personnes, concernés par la revalorisation de janvier 2024.',
        en: 'About 17% of private-sector employees, nearly 3.1 million people, affected by the January 2024 uprating.',
        es: 'En torno al 17 % de los asalariados del sector privado, casi 3,1 millones de personas, afectados por la revalorización de enero de 2024.',
        de: 'Rund 17 % der Beschäftigten in der Privatwirtschaft, also fast 3,1 Millionen Menschen, von der Anpassung im Januar 2024 betroffen.',
      },
      usage: { fr: 'Curseurs « SMIC ». Hors bibliographie du site ; rendements par point estimés par l’application.', en: '“Minimum wage” sliders. Not in the site’s bibliography; per-point yields estimated by the app.', es: 'Controles «SMIC». Fuera de la bibliografía del sitio; rendimientos por punto estimados por la aplicación.', de: 'Regler „SMIC“. Nicht in der Bibliografie der Website; Erträge je Punkt von der Anwendung geschätzt.' },
    },
    {
      nom: 'DREES, Minima sociaux et prestations sociales (panorama annuel) ; CNAF',
      url: 'https://drees.solidarites-sante.gouv.fr',
      chiffre: {
        fr: 'Ordres de grandeur annuels : RSA 12 Md€, prime d’activité 10,5 Md€, AAH 13,5 Md€, minimum vieillesse 3,9 Md€, aides au logement 15,5 Md€, prestations familiales 33 Md€.',
        en: 'Annual orders of magnitude: RSA €12bn, activity bonus €10.5bn, AAH €13.5bn, minimum old-age pension €3.9bn, housing benefits €15.5bn, family benefits €33bn.',
        es: 'Órdenes de magnitud anuales: RSA 12 mil M€, prima de actividad 10,5 mil M€, AAH 13,5 mil M€, mínimo de vejez 3,9 mil M€, ayudas a la vivienda 15,5 mil M€, prestaciones familiares 33 mil M€.',
        de: 'Jährliche Größenordnungen: RSA 12 Mrd. €, Aktivitätsprämie 10,5 Mrd. €, AAH 13,5 Mrd. €, Mindestrente 3,9 Mrd. €, Wohngeld 15,5 Mrd. €, Familienleistungen 33 Mrd. €.',
      },
      usage: { fr: 'Aides absorbées par le revenu universel. Hors bibliographie du site, à vérifier.', en: 'Benefits absorbed by the basic income. Not in the site’s bibliography, to be checked.', es: 'Ayudas absorbidas por la renta básica. Fuera de la bibliografía del sitio, por verificar.', de: 'Vom Grundeinkommen ersetzte Leistungen. Nicht in der Bibliografie der Website, zu prüfen.' },
    },
    {
      nom: 'France Stratégie, Incidences économiques de l’action pour le climat',
      url: 'https://www.strategie-plan.gouv.fr/files/files/Publications/Rapport/2023-incidences-economiques-rapport-pisani-5juin.pdf',
      chiffre: {
        fr: 'Risque pour la dette : environ 10 points de PIB en 2030, 15 en 2035, 25 en 2040. Projection sous hypothèses, contestée sur son ampleur.',
        en: 'Risk to debt: about 10 pp of GDP in 2030, 15 in 2035, 25 in 2040. A projection under assumptions, its size disputed.',
        es: 'Riesgo para la deuda: unos 10 puntos del PIB en 2030, 15 en 2035 y 25 en 2040. Proyección bajo hipótesis, de magnitud discutida.',
        de: 'Risiko für die Schulden: etwa 10 Pp. des BIP im Jahr 2030, 15 im Jahr 2035, 25 im Jahr 2040. Projektion unter Annahmen, im Ausmaß umstritten.',
      },
      usage: { fr: 'Curseur « risque climat ».', en: '“Climate risk” slider.', es: 'Control «riesgo climático».', de: 'Regler „Klimarisiko“.' },
    },
    {
      nom: 'dettedelafrance.fr, Sources et bibliographie',
      url: 'https://dettedelafrance.fr/sources-bibliographie',
      chiffre: {
        fr: 'Liste complète des 36 sources, hiérarchie des sources et pièges de lecture.',
        en: 'Full list of the 36 sources, source hierarchy and reading pitfalls.',
        es: 'Lista completa de las 36 fuentes, jerarquía de fuentes y trampas de lectura.',
        de: 'Vollständige Liste der 36 Quellen, Rangfolge der Quellen und Lesefallen.',
      },
      usage: { fr: 'Origine de la sélection ci-dessus ; ordres de grandeur des crises passées (+200 à +600 Md€).', en: 'Origin of the selection above; orders of magnitude of past crises (+€200-600bn).', es: 'Origen de la selección anterior; órdenes de magnitud de las crisis pasadas (+200 a +600 mil M€).', de: 'Herkunft der obigen Auswahl; Größenordnungen vergangener Krisen (+200 bis +600 Mrd. €).' },
    },
    {
      nom: 'Eurostat, projections de population EUROPOP2023',
      url: 'https://ec.europa.eu/eurostat/databrowser/view/proj_23np/default/table',
      chiffre: {
        fr: '68,6 millions d’habitants en 2026 ; croissance d’environ 0,15 % par an d’ici 2036.',
        en: '68.6 million inhabitants in 2026; growth of about 0.15% a year to 2036.',
        es: '68,6 millones de habitantes en 2026; crecimiento de en torno al 0,15 % anual hasta 2036.',
        de: '68,6 Millionen Einwohner 2026; Wachstum von etwa 0,15 % pro Jahr bis 2036.',
      },
      usage: { fr: 'Indicateurs par habitant (dette, intérêts, dépenses par poste), sans effet sur la trajectoire.', en: 'Per-person indicators (debt, interest, spending by function), with no effect on the trajectory.', es: 'Indicadores por habitante (deuda, intereses, gasto por función), sin efecto en la trayectoria.', de: 'Pro-Kopf-Kennzahlen (Schulden, Zinsen, Ausgaben nach Aufgaben), ohne Einfluss auf den Pfad.' },
    },
  ];
});

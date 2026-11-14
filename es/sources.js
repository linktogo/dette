// Sources du modèle espagnol (consultées en novembre 2026). Seules celles qui
// alimentent le modèle figurent ici. Les chiffres marqués « estimation de
// l'application » sont des ordres de grandeur, à vérifier dans les sources primaires.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  return [
    {
      nom: {
        fr: 'Banco de España, dette des administrations publiques, décembre 2025',
        en: 'Banco de España, general government debt, December 2025',
        es: 'Banco de España, deuda de las Administraciones Públicas, diciembre de 2025',
        de: 'Banco de España, Schulden des Staates, Dezember 2025',
      },
      url: 'https://www.bde.es/f/webbe/GAP/Secciones/SalaPrensa/NotasInformativas/26/presbe2026-14.pdf',
      chiffre: {
        fr: 'Dette PDE : 1 698 Md€ fin 2025, soit 100,8 % du PIB (−0,9 point sur un an). Administration centrale 1 549,1 Md€, communautés autonomes 341,9 Md€, Sécurité sociale 136,2 Md€.',
        en: 'EDP debt: €1,698bn at end-2025, i.e. 100.8% of GDP (−0.9 pp over a year). Central government €1,549.1bn, autonomous communities €341.9bn, Social Security €136.2bn.',
        es: 'Deuda PDE: 1698 mil M€ a finales de 2025, el 100,8 % del PIB (−0,9 puntos en un año). Administración Central 1549,1 mil M€, comunidades autónomas 341,9 mil M€, Seguridad Social 136,2 mil M€.',
        de: 'Schulden nach VÜD: 1 698 Mrd. € Ende 2025, also 100,8 % des BIP (−0,9 Pp. in einem Jahr). Zentralstaat 1 549,1 Mrd. €, autonome Gemeinschaften 341,9 Mrd. €, Sozialversicherung 136,2 Mrd. €.',
      },
      usage: { fr: 'Point de départ de la projection.', en: 'Starting point of the projection.', es: 'Punto de partida de la proyección.', de: 'Ausgangspunkt der Projektion.' },
    },
    {
      nom: {
        fr: 'IGAE / Ministerio de Hacienda, déficit des administrations publiques 2025',
        en: 'IGAE / Ministry of Finance, general government deficit 2025',
        es: 'IGAE / Ministerio de Hacienda, déficit de las Administraciones Públicas 2025',
        de: 'IGAE / Finanzministerium, Defizit des Staates 2025',
      },
      url: 'https://www.caixabankresearch.com/es/publicaciones/notas-breves-actualidad-economica-y-financiera/espana/deficit-publico-se-situo-2025',
      chiffre: {
        fr: 'Déficit de 40,3 Md€ (2,39 % du PIB) DANA comprise, notifié à Eurostat à 2,4 % ; 36,8 Md€ (2,18 %) hors DANA. Intérêts : 40,3 Md€ (2,39 % du PIB). Recettes 42,9 % et dépenses 45,3 % du PIB.',
        en: 'Deficit of €40.3bn (2.39% of GDP) including the DANA floods, notified to Eurostat at 2.4%; €36.8bn (2.18%) excluding DANA. Interest: €40.3bn (2.39% of GDP). Revenue 42.9% and spending 45.3% of GDP.',
        es: 'Déficit de 40,3 mil M€ (2,39 % del PIB) con la DANA, notificado a Eurostat en el 2,4 %; 36,8 mil M€ (2,18 %) sin la DANA. Intereses: 40,3 mil M€ (2,39 % del PIB). Ingresos del 42,9 % y gasto del 45,3 % del PIB.',
        de: 'Defizit von 40,3 Mrd. € (2,39 % des BIP) einschließlich DANA-Flut, an Eurostat mit 2,4 % gemeldet; 36,8 Mrd. € (2,18 %) ohne DANA. Zinsen: 40,3 Mrd. € (2,39 % des BIP). Einnahmen 42,9 % und Ausgaben 45,3 % des BIP.',
      },
      usage: {
        fr: 'Recettes et intérêts de départ ; ordre de grandeur des chocs (DANA : 3,6 Md€ en 2025).',
        en: 'Starting revenue and interest; order of magnitude of shocks (DANA: €3.6bn in 2025).',
        es: 'Ingresos e intereses de partida; orden de magnitud de las perturbaciones (DANA: 3,6 mil M€ en 2025).',
        de: 'Einnahmen und Zinsen zu Beginn; Größenordnung von Schocks (DANA: 3,6 Mrd. € im Jahr 2025).',
      },
    },
    {
      nom: {
        fr: 'INE, Contabilidad Nacional Anual (septembre 2026)',
        en: 'INE, Annual National Accounts (September 2026)',
        es: 'INE, Contabilidad Nacional Anual (septiembre de 2026)',
        de: 'INE, Jährliche Volkswirtschaftliche Gesamtrechnung (September 2026)',
      },
      url: 'https://ine.es/dyngs/Prensa/en/CNA2025.html',
      chiffre: {
        fr: 'PIB 2025 : 1 690,0 Md€ courants ; croissance en volume révisée à 2,6 %.',
        en: '2025 GDP: €1,690.0bn at current prices; real growth revised to 2.6%.',
        es: 'PIB 2025: 1690,0 mil M€ corrientes; crecimiento en volumen revisado al 2,6 %.',
        de: 'BIP 2025: 1 690,0 Mrd. € in jeweiligen Preisen; reales Wachstum auf 2,6 % revidiert.',
      },
      usage: { fr: 'Contrôle du PIB de départ.', en: 'Check of the starting GDP.', es: 'Control del PIB de partida.', de: 'Prüfung des Ausgangs-BIP.' },
    },
    {
      nom: {
        fr: 'AIReF, prévisions budgétaires 2026 (juillet et novembre 2026)',
        en: 'AIReF, fiscal forecasts for 2026 (July and November 2026)',
        es: 'AIReF, previsiones presupuestarias 2026 (julio y noviembre de 2026)',
        de: 'AIReF, Haushaltsprognosen 2026 (Juli und November 2026)',
      },
      url: 'https://www.merca2.es/2026/07/16/airef-eleva-prevision-pib-2026-2418454/',
      chiffre: {
        fr: 'Croissance 2026 : 2,5 %, 2027 : 2,1 %. Dette 99,3 % du PIB en 2026 (juillet), déficit 2,6 % (juillet) puis 2,8 % (novembre). Déficit attendu vers 3 % en 2031, en partie par la hausse du coût de la dette.',
        en: 'Growth 2026: 2.5%, 2027: 2.1%. Debt 99.3% of GDP in 2026 (July), deficit 2.6% (July) then 2.8% (November). Deficit expected around 3% in 2031, partly due to rising debt costs.',
        es: 'Crecimiento 2026: 2,5 %; 2027: 2,1 %. Deuda del 99,3 % del PIB en 2026 (julio), déficit del 2,6 % (julio) y después del 2,8 % (noviembre). Déficit previsto en torno al 3 % en 2031, en parte por el mayor coste de la deuda.',
        de: 'Wachstum 2026: 2,5 %, 2027: 2,1 %. Schulden 2026 bei 99,3 % des BIP (Juli), Defizit 2,6 % (Juli), dann 2,8 % (November). Defizit 2031 um 3 % erwartet, teils wegen steigender Schuldenkosten.',
      },
      usage: {
        fr: 'Niveau de dette et déficit fin 2026 ; vraisemblance du tendanciel.',
        en: 'Debt level and deficit at end-2026; plausibility of the baseline.',
        es: 'Nivel de deuda y déficit a finales de 2026; verosimilitud del tendencial.',
        de: 'Schuldenstand und Defizit Ende 2026; Plausibilität des Basisszenarios.',
      },
    },
    {
      nom: {
        fr: 'Tesoro Público, coût et vie moyenne de la dette (janvier 2026)',
        en: 'Tesoro Público, cost and average life of debt (January 2026)',
        es: 'Tesoro Público, coste y vida media de la deuda (enero de 2026)',
        de: 'Tesoro Público, Kosten und durchschnittliche Laufzeit der Schulden (Januar 2026)',
      },
      url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/economia-comercio-empresa/paginas/2026/200126-bono-tesoro.aspx',
      chiffre: {
        fr: 'Coût moyen de l’encours : 2,32 % ; coût des émissions 2025 : 2,71 % (3,16 % en 2024) ; vie moyenne : 7,83 ans (7,93 fin novembre 2025).',
        en: 'Average cost of the stock: 2.32%; cost of 2025 issuance: 2.71% (3.16% in 2024); average life: 7.83 years (7.93 at end-November 2025).',
        es: 'Coste medio de la cartera: 2,32 %; coste de las emisiones de 2025: 2,71 % (3,16 % en 2024); vida media: 7,83 años (7,93 a finales de noviembre de 2025).',
        de: 'Durchschnittskosten des Bestands: 2,32 %; Kosten der Emissionen 2025: 2,71 % (3,16 % im Jahr 2024); durchschnittliche Laufzeit: 7,83 Jahre (7,93 Ende November 2025).',
      },
      usage: {
        fr: 'Taux de marché de référence et vitesse de refinancement de l’encours.',
        en: 'Reference market rate and speed at which the stock is refinanced.',
        es: 'Tipo de mercado de referencia y velocidad de refinanciación de la cartera.',
        de: 'Referenz-Marktzins und Geschwindigkeit der Refinanzierung des Bestands.',
      },
    },
    {
      nom: {
        fr: 'Eurostat (gov_10a_exp) et IGAE, dépenses par fonction 2024',
        en: 'Eurostat (gov_10a_exp) and IGAE, spending by function 2024',
        es: 'Eurostat (gov_10a_exp) e IGAE, gasto por funciones 2024',
        de: 'Eurostat (gov_10a_exp) und IGAE, Ausgaben nach Aufgabenbereichen 2024',
      },
      url: 'https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/AAPP_A/Funcional%202020-2024.pdf',
      chiffre: {
        fr: 'Dépense non financière : 725,0 Md€ (45,5 % du PIB). Protection sociale 18,7 %, santé 6,5 %, enseignement 4,1 % du PIB (Eurostat).',
        en: 'Non-financial spending: €725.0bn (45.5% of GDP). Social protection 18.7%, health 6.5%, education 4.1% of GDP (Eurostat).',
        es: 'Gasto no financiero: 725,0 mil M€ (45,5 % del PIB). Protección social 18,7 %, sanidad 6,5 %, educación 4,1 % del PIB (Eurostat).',
        de: 'Nichtfinanzielle Ausgaben: 725,0 Mrd. € (45,5 % des BIP). Soziale Sicherung 18,7 %, Gesundheit 6,5 %, Bildung 4,1 % des BIP (Eurostat).',
      },
      usage: {
        fr: 'Répartition par poste. Montants par poste reconstitués par l’application à partir de ces parts : ordres de grandeur.',
        en: 'Breakdown by function. Amounts per function reconstructed by the app from these shares: orders of magnitude.',
        es: 'Reparto por función. Importes por función reconstruidos por la aplicación a partir de estos porcentajes: órdenes de magnitud.',
        de: 'Aufteilung nach Bereichen. Beträge je Bereich von der Anwendung aus diesen Anteilen rekonstruiert: Größenordnungen.',
      },
    },
    {
      nom: {
        fr: 'Agencia Tributaria, Informe anual de recaudación 2025',
        en: 'Agencia Tributaria, Annual tax revenue report 2025',
        es: 'Agencia Tributaria, Informe anual de recaudación 2025',
        de: 'Agencia Tributaria, Jahresbericht über die Steuereinnahmen 2025',
      },
      url: 'https://sede.agenciatributaria.gob.es/Sede/estadisticas/recaudacion-tributaria/informe-anual/ejercicio-2025/resumen.html',
      chiffre: {
        fr: 'Recettes fiscales : 325,4 Md€ (+10,4 %). IRPF : 142,5 Md€ (+10,1 %). IVA : 90,5 Md€ en 2024.',
        en: 'Tax revenue: €325.4bn (+10.4%). Income tax (IRPF): €142.5bn (+10.1%). VAT (IVA): €90.5bn in 2024.',
        es: 'Ingresos tributarios: 325,4 mil M€ (+10,4 %). IRPF: 142,5 mil M€ (+10,1 %). IVA: 90,5 mil M€ en 2024.',
        de: 'Steuereinnahmen: 325,4 Mrd. € (+10,4 %). Einkommensteuer (IRPF): 142,5 Mrd. € (+10,1 %). Mehrwertsteuer (IVA): 90,5 Mrd. € im Jahr 2024.',
      },
      usage: {
        fr: 'Calage des rendements par point de l’IRPF et de l’IVA.',
        en: 'Calibration of per-point yields of income tax and VAT.',
        es: 'Calibración de los rendimientos por punto del IRPF y del IVA.',
        de: 'Kalibrierung der Erträge je Punkt von Einkommen- und Mehrwertsteuer.',
      },
    },
    {
      nom: {
        fr: 'Barème de l’IRPF 2026 (BOE), via Wolters Kluwer',
        en: '2026 IRPF schedule (BOE), via Wolters Kluwer',
        es: 'Tarifa del IRPF 2026 (BOE), vía Wolters Kluwer',
        de: 'IRPF-Tarif 2026 (BOE), über Wolters Kluwer',
      },
      url: 'https://www.wolterskluwer.com/es-es/expert-insights/tramos-retenciones-irpf-2026-novedades',
      chiffre: {
        fr: 'Seuils de la base générale : 12 450, 20 200, 35 200, 60 000 et 300 000 €. Taux combinés État + communauté de 19 à 47 % (Andalousie), de 45 % (Madrid) à 54 % (Communauté valencienne).',
        en: 'General-base thresholds: €12,450, €20,200, €35,200, €60,000 and €300,000. Combined central + regional rates from 19% to 47% (Andalusia); top rate from 45% (Madrid) to 54% (Valencian Community).',
        es: 'Umbrales de la base general: 12 450, 20 200, 35 200, 60 000 y 300 000 €. Tipos combinados Estado + comunidad del 19 al 47 % (Andalucía); máximo del 45 % (Madrid) al 54 % (Comunitat Valenciana).',
        de: 'Schwellen der allgemeinen Bemessungsgrundlage: 12 450, 20 200, 35 200, 60 000 und 300 000 €. Kombinierte Sätze Zentralstaat + Region von 19 bis 47 % (Andalusien); Spitzensatz von 45 % (Madrid) bis 54 % (Valencianische Gemeinschaft).',
      },
      usage: {
        fr: 'Curseurs « IRPF ». Rendements par point estimés par l’application.',
        en: '“IRPF” sliders. Per-point yields estimated by the app.',
        es: 'Controles «IRPF». Rendimientos por punto estimados por la aplicación.',
        de: 'Regler „IRPF“. Erträge je Punkt von der Anwendung geschätzt.',
      },
    },
    {
      nom: {
        fr: 'AIReF, Spending review : bénéfices fiscaux (2020)',
        en: 'AIReF, Spending review: tax benefits (2020)',
        es: 'AIReF, Spending review: beneficios fiscales (2020)',
        de: 'AIReF, Spending Review: Steuervergünstigungen (2020)',
      },
      url: 'https://www.funcas.es/descargar/227234/',
      chiffre: {
        fr: 'Environ 60 Md€ par an de bénéfices fiscaux, dont 17,8 Md€ pour les taux réduits d’IVA.',
        en: 'About €60bn a year of tax benefits, including €17.8bn for reduced VAT rates.',
        es: 'Unos 60 mil M€ al año de beneficios fiscales, de los que 17,8 mil M€ corresponden a los tipos reducidos de IVA.',
        de: 'Etwa 60 Mrd. € Steuervergünstigungen pro Jahr, davon 17,8 Mrd. € für ermäßigte Mehrwertsteuersätze.',
      },
      usage: {
        fr: 'Curseur « bénéfices fiscaux » et calage des taux réduits d’IVA.',
        en: '“Tax benefits” slider and calibration of reduced VAT rates.',
        es: 'Control «beneficios fiscales» y calibración de los tipos reducidos de IVA.',
        de: 'Regler „Steuervergünstigungen“ und Kalibrierung der ermäßigten Mehrwertsteuersätze.',
      },
    },
    {
      nom: {
        fr: 'Funcas, recettes fiscales 2024-2025',
        en: 'Funcas, tax revenue 2024-2025',
        es: 'Funcas, recaudación tributaria 2024-2025',
        de: 'Funcas, Steuereinnahmen 2024-2025',
      },
      url: 'https://www.funcas.es/descargar/227234/',
      chiffre: {
        fr: 'Impôt sur les sociétés : record de 45,6 Md€ en 2024.',
        en: 'Corporate income tax: record €45.6bn in 2024.',
        es: 'Impuesto sobre sociedades: récord de 45,6 mil M€ en 2024.',
        de: 'Körperschaftsteuer: Rekord von 45,6 Mrd. € im Jahr 2024.',
      },
      usage: { fr: 'Curseur « impôt sur les sociétés ».', en: '“Corporate tax” slider.', es: 'Control «impuesto sobre sociedades».', de: 'Regler „Körperschaftsteuer“.' },
    },
    {
      nom: {
        fr: 'Agencia Tributaria, résultats du contrôle 2025',
        en: 'Agencia Tributaria, 2025 audit results',
        es: 'Agencia Tributaria, resultados del control tributario 2025',
        de: 'Agencia Tributaria, Ergebnisse der Steuerprüfung 2025',
      },
      url: 'https://sede.agenciatributaria.gob.es/static_files/Sede/Actualidad/Notas_prensa/2026/NP_AEAT_Resultados_Control_2025.pdf',
      chiffre: {
        fr: '22,7 Md€ recouvrés grâce à la lutte contre la fraude en 2025 (+20,2 %).',
        en: '€22.7bn recovered through the fight against fraud in 2025 (+20.2%).',
        es: '22,7 mil M€ recaudados por la lucha contra el fraude en 2025 (+20,2 %).',
        de: '22,7 Mrd. € durch Betrugsbekämpfung im Jahr 2025 eingenommen (+20,2 %).',
      },
      usage: { fr: 'Repère du curseur « fraude recouvrée ».', en: 'Reference for the “fraud recovered” slider.', es: 'Referencia del control «fraude recuperado».', de: 'Referenz für den Regler „eingetriebener Steuerbetrug“.' },
    },
    {
      nom: {
        fr: 'AIReF, évaluation de la réforme des retraites (mars 2025)',
        en: 'AIReF, assessment of the pension reform (March 2025)',
        es: 'AIReF, evaluación de la reforma de las pensiones (marzo de 2025)',
        de: 'AIReF, Bewertung der Rentenreform (März 2025)',
      },
      url: 'https://www.articulo14.es/economia/airef-eleva-el-coste-en-pensiones-hasta-el-34-del-pib-hasta-2050-20250331.html',
      chiffre: {
        fr: 'Dépense de pensions : de 12,7 % du PIB en 2022 à 16,1 % en 2050 (+3,4 points). La règle de dépense est respectée, sans garantir la soutenabilité.',
        en: 'Pension spending: from 12.7% of GDP in 2022 to 16.1% in 2050 (+3.4 pp). The expenditure rule is met, without guaranteeing sustainability.',
        es: 'Gasto en pensiones: del 12,7 % del PIB en 2022 al 16,1 % en 2050 (+3,4 puntos). Se cumple la regla de gasto, sin garantizar la sostenibilidad.',
        de: 'Rentenausgaben: von 12,7 % des BIP im Jahr 2022 auf 16,1 % im Jahr 2050 (+3,4 Pp.). Die Ausgabenregel wird eingehalten, ohne die Tragfähigkeit zu sichern.',
      },
      usage: { fr: 'Curseur « dérive de la dépense de pensions ».', en: '“Drift in pension spending” slider.', es: 'Control «deriva del gasto en pensiones».', de: 'Regler „Entwicklung der Rentenausgaben“.' },
    },
    {
      nom: {
        fr: 'Ivie, dépense de pensions 2026, via Infobae',
        en: 'Ivie, pension spending 2026, via Infobae',
        es: 'Ivie, gasto en pensiones 2026, vía Infobae',
        de: 'Ivie, Rentenausgaben 2026, über Infobae',
      },
      url: 'https://www.infobae.com/espana/2026/06/09/espana-necesitara-mas-de-230000-millones-de-euros-para-pagar-las-pensiones-publicas-en-2026-un-13-del-pib-segun-kpmg/',
      chiffre: {
        fr: 'Environ 229,5 Md€ de pensions en 2026, soit près de 13 % du PIB ; revalorisation de 2,7 % ; nómina contributive de ~14,5 Md€ par mois (14 versements).',
        en: 'About €229.5bn of pensions in 2026, nearly 13% of GDP; 2.7% uprating; contributory payroll of ~€14.5bn a month (14 payments).',
        es: 'Unos 229,5 mil M€ en pensiones en 2026, casi el 13 % del PIB; revalorización del 2,7 %; nómina contributiva de ~14,5 mil M€ al mes (14 pagas).',
        de: 'Rund 229,5 Mrd. € Renten im Jahr 2026, fast 13 % des BIP; Anpassung um 2,7 %; beitragsfinanzierte Rentenzahlungen von ~14,5 Mrd. € pro Monat (14 Zahlungen).',
      },
      usage: {
        fr: 'Niveau 2026 des pensions et coût d’un point de sous-indexation.',
        en: '2026 pension level and cost of one point of under-indexation.',
        es: 'Nivel de las pensiones en 2026 y coste de un punto de subindexación.',
        de: 'Rentenniveau 2026 und Kosten eines Punkts Unterindexierung.',
      },
    },
    {
      nom: {
        fr: 'Seguridad Social, mécanisme d’équité intergénérationnelle (MEI)',
        en: 'Seguridad Social, intergenerational equity mechanism (MEI)',
        es: 'Seguridad Social, Mecanismo de Equidad Intergeneracional (MEI)',
        de: 'Seguridad Social, Mechanismus der Generationengerechtigkeit (MEI)',
      },
      url: 'https://www.elindependiente.com/economia/2026/05/15/seguridad-social-recaudara-mas-de-3150-millones-adicionales-hasta-2030-por-las-nuevas-cotizaciones/amp/',
      chiffre: {
        fr: 'Cotisation de 0,9 % en 2026 (5,3 Md€ attendus), 1 % en 2027, jusqu’à 1,2 % en 2029.',
        en: 'Contribution of 0.9% in 2026 (€5.3bn expected), 1% in 2027, up to 1.2% in 2029.',
        es: 'Cotización del 0,9 % en 2026 (5,3 mil M€ previstos), del 1 % en 2027 y hasta el 1,2 % en 2029.',
        de: 'Beitrag von 0,9 % im Jahr 2026 (5,3 Mrd. € erwartet), 1 % im Jahr 2027, bis zu 1,2 % im Jahr 2029.',
      },
      usage: {
        fr: 'Recettes programmées du tendanciel ; rendement d’un point de cotisation (5,9 Md€).',
        en: 'Scheduled revenue in the baseline; yield of one contribution point (€5.9bn).',
        es: 'Ingresos programados del tendencial; rendimiento de un punto de cotización (5,9 mil M€).',
        de: 'Geplante Einnahmen im Basisszenario; Ertrag eines Beitragspunkts (5,9 Mrd. €).',
      },
    },
    {
      nom: {
        fr: 'Commission européenne, Ageing Report 2024, via CaixaBank Research',
        en: 'European Commission, 2024 Ageing Report, via CaixaBank Research',
        es: 'Comisión Europea, Ageing Report 2024, vía CaixaBank Research',
        de: 'Europäische Kommission, Ageing Report 2024, über CaixaBank Research',
      },
      url: 'https://www.caixabankresearch.com/en/economics-markets/labour-market-demographics/impact-ageing-public-finances-major-challenge-spain',
      chiffre: {
        fr: 'Dépense de soins de longue durée : +0,6 point de PIB d’ici 2050 en Espagne. Dépenses liées au vieillissement : 20,3 % du PIB en 2022, 25,5 % en 2050.',
        en: 'Long-term care spending: +0.6 pp of GDP by 2050 in Spain. Ageing-related spending: 20.3% of GDP in 2022, 25.5% in 2050.',
        es: 'Gasto en cuidados de larga duración: +0,6 puntos del PIB de aquí a 2050 en España. Gasto ligado al envejecimiento: 20,3 % del PIB en 2022 y 25,5 % en 2050.',
        de: 'Ausgaben für Langzeitpflege: +0,6 Pp. des BIP bis 2050 in Spanien. Alterungsbedingte Ausgaben: 20,3 % des BIP im Jahr 2022, 25,5 % im Jahr 2050.',
      },
      usage: { fr: 'Curseur « dépendance ».', en: '“Long-term care” slider.', es: 'Control «dependencia».', de: 'Regler „Pflege“.' },
    },
    {
      nom: {
        fr: 'INE, Encuesta de Población Activa, T3 2026',
        en: 'INE, Labour Force Survey (EPA), Q3 2026',
        es: 'INE, Encuesta de Población Activa, T3 2026',
        de: 'INE, Arbeitskräfteerhebung (EPA), 3. Quartal 2026',
      },
      url: 'https://www.que.es/2026/10/28/epa-tercer-trimestre-2026-paro-2/',
      chiffre: {
        fr: 'Taux de chômage : 10,18 % ; 2,59 millions de chômeurs ; plus de 25 millions d’actifs.',
        en: 'Unemployment rate: 10.18%; 2.59 million unemployed; over 25 million in the labour force.',
        es: 'Tasa de paro: 10,18 %; 2,59 millones de parados; más de 25 millones de activos.',
        de: 'Arbeitslosenquote: 10,18 %; 2,59 Millionen Arbeitslose; über 25 Millionen Erwerbspersonen.',
      },
      usage: { fr: 'Curseur « taux de chômage » (référence 10,2 %).', en: '“Unemployment rate” slider (reference 10.2%).', es: 'Control «tasa de paro» (referencia 10,2 %).', de: 'Regler „Arbeitslosenquote“ (Referenz 10,2 %).' },
    },
    {
      nom: {
        fr: 'Real Decreto 126/2026, salaire minimum interprofessionnel',
        en: 'Royal Decree 126/2026, statutory minimum wage',
        es: 'Real Decreto 126/2026, salario mínimo interprofesional',
        de: 'Königlicher Erlass 126/2026, gesetzlicher Mindestlohn',
      },
      url: 'https://www.ineaf.es/tribuna/subida-del-smi-en-2026/',
      chiffre: {
        fr: 'SMI 2026 : 1 221 € bruts par mois sur 14 versements (17 094 € par an), +3,1 %. Exonéré d’IRPF.',
        en: '2026 minimum wage: €1,221 gross a month over 14 payments (€17,094 a year), +3.1%. Exempt from income tax.',
        es: 'SMI 2026: 1221 € brutos al mes en 14 pagas (17 094 € al año), +3,1 %. Exento de IRPF.',
        de: 'Mindestlohn 2026: 1 221 € brutto pro Monat bei 14 Zahlungen (17 094 € pro Jahr), +3,1 %. Einkommensteuerfrei.',
      },
      usage: {
        fr: 'Curseurs « SMI ». Rendements par point estimés par l’application.',
        en: '“Minimum wage” sliders. Per-point yields estimated by the app.',
        es: 'Controles «SMI». Rendimientos por punto estimados por la aplicación.',
        de: 'Regler „Mindestlohn“. Erträge je Punkt von der Anwendung geschätzt.',
      },
    },
    {
      nom: {
        fr: 'Ministerio de Inclusión, Ingreso mínimo vital (2025)',
        en: 'Ministry of Inclusion, minimum living income (IMV, 2025)',
        es: 'Ministerio de Inclusión, Ingreso Mínimo Vital (2025)',
        de: 'Inklusionsministerium, Mindesteinkommen (IMV, 2025)',
      },
      url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2025/050925-ingreso-minimo-vital-agosto.aspx',
      chiffre: {
        fr: 'Environ 765 000 foyers et 2,3 millions de personnes ; 517 € par foyer et par mois ; 426 M€ par mois.',
        en: 'About 765,000 households and 2.3 million people; €517 per household per month; €426m a month.',
        es: 'Unos 765 000 hogares y 2,3 millones de personas; 517 € por hogar y mes; 426 M€ al mes.',
        de: 'Rund 765 000 Haushalte und 2,3 Millionen Menschen; 517 € je Haushalt und Monat; 426 Mio. € pro Monat.',
      },
      usage: {
        fr: 'Aides absorbées par le revenu universel. Autres aides : ordres de grandeur de l’application.',
        en: 'Benefits absorbed by the basic income. Other benefits: the app’s orders of magnitude.',
        es: 'Ayudas absorbidas por la renta básica. Otras ayudas: órdenes de magnitud de la aplicación.',
        de: 'Vom Grundeinkommen ersetzte Leistungen. Andere Leistungen: Größenordnungen der Anwendung.',
      },
    },
    {
      nom: {
        fr: 'INE, Estadística continua de población, 1er janvier 2026',
        en: 'INE, Continuous Population Statistics, 1 January 2026',
        es: 'INE, Estadística Continua de Población, 1 de enero de 2026',
        de: 'INE, Laufende Bevölkerungsstatistik, 1. Januar 2026',
      },
      url: 'https://ine.es/dyngs/Prensa/ECP4T25.htm',
      chiffre: {
        fr: '49,6 millions d’habitants, dont 7,2 millions d’étrangers.',
        en: '49.6 million inhabitants, including 7.2 million foreign nationals.',
        es: '49,6 millones de habitantes, de los que 7,2 millones son extranjeros.',
        de: '49,6 Millionen Einwohner, davon 7,2 Millionen ausländische Staatsangehörige.',
      },
      usage: { fr: 'Coût du revenu universel.', en: 'Cost of the basic income.', es: 'Coste de la renta básica.', de: 'Kosten des Grundeinkommens.' },
    },
    {
      nom: {
        fr: 'OTAN / La Moncloa, dépense de défense',
        en: 'NATO / La Moncloa, defence spending',
        es: 'OTAN / La Moncloa, gasto en defensa',
        de: 'NATO / La Moncloa, Verteidigungsausgaben',
      },
      url: 'https://www.lamoncloa.gob.es/presidente/actividades/paginas/2025/250625-cumbre-otan.aspx',
      chiffre: {
        fr: 'Dépense au sens de l’OTAN : 22,7 Md€ en 2024, environ 33,1 Md€ en 2025 (2 % du PIB). Engagement espagnol plafonné à 2,1 % du PIB, contre 3,5 % + 1,5 % pour les autres alliés.',
        en: 'Spending on NATO’s definition: €22.7bn in 2024, about €33.1bn in 2025 (2% of GDP). Spain’s commitment capped at 2.1% of GDP, against 3.5% + 1.5% for the other allies.',
        es: 'Gasto según la OTAN: 22,7 mil M€ en 2024 y unos 33,1 mil M€ en 2025 (2 % del PIB). Compromiso español limitado al 2,1 % del PIB, frente al 3,5 % + 1,5 % de los demás aliados.',
        de: 'Ausgaben nach NATO-Definition: 22,7 Mrd. € im Jahr 2024, etwa 33,1 Mrd. € im Jahr 2025 (2 % des BIP). Spaniens Zusage auf 2,1 % des BIP begrenzt, gegenüber 3,5 % + 1,5 % bei den übrigen Verbündeten.',
      },
      usage: {
        fr: 'Repère du poste « défense » (périmètre OTAN plus large que la fonction défense d’Eurostat).',
        en: 'Reference for the “defence” function (NATO scope wider than Eurostat’s defence function).',
        es: 'Referencia de la función «defensa» (perímetro OTAN más amplio que la función de defensa de Eurostat).',
        de: 'Referenz für den Bereich „Verteidigung“ (NATO-Abgrenzung weiter als die Eurostat-Verteidigungsfunktion).',
      },
    },
    {
      nom: 'INE, Proyecciones de población 2024-2074',
      url: 'https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176953&menu=ultiDatos&idp=1254735572981',
      chiffre: {
        fr: '49,6 millions d’habitants en 2026 ; croissance d’environ 0,6 % par an d’ici 2036, portée par l’immigration.',
        en: '49.6 million inhabitants in 2026; growth of about 0.6% a year to 2036, driven by immigration.',
        es: '49,6 millones de habitantes en 2026; crecimiento de en torno al 0,6 % anual hasta 2036, impulsado por la inmigración.',
        de: '49,6 Millionen Einwohner 2026; Wachstum von etwa 0,6 % pro Jahr bis 2036, getragen von Zuwanderung.',
      },
      usage: { fr: 'Indicateurs par habitant (dette, intérêts, dépenses par poste), sans effet sur la trajectoire.', en: 'Per-person indicators (debt, interest, spending by function), with no effect on the trajectory.', es: 'Indicadores por habitante (deuda, intereses, gasto por función), sin efecto en la trayectoria.', de: 'Pro-Kopf-Kennzahlen (Schulden, Zinsen, Ausgaben nach Aufgaben), ohne Einfluss auf den Pfad.' },
    },
  ];
});

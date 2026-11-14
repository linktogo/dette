// Sources du modèle espagnol (consultées en novembre 2026). Seules celles qui
// alimentent le modèle figurent ici. Les chiffres marqués « estimation de
// l'application » sont des ordres de grandeur, à vérifier dans les sources primaires.
const SOURCES = {
  bde2025: {
    nom: 'Banco de España, dette des administrations publiques, décembre 2025',
    chiffre: 'Dette PDE : 1 698 Md€ fin 2025, soit 100,8 % du PIB (−0,9 point sur un an). Administration centrale 1 549,1 Md€, communautés autonomes 341,9 Md€, Sécurité sociale 136,2 Md€.',
    usage: 'Point de départ de la projection.',
    url: 'https://www.bde.es/f/webbe/GAP/Secciones/SalaPrensa/NotasInformativas/26/presbe2026-14.pdf',
  },
  igae2025: {
    nom: 'IGAE / Ministerio de Hacienda, déficit des administrations publiques 2025',
    chiffre: 'Déficit de 40,3 Md€ (2,39 % du PIB) DANA comprise, notifié à Eurostat à 2,4 % ; 36,8 Md€ (2,18 %) hors DANA. Intérêts : 40,3 Md€ (2,39 % du PIB). Recettes 42,9 % et dépenses 45,3 % du PIB.',
    usage: 'Recettes et intérêts de départ ; ordre de grandeur des chocs (DANA : 3,6 Md€ en 2025).',
    url: 'https://www.caixabankresearch.com/es/publicaciones/notas-breves-actualidad-economica-y-financiera/espana/deficit-publico-se-situo-2025',
  },
  ine2025: {
    nom: 'INE, Contabilidad Nacional Anual (septembre 2026)',
    chiffre: 'PIB 2025 : 1 690,0 Md€ courants ; croissance en volume révisée à 2,6 %.',
    usage: 'Contrôle du PIB de départ.',
    url: 'https://ine.es/dyngs/Prensa/en/CNA2025.html',
  },
  airef2026: {
    nom: 'AIReF, prévisions budgétaires 2026 (juillet et novembre 2026)',
    chiffre: 'Croissance 2026 : 2,5 %, 2027 : 2,1 %. Dette 99,3 % du PIB en 2026 (juillet), déficit 2,6 % (juillet) puis 2,8 % (novembre). Déficit attendu vers 3 % en 2031, en partie par la hausse du coût de la dette.',
    usage: 'Niveau de dette et déficit fin 2026 ; vraisemblance du tendanciel.',
    url: 'https://www.merca2.es/2026/07/16/airef-eleva-prevision-pib-2026-2418454/',
  },
  tesoro: {
    nom: 'Tesoro Público, coût et vie moyenne de la dette (janvier 2026)',
    chiffre: 'Coût moyen de l’encours : 2,32 % ; coût des émissions 2025 : 2,71 % (3,16 % en 2024) ; vie moyenne : 7,83 ans (7,93 fin novembre 2025).',
    usage: 'Taux de marché de référence et vitesse de refinancement de l’encours.',
    url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/economia-comercio-empresa/paginas/2026/200126-bono-tesoro.aspx',
  },
  cofog: {
    nom: 'Eurostat (gov_10a_exp) et IGAE, dépenses par fonction 2024',
    chiffre: 'Dépense non financière : 725,0 Md€ (45,5 % du PIB). Protection sociale 18,7 %, santé 6,5 %, enseignement 4,1 % du PIB (Eurostat).',
    usage: 'Répartition par poste. Montants par poste reconstitués par l’application à partir de ces parts : ordres de grandeur.',
    url: 'https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/AAPP_A/Funcional%202020-2024.pdf',
  },
  aeat2025: {
    nom: 'Agencia Tributaria, Informe anual de recaudación 2025',
    chiffre: 'Recettes fiscales : 325,4 Md€ (+10,4 %). IRPF : 142,5 Md€ (+10,1 %). IVA : 90,5 Md€ en 2024.',
    usage: 'Calage des rendements par point de l’IRPF et de l’IVA.',
    url: 'https://sede.agenciatributaria.gob.es/Sede/estadisticas/recaudacion-tributaria/informe-anual/ejercicio-2025/resumen.html',
  },
  irpf2026: {
    nom: 'Barème de l’IRPF 2026 (BOE), via Wolters Kluwer',
    chiffre: 'Seuils de la base générale : 12 450, 20 200, 35 200, 60 000 et 300 000 €. Taux combinés État + communauté de 19 à 47 % (Andalousie), de 45 % (Madrid) à 54 % (Communauté valencienne).',
    usage: 'Curseurs « IRPF ». Rendements par point estimés par l’application.',
    url: 'https://www.wolterskluwer.com/es-es/expert-insights/tramos-retenciones-irpf-2026-novedades',
  },
  airefBeneficios: {
    nom: 'AIReF, Spending review : bénéfices fiscaux (2020)',
    chiffre: 'Environ 60 Md€ par an de bénéfices fiscaux, dont 17,8 Md€ pour les taux réduits d’IVA.',
    usage: 'Curseur « bénéfices fiscaux » et calage des taux réduits d’IVA.',
    url: 'https://www.funcas.es/descargar/227234/',
  },
  funcas: {
    nom: 'Funcas, recettes fiscales 2024-2025',
    chiffre: 'Impôt sur les sociétés : record de 45,6 Md€ en 2024.',
    usage: 'Curseur « impôt sur les sociétés ».',
    url: 'https://www.funcas.es/descargar/227234/',
  },
  fraude: {
    nom: 'Agencia Tributaria, résultats du contrôle 2025',
    chiffre: '22,7 Md€ recouvrés grâce à la lutte contre la fraude en 2025 (+20,2 %).',
    usage: 'Repère du curseur « fraude recouvrée ».',
    url: 'https://sede.agenciatributaria.gob.es/static_files/Sede/Actualidad/Notas_prensa/2026/NP_AEAT_Resultados_Control_2025.pdf',
  },
  airefPensiones: {
    nom: 'AIReF, évaluation de la réforme des retraites (mars 2025)',
    chiffre: 'Dépense de pensions : de 12,7 % du PIB en 2022 à 16,1 % en 2050 (+3,4 points). La règle de dépense est respectée, sans garantir la soutenabilité.',
    usage: 'Curseur « dérive de la dépense de pensions ».',
    url: 'https://www.articulo14.es/economia/airef-eleva-el-coste-en-pensiones-hasta-el-34-del-pib-hasta-2050-20250331.html',
  },
  ivie: {
    nom: 'Ivie, dépense de pensions 2026, via Infobae',
    chiffre: 'Environ 229,5 Md€ de pensions en 2026, soit près de 13 % du PIB ; revalorisation de 2,7 % ; nómina contributive de ~14,5 Md€ par mois (14 versements).',
    usage: 'Niveau 2026 des pensions et coût d’un point de sous-indexation.',
    url: 'https://www.infobae.com/espana/2026/06/09/espana-necesitara-mas-de-230000-millones-de-euros-para-pagar-las-pensiones-publicas-en-2026-un-13-del-pib-segun-kpmg/',
  },
  mei: {
    nom: 'Seguridad Social, mécanisme d’équité intergénérationnelle (MEI)',
    chiffre: 'Cotisation de 0,9 % en 2026 (5,3 Md€ attendus), 1 % en 2027, jusqu’à 1,2 % en 2029.',
    usage: 'Recettes programmées du tendanciel ; rendement d’un point de cotisation (5,9 Md€).',
    url: 'https://www.elindependiente.com/economia/2026/05/15/seguridad-social-recaudara-mas-de-3150-millones-adicionales-hasta-2030-por-las-nuevas-cotizaciones/amp/',
  },
  ageing2024: {
    nom: 'Commission européenne, Ageing Report 2024, via CaixaBank Research',
    chiffre: 'Dépense de soins de longue durée : +0,6 point de PIB d’ici 2050 en Espagne. Dépenses liées au vieillissement : 20,3 % du PIB en 2022, 25,5 % en 2050.',
    usage: 'Curseur « dépendance ».',
    url: 'https://www.caixabankresearch.com/en/economics-markets/labour-market-demographics/impact-ageing-public-finances-major-challenge-spain',
  },
  epa: {
    nom: 'INE, Encuesta de Población Activa, T3 2026',
    chiffre: 'Taux de chômage : 10,18 % ; 2,59 millions de chômeurs ; plus de 25 millions d’actifs.',
    usage: 'Curseur « taux de chômage » (référence 10,2 %).',
    url: 'https://www.que.es/2026/10/28/epa-tercer-trimestre-2026-paro-2/',
  },
  smi: {
    nom: 'Real Decreto 126/2026, salaire minimum interprofessionnel',
    chiffre: 'SMI 2026 : 1 221 € bruts par mois sur 14 versements (17 094 € par an), +3,1 %. Exonéré d’IRPF.',
    usage: 'Curseurs « SMI ». Rendements par point estimés par l’application.',
    url: 'https://www.ineaf.es/tribuna/subida-del-smi-en-2026/',
  },
  imv: {
    nom: 'Ministerio de Inclusión, Ingreso mínimo vital (2025)',
    chiffre: 'Environ 765 000 foyers et 2,3 millions de personnes ; 517 € par foyer et par mois ; 426 M€ par mois.',
    usage: 'Aides absorbées par le revenu universel. Autres aides : ordres de grandeur de l’application.',
    url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2025/050925-ingreso-minimo-vital-agosto.aspx',
  },
  population: {
    nom: 'INE, Estadística continua de población, 1er janvier 2026',
    chiffre: '49,6 millions d’habitants, dont 7,2 millions d’étrangers.',
    usage: 'Coût du revenu universel.',
    url: 'https://ine.es/dyngs/Prensa/ECP4T25.htm',
  },
  otan: {
    nom: 'OTAN / La Moncloa, dépense de défense',
    chiffre: 'Dépense au sens de l’OTAN : 22,7 Md€ en 2024, environ 33,1 Md€ en 2025 (2 % du PIB). Engagement espagnol plafonné à 2,1 % du PIB, contre 3,5 % + 1,5 % pour les autres alliés.',
    usage: 'Repère du poste « défense » (périmètre OTAN plus large que la fonction défense d’Eurostat).',
    url: 'https://www.lamoncloa.gob.es/presidente/actividades/paginas/2025/250625-cumbre-otan.aspx',
  },
};

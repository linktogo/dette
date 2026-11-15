// Sources du modèle italien (consultées en novembre 2026).
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.SOURCES = fabrique();
})(globalThis, function () {
  const usage = (fr, en, es, de) => ({ fr, en, es, de });
  return [
    {
      nom: { fr: 'Istat, notification à l’UE d’octobre 2026, via Teleborsa', en: 'Istat, October 2026 notification to the EU, via Teleborsa', es: 'Istat, notificación a la UE de octubre de 2026, vía Teleborsa', de: 'Istat, Meldung an die EU vom Oktober 2026, über Teleborsa' },
      url: 'https://www.teleborsa.it/DettaglioNews/97_2026-10-21_TLB/Istat-notifica-Ue-nel-2025-deficit-al-31-del-Pil-debito-al-1367-25-punti.html',
      chiffre: {
        fr: 'Déficit de 3,1 % du PIB en 2025 ; dette de 136,7 % du PIB, en hausse de 2,5 points sur un an.',
        en: 'Deficit of 3.1% of GDP in 2025; debt of 136.7% of GDP, up 2.5 points on the year.',
        es: 'Déficit del 3,1 % del PIB en 2025; deuda del 136,7 % del PIB, 2,5 puntos más que un año antes.',
        de: 'Defizit von 3,1 % des BIP im Jahr 2025; Schulden von 136,7 % des BIP, 2,5 Punkte mehr als im Vorjahr.',
      },
      usage: usage('Point de départ de la projection.', 'Starting point of the projection.', 'Punto de partida de la proyección.', 'Ausgangspunkt der Projektion.'),
    },
    {
      nom: { fr: 'Istat, révision de septembre 2026, via AGI', en: 'Istat, September 2026 revision, via AGI', es: 'Istat, revisión de septiembre de 2026, vía AGI', de: 'Istat, Revision vom September 2026, über AGI' },
      url: 'https://www.agi.it/economia/news/2026-09-22/deficit-pil-italia-procedura-ue-39186211/',
      chiffre: {
        fr: 'Déficit de 69 736 M€ (3,1 % du PIB) ; excédent primaire de 0,8 % ; l’Italie reste en procédure pour déficit excessif, sortie visée en 2027.',
        en: 'Deficit of €69,736m (3.1% of GDP); primary surplus of 0.8%; Italy remains under the excessive deficit procedure, aiming to exit in 2027.',
        es: 'Déficit de 69 736 M€ (3,1 % del PIB); superávit primario del 0,8 %; Italia sigue en procedimiento por déficit excesivo y aspira a salir en 2027.',
        de: 'Defizit von 69 736 Mio. € (3,1 % des BIP); Primärüberschuss von 0,8 %; Italien bleibt im Defizitverfahren, Ausstieg 2027 angestrebt.',
      },
      usage: usage('PIB et intérêts de départ.', 'Starting GDP and interest.', 'PIB e intereses de partida.', 'BIP und Zinsen zu Beginn.'),
    },
    {
      nom: { fr: 'Istat, pression fiscale 2025, via ItaliaOggi', en: 'Istat, 2025 tax burden, via ItaliaOggi', es: 'Istat, presión fiscal de 2025, vía ItaliaOggi', de: 'Istat, Abgabenquote 2025, über ItaliaOggi' },
      url: 'https://www.italiaoggi.it/economia-e-politica/deficit-pil-al-3-1-litalia-non-esce-dalla-procedura-di-infrazione-per-deficit-eccessivo-m2ga6ysc',
      chiffre: { fr: 'Pression fiscale de 42,9 % du PIB en 2025 (+0,7 point) ; dépense d’intérêts en hausse d’environ 2 %.', en: 'Tax burden of 42.9% of GDP in 2025 (+0.7 points); interest spending up about 2%.', es: 'Presión fiscal del 42,9 % del PIB en 2025 (+0,7 puntos); gasto en intereses un 2 % más alto.', de: 'Abgabenquote von 42,9 % des BIP im Jahr 2025 (+0,7 Punkte); Zinsausgaben um etwa 2 % höher.' },
      usage: usage('Taux de recettes (estimé).', 'Revenue ratio (estimated).', 'Ratio de ingresos (estimada).', 'Einnahmenquote (geschätzt).'),
    },
    {
      nom: { fr: 'Teleborsa, vie moyenne des titres d’État (juin 2026) ; Trésor, coût des émissions', en: 'Teleborsa, average life of government securities (June 2026); Treasury, issuance cost', es: 'Teleborsa, vida media de los títulos del Estado (junio de 2026); Tesoro, coste de las emisiones', de: 'Teleborsa, durchschnittliche Laufzeit der Staatspapiere (Juni 2026); Schatzamt, Emissionskosten' },
      url: 'https://www.teleborsa.it/News/2026/06/05/titoli-di-stato-italiani-vita-media-a-6-96-anni-btp-al-71percent-del-totale-in-circolazione-95.html',
      chiffre: { fr: 'Vie moyenne de 6,92 ans fin 2025 ; coût moyen à l’émission de 2,75 % en 2025 et 2,94 % de janvier à août 2026.', en: 'Average life of 6.92 years at end-2025; average issuance cost of 2.75% in 2025 and 2.94% from January to August 2026.', es: 'Vida media de 6,92 años a finales de 2025; coste medio de emisión del 2,75 % en 2025 y del 2,94 % de enero a agosto de 2026.', de: 'Durchschnittliche Laufzeit von 6,92 Jahren Ende 2025; durchschnittliche Emissionskosten von 2,75 % im Jahr 2025 und 2,94 % von Januar bis August 2026.' },
      usage: usage('Taux de marché et vitesse de refinancement.', 'Market rate and refinancing speed.', 'Tipo de mercado y velocidad de refinanciación.', 'Marktzins und Refinanzierungsgeschwindigkeit.'),
    },
    {
      nom: { fr: 'Diritto.it, IRPEF 2026 (loi 199/2025)', en: 'Diritto.it, 2026 IRPEF (Law 199/2025)', es: 'Diritto.it, IRPEF 2026 (Ley 199/2025)', de: 'Diritto.it, IRPEF 2026 (Gesetz 199/2025)' },
      url: 'https://www.diritto.it/irpef-2026-aliquote-detrazioni-riduzioni-imposta/',
      chiffre: { fr: '23 % jusqu’à 28 000 €, 33 % jusqu’à 50 000 € (contre 35 %), 43 % au-delà ; coût d’environ 2,8 Md€ par an.', en: '23% up to €28,000, 33% up to €50,000 (down from 35%), 43% above; cost of about €2.8bn a year.', es: '23 % hasta 28 000 €, 33 % hasta 50 000 € (antes 35 %), 43 % por encima; coste de unos 2,8 mil M€ al año.', de: '23 % bis 28 000 €, 33 % bis 50 000 € (zuvor 35 %), darüber 43 %; Kosten von etwa 2,8 Mrd. € pro Jahr.' },
      usage: usage('Groupe « impôt sur le revenu ».', '“Income tax” group.', 'Grupo «impuesto sobre la renta».', 'Gruppe „Einkommensteuer“.'),
    },
    {
      nom: { fr: 'Istat, chômage de septembre 2026, via ItaliaOggi', en: 'Istat, unemployment in September 2026, via ItaliaOggi', es: 'Istat, paro de septiembre de 2026, vía ItaliaOggi', de: 'Istat, Arbeitslosigkeit im September 2026, über ItaliaOggi' },
      url: 'https://www.italiaoggi.it/economia-e-politica/listat-occupazione-stabile-a-settembre-2026-tasso-al-63-disoccupazione-in-lieve-aumento-6-3-moj8ln99',
      chiffre: { fr: 'Taux de chômage de 6,3 % (5,9 % un an plus tôt) ; chômage des jeunes de 19,9 %.', en: 'Unemployment rate of 6.3% (5.9% a year earlier); youth unemployment of 19.9%.', es: 'Tasa de paro del 6,3 % (5,9 % un año antes); paro juvenil del 19,9 %.', de: 'Arbeitslosenquote von 6,3 % (5,9 % ein Jahr zuvor); Jugendarbeitslosigkeit von 19,9 %.' },
      usage: usage('Curseur « taux de chômage ».', '“Unemployment rate” slider.', 'Control «tasa de paro».', 'Regler „Arbeitslosenquote“.'),
    },
  ];
});

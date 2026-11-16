// Loi de finances 2027 du gouvernement italien, traduite avec les curseurs du
// simulateur (sources consultées le 16 novembre 2026). Les propositions de
// l'opposition ne sont pas chiffrées dans les sources : elles sont citées dans la fiche.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.PARTIS = fabrique();
})(globalThis, function () {
  const liste = [
    {
      id: 'governo',
      p: { nouvellesDepenses: 13, montee: 1 },
      sources: [
        { nom: 'AGI, 15 octobre 2026', url: 'https://www.agi.it/economia/news/2026-10-15/manovra-2027-cifre-39542401/' },
        { nom: 'Sky TG24, texte adopté en Conseil des ministres', url: 'https://tg24.sky.it/politica/2026/10/29/manovra-2027-misure-cosa-sapere-novita' },
        { nom: 'Il Sole 24 Ore, Banque d’Italie et UPB', url: 'https://www.ilsole24ore.com/art/manovra-2027-bankitalia-tasse-inattese-aumentano-incertezza-peso-investimenti-AJVMZEEC' },
        { nom: 'Sky TG24, opposition', url: 'https://tg24.sky.it/economia/2026/11/09/manovra-2027-camera-modifiche' },
      ],
    },
  ];

  const textes = {
    fr: {
      titre: 'Budget du gouvernement',
      mesures: 'Mesures reprises',
      nonModelise: 'Non repris dans le simulateur',
      sources: 'Sources',
      avertissement: 'Loi de finances 2027 traduite avec les curseurs du simulateur. Les mesures s’ajoutent au tendanciel du simulateur, en euros de 2026. L’effet sur la croissance n’est pas modélisé. L’opposition (PD, M5S, AVS) n’a pas publié de contre-budget chiffré. Après une modification d’un curseur, la fiche disparaît.',
      governo: {
        nom: 'Gouvernement',
        titre: 'Gouvernement Meloni (FdI, Lega, FI)',
        date: 'Projet de loi de finances 2027, adopté en Conseil des ministres le 28 octobre 2026',
        mesures: [
          'Environ 26 Md€ de mesures en 2027, dont la baisse de l’IRPEF à 33 % étendue jusqu’à 55 000 € (1,45 Md€ selon l’UPB). Effet net sur le déficit d’environ 13 Md€ selon le document budgétaire → 13 Md€ de dépenses nouvelles dès 2027.',
          'Financement : environ 12 Md€ de flexibilité européenne (clauses dérogatoires pour la défense) et 5,5 Md€ demandés aux banques et assurances. Compris dans l’effet net.',
        ],
        nonModelise: [
          'La reconduction des mesures temporaires demandera 8,8 Md€ de financements nouveaux en 2027 selon l’UPB : non reprise.',
          'Opposition : salaire minimum de 9 à 10 € de l’heure, plus d’argent pour la santé (PD, M5S), impôt sur les patrimoines de plus de 5 M€ (AVS) : pas de chiffrage.',
        ],
        avis: 'Le déficit monterait à 3,4 % du PIB en 2027. La Banque d’Italie juge que les impôts inattendus sur le secteur financier accroissent l’incertitude ; l’UPB relève que la baisse de l’IRPEF profite à 89 % des cadres et 1 % des ouvriers.',
      },
    },
    en: {
      titre: 'Government budget',
      mesures: 'Measures included',
      nonModelise: 'Not included in the simulator',
      sources: 'Sources',
      avertissement: 'The 2027 budget law translated into the simulator’s sliders. Measures are added to the simulator’s baseline, in 2026 euros. Effects on growth are not modelled. The opposition (PD, M5S, AVS) has not published a costed counter-budget. The card disappears once a slider is changed.',
      governo: {
        nom: 'Government',
        titre: 'Meloni government (FdI, Lega, FI)',
        date: 'Draft budget law 2027, adopted by the Council of Ministers on 28 October 2026',
        mesures: [
          'About €26bn of measures in 2027, including the 33% IRPEF bracket extended up to €55,000 (€1.45bn according to the UPB). Net effect on the deficit of about €13bn according to the budget document → €13bn of new spending from 2027.',
          'Funding: about €12bn of EU flexibility (escape clauses for defence) and €5.5bn asked of banks and insurers. Included in the net effect.',
        ],
        nonModelise: [
          'Renewing temporary measures will need €8.8bn of new funding in 2027 according to the UPB: not included.',
          'Opposition: a €9-10 hourly minimum wage, more money for health (PD, M5S), a tax on fortunes above €5m (AVS): no costing.',
        ],
        avis: 'The deficit would rise to 3.4% of GDP in 2027. The Bank of Italy says unexpected taxes on the financial sector add uncertainty; the UPB notes that the IRPEF cut benefits 89% of managers and 1% of manual workers.',
      },
    },
    es: {
      titre: 'Presupuesto del Gobierno',
      mesures: 'Medidas recogidas',
      nonModelise: 'No recogido en el simulador',
      sources: 'Fuentes',
      avertissement: 'Ley de presupuestos de 2027 traducida con los controles del simulador. Las medidas se suman al tendencial del simulador, en euros de 2026. No se modeliza su efecto sobre el crecimiento. La oposición (PD, M5S, AVS) no ha publicado un contrapresupuesto cuantificado. Al mover un control, la ficha desaparece.',
      governo: {
        nom: 'Gobierno',
        titre: 'Gobierno Meloni (FdI, Lega, FI)',
        date: 'Proyecto de ley de presupuestos de 2027, aprobado en Consejo de Ministros el 28 de octubre de 2026',
        mesures: [
          'Unos 26.000 M€ de medidas en 2027, entre ellas el tramo del 33 % del IRPEF ampliado hasta 55.000 € (1.450 M€ según la UPB). Efecto neto en el déficit de unos 13.000 M€ según el documento presupuestario → 13 mil M€ de gasto nuevo desde 2027.',
          'Financiación: unos 12.000 M€ de flexibilidad europea (cláusulas de escape para defensa) y 5.500 M€ pedidos a bancos y aseguradoras. Incluido en el efecto neto.',
        ],
        nonModelise: [
          'Prorrogar las medidas temporales exigirá 8.800 M€ de nueva financiación en 2027 según la UPB: no se recoge.',
          'Oposición: salario mínimo de 9 a 10 € por hora, más dinero para sanidad (PD, M5S), impuesto sobre los patrimonios de más de 5 M€ (AVS): sin cuantificar.',
        ],
        avis: 'El déficit subiría al 3,4 % del PIB en 2027. El Banco de Italia considera que los impuestos inesperados al sector financiero aumentan la incertidumbre; la UPB señala que la rebaja del IRPEF beneficia al 89 % de los directivos y al 1 % de los obreros.',
      },
    },
    de: {
      titre: 'Haushalt der Regierung',
      mesures: 'Übernommene Maßnahmen',
      nonModelise: 'Nicht im Simulator abgebildet',
      sources: 'Quellen',
      avertissement: 'Haushaltsgesetz 2027, mit den Reglern des Simulators übersetzt. Die Maßnahmen kommen zum Basisszenario des Simulators hinzu, in Euro von 2026. Wachstumseffekte werden nicht modelliert. Die Opposition (PD, M5S, AVS) hat keinen bezifferten Gegenhaushalt vorgelegt. Sobald ein Regler verändert wird, verschwindet die Karte.',
      governo: {
        nom: 'Regierung',
        titre: 'Regierung Meloni (FdI, Lega, FI)',
        date: 'Entwurf des Haushaltsgesetzes 2027, vom Ministerrat am 28. Oktober 2026 beschlossen',
        mesures: [
          'Etwa 26 Mrd. € Maßnahmen im Jahr 2027, darunter die IRPEF-Stufe von 33 % bis 55.000 € ausgeweitet (1,45 Mrd. € laut UPB). Nettowirkung auf das Defizit laut Haushaltsdokument etwa 13 Mrd. € → 13 Mrd. € neue Ausgaben ab 2027.',
          'Finanzierung: etwa 12 Mrd. € europäische Flexibilität (Ausweichklauseln für Verteidigung) und 5,5 Mrd. € von Banken und Versicherern. In der Nettowirkung enthalten.',
        ],
        nonModelise: [
          'Die Verlängerung befristeter Maßnahmen erfordert laut UPB 2027 neue Mittel von 8,8 Mrd. €: nicht übernommen.',
          'Opposition: Mindestlohn von 9 bis 10 € pro Stunde, mehr Geld für Gesundheit (PD, M5S), Steuer auf Vermögen über 5 Mio. € (AVS): nicht beziffert.',
        ],
        avis: 'Das Defizit stiege 2027 auf 3,4 % des BIP. Die Banca d’Italia sieht in den unerwarteten Steuern auf den Finanzsektor zusätzliche Unsicherheit; das UPB stellt fest, dass die IRPEF-Senkung 89 % der Führungskräfte und 1 % der Arbeiter zugutekommt.',
      },
    },
  };

  return { liste, textes };
});

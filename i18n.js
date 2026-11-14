// Langues de l'interface : détection, formats de nombres et textes communs aux pages.
// Fonctionne dans le navigateur (window.I18N) et sous Node (require), pour les tests.
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.I18N = fabrique();
})(globalThis, function () {
  const LANGUES = [
    { code: 'fr', court: 'FR', nom: 'Français', locale: 'fr-FR' },
    { code: 'en', court: 'EN', nom: 'English', locale: 'en-GB' },
    { code: 'es', court: 'ES', nom: 'Español', locale: 'es-ES' },
    { code: 'de', court: 'DE', nom: 'Deutsch', locale: 'de-DE' },
  ];
  const CODES = LANGUES.map((l) => l.code);

  // Ordre : ?lang= dans l'adresse, choix mémorisé, langue du navigateur, français.
  function langueCourante() {
    const g = globalThis;
    try {
      const url = new URLSearchParams(g.location.search).get('lang');
      if (CODES.includes(url)) return url;
    } catch { /* hors navigateur */ }
    try {
      const memo = g.localStorage.getItem('langue');
      if (CODES.includes(memo)) return memo;
    } catch { /* stockage indisponible */ }
    try {
      for (const l of g.navigator.languages || [g.navigator.language]) {
        const c = String(l).slice(0, 2).toLowerCase();
        if (CODES.includes(c)) return c;
      }
    } catch { /* hors navigateur */ }
    return 'fr';
  }

  // Mots et unités propres à chaque langue.
  const MOTS = {
    fr: {
      pctSuffixe: ' %', mds: (n) => `${n} Md€`, an: '/an', mois: '/mois', parAn: 'par an',
      duPib: 'du PIB', ptPib: 'pt de PIB', point: 'point', points: 'points',
      aucun: 'aucun', aucune: 'aucune', non: 'non',
      ansMois: (a, m) => `${a} ans${m ? ` et ${m} mois` : ''}`,
      annees: (n) => `${n} an${n > 1 ? 's' : ''}`,
    },
    en: {
      pctSuffixe: '%', mds: (n) => `€${n}bn`, an: '/yr', mois: '/month', parAn: 'a year',
      duPib: 'of GDP', ptPib: 'pp of GDP', point: 'pt', points: 'pts',
      aucun: 'none', aucune: 'none', non: 'no',
      ansMois: (a, m) => `${a} years${m ? ` ${m} month${m > 1 ? 's' : ''}` : ''}`,
      annees: (n) => `${n} year${n > 1 ? 's' : ''}`,
    },
    es: {
      pctSuffixe: ' %', mds: (n) => `${n} mil M€`, an: '/año', mois: '/mes', parAn: 'al año',
      duPib: 'del PIB', ptPib: 'pp del PIB', point: 'punto', points: 'puntos',
      aucun: 'ninguno', aucune: 'ninguna', non: 'no',
      ansMois: (a, m) => `${a} años${m ? ` y ${m} mes${m > 1 ? 'es' : ''}` : ''}`,
      annees: (n) => `${n} año${n > 1 ? 's' : ''}`,
    },
    de: {
      pctSuffixe: ' %', mds: (n) => `${n} Mrd. €`, an: '/Jahr', mois: '/Monat', parAn: 'pro Jahr',
      duPib: 'des BIP', ptPib: 'Pp. des BIP', point: 'Punkt', points: 'Punkte',
      aucun: 'keiner', aucune: 'keine', non: 'nein',
      ansMois: (a, m) => `${a} Jahre${m ? ` und ${m} Monat${m > 1 ? 'e' : ''}` : ''}`,
      annees: (n) => `${n} Jahr${n > 1 ? 'e' : ''}`,
    },
  };

  // Outils de formatage pour une langue.
  function outils(code) {
    const langue = LANGUES.find((l) => l.code === code) || LANGUES[0];
    const w = MOTS[langue.code];
    const nf = (d) => new Intl.NumberFormat(langue.locale, { minimumFractionDigits: d, maximumFractionDigits: d });
    const fmt = (v, d = 1) => nf(d).format(v);
    const marque = (v, d) => {
      const arrondi = Number(v.toFixed(d));
      return arrondi > 0 ? '+' : arrondi < 0 ? '−' : '';
    };
    const signe = (v, d = 1) => marque(v, d) + fmt(Math.abs(Number(v.toFixed(d))), d);
    const pct = (v, d = 1) => fmt(v, d) + w.pctSuffixe;
    const pctSigne = (v, d = 1) => signe(v, d) + w.pctSuffixe;
    const mds = (v, d = 0) => w.mds(fmt(v, d));
    const mdsSigne = (v, d = 1) => marque(v, d) + w.mds(fmt(Math.abs(Number(v.toFixed(d))), d));
    const euros = (v) => new Intl.NumberFormat(langue.locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);
    const points = (v, d = 1) => `${signe(v, d)} ${Math.abs(v) >= 2 ? w.points : w.point}`;
    const ansMois = (v) => {
      const mois = Math.round(v * 12);
      return w.ansMois(Math.floor(mois / 12), mois % 12);
    };
    return {
      code: langue.code, locale: langue.locale, mots: w,
      fmt, signe, pct, pctSigne, mds, mdsSigne, euros, points, ansMois,
      pctAn: (v, d = 1) => pct(v, d) + w.an,
      annees: w.annees,
    };
  }

  // Textes communs aux deux simulateurs et à l'accueil.
  const COMMUN = {
    fr: (u) => ({
      pays: { fr: 'France', es: 'Espagne' },
      nav: { accueil: 'Accueil', pays: 'Pays', langue: 'Langue' },
      chapo: 'Déplacez les curseurs pour tester vos hypothèses. Projection pédagogique : un déroulé arithmétique d’hypothèses, pas une prévision.',
      aria: { prereglages: 'Scénarios préréglés', hypotheses: 'Hypothèses' },
      h2: {
        ratio: 'Dette publique en % du PIB',
        solde: 'Solde public en % du PIB',
        interets: 'Charge d’intérêts de votre scénario, en Md€',
        postes: (a) => `Dépenses par poste en ${a}, en % du PIB`,
      },
      noteSolde: 'Quand le solde passe au-dessus du solde stabilisant, le ratio de dette recule.',
      legende: { scenario: 'Votre scénario', tendanciel: 'Tendanciel', soldePublic: 'Solde public', soldeStabilisant: 'Solde stabilisant' },
      details: { tableau: 'Tableau année par année', methode: 'Méthode et limites', sources: 'Sources' },
      usage: 'Usage :',
      modifies: (n) => `${n} curseur${n > 1 ? 's' : ''} modifié${n > 1 ? 's' : ''}`,
      tuiles: {
        detteEn: (a) => `Dette en ${a}`,
        depuis: (pts, a, r) => `${pts} depuis ${a} (${r})`,
        identique: 'identique au tendanciel',
        vsTendanciel: (pts) => `${pts} vs tendanciel`,
        encoursEn: (a) => `Encours en ${a}`,
        enDixAns: (m) => `${m} en 10 ans`,
        chargeEn: (a) => `Charge d’intérêts en ${a}`,
        pibContre: (p1, p0, a0) => `${p1} du PIB, contre ${p0} en ${a0}`,
        soldeEn: (a) => `Solde public en ${a}`,
        soldeStab: (v) => `Solde stabilisant : ${v} du PIB · seuil européen : −3 %`,
      },
      verdict: {
        baisseTout: 'Dette en baisse sur toute la période',
        baissePic: (r, a) => `Dette en baisse : pic à ${r} en ${a}`,
        stabilisee: (r, a) => `Stabilisée après un pic à ${r} en ${a}`,
        remonte: (a, r, pts, fin) => `Remonte depuis ${a} (${r}) : ${pts} en ${fin}`,
        derive: (pts, fin) => `En dérive : ${pts} en ${fin}`,
      },
      graph: {
        descRatio: (pays) => `Dette publique (${pays}) en pourcentage du PIB, de 2025 à 2036, votre scénario comparé au tendanciel`,
        descSolde: 'Solde public et solde stabilisant en pourcentage du PIB, de 2027 à 2036',
        descInterets: 'Charge d’intérêts annuelle en milliards d’euros, de 2026 à 2036',
        interets: 'Intérêts', enPctPib: 'En % du PIB', tauxMoyen: 'Taux moyen de la dette',
        noteInterets: (t0, a0, t1, a1) => `Taux moyen payé sur la dette : ${t0} en ${a0}, ${t1} en ${a1}.`,
      },
      postesRepere: (montant, part, note) => `≈ ${montant} en 2024, soit ${part} du PIB. ${note}`,
      tableau: {
        depart: 'départ',
        entetes: ['Année', 'PIB (Md€)', 'Croissance en valeur', 'Recettes (Md€)', 'Dépenses hors intérêts (Md€)', 'Solde primaire',
          'Intérêts (Md€)', 'Taux moyen', 'Solde public', 'Solde stabilisant', 'Dette (Md€)', 'Dette / PIB'],
      },
      accueil: {
        titre: 'Dette publique : France et Espagne',
        h1: 'Dette publique : projections 2027-2036',
        chapo: 'Deux simulateurs pédagogiques, même méthode : choisissez un pays, puis déplacez les curseurs pour tester vos hypothèses. Les projections ci-dessous sont les scénarios tendanciels, pas des prévisions.',
        ouvrir: 'Ouvrir le simulateur →',
        detteFin2025: 'Dette fin 2025',
        tendanciel: (a) => `Tendanciel ${a}`,
        pic: (r, a) => `pic ${r} en ${a}`,
        legendeCourbe: '% du PIB, même échelle pour les deux pays · pointillés : 100 %',
        evolution: (pts, a0, r0, a1) => `${pts} entre ${a0} (${r0}) et ${a1}`,
        deficit: (a) => `Déficit ${a}`,
        interets: (a) => `Intérêts ${a}`,
        recettes: 'Recettes publiques',
        soldeStab: 'Solde stabilisant',
        courbeAria: (a0, a1, r0, r1) => `Dette en % du PIB de ${a0} à ${a1} : de ${r0} à ${r1}`,
        note: 'Chiffres de 2025 mesurés (Insee ; Banco de España), 2026 estimés (Cour des comptes ; AIReF), 2036 calculés par les simulateurs sans modifier aucun réglage. Sources détaillées dans chaque simulateur.',
        resume: {
          fr: 'Dette au-dessus de 115 % du PIB et déficit d’environ 5 % : sans mesures, la dette continue de monter.',
          es: 'Dette repassée sous 100 % du PIB grâce à une forte croissance, mais les retraites et les intérêts la font remonter après 2030.',
        },
      },
    }),

    en: (u) => ({
      pays: { fr: 'France', es: 'Spain' },
      nav: { accueil: 'Home', pays: 'Country', langue: 'Language' },
      chapo: 'Move the sliders to test your assumptions. An educational projection: the arithmetic consequences of assumptions, not a forecast.',
      aria: { prereglages: 'Preset scenarios', hypotheses: 'Assumptions' },
      h2: {
        ratio: 'Public debt, % of GDP',
        solde: 'Budget balance, % of GDP',
        interets: 'Interest bill in your scenario, €bn',
        postes: (a) => `Spending by function in ${a}, % of GDP`,
      },
      noteSolde: 'When the balance rises above the debt-stabilising balance, the debt ratio falls.',
      legende: { scenario: 'Your scenario', tendanciel: 'Baseline', soldePublic: 'Budget balance', soldeStabilisant: 'Debt-stabilising balance' },
      details: { tableau: 'Year-by-year table', methode: 'Method and limitations', sources: 'Sources' },
      usage: 'Use:',
      modifies: (n) => `${n} slider${n > 1 ? 's' : ''} changed`,
      tuiles: {
        detteEn: (a) => `Debt in ${a}`,
        depuis: (pts, a, r) => `${pts} since ${a} (${r})`,
        identique: 'same as baseline',
        vsTendanciel: (pts) => `${pts} vs baseline`,
        encoursEn: (a) => `Debt stock in ${a}`,
        enDixAns: (m) => `${m} over 10 years`,
        chargeEn: (a) => `Interest bill in ${a}`,
        pibContre: (p1, p0, a0) => `${p1} of GDP, against ${p0} in ${a0}`,
        soldeEn: (a) => `Budget balance in ${a}`,
        soldeStab: (v) => `Debt-stabilising balance: ${v} of GDP · EU threshold: −3%`,
      },
      verdict: {
        baisseTout: 'Debt falls throughout the period',
        baissePic: (r, a) => `Debt falling: peak of ${r} in ${a}`,
        stabilisee: (r, a) => `Stabilised after peaking at ${r} in ${a}`,
        remonte: (a, r, pts, fin) => `Rising again since ${a} (${r}): ${pts} in ${fin}`,
        derive: (pts, fin) => `Drifting up: ${pts} in ${fin}`,
      },
      graph: {
        descRatio: (pays) => `Public debt (${pays}) as a percentage of GDP, 2025 to 2036, your scenario against the baseline`,
        descSolde: 'Budget balance and debt-stabilising balance as a percentage of GDP, 2027 to 2036',
        descInterets: 'Annual interest bill in billions of euros, 2026 to 2036',
        interets: 'Interest', enPctPib: '% of GDP', tauxMoyen: 'Average interest rate on debt',
        noteInterets: (t0, a0, t1, a1) => `Average rate paid on the debt: ${t0} in ${a0}, ${t1} in ${a1}.`,
      },
      postesRepere: (montant, part, note) => `≈ ${montant} in 2024, i.e. ${part} of GDP. ${note}`,
      tableau: {
        depart: 'start',
        entetes: ['Year', 'GDP (€bn)', 'Nominal growth', 'Revenue (€bn)', 'Primary spending (€bn)', 'Primary balance',
          'Interest (€bn)', 'Average rate', 'Budget balance', 'Stabilising balance', 'Debt (€bn)', 'Debt / GDP'],
      },
      accueil: {
        titre: 'Public debt: France and Spain',
        h1: 'Public debt: projections 2027-2036',
        chapo: 'Two educational simulators using the same method: pick a country, then move the sliders to test your assumptions. The projections below are baseline scenarios, not forecasts.',
        ouvrir: 'Open the simulator →',
        detteFin2025: 'Debt at end-2025',
        tendanciel: (a) => `Baseline ${a}`,
        pic: (r, a) => `peak ${r} in ${a}`,
        legendeCourbe: '% of GDP, same scale for both countries · dotted line: 100%',
        evolution: (pts, a0, r0, a1) => `${pts} between ${a0} (${r0}) and ${a1}`,
        deficit: (a) => `Deficit ${a}`,
        interets: (a) => `Interest ${a}`,
        recettes: 'Public revenue',
        soldeStab: 'Debt-stabilising balance',
        courbeAria: (a0, a1, r0, r1) => `Debt as % of GDP from ${a0} to ${a1}: from ${r0} to ${r1}`,
        note: '2025 figures are outturns (Insee; Banco de España), 2026 figures are estimates (Cour des comptes; AIReF), 2036 figures are computed by the simulators with default settings. Detailed sources in each simulator.',
        resume: {
          fr: 'Debt above 115% of GDP and a deficit of around 5%: without action, debt keeps rising.',
          es: 'Debt back below 100% of GDP thanks to strong growth, but pensions and interest push it up again after 2030.',
        },
      },
    }),

    es: (u) => ({
      pays: { fr: 'Francia', es: 'España' },
      nav: { accueil: 'Inicio', pays: 'País', langue: 'Idioma' },
      chapo: 'Mueva los controles para probar sus hipótesis. Proyección didáctica: el desarrollo aritmético de unas hipótesis, no una previsión.',
      aria: { prereglages: 'Escenarios predefinidos', hypotheses: 'Hipótesis' },
      h2: {
        ratio: 'Deuda pública en % del PIB',
        solde: 'Saldo público en % del PIB',
        interets: 'Gasto en intereses de su escenario, en mil M€',
        postes: (a) => `Gasto por función en ${a}, en % del PIB`,
      },
      noteSolde: 'Cuando el saldo supera el saldo estabilizador, la ratio de deuda baja.',
      legende: { scenario: 'Su escenario', tendanciel: 'Tendencial', soldePublic: 'Saldo público', soldeStabilisant: 'Saldo estabilizador' },
      details: { tableau: 'Tabla año por año', methode: 'Método y limitaciones', sources: 'Fuentes' },
      usage: 'Uso:',
      modifies: (n) => `${n} control${n > 1 ? 'es' : ''} modificado${n > 1 ? 's' : ''}`,
      tuiles: {
        detteEn: (a) => `Deuda en ${a}`,
        depuis: (pts, a, r) => `${pts} desde ${a} (${r})`,
        identique: 'igual que el tendencial',
        vsTendanciel: (pts) => `${pts} frente al tendencial`,
        encoursEn: (a) => `Saldo vivo en ${a}`,
        enDixAns: (m) => `${m} en 10 años`,
        chargeEn: (a) => `Gasto en intereses en ${a}`,
        pibContre: (p1, p0, a0) => `${p1} del PIB, frente al ${p0} en ${a0}`,
        soldeEn: (a) => `Saldo público en ${a}`,
        soldeStab: (v) => `Saldo estabilizador: ${v} del PIB · umbral europeo: −3 %`,
      },
      verdict: {
        baisseTout: 'Deuda a la baja en todo el periodo',
        baissePic: (r, a) => `Deuda a la baja: máximo del ${r} en ${a}`,
        stabilisee: (r, a) => `Estabilizada tras un máximo del ${r} en ${a}`,
        remonte: (a, r, pts, fin) => `Repunta desde ${a} (${r}): ${pts} en ${fin}`,
        derive: (pts, fin) => `Al alza: ${pts} en ${fin}`,
      },
      graph: {
        descRatio: (pays) => `Deuda pública (${pays}) en porcentaje del PIB, de 2025 a 2036, su escenario frente al tendencial`,
        descSolde: 'Saldo público y saldo estabilizador en porcentaje del PIB, de 2027 a 2036',
        descInterets: 'Gasto anual en intereses en miles de millones de euros, de 2026 a 2036',
        interets: 'Intereses', enPctPib: 'En % del PIB', tauxMoyen: 'Tipo medio de la deuda',
        noteInterets: (t0, a0, t1, a1) => `Tipo medio pagado por la deuda: ${t0} en ${a0}, ${t1} en ${a1}.`,
      },
      postesRepere: (montant, part, note) => `≈ ${montant} en 2024, es decir, el ${part} del PIB. ${note}`,
      tableau: {
        depart: 'inicio',
        entetes: ['Año', 'PIB (mil M€)', 'Crecimiento nominal', 'Ingresos (mil M€)', 'Gasto primario (mil M€)', 'Saldo primario',
          'Intereses (mil M€)', 'Tipo medio', 'Saldo público', 'Saldo estabilizador', 'Deuda (mil M€)', 'Deuda / PIB'],
      },
      accueil: {
        titre: 'Deuda pública: Francia y España',
        h1: 'Deuda pública: proyecciones 2027-2036',
        chapo: 'Dos simuladores didácticos con el mismo método: elija un país y mueva los controles para probar sus hipótesis. Las proyecciones siguientes son escenarios tendenciales, no previsiones.',
        ouvrir: 'Abrir el simulador →',
        detteFin2025: 'Deuda a finales de 2025',
        tendanciel: (a) => `Tendencial ${a}`,
        pic: (r, a) => `máximo ${r} en ${a}`,
        legendeCourbe: '% del PIB, misma escala para ambos países · punteado: 100 %',
        evolution: (pts, a0, r0, a1) => `${pts} entre ${a0} (${r0}) y ${a1}`,
        deficit: (a) => `Déficit ${a}`,
        interets: (a) => `Intereses ${a}`,
        recettes: 'Ingresos públicos',
        soldeStab: 'Saldo estabilizador',
        courbeAria: (a0, a1, r0, r1) => `Deuda en % del PIB de ${a0} a ${a1}: del ${r0} al ${r1}`,
        note: 'Cifras de 2025 observadas (Insee; Banco de España), de 2026 estimadas (Cour des comptes; AIReF) y de 2036 calculadas por los simuladores sin modificar ningún ajuste. Fuentes detalladas en cada simulador.',
        resume: {
          fr: 'Deuda por encima del 115 % del PIB y déficit cercano al 5 %: sin medidas, la deuda sigue subiendo.',
          es: 'Deuda de nuevo por debajo del 100 % del PIB gracias a un fuerte crecimiento, pero las pensiones y los intereses la hacen repuntar después de 2030.',
        },
      },
    }),

    de: (u) => ({
      pays: { fr: 'Frankreich', es: 'Spanien' },
      nav: { accueil: 'Start', pays: 'Land', langue: 'Sprache' },
      chapo: 'Bewegen Sie die Regler, um Ihre Annahmen zu testen. Eine didaktische Projektion: die rechnerische Folge von Annahmen, keine Prognose.',
      aria: { prereglages: 'Voreingestellte Szenarien', hypotheses: 'Annahmen' },
      h2: {
        ratio: 'Staatsschulden in % des BIP',
        solde: 'Finanzierungssaldo in % des BIP',
        interets: 'Zinsausgaben in Ihrem Szenario, Mrd. €',
        postes: (a) => `Ausgaben nach Aufgabenbereich ${a}, in % des BIP`,
      },
      noteSolde: 'Liegt der Saldo über dem schuldenstabilisierenden Saldo, sinkt die Schuldenquote.',
      legende: { scenario: 'Ihr Szenario', tendanciel: 'Basisszenario', soldePublic: 'Finanzierungssaldo', soldeStabilisant: 'Stabilisierender Saldo' },
      details: { tableau: 'Tabelle Jahr für Jahr', methode: 'Methode und Grenzen', sources: 'Quellen' },
      usage: 'Verwendung:',
      modifies: (n) => `${n} Regler geändert`,
      tuiles: {
        detteEn: (a) => `Schulden ${a}`,
        depuis: (pts, a, r) => `${pts} seit ${a} (${r})`,
        identique: 'wie im Basisszenario',
        vsTendanciel: (pts) => `${pts} ggü. Basisszenario`,
        encoursEn: (a) => `Schuldenstand ${a}`,
        enDixAns: (m) => `${m} in 10 Jahren`,
        chargeEn: (a) => `Zinsausgaben ${a}`,
        pibContre: (p1, p0, a0) => `${p1} des BIP, gegenüber ${p0} im Jahr ${a0}`,
        soldeEn: (a) => `Finanzierungssaldo ${a}`,
        soldeStab: (v) => `Stabilisierender Saldo: ${v} des BIP · EU-Grenze: −3 %`,
      },
      verdict: {
        baisseTout: 'Schulden sinken im gesamten Zeitraum',
        baissePic: (r, a) => `Schulden sinken: Höchststand ${r} im Jahr ${a}`,
        stabilisee: (r, a) => `Stabilisiert nach Höchststand von ${r} im Jahr ${a}`,
        remonte: (a, r, pts, fin) => `Steigt wieder seit ${a} (${r}): ${pts} im Jahr ${fin}`,
        derive: (pts, fin) => `Steigend: ${pts} im Jahr ${fin}`,
      },
      graph: {
        descRatio: (pays) => `Staatsschulden (${pays}) in Prozent des BIP, 2025 bis 2036, Ihr Szenario im Vergleich zum Basisszenario`,
        descSolde: 'Finanzierungssaldo und stabilisierender Saldo in Prozent des BIP, 2027 bis 2036',
        descInterets: 'Jährliche Zinsausgaben in Milliarden Euro, 2026 bis 2036',
        interets: 'Zinsen', enPctPib: 'In % des BIP', tauxMoyen: 'Durchschnittszins der Schulden',
        noteInterets: (t0, a0, t1, a1) => `Durchschnittlicher Zins auf die Schulden: ${t0} im Jahr ${a0}, ${t1} im Jahr ${a1}.`,
      },
      postesRepere: (montant, part, note) => `≈ ${montant} im Jahr 2024, also ${part} des BIP. ${note}`,
      tableau: {
        depart: 'Start',
        entetes: ['Jahr', 'BIP (Mrd. €)', 'Nominales Wachstum', 'Einnahmen (Mrd. €)', 'Primärausgaben (Mrd. €)', 'Primärsaldo',
          'Zinsen (Mrd. €)', 'Durchschnittszins', 'Finanzierungssaldo', 'Stabilisierender Saldo', 'Schulden (Mrd. €)', 'Schulden / BIP'],
      },
      accueil: {
        titre: 'Staatsschulden: Frankreich und Spanien',
        h1: 'Staatsschulden: Projektionen 2027-2036',
        chapo: 'Zwei didaktische Simulatoren mit derselben Methode: Wählen Sie ein Land und bewegen Sie die Regler, um Ihre Annahmen zu testen. Die folgenden Projektionen sind Basisszenarien, keine Prognosen.',
        ouvrir: 'Simulator öffnen →',
        detteFin2025: 'Schulden Ende 2025',
        tendanciel: (a) => `Basisszenario ${a}`,
        pic: (r, a) => `Höchststand ${r} im Jahr ${a}`,
        legendeCourbe: '% des BIP, gleiche Skala für beide Länder · gepunktet: 100 %',
        evolution: (pts, a0, r0, a1) => `${pts} zwischen ${a0} (${r0}) und ${a1}`,
        deficit: (a) => `Defizit ${a}`,
        interets: (a) => `Zinsen ${a}`,
        recettes: 'Staatseinnahmen',
        soldeStab: 'Stabilisierender Saldo',
        courbeAria: (a0, a1, r0, r1) => `Schulden in % des BIP von ${a0} bis ${a1}: von ${r0} auf ${r1}`,
        note: 'Werte 2025 gemessen (Insee; Banco de España), 2026 geschätzt (Cour des comptes; AIReF), 2036 von den Simulatoren mit Standardeinstellungen berechnet. Ausführliche Quellen in jedem Simulator.',
        resume: {
          fr: 'Schulden über 115 % des BIP und ein Defizit von rund 5 %: Ohne Maßnahmen steigen die Schulden weiter.',
          es: 'Schulden dank starken Wachstums wieder unter 100 % des BIP, doch Renten und Zinsen lassen sie nach 2030 wieder steigen.',
        },
      },
    }),
  };

  // Sélecteur de langue et application des textes statiques (attributs data-t).
  function lire(objet, chemin) {
    return chemin.split('.').reduce((o, k) => (o == null ? o : o[k]), objet);
  }

  function appliquer(T, racine = document) {
    for (const el of racine.querySelectorAll('[data-t]')) {
      const v = lire(T, el.dataset.t);
      if (typeof v === 'string') el.textContent = v;
    }
    for (const el of racine.querySelectorAll('[data-t-aria]')) {
      const v = lire(T, el.dataset.tAria);
      if (typeof v === 'string') el.setAttribute('aria-label', v);
    }
  }

  // Ajoute la langue courante à un lien interne.
  function lien(href, code) {
    return `${href}?lang=${code}`;
  }

  function selecteur(conteneur, code, T) {
    conteneur.setAttribute('aria-label', T.nav.langue);
    conteneur.innerHTML = LANGUES.map((l) =>
      `<a href="?lang=${l.code}" lang="${l.code}" hreflang="${l.code}" title="${l.nom}"${l.code === code ? ' aria-current="true"' : ''}>${l.court}</a>`).join('');
    for (const a of conteneur.querySelectorAll('a')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        try { localStorage.setItem('langue', a.lang); } catch { /* stockage indisponible */ }
        const url = new URL(location.href);
        url.searchParams.set('lang', a.lang);
        location.assign(url.href);
      });
    }
  }

  // Prépare une page : langue, outils, textes communs, sélecteur et navigation.
  function preparer() {
    const code = langueCourante();
    try { localStorage.setItem('langue', code); } catch { /* stockage indisponible */ }
    const u = outils(code);
    const T = COMMUN[code](u);
    document.documentElement.lang = code;
    const langues = document.getElementById('langues');
    if (langues) selecteur(langues, code, T);
    for (const a of document.querySelectorAll('a[data-lien]')) a.href = lien(a.dataset.lien, code);
    appliquer(T);
    return { code, u, T };
  }

  return { LANGUES, CODES, COMMUN, langueCourante, outils, appliquer, preparer, lien };
});

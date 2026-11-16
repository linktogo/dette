// Configurations transposées d'un pays à l'autre. Chaque simulateur a ses scénarios
// propres (défense à 3,5 % du PIB aux Pays-Bas, déficit vers 3 % en Belgique, retraite
// à 68 ans en Espagne, consolidation autrichienne…). Ce fichier les recalcule pour les
// autres pays, à partir de leur propre modèle : mêmes objectifs (part du PIB, âge,
// déficit), montants adaptés à la taille de chaque économie.
// Navigateur : window.Transpositions ; Node : require('../transpositions.js').
(function (racine, fabrique) {
  if (typeof module === 'object' && module.exports) module.exports = fabrique();
  else racine.Transpositions = fabrique();
})(globalThis, function () {
  // Bornes des curseurs utilisés par les transpositions, par pays : [min, max, pas].
  // Recopiées des structures de curseurs (textes.js et textes-communs.js) ; un test
  // vérifie qu'elles restent identiques.
  const BORNES = {
    fr: { economies: [0, 200, 5], fraude: [0, 20, 0.5], depenses: [-1, 3, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [4, 11, 0.1] },
    es: { economies: [0, 80, 2.5], fraude: [0, 15, 0.5], depenses: [-1, 4, 0.1], postes: [-4, 10, 0.1], ageLegal: [-2, 3, 0.25], chomage: [5, 16, 0.1] },
    de: { economies: [0, 150, 5], depenses: [-1, 3, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [3, 10, 0.1] },
    uk: { economies: [0, 100, 5], fraude: [0, 20, 0.5], depenses: [-1, 3, 0.1], postes: [-4, 8, 0.1], ageLegal: [-1, 3, 0.25], chomage: [3, 9, 0.1] },
    it: { economies: [0, 100, 5], fraude: [0, 20, 0.5], depenses: [-1, 4, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [3, 11, 0.1] },
    pt: { economies: [0, 15, 0.5], fraude: [0, 4, 0.1], depenses: [-1, 4, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [3, 11, 0.1] },
    gr: { economies: [0, 12, 0.5], fraude: [0, 4, 0.1], depenses: [-1, 4, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [5, 13, 0.1] },
    at: { economies: [0, 20, 0.5], fraude: [0, 4, 0.1], depenses: [-1, 4, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [4, 12, 0.1] },
    be: { economies: [0, 30, 1], fraude: [0, 6, 0.15], depenses: [-1, 4, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [4, 12, 0.1] },
    nl: { economies: [0, 50, 1], fraude: [0, 10, 0.25], depenses: [-1, 4, 0.1], postes: [-4, 8, 0.1], ageLegal: [-2, 3, 0.25], chomage: [2, 9, 0.1] },
  };

  // Âge légal de référence de chaque simulateur (curseur ageLegal = 0).
  const AGE_REF = { fr: 64, es: 67, de: 67, uk: 67, it: 67, pt: 66.75, gr: 67, at: 65, be: 66, nl: 67 };

  // Taux d'emprunt de référence du simulateur allemand (de/model.js, DEFAUTS.tauxMarche).
  const TAUX_ALLEMAND = 3.0;

  const ANNEE_DEFICIT = 2029;

  const arrondi = (v, pas) => Number((Math.round(v / pas) * pas).toFixed(6));
  const versLeHaut = (v, pas) => Number((Math.ceil(v / pas - 1e-9) * pas).toFixed(6));
  // Ramène v dans les bornes du curseur ; signale dans etat qu'il a fallu le limiter.
  let etat = { limite: false };
  const borner = (v, [min, max]) => {
    if (v < min - 1e-9 || v > max + 1e-9) etat.limite = true;
    return Math.min(max, Math.max(min, v));
  };

  // Recherche par dichotomie de x dans [a, b] tel que f(x) = cible, f croissante.
  function dichotomie(f, a, b, cible) {
    if (f(b) < cible) { etat.limite = true; return b; }
    for (let i = 0; i < 50; i++) {
      const m = (a + b) / 2;
      if (f(m) < cible) a = m; else b = m;
    }
    return b;
  }

  const fin = (m, p) => { const t = m.simuler({ ...m.DEFAUTS, ...p }); return t[t.length - 1]; };

  // Chaque configuration : pays d'origine, et calcul des réglages pour un pays cible.
  // calcul(m, b, pays) renvoie les réglages (objet) ou null si la transposition est
  // sans objet (pays d'origine, objectif déjà atteint, levier absent).
  const CONFIGS = [
    {
      // Pays-Bas : préréglage « Défense à 3,5 % du PIB » ; Allemagne : trajectoire OTAN votée.
      id: 'defense35', origines: ['nl', 'de'],
      calcul: (m, b) => {
        const part = (x) => { const a = fin(m, { poste_defense: x }); return (a.postes.defense / a.pib) * 100; };
        if (part(0) >= 3.5) return null;
        const x = dichotomie(part, 0, b.postes[1], 3.5);
        return { poste_defense: borner(versLeHaut(x, b.postes[2]), b.postes) };
      },
    },
    {
      // Belgique : préréglage « Déficit vers 3 % », par des économies pérennes.
      id: 'deficit3', origines: ['be'],
      calcul: (m, b) => {
        const solde = (x) => m.simuler({ ...m.DEFAUTS, economies: x }).find((a) => a.annee === ANNEE_DEFICIT).soldePib;
        if (solde(0) >= -3) return null;
        const x = dichotomie(solde, 0, b.economies[1], -3);
        return { economies: borner(versLeHaut(x, b.economies[2]), b.economies) };
      },
    },
    {
      // Autriche : consolidation votée (3,5 Md€, 0,66 % du PIB) ; Allemagne : consolidation (≈ 0,65 %).
      id: 'consolidation', origines: ['at', 'de'],
      calcul: (m, b) => ({ economies: borner(arrondi(m.BASE.pib * 0.0066, b.economies[2]), b.economies) }),
    },
    {
      // Italie : « Effort partagé », 20 Md€ d'économies et 5 Md€ de fraude recouvrée (0,86 % et 0,21 % du PIB).
      id: 'effortPartage', origines: ['it'],
      calcul: (m, b) => ({
        economies: borner(arrondi(m.BASE.pib * 0.0086, b.economies[2]), b.economies),
        ...(b.fraude ? { fraude: borner(arrondi(m.BASE.pib * 0.0021, b.fraude[2]), b.fraude) } : {}),
      }),
    },
    {
      // France : plan budgétaire, dépense hors intérêts freinée de 1,2 point par an sous la référence.
      id: 'freinage', origines: ['fr'],
      calcul: (m, b) => ({ depenses: borner(arrondi(m.DEFAUTS.depenses - 1.2, b.depenses[2]), b.depenses) }),
    },
    {
      // Portugal et Grèce : « Dépenses dynamiques » / « Excédents relâchés », +0,7 à +1 point par an.
      id: 'relance', origines: ['pt', 'gr'],
      calcul: (m, b) => ({ depenses: borner(arrondi(m.DEFAUTS.depenses + 0.8, b.depenses[2]), b.depenses) }),
    },
    {
      // Espagne, Allemagne, Royaume-Uni : « Retraite à 68 ans ».
      id: 'retraite68', origines: ['es', 'de', 'uk'],
      calcul: (m, b, pays) => {
        const ecart = 68 - AGE_REF[pays];
        if (ecart <= 0) return null;
        return { ageLegal: borner(arrondi(ecart, b.ageLegal[2]), b.ageLegal) };
      },
    },
    {
      // Espagne : « Sans dérive des pensions ».
      id: 'sansDerive', origines: ['es'],
      calcul: () => ({ retraites: 0 }),
    },
    {
      // Espagne : « Chômage à 7 % », 3,2 points sous la référence.
      id: 'chomage3', origines: ['es'],
      calcul: (m, b) => {
        const v = borner(arrondi(m.DEFAUTS.chomage - 3, b.chomage[2]), b.chomage);
        return v < m.DEFAUTS.chomage ? { chomage: v } : null;
      },
    },
    {
      // Royaume-Uni : fin du triple verrou, pensions revalorisées 0,5 point sous l'inflation pendant 10 ans.
      id: 'sousIndexation', origines: ['uk'],
      calcul: () => ({ sousIndexation: 0.5, anneesSousIndexation: 10 }),
    },
    {
      // Allemagne : emprunter au taux de référence allemand.
      id: 'tauxAllemand', origines: ['de'],
      calcul: (m) => (m.DEFAUTS.tauxMarche > TAUX_ALLEMAND ? { tauxMarche: TAUX_ALLEMAND } : null),
    },
  ];

  // Configurations proposées pour un pays, avec leurs réglages et leur effet sur la
  // dette en fin de période (points de PIB, par rapport au tendanciel). limite : un
  // curseur a atteint sa borne, l'objectif n'est donc pas entièrement atteint.
  function pour(pays, m) {
    const b = BORNES[pays];
    const ref = fin(m, {});
    return CONFIGS
      .filter((c) => !c.origines.includes(pays))
      .map((c) => {
        etat = { limite: false };
        const p = c.calcul(m, b, pays);
        if (!p || !Object.keys(p).every((k) => k in m.DEFAUTS)) return null;
        const a = fin(m, p);
        return { id: c.id, origines: c.origines, p, limite: etat.limite, effet: a.ratio - ref.ratio, annee: a.annee };
      })
      .filter(Boolean);
  }

  // Textes par langue. nom : libellé du bouton ; detail : réglages appliqués au pays.
  // u : outils de formatage (i18n.js) dans la devise du pays ; m : modèle du pays.
  const TEXTES = {
    fr: (u) => ({
      titre: 'Configurations venues d’autres pays',
      intro: 'Scénarios propres à un pays, recalculés pour celui-ci : même objectif, montants adaptés à la taille de son économie. Ils s’ajoutent aux réglages en cours ; un second clic les retire.',
      origine: (pays) => `Venu de : ${pays}`,
      changements: 'Changements effectués',
      aucunChangement: 'Aucun changement : scénario tendanciel.',
      parPays: (pays) => `Configuration venue de ${pays}`,
      manuels: 'Autres réglages',
      effetSeul: (pts, a) => `seule : ${pts} de dette en ${a}`,
      retirer: 'Retirer',
      toutRetirer: 'Revenir au tendanciel',
      ref: 'réf.',
      limite: 'objectif partiellement atteint : curseur en butée',
      accueilTitre: 'Configurations transposées, pays par pays',
      accueilIntro: 'Les scénarios propres à chaque pays, appliqués aux autres avec leur propre modèle. Effet sur la dette en 2036, par rapport au tendanciel, configuration par configuration.',
      ouvrirAvec: 'Ouvrir avec ce réglage',
      nombre: (n) => `${n} configurations`,
      configs: {
        defense35: 'Défense à 3,5 % du PIB',
        deficit3: `Déficit à 3 % dès ${ANNEE_DEFICIT}`,
        consolidation: 'Consolidation de 0,66 % du PIB',
        effortPartage: 'Effort partagé (économies et fraude)',
        freinage: 'Freinage de la dépense',
        relance: 'Dépenses dynamiques',
        retraite68: 'Retraite à 68 ans',
        sansDerive: 'Sans dérive des pensions',
        chomage3: 'Chômage −3 points',
        sousIndexation: 'Pensions sous l’inflation (10 ans)',
        tauxAllemand: 'Emprunter au taux allemand',
      },
      detail: {
        poste_defense: (v) => `défense ${u.pctSigne(v)}/an au-delà du rythme général`,
        economies: (v) => `${u.mds(v, v % 1 ? 1 : 0)} d’économies pérennes`,
        fraude: (v) => `${u.mds(v, v % 1 ? 1 : 0)} de fraude recouvrée par an`,
        depenses: (v) => `dépense hors intérêts ${u.pctSigne(v)}/an en volume`,
        ageLegal: (v, pays) => `âge légal ${u.ansMois(AGE_REF[pays] + v)}`,
        retraites: () => 'dérive des pensions neutralisée',
        chomage: (v) => `chômage à ${u.pct(v)}`,
        sousIndexation: (v) => `pensions ${u.fmt(v)} pt sous l’inflation`,
        anneesSousIndexation: (v) => `pendant ${u.annees(v)}`,
        tauxMarche: (v) => `taux d’emprunt ${u.pct(v)}`,
      },
    }),
    en: (u) => ({
      titre: 'Settings from other countries',
      intro: 'Scenarios specific to one country, recomputed for this one: same goal, amounts scaled to the size of its economy. They add to the current settings; click again to remove them.',
      origine: (pays) => `From: ${pays}`,
      changements: 'Changes made',
      aucunChangement: 'No changes: baseline scenario.',
      parPays: (pays) => `Setting from ${pays}`,
      manuels: 'Other settings',
      effetSeul: (pts, a) => `alone: ${pts} of debt in ${a}`,
      retirer: 'Remove',
      toutRetirer: 'Back to baseline',
      ref: 'ref.',
      limite: 'goal only partly met: slider at its limit',
      accueilTitre: 'Settings transposed, country by country',
      accueilIntro: 'Each country’s own scenarios, applied to the others with their own model. Effect on debt in 2036 against the baseline, setting by setting.',
      ouvrirAvec: 'Open with this setting',
      nombre: (n) => `${n} settings`,
      configs: {
        defense35: 'Defence at 3.5% of GDP',
        deficit3: `Deficit at 3% from ${ANNEE_DEFICIT}`,
        consolidation: 'Consolidation of 0.66% of GDP',
        effortPartage: 'Shared effort (savings and fraud)',
        freinage: 'Spending restraint',
        relance: 'Faster spending',
        retraite68: 'Retirement at 68',
        sansDerive: 'No pension drift',
        chomage3: 'Unemployment −3 points',
        sousIndexation: 'Pensions below inflation (10 years)',
        tauxAllemand: 'Borrow at the German rate',
      },
      detail: {
        poste_defense: (v) => `defence ${u.pctSigne(v)}/yr above the overall pace`,
        economies: (v) => `${u.mds(v, v % 1 ? 1 : 0)} of permanent savings`,
        fraude: (v) => `${u.mds(v, v % 1 ? 1 : 0)} of fraud recovered a year`,
        depenses: (v) => `primary spending ${u.pctSigne(v)}/yr in real terms`,
        ageLegal: (v, pays) => `retirement age ${u.ansMois(AGE_REF[pays] + v)}`,
        retraites: () => 'pension drift neutralised',
        chomage: (v) => `unemployment at ${u.pct(v)}`,
        sousIndexation: (v) => `pensions ${u.fmt(v)} pt below inflation`,
        anneesSousIndexation: (v) => `for ${u.annees(v)}`,
        tauxMarche: (v) => `borrowing rate ${u.pct(v)}`,
      },
    }),
    es: (u) => ({
      titre: 'Configuraciones de otros países',
      intro: 'Escenarios propios de un país, recalculados para este: mismo objetivo, importes adaptados al tamaño de su economía. Se suman a los ajustes actuales; un segundo clic los retira.',
      origine: (pays) => `Procede de: ${pays}`,
      changements: 'Cambios realizados',
      aucunChangement: 'Sin cambios: escenario tendencial.',
      parPays: (pays) => `Configuración procedente de ${pays}`,
      manuels: 'Otros ajustes',
      effetSeul: (pts, a) => `sola: ${pts} de deuda en ${a}`,
      retirer: 'Retirar',
      toutRetirer: 'Volver al tendencial',
      ref: 'ref.',
      limite: 'objetivo alcanzado en parte: control en su límite',
      accueilTitre: 'Configuraciones trasladadas, país por país',
      accueilIntro: 'Los escenarios propios de cada país, aplicados a los demás con su propio modelo. Efecto sobre la deuda en 2036 frente al tendencial, configuración por configuración.',
      ouvrirAvec: 'Abrir con este ajuste',
      nombre: (n) => `${n} configuraciones`,
      configs: {
        defense35: 'Defensa al 3,5 % del PIB',
        deficit3: `Déficit del 3 % desde ${ANNEE_DEFICIT}`,
        consolidation: 'Consolidación del 0,66 % del PIB',
        effortPartage: 'Esfuerzo compartido (ahorro y fraude)',
        freinage: 'Contención del gasto',
        relance: 'Gasto dinámico',
        retraite68: 'Jubilación a los 68 años',
        sansDerive: 'Sin deriva de las pensiones',
        chomage3: 'Paro −3 puntos',
        sousIndexation: 'Pensiones por debajo de la inflación (10 años)',
        tauxAllemand: 'Endeudarse al tipo alemán',
      },
      detail: {
        poste_defense: (v) => `defensa ${u.pctSigne(v)}/año por encima del ritmo general`,
        economies: (v) => `${u.mds(v, v % 1 ? 1 : 0)} de ahorro permanente`,
        fraude: (v) => `${u.mds(v, v % 1 ? 1 : 0)} de fraude recuperado al año`,
        depenses: (v) => `gasto primario ${u.pctSigne(v)}/año en volumen`,
        ageLegal: (v, pays) => `edad legal ${u.ansMois(AGE_REF[pays] + v)}`,
        retraites: () => 'deriva de las pensiones neutralizada',
        chomage: (v) => `paro del ${u.pct(v)}`,
        sousIndexation: (v) => `pensiones ${u.fmt(v)} pt por debajo de la inflación`,
        anneesSousIndexation: (v) => `durante ${u.annees(v)}`,
        tauxMarche: (v) => `tipo de emisión del ${u.pct(v)}`,
      },
    }),
    de: (u) => ({
      titre: 'Einstellungen aus anderen Ländern',
      intro: 'Szenarien eines Landes, für dieses neu berechnet: gleiches Ziel, Beträge an die Größe seiner Wirtschaft angepasst. Sie kommen zu den aktuellen Einstellungen hinzu; ein zweiter Klick entfernt sie.',
      origine: (pays) => `Aus: ${pays}`,
      changements: 'Vorgenommene Änderungen',
      aucunChangement: 'Keine Änderungen: Basisszenario.',
      parPays: (pays) => `Einstellung aus ${pays}`,
      manuels: 'Weitere Einstellungen',
      effetSeul: (pts, a) => `allein: ${pts} Schulden ${a}`,
      retirer: 'Entfernen',
      toutRetirer: 'Zurück zum Basisszenario',
      ref: 'Ref.',
      limite: 'Ziel nur teilweise erreicht: Regler am Anschlag',
      accueilTitre: 'Übertragene Einstellungen, Land für Land',
      accueilIntro: 'Die Szenarien jedes Landes, mit dem jeweils eigenen Modell auf die anderen übertragen. Wirkung auf die Schulden 2036 gegenüber dem Basisszenario, Einstellung für Einstellung.',
      ouvrirAvec: 'Mit dieser Einstellung öffnen',
      nombre: (n) => `${n} Einstellungen`,
      configs: {
        defense35: 'Verteidigung bei 3,5 % des BIP',
        deficit3: `Defizit von 3 % ab ${ANNEE_DEFICIT}`,
        consolidation: 'Konsolidierung von 0,66 % des BIP',
        effortPartage: 'Geteilte Anstrengung (Einsparungen und Betrug)',
        freinage: 'Ausgabenbremse',
        relance: 'Dynamische Ausgaben',
        retraite68: 'Rente mit 68',
        sansDerive: 'Ohne Rentendynamik',
        chomage3: 'Arbeitslosigkeit −3 Punkte',
        sousIndexation: 'Renten unter der Inflation (10 Jahre)',
        tauxAllemand: 'Zum deutschen Zins leihen',
      },
      detail: {
        poste_defense: (v) => `Verteidigung ${u.pctSigne(v)}/Jahr über dem allgemeinen Tempo`,
        economies: (v) => `${u.mds(v, v % 1 ? 1 : 0)} dauerhafte Einsparungen`,
        fraude: (v) => `${u.mds(v, v % 1 ? 1 : 0)} zusätzlich eingetriebener Betrug pro Jahr`,
        depenses: (v) => `Primärausgaben ${u.pctSigne(v)}/Jahr real`,
        ageLegal: (v, pays) => `Rentenalter ${u.ansMois(AGE_REF[pays] + v)}`,
        retraites: () => 'Rentendynamik neutralisiert',
        chomage: (v) => `Arbeitslosigkeit bei ${u.pct(v)}`,
        sousIndexation: (v) => `Renten ${u.fmt(v)} Pp. unter der Inflation`,
        anneesSousIndexation: (v) => `für ${u.annees(v)}`,
        tauxMarche: (v) => `Emissionszins ${u.pct(v)}`,
      },
    }),
  };

  // Résumé des réglages d'une configuration, dans la langue de t.
  const detail = (t, p, pays) => Object.entries(p).map(([k, v]) => t.detail[k](v, pays)).join(', ');

  return { BORNES, AGE_REF, TAUX_ALLEMAND, CONFIGS, TEXTES, pour, detail };
});

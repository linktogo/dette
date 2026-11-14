// Complétude des traductions : chaque langue couvre tous les textes, et aucun
// texte produit ne contient « undefined » ou « NaN ».
const test = require('node:test');
const assert = require('node:assert/strict');
const I18N = require('../i18n.js');

const PAYS = {
  fr: require('../fr/textes.js')(require('../fr/model.js'), require('../fr/sources.js')),
  es: require('../es/textes.js')(require('../es/model.js'), require('../es/sources.js')),
  de: require('../de/textes.js')(require('../de/model.js'), require('../de/sources.js')),
  uk: require('../uk/textes.js')(require('../uk/model.js'), require('../uk/sources.js')),
};

const propre = (texte, ou) => {
  assert.equal(typeof texte, 'string', `${ou} : texte attendu`);
  assert.ok(texte.trim().length > 0, `${ou} : texte vide`);
  assert.ok(!/undefined|NaN|\[object/.test(texte), `${ou} : « ${texte.slice(0, 80)} »`);
};

// Clés d'un objet, en profondeur ; les fonctions et les textes sont des feuilles.
function cles(o, prefixe = '') {
  return Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v)
    ? cles(v, prefixe + k + '.') : [prefixe + k])).sort();
}

test('i18n : quatre langues, mêmes textes communs partout', () => {
  assert.deepEqual(I18N.CODES, ['fr', 'en', 'es', 'de']);
  const ref = cles(I18N.COMMUN.fr(I18N.outils('fr')));
  for (const code of I18N.CODES) {
    assert.deepEqual(cles(I18N.COMMUN[code](I18N.outils(code))), ref, code);
  }
});

test('i18n : formats de nombres et d’unités par langue', () => {
  const f = (c) => I18N.outils(c);
  assert.equal(I18N.outils('fr', 'GBP').mds(117), '117 Md£');
  assert.equal(I18N.outils('en', 'GBP').mds(117), '£117bn');
  assert.equal(I18N.outils('de', 'GBP').mds(117), '117 Mrd. £');
  assert.equal(f('fr').pct(12.5), '12,5 %');
  assert.equal(f('en').pct(12.5), '12.5%');
  assert.equal(f('en').mds(1698), '€1,698bn');
  assert.equal(f('es').mds(42), '42 mil M€');
  assert.equal(f('de').mds(42), '42 Mrd. €');
  assert.equal(f('en').mdsSigne(-3.5), '−€3.5bn');
  assert.equal(f('fr').ansMois(64.25), '64 ans et 3 mois');
  assert.equal(f('de').ansMois(67), '67 Jahre');
  assert.equal(f('en').points(-1), '−1.0 pt');
});

for (const [id, P] of Object.entries(PAYS)) {
  const m = P.modele;
  const d = m.pointDeDepart();
  const idsCurseurs = P.structure.groupes.flatMap((g) => (g.postes ? [] : g.curseurs.map((c) => c.id)));
  const essais = [m.DEFAUTS, ...P.structure.prereglages.map((s) => ({ ...m.DEFAUTS, ...s.p }))];

  test(`${id} : chaque curseur existe dans le modèle`, () => {
    for (const c of idsCurseurs) assert.ok(c in m.DEFAUTS, c);
  });

  for (const code of I18N.CODES) {
    test(`${id} / ${code} : tous les textes sont traduits et bien formés`, () => {
      const u = I18N.outils(code, P.devise);
      const L = P.textes[code](u, m, I18N.COMMUN[code](u));
      propre(L.titreDoc, 'titreDoc');
      propre(L.h1, 'h1');
      for (const g of P.structure.groupes) {
        const tg = L.groupes[g.id];
        assert.ok(tg, `groupe ${g.id}`);
        propre(tg.titre, `groupe ${g.id}`);
        if (tg.intro) propre(tg.intro, `intro ${g.id}`);
        if (tg.resume) for (const p of essais) propre(tg.resume(p), `résumé ${g.id}`);
      }
      for (const cid of idsCurseurs) {
        const c = L.curseurs[cid];
        assert.ok(c, `curseur ${cid}`);
        propre(c.nom, `nom ${cid}`);
        propre(c.repere, `repère ${cid}`);
        const s = P.structure.groupes.flatMap((g) => g.curseurs || []).find((x) => x.id === cid);
        for (const v of [s.min, s.max, m.DEFAUTS[cid]]) propre(c.f(v, { ...m.DEFAUTS, [cid]: v }), `format ${cid}=${v}`);
      }
      assert.deepEqual(Object.keys(L.curseurs).sort(), [...idsCurseurs].sort(), 'aucun curseur en trop');
      for (const q of m.H.postes) {
        propre(L.postes[q.id].nom, `poste ${q.id}`);
        propre(L.postes[q.id].note, `note ${q.id}`);
      }
      for (const s of P.structure.prereglages) propre(L.prereglages[s.id], `préréglage ${s.id}`);
      propre(L.nonVentile(u.mdsSigne(-12, 0), 2036), 'nonVentile');
      propre(L.methode(d), 'méthode');
    });
  }

  test(`${id} : sources traduites dans les quatre langues`, () => {
    for (const s of P.sources) {
      assert.match(s.url, /^https:\/\//);
      for (const code of I18N.CODES) {
        propre(typeof s.nom === 'string' ? s.nom : s.nom[code], `nom ${s.url} ${code}`);
        propre(s.chiffre[code], `chiffre ${s.url} ${code}`);
        propre(s.usage[code], `usage ${s.url} ${code}`);
      }
    }
  });
}

// Indicateurs par habitant : population présente sur chaque année, sans effet
// sur la trajectoire de dette, et ordre de grandeur plausible.
for (const [id, P] of Object.entries(PAYS)) {
  const m = P.modele;
  test(`${id} : population et dette par habitant`, () => {
    const t = [m.pointDeDepart(), ...m.simuler(m.DEFAUTS)];
    const pop0 = m.H.ru.adultes + m.H.ru.mineurs;
    assert.equal(t[0].population, pop0);
    for (const a of t) assert.ok(a.population > 40 && a.population < 90, `${a.annee} : ${a.population}`);
    const parHab = (t[0].dette / t[0].population) * 1000;
    assert.ok(parHab > 20000 && parHab < 70000, `dette par habitant 2026 : ${parHab}`);
    // Accélérer la croissance démographique ne change pas la dette.
    const avant = m.simuler(m.DEFAUTS).map((a) => a.dette);
    m.H.croissancePopulation += 1;
    try {
      assert.deepEqual(m.simuler(m.DEFAUTS).map((a) => a.dette), avant);
      assert.ok(m.simuler(m.DEFAUTS)[9].population > t[10].population);
    } finally { m.H.croissancePopulation -= 1; }
  });
}

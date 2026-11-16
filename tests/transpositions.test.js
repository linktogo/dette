// Configurations transposées d'un pays à l'autre (transpositions.js).
const test = require('node:test');
const assert = require('node:assert/strict');
const I18N = require('../i18n.js');
const T = require('../transpositions.js');

const IDS = ['fr', 'es', 'de', 'uk', 'it', 'pt', 'gr', 'at', 'be', 'nl'];
const PAYS = Object.fromEntries(IDS.map((id) => {
  const m = require(`../${id}/model.js`);
  return [id, { m, P: require(`../${id}/textes.js`)(m, require(`../${id}/sources.js`)) }];
}));

const curseurs = (P) => P.structure.groupes.flatMap((g) => (g.postes
  ? [{ id: 'postes', min: g.min, max: g.max, pas: g.pas }] : g.curseurs));

test('transpositions : bornes recopiées identiques aux curseurs', () => {
  for (const id of IDS) {
    const cs = curseurs(PAYS[id].P);
    for (const [k, [min, max, pas]] of Object.entries(T.BORNES[id])) {
      const c = cs.find((x) => x.id === k);
      assert.ok(c, `${id} : curseur ${k} absent`);
      assert.deepEqual([c.min, c.max, c.pas], [min, max, pas], `${id} : ${k}`);
    }
    assert.equal('fraude' in T.BORNES[id], cs.some((c) => c.id === 'fraude'), `${id} : fraude`);
  }
});

test('transpositions : âge de référence et taux allemand conformes aux simulateurs', () => {
  assert.equal(T.TAUX_ALLEMAND, PAYS.de.m.DEFAUTS.tauxMarche);
  const u = I18N.outils('fr');
  for (const id of IDS) {
    const { m, P } = PAYS[id];
    const L = P.textes.fr(u, m, I18N.COMMUN.fr(u));
    assert.equal(L.curseurs.ageLegal.f(0, m.DEFAUTS), u.ansMois(T.AGE_REF[id]), id);
  }
});

for (const id of IDS) {
  const { m } = PAYS[id];
  const liste = T.pour(id, m);
  const b = T.BORNES[id];

  test(`${id} : configurations venues des autres pays seulement, réglages dans les bornes`, () => {
    assert.ok(liste.length >= 5, `${liste.length} configurations`);
    const cs = curseurs(PAYS[id].P);
    for (const s of liste) {
      assert.ok(!s.origines.includes(id), s.id);
      assert.ok(Number.isFinite(s.effet), s.id);
      for (const [k, v] of Object.entries(s.p)) {
        const c = cs.find((x) => x.id === (k.startsWith('poste_') ? 'postes' : k));
        assert.ok(c, `${s.id} : ${k}`);
        assert.ok(v >= c.min - 1e-9 && v <= c.max + 1e-9, `${s.id} : ${k} = ${v}`);
        const pas = (v - c.min) / c.pas;
        assert.ok(Math.abs(pas - Math.round(pas)) < 1e-6, `${s.id} : ${k} = ${v} hors pas ${c.pas}`);
        assert.notEqual(v, m.DEFAUTS[k], `${s.id} : ${k} inchangé`);
      }
    }
  });

  test(`${id} : objectifs atteints sauf curseur en butée`, () => {
    const fin = (p) => m.simuler({ ...m.DEFAUTS, ...p }).at(-1);
    const defense = liste.find((s) => s.id === 'defense35');
    if (defense) {
      const a = fin(defense.p);
      const part = (a.postes.defense / a.pib) * 100;
      if (defense.limite) assert.equal(defense.p.poste_defense, b.postes[1]);
      else assert.ok(part >= 3.5 && part < 3.6, `défense ${part}`);
    }
    const deficit = liste.find((s) => s.id === 'deficit3');
    if (deficit) {
      const solde = m.simuler({ ...m.DEFAUTS, ...deficit.p }).find((a) => a.annee === 2029).soldePib;
      if (deficit.limite) assert.equal(deficit.p.economies, b.economies[1]);
      else assert.ok(solde >= -3, `solde 2029 ${solde}`);
    }
    // Les économies réduisent la dette, la relance de la dépense l'augmente.
    for (const s of liste) {
      if (['deficit3', 'consolidation', 'effortPartage', 'freinage', 'retraite68', 'sousIndexation', 'tauxAllemand', 'chomage3'].includes(s.id)) {
        assert.ok(s.effet < 0, `${s.id} : ${s.effet}`);
      }
      if (['defense35', 'relance'].includes(s.id)) assert.ok(s.effet > 0, `${s.id} : ${s.effet}`);
    }
  });

  test(`${id} : textes des configurations dans les quatre langues`, () => {
    for (const code of I18N.CODES) {
      const t = T.TEXTES[code](I18N.outils(code, id === 'uk' ? 'GBP' : 'EUR'));
      for (const s of liste) {
        const textes = [t.configs[s.id], T.detail(t, s.p, id), t.origine('x'), t.parPays('x'), t.effetSeul('x', 2036), t.nombre(3)];
        for (const x of textes) {
          assert.equal(typeof x, 'string', `${code} ${s.id}`);
          assert.ok(x.length && !/undefined|NaN/.test(x), `${code} ${s.id} : ${x}`);
        }
      }
    }
  });
}

test('transpositions : mêmes clés de textes dans les quatre langues', () => {
  const cles = (o) => Object.keys(o).sort();
  const ref = T.TEXTES.fr(I18N.outils('fr'));
  for (const code of I18N.CODES) {
    const t = T.TEXTES[code](I18N.outils(code));
    assert.deepEqual(cles(t), cles(ref), code);
    assert.deepEqual(cles(t.configs), T.CONFIGS.map((c) => c.id).sort(), code);
    assert.deepEqual(cles(t.detail), cles(ref.detail), code);
  }
});

// Portugal, Grèce, Italie, Autriche, Belgique et Pays-Bas : pays construits sur le modèle commun (modele.js).
const test = require('node:test');
const assert = require('node:assert/strict');

const proche = (a, b, tol, msg) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg || ''} attendu ${b} ± ${tol}, obtenu ${a}`);

// Point de départ fin 2026 attendu (sources dans chaque sources.js).
const PAYS = {
  pt: { ratio: 87.5, solde: 0, recettes: 43.4, dette2025: 89.2 },
  gr: { ratio: 140.7, solde: 0.3, recettes: 50.0, dette2025: 146.1 },
  it: { ratio: 138.0, solde: -3.0, recettes: 47.4, dette2025: 136.7 },
  at: { ratio: 82.4, solde: -4.0, recettes: 51.0, dette2025: 81.5 },
  be: { ratio: 111.3, solde: -5.3, recettes: 49.2, dette2025: 107.9 },
  nl: { ratio: 46.1, solde: -2.7, recettes: 43.6, dette2025: 44.7 },
};

for (const [id, attendu] of Object.entries(PAYS)) {
  const m = require(`../${id}/model.js`);
  const { BASE, DEFAUTS, simuler, pointDeDepart } = m;

  test(`${id} : point de départ conforme aux sources`, () => {
    const d = pointDeDepart();
    proche(d.ratio, attendu.ratio, 1e-9, 'dette');
    proche(d.soldePib, attendu.solde, 1e-9, 'solde');
    proche((BASE.recettes / BASE.pib) * 100, attendu.recettes, 1e-9, 'recettes');
    proche(m.COMPTES_2025.ratio, attendu.dette2025, 1e-9, 'dette 2025');
  });

  test(`${id} : identité comptable, horizon et ventilation`, () => {
    const t = simuler({ ...DEFAUTS, crise: BASE.pib * 0.05, ageLegal: 1, ruAdulte: 300, economies: 2, poste_defense: 3 });
    assert.equal(t.length, 10);
    assert.equal(t[0].annee, 2027);
    let prec = BASE.dette;
    for (const a of t) {
      proche(a.dette, prec - a.solde, 1e-6, `année ${a.annee}`);
      const somme = Object.values(a.postes).reduce((s, v) => s + v, 0);
      proche(somme + a.nonVentile, a.depensesPrimaires, 1e-6, `ventilation ${a.annee}`);
      prec = a.dette;
    }
  });

  test(`${id} : sens des leviers`, () => {
    const fin = (p) => simuler({ ...DEFAUTS, ...p }).at(-1).ratio;
    const ref = fin({});
    const H = m.H;
    assert.ok(fin({ croissance: DEFAUTS.croissance + 1 }) < ref, 'croissance');
    assert.ok(fin({ tauxMarche: DEFAUTS.tauxMarche + 1 }) > ref, 'taux');
    assert.ok(fin({ depenses: DEFAUTS.depenses - 0.5 }) < ref, 'dépenses');
    assert.ok(fin({ economies: 1 }) < ref, 'économies');
    assert.ok(fin({ [H.tva.ids[0]]: H.tva.taux[0] + 1 }) < ref, 'TVA');
    assert.ok(fin({ irZone: 1 }) < ref, 'impôt sur le revenu');
    assert.ok(fin({ ageLegal: 1 }) < ref, 'âge légal');
    assert.ok(fin({ sousIndexation: 0.5 }) < ref, 'sous-indexation');
    assert.ok(fin({ chomage: DEFAUTS.chomage - 1 }) < ref, 'chômage');
    assert.ok(fin({ ruAdulte: 400 }) > ref, 'revenu universel');
    assert.ok(fin({ crise: BASE.pib * 0.05 }) > ref, 'crise');
  });

  test(`${id} : la TVA rapporte ses rendements par point dès la première année`, () => {
    const id0 = m.H.tva.ids[0];
    proche(m.effetIVA({ [id0]: m.H.tva.taux[0] + 1 }), m.H.tva.parPoint[0], 1e-9);
  });
}

test('Grèce : dette en baisse rapide, cohérente avec le FMI (vers 111 % du PIB)', () => {
  const t = require('../gr/model.js').simuler({});
  const a2031 = t.find((a) => a.annee === 2031);
  assert.ok(a2031.ratio > 105 && a2031.ratio < 125, `dette 2031 ${a2031.ratio}`);
});

test('Italie : intérêts proches de 4 % du PIB, ratio stable autour de 137 %', () => {
  const t = require('../it/model.js').simuler({});
  assert.ok(t[0].interetsPib > 3.7 && t[0].interetsPib < 4.3);
  assert.ok(Math.abs(t.at(-1).ratio - 138) < 6);
});

test('Italie : pas de salaire minimum légal, donc pas de levier correspondant', () => {
  const P = require('../it/textes.js')(require('../it/model.js'), require('../it/sources.js'));
  assert.ok(!P.structure.groupes.some((g) => g.id === 'smi'));
});

test('Autriche : dette proche des 88 % du PIB prévus par le Fiskalrat en 2030', () => {
  const a = require('../at/model.js').simuler({}).find((x) => x.annee === 2030);
  assert.ok(a.ratio > 85 && a.ratio < 93, `dette 2030 ${a.ratio}`);
});

test('Belgique : déficit proche des 5,7 % projetés par la BNB en 2028', () => {
  const b = require('../be/model.js').simuler({}).find((x) => x.annee === 2028);
  assert.ok(b.soldePib < -5.2 && b.soldePib > -6.4, `solde 2028 ${b.soldePib}`);
  assert.ok(b.ratio > 112 && b.ratio < 118, `dette 2028 ${b.ratio}`);
});

test('Belgique : le préréglage « Déficit vers 3 % » ramène le déficit sous 4 % en 2029', () => {
  const m = require('../be/model.js');
  const b = m.simuler({ ...m.DEFAUTS, economies: 16 }).find((x) => x.annee === 2029);
  assert.ok(b.soldePib > -4, `solde 2029 ${b.soldePib}`);
});

test('Pays-Bas : dette sous 60 % du PIB jusqu’en 2031 dans le tendanciel', () => {
  const n = require('../nl/model.js').simuler({}).find((x) => x.annee === 2031);
  assert.ok(n.ratio > 47 && n.ratio < 60, `dette 2031 ${n.ratio}`);
});

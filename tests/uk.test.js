const test = require('node:test');
const assert = require('node:assert/strict');
const { BASE, DEFAUTS, H, simuler, effetImpot, effetIVA } = require('../uk/model.js');

const proche = (a, b, tol, msg) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg || ''} attendu ${b} ± ${tol}, obtenu ${a}`);

const gainSolde = (p, annee) => {
  const ref = simuler(DEFAUTS).find((a) => a.annee === annee);
  const t = simuler({ ...DEFAUTS, ...p }).find((a) => a.annee === annee);
  return (t.soldePrimaire - ref.soldePrimaire) / (ref.pib / BASE.pib);
};

test('Royaume-Uni : point de départ 2026-27 cohérent avec l’OBR', () => {
  proche((BASE.dette / BASE.pib) * 100, 95, 0.05, 'dette nette');
  proche(((BASE.recettes - BASE.depensesPrimaires - BASE.interets) / BASE.pib) * 100, -4.2, 0.05, 'emprunt');
  // PIB 2025-26 implicite : 132 Md£ d'emprunt = 4,3 % du PIB.
  proche(132 / (BASE.pib / 1.042) * 100, 4.3, 0.05, 'PIB 2025-26');
  // La dette dépasse 3 000 Md£ en 2026-27.
  assert.ok(BASE.dette > 3000);
});

test('Royaume-Uni : identité comptable et horizon', () => {
  const t = simuler({ ...DEFAUTS, crise: 100, inflation: 4 });
  assert.equal(t.length, 10);
  let prec = BASE.dette;
  for (const a of t) {
    proche(a.dette, prec - a.solde, 1e-6, `année ${a.annee}`);
    prec = a.dette;
  }
});

test('Royaume-Uni : intérêts proches de 160 Md£ en 2031-32 (OBR)', () => {
  const a = simuler(DEFAUTS).find((x) => x.annee === 2031);
  assert.ok(a.interets > 145 && a.interets < 175, `intérêts ${a.interets}`);
});

test('Royaume-Uni : préréglage « Plans du gouvernement » proche de 1,8 % d’emprunt en 2030-31', () => {
  const a = simuler({ ...DEFAUTS, prelevements: 1.5, depenses: 0.5 }).find((x) => x.annee === 2030);
  proche(-a.soldePib, 1.8, 0.2);
});

test('Royaume-Uni : les gilts indexés rendent les intérêts sensibles à l’inflation', () => {
  const ref = simuler(DEFAUTS)[0];
  const t = simuler({ ...DEFAUTS, inflation: DEFAUTS.inflation + 1 })[0];
  // Un point d'inflation : 0,25 % de la dette en intérêts en plus, la première année.
  proche(t.interets - ref.interets, H.partIndexee / 100 * BASE.dette, 1e-6);
});

test('Royaume-Uni : rendements des impôts (HMRC, IFS)', () => {
  proche(effetImpot({ ir20: 21 }), 6.9, 1e-9);
  proche(effetImpot({ ir40: 41, erosion: 0 }), 1.6, 1e-9);
  proche(effetImpot({ nics8: 9 }), 5.35, 1e-9);
  proche(effetIVA({ tva20: 21 }), 8.8, 1e-9);
  proche(gainSolde({ ir20: 21 }, 2029), 6.9, 0.01);
});

test('Royaume-Uni : sens des leviers', () => {
  const fin = (p) => simuler({ ...DEFAUTS, ...p }).at(-1).ratio;
  const ref = fin({});
  assert.ok(fin({ croissance: 2.4 }) < ref);
  assert.ok(fin({ tauxMarche: 6 }) > ref);
  assert.ok(fin({ economies: 20 }) < ref);
  assert.ok(fin({ ageLegal: 1 }) < ref);
  assert.ok(fin({ sousIndexation: 0.5 }) < ref);
  assert.ok(fin({ retraites: 0 }) < ref);
  assert.ok(fin({ chomage: 4 }) < ref);
  assert.ok(fin({ fraude: 5 }) < ref);
  assert.ok(fin({ ruAdulte: 500 }) > ref);
});

test('Royaume-Uni : la ventilation par poste retrouve la dépense hors intérêts', () => {
  const t = simuler({ ...DEFAUTS, poste_defense: 4, economies: 20, crise: 100, ruAdulte: 300, smi: 5, ageLegal: 1 });
  for (const a of t) {
    const somme = Object.values(a.postes).reduce((s, v) => s + v, 0);
    proche(somme + a.nonVentile, a.depensesPrimaires, 1e-6, `année ${a.annee}`);
  }
});

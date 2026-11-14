const test = require('node:test');
const assert = require('node:assert/strict');
const { BASE, DEFAUTS, H, simuler, effetImpot, effetIVA } = require('../de/model.js');

const proche = (a, b, tol, msg) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg || ''} attendu ${b} ± ${tol}, obtenu ${a}`);

const gainSolde = (p, annee) => {
  const ref = simuler(DEFAUTS).find((a) => a.annee === annee);
  const t = simuler({ ...DEFAUTS, ...p }).find((a) => a.annee === annee);
  return (t.soldePrimaire - ref.soldePrimaire) / (ref.pib / BASE.pib);
};

test('Allemagne : point de départ 2026 cohérent avec les sources', () => {
  proche((BASE.dette / BASE.pib) * 100, 66.5, 0.05, 'dette Stabilitätsrat');
  proche(((BASE.recettes - BASE.depensesPrimaires - BASE.interets) / BASE.pib) * 100, -4.25, 0.05, 'déficit');
  proche((BASE.recettes / BASE.pib) * 100, 47.9, 0.05, 'recettes Destatis');
  proche((BASE.interets / BASE.pib) * 100, 1.15, 0.05, 'intérêts');
});

test('Allemagne : identité comptable et horizon 2027-2036', () => {
  const t = simuler({ ...DEFAUTS, crise: 150, ageLegal: 1, infra: 50 });
  assert.equal(t.length, 10);
  assert.equal(t[0].annee, 2027);
  let prec = BASE.dette;
  for (const a of t) {
    proche(a.dette, prec - a.solde, 1e-6, `année ${a.annee}`);
    prec = a.dette;
  }
});

test('Allemagne : le tendanciel dépasse 3 % de déficit et approche 75 % de dette en 2029', () => {
  const t = simuler(DEFAUTS);
  const a2029 = t.find((a) => a.annee === 2029);
  assert.ok(t[0].soldePib < -3, `déficit 2027 ${t[0].soldePib}`);
  assert.ok(a2029.ratio > 72 && a2029.ratio < 82, `dette 2029 ${a2029.ratio}`);
});

test('Allemagne : programmes votés (fonds spécial, défense)', () => {
  const ref = simuler(DEFAUTS).at(-1);
  // Sans fonds spécial : 1,25 % du PIB de dépenses en moins dès 2027 (0,85 % + l'écart à 2026).
  const sansInfra = simuler({ ...DEFAUTS, infra: 0 });
  assert.ok(sansInfra.at(-1).ratio < ref.ratio);
  proche((simuler(DEFAUTS)[0].postes.economie - sansInfra[0].postes.economie) / sansInfra[0].pib * 100, 0.85, 1e-9);
  // Défense gelée au niveau de 2026 : 0,7 point de PIB en moins à partir de 2029.
  const gel = simuler({ ...DEFAUTS, otan: 0 }).find((a) => a.annee === 2030);
  const base = simuler(DEFAUTS).find((a) => a.annee === 2030);
  proche((base.postes.defense - gel.postes.defense) / base.pib * 100, 0.7, 1e-9);
});

test('Allemagne : la baisse légale de l’impôt sur les sociétés est dans le tendanciel', () => {
  // De 15 % à 10 % entre 2028 et 2032 : 5 points × 2,6 Md€ en moins à partir de 2032.
  const decale = simuler({ ...DEFAUTS, societes: 5, erosion: 0 }).find((a) => a.annee === 2033);
  const ref = simuler(DEFAUTS).find((a) => a.annee === 2033);
  proche((decale.recettes - ref.recettes) / (ref.pib / BASE.pib), 5 * H.societes.parPoint, 1e-6);
});

test('Allemagne : rendements des impôts conformes aux chiffrages publics', () => {
  proche(effetIVA({ tva19: 20 }), 15, 1e-9);
  proche(effetImpot({ ir42: 45, erosion: 0 }), 14.1, 1e-9);
  proche(effetImpot({ ir45: 48, erosion: 0 }), 3, 1e-9);
});

test('Allemagne : sens des leviers', () => {
  const fin = (p) => simuler({ ...DEFAUTS, ...p }).at(-1).ratio;
  const ref = fin({});
  assert.ok(fin({ croissance: 1.9 }) < ref);
  assert.ok(fin({ tauxMarche: 4 }) > ref);
  assert.ok(fin({ economies: 30 }) < ref);
  assert.ok(fin({ tva19: 21 }) < ref);
  assert.ok(fin({ ageLegal: 1 }) < ref);
  assert.ok(fin({ chomage: 5 }) < ref);
  assert.ok(fin({ retraites: 0 }) < ref);
  assert.ok(fin({ ruAdulte: 500 }) > ref);
  assert.ok(fin({ crise: 200 }) > ref);
});

test('Allemagne : la ventilation par poste retrouve la dépense hors intérêts', () => {
  const t = simuler({ ...DEFAUTS, poste_defense: 3, economies: 20, crise: 100, ruAdulte: 300, smi: 5, otan: 50 });
  for (const a of t) {
    const somme = Object.values(a.postes).reduce((s, v) => s + v, 0);
    proche(somme + a.nonVentile, a.depensesPrimaires, 1e-6, `année ${a.annee}`);
  }
});

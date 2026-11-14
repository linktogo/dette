const test = require('node:test');
const assert = require('node:assert/strict');
const {
  BASE, DEFAUTS, H, simuler, effetImpot, effetIVA, effetSmi, effetRevenuUniversel,
} = require('../es/model.js');

const proche = (a, b, tol, msg) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg || ''} attendu ${b} ± ${tol}, obtenu ${a}`);

// Écart de solde primaire par rapport au tendanciel, en Md€ de 2026.
const gainSolde = (p, annee) => {
  const ref = simuler(DEFAUTS).find((a) => a.annee === annee);
  const t = simuler({ ...DEFAUTS, ...p }).find((a) => a.annee === annee);
  return (t.soldePrimaire - ref.soldePrimaire) / (ref.pib / BASE.pib);
};

test('Espagne : point de départ 2026 cohérent avec les sources', () => {
  proche((BASE.dette / BASE.pib) * 100, 99.3, 0.05, 'dette AIReF');
  const solde = BASE.recettes - BASE.depensesPrimaires - BASE.interets;
  proche((solde / BASE.pib) * 100, -2.6, 0.05, 'déficit AIReF');
  proche((BASE.recettes / BASE.pib) * 100, 42.9, 0.05, 'recettes Banco de España');
  // PIB 2025 implicite proche de celui de l'INE (1 690 Md€).
  proche(BASE.pib / 1.05, 1690, 10, 'PIB 2025');
});

test('Espagne : projection de 2027 à 2036 et identité comptable', () => {
  const t = simuler({ ...DEFAUTS, crise: 100, anneeCrise: 2030, ageLegal: 1 });
  assert.equal(t.length, 10);
  assert.equal(t[0].annee, 2027);
  assert.equal(t.at(-1).annee, 2036);
  let prec = BASE.dette;
  for (const a of t) {
    proche(a.dette, prec - a.solde, 1e-6, `année ${a.annee}`);
    proche(a.solde, a.recettes - a.depensesPrimaires - a.interets, 1e-6);
    prec = a.dette;
  }
});

test('Espagne : solde stabilisant d’environ −3,5 % du PIB', () => {
  proche(simuler(DEFAUTS)[0].soldeStabilisant, -3.5, 0.1);
});

test('Espagne : le tendanciel repasse vers 3 % de déficit vers 2030-2031 (AIReF)', () => {
  const t = simuler(DEFAUTS);
  const a2031 = t.find((a) => a.annee === 2031);
  assert.ok(a2031.soldePib < -2.8 && a2031.soldePib > -4, `solde 2031 = ${a2031.soldePib}`);
  assert.ok(t.at(-1).interets > t[0].interets, 'intérêts en hausse');
});

test('Espagne : sens des leviers', () => {
  const fin = (p) => simuler({ ...DEFAUTS, ...p }).at(-1).ratio;
  const ref = fin({});
  assert.ok(fin({ croissance: DEFAUTS.croissance + 1 }) < ref, 'croissance');
  assert.ok(fin({ inflation: DEFAUTS.inflation + 1 }) < ref, 'inflation');
  assert.ok(fin({ tauxMarche: DEFAUTS.tauxMarche + 1 }) > ref, 'taux');
  assert.ok(fin({ depenses: DEFAUTS.depenses - 0.5 }) < ref, 'dépenses');
  assert.ok(fin({ economies: 20 }) < ref, 'économies');
  assert.ok(fin({ prelevements: 1 }) < ref, 'prélèvements');
  assert.ok(fin({ niches: 20 }) < ref, 'bénéfices fiscaux');
  assert.ok(fin({ fraude: 3 }) < ref, 'fraude');
  assert.ok(fin({ iva21: 22 }) < ref, 'IVA');
  assert.ok(fin({ ir45: 48 }) < ref, 'IRPF');
  assert.ok(fin({ societes: 28 }) < ref, 'sociétés');
  assert.ok(fin({ ageLegal: 1 }) < ref, 'âge légal');
  assert.ok(fin({ cotisation: 1 }) < ref, 'cotisation');
  assert.ok(fin({ sousIndexation: 0.5 }) < ref, 'sous-indexation');
  assert.ok(fin({ retraites: 0 }) < ref, 'sans dérive des pensions');
  assert.ok(fin({ chomage: 8 }) < ref, 'chômage');
  assert.ok(fin({ dependance: 2.5 }) > ref, 'dépendance');
  assert.ok(fin({ crise: 150 }) > ref, 'crise');
});

test('Espagne : le taux moyen ne bouge pas si le taux de marché lui est égal', () => {
  const t = simuler({ ...DEFAUTS, tauxMarche: BASE.interets / BASE.dettePrecedente * 100 });
  proche(t.at(-1).tauxMoyen, t[0].tauxMoyen, 1e-9);
});

test('Espagne : les postes couvrent la dépense hors intérêts de 2024 (725 Md€ − ~39 Md€)', () => {
  proche(H.postes.reduce((s, q) => s + q.montant, 0), 725.0 - 38.8, 0.5);
});

test('Espagne : la ventilation par poste retrouve la dépense hors intérêts', () => {
  const t = simuler({ ...DEFAUTS, poste_defense: 5, ageLegal: 1, economies: 10, crise: 80, chomage: 8, ruAdulte: 300, smi: 5 });
  for (const a of t) {
    const somme = Object.values(a.postes).reduce((s, v) => s + v, 0);
    proche(somme + a.nonVentile, a.depensesPrimaires, 1e-6, `année ${a.annee}`);
  }
});

test('Espagne : le MEI est compté dans le tendanciel et plafonne à 1,2 % en 2029', () => {
  const t = simuler(DEFAUTS);
  // Sans dérive des pensions ni de la dépendance, seule la hausse du MEI fait monter
  // le taux de recettes au-dessus de celui de 2026.
  const r = (a) => a.recettes / a.pib;
  const base = BASE.recettes / BASE.pib;
  proche((r(t.find((a) => a.annee === 2029)) - base) * BASE.pib, 0.3 * H.cotisationPoint, 0.01);
  proche(r(t.find((a) => a.annee === 2033)), r(t.find((a) => a.annee === 2029)), 1e-12);
});

test('Espagne : âge légal à 68 ans, plein effet en 2035', () => {
  proche(gainSolde({ ageLegal: 1 }, 2035), H.age.plus[0] + H.age.plus[1], 0.01);
  proche(gainSolde({ ageLegal: -1 }, 2035), -(H.age.moins[0] + H.age.moins[1]), 0.01);
  assert.ok(gainSolde({ ageLegal: 1 }, 2030) < (H.age.plus[0] + H.age.plus[1]) / 2);
});

test('Espagne : sous-indexation de 2,0 Md€ par point et par année, acquise ensuite', () => {
  const p = { sousIndexation: 1, anneesSousIndexation: 3 };
  proche(gainSolde(p, 2027), 2.0, 0.01);
  proche(gainSolde(p, 2029), 6.0, 0.01);
  proche(gainSolde(p, 2036), 6.0, 0.01);
});

test('Espagne : un point de cotisation rapporte 5,9 Md€, un point de chômage 6 Md€', () => {
  proche(gainSolde({ cotisation: 1 }, 2029), 5.9, 0.01);
  proche(gainSolde({ chomage: DEFAUTS.chomage - 1 }, 2031), 6, 0.01);
});

test('Espagne : IVA, rendement d’un point de chaque taux', () => {
  proche(effetIVA(DEFAUTS), 0, 1e-9);
  proche(effetIVA({ iva21: 22 }), H.iva.parPoint[0], 1e-9);
  proche(effetIVA({ iva10: 11 }), H.iva.parPoint[1], 1e-9);
  proche(effetIVA({ iva4: 5 }), H.iva.parPoint[2], 1e-9);
  proche(gainSolde({ iva21: 22 }, 2027), H.iva.parPoint[0], 0.01);
});

test('Espagne : taux réduits d’IVA alignés à 21 % ≈ coût AIReF (17,8 Md€ en 2020) revalorisé', () => {
  const gain = effetIVA({ iva10: 21, iva4: 21 });
  assert.ok(gain > 17.8 && gain < 17.8 * 1.5, `gain ${gain}`);
});

test('Espagne : un point sur tout le barème de l’IRPF ≈ 3 % de ses 142,5 Md€', () => {
  const tout = { ir19: 20, ir24: 25, ir30: 31, ir37: 38, ir45: 46, ir47: 48, erosion: 0 };
  const gain = effetImpot(tout);
  assert.ok(gain / 142.5 > 0.02 && gain / 142.5 < 0.04, `gain ${gain}`);
});

test('Espagne : érosion limitée aux hauts revenus, sociétés et patrimoines', () => {
  proche(effetImpot({ ir19: 20, erosion: 50 }), H.irpf.parPoint[0], 1e-9);
  proche(effetImpot({ ir47: 57, erosion: 40 }), 10 * H.irpf.parPoint[5] * 0.6, 1e-9);
  proche(effetImpot({ societes: 26, erosion: 0 }), H.societes.parPoint, 1e-9);
  proche(effetImpot({ patrimoine: 2, erosion: 50 }), H.patrimoineParPoint, 1e-9);
  assert.ok(effetImpot({ irSurtaxe: 10, irSeuil: 2000000 }) < effetImpot({ irSurtaxe: 10, irSeuil: 500000 }));
});

test('Espagne : une hausse du SMI dégrade le solde quand elle coûte des emplois', () => {
  const s = effetSmi({ smi: 10 });
  proche(s.chomage, 10 * DEFAUTS.smiEmplois / 1000 / H.smi.populationActive * 100, 1e-9);
  assert.ok(gainSolde({ smi: 10 }, 2032) < 0);
  assert.ok(gainSolde({ smi: 10, smiEmplois: 0 }, 2032) > 0);
});

test('Espagne : revenu universel, coût brut et aides absorbées plafonnées', () => {
  proche(effetRevenuUniversel({ ruAdulte: 100 }).brut, H.ru.adultes * 1.2, 1e-9);
  const max = H.ru.aides.reduce((s, a) => s + a.montant * a.plafond, 0);
  proche(effetRevenuUniversel({ ruAdulte: 5000, ruMineur: 5000 }).aides, max, 1e-9);
  const ref = simuler(DEFAUTS).at(-1);
  assert.ok(simuler({ ...DEFAUTS, ruAdulte: 500 }).at(-1).ratio > ref.ratio);
  const finance = simuler({ ...DEFAUTS, ruAdulte: 500, ruMineur: 125, ruFinancement: 100 }).at(-1);
  proche(finance.soldePrimaire, ref.soldePrimaire, 1e-6);
});

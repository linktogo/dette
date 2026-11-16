// Programmes des partis (hors France, testée dans fr.test.js) : réglages valides,
// textes complets et traduction cohérente avec les chiffrages annoncés.
const test = require('node:test');
const assert = require('node:assert/strict');
const I18N = require('../i18n.js');

const proche = (a, b, tol, msg) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg || ''} attendu ${b} ± ${tol}, obtenu ${a}`);

const PAYS = {
  es: { M: require('../es/model.js'), ids: ['psoe', 'pp', 'vox', 'sumar'] },
  de: { M: require('../de/model.js'), ids: ['koalition', 'afd', 'gruene', 'linke'] },
  uk: { M: require('../uk/model.js'), ids: ['labour', 'conservateurs', 'reform'] },
  it: { M: require('../it/model.js'), ids: ['governo'] },
  pt: { M: require('../pt/model.js'), ids: ['governo', 'ps', 'chega', 'il'] },
  gr: { M: require('../gr/model.js'), ids: ['nd', 'pasok', 'syriza'] },
  at: { M: require('../at/model.js'), ids: ['koalition', 'gruene'] },
  be: { M: require('../be/model.js'), ids: ['arizona', 'ptb'] },
  nl: { M: require('../nl/model.js'), ids: ['coalitie', 'glpvda'] },
};
// Le Royaume-Uni n'a pas les curseurs de dépenses nouvelles et de montée en charge.
const SANS_NOUVEAUX = ['uk'];
for (const [code, x] of Object.entries(PAYS)) {
  x.P = require(`../${code}/textes.js`)(x.M, require(`../${code}/sources.js`));
  x.reglage = (id) => ({ ...x.M.DEFAUTS, ...x.P.partis.liste.find((s) => s.id === id).p });
  // Écart de solde primaire au tendanciel, en Md€ de 2026.
  x.gain = (id, annee) => {
    const ref = x.M.simuler(x.M.DEFAUTS).find((a) => a.annee === annee);
    const t = x.M.simuler(x.reglage(id)).find((a) => a.annee === annee);
    return (t.soldePrimaire - ref.soldePrimaire) / (ref.pib / x.M.BASE.pib);
  };
}

for (const [code, { P, ids }] of Object.entries(PAYS)) {
  test(`${code} partis : réglages dans les bornes et les pas des curseurs`, () => {
    assert.deepEqual(P.partis.liste.map((s) => s.id), ids);
    const curseurs = P.structure.groupes.flatMap((g) => g.curseurs || []);
    for (const s of P.partis.liste) {
      assert.ok(Object.keys(s.p).length > 0, `${s.id} : au moins un réglage`);
      for (const [k, v] of Object.entries(s.p)) {
        const c = curseurs.find((y) => y.id === k);
        assert.ok(c, `${s.id} : curseur ${k}`);
        assert.ok(v >= c.min && v <= c.max, `${s.id} : ${k}=${v} hors bornes`);
        assert.ok(Math.abs((v - c.min) / c.pas - Math.round((v - c.min) / c.pas)) < 1e-9, `${s.id} : ${k}=${v} hors pas`);
      }
      assert.ok(s.sources.length > 0 && s.sources.every((y) => /^https:\/\//.test(y.url)), `${s.id} : sources`);
    }
  });

  test(`${code} partis : textes complets dans les quatre langues`, () => {
    for (const lang of I18N.CODES) {
      const T = P.partis.textes[lang];
      for (const k of ['titre', 'mesures', 'nonModelise', 'sources', 'avertissement']) assert.ok(T[k], `${lang} ${k}`);
      for (const s of P.partis.liste) {
        const t = T[s.id];
        for (const k of ['nom', 'titre', 'date', 'avis']) assert.ok(t[k] && !/undefined|NaN/.test(t[k]), `${lang} ${s.id} ${k}`);
        assert.equal(t.mesures.length, P.partis.textes.fr[s.id].mesures.length, `${lang} ${s.id} mesures`);
        assert.equal(t.nonModelise.length, P.partis.textes.fr[s.id].nonModelise.length, `${lang} ${s.id} non modélisé`);
      }
    }
  });

  if (!SANS_NOUVEAUX.includes(code)) test(`${code} partis : nouveaux curseurs nommés dans les quatre langues`, () => {
    for (const lang of I18N.CODES) {
      const u = I18N.outils(lang, P.devise);
      const L = P.textes[lang](u, P.modele, I18N.COMMUN[lang](u));
      for (const id of ['nouvellesDepenses', 'montee']) assert.ok(L.curseurs[id].f(3, P.modele.DEFAUTS), `${lang} ${id} format`);
      for (const id of ['nouvellesDepenses', 'montee']) assert.ok(L.curseurs[id] && L.curseurs[id].nom, `${lang} ${id}`);
    }
  });
}

test('es partis : traduction des chiffrages annoncés', () => {
  const { M, reglage, gain } = PAYS.es;
  const pt = M.BASE.pib / 100;
  const vox = reglage('vox');
  proche(-vox.prelevements * pt, 40, 1.5, 'Vox : IRPF à 40 Md€');
  proche(-M.effetIVA(vox), 14, 0.5, 'Vox : IVA à 14 Md€');
  proche(-M.effetImpot(vox), 10, 0.5, 'Vox : sociétés à 10 Md€');
  proche(-M.effetIVA(reglage('pp')), 1.9, 0.2, 'PP : IVA nulle sur l’alimentation');
  proche(-reglage('pp').prelevements * pt, 3.2, 0.5, 'PP : baisse de 3,2 Md€');
  // Logement à 1 % du PIB, plein effet en 4 ans.
  proche(gain('psoe', 2030), -17.5, 0.01, 'PSOE : 17,5 Md€ en 2030');
  proche(gain('psoe', 2028), -17.5 / 2, 0.01, 'PSOE : moitié en 2028');
  assert.ok(gain('sumar', 2030) > gain('psoe', 2030), 'Sumar : recettes en plus du logement');
});

test('de partis : traduction des chiffrages annoncés', () => {
  const { M, reglage, gain } = PAYS.de;
  const pt = M.BASE.pib / 100;
  proche(-reglage('afd').prelevements * pt, 44, 3, 'AfD : 44 Md€ d’allègements');
  // Budget alternatif : environ 147 Md€ d’emprunts en moins dès 2027.
  proche(gain('afd', 2027), 147, 5, 'AfD : 147 Md€ en 2027');
  proche(reglage('linke').prelevements * pt, 100, 3, 'Linke : impôt sur la fortune selon le DIW');
  proche(gain('koalition', 2030), 10 + 0.1 * pt, 0.5, 'coalition : économies et impôts');
  proche(gain('gruene', 2030), -3, 0.01, 'Verts : 3 Md€');
});

test('autres pays : traduction des chiffrages annoncés', () => {
  const pt = (c) => PAYS[c].M.BASE.pib / 100;
  const r = (c, id) => PAYS[c].reglage(id);
  proche(r('uk', 'labour').prelevements * pt('uk'), 6.5, 0.5, 'Labour : 0,2 % du PIB');
  proche(-r('uk', 'reform').prelevements * pt('uk'), 22.5, 2.5, 'Reform : 20 à 25 Md£');
  proche(PAYS.it.gain('governo', 2027), -13, 0.01, 'Italie : 13 Md€ dès 2027');
  proche(-r('pt', 'governo').prelevements * pt('pt'), 0.3, 0.05, 'Portugal : IRC 300 M€');
  proche(-r('pt', 'il').prelevements * pt('pt'), 1.6, 0.1, 'IL : 1,6 Md€');
  proche(-r('gr', 'syriza').prelevements * pt('gr'), 3, 0.2, 'SYRIZA : 3 Md€');
  proche(PAYS.gr.gain('pasok', 2031), -3.1, 0.01, 'PASOK : 3,1 Md€ à terme');
  proche(PAYS.gr.gain('pasok', 2027), -3.1 / 4, 0.01, 'PASOK : un quart la première année');
  proche(r('at', 'gruene').prelevements * pt('at'), 1.75, 0.25, 'Verts autrichiens : 1,5 à 2 Md€');
  proche(PAYS.at.gain('koalition', 2028), 2.5, 0.01, 'Autriche : 2,5 Md€ en 2028');
  proche(PAYS.be.gain('arizona', 2029), 10, 0.3, 'Arizona : 10 Md€ en 2029');
  proche(r('be', 'ptb').prelevements * pt('be'), 8, 0.2, 'PTB : 8 Md€');
  proche(PAYS.nl.gain('coalitie', 2030), 0.2 * pt('nl'), 0.3, 'coalition : +0,2 point de PIB selon le CPB');
  proche(r('nl', 'glpvda').prelevements * pt('nl'), 13.2, 0.3, 'GL-PvdA : 13,2 Md€');
});

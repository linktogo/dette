// Programmes des partis espagnols et allemands : réglages valides, textes complets
// et traduction cohérente avec les chiffrages annoncés.
const test = require('node:test');
const assert = require('node:assert/strict');
const I18N = require('../i18n.js');

const proche = (a, b, tol, msg) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg || ''} attendu ${b} ± ${tol}, obtenu ${a}`);

const PAYS = {
  es: { M: require('../es/model.js'), ids: ['psoe', 'pp', 'vox', 'sumar'] },
  de: { M: require('../de/model.js'), ids: ['koalition', 'afd', 'gruene', 'linke'] },
};
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

  test(`${code} partis : nouveaux curseurs nommés dans les quatre langues`, () => {
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

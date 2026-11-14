# Simulateurs de dette publique : France, Espagne, Allemagne, Royaume-Uni

Application web pédagogique pour explorer l'évolution de la dette publique de **2027 à 2036**, à partir d'un point de départ estimé fin 2026, pour quatre pays :

- **France** (`/fr/`) : dette de 115,6 % du PIB fin 2025 (Insee), point de départ 2026 d'après la Cour des comptes.
- **Espagne** (`/es/`) : dette de 100,8 % du PIB fin 2025 (Banco de España), point de départ 2026 d'après l'AIReF, leviers adaptés (IVA à 21 / 10 / 4 %, barème de l'IRPF, âge légal de 67 ans, MEI, SMI, ingreso mínimo vital…).
- **Allemagne** (`/de/`) : dette de 63,5 % du PIB fin 2025 (Bundesbank), point de départ 2026 d'après le Stabilitätsrat, programmes votés en 2025 (fonds spécial d'infrastructure de 500 Md€, défense à 3,5 % du PIB en 2029), baisse programmée de l'impôt sur les sociétés, Mindestlohn, retraite à 67 ans…
- **Royaume-Uni** (`/uk/`) : dette nette du secteur public (PSND) de 93,8 % du PIB fin mars 2026 (ONS), point de départ 2026-27 d'après l'OBR, en livres sterling et par exercice d'avril à mars ; gilts indexés sur l'inflation, triple verrou des pensions, National Living Wage, cotisations (NICs)…

L'interface est disponible en **français, anglais, espagnol et allemand** : sélecteur FR · EN · ES · DE en haut de chaque page. La langue est choisie par le paramètre `?lang=` de l'adresse, sinon par le dernier choix mémorisé, sinon par la langue du navigateur ; nombres et unités suivent la langue (Md€, €bn, mil M€, Mrd. €) et la devise du pays (livres sterling pour le Royaume-Uni).

La page d'accueil présente une tuile par pays : dette mesurée fin 2025, scénario tendanciel en 2036 avec sa courbe, déficit, charge d'intérêts et solde stabilisant, calculés en direct par les modèles. Un lien en haut de chaque simulateur permet de passer d'un pays à l'autre.

Modifiez les hypothèses économiques et budgétaires pour comparer les trajectoires de dette, de solde public et de charge d'intérêts. **Il s'agit d'une projection d'hypothèses, pas d'une prévision économique.**

## Lancer en local en une commande

Depuis la racine du dépôt, avec Node.js :

```sh
node dev-server.js
```

Ouvrez **http://localhost:8080**.

Ou, avec Docker démarré et Docker Compose installé :

```sh
bash deploy.sh
```

Ouvrez **http://localhost:8098**.

## Fonctionnalités

- Curseurs pour la croissance, l'inflation, les taux d'emprunt et la productivité.
- Réglages des dépenses par poste, des recettes fiscales, des retraites, de l'emploi, du SMIC et du revenu universel.
- Scénarios préréglés, graphiques et tableau année par année.
- France : programmes budgétaires de six partis (LFI, PS, Les Écologistes, Renaissance, LR, RN) en scénarios préréglés. Chaque programme reprend le chiffrage annoncé par le parti (contre-budgets et programmes de septembre à novembre 2026), traduit avec les curseurs et appliqué au tendanciel du simulateur. Une fiche liste les mesures reprises, celles qui ne le sont pas, les avis indépendants et les sources.
- Bandeau fixe en haut de l’écran : dès que les tuiles de résultats sortent de la vue (curseurs sur mobile, défilement), les chiffres clés de 2036 restent affichés et se mettent à jour à chaque mouvement de curseur.
- Indicateurs par habitant, en plus des ratios au PIB : dette et charge d’intérêts par habitant (tuiles, infobulles, tableau, page d’accueil) et dépenses par poste par habitant. La population suit une projection démographique par pays (Eurostat, INE, Destatis, ONS) sans effet sur la trajectoire de dette.
- Explication de la méthode, de ses limites et des sources dans l'interface.
- Partage d'un scénario en copiant l'URL : les réglages sont encodés dans son fragment, après `#`. Les anciens liens de partage à la racine sont redirigés vers `/fr/`, et `/espagne/` vers `/es/` (Nginx).

L'application est écrite en HTML, CSS et JavaScript, sans framework ni dépendance à installer. Les calculs sont effectués dans le navigateur ; aucun serveur applicatif ni base de données n'est nécessaire.

## Démarrage local

Prérequis : une version récente de Node.js (22 ou supérieure recommandée) et un navigateur moderne.

Depuis la racine du dépôt :

```sh
node dev-server.js
```

Ouvrez **http://localhost:8080**. Le serveur recharge automatiquement la page lors des modifications et actualise les styles CSS sans rechargement complet.

Pour choisir un autre port :

```sh
node dev-server.js 3000
```

La variable d'environnement `PORT` est également prise en charge. Arrêtez le serveur avec `Ctrl+C`. Ce serveur est destiné au développement ; utilisez Nginx pour le déploiement.

## Tests

Le modèle est testé avec le lanceur intégré à Node.js, sans installation de paquets :

```sh
node --test tests/*.test.js
```

Les tests vérifient notamment le point de départ, l'horizon de projection, les identités comptables, la transmission des taux d'intérêt et les effets des leviers.

## Déploiement avec Docker

Prérequis : Docker démarré et Docker Compose disponible (`docker compose` ou `docker-compose`).

Depuis la racine du dépôt :

```sh
bash deploy.sh
```

Le script détecte la commande Compose disponible et recrée le conteneur en arrière-plan. L'application est accessible sur **http://localhost:8098**.

La configuration utilise l'image `nginx:alpine` et monte les fichiers de l'application en lecture seule. Aucune étape de compilation n'est nécessaire. Le port hôte se règle dans [docker-compose.yml](./docker-compose.yml).

Commandes utiles avec Compose v2 :

```sh
docker compose ps
docker compose logs -f dette
docker compose down
```

Avec l'ancienne commande Compose, remplacez `docker compose` par `docker-compose`.

## Déploiement sur Raspberry Pi

Le script [deploy-to-pi.sh](./deploy-to-pi.sh) lance les tests, synchronise les fichiers par `rsync`, puis exécute le déploiement Docker via SSH.

1. Sur la machine locale, disposez de Node.js, `rsync` et d'un client SSH.
2. Sur le Raspberry Pi, installez Docker, Docker Compose et `rsync`. Le compte SSH doit pouvoir exécuter Docker.
3. Adaptez `PI_USER`, `PI_HOST` et `PI_PATH` dans le script à votre installation.
4. Depuis la racine du dépôt, lancez :

   ```sh
   bash deploy-to-pi.sh
   ```

L'application sera disponible à l'adresse `http://<adresse-du-pi>:8098`.

**Attention :** la synchronisation utilise `rsync --delete`. Utilisez un répertoire distant dédié : les fichiers absents du dépôt local peuvent y être supprimés, sauf ceux protégés par les exclusions du script. Un échec des tests annule le déploiement.

## Organisation du projet

| Fichier | Rôle |
| --- | --- |
| [index.html](./index.html), [accueil.js](./accueil.js) | Page d'accueil : une tuile par pays |
| [i18n.js](./i18n.js) | Langues : détection, sélecteur, formats de nombres et textes communs aux pages |
| [simulateur.js](./simulateur.js) | Moteur commun des simulateurs : curseurs, tuiles, graphiques, tableau, partage par URL |
| [style.css](./style.css) | Présentation et mise en page, commune aux pages |
| [charts.js](./charts.js) | Tracé des graphiques, commun aux simulateurs |
| [fr/](./fr/) | Simulateur français : `index.html`, `model.js` (hypothèses et calculs, utilisables dans le navigateur et sous Node.js), `textes.js` (structure des curseurs et textes en 4 langues), `sources.js` (références traduites), `partis.js` (programmes des partis : réglages, mesures et sources en 4 langues) |
| [es/](./es/), [de/](./de/), [uk/](./uk/) | Simulateurs espagnol, allemand et britannique, même organisation |
| [tests/](./tests/) | Tests des quatre modèles (`fr.test.js`, `es.test.js`, `de.test.js`, `uk.test.js`) et complétude des traductions (`i18n.test.js`) |
| [dev-server.js](./dev-server.js) | Serveur local avec rechargement automatique |
| [nginx.conf](./nginx.conf) | Service des fichiers statiques et revalidation du cache |
| [docker-compose.yml](./docker-compose.yml) | Configuration du conteneur Nginx |
| [deploy.sh](./deploy.sh) | Démarrage du déploiement Docker |
| [deploy-to-pi.sh](./deploy-to-pi.sh) | Tests, synchronisation et déploiement distant |

## Méthode et limites

Chaque année, la dette augmente du déficit : dépenses hors intérêts, plus intérêts, moins recettes. Le PIB évolue avec la croissance en volume et l'inflation ; les recettes suivent le PIB et les dépenses suivent les hypothèses choisies. Les montants du modèle sont exprimés en milliards d'euros, les taux et ratios en pourcentage.

Le modèle combine des références documentées dans [fr/sources.js](./fr/sources.js) et [es/sources.js](./es/sources.js) et des hypothèses propres à l'application, détaillées dans la rubrique **Méthode et limites**. Le point de départ fin 2026 est estimé et le scénario tendanciel n'est pas une prévision officielle.

Le modèle ne représente notamment pas l'effet des économies ou des hausses d'impôts sur la croissance, la réaction des taux au niveau de dette, les titres indexés sur l'inflation, les cessions d'actifs ni les écarts entre déficit et variation de dette.

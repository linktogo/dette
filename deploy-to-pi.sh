#!/bin/bash

# Configuration - Modifiez ces valeurs selon votre setup
PI_USER="xavier"
PI_HOST="10.0.0.228"
PI_PATH="~/dette"

cd "$(dirname "$0")" || exit 1

echo "🧪 Tests du modèle..."
node --test tests/*.test.js > /dev/null || { echo "❌ Tests en échec, déploiement annulé."; exit 1; }

echo "📦 Synchronisation des fichiers vers le Pi ($PI_HOST)..."
rsync -avz --delete --exclude '.git' --exclude '.claude' --exclude '.DS_Store' --exclude 'tests' \
    --exclude 'deploy-to-pi.sh' ./ $PI_USER@$PI_HOST:$PI_PATH || exit 1

echo "🐳 Lancement de Docker sur le Raspberry Pi..."
ssh $PI_USER@$PI_HOST "cd $PI_PATH && chmod +x deploy.sh && ./deploy.sh" || exit 1

echo "✨ Déploiement terminé : http://$PI_HOST:8098/"

#!/bin/bash
echo "🚀 Déploiement du simulateur de dette..."

# Détecter la commande docker compose
if command -v docker-compose &> /dev/null; then
    DOCKER_CMD="docker-compose"
else
    DOCKER_CMD="docker compose"
fi

$DOCKER_CMD up -d --force-recreate

echo "✨ Déploiement terminé ! Simulateur servi sur http://localhost:8098/"

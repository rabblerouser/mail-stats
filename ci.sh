#!/bin/bash
set -euo pipefail

COMMAND="${1:-usage}"
BUILD_NUMBER="${2:-latest}"

case "$COMMAND" in
  "build")
    echo 'Building backend image'
    cd ./backend && docker build --pull -t rabblerouser/mail-stats:${BUILD_NUMBER} .
    echo 'Building frontend image'
    cd ../frontend && docker build --pull -t rabblerouser/mail-stats-frontend:${BUILD_NUMBER} .
    cd ..
    echo 'Building frontend static assets'
    docker rm assets || true
    docker run --name assets rabblerouser/mail-stats-frontend:${BUILD_NUMBER} yarn build
    docker cp assets:/app/build assets
    ;;
  "test")
    echo 'Running backend linting and tests'
    docker run rabblerouser/mail-stats:${BUILD_NUMBER} yarn lint
    docker run rabblerouser/mail-stats:${BUILD_NUMBER} yarn test
    echo 'Running frontend linting and tests'
    docker run rabblerouser/mail-stats-frontend:${BUILD_NUMBER} yarn lint
    docker run -e CI=true rabblerouser/mail-stats-frontend:${BUILD_NUMBER} yarn test
    ;;
  "push")
    docker login -u "$DOCKER_USER" -p "$DOCKER_PASSWORD"
    echo 'Pushing backend image'
    docker push rabblerouser/mail-stats:${BUILD_NUMBER}
    echo 'Pushing frontend image (for dev purposes only)'
    docker push rabblerouser/mail-stats-frontend:${BUILD_NUMBER}
    ;;
  "usage")
    echo 'Usage (`tag` defaults to latest):'
    echo '  ./ci.sh build [tag]'
    echo '  ./ci.sh test'
    echo '  ./ci.sh push [tag]'
    exit 1 # So that CI doesn't pass if no command is specified
esac

#!/bin/bash
set -euo pipefail

COMMAND="${1:-usage}"
BUILD_NUMBER="${2:-latest}"

case "$COMMAND" in
  "build")
    cd ./backend && docker build --pull -t rabblerouser/mail-stats:${BUILD_NUMBER} .
    cd ../frontend && docker build --pull -t rabblerouser/mail-stats-frontend:${BUILD_NUMBER} .
    cd ..
    ;;
  "test")
    docker run rabblerouser/mail-stats yarn lint
    docker run rabblerouser/mail-stats yarn test
    docker run rabblerouser/mail-stats-frontend yarn lint
    docker run -e CI=true rabblerouser/mail-stats-frontend yarn test
    ;;
  "push")
    docker login -u "$DOCKER_USER" -p "$DOCKER_PASSWORD"
    docker push rabblerouser/mail-stats:${BUILD_NUMBER}
    docker push rabblerouser/mail-stats-frontend:${BUILD_NUMBER}
    ;;
  "usage")
    echo 'Usage (`tag` defaults to latest):'
    echo '  ./ci.sh build [tag]'
    echo '  ./ci.sh test'
    echo '  ./ci.sh push [tag]'
    exit 1 # So that CI doesn't pass if no command is specified
esac

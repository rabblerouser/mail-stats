#!/bin/bash
set -euo pipefail

APP_NAME='mail-stats'
COMMAND="${1:-usage}"
BUILD_NUMBER="${2:-latest}"

function build() {
  echo 'Building backend image'
  cd ./backend && docker build --pull -t rabblerouser/${APP_NAME}:${BUILD_NUMBER} .
  echo 'Building frontend image'
  cd ../frontend && docker build --pull -t rabblerouser/${APP_NAME}-frontend:${BUILD_NUMBER} .
  cd ..
  echo 'Building frontend static assets'
  docker rm assets || true
  docker run --name assets rabblerouser/${APP_NAME}-frontend:${BUILD_NUMBER} yarn build
  docker cp assets:/app/build assets
}

function test() {
  echo 'Running backend linting and tests'
  docker run rabblerouser/${APP_NAME}:${BUILD_NUMBER} yarn lint
  docker run rabblerouser/${APP_NAME}:${BUILD_NUMBER} yarn test
  echo 'Running frontend linting and tests'
  docker run rabblerouser/${APP_NAME}-frontend:${BUILD_NUMBER} yarn lint
  docker run -e CI=true rabblerouser/${APP_NAME}-frontend:${BUILD_NUMBER} yarn test
}

function push() {
  echo 'Pushing backend image'
  docker push rabblerouser/${APP_NAME}:${1}
  echo 'Pushing frontend image (for dev purposes only)'
  docker push rabblerouser/${APP_NAME}-frontend:${1}
  echo 'Uploading assets to S3 artifact bucket'
  aws s3 cp --recursive assets s3://rabblerouser-artefacts/frontends/${APP_NAME}-frontend/${1}
}

case "$COMMAND" in
  'build')
    build
    ;;
  'test')
    test
    ;;
  'push')
    docker login -u "$DOCKER_USER" -p "$DOCKER_PASSWORD"
    push ${BUILD_NUMBER}
    if [[ ${BUILD_NUMBER} != 'latest' ]]; then
      echo 'Also pushing artifacts as latest version'
      docker tag rabblerouser/${APP_NAME}:${BUILD_NUMBER} rabblerouser/${APP_NAME}:latest
      docker tag rabblerouser/${APP_NAME}-frontend:${BUILD_NUMBER} rabblerouser/${APP_NAME}-frontend:latest
      push latest
    fi
    ;;
  'usage')
    echo 'Usage (`tag` defaults to latest):'
    echo '  ./ci.sh build [tag]'
    echo '  ./ci.sh test'
    echo '  ./ci.sh push [tag]'
    exit 1 # So that CI doesn't pass if no command is specified
esac

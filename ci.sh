#!/bin/bash
set -euo pipefail

VERSION="${TRAVIS_BUILD_NUMBER}"
BACKEND_IMAGE='rabblerouser/mail-stats'
FRONTEND_IMAGE='rabblerouser/mail-stats-frontend'
S3_DESTINATION="s3://rabblerouser-artefacts/frontends/mail-stats-frontend/${TRAVIS_BUILD_NUMBER}"

echo 'Building and testing backend'
cd backend
docker build --pull -t ${BACKEND_IMAGE} .
docker tag ${BACKEND_IMAGE} ${BACKEND_IMAGE}:${VERSION}
docker run ${BACKEND_IMAGE} yarn lint
docker run ${BACKEND_IMAGE} yarn test
cd ..

echo 'Building and testing frontend'
cd frontend
docker build --pull -t ${FRONTEND_IMAGE} .
docker tag ${FRONTEND_IMAGE} ${FRONTEND_IMAGE}:${VERSION}
docker run ${FRONTEND_IMAGE} yarn lint
docker run -e CI=true ${FRONTEND_IMAGE} yarn test
docker run --name assets ${FRONTEND_IMAGE} yarn build
docker cp assets:/app/build assets
cd ..

if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then
  echo 'Publishing backend and frontend'
  docker login -u "$DOCKER_USER" -p "$DOCKER_PASSWORD"
  docker push ${BACKEND_IMAGE}
  docker push ${FRONTEND_IMAGE}
  aws s3 cp --recursive frontend/assets ${S3_DESTINATION}
fi

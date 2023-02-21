#!/bin/bash

DOMAIN=niranken.tk
SUBDOMAIN=simple-travel-diary
AWS_ACCOUNT_ID=566953860209
GOOGLE_CLIENT_ID=dummyGoogleClientId
GOOGLE_CLIENT_SECRET=dummyGoogleClientSecret
GOOGLE_COGNITO_SERCRET_NAME=develop/dummyApp/dummySecret
API_STACK_JSON=MyStaticSiteSimpleTravelDiaryApiStackCEB80DE7.template.json

if [ "$1" = "synth" ] || [ "$1" = "diff" ] || [ "$1" = "bootstrap" ]; then
  cdk $1 \
    -c domain=${DOMAIN}\
    -c subdomain=${SUBDOMAIN}\
    -c accountId=${AWS_ACCOUNT_ID}\
    -c googleClientId=${GOOGLE_CLIENT_ID}\
    -c googleClientSecret=${GOOGLE_CLIENT_SECRET}\
    -c googleClientSecretName=${GOOGLE_CLIENT_SECRET_NAME}
elif [ "$1" = "--help" ]; then
  cdk --help
elif [ "$1" = "start-api" ]; then
  # sam local start-api -t ./cdk.out/${API_STACK_JSON}
  sam local start-api -t ./cdk.out/${API_STACK_JSON} -n lambda/.env.local.json
else
  echo "you cannot execute \"cdk $1\" command in your local environment."
  echo "you can only execute \"cdk synth\", \"cdk diff\", and \"cdk --help\" in your local."
  exit 1
fi
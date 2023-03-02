#!/bin/bash

# ---
# please fill the parameters below,
# and create cdk-wrapper.sh in your local environment.
# cdk-wrapper.sh is not committed because it's contained in ".gitignore" file.
# --- 

DOMAIN=dummy.com
SUBDOMAIN=sub
AWS_ACCOUNT_ID=XXXXXXXXXXXX
GOOGLE_CLIENT_ID=dummyGoogleClientId
GOOGLE_CLIENT_SECRET=dummyGoogleClientSecret
GOOGLE_COGNITO_SERCRET_NAME=develop/dummyApp/dummySecret

if [ "$1" = "synth" ] || [ "$1" = "diff" ]; then
  cdk $1 \
    -c domain=${DOMAIN}\
    -c subdomain=${SUBDOMAIN}\
    -c accountId=${AWS_ACCOUNT_ID}\
    -c googleClientId=${GOOGLE_CLIENT_ID}\
    -c googleClientSecret=${GOOGLE_CLIENT_SECRET}\
    -c googleCognitoSecretName=${GOOGLE_COGNITO_SERCRET_NAME}
elif [ "$1" = "--help" ]; then
  cdk --help
else
  echo "you cannot execute \"cdk $1\" command in your local environment."
  echo "you can only execute \"cdk synth\", \"cdk diff\", and \"cdk --help\" in your local."
  exit 1
fi
#!/bin/sh

APP_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

sed -i "s/TPL_FORTIFY_CLIENT_TOKEN/$FORTIFY_CLIENT_TOKEN/g" ./fortify.properties
cp ./fortify.properties /etc/fortify/fortify.properties
java -jar /etc/fortify/fortify-api.jar create -name $APP_NAME -version master
/opt/fortify/bin/sourceanalyzer -Xmx2g -b master src/ -exclude **/node_modules **/*.js
/opt/fortify/bin/cloudscan -url https://fortifycontroller.luizalabs.com/cloud-ctrl start -upload -uptoken $FORTIFY_TOKEN -application $APP_NAME -version master -b master -scan

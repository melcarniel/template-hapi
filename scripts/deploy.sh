# Clear lock files
rm -f package-lock.json
rm -f yarn.lock

# Download Teresa
wget "$TERESA_CLI_URL" -q

# Install Teresa
mv ./teresa-linux-amd64 teresa
chmod +x ./teresa

# Config Teresa
./teresa config set-cluster $CI_ENVIRONMENT_NAME --server $CLUSTER_URL --tls --current
./teresa config use-cluster $CI_ENVIRONMENT_NAME
echo $TERESA_PASSWORD_CI | ./teresa login --user $TERESA_USER_CI

# Get App Version and Name
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

# Init Deploy
./teresa deploy create . --app $APP_NAME --description "Deploy GITLAB CI ${CI_COMMIT_REF_NAME} - ${PACKAGE_VERSION}" --cluster $CI_ENVIRONMENT_NAME --no-input

# Check Status
./teresa app info $APP_NAME --cluster $CI_ENVIRONMENT_NAME | grep Name

# Send Slack Message
curl -s -X POST --data-urlencode "payload={\"channel\": \"#$SLACK_CHANNEL\",  \"text\": \"> $APP_NAME (v$PACKAGE_VERSION)\nDeploy finalizado em [$CI_ENVIRONMENT_NAME]\n$CI_PIPELINE_URL.\"}" $SLACK_HOOK

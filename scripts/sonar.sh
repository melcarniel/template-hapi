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

node_modules/.bin/sonar-scanner -Dsonar.host.url=$SONAR_HOST_URL -Dsonar.projectVersion=$PACKAGE_VERSION 
-Dsonar.login=$SONAR_SECRET_TOKEN -Dsonar.projectKey=$APP_NAME -Dsonar.projectName=$APP_NAME -Dsonar.gitlab.commit_sha=$CI_COMMIT_SHA 
-Dsonar.gitlab.ref_name=$CI_COMMIT_REF_NAME -Dsonar.gitlab.project_id=$CI_PROJECT_ID -Dsonar.gitlab.ci_merge_request_iid=$CI_MERGE_REQUEST_IID 
-Dsonar.qualitygate.wait=true
#! /bin/bash

######### Removing existing .env file ######################
rm .env

######## Finalising target environment #####################
read -p "Enter target server Dev/Uat/Prod?:" target_server
target_server_caps=`echo ${target_server} | tr '[a-z]' '[A-Z]'`
echo ${target_server_caps}


if [ "$target_server_caps" = 'DEV' ]; then
    cp 'env_dev' '.env'
    cp './src/config_dev.json' './src/config.json'
elif [ "$target_server_caps" = 'UAT' ]; then
    cp 'env_uat' '.env'
    cp './src/config_uat.json' './src/config.json'
elif [ "$target_server_caps" = 'PROD' ]; then
    cp 'env_prod' '.env'
    cp './src/config_prod.json' './src/config.json'
else
    echo "ERROR: Please re-run the script and choose proper options"
    exit 1
fi

if [ ! -f '.env' ]
then 
  echo "ERROR: seems like environment file is missing"
fi

cp 'envrc' '.envrc'
if [ ! -f '.envrc' ]
then 
  echo "ERROR: seems like environment file - .envrc is missing"
fi

####################################
########### VARIABLES ##############
####################################
GCP_PROJECT=aqai-farm-dashboard
SERVICE_NAME=`grep CLOUD_RUN_ORDERS_SERVICE_NAME '.env' | awk -F"=" '{ print $2 }'`
REGION=us-central1

####################################
###### GENERATED VARIABLES #########
####################################
VERSION="$(yarn run env | grep npm_package_version | sed 's/"npm_package_version": "//g' | sed 's/",//g' | sed 's/ //g')"
IMAGE_NAME="gcr.io/$GCP_PROJECT/$SERVICE_NAME"
IMAGE_NAME_VERSION="$IMAGE_NAME:$VERSION"
IMAGE_NAME_LATEST="$IMAGE_NAME:latest"

####################################
###### SERVICE ACCOUNT LOGIN #######
####################################
gcloud auth activate-service-account aqai-farm-dashboard@aqai-farm-dashboard.iam.gserviceaccount.com \
  --key-file=aqai-farm-dashboard-c63c332c8d1e.json

####################################
############# BUILD ################
####################################
echo "Create Docker image via 'Cloud Build' ..."
gcloud builds submit  \
  --tag "$IMAGE_NAME_VERSION" \
  --project $GCP_PROJECT

####################################
############ TAGGING ###############
####################################
echo "Add tags '$IMAGE_NAME_LATEST' and '$IMAGE_NAME_VERSION' to docker image..."
gcloud container images add-tag "$IMAGE_NAME_VERSION" $IMAGE_NAME_LATEST --quiet

####################################
########### DEPLOYMENT #############
####################################
echo "Deploying Cloud Run Service '$SERVICE_NAME' to '$GCP_PROJECT' in '$REGION'  🚀 🍀"
gcloud run deploy $SERVICE_NAME \
  --image "$IMAGE_NAME_VERSION" \
  --project $GCP_PROJECT \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated
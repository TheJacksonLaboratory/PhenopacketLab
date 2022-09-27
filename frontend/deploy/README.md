# Phenopacket Lab Deployment


## Existing Deployment on GCP



## Source Code Checkout

```

git clone https://github.com/TheJacksonLaboratory/PhenopacketLab.git

# Or ssh
git@github.com:TheJacksonLaboratory/PhenopacketLab.git

```

## GCP: Build/Push Image
You must edit the docker file to provide the secret key when the image is built.
Key comes from google console->Cloud Storage->Settings->INTEROPERABILITY

Build from repository directory.

```
# Here we set project to be a variable
export GPROJECT=jax-robinson-phenopacket	
export CLUSTER=cluster-1
export NAMESPACE=dev
export TEMPORAL_NAME=img-temporal

# May need to start docker if using minikube
minikube starteval $(minikube docker-env)
eval $(minikube docker-env)

```

```
docker build -t gcr.io/$GPROJECT/phenopacketlab-frontend:1.1.0 -f deploy/Dockerfile .

docker push gcr.io/$GPROJECT/phenopacketlab-frontend:1.1.0
```

## Run Locally
```
docker run -it -p 8080:8080 gcr.io/$GPROJECT/phenopacketlab-frontend:1.1.0
```

## Deploy to GCP

### Ensure Connection to Tools
```
# Make sure right project
gcloud init

# kubectl
gcloud components install kubectl
gcloud container clusters get-credentials $CLUSTER --zone us-east1-b --project $GPROJECT

# Docker
gcloud auth configure-docker

# namespace
kubectl create namespace $NAMESPACE
```

### Deploy!
```
# Delete old one before redeploy
kubectl -n $NAMESPACE delete -f deploy/frontend.yaml

kubectl -n $NAMESPACE apply -f deploy/frontend.yaml

# Create a load balancer
kubectl -n $NAMESPACE expose deployment phenopacketlab-frontend --port=80 --target-port=4200 --type=LoadBalancer

# See pods
kubectl -n $NAMESPACE get pods

# See logs (last argument is pod name)
kubectl -n $NAMESPACE logs phenopacketlab-frontend-xxxxxxxxxx-xxxxx

```
## Kubernetes
### How to SSH

```
kubectl -n $NAMESPACE get pods

# Where phenopacketlab-frontend-7cf5fc764f-vqm66 is the pod name.
kubectl -n $NAMESPACE exec -it phenopacketlab-frontend-7cf5fc764f-vqm66 -- /bin/bash
```

Or if running locally:

```
docker ps | grep gweaver # Get gweaver process e.g. "musing_mestorf"
docker exec -it musing_mestorf /bin/bash
```

### How to forward port
```
kubectl -n $NAMESPACE port-forward svc/postgresql-1636389993 5432:5432

# Then connect to postgres on local host.

```

## Using GCP to Interact with Postgesql
* See: https://cloud.google.com/sql/docs/postgres/quickstart
* Enable Cloud SQL Client role on your user account.
* Enable interface: https://console.cloud.google.com/apis/api/sqladmin.googleapis.com/overview?project=$GPROJECT
* Install cloud sql to gcloud CLI: https://cloud.google.com/sql/docs/mysql/sql-proxy#macos-64-bit

```
cloud_sql_proxy -instances=$GPROJECT:us-east1:mpd-metasoft-analysis-plotting-database-vpc-1=tcp:5432
# (starts a proxy)
```
Open pgAdmin UI pointing to localhost, the above proxy looks after the connection.

Alternatively:

```
gcloud sql connect mpd-metasoft-analysis-plotting-database-vpc-1 -u postgres


```


## Appendix A - Secret file for Kubernetes

``` yaml

# Kubernetes secret for connecting to Postgres Cloud SQL
# Create secret with:
# kubectl -n temporal apply -f cloud-sql-database.yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-sql-secret
type: Opaque
data:

# These keys are base64 encoded for some reason.
# Value of ..... given from: echo -n '#VALUE!' | openssl base64
  username: .....
  password: .....
  
```

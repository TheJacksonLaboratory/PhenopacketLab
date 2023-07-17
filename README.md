# PhenopacketLab

![Backend Build & Tests](https://github.com/TheJacksonLaboratory/PhenopacketLab/actions/workflows/backend-ci.yml/badge.svg)
![Frontend Build & Tests](https://github.com/TheJacksonLaboratory/PhenopacketLab/actions/workflows/frontend-ci.yml/badge.svg)

This Maven project is a project to show how an Angular/Springboot application can provide UIs that could be used for the Phenopacket software. The project is made of an Angular part (Frontend) and a Java Spring Boot part (`phenopacketlab-restapi`). 

The Single-page application can be accessed at the following URL (dev version): https://phenopacketlab-dev.jax.org
The Spring Boot RESTful API which serves the application with all the necessary ontologies can be found at this URL: https://phenopacketlab-dev.jax.org/swagger-ui/index.html

The project can be deployed in  multiple ways: 
* frontend dist folder can be deployed by being copied in a Web server and the backend can be deployed as a war file.
* frontend and backend can be both deployed in a single war file on a server.
* frontend and backend can be packaged in an executable file that contains a Tomcat EE instance and that is used to serve the application.

Below are some screenshots of the running application:

The welcome screen:
![Alt text](/resources/welcome-screenshot.png?raw=true)

The phenopacket table with a list of phenopackets:
![Alt text](/resources/phenopacket-list-screenshot.png?raw=true)

The Phenopacket creator stepper:
![Alt text](/resources/phenopacket-creator-screenshot.png?raw=true)

The phenotypic feature creation step with text mining feature:
![Alt text](/resources/text-mining-screenshot.png?raw=true)

The disease creation step with text search:
![Alt text](/resources/disease-screenshot.png?raw=true)

## Build from sources

Build the source code by running:

```bash
cd PhenopacketLab
./mvnw clean package
```

## Setup *PhenopacketLab* data directory

*PhenopacketLab* backend requires several data files to be present to run. The data directory is set up in two steps: 
- download non-ontology resources
- preprocess ontologies

Note, an `obographs-cli` and `robot` JAR files are required for setup. Check out [Obographs](https://github.com/geneontology/obographs) 
and [ROBOT](https://robot.obolibrary.org/) to get ahold of the executable JARs.

Run the following to set up the data directory:

```shell
OBOGRAPHS_JAR=/Users/elkasb/software-dep/obographs-cli-0.3.0.jar
ROBOT_JAR=/Users/elkasb/software-dep/robot-1.9.1.jar
PLAB_DATADIR=/Users/elkasb/data/phenopacket-lab
PLAB_VERSION=0.1-SNAPSHOT

# 0 - Build the app
#cd PhenopacketLab
./mvnw --projects phenopacketlab-restapi --also-make --batch-mode package

# 1 - Download non-ontology resources
java -jar phenopacketlab-ingest/target/phenopacketlab-ingest-${PLAB_VERSION}.jar ingest ${PLAB_DATADIR}

# 2 - Preprocess ontologies
bash scripts/preprocess-ontologies.sh --data-directory ${PLAB_DATADIR} --obographs-jar ${OBOGRAPHS_JAR} --robot-jar ${ROBOT_JAR}
```

If not already present, the command will create the `path/to/phenopacket-lab` folder including missing parent directories.
The and download the data files into the folder.

## Run *PhenopacketLab* backend

If using any environment besides local (datastore-emulator) and not on a cloud service you need to set
google application credentials for svc-jax-phenopacket for datastore:

```bash
GOOGLE_APPLICATION_CREDENTIALS="/path/to/private/key"
```

Spool up the backend by running:

```bash
./mvnw clean package

PL_VERSION=0.1-SNAPSHOT
PL_JAR=phenopacketlab-restapi/target/phenopacketlab-restapi-${PL_VERSION}.jar
PL_DATADIR=path/to/phenopacket-lab
PL_PROFILE=development
java -Dspring.profiles.active=${PL_PROFILE} -Dphenopacketlab.data-directory=${PL_DATADIR} -jar ${PL_JAR} 
```

By default, backend serves requests at `localhost:8080`, and the frontend will be at `localhost:4200`.

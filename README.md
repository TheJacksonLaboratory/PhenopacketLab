# PhenopacketLab

[![Java CI with Maven](https://github.com/TheJacksonLaboratory/PhenopacketLab/workflows/Java%20CI%20with%20Maven/badge.svg)](https://github.com/TheJacksonLaboratory/PhenopacketLab/actions/workflows/maven.yml)

This Maven project is a test project to show how an Angular/Springboot application can provide UIs that could be used for the Phenopacket software. The project is made of an Angular part (Frontend) and a Java Spring Boot part (`phenopacketlab-restapi`). 

The project can be deployed in  multiple ways: 
* frontend dist folder can be deployed in a Tomcat container and the backend can be deployed as a war file.
* frontend and backend can be both deployed in a single war file on a server.
* frontend and backend can be packaged in an executable file that contains a Tomcat EE instance and that is used to serve the application.

Below are some screenshots of the running application:

The welcome screen:
![Alt text](/resources/welcome-screenshot.png?raw=true)

The Phenotypic Feature GUI:
![Alt text](/resources/phenotypic-feature-screenshot.png?raw=true)

The Selectable Ontology Tree:
![Alt text](/resources/selectable-ontology-screenshot.png?raw=true)

The Simple Ontology Tree:
![Alt text](/resources/simple-ontology-screenshot.png?raw=true)


## Build from sources

Build the source code by running:

```bash
cd PhenopacketLab
./mvnw clean package
```

## Setup *PhenopacketLab* data directory

*PhenopacketLab* backend requires several data files to be present to run. The data directory is setup in two steps: 
- download non-ontology resources
- preprocess ontologies

Note, an `obographs-cli` and `robot` JAR files are required for setup. Check out [Obographs](https://github.com/geneontology/obographs) 
and [ROBOT](https://robot.obolibrary.org/) to get ahold of the executable JARs.

Run the following to set up the data directory:

```shell
OBOGRAPHS_JAR=path/to/obographs-cli.jar
ROBOT_JAR=path/to/robot.jar
PLAB_DATADIR=path/to/phenopacket-lab
PLAB_VERSION=0.1-SNAPSHOT

# 0 - Build the app
cd PhenopacketLab
./mvnw --projects phenopacketlab-restapi --also-make --batch-mode package

# 1 - Download non-ontology resources
java -jar phenopacketlab-ingest/target/phenopacketlab-ingest-${PLAB_VERSION}.jar ingest ${PLAB_DATADIR}

# 2 - Preprocess ontologies
bash scripts/preprocess-ontologies.sh --data-directory ${PLAB_DATADIR} --obographs-jar ${OBOGRAPHS_JAR} --robot-jar ${ROBOT_JAR}
```

If not already present, the command will create the `path/to/phenopacket-lab` folder including missing parent directories.
The and download the data files into the folder.

## Run *PhenopacketLab* backend

Spool up the backend by running:

```bash
./mvnw clean package

PL_VERSION=0.1-SNAPSHOT
PL_JAR=phenopacketlab-restapi/target/phenopacketlab-restapi-${PL_VERSION}.jar
PL_DATADIR=path/to/phenopacket-lab
PL_PROFILE=development
java -Dspring.profiles.active=${PL_PROFILE} -Dphenopacketlab.data-directory=${PL_DATADIR} -jar ${PL_JAR} 
```

By default, backend serves requests at `localhost:8080`.

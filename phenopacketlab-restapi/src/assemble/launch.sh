#!/bin/sh
# Run the app in the following

# Path to phenopacket data directory prepared by the ingest module and the `scripts/preprocess-ontologies.sh`.
DATA_DIRECTORY=path/to/data/di
# The app's profile.
PROFILE=development

java -Dspring.profiles.active=${PROFILE} \
-Dphenopacketlab.data-directory=${DATA_DIRECTORY} \
-classpath "lib/*" org.monarchinitiative.phenopacketlab.restapi.Application

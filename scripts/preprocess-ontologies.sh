#!/bin/bash

#######################################    README    ###################################################################
# A script for downloading ontology OWL files and conversion the OWLs to JSON (Obographs) format.
#
# The script requires obographs-cli JAR.
#
########################################################################################################################

VERSION="v0.0.1"

###
# Ontology permanent URLs.
EFO_PURL=http://www.ebi.ac.uk/efo/efo.owl
GENO_PURL=http://purl.obolibrary.org/obo/geno.owl
HP_PURL=http://purl.obolibrary.org/obo/hp.owl
MONDO_PURL=http://purl.obolibrary.org/obo/mondo.owl
SO_PURL=http://purl.obolibrary.org/obo/so.owl
UBERON_PURL=http://purl.obolibrary.org/obo/uberon.owl
NCIT_PURL=http://purl.obolibrary.org/obo/ncit.owl
GSSO_PURL=http://purl.obolibrary.org/obo/gsso.owl
UO_PURL=http://purl.obolibrary.org/obo/uo.owl

ONTOLOGIES=(
    "${EFO_PURL}"
    "${GENO_PURL}"
    "${HP_PURL}"
    "${MONDO_PURL}"
    "${SO_PURL}"
    "${UBERON_PURL}"
    "${NCIT_PURL}"
    "${GSSO_PURL}"
    "${UO_PURL}"
  )

check () {
  ###
  # Check we have obograph JAR file.
  if [ -f "${OBOGRAPHS_JAR}" ]; then
    printf "Using obographs JAR at '%s'.\n" "${OBOGRAPHS_JAR}"
  else
    ERROR=true
    printf "Missing obographs JAR!\n"
  fi

  ###
  # Check we have the data directory and it points an existing directory.
  if [ -z "${DATA_DIR}" ]; then
    ERROR=true
    printf "Missing '-d | --data-directory' parameter!\n"
  fi
  if [ ! -d "${DATA_DIR}" ]; then
    printf "Creating non-existing data directory at '%s'.\n" "${DATA_DIR}"
    mkdir -p "${DATA_DIR}"
  fi

  ###
  # Check we have Java on the system.
  if [ -z "${JAVA}" ]; then
          [ -z "${JAVA_HOME}" ] && JAVA_HOME="/usr"
          [ ! -f "${JAVA}" ] && JAVA="${JAVA_HOME}/bin/java"
          [ ! -f "${JAVA}" ] && JAVA="java"
  fi
  if [ -z "${JAVA}" ]; then
    ERROR=true
    printf "Did not find Java in the environment!\n";
  else
    printf "Using Java at '%s'.\n" "${JAVA}"
  fi

  if [ "$ERROR" = true ]; then exit 1; fi
}

download () {
  PURL=$1
  DESTINATION=$2
  if [ ! -f "${DESTINATION}" ] || [ "$OVERWRITE" = true ]; then
    printf "\nDownloading %s to '%s'.\n" "${PURL}" "${DESTINATION}"
    if [ "${PURL}" == "${GSSO_PURL}" ]; then
      # GSSO requires a special gentle touch.
      ${JAVA} -jar ${ROBOT_JAR} extract --input-iri "${PURL}" \
        --term http://purl.obolibrary.org/obo/GSSO_009468 \
        --output "${DESTINATION}" \
        --method TOP \
        --copy-ontology-annotations true
    else
      curl --location --output "${DESTINATION}" "${PURL}"
    fi
    # TODO - remove if UO is fixed
#    if [ "${PURL}" == "${UO_PURL}" ]; then
#      fix_unit_ontology "${DESTINATION}"
#    fi
  else
    printf "\nSkipping download of existing '%s'" "${DESTINATION}"
  fi
}

fix_unit_ontology () {
  # A hack to add missing 'dc' namespace into the Units of Measurement Ontology (UO)
  # TODO - remove if UO is fixed
  TARGET="xmlns:rdfs=\"http:\/\/www.w3.org\/2000\/01\/rdf-schema#\">"
  REPLACE_WITH="xmlns:dc=\"http:\/\/purl.org\/dc\/elements\/1.1\/\" ${TARGET}"
  SOURCE=${1}
  printf "Fixing UO at '%s'\n" "${SOURCE}"
  mv "${SOURCE}" temp.owl
  EXP="s/${TARGET}/${REPLACE_WITH}/"
  sed -e "${EXP}" temp.owl > "${SOURCE}"
  rm temp.owl
}


convert () {
  LOCAL_OWL=$1
  printf "\nConverting OWL %s to JSON\n" "${LOCAL_OWL}"
  ${JAVA} -jar "${OBOGRAPHS_JAR}" convert -f json "${LOCAL_OWL}"
  if [ "$?" != 0 ]; then
    printf "Did not work out well\n"
    exit 1;
  fi
  rm "${LOCAL_OWL}"
}

run () {
  ### Download and preprocess ontology OWL files
  printf "Downloading ontologies into '%s'\n" "${DATA_DIR}"
  for PURL in "${ONTOLOGIES[@]}"
  do
      FILE_NAME=${PURL##*/}
      LOCAL_OWL="${DATA_DIR}/${FILE_NAME}"
      LOCAL_JSON="${LOCAL_OWL%.owl}.json"
      if [ ! -f "${LOCAL_JSON}" ] || [ "$OVERWRITE" = true ]; then
        download "${PURL}" "${LOCAL_OWL}"
        convert "${LOCAL_OWL}"
      else
        printf "Skipping already existing '%s'\n" "${LOCAL_JSON}"
      fi
  done

  printf "Done!\n"
}

usage () {
printf "%s %s

USAGE:
  -d | --data-directory 	Where to store the preprocessed files
  -w | --overwrite		Force overwrite the files
  --obographs-jar		Path to obographs JAR file
  --robot-jar 	                Path to ROBOT JAR file
  -h | --help		        Print this message
  --version			Print version of script\n\n" "$(basename ${0%.sh})" "${VERSION}"
}

######################## MAIN ####################### MAIN ####################
if [ "$1" = "" ]; then
  printf "No parameter provided! \n"; usage; exit 1
else
  while [ "$1" != "" ]; do
    case $1 in
      -d | --data-directory ) shift; DATA_DIR=$1;;
      -w | --overwrite ) OVERWRITE=true;;
      --robot-jar ) shift; ROBOT_JAR=$1;;
      --obographs-jar ) shift; OBOGRAPHS_JAR=$1;;
      -h | --help ) usage; exit 0;;
      --version ) echo "$(basename "${0%.sh}") $VERSION"; exit 0;;
      *) printf "Unknown parameter: %s\n", "${1}"; usage; exit 1;;
    esac
    shift
  done
fi

## TRAP - what to do when Ctrl+C is pressed
trap 'printf "\nSIGINT captured. Abort...\n"; exit 1' INT

## The main script logic
check;
run;

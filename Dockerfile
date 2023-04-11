# Set up running image
FROM openjdk:17-alpine

ENV config=development
ENV build_version=0.1-SNAPSHOT
ENV data_path=/data
ENV JAVA_OPTS="-XX:PermSize=4096 -XX:MaxPermSize=1024"

# get data from google cloud storage
FROM google/cloud-sdk:alpine as gcloud
# WORKDIR /app
ARG KEY_FILE_CONTENT
RUN echo $KEY_FILE_CONTENT | gcloud auth activate-service-account --key-file=- \
  && gsutil cp -r gs://jax-robinson-phenopacket-project-data/data .
# FROM <FINAL LAYER>
# COPY --from=gcloud /app/<myFile> .

# copy datapath
#ADD ${data_path} ${data_path}
# copy jar
COPY phenopacketlab-restapi/target/phenopacketlab-restapi-${build_version}.jar .

# They are big do not leave them in image.
# This is probably not required
#RUN rm -rf ${work_dir}/src

RUN echo $(pwd)
RUN echo $(ls)
RUN echo "java -Dspring.profiles.active=${config} -Dphenopacketlab.data-directory=${data_path} -jar phenopacketlab-restapi-${build_version}.jar"

CMD ["sh", "-c", "java -Dspring.profiles.active=${config} -Dphenopacketlab.data-directory=${data_path} -jar phenopacketlab-restapi-${build_version}.jar"]
EXPOSE 8080/tcp



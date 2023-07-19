# Set up running image
FROM openjdk:17-alpine

ARG SPRING_ACTIVE_PROFILE_ARG
ARG VERSION_ARG
ENV SPRING_ACTIVE_PROFILE=${SPRING_ACTIVE_PROFILE_ARG}
ENV build_version=${VERSION_ARG}
ENV data_path=/data
#ENV JAVA_OPTS="-XX:PermSize=4096 -XX:MaxPermSize=1024"

# copy datapath
ADD ${data_path} ${data_path}
# copy jar
COPY phenopacketlab-restapi/target/phenopacketlab-restapi-${build_version}.jar .

# They are big do not leave them in image.
# This is probably not required
#RUN rm -rf ${work_dir}/src

RUN echo $(pwd)
RUN echo $(ls)
RUN echo "java -Xmx6g -Xms1024m -Dspring.profiles.active=${SPRING_ACTIVE_PROFILE} -Dphenopacketlab.data-directory=${data_path} -jar phenopacketlab-restapi-${build_version}.jar"

CMD ["sh", "-c", "java -Xmx6g -Xms1024m -Dspring.profiles.active=${SPRING_ACTIVE_PROFILE} -Dphenopacketlab.data-directory=${data_path} -jar phenopacketlab-restapi-${build_version}.jar"]
EXPOSE 8080/tcp



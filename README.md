# Phenopacket Angular/Spring Boot Prototype

This Maven project is a test project to show how an Angular/Springboot application can provide UIs that could be used for the Phenopacket software. The project is made of an Angular part (Frontend) and a Java Spring Boot part (phenopacketlab-restapi). 

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



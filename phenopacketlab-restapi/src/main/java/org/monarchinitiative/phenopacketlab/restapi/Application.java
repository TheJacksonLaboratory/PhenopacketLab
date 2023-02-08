package org.monarchinitiative.phenopacketlab.restapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.protobuf.ProtobufJsonFormatHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@SpringBootApplication
public class Application {

    // TODO: put in property file
    public final String CORS_URL = "http://34.23.1.146:8080";
//    public final String CORS_URL = "http://localhost:8080";

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public ProtobufJsonFormatHttpMessageConverter protobufJsonFormatHttpMessageConverter() {
        return new ProtobufJsonFormatHttpMessageConverter();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**").allowedOrigins(CORS_URL);
            }
        };
    }
}

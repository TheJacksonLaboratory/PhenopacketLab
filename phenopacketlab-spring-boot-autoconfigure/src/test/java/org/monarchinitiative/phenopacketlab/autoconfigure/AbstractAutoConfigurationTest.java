package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.junit.jupiter.api.AfterEach;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.nio.file.Path;
import java.nio.file.Paths;

public class AbstractAutoConfigurationTest {

    public static final Path BASE_DIR = Paths.get("src/test/resources");
    public static final Path DATA_DIR = BASE_DIR.resolve("data");

    protected ConfigurableApplicationContext context;

    protected void load(Class<?> config, String... environment) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
        ctx.register(config);
        TestPropertyValues.of(environment)
                .applyTo(ctx);
        ctx.refresh();
        context = ctx;
    }

    @AfterEach
    public void closeContext() {
        if (context != null) {
            context.close();
        }
    }
}

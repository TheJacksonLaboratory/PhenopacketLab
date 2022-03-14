package org.monarchinitiative.phenopacketlab.autoconfigure;

import org.junit.jupiter.api.AfterEach;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.nio.file.Path;
import java.nio.file.Paths;

public class AbstractAutoConfigurationTest {

    protected static final Path TEST_DATA = Paths.get("src/test/resources/data");

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

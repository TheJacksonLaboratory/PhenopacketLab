package org.monarchinitiative.phenopacketlab.restapi.config.repository;

import org.springframework.context.annotation.Configuration;

@Configuration
@EnableTransactionManagement
public class PersistenceJPAConfig{

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		//...
	}

	@Bean
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
		return transactionManager;
	}
}

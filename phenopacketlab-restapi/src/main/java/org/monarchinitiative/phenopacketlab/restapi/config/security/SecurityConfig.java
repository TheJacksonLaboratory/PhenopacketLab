package org.monarchinitiative.phenopacketlab.restapi.config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;

/**
 *
 * A spring security config to validate auth0 tokens and lockdown endpoints
 *
 * @author Michael Gargano
 * @since 0.5.0
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors();
		http.authorizeRequests().antMatchers("/api/v1/h2-console/**")
				.permitAll().mvcMatchers("/api/v1/user/**").authenticated()
				.and().oauth2ResourceServer().jwt();
		http.csrf().disable();
		http.headers().frameOptions().disable();
	}

	@Value("${auth0.audience}")
	private String audience;

	@Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
	private String issuer;

	@Bean
	JwtDecoder jwtDecoder() {
		NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
				JwtDecoders.fromOidcIssuerLocation(issuer);

		OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
		OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
		OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

		jwtDecoder.setJwtValidator(withAudience);

		return jwtDecoder;
	}
}
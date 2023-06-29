package org.monarchinitiative.phenopacketlab.restapi.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.Assert;

@Document(collection = "User")
public class User {
	@Id private int id;

	private String authId;

	public User(){}

	public User(String authId){
		Assert.notNull(authId, "Required field authId not found.");
		this.authId = authId;
	}

	public User(Authentication authentication){
			Assert.notNull(authentication, "Error some seriously with wrong no authentication object.");
				final Jwt credentials = (Jwt) authentication.getCredentials();
				String authId = authentication.getName();
				if(authId != null && !authId.isBlank()){
					this.authId = authId;
				} else {
					throw new AuthenticationCredentialsNotFoundException("Credentials could not be parsed from authentication object");
				}
	}

	public int getId() {
		return id;
	}

	public String getAuthId() {
		return authId;
	}
}
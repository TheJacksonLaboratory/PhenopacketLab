package org.monarchinitiative.phenopacketlab.restapi.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.Assert;

import java.util.List;


@Document(collection = "User")
public class User
{

	@Id private int id;

	private final String nickname;

	private final String authId;
	private final String email;

	private final String orcId;

	@Transient
	@Value( "${auth0.nickname}" )
	private String nickname_claim;

	@Transient
	@Value( "${auth0.email}" )
	private String email_claim;


	public User(String nickname, String authId, String email, String orcId){
		Assert.notNull(authId, "Required field authId not found.");
		Assert.notNull(orcId, "Required field orcId not found.");
		this.nickname = nickname;
		this.authId = authId;
		this.email = email;
		this.orcId = orcId;
	}

	public User(Authentication authentication){
			Assert.notNull(authentication, "Error some seriously with wrong no authentication object.");
				final Jwt credentials = (Jwt) authentication.getCredentials();
				String authId = authentication.getName();
				String nickname = credentials.getClaim(nickname_claim);
				String email = credentials.getClaim(email_claim);
				List<String> permissions = credentials.getClaim("permissions");
				if(authId != null && !authId.isBlank() && nickname != null && !nickname.isBlank() && email !=null && !email.isBlank()){
					this.authId = authId;
					this.email = email;
					this.nickname = nickname;
					this.orcId = "orcid";

				} else {
					throw new AuthenticationCredentialsNotFoundException("Credentials could not be parsed from authentication object");
				}
	}

	public int getId() {
		return id;
	}

	public String getNickname() {
		return nickname;
	}

	public String getAuthId() {
		return authId;
	}

	public String getEmail() {
		return email;
	}

	public String getOrcId() {
		return orcId;
	}
}
package org.monarchinitiative.phenopacketlab.restapi.service;

import org.monarchinitiative.phenopacketlab.restapi.domain.User;
import org.monarchinitiative.phenopacketlab.restapi.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserService {
	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository) { this.userRepository = userRepository;}

	public User getOrCreate(Authentication authentication) {
		Objects.requireNonNull(authentication, "Error some seriously with wrong no authentication object.");
		User user = fromAuthentication(authentication);
		if(this.exist(user)){
			return this.userRepository.findUserByAuthId(user.getAuthId());
		} else {
			return this.userRepository.save(user);
		}
	}

	public boolean exist(User userAuthentication){
		return this.userRepository.existsUserByAuthId(userAuthentication.getAuthId());
	}

	private User fromAuthentication(Authentication authentication){
		String authId = authentication.getName();
		if(authId != null && !authId.isBlank()){
			return new User(authId);
		} else {
			throw new AuthenticationCredentialsNotFoundException("Credentials could not be parsed from authentication object");
		}
	}
}

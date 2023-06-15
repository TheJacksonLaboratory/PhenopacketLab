package org.monarchinitiative.phenopacketlab.restapi.service;

import org.monarchinitiative.phenopacketlab.restapi.domain.User;
import org.monarchinitiative.phenopacketlab.restapi.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User get(Authentication authentication){
		User user = new User(authentication);
		if(this.exist(user)){
			return this.userRepository.findUserByAuthId(user.getAuthId());
		} else {
			return this.userRepository.save(user);
		}
	}

	public boolean exist(User userAuthentication){
		return this.userRepository.existsUserByAuthId(userAuthentication.getAuthId());
	}

	public User save(User user){
		return this.userRepository.save(user);
	}

}

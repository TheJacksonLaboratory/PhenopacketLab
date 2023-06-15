package org.monarchinitiative.phenopacketlab.restapi.repository;

import org.monarchinitiative.phenopacketlab.restapi.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Long> {
	boolean existsUserByAuthId(String authId);

	User findUserByAuthId(String authId);

}

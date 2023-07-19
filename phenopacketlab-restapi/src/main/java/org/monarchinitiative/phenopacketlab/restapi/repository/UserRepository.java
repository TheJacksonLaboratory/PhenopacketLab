package org.monarchinitiative.phenopacketlab.restapi.repository;

import org.monarchinitiative.phenopacketlab.restapi.domain.User;
import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends DatastoreRepository<User, Long> {
	boolean existsUserByAuthId(String authId);

	User findUserByAuthId(String authId);

}

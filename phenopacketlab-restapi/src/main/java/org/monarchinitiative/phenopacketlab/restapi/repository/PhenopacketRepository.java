package org.monarchinitiative.phenopacketlab.restapi.repository;

import com.google.cloud.spring.data.datastore.repository.DatastoreRepository;
import org.monarchinitiative.phenopacketlab.restapi.domain.Phenopacket;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhenopacketRepository extends DatastoreRepository<Phenopacket, Long> {

	List<Phenopacket> findAllByUserId(Long userId);

	Optional<Phenopacket> findByIdAndUserId(Long id, Long userId);

	void deleteByIdAndUserId(Long id, Long userId);

}

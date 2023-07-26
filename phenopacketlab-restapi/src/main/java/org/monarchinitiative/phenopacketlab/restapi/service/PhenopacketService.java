package org.monarchinitiative.phenopacketlab.restapi.service;

import org.monarchinitiative.phenopacketlab.restapi.domain.Phenopacket;
import org.monarchinitiative.phenopacketlab.restapi.domain.User;
import org.monarchinitiative.phenopacketlab.restapi.repository.PhenopacketRepository;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class PhenopacketService {

	private final PhenopacketRepository phenopacketRepository;

	public PhenopacketService(PhenopacketRepository phenopacketRepository) {
		this.phenopacketRepository = phenopacketRepository;
	}

	public List<Phenopacket> get(User user, Long id) {
		if (id == null) {
			return this.phenopacketRepository.findAllByUserId(user.getId());
		}
		return this.phenopacketRepository.findByIdAndUserId(user.getId(), id).stream().toList();
	}

	public boolean save(User user, String phenopacket){
		try {
			this.phenopacketRepository.save(new Phenopacket(user.getId(), phenopacket));
			return true;
		} catch (Exception e){
			return false;
		}
	}

	public void delete(User user, Long id){
		this.phenopacketRepository.deleteByIdAndUserId(id, user.getId());
	}
}

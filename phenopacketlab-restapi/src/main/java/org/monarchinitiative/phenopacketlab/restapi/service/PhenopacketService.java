package org.monarchinitiative.phenopacketlab.restapi.service;

import org.monarchinitiative.phenopacketlab.restapi.domain.Phenopacket;
import org.monarchinitiative.phenopacketlab.restapi.domain.User;
import org.monarchinitiative.phenopacketlab.restapi.repository.PhenopacketRepository;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

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

	public Phenopacket save(User user, String phenopacket){
		try {
			return this.phenopacketRepository.save(new Phenopacket(user.getId(), phenopacket));
		} catch (Exception e){
			return null;
		}
	}

	public boolean update(User user, Long id, String phenopacket){
		Optional<Phenopacket> existing = this.phenopacketRepository.findByIdAndUserId(id, user.getId());
		if (existing.isPresent()) {
			existing.get().setPhenopacket(phenopacket);
			try {
				this.phenopacketRepository.save(existing.get());
				return true;
			} catch(Exception e){
				return false;
			}
		}
		return false;
	}

	public void delete(User user, Long id){
		this.phenopacketRepository.deleteByIdAndUserId(id, user.getId());
	}
}

package org.monarchinitiative.phenopacketlab.restapi.controller;

import com.google.protobuf.InvalidProtocolBufferException;
import org.monarchinitiative.phenopacketlab.restapi.domain.Phenopacket;
import org.monarchinitiative.phenopacketlab.restapi.domain.User;
import org.monarchinitiative.phenopacketlab.restapi.service.PhenopacketService;
import org.monarchinitiative.phenopacketlab.restapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${api.version}/phenopacket")
public class PhenopacketController {

	private final PhenopacketService phenopacketService;

	private final UserService userService;

	public PhenopacketController(PhenopacketService phenopacketService, UserService userService) {
		this.phenopacketService = phenopacketService;
		this.userService = userService;
	}

	@GetMapping
	ResponseEntity<List<Phenopacket>> get(Authentication authentication, @RequestParam(required = false) Long id) throws InvalidProtocolBufferException {
		User user = userService.getOrCreate(authentication);
		final List<Phenopacket> phenopackets = phenopacketService.get(user, id);
		return ResponseEntity.ok(phenopackets);
	}

	@PostMapping
	ResponseEntity<Phenopacket> update(Authentication authentication, @RequestParam Long id, @RequestBody String phenopacket){
		User user = userService.getOrCreate(authentication);
		if (phenopacket.isBlank()){
			return ResponseEntity.badRequest().build();
		} else {
			final boolean updated = this.phenopacketService.update(user, id, phenopacket);
			if (updated){
				return ResponseEntity.ok().build();
			} else {
				return ResponseEntity.internalServerError().build();
			}
		}
	}

	@PutMapping
	ResponseEntity<Phenopacket> save(Authentication authentication, @RequestBody String phenopacket){
		User user = userService.getOrCreate(authentication);
		if (phenopacket.isBlank()){
			return ResponseEntity.badRequest().build();
		}
		final Phenopacket phenoSaved = this.phenopacketService.save(user, phenopacket);
		if (phenoSaved != null){
			return ResponseEntity.ok(phenoSaved);
		} else {
			return ResponseEntity.internalServerError().build();
		}
	}

	@DeleteMapping
	ResponseEntity<Phenopacket> delete(Authentication authentication, @RequestParam Long id){
		User user = userService.getOrCreate(authentication);
		try {
			this.phenopacketService.delete(user, id);
			return ResponseEntity.ok().build();
		} catch (Exception e){
			return ResponseEntity.internalServerError().build();
		}
	}
}

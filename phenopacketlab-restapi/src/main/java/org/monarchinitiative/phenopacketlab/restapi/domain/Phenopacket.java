package org.monarchinitiative.phenopacketlab.restapi.domain;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

import java.util.Objects;

@Entity
public class Phenopacket {

	@Id
	Long id;

	Long userId;

	String phenopacket;

	public Phenopacket() {
	}

	public Phenopacket(Long userId, String phenopacket) {
		this.userId = userId;
		this.phenopacket = phenopacket;
	}

	public Long getId() {
		return id;
	}

	public String getPhenopacket() {
		return phenopacket;
	}

	public Long getUserId() {
		return userId;
	}


	public void setPhenopacket(String phenopacket) {
		this.phenopacket = phenopacket;
	}

	@Override
	public String toString() {
		return "Phenopacket{" +
				"id=" + id +
				", userId=" + userId +
				", phenopacket='" + phenopacket + '\'' +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Phenopacket that = (Phenopacket) o;
		return Objects.equals(id, that.id) && Objects.equals(userId, that.userId) && Objects.equals(phenopacket, that.phenopacket);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, userId, phenopacket);
	}
}

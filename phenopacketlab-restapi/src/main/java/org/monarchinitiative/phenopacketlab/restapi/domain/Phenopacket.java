package org.monarchinitiative.phenopacketlab.restapi.domain;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;

import java.util.Map;
import java.util.Objects;

@Entity
public class Phenopacket {

	@Id
	Long id;

	Long userId;

	JSONObject phenopacket;

	public Phenopacket() {
	}

	public Phenopacket(Long userId, String phenopacket) {
		this.userId = userId;
		this.phenopacket = new JSONObject(phenopacket);
	}

	public Long getId() {
		return id;
	}

	public Map<String, Object> getPhenopacket() {
		return phenopacket.toMap();
	}

	public Long getUserId() {
		return userId;
	}


	public void setPhenopacket(String phenopacket) {
		this.phenopacket = new JSONObject(phenopacket);
	}

	@Override
	public String toString() {
		return "Phenopacket{" +
				"id=" + id +
				", phenopacket='" + phenopacket + '\'' +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Phenopacket that = (Phenopacket) o;
		return Objects.equals(id, that.id) && Objects.equals(phenopacket, that.phenopacket);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, phenopacket);
	}
}

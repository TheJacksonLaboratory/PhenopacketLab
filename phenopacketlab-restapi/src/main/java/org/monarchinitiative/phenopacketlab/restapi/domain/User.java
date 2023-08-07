package org.monarchinitiative.phenopacketlab.restapi.domain;

import com.google.cloud.spring.data.datastore.core.mapping.Entity;
import org.springframework.data.annotation.Id;

import java.util.Objects;

@Entity
public class User {

	@Id
	private Long id;

	private String authId;

	public User(){}

	public User(String authId){
		Objects.requireNonNull(authId, "Required field authId not found.");
		this.authId = authId;
	}

	public Long getId() {
		return id;
	}

	public String getAuthId() {
		return authId;
	}

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", authId='" + authId + '\'' +
				'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		User user = (User) o;
		return Objects.equals(id, user.id) && Objects.equals(authId, user.authId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, authId);
	}
}

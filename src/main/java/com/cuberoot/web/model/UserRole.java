package com.cuberoot.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;


@Entity
@Table(name="UserRole")
public class UserRole {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	@Size(min=3, max=100)
	@Column(name = "USERID", nullable = false)
	private int userid;
	
	@Size(min=3, max=100)
	@Column(name = "ROLETYPE", nullable = false)
	private int roletype;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userid;
	}

	public void setUserId(int userid) {
		this.userid = userid;
	}
	public int getRoleType() {
		return roletype;
	}

	public void setRoleType(int roletype) {
		this.roletype = roletype;
	}
	
	
}

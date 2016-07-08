package com.cuberoot.web.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;


@Entity
@Table(name="RoleModule")
public class RoleModule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
		
	@Size(min=3, max=100)
	@Column(name = "ROLETYPE", nullable = false)
	private int roletype;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="MODULEID", insertable = false, updatable = false )
    private Module module;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	public int getRoleType() {
	return roletype;
	}

	public void setRoleType(int roletype) {
		this.roletype = roletype;
	}
	public Module getModule() {
		return module;
	}

	public void setRoleModuleId(Module module) {
		this.module = module;
	}

	
}

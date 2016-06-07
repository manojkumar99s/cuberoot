package com.cuberoot.web.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="User")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Size(min=3, max=50)
	@Column(name = "FIRSTNAME", nullable = false)
	private String firstname;
	
	@Size(min=3, max=50)
	@Column(name = "LASTNAME", nullable = false)
	private String lastname;
	
	
	@Size(min=3, max=100)
	@Column(name = "EMAIL", nullable = false)
	private String email;
	
	@Size(min=3, max=100)
	@Column(name = "USERNAME", nullable = false)
	private String username;
	
	
	@Size(min=3, max=100)
	@Column(name = "PASSWORD", nullable = false)
	private String password;
	
	@Size(min=3, max=100)
	@Column(name = "USERTYPE", nullable = false)
	private int usertype;
		
	@NotNull
	@DateTimeFormat(pattern="dd/MM/yyyy") 
	@Column(name = "CREATEDDATE", nullable = false)
	private Date createddate;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstname;
	}

	public void setFirstName(String lastname) {
		this.lastname = lastname;
	}
	
	public String getLastName() {
		return firstname;
	}

	public void setLastName(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserName() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public int getUserType() {
		return usertype;
	}

	public void setgetUserType(int usertype) {
		this.usertype = usertype;
	}
	
	public Date getCreatedDate() {
		return createddate;
	}

	public void setCreatedDate(Date createddate) {
		this.createddate = createddate;
	}

}

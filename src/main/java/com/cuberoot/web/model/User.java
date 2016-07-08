package com.cuberoot.web.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="User")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;


	@Column(name = "FIRSTNAME", nullable = true)
	private String firstname;
	
	
	@Column(name = "LASTNAME", nullable = true)
	private String lastname;
	
	
	
	@Column(name = "EMAIL", nullable = true)
	private String email;
	
	
	@Column(name = "USERNAME", nullable = true)
	private String username;
	
	
	
	@Column(name = "PASSWORD", nullable = true)
	private String password;
	
	
	@Column(name = "USERTYPE", nullable = true)
	private Integer usertype;
		
	@Column(name = "CREATEDDATE", nullable = true)
	private Date createddate;
	
	@Column(name = "USERDETAILID", nullable = true)
	private Integer userdetailsid;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="USERDETAILID",insertable = false, updatable = false, nullable = true )
    private UserDetails userdetail;
	

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstname;
	}

	public void setFirstName(String firstname) {
		this.firstname = firstname;
	}
	
	public String getLastName() {
		return lastname;
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

	public void setUserType(int usertype) {
		this.usertype = usertype;
	}
	
	public Date getCreatedDate() {
		return createddate;
	}

	public void setCreatedDate(Date createddate) {
		this.createddate = createddate;
	}

	
	public UserDetails getUserDetail() {
	return userdetail;
	}

	public void setUserDetail(UserDetails userdetail) {
		this.userdetail = userdetail;
	}
	
	public int getUserDetailsId() {
		return userdetailsid;
	}

	public void setUserDetailsId(int userdetailsid) {
		this.userdetailsid = userdetailsid;
	}
	

}

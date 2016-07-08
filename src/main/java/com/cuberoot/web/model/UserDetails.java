package com.cuberoot.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

	@Entity
	@Table(name="UserDetails")
	public class UserDetails {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;

		
		@Column(name = "CompanyName", nullable = true)
		private String companyname;
		
		
		@Column(name = "WebURL", nullable = true)
		private String weburl;
		
		
		
		@Column(name = "Address", nullable = true)
		private String address;
		
	
		@Column(name = "State", nullable = true)
		private String state;
		
		
		
		@Column(name = "City", nullable = true)
		private String city;
		
		
		@Column(name = "ZipCode", nullable = true)
		private int zipcode;
			
		
		@Column(name = "Phone", nullable = true)
		private int phone;
				
		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		
		public String getCompanyName() {
			return companyname;
		}

		public void setCompanyName(String companyname) {
			this.companyname = companyname;
		}
		public String getWebURL() {
			return weburl;
		}

		public void setWebURL(String weburl) {
			this.weburl = weburl;
		}
		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}
		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}
		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}
		
		public int getZipCode() {
			return zipcode;
		}

		public void setZipCode(int zipcode) {
			this.zipcode = zipcode;
		}
		public int getPhone() {
			return phone;
		}

		public void setPhone(int phone) {
			this.phone = phone;
		}
}

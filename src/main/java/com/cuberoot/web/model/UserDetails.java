package com.cuberoot.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

	@Entity
	@Table(name="UserDetails")
	public class UserDetails {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;

		@Size(min=3, max=50)
		@Column(name = "CompanyName", nullable = false)
		private String companyname;
		
		@Size(min=3, max=50)
		@Column(name = "WebURL", nullable = false)
		private String weburl;
		
		
		@Size(min=3, max=100)
		@Column(name = "Address", nullable = false)
		private String address;
		
		@Size(min=3, max=100)
		@Column(name = "State", nullable = false)
		private String state;
		
		
		@Size(min=3, max=100)
		@Column(name = "City", nullable = false)
		private String city;
		
		@Size(min=3, max=100)
		@Column(name = "ZipCode", nullable = false)
		private int zipcode;
			
		@NotNull
		@Column(name = "Phone", nullable = false)
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

		public void setgetCity(String city) {
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

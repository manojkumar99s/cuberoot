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
	@Table(name="Module")
	public class Module {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;

		@Size(min=3, max=50)
		@Column(name = "MODULE", nullable = false)
		private String module;
		
		
		@Size(min=3, max=100)
		@Column(name = "STATUS", nullable = false)
		private int status;
			
		@NotNull
		@Column(name = "ORDER", nullable = false)
		private int order;
				
		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}
		public String getModule() {
			return module;
		}

		public void setModule(String module) {
			this.module = module;
		}
		
		public int getStatus() {
			return status;
		}

		public void setStatus(int status) {
			this.status = status;
		}
		public int getOrder() {
			return order;
		}

		public void setOrder(int order) {
			this.order = order;
		}
}

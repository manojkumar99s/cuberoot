package com.cuberoot.web.common;

import org.springframework.web.client.RestTemplate;

import com.cuberoot.web.domain.Login;

public class TestAPI {

	public static void main(String[] args) {
		 final String uri = "http://http://localhost:8085/CuberootWeb/Api/UserLogin";
		 
		    Login newEmployee = new Login("Adam", "Gilly");
		 
		    RestTemplate restTemplate = new RestTemplate();

		    
		    Login result = restTemplate.postForObject( uri, newEmployee, Login.class);
		 
		    System.out.println(result);

	}

}

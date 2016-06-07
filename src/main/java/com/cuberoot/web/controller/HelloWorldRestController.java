package com.cuberoot.web.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuberoot.web.domain.Car;
import com.cuberoot.web.domain.Message;
import com.cuberoot.web.model.Employee;
import com.cuberoot.web.service.EmployeeService;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Controller
@RequestMapping("/")
public class HelloWorldRestController {

	@Autowired
	EmployeeService service;

	@RequestMapping(value = "/test", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity<String> getAgencyResource(HttpEntity<byte[]> requestEntity) throws JSONException 
	{
		 String testAString="";
	    String requestHeader = requestEntity.getHeaders().getFirst("MyRequestHeader");
	    byte[] requestBody = requestEntity.getBody();
	    
	    HttpHeaders responseHeaders = new HttpHeaders();
	    responseHeaders.set("MyResponseHeader", "MyValue");
		    List<JSONObject> entities = new ArrayList<JSONObject>();
	    for (Employee n : service.findAllEmployees()) {
	        JSONObject entity = new JSONObject();
	        entity.put("id", n.getId());
	        entity.put("name", n.getName());
	        entities.add(entity);
	    }
	    
	    
		/*Car car = new Car();
		    car.setColor("Blue");
		    car.setMiles(100);
		    car.setVIN("1234");*/
	    ObjectMapper om = new ObjectMapper();
	    try {
	         testAString = om.writeValueAsString(service.findAllEmployees()); // error here!

	       
	    } catch (JsonGenerationException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (JsonMappingException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (IOException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
	    
	    return new ResponseEntity<String>(testAString, HttpStatus.OK);
	

	}
	
}

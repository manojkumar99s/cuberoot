package com.cuberoot.web.controller;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.cuberoot.web.common.Utility;
import com.cuberoot.web.service.UserService;

@Controller
@RequestMapping("/")
public class UserController {

	@Autowired
	UserService service;

	@RequestMapping(value = "/Api/Users", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity<String> getAllUsers(HttpEntity<byte[]> requestEntity) throws JSONException 
	{
	    String response = null;
	  
	    response = Utility.GetMapObject(response,service.findAllUser());
	    return new ResponseEntity<String>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/Api/User/{id}", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity<String> getUser(@PathVariable Integer id) throws JSONException 
	{
	    String response = null;
	  
	    response = Utility.GetMapObject(response,service.findById(id));
	    return new ResponseEntity<String>(response, HttpStatus.OK);
	}

	
}

package com.cuberoot.web.controller;

import java.util.List;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuberoot.web.common.Utility;
import com.cuberoot.web.model.User;
import com.cuberoot.web.service.UserService;

@RestController
@RequestMapping("/")
public class UserController {

	@Autowired
	UserService service;

	@RequestMapping(value = "/Api/Users", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity<List<User>> getAllUsers(HttpEntity<byte[]> requestEntity) throws JSONException 
	{
	  
		List<User> users = service.findAllUser();
	    return new ResponseEntity<List<User>>( users, HttpStatus.OK);
	}

	@RequestMapping(value = "/Api/User/{id}", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity<User> getUser(@PathVariable Integer id) throws JSONException 
	{
		User user = service.findById(id);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	
}

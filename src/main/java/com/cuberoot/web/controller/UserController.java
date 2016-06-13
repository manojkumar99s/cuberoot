package com.cuberoot.web.controller;

import java.sql.Date;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cuberoot.web.domain.Login;
import com.cuberoot.web.model.RoleModule;
import com.cuberoot.web.model.User;
import com.cuberoot.web.model.UserDetails;
import com.cuberoot.web.model.UserRole;
import com.cuberoot.web.service.RoleModuleService;
import com.cuberoot.web.service.UserDetailsService;
import com.cuberoot.web.service.UserRoleService;
import com.cuberoot.web.service.UserService;

import javassist.bytecode.Descriptor.Iterator;

@RestController
@RequestMapping("/")
public class UserController {

	@Autowired
	UserService service;
	
	@Autowired
	UserDetailsService userdetailsservice;
	
	@Autowired
	UserRoleService userservice;

	@Autowired
	RoleModuleService moduleservice;
	
	@RequestMapping(value = "/Api/UserLogin",produces = { "application/json" },consumes={ "application/json" }, method = RequestMethod.POST)
	public ResponseEntity<String> getUserLogin(HttpEntity<String> request) throws JSONException 
	{
		 JSONObject jsonObj = new JSONObject(request.getBody());
         String username = jsonObj.getString("username");
         String password = jsonObj.getString("password");
		 String responsestatus ="notexist";
		 User users = service.IsUserExist(username, password);
		 if(users!=null)
	 	 responsestatus ="exist";		
		 
		 
	    return new ResponseEntity<String>(responsestatus, HttpStatus.OK);
	}
	@RequestMapping(value = "/Api/UserRegistration",produces = { "application/json" },consumes={ "application/json" }, method = RequestMethod.POST)
	public ResponseEntity<String> getUserRegistration(HttpEntity<String> request) throws JSONException 
	{
		 JSONObject jsonObj = new JSONObject(request.getBody());
        
		 String firstname = jsonObj.getString("firstname");
		 String lastname = jsonObj.getString("lastname");
		 String email = jsonObj.getString("email");
		 String username = jsonObj.getString("username");
		 String password = jsonObj.getString("password");
		 int usertype = jsonObj.getInt("usertype");
		 String companyname = jsonObj.getString("companyname");
		 String weburl = jsonObj.getString("weburl");
		 String address = jsonObj.getString("address");
		 String state = jsonObj.getString("state");
		 String city = jsonObj.getString("city");
		 int zip = jsonObj.getInt("zip");
		 int phone = jsonObj.getInt("phone");
		 
          try{
	         
			 UserDetails userdetails = new UserDetails();
			 userdetails.setCompanyName(companyname);
			 userdetails.setWebURL(weburl);
			 userdetails.setAddress(address);
			 userdetails.setState(state);
			 userdetails.setCity(city);
			 userdetails.setZipCode(zip);
			 userdetails.setPhone(phone);
	         userdetailsservice.saveUserDetails(userdetails);
			 
			 User user = new User();
	         user.setFirstName(firstname);
	         user.setLastName(lastname);
	         user.setEmail(email);
	         user.setUserName(username);
	         user.setPassword(password);
	         user.setUserType(usertype);
	         user.setCreatedDate(new Date(2016,1,1));
             user.setUserDetailsId(userdetails.getId());
	         service.saveUser(user);
	         
	         }
	         catch(Exception e)
	         {
	        	 
	         }
		 
	    return new ResponseEntity<String>("true", HttpStatus.OK);
	}
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
	@RequestMapping(value = "/Api/UserRole/{id}", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity<List<UserRole>> getAllUserRole(@PathVariable Integer id) throws JSONException 
	{
	  
		List<UserRole> usersroles = userservice.findAllUserRole(id);
	    return new ResponseEntity<List<UserRole>>( usersroles, HttpStatus.OK);
	}
	@RequestMapping(value = "/Api/UserModule/{id}", produces = { "application/json" }, method = RequestMethod.GET)
	public ResponseEntity<List<RoleModule>> getAllUserModule(@PathVariable Integer id) throws JSONException 
	{
	  
		List<UserRole> usersroles = userservice.findAllUserRole(id);		
		List<RoleModule> rolemodules = moduleservice.findAllRoleModule(usersroles.get(0).getRoleType());
		
	    return new ResponseEntity<List<RoleModule>>( rolemodules, HttpStatus.OK);
	}
}

package com.cuberoot.web.service;

import java.util.List;

import com.cuberoot.web.model.UserDetails;

public interface UserDetailsService {
	UserDetails findById(int id);
	
	void saveUserDetails(UserDetails userdetails);
	
	void deleteUserById(int id);
	
	List<UserDetails> findAllUser();

	UserDetails findUserDetailsByFisrtName(String firstname);

}
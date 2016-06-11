package com.cuberoot.web.persistence;


import java.util.List;

import com.cuberoot.web.model.UserDetails;

public interface UserDetailsDao {

	UserDetails findById(int id);

	void saveUserDetails(UserDetails user);
	
	void deleteUserDetailsById(int id);

	List<UserDetails> findAllUserDetails();

	UserDetails findUserDetailsByFisrtName(String firstname);
}

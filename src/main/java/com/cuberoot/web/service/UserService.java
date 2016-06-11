package com.cuberoot.web.service;

import java.util.List;

import com.cuberoot.web.model.User;

public interface UserService {
	User findById(int id);
	
	void saveUser(User user);
	
	void deleteUserById(int id);
	
	List<User> findAllUser();

	User findUserByFisrtName(String firstname);
	User IsUserExist(String username,String password);
}

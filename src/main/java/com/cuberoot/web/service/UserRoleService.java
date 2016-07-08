package com.cuberoot.web.service;

import java.util.List;

import com.cuberoot.web.model.UserRole;

public interface UserRoleService {
	UserRole findById(int id);
	
	void saveUser(UserRole userrole);
	
	void deleteUserRoleById(int id);
	
	List<UserRole> findAllUserRole(int userid);

}

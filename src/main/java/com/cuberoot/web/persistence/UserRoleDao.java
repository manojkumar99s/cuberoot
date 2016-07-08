package com.cuberoot.web.persistence;


import java.util.List;

import com.cuberoot.web.model.UserRole;

public interface UserRoleDao {

	UserRole findById(int id);

	void saveUserRole(UserRole userrole);
	
	void deleteUserRoleById(int id);

	List<UserRole> findAllUserRole(int userid);

	
}

package com.cuberoot.web.service;

import java.util.List;

import com.cuberoot.web.model.RoleModule;

public interface RoleModuleService {
	RoleModule findById(int id);
	
	void saveUser(RoleModule userrole);
	
	void deleteRoleModuleById(int id);
	
	List<RoleModule> findAllRoleModule(int roletype);

}

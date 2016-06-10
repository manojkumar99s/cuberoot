package com.cuberoot.web.persistence;


import java.util.List;

import com.cuberoot.web.model.RoleModule;


public interface RoleModuleDao {

	RoleModule findById(int id);

	void saveRoleModule(RoleModule rolemodule);
	
	void deleteRoleModuleById(int id);

	List<RoleModule> findAllRoleModule(int roletype);
	
}

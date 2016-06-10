package com.cuberoot.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuberoot.web.model.RoleModule;
import com.cuberoot.web.persistence.RoleModuleDao;

@Service("roleModuleService")
@Transactional
public class RoleModuleServiceImpl implements RoleModuleService {

	@Autowired
	private RoleModuleDao dao;

	@Override
	public RoleModule findById(int id) {
		return dao.findById(id);	
	}

	@Override
	public void saveUser(RoleModule userrole) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteRoleModuleById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<RoleModule> findAllRoleModule(int roletype) {
		return dao.findAllRoleModule(roletype);
	}

	
}

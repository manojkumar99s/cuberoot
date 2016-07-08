package com.cuberoot.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuberoot.web.model.UserRole;
import com.cuberoot.web.persistence.UserRoleDao;

@Service("userRoleService")
@Transactional
public class UserRoleServiceImpl implements UserRoleService {

	@Autowired
	private UserRoleDao dao;

	@Override
	public UserRole findById(int id) {
		return dao.findById(id);	
	}

	@Override
	public void saveUser(UserRole userrole) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteUserRoleById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<UserRole> findAllUserRole(int userid) {
		return dao.findAllUserRole(userid);
	}

	
}

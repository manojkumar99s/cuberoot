package com.cuberoot.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuberoot.web.model.User;
import com.cuberoot.web.persistence.UserDao;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao dao;

	@Override
	public User findById(int id) {
		return dao.findById(id);	
	}

	@Override
	public void saveUser(User user) {
		dao.saveUser(user);
		
	}

	@Override
	public void deleteUserById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<User> findAllUser() {
		return dao.findAllUser();
	}

	@Override
	public User findUserByFisrtName(String firstname) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User IsUserExist(String username, String password) {
		return dao.IsUserExist(username, password);	
	}
	
	
}

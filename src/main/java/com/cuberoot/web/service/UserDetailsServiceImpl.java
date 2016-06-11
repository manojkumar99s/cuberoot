package com.cuberoot.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cuberoot.web.model.UserDetails;
import com.cuberoot.web.persistence.UserDetailsDao;

@Service("userDetailsService")
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserDetailsDao dao;

	@Override
	public UserDetails findById(int id) {
		return dao.findById(id);	
	}

	@Override
	public void saveUserDetails(UserDetails userdetails) {
		dao.saveUserDetails(userdetails);
		
	}

	@Override
	public void deleteUserById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<UserDetails> findAllUser() {
		return dao.findAllUserDetails();
	}

	@Override
	public UserDetails findUserDetailsByFisrtName(String firstname) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
}

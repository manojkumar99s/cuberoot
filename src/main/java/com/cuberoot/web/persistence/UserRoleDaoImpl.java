package com.cuberoot.web.persistence;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.cuberoot.web.model.UserRole;
@Repository("userRoleDao")
public class UserRoleDaoImpl extends AbstractDao<Integer, UserRole> implements UserRoleDao {

	@Override
	public UserRole findById(int id) {
		return getByKey(id);
	}

	@Override
	public void saveUserRole(UserRole userrole) {
		persist(userrole);
		
	}

	@Override
	public void deleteUserRoleById(int id) {
		Query query = getSession().createSQLQuery("delete from Employee where ssn = :ssn");
		query.setInteger("id", id);
		query.executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UserRole> findAllUserRole(int userid) {
		Criteria criteria = createEntityCriteria();
		//criteria.add(Restrictions.eq("UserId", userid));
	    return (List<UserRole>) criteria.list();
	}

	
}

package com.cuberoot.web.persistence;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.cuberoot.web.model.UserDetails;
@Repository("userDetailsDao")
public class UserDetailsDaoImpl extends AbstractDao<Integer, UserDetails> implements UserDetailsDao {

	@Override
	public UserDetails findById(int id) {
		return getByKey(id);
	}

	@Override
	public void saveUserDetails(UserDetails user) {
		persist(user);
		
	}

	@Override
	public void deleteUserDetailsById(int id) {
		Query query = getSession().createSQLQuery("delete from Employee where ssn = :ssn");
		query.setInteger("id", id);
		query.executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UserDetails> findAllUserDetails() {
		Criteria criteria = createEntityCriteria();
		return (List<UserDetails>) criteria.list();
	}

	@Override
	public UserDetails findUserDetailsByFisrtName(String firstname) {
		Criteria criteria = createEntityCriteria();
		
		Criterion username = Restrictions.eq("UserDetailsName", firstname);
		Criterion email = Restrictions.eq("Password", firstname);
		LogicalExpression orExp = Restrictions.and(username, email);
		criteria.add(orExp);
			
		return (UserDetails) criteria.uniqueResult();
	}

	

	

}

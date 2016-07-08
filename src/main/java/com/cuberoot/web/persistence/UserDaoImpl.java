package com.cuberoot.web.persistence;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.cuberoot.web.model.User;
@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

	@Override
	public User findById(int id) {
		return getByKey(id);
	}

	@Override
	public void saveUser(User user) {
		persist(user);
		
	}

	@Override
	public void deleteUserById(int id) {
		Query query = getSession().createSQLQuery("delete from Employee where ssn = :ssn");
		query.setInteger("id", id);
		query.executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> findAllUser() {
		Criteria criteria = createEntityCriteria();
		return (List<User>) criteria.list();
	}

	@Override
	public User findUserByFisrtName(String firstname) {
		Criteria criteria = createEntityCriteria();
		
		Criterion username = Restrictions.eq("UserName", firstname);
		Criterion email = Restrictions.eq("Password", firstname);
		LogicalExpression orExp = Restrictions.and(username, email);
		criteria.add(orExp);
			
		return (User) criteria.uniqueResult();
	}

	@Override
	public User IsUserExist(String username, String password) {
		Criteria criteria = createEntityCriteria();
		
		Criterion user = Restrictions.eq("username", username);
		Criterion pass = Restrictions.eq("password", password);
		LogicalExpression orExp = Restrictions.or(user, pass);
		criteria.add(orExp);
			
		return (User) criteria.uniqueResult();
	}

}

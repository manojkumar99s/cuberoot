package com.cuberoot.web.persistence;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.cuberoot.web.model.RoleModule;
@Repository("roleModuleDao")
public class RoleModuleDaoImpl extends AbstractDao<Integer, RoleModule> implements RoleModuleDao {

	@Override
	public RoleModule findById(int id) {
		return getByKey(id);
	}

	@Override
	public void saveRoleModule(RoleModule userrole) {
		persist(userrole);
		
	}

	@Override
	public void deleteRoleModuleById(int id) {
		Query query = getSession().createSQLQuery("delete from Employee where ssn = :ssn");
		query.setInteger("id", id);
		query.executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<RoleModule> findAllRoleModule(int roletype) {
		Criteria criteria = createEntityCriteria();
		//criteria.add(Restrictions.eq("RoleType", roletype));
	    return (List<RoleModule>) criteria.list();
	}

	
}

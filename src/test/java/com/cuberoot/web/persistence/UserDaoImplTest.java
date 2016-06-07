package com.cuberoot.web.persistence;


import org.dbunit.dataset.IDataSet;

//import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;




public class UserDaoImplTest extends EntityDaoImplTest{

	@Autowired
	UserDao userDao;

	@Override
	protected IDataSet getDataSet() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	/*@Override
	protected IDataSet getDataSet() throws Exception{
		IDataSet dataSet = new FlatXmlDataSet(this.getClass().getClassLoader().getResourceAsStream("User.xml"));
		return dataSet;
	}*/
	
	/* In case you need multiple datasets (mapping different tables) and you do prefer to keep them in separate XML's
	@Override
	protected IDataSet getDataSet() throws Exception {
	  IDataSet[] datasets = new IDataSet[] {
			  new FlatXmlDataSet(this.getClass().getClassLoader().getResourceAsStream("Employee.xml")),
			  new FlatXmlDataSet(this.getClass().getClassLoader().getResourceAsStream("Benefits.xml")),
			  new FlatXmlDataSet(this.getClass().getClassLoader().getResourceAsStream("Departements.xml"))
	  };
	  return new CompositeDataSet(datasets);
	}
	*/
	/*@Ignore
	@Test
	public void findById(){
		Assert.assertNotNull(userDao.findById(1));
		Assert.assertNull(userDao.findById(3));
	}*/

	

}

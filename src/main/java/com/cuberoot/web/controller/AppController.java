package com.cuberoot.web.controller;

import java.sql.Date;
import java.util.List;
import java.util.Locale;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.cuberoot.web.model.Employee;
import com.cuberoot.web.model.User;
import com.cuberoot.web.model.UserDetails;
import com.cuberoot.web.service.EmployeeService;
import com.cuberoot.web.service.UserDetailsService;
import com.cuberoot.web.service.UserService;

@Controller
@RequestMapping("/")
public class AppController {

	@Autowired
	UserService service;
	
	
	@Autowired
	UserDetailsService userdetailsservice;
	
	@Autowired
	MessageSource messageSource;

	/*
	 * This method will list all existing employees.
	 */
	@SuppressWarnings("deprecation")
	@RequestMapping(value = { "/", "/list" }, method = RequestMethod.GET)
	public String listEmployees(ModelMap model) {

		//List<Employee> employees = service.findAllEmployees();
		//model.addAttribute("employees", employees);
		/* try{
	         
			 UserDetails userdetails = new UserDetails();
			 userdetails.setCompanyName("Cuberoot3");
			 userdetails.setWebURL("www.cuberoot.com");
			 userdetails.setAddress("Vaishali");
			 userdetails.setState("UP");
			 userdetails.setCity("Ghaziabad");
			 userdetails.setZipCode(111010);
			 userdetails.setPhone(2147483647);
	         userdetailsservice.saveUserDetails(userdetails);
			 
			 User user = new User();
	         user.setFirstName("maanya");
	         user.setLastName("kumar");
	         user.setEmail("maanta@test.com");
	         user.setUserName("maanya");
	         user.setPassword("kumar");
	         user.setUserType(1);
	         user.setCreatedDate(new Date(2016,1,1));
	         
	         
	         user.setUserDetailsId(userdetails.getId());
	         
	         service.saveUser(user);
	         }
	         catch(Exception e)
	         {
	        	 
	         }*/
		
		return "allemployees";
	}

	/*
	 * This method will provide the medium to add a new employee.
	 */
	/*@RequestMapping(value = { "/new" }, method = RequestMethod.GET)
	public String newEmployee(ModelMap model) {
		Employee employee = new Employee();
		model.addAttribute("employee", employee);
		model.addAttribute("edit", false);
		return "registration";
	}

	/*
	 * This method will be called on form submission, handling POST request for
	 * saving employee in database. It also validates the user input
	 */
	/*@RequestMapping(value = { "/new" }, method = RequestMethod.POST)
	public String saveEmployee(@Valid Employee employee, BindingResult result,
			ModelMap model) {

		if (result.hasErrors()) {
			return "registration";
		}

		/*
		
		if(!service.isEmployeeSsnUnique(employee.getId(), employee.getSsn())){
			FieldError ssnError =new FieldError("employee","ssn",messageSource.getMessage("non.unique.ssn", new String[]{employee.getSsn()}, Locale.getDefault()));
		    result.addError(ssnError);
			return "registration";
		}
		
		service.saveEmployee(employee);

		model.addAttribute("success", "Employee " + employee.getName() + " registered successfully");
		return "success";
	}*/


	/*
	 * This method will provide the medium to update an existing employee.
	 */
	/*@RequestMapping(value = { "/edit-{ssn}-employee" }, method = RequestMethod.GET)
	public String editEmployee(@PathVariable String ssn, ModelMap model) {
		Employee employee = service.findEmployeeBySsn(ssn);
		model.addAttribute("employee", employee);
		model.addAttribute("edit", true);
		return "registration";
	}
	
	/*
	 * This method will be called on form submission, handling POST request for
	 * updating employee in database. It also validates the user input
	 */
	/*@RequestMapping(value = { "/edit-{ssn}-employee" }, method = RequestMethod.POST)
	public String updateEmployee(@Valid Employee employee, BindingResult result,
			ModelMap model, @PathVariable String ssn) {

		if (result.hasErrors()) {
			return "registration";
		}

		if(!service.isEmployeeSsnUnique(employee.getId(), employee.getSsn())){
			FieldError ssnError =new FieldError("employee","ssn",messageSource.getMessage("non.unique.ssn", new String[]{employee.getSsn()}, Locale.getDefault()));
		    result.addError(ssnError);
			return "registration";
		}

		service.updateEmployee(employee);

		model.addAttribute("success", "Employee " + employee.getName()	+ " updated successfully");
		return "success";
	}

	
	/*
	 * This method will delete an employee by it's SSN value.
	 */
	/*@RequestMapping(value = { "/delete-{ssn}-employee" }, method = RequestMethod.GET)
	public String deleteEmployee(@PathVariable String ssn) {
		service.deleteEmployeeBySsn(ssn);
		return "redirect:/list";
	}*/

}

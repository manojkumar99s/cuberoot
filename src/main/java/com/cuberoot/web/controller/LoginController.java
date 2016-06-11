package com.cuberoot.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/")
public class LoginController {


	@Autowired
	MessageSource messageSource;

	/*
	 * This method will list all existing employees.
	 */

	@RequestMapping(value = { "/", "/login" }, method = RequestMethod.GET)
	public String loginUser(ModelMap model) {
		return "default";
	}
	
}

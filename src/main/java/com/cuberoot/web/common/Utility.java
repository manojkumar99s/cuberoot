package com.cuberoot.web.common;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Utility {
	public static String GetMapObject(String testAString,Object obj) {
		ObjectMapper om = new ObjectMapper();
	    try {
	         testAString = om.writeValueAsString(obj); // error here!

	       
	    } catch (JsonGenerationException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (JsonMappingException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (IOException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
		return testAString;
	}
}

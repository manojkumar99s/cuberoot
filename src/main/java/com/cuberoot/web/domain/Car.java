package com.cuberoot.web.domain;


public class Car {

    private String VIN;
    private String color;
    private Integer miles;
	public void setColor(String color) {
		this.color =color;
	}
	public void setMiles(int mile) {
		
		this.miles = mile;
	}
	public void setVIN(String vin) {
	
		this.VIN= vin;		
	}

}
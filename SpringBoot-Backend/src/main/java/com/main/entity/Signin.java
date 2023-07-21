package com.main.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="patient_details")
public class Signin {

	@Id
	@Column(name="ID")
	private int id;
	@Column(name="FNAME")
	private String firstName;
	@Column(name="LNAME")
	private String lastName;
	@Column(name="EMAIL")
	private String email;
	@Column(name="MOBILE")
	private String mobileNo;
	@Column(name="ADDRESS")
	private String  address;
	@Column(name="PASSWORD")
	private String password;
	
	public Signin() {
		super();
	}
	
	
	public Signin(int id, String firstName, String lastName, String email, String mobileNo, String address, String password) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNo = mobileNo;
		this.address = address;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public String getAddress() {
		return address;
	}

	public String getPassword() {
		return password;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}

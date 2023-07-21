package com.main.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="DOCTOR_DETAILS")
public class DoctorDetails {
	@Id
	@Column(name="ID")
	private int id;
	@Column(name="DOCTOR_CATEGORY")
	private String doctorCategory;
	@Column(name="DOCTOR_NAME")
	private String doctorName;
	@Column(name="EXPERIENCE")
	private String experience;
	@Column(name="LOCATION")
	private String location;
	@Column(name="RATING")
	private int rating;
	@Column(name="FEE")
	private int fee;
	@Column(name="IMAGE")
	private String  imageName;
	
	public DoctorDetails() {
		super();
	}

	public DoctorDetails(int id, String doctorCategory, String doctorName, String experience, String location,
			int rating, int fee, String imageName) {
		super();
		this.id = id;
		this.doctorCategory = doctorCategory;
		this.doctorName = doctorName;
		this.experience = experience;
		this.location = location;
		this.rating = rating;
		this.fee = fee;
		this.imageName = imageName;
	}

	public int getId() {
		return id;
	}

	public String getDoctorCategory() {
		return doctorCategory;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public String getExperience() {
		return experience;
	}

	public String getLocation() {
		return location;
	}

	public int getRating() {
		return rating;
	}

	public int getFee() {
		return fee;
	}

	public String getImageName() {
		return imageName;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setDoctorCategory(String doctorCategory) {
		this.doctorCategory = doctorCategory;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public void setFee(int fee) {
		this.fee = fee;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	


}

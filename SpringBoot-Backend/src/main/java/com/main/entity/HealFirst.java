package com.main.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name= "disease_category")
public class HealFirst {
     @Id
     @Column(name= "Id")
	private int diseaseId;
     
	@Column(name= "Dis_cat_name")
	private String diseaseName;
	
	@Column(name= "Disease_description")
	private String diseaseDescription;
	
	@Column(name= "Disease_image")
	private String diseaseImage;
	

	public HealFirst() {
		super();
	}

	public HealFirst(int diseaseId, String diseaseName, String diseaseDescription, String diseaseImage) {
		super();
		this.diseaseId = diseaseId;
		this.diseaseName = diseaseName;
		this.diseaseDescription = diseaseDescription;
		this.diseaseImage = diseaseImage;
	}

	public int getDiseaseId() {
		return diseaseId;
	}

	public String getDiseaseName() {
		return diseaseName;
	}

	public String getDiseaseDescription() {
		return diseaseDescription;
	}

	public String getDiseaseImage() {
		return diseaseImage;
	}

	public void setDiseaseId(int diseaseId) {
		this.diseaseId = diseaseId;
	}

	public void setDiseaseName(String diseaseName) {
		this.diseaseName = diseaseName;
	}

	public void setDiseaseDescription(String diseaseDescription) {
		this.diseaseDescription = diseaseDescription;
	}

	public void setDiseaseImage(String diseaseImage) {
		this.diseaseImage = diseaseImage;
	}

	@Override
	public String toString() {
		return "HealFirst [diseaseId=" + diseaseId + ", diseaseName=" + diseaseName + ", diseaseDescription="
				+ diseaseDescription + ", diseaseImage=" + diseaseImage + "]";
	}
	
	
}

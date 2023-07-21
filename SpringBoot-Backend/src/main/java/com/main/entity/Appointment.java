package com.main.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "appointment_details")
public class Appointment {
	@Id
	@Column(name="ID")
    private int id;
    @Column(name = "DOCTORNAME")
    private String  doctorName;
    @Column(name = "DOCTORCATEGORY")
    private String diseaseName;
    @Column(name="DATE")
    private String date;
    @Column(name = "TIME")
    private String time;
     @Column(name ="LOCATION")
    private String location;
    @Column(name = "USERID")
    private int userId;
}

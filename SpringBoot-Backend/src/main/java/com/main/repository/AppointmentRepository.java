package com.main.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;

import com.main.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Serializable> {
	   
	@Query("FROM Appointment WHERE userId = :userid")
	  List<Appointment> getAppointments(int userid);
	
	    

}

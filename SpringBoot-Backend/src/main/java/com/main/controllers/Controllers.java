package com.main.controllers;


import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.entity.Appointment;
import com.main.entity.DoctorDetails;
import com.main.entity.HealFirst;
import com.main.entity.Signin;
import com.main.entity.Signup;
import com.main.repository.AppointmentRepository;
import com.main.repository.DoctorDetailsRepository;
import com.main.repository.SignUpRepository;
import com.main.repository.SigninRepository;
import com.main.service.HealFirstService;

@RestController

public class Controllers {
	
	@Autowired
	HealFirstService healFirstService;
	
	

	@Autowired
	DoctorDetailsRepository doctorDetailsRepository;




	@Autowired
	SigninRepository signinRepository;


	
	@Autowired
	AppointmentRepository appointmentRepository;

	@GetMapping(value = "/all")
	public List<HealFirst> getCategorys() {
		return healFirstService.getCategorysList() ;
	}

	@GetMapping(value = "/doctorlist{doctorCategory}")
	public List<DoctorDetails> getDoctors(@PathVariable String doctorCategory) {
		return doctorDetailsRepository.findByDoctorCategory(doctorCategory);
	}

	@PostMapping(value = "/signup")
	public ResponseEntity<Signup> signUp(@RequestBody Signup signupData) {

		return healFirstService.signUp(signupData);

	}

	@PostMapping(value = "/signin")
	public Map<String, Object> signIn(@RequestBody Signin signin) {

	return	healFirstService.signIn(signin);

	}
	//appointment
	
	@GetMapping(value = "/appointment{userId}")
	public List<Appointment> getAppointments( @PathVariable int userId){
		 return appointmentRepository.getAppointments(userId);
	}
	@PostMapping(value="saveappointment")
	public ResponseEntity<Appointment> saveAppointment(@RequestBody Appointment appointmentData ) {
		return new ResponseEntity<Appointment>(appointmentRepository.save(appointmentData), HttpStatus.CREATED);
	}

}

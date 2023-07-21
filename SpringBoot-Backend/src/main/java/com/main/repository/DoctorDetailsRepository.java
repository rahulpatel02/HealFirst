package com.main.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.entity.DoctorDetails;

public interface DoctorDetailsRepository extends JpaRepository<DoctorDetails,Serializable> {
      List<DoctorDetails> findByDoctorCategory(String doctorCategory);
}

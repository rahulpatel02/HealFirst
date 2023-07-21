package com.main.repository;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.entity.Signin;

public interface SigninRepository extends JpaRepository<Signin, Serializable>{
	
  Optional<Signin> findByEmail(String email);
  
  
}

package com.main.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.main.entity.Signup;

public interface SignUpRepository extends JpaRepository<Signup, Serializable> {

}

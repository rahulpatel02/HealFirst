package com.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.main.entity.Signin;
import com.main.repository.SigninRepository;
import com.main.security.CustomUserDetails;

@Component
public class CustomUserDetailsService implements UserDetailsService {
	 Optional<Signin> credential;
	 @Autowired
	 public SigninRepository signinRepository;
	 
	 
	 
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		  credential= signinRepository.findByEmail(username);
		return credential.map(CustomUserDetails::new).orElseThrow(()->new UsernameNotFoundException("User Not Found : "+username));
	}
	
	public Optional<Signin> credentialData(){
		return credential;
	}
    
	
}

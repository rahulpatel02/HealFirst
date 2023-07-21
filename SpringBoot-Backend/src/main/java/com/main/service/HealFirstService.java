package com.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.main.entity.HealFirst;
import com.main.entity.Signin;
import com.main.entity.Signup;
import com.main.repository.HealFirstRepository;
import com.main.repository.SignUpRepository;
import com.main.security.JwtUtils;

@Service
public class HealFirstService {
	
	@Autowired
	private HealFirstRepository healFirstRepository;
	
	@Autowired
	private SignUpRepository signUpRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public List<HealFirst> getCategorysList() {
		return healFirstRepository.findAll();
	}
	
	public ResponseEntity<Signup> signUp(@RequestBody Signup signupData) {
	     signupData.setPassword(passwordEncoder.encode(signupData.getPassword()));	    
    
		return new ResponseEntity<Signup>(signUpRepository.save(signupData), HttpStatus.CREATED);

	}
	
	public Map<String, Object> signIn(Signin signin){
		Map<String, Object> responseData = new HashMap<>();

		UserDetails userDetails = customUserDetailsService.loadUserByUsername(signin.getEmail());
		Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signin.getEmail(),signin.getPassword()));

		if(authentication.isAuthenticated()) {
			responseData.put("userdata", customUserDetailsService.credentialData());
			responseData.put("token", jwtUtils.generateToken(signin.getEmail()));
			return responseData;
			
		}else {
			throw new UsernameNotFoundException("invalid user requset");
		}
		
		
		
//		if ((userDetails.getPassword()).equals(signin.getPassword())) {
//
//			responseData.put("userdata", customUserDetailsService.credentialData());
//			responseData.put("token", jwtUtils.generateToken(signin.getEmail()));
//			return responseData;
//		} else {
//
//			throw new UsernameNotFoundException("Worng Password");
//		}
	}

}

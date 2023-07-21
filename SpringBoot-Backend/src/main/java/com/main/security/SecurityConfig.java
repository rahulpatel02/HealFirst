package com.main.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.cors.CorsConfiguration;

import com.main.filter.JwtAuthFilter;
import com.main.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity

public class SecurityConfig {
	
	@Autowired
	private JwtAuthFilter jwtAuthFilter;
	@Bean
	 public UserDetailsService userDetailsService() {
		 return new CustomUserDetailsService();
	 }
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)throws Exception {
		return httpSecurity.csrf(crsf ->crsf.disable())
				.cors(cors ->cors.configurationSource(request ->new CorsConfiguration().applyPermitDefaultValues()))
				.authorizeHttpRequests(auth ->auth.requestMatchers("/all","/signin","/signup","/doctorlist**").permitAll()
				.and())
				
			    .authorizeHttpRequests(auth1-> auth1.requestMatchers("/appointment**","saveappointment").authenticated())
				
				 .sessionManagement(sess-> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS )
	               
	                .and())
	                .authenticationProvider(authenticationProvider())
	                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
				.build();
// 		return  httpSecurity.authorizeRequests()
//			      .requestMatchers("/appointment").authenticated()
//			      .and()
//			      .httpBasic().and()
//			      .csrf().disable().build();
	}
	
	 @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }

	    @Bean
	    public AuthenticationProvider authenticationProvider(){
	        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
	        authenticationProvider.setUserDetailsService(userDetailsService());
	        authenticationProvider.setPasswordEncoder(passwordEncoder());
	        return authenticationProvider;
	    }
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config)throws Exception {
		return config.getAuthenticationManager();
	}

}

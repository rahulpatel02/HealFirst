package com.main.security;



import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoder;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtils {
     private static final String SECRET="e08d57766b85d9edd2e3a36adde93790bf1681556093485ff0662e01ae1fc8ca";
     
     //3
     public String extractUsername(String token) {
    	 return extractClamis(token, Claims::getSubject);
     }
     //4
     public Date extractExpiration(String token) {
    	 return extractClamis(token, Claims::getExpiration);
     }
     //1 st
     public <T> T extractClamis( String token, Function<Claims,T> claimsResolver) {
    	 final Claims claims=extractAllClamis(token); 
    	 return claimsResolver.apply(claims);
     }
  //2nd
	private Claims extractAllClamis(String token) {
		   
		return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
	}
	
	//5
	
	private Boolean isTokenExpired(String  token) {
		return extractExpiration(token).before(new Date());
	}
	//8
	public String generateToken( String username) {
		Map<String , Object> claims=new HashMap<>();
		
		return createToken(claims, username);
		
	}
	
	//7
	
	private String createToken(Map<String, Object>claims, String subject) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60))
				.signWith(SignatureAlgorithm.HS256, getSignKey()).compact();
	}
	//9
	
	private Key getSignKey() {
		byte [] keyBytes=Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	//6
	
	public Boolean validateToken(String token, UserDetails userDetails ) {
		final String username=extractUsername(token);
		
		return  (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}

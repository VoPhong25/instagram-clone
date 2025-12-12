package com.example.tieuluan_api.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;


import javax.crypto.SecretKey;
import java.util.Date;
@Service
public class JwtProvider { //Provide jwt token from email and role(optional)
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        String authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .reduce((a, b) -> a + "," + b)
                .orElse("");
        String jwt= Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+86400000))
                .claim("username",auth.getName())
                .claim("authorities", authorities)
                .signWith(key)
                .compact();
        return jwt;
    }
    //Take email from claims
    public String getEmailFromToken(String jwt) {
        jwt=jwt.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claims.get("username"));
        return email;
    }
    public boolean validateToken(String jwt) {
        jwt=jwt.substring(7);
        try {
            Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt);
            return true; //  hợp lệ và chưa hết hạn
        } catch (ExpiredJwtException e) {
            System.out.println("Token đã hết hạn: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Token không hợp lệ: " + e.getMessage());
        }
        return false;
    }

    public static void main(String[] args) {
        JwtProvider jwtProvider = new JwtProvider();
        System.out.println(jwtProvider.validateToken("eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NjI3NzI3NjEsImV4cCI6MTc2Mjg1OTE2MSwidXNlcm5hbWUiOiJ2b3Bob25nZ0BnbWFpbCxjb20iLCJhdXRob3JpdGllcyI6IiJ9.RC5PqMT1GTICvn7wvSaDAYm_JaWv55RbJbWCxDw1KMunnxBqD88cNMgRdxPPBjG4j_XyohdquofD6pTOVh_Idg"));
        System.out.println(jwtProvider.getEmailFromToken("eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NjI3NzI3NjEsImV4cCI6MTc2Mjg1OTE2MSwidXNlcm5hbWUiOiJ2b3Bob25nZ0BnbWFpbCxjb20iLCJhdXRob3JpdGllcyI6IiJ9.RC5PqMT1GTICvn7wvSaDAYm_JaWv55RbJbWCxDw1KMunnxBqD88cNMgRdxPPBjG4j_XyohdquofD6pTOVh_Idg"));

    }

}

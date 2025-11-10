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

        String username = String.valueOf(claims.get("username"));
        return username;
    }
    public boolean validateToken(String jwt) {
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
        System.out.println(jwtProvider.validateToken("eyJhbGciOiIUzUxMiJ9.eyJpYXQiOjE3NjI3NjY4MTcsImV4cCI6MTc2Mjg1MzIxNywidXNlcm5hbWUiOiJ2b3Bob25nZ0BnbWFpbCxjb20iLCJhdXRob3JpdGllcyI6IiJ9.yVMBHGgr4hJ76leNwSB5RFrwPdRXHSo6mtDjUc48o6hwAyRApMphD0_nO4mMfO1M4oPXadjIekXCZb7HcCqpmw"));
    }

}

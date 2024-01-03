package com.sarang.sarangback.provider;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.*;
import java.time.*;
import java.time.temporal.ChronoUnit;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    // email 받아와서 JSON 웹토큰으로 만들기
    // 생성하기
    public String create(String email) {
        // 현재 시각에서 1시간 추가한 날짜를 만들어준다
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                .signWith(SignatureAlgorithm.ES256, secretKey)
                .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
                .compact();

        return jwt;
    }

    // 검증하기
    public String validate(String jwt) {
        Claims claims = null;

        try {
            claims = Jwts.parser().setSigningKey(secretKey)
                    .parseClaimsJws(jwt).getBody();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return claims.getSubject();
    }

}

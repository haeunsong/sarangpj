package com.sarang.sarangback.service;

import org.springframework.http.ResponseEntity;

import com.sarang.sarangback.dto.request.auth.SignUpRequestDto;
import com.sarang.sarangback.dto.response.auth.SignUpResponseDto;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

}

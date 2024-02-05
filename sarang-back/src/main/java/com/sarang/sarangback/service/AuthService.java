package com.sarang.sarangback.service;

import org.springframework.http.ResponseEntity;

import com.sarang.sarangback.dto.request.auth.SignInRequestDto;
import com.sarang.sarangback.dto.request.auth.SignUpRequestDto;
import com.sarang.sarangback.dto.response.auth.SignInResponseDto;
import com.sarang.sarangback.dto.response.auth.SignUpResponseDto;

public interface AuthService {

    // 이 녀석의 부모형태는 다 받도록 하겠다.
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}

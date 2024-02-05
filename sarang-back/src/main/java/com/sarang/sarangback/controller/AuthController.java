package com.sarang.sarangback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sarang.sarangback.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.sarang.sarangback.dto.request.auth.SignInRequestDto;
import com.sarang.sarangback.dto.request.auth.SignUpRequestDto;
import com.sarang.sarangback.dto.response.auth.SignUpResponseDto;
import com.sarang.sarangback.dto.response.auth.SignInResponseDto;

// controller 에는 비즈니스 로직이 적히면 안된다!
// 실제 비즈니스 로직은 Service 에서 진행되어야 한다.
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    @Autowired
    AuthService authService;

    /*
     * 클라이언트가 JSON 형식으로 데이터를 POST 요청의 본문에 담아 보낼 때,
     * Spring 은 해당 JSON 데이터를 SignUpRequestDto 클래스로 변환하고,(객체로 매핑)
     * 그리고 @Valid에 의해 해당 객체의 유효성이 검사된다.
     */
    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(@RequestBody @Valid SignUpRequestDto requestBody) {
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/signin")
    public ResponseEntity<? super SignInResponseDto> signIn(@RequestBody @Valid SignInRequestDto requestBody) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;

    }

}

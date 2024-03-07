package com.sarang.sarangback.service;

import org.springframework.http.ResponseEntity;

import com.sarang.sarangback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {

    // 부모도 함께 반환할 수 있도록 설정
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

}

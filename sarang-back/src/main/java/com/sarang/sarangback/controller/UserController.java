package com.sarang.sarangback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sarang.sarangback.dto.response.user.GetSignInUserResponseDto;
import com.sarang.sarangback.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(
            // JWTAuthenticationFilter.java 에서 authenticationToken에 있는 email을 꺼내오는거
            @AuthenticationPrincipal String email) {
        System.out.print("다다다다");
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignInUser(email);

        return response;
    }
}

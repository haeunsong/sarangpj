package com.sarang.sarangback.dto.response.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.sarang.sarangback.common.ResponseCode;
import com.sarang.sarangback.common.ResponseMessage;
import com.sarang.sarangback.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class SignInResponseDto extends ResponseDto {

    private String token;
    private int expirationTime;

    public SignInResponseDto(String token) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.token = token;
        this.expirationTime = 3600; // Jwt provider 참고
    }

    public static ResponseEntity<SignInResponseDto> success(String token) {
        SignInResponseDto result = new SignInResponseDto(token);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> signInFailed() {
        ResponseDto result = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }

}

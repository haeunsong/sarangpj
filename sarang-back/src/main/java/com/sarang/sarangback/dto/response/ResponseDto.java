package com.sarang.sarangback.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sarang.sarangback.common.ResponseCode;
import com.sarang.sarangback.common.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;

/* All responses have 'code' and 'message'. */

@Getter
@AllArgsConstructor
public class ResponseDto {

    private String code;
    private String message;

    public static ResponseEntity<ResponseDto> databaseError() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR);
        /*
         * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)는 HTTP 상태 코드를 지정합니다.
         * .body(responseBody)는 응답 본문으로 ResponseDto 객체를 설정합니다.
         */
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

}

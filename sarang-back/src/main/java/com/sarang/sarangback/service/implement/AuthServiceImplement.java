package com.sarang.sarangback.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sarang.sarangback.dto.request.auth.SignUpRequestDto;
import com.sarang.sarangback.dto.response.ResponseDto;
import com.sarang.sarangback.dto.response.auth.SignUpResponseDto;
import com.sarang.sarangback.entity.UserEntity;
import com.sarang.sarangback.repository.UserRepository;
import com.sarang.sarangback.service.AuthService;

import lombok.RequiredArgsConstructor;

// AuthService 인터페이스를 상세 구현 한다.
@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    @Autowired
    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 클라이언트의 요청데이터가 담긴 dto 받아서 처리한다.
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        try {

            // 중복 검사
            String email = dto.getEmail();
            boolean existedEmail = userRepository.existsByEmail(email);
            if (existedEmail)
                return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname)
                return SignUpResponseDto.duplicateNickname();

            String telNumber = dto.getTelNumber();
            boolean existedTelNumber = userRepository.existsByTelNumber(telNumber);
            if (existedTelNumber)
                return SignUpResponseDto.duplicateTelNumber();

            // 받아오는 password 를 그냥 테이블에 넣으면 안되고 암호화를 시켜야 한다.
            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            // 데이터베이스에 저장까지 완료
            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();

    }

}

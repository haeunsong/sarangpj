package com.sarang.sarangback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sarang.sarangback.dto.response.ResponseDto;
import com.sarang.sarangback.dto.response.user.GetSignInUserResponseDto;
import com.sarang.sarangback.entity.UserEntity;
import com.sarang.sarangback.repository.UserRepository;
import com.sarang.sarangback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        UserEntity userEntity = null;
        System.out.print("email" + email);
        try {
            userEntity = userRepository.findByEmail(email);
            System.out.print("userEntity" + userEntity);
            if (userEntity == null)
                return GetSignInUserResponseDto.notExistUser();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(userEntity);
    }

}

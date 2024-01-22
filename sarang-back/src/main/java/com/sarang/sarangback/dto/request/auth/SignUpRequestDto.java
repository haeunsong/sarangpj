package com.sarang.sarangback.dto.request.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequestDto {

    @NotBlank
    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @Size(min = 8, max = 20)
    private String password;
    @NotBlank
    @NotEmpty
    private String nickname;
    @NotBlank
    @NotEmpty
    @Pattern(regexp = "^[0-9]{11,13}$")
    private String telNumber;
    @NotBlank
    @NotEmpty
    private String address;

    private String addressDetail;

    @NotNull
    @AssertTrue // true가 아니면 받지 않도록
    private Boolean agreedPersonal;

}

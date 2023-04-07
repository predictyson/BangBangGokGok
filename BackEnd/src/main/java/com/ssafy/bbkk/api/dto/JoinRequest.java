package com.ssafy.bbkk.api.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.Getter;
import lombok.ToString;


@ToString
@Getter
@Schema(description = "회원 가입 정보")
public class JoinRequest {
    @Schema(description = "이메일", required = true)
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    String email;
    @Schema(description = "비밀번호", required = true)
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    // 0~9 반드시 포함, a-zA-z 반드시 포함, 숫자 관련 특수문자(~!@#$%^&*()-_=+) 반드시 포함, 공백 없이 입력값 존재, 길이 8~16자
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()\\-_=+])(?=\\S+$).{8,16}", message = "비밀번호는 영문자, 숫자, 특수문자(~!@#$%^&*()-_=+)를 모두 구성하여 8~16자로 입력하세요.")
    String password;
}
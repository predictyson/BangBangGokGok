package com.ssafy.bbkk.api.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;


@ToString
@Getter
@Schema(description = "회원 가입 정보")
public class JoinRequest {
    @Schema(description = "이메일", required = true)
    String email;
    @Schema(description = "비밀번호", required = true)
    String password;
}

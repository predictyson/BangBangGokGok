package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@ToString
@Getter
@Schema(description = "로그인 정보")
public class LoginRequest {
    @Schema(description = "이메일", required = true)
    private String email;
    @Schema(description = "비밀번호", required = true)
    private String password;

    public UsernamePasswordAuthenticationToken toAuthentication(){
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}

package com.ssafy.bbkk.api.dto;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@ToString
@Getter
public class LoginRequest {
    private String email; // 이메일
    private String password; // 비밀번호

    public UsernamePasswordAuthenticationToken toAuthentication(){
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}

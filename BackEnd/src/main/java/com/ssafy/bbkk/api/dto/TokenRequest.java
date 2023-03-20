package com.ssafy.bbkk.api.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class TokenRequest {
    private String accessToken;
    private String refreshToken;
}
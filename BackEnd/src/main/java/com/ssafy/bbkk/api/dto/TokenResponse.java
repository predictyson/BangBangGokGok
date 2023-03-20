package com.ssafy.bbkk.api.dto;

import lombok.*;

@ToString
@Getter
@Builder
public class TokenResponse {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiresIn;
}
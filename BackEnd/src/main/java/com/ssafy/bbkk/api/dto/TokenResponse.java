package com.ssafy.bbkk.api.dto;

import lombok.*;

@ToString
@Getter
@Builder
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
}
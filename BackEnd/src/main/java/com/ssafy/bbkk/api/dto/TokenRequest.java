package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Schema(description = "토큰 정보")
public class TokenRequest {
    @Schema(description = "access 토큰", required = true)
    private String accessToken;
    @Schema(description = "refresh 토큰", required = true)
    private String refreshToken;
}
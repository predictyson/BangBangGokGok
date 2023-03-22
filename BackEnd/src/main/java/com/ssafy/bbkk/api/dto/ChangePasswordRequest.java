package com.ssafy.bbkk.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Schema(description = "변경할 비밀번호 정보")
public class ChangePasswordRequest {
    @Schema(description = "이메일", required = true)
    String email;
    @Schema(description = "비밀번호", required = true)
    String password;
}

package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
@Schema(description = "회원 가입 후 추가할 정보")
public class JoinAdditionalRequest {
    @Schema(description = "유저 id", required = true)
    int userId;
    @Schema(description = "닉네임", required = true)
    String nickname;
    @Schema(description = "선호 장르 id 목록", required = true)
    List<Integer> genreIds;
    @Schema(description = "선호 지역(대분류)", required = true)
    String regionBig;
    @Schema(description = "선호 지역(소분류)", required = true)
    String regionSmall;
    @Schema(description = "나이", required = true)
    int age;
    @Schema(description = "성별", required = true)
    String gender;
    @Schema(description = "프로필 이미지 타입", required = true)
    String profileImageType;
}

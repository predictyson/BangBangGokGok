package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@Schema(description = "유저 프로필 수정 정보")
public class UpdateUserInfoRequest {

    @Schema(description = "유저 id", required = true)
    private int userId;
    @Schema(description = "닉네임", required = true)
    private String nickname;
    @Schema(description = "선호 지역(대분류)", required = true)
    private String regionBig;
    @Schema(description = "선호 지역(소분류)", required = true)
    private String regionSmall;
    @Schema(description = "나이", required = true)
    private int age;
    @Schema(description = "성별", required = true)
    private String gender;
    @Schema(description = "프로필 이미지 타입", required = true)
    private String profileImageType;
    @Schema(description = "추가한 선호 장르 id 목록", required = true)
    private List<Integer> genreIdAdd;
    @Schema(description = "삭제한 선호 장르 id 목록", required = true)
    private List<Integer> genreIdDel;
}

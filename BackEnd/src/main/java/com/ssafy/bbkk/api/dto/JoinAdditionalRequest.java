package com.ssafy.bbkk.api.dto;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class JoinAdditionalRequest {
    int userId; // 유저 id
    String nickname; // 닉네임
    List<Integer> genreIds; // 선호 장르 id
    String regionBig; // 선호 지역(대분류)
    String regionSmall; // 선호 지역(소분류)
    int age; // 나이
    String gender; // 성별
    String profileImageType; // 프로필 이미지 타입
}

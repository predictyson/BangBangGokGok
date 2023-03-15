package com.ssafy.bbkk.api.dto;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class UpdateUserInfoRequest {

    private int userId; // 유저 id
    private String nickname; // 수정한 닉네임
    private String regionBig; // 수정한 선호 지역(대분류)
    private String regionSmall; // 수정한 선호 지역(소분류)
    private int age; // 수정한 나이
    private String gender; // 수정한 성별
    private String profileImageType; // 수정한 프로필 이미지 타입

    private List<Integer> genreIdAdd; // 추가한 선호 장르 id 목록
    private List<Integer> genreIdDel; // 삭제한 선호 장르 id 목록
}

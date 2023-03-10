package com.ssafy.bbkk.api.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SearchThemeRequest {

    private String word; // 검색어(지점명, 테마명 모두 가능)
    private String regionBig; // 지역 대분류(default ="전체")
    private String regionSmall; // 지역 소분류(default = "전체")
    private int genreId; // 장르 번호(default = -1)
    private float difficultyS; // 난이도 하한(default = 1)
    private float difficultyE; // 난이도 상한(default = 5)
    private int people; // 인원(default = 0)
    private int time; // 0 : 상관없음 || 1 : 60분 이하 || 2 : 60~90분 || 3 : 90분 이상
    private int page; // 불러올 페이지 넘버(한 페이지에 14개씩)
    private String sortby; // 정렬 기준("userRating", "userActivity", "userFear", "userDifficulty")
    private String orderby; // 정렬 방식("asc", "desc")

}
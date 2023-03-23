package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(description = "검색 필터 정보")
public class SearchThemeRequest {

    @Schema(description = "검색어(지점명 혹은 테마명)", required = true)
    private String word;
    @Schema(description = "지역 대분류", defaultValue = "전체", required = true)
    private String regionBig;
    @Schema(description = "지역 소분류", defaultValue = "전체", required = true)
    private String regionSmall;
    @Schema(description = "장르 번호", defaultValue = "-1", allowableValues = {"-1", "0", "1", "2", "3", "4", "5"}, required = true)
    private int genreId;
    @Schema(description = "난이도 하한", defaultValue = "1", allowableValues = {"1", "2", "3", "4", "5"}, required = true)
    private float difficultyS;
    @Schema(description = "난이도 상한", defaultValue = "5", allowableValues = {"1", "2", "3", "4", "5"}, required = true)
    private float difficultyE;
    @Schema(description = "인원", defaultValue = "0", allowableValues = {"0", "1", "2", "3", "4", "5", "6"}, required = true)
    private int people;
    @Schema(description = "러닝타임(0:상관없음, 1:~60분, 2:60~90분, 3:90분~)", allowableValues = {"0", "1", "2", "3"}, required = true)
    private int time; //
    @Schema(description = "페이지", defaultValue = "1", required = true)
    private int page;
    @Schema(description = "정렬 기준", defaultValue = "userRating", allowableValues = {"userRating", "userActivity", "userFear", "userDifficulty"}, required = true)
    private String sortby;
    @Schema(description = "정렬 방식", defaultValue = "asc", allowableValues = {"asc", "desc"}, required = true)
    private String orderby;

}
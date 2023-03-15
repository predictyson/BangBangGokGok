package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Theme;

import java.sql.Clob;
import java.util.List;
import java.util.stream.Collectors;
import lombok.ToString;


@ToString
public class ThemeResponse {

    private int themeId; // 테마 아이디
    private String regionBig; // 지역 대분류
    private String regionSmall; // 지역 소분류
    private String storeName; // 매장명
    private String title; // 테마명
    private float difficulty; // 난이도
    private int runningTime; // 시간
    private String openData; // 오픈일
    private int minPeople; // 최소 인원
    private int maxPeople; // 최대 인원
    private Clob imgUrl; // 테마 포스터 링크
    private String pageUrl; // 테마 예약페이지 링크
    private String synopsis; // 테마 시놉시스
    private double userRating; // 평점
    private double userActivity; // 활동성
    private double userFear; // 공포도
    private double userDifficulty; // 체감 난이도
    private double userCnt; // 평가 인원

    private List<String> genre; // 장르 목록
    private List<ReviewOfThemeResponse> reviews; // 해당 테마의 리뷰들

    public ThemeResponse(Theme theme) {
        this.themeId = theme.getId();
        this.regionBig = theme.getRegion().getRegionBig();
        this.regionSmall = theme.getRegion().getRegionSmall();
        this.storeName = theme.getStoreName();
        this.title = theme.getTitle();
        this.difficulty = theme.getDifficulty();
        this.runningTime = theme.getRunningTime();
        this.openData = theme.getOpenDate();
        this.minPeople = theme.getMinPeople();
        this.maxPeople = theme.getMaxPeople();
        this.imgUrl = theme.getImgUrl();
        this.pageUrl = theme.getPageUrl();
        this.synopsis = theme.getSynopsis();
        this.userRating = theme.getUserRating();
        this.userActivity = theme.getUserActivity();
        this.userFear = theme.getUserFear();
        this.userDifficulty = theme.getUserDifficulty();
        this.userCnt = theme.getUserCnt();

        this.genre = theme.getGenreOfThemes()
                .stream()
                .map(x -> x.getGenre().getCategory())
                .collect(Collectors.toList());

        this.reviews = theme.getReviews()
                .stream()
                .map(x -> new ReviewOfThemeResponse(x))
                .collect(Collectors.toList());
    }

}
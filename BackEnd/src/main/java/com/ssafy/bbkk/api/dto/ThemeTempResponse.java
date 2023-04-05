package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Theme;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

@ToString
@Getter
public class ThemeTempResponse {

    private int themeId; // 테마 id
    private String title; // 테마명
    private String imgUrl; // 테마 포스터 링크
    private List<String> genres; // 테마 장르 목록
    private double userRating; // 평점

    public ThemeTempResponse(Theme theme) {
        this.themeId = theme.getId();
        this.title = theme.getTitle();
        this.imgUrl = theme.getImgUrl();
        this.genres = theme.getGenreOfThemes()
                .stream()
                .map(x -> x.getGenre().getCategory())
                .collect(Collectors.toList());
         this.userRating = theme.getUserRating();
    }
}

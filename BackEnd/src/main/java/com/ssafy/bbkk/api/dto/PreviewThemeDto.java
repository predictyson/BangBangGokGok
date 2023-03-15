package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Theme;
import lombok.ToString;

import java.sql.Clob;
import java.util.List;
import java.util.stream.Collectors;

@ToString
public class PreviewThemeDto {

    private int themeId; // 테마 id
    private String title; // 테마명
    private Clob imgUrl; // 테마 포스터 링크
    private List<String> genres; // 테마 장르 목록

    public PreviewThemeDto(Theme theme) {
        this.themeId = theme.getId();
        this.title = theme.getTitle();
        this.imgUrl = theme.getImgUrl();
        this.genres = theme.getGenreOfThemes()
                .stream()
                .map(x->x.getGenre().getCategory())
                .collect(Collectors.toList());
    }
}
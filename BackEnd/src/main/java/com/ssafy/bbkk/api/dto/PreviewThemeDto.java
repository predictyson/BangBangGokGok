package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Theme;
import lombok.*;

@ToString
public class PreviewThemeDto {

    private int themeId; // 테마 id
    private String title; // 테마명
    private String imgUrl; // 테마 포스터 링크

    public PreviewThemeDto(Theme theme){
        this.themeId = theme.getId();
        this.title = theme.getTitle();
        this.imgUrl = theme.getImgUrl();
    }
}

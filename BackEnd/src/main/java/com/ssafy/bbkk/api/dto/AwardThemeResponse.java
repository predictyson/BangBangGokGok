package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.AwardTheme;
import lombok.ToString;

@ToString
public class AwardThemeResponse {

    private String awardName; // 수상 부문
    private int themeId; // 테마 id
    private String title; // 테마명
    private String imgUrl; // 테마 포스터 링크

    public AwardThemeResponse(AwardTheme awardTheme) {
        this.awardName = awardTheme.getAwardName();
        this.themeId = awardTheme.getTheme().getId();
        this.title = awardTheme.getTheme().getTitle();
        this.imgUrl = awardTheme.getTheme().getImgUrl();
    }

}
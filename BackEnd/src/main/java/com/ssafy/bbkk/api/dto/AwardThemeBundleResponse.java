package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.AwardTheme;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class AwardThemeBundleResponse {

    private int year; // 어워즈 연도
    private List<AwardThemeResponse> theme; // 수상 테마 목록

    public AwardThemeBundleResponse(int year, List<AwardTheme> list) {
        this.year = year;
        this.theme = list.stream()
                .map(x -> new AwardThemeResponse(x))
                .collect(Collectors.toList());
    }

}
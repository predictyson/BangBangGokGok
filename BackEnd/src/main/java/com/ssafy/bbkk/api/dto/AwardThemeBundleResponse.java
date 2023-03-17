package com.ssafy.bbkk.api.dto;

import java.util.List;
import lombok.ToString;

@ToString
public class AwardThemeBundleResponse {

    private String label; // 수상 테마 목록의 라벨
    private String year; // 수상 연도
    private List<PreviewThemeResponse> theme; // 수상 테마 목록

}
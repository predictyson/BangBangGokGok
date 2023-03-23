package com.ssafy.bbkk.api.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class ThemeBundleResponse {

    private String label; // 해당 테마 목록의 라벨
    private List<PreviewThemeResponse> themes; // 해당 테마 목록

}
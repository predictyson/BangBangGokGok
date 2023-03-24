package com.ssafy.bbkk.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
public class ThemeCountResponse {
    int themeId;
    int count;
}

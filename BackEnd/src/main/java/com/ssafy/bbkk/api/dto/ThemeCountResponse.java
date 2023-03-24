package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Theme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
public class ThemeCountResponse {
    int themeID;
    int count;
}

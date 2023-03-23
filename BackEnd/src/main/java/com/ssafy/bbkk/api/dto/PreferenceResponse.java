package com.ssafy.bbkk.api.dto;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class PreferenceResponse {

    private String genre; // 장르
    private int count; // 해당 장르 방문 횟수

    public PreferenceResponse(String genre, int count) {
        this.genre = genre;
        this.count = count;
    }
}
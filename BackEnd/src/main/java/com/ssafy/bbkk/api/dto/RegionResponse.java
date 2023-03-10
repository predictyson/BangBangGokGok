package com.ssafy.bbkk.api.dto;

import lombok.ToString;

import java.util.List;

@ToString
public class RegionResponse {

    private String regionBig; // 지역 대분류
    private List<String> regionSmalls; // 지역 소분류들

    public RegionResponse(String regionBig, List<String> regionSmalls){
        this.regionBig = regionBig;
        this.regionSmalls = regionSmalls;
    }
}

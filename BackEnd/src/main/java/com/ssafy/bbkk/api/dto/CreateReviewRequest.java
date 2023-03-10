package com.ssafy.bbkk.api.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CreateReviewRequest {

    private int themeId; // 테마 id
    private String content; // 리뷰 내용
    private double rating; // 평점
    private double activity; // 활동성
    private double fear; // 공포도
    private double difficulty; // 체감 난이도
    private int isSuccess; // 성공 여부 (0,1)
    private float record; // 성공 기록 (분.초)

}

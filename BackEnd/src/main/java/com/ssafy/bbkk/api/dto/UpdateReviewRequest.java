package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Schema(description = "리뷰 수정 정보")
public class UpdateReviewRequest {

    @Schema(description = "access 토큰", required = true)
    private int reviewId; // 수정할 리뷰 id
    @Schema(description = "access 토큰", required = true)
    private String content; // 수정할 리뷰 내용
    @Schema(description = "access 토큰", required = true)
    private double userRating; // 평점
    @Schema(description = "access 토큰", required = true)
    private double userActivity; // 활동성
    @Schema(description = "access 토큰", required = true)
    private double userFear; // 공포도
    @Schema(description = "access 토큰", required = true)
    private double userDifficulty; // 체감 난이도
    @Schema(description = "access 토큰", required = true)
    private int isSuccess; // 성공 여부 (0,1)
//    @Schema(description = "access 토큰", required = true)
//    private int recordHH; // 성공 기록 (시)
//    @Schema(description = "access 토큰", required = true)
//    private int recordMM; // 성공 기록 (분)
//    @Schema(description = "access 토큰", required = true)
//    private int recordSS; // 성공 기록 (초)

}

package com.ssafy.bbkk.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Schema(description = "작성한 리뷰 정보")
public class CreateReviewRequest {

    @Schema(description = "테마 Id", required = true)
    private int themeId;
    @Schema(description = "리뷰 내용", required = true)
    private String content;
    @Schema(description = "평점(0~5)", required = true)
    private double rating;
    @Schema(description = "활동성(0~5)", required = true)
    private double activity;
    @Schema(description = "공포도(0~5)", required = true)
    private double fear;
    @Schema(description = "체감 난이도(0~5)", required = true)
    private double difficulty;
    @Schema(description = "성공 여부(0 or 1)", required = true)
    private int isSuccess;
//    @Schema(description = "성공 기록(시)", required = false)
//    private int recordHH;
//    @Schema(description = "성공 기록(분)", required = false)
//    private int recordMM;
//    @Schema(description = "성공 기록(초)", required = false)
//    private int recordSS;

}

package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Schema(description = "작성한 리뷰 정보")
public class CreateReviewRequest {

    @Schema(description = "테마 id", required = true)
    @Positive(message = "테마 id는 양수여야 합니다.")
    private int themeId;
    @Schema(description = "리뷰 내용", required = true)
    @NotEmpty(message = "리뷰 내용은 필수 입력 값입니다.")
    @Size(max = 500, message = "리뷰 내용은 공백 포함 500자 이하여야 합니다.")
    private String content;
    @Schema(description = "평점(0~5)", required = true)
    @Min(value = 0, message = "평점은 0 이상이어야 합니다.")
    @Max(value = 5, message = "평점은 5 이하여야 합니다.")
    private double userRating;
    @Schema(description = "체감 활동성(0~5)", required = true)
    @Min(value = 0, message = "체감 활동성은 0 이상이어야 합니다.")
    @Max(value = 5, message = "체감 활동성은 5 이하여야 합니다.")
    private double userActivity;
    @Schema(description = "체감 공포도(0~5)", required = true)
    @Min(value = 0, message = "체감 공포도는 0 이상이어야 합니다.")
    @Max(value = 5, message = "체감 공포도는 5 이하여야 합니다.")
    private double userFear;
    @Schema(description = "체감 난이도(0~5)", required = true)
    @Min(value = 0, message = "체감 난이도는 0 이상이어야 합니다.")
    @Max(value = 5, message = "체감 난이도는 5 이하여야 합니다.")
    private double userDifficulty;
    @Schema(description = "성공 여부(0 or 1)", required = true)
    private int isSuccess;

//    @Schema(description = "성공 기록(시)", required = false)
//    private int recordHH;
//    @Schema(description = "성공 기록(분)", required = false)
//    private int recordMM;
//    @Schema(description = "성공 기록(초)", required = false)
//    private int recordSS;

    public void validation() throws Exception {
        if (userRating % 0.5 != 0)
            throw new Exception("입력한 평점 값이 올바르지 않습니다.");
        if (userActivity % 0.5 != 0)
            throw new Exception("입력한 체감 활동성 값이 올바르지 않습니다.");
        if (userFear % 0.5 != 0)
            throw new Exception("입력한 체감 공포도 값이 올바르지 않습니다.");
        if (userDifficulty % 0.5 != 0)
            throw new Exception("입력한 체감 난이도 값이 올바르지 않습니다.");
        if (!(isSuccess == 0 || isSuccess == 1))
            throw new Exception("입력한 성공 여부 값이 올바르지 않습니다.");
    }

}
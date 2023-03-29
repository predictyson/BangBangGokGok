package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(description = "검색 필터 정보")
public class SearchThemeRequest {

    @Schema(description = "검색어(지점명 혹은 테마명)", required = true)
    @Size(max = 20, message = "검색어는 공백 포함 20자 이하여야 합니다.")
    private String word;
    @Schema(description = "지역 대분류", defaultValue = "전체", required = true)
    @NotBlank(message = "지역 대분류는 필수 입력 값입니다.")
    private String regionBig;
    @Schema(description = "지역 소분류", defaultValue = "전체", required = true)
    @NotBlank(message = "지역 소분류는 필수 입력 값입니다.")
    private String regionSmall;
    @Schema(description = "장르 번호", defaultValue = "0", allowableValues = {"0", "1", "2", "...", "20"}, required = true)
    @Min(value = 0, message = "장르 번호는 0 이상이어야 합니다.")
    @Max(value = 20, message = "장르 번호는 20 이하여야 합니다.")
    private int genreId;
    @Schema(description = "난이도 하한", defaultValue = "1", allowableValues = {"1", "1.5", "...", "4.5"}, required = true)
    private float difficultyS;
    @Schema(description = "난이도 상한", defaultValue = "5", allowableValues = {"1.5", "2.0", "...", "5"}, required = true)
    private float difficultyE;
    @Schema(description = "인원", defaultValue = "0", allowableValues = {"0", "1", "2", "...", "6"}, required = true)
    @Min(value = 0, message = "인원 값은 0 이상이어야 합니다.")
    @Max(value = 6, message = "인원 값은 6 이하여야 합니다.")
    private int people;
    @Schema(description = "러닝타임(0:상관없음, 1:60분 이하, 2:60분 초과)", allowableValues = {"0", "1", "2"}, required = true)
    @Min(value = 0, message = "시간 입력 값은 0 이상이어야 합니다.")
    @Max(value = 2, message = "시간 입력 값은 2 이하여야 합니다..")
    private int time;
    @Schema(description = "페이지", defaultValue = "1", required = true)
    @Positive(message = "페이지는 양수여야 합니다.")
    private int page;
    @Schema(description = "정렬 기준", defaultValue = "userRating", allowableValues = {"userRating", "userActivity", "userFear", "userDifficulty"}, required = true)
    private String sortby;
    @Schema(description = "정렬 방식", defaultValue = "desc", allowableValues = {"asc", "desc"}, required = true)
    private String orderby;

    public void validation() throws Exception {
        if (!(1.0 <= difficultyS && difficultyS <= 4.5 && difficultyS % 0.5 == 0))
            throw new Exception("입력한 난이도 하한 값이 올바르지 않습니다.");
        if (!(1.5 <= difficultyE && difficultyE <= 5.0 && difficultyE % 0.5 == 0))
            throw new Exception("입력한 난이도 상한 값이 올바르지 않습니다.");
    }

}
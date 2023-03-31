package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@Schema(description = "유저 프로필 수정 정보")
public class UpdateUserInfoRequest {

    @Schema(description = "유저 id", required = true)
    @Positive(message = "유저 id는 자연수여야 합니다.")
    private int userId;
    @Schema(description = "닉네임", required = true)
    @NotEmpty(message = "닉네임은 필수 입력 값입니다.")
    @Size(max = 10, message = "닉네임은 10글자 이하여야 합니다.")
    private String nickname;
    @Schema(description = "선호 지역(대분류)", required = true)
    @NotBlank(message = "선호 지역(대분류)는 필수 입력 값입니다.")
    private String regionBig;
    @Schema(description = "선호 지역(소분류)", required = true)
    @NotBlank(message = "선호 지역(소분류)는 필수 입력 값입니다.")
    private String regionSmall;
    @Schema(description = "나이", required = true)
    @Positive(message = "나이는 자연수여야 합니다.")
    private int age;
    @Schema(description = "성별", required = true)
    @NotBlank(message = "성별은 필수 입력 값입니다.")
    private String gender;
    @Schema(description = "프로필 이미지 타입", required = true)
    @NotBlank(message = "프로필 이미지는 필수 입력 값입니다.")
    private String profileImageType;
    @Schema(description = "추가한 선호 장르 id 목록", required = true)
    @Size(min = 0, max = 4, message = "선호 장르는 4개까지만 추가할 수 있습니다.")
    private List<Integer> genreIdAdd;
    @Schema(description = "삭제한 선호 장르 id 목록", required = true)
    @Size(min = 0, max = 4, message = "선호 장르는 4개까지만 삭제할 수 있습니다.")
    private List<Integer> genreIdDel;

    public void validation() throws Exception {
        Set<String> imgType = new HashSet<>();
        for (int i = 1; i <= 10; i++)
            imgType.add("Avatar" + i);

        if (!("M".equals(gender) || "W".equals(gender)))
            throw new Exception("입력한 성별이 올바르지 않습니다.");
        if (!imgType.contains(profileImageType))
            throw new Exception("입력한 프로필 이미지가 올바르지 않습니다.");
    }

}
package com.ssafy.bbkk.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Schema(description = "회원 가입 후 추가할 정보")
public class JoinAdditionalRequest {

    @Schema(description = "유저 id", required = true)
    @Positive(message = "유저 id는 양수여야 합니다.")
    int userId;
    @Schema(description = "닉네임", required = true)
    @NotEmpty(message = "닉네임은 필수 입력 값입니다.")
    @Size(max = 10, message = "닉네임은 10글자 이하여야 합니다.")
    String nickname;
    @Schema(description = "선호 장르 id 목록", required = true)
    @Size(min = 1, max = 4, message = "선호 장르는 4개 이하만 선택해야 합니다.")
    List<Integer> genreIds;
    @Schema(description = "선호 지역(대분류)", required = true)
    @NotBlank(message = "선호 지역(대분류)는 필수 입력 값입니다.")
    String regionBig;
    @Schema(description = "선호 지역(소분류)", required = true)
    @NotBlank(message = "선호 지역(소분류)는 필수 입력 값입니다.")
    String regionSmall;
    @Schema(description = "나이", required = true)
    int age;
    @Schema(description = "성별", required = true)
    @NotBlank(message = "성별은 필수 입력 값입니다.")
    String gender;
    @Schema(description = "프로필 이미지 타입", required = true)
    @NotBlank(message = "프로필 이미지는 필수 입력 값입니다.")
    String profileImageType;

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
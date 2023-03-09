package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.InterestedThemeOfUser;
import lombok.ToString;

@ToString
public class InterestThemeResponse {

    private int interestedThemeOfUserId; // 관심 테마 id
    private PreviewThemeDto previewThemeDto; // 테마 간략 정보

    public InterestThemeResponse(InterestedThemeOfUser interestedThemeOfUser){
        this.interestedThemeOfUserId = interestedThemeOfUser.getId();
        this.previewThemeDto = new PreviewThemeDto(interestedThemeOfUser.getTheme());
    }
}

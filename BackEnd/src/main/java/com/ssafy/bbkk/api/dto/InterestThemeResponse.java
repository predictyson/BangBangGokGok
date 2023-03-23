package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.InterestedThemeOfUser;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class InterestThemeResponse {

    private int interestedThemeOfUserId; // 관심 테마 id
    private PreviewThemeResponse previewThemeResponse; // 테마 간략 정보

    public InterestThemeResponse(InterestedThemeOfUser interestedThemeOfUser){
        this.interestedThemeOfUserId = interestedThemeOfUser.getId();
        this.previewThemeResponse = new PreviewThemeResponse(interestedThemeOfUser.getTheme());
    }
}

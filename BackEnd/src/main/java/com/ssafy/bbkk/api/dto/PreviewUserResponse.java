package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.User;
import lombok.ToString;

@ToString
public class PreviewUserResponse {

    private int userId; // 유저 id
    private String nickname; // 유저 닉네임
    private String email; // 유저 이메일
    private String profileImageType; // 프로필 이미지 타입

    public PreviewUserResponse(User user){
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.profileImageType = user.getProfileImageType();
    }
}

package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.User;
import lombok.ToString;

@ToString
public class LoginResponse {
    private int userId;
    private String nickname;

    public LoginResponse(User user){
        this.userId = user.getId();
        this.nickname = user.getNickname();
    }
}

package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Region;
import com.ssafy.bbkk.db.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserInfoResponse {

    private int id;
    private String nickname; // 닉네임
    private int age; // 나이
    private String gender; // 성별 {'W', 'M'}
    private int profileImageType; // 프로필 이미지
    private Region region; // 선호 지역

    public UserInfoResponse(User user){
        this.id = user.getId();
        this.nickname = user.getNickname();
        this.age = user.getAge();
        this.gender = user.getGender();
        this.profileImageType = user.getProfileImageType();
        this.region = user.getRegion();
    }
}

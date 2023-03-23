package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Region;
import com.ssafy.bbkk.db.entity.User;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@ToString
@Getter
public class UserInfoResponse {

    private int id;
    private String nickname; // 닉네임
    private int age; // 나이
    private String gender; // 성별 {'W', 'M'}
    private String profileImageType; // 프로필 이미지
    private Region region; // 선호 지역
    private List<String> genres; // 선호 장르 목록

    public UserInfoResponse(User user){
        this.id = user.getId();
        this.nickname = user.getNickname();
        this.age = user.getAge();
        this.gender = user.getGender();
        this.profileImageType = user.getProfileImageType();
        this.region = user.getRegion();
        this.genres = user.getPreferredGenreOfUsers()
                .stream()
                .map(x->x.getGenre().getCategory())
                .collect(Collectors.toList());
    }
}

package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="user")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;
    @Column(nullable = false)
    private String email; // 이메일
    @Column(nullable = false)
    private String password; // 비밀번호
    @Column(nullable = false)
    private String nickname; // 닉네임
    @Column(nullable = false)
    private int age; // 나이
    @Column(nullable = false, length = 1)
    private String gender; // 성별 {'W', 'M'}
    @Column(nullable = false)
    private int profileImageType; // 프로필 이미지

    @OneToOne
    @JoinColumn(name = "region_id") // 선호 지역은 하나만 선택하며, 영속성 관리를 할 필요가 없다
    private Region region; // 선호 지역

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PreferredGenreOfUser> preferredGenreOfUsers = new ArrayList<>(); // 선호 장르들

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecommendedThemeOfUser> recommendedThemeOfUsers = new ArrayList<>(); // 추천 테마

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterestedThemeOfUser> interestedThemeOfUsers = new ArrayList<>(); // 관심 테마 목록

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>(); // 작성한 테마 리뷰 목록


}

package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="recommended_theme_of_user")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendedThemeOfUser extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommended_theme_of_user_id")
    private int id;
    @Column(nullable = false)
    private int type; // 맞춤 추천 테마의 유형

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user; // 테마를 추천받는 유저

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name="theme_id")
    private Theme theme; // 유저의 추천 테마
}

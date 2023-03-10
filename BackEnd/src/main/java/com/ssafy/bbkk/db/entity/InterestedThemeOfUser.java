package com.ssafy.bbkk.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Table(name="interested_theme_of_user")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterestedThemeOfUser extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interested_theme_of_user_id")
    private int id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user; // 테마에 관심을 누를 유저

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name="theme_id")
    private Theme theme; // 유저가 관심을 누른 테마

    public InterestedThemeOfUser(User user, Theme theme){
        this.user = user;
        this.theme = theme;
    }
}

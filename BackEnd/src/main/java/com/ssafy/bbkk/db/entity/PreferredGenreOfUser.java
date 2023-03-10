package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="preferred_genre_of_user")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PreferredGenreOfUser extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preferred_genre_of_user_id")
    private int id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user; // 선호하는 장르를 고른 유저

    @ManyToOne(targetEntity = Genre.class, fetch = FetchType.LAZY)
    @JoinColumn(name="genre_id")
    private Genre genre; // 유저가 선호하는 장르

    public PreferredGenreOfUser(User user, Genre genre){
        this.user = user;
        this.genre = genre;
    }
}

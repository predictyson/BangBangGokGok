package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="genre")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Genre extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private int id;
    @Column(nullable = false)
    private String category; // 장르 카테고리

    @OneToMany(mappedBy = "genre", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GenreOfTheme> genreOfThemes = new ArrayList<>(); // 해당 장르를 가지고 있는 테마

    @OneToMany(mappedBy = "genre", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserPreferredGenre> userPreferredGenres = new ArrayList<>(); // 해당 장르를 선호 장르로 가지고 있는 유저
}

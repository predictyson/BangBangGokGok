package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="genre_of_theme")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GenreOfTheme extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_of_theme_id")
    private int id;

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name="theme_id")
    private Theme theme; // 장르를 가진 테마

    @ManyToOne(targetEntity = Genre.class, fetch = FetchType.LAZY)
    @JoinColumn(name="genre_id")
    private Genre genre; // 테마의 장르
}

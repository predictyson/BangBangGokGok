package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="theme")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Theme extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String storeName;
    @Column(nullable = false)
    private float difficulty;
    @Column(nullable = false)
    private int runningTime;
    @Column(nullable = false)
    private LocalDateTime openDate;
    @Column(nullable = false)
    private int minPeople;
    @Column(nullable = false)
    private int maxPeople;
    @Column(nullable = false)
    private String imgUrl;
    @Column(nullable = false)
    private String pageUrl;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private float userRating;
    @Column(nullable = false)
    private float userActivity;
    @Column(nullable = false)
    private float userFear;
    @Column(nullable = false)
    private float userDifficulty;

}

package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="review")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
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
    @Column(nullable = false)
    private int isSuccess;
    @Column(nullable = false)
    private LocalDateTime record;

}

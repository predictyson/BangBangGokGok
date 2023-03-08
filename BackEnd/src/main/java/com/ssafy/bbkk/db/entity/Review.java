package com.ssafy.bbkk.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="review")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int id;
    @Column(nullable = false)
    private String content; // 리뷰 내용
    @Column(nullable = false)
    private float userRating; // 리뷰 평점
    @Column(nullable = false)
    private float userActivity; // 체감 활동성
    @Column(nullable = false)
    private float userFear; // 체감 공포도
    @Column(nullable = false)
    private float userDifficulty; // 체감 난이도
    @Column(nullable = false)
    private int isSuccess; // 성공 여부
    @Column(nullable = false)
    private float record; // 탈출 시간 (분)

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user; // 작성 유저

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name="theme_id")
    private Theme theme; // 해당 테마

    @PrePersist
    public void prePersist(){
        if(this.isSuccess == 0){
            this.record = 0;
        }
    }
}
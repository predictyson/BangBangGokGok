package com.ssafy.bbkk.db.entity;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
    private double userRating; // 리뷰 평점
    @Column(nullable = false)
    private double userActivity; // 체감 활동성
    @Column(nullable = false)
    private double userFear; // 체감 공포도
    @Column(nullable = false)
    private double userDifficulty; // 체감 난이도
    @Column(nullable = false)
    private int isSuccess; // 성공 여부
//    @Column(nullable = true)
//    private LocalTime record; // 탈출 시간 (HH:MM:SS)

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user; // 작성 유저

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name="theme_id")
    private Theme theme; // 해당 테마

    public Review(User user, Theme theme, CreateReviewRequest createReviewRequest){
        this.content = createReviewRequest.getContent();
        this.userRating = createReviewRequest.getRating();
        this.userActivity = createReviewRequest.getActivity();
        this.userFear = createReviewRequest.getFear();
        this.userDifficulty = createReviewRequest.getDifficulty();
        this.isSuccess = createReviewRequest.getIsSuccess();
//        if(createReviewRequest.getIsSuccess() == 1){
//            this.record = LocalTime.of(createReviewRequest.getRecordHH(),
//                                        createReviewRequest.getRecordMM(),
//                                        createReviewRequest.getRecordSS());
//        }

        this.user = user;
        this.theme = theme;
    }

    public void updateReviewInfo(UpdateReviewRequest updateReviewRequest){
        this.content = updateReviewRequest.getContent();
        this.userRating = updateReviewRequest.getReviewId();
        this.userActivity = updateReviewRequest.getReviewId();
        this.userFear = updateReviewRequest.getFear();
        this.userDifficulty = updateReviewRequest.getDifficulty();
        this.isSuccess = updateReviewRequest.getIsSuccess();

//        if(updateReviewRequest.getIsSuccess() == 1){
//            this.record = LocalTime.of(updateReviewRequest.getRecordHH(),
//                    updateReviewRequest.getRecordMM(),
//                    updateReviewRequest.getRecordSS());
//        }
    }
}

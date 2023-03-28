package com.ssafy.bbkk.db.entity;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "review")
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review extends BaseTimeEntity {

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
    @JoinColumn(name = "user_id")
    private User user; // 작성 유저

    @ManyToOne(targetEntity = Theme.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_id")
    private Theme theme; // 해당 테마

    public Review(User user, Theme theme, CreateReviewRequest createReviewRequest) {
        this.content = createReviewRequest.getContent();
        this.userRating = createReviewRequest.getUserRating();
        this.userActivity = createReviewRequest.getUserActivity();
        this.userFear = createReviewRequest.getUserFear();
        this.userDifficulty = createReviewRequest.getUserDifficulty();
        this.isSuccess = createReviewRequest.getIsSuccess();

        this.user = user;
        this.theme = theme;
    }

    public void updateReviewInfo(UpdateReviewRequest updateReviewRequest) {
        this.content = updateReviewRequest.getContent();
        this.userRating = updateReviewRequest.getUserRating();
        this.userActivity = updateReviewRequest.getUserActivity();
        this.userFear = updateReviewRequest.getUserFear();
        this.userDifficulty = updateReviewRequest.getUserDifficulty();
        this.isSuccess = updateReviewRequest.getIsSuccess();
    }

}
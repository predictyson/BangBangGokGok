package com.ssafy.bbkk.api.dto;

import com.ssafy.bbkk.db.entity.Review;
import com.ssafy.bbkk.db.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewResponse {

    private int reviewId; // 리뷰 id
    private String content; // 리뷰 내용
    private double userRating; // 유저 평점
    private double userActivity; // 활동성
    private double userFear; // 공포도
    private double userDifficulty; // 체감 난이도
    private LocalDateTime createTime; // 리뷰 작성 날짜
    private int isSuccess; // 성공 여부 (0:실패, 1:성공)
    private double record; // 성공 기록

    private PreviewThemeDto previewThemeDto; // 테마 간략 정보

    public ReviewResponse(Review review){
        this.reviewId = review.getId();
        this.content = review.getContent();
        this.userRating = review.getUserRating();
        this.userActivity = review.getUserActivity();
        this.userFear = review.getUserFear();
        this.userDifficulty = review.getUserDifficulty();
        this.createTime = review.getCreatedDate();
        this.isSuccess = review.getIsSuccess();
        this.record = review.getRecord();

        this.previewThemeDto = new PreviewThemeDto(review.getTheme());
    }
}

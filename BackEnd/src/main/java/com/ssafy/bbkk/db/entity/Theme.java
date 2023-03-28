package com.ssafy.bbkk.db.entity;

import com.ssafy.bbkk.api.dto.UpdateReviewRequest;
import lombok.*;

import javax.persistence.*;
import java.sql.Clob;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="theme") // 테마 Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Theme extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theme_id")
    private int id;
    @Column(nullable = false)
    private String title; // 테마명
    @Column(nullable = false)
    private String storeName; // 매장명
    @Column(nullable = false)
    private float difficulty; // 난이도 (제공된 난이도가 없으면 -1)
    @Column(nullable = false)
    private int runningTime; // 제한 시간
    @Column(nullable = false)
    private String openDate; // 오픈일
    @Column(nullable = false)
    private int minPeople; // 최소 인원
    @Column(nullable = false)
    private int maxPeople; // 최대 인원
    @Column(nullable = false, length = 2000)
    private String imgUrl; // 테마 포스터 사진
    @Column(nullable = false)
    private String pageUrl; // 테마 홈페이지 링크
    @Column(nullable = false, length = 2000)
    private String synopsis; // 테마 시놉시스
    @Column(nullable = false)
    private double userRating; // 유저 평점
    @Column(nullable = false)
    private double userActivity; // 체감 활동성
    @Column(nullable = false)
    private double userFear; // 체감 공포도
    @Column(nullable = false)
    private double userDifficulty; // 체감 난이도
    @Column(nullable = false)
    private int userCnt; // 참가한 유저 인원

    @OneToOne
    @JoinColumn(name = "region_id") // 선호 지역은 하나만 선택하며, 영속성 관리를 할 필요가 없다
    private Region region; // 매장 지역

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecommendedThemeOfUser> recommendedThemeOfUsers = new ArrayList<>(); // 해당 테마를 추천받은 유저들 (실제로는 사용되지 않을듯)

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GenreOfTheme> genreOfThemes = new ArrayList<>(); // 테마의 장르 목록

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterestedThemeOfUser> interestedThemeOfUsers = new ArrayList<>(); // 테마에 관심을 누른 유저 목록

    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>(); // 테마의 리뷰 목록

    public void addReview(Review review){
        this.userActivity = this.userActivity * this.userCnt + review.getUserActivity();
        this.userDifficulty = this.userDifficulty * this.userCnt + review.getUserDifficulty();
        this.userFear = this.userFear * this.userCnt + review.getUserFear();
        this.userRating = this.userRating * this.userCnt + review.getUserRating();

        this.userCnt++;
        this.userActivity = this.userActivity / (double)this.userCnt;
        this.userDifficulty = this.userDifficulty / (double)this.userCnt;
        this.userFear = this.userFear / (double)this.userCnt;
        this.userRating = this.userRating / (double)this.userCnt;
    }

    public void modifyReview(Review beforeReview, UpdateReviewRequest afterReview){
        this.userActivity += (afterReview.getUserActivity() - beforeReview.getUserActivity()) / (double)this.userCnt;
        this.userDifficulty += (afterReview.getUserDifficulty() - beforeReview.getUserDifficulty()) / (double)this.userCnt;
        this.userFear += (afterReview.getUserFear() - beforeReview.getUserFear()) / (double)this.userCnt;
        this.userRating += (afterReview.getUserRating() - beforeReview.getUserRating()) / (double)this.userCnt;
    }

    public void deleteReview(Review review){
        this.userActivity = this.userActivity * this.userCnt - review.getUserActivity();
        this.userDifficulty = this.userDifficulty * this.userCnt - review.getUserDifficulty();
        this.userFear = this.userFear * this.userCnt - review.getUserFear();
        this.userRating = this.userRating * this.userCnt - review.getUserRating();

        this.userCnt--;
        this.userActivity = this.userActivity / (double)this.userCnt;
        this.userDifficulty = this.userDifficulty / (double)this.userCnt;
        this.userFear = this.userFear / (double)this.userCnt;
        this.userRating = this.userRating / (double)this.userCnt;
    }
}
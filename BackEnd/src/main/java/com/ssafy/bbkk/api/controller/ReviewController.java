package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.ReviewOfThemeResponse;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;
import com.ssafy.bbkk.api.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("review")
@RequiredArgsConstructor
public class ReviewController {

    private static final Logger logger = LoggerFactory.getLogger(ReviewController.class);

    private final ReviewService reviewService;

//    @Operation(summary = "테마의 리뷰 목록 조회", description = "해당 테마의 리뷰 목록을 불러온다")
//    @GetMapping("{themeId}")
//    private ResponseEntity<Map<String, Object>> getReviews(
//            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable int themeId) throws Exception {
//        logger.info("[getReviews] request : themeId={}", themeId);
//
//        Map<String, Object> resultMap = new HashMap<>();
//        List<ReviewOfThemeResponse> reviewOfThemeResponses = reviewService.getReviews(themeId);
//
//        resultMap.put("reviews", reviewOfThemeResponses);
//
//        logger.info("[getReviews] response : reviews={}", reviewOfThemeResponses);
//
//        return new ResponseEntity<>(resultMap, HttpStatus.OK);
//    }

    @Operation(summary = "테마에 리뷰를 작성", description = "해당 테마에 새로운 리뷰를 작성한다")
    @PostMapping
    private ResponseEntity<Void> addReview(
            @AuthenticationPrincipal User user,
            @RequestBody CreateReviewRequest createReviewRequest) throws Exception {

        logger.info("[addReview] request : myEmail={}, createReviewRequest={}", user.getUsername(), createReviewRequest);

        reviewService.addReview(user.getUsername(), createReviewRequest);

        logger.info("[addReview] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "테마의 리뷰를 수정", description = "해당 테마에 작성된 리뷰를 수정한다")
    @PutMapping
    private ResponseEntity<Map<String, Object>> setReview(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateReviewRequest updateReviewRequest) throws Exception {

        logger.info("[setReview] request : myEmail={}, updateReviewRequest={}", user.getUsername(), updateReviewRequest);

        Map<String, Object> resultMap = new HashMap<>();

        ReviewOfUserResponse reviewOfUserResponse = reviewService.setReview(user.getUsername(), updateReviewRequest);

        resultMap.put("review", reviewOfUserResponse);

        logger.info("[setReview] response : review={}", reviewOfUserResponse);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마의 리뷰를 제거", description = "해당 테마의 리뷰를 제거한다")
    @DeleteMapping("{reviewId}")
    private ResponseEntity<Void> deleteReview(
            @AuthenticationPrincipal User user,
            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable int reviewId) throws Exception {

        logger.info("[deleteReview] request : myEmail={}, reviewId={}", user.getUsername(), reviewId);

        reviewService.deleteReview(user.getUsername(), reviewId);

        logger.info("[deleteReview] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.api.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("profile")
@RequiredArgsConstructor
public class ReviewController {

    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);

    private final ReviewService reviewService;

    @PostMapping
    private ResponseEntity<Map<String, Object>> addReview(
            @AuthenticationPrincipal User user,
            @RequestBody CreateReviewRequest createReviewRequest) throws Exception{

        logger.info("[addReview] request : myEmail={}, createReviewRequest={}", user.getUsername(), createReviewRequest);

        Map<String, Object> resultMap = new HashMap<>();
        reviewService.addReview(user.getUsername(), createReviewRequest);

        logger.info("[addReview] response : ");

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

}

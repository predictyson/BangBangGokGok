package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;
import com.ssafy.bbkk.api.service.OtherService;
import com.ssafy.bbkk.api.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    private final OtherService otherService;

    @Operation(summary = "테마에 리뷰를 작성", description = "테마에 새로운 리뷰를 작성한다")
    @PostMapping
    private ResponseEntity<Void> addReview(@AuthenticationPrincipal User user,
            @RequestBody @Valid CreateReviewRequest createReviewRequest, Errors errors) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        logger.info("\n[{}]<<---------------(start)----------------||addReview||------------------------------------>>",now);
        logger.info(">> request : myEmail={}", user.getUsername());
        logger.info(">> request : createReviewRequest={}", createReviewRequest);

        // createReviewRequest 입력값 유효성 검사
        for (FieldError error : errors.getFieldErrors())
            throw new Exception(error.getDefaultMessage());
        createReviewRequest.validation();

        reviewService.addReview(user.getUsername(), createReviewRequest);
        logger.info("<< response : none");

        otherService.recCF(user.getUsername());
        logger.info("<< response api : recCF({})",user.getUsername());
        logger.info("\n[{}]<<---------------------------------------||getSelectList||---------------(end)--------------->>",now);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "테마의 리뷰를 수정", description = "해당 테마에 작성된 리뷰를 수정한다")
    @PutMapping
    private ResponseEntity<Map<String, Object>> setReview(@AuthenticationPrincipal User user,
            @RequestBody @Valid UpdateReviewRequest updateReviewRequest, Errors errors) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        logger.info("\n[{}]<<---------------(start)----------------||getSelectList||------------------------------------>>",now);
        logger.info(">> request : myEmail={}", user.getUsername());
        logger.info(">> request : updateReviewRequest={}", updateReviewRequest);

        // UpdateReviewRequest 입력값 유효성 검사
        for (FieldError error : errors.getFieldErrors())
            throw new Exception(error.getDefaultMessage());
        updateReviewRequest.validation();

        Map<String, Object> resultMap = new HashMap<>();

        ReviewOfUserResponse reviewOfUserResponse = reviewService.setReview(user.getUsername(), updateReviewRequest);
        resultMap.put("review", reviewOfUserResponse);
        logger.info("<< response : review={}", reviewOfUserResponse);

        otherService.recCF(user.getUsername());
        logger.info("<< response api : recCF({})", user.getUsername());
        logger.info("\n[{}]<<---------------------------------------||getSelectList||---------------(end)--------------->>",now);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마의 리뷰를 제거", description = "해당 테마의 리뷰를 제거한다")
    @DeleteMapping("{reviewId}")
    private ResponseEntity<Void> deleteReview(
            @AuthenticationPrincipal User user,
            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable int reviewId) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        logger.info("\n[{}]<<---------------(start)----------------||getSelectList||------------------------------------>>",now);
        logger.info(">> request : myEmail={}", user.getUsername());
        logger.info(">> request : reviewId={}", reviewId);

        reviewService.deleteReview(user.getUsername(), reviewId);
        logger.info("<< response : none");

        otherService.recCF(user.getUsername());
        logger.info("<< response api : recCF({})",user.getUsername());
        logger.info("\n[{}]<<---------------------------------------||getSelectList||---------------(end)--------------->>",now);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
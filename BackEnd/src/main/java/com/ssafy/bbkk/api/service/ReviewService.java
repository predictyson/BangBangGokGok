package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.ReviewOfThemeResponse;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;

import java.util.List;

public interface ReviewService {
    List<ReviewOfThemeResponse> getReviewsOfTheme(int themeId) throws Exception;
    boolean isMyReview(String email, int themeId) throws Exception;
    void addReview(String email, CreateReviewRequest createReviewRequest) throws Exception;
    void deleteReview(String email, int reviewId) throws Exception;
    ReviewOfUserResponse setReview(String email, UpdateReviewRequest updateReviewRequest) throws Exception;
}
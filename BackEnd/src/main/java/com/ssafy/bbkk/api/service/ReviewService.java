package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;

public interface ReviewService {
    void addReview(String email, CreateReviewRequest createReviewRequest) throws Exception;
    void deleteReview(String email, int reviewId) throws Exception;
    ReviewOfUserResponse getReview(int reviewId) throws Exception;
    void setReview(String email, UpdateReviewRequest updateReviewRequest) throws Exception;
}

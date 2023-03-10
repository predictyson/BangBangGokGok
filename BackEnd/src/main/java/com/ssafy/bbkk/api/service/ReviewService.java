package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;

public interface ReviewService {
    void addReview(String email, CreateReviewRequest createReviewRequest) throws Exception;
}

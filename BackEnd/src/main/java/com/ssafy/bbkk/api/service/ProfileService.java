package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.ReviewResponse;
import com.ssafy.bbkk.api.dto.UserInfoResponse;

import java.util.List;

public interface ProfileService {

    UserInfoResponse getUserInfo(String email) throws Exception;
    List<ReviewResponse> getUserReviews(String email) throws Exception;
}

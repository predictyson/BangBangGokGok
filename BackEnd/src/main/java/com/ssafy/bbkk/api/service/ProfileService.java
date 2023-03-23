package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.InterestThemeResponse;
import com.ssafy.bbkk.api.dto.PreferenceResponse;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateUserInfoRequest;
import com.ssafy.bbkk.api.dto.UserInfoResponse;

import java.util.List;

public interface ProfileService {

    boolean isSameUser(String email, int userId) throws Exception;
    UserInfoResponse getUserInfoByEmail(String email) throws Exception;
    UserInfoResponse getUserInfoByUserId(int userId) throws Exception;
    List<ReviewOfUserResponse> getUserReviews(int userId) throws Exception;
    List<PreferenceResponse> getUserPreference(int userId) throws Exception;
    List<InterestThemeResponse> getUserInterestThemes(int userId) throws Exception;
    void setUserInfo(UpdateUserInfoRequest updateUserInfoRequest) throws Exception;
    void deleteUser(String email) throws Exception;

}
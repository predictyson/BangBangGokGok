package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.ChangePasswordRequest;
import com.ssafy.bbkk.api.dto.JoinAdditionalRequest;
import com.ssafy.bbkk.api.dto.JoinRequest;
import com.ssafy.bbkk.api.dto.LoginRequest;
import com.ssafy.bbkk.api.dto.LoginResponse;
import com.ssafy.bbkk.api.dto.TokenRequest;
import com.ssafy.bbkk.api.dto.TokenResponse;

public interface UserService {
    String findUserEmailByUserId(int userId) throws Exception;
    TokenResponse login(LoginRequest loginRequest) throws Exception;
    String oauthLogin(String email) throws Exception;
    int join(JoinRequest joinRequest) throws Exception;
    void setUserAdditionalInfo(JoinAdditionalRequest joinAdditionalRequest) throws Exception;
    String reissue(String accessToken, String refreshToken) throws Exception;
    LoginResponse getLoginUser(String email) throws Exception;
    boolean existsByEmailNotSocial(String email) throws Exception;
    boolean existsByEmail(String email) throws Exception;
    boolean existsByNickname(String nickname) throws Exception;
    void setPassword(ChangePasswordRequest changePasswordRequest) throws Exception;
    boolean existsByEmailAndUserId(String email, int userId) throws Exception;
    void logout(String email) throws Exception;
}
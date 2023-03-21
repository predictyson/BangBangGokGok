package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.*;

public interface UserService {

    TokenResponse login(LoginRequest loginRequest) throws Exception;
    int join(JoinRequest joinRequest) throws Exception;
    void setUserAdditionalInfo(JoinAdditionalRequest joinAdditionalRequest) throws Exception;
    String reissue(TokenRequest tokenRequest) throws Exception;
    LoginResponse getLoginUser(String email) throws Exception;
    boolean existsByEmail(String email) throws Exception;
    boolean existsByNickname(String nickname) throws Exception;
    void setPassword(ChangePasswordRequest changePasswordRequest) throws Exception;
}

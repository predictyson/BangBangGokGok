package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.JoinRequest;

public interface UserService {

    void join(JoinRequest joinRequest) throws Exception;
    boolean existsByEmail(String email) throws Exception;
    boolean existsByNickname(String nickname) throws Exception;
}

package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.UserInfoResponse;

public interface ProfileService {

    UserInfoResponse getUserInfo(String email) throws Exception;
}

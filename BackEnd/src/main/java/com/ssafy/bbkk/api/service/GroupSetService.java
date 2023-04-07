package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.PreviewUserResponse;

import java.util.List;

public interface GroupSetService {

    List<PreviewUserResponse> getUserListByEmailOrNickname(String emailOrNickname) throws Exception;
}

package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.PreviewUserResponse;

public interface GroupSetService {

    PreviewUserResponse getUserByEmailOrNickname(String emailOrNickname) throws Exception;
}

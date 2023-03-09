package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;

    @Override
    public UserInfoResponse getUserInfo(String email) throws Exception {
        UserInfoResponse result = null;
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        result = new UserInfoResponse(user);
        return result;
    }
}

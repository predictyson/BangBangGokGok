package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public boolean existsByEmail(String email) throws Exception {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByNickname(String nickname) throws Exception {
        return userRepository.existsByNickname(nickname);
    }
}

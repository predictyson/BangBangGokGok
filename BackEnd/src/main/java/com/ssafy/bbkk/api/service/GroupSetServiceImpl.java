package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.PreviewUserResponse;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupSetServiceImpl implements GroupSetService {

    private final UserRepository userRepository;

    @Override
    public PreviewUserResponse getUserByEmailOrNickname(String emailOrNickname) throws Exception {
        PreviewUserResponse result = null;
        // email 또는 nickname으로 유저 찾아오기
        Optional<User> user = userRepository.findByEmailOrNickname(emailOrNickname,emailOrNickname);
        // 유저가 존재한다면
        if(user.isPresent()){
            // 유저를 Dto로 감싸기
            result = new PreviewUserResponse(user.get());
        }
        return result;
    }
}

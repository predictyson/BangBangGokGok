package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.PreviewUserResponse;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupSetServiceImpl implements GroupSetService {

    private final UserRepository userRepository;

    @Override
    public List<PreviewUserResponse> getUserListByEmailOrNickname(String emailOrNickname) throws Exception {
        List<PreviewUserResponse> result = new ArrayList<>();
        // email로 유저 찾아오기
        userRepository.findByEmailContaining(emailOrNickname)
                .forEach(x->{
                    if(x.getNickname()!=null) result.add(new PreviewUserResponse(x));
                });
        // nickname으로 유저 찾아오기
        userRepository.findByNicknameContaining(emailOrNickname)
                .forEach(x->{
                    if(x.getNickname()!=null) result.add(new PreviewUserResponse(x));
                });
        Collections.sort(result, Comparator.comparing(PreviewUserResponse::getNickname));
        return result;
    }
}

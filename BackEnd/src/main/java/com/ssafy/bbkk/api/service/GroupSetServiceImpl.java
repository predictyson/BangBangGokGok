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
    private final int SIZE_OF_USER_LIST = 10;

    @Override
    public List<PreviewUserResponse> getUserListByEmailOrNickname(String emailOrNickname) throws Exception {
        List<PreviewUserResponse> result = null;
        List<PreviewUserResponse> temp = new ArrayList<>();

        // email로 유저 찾아오기
        userRepository.findByEmailContaining(emailOrNickname)
                .forEach(x->{
                    if(x.getNickname()!=null) temp.add(new PreviewUserResponse(x));
                });
        // nickname으로 유저 찾아오기
        userRepository.findByNicknameContaining(emailOrNickname)
                .forEach(x->{
                    if(x.getNickname()!=null) temp.add(new PreviewUserResponse(x));
                });
        Collections.sort(temp, Comparator.comparing(PreviewUserResponse::getNickname));

        // 상위 n개만 반환
        if(temp.size()>SIZE_OF_USER_LIST){
            result = new ArrayList<>();
            for(int i=0;i<SIZE_OF_USER_LIST;i++){
                result.add(temp.get(i));
            }
        }
        else {
            result = temp;
        }

        return result;
    }
}

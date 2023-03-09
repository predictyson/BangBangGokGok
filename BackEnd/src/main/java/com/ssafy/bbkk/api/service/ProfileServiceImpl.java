package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.ReviewResponse;
import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<ReviewResponse> getUserReviews(String email) throws Exception {
        List<ReviewResponse> result = null;
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        result = user.getReviews()
                        .stream()
                        .map(x->new ReviewResponse(x))
                        .collect(Collectors.toList());
        return result;
    }
}

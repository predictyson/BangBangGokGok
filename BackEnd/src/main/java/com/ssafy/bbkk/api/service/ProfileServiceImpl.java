package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.InterestThemeResponse;
import com.ssafy.bbkk.api.dto.ReviewResponse;
import com.ssafy.bbkk.api.dto.UpdateUserInfoRequest;
import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.db.entity.*;
import com.ssafy.bbkk.db.repository.GenreRepository;
import com.ssafy.bbkk.db.repository.PreferredGenreOfUserRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final PreferredGenreOfUserRepository preferredGenreOfUserRepository;
    private final GenreRepository genreRepository;

    @Override
    public UserInfoResponse getUserInfoByEmail(String email) throws Exception {
        UserInfoResponse result = null;
        // 이메일로 유저 찾아오기
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        // 유저를 Dto에 감싸기
        result = new UserInfoResponse(user);
        return result;
    }

    @Override
    public UserInfoResponse getUserInfoByUserId(int userId) throws Exception {
        UserInfoResponse result = null;
        // 유저 id로 유저 찾아오기
        User user = userRepository.findById(userId).orElseThrow(NullPointerException::new);
        // 유저를 Dto에 감싸기
        result = new UserInfoResponse(user);
        return result;
    }

    @Override
    public List<ReviewResponse> getUserReviews(String email) throws Exception {
        List<ReviewResponse> result = null;
        // 이메일로 유저 찾아오기
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        // 유저의 리뷰들을 Dto에 감싸기
        result = user.getReviews()
                        .stream()
                        .map(x->new ReviewResponse(x))
                        .collect(Collectors.toList());
        return result;
    }

    @Override
    public List<InterestThemeResponse> getUserInterestThemes(String email) throws Exception {
        List<InterestThemeResponse> result = null;
        // 이메일로 유저 찾아오기
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        // 유저의 관심 테마 목록을 Dto에 감싸기
        result = user.getInterestedThemeOfUsers()
                .stream()
                .map(x->new InterestThemeResponse(x))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public void setUserInfo(UpdateUserInfoRequest updateUserInfoRequest) throws Exception {
        int userId = updateUserInfoRequest.getUserId();
        // 유저 id로 유저 찾아오기
        User user = userRepository.findById(userId).orElseThrow(NullPointerException::new);
        // 수정한 선호 지역 찾아오기
        Region region = regionRepository.findByRegionBigAndRegionSmall(updateUserInfoRequest.getRegionBig(), updateUserInfoRequest.getRegionSmall()).orElseThrow(NullPointerException::new);
        // 유저 정보 수정 (선호 장르들은 preferredGenreOfUser 에서 가져오는 것이므로 직접 수정할 필요없음)
        user.updateUserInfo(updateUserInfoRequest,region);
        user = userRepository.save(user);
        // 추가된 선호 장르를 추가
        for(int genreId : updateUserInfoRequest.getGenreIdAdd()){
            Genre genre = genreRepository.findById(genreId).orElseThrow(NullPointerException::new);
            preferredGenreOfUserRepository.save(new PreferredGenreOfUser(user,genre));
        }
        // 삭제된 선호 장르를 제거
        for(int genreId : updateUserInfoRequest.getGenreIdDel()){
            preferredGenreOfUserRepository.deleteByUserIdAndGenreId(userId,genreId);
        }
    }

    @Override
    public void deleteUser(String email) throws Exception {
        // 이메일로 유저 삭제
        userRepository.deleteByEmail(email);
    }
}

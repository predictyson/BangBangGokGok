package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.GenreResponse;
import com.ssafy.bbkk.api.dto.InterestThemeResponse;
import com.ssafy.bbkk.api.dto.PreferenceResponse;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateUserInfoRequest;
import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.db.entity.Genre;
import com.ssafy.bbkk.db.entity.PreferredGenreOfUser;
import com.ssafy.bbkk.db.entity.Region;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.GenreRepository;
import com.ssafy.bbkk.db.repository.PreferredGenreOfUserRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final PreferredGenreOfUserRepository preferredGenreOfUserRepository;
    private final GenreRepository genreRepository;

    @Override
    public boolean isSameUser(String email, int userId) throws Exception {
        // 유저 id를 통해 유저 조회
        User user = userRepository.findById(userId).orElseThrow();
        // 로그인한 정보와 조회한 유저가 같은지 비교
        if(email.equals(user.getEmail())) return true;
        return false;
    }

    @Override
    public UserInfoResponse getUserInfoByEmail(String email) throws Exception {
        UserInfoResponse result = null;
        // 이메일로 유저 찾아오기
        User user = userRepository.findByEmail(email).orElseThrow();
        // 유저를 Dto에 감싸기
        result = new UserInfoResponse(user);
        return result;
    }

    @Override
    public UserInfoResponse getUserInfoByUserId(int userId) throws Exception {
        UserInfoResponse result = null;
        // 유저 id로 유저 찾아오기
        User user = userRepository.findById(userId).orElseThrow();
        // 유저를 Dto에 감싸기
        result = new UserInfoResponse(user);
        return result;
    }

    @Override
    public List<ReviewOfUserResponse> getUserReviews(int userId) throws Exception {
        List<ReviewOfUserResponse> result = null;
        // 유저 id로 유저 찾아오기
        User user = userRepository.findById(userId).orElseThrow();
        // 유저의 리뷰들을 Dto에 감싸기
        result = user.getReviews()
                .stream()
                .map(x -> new ReviewOfUserResponse(x))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public List<PreferenceResponse> getUserPreference(int userId) throws Exception {
        List<PreferenceResponse> result = new ArrayList<>();

        // 모든 장르 목록 가져오기
        List<GenreResponse> genres = genreRepository.findAll()
                .stream()
                .map(x -> new GenreResponse(x))
                .collect(Collectors.toList());
        int genreSize = genres.size();
        int[] genreIds = new int[genreSize + 1];

        // 유저 id로 유저 찾아오기
        User user = userRepository.findById(userId).orElseThrow();
        user.getReviews()
                .stream()
                .map(x -> x.getTheme()
                        .getGenreOfThemes()
                        .stream()
                        .map(y -> genreIds[y.getGenre().getId()]++)
                );

        // result에 장르명과 해당 장르의 방문횟수를 담기
        for (int i = 0; i < genreSize; i++) {
            result.add(new PreferenceResponse(genres.get(i).getCategory(), genreIds[i + 1]));
        }
        return result;
    }

    @Override
    public List<InterestThemeResponse> getUserInterestThemes(int userId) throws Exception {
        List<InterestThemeResponse> result = null;
        // 유저 id로 유저 찾아오기
        User user = userRepository.findById(userId).orElseThrow();
        // 유저의 관심 테마 목록을 Dto에 감싸기
        result = user.getInterestedThemeOfUsers()
                .stream()
                .map(x -> new InterestThemeResponse(x))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public void setUserInfo(UpdateUserInfoRequest updateUserInfoRequest) throws Exception {
        int userId = updateUserInfoRequest.getUserId();
        // 유저 id로 유저 찾아오기
        User user = userRepository.findById(userId).orElseThrow();
        // 수정한 선호 지역 찾아오기
        Region region = regionRepository.findByRegionBigAndRegionSmall(updateUserInfoRequest.getRegionBig(), updateUserInfoRequest.getRegionSmall())
                .orElseThrow();
        // 유저 정보 수정 (선호 장르들은 preferredGenreOfUser 에서 가져오는 것이므로 직접 수정할 필요없음)
        user.updateUserInfo(updateUserInfoRequest, region);
        user = userRepository.save(user);
        // 추가된 선호 장르를 추가
        for (int genreId : updateUserInfoRequest.getGenreIdAdd()) {
            Genre genre = genreRepository.findById(genreId).orElseThrow();
            preferredGenreOfUserRepository.save(new PreferredGenreOfUser(user, genre));
        }
        // 삭제된 선호 장르를 제거
        for (int genreId : updateUserInfoRequest.getGenreIdDel()) {
            preferredGenreOfUserRepository.deleteByUserIdAndGenreId(userId, genreId);
        }
    }

    @Override
    public void deleteUser(String email) throws Exception {
        // 이메일로 유저 삭제
        userRepository.deleteByEmail(email);
    }
}
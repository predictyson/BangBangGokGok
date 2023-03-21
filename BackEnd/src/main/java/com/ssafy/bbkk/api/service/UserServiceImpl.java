package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.ChangePasswordRequest;
import com.ssafy.bbkk.api.dto.JoinRequest;
import com.ssafy.bbkk.db.entity.Genre;
import com.ssafy.bbkk.db.entity.PreferredGenreOfUser;
import com.ssafy.bbkk.db.entity.Region;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.GenreRepository;
import com.ssafy.bbkk.db.repository.PreferredGenreOfUserRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final GenreRepository genreRepository;
    private final PreferredGenreOfUserRepository preferredGenreOfUserRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void join(JoinRequest joinRequest) throws Exception {
        // 유저의 선호 지역 조회
        Region region = regionRepository.findByRegionBigAndRegionSmall(joinRequest.getRegionBig(),
                joinRequest.getRegionSmall()).orElseThrow();
        // 입력 정보를 바탕으로 회원 가입할 유저 생성
        User joinUser = new User(joinRequest, region);
        // 회원 가입
        joinUser = userRepository.save(joinUser);

        for(int genreId : joinRequest.getGenreIds()){
            // 선호 장르 조회
            Genre genre = genreRepository.findById(genreId).orElseThrow();
            // 유저의 선호 장르 객체 생성
            PreferredGenreOfUser preferredGenreOfUser = new PreferredGenreOfUser(joinUser, genre);
            // 유저의 선호 장르 저장
            preferredGenreOfUserRepository.save(preferredGenreOfUser);
        }
    }

    @Override
    public boolean existsByEmail(String email) throws Exception {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByNickname(String nickname) throws Exception {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public void setPassword(ChangePasswordRequest changePasswordRequest) throws Exception {
        // 이메일을 통해 유저 조회
        User user = userRepository.findByEmail(changePasswordRequest.getEmail()).orElseThrow();
        // 비밀번호 암호화 및 변경
        user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
        // 유저 저장
        userRepository.save(user);
    }
}

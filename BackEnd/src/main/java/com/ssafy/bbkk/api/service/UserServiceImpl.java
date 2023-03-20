package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.common.jwt.TokenProvider;
import com.ssafy.bbkk.api.dto.*;
import com.ssafy.bbkk.db.entity.*;
import com.ssafy.bbkk.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
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
    private final RefreshTokenRepository refreshTokenRepository;
    private final PreferredGenreOfUserRepository preferredGenreOfUserRepository;

    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    @Override
    public TokenResponse login(LoginRequest loginRequest) throws Exception {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = loginRequest.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenResponse tokenDto = tokenProvider.generateToken(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;
    }

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

package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.ChangePasswordRequest;
import com.ssafy.bbkk.api.dto.JoinAdditionalRequest;
import com.ssafy.bbkk.api.dto.JoinRequest;
import com.ssafy.bbkk.api.dto.LoginRequest;
import com.ssafy.bbkk.api.dto.LoginResponse;
import com.ssafy.bbkk.api.dto.TokenRequest;
import com.ssafy.bbkk.api.dto.TokenResponse;
import com.ssafy.bbkk.common.jwt.TokenProvider;
import com.ssafy.bbkk.db.entity.Genre;
import com.ssafy.bbkk.db.entity.PreferredGenreOfUser;
import com.ssafy.bbkk.db.entity.RefreshToken;
import com.ssafy.bbkk.db.entity.Region;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.GenreRepository;
import com.ssafy.bbkk.db.repository.PreferredGenreOfUserRepository;
import com.ssafy.bbkk.db.repository.RefreshTokenRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
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
public class UserServiceImpl implements UserService {

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
        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken();

        TokenResponse tokenResponse = TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        // 4. RefreshToken 저장
        RefreshToken rfToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(refreshToken)
                .build();

        refreshTokenRepository.save(rfToken);

        // 5. 토큰 발급
        return tokenResponse;
    }

    @Override
    public int join(JoinRequest joinRequest) throws Exception {
        // 유저 기본 정보 입력
        User user = User.builder()
                .email(joinRequest.getEmail())
                .password(passwordEncoder.encode(joinRequest.getPassword()))
                .roles("ROLE_USER")
                .build();

        // 유저 저장
        user = userRepository.save(user);

        return user.getId();
    }

    @Override
    public void setUserAdditionalInfo(JoinAdditionalRequest joinAdditionalRequest) throws Exception {
        // 유저의 선호 지역 조회
        Region region = regionRepository.findByRegionBigAndRegionSmall(joinAdditionalRequest.getRegionBig(), joinAdditionalRequest.getRegionSmall())
                .orElseThrow(() -> new Exception("regionBig=" + joinAdditionalRequest.getRegionBig() +
                        "과 regionSmall=" + joinAdditionalRequest.getRegionSmall() + "에 맞는 지역을 찾을 수 없습니다."));
        // 유저 id를 통해 유저 조회
        User user = userRepository.findById(joinAdditionalRequest.getUserId()).orElseThrow(
                () -> new Exception(joinAdditionalRequest.getUserId() + "에 맞는 유저를 찾을 수 없습니다."));
        // 입력한 정보를 바탕으로 정보 수정
        user.addUserInfo(joinAdditionalRequest, region);
        // 추가 정보 저장
        user = userRepository.save(user);

        for (int genreId : joinAdditionalRequest.getGenreIds()) {
            // 선호 장르 조회
            Genre genre = genreRepository.findById(genreId).orElseThrow(
                    () -> new Exception("genreId=" + genreId + "에 맞는 장르를 찾을 수 없습니다."));
            // 유저의 선호 장르 객체 생성
            PreferredGenreOfUser preferredGenreOfUser = new PreferredGenreOfUser(user, genre);
            // 유저의 선호 장르 저장
            preferredGenreOfUserRepository.save(preferredGenreOfUser);
        }
    }

    @Override
    public String reissue(TokenRequest tokenRequest) throws Exception {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequest.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequest.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequest.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 accessToken 생성
        String accessToken = tokenProvider.generateAccessToken(authentication);

        // 토큰 발급
        return accessToken;
    }

    @Override
    public LoginResponse getLoginUser(String email) throws Exception {
        LoginResponse result = null;
        // email을 통해 유저 조회
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new Exception("email=" + email + "에 맞는 유저를 찾을 수 없습니다."));
        // 유저를 Dto에 감싸기
        result = new LoginResponse(user);
        return result;
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
        User user = userRepository.findByEmail(changePasswordRequest.getEmail()).orElseThrow(
                () -> new Exception("email=" + changePasswordRequest.getEmail() + "에 맞는 유저를 찾을 수 없습니다."));
        // 비밀번호 암호화 및 변경
        user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
        // 유저 저장
        userRepository.save(user);
    }
}
package com.ssafy.bbkk.handler;

import com.ssafy.bbkk.common.auth.PrincipalDetails;
import com.ssafy.bbkk.common.jwt.TokenProvider;
import com.ssafy.bbkk.api.dto.TokenResponse;
import com.ssafy.bbkk.db.entity.RefreshToken;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2AuthenticationSuccessHandler.class);

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // redirect 할 url을 지정해준다
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.info("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();
        User user = principalDetails.getUser();

        // localhost 테스트 용 URL 주소
        String localUrl = "http://localhost:5173";

        // 소셜 로그인 성공 후 이동할 페이지 -> 추후 변경해야함
        String targetUrl = "/oauth";

        if(user.getEmail() == null) {
            targetUrl = "/login";
            return UriComponentsBuilder.fromUriString(localUrl+targetUrl)
                    .queryParam("error", "이메일 동의를 하지 않아 회원가입이 불가능합니다.")
                    .build().toUriString();
        }
        // 추가 정보가 입력되어 있다면 로그인 처리
        else if(user.getAge()>0 &&
                ("W".equals(user.getGender()) || "M".equals(user.getGender())) &&
                user.getNickname()!=null &&
                user.getProfileImageType()!=null &&
                user.getRegion()!=null){

            // 토큰 정보 저장하는 페이지로 이동
            targetUrl = "/oauth2";

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            String accessToken = tokenProvider.generateAccessToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken();

            TokenResponse tokenDto = TokenResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();

            // 4. RefreshToken 저장
            RefreshToken rfToken = RefreshToken.builder()
                    .key(authentication.getName())
                    .value(tokenDto.getRefreshToken())
                    .build();

            refreshTokenRepository.save(rfToken);

            // 타겟 URL로 토큰 정보를 함께 보내줌
            return UriComponentsBuilder.fromUriString(localUrl+targetUrl)
                    .queryParam("accessToken", tokenDto.getAccessToken())
//                    .queryParam("refreshToken", tokenDto.getRefreshToken())
                    .build().toUriString();
        }

        // 추가 정보가 입력되어 있지 않다면 추가 정보 입력창으로 보냄
        return UriComponentsBuilder.fromUriString(localUrl+targetUrl+"/"+user.getId())
                .build().toUriString();
    }
}
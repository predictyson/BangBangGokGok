package com.ssafy.bbkk.common.oauth;

import com.ssafy.bbkk.common.auth.PrincipalDetails;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(PrincipalOauth2UserService.class);

    // userRequest 는 code를 받아서 accessToken을 응답 받은 객체
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest); // google의 회원 프로필 조회

        // code를 통해 구성한 정보
        logger.debug("userRequest clientRegistration : " + userRequest.getClientRegistration());
        // token을 통해 응답받은 회원정보
        logger.debug("oAuth2User : " + oAuth2User);

        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) throws OAuth2AuthenticationException{

        // Attribute를 파싱해서 공통 객체로 묶는다. 관리가 편함.
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            logger.debug("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }
        else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")){
            logger.debug("카카오톡 로그인 요청");
            oAuth2UserInfo = new KakaoUserInfo((Map)oAuth2User.getAttributes());
        }else {
            logger.warn("지원하지 않는 로그인 요청입니다");
            throw new NullPointerException();
        }

        // 소셜 로그인 정보를 바탕으로 유저 조회
        Optional<User> userOptional =
                userRepository.findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());

        User user = null;
        if (userOptional.isPresent()) { // 유저가 존재하면 그대로 가져옴
            user = userOptional.get();
        }
        else { // 소셜 로그인 유저가 존재하지 않다면
            if(oAuth2UserInfo.getEmail() == null){
                logger.warn("이메일 동의를 하지 않아 회원가입이 불가능합니다.");
                throw new OAuth2AuthenticationException("이메일 동의를 하지 않아 회원가입이 불가능합니다.");
            }
            else if(userRepository.existsByEmail(oAuth2UserInfo.getEmail())){ // 이미 해당 이메일로 로컬 회원가입이 되어있는 유저라면
                logger.warn("이미 가입한 회원입니다.");
                throw new OAuth2AuthenticationException("이미 가입한 회원입니다.");
            }
            else{
                // user의 패스워드가 null이기 때문에 OAuth 유저는 일반적인 로그인을 할 수 없음.
                user = new User(oAuth2UserInfo);
                userRepository.save(user);
            }
        }

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }
}

package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.ChangePasswordRequest;
import com.ssafy.bbkk.api.dto.JoinAdditionalRequest;
import com.ssafy.bbkk.api.dto.JoinRequest;
import com.ssafy.bbkk.api.dto.LoginRequest;
import com.ssafy.bbkk.api.dto.LoginResponse;
import com.ssafy.bbkk.api.dto.TokenResponse;
import com.ssafy.bbkk.api.service.EmailService;
import com.ssafy.bbkk.api.service.OtherService;
import com.ssafy.bbkk.api.service.UserService;
import com.ssafy.bbkk.util.CookieUtil;
import io.swagger.v3.oas.annotations.Operation;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final EmailService emailService;
    private final OtherService otherService;

    @Operation(summary = "로그인", description = "로그인을 진행한다")
    @PostMapping("login")
    private ResponseEntity<Map<String, Object>> login(
            @RequestBody @Valid LoginRequest loginRequest, Errors errors,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        logger.debug(">> request : loginRequest={}", loginRequest);

        // LoginRequest 입력값 유효성 검사
        for (FieldError error : errors.getFieldErrors())
            throw new Exception(error.getDefaultMessage());

        Map<String, Object> resultMap = new HashMap<>();

        TokenResponse tokenResponse = userService.login(loginRequest);
        resultMap.put("accessToken", tokenResponse.getAccessToken());
        logger.debug("<< response : accessToken={}", tokenResponse.getAccessToken());

        LoginResponse loginResponse = userService.getLoginUser(loginRequest.getEmail());
        resultMap.put("user", loginResponse);
        logger.debug("<< response : user={}", loginResponse);

        CookieUtil.addCookie(request, response, "refreshToken", tokenResponse.getRefreshToken());

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "회원 가입시 이메일 전송", description = "회원 가입이 가능한 이메일에 인증 코드를 전송")
    @GetMapping("join/check/{email}")
    public ResponseEntity<Map<String, Object>> isExitedAndSendEmailCode(
            @PathVariable String email) throws Exception {
        logger.debug(">> request : email={}", email);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isExisted = userService.existsByEmail(email);
        resultMap.put("isExisted",isExisted);
        logger.debug("<< response : isExisted={}", isExisted);

        if(!isExisted){
            emailService.sendMessage(email, 1);
            logger.debug("<< response : email send");
        }

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "회원 가입", description = "회원 가입을 진행한다")
    @PostMapping("join")
    public ResponseEntity<Map<String, Object>> join(
            @RequestBody @Valid JoinRequest joinRequest, Errors errors) throws Exception {
        logger.debug(">> request : joinRequest={}", joinRequest);

        // JoinRequest 입력값 유효성 검사
        for (FieldError error : errors.getFieldErrors())
            throw new Exception(error.getDefaultMessage());

        Map<String, Object> resultMap = new HashMap<>();

        int userId = userService.join(joinRequest);
        resultMap.put("userId", userId);
        logger.debug("<< response : userId={}", userId);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "추가 정보 작성", description = "회원 가입 후 추가 정보를 작성한다")
    @PostMapping("join/additional")
    public ResponseEntity<Void> addInfo(
            @RequestBody @Valid JoinAdditionalRequest joinAdditionalRequest, Errors errors) throws Exception {
        logger.debug(">> request : joinAdditionalRequest={}", joinAdditionalRequest);

        // JoinAdditionalRequest 입력값 유효성 검사
        for (FieldError error : errors.getFieldErrors())
            throw new Exception(error.getDefaultMessage());
        joinAdditionalRequest.validation();

        userService.setUserAdditionalInfo(joinAdditionalRequest);
        String email = userService.findUserEmailByUserId(joinAdditionalRequest.getUserId());
        logger.debug("<< response : none");

        otherService.recCBF(email);
        logger.debug("<< response api : recCBF({})",email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "소셜 로그인", description = "소셜 로그인을 진행한다")
    @GetMapping("oauth/login")
    public ResponseEntity<Map<String, Object>> oauthLogin(
            @AuthenticationPrincipal User user,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        logger.debug(">> request : myEmail={}", user.getUsername());

        Map<String, Object> resultMap = new HashMap<>();

        String refreshToken = userService.oauthLogin(user.getUsername());
        CookieUtil.addCookie(request, response, "refreshToken", refreshToken);

        LoginResponse loginResponse = userService.getLoginUser(user.getUsername());
        resultMap.put("user", loginResponse);
        logger.debug("<< response : user={}", loginResponse);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "토큰 재발급", description = "access token을 재발급한다")
    @PostMapping("/reissue")
    private ResponseEntity<Map<String, Object>> reissue(
            @RequestBody String accessToken,
            HttpServletRequest request) throws Exception {
        logger.debug(">> request : accessToken={}", accessToken);

        Cookie refreshTokenCookie = CookieUtil.getCookie(request,"refreshToken")
                .orElseThrow(()-> new RuntimeException("해당 쿠키가 존재하지 않습니다."));

        Map<String, Object> resultMap = new HashMap<>();

        accessToken = userService.reissue(accessToken, refreshTokenCookie.getValue());
        resultMap.put("accessToken", accessToken);
        logger.debug("<< response : accessToken={}", accessToken);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "이메일 중복 확인", description = "이메일 중복 검사를 실시한다")
    @GetMapping("check/email/{email}")
    public ResponseEntity<Map<String, Object>> checkEmail(
            @PathVariable String email) throws Exception {
        logger.debug(">> request : email={}", email);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isDuplicated = userService.existsByEmail(email);
        resultMap.put("isDuplicated", isDuplicated);
        logger.debug("<< response : isDuplicated={}", isDuplicated);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "닉네임 중복 확인", description = "닉네임 중복 검사를 실시한다")
    @GetMapping("check/nickname/{nickname}")
    public ResponseEntity<Map<String, Object>> checkNickname(
            @PathVariable String nickname) throws Exception {
        logger.debug(">> request : nickname={}", nickname);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isDuplicated = userService.existsByNickname(nickname);
        resultMap.put("isDuplicated", isDuplicated);
        logger.debug("<< response : isDuplicated={}", isDuplicated);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "이메일 인증 코드 발송", description = "해당 이메일로 인증 코드를 발송한다")
    @GetMapping("send/email/{email}")
    public ResponseEntity<Map<String, Object>> sendEmailCode(
            @PathVariable String email) throws Exception {
        logger.debug(">> request : email={}", email);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isExisted = userService.existsByEmailNotSocial(email);
        resultMap.put("isExisted", isExisted);
        logger.debug("<< response : isExisted={}", isExisted);

        if (isExisted) {
            emailService.sendMessage(email, 2);
            logger.debug("<< response : email send");
        }

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "이메일 인증 코드 확인", description = "해당 이메일로 발송한 인증 코드와 일치하는지 확인한다")
    @GetMapping("check/emailCode/{email}/{code}")
    public ResponseEntity<Map<String, Object>> checkEmailCode(
            @PathVariable String email,
            @PathVariable String code) throws Exception {
        logger.debug(">> request : email={}", email);
        logger.debug(">> request : code={}", code);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isCheck = emailService.checkEmailCode(email, code);
        resultMap.put("isCheck", isCheck);
        logger.debug("<< response : isCheck={}", isCheck);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "비밀번호 변경", description = "비밀번호를 변경한다")
    @PostMapping("password")
    public ResponseEntity<Void> changePassword(
            @RequestBody @Valid ChangePasswordRequest changePasswordRequest, Errors errors) throws Exception {
        logger.debug(">> request : changePasswordRequest={}", changePasswordRequest);

        // ChangePasswordRequest 입력값 유효성 검사
        for (FieldError error : errors.getFieldErrors())
            throw new Exception(error.getDefaultMessage());

        userService.setPassword(changePasswordRequest);
        logger.debug("<< response : none");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "로그인 정보 검증", description = "로그인한 정보가 일치하는지 확인")
    @GetMapping("check/login/{userId}")
    public ResponseEntity<Map<String, Object>> isLoginUser(
            @AuthenticationPrincipal User user,
            @PathVariable int userId) throws Exception {
        logger.debug(">> request : myEmail={}", user.getUsername());
        logger.debug(">> request : userId={}", userId);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isLoginUser = userService.existsByEmailAndUserId(user.getUsername(), userId);
        resultMap.put("isLoginUser",isLoginUser);
        logger.debug("<< response : isLoginUser={}",isLoginUser);

        return new ResponseEntity<>(resultMap,HttpStatus.OK);
    }

    @Operation(summary = "로그아웃", description = "refresh token을 제거한다")
    @GetMapping("logout")
    public ResponseEntity<Void> logout(
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        logger.debug(">> request : none");

        CookieUtil.deleteCookie(request,response,"refreshToken");
        logger.debug("<< response : none");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
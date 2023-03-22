package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.*;
import com.ssafy.bbkk.api.service.EmailService;
import com.ssafy.bbkk.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final EmailService emailService;

    @CrossOrigin("*")
    @Operation(summary = "로그인", description = "로그인을 진행한다")
    @PostMapping("login")
    private ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest loginRequest)  throws Exception {

        logger.info("[login] request : loginRequest={}",loginRequest);

        Map<String, Object> resultMap = new HashMap<>();
        TokenResponse tokenResponse = userService.login(loginRequest);
        LoginResponse loginResponse = userService.getLoginUser(loginRequest.getEmail());

        resultMap.put("token", tokenResponse);
        resultMap.put("user", loginResponse);

        logger.info("[login] response : token={}, user={}", tokenResponse, loginResponse);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "회원 가입", description = "회원 가입을 진행한다")
    @PostMapping("join")
    public ResponseEntity<Map<String, Object>> join(@RequestBody JoinRequest joinRequest) throws Exception {
        logger.info("[join] request : joinRequest={}",joinRequest);

        Map<String, Object> resultMap = new HashMap<>();
        int userId = userService.join(joinRequest);

        resultMap.put("userId", userId);

        logger.info("[join] response : userId={}",userId);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "추가 정보 작성", description = "회원 가입 후 추가 정보를 작성한다")
    @PostMapping("join/additional")
    public ResponseEntity<Void> addInfo(@RequestBody JoinAdditionalRequest joinAdditionalRequest) throws Exception {
        logger.info("[addInfo] request : joinAdditionalRequest={}",joinAdditionalRequest);

        userService.setUserAdditionalInfo(joinAdditionalRequest);

        logger.info("[addInfo] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "토큰 재발급", description = "access token을 재발급한다")
    @PostMapping("/reissue")
    private ResponseEntity<Map<String, Object>> reissue(
            @RequestBody TokenRequest tokenRequest) throws Exception {

        logger.info("[reissue] request : tokenRequest={}",tokenRequest);

        Map<String, Object> resultMap = new HashMap<>();
        String accessToken = userService.reissue(tokenRequest);

        resultMap.put("accessToken", accessToken);

        logger.info("[reissue] response : accessToken={}", accessToken);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "이메일 중복 확인", description = "이메일 중복 검사를 실시한다")
    @GetMapping("check/email/{email}")
    public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable String email) throws Exception {
        logger.info("[checkEmail] request : email={}",email);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isDuplicated = userService.existsByEmail(email);

        resultMap.put("isDuplicated",isDuplicated);

        logger.info("[checkEmail] response : isDuplicated={}", isDuplicated);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "닉네임 중복 확인", description = "닉네임 중복 검사를 실시한다")
    @GetMapping("check/nickname/{nickname}")
    public ResponseEntity<Map<String, Object>> checkNickname(@PathVariable String nickname) throws Exception {
        logger.info("[checkNickname] request : nickname={}",nickname);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isDuplicated = userService.existsByNickname(nickname);

        resultMap.put("isDuplicated",isDuplicated);

        logger.info("[checkNickname] response : isDuplicated={}", isDuplicated);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "이메일 인증 코드 발송", description = "해당 이메일로 인증 코드를 발송한다")
    @GetMapping("send/email/{email}")
    public ResponseEntity<Map<String, Object>> sendEmailCode(@PathVariable String email) throws Exception {
        logger.info("[sendEmailCode] request : email={}",email);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isExisted = false;

        if(userService.existsByEmail(email)){
            isExisted = true;
            emailService.sendMessage(email);
        }

        resultMap.put("isExisted",isExisted);

        logger.info("[sendEmailCode] response : isExisted={}",isExisted);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "이메일 인증 코드 확인", description = "해당 이메일로 발송한 인증 코드와 일치하는지 확인한다")
    @GetMapping("check/emailCode/{email}/{code}")
    public ResponseEntity<Map<String, Object>> checkEmailCode(@PathVariable String email,
                                                              @PathVariable String code) throws Exception {
        logger.info("[checkEmailCode] request : email={}, code={}",email,code);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isCheck = emailService.checkEmailCode(email,code);

        resultMap.put("isCheck",isCheck);

        logger.info("[checkEmailCode] response : isCheck={}",isCheck);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @Operation(summary = "비밀번호 변경", description = "비밀번호를 변경한다")
    @PostMapping("password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest changePasswordRequest) throws Exception {
        logger.info("[changePassword] request : changePasswordRequest={}",changePasswordRequest);

        userService.setPassword(changePasswordRequest);

        logger.info("[changePassword] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

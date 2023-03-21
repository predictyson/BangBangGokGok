package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.ChangePasswordRequest;
import com.ssafy.bbkk.api.dto.JoinRequest;
import com.ssafy.bbkk.api.service.EmailService;
import com.ssafy.bbkk.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final EmailService emailService;

    @PostMapping("join")
    public ResponseEntity<Void> join(@RequestBody JoinRequest joinRequest) throws Exception {
        logger.info("[join] request : joinRequest={}",joinRequest);

        userService.join(joinRequest);

        logger.info("[join] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("check/email/{email}")
    public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable String email) throws Exception {
        logger.info("[checkEmail] request : email={}",email);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isDuplicated = userService.existsByEmail(email);

        resultMap.put("isDuplicated",isDuplicated);

        logger.info("[checkEmail] response : isDuplicated={}", isDuplicated);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("check/nickname/{nickname}")
    public ResponseEntity<Map<String, Object>> checkNickname(@PathVariable String nickname) throws Exception {
        logger.info("[checkNickname] request : nickname={}",nickname);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isDuplicated = userService.existsByNickname(nickname);

        resultMap.put("isDuplicated",isDuplicated);

        logger.info("[checkNickname] response : isDuplicated={}", isDuplicated);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

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

    @PostMapping("password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) throws Exception {
        logger.info("[changePassword] request : changePasswordRequest={}",changePasswordRequest);

        userService.setPassword(changePasswordRequest);

        logger.info("[changePassword] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.api.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("profile")
@RequiredArgsConstructor
public class ProfileController {

    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);

    private final ProfileService profileService;

    @GetMapping("{email}/info")
    private ResponseEntity<Map<String, Object>> userInfo(
                                    @AuthenticationPrincipal User user,
                                    @PathVariable String email) throws Exception{

        logger.info("[userInfo] request : email={}", email);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isMe = email.equals(user.getUsername()) ? true : false;
        UserInfoResponse userInfoResponse = profileService.getUserInfo(email);

        resultMap.put("isMe", isMe);
        resultMap.put("userInfo", userInfoResponse);

        logger.info("[userInfo] response : isMe={}, userInfo={}", isMe, userInfoResponse);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }
}

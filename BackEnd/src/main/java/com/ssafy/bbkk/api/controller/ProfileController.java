package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.InterestThemeResponse;
import com.ssafy.bbkk.api.dto.ReviewResponse;
import com.ssafy.bbkk.api.dto.UpdateUserInfoRequest;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("profile")
@RequiredArgsConstructor
public class ProfileController {

    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);

    private final ProfileService profileService;

    @GetMapping("{email}/info")
    private ResponseEntity<Map<String, Object>> getUserInfo(
                                    @AuthenticationPrincipal User user,
                                    @PathVariable String email) throws Exception{

        logger.info("[getUserInfo] request : myEmail={}, email={}", user.getUsername(), email);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isMe = false;
        UserInfoResponse userInfoResponse = null;

        if(email.equals(user.getUsername())){
            isMe = true;
            userInfoResponse = profileService.getUserInfoByEmail(email);
        }

        resultMap.put("isMe", isMe);
        resultMap.put("userInfo", userInfoResponse);

        logger.info("[getUserInfo] response : isMe={}, userInfo={}", isMe, userInfoResponse);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("{email}/reviews")
    private ResponseEntity<Map<String, Object>> getUserReviews(
            @PathVariable String email) throws Exception{

        logger.info("[getUserReviews] request : email={}", email);

        Map<String, Object> resultMap = new HashMap<>();

        List<ReviewResponse> reviewResponses = profileService.getUserReviews(email);
        resultMap.put("reviews", reviewResponses);

        logger.info("[getUserReviews] response : reviews={}", reviewResponses);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("{email}/interestThemes")
    private ResponseEntity<Map<String, Object>> getUserInterestThemes(
            @PathVariable String email) throws Exception{

        logger.info("[getUserInterest] request : email={}", email);

        Map<String, Object> resultMap = new HashMap<>();

        List<InterestThemeResponse> interestThemeResponses = profileService.getUserInterestThemes(email);
        resultMap.put("interestThemes", interestThemeResponses);

        logger.info("[getUserInterest] response : interestThemes={}",interestThemeResponses);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PutMapping
    private ResponseEntity<Map<String, Object>> setUserInfo(
            @RequestBody UpdateUserInfoRequest updateUserInfoRequest) throws Exception{

        logger.info("[setUserInfo] request : updateUserInfoRequest={}", updateUserInfoRequest);

        Map<String, Object> resultMap = new HashMap<>();

        profileService.setUserInfo(updateUserInfoRequest);
        UserInfoResponse userInfoResponse = profileService.getUserInfoByUserId(updateUserInfoRequest.getUserId());
        resultMap.put("userInfo",userInfoResponse);

        logger.info("[setUserInfo] response : userInfo={}",userInfoResponse);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping
    private ResponseEntity<Void> deleteUser(
            @AuthenticationPrincipal User user) throws Exception{

        logger.info("[deleteUser] request : myEmail={}", user.getUsername());

        profileService.deleteUser(user.getUsername());

        logger.info("[deleteUser] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.api.service.InterestThemeService;
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
@RequestMapping("interest")
@RequiredArgsConstructor
public class InterestController {

    private static final Logger logger = LoggerFactory.getLogger(InterestController.class);

    private final InterestThemeService interestThemeService;

    @PostMapping("{themeId}")
    private ResponseEntity<Void> addInterestTheme(
            @AuthenticationPrincipal User user,
            @PathVariable int themeId) throws Exception{

        logger.info("[addInterestTheme] request : myEmail={}, themeId={}", user.getUsername(), themeId);

        interestThemeService.addInterestTheme(user.getUsername(), themeId);

        logger.info("[addInterestTheme] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("{themeId}")
    private ResponseEntity<Void> deleteInterestTheme(
            @AuthenticationPrincipal User user,
            @PathVariable int themeId) throws Exception{

        logger.info("[deleteInterestTheme] request : myEmail={}, themeId={}", user.getUsername(), themeId);

        interestThemeService.deleteInterestTheme(user.getUsername(), themeId);

        logger.info("[deleteInterestTheme] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

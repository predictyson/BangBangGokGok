package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.UserInfoResponse;
import com.ssafy.bbkk.api.service.InterestThemeService;
import com.ssafy.bbkk.api.service.OtherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("interest")
@RequiredArgsConstructor
public class InterestController {

    private static final Logger logger = LoggerFactory.getLogger(InterestController.class);

    private final InterestThemeService interestThemeService;
    private final OtherService otherService;

    @Operation(summary = "관심 테마 조회", description = "해당 테마다 내가 관심을 가진 테마인지 확인한다")
    @GetMapping("{themeId}")
    private ResponseEntity<Map<String, Object>> getInterestTheme(
            @AuthenticationPrincipal User user,
            @Parameter(description = "상세 테마의 Id", required = true) @PathVariable int themeId) throws Exception{

        logger.info("[getInterestTheme] request : myEmail={}", user.getUsername());
        logger.info("[getInterestTheme] request : themeId={}", themeId);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isInterest = interestThemeService.isInterestTheme(user.getUsername(), themeId);

        resultMap.put("isInterest",isInterest);

        logger.info("[getInterestTheme] response : isInterest={}",isInterest);

        return new ResponseEntity<>(resultMap,HttpStatus.OK);
    }

    @Operation(summary = "관심 테마 등록", description = "내 관심 테마로 등록한다")
    @PostMapping("{themeId}")
    private ResponseEntity<Void> addInterestTheme(
            @AuthenticationPrincipal User user,
            @Parameter(description = "관심 버튼을 누른 테마의 Id", required = true) @PathVariable int themeId) throws Exception{

        logger.info("[addInterestTheme] request : myEmail={}", user.getUsername());
        logger.info("[addInterestTheme] request : themeId={}", themeId);

        interestThemeService.addInterestTheme(user.getUsername(), themeId);
        otherService.recCBF(user.getUsername());

        logger.info("[addInterestTheme] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "관심 테마 제거", description = "내 관심 테마에서 제거한다")
    @DeleteMapping("{themeId}")
    private ResponseEntity<Void> deleteInterestTheme(
            @AuthenticationPrincipal User user,
            @Parameter(description = "관심 버튼을 누른 테마의 Id", required = true) @PathVariable int themeId) throws Exception{

        logger.info("[deleteInterestTheme] request : myEmail={}", user.getUsername());
        logger.info("[deleteInterestTheme] request : themeId={}", themeId);

        interestThemeService.deleteInterestTheme(user.getUsername(), themeId);
        otherService.recCBF(user.getUsername());

        logger.info("[deleteInterestTheme] response : ");

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
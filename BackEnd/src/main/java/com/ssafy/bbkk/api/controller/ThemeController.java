package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.AwardThemeBundleResponse;
import com.ssafy.bbkk.api.dto.PreviewThemeResponse;
import com.ssafy.bbkk.api.dto.ReviewOfThemeResponse;
import com.ssafy.bbkk.api.dto.SearchThemeRequest;
import com.ssafy.bbkk.api.dto.ThemeBundleResponse;
import com.ssafy.bbkk.api.dto.ThemeResponse;
import com.ssafy.bbkk.api.service.InterestThemeService;
import com.ssafy.bbkk.api.service.ReviewService;
import com.ssafy.bbkk.api.service.ThemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("theme")
@RequiredArgsConstructor
public class ThemeController {

    private static final Logger logger = LoggerFactory.getLogger(ThemeController.class);

    private final ThemeService themeService;
    private final InterestThemeService interestThemeService;
    private final ReviewService reviewService;

    @Operation(summary = "추천 테마 조회", description = "유저 정보를 바탕으로 추천 테마를 불러온다")
    @GetMapping("user/recommend")
    private ResponseEntity<Map<String, Object>> getRecommendThemeOfLoginUser(
            @AuthenticationPrincipal User user) throws Exception {
        logger.debug(">> request : myEmail={}", user.getUsername());

        Map<String, Object> resultMap = new HashMap<>();

        List<ThemeBundleResponse> recommendThemes = themeService.getRecommendedThemes(user.getUsername());
        resultMap.put("recommendThemes", recommendThemes);
        logger.debug("<< response : recommendThemes={}", recommendThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "유저의 상위 테마 조히", description = "유저 정보를 바탕으로 랜덤한 상위 테마를 불러온다")
    @GetMapping("user/feel-or-region")
    private ResponseEntity<Map<String, Object>> getFeelOrRegionThemeOfLoginUser(
            @AuthenticationPrincipal User user) throws Exception {
        logger.debug(">> request : myEmail={}", user.getUsername());

        Map<String, Object> resultMap = new HashMap<>();

        ThemeBundleResponse feelOrRegionThemes = themeService.getFeelOrRegionThemesOfUser(user.getUsername());
        resultMap.put("feelOrRegionThemes", feelOrRegionThemes);
        logger.debug("<< response : feelOrRegionThemes={}", feelOrRegionThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "체감 인기 테마 조회", description = "랜덤한 체감 인기 테마를 불러온다")
    @GetMapping("guest/feel")
    private ResponseEntity<Map<String, Object>> getFeelThemeOfGuest() throws Exception {
        logger.debug(">> request : none");

        Map<String, Object> resultMap = new HashMap<>();

        ThemeBundleResponse feelThemes = themeService.getFeelThemes();
        resultMap.put("feelThemes", feelThemes);
        logger.debug("<< response : feelThemes={}", feelThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "지역 인기 테마 조회", description = "랜덤 지역의 인기 테마를 불러온다")
    @GetMapping("guest/region")
    private ResponseEntity<Map<String, Object>> getRegionThemeOfGuest() throws Exception {
        logger.debug(">> request : none");

        Map<String, Object> resultMap = new HashMap<>();

        ThemeBundleResponse regionThemes = themeService.getRegionThemes();
        resultMap.put("regionThemes", regionThemes);
        logger.debug("<< response : regionThemes={}", regionThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "금주 핫 테마 조회", description = "금주 핫 테마를 불러온다")
    @GetMapping("common/hot")
    private ResponseEntity<Map<String, Object>> getHotTheme() throws Exception {
        logger.debug(">> request : none");

        Map<String, Object> resultMap = new HashMap<>();

        List<PreviewThemeResponse> hotThemes = themeService.getHotThemes();
        resultMap.put("hotThemes", hotThemes);
        logger.debug("<< response : hotThemes={}", hotThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "어워드 테마 조회", description = "어워즈 테마를 랜덤으로 불러온다")
    @GetMapping("common/award")
    private ResponseEntity<Map<String, Object>> getAwardTheme() throws Exception {
        logger.debug(">> request : none");

        Map<String, Object> resultMap = new HashMap<>();

        AwardThemeBundleResponse awardThemes = themeService.getAwardThemes();
        resultMap.put("awardThemes", awardThemes);
        logger.debug("<< response : awardThemes={}", awardThemes);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "금주 핫 테마 계산", description = "금주의 핫 테마를 계산해서 DB에 저장한다")
    @GetMapping("hot/calculation")
    private ResponseEntity<Void> setHotTheme() throws Exception {
        logger.debug(">> request : none");

        themeService.setHotThemes();
        logger.debug("<< response : none");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "테마 검색", description = "검색 필터를 기반으로 일치하는 테마를 불러온다")
    @GetMapping("search")
    private ResponseEntity<Map<String, Object>> searchedTheme(
            @ModelAttribute @Valid SearchThemeRequest searchThemeRequest, Errors errors) throws Exception {
        logger.debug(">> request : SearchThemeRequest={}", searchThemeRequest);

        // searchThemeRequest 입력값 유효성 검사
        for (FieldError error : errors.getFieldErrors())
            throw new Exception(error.getDefaultMessage());
        searchThemeRequest.validation();

        Map<String, Object> resultMap = new HashMap<>();

        Page<PreviewThemeResponse> resultPage = themeService.getSearchThemes(searchThemeRequest);
        resultMap.put("isLast", resultPage.isLast());
        logger.debug("<< response : isLast={}", resultPage.isLast());

        resultMap.put("themes", resultPage.getContent());
        logger.debug("<< response : themes={}", resultPage.getContent());

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마의 상세 정보 조회", description = "해당 테마의 상세 정보를 불러온다")
    @GetMapping("{themeId}")
    private ResponseEntity<Map<String, Object>> getThemeInfo(
            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable("themeId") int themeId) throws Exception {
        logger.debug(">> request : themeId={}", themeId);

        Map<String, Object> resultMap = new HashMap<>();

        ThemeResponse themeResponse = themeService.getThemeInfo(themeId);
        resultMap.put("theme", themeResponse);
        logger.debug("<< response : theme={}", themeResponse);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마의 리뷰 목록 조회", description = "해당 테마의 리뷰 목록을 불러온다")
    @GetMapping("{themeId}/reviews")
    private ResponseEntity<Map<String, Object>> getReviewsOfTheme(
            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable int themeId) throws Exception {
        logger.debug(">> request : themeId={}", themeId);

        Map<String, Object> resultMap = new HashMap<>();

        List<ReviewOfThemeResponse> reviewOfThemeResponses = reviewService.getReviewsOfTheme(themeId);
        resultMap.put("reviews", reviewOfThemeResponses);
        logger.debug("<< response : reviews={}", reviewOfThemeResponses);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @Operation(summary = "테마 상세 로그인 정보", description = "사용자가 관심있는 테마인지, 리뷰를 작성했는지 여부를 불러온다.")
    @GetMapping("{themeId}/user")
    private ResponseEntity<Map<String, Object>> getUserOfTheme(
            @AuthenticationPrincipal User user,
            @Parameter(description = "해당 테마의 Id", required = true) @PathVariable int themeId) throws Exception {
        logger.debug(">> request : themeId={}", themeId);

        Map<String, Object> resultMap = new HashMap<>();

        boolean isInterest = interestThemeService.isInterestTheme(user.getUsername(), themeId);
        resultMap.put("isInterest",isInterest);
        logger.debug("<< response : isInterest={}",isInterest);

        boolean isMyReview = reviewService.isMyReview(user.getUsername(), themeId);
        resultMap.put("isMyReview",isMyReview);
        logger.debug("<< response : isMyReview={}",isMyReview);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
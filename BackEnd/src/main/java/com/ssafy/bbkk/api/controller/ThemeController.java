package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.AwardThemeBundleResponse;
import com.ssafy.bbkk.api.dto.PreviewThemeDto;
import com.ssafy.bbkk.api.dto.SearchThemeRequest;
import com.ssafy.bbkk.api.dto.ThemeBundleResponse;
import com.ssafy.bbkk.api.dto.ThemeResponse;
import com.ssafy.bbkk.api.service.ThemeService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

//    private final UserService userService;

    private final ThemeService themeService;


    /**
     * DB 추가 후 내용 추가 바람
     */
    @GetMapping("recommend")
    public ResponseEntity<Map<String, Object>> recommendedTheme(Authentication authentication) throws Exception {
        logger.info("[recommendedTheme] request : X");
        Map<String, Object> resultMap = new HashMap<>();

        int userId = (int) authentication.getCredentials();
        List<ThemeBundleResponse> themeBundleResponseList = null;

        themeBundleResponseList = themeService.getRecommendedThemes(userId);
        resultMap.put("recommendThemes", themeBundleResponseList);

        logger.info("[recommendedTheme] response : recommendThemes={}", themeBundleResponseList.toString());
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    /**
     * DB 추가 후 내용 추가 바람
     */
    @GetMapping()
    public ResponseEntity<Map<String, Object>> topTheme() throws Exception {
        logger.info("[topTheme] request : X");
        Map<String, Object> resultMap = new HashMap<>();

        List<ThemeBundleResponse> themeBundleResponseList = null;
        List<AwardThemeBundleResponse> AwardThemeBundleList = null;

        themeBundleResponseList = themeService.getTopThemes();
        AwardThemeBundleList = themeService.getAwardThemes();
        resultMap.put("topThemes", themeBundleResponseList);
        resultMap.put("awardThemes", AwardThemeBundleList);

        logger.info("[topTheme] response : recommendThemes={}, awardThemes={}", themeBundleResponseList.toString(), AwardThemeBundleList.toString());
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity<Map<String, Object>> searchedTheme(@ModelAttribute SearchThemeRequest searchThemeRequest) throws Exception {
        logger.info("[searchedTheme] request : SearchThemeRequest={}", searchThemeRequest);
        Map<String, Object> resultMap = new HashMap<>();

        List<PreviewThemeDto> previewThemeDtoList = null;

        previewThemeDtoList = themeService.getSearchThemes(searchThemeRequest);
        resultMap.put("themes", previewThemeDtoList);

        logger.info("[searchedTheme] response : themes={}", previewThemeDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @GetMapping("{themeId}")
    public ResponseEntity<Map<String, Object>> themeInfo(@PathVariable("themeId") int themeId) throws Exception {
        logger.info("[themeInfo] request : themeId={}", themeId);
        Map<String, Object> resultMap = new HashMap<>();

        ThemeResponse themeResponse = null;

        themeResponse = themeService.getThemeInfo(themeId);
        resultMap.put("theme", themeResponse);

        logger.info("[themeInfo] response : theme={}", themeResponse.toString());
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

}
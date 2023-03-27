package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.*;

import java.util.List;

public interface ThemeService {
    List<ThemeBundleResponse> getRecommendedThemes(String email) throws Exception;
    List<PreviewThemeResponse> getHotThemes() throws Exception;
    List<ThemeBundleResponse> getTopThemes() throws Exception;
    List<ThemeBundleResponse> getTopThemesOfUser(String email) throws Exception;
    AwardThemeBundleResponse getAwardThemes() throws Exception;
    List<PreviewThemeResponse> getSearchThemes(SearchThemeRequest searchThemeRequest) throws Exception;
    ThemeResponse getThemeInfo(int themeId) throws Exception;
    List<ReviewOfThemeResponse> getReviews(int reviewId) throws Exception;
}
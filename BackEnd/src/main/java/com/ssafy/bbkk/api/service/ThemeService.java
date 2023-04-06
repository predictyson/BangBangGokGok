package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.*;

import java.util.List;
import org.springframework.data.domain.Page;

public interface ThemeService {
    List<ThemeBundleResponse> getRecommendedThemes(String email) throws Exception;
    List<PreviewThemeResponse> getHotThemes() throws Exception;
    List<ThemeBundleResponse> getTopThemes() throws Exception;
    List<ThemeBundleResponse> getTopThemesOfUser(String email) throws Exception;
    ThemeBundleResponse getFeelOrRegionThemesOfUser(String email) throws Exception;
    ThemeBundleResponse getFeelThemes() throws Exception;
    ThemeBundleResponse getRegionThemes() throws Exception;
    AwardThemeBundleResponse getAwardThemes() throws Exception;
    Page<PreviewThemeResponse> getSearchThemes(SearchThemeRequest searchThemeRequest) throws Exception;
    ThemeResponse getThemeInfo(int themeId) throws Exception;
    void setHotThemes() throws Exception;
}
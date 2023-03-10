package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.AwardThemeBundleResponse;
import com.ssafy.bbkk.api.dto.PreviewThemeDto;
import com.ssafy.bbkk.api.dto.SearchThemeRequest;
import com.ssafy.bbkk.api.dto.ThemeBundleResponse;
import com.ssafy.bbkk.api.dto.ThemeResponse;
import java.util.List;

public interface ThemeService {

    List<ThemeBundleResponse> getRecommendedThemes(int userId) throws Exception;

    List<ThemeBundleResponse> getTopThemes() throws Exception;

    List<AwardThemeBundleResponse> getAwardThemes() throws Exception;

    List<PreviewThemeDto> getSearchThemes(SearchThemeRequest searchThemeRequest) throws Exception;

    ThemeResponse getThemeInfo(int themeId) throws Exception;


}
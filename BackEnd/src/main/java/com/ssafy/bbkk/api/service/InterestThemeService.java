package com.ssafy.bbkk.api.service;

public interface InterestThemeService {
    void addInterestTheme(String email, int themeId) throws Exception;
    void deleteInterestTheme(String email, int themeId) throws Exception;
}

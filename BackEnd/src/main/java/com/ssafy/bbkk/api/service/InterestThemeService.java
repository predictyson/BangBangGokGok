package com.ssafy.bbkk.api.service;

public interface InterestThemeService {
    boolean isInterestTheme(String email, int themeId) throws Exception;
    void addInterestTheme(String email, int themeId) throws Exception;
    void deleteInterestTheme(String email, int themeId) throws Exception;
}

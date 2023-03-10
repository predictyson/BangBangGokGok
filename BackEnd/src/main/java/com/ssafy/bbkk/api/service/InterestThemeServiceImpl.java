package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.db.entity.InterestedThemeOfUser;
import com.ssafy.bbkk.db.entity.Theme;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.InterestedThemeOfUserRepository;
import com.ssafy.bbkk.db.repository.ThemeRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class InterestThemeServiceImpl implements InterestThemeService{

    private final InterestedThemeOfUserRepository interestedThemeOfUserRepository;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;

    @Override
    public void addInterestTheme(String email, int themeId) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        Theme theme = themeRepository.findById(themeId).orElseThrow(NullPointerException::new);
        interestedThemeOfUserRepository.save(new InterestedThemeOfUser(user, theme));
    }

    @Override
    public void deleteInterestTheme(String email, int themeId) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        interestedThemeOfUserRepository.deleteByUserIdAndThemeId(user.getId(), themeId);
    }
}

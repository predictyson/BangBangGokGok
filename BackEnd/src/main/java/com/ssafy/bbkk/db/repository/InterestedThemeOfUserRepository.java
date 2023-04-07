package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.InterestedThemeOfUser;
import com.ssafy.bbkk.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface InterestedThemeOfUserRepository extends JpaRepository<InterestedThemeOfUser, Integer> {
    boolean existsByUserIdAndThemeId(int userId, int themeId);
    void deleteByUserIdAndThemeId(int userId, int themeId);
    List<InterestedThemeOfUser> findByModifiedDateAfter(LocalDateTime now);
}
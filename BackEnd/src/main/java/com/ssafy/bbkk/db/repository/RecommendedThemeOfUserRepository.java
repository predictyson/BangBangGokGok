package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.RecommendedThemeOfUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendedThemeOfUserRepository extends JpaRepository<RecommendedThemeOfUser, Integer> {
    int countByUserId(int userId);
    List<RecommendedThemeOfUser> findByUserId(int userId);
}

package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThemeRepository extends JpaRepository<Theme, Integer> {
    List<Theme> findByRegionIdOrderByUserRatingDesc(int regionId);
    int countByRegionId(int regionId);
    List<Theme> findByUserCntGreaterThanOrderByUserDifficultyDesc(int userCnt);
    List<Theme> findByUserCntGreaterThanOrderByUserDifficultyAsc(int userCnt);
    List<Theme> findByUserCntGreaterThanOrderByUserFearDesc(int userCnt);
    List<Theme> findByUserCntGreaterThanOrderByUserFearAsc(int userCnt);
}

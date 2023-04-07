package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.api.dto.ThemeCountResponse;
import com.ssafy.bbkk.db.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Integer> {
    List<Theme> findTop9ByOrderByUserCntDesc();
    List<Theme> findByRegionIdOrderByUserRatingDesc(int regionId);
    List<Theme> findAllByRegionId(int regionId);
    int countByRegionId(int regionId);
    List<Theme> findByUserCntGreaterThanOrderByUserDifficultyDesc(int userCnt);
    List<Theme> findByUserCntGreaterThanOrderByUserDifficultyAsc(int userCnt);
    List<Theme> findByUserCntGreaterThanOrderByUserFearDesc(int userCnt);
    List<Theme> findByUserCntGreaterThanOrderByUserFearAsc(int userCnt);
    Optional<Theme> findFirstByOrderByIdDesc();
}

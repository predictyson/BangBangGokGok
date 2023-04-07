package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.db.entity.AwardTheme;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AwardThemeRepository extends JpaRepository<AwardTheme, Integer> {

    List<AwardTheme> findByYear(int year);

}
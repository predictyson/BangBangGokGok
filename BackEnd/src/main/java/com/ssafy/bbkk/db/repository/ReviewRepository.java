package com.ssafy.bbkk.db.repository;

import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByUserId(int userId);
    List<Review> findByModifiedDateAfter(LocalDateTime now);
}

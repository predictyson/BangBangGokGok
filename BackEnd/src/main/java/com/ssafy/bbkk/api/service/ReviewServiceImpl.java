package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.db.entity.Review;
import com.ssafy.bbkk.db.entity.Theme;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.ReviewRepository;
import com.ssafy.bbkk.db.repository.ThemeRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;

    @Override
    public void addReview(String email, CreateReviewRequest createReviewRequest) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow(NullPointerException::new);
        Theme theme = themeRepository.findById(createReviewRequest.getThemeId()).orElseThrow(NullPointerException::new);
        Review review = new Review(user, theme, createReviewRequest);
        reviewRepository.save(review);
    }

}

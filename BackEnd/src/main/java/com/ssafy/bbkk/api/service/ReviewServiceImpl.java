package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;
import com.ssafy.bbkk.db.entity.Review;
import com.ssafy.bbkk.db.entity.Theme;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.ReviewRepository;
import com.ssafy.bbkk.db.repository.ThemeRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;

    @Override
    public ReviewOfUserResponse getReview(int reviewId) throws Exception {
        ReviewOfUserResponse result = null;
        // 리뷰 id를 통해 리뷰 찾아오기
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        // 리뷰를 Dto에 감싸기
        result = new ReviewOfUserResponse(review);
        return result;
    }

    @Override
    public List<ReviewOfUserResponse> getReviews(int themeId) throws Exception {
        List<ReviewOfUserResponse> result = null;
        // 테마 id를 통해 테마 불러오기
        Theme theme = themeRepository.findById(themeId).orElseThrow();
        // 리뷰를 Dto에 감싸기
        result = theme.getReviews()
                .stream()
                .map(x->new ReviewOfUserResponse(x))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public void addReview(String email, CreateReviewRequest createReviewRequest) throws Exception {
        // email을 통해 유저 찾아오기
        User user = userRepository.findByEmail(email).orElseThrow();
        // themeId를 통해 테마 찾아오기
        Theme theme = themeRepository.findById(createReviewRequest.getThemeId()).orElseThrow();
        // 리뷰 생성
        Review review = new Review(user, theme, createReviewRequest);
        reviewRepository.save(review);
    }

    @Override
    public void deleteReview(String email, int reviewId) throws Exception {
        // 리뷰 id를 통해 리뷰 찾아오기
        Review review = reviewRepository.findById(reviewId).orElseThrow();
        // 유저가 작성한 리뷰인지 확인하기
        if(email != review.getUser().getEmail()) throw new NoSuchElementException();
        // 리뷰 삭제하기
        reviewRepository.deleteById(reviewId);
    }

    @Override
    public void setReview(String email, UpdateReviewRequest updateReviewRequest) throws Exception {
        // email을 통해 유저 찾아오기
        User user = userRepository.findByEmail(email).orElseThrow();
        // reviewId를 통해 리뷰 찾아오기
        Review review = reviewRepository.findById(updateReviewRequest.getReviewId()).orElseThrow();
        // 유저가 작성한 리뷰인지 확인하기
        if(user.getId() != review.getUser().getId()) throw new NoSuchElementException();
        // 리뷰 수정하기
        review.updateReviewInfo(updateReviewRequest);
        reviewRepository.save(review);
    }

}

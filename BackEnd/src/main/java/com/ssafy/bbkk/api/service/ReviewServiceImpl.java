package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.ReviewOfThemeResponse;
import com.ssafy.bbkk.api.dto.ReviewOfUserResponse;
import com.ssafy.bbkk.api.dto.UpdateReviewRequest;
import com.ssafy.bbkk.db.entity.Review;
import com.ssafy.bbkk.db.entity.Theme;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.ReviewRepository;
import com.ssafy.bbkk.db.repository.ThemeRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;

    @Override
    public boolean isMyReview(String email, int themeId) throws Exception {
        boolean result;
        // 이메일을 통해 유저를 불러온다
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("해당 사용자를 찾을 수 없습니다."));
        // 테마 id를 통해 테마를 불러온다.
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new Exception("해당 테마를 찾을 수 없습니다."));
        // 유저 id와 테마 id를 통해 리뷰가 존재하는지 확인
        result = reviewRepository.existsByUserIdAndThemeId(user.getId(), theme.getId());
        return result;
    }

    @Override
    public void addReview(String email, CreateReviewRequest createReviewRequest) throws Exception {
        // email을 통해 유저 찾아오기
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("해당 사용자를 찾을 수 없습니다."));
        // themeId를 통해 테마 찾아오기
        Theme theme = themeRepository.findById(createReviewRequest.getThemeId())
                .orElseThrow(() -> new Exception("해당 테마를 찾을 수 없습니다."));
        // 리뷰 생성
        Review review = new Review(user, theme, createReviewRequest);
        review = reviewRepository.save(review);
        // 테마의 평점 반영하기
        theme.addReview(review);
        themeRepository.save(theme);
    }

    @Override
    public void deleteReview(String email, int reviewId) throws Exception {
        // email을 통해 유저 찾아오기
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("해당 유저를 찾을 수 없습니다."));
        // 리뷰 id를 통해 리뷰 찾아오기
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("해당 리뷰를 찾을 수 없습니다."));
        // 리뷰의 테마 찾아오기
        int themeId = review.getTheme().getId();
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new Exception("해당 테마를 찾을 수 없습니다."));
        // 해당 유저가 작성한 리뷰인지 확인하기
        if (user.getId() != review.getUser().getId())
            throw new Exception("해당 리뷰를 삭제할 권한이 없습니다.");
        // 리뷰 삭제하기
        reviewRepository.deleteById(reviewId);
        // 테마의 평점 반영하기
        theme.deleteReview(review);
        themeRepository.save(theme);
    }

    @Override
    @Transactional
    public ReviewOfUserResponse setReview(String email, UpdateReviewRequest updateReviewRequest) throws Exception {
        // email을 통해 유저 찾아오기
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("해당 사용자를 찾을 수 없습니다."));
        // 리뷰 id를 통해 리뷰 찾아오기
        Review review = reviewRepository.findById(updateReviewRequest.getReviewId())
                .orElseThrow(() -> new Exception("해당 리뷰를 찾을 수 없습니다."));
        // 해당 유저가 작성한 리뷰인지 확인하기
        if (user.getId() != review.getUser().getId())
            throw new Exception("해당 리뷰를 수정할 권한이 없습니다.");
        // 테마 찾아오기
        int themeId = review.getTheme().getId();
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new Exception("해당 테마를 찾을 수 없습니다."));
        // 평점 반영하기
        theme.modifyReview(review, updateReviewRequest);
        // 리뷰 수정하기
        review.updateReviewInfo(updateReviewRequest);
        return new ReviewOfUserResponse(review);
    }
}

//    @Override
//    public ReviewOfUserResponse getReview(int reviewId) throws Exception {
//        ReviewOfUserResponse result = null;
//        // 리뷰 id를 통해 리뷰 찾아오기
//        Review review = reviewRepository.findById(reviewId).orElseThrow(
//                () -> new Exception("reviewId=" + reviewId + "에 맞는 리뷰를 찾을 수 없습니다."));
//        // 리뷰를 Dto에 감싸기
//        result = new ReviewOfUserResponse(review);
//        return result;
//    }

//    @Override
//    public List<ReviewOfThemeResponse> getReviews(int themeId) throws Exception {
//        List<ReviewOfThemeResponse> result = null;
//        // 테마 id를 통해 테마 불러오기
//        Theme theme = themeRepository.findById(themeId).orElseThrow(
//                () -> new Exception("themeId=" + themeId + "에 맞는 테마를 찾을 수 없습니다."));
//        // 리뷰를 Dto에 감싸기
//        result = theme.getReviews()
//                .stream()
//                .map(x -> new ReviewOfThemeResponse(x))
//                .collect(Collectors.toList());
//        return result;
//    }

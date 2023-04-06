package com.ssafy.bbkk.api.controller;

import java.util.*;
import java.util.stream.Collectors;

import com.ssafy.bbkk.api.dto.CreateReviewRequest;
import com.ssafy.bbkk.api.dto.ThemeResponse;
import com.ssafy.bbkk.api.dto.UserTestResponse;
import com.ssafy.bbkk.api.service.OtherService;
import com.ssafy.bbkk.api.service.ReviewService;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.ThemeRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("test")
@RequiredArgsConstructor
public class TestController {
    private static final Logger logger = LoggerFactory.getLogger(TestController.class);
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;
    private final ReviewService reviewService;
    private final OtherService otherService;

    @GetMapping("review/insert/{startIndex}/{endIndex}")
    private ResponseEntity<Void> insertRandomReview(
            @PathVariable int startIndex,
            @PathVariable int endIndex) throws Exception {
        logger.info("<<---------------(start)----------------||insertRandomReview||------------------------------------>>\n");
        Random rnd = new Random();

        String[] good_content = {" ", "문제 인테리어 연출 모두 훌륭하다", "문제는 어려웠는데 가이드가 친절해서 좋았어요!",
                "비슷한 모 테마들 상위호환!!", "쉽지만 재밌었어요!", "스토리가 마음에 들었어요", "재미있다 웃음꽃 만개",
                "기대 안 하고 갔는데 꿀잼이었음", "킹!왕!짱!", "입문자들에게 강추합니다.", "한 문제가 어려웠지만 재미있었습니다.",
                "카페가 깔끔하고 테마도 좋았어요", "신박한 문제들 개추요", "꿀잼이당", "나중에 또 하고 싶어요", "알바생이 너무 친절했어요", "알바생이 너무 아름다워요"
                , "처음이라 긴장했는데 생각보다 재미있었어어요", "방탈출 완전 재밌다", "시설이 깔끔해서 좋았어요", "좋았어용!!"
                , "이런게 방탈출이지~", "너무 알찼다!!!", "ㅋㅋㅋㅋㅋㅋ 재밌게 놀았어요", "또 올께요", "전설의 레전드였다 ㄷㄷㄷ", "제가 원하던 난이도였어요!!"
                , "다음엔 다른 테마를 도전해볼께요", "중간에 아리송한게 있었는데 그거 말고는 완전 만족했어요", "테마 도전 안해본 뇌 삽니다@@@@@"
                , "안가본 너가 리뷰 보는거 말고 뭘 할수 있는데 ㅋㅋㅋㅋ", "굿", "재밌어용", "꿀잼ㅎ", "신박함", "나이스",
                "이게 방탈출이지", "굿굿굿", "야미~", "진짜 강추, 완전 추"};

        String[] bad_content = {" ", "매장이 좀 더러웠어요", "기대했던 것보다 재미없어서 아쉬워요", "괜찮았어요", "아쉬웠어요"
                , "직원분이 좀 부담스러웠음. 과하게 친절한데 뭔가 가르치려는 느낌이 들어서 좀 그랬다",
                "추리 실패ㅠㅠ", "힘들어", "불친절해...", "문제 가이드가 부족하다.. ", "뭔가 좀 다듬어지면 괜찮은 테마일 듯!", "할말하않....",
                "약간 손보면 괜찮을 테마", "어렵다기보단 문제가 이상한 느낌이 들었다.", "너무 어려워요...", "너무 허무하다. 금방 끝남", "쉬워요",
                "알바생이 너무 불친절해요.. 테마는 어렵고 노후화 되어있어서 별로였어요", "기록용",
                "매장이 너무 더러워요", "물건들에 손때 묻은 흔적이 너무 많아요",
                "억지스럽게 어렵게 짠 느낌. 별로였어요", "매장 직원이 불친절해요", "너무 어려워요",
                "힌트가 너무 없어요", "기분이 나빠요", "재미 없어요", "하나도 안신박함... 너무 뻔한 소재",
                "예상이 가는 전개라 재미 없었어요", "매장 청소를 안하는거같아요",
                "별로예요", "테마가 재미 없음", "뻔한 소재", "억지스러움", "불친절함", "너무 어려워서 풀 수가 없어요",
                "어려움", "짜증남", "탈출하다가 화남"};

        int goodSize = good_content.length;
        int badSize = bad_content.length;

        System.out.println("*** ************((테마 불러오기))************* *** ");
        List<ThemeResponse> themes = themeRepository.findAll()
                .stream()
                .map(x -> new ThemeResponse(x))
                .collect(Collectors.toList());

        int themeId;
        int isSuccess;

        String content;
        double userRating;
        double userActivity;
        double userFear;
        double userDifficulty;

        // 1부터 userIndex까지의 유저
        for (int i = startIndex; i <= endIndex; i++) {
            System.out.println("** ************((" + i + "번 유저))************* ** ");
            User userEntity = userRepository.findById(i)
                    .orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다."));
            UserTestResponse userDto = new UserTestResponse(userEntity);
            System.out.println("** user : " + userDto);

            List<String> userGenres = userDto.getUserGenres();

            // 모든 테마마다
            for (ThemeResponse theme : themes) {

                boolean isContains = false;
                for (String genre : theme.getGenre()) {
                    if (userGenres.contains(genre)) {
                        isContains = true;
                        break;
                    }
                }

                // 해당 테마가 유저의 선호 장르라면 80%의 확률로 리뷰 작성
                if (isContains && rnd.nextInt(10) + 1 <= 8) {
                    System.out.println("* 선호 장르의 테마입니다!");
                }
                // 선호 장르가 아니라면 30%의 확률로 리뷰를 작성
                else if (!isContains && rnd.nextInt(10) + 1 <= 3) {
                    System.out.println("* 선호 장르가 아닌 테마입니다!");
                } else {
                    continue;
                }

                themeId = theme.getThemeId();
                isSuccess = rnd.nextBoolean() ? 1 : 0;

                // 테마의 userCnt가 존재하면 체감 수치에 랜덤정규분포 값으로 설정
                if (theme.getUserCnt() > 0) {
                    userActivity = calcVal(theme.getUserActivity(), rnd.nextGaussian());
                    userFear = calcVal(theme.getUserFear(), rnd.nextGaussian());
                    userRating = calcVal(theme.getUserRating(), rnd.nextGaussian());
                    userDifficulty = calcVal(theme.getDifficulty(), rnd.nextGaussian());
                }
                // 존재하지 않다면 2.5점을 기준으로 랜덤정규분포 값으로 설정
                else {
                    userActivity = calcVal(2.5, rnd.nextGaussian());
                    userFear = calcVal(2.5, rnd.nextGaussian());
                    userRating = calcVal(2.5, rnd.nextGaussian());
                    userDifficulty = calcVal(2.5, rnd.nextGaussian());
                }

                if (userRating >= 2.5) {
                    content = good_content[rnd.nextInt(goodSize)];
                } else {
                    content = bad_content[rnd.nextInt(badSize)];
                }

                CreateReviewRequest createReviewRequest = CreateReviewRequest.builder()
                        .themeId(themeId)
                        .content(content)
                        .isSuccess(isSuccess)
                        .userActivity(userActivity)
                        .userDifficulty(userDifficulty)
                        .userFear(userFear)
                        .userRating(userRating)
                        .build();
                System.out.println("* review : " + createReviewRequest);
                reviewService.addReview(userDto.getEmail(), createReviewRequest);
            }
        }

        logger.info("<<---------------------------------------||insertRandomReview||---------------(end)--------------->>\n");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private double calcVal(double val, double rnd){
        // 10을 기준으로 만들고
        double result = val * 2;
        rnd *= 1.5; // +- 5

        // 랜덤 변수를 더해준다
        result += rnd;

        // 정수로 반올림해주고
        result = Math.round(result);

        if(result >= 10.0) result = 10.0;
        if(result <= 1.0) result = 1.0;

        // 5를 기준으로 변환해준다
        result /= 2;

        return result;
    }

    @GetMapping("cf/{startIndex}/{endIndex}")
    private ResponseEntity<Void> goCF(
            @PathVariable int startIndex,
            @PathVariable int endIndex) throws Exception {
        logger.info(">> request : startIndex={}", startIndex);
        logger.info(">> request : endIndex={}", endIndex);

        for(int i=startIndex;i<=endIndex;i++){
            Optional<User> user = userRepository.findById(i);
            if(user.isPresent()) otherService.recCF(user.get().getEmail());
        }

        logger.info("<< response : none");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}


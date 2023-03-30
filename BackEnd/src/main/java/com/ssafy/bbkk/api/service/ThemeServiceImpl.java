package com.ssafy.bbkk.api.service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.bbkk.api.dto.AwardThemeBundleResponse;
import com.ssafy.bbkk.api.dto.PreviewThemeResponse;
import com.ssafy.bbkk.api.dto.SearchThemeRequest;
import com.ssafy.bbkk.api.dto.ThemeBundleResponse;
import com.ssafy.bbkk.api.dto.ThemeCountResponse;
import com.ssafy.bbkk.api.dto.ThemeResponse;
import com.ssafy.bbkk.db.entity.QGenreOfTheme;
import com.ssafy.bbkk.db.entity.QTheme;
import com.ssafy.bbkk.db.entity.Region;
import com.ssafy.bbkk.db.entity.Theme;
import com.ssafy.bbkk.db.entity.User;
import com.ssafy.bbkk.db.repository.AwardThemeRepository;
import com.ssafy.bbkk.db.repository.InterestedThemeOfUserRepository;
import com.ssafy.bbkk.db.repository.RecommendedThemeOfUserRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
import com.ssafy.bbkk.db.repository.ReviewRepository;
import com.ssafy.bbkk.db.repository.ThemeRepository;
import com.ssafy.bbkk.db.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ThemeServiceImpl implements ThemeService {

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final ReviewRepository reviewRepository;
    private final ThemeRepository themeRepository;
    private final InterestedThemeOfUserRepository interestedRepository;
    private final AwardThemeRepository awardThemeRepository;
    private final RecommendedThemeOfUserRepository recommendedThemeOfUserRepository;

    private final int THEME_RETURN_COUNT = 5;
    private final int THEME_COUNT = 10;

    @PersistenceContext
    private EntityManager entityManager;

    // 지역 id에 해당되는 지역의 인기 테마를 반환
    public ThemeBundleResponse getRegionBundle(int regionId) throws Exception {
        ThemeBundleResponse result = null;
        Random rnd = new Random();
        String label;
        // 테마의 지역
        Region region = regionRepository.findById(regionId)
                .orElseThrow(() -> new Exception("해당 지역을 찾을 수 없습니다."));

        List<PreviewThemeResponse> themes = null;
        List<PreviewThemeResponse> list = null;
        int themeCnt = themeRepository.countByRegionId(region.getId());
        // 테마 개수가 적을 경우
        if (themeCnt < THEME_COUNT) {
            List<Integer> regionIds = regionRepository.findAllByRegionBig(region.getRegionBig())
                    .stream()
                    .map(x -> x.getId())
                    .collect(Collectors.toList());
            // 지역 대분류에서 테마 가져오기
            list = new ArrayList<>();
            for (int regId : regionIds) {
                if (themeRepository.countByRegionId(regId) >= 1) {
                    list.addAll(themeRepository.findByRegionIdOrderByUserRatingDesc(regId)
                            .stream()
                            .map(x -> new PreviewThemeResponse(x))
                            .collect(Collectors.toList()));
                }
            }
            label = region.getRegionBig() + "에서 인기있는 테마";
        }
        // 테마 개수가 많을 경우
        else {
            // 지역 소분류에서 테마 가져오기
            list = themeRepository.findByRegionIdOrderByUserRatingDesc(region.getId())
                    .stream()
                    .map(x -> new PreviewThemeResponse(x))
                    .collect(Collectors.toList());
            label = region.getRegionBig() + " " + region.getRegionSmall() + "에서 인기있는 테마";
        }

        int cnt = 0;
        List<PreviewThemeResponse> temp = null;
        while (true) {
            cnt = 0;
            temp = new ArrayList<>();

            // 테마를 위에서부터 for문으로
            for (PreviewThemeResponse theme : list) {
                // 확률에 의해 담긴다
                if (rnd.nextInt(10) < 8) { // 80%
                    cnt++;
                    temp.add(theme);
                }
                // 모두 담겼으면 끝
                if (cnt == THEME_RETURN_COUNT)
                    break;
            }
            // 모두 담겼으면 끝
            if (cnt == THEME_RETURN_COUNT) {
                themes = temp;
                break;
            }
        }// 근데 이 방식은 지역 대분류에서 가져온 테마 목록의 개수마저도 적으면 에러가 날 수 있다

        result = new ThemeBundleResponse(label, themes);

        return result;
    }

    // 사람들이 ~~다고 느낀 테마를 반환
    public ThemeBundleResponse getFeelBundle() throws Exception {
        Random rnd = new Random();
        int type = rnd.nextInt(4);

        ThemeBundleResponse result = null;
        List<PreviewThemeResponse> themes = null;
        List<PreviewThemeResponse> list = null;
        String label = "";
        switch (type) {
            case 0: // 난이도 최고
                list = themeRepository.findByUserCntGreaterThanOrderByUserDifficultyDesc(4)
                        .stream()
                        .map(x -> new PreviewThemeResponse(x))
                        .collect(Collectors.toList());
                label = "유저들이 어렵다고 느낀 테마";
                break;
            case 1: // 난이도 최하
                list = themeRepository.findByUserCntGreaterThanOrderByUserDifficultyAsc(4)
                        .stream()
                        .map(x -> new PreviewThemeResponse(x))
                        .collect(Collectors.toList());
                label = "유저들이 쉽다고 느낀 테마";
                break;
            case 2: // 공포도 최고
                list = themeRepository.findByUserCntGreaterThanOrderByUserFearDesc(4)
                        .stream()
                        .map(x -> new PreviewThemeResponse(x))
                        .collect(Collectors.toList());
                label = "유저들이 무섭다고 느낀 테마";
                break;
            case 3: // 공포도 최하
                list = themeRepository.findByUserCntGreaterThanOrderByUserFearAsc(4)
                        .stream()
                        .map(x -> new PreviewThemeResponse(x))
                        .collect(Collectors.toList());
                label = "유저들이 무섭지 않다고 느낀 테마";
                break;
            default:
                throw new Exception("해당 type의 형식이 맞지 않습니다.");
        }

        int cnt = 0;
        List<PreviewThemeResponse> temp = null;
        while (true) {
            cnt = 0;
            temp = new ArrayList<>();

            // 테마를 위에서부터 for문으로
            for (PreviewThemeResponse theme : list) {
                // 확률에 의해 담긴다
                if (rnd.nextInt(10) < 8) { // 80%
                    cnt++;
                    temp.add(theme);
                }
                // 모두 담겼으면 끝
                if (cnt == THEME_RETURN_COUNT)
                    break;
            }
            // 모두 담겼으면 끝
            if (cnt == THEME_RETURN_COUNT) {
                themes = temp;
                break;
            }
        }

        result = new ThemeBundleResponse(label, themes);

        return result;
    }

    @Override
    public List<ThemeBundleResponse> getRecommendedThemes(String email) throws Exception {
        List<ThemeBundleResponse> result = null;
        // 유저 email을 통해 유저 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("해당 사용자를 찾을 수 없습니다."));
        // 추천 테마 리스트
        List<PreviewThemeResponse> CBFList = new ArrayList<>();
        List<PreviewThemeResponse> CFList = new ArrayList<>();
        int cnt = recommendedThemeOfUserRepository.countByUserId(user.getId());

        if (cnt > 0) {
            result = new ArrayList<>();
            // 유저의 추천 테마 목록 조회
            recommendedThemeOfUserRepository.findByUserId(user.getId())
                    .forEach(x -> {
                        if (x.getType() == 1) {
                            CBFList.add(new PreviewThemeResponse(x.getTheme()));
                        } else {
                            CFList.add(new PreviewThemeResponse(x.getTheme()));
                        }
                    });
            // CBF : 맞춤 테마
            result.add(new ThemeBundleResponse("님의 맞춤 추천 테마입니다", CBFList));
            // CF : 비슷한 유저와 비교시 맞춤 테마
            if (CFList.size() > 0) {
                result.add(new ThemeBundleResponse("님과 비슷한 유저가 자주간 테마입니다", CFList));
            }
        }
        return result;
    }

    @Override
    public List<PreviewThemeResponse> getHotThemes() throws Exception {
        List<PreviewThemeResponse> result = null;
        Map<Integer, Integer> themeCnt; // 카운트된 테마의 개수
        int[] themeIds; // 테마 id마다 개수 체크할 배열

        Theme topTheme = themeRepository.findFirstByOrderByIdDesc()
                .orElseThrow(() -> new Exception("해당 테마를 찾을 수 없습니다."));
        int themeArraySize = topTheme.getId();
        themeIds = new int[themeArraySize + 1];

        ////////////////////////////////////////////////////////////////////////////////
        // 리뷰 개수 체크
        reviewRepository.findByModifiedDateAfter(LocalDateTime.now().minusDays(7))
                .forEach(review -> {
                    int themeId = review.getTheme().getId();
                    themeIds[themeId]++;
                });

        // 관심 개수 체크
        interestedRepository.findByModifiedDateAfter(LocalDateTime.now().minusDays(7))
                .forEach(interest -> {
                    int themeId = interest.getTheme().getId();
                    themeIds[themeId]++;
                });

        // 개수 체크된 배열을 리스트로 변경
        List<ThemeCountResponse> list = new ArrayList<>();
        for (int i = 0; i <= themeArraySize; i++) {
            if (themeIds[i] > 0) {
                list.add(new ThemeCountResponse(i, themeIds[i]));
            }
        }

        // 핫 한 테마의 개수가 적을 경우
        if (list.size() < 9) {
            // userCnt가 높은 순으로 반환
            result = themeRepository.findTop9ByOrderByUserCntDesc()
                    .stream()
                    .map(x -> new PreviewThemeResponse(x))
                    .collect(Collectors.toList());
        }
        // 핫 한 테마의 개수가 많을 경우
        else {
            // 개수 순으로 내림차순 정렬
            Collections.sort(list, (o1, o2) -> {
                return o2.getCount() - o1.getCount();
            });

            result = new ArrayList<>();
            for (int i = 0; i < 9; i++) {
                result.add(
                        new PreviewThemeResponse(themeRepository.findById(list.get(i).getThemeId())
                                .orElseThrow())
                );
            }
        }

        return result;
    }

    @Override
    public List<ThemeBundleResponse> getTopThemes() throws Exception {
        List<ThemeBundleResponse> result = new ArrayList<>();
        Random rnd = new Random();
        // 체감 테마
        result.add(getFeelBundle());

        // 지역 인기 테마
        List<Region> regionList = regionRepository.findAll();
        // 랜덤 지역 id
        int idx = regionList.get(rnd.nextInt(regionList.size())).getId();
        result.add(getRegionBundle(idx));

        return result;
    }

    @Override
    public List<ThemeBundleResponse> getTopThemesOfUser(String email) throws Exception {
        List<ThemeBundleResponse> result = new ArrayList<>();
        Random rnd = new Random();
        if (rnd.nextBoolean()) {
            // 체감 테마
            result.add(getFeelBundle());
        } else {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new Exception("해당 사용자를 찾을 수 없습니다."));
            // 선호 지역 인기 테마
            result.add(getRegionBundle(user.getRegion().getId()));
        }

        return result;
    }

    @Override
    public AwardThemeBundleResponse getAwardThemes() throws Exception {
        AwardThemeBundleResponse result = null;
        Random rnd = new Random();
        int year = rnd.nextInt(4) + 2019;
        result = new AwardThemeBundleResponse(year, awardThemeRepository.findByYear(year));

        return result;
    }

    @Override
    public Page<PreviewThemeResponse> getSearchThemes(SearchThemeRequest searchThemeRequest) throws Exception {
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        QTheme qTheme = QTheme.theme;
        QGenreOfTheme qGenreOfTheme = QGenreOfTheme.genreOfTheme;

        BooleanBuilder builder = new BooleanBuilder();

        // 검색어가 있으면 검색어를 매장명이나 테마명에서 포함하는 테마들만 가져오도록 조건 추가
        String word = searchThemeRequest.getWord();
        if (!"".equals(word)) {
            builder.and(qTheme.title.contains(word).or(qTheme.storeName.contains(word)));
        }

        // 지역을 선택했으면 해당 지역에 속하는 테마들만 가져오도록 조건 추가
        String regionBig = searchThemeRequest.getRegionBig();
        if (!"전체".equals(regionBig)) {
            builder.and(qTheme.region.regionBig.eq(regionBig));
            String regionSmall = searchThemeRequest.getRegionSmall();
            if (!"전체".equals(regionSmall)) {
                builder.and(qTheme.region.regionSmall.eq(regionSmall));
            }
        }

        // 장르를 선택했으면 해당 장르에 속하는 테마들만 가져오도록 조건 추가
        int genreId = searchThemeRequest.getGenreId();
        if (0 < genreId) {
            builder.and(qGenreOfTheme.genre.id.eq(genreId));
        }

        // 난이도는 항상 조건 추가
        builder.and(qTheme.difficulty.between(searchThemeRequest.getDifficultyS(),
                searchThemeRequest.getDifficultyE()));

        // 인원수를 선택했으면 해당 인원이 갈 수 있는 테마들만 가져오도록 조건 추가
        int people = searchThemeRequest.getPeople();
        if (0 < people) {
            builder.and(qTheme.minPeople.loe(people)).and(qTheme.maxPeople.goe(people));
        }

        // 시간을 선택했으면 해당 시간 범위에 해당하는 테마들만 가져오도록 조건 추가(1일 시 60분 이하, 2일 시 60분 초과)
        int time = searchThemeRequest.getTime();
        switch (time) {
            case 1:
                builder.and(qTheme.runningTime.loe(60));
                break;
            case 2:
                builder.and(qTheme.runningTime.gt(60));
                break;
        }

        Order order = (searchThemeRequest.getOrderby().equals("asc")) ? Order.ASC : Order.DESC; // 정렬 방식
        Expression<Double> sort = qTheme.userRating; // 무엇을 기준으로 정렬할지
        switch (searchThemeRequest.getSortby()) {
            case "userActivity":
                sort = qTheme.userActivity;
                break;
            case "userFear":
                sort = qTheme.userFear;
                break;
            case "userDifficulty":
                sort = qTheme.userDifficulty;
                break;
        }

        final int size = 25; // 한 페이지에 보여줄 정보의 수
        int page = searchThemeRequest.getPage() - 1; // 불러올 페이지
        List<PreviewThemeResponse> content = jpaQueryFactory
                .selectFrom(qTheme).distinct()
                .join(qTheme.genreOfThemes, qGenreOfTheme)
                .where(builder)
                .orderBy(new OrderSpecifier<>(order, sort))
                .offset((long) size * page)
                .limit(size).fetch()
                .stream().map(PreviewThemeResponse::new)
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, size);
        JPAQuery<Long> countQuery = jpaQueryFactory
                .select(qTheme.count())
                .from(qTheme)
                .where(builder);

        Page<PreviewThemeResponse> result = PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);

//        System.out.println("이번 페이지 번호 : " + (result.getNumber()+1)   + " / " + result.getTotalPages());
//        System.out.println("이번 페이지에 보이는 테마 : " + result.getNumberOfElements() + " / " + result.getSize());
//        System.out.println("필터와 일치한 총 테마 : " + result.getTotalElements() );
//        System.out.println("첫 번째 페이지입니까? " + result.isFirst());
//        System.out.println("마지막 페이지입니까? " + result.isLast());

//        List<PreviewThemeResponse> result = content.stream()
//                .map(x -> new PreviewThemeResponse(x))
//                .collect(Collectors.toList());

        return result;
    }

    @Override
    public ThemeResponse getThemeInfo(int themeId) throws Exception {
        ThemeResponse result = null;
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new Exception("해당 테마를 찾을 수 없습니다."));
        result = new ThemeResponse(theme);
        return result;
    }
}
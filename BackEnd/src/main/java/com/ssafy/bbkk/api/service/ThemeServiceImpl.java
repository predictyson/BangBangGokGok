package com.ssafy.bbkk.api.service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.bbkk.api.dto.AwardThemeBundleResponse;
import com.ssafy.bbkk.api.dto.PreviewThemeResponse;
import com.ssafy.bbkk.api.dto.SearchThemeRequest;
import com.ssafy.bbkk.api.dto.ThemeBundleResponse;
import com.ssafy.bbkk.api.dto.ThemeResponse;
import com.ssafy.bbkk.db.entity.QGenreOfTheme;
import com.ssafy.bbkk.db.entity.QTheme;
import com.ssafy.bbkk.db.entity.Theme;
import com.ssafy.bbkk.db.repository.AwardThemeRepository;
import com.ssafy.bbkk.db.repository.ThemeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ThemeServiceImpl implements ThemeService {

    private final ThemeRepository themeRepository;
    private final AwardThemeRepository awardThemeRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ThemeBundleResponse> getRecommendedThemes(String email) throws Exception {
        List<ThemeBundleResponse> result = null;

        return result;
    }

    @Override
    public List<ThemeBundleResponse> getTopThemes() throws Exception {
        List<ThemeBundleResponse> result = null;

        return result;
    }

    @Override
    public List<AwardThemeBundleResponse> getAwardThemes() throws Exception {
        List<AwardThemeBundleResponse> result = new ArrayList<>();
        for (int year = 2019; year < 2023; year++)
            result.add(new AwardThemeBundleResponse(year, awardThemeRepository.findByYear(year)));
        return result;
    }

    @Override
    public List<PreviewThemeResponse> getSearchThemes(SearchThemeRequest searchThemeRequest) throws Exception {
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
            builder.and(qTheme.minPeople.goe(people)).and(qTheme.maxPeople.loe(people));
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
        Expression sort = qTheme.userRating; // 무엇을 기준으로 정렬할지
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

        int page = searchThemeRequest.getPage(); // 몇 번째 페이지의 정보를 불러올 것인지
        int size = 14; // 한 페이지에 보여줄 정보의 수
        List<Theme> target = jpaQueryFactory.selectFrom(qTheme)
                .join(qTheme.genreOfThemes, qGenreOfTheme)
                .where(builder)
                .orderBy(new OrderSpecifier<>(order, sort))
                .offset((page) * size)
                .limit(size)
                .fetch();

        List<PreviewThemeResponse> result = target.stream()
                .map(x -> new PreviewThemeResponse(x))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public ThemeResponse getThemeInfo(int themeId) throws Exception {
        ThemeResponse result = null;
        Theme theme = themeRepository.findById(themeId).orElseThrow();
        result = new ThemeResponse(theme);
        return result;
    }

}
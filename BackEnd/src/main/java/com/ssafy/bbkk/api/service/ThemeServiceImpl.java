package com.ssafy.bbkk.api.service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.bbkk.api.dto.AwardThemeBundleResponse;
import com.ssafy.bbkk.api.dto.PreviewThemeDto;
import com.ssafy.bbkk.api.dto.SearchThemeRequest;
import com.ssafy.bbkk.api.dto.ThemeBundleResponse;
import com.ssafy.bbkk.api.dto.ThemeResponse;
import com.ssafy.bbkk.db.entity.QGenreOfTheme;
import com.ssafy.bbkk.db.entity.QTheme;
import com.ssafy.bbkk.db.entity.Theme;
import com.ssafy.bbkk.db.repository.GenreRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
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
    private final RegionRepository regionRepository;
    private final GenreRepository genreRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ThemeBundleResponse> getRecommendedThemes(int userId) throws Exception {
        List<ThemeBundleResponse> result = new ArrayList<>();

        return result;
    }

    @Override
    public List<ThemeBundleResponse> getTopThemes() throws Exception {
        List<ThemeBundleResponse> result = new ArrayList<>();

        return result;
    }

    @Override
    public List<AwardThemeBundleResponse> getAwardThemes() throws Exception {
        List<AwardThemeBundleResponse> result = new ArrayList<>();

        return result;
    }

    @Override
    public List<PreviewThemeDto> getSearchThemes(SearchThemeRequest searchThemeRequest)
            throws Exception {
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        QTheme qTheme = QTheme.theme;
        QGenreOfTheme qGenreOfTheme = QGenreOfTheme.genreOfTheme;

        BooleanBuilder builder = new BooleanBuilder();
        String word = searchThemeRequest.getWord();
        if (!"".equals(word)) {
            builder.and(qTheme.title.contains(word).or(qTheme.storeName.contains(word)));
        }

        String regionBig = searchThemeRequest.getRegionBig();
        if (!"전체".equals(regionBig)) {
            builder.and(qTheme.region.regionBig.eq(regionBig));
        }

        String regionSmall = searchThemeRequest.getRegionSmall();
        if (!"전체".equals(regionSmall)) {
            builder.and(qTheme.region.regionSmall.eq(regionSmall));
        }

        int genreId = searchThemeRequest.getGenreId();
        if (-1 < genreId) {
            builder.and(qGenreOfTheme.genre.id.eq(genreId));
        }

        builder.and(qTheme.difficulty.between(searchThemeRequest.getDifficultyS(),
                searchThemeRequest.getDifficultyE()));

        int people = searchThemeRequest.getPeople();
        if (0 < people)
            builder.and(qTheme.minPeople.goe(people)).and(qTheme.maxPeople.loe(people));

        Order order = (searchThemeRequest.getOrderby().equals("asc")) ? Order.ASC : Order.DESC;
        Expression sort = qTheme.userRating;
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
                .orderBy(new OrderSpecifier(order, sort))
                .offset((page - 1) * size)
                .limit(size)
                .fetch();

        List<PreviewThemeDto> result = target.stream()
                .map(x -> new PreviewThemeDto(x))
                .collect(Collectors.toList());
        return result;
    }


    @Override
    public ThemeResponse getThemeInfo(int themeId) throws Exception {
        ThemeResponse result = new ThemeResponse(themeRepository.findById(themeId).orElseThrow());
        return result;
    }


}
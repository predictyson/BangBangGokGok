package com.ssafy.bbkk.api.service;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.bbkk.api.dto.GenreResponse;
import com.ssafy.bbkk.db.entity.QRegion;
import com.ssafy.bbkk.db.repository.GenreRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
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
public class OtherServiceImpl implements OtherService {

    private final GenreRepository genreRepository;
    private final RegionRepository regionRepository;

    @Override
    public List<GenreResponse> getGenreList() throws Exception {
        List<GenreResponse> result = null;
        // 장르 목록 모두 찾아오기 및 Dto로 감싸기
        result = genreRepository.findAll()
                .stream()
                .map(x -> new GenreResponse(x))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public List<String> getRegionSmallList(String regionBig) throws Exception {
        List<String> result = null;
        result = regionRepository.findByRegionBig(regionBig).stream()
                .map(x -> x.getRegionSmall())
                .collect(Collectors.toList());
//        result = regionRepository.findRegionBigDistinctBy()
//                .stream()
//                .map(x-> new RegionResponse(x, regionRepository.findAllRegionSmallByRegionBig(x)))
//                .collect(Collectors.toList());
        return result;
    }
}
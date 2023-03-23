package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.GenreResponse;
import com.ssafy.bbkk.api.service.OtherService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("other")
@RequiredArgsConstructor
public class OtherController {

    private static final Logger logger = LoggerFactory.getLogger(OtherController.class);

    private final OtherService otherService;

    @CrossOrigin("*")
    @Operation(summary = "모든 장르 가져오기", description = "모든 장르 종류를 가져온다")
    @GetMapping("genre")
    private ResponseEntity<Map<String, Object>> getSelectList() throws Exception {

        logger.info("[getSelectList] request : ");

        Map<String, Object> resultMap = new HashMap<>();

        List<GenreResponse> genres = otherService.getGenreList();
        resultMap.put("genres", genres);

        logger.info("[getSelectList] response : genres={}", genres);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }


    @CrossOrigin("*")
    @Operation(summary = "지역 소분류 가져오기", description = "지역 대분류 이름을 받아 속하는 지역 소분류 종류를 가져온다")
    @GetMapping("region/{regionBig}")
    private ResponseEntity<Map<String, Object>> getRegionSmallList(@PathVariable("regionBig") String regionBig) throws Exception {

        logger.info("[getRegionSmallList] request : regionBig={}", regionBig);

        Map<String, Object> resultMap = new HashMap<>();

        List<String> regionSmalls = otherService.getRegionSmallList(regionBig);
        resultMap.put("regionSmalls", regionSmalls);

        logger.info("[getSelectList] response : regionSmalls={}", regionSmalls);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}
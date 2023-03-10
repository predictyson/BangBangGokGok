package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.GenreResponse;
import com.ssafy.bbkk.api.dto.RegionResponse;
import com.ssafy.bbkk.api.service.OtherService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("other")
@RequiredArgsConstructor
public class OtherController {

    private static final Logger logger = LoggerFactory.getLogger(OtherController.class);

    private final OtherService otherService;

    @GetMapping
    private ResponseEntity<Map<String, Object>> getSelectList()
            throws Exception{

        logger.info("[getSelectList] request : ");

        Map<String, Object> resultMap = new HashMap<>();

        List<GenreResponse> genres = otherService.getGenreList();
        List<RegionResponse> regions = otherService.getRegionList();

        resultMap.put("genres", genres);
        resultMap.put("regions",regions);

        logger.info("[getSelectList] response : genres={}, regions={}", genres, regions);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

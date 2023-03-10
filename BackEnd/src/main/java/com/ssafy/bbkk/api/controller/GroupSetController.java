package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.PreviewUserResponse;
import com.ssafy.bbkk.api.service.GroupSetService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("groupset")
@RequiredArgsConstructor
public class GroupSetController {

    private static final Logger logger = LoggerFactory.getLogger(GroupSetController.class);

    private final GroupSetService groupSetService;

    @GetMapping("user/{emailOrNickname}")
    private ResponseEntity<Map<String, Object>> getUser(
            @PathVariable String emailOrNickname) throws Exception{

        logger.info("[getUserInterest] request : emailOrNickname={}", emailOrNickname);

        Map<String, Object> resultMap = new HashMap<>();

        PreviewUserResponse previewUserResponse = groupSetService.getUserByEmailOrNickname(emailOrNickname);
        boolean isExists = previewUserResponse!=null ? true : false;

        resultMap.put("isExists", isExists);
        resultMap.put("user",previewUserResponse);

        logger.info("[getUserInterest] response : isExists={}, user={}", isExists,previewUserResponse);

        return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    }
}

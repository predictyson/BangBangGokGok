package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.dto.PreviewUserResponse;
import com.ssafy.bbkk.api.service.GroupSetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@RequestMapping("groupset")
@RequiredArgsConstructor
public class GroupSetController {

    private static final Logger logger = LoggerFactory.getLogger(GroupSetController.class);

    private final GroupSetService groupSetService;

    @Operation(summary = "일치하는 유저 목록 조회", description = "이메일 또는 닉네임에 입력값이 포함된 유저의 목록을 반환한다")
    @GetMapping("user/{emailOrNickname}")
    private ResponseEntity<Map<String, Object>> getUser(
            @Parameter(description = "입력값", required = true) @PathVariable String emailOrNickname) throws Exception{

        logger.info("[getUser] request : emailOrNickname={}", emailOrNickname);

        Map<String, Object> resultMap = new HashMap<>();

        List<PreviewUserResponse> previewUserResponses = groupSetService.getUserListByEmailOrNickname(emailOrNickname);
        resultMap.put("users",previewUserResponses);
        logger.info("[getUser] response : users={}", previewUserResponses);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
}

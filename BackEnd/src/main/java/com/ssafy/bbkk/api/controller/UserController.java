package com.ssafy.bbkk.api.controller;

import com.ssafy.bbkk.api.service.UserService;
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
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @GetMapping("check/email/{email}")
    public ResponseEntity<Map<String, Object>> checkEmail(@PathVariable String email) throws Exception {
        logger.info("[checkEmail] request : email={}",email);

        Map<String, Object> resultMap = new HashMap<>();
        boolean isDuplicated = userService.existsByEmail(email);

        resultMap.put("isDuplicated",isDuplicated);

        logger.info("[checkEmail] response : isDuplicated={}", isDuplicated);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

}

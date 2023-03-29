package com.ssafy.bbkk.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice(basePackages = "com.ssafy.bbkk.api.controller")
@Slf4j
public class GlobalExceptionHandler{

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllException(Exception e) {
        log.warn("handler catch Exception = {}", e.getMessage());
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        resultMap.put("error", e.getMessage());
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}

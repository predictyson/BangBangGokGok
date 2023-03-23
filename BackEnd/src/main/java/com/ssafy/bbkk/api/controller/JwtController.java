package com.ssafy.bbkk.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {
    private static final Logger logger = LoggerFactory.getLogger(JwtController.class);

    @GetMapping("/jwt")
    public String getJwtToken(@CookieValue(name = "access", required = false) String access) {
        logger.info("[Jwt] response : token={}", access);

        return access;
    }
}
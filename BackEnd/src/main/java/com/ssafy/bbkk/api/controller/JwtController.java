package com.ssafy.bbkk.api.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
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
    public String getJwtToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        logger.info("[Jwt] cookies : cookies={}", cookies);

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                logger.info("[Jwt] cookie : cookie={}", cookie);

                if (cookie.getName().equals("jwt")) {
                    logger.info("[Jwt] jwt : jwt={}", cookie.getValue());

                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
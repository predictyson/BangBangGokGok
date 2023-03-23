package com.ssafy.bbkk.api.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Enumeration;
import java.util.Set;
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
        System.out.println("=====START-LINE=====begin");
        System.out.println("request.getMethod() = " + request.getMethod());
        System.out.println("request.getProtocol() = " + request.getProtocol());
        System.out.println("request.getRequestURI() = " + request.getRequestURI());
        System.out.println("request.getRequestURL() = " + request.getRequestURL());
        System.out.println("request.getScheme() = " + request.getScheme());
        System.out.println("request.getQueryString() = " + request.getQueryString());
        System.out.println("request.isSecure() = " + request.isSecure());
        System.out.println("=====START-LINE=====end");

        Cookie[] cookies = request.getCookies();

        logger.info("[Jwt] cookies : cookies={}", cookies);

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                logger.info("[Jwt] cookie : cookie={}", cookie);
                logger.info("[Jwt] cookie : cookie.getName()={}", cookie.getName());

                if (cookie.getName().equals("jwt")) {
                    logger.info("[Jwt] jwt : jwt={}", cookie.getValue());

                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
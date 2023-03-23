package com.ssafy.bbkk.api.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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
        BufferedReader br = null;
        String line = "";
        StringBuilder stringBuilder = new StringBuilder();
        try {
            //body내용 inputstream에 담는다.
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                br = new BufferedReader(new InputStreamReader(inputStream));
                //더 읽을 라인이 없을때까지 계속
                while ((line = br.readLine()) != null) {
                    stringBuilder.append(line);
                }
            }else {
                System.out.println("Data 없음");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

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
package com.ssafy.bbkk.api.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Enumeration;
import java.util.Set;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import com.ssafy.bbkk.db.entity.RefreshToken;
import com.ssafy.bbkk.db.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("jwt")
@RequiredArgsConstructor
public class JwtController {

    private static final Logger logger = LoggerFactory.getLogger(JwtController.class);
    private final RefreshTokenRepository repository;

    @GetMapping
    public String getJwtToken(@AuthenticationPrincipal User user, HttpServletRequest request) {
            logger.info("[jwt] user={}",user.getUsername());
        return user.getUsername();
    }

    @GetMapping("now")
    public String getTime() {
        logger.info("now = {}",LocalDateTime.now());

        RefreshToken refreshToken = new RefreshToken("test", "test");
        refreshToken = repository.save(refreshToken);
        logger.info("refreshToken \ncreatedTime = {}, \nmodifiedToken = {}", refreshToken.getCreatedDate(), refreshToken.getModifiedDate());

        return ""+ LocalDateTime.now();
    }
}
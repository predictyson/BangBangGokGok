package com.ssafy.bbkk.filter;

import com.ssafy.bbkk.api.controller.UserController;
import com.ssafy.bbkk.common.jwt.TokenProvider;
import javax.servlet.http.Cookie;

import com.ssafy.bbkk.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    private final TokenProvider tokenProvider;
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);


    // 실제 필터링 로직은 doFilterInternal 에 들어감
    // JWT 토큰의 인증 정보를 현재 쓰레드의 SecurityContext 에 저장하는 역할 수행
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        // response
        HttpServletResponse res = (HttpServletResponse)response;

        // 1. Request Header 에서 토큰을 꺼냄
        String jwt = resolveToken(request);

        // 2. validateToken 으로 토큰 유효성 검사
        // 정상 토큰이면 해당 토큰으로 Authentication 을 가져와서 SecurityContext 에 저장
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보를 꺼내오기
    private String resolveToken(HttpServletRequest request) {

        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        Optional<Cookie> accessTokenCookie = CookieUtil.getCookie(request,"acToken");
        Optional<Cookie> refreshTokenCookie = CookieUtil.getCookie(request,"rfToken");

        logger.info("[JwtFilter] bearerToken={}", bearerToken);
        if(accessTokenCookie.isPresent())
            logger.info("[JwtFilter] accessTokenCookie={}", accessTokenCookie.get().getValue());
        if(refreshTokenCookie.isPresent())
            logger.info("[JwtFilter] refreshTokenCookie={}", refreshTokenCookie.get().getValue());

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}